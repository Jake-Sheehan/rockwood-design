// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
    name: 'rockwood-design-marketing-site',
    title: 'Rockwood Design Studio',
    projectId: 'yva6eoay',
    dataset: 'production',
    plugins: [structureTool()],
    schema: { types: schemaTypes },
});
