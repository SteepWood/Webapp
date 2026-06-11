"use client";

import { useState } from "react";
import { toast } from "sonner";

import { sendAdminMagicLink } from "@/app/actions/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);

    const result = await sendAdminMagicLink({ email });

    setIsPending(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    setSent(true);
    toast.success("Check your email for the login link.");
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-ink-700/10 bg-ink-50 p-6 text-center">
        <p className="font-serif text-h4 text-ink-900">Check your inbox</p>
        <p className="mt-2 text-body-sm text-ink-800/70">
          We sent a magic link to <strong>{email}</strong>. The link expires in
          1 hour.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-4"
          onClick={() => setSent(false)}
        >
          Use a different email
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-ink-700/10 bg-ink-50 p-6"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="admin-email">Work email</Label>
        <Input
          id="admin-email"
          type="email"
          autoComplete="email"
          placeholder="you@steepwood.com.au"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <p className="text-body-sm text-ink-800/70">
          Only @steepwood.com.au addresses can access the admin panel.
        </p>
      </div>

      <Button type="submit" className="mt-6 w-full" disabled={isPending}>
        {isPending ? "Sending…" : "Send login link"}
      </Button>
    </form>
  );
}
