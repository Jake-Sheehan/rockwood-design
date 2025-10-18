import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'projectCategory', // ← MUST match the reference name
    title: 'Project Category',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (R) => R.required(),
        }),
        defineField({ name: 'description', type: 'text' }),
    ],
});
