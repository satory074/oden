import Link from "next/link";
import styles from "../styles/navbar.module.scss";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link href="/">
                        <span>Home</span>
                    </Link>
                </li>
                {/* Add more links as necessary */}
            </ul>
        </nav>
    );
}
