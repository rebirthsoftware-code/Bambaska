"use server";

import { cities } from "@/data/cities";

export type FranchiseState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<FieldName, string>>;
};

type FieldName =
  | "name"
  | "phone"
  | "city"
  | "email"
  | "outdoorArea"
  | "indoorArea"
  | "message"
  | "kvkk";

const cityList: readonly string[] = cities;

function text(fd: FormData, key: string) {
  return String(fd.get(key) ?? "").trim();
}

export async function submitFranchise(
  _prev: FranchiseState,
  formData: FormData,
): Promise<FranchiseState> {
  // Honeypot: real users never fill this hidden field.
  if (text(formData, "website"))
    return { status: "success", message: "Başvurunuz alındı." };

  const data = {
    name: text(formData, "name"),
    phone: text(formData, "phone"),
    city: text(formData, "city"),
    email: text(formData, "email"),
    outdoorArea: text(formData, "outdoorArea"),
    indoorArea: text(formData, "indoorArea"),
    message: text(formData, "message"),
    kvkk: formData.get("kvkk") === "on",
  };

  const errors: FranchiseState["errors"] = {};
  if (data.name.length < 3) errors.name = "Lütfen adınızı ve soyadınızı girin.";
  if (!/^\+?[0-9\s()-]{10,}$/.test(data.phone))
    errors.phone = "Geçerli bir telefon numarası girin.";
  if (!cityList.includes(data.city)) errors.city = "Lütfen bir şehir seçin.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Geçerli bir e-posta adresi girin.";
  if (!/^\d{1,5}$/.test(data.outdoorArea))
    errors.outdoorArea = "Dış alanı m² olarak sayı girin.";
  if (!/^\d{1,5}$/.test(data.indoorArea))
    errors.indoorArea = "İç alanı m² olarak sayı girin.";
  if (data.message.length > 2000)
    errors.message = "Mesaj en fazla 2000 karakter olabilir.";
  if (!data.kvkk)
    errors.kvkk = "Devam etmek için aydınlatma metnini kabul etmelisiniz.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Lütfen işaretli alanları kontrol edin.",
      errors,
    };
  }

  const payload = {
    ...data,
    submittedAt: new Date().toISOString(),
    source: "bambaskawaffle.com.tr",
  };

  const webhook = process.env.FRANCHISE_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[franchise] webhook delivery failed", err);
      return {
        status: "error",
        message:
          "Başvurunuz şu anda iletilemedi. Lütfen daha sonra tekrar deneyin veya bizi arayın.",
      };
    }
  } else {
    console.info(
      "[franchise] new application (no FRANCHISE_WEBHOOK_URL configured)",
      payload,
    );
  }

  return {
    status: "success",
    message:
      "Başvurunuz bize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.",
  };
}
