// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.
import { resolve, join, basename } from 'path';
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import marked from 'marked';

const postsRoot = resolve('posts');
const posts = {};
for (const fileName of readdirSync(postsRoot)) {
	const { data, content } = matter(readFileSync(join(postsRoot, fileName)));
	posts[basename(encodeURIComponent(fileName), '.md')] = {
		meta: data,
		html: marked(content)
	};
}
export default posts;
