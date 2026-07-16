import { QUESTION_FAMILIES } from './questionBank'

/**
 * Framework-level coaching cheat sheet — no scenario answers or hints.
 */
export const CHEAT_SHEET_SECTIONS = [
  {
    id: 'oscar',
    title: 'OSCAR',
    tag: 'For feedback conversations.',
    items: [
      { label: 'Observation', line: 'facts you saw' },
      { label: 'Specific', line: '1–2 key facts' },
      { label: 'Consequences', line: "ask, don't tell" },
      { label: 'Actions', line: 'what/how questions' },
      { label: 'Results', line: 'explore the change' },
    ],
  },
  {
    id: 'grow',
    title: 'GROW',
    tag: 'For structuring a coaching conversation.',
    items: [
      { label: 'Goal', line: 'What needs to be achieved?' },
      { label: 'Reality', line: 'What is happening right now?' },
      { label: 'Options', line: 'What options do we have?' },
      { label: 'Way forward', line: 'What is the next practical step?' },
    ],
  },
  {
    id: 'questions',
    title: 'Question families',
    tag: 'For opening up thinking.',
    items: QUESTION_FAMILIES.map((family) => ({
      label: family.name,
      line: family.does.replace(/\.$/, ''),
    })),
  },
  {
    id: 'when-not',
    title: 'When NOT to coach',
    tag: null,
    items: null,
    body: "Crisis, safety, or a decision that's yours: direct now, coach before or after.",
  },
]
