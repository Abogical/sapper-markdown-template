<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		data.meta.formatted_published_time = new Date(data.meta.published_time).toLocaleDateString();
		data.meta.formatted_modified_time = new Date(data.meta.modified_time).toLocaleDateString();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside article
	*/
	article :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	article :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	article :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	article :global(ul) {
		line-height: 1.5;
	}

	article :global(li) {
		margin: 0 0 0.5em 0;
	}

	article :global(table) {
		border-collapse: collapse;
		border-spacing: 0;
	}

	article :global(td, th) {
		padding: 1em;
	}

	article :global(thead) {
		border-bottom: solid rgb(255,62,0) 1px;
	}

	article :global(td + td, th + th) {
		border-left: solid rgb(255,62,0) 1px;
	}

	article :global(tr:nth-child(2n)) {
		background: rgba(255, 62, 0, 0.1);
	}

	header p {
		font-style: italic;
	}
</style>

<svelte:head>
	<title>{post.meta.title}</title>
	<meta property="og:type" content="article"/>
	<meta property="og:article:published_time" content={post.meta.published_time}/>
	<meta property="og:article:modified_time" content={post.meta.modified_time}/>
</svelte:head>

<article>
	<header>
		<h1>{post.meta.title}</h1>
		<p>
			Published on <time datetime={post.meta.published_time}>{post.meta.formatted_published_time}</time>
			{#if post.meta.published_time !== post.meta.modified_time}
				| Last modified on
				<time datetime={post.meta.modified_time}>{post.meta.formatted_modified_time}</time>
			{/if}
		</p>
	</header>
	{@html post.html}
</article>
