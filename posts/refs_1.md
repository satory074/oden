---
title: "refs_1"
date: "2023-05-09"
---

## USER

markdown のコードに syntax highlight が適用する手順を教えて下さい

## ASSISTANT

To apply syntax highlighting to code blocks in markdown using the `react-markdown` package, you will need to install the `rehype-highlight` package, which is a plugin that adds syntax highlighting using the `lowlight` library. Follow these steps:

1. Install the required packages:

```bash
npm install rehype-highlight
```

2. Import the necessary modules at the top of your component file:

```javascript
import rehypeHighlight from "rehype-highlight";
```

3. Add the `rehypePlugins` prop to the `ReactMarkdown` component in your Post function component:

```javascript
<ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeHighlight]}>
    {postData.contentMarkdown || ""}
</ReactMarkdown>
```

Now, the `ReactMarkdown` component will apply syntax highlighting to code blocks in your markdown content.

For improved styling, you might also want to include a CSS theme for the syntax highlighting. You can pick a theme from the `highlight.js` library, which is used internally by `lowlight`. To include a theme, follow these steps:

1. Install the `highlight.js` package:

```bash
npm install highlight.js
```

2. Import a theme CSS file into your project, for example:

```javascript
import "highlight.js/styles/github.css";
```

Make sure to place this import statement at the top of your component file, or in your project's main CSS file. You can replace `'github.css'` with any other theme provided by the `highlight.js` library.
