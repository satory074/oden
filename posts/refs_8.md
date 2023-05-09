---
title: "refs_8"
date: "2023-05-09"
---

## USER

import { GetStaticProps } from "next";
import Link from "next/link";
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

これは index.tsx です。

ナビゲーションバーを作りたいのでその手順を教えて下さい。

## ASSISTANT

ナビゲーションバー（Navbar）の作成は、Next.js アプリケーションにおける一般的なコンポーネントです。以下の手順に従って Navbar を作成することができます：

**手順 1: コンポーネントの作成**
新しいコンポーネントを作成します。`components`という名前の新しいフォルダを作成し、その中に`Navbar.tsx`という新しいファイルを作成します。

**手順 2: Navbar コンポーネントの記述**
以下のように`Navbar.tsx`を記述します：

```tsx
import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                {/* Add more links as necessary */}
            </ul>
        </nav>
    );
}
```

上記のコードでは、`nav`要素の中にリンクのリストを作成しています。リンクは`Link`コンポーネントを使用して作成され、Next.js によって効率的なルーティングが行われます。

**手順 3: Navbar の利用**
そして、作成した Navbar コンポーネントをページに組み込みます。以下のように`index.tsx`を修正します：

```tsx
import { GetStaticProps } from "next";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import { PostData } from "../types";
import Navbar from "../components/Navbar"; // Add this line

type Props = {
    allPostsData: PostData[];
};

export default function Home({ allPostsData }: Props) {
    return (
        <div>
            <Navbar /> // Add this line
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
```

上記のように、`Navbar`コンポーネントをインポートし、`Home`コンポーネントのレンダリングメソッド内に`<Navbar />`を追加します。

以上で、ナビゲーションバーの作成とページへの組み込みが完了します。このナビゲーションバーは他のページでも使用することができ、そのためには同様にインポートして使用します。
