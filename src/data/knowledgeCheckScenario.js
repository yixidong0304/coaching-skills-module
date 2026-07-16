import { GUIDED_PRACTICE_UI } from './guidedPracticeUi'

/**
 * p1-4 — Quick check: coaching or directing?
 * Compact binary layout; selected-only feedback; brief “Why not B?” after correct.
 */
export const knowledgeCheckScenario = {
  ...GUIDED_PRACTICE_UI,
  id: 'knowledge-check',
  title: 'Quick check: coaching or directing?',
  instruction: null,
  scenario: null,
  showScenario: false,
  showWordmark: false,
  navPlacement: 'bottom',
  feedbackMode: 'primary-then-misses',
  missesVariant: 'compact',
  prevNavLabel: 'Previous question',
  nextNavLabel: 'Next question',
  nextNavLockedLabel: 'Answer correctly to continue',
  completionVariant: 'next-step',
  completion:
    'You can tell the two approaches apart. Next, learn the two skills that make coaching work.',
  stages: [
    {
      id: 'q1',
      letter: '1',
      name: 'Question 1',
      prompt:
        "A team member is unsure how to handle a client complaint. Their manager says: 'What do you think is driving the complaint, and what would you try first?' Coaching or directing?",
      choices: [
        {
          id: 'q1-a',
          text: 'Coaching',
          outcome: 'correct',
          feedback:
            'Right: open questions that get the person thinking and owning the next step. That\'s the core coaching move.',
        },
        {
          id: 'q1-b',
          text: 'Directing',
          outcome: 'incorrect',
          feedback:
            'Not quite: no instruction was given. The manager is asking so the person works it out. That\'s coaching.',
          missSummary:
            'No instruction was given—the manager asked so the person works it out.',
        },
      ],
    },
    {
      id: 'q2',
      letter: '2',
      name: 'Question 2',
      prompt:
        "A serious client emergency is unfolding. The manager says: 'Do exactly this, now, and we'll talk it through after.' Is that the right call?",
      choices: [
        {
          id: 'q2-a',
          text: 'Yes: direct now, coach after',
          outcome: 'correct',
          feedback:
            'Exactly. In a crisis, clear direction wins. Coaching has its place before or after the emergency, not during.',
        },
        {
          id: 'q2-b',
          text: 'No: they should have coached',
          outcome: 'incorrect',
          feedback:
            'Direction is right here. Forcing coaching into a crisis over-applies the skill. Coach around the event, not during it.',
          missSummary:
            'Direction is right during a crisis; coach before or after it.',
        },
      ],
    },
  ],
}
