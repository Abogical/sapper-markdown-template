---
title: Editing content
---
All contents are under the `contents` folder as markdown files. Editing any markdown files under this folder will change the pages on this site. Adding folders will also create a heirarchy of pages.

The template creates JSON files for each markdown file. These store the parsing result of the markdown file. Their paths is the relative path from the `contents` folder, excluding the `.md` extension. Folders also have a JSON file created for them, containing only the list of files and their metadata.

As an example, the current heirarchy of this site under the `contents` folder is as follows:
- `about.md` (About page, controls [`/about`](/about), JSON at [`/about.json`](/about.json))
- `blog` (List of blogs, controls [`/blog`](/blog), JSON at [`blog.json`](/blog.json))
	- `editing-content.md` (This post, controls [`/blog/editing-content`](/blog/editing-content), JSON at [`/blog/editing-content.json`](/blog/editing-content.json))

A default blog page and about page is provided to preload these JSON files to render on this site. Feel free to customize or add more pages as needed.

# Markdown file format
This site uses [`gray-matter`](https://npm.is/gray-matter) to extract post metadata and [`marked`](https://npm.is/marked) to parse the markdown file.

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
# JSON Format
File format. See [`/blog/editing-content.json`](/blog/editing-content.json) for an example.
```JSON
{
	"meta": {
		<metadata of file1>
	},
	"html": "<HTML parsed from markdown>"
}
```
Folder format. See [`blog.json`](/blog.json) for an example.
```JSON
{
	"<file1>": {
		<metadata of file1>
	},
	"<file2>": {
		<metadata of file2>
	}
	...
}
```
---
Are there any missing features or pesky bugs? Drop an issue or help out with a PR at https://github.com/Abogical/sapper-markdown-template
