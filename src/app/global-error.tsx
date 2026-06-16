"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en-AU">
      <body className="flex min-h-screen items-center justify-center bg-ink-900 px-6 text-ink-50">
        <main className="max-w-md text-center">
          <h1 className="font-serif text-3xl">We&apos;re temporarily offline</h1>
          <p className="mt-4 text-sm text-ink-50/80">
            Please try again in a few minutes.
          </p>
          <button
            type="button"
            onClick={() => {
              console.error("[app/global-error]", error);
              reset();
            }}
            className="mt-8 rounded-md border border-amber-600/25 bg-wood-texture px-5 py-3 text-sm font-medium text-on-wood shadow-sm"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
