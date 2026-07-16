/**
 * Real situations (p3b-1) — integrated practice content.
 * All three situations use the same approach choices: OSCAR / GROW / Questions only.
 */
export const REAL_SITUATIONS = [
  {
    id: 'A',
    title: 'Difficult feedback',
    overview:
      'A strong team member has recently become short and dismissive with colleagues.',
    summary:
      'A normally solid team member has been short and dismissive with colleagues in the last few meetings. Others have noticed. You need to address it without blowing it up.',
    approachPrompt: 'Which approach fits best?',
    choices: [
      {
        id: 'a-oscar',
        text: 'OSCAR',
        outcome: 'correct',
        feedback:
          'This is a feedback conversation—start from observed facts with OSCAR.',
      },
      {
        id: 'a-grow',
        text: 'GROW',
        outcome: 'partial',
        feedback:
          'GROW structures problem-solving; here the core move is delivering feedback. OSCAR fits better.',
        missSummary:
          'GROW can help later if you move into solving together, but the first need here is structured feedback.',
      },
      {
        id: 'a-questions',
        text: 'Questions only',
        outcome: 'partial',
        feedback:
          'Questions will matter, but without a feedback structure you can circle. Anchor with OSCAR.',
        missSummary:
          'Questions will matter inside the conversation, but without a feedback structure you can circle. Anchor with OSCAR first.',
      },
    ],
    answerSupport:
      'OSCAR gives the conversation a clear factual starting point before moving into reflection or problem-solving.',
    modelQuestion:
      'In the last two team meetings I noticed some sharp exchanges with colleagues. What impact do you think that’s having on the team?',
    modelWhy: 'Opens with an observed fact, then asks about impact.',
  },
  {
    id: 'B',
    title: 'Missing goals',
    overview:
      'A direct report has missed two months of targets, and you do not yet know why.',
    summary:
      "A direct report has missed their targets two months running and seems disengaged. You don't fully know why.",
    approachPrompt: 'Which approach fits best?',
    choices: [
      {
        id: 'b-oscar',
        text: 'OSCAR',
        outcome: 'partial',
        feedback:
          "You don't have a clear observed behavior to feed back yet. Understand first—GROW fits better.",
        missSummary:
          "OSCAR fits once you have a clear behavior to name. Here you still need the real picture—GROW first; feedback can come later.",
      },
      {
        id: 'b-grow',
        text: 'GROW',
        outcome: 'correct',
        feedback:
          "You need structure and the real picture. GROW's Reality stage is built for “you don't fully know why.”",
      },
      {
        id: 'b-questions',
        text: 'Questions only',
        outcome: 'partial',
        feedback:
          'Questions help, but a short GROW arc keeps Goal → Reality → Options → next step on track.',
        missSummary:
          'Question families help inside the conversation, but a short GROW arc keeps Goal → Reality → Options → next step on track.',
      },
    ],
    answerSupport:
      'GROW gives you a short arc to understand what is happening before you jump to feedback or loose questions.',
    modelQuestion:
      "What would a solid month look like for you? And what's getting in the way right now?",
    modelWhy: 'Pairs a Goal question with a Reality question.',
  },
  {
    id: 'C',
    title: 'After a mistake',
    overview:
      'A resolved client error has left a team member discouraged and defensive.',
    summary:
      "Someone on your team made an error that caused a client hiccup. It's resolved. You want them to learn from it, not just feel bad about it.",
    approachPrompt: 'Which approach fits best?',
    choices: [
      {
        id: 'c-oscar',
        text: 'OSCAR',
        outcome: 'partial',
        feedback:
          'Workable, but a full feedback structure can feel heavy for a resolved issue. Lighter questions fit.',
        missSummary:
          'OSCAR is useful for heavier feedback; here the issue is resolved, so lighter learning questions fit. You could still use an Observation later if a pattern emerges.',
      },
      {
        id: 'c-grow',
        text: 'GROW',
        outcome: 'partial',
        feedback:
          'GROW is useful for ongoing problems; here a few learning-focused questions are enough.',
        missSummary:
          'GROW helps with ongoing problems; a few learning-focused questions are enough for a resolved mistake. GROW remains useful if a bigger pattern shows up.',
      },
      {
        id: 'c-questions',
        text: 'Questions only',
        outcome: 'correct',
        feedback:
          "It's resolved. The goal is learning, not correction—focused questions do that.",
      },
    ],
    answerSupport:
      'A few learning-focused questions keep the conversation light when the issue is already resolved.',
    modelQuestion:
      "Now that it's sorted, what do you make of how it happened? What would you do differently next time?",
    modelWhy: 'Learning-focused, without blame.',
  },
]

/** Reflection after the model response — not a wording match test. */
export const REAL_SITUATIONS_COMPARE = {
  lead: 'Compare the shape',
  bullets: [
    'Is it fact-based?',
    'Is it open?',
    'Does it help the person think or move forward?',
  ],
  note: 'Your wording does not need to match the model.',
}

/** Any non-empty response can enable “Compare with a model.” */
export const REAL_SITUATIONS_TEXT_MIN = 1
