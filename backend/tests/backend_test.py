"""Backend API tests for Annapurna Chem Solutions."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://chem-supply-hub-3.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def created_order(session):
    payload = {
        "customer_name": "TEST_Customer",
        "customer_email": "test_customer@example.com",
        "customer_phone": "9999999999",
        "customer_company": "TEST_Co",
        "product_name": "Organic Binder OB-AE101",
        "quantity": "100 kg",
        "specifications": "Standard",
        "delivery_address": "123 Test Street",
        "delivery_city": "Mumbai",
        "delivery_state": "MH",
        "delivery_pincode": "400001",
        "additional_notes": "TEST"
    }
    r = session.post(f"{API}/orders", json=payload, timeout=30)
    assert r.status_code == 200, f"Create order failed: {r.status_code} {r.text}"
    return r.json()


# Health check
def test_health(session):
    r = session.get(f"{API}/", timeout=15)
    assert r.status_code == 200
    assert "message" in r.json()


# Order create
def test_create_order(created_order):
    assert created_order["order_id"].startswith("ORD-")
    assert created_order["status"] == "pending"
    assert created_order["customer_email"] == "test_customer@example.com"
    assert created_order["product_name"] == "Organic Binder OB-AE101"


def test_create_order_invalid_email(session):
    payload = {
        "customer_name": "Bad",
        "customer_email": "not-an-email",
        "customer_phone": "111",
        "product_name": "x", "quantity": "1",
        "delivery_address": "a", "delivery_city": "b",
        "delivery_state": "c", "delivery_pincode": "d"
    }
    r = session.post(f"{API}/orders", json=payload, timeout=15)
    assert r.status_code == 422


def test_create_order_missing_fields(session):
    r = session.post(f"{API}/orders", json={"customer_name": "x"}, timeout=15)
    assert r.status_code == 422


# Order get by id
def test_get_order_by_id(session, created_order):
    oid = created_order["order_id"]
    r = session.get(f"{API}/orders/{oid}", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["order_id"] == oid
    assert data["customer_name"] == "TEST_Customer"


def test_get_order_invalid_id(session):
    r = session.get(f"{API}/orders/ORD-NOTEXIST", timeout=15)
    assert r.status_code == 404


# Get all orders
def test_get_all_orders(session, created_order):
    r = session.get(f"{API}/orders", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert any(o["order_id"] == created_order["order_id"] for o in data)


# Update order status
def test_update_order_status(session, created_order):
    oid = created_order["order_id"]
    r = session.patch(f"{API}/orders/{oid}", json={"status": "processing"}, timeout=15)
    assert r.status_code == 200
    assert r.json()["status"] == "processing"
    # verify persistence
    r2 = session.get(f"{API}/orders/{oid}", timeout=15)
    assert r2.json()["status"] == "processing"


def test_update_order_status_invalid_id(session):
    r = session.patch(f"{API}/orders/ORD-NOEXIST", json={"status": "shipped"}, timeout=15)
    assert r.status_code == 404


def test_update_order_multiple_statuses(session, created_order):
    oid = created_order["order_id"]
    for status in ["shipped", "delivered", "cancelled"]:
        r = session.patch(f"{API}/orders/{oid}", json={"status": status}, timeout=15)
        assert r.status_code == 200
        assert r.json()["status"] == status


# Contact form
def test_contact_inquiry(session):
    payload = {
        "name": "TEST_Inquiry",
        "email": "inquiry_test@example.com",
        "subject": "Test Subject",
        "message": "Test message body"
    }
    r = session.post(f"{API}/contact", json=payload, timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["inquiry_id"].startswith("INQ-")
    assert data["email"] == "inquiry_test@example.com"


def test_contact_invalid_email(session):
    r = session.post(f"{API}/contact", json={
        "name": "x", "email": "bad", "subject": "s", "message": "m"
    }, timeout=15)
    assert r.status_code == 422
