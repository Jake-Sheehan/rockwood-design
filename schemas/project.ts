import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',

    fields: [
        // ─────────── Basic Info ───────────
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required().min(3),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'summary',
            title: 'Summary',
            type: 'text',
            rows: 3,
            description: 'Short description used on project cards or previews.',
            validation: (Rule) => Rule.max(280),
        }),

        defineField({
            name: 'body',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),

        // ─────────── Media ───────────
        defineField({
            name: 'hero',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            options: { layout: 'grid' },
        }),

        // ─────────── Metadata ───────────
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Concept', value: 'concept' },
                    { title: 'In Progress', value: 'in_progress' },
                    { title: 'Completed', value: 'completed' },
                ],
                layout: 'radio',
            },
            initialValue: 'completed',
        }),

        defineField({
            name: 'featured',
            title: 'Featured Project',
            type: 'boolean',
            description: 'Toggle this on to show the project on the home page.',
            initialValue: false,
        }),

        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'projectCategory' }] }],
        }),
    ],

    orderings: [
        {
            title: 'Newest first',
            name: 'newest',
            by: [{ field: 'endDate', direction: 'desc' }],
        },
        {
            title: 'Title A→Z',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
    ],

    preview: {
        select: {
            title: 'title',
            media: 'hero',
            status: 'status',
            featured: 'featured',
        },
        prepare: ({ title, media, status, featured }) => ({
            title,
            media,
            subtitle: [
                featured ? '⭐ Featured' : '',
                status && status.replace('_', ' '),
            ]
                .filter(Boolean)
                .join(' • '),
        }),
    },
});
