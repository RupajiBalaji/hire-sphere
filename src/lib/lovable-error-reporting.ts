// Stub: replace with your own error reporter (e.g. Sentry) if needed.
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  console.error("[Error]", error, context);
}
