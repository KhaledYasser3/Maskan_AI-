/**
 * Currency and numbers formatting helpers
 */
export function formatCurrency(amount: number, currency = 'EGP'): string {
  if (isNaN(amount)) return `${currency} 0`;
  return `${currency} ${amount.toLocaleString('en-US')}`;
}

export function formatPerStudentShare(totalRent: number, studentsCount: number): string {
  if (!studentsCount || studentsCount <= 0) return formatCurrency(totalRent);
  const share = Math.round(totalRent / studentsCount);
  return formatCurrency(share);
}

export function formatWalkingTime(minutes: number): string {
  if (minutes <= 1) return '1 min walk';
  return `${minutes} min walk`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  } catch {
    return dateString;
  }
}
