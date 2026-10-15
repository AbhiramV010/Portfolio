import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE_URL, allRoutes, metaFor, pathFor } from './src/routes.js'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const setMeta = (html, attr, key, value) =>
  html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), (_, a, b) => a + esc(value) + b)

function withMeta(html, route, { title, description }) {
  const url = `${SITE_URL}${route === '/' ? '/' : route}`
  let out = html.replace(/<title>[^<]*<\/title>/, () => `<title>${esc(title)}</title>`)
  out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => a + url + b)
  out = setMeta(out, 'name', 'description', description)
  out = setMeta(out, 'property', 'og:title', title)
  out = setMeta(out, 'property', 'og:description', description)
  out = setMeta(out, 'property', 'og:url', url)
  out = setMeta(out, 'name', 'twitter:title', title)
  out = setMeta(out, 'name', 'twitter:description', description)
  return out
}

// One HTML shell per route so a shared link gets its own title and preview, and
// static hosts can serve /projects/halo-assistant without a rewrite rule.
function prerenderRoutes() {
  let outDir
  return {
    name: 'prerender-routes',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const shell = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
      for (const { view, slug } of allRoutes()) {
        const route = pathFor(view, slug)
        const html = withMeta(shell, route, metaFor(view, slug))
        if (route === '/') {
          fs.writeFileSync(path.join(outDir, 'index.html'), html)
          continue
        }
        const dir = path.join(outDir, route)
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(path.join(dir, 'index.html'), html)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderRoutes()],
})
