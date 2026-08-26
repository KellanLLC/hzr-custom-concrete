import type { PanelData, ReviewRequest } from '@/lib/panel-types';
import { guarded } from '@/lib/server/auth';
import { afterResponse, db } from '@/lib/server/env';
import { keepClockRunning } from '@/lib/server/followups';
import { json } from '@/lib/server/http';
import { listQuotes } from '@/lib/server/quotes';
import { REVIEW_COLUMNS } from '@/lib/server/reviews';
import { readSettings } from '@/lib/server/settings';

export const dynamic = 'force-dynamic';

/** Everything the panel renders, in one round trip. */
export const GET = guarded(async () => {
  const [quotes, reviews, settings] = await Promise.all([
    listQuotes(),
    db().prepare(`SELECT ${REVIEW_COLUMNS} FROM review_requests ORDER BY id DESC LIMIT 500`).all<ReviewRequest>(),
    readSettings(),
  ]);
  afterResponse(keepClockRunning(), 'clock');
  const data: PanelData = { quotes, reviews: reviews.results || [], settings };
  return json(data);
});
