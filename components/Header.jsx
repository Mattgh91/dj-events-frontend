import Link from 'next/link';

import styles from '@/styles/Header.module.css';

const Header = () => (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link href="/" >
                <a className="">DJ Events</a>
            </Link>
        </div>

        <nav>
            <ul>
                <li>
                    <Link href="/events">
                        <a>Events</a>
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;