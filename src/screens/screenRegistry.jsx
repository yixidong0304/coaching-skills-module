import { screens } from '../data/courseData'
import StubScreen from './StubScreen'
import ComponentGallery from './ComponentGallery'
import IntroWelcome from './IntroWelcome'
import IntroWhatYoullLearn from './IntroWhatYoullLearn'
import P1NotExtraTask from './P1NotExtraTask'
import P1CoachingVsDirecting from './P1CoachingVsDirecting'
import P1CoachingIsIsNot from './P1CoachingIsIsNot'
import P1ManagerVsCoach from './P1ManagerVsCoach'
import P1KnowledgeCheck from './P1KnowledgeCheck'
import P2PartIntro from './P2PartIntro'
import P2aFeedbackConversation from './P2aFeedbackConversation'
import P2aMeetOscar from './P2aMeetOscar'
import P2aOscarStepByStep from './P2aOscarStepByStep'
import P2aYourTurn from './P2aYourTurn'
import P2aOscarWrapUp from './P2aOscarWrapUp'
import P2bHowTheyRelate from './P2bHowTheyRelate'
import P2bListenActively from './P2bListenActively'
import P2bPowerfulQuestions from './P2bPowerfulQuestions'
import P2bMatchQuestion from './P2bMatchQuestion'
import P3PartIntro from './P3PartIntro'
import P3aGrowOverview from './P3aGrowOverview'
import P3aGrowInAction from './P3aGrowInAction'
import P3aGrowAnywhere from './P3aGrowAnywhere'
import P3bScenarioSelector from './P3bScenarioSelector'
import P3bWhenNotApply from './P3bWhenNotApply'
import WrapKeyTakeaways from './WrapKeyTakeaways'
import WrapTakeYourCards from './WrapTakeYourCards'
import WrapGoCoach from './WrapGoCoach'

function createStub(screen) {
  function ScreenStub() {
    return <StubScreen title={screen.title} partLabel={screen.partLabel} />
  }
  ScreenStub.displayName = `Stub(${screen.id})`
  return ScreenStub
}

/** Real screens keyed by courseData.componentKey */
const realByComponentKey = {
  IntroWelcome,
  IntroWhatYoullLearn,
  P1NotExtraTask,
  P1CoachingVsDirecting,
  P1CoachingIsIsNot,
  P1ManagerVsCoach,
  P1KnowledgeCheck,
  P2PartIntro,
  P2aFeedbackConversation,
  P2aMeetOscar,
  P2aOscarStepByStep,
  P2aYourTurn,
  P2aOscarWrapUp,
  P2bHowTheyRelate,
  P2bListenActively,
  P2bPowerfulQuestions,
  P2bMatchQuestion,
  P3PartIntro,
  P3aGrowOverview,
  P3aGrowInAction,
  P3aGrowAnywhere,
  P3bScenarioSelector,
  P3bWhenNotApply,
  WrapKeyTakeaways,
  WrapTakeYourCards,
  WrapGoCoach,
}

/** Real screens keyed by courseData.id (belt-and-suspenders) */
const realById = {
  'intro-1': IntroWelcome,
  'intro-2': IntroWhatYoullLearn,
  'p1-0': P1NotExtraTask,
  'p1-1': P1CoachingIsIsNot,
  'p1-2': P1CoachingVsDirecting,
  'p1-3': P1ManagerVsCoach,
  'p1-4': P1KnowledgeCheck,
  'p2-0': P2PartIntro,
  'p2a-1': P2aFeedbackConversation,
  'p2a-2': P2aMeetOscar,
  'p2a-3': P2aOscarStepByStep,
  'p2a-4': P2aYourTurn,
  'p2a-5': P2aOscarWrapUp,
  'p2b-1': P2bHowTheyRelate,
  'p2b-2': P2bListenActively,
  'p2b-3': P2bPowerfulQuestions,
  'p2b-4': P2bMatchQuestion,
  'p3-0': P3PartIntro,
  'p3a-1': P3aGrowOverview,
  'p3a-2': P3aGrowInAction,
  'p3a-3': P3aGrowAnywhere,
  'p3b-1': P3bScenarioSelector,
  'p3b-2': P3bWhenNotApply,
  'wrap-1': WrapKeyTakeaways,
  'wrap-2': WrapTakeYourCards,
  'wrap-3': WrapGoCoach,
}

/** Maps each courseData componentKey → screen component. */
export const screenRegistry = Object.fromEntries(
  screens.map((screen) => {
    const Real =
      realByComponentKey[screen.componentKey] ?? realById[screen.id]
    return [screen.componentKey, Real ?? createStub(screen)]
  }),
)

/** Resolve a screen descriptor to its component. */
export function resolveScreen(screen) {
  if (!screen) return null
  return (
    screenRegistry[screen.componentKey] ??
    realById[screen.id] ??
    null
  )
}

export { ComponentGallery }
