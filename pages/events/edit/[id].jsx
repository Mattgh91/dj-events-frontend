import * as React from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaImage } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '@/config/index';
import '@/components/Modal';
import Layout from '@/components/Layout';
import styles from '@/styles/Form.module.css';
import { formatDateForInput } from '@/utils/formatDateForInput'
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';

export default function EditEventsPage({ evt }) {
    const [values, setValues] = React.useState({
        name: evt.attributes.name,
        performers: evt.attributes.performers,
        venue: evt.attributes.venue,
        address: evt.attributes.address,
        date: formatDateForInput(evt.attributes.date),
        time: evt.attributes.time,
        description: evt.attributes.description,
    });
    const [imagePreview, setImagePreview] = React.useState((
        evt.attributes.image
            ? evt.attributes.image?.data?.attributes.formats.thumbnail.url
            : null
    ));
    const [showModal, setShowModal] = React.useState(false);

    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();

        // Valdiation
        const hasEmptyFields = Object.values(values).some(element => element === '');

        if (hasEmptyFields) {
            toast.error('Please fill in all fields...');
        }

        const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ data: values }),
        });

        if (!res.ok) {
            toast.error('Something went wrong. Oops!');
        } else {
            const event = await res.json();

            const { slug } = event.data.attributes

            router.push(`/events/${slug}`);
        }
    };

    const handleInputChange = e => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const imageUploaded = async () => {
        console.log('upload');
        const res = await fetch(`${API_URL}/api/events/${evt.id}?[populate]=*`);
        const data = await res.json();
        setImagePreview(data.data.attributes.image.data.attributes.formats.thumbnail.url);
        setShowModal(false);
    }

    React.useEffect(() => {
        console.log(imagePreview);
    }, [imagePreview]);

    return (
        <Layout title="Edit event">
            <Link href="/events">
                <a>{`<`} Go back</a>
            </Link>

            <h1>Edit Event</h1>

            <ToastContainer />

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='name'>Event Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input
                            type='text'
                            name='performers'
                            id='performers'
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input
                            type='text'
                            name='venue'
                            id='venue'
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={values.date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input
                            type='text'
                            name='time'
                            id='time'
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <input type='submit' value='Update Event' className='btn' />
            </form>

            <h2>Event Image</h2>
            {imagePreview ?
                <Image src={imagePreview} height={100} width={170} />
                : <p>No image found</p>
            }
            <div>
                <button onClick={() => setShowModal(!showModal)} className="btn-secondary">
                    <FaImage /> Set image
                </button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload
                    evtId={evt.id}
                    imageUploaded={imageUploaded}
                />
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({
    params: { id },
    req,
}) {
    const res = await fetch(`${API_URL}/api/events/${id}?[populate]=*`);
    const evt = await res.json();

    console.log(req.headers.cookie);

    return {
        props: {
            evt: evt.data
        }
    }
};
