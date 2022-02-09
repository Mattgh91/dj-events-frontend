import * as React from 'react';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

export default function ImageUpload({
    evtId,
    imageUploaded,
}) {
    const [image, setImage] = React.useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("files", image); // the image 
        formData.append("ref", "api::event.event"); // strapi content type
        formData.append("refId", evtId); // the id of the event
        formData.append("field", "image"); // the field name in strapi

        const res = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            // Toast error
            console.log('error');
        } else {
            console.log('uploading...');
            imageUploaded();
        }
    };

    const handleFileChange = e => {
        console.log(e.target.files[0]);

        setImage(e.target.files[0]);
    };

    React.useEffect(() => {
        console.log(image)
    }, [image]);


    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <input type="submit" value="Upload" className="btn" />
            </form>
        </div>
    );
}