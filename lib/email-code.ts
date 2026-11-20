import type { Prisma } from '@prisma/client';
import { authHash } from '@/lib/client-auth';

export type CodePurpose = 'login' | 'signup' | 'reset';

export function codeKey(email: string, purpose: CodePurpose) {
  return purpose + ':' + email;
}

export async function consumeCode(tx: Prisma.TransactionClient, email: string, code: string, purpose: CodePurpose) {
  if (!/^\d{6}$/.test(code)) return false;
  const emailKey = codeKey(email, purpose);
  const codeHash = authHash(emailKey + ':' + code);
  const active = { email: emailKey, expiresAt: { gt: new Date() }, attempts: { lt: 5 } };
  const deleted = await tx.emailLoginCode.deleteMany({ where: { ...active, codeHash } });
  if (deleted.count) return true;
  await tx.emailLoginCode.updateMany({
    where: { ...active, codeHash: { not: codeHash } },
    data: { attempts: { increment: 1 } },
  });
  return false;
}
