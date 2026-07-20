import { createPwaIcon, PWA_ICON_CONTENT_TYPE } from "@/lib/pwa-icon";

export const size = { width: 180, height: 180 };
export const contentType = PWA_ICON_CONTENT_TYPE;

export default function AppleIcon() {
  return createPwaIcon({ size: 180 });
}
