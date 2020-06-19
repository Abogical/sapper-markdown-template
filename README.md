# sapper-markdown-template

Unofficial markdown [sapper](https://github.com/sveltejs/sapper) template, available for Rollup and webpack.


## Getting started


### Using `degit`

[`degit`](https://github.com/Rich-Harris/degit) is a scaffolding tool that lets you create a directory from a branch in a repository. Use either the `rollup` or `webpack` branch in `sapper-markdown-template`:

```bash
# for Rollup
npx degit "Abogical/sapper-markdown-template#rollup" my-app
# for webpack
npx degit "Abogical/sapper-markdown-template#webpack" my-app
```


### Using GitHub templates

Alternatively, you can use GitHub's template feature with the [sapper-markdown-template-rollup](https://github.com/Abogical/sapper-markdown-template-rollup) or [sapper-markdown-template-webpack](https://github.com/Abogical/sapper-markdown-template-webpack) repositories.


### Running the project

However you get the code, you can install dependencies and run the project in development mode with:

```bash
cd my-app
npm install # or yarn
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help getting started.


## Structure

This template expects to find three directories in the root of your project —  `src`, `static`, and `content`.


### src

The [src](src) directory contains the entry points for your app — `client.js`, `server.js` and (optionally) a `service-worker.js` — along with a `template.html` file and a `routes` directory.


#### src/routes

This is the heart of your Sapper app. There are two kinds of routes — *pages*, and *server routes*.

**Pages** are Svelte components written in `.svelte` files. When a user first visits the application, they will be served a server-rendered version of the route in question, plus some JavaScript that 'hydrates' the page and initialises a client-side router. From that point forward, navigating to other pages is handled entirely on the client for a fast, app-like feel. (Sapper will preload and cache the code for these subsequent pages, so that navigation is instantaneous.)

**Server routes** are modules written in `.js` files, that export functions corresponding to HTTP methods. Each function receives Express `request` and `response` objects as arguments, plus a `next` function. This is useful for creating a JSON API, for example.

There are three simple rules for naming the files that define your routes:

* A file called `src/routes/about.svelte` corresponds to the `/about` route. A file called `src/routes/blog/[slug].svelte` corresponds to the `/blog/:slug` route, in which case `params.slug` is available to the route
* The file `src/routes/index.svelte` (or `src/routes/index.js`) corresponds to the root of your app. `src/routes/about/index.svelte` is treated the same as `src/routes/about.svelte`.
* Files and directories with a leading underscore do *not* create routes. This allows you to colocate helper modules and components with the routes that depend on them — for example you could have a file called `src/routes/_helpers/datetime.js` and it would *not* create a `/_helpers/datetime` route


### static

The [static](static) directory contains any static assets that should be available. These are served using [sirv](https://github.com/lukeed/sirv).

In your [service-worker.js](src/service-worker.js) file, you can import these as `files` from the generated manifest...

```js
import { files } from '@sapper/service-worker';
```

...so that you can cache them (though you can choose not to, for example if you don't want to cache very large files).

### content
All content are under the `content` folder as markdown files. Editing any markdown files under this folder will change the pages on this site. Adding folders will also create a heirarchy of pages.

The template creates JSON files for each markdown file. These store the parsing result of the markdown file. Their paths is the relative path from the `content` folder, excluding the `.md` extension. Folders also have a JSON file created for them, containing only the list of files and their metadata.

As an example, the current heirarchy of this site under the `content` folder is as follows:
- `about.md` (About page, controls `/about`, JSON at `/about.json`)
- `blog` (List of blogs, controls `/blog`, JSON at `blog.json`)
	- `editing-content.md` (Blog post, controls `/blog/editing-content`, JSON at `/blog/editing-content.json`)

A default blog page and about page is provided to preload these JSON files to render on this site. Feel free to customize or add more pages as needed.

#### Markdown file format
This site uses [`front-matter`](https://npmjs.com/package/front-matter) to extract post metadata and [`marked`](https://npmjs.com/package/marked) to parse the markdown file.

Metadata is written at the start of the markdown file between two triple dashes (`---`). The template supports the following metadata:

Name | Description | Default
---|---|---
title | Title of page| `undefined`
tags | Keywords of a page, seperated by commas | `undefined`
published_time|Date of published time. Must be parsable by [JavaScript's `Date.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) | File creation time.
modified_time | Date of modification time. Must be parsable by [JavaScript's `Date.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) | File modification time.


Example:
```
---
title: My first blog post!
published_time: 2007-07-07
modified_time: 2007-07-14
tags: personal, first, beginning
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
#### JSON Format
File format. See `/blog/editing-content.json` for an example.
```
{
	"meta": {
		<metadata of file1>
	},
	"html": "<HTML parsed from markdown>"
}
```
Folder format. Array of files is sorted by most recently published files first. See `blog.json` for an example.
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

## Bundler config

Sapper uses Rollup or webpack to provide code-splitting and dynamic imports, as well as compiling your Svelte components. With webpack, it also provides hot module reloading. As long as you don't do anything daft, you can edit the configuration files to add whatever plugins you'd like.


## Production mode and deployment

To start a production version of your app, run `npm run build && npm start`. This will disable live reloading, and activate the appropriate bundler plugins.

You can deploy your application to any environment that supports Node 10 or above. As an example, to deploy to [Vercel Now](https://vercel.com) when using `sapper export`, run these commands:

```bash
npm install -g now
now
```

If your app can't be exported to a static site, you can use the [now-sapper](https://github.com/thgh/now-sapper) builder. You can find instructions on how to do so in its [README](https://github.com/thgh/now-sapper#basic-usage).


## Using external components

When using Svelte components installed from npm, such as [@sveltejs/svelte-virtual-list](https://github.com/sveltejs/svelte-virtual-list), Svelte needs the original component source (rather than any precompiled JavaScript that ships with the component). This allows the component to be rendered server-side, and also keeps your client-side app smaller.

Because of that, it's essential that the bundler doesn't treat the package as an *external dependency*. You can either modify the `external` option under `server` in [rollup.config.js](rollup.config.js) or the `externals` option in [webpack.config.js](webpack.config.js), or simply install the package to `devDependencies` rather than `dependencies`, which will cause it to get bundled (and therefore compiled) with your app:

```bash
npm install -D @sveltejs/svelte-virtual-list
```


## Bugs and feedback

Are there any missing features or pesky bugs? Drop an issue or help out with a PR at https://github.com/Abogical/sapper-markdown-template
