import BreathScreen from '../components/BreathScreen'

/** p3a-3 — GROW takeaway breath after GROW in action. */
function P3aGrowAnywhere() {
  return (
    <BreathScreen
      ariaLabel="GROW takeaway"
      eyebrow="TAKEAWAY"
      statement="A GROW conversation can fit into 5–10 minutes."
      body="It is a structure you carry into the next conversation—not another meeting you have to schedule."
      bridgeLine="Next: choose the right approach for real management situations."
    />
  )
}

P3aGrowAnywhere.fullBleed = true

export default P3aGrowAnywhere
