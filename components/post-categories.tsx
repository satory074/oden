import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "styles/post-categories.module.css";

export default function PostCategories({ categories }: any) {
    return (
        <div className={styles.flexContainer}>
            <h3 className={styles.heading}>
                <FontAwesomeIcon icon={faFolderOpen} />
                <span className="sr-only">Categories</span>
            </h3>

            <ul className={styles.list}>
                {categories.map(({ name, slug }: any) => (
                    <li key={slug}>
                        <Link href={`/blog/category/${slug}`} legacyBehavior>{name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
