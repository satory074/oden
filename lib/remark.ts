import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import remarkPrism from "remark-prism";
import { unified } from "unified";

const markdownToHtml = async (markdown: string): Promise<string> => {
    const result = await unified().use(remarkParse).use(remarkPrism).use(remarkHtml).process(markdown);
    return result.toString();
};

export { markdownToHtml };
