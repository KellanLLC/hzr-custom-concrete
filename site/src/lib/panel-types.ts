/**
 * The shapes the panel API returns. Shared by the route handlers (server) and
 * the panel UI (client), so a column added in one place is typed in the other.
 */

export type QuoteStatus = 'new' | 'contacted' | 'scheduled' | 'done';
export const QUOTE_STATUSES: { key: QuoteStatus; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'done', label: 'Done' },
];

export type SpecRow = { key: string; value: string };

export type Quote = {
  id: number;
  product: string;
  spec: SpecRow[];
  price: string | null;
  name: string;
  phone: string;
  phone_raw: string | null;
  email: string | null;
  town: string | null;
  notes: string | null;
  source: 'estimate' | 'contact' | 'service';
  status: QuoteStatus;
  note: string | null;
  /** Set when the spam trap caught it: what caught it, and (from the AI) why.
      A flagged row is hidden from Requests and shown behind "Check spam". */
  spam_via: string | null;
  spam_reason: string | null;
  created_at: string;
};

export type ReviewRequest = {
  id: number;
  quote_id: number | null;
  name: string | null;
  phone: string;
  message: string;
  status: 'sent' | 'failed';
  error: string | null;
  token: string | null;
  clicked_at: string | null;
  rating: number | null;
  feedback: string | null;
  step: number;
  next_due_at: string | null;
  stopped_at: string | null;
  stop_reason: string | null;
  created_at: string;
};

export type PanelData = {
  quotes: Quote[];
  reviews: ReviewRequest[];
  settings: Record<string, string>;
};
