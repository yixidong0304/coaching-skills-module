export default function SectionHeading({ title, subtitle, eyebrow }) {
  return (
    <header className="mb-6">
      {eyebrow ? (
        <p className="mb-2 text-caption font-medium text-ink-soft uppercase tracking-wide">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-h1 font-bold text-forest m-0">{title}</h1>
      {subtitle ? (
        <p className="mt-2 text-body text-ink-soft m-0">{subtitle}</p>
      ) : null}
    </header>
  )
}
