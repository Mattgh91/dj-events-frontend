import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import Pagination from '@/components/Pagination';
const PER_PAGE = 2;

export default function EventsPage({ events, total, page}) {
    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h2>No events to show</h2>}

            {events.map(evt => (
                <EventItem event={evt.attributes} key={evt.id} />
            ))}

            <Pagination page={page} total={total} perPage={PER_PAGE} />
        </Layout>
    )
}

export async function getServerSideProps({ query: { page = 1 } }) {
    // calculate the start page
    const start = Number(page) === 1 ? 0 : (Number(page) - 1) * PER_PAGE;

    const res = await fetch(`${API_URL}/api/events?pagination[start]=${start}&pagination[limit]=${PER_PAGE}&pagination[withCount]=true&[populate]=*`);
    const events = await res.json();

    console.log({ events });

    return {
        props: {
            events: events.data,
            total: events.meta.pagination.total,
            page: Number(page),
        },
    };
}
