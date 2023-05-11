import { GetStaticProps } from "next";
import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import PostsList from "../components/PostsList";
import { getSortedPostsData } from "../lib/posts";
import styles from "../styles/Home.module.scss";
import { PostData } from "../types";

type Props = {
    allPostsData: PostData[];
};

export default function Home({ allPostsData }: Props) {
    return (
        <div className={styles.container}>
            <Navbar />

            <div className={styles.content}>
                <MainContent />
                <PostsList allPostsData={allPostsData} />
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
};
