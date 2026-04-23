/**
 * components/forms/GeneralInterestForm.tsx
 *
 * General Interest form. Used on Join and Contact pages.
 * Category selector routes the inquiry text in the auto-responder.
 *
 * Authority: NYT pack Sections 12.5, 12.6, AGENTS.md Section 8.
 */

"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { GeneralInterestSchema, type GeneralInterestInput } from "@/lib/validation";
import { submitGeneralInterest } from "@/app/actions/general-interest";
import { Input, Textarea, Select, Honeypot, FormError } from "./FormField";
import { Button } from "@/components/ui/Button";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string };

const CATEGORY_OPTIONS = [
  { value: "Player", label: "Player" },
  { value: "Coach/Mentor", label: "Coach or Mentor" },
  { value: "Volunteer", label: "Volunteer" },
  { value: "General", label: "General" },
] as const;

type GeneralInterestFormProps = {
  /** Pre-set the category. Useful on the Join page. */
  defaultCategory?: GeneralInterestInput["category"];
  /** Where to redirect on success. */
  successPath?: "/join/thanks" | "/contact/thanks";
};

export function GeneralInterestForm({
  defaultCategory = "General",
  successPath = "/contact/thanks",
}: GeneralInterestFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<GeneralInterestInput>({
    resolver: zodResolver(GeneralInterestSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: defaultCategory,
      message: "",
      website: "",
    },
  });

  function onSubmit(values: GeneralInterestInput) {
    setStatus({ kind: "submitting" });

    startTransition(async () => {
      const result = await submitGeneralInterest(values);

      if (result.ok) {
        router.push(successPath);
        return;
      }

      if (result.reason === "validation" && result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          setError(field as keyof GeneralInterestInput, { message });
        }
      }
      setStatus({
        kind: "error",
        message:
          result.message ??
          "Something went wrong. Please try again, or email inquiries@newyorktitans.org.",
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

      <Select
        label="I'm interested as a…"
        required
        options={CATEGORY_OPTIONS}
        {...register("category")}
        error={errors.category?.message}
      />

      <Input
        label="Your name"
        type="text"
        autoComplete="name"
        required
        {...register("name")}
        error={errors.name?.message}
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
        label="Tell us a little more"
        helper="A few sentences is enough. We'll respond within 3 business days."
        required
        {...register("message")}
        error={errors.message?.message}
      />

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </Button>
        <p className="text-caption text-mist">
          We respond within 3 business days.
        </p>
      </div>
    </form>
  );
}
