/**
 * Ordered screen descriptors for the Coaching Skills for Managers module.
 * componentKey maps to a stub (or future real screen) in the registry.
 *
 * Screens with partIntro: true represent the part in the sidebar header
 * (no separate lesson row).
 */
export const screens = [
  // Intro
  {
    id: 'intro-1',
    part: 'intro',
    partLabel: 'Intro',
    title: 'Welcome',
    componentKey: 'IntroWelcome',
    fullBleed: true,
  },
  {
    id: 'intro-2',
    part: 'intro',
    partLabel: 'Intro',
    title: "What you'll learn",
    componentKey: 'IntroWhatYoullLearn',
  },

  // Part 1 · What is coaching?
  {
    id: 'p1-0',
    part: 'part1',
    partLabel: 'Part 1 · What is coaching?',
    title: 'Not an extra task',
    componentKey: 'P1NotExtraTask',
    fullBleed: true,
    partIntro: true,
  },
  {
    id: 'p1-1',
    part: 'part1',
    partLabel: 'Part 1 · What is coaching?',
    title: 'Coaching IS / IS NOT',
    componentKey: 'P1CoachingIsIsNot',
  },
  {
    id: 'p1-2',
    part: 'part1',
    partLabel: 'Part 1 · What is coaching?',
    title: 'Coaching vs directing',
    componentKey: 'P1CoachingVsDirecting',
  },
  {
    id: 'p1-3',
    part: 'part1',
    partLabel: 'Part 1 · What is coaching?',
    title: 'Same leader, two modes',
    componentKey: 'P1ManagerVsCoach',
  },
  {
    id: 'p1-4',
    part: 'part1',
    partLabel: 'Part 1 · What is coaching?',
    title: 'Knowledge check',
    componentKey: 'P1KnowledgeCheck',
  },

  // Part 2 · How to coach (divider = part header in sidebar)
  {
    id: 'p2-0',
    part: 'part2',
    partLabel: 'Part 2 · How to coach',
    title: 'Two skills, one coaching move',
    componentKey: 'P2PartIntro',
    fullBleed: true,
    hideBottomNav: true,
    partIntro: true,
  },
  {
    id: 'p2a-1',
    part: 'part2',
    partLabel: 'Part 2 · How to coach',
    subsection: 'p2a',
    subsectionLabel: 'Skill 1 · Feedback with OSCAR',
    title: 'Feedback is a conversation',
    componentKey: 'P2aFeedbackConversation',
  },
  {
    id: 'p2a-2',
    part: 'part2',
    partLabel: 'Part 2 · How to coach',
    subsection: 'p2a',
    subsectionLabel: 'Skill 1 · Feedback with OSCAR',
    title: 'Meet OSCAR',
    componentKey: 'P2aMeetOscar',
  },
  {
    id: 'p2a-3',
    part: 'part2',
    partLabel: 'Part 2 · How to coach',
    subsection: 'p2a',
    subsectionLabel: 'Skill 1 · Feedback with OSCAR',
    title: 'OSCAR step by step',
    componentKey: 'P2aOscarStepByStep',
  },
  {
    id: 'p2a-4',
    part: 'part2',
    partLabel: 'Part 2 · How to coach',
    subsection: 'p2a',
    subsectionLabel: 'Skill 1 · Feedback with OSCAR',
    title: 'Your turn: coach Sam',
    componentKey: 'P2aYourTurn',
  },
  {
    id: 'p2a-5',
    part: 'part2',
    partLabel: 'Part 2 · How to coach',
    subsection: 'p2a',
    subsectionLabel: 'Skill 1 · Feedback with OSCAR',
    title: 'OSCAR, in one card',
    componentKey: 'P2aOscarWrapUp',
  },
  {
    id: 'p2b-1',
    part: 'part2',
    partLabel: 'Part 2 · How to coach',
    subsection: 'p2b',
    subsectionLabel: 'Skill 2 · Listening & Powerful Questions',
    title: 'Listening makes questions work',
    componentKey: 'P2bHowTheyRelate',
  },
  {
    id: 'p2b-2',
    part: 'part2',
    partLabel: 'Part 2 · How to coach',
    subsection: 'p2b',
    subsectionLabel: 'Skill 2 · Listening & Powerful Questions',
    title: 'How to listen actively',
    componentKey: 'P2bListenActively',
  },
  {
    id: 'p2b-3',
    part: 'part2',
    partLabel: 'Part 2 · How to coach',
    subsection: 'p2b',
    subsectionLabel: 'Skill 2 · Listening & Powerful Questions',
    title: 'Four kinds of powerful questions',
    componentKey: 'P2bPowerfulQuestions',
  },
  {
    id: 'p2b-4',
    part: 'part2',
    partLabel: 'Part 2 · How to coach',
    subsection: 'p2b',
    subsectionLabel: 'Skill 2 · Listening & Powerful Questions',
    title: 'Match the question to its type',
    componentKey: 'P2bMatchQuestion',
  },

  // Part 3 · Coaching in real life (divider = part header in sidebar)
  {
    id: 'p3-0',
    part: 'part3',
    partLabel: 'Part 3 · Coaching in real life',
    title: 'Now put the skills together',
    componentKey: 'P3PartIntro',
    fullBleed: true,
    hideBottomNav: true,
    partIntro: true,
  },
  {
    id: 'p3a-1',
    part: 'part3',
    partLabel: 'Part 3 · Coaching in real life',
    title: 'GROW overview',
    componentKey: 'P3aGrowOverview',
  },
  {
    id: 'p3a-2',
    part: 'part3',
    partLabel: 'Part 3 · Coaching in real life',
    title: 'GROW in action',
    componentKey: 'P3aGrowInAction',
  },
  {
    id: 'p3a-3',
    part: 'part3',
    partLabel: 'Part 3 · Coaching in real life',
    title: 'GROW, anywhere',
    componentKey: 'P3aGrowAnywhere',
    fullBleed: true,
  },
  {
    id: 'p3b-1',
    part: 'part3',
    partLabel: 'Part 3 · Coaching in real life',
    title: 'Real situations',
    componentKey: 'P3bScenarioSelector',
  },
  {
    id: 'p3b-2',
    part: 'part3',
    partLabel: 'Part 3 · Coaching in real life',
    title: 'When to coach, and when not to',
    componentKey: 'P3bWhenNotApply',
  },

  // Wrap-up
  {
    id: 'wrap-1',
    part: 'wrap',
    partLabel: 'Wrap-up',
    title: 'Your journey',
    componentKey: 'WrapKeyTakeaways',
    fullBleed: true,
  },
  {
    id: 'wrap-2',
    part: 'wrap',
    partLabel: 'Wrap-up',
    title: 'Your materials',
    componentKey: 'WrapTakeYourCards',
  },
  {
    id: 'wrap-3',
    part: 'wrap',
    partLabel: 'Wrap-up',
    title: 'Go coach',
    componentKey: 'WrapGoCoach',
    fullBleed: true,
  },
]

/** Screens grouped by part, preserving order for the lesson menu. */
export function getGroupedScreens() {
  const groups = []
  let current = null

  for (const screen of screens) {
    if (!current || current.part !== screen.part) {
      current = {
        part: screen.part,
        partLabel: screen.partLabel,
        partIntro: null,
        screens: [],
        subsections: [],
      }
      groups.push(current)
    }
    if (screen.partIntro) {
      current.partIntro = screen
      continue
    }

    current.screens.push(screen)

    const subsectionId = screen.subsection ?? null
    const lastSub = current.subsections[current.subsections.length - 1]
    if (!lastSub || lastSub.id !== subsectionId) {
      current.subsections.push({
        id: subsectionId,
        label: screen.subsectionLabel ?? null,
        screens: [screen],
      })
    } else {
      lastSub.screens.push(screen)
    }
  }

  return groups
}

export function getScreenIndex(id) {
  return screens.findIndex((s) => s.id === id)
}

export function getScreenById(id) {
  return screens.find((s) => s.id === id)
}
