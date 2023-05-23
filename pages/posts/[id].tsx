import "github-markdown-css/github-markdown-light.css";
import "highlight.js/styles/github.css";
import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import gfm from "remark-gfm";
import Navbar from "../../components/Navbar";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { PostData } from "../../types";

type Props = {
    postData: PostData;
};

export default function Post({ postData }: Props) {
    return (
        <div>
            <Navbar />

            <h1>{postData.title}</h1>
            <ReactMarkdown className="markdown-body" remarkPlugins={[gfm]} rehypePlugins={[rehypeHighlight]}>
                {postData.contentMarkdown || ""}
            </ReactMarkdown>
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
