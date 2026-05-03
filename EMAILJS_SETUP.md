# Email JS Integration Setup Guide

This guide will help you set up Email JS to send emails from your contact and booking forms.

## Step 1: Create Email JS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **Sign Up** and create a free account
3. Verify your email address

## Step 2: Set Up Email Service

1. Go to **Email Services** in your dashboard
2. Click **Add New Service**
3. Select your email provider (Gmail, Outlook, Yahoo, etc.)
   - **For Gmail**: You'll need to use an [App Password](https://support.google.com/accounts/answer/185833)
4. Follow the authentication steps
5. **Copy your Service ID** (you'll need this)

## Step 3: Create Email Templates

### Contact Form Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Name it: `contact_template`
4. **Email to:** `{{to_email}}`
5. **Subject:** `New Inquiry from {{from_name}}`
6. **Template:**
```html
<p>You have received a new inquiry from RC Elevators & Escalators website:</p>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Phone:</strong> {{from_phone}}</p>
<p><strong>Message:</strong> {{message}}</p>
```
7. **Copy your Template ID** (format: `template_xxxxx`)

### Booking Form Template
1. Click **Create New Template**
2. Name it: `booking_template`
3. **Email to:** `{{to_email}}`
4. **Subject:** `New Appointment Booking from {{from_name}}`
5. **Template:**
```html
<p>A new appointment has been booked:</p>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Phone:</strong> {{from_phone}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Service:</strong> {{service_type}}</p>
<p><strong>Date:</strong> {{appointment_date}}</p>
<p><strong>Time Slot:</strong> {{appointment_time}}</p>
<p><strong>Building:</strong> {{building_name}}</p>
<p><strong>Notes:</strong> {{additional_notes}}</p>
```
7. **Copy your Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **API Keys**
2. Click **Reveal** next to the **Public Key**
3. **Copy your Public Key** (format: `xxxxxxxxxxxxxxxxxxxxxxxxxx`)

## Step 5: Update Your Code

Open `js/script.js` and replace the placeholders:

```javascript
// Line 7 - Replace YOUR_PUBLIC_KEY_HERE
emailjs.init('YOUR_PUBLIC_KEY_HERE'); 
// Example: emailjs.init('abc123xyz789abc123xyz789abc123xyz');

// Line 107 - Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID for contact form
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)

// Line 154 - Replace YOUR_SERVICE_ID and YOUR_BOOKING_TEMPLATE_ID for booking form
emailjs.send('YOUR_SERVICE_ID', 'YOUR_BOOKING_TEMPLATE_ID', templateParams)

// Also replace the email addresses:
to_email: '9455474918@example.com' // Replace with your actual email (two places)
```

## Example with Real Values

```javascript
emailjs.init('abc123def456ghi789jkl012mno345');

// In contact form:
emailjs.send('service_abc123xyz', 'template_contact_001', templateParams)

// In booking form:
emailjs.send('service_abc123xyz', 'template_booking_001', templateParams)

// Email address:
to_email: 'yourname@rc-elevators.com'
```

## Step 6: Test It

1. Refresh your website on localhost
2. Fill out the contact form and submit
3. Check your email - you should receive the inquiry!
4. Fill out the booking form and test it too

## Troubleshooting

### 1. "Email not sent" error
- Check that your Public Key is correct
- Verify your Service ID exists
- Make sure your email service is properly configured

### 2. "Template not found" error
- Double-check your Template IDs match exactly
- Template IDs are case-sensitive

### 3. Emails going to spam
- Check your email provider's spam settings
- Add a sender name in Email JS configuration
- Include proper email headers in template

### 4. Rate limiting
- Email JS free plan has limits (200 emails/month)
- Upgrade to paid plan for higher limits

## Free Plan Limits
- **200 emails/month**
- Up to **5 email templates**
- Up to **2 email services**

## Deploy to Netlify

After setting up Email JS locally:
1. Commit your changes: `git add . && git commit -m "Add Email JS integration"`
2. Push to GitHub: `git push`
3. Netlify will automatically redeploy
4. Your emails will work on the live site!

## Need Help?

- [Email JS Documentation](https://www.emailjs.com/docs/)
- [Email JS FAQ](https://www.emailjs.com/docs/faq/)
- [Email JS Community](https://www.emailjs.com/docs/examples/angularjs/)
