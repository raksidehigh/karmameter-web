import { ReactNode } from "react";

type UseCaseSectionProps = {
  badgeText: string;
  badgeColorClasses: string;
  title: string;
  description: string;
  bullets: { icon: string; iconColorClasses: string; text: string }[];
  rightContent: ReactNode;
  reverse?: boolean;
};

export function UseCaseSection({
  badgeText,
  badgeColorClasses,
  title,
  description,
  bullets,
  rightContent,
  reverse,
}: UseCaseSectionProps) {
  const layoutClasses = reverse
    ? "flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20"
    : "flex flex-col lg:flex-row items-center gap-12 lg:gap-20";

  return (
    <div className={layoutClasses}>
      <div className="flex-1 space-y-6">
        <div
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${badgeColorClasses}`}
        >
          {badgeText}
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>
        <p className="text-lg text-slate-500 leading-relaxed">{description}</p>
        <ul className="space-y-3 text-slate-600">
          {bullets.map((bullet) => (
            <li key={bullet.text} className="flex items-center gap-3">
              <span
                className={`material-symbols-outlined ${bullet.iconColorClasses}`}
              >
                {bullet.icon}
              </span>
              <span>{bullet.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 w-full max-w-xl lg:max-w-none">{rightContent}</div>
    </div>
  );
}

