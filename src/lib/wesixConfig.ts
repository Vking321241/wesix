export interface WesixConfig {
  adminKey?: string;
  logoUrl?: string;
  siteName?: string;
  founderPhoto?: string;
}

declare global {
  interface Window {
    wesixConfig?: WesixConfig;
  }
}

export function getWesixConfig(): WesixConfig {
  if (typeof window !== 'undefined' && window.wesixConfig) {
    return window.wesixConfig;
  }
  return {};
}
