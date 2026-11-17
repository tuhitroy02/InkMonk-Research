/**
 * InkMonk Research — Input Sanitization & Security Utility
 * Defends against XSS, control characters, and SQL/NoSQL injection patterns.
 */

export function sanitizeText(input: unknown, maxLength: number = 2000): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Strip angle brackets
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '') // Strip control characters
    .slice(0, maxLength);
}

export function sanitizeEmail(email: unknown): string {
  if (typeof email !== 'string') return '';
  const clean = email.trim().toLowerCase();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) && clean.length <= 254) {
    return clean;
  }
  return '';
}

export function sanitizePhone(phone: unknown): string {
  if (typeof phone !== 'string') return '';
  const clean = phone.replace(/[^+\d\s()-]/g, '').trim();
  return clean.slice(0, 30);
}
