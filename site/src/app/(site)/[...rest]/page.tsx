import { notFound } from 'next/navigation';

/**
 * Any URL nothing else matched lands here and is handed to the (site)
 * group's not-found page, so a bad link gets the styled 404 with the header
 * and footer rather than the framework default.
 */
export default function CatchAll() {
  notFound();
}
