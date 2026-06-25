# Lifie AI — Demo Request Form

A production-grade demo request form that triggers automated AI phone calls via the Lifie Reach API.

##  Overview

When a prospect submits the demo form, the system:

1. **Fetches** the "AI SDR" voice preset from Lifie Reach
2. **Creates** a new batch using that preset
3. **Adds** the prospect as a lead to the batch
4. **Triggers** an outbound AI phone call to the submitted phone number — automatically

##  Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                   │
│                                                          │
│   Landing Page → Demo Form → Success State               │
│                     │                                     │
│                     │ POST /api/submit-demo               │
│                     ▼                                     │
│   ┌─────────────────────────────────────┐                │
│   │       API Route (Server-Side)        │                │
│   │                                      │                │
│   │  1. Validate form data               │                │
│   │  2. GET  /list-presets → "AI SDR"    │                │
│   │  3. POST /stl-new-batch              │                │
│   │  4. POST /stl-add-batch-leads        │                │
│   │  5. Return success/error             │                │
│   └─────────────────────────────────────┘                │
│                     │                                     │
│                     ▼                                     │
│             Lifie Reach Voice API                         │
│         (voice-api.salesbox.ai)                          │
└─────────────────────────────────────────────────────────┘
```

**Key design decision:** The API key is stored server-side in environment variables and API calls are proxied through a Next.js API route. This ensures the secret key is **never exposed** to the browser.

##  Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 15 (App Router) | API routes for secure backend + React frontend in one deployment |
| **Styling** | Vanilla CSS + Custom Properties | Full control, no unnecessary dependencies |
| **Animations** | Framer Motion | Smooth, spring-based animations for premium UX |
| **Phone Input** | react-phone-number-input | International phone validation with country codes |
| **Deployment** | Vercel | Seamless Next.js hosting with env var support |

##  Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd lifie-demo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your Lifie API key
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `LIFIE_API_KEY` | Lifie Reach API secret key | ✅ |
| `LIFIE_API_BASE_URL` | API base URL (default: `https://voice-api.salesbox.ai/functions/v1`) | ❌ |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
lifie-demo/
├── app/
│   ├── api/
│   │   └── submit-demo/
│   │       └── route.js        # Server-side API route
│   ├── globals.css              # Design system & all styles
│   ├── layout.js                # Root layout with SEO metadata
│   └── page.js                  # Landing page
├── components/
│   ├── DemoForm.js              # Interactive demo request form
│   ├── Features.js              # Feature highlights section
│   ├── Footer.js                # Page footer
│   ├── Navbar.js                # Top navigation bar
│   └── SuccessState.js          # Post-submission success view
├── lib/
│   └── lifie-api.js             # Lifie Reach API client
├── .env.example                 # Environment variable template
├── .env.local                   # Local env vars (git-ignored)
└── README.md                    # This file
```

##  Design Decisions

- **Dark theme** with Lifie AI's brand colors (#8366f4 purple, #b447eb magenta)
- **Glassmorphism** form card for depth and premium feel
- **Sora + Inter** fonts matching Lifie AI's website
- **Progressive disclosure** — optional fields hidden by default to reduce form friction
- **Real-time validation** on blur with clear error messages
- **Animated transitions** between form → loading → success states

##  Security

- API key stored in environment variables, never in client code
- Server-side validation of all form inputs
- Work email validation (rejects personal email domains)
- CORS handled by Next.js API routes
- No sensitive data logged in production

##  Responsive Design

The form is fully responsive across:
- Desktop (side-by-side hero layout)
- Tablet (stacked layout)
- Mobile (full-width, optimized touch targets)

##  Deployment (Vercel)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `LIFIE_API_KEY` = your API key
4. Deploy!

The app will be available at `https://your-project.vercel.app`
