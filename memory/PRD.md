# Annapurna Chem Solutions - PRD

## Original Problem Statement
Create a professional, user-friendly full stack website for chemical supply company "Annapurna Chem Solutions" with product catalog (Organic Binder OB-AE101, Furnace Oil, Magnetite Powder), order placement, order tracking, admin dashboard, and contact form.

## Architecture
- **Backend**: FastAPI + MongoDB (motor)
- **Frontend**: React + Tailwind CSS + Shadcn/UI + Framer Motion + Sonner toast
- **Email**: SendGrid (placeholder - requires API key)

## User Personas
1. **Industrial Customer**: Places orders for industrial chemicals, tracks order status
2. **Casual Inquirer**: Browses products, uses contact form for general inquiries
3. **Company Admin**: Manages orders, updates status from admin dashboard

## Core Requirements
- 3 products: Organic Binder (OB-AE101), Furnace Oil, Magnetite Powder
- Order placement without authentication (track via Order ID)
- Email notifications to annapurnaenterprise3@gmail.com
- Admin dashboard for order management
- Professional blue/grey design (Swiss High-Contrast)

## What's Been Implemented (Feb 2026)
- ✅ Homepage with hero, features, products preview, CTA
- ✅ Products page with detailed catalog (3 products)
- ✅ Place Order form with full validation and success screen
- ✅ Track Order by Order ID
- ✅ Contact form with email storage
- ✅ Admin dashboard at /admin (orders table, stats, filters, status update modal)
- ✅ About Us page
- ✅ Responsive header with mobile menu, footer
- ✅ Email notification placeholder (activates when SENDGRID_API_KEY is added)
- ✅ Backend API: POST/GET/PATCH /api/orders, POST /api/contact
- ✅ Status enum validation (pending/processing/shipped/delivered/cancelled)
- ✅ 100% test pass rate (12/12 backend, all frontend flows)

## Prioritized Backlog (P0/P1/P2)

### P1 (Important)
- Add SendGrid API key to enable real email notifications
- Add admin authentication (currently public)
- Add product details/specifications when user provides them

### P2 (Nice to have)
- Add product images upload capability
- Add inquiry/contact form management in admin
- Email confirmation to customer on order placement
- PDF invoice generation
- Search and pagination in admin orders table

## Next Tasks
1. User to provide SendGrid API key for real emails
2. User to provide detailed product specifications
3. Consider adding simple admin auth (password-based)
