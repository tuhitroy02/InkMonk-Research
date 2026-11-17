import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * InkMonk Research — Webhook Signature Verification Utility (Check 19)
 * Protects against forged payment / gateway webhook callbacks.
 */

export function verifyWebhookSignature({
  payload,
  signature,
  secret,
}: {
  payload: string;
  signature: string;
  secret: string;
}): boolean {
  if (!signature || !secret || !payload) return false;

  try {
    const expectedSignature = createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const providedBuffer = Buffer.from(signature, 'utf8');

    if (expectedBuffer.length !== providedBuffer.length) {
      return false;
    }

    // Constant-time comparison to prevent timing attacks
    return timingSafeEqual(expectedBuffer, providedBuffer);
  } catch {
    return false;
  }
}
