/**
 * Framework-level coaching cheat sheet — no scenario answers or hints.
 * Four sections for the Real Situations side drawer.
 */
export const CHEAT_SHEET_SECTIONS = [
  {
    id: 'oscar',
    title: 'OSCAR',
    tag: 'Use for feedback conversations.',
    items: [
      { label: 'Observation', line: 'facts you saw' },
      { label: 'Specific', line: 'focus on 1–2 key facts' },
      { label: 'Consequences', line: 'ask about the impact' },
      { label: 'Actions', line: 'ask what they could do next' },
      { label: 'Results', line: 'clarify the better outcome' },
    ],
  },
  {
    id: 'grow',
    title: 'GROW',
    tag: 'Use for structuring a short coaching conversation.',
    items: [
      { label: 'Goal', line: 'What needs to be achieved?' },
      { label: 'Reality', line: 'What is happening right now?' },
      { label: 'Options', line: 'What could they try?' },
      { label: 'Way forward', line: 'What will they do first, and when?' },
    ],
  },
  {
    id: 'questions',
    title: 'Question families',
    tag: null,
    items: [
      {
        label: 'Clarifying',
        line: 'opens the conversation and gets more detail',
      },
      {
        label: 'Challenging',
        line: 'tests assumptions and expands possibilities',
      },
      {
        label: 'Gaining commitment',
        line: 'turns reflection into a clear next step',
      },
      {
        label: 'Demonstrating listening',
        line: 'confirms understanding and shows you are following',
      },
    ],
  },
  {
    id: 'when-direct',
    title: 'When to direct',
    tag: null,
    items: null,
    body: 'Use clear direction when safety, compliance, an urgent decision, or a non-negotiable standard requires immediate action. Coach before or after, not during the critical moment.',
  },
]
