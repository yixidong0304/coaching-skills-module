import GuidedScenario from '../components/GuidedScenario'
import { coachSamScenario } from '../data/coachSamScenario'

/** Same GuidedScenario engine as p3a-2; Sam content via config. */
export default function P2aYourTurn() {
  return <GuidedScenario config={coachSamScenario} lockCourseNext />
}
