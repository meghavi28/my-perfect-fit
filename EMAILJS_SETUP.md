# EmailJS Setup Guide

Follow these steps to configure EmailJS for your measurement form:

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account (200 emails/month free)

## Step 2: Create Email Service

1. Go to **Email Services** → **Add New Service**
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow the setup instructions for your provider
4. **Copy your Service ID** (looks like: `service_xxxxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** → **Create New Template**
2. Give it a name (e.g., "Measurement Form")
3. Set the **To Email** field to: `{{to_email}}`
4. Set the **Subject** to: `New Measurement from {{name}}`
5. In the **Content** section, use this template:

```
Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Notes: {{notes}}

TOP MEASUREMENTS (inches):
- Neck: {{top_neck}}
- Shoulders: {{top_shoulders}}
- Sleeves: {{top_sleeves}}
- Chest: {{top_chest}}
- Stomach: {{top_stomach}}
- Hips: {{top_hips}}
- Top Length: {{top_length}}

BOTTOM MEASUREMENTS (inches):
- Waist: {{bottom_waist}}
- Hips: {{bottom_hips}}
- Thigh: {{bottom_thigh}}
- Calf: {{bottom_calf}}
- Folk: {{bottom_folk}}
- Inner Length: {{bottom_inner_length}}
- Bottom Length: {{bottom_length}}
```

6. **Save the template**
7. **Copy your Template ID** (looks like: `template_xxxxxxxxx`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Scroll to **API Keys** section
3. **Copy your Public Key** (looks like: `xxxxxxxxxxxxxxxxxxxx`)

## Step 5: Create .env File

1. In your project root folder, create a file named `.env`
2. Add these lines (replace with YOUR actual values):

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_TO_EMAIL=your@email.com
```

**Important:**

- Replace `your_public_key_here` with your actual Public Key
- Replace `your_service_id_here` with your actual Service ID
- Replace `your_template_id_here` with your actual Template ID
- Replace `your@email.com` with the email where you want to receive measurements

## Step 6: Restart Dev Server

After creating/updating the `.env` file:

1. **Stop** your dev server (Ctrl+C)
2. **Restart** it with `npm run dev`
3. The new environment variables will be loaded

## Troubleshooting

### "Template ID not found" Error

- Double-check your Template ID in `.env` file
- Make sure the template is **active** in EmailJS dashboard
- Restart your dev server after updating `.env`
- Verify the template ID at: https://dashboard.emailjs.com/admin/templates

### "Service ID" Error

- Check your Service ID in `.env` file
- Make sure the service is **active** in EmailJS dashboard
- Verify at: https://dashboard.emailjs.com/admin/integration

### Still Not Working?

1. Check browser console for detailed errors
2. Verify all environment variables are set correctly
3. Make sure `.env` file is in the project root (same folder as `package.json`)
4. Ensure `.env` file doesn't have quotes around values
5. Restart your dev server

## Example .env File

```env
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnopqrstuvwxyz123456
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_TO_EMAIL=tailor@example.com
```

**Note:** Never commit your `.env` file to git! It contains sensitive information.
