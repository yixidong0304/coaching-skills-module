/**
 * Powerful-question families + full stem banks (storyboard 2b.3).
 * Shared by p2b-3 family cards/modals and the coaching-move / download takeaway.
 */

export const QUESTION_FAMILIES = [
  {
    name: 'Clarifying',
    does: 'Opens the conversation and gets more detail.',
    modalLead:
      'Use these questions to open the conversation and understand what the person means.',
    stems: [
      'Tell me more about…?',
      'What makes you say that?',
      'What do you think caused this?',
    ],
  },
  {
    name: 'Challenging',
    does: 'Tests assumptions and expands possibilities.',
    modalLead:
      'Use these questions to test assumptions and help the person see more possibilities.',
    stems: [
      'What options do you think you have?',
      'What is stopping you?',
      'If you had to start again, what would you do?',
    ],
  },
  {
    name: 'Gaining commitment',
    does: 'Turns reflection into a clear next step.',
    modalLead:
      'Use these questions to turn reflection into a clear next step.',
    stems: [
      'What will you do next?',
      'When will you do it?',
      'What support do you need?',
    ],
  },
  {
    name: 'Demonstrating listening',
    does: 'Confirms understanding and shows you are following.',
    modalLead:
      'Use these prompts to confirm understanding and show that you are following their thinking.',
    stems: [
      'What I hear you saying is…',
      'Did I understand you correctly…',
    ],
  },
]

export const QUESTION_BANK = {
  Clarifying: [
    'Tell me more about…?',
    'You mentioned… what do you mean by…?',
    'What does it feel like?',
    'What seems to confuse you?',
    'What do you want?',
    'Can you say more?',
    'What makes you say that?',
    'How have you come to that conclusion?',
    'What do you think caused this?',
  ],
  Challenging: [
    'What do you want to achieve?',
    'What options do you think you have?',
    'What is needed in this situation?',
    'What are you willing to give up?',
    'What have you tried so far? What happened?',
    'What is stopping you?',
    'What is the worst/best thing that could happen?',
    'What concerns you most about…?',
    'How did you come to that conclusion?',
    'If you had to start again, what would you do?',
    'What has worked before?',
  ],
  'Gaining commitment': [
    'What will you do next?',
    'What would be the safest next step?',
    'What action will you take?',
    'What will you do?',
    'When will you do it?',
    'What support do you need to accomplish…?',
    'What resources do you need to accomplish…?',
    'Who else needs to be involved?',
    'What support do you need?',
  ],
  'Demonstrating listening': [
    'What I hear you saying is…',
    'It seemed to me you were telling me…',
    'Did I understand you correctly…',
    'Are you saying…',
    'These seem to be the key ideas you have expressed…',
    'Can you tell me more about…',
  ],
}

/** Ask-permission coaching move (storyboard 2b.3). */
export const STUCK_CALLOUT = {
  label: 'Coaching move',
  lead: 'If they are stuck, ask permission before offering your perspective:',
  question:
    'Would it help if I shared an idea, a suggestion, or my experience?',
  caption: 'This is the same ask-permission move used in OSCAR.',
}

export function getFamilyMeta(name) {
  return QUESTION_FAMILIES.find((family) => family.name === name) ?? null
}
