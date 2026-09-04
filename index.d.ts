export interface DeskcrewOptions {
  /** Your DeskCrew public widget key, e.g. "pub_xxxxxxxx". Required. */
  widgetKey: string
  /** Board slug (lowercase letters, numbers and dashes). Optional. */
  board?: string
  /** Accent colour as a 6-digit hex value, e.g. "#4f46e5". Optional. */
  color?: string
  /** Which side the launcher sits on. Optional (defaults to the widget's own default). */
  position?: 'left' | 'right'
  /** Greeting shown on the launcher. Optional. */
  greeting?: string
}

import type { Handle } from '@sveltejs/kit'

/** A `handle` hook for src/hooks.server.js that injects the widget on every HTML page. */
export function deskcrewHandle(options: DeskcrewOptions): Handle
export default deskcrewHandle
export function buildTag(options: DeskcrewOptions): { tag: string | null; warnings: string[] }
