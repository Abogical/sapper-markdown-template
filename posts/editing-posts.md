---
title: Editing posts
---
Blog posts are under the `posts` folder as markdown files. Add or edit any markdown files under this folder to change the posts on this site.

The path of a post shown at the end of the URL (commonly called the slug) would be the filename of the markdown file. This post is at `posts/editing-posts.md`, thus its slug would be `editing-posts` as shown in the URL (`/blog/editing-posts`).

This site uses [`gray-matter`](https://npm.is/gray-matter) to extract post metadata and [`marked`](https://npm.is/marked) to parse the markdown file.

# Markdown file format
Metadata is written at the start of the markdown file between two triple dashes (`---`).
```
---
title: My first blog post!
---
```
This template currently only supports adding a title. More metadata features may come in the near future.

This is then followed by regular markdown. The markdown would follow any [specification `marked` implements](https://marked.js.org/#/README.md#specifications).

```
---
title: My first blog post!
---
Hi everyone! This my first blog post. Checkout my [latest video](https://youtu.be/dQw4w9WgXcQ)!
```
---
Are there any missing features or pesky bugs? Drop an issue or help out with a PR at https://github.com/Abogical/sapper-markdown-template
