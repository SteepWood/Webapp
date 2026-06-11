import { ImageResponse } from "next/og";

export const OG_SIZE = {
  width: 1200,
  height: 630,
};

export const OG_ALT = "SteepWood — Premium Custom Joinery";

const PALETTE = {
  ink950: "#0f0a07",
  ink900: "#1c1410",
  ink100: "#f5f0ea",
  amber500: "#d4892a",
  amber400: "#e0a04f",
} as const;

async function loadFrauncesFont(
  weight: 600 | 400 = 600,
): Promise<{
  name: string;
  data: ArrayBuffer;
  weight: 600 | 400;
  style: "normal";
} | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Fraunces:wght@${weight}&display=swap`,
      {
        headers: {
          // Legacy user agent returns TTF URLs — @vercel/og does not support wOFF2.
          "User-Agent":
            "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
        },
      },
    ).then((response) => response.text());

    const match = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
    );

    if (!match?.[1]) {
      return null;
    }

    const data = await fetch(match[1]).then((response) => response.arrayBuffer());

    return {
      name: "Fraunces",
      data,
      weight,
      style: "normal",
    };
  } catch {
    return null;
  }
}

function siteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
}

export async function resolveOgBackground(slug?: string): Promise<string> {
  const origin = siteOrigin();
  const candidates = slug
    ? [`${origin}/og-backgrounds/${slug}.svg`, `${origin}/og-backgrounds/default.svg`]
    : [`${origin}/og-backgrounds/default.svg`];

  for (const url of candidates) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return url;
      }
    } catch {
      continue;
    }
  }

  return candidates[candidates.length - 1]!;
}

export async function createOgImage(options: {
  headline: string;
  subtitle?: string;
  eyebrow?: string;
  backgroundSlug?: string;
}): Promise<ImageResponse> {
  const frauncesSemiBold = await loadFrauncesFont(600);
  const frauncesRegular = await loadFrauncesFont(400);
  const backgroundUrl = await resolveOgBackground(options.backgroundSlug);
  const fonts = [frauncesSemiBold, frauncesRegular].filter(
    (font): font is NonNullable<typeof font> => font !== null,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          backgroundColor: PALETTE.ink950,
          fontFamily: frauncesSemiBold ? "Fraunces" : "Georgia, serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundUrl}
          alt=""
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{
            position: "absolute",
            inset: 0,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,10,7,0.35) 0%, rgba(15,10,7,0.92) 68%, rgba(15,10,7,0.98) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: "72px 80px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: PALETTE.amber400,
            }}
          >
            {options.eyebrow ?? "SteepWood"}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.05,
              color: PALETTE.ink100,
              maxWidth: 1040,
            }}
          >
            {options.headline}
          </p>
          {options.subtitle ? (
            <p
              style={{
                margin: 0,
                fontSize: 30,
                lineHeight: 1.35,
                color: "rgba(245,240,234,0.82)",
                maxWidth: 920,
              }}
            >
              {options.subtitle}
            </p>
          ) : null}
          <div
            style={{
              marginTop: 12,
              width: 120,
              height: 4,
              backgroundColor: PALETTE.amber500,
            }}
          />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}
