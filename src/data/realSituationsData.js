/**
 * Real situations (p3b-1) — scenario practice content from storyboard 3b.1.
 */
export const REAL_SITUATIONS = [
  {
    id: 'A',
    title: 'Difficult feedback',
    summary:
      'A normally solid team member has been short and dismissive with colleagues in the last few meetings. Others have noticed. You need to address it without blowing it up.',
    approachPrompt: 'Which approach fits best?',
    choices: [
      {
        id: 'a-oscar',
        text: 'OSCAR',
        outcome: 'correct',
        feedback:
          "It's a feedback conversation. Start from observed facts.",
      },
      {
        id: 'a-grow',
        text: 'GROW',
        outcome: 'partial',
        feedback:
          "GROW structures problem-solving; here the core move is delivering feedback well. OSCAR fits the moment better.",
      },
      {
        id: 'a-questions',
        text: 'Questions only',
        outcome: 'partial',
        feedback:
          "Questions will matter, but without OSCAR's shape you risk circling. Anchor in the framework.",
      },
    ],
    modelQuestion:
      'In the last two team meetings I noticed some sharp exchanges with colleagues. What impact do you think that\'s having on the team?',
    modelWhy:
      'opens with observed fact, then a Consequences question.',
  },
  {
    id: 'B',
    title: 'Missing goals',
    summary:
      "A direct report has missed their targets two months running and seems disengaged. You don't fully know why.",
    approachPrompt: 'Which approach fits best?',
    choices: [
      {
        id: 'b-grow',
        text: 'GROW + powerful questions',
        outcome: 'correct',
        feedback:
          "You need structure AND the real picture. GROW's Reality stage is built for 'you don't fully know why.'",
      },
      {
        id: 'b-oscar',
        text: 'OSCAR',
        outcome: 'partial',
        feedback:
          "You don't have a clear observed behavior to feed back yet. You need to understand first. GROW fits better.",
      },
      {
        id: 'b-direct',
        text: 'Direct instruction',
        outcome: 'incorrect',
        feedback:
          'Telling a disengaged person to hit targets addresses the symptom. Coach first.',
      },
    ],
    modelQuestion:
      "What would a solid month look like for you? And what's getting in the way right now?",
    modelWhy: 'a Goal question then a Reality question.',
  },
  {
    id: 'C',
    title: 'After a mistake',
    summary:
      "Someone on your team made an error that caused a client hiccup. It's resolved. You want them to learn from it, not just feel bad about it.",
    approachPrompt: 'Which approach fits best?',
    choices: [
      {
        id: 'c-lite',
        text: 'Coaching questions (OSCAR-lite, learning-focused)',
        outcome: 'correct',
        feedback:
          "It's resolved. The goal is learning, not correction. Light questions do it.",
      },
      {
        id: 'c-oscar',
        text: 'Full OSCAR',
        outcome: 'partial',
        feedback:
          'Workable, but a full feedback structure can feel heavy for a resolved issue. A lighter learning conversation fits.',
      },
      {
        id: 'c-none',
        text: 'Let it go',
        outcome: 'incorrect',
        feedback:
          'No conversation means no learning. The mistake becomes a cost with no return.',
      },
    ],
    modelQuestion:
      "Now that it's sorted, what do you make of how it happened? What would you do differently next time?",
    modelWhy: 'learning-focused, no blame.',
  },
]

export const REAL_SITUATIONS_COMPARE =
  "Yours doesn't need to match. Compare the shape: fact-based? open? forward-looking?"

export const REAL_SITUATIONS_TEXT_MIN = 10
