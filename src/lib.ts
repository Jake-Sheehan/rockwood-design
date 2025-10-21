// src/lib.ts
import type { Project } from '../sanity.types.ts';
import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

/** Accept full Sanity image objects (or refs). Don't type as string. */
export function urlFor(source: any) {
    return builder.image(source);
}

/** View-model types that match your GROQ projections */
export type CategoryProj = { title?: string; slug?: string };

export type ProjectCard = Omit<Project, 'slug'> & {
    // we alias slug.current -> string in list queries so it's easier to use in routes
    slug?: string;
};

export type ProjectView = Omit<Project, 'slug' | 'categories'> & {
    slug?: string; // alias of slug.current
    categories?: CategoryProj[]; // dereferenced categories
};

/** Fetch all projects (optionally only featured) */
export async function getAllProjects({ featuredOnly = false } = {}): Promise<
    ProjectCard[]
> {
    const filter = featuredOnly ? ' && featured == true' : '';
    return sanityClient.fetch<ProjectCard[]>(
        `*[_type == "project"${filter}] | order(title asc) {
      _id,
      title,
      "slug": slug.current,   // <- alias to string for convenience
      summary,
      hero,
      featured,
      status
    }`
    );
}

/** Fetch a single project by slug */
export async function getProjectBySlug(
    slug: string
): Promise<ProjectView | null> {
    return sanityClient.fetch<ProjectView>(
        `*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,   // <- alias to string
      summary,
      body,
      hero,
      gallery,
      featured,
      status,
      categories[]->{ title, "slug": slug.current },  // <- deref + alias
      externalUrl
    }`,
        { slug }
    );
}

/** Get only featured projects (for the homepage, etc.) */
export async function getFeaturedProjects(): Promise<ProjectView[]> {
    return sanityClient.fetch<ProjectView[]>(
        `*[_type == "project" && featured == true] | order(title asc){
      _id,
      title,
      "slug": slug.current,
      summary,
      hero,
      status,
      featured,
      categories[]->{ title, "slug": slug.current },
      externalUrl
    }`
    );
}
