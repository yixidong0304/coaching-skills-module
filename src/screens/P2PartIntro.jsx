import BreathScreen from '../components/BreathScreen'

/** p2-0 — Part 2 chapter divider after Part 1 knowledge check. */
function P2PartIntro() {
  return (
    <BreathScreen
      ariaLabel="Part 2: How to coach"
      immersiveNav
      eyebrow="Part 2 · How to coach"
      statement="Two skills turn coaching into action."
      body="First, you'll learn how to give feedback that opens a conversation instead of closing it. Then, you'll practice listening and asking questions that help people think for themselves."
      previews={[
        {
          heading: 'Feedback with OSCAR',
          body: 'Structure a clear, constructive conversation.',
        },
        {
          heading: 'Listening + powerful questions',
          body: 'Create space for the other person to think and take ownership.',
        },
      ]}
      bridgeLine="Start with feedback: a moment every manager faces."
    />
  )
}

P2PartIntro.fullBleed = true

export default P2PartIntro
