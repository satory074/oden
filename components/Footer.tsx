import { FaFire, FaGithub, FaMeteor, FaSoundcloud, FaTwitter } from "react-icons/fa";
import { SiZenn } from "react-icons/si";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a className={styles.link} href="https://github.com/satory074" target="_brank" rel="noopener noreferrer">
                <FaGithub size={32} />
            </a>

            <a className={styles.link} href="https://zenn.dev/satory074" target="_brank" rel="noopener noreferrer">
                <SiZenn size={32} />
            </a>

            <a
                className={styles.link}
                href="https://sizu.me/satory074"
                target="_brank"
                rel="noopener noreferrer"
            >
                <FaFire size={32} />
            </a>

            <a className={styles.link} href="https://twitter.com/satory074" target="_brank" rel="noopener noreferrer">
                <FaTwitter size={32} />
            </a>

            <a className={styles.link} href="https://soundcloud.com/satory43" target="_brank" rel="noopener noreferrer">
                <FaSoundcloud size={32} />
            </a>

            <a
                className={styles.link}
                href="https://jp.finalfantasyxiv.com/lodestone/character/27095571/"
                target="_brank"
                rel="noopener noreferrer"
            >
                <FaMeteor size={32} />
            </a>
        </footer>
    );
};

export default Footer;
