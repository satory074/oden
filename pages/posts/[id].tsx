import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { PostData } from "../../types";

type Props = {
    postData: PostData;
};

export default function Post({ postData }: Props) {
    return (
        <div>
            <h1>{postData.title}</h1>
            <ReactMarkdown remarkPlugins={[gfm]}>{postData.contentMarkdown || ""}</ReactMarkdown>
            <br />
            {postData.date}
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params || typeof params.id !== "string") {
        return { notFound: true };
    }

    const postData = await getPostData(params.id as string);

    return {
        props: {
            postData,
        },
    };
};
