declare module "react-syntax-highlighter" {
    import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
    export { SyntaxHighlighter as PrismAsyncLight };
}

declare module "react-syntax-highlighter/dist/cjs/languages/prism" {
    import { jsx } from "react-syntax-highlighter/dist/cjs/languages/prism/index";
    export { jsx };
}

declare module "react-syntax-highlighter/dist/cjs/styles/prism/nord" {
    import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism/nord";
    export { nord };
}
