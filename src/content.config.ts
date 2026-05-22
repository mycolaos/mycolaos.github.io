import { defineCollection, type SchemaContext } from 'astro:content';
import { slug as githubSlug } from 'github-slugger';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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

const schema = ({ image }: SchemaContext) =>
	z.object({
		title: z.string(),
		description: z.string(),
		excerpt: z.string().optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		redditUrl: z.string().url().optional(),
	})

const zDateRange = z.tuple([
	// Description of working period/
	z.string(),
	// Starting date.
	z.coerce.date(),
	// End date.
	z.coerce.date()
])

const projectSchema = (context: SchemaContext) => schema(context).extend({
	// Tech stack
	techStack: z.array(z.string()),
	// My role in the development.
	roles: z.array(z.enum(['Product', 'Engineering', 'Design', 'Research', 'Writing'])),
	// Link to the project own domain, download url, store page or github url.
	projectUrl: z.string().optional(),
	// Working periods.
	periodOfActiveDev: z.array(zDateRange),
	/**
	 * Notes for the status meanings:
	 * 
	 * live - is deployed and used.
	 * prototype - validation.
	 * experimental - what if I try this?
	 * in development - is currently under development.
	 * discontinued - direction abandoned.
	 * stable - for github packages. 
	 */
	status: z.enum(['live', 'prototype', 'experimental', 'in development', 'discontinued', 'stable']),
	/**
	 * active - currently working on.
	 * on hold - paused development or maintanance.
	 * finished - I achieved what I wanted.
	 * archived - not planning to work on in the near future.
	 */
	activity: z.enum(['active', 'on hold', 'finished', 'archived'])
})

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}', generateId: generateRouteIdIgnoringGroups }),
	// Type-check frontmatter using a schema
	schema,
});

const demos = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/demos', pattern: '**/*.{md,mdx}', generateId: generateRouteIdIgnoringGroups }),
	// Type-check frontmatter using a schema
	schema,
});

const projects = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}', generateId: generateRouteIdIgnoringGroups }),
	// Type-check frontmatter using a schema
	schema: projectSchema,
});

export const collections = { blog, demos, projects };
