import { createPwaIcon, PWA_ICON_CONTENT_TYPE } from "@/lib/pwa-icon";

export const size = { width: 32, height: 32 };
export const contentType = PWA_ICON_CONTENT_TYPE;

export default function Icon() {
  return createPwaIcon({ size: 32 });
}
