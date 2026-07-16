import SectionHeading from '../components/SectionHeading'
import Caption from '../components/Caption'

/** Placeholder for screens whose content will be built in later prompts. */
export default function StubScreen({ title, partLabel }) {
  return (
    <div>
      <SectionHeading title={title} eyebrow={partLabel} />
      <Caption>🚧 Content to be built</Caption>
    </div>
  )
}
