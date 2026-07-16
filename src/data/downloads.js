/** Public download assets under /public/downloads/ */

export const SKILL_CARDS = [
  {
    id: 'oscar',
    title: 'OSCAR',
    href: '/downloads/oscar_card.png',
    fileName: 'oscar_card.png',
  },
  {
    id: 'questioning',
    title: 'Questioning',
    href: '/downloads/question_card.png',
    fileName: 'question_card.png',
  },
  {
    id: 'grow',
    title: 'GROW',
    href: '/downloads/grow_card.png',
    fileName: 'grow_card.png',
  },
]

/** Bundle for wrap-2 “Download all three cards” — one zip, not three clicks. */
export const SKILL_CARDS_BUNDLE = {
  href: '/downloads/coaching-skills-cards.zip',
  fileName: 'coaching-skills-cards.zip',
}

export const COURSE_SLIDES = {
  href: '/downloads/course-slides.pdf',
  fileName: 'course-slides.pdf',
  available: true,
}

export function getSkillCard(id) {
  return SKILL_CARDS.find((card) => card.id === id) ?? null
}
