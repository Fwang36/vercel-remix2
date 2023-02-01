import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import * as Sentry from "@sentry/remix"

Sentry.init({
  dsn: "https://f5ea3254102d4890aff3291dce1e1478:63cec28b01e34b5b96227602629fc651@o1407376.ingest.sentry.io/4504606337007616",
  tracesSampleRate: 1,
  debug: true,
  integrations: [
    new Sentry.BrowserTracing({
    }),
  ],
});

const hydrate = () => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
