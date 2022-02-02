import Link from 'next/link';

import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function Home({ events }) {
    return (
        <Layout>
            <h1>Upcoming Events</h1>
            {events.length === 0 && <h2>No events to show</h2>}

            {events.map(evt => (
                <EventItem event={evt} key={evt.id} />
            ))}

            {events.length > 0 && (
                <Link href="/events">
                    <a className="btn-secondary">View all events</a>
                </Link>
            )}
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();

    return {
        props: { events: events.slice(0, 3) },
        revalidate: 1, // tries to find if events have changed to save using getServerSideProps
    };
}
