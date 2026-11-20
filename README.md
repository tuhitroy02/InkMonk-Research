# InkMonk Research — Full-Fledged Website & Platform

> **"Research with care. Writing with clarity."**  
> Professional Academic Research & Writing Services in English & Hindi  
> Founded by **Tuhit Roy** & **Sampreeti Mukherjee**  
> Office: Karunamoyee, Sector 2, Salt Lake, Kolkata 700091, West Bengal

---

## 🌟 Overview & Architecture

InkMonk Research is an enterprise-grade full-stack web platform built with:
- **Frontend & Server**: Next.js 16 (App Router, Turbopack, React 19, TypeScript)
- **Styling**: Tailwind CSS v4 with custom InkMonk brand design system (Deep Navy `#1A2B6D`, Saffron `#E8671A`, Warm Gold `#F5A623`, Cream `#F8F5F0`)
- **Database & ORM**: SQLite (`dev.db`, zero-config file database) + Prisma ORM 6
- **Local AI Chatbot**: 100% Local, deterministic Finite State Machine (FSM) + Natural Language classifier running directly on the server. **Zero external API keys** (no OpenAI, no Anthropic, zero token fees, complete privacy).
- **Pricing Engine**: Server-side, single-source-of-truth integer-paise pricing catalogue. Public pages do not expose raw price lists; all quotes are dynamically computed server-side.
- **Client Portal & Admin Management Console**: Role-based access control (CLIENT / STAFF / ADMIN) with secure bcrypt password hashing and 7-day JWT sessions in `httpOnly` cookies.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js 20.9+ installed.

### 2. Run the Application
Open a terminal in the project directory:

```bash
npm ci
# Configure .env.local using the sign-in instructions below.
npx prisma db push
# Start development server
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

### 3. Production Build
```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

---

## 🔑 Client sign-in setup

Client sign-in supports Google, one-time codes sent by email, and SMS codes sent by Twilio Verify. The server sends real messages only after its provider credentials are configured. Until then, the respective option returns an unavailable message; it does not fabricate a code.

1. Copy `.env.example` to `.env.local`. Set a unique `JWT_SECRET` (at least 32 characters) and a persistent `DATABASE_URL`. Never commit these values.
2. Back up the database used by the running server. Run `npx prisma db push` and `npx prisma generate` with `DATABASE_URL` set. Prisma may warn that adding the unique nullable phone field could cause data loss; review the backup and use `npx prisma db push --accept-data-loss` if your existing data has no phone conflicts. The new schema adds a client phone field, email code records, and persistent rate limits.
3. In Google Cloud, create an OAuth web client. Register the exact production callback URL `https://YOUR_DOMAIN/api/auth/google/callback` as an authorized redirect URI. Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REDIRECT_URI` to match. For local testing use `http://localhost:3000/api/auth/google/callback`.

