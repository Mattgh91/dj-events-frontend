import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

export default function EventPage({
    theEvent: {
        name,
        id,
        date,
        time,
        performers,
        description,
        venue,
        address,
    },
    theEvent,
}) {
    const deleteEvent = () => console.log('delete');

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.control}>
                    <Link href={`/events/edit/${id}`}>
                        <a>Edit event <FaPencilAlt /></a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>Delete event <FaTimes /></a>
                </div>

                <span>{new Date(date).toLocaleDateString('en-GB')} at {time}</span>
                <h1>{name}</h1>
                {theEvent.image?.data?.attributes && (
                    <div className={styles.image}>
                        <Image src={theEvent.image.data.attributes.formats.large.url} width={960} height={600} />
                    </div>
                )}

                <h3>Performers:</h3>
                <p>{performers}</p>
                <h3>Venue: {venue}</h3>
                <p>{address}</p>

                <p>{description}</p>

                <Link href="/events">
                    <a className={styles.back}>{`<`} Back</a>
                </Link>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/events?[populate]=*`);
    const events = await res.json();

    const paths = events.data.map(evt => ({
        params: {
            slug: evt.attributes.slug
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
    const res = await fetch(`${API_URL}/api/events?[populate]=*&slug=${slug}`);
    const theEvent = await res.json();
    const findTheEvent = theEvent.data.filter(evt => evt.attributes.slug === slug);

    return {
        props: { theEvent: findTheEvent[0].attributes },
        revalidate: 1,
    }
}
