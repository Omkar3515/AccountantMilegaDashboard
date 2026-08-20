import type { LucideIcon } from 'lucide-react';

export interface CompanyDetailItem {
  label: string;
  value: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  link?: boolean;
}

export interface CompletionStepItem {
  label: string;
  status: string;
  type: 'done' | 'add' | 'verify';
}
