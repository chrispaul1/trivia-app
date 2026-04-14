import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true, // This makes debugging 100x easier!
              fileName: false,
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
        crypto: 'crypto-browserify'
    }
  }
})
