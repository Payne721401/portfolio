interface SectionHeadingProps {
  tag: string;
  title: string;
}

export function SectionHeading({ tag, title }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-2">
        {tag}
      </span>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-neutral-50">
        {title}
      </h2>
    </div>
  );
}
