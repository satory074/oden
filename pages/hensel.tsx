import Link from "next/link";
import Navbar from "../components/Navbar";
import { getSortedPostsData } from "../lib/posts";
import { PostData } from "../types";

type Props = {
    allPostsData: PostData[];
};

export default function Articles({ allPostsData }: Props) {
    return (
        <div>
            <Navbar />

            <div>
                <h1>Hensel</h1>
                <p>備忘録に近い記事一覧</p>
            </div>

            {allPostsData.map(({ id, date, title }) => (
                <div key={id}>
                    <Link href={`/posts/${id}`}>
                        <h2>{title}</h2>
                    </Link>

                    <small>{date}</small>
                </div>
            ))}
        </div>
    );
}

export const getStaticProps = async () => {
    const allPostsData = getSortedPostsData();

    return {
        props: {
            allPostsData,
        },
    };
};
