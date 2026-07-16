import GuidedScenario from '../components/GuidedScenario'
import { growInActionScenario } from '../data/growInActionScenario'

/** Same GuidedScenario engine as p2a-4; Priya content via config. */
export default function P3aGrowInAction() {
  return <GuidedScenario config={growInActionScenario} lockCourseNext />
}
