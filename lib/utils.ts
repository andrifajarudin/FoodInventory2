// lib/utils.ts
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
}

export function formatDateOnly(date: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function generateId(prefix: string = 'ITEM'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
}

export function calculateDaysUntil(expiryDate: Date | string): number {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getStockStatus(current: number, min: number): {
  status: 'low' | 'warning' | 'good';
  color: string;
  text: string;
} {
  if (current <= min) {
    return { status: 'low', color: 'bg-red-100 text-red-800', text: 'Rendah' };
  }
  if (current <= min * 1.5) {
    return { status: 'warning', color: 'bg-yellow-100 text-yellow-800', text: 'Perhatian' };
  }
  return { status: 'good', color: 'bg-green-100 text-green-800', text: 'Aman' };
}
