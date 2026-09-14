export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function isValidEgyptianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, '');
  return /^(\+20|0)?1[0125][0-9]{8}$/.test(cleaned);
}

export function validateFileSize(file: File, maxMb = 10): boolean {
  return file.size <= maxMb * 1024 * 1024;
}
