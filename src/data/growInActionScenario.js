import { GUIDED_PRACTICE_UI } from './guidedPracticeUi'

/**
 * GROW in action — guided scenario for GuidedScenario (p3a-2).
 * Lighter than Coach Sam: selected-only feedback, no distractor reveal.
 * Outcomes: 'correct' | 'partial' | 'incorrect'
 */
export const growInActionScenario = {
  ...GUIDED_PRACTICE_UI,
  id: 'grow-in-action',
  title: 'GROW in action',
  instruction:
    'At each stage, choose the question that best moves the conversation forward.',
  scenario:
    'Priya is a strong performer who has recently started saying yes to everything. Two deliverables are now slipping, and she seems stretched thin. Coach her through a short GROW conversation.',
  frameworkLabel: 'GROW',
  wordmark: ['G', 'R', 'O', 'W'],
  feedbackMode: 'selected-only',
  prevNavLabel: 'Previous GROW stage',
  nextNavLabel: 'Next GROW stage',
  nextNavLockedLabel: 'Select the correct question to continue',
  completionVariant: 'complete',
  completion:
    'You completed a full GROW conversation: define the goal, understand reality, explore options, and agree on a way forward.',
  stages: [
    {
      id: 'G',
      letter: 'G',
      name: 'Goal',
      prompt: "What's the best opening question?",
      choices: [
        {
          id: 'g-a',
          text: 'Should you just drop the newsletter project?',
          outcome: 'partial',
          feedback:
            "You've jumped to a solution before Priya has defined the goal.",
        },
        {
          id: 'g-b',
          text: "What would 'back on track' actually look like for you by Friday?",
          outcome: 'correct',
          feedback:
            'A clear Goal question lets Priya define the target in her own terms.',
        },
        {
          id: 'g-c',
          text: "What's wrong lately?",
          outcome: 'partial',
          feedback:
            'Too vague—a Goal question points forward at what she wants, not backward at what’s wrong.',
        },
      ],
    },
    {
      id: 'R',
      letter: 'R',
      name: 'Reality',
      prompt: 'What next?',
      choices: [
        {
          id: 'r-a',
          text: "What's actually on your plate right now, and which pieces are competing?",
          outcome: 'correct',
          feedback:
            'A Reality question surfaces the facts before moving to solutions.',
        },
        {
          id: 'r-b',
          text: "You've taken on too much, haven't you?",
          outcome: 'partial',
          feedback:
            "That's your assumption stated as fact—draw out what you both can see.",
        },
        {
          id: 'r-c',
          text: "Why didn't you say something sooner?",
          outcome: 'incorrect',
          feedback:
            "A blaming 'why' shuts down the honest picture you need here.",
        },
      ],
    },
    {
      id: 'O',
      letter: 'O',
      name: 'Options',
      prompt: 'What next?',
      choices: [
        {
          id: 'o-a',
          text: "Here's what I'd do: push two deadlines and hand off the newsletter.",
          outcome: 'partial',
          feedback:
            "That's your plan—Options is where Priya generates the possibilities.",
        },
        {
          id: 'o-b',
          text: 'What are a couple of ways you could create some room here?',
          outcome: 'correct',
          feedback:
            'An Options question helps Priya generate possibilities before choosing.',
        },
        {
          id: 'o-c',
          text: 'Have you tried working weekends?',
          outcome: 'incorrect',
          feedback:
            'A leading question toward one (unhealthy) fix—keep Options open.',
        },
      ],
    },
    {
      id: 'W',
      letter: 'W',
      name: 'Way forward',
      prompt: 'How do you close?',
      choices: [
        {
          id: 'w-a',
          text: 'Okay, sounds like a plan.',
          outcome: 'partial',
          feedback:
            'Too loose—Way forward names the specific first step and when.',
        },
        {
          id: 'w-b',
          text: 'Which of those will you try first, and when?',
          outcome: 'correct',
          feedback:
            'A Way forward question turns the conversation into a specific next step and timeline.',
        },
        {
          id: 'w-c',
          text: 'Let me know how it goes.',
          outcome: 'partial',
          feedback:
            'Friendly, but no commitment—pin the first step and timing before you wrap.',
        },
      ],
    },
  ],
}
