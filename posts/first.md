---
title: "First"
date: "2023-04-25"
---

Person:

-   React(TypeSctipt, Next.js)の Web サイトで、Markdown 形式のブログを作成する場合の手順を教えて下さい。

ChatGPT:

-   React(TypeScript, Next.js)を使用して Markdown 形式のブログを作成するには、以下の手順に従ってください。

1. 環境の準備:
   最初に、Node.js がインストールされていることを確認してください。もしインストールされていなければ、[Node.js 公式サイト](https://nodejs.org/) からダウンロードしてインストールしてください。
2. Next.js プロジェクトの作成:
   コマンドラインで以下のコマンドを実行して、新しい Next.js プロジェクトを作成します。

```zsh
npx create-next-app --typescript your-blog-name
cd your-blog-name
```

1. 必要なパッケージのインストール:
   Markdown のレンダリングには`remark`と`remark-html`、ファイルシステムへのアクセスには`gray-matter`を使用します。これらのパッケージをインストールします。

```zsh
npm install remark remark-html gray-matter
npm install remark-parse remark-rehype
npm install rehype-stringify
```

1. Markdown ファイルの用意:
   `posts`ディレクトリを作成し、その中に Markdown 形式のブログ記事を格納します。例えば、`posts/first-post.md`のようにしてください。
2. Markdown データの取得:
   `lib`ディレクトリを作成し、その中に`posts.ts`ファイルを作成します。このファイルでは、Markdown ファイルを取得し、メタデータと本文をパースする処理を行います。以下のコードを追加してください。

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
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

    return allPostsData.sort((a, b) => {
        return a.date < b.date ? 1 : -1;
    });
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...(data as { date: string; title: string }),
    };
}
```

1. ブログ記事一覧ページの作成:
   `pages`ディレクトリ内に`index.tsx`ファイルがあることを確認し、`pages/index.tsx`ファイルを編集して、`getSortedPostsData`を使用して記事データを取得し、表示します。

```typescript
import { GetStaticProps } from "next";
import { getSortedPostsData } from "../lib/posts";
import { PostData } from "../types";

type Props = {
    allPostsData: PostData[];
};

export default function Home({ allPostsData }: Props) {
    return (
        <div>
            <h1>My Blog</h1>
            <ul>
                {allPostsData.map(({ id, date, title }) => (
                    <li key={id}>
                        {title}
                        <br />
                        {id}
                        <br />
                        {date}
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
```

1. 個別のブログ記事ページの作成:
   `pages/posts/[id].tsx`ファイルを作成し、以下のコードを追加して、個別のブログ記事ページを作成します。

```typescript
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { PostData } from "../../types";

type Props = {
    postData: PostData;
};

export default function Post({ postData }: Props) {
    return (
        <div>
            <h1>{postData.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
    const postData = await getPostData(params.id as string);
    return {
        props: {
            postData,
        },
    };
};
```

1. `getAllPostIds`関数の追加:
   先程作成した`lib/posts.ts`に、以下の`getAllPostIds`関数を追加します。この関数は、すべてのブログ記事の ID を取得します。

```typescript
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}
```

1. 型定義の追加:
   `types.ts`ファイルを作成し、以下の型定義を追加します。

```typescript
export type PostData = {
    id: string;
    title: string;
    date: string;
    contentHtml?: string;
};
```

1. 開発サーバーの起動:
   開発サーバーを起動して、ブログが正しく表示されることを確認します。

```zsh
npm run dev
```

ブラウザで`http://localhost:3000`にアクセス

Person:

-   types.ts はどの階層に作成しますか？

ChatGPT:

-   `types.ts`ファイルは、プロジェクトのルートディレクトリ（`pages`や`lib`ディレクトリと同じ階層）に作成するのが一般的です。これにより、共通の型定義が一か所にまとまり、プロジェクト全体で利用しやすくなります。

プロジェクトの構造は以下のようになります。

```text

my-blog/
├── node_modules/
├── pages/
│   ├── index.tsx
│   └── posts/
│       └── [id].tsx
├── public/
├── lib/
│   └── posts.ts
├── types.ts
├── package.json
└── next.config.js
```

-   Markdown の例を示してください

ChatGPT:

-   Markdown は、プレーンテキスト形式で文書を記述し、HTML に変換するための軽量マークアップ言語です。以下に、Markdown の例を示します。

````markdown
---
title: "My Sample Blog Post"
date: "2023-04-25"
---

# My Sample Blog Post

This is a sample blog post written in Markdown format.

## Introduction

Markdown allows you to write using an easy-to-read, easy-to-write plain text format, and then convert it to HTML.

### Markdown Syntax

Here are some examples of common Markdown syntax:

-   **Bold text**: `**Bold text**`
-   _Italic text_: `*Italic text*`
-   [Link](https://www.example.com): `[Link](https://www.example.com)`
-   `Inline code`: `` `Inline code` ``

#### Lists

You can create unordered lists:

-   Item 1
-   Item 2
    -   Sub-item 2.1
    -   Sub-item 2.2
-   Item 3

Or ordered lists:

1. Step 1
2. Step 2
    1. Sub-step 2.1
    2. Sub-step 2.2
3. Step 3

##### Code Blocks

You can create code blocks by using triple backticks:

\```javascript
function helloWorld() {
console.log("Hello, world!");
}
\```

###### Blockquotes

You can create blockquotes using the `>` symbol:

> This is a blockquote.

That's it! This is a simple example of a Markdown document.
````

この Markdown ファイルは、タイトル、日付、見出し、リンク、リスト、コードブロック、インラインコード、太字、斜体、引用など、Markdown の基本的な構文を使用しています。このような Markdown ファイルは、HTML に変換され、ブログ記事やウェブページとして表示することができます。
