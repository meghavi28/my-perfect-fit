# MyPerfectFit - Tailoring Measurements

A modern, responsive website for clients to submit tailoring measurements. Built with React (Vite), Tailwind CSS, and shadcn-style components. Submissions are sent to your email via EmailJS.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- shadcn-style UI components (locally included)
- React Hook Form + Zod validation
- Phone input with country codes
- Email delivery via EmailJS (free)

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Configure EmailJS (free)

- Create an account at https://www.emailjs.com/
- Create an Email Service (Gmail/Outlook/SMTP, etc.) → copy your Service ID
- Create an Email Template → copy your Template ID
- In Account → API Keys → copy your Public Key
- In your template, add variables that match the payload we send:

Suggested template fields (example):

```
To: {{to_email}}
Subject: New Measurement from {{name}}

Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Notes: {{notes}}

Top Measurements (inches):
- Neck: {{top_neck}}
- Shoulders: {{top_shoulders}}
- Sleeves: {{top_sleeves}}
- Chest: {{top_chest}}
- Stomach: {{top_stomach}}
- Hips: {{top_hips}}
- Top Length: {{top_length}}

Bottom Measurements (inches):
- Waist: {{bottom_waist}}
- Hips: {{bottom_hips}}
- Thigh: {{bottom_thigh}}
- Calf: {{bottom_calf}}
- Folk: {{bottom_folk}}
- Inner Length: {{bottom_inner_length}}
- Bottom Length: {{bottom_length}}
```

3. Create a `.env` file at the project root with your values:

```
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
VITE_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID
VITE_TO_EMAIL=your@email.com
```

4. Run the app

```bash
npm run dev
```

Open the URL printed in your terminal.

## Production Build

```bash
npm run build
npm run preview
```

Deploy the `dist` folder to any static host (Vercel, Netlify, S3, etc.).

## Notes

- All measurement inputs are in inches with validation for positive numbers.
- Phone field uses international format and validation.
- The design is responsive and mobile-first.
- If you prefer Formspree instead of EmailJS, replace the submit handler with a fetch to your Formspree endpoint.

## License

MIT
