import Link from 'next/link';

import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function Home({ events }) {
    console.log('events: ', events);
    return (
        <Layout>
            <h1>Upcoming Events</h1>
            {events && events.length === 0 && <h2>No events to show</h2>}

            {events && events.map(evt => (
                <EventItem event={evt.attributes} key={evt.id} />
            ))}

            {events && events.length > 0 && (
                <Link href="/events">
                    <a className="btn-secondary">View all events</a>
                </Link>
            )}
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events?&[populate]=*`);
    console.log(res);
    const events = await res.json();
    console.log(events);

    return {
        props: { events: events.data },
        revalidate: 1, // tries to find if events have changed to save using getServerSideProps
    };
}
