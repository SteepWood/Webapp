type Gtag = (
  command: "event",
  eventName: string,
  params?: Record<string, string | number | boolean>,
) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

function sendEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function trackQuoteSubmit(params: {
  serviceTypes: string[];
  budgetRange?: string;
  locationSlug?: string;
}) {
  const eventParams = {
    service_count: params.serviceTypes.length,
    services: params.serviceTypes.join(","),
    budget_range: params.budgetRange ?? "unspecified",
    location_slug: params.locationSlug ?? "unspecified",
  };

  sendEvent("quote_submit", eventParams);
  sendEvent("generate_lead", {
    ...eventParams,
    lead_type: "quote",
  });
}

export function trackContactSubmit(params: { subject?: string }) {
  sendEvent("contact_submit", {
    subject: params.subject ?? "unspecified",
  });
}

export function trackPhoneClick(params: { context: string }) {
  sendEvent("phone_click", {
    context: params.context,
  });
}

export function trackProjectView(params: { slug: string; category?: string }) {
  sendEvent("project_view", {
    slug: params.slug,
    category: params.category ?? "unspecified",
  });
}

export function trackBlogReadDepth(params: { slug: string; depth: number }) {
  sendEvent("blog_read_depth", {
    slug: params.slug,
    depth: params.depth,
  });
}
