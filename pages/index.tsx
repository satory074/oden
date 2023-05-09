import { GetStaticProps } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { getSortedPostsData } from "../lib/posts";
import { PostData } from "../types";

type Props = {
    allPostsData: PostData[];
};

export default function Home({ allPostsData }: Props) {
    return (
        <div>
            <Navbar />

            <h1>My Blog</h1>

            <ul>
                {allPostsData.map(({ id, date, title }) => (
                    <li key={id}>
                        <Link href={`/posts/${id}`}>
                            <span>{title}</span>
                        </Link>
                        <br />
                        <small>{date}</small>
                    </li>
                ))}
            </ul>
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
