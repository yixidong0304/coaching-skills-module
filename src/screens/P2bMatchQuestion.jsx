import SectionHeading from '../components/SectionHeading'
import MatchQuestionBoard from '../components/MatchQuestionBoard'

export default function P2bMatchQuestion() {
  return (
    <div>
      <SectionHeading title="Match the question to its type" />

      <p className="m-0 mb-6 text-body text-ink whitespace-nowrap max-[800px]:whitespace-normal">
        For each question, pick the family it belongs to. Six questions. Go.
      </p>

      <MatchQuestionBoard lockCourseNext />
    </div>
  )
}
