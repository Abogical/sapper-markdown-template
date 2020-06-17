---
title: Editing content
published_time: 2020-06-10
modified_time: 2020-06-17
---
All content are under the `content` folder as markdown files. Editing any markdown files under this folder will change the pages on this site. Adding folders will also create a heirarchy of pages.

The template creates JSON files for each markdown file. These store the parsing result of the markdown file. Their paths is the relative path from the `content` folder, excluding the `.md` extension. Folders also have a JSON file created for them, containing only the list of files and their metadata.

As an example, the current heirarchy of this site under the `content` folder is as follows:
- `about.md` (About page, controls [`/about`](/about), JSON at [`/about.json`](/about.json))
- `blog` (List of blogs, controls [`/blog`](/blog), JSON at [`blog.json`](/blog.json))
	- `editing-content.md` (This post, controls [`/blog/editing-content`](/blog/editing-content), JSON at [`/blog/editing-content.json`](/blog/editing-content.json))

A default blog page and about page is provided to preload these JSON files to render on this site. Feel free to customize or add more pages as needed.

# Markdown file format
This site uses [`front-matter`](https://npmjs.com/package/front-matter) to extract post metadata and [`marked`](https://npmjs.com/package/marked) to parse the markdown file.

Metadata is written at the start of the markdown file between two triple dashes (`---`). The template supports the following metadata:

Name | Description | Default
---|---|---
title | Title of page| `undefined`
published_time|Date of published time. Must be parsable by [JavaScript's `Date.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) | File creation time.
modified_time | Date of modification time. Must be parsable by [JavaScript's `Date.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) | File modification time.


Example:
```
---
title: My first blog post!
published_time: 2007-07-07
modified_time: 2007-07-14
---
```

This is then followed by regular markdown. The markdown would follow any [specification `marked` implements](https://marked.js.org/#/README.md#specifications).

```
---
title: My first blog post!
published_time: 2007-07-07
modified_time: 2007-07-14
---
Hi everyone! This my first blog post. Checkout my [latest video](https://youtu.be/dQw4w9WgXcQ)!
```
# JSON Format
File format. See [`/blog/editing-content.json`](/blog/editing-content.json) for an example.
```
{
	"meta": {
		<metadata of file1>
	},
	"html": "<HTML parsed from markdown>"
}
```
Folder format. Array of files is sorted by most recently published files first. See [`blog.json`](/blog.json) for an example.
```
[
	"<file1>", {
		<metadata of file1>
	},
	"<file2>", {
		<metadata of file2>
	}
	...
]
```
For now, folders will be first in the array, with an undefined order between them. This may change in the future.

---
Are there any missing features or pesky bugs? Drop an issue or help out with a PR at https://github.com/Abogical/sapper-markdown-template
