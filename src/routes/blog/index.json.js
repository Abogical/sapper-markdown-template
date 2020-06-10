import posts from './_posts.js';

const metaPosts = {};
for (const [ slug, { meta } ] of Object.entries(posts))
	metaPosts[slug] = meta;

const contents = JSON.stringify(metaPosts);

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}