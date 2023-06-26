import styles from "../styles/MainContent.module.scss";

const MainContent = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Blog</h1>
            <p className={styles.description}>This is my blog.</p>

            <h2 className={styles.subtitle}>Github</h2>
            <a href="https://github.com/satory074" target="_blank">
                <img src="https://grass-graph.appspot.com/images/satory074.png" />
            </a>

            <h2 className={styles.subtitle}></h2>
        </div>
    );
};

export default MainContent;
