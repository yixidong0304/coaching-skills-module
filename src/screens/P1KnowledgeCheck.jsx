import GuidedScenario from '../components/GuidedScenario'
import { knowledgeCheckScenario } from '../data/knowledgeCheckScenario'

export default function P1KnowledgeCheck() {
  return (
    <div className="knowledge-check">
      <GuidedScenario config={knowledgeCheckScenario} lockCourseNext />
    </div>
  )
}
