import Link from "next/link";
import { PostData } from "../types";

type Props = {
    allPostsData: PostData[];
};

const PostsList = ({ allPostsData }: Props) => {
    return (
        <div>
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
};

export default PostsList;
