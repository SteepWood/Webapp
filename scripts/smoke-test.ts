const baseUrl = (
  process.argv[2] ??
  process.env.SMOKE_TEST_URL ??
  "http://localhost:3000"
).replace(/\/$/, "");

type SmokeCheck = {
  name: string;
  path: string;
  assert: (response: Response, body: string) => boolean;
  expectRedirect?: boolean;
};

const SERVICE_SLUGS = [
  "custom-kitchen-joinery",
  "built-in-wardrobes",
  "bathroom-vanity-joinery",
] as const;

const checks: SmokeCheck[] = [
  {
    name: "Homepage",
    path: "/",
    assert: (_, body) => body.includes("SteepWood") && body.includes("application/ld+json"),
  },
  {
    name: "Sitemap",
    path: "/sitemap.xml",
    assert: (_, body) => {
      const urlCount = (body.match(/<loc>/g) ?? []).length;
      return urlCount >= 180;
    },
  },
  {
    name: "Robots",
    path: "/robots.txt",
    assert: (_, body) => body.includes("Sitemap:"),
  },
  ...SERVICE_SLUGS.map((slug) => ({
    name: `Service pillar ${slug}`,
    path: `/${slug}/`,
    assert: (_: Response, body: string) => body.length > 500,
  })),
  {
    name: "Combo page",
    path: "/custom-kitchen-joinery/newcastle/",
    assert: (_, body) =>
      body.toLowerCase().includes("kitchen") &&
      body.toLowerCase().includes("newcastle"),
  },
  {
    name: "Locations index",
    path: "/locations/",
    assert: (response, body) =>
      response.ok && body.toLowerCase().includes("locations we serve"),
  },
  {
    name: "Location hub Newcastle",
    path: "/locations/newcastle/",
    assert: (response, body) =>
      response.ok && body.toLowerCase().includes("newcastle"),
  },
  {
    name: "Legacy location redirect",
    path: "/custom-joinery/sydney/",
    expectRedirect: true,
    assert: (response) => response.status >= 300 && response.status < 400,
  },
  {
    name: "Blog index",
    path: "/blog/",
    assert: (response) => response.ok,
  },
  {
    name: "Portfolio index",
    path: "/portfolio/",
    assert: (response) => response.ok,
  },
  {
    name: "Quote page",
    path: "/quote/",
    assert: (_, body) => body.includes("Get a Free Measure"),
  },
  {
    name: "Admin redirect",
    path: "/admin/",
    expectRedirect: true,
    assert: (response) => response.status >= 300 && response.status < 400,
  },
  {
    name: "Missing API route",
    path: "/api/nonexistent-route-smoke-test",
    assert: (response) => response.status === 404,
  },
];

async function runCheck(check: SmokeCheck): Promise<boolean> {
  const url = `${baseUrl}${check.path}`;

  try {
    const response = await fetch(url, {
      redirect: check.expectRedirect ? "manual" : "follow",
    });
    const body = await response.text();
    const passed = check.assert(response, body);

    console.log(`${passed ? "PASS" : "FAIL"} — ${check.name} (${url})`);
    return passed;
  } catch (error) {
    console.log(
      `FAIL — ${check.name} (${url}) — ${error instanceof Error ? error.message : "request failed"}`,
    );
    return false;
  }
}

async function main() {
  console.log(`Running smoke tests against ${baseUrl}\n`);

  const results = await Promise.all(checks.map(runCheck));
  const passed = results.filter(Boolean).length;
  const total = results.length;

  console.log(`\n${passed}/${total} checks passed.`);

  if (passed !== total) {
    process.exitCode = 1;
  }
}

void main();
