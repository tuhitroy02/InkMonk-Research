import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sanitizeText } from '@/lib/sanitize';

// In-memory fallback query store to ensure instant response if database table differs
interface ClientQueryRecord {
  id: string;
  projectId?: string;
  projectTitle?: string;
  queryType: string;
  subject: string;
  message: string;
  userName: string;
  userEmail: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'RESOLVED';
  assignedDirector: string;
  createdAt: string;
  responses?: { author: string; text: string; time: string }[];
}

const MEMORY_QUERIES: ClientQueryRecord[] = [
  {
    id: 'QRY-8921',
    projectId: 'PRJ-1082',
    projectTitle: 'Deep Learning Model & Paper on Medical Image Segmentation',
    queryType: 'Methodology Clarification',
    subject: 'Confirmation of U-Net vs Attention U-Net ablation test baseline',
    message: 'Could you please confirm if the ablation study includes both Dice coefficient and Hausdorff distance metrics as requested by the IEEE journal guidelines?',
    userName: 'Scholar',
    userEmail: 'scholar@university.edu',
    status: 'UNDER_REVIEW',
    assignedDirector: 'Tuhit Roy (Founder & Director)',
    createdAt: 'Today, 11:30 AM',
    responses: [
      {
        author: 'Tuhit Roy (Director)',
        text: 'Yes! Both 95% Hausdorff Distance and Dice metric are calculated across the 5-fold cross-validation dataset. Section 4.3 has been updated accordingly.',
        time: 'Today, 01:15 PM',
      },
    ],
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') || '';

  const filtered = email
    ? MEMORY_QUERIES.filter((q) => q.userEmail.toLowerCase() === email.toLowerCase() || q.userEmail === 'scholar@university.edu')
    : MEMORY_QUERIES;

  return NextResponse.json({
    success: true,
    queries: filtered,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      projectId,
      projectTitle,
      queryType,
      subject,
      message,
      userName,
      userEmail,
    } = body;

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and query message are required.' }, { status: 400 });
    }

    const ticketId = `QRY-${Math.floor(1000 + Math.random() * 9000)}`;

    const newQuery: ClientQueryRecord = {
      id: ticketId,
      projectId: sanitizeText(projectId || 'General'),
      projectTitle: sanitizeText(projectTitle || 'General Academic Consultation'),
      queryType: sanitizeText(queryType || 'General Inquiry'),
      subject: sanitizeText(subject, 200),
      message: sanitizeText(message, 3000),
      userName: sanitizeText(userName || 'Scholar', 100),
      userEmail: sanitizeText(userEmail || 'scholar@university.edu', 200),
      status: 'UNDER_REVIEW',
      assignedDirector: 'Tuhit Roy & Sampreeti Mukherjee (Directors)',
      createdAt: 'Just now',
      responses: [
        {
          author: 'InkMonk Academic Desk',
          text: `Your query (${ticketId}) has been received and routed to the lead subject scholar. A comprehensive response will be issued within 4–6 working hours. For urgent escalation, WhatsApp +91 7980470880.`,
          time: 'Just now',
        },
      ],
    };

    MEMORY_QUERIES.unshift(newQuery);

    return NextResponse.json({
      success: true,
      ticketId,
      message: 'Query submitted successfully and assigned to InkMonk Directors.',
      query: newQuery,
    });
  } catch (error) {
    console.error('Submit query error:', error);
    return NextResponse.json({ error: 'Failed to submit query.' }, { status: 500 });
  }
}
