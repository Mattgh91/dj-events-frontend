import Link from 'next/link';
import Image from 'next/image';

import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function EventsPage({ events }) {
    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h2>No events to show</h2>}

            {events.map(evt => (
                <EventItem event={evt} key={evt.id} />
            ))}
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();

    return {
        props: { events },
        revalidate: 1, // tries to find if events have changed to save using getServerSideProps
    };
}
