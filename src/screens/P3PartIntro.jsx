import BreathScreen from '../components/BreathScreen'

/** p3-0 — Part 3 chapter divider after Part 2 skills. */
function P3PartIntro() {
  return (
    <BreathScreen
      ariaLabel="Part 3: Coaching in real life"
      immersiveNav
      eyebrow="Part 3 · Coaching in real life"
      statement="Now put the skills together."
      body="You've practiced feedback with OSCAR and strengthened your listening and questioning. Next, use GROW to shape a short coaching conversation from goal to action."
      bridgeLine="A simple structure can help the skills work together in the moment."
    />
  )
}

P3PartIntro.fullBleed = true

export default P3PartIntro
