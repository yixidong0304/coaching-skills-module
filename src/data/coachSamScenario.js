import { GUIDED_PRACTICE_UI } from './guidedPracticeUi'

/**
 * Your turn: coach Sam — OSCAR practice for GuidedScenario (p2a-4).
 * Five turns: O, S, C, A, R. Outcomes: 'correct' | 'partial' | 'incorrect'
 */
export const coachSamScenario = {
  ...GUIDED_PRACTICE_UI,
  id: 'coach-sam',
  title: 'Your turn: coach Sam',
  instruction:
    "You're the manager. At each moment, choose what you'd say. Weak choices will loop back so you can try again.",
  scenario:
    'Sam is usually reliable, but for the third time, the weekly status report arrived a day late and without the revenue figures. You entered a leadership review without the numbers you needed. Coach Sam without turning the conversation into blame.',
  frameworkLabel: 'OSCAR',
  wordmark: ['O', 'S', 'C', 'A', 'R'],
  feedbackMode: 'primary-then-misses',
  missesVariant: 'light-list',
  missesTitle: 'Why the others fall short',
  prevNavLabel: 'Previous OSCAR decision',
  nextNavLabel: 'Continue to next OSCAR decision',
  nextNavLockedLabel: 'Select the correct coaching move to continue',
  completionVariant: 'complete',
  completion:
    'You completed a full OSCAR conversation: observed the facts, surfaced the impact, invited Sam’s solution, and connected it to a better result. Sam owns the fix—that’s coaching feedback.',
  stages: [
    {
      id: 'O',
      letter: 'O',
      name: 'Observation',
      prompt: 'How do you open?',
      choices: [
        {
          id: 'o-a',
          text: 'You always do this. Your reports are a mess.',
          outcome: 'incorrect',
          feedback:
            "'Always' is a generalization, and 'a mess' is a judgment. OSCAR opens with the specific facts you actually observed. Try again.",
        },
        {
          id: 'o-b',
          text: 'Why do you keep sending these in late?',
          outcome: 'partial',
          feedback:
            "'Why' questions put people on the defensive fast. You're close. Lead with the observed facts first, then get to impact. Try the observation.",
        },
        {
          id: 'o-c',
          text: 'The last three status reports came in a day late and were missing the revenue figures.',
          outcome: 'correct',
          feedback:
            "That's an Observation: specific, factual, no interpretation. It gives Sam something concrete to respond to.",
        },
      ],
    },
    {
      id: 'S',
      letter: 'S',
      name: 'Specific',
      prompt: 'Sam looks a little defensive. What do you add?',
      choices: [
        {
          id: 's-a',
          text: "And honestly, the formatting's been sloppy, the summaries read rushed, and you've been late to standup a few times too.",
          outcome: 'incorrect',
          feedback:
            "That's piling on. A list of complaints buries the point and puts Sam on the defensive. Specific means one or two key facts, not everything at once.",
        },
        {
          id: 's-b',
          text: "Specifically, it's the revenue figures that were missing each time. The rest of the report has been solid.",
          outcome: 'correct',
          feedback:
            "That's Specific: one precise, actionable fact, and naming what's solid keeps it fair. Sam knows exactly what to fix. Observation names what happened. Specific narrows it to the one fact that matters most.",
        },
        {
          id: 's-c',
          text: "Things just haven't been up to standard lately.",
          outcome: 'partial',
          feedback:
            "Too vague to act on. 'Up to standard' is a judgment. Specific means naming the exact behavior. Try again.",
        },
      ],
    },
    {
      id: 'C',
      letter: 'C',
      name: 'Consequences',
      prompt: 'Sam nods. What next?',
      choices: [
        {
          id: 'c-a',
          text: 'This makes you look bad in front of leadership.',
          outcome: 'partial',
          feedback:
            "That's telling, and it's a bit of a threat. Consequences land better as a question that lets Sam see the impact.",
        },
        {
          id: 'c-b',
          text: 'What impact do you think missing those figures had on the leadership review?',
          outcome: 'correct',
          feedback:
            'A Consequences question. It helps Sam recognize the impact instead of you asserting it.',
        },
        {
          id: 'c-c',
          text: "It's fine, don't stress about it.",
          outcome: 'incorrect',
          feedback:
            "Now you've dissolved the feedback entirely. Coaching isn't softening things away. It's helping Sam see the real impact.",
        },
      ],
    },
    {
      id: 'A',
      letter: 'A',
      name: 'Actions',
      prompt: 'Sam sees the issue. Now what?',
      choices: [
        {
          id: 'a-a',
          text: 'Just get them in on time from now on.',
          outcome: 'partial',
          feedback:
            "That's an instruction. It might work once, but it builds no ownership. Ask a 'what/how' question so Sam owns the fix.",
        },
        {
          id: 'a-b',
          text: 'What would help you get these in complete and on time?',
          outcome: 'correct',
          feedback:
            "An Actions question: 'what/how,' inviting Sam to own the solution. That's the coaching move.",
        },
        {
          id: 'a-c',
          text: 'Do you think this role is the right fit for you?',
          outcome: 'incorrect',
          feedback:
            'That escalates from a fixable behavior to a character judgment. Keep it on the specific action.',
        },
      ],
    },
    {
      id: 'R',
      letter: 'R',
      name: 'Results',
      prompt: 'Sam suggests a fix. How do you close?',
      choices: [
        {
          id: 'r-a',
          text: 'Great, glad we sorted it.',
          outcome: 'partial',
          feedback:
            'You closed a beat early. One Results question makes the payoff concrete and locks in the change.',
        },
        {
          id: 'r-b',
          text: 'How would getting the report in complete and on time change the next review?',
          outcome: 'correct',
          feedback:
            "A Results question. It connects the new behavior to a better outcome, in Sam's own words. Full OSCAR loop complete.",
        },
      ],
    },
  ],
}
