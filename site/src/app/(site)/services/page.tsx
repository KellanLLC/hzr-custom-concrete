import { redirect } from 'next/navigation';

/** The services hub is the home page's own grid; there is no separate page. */
export default function Services() {
  redirect('/#services');
}
