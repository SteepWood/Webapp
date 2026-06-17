import { NewsletterSignupForm } from "@/components/forms/NewsletterSignupForm";

export function FooterNewsletter() {
  return (
    <div>
      <h4 className="mb-stack-sm font-serif text-h4 text-ink-50">Newsletter</h4>
      <NewsletterSignupForm
        inputId="footer-newsletter-email"
        layout="inline"
        inputClassName="border-ink-700 bg-ink-800 text-ink-50 placeholder:text-ink-100/50"
        messageClassName="text-amber-300"
      />
    </div>
  );
}
