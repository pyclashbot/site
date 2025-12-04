import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

const ReactCompilerConfig = {}

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      target: 'aws-lambda',
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        crawlLinks: true,
      },
      sitemap: {
        enabled: true,
        host: 'https://pyclashbot.app',
      },
    }),
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
