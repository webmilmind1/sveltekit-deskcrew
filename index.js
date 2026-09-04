import { buildTag } from './build-tag.js'

/**
 * A SvelteKit `handle` hook that injects the DeskCrew widget <script> before
 * </body> on every HTML page, server-rendered or prerendered.
 *
 *   // src/hooks.server.js
 *   import { deskcrewHandle } from '@deskcrew/sveltekit'
 *   export const handle = deskcrewHandle({ widgetKey: 'pub_...' })
 *
 * Compose with your own hooks through `sequence` from '@sveltejs/kit/hooks'.
 *
 * @param {import('./index.js').DeskcrewOptions} options
 */
export function deskcrewHandle(options) {
  const { tag, warnings } = buildTag(options)
  for (const message of warnings) console.warn(message)
  return async ({ event, resolve }) => {
    if (!tag) return resolve(event)
    return resolve(event, {
      transformPageChunk: ({ html, done }) => {
        if (!done) return html
        if (html.includes('https://deskcrew.io/desk.js')) return html
        return html.replace(/<\/body>/i, `${tag}\n</body>`)
      },
    })
  }
}

export default deskcrewHandle
export { buildTag }
