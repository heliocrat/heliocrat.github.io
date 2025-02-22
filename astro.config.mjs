// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
    image: {
        service: passthroughImageService(),
    },
    integrations: [starlight({
        title: 'Heliocrat',
        social: {
            github: 'https://github.com/heliocrat',
        },
        sidebar: [
            {
                label: 'Web Games',
                autogenerate: { directory: 'games' },
            },
            {
                label: 'Lab Bench',
                autogenerate: { directory: 'lab' },
            },
            // {
            //     label: 'Guides',
            //     items: [
            //         // Each item here is one entry in the navigation menu.
            //         { label: 'Example Guide', slug: 'guides/example' },
            //     ],
            // },
        ],
		}), solidJs()],
});
