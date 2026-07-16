import { QUESTION_FAMILIES } from './questionBank'

/**
 * Match the question — sequential quiz for p2b-4.
 * Feedback names the distinguishing feature (storyboard 2b.4).
 */
export const MATCH_FAMILIES = QUESTION_FAMILIES.map((family) => ({
  id: family.name,
  name: family.name,
  does: family.does,
}))

export const MATCH_QUESTIONS = [
  {
    id: 'q1',
    text: 'When will you do it?',
    familyId: 'Gaining commitment',
    correctFeedback:
      'Yes—this question locks in a time, so it is Gaining commitment.',
    incorrectFeedback:
      'This one moves toward action with a clear when, not more detail or a challenge. Try Gaining commitment.',
  },
  {
    id: 'q2',
    text: 'Tell me more about…?',
    familyId: 'Clarifying',
    correctFeedback:
      'Yes—this question asks for more detail, so it is Clarifying.',
    incorrectFeedback:
      'This one asks for more detail, not a commitment to act. Try Clarifying.',
  },
  {
    id: 'q3',
    text: 'What is stopping you?',
    familyId: 'Challenging',
    correctFeedback:
      "Yes—this question tests what's in the way, so it is Challenging.",
    incorrectFeedback:
      'This one stretches thinking by testing barriers, not playing back or asking for detail. Try Challenging.',
  },
  {
    id: 'q4',
    text: 'What I hear you saying is…',
    familyId: 'Demonstrating listening',
    correctFeedback:
      'Yes—this question plays back what you heard, so it is Demonstrating listening.',
    incorrectFeedback:
      'This one shows you heard them by reflecting their words, not probing or committing to action. Try Demonstrating listening.',
  },
  {
    id: 'q5',
    text: 'What support do you need?',
    familyId: 'Gaining commitment',
    correctFeedback:
      'Yes—this question clears the path to act, so it is Gaining commitment.',
    incorrectFeedback:
      'This one clears the path to act, not a clarifying probe or a challenge to assumptions. Try Gaining commitment.',
  },
  {
    id: 'q6',
    text: 'What makes you say that?',
    familyId: 'Clarifying',
    correctFeedback:
      'Yes—this question digs behind the statement, so it is Clarifying.',
    incorrectFeedback:
      'This one asks for more detail behind a claim, not a commitment or a stretch challenge. Try Clarifying.',
  },
]

export const MATCH_COMPLETION_PERFECT =
  'Six for six. You can now hear what a question is doing, not just what it asks.'

export const MATCH_COMPLETION_NEUTRAL =
  'You completed all six. You can now hear what a question is doing, not just what it asks.'

/** @deprecated Use MATCH_COMPLETION_PERFECT / MATCH_COMPLETION_NEUTRAL */
export const MATCH_COMPLETION = MATCH_COMPLETION_PERFECT
