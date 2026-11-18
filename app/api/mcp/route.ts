import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'InkMonk Research MCP Streamable HTTP Endpoint',
    version: '1.0.0',
    status: 'active',
    transport: 'streamable-http',
    docs: 'https://inkmonkresearch.com/llms.txt',
    serverCard: 'https://inkmonkresearch.com/.well-known/mcp/server-card.json',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { method, params } = body;

    if (method === 'tools/list') {
      return NextResponse.json({
        tools: [
          {
            name: 'get_service_catalog',
            description: 'Retrieve comprehensive catalogue of academic research services in English and Hindi with turnaround times.',
            inputSchema: { type: 'object' },
          },
          {
            name: 'calculate_quote',
            description: 'Calculate exact quotation for research paper, thesis, book writing, and Turnitin plagiarism check.',
            inputSchema: {
              type: 'object',
              properties: {
                service: { type: 'string' },
                language: { type: 'string' },
                isTechnical: { type: 'boolean' },
              },
            },
          },
        ],
      });
    }

    return NextResponse.json({
      jsonrpc: '2.0',
      result: {
        message: 'InkMonk Research MCP Service Ready',
        contact: 'inkmonkresearch@gmail.com',
        phone: '+91 7980470880',
      },
      id: body.id || null,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid MCP Request' }, { status: 400 });
  }
}
