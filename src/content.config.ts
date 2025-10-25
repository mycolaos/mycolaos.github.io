import { defineCollection, z } from 'astro:content';

import { slug as githubSlug } from 'github-slugger';
import { glob } from 'astro/loaders';

interface GenerateIdOptions {
	/** The path to the entry file, relative to the base directory. */
	entry: string;

	/** The base directory URL. */
	base: URL;
	/** The parsed, unvalidated data of the entry. */
	data: Record<string, unknown>;
}

/** Generate a route ID ignoring any grouping parentheses in the file path. For
 * example:
 * - "/(2017)/my-post.md" -> "my-post"
 * - "/category/(2017)/nested-post.md" -> "category/nested-post"
 */
function generateRouteIdIgnoringGroups({ entry, base, data }: GenerateIdOptions) {
	const cleanEntry = entry.replace(/\([^\/]+\)\//g, '').replace(/\.[^/.]+$/, '').replace(/\//g, '\/');
	return cleanEntry.split('/').map((segment) => githubSlug(segment))
		.join('/');
}

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}', generateId: generateRouteIdIgnoringGroups }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			redditUrl: z.string().url().optional(),
		}),
});

export const collections = { blog };
