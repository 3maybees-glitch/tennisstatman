import { UpgradeCTA } from "./UpgradeCTA";

export function CourtsideGate({
  children,
  title = "Courtside members only",
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div
        className="pointer-events-none select-none blur-[6px] opacity-50"
        aria-hidden
      >
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-navy/40 p-6">
        <div className="w-full max-w-lg">
          <UpgradeCTA title={title} description={description} />
        </div>
      </div>
    </div>
  );
}
