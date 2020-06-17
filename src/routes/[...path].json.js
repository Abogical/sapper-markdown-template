// Extract and parse all the content on the content folder

import { readdir, readFile, stat } from 'fs';
import { promisify } from 'util';
import { resolve, join, basename } from 'path';
import matter from 'front-matter';
import marked from 'marked';

const readdirPromise = promisify(readdir);
const readFilePromise = promisify(readFile);
const statPromise = promisify(stat)

const contentLoader = async (parent) => {
	const res = {};
	for (const entry of await readdirPromise(parent, { withFileTypes: true })) {
		const absPath = join(parent, entry.name);
		if (entry.isDirectory())
			res[entry.name] = contentLoader(absPath);
		else {
			res[basename(entry.name, '.md')] = (async () => {
				const { attributes, body } = matter(await readFilePromise(absPath, 'utf-8'), { allowUnsafe: true });
				let statResult;
				const getStat =  () => {
					if(statResult === undefined)
						statResult = statPromise(absPath);
					return statResult;
				}
				attributes.published_time = attributes.published_time? new Date(attributes.published_time) : (await getStat()).birthtime;
				attributes.modified_time = attributes.modified_time? new Date(attributes.modified_time) : (await getStat()).mtime;
				return {
					meta: attributes,
					html: marked(body)
				}
			})()
		};
	};
	return res;
};

const content = contentLoader(resolve('content'));

export const get = async (req, res) => {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { path } = req.params;

	let page = await content;
	for (const subpath of path) {
		page = await page[subpath];
		if (!Boolean(page)) {
			res.writeHead(404, {
				'Content-Type': 'application/json'
			});

			res.end(JSON.stringify({
				message: `Not found`
			}));

			return;
		}
	}

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	// Single pages have an html child. If it's a list and not a single page, show only the metadata
	let result;
	if (page.html)
		result = page;
	else {
		result = {};
		for (const [key, entry] of Object.entries(page)) {
			const entryRes = await entry;
			result[key] = entryRes.meta || entryRes;
		}
	}

	res.end(JSON.stringify(result));
};