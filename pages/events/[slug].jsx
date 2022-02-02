import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

export default function EventPage({
    theEvent: {
        name,
    }
}) {
    return (
        <Layout>
            <h1>{name}</h1>
        </Layout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/events/`);
    const events = await res.json();

    const paths = events.map(evt => ({
        params: {
            slug: evt.slug,
        }
    }));

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({
    params: { slug }
}) {
    console.log({slug});
    const res = await fetch(`${API_URL}/api/events/${slug}`);
    const theEvent = await res.json();

    return {
        props: { theEvent: theEvent[0] },
        revalidate: 1,
    }
}
