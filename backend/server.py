from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict, field_validator
from typing import List, Optional, Literal
from datetime import datetime, timezone
import secrets

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    customer_company: Optional[str] = None
    product_name: str
    quantity: str
    specifications: Optional[str] = None
    delivery_address: str
    delivery_city: str
    delivery_state: str
    delivery_pincode: str
    additional_notes: Optional[str] = None


class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    order_id: str
    customer_name: str
    customer_email: str
    customer_phone: str
    customer_company: Optional[str] = None
    product_name: str
    quantity: str
    specifications: Optional[str] = None
    delivery_address: str
    delivery_city: str
    delivery_state: str
    delivery_pincode: str
    additional_notes: Optional[str] = None
    status: str = "pending"
    created_at: str
    updated_at: str


class OrderStatusUpdate(BaseModel):
    status: Literal["pending", "processing", "shipped", "delivered", "cancelled"]


class ContactInquiry(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


class ContactInquiryResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    inquiry_id: str
    name: str
    email: str
    subject: str
    message: str
    created_at: str


def send_order_email_placeholder(order_data: dict):
    """
    Placeholder for email sending.
    When SendGrid API key is added to .env, this will send actual emails.
    """
    sendgrid_key = os.environ.get('SENDGRID_API_KEY')
    recipient_email = os.environ.get('COMPANY_EMAIL', 'annapurnaenterprise3@gmail.com')
    
    if sendgrid_key and sendgrid_key != 'your_sendgrid_api_key_here':
        try:
            from sendgrid import SendGridAPIClient
            from sendgrid.helpers.mail import Mail
            
            html_content = f"""
            <html>
                <body style="font-family: Arial, sans-serif;">
                    <h2 style="color: #0F2537;">New Order Received</h2>
                    <p><strong>Order ID:</strong> {order_data['order_id']}</p>
                    <hr>
                    <h3>Customer Details:</h3>
                    <p><strong>Name:</strong> {order_data['customer_name']}</p>
                    <p><strong>Email:</strong> {order_data['customer_email']}</p>
                    <p><strong>Phone:</strong> {order_data['customer_phone']}</p>
                    {f"<p><strong>Company:</strong> {order_data.get('customer_company')}</p>" if order_data.get('customer_company') else ""}
                    <hr>
                    <h3>Order Details:</h3>
                    <p><strong>Product:</strong> {order_data['product_name']}</p>
                    <p><strong>Quantity:</strong> {order_data['quantity']}</p>
                    {f"<p><strong>Specifications:</strong> {order_data.get('specifications')}</p>" if order_data.get('specifications') else ""}
                    <hr>
                    <h3>Delivery Address:</h3>
                    <p>{order_data['delivery_address']}<br>
                    {order_data['delivery_city']}, {order_data['delivery_state']} - {order_data['delivery_pincode']}</p>
                    {f"<p><strong>Additional Notes:</strong> {order_data.get('additional_notes')}</p>" if order_data.get('additional_notes') else ""}
                    <hr>
                    <p><em>Order received at: {order_data['created_at']}</em></p>
                </body>
            </html>
            """
            
            message = Mail(
                from_email=recipient_email,
                to_emails=recipient_email,
                subject=f"New Order: {order_data['order_id']} - {order_data['product_name']}",
                html_content=html_content
            )
            
            sg = SendGridAPIClient(sendgrid_key)
            response = sg.send(message)
            logger.info(f"Email sent successfully. Status code: {response.status_code}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False
    else:
        logger.info(f"Email notification (placeholder): Order {order_data['order_id']} received")
        logger.info(f"Would send to: {recipient_email}")
        return True


@api_router.post("/orders", response_model=Order)
async def create_order(order_input: OrderCreate):
    order_id = f"ORD-{secrets.token_hex(4).upper()}"
    timestamp = datetime.now(timezone.utc).isoformat()
    
    order_data = {
        "order_id": order_id,
        **order_input.model_dump(),
        "status": "pending",
        "created_at": timestamp,
        "updated_at": timestamp
    }
    
    await db.orders.insert_one(order_data)
    
    send_order_email_placeholder(order_data)
    
    return Order(**order_data)


@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    order = await db.orders.find_one({"order_id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**order)


@api_router.get("/orders", response_model=List[Order])
async def get_all_orders():
    orders = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Order(**order) for order in orders]


@api_router.patch("/orders/{order_id}", response_model=Order)
async def update_order_status(order_id: str, status_update: OrderStatusUpdate):
    order = await db.orders.find_one({"order_id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    updated_at = datetime.now(timezone.utc).isoformat()
    await db.orders.update_one(
        {"order_id": order_id},
        {"$set": {"status": status_update.status, "updated_at": updated_at}}
    )
    
    order["status"] = status_update.status
    order["updated_at"] = updated_at
    return Order(**order)


@api_router.post("/contact", response_model=ContactInquiryResponse)
async def create_contact_inquiry(inquiry: ContactInquiry):
    inquiry_id = f"INQ-{secrets.token_hex(4).upper()}"
    timestamp = datetime.now(timezone.utc).isoformat()
    
    inquiry_data = {
        "inquiry_id": inquiry_id,
        **inquiry.model_dump(),
        "created_at": timestamp
    }
    
    await db.contact_inquiries.insert_one(inquiry_data)
    
    logger.info(f"Contact inquiry received: {inquiry_id} from {inquiry.email}")
    
    return ContactInquiryResponse(**inquiry_data)


@api_router.get("/")
async def root():
    return {"message": "Annapurna Chem Solutions API"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
