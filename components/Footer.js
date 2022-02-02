import Link from 'next/link';

import styles from '../styles/Footer.module.css';

const Footer = () => (
    <header className={styles.footer}>
        <p>Copyright &copy; DJ Events</p>
        <div>
            <Link href="/about">About</Link>
        </div>
    </header>
);

export default Footer;