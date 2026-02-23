export interface WaitlistAttribution {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  referrer: string | null;
  landingPath: string | null;
}

type WaitlistEventValue = string | number | boolean | null;
type WaitlistEventData = Record<string, WaitlistEventValue>;

const ATTRIBUTION_STORAGE_KEY = "inertia.waitlist.attribution.v1";
const MAX_STRING_LENGTH = 255;

function createEmptyAttribution(): WaitlistAttribution {
  return {
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmTerm: null,
    utmContent: null,
    referrer: null,
    landingPath: null,
  };
}

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, MAX_STRING_LENGTH);
}

function hasCampaignParams(attribution: WaitlistAttribution): boolean {
  return Boolean(
    attribution.utmSource ||
      attribution.utmMedium ||
      attribution.utmCampaign ||
      attribution.utmTerm ||
      attribution.utmContent,
  );
}

function hasAttributionSignals(attribution: WaitlistAttribution): boolean {
  return hasCampaignParams(attribution) || Boolean(attribution.referrer);
}

function readStoredAttribution(): WaitlistAttribution | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    const sanitized = sanitizeWaitlistAttribution(parsed);
    return hasAttributionSignals(sanitized) ? sanitized : null;
  } catch {
    return null;
  }
}

function writeStoredAttribution(attribution: WaitlistAttribution): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution),
    );
  } catch {
    // Best effort only.
  }
}

function getReferrerHost(referrer: string | null): string | null {
  if (!referrer) return null;

  try {
    return normalizeString(new URL(referrer).hostname);
  } catch {
    return null;
  }
}

export function sanitizeWaitlistAttribution(value: unknown): WaitlistAttribution {
  if (!value || typeof value !== "object") return createEmptyAttribution();

  const record = value as Record<string, unknown>;

  return {
    utmSource: normalizeString(record.utmSource ?? record.utm_source),
    utmMedium: normalizeString(record.utmMedium ?? record.utm_medium),
    utmCampaign: normalizeString(record.utmCampaign ?? record.utm_campaign),
    utmTerm: normalizeString(record.utmTerm ?? record.utm_term),
    utmContent: normalizeString(record.utmContent ?? record.utm_content),
    referrer: normalizeString(record.referrer),
    landingPath: normalizeString(record.landingPath ?? record.landing_path),
  };
}

export function getClientWaitlistAttribution(): WaitlistAttribution {
  if (typeof window === "undefined") return createEmptyAttribution();

  const stored = readStoredAttribution();
  if (stored) return stored;

  const params = new URLSearchParams(window.location.search);
  const fromLocation = sanitizeWaitlistAttribution({
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmTerm: params.get("utm_term"),
    utmContent: params.get("utm_content"),
    referrer: document.referrer || null,
    landingPath: window.location.pathname,
  });

  if (hasCampaignParams(fromLocation)) {
    // Persist first-touch campaign attribution for later form submits.
    writeStoredAttribution(fromLocation);
  }

  return fromLocation;
}

export function getWaitlistAttributionEventData(
  attribution: WaitlistAttribution,
): WaitlistEventData {
  const referrerHost = getReferrerHost(attribution.referrer);

  return {
    source: attribution.utmSource ?? (referrerHost ? "referral" : "direct"),
    utm_source: attribution.utmSource,
    utm_medium: attribution.utmMedium,
    utm_campaign: attribution.utmCampaign,
    referrer_host: referrerHost,
    landing_path: attribution.landingPath,
  };
}
