import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'pages',
        label: 'Pages',
        path: 'content',
        format: 'json',
        fields: [
          { type: 'string', name: 'title', label: 'Title', required: false },
          { type: 'string', name: 'description', label: 'Description', required: false, ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'items',
            label: 'Items',
            list: true,
            fields: [
              { type: 'string', name: 'name', label: 'Name', required: false },
              { type: 'string', name: 'title', label: 'Title', required: false },
              { type: 'string', name: 'role', label: 'Role', required: false },
              { type: 'string', name: 'date', label: 'Date', required: false },
              { type: 'string', name: 'location', label: 'Location', required: false },
              { type: 'string', name: 'bio', label: 'Bio', required: false, ui: { component: 'textarea' } },
              { type: 'string', name: 'description', label: 'Description', required: false, ui: { component: 'textarea' } }
            ],
          },
          {
            type: 'string',
            name: 'highlights',
            label: 'Highlights',
            list: true,
            required: false,
          },
          {
            type: 'object',
            name: 'people',
            label: 'People',
            list: true,
            fields: [
              { type: 'string', name: 'name', label: 'Name', required: false },
              { type: 'string', name: 'role', label: 'Role', required: false },
              { type: 'string', name: 'bio', label: 'Bio', required: false, ui: { component: 'textarea' } }
            ],
            required: false,
          },
          { type: 'string', name: 'kicker', label: 'Kicker', required: false }
        ],
      },
    ],
  },
})
