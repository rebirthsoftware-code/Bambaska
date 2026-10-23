"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitFranchise, type FranchiseState } from "@/app/franchise/actions";
import { cities } from "@/data/cities";
import { CheckIcon } from "./icons";

const initial: FranchiseState = { status: "idle" };

const inputCls =
  "w-full rounded-2xl border border-forest-800/15 bg-cream-50 px-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-500/60 outline-none transition focus:border-forest-800 focus:ring-4 focus:ring-forest-800/10 aria-[invalid=true]:border-berry-500";

function Field({
  label,
  name,
  error,
  children,
  className = "",
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-forest-800"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-berry-500">
          {error}
        </p>
      )}
    </div>
  );
}

export function FranchiseForm() {
  const [state, action, pending] = useActionState(submitFranchise, initial);
  const err = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className="rounded-3xl bg-forest-800 p-10 text-center text-cream-100 shadow-soft">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-forest-900">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h2 className="mt-6 font-display text-3xl">Teşekkürler!</h2>
        <p className="mx-auto mt-3 max-w-md text-cream-100/75">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="rounded-3xl bg-cream-50 p-6 shadow-card ring-1 ring-forest-800/5 sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Ad Soyad" name="name" error={err.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder="Adınız ve soyadınız"
            className={inputCls}
            aria-invalid={Boolean(err.name)}
          />
        </Field>
        <Field label="Telefon" name="phone" error={err.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="05xx xxx xx xx"
            className={inputCls}
            aria-invalid={Boolean(err.phone)}
          />
        </Field>
        <Field label="E-posta" name="email" error={err.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="ornek@eposta.com"
            className={inputCls}
            aria-invalid={Boolean(err.email)}
          />
        </Field>
        <Field label="Şehir" name="city" error={err.city}>
          <select
            id="city"
            name="city"
            required
            defaultValue=""
            className={inputCls}
            aria-invalid={Boolean(err.city)}
          >
            <option value="" disabled>
              Şehir seçin
            </option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="İç Alan (m²)" name="indoorArea" error={err.indoorArea}>
          <input
            id="indoorArea"
            name="indoorArea"
            inputMode="numeric"
            required
            placeholder="örn. 80"
            className={inputCls}
            aria-invalid={Boolean(err.indoorArea)}
          />
        </Field>
        <Field label="Dış Alan (m²)" name="outdoorArea" error={err.outdoorArea}>
          <input
            id="outdoorArea"
            name="outdoorArea"
            inputMode="numeric"
            required
            placeholder="örn. 30"
            className={inputCls}
            aria-invalid={Boolean(err.outdoorArea)}
          />
        </Field>
        <Field
          label="Mesajınız"
          name="message"
          error={err.message}
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Eklemek istediğiniz detaylar (lokasyon, deneyim, zamanlama...)"
            className={inputCls}
            aria-invalid={Boolean(err.message)}
          />
        </Field>

        {/* honeypot */}
        <div className="hidden" aria-hidden>
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-ink-700">
            <input
              type="checkbox"
              name="kvkk"
              required
              className="mt-1 h-4 w-4 shrink-0 rounded border-forest-800/30 accent-forest-800"
              aria-invalid={Boolean(err.kvkk)}
            />
            <span>
              Kişisel Verilerin Korunması Kanunu gereğince, kişisel verilerimin
              işlenmesine ilişkin{" "}
              <Link
                href="/aydinlatma-metni"
                target="_blank"
                className="font-semibold text-forest-800 underline underline-offset-4"
              >
                Aydınlatma Metni
              </Link>
              &rsquo;ni okudum ve kabul ediyorum.
            </span>
          </label>
          {err.kvkk && (
            <p className="mt-2 text-sm text-berry-500">{err.kvkk}</p>
          )}
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="mt-6 rounded-2xl bg-berry-500/10 px-4 py-3 text-sm text-berry-500"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-forest-800 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gold-300 transition hover:bg-forest-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Gönderiliyor…" : "Başvuruyu Gönder"}
      </button>
    </form>
  );
}
