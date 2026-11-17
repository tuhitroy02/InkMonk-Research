/**
 * InkMonk Research — Server-Side File Upload Validator (Check 16)
 * Validates magic numbers (binary file signature), MIME types, and file size limits.
 */

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  detectedType?: string;
}

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB Limit

const ALLOWED_EXTENSIONS = new Set(['pdf', 'docx', 'doc', 'txt', 'rtf', 'tex', 'zip']);

export function validateFileUpload(
  buffer: Buffer,
  originalFilename: string,
  declaredMimeType?: string
): FileValidationResult {
  // 1. Check File Size
  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: 'File size exceeds maximum permitted limit of 50MB.' };
  }

  if (buffer.length === 0) {
    return { valid: false, error: 'Uploaded file is empty.' };
  }

  // 2. Check File Extension (Prevent Directory Traversal)
  const cleanName = originalFilename.replace(/[/\\?%*:|"<>]/g, '');
  const ext = cleanName.split('.').pop()?.toLowerCase();

  if (!ext || !ALLOWED_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `File extension .${ext} is not allowed. Only academic documents (.pdf, .docx, .doc, .tex, .zip) are accepted.`,
    };
  }

  // 3. Magic Number (Binary Signature) Verification
  const header = buffer.subarray(0, 8);

  // PDF signature: %PDF- (0x25 0x50 0x44 0x46)
  const isPdf = header[0] === 0x25 && header[1] === 0x50 && header[2] === 0x44 && header[3] === 0x46;

  // DOCX / ZIP signature: PK.. (0x50 0x4B 0x03 0x04)
  const isZipOrDocx = header[0] === 0x50 && header[1] === 0x4b && header[2] === 0x03 && header[3] === 0x04;

  // Legacy Word DOC: 0xD0 0xCF 0x11 0xE0
  const isDoc = header[0] === 0xd0 && header[1] === 0xcf && header[2] === 0x11 && header[3] === 0xe0;

  if (ext === 'pdf' && !isPdf) {
    return { valid: false, error: 'File claims to be a PDF but failed binary signature verification.' };
  }

  if (ext === 'docx' && !isZipOrDocx) {
    return { valid: false, error: 'File claims to be a DOCX document but failed binary signature verification.' };
  }

  if (ext === 'doc' && !isDoc) {
    return { valid: false, error: 'File claims to be a Word document but failed binary signature verification.' };
  }

  return {
    valid: true,
    detectedType: isPdf ? 'application/pdf' : isZipOrDocx ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : declaredMimeType || 'application/octet-stream',
  };
}
