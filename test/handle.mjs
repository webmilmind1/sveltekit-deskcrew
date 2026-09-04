import test from 'node:test'
import assert from 'node:assert/strict'
import { deskcrewHandle } from '../index.js'

function run(handle, html) {
  let transform
  const resolve = (_event, opts) => {
    transform = opts && opts.transformPageChunk
    return transform ? transform({ html, done: true }) : html
  }
  return handle({ event: {}, resolve })
}

test('injects the tag before </body> on the final chunk', async () => {
  const out = await run(
    deskcrewHandle({ widgetKey: 'pub_abc12345', board: 'acme' }),
    '<html><body><p>hi</p></body></html>',
  )
  assert.match(out, /desk\.js[^]*<\/body>/)
  assert.match(out, /data-board="acme"/)
})

test('does not double inject', async () => {
  const handle = deskcrewHandle({ widgetKey: 'pub_abc12345' })
  const once = await run(handle, '<html><body></body></html>')
  const twice = await run(handle, once)
  assert.equal(twice.split('desk.js').length - 1, 1)
})

test('invalid key leaves the page untouched', async () => {
  const out = await run(deskcrewHandle({ widgetKey: 'nope' }), '<html><body></body></html>')
  assert.doesNotMatch(out, /desk\.js/)
})
