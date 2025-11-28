# Environment Configuration

This document explains how to configure the API endpoints and environment variables for the TeamMe AI Screening extension.

## Quick Start

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration values

3. Restart the development server:
   ```bash
   pnpm dev
   ```

## Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the browser extension code.

### Required Variables

| Variable                 | Description                                   | Default                                                |
| ------------------------ | --------------------------------------------- | ------------------------------------------------------ |
| `VITE_ASSISTANT_API_URL` | Assistant API endpoint for chat functionality | `http://localhost:3000/api/assistant`                  |
| `VITE_CANDIDATE_API_URL` | Candidate API endpoint                        | `https://teamme-acquisition.vercel.app/api/candidates` |
| `VITE_ENV`               | Environment mode                              | `development`                                          |

### Optional Variables

| Variable       | Description                              | Default |
| -------------- | ---------------------------------------- | ------- |
| `VITE_API_KEY` | API key for authentication (if required) | -       |

## Configuration Files

### `.env` (Development)

Used for local development. This file is gitignored and should contain your local configuration.

```env
VITE_ASSISTANT_API_URL=http://localhost:3000/api/assistant
VITE_CANDIDATE_API_URL=https://teamme-acquisition.vercel.app/api/candidates
VITE_ENV=development
```

### `.env.production` (Production)

Used for production builds. Update this with your production API endpoints.

```env
VITE_ASSISTANT_API_URL=https://your-production-api.com/api/assistant
VITE_CANDIDATE_API_URL=https://teamme-acquisition.vercel.app/api/candidates
VITE_ENV=production
```

### `.env.example` (Template)

Template file that should be committed to the repository. Other developers can copy this to create their own `.env` file.

## Building for Different Environments

### Development Build (Chrome)

```bash
pnpm dev
```

### Development Build (Firefox)

```bash
pnpm dev:firefox
```

### Production Build (Chrome)

```bash
pnpm build
```

This will use `.env.production` if it exists, otherwise falls back to `.env`.

### Production Build (Firefox)

```bash
pnpm build:firefox
```

## API Authentication

If your API requires authentication, add your API key to the `.env` file:

```env
VITE_API_KEY=your_api_key_here
```

The API key will be automatically added to requests as a Bearer token in the Authorization header.

## How It Works

1. **Vite Configuration**: Vite automatically loads environment variables from `.env` files
2. **Variable Access**: Variables are accessed via `import.meta.env.VITE_*`
3. **Type Safety**: TypeScript types are defined in `src/vite-env.d.ts`
4. **Configuration Module**: The `src/constants/config.ts` module exports all configuration values
5. **Runtime Fallbacks**: If a variable is not set, the config module uses sensible defaults and logs a warning

## Troubleshooting

### Environment variables not updating

If you change environment variables and they don't seem to take effect:

1. Stop the development server
2. Clear your browser extension cache
3. Restart the development server
4. Reload the extension in your browser

### TypeScript errors about missing variables

Make sure all variables are defined in `src/vite-env.d.ts`. Add any new variables to the `ImportMetaEnv` interface.

### API endpoints not working

1. Check the browser console for warnings about missing environment variables
2. Verify your `.env` file exists and has the correct values
3. Ensure variable names are prefixed with `VITE_`
4. Check the Network tab in DevTools to see the actual URLs being called

## Security Notes

- Never commit `.env` files with sensitive data (API keys, secrets, etc.)
- Use `.env.example` as a template without real credentials
- Consider using different API keys for development and production
- The `.env` file is included in `.gitignore` to prevent accidental commits
