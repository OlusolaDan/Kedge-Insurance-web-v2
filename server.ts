import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));

// In-memory persistent data store with optional local file backup
interface SubmissionRecord {
  id: string;
  type: 'quote' | 'contact' | 'renewal';
  reference: string;
  data: Record<string, any>;
  createdAt: string;
  status: 'received' | 'processing' | 'contacted';
}

const submissions: SubmissionRecord[] = [];

// Helper to generate reference numbers
function generateReference(prefix: string): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `KDG-${prefix}-${year}-${randomSuffix}`;
}

// Validation helpers
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  // Accepts standard Nigerian formats (+234..., 080..., 070..., 090..., 081...) and international
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return /^(?:\+234|0)[789][01]\d{8}$/.test(cleaned) || cleaned.length >= 8;
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'KEDGE Insurance Brokers Server',
    environment: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
  });
});

// Quote Request Endpoint
app.post('/api/quote', (req, res) => {
  const {
    fullName,
    organization,
    email,
    phone,
    category,
    specificProduct,
    estimatedSumInsured,
    description,
    privacyConsent,
  } = req.body;

  const errors: Record<string, string> = {};

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required (minimum 2 characters)';
  }

  if (!email || !isValidEmail(email)) {
    errors.email = 'A valid email address is required';
  }

  if (!phone || !isValidPhone(phone)) {
    errors.phone = 'A valid telephone number is required (e.g., 08012345678 or +234...)';
  }

  if (!category || typeof category !== 'string') {
    errors.category = 'Please select a valid insurance category';
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    errors.description = 'Please provide a brief description of the risk or requirement (minimum 10 characters)';
  }

  if (!privacyConsent) {
    errors.privacyConsent = 'You must review and consent to the privacy notice to proceed';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the highlighted errors.',
      errors,
    });
  }

  const reference = generateReference('QUO');
  const record: SubmissionRecord = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: 'quote',
    reference,
    data: {
      fullName: fullName.trim(),
      organization: organization ? organization.trim() : null,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      category: category.trim(),
      specificProduct: specificProduct ? specificProduct.trim() : null,
      estimatedSumInsured: estimatedSumInsured ? estimatedSumInsured.trim() : null,
      description: description.trim(),
    },
    createdAt: new Date().toISOString(),
    status: 'received',
  };

  submissions.unshift(record);

  return res.status(201).json({
    success: true,
    reference,
    message: 'Your quote enquiry has been securely received by KEDGE Insurance Brokers Ltd.',
    estimatedResponseTime: 'Within 1 business day (standard brokerage review)',
    details: {
      reference,
      category: record.data.category,
      clientName: record.data.fullName,
      submittedAt: record.createdAt,
    },
  });
});

// General Contact Enquiry Endpoint
app.post('/api/contact', (req, res) => {
  const { fullName, email, phone, subject, enquiryType, message, privacyConsent } = req.body;

  const errors: Record<string, string> = {};

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required';
  }

  if (!email || !isValidEmail(email)) {
    errors.email = 'A valid email address is required';
  }

  if (!phone || !isValidPhone(phone)) {
    errors.phone = 'A valid contact telephone number is required';
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.message = 'Please provide your message details (minimum 10 characters)';
  }

  if (!privacyConsent) {
    errors.privacyConsent = 'Consent to our privacy policy is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the highlighted errors.',
      errors,
    });
  }

  const reference = generateReference('ENQ');
  const record: SubmissionRecord = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: 'contact',
    reference,
    data: {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: (subject || 'General Enquiry').trim(),
      enquiryType: enquiryType || 'General Enquiry',
      message: message.trim(),
    },
    createdAt: new Date().toISOString(),
    status: 'received',
  };

  submissions.unshift(record);

  return res.status(201).json({
    success: true,
    reference,
    message: 'Thank you for contacting KEDGE Insurance Brokers Ltd. Your message has been logged.',
    submittedAt: record.createdAt,
  });
});

// Policy Renewal Enquiry Endpoint
app.post('/api/renewal', (req, res) => {
  const {
    policyHolder,
    currentInsurer,
    existingPolicyNumber,
    insuranceClass,
    expiryDate,
    email,
    phone,
    notes,
    privacyConsent,
  } = req.body;

  const errors: Record<string, string> = {};

  if (!policyHolder || policyHolder.trim().length < 2) {
    errors.policyHolder = 'Policyholder or Company name is required';
  }

  if (!insuranceClass) {
    errors.insuranceClass = 'Please select the insurance class to renew';
  }

  if (!email || !isValidEmail(email)) {
    errors.email = 'A valid contact email is required';
  }

  if (!phone || !isValidPhone(phone)) {
    errors.phone = 'A valid contact telephone number is required';
  }

  if (!privacyConsent) {
    errors.privacyConsent = 'Consent to our privacy policy is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please provide all required renewal details.',
      errors,
    });
  }

  const reference = generateReference('RNW');
  const record: SubmissionRecord = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: 'renewal',
    reference,
    data: {
      policyHolder: policyHolder.trim(),
      currentInsurer: currentInsurer ? currentInsurer.trim() : null,
      existingPolicyNumber: existingPolicyNumber ? existingPolicyNumber.trim() : null,
      insuranceClass: insuranceClass.trim(),
      expiryDate: expiryDate || null,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      notes: notes ? notes.trim() : null,
    },
    createdAt: new Date().toISOString(),
    status: 'received',
  };

  submissions.unshift(record);

  return res.status(201).json({
    success: true,
    reference,
    message: 'Your renewal review request has been logged with our Technical Advisory desk.',
    submittedAt: record.createdAt,
  });
});

// Submissions Inspection API (internal verification)
app.get('/api/submissions', (req, res) => {
  res.json({
    total: submissions.length,
    submissions,
  });
});

// Launch Server with Vite Middleware in Development
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '127.0.0.1', () => {
    console.log(`[KEDGE Corporate Web Engine] Server listening on http://127.0.0.1:${PORT}`);
  });
}

startServer();
