import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import styles from '@/styles/Event.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

export default function EventPage({
    theEvent: {
        id,
        attributes: {
            name,
            date,
            time,
            performers,
            description,
            venue,
            address,
        },
    },
    theEvent,
}) {
    const router = useRouter();

    const deleteEvent = async () => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/api/events/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message)
            } else {
                router.push('/events');
            }
        }
    };

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
                <ToastContainer />

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

export async function getServerSideProps({
    params: { slug }
}) {
    const res = await fetch(`${API_URL}/api/events?&[populate]=*`);
    const events = await res.json();
    const findTheEvent = events.data.filter(evt => evt.attributes.slug === slug);

    return {
        props: { theEvent: findTheEvent[0] },
    }
};