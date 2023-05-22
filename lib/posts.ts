import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory).filter((fn) => fn.endsWith(".md"));
    const allPostData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const { data, content } = matter(fileContents);

        return {
            id,
            content,
            ...(data as { date: string; title: string }),
        };
    });

    return allPostData.sort((a, b) => {
        return a.date < b.date ? 1 : -1;
    });
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
        id,
        contentMarkdown: content,
        ...(data as { date: string; title: string }),
    };
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory).filter((fn) => fn.endsWith(".md"));

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}
