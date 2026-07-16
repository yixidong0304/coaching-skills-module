import SectionHeading from '../components/SectionHeading'
import MatchQuestionBoard from '../components/MatchQuestionBoard'
import useScreenEntrance from '../hooks/useScreenEntrance'

export default function P2bMatchQuestion() {
  const entrancePhase = useScreenEntrance(650)

  return (
    <div className={['ia-quiz', entrancePhase].join(' ')}>
      <SectionHeading title="Match the question to its type" />

      <p className="screen-lede m-0">
        For each question, pick the family it belongs to. Six questions. Go.
      </p>

      <MatchQuestionBoard lockCourseNext />
    </div>
  )
}
