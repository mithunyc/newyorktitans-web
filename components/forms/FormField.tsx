/**
 * components/forms/FormField.tsx
 *
 * Shared form primitives: label, input, textarea, select, error, success.
 * Used by SponsorForm and GeneralInterestForm.
 *
 * Authority: NYT pack DESIGN.md 11.11 (accessibility), 11.9 (CTA system).
 *
 * Accessibility notes:
 *   - Label is always visible above the input (no float labels).
 *   - Help and error text use aria-describedby.
 *   - Errors use role="alert" so screen readers announce them on validation.
 */

"use client";

import { forwardRef, useId } from "react";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

const baseField =
  "w-full rounded-md border border-mist/20 bg-graphite px-4 py-3 text-body text-white placeholder:text-mist/50 transition-colors focus:border-blue focus:outline-none focus:ring-ring focus:ring-blue/50 aria-[invalid=true]:border-blue/80";

// ---------------------------------------------------------------------------
// Field wrapper: label + helper + slot + error
// ---------------------------------------------------------------------------

type FieldWrapperProps = {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  children: (props: { id: string; describedBy: string | undefined; invalid: boolean }) => ReactNode;
  className?: string;
};

export function Field({
  id,
  label,
  helper,
  error,
  required,
  children,
  className,
}: FieldWrapperProps) {
  const helperId = helper ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-body font-medium text-white">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-gold">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>

      {helper && (
        <p id={helperId} className="text-caption text-mist">
          {helper}
        </p>
      )}

      {children({ id, describedBy, invalid: !!error })}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-caption text-blue"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "aria-describedby" | "aria-invalid"> & {
  label: string;
  helper?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helper, error, required, className, ...rest },
  ref,
) {
  const reactId = useId();
  const id = rest.name ? `field-${rest.name}` : reactId;

  return (
    <Field id={id} label={label} helper={helper} error={error} required={required}>
      {({ id: fid, describedBy, invalid }) => (
        <input
          ref={ref}
          id={fid}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          className={cn(baseField, className)}
          {...rest}
        />
      )}
    </Field>
  );
});

// ---------------------------------------------------------------------------
// Textarea
// ---------------------------------------------------------------------------

type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "aria-describedby" | "aria-invalid"
> & {
  label: string;
  helper?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, helper, error, required, className, ...rest },
  ref,
) {
  const reactId = useId();
  const id = rest.name ? `field-${rest.name}` : reactId;

  return (
    <Field id={id} label={label} helper={helper} error={error} required={required}>
      {({ id: fid, describedBy, invalid }) => (
        <textarea
          ref={ref}
          id={fid}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          rows={5}
          className={cn(baseField, "resize-y", className)}
          {...rest}
        />
      )}
    </Field>
  );
});

// ---------------------------------------------------------------------------
// Select
// ---------------------------------------------------------------------------

type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "aria-describedby" | "aria-invalid"
> & {
  label: string;
  helper?: string;
  error?: string;
  options: ReadonlyArray<{ value: string; label: string }>;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, helper, error, required, options, className, ...rest },
  ref,
) {
  const reactId = useId();
  const id = rest.name ? `field-${rest.name}` : reactId;

  return (
    <Field id={id} label={label} helper={helper} error={error} required={required}>
      {({ id: fid, describedBy, invalid }) => (
        <select
          ref={ref}
          id={fid}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          className={cn(baseField, "appearance-none pr-10", className)}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
});

// ---------------------------------------------------------------------------
// Honeypot — hidden from sighted users and screen readers.
// Bots will still fill it. The server action drops submissions where it's set.
// ---------------------------------------------------------------------------

export function Honeypot({ name = "website" }: { name?: string }) {
  return (
    <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={`hp-${name}`}>Leave this field empty</label>
      <input
        id={`hp-${name}`}
        type="text"
        name={name}
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Form-level message banners
// ---------------------------------------------------------------------------

export function FormError({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="rounded-md border border-blue/40 bg-blue/10 p-4 text-body text-white"
    >
      {children}
    </div>
  );
}

export function FormSuccess({ children }: { children: ReactNode }) {
  return (
    <div
      role="status"
      className="rounded-md border border-gold/40 bg-gold/10 p-4 text-body text-white"
    >
      {children}
    </div>
  );
}
