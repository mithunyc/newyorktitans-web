/**
 * components/forms/SponsorForm.tsx
 *
 * Sponsor Inquiry form. 5 fields. Submits to the sponsor server action.
 * Authority: NYT pack Sections 7, 12.4, AGENTS.md Section 8.
 */

"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SponsorInquirySchema, type SponsorInquiryInput } from "@/lib/validation";
import { submitSponsorInquiry } from "@/app/actions/sponsor-inquiry";
import { Input, Textarea, Honeypot, FormError } from "./FormField";
import { Button } from "@/components/ui/Button";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string };

export function SponsorForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SponsorInquiryInput>({
    resolver: zodResolver(SponsorInquirySchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      phone: "",
      message: "",
      website: "", // honeypot
    },
  });

  function onSubmit(values: SponsorInquiryInput) {
    setStatus({ kind: "submitting" });

    // Plausible event hook — implemented when analytics utilities are added.
    // analytics.track("form_submit_attempt", { form: "sponsor" });

    startTransition(async () => {
      const result = await submitSponsorInquiry(values);

      if (result.ok) {
        // analytics.track("form_submit_success", { form: "sponsor" });
        router.push("/sponsors/thanks");
        return;
      }

      // analytics.track("form_submit_error", { form: "sponsor", reason: result.reason });

      if (result.reason === "validation" && result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          setError(field as keyof SponsorInquiryInput, { message });
        }
      }
      setStatus({
        kind: "error",
        message:
          result.message ??
          "Something went wrong. Please try again, or email partnerships@newyorktitans.org.",
      });
    });
  }

  const submitting = pending || status.kind === "submitting";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-6"
      noValidate
    >
      <Honeypot />

      {status.kind === "error" && <FormError>{status.message}</FormError>}

      <Input
        label="Your name"
        type="text"
        autoComplete="name"
        required
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label="Organization"
        type="text"
        autoComplete="organization"
        required
        {...register("organization")}
        error={errors.organization?.message}
      />

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        required
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Phone (optional)"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        {...register("phone")}
        error={errors.phone?.message}
      />

      <Textarea
        label="What would you like to discuss?"
        helper="A few sentences is enough. We'll respond within 3 business days."
        required
        {...register("message")}
        error={errors.message?.message}
      />

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Send inquiry"}
        </Button>
        <p className="text-caption text-mist">
          We respond within 3 business days.
        </p>
      </div>
    </form>
  );
}