4. Verify your sending domain in Resend, then set `RESEND_API_KEY` and `OTP_FROM_EMAIL` to a sender at that domain. Email codes expire after 10 minutes, are purpose-specific and single-use, and are limited to five guesses.
5. Create a Twilio Verify service with SMS enabled. Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_VERIFY_SERVICE_SID`. Twilio handles SMS code creation and delivery; SMS availability and cost depend on your Twilio account and destination.
6. Add the same secret variables to your hosting provider's server environment, apply the database schema there, then redeploy. A local SQLite file on an ephemeral server is unsuitable for durable client accounts; use persistent database storage before public launch.

The repository originally included a demonstration database and published example passwords. Those example passwords are blocked in production. Set up private staff credentials and remove demonstration data before public launch. OTP and Google login create **CLIENT** accounts only; staff/admin access remains password based.

---

## 📋 Comprehensive Pages & Features

1. **Homepage (`/`)**
   - Hero section featuring the official InkMonk monk mascot logo, animated badges, and tagline.
   - 3 primary service category cards (English Work, Hindi Work, Turnitin Reports).
   - 9-service comprehensive grid.
   - Redacted samples gallery preview.
   - 4-step "How It Works" workflow.
   - Meet the Founders section (Tuhit Roy & Sampreeti Mukherjee).
   - Contact strip with Kolkata Karunamoyee office location.
   - WhatsApp floating button.

2. **Quotation Calculator Wizard (`/quote`)**
   - Multi-step interactive estimation builder.
   - Step 1: Category & Language (English, Hindi, Turnitin).
   - Step 2: Technical vs. Non-Technical, domain, word count / slides / file quantity, deadline.
   - Step 3: Exact server-side quote calculation (`/api/quote/calculate`) with transparent breakdown.
   - Step 4: Submission confirmation with 1-click WhatsApp quote forwarding.

3. **Local AI Chatbot Assistant (`/chat` & Floating Widget)**
   - Custom rule-based NLP + State Machine running inside `lib/chatbot/engine.ts`.
   - Never calls third-party APIs; requires no API keys.
   - Understands inquiries in English, Hindi, and Hinglish.
   - Answers FAQs, calculates quotes interactively, captures lead contact information, and generates instant WhatsApp forwarding links.

4. **Services Page (`/services`)**
   - Detailed breakdown of all academic writing capabilities in English and Hindi:
     - Research Paper Writing (up to 10,000 words)
     - Review Papers
     - Thesis Writing (with/without model implementation)
     - Book Writing (100, 200, 300 pages)
     - Synopsis Writing
     - Articles (per-word rate)
     - Academic Presentations (PPT, per-slide rate)
     - Model Implementation (AI/ML in Python/PyTorch/MATLAB)
     - Turnitin AI + Plagiarism Auditing (fixed ₹200/file)

5. **Work Samples Gallery (`/samples`)**
   - Redacted academic excerpts in Computer Science, Healthcare AI, Hindi Sociology, Sustainable Energy, and Turnitin Originality Reports.

6. **How It Works (`/how-it-works`)**
   - 5-stage methodology: Scope Definition → Specialist Assignment → Drafting & Simulation → Turnitin Quality Assurance → Delivery & Revisions.
   - Confidentiality and Non-Disclosure Guarantee.

7. **About Us (`/about`)**
   - Story of InkMonk Research, brand philosophy, leadership profiles for Tuhit Roy and Sampreeti Mukherjee, and physical presence in Kolkata.

8. **Contact Page (`/contact`)**
   - Interactive inquiry form, Karunamoyee office address, direct WhatsApp link, email, and phone.

9. **FAQ Page (`/faq`)**
   - Categorized interactive accordion answering common client questions on confidentiality, pricing, Turnitin audits, and Hindi writing.

10. **Legal Pages (`/privacy-policy` & `/terms`)**
    - Comprehensive privacy policy and terms of service emphasizing academic model assistance, strict non-disclosure, and jurisdiction in Kolkata, West Bengal.

11. **Admin Management Console (`/admin`)**
    - Live feed of all incoming leads from both the Chatbot and the Manual Quote Form.
    - Status management (NEW → CONTACTED → CONVERTED → LOST → SPAM).
    - Statistical cards (total leads, new, contacted, converted, chatbot vs. form breakdown).
    - One-click direct WhatsApp chat launch to contact inquiring scholars instantly.

12. **Client Portal (`/client`)**
    - Secure scholar dashboard showing project IDs, status, milestone progress bars, deadlines, and direct supervisor contact channels.

---

## 🔒 Security & Privacy

- All passwords hashed with **bcryptjs** (10 salt rounds).
- Edge-compatible JWT authentication via **jose** stored in `httpOnly` secure cookies.
- Server-side calculation guarantees client-side price tampering is impossible.
- Analytics events do not store Personally Identifiable Information (PII).
- Local AI architecture guarantees no academic manuscripts or conversations leave the server.

---

## 🏢 Business Information

- **Company Name**: InkMonk Research
- **Founders**: Tuhit Roy & Sampreeti Mukherjee
- **Tagline**: *"Research with care. Writing with clarity."*
- **Office**: Karunamoyee, Sector 2, Salt Lake, Kolkata 700091, West Bengal
- **Email**: `inkmonkresearch@gmail.com`
- **Phone / WhatsApp**: `+91 7980470880`

Before deploying against an existing SQLite database, back it up and apply the additive Prisma schema update with `npx prisma db push` using the production database path. The application build does not modify the database. Set a new random production `JWT_SECRET` of at least 32 characters to invalidate sessions issued by older builds. Staff and administrators sign in using the bcrypt password stored for their provisioned account.
