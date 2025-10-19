import projects from './mockProjects.json';
import type { Project } from '../sanity.types.ts';
import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}

/** Fetch all projects (optionally only featured) */
export async function getAllProjects({ featuredOnly = false } = {}): Promise<
    Project[]
> {
    const filter = featuredOnly ? ' && featured == true' : '';
    return sanityClient.fetch(`
    *[_type == "project"${filter}] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      hero,
      featured,
      status
    }
  `);
}

/** Fetch a single project by slug */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
    return sanityClient.fetch(
        `
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      summary,
      body,
      hero,
      gallery,
      featured,
      status,
      categories[]-> { title, "slug": slug.current },
      externalUrl
    }
  `,
        { slug }
    );
}

/** Get only featured projects (for the homepage, etc.) */
export async function getFeaturedProjects(): Promise<Project[]> {
    return sanityClient.fetch(`
    *[_type == "project" && featured == true]
    | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      hero,
      status,
      featured,
      categories[]-> { title, "slug": slug.current },
      externalUrl
    }
  `);
}

export function getProjects() {
    return projects;
}
