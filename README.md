# @deskcrew/sveltekit

![DeskCrew widget for sveltekit: install @deskcrew/sveltekit, one import, live chat and tickets on every page](https://deskcrew.io/packages/deskcrew-sveltekit.gif)

Add the [DeskCrew](https://deskcrew.io) support widget to a SvelteKit app: live chat, AI answers grounded in your knowledge base, and a help center. One server hook, and every page (server-rendered or prerendered) carries the widget, isolated in a Shadow DOM.

## Install

```
npm install @deskcrew/sveltekit
```

In `src/hooks.server.js` (or `.ts`):

```js
import { deskcrewHandle } from '@deskcrew/sveltekit'

export const handle = deskcrewHandle({ widgetKey: 'pub_your_widget_key', board: 'your-board' })
```

Already have a `handle`? Compose them:

```js
import { sequence } from '@sveltejs/kit/hooks'
import { deskcrewHandle } from '@deskcrew/sveltekit'

export const handle = sequence(myHandle, deskcrewHandle({ widgetKey: 'pub_your_widget_key' }))
```

Prefer a static tag? Paste the output of `buildTag(options).tag` into `src/app.html` before `</body>`; the hook does the same thing at request time.

Get the key from the Install page of your DeskCrew dashboard.

## What you get

- **AI answers grounded in your own help articles.** The assistant only answers from the knowledge base you publish, so it cannot invent product facts.
- **A human approves before anything sends.** Every AI draft waits in an approval queue. Nothing reaches a customer unreviewed.
- **Every conversation becomes a ticket.** Widget chats, emails and board posts land in one dashboard with full history.
- **Visitors who leave still get answered.** Leave an email address and the reply arrives by email.

## Options

| Option      | Required | Notes                                                                                |
| ----------- | -------- | ------------------------------------------------------------------------------------ |
| `widgetKey` | yes      | Your public widget key, `pub_...`, from the Install page of your DeskCrew dashboard. |
| `board`     | no       | Your board slug (lowercase letters, numbers, dashes). Enables the feedback link.     |
| `color`     | no       | Accent colour as a 6-digit hex value, e.g. `#4f46e5`.                                |
| `position`  | no       | `right` (default) or `left`.                                                         |
| `greeting`  | no       | First line the launcher shows.                                                       |

Invalid optional values are dropped with a console warning; a missing or malformed key means the widget is not added at all, so a bad config can never put arbitrary markup on your page.

## Privacy

The only thing this package adds to your site is one `<script>` tag that loads `https://deskcrew.io/desk.js` with your public key. The widget runs inside a Shadow DOM and does not touch your styles. Terms: https://deskcrew.io/terms. Privacy: https://deskcrew.io/privacy.

## License

MIT
