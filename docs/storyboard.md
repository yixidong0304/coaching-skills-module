## PART 2 — HOW TO COACH
Bridge caption (banner): "You know what coaching is. Now, how do you actually do it?" Two skills, side by side: Giving & receiving feedback (OSCAR) and Listening & questioning.

## 2a — Giving & receiving feedback: OSCAR (showpiece)

### 2a.1 — Feedback is a conversation, not a monologue  [screen id: p2a-1]
- Title: "Feedback is a conversation, not a monologue"
- Body: "Feedback can feel like blame when it only tells someone what went wrong. Coaching feedback combines clear observations with thoughtful questions, creating space for reflection, learning, and response."
- Example pair (before→after illustration, not choices; equal-size cards, 1fr / arrow / 1fr):
  - Statement → "This keeps happening." (neutral card)
  - Coaching question → "When does this usually happen?" (mint card)
  - Entrance: statement → arrow → question (staggered fade/slide); hover scale on cards; respects prefers-reduced-motion
- Caption: "A statement names what happened; a thoughtful question opens space to understand it."
- Note: prepares for OSCAR (observation + questions); does not imply all statements are harmful or that coaching uses only questions.
- Interaction: none (cards not clickable) — light intro before the framework.

### 2a.2 — Meet OSCAR  [screen id: p2a-2]
- Title: "Meet OSCAR"
- Intro: "OSCAR is a five-step structure for coaching feedback, from what you observed to what changes next." (one line on desktop)
- Instruction: "Hover over or tap each letter to explore the five steps."
- Interactive OSCAR panel (`FrameworkShowcase`): sage `#89C273` 16:9 panel; watermark letters `#5F9B63` (~42% panel height, slight stagger); white overlapping words; hover/tap reveals bold white detail + forest dot + long dotted white leader. Absolute % positioning on desktop; mobile = acronym row + compact detail panel below. Active letter fully saturated; inactive letters/words dim. Do not list letter meanings in body copy — discover via hover/tap.
- Tip below: "Use the steps in order to keep feedback specific, constructive, and focused on action."
- Interaction: hover/focus/tap reveal; GROW reuses the same FrameworkShowcase treatment later.

### 2a.3 — OSCAR, step by step (with the worked example)  [screen id: p2a-3]
- Title: "OSCAR, step by step"
- Instruction: "Use the arrows or select a letter to build the conversation step by step."
- Lock hint (course Next): "Step through all five to continue."
- Header: OSCAR letters (interactive: pointer, hover, focus; current = underline + marker; visited ≠ unvisited) | step name. Direct letter selection allowed.
- Layout: 40/60 (stacks below 800px — Your move above Conversation so far). LEFT "Your move" (≤3 bullets). RIGHT "Conversation so far" (cumulative lines; past de-emphasized; current highlighted).
- Nav arrows beside content (aria-labels: "Previous OSCAR step" / "Next OSCAR step"); forward/back; must visit all five before continuing.
- Guidance and example (verbatim):
  - Observation — Share only what you personally observed. / State facts, not hearsay or interpretation. · "From the back of the room, I noticed you spent much of the presentation looking down rather than at the audience."
  - Specific — Name one or two facts the person can act on. / Avoid piling on too many improvement points. · "A few times, your voice dropped enough that it was difficult to hear from the back."
  - Consequences — Ask what impact the behavior had. / Share your perspective only if they are stuck, and ask permission first. · "What effect do you think that had on how the message landed? For me, it became harder to follow your main point."
  - Actions — Ask what they could do differently next time. / Use open “what” and “how” questions. · "How might you approach it differently next time? What would help you look up more often and keep your voice steady?"
  - Results — Ask how the new action could change the outcome. / Keep the learner focused on the future result. · "How would that change the way the presentation lands with the audience?"

### 2a.5 — OSCAR wrap-up + card  [screen id: p2a-5]
- Title: "OSCAR, in one card"
- Supporting line: "A one-page coaching guide to keep next to your screen."
- Green takeaway panel (no decorative OSCAR wordmark): TAKEAWAY TOOL · heading “OSCAR quick recap” · “Use this guide to structure your next feedback conversation.” · five equal white recap cards (O/S/C/A/R). Default: neutral border + soft shadow. Hover: translateY(-2px) only, green-tinted border (~35% forest), external shadow `0 8px 18px rgba(20, 70, 45, 0.16)` — no scale, no press. Not keyboard-focusable.
- Download CTA: primary "Download printable skills card" → `/downloads/oscar_card.png`; support "Print it or keep it open during feedback conversations."
- Next-skill preview (below download): neutral white card (no left accent bar) · “NEXT SKILL” · “Listening + powerful questions” · body copy · chips Active listening / Powerful questions. Informational only; advance with course Next.
## PART 3 — 3a: THE GROW MODEL

### 3a.1 — Meet GROW  [screen id: p3a-1]
- Title: "Meet GROW"
- Body (two short paragraphs): "OSCAR structures feedback. GROW structures a short coaching conversation when someone brings you a problem." / "Move through four stages: Goal, Reality, Options, and Way forward."
- Instruction caption: "Hover over or tap each letter to see its guiding question."
- Showcase panel (same treatment as OSCAR), 4 letters, details verbatim from source:
  G — Goal: "What needs to be achieved?" Define where you want to get.
  R — Reality: "What is happening right now?" Facts and observations, not assumptions.
  O — Options: "What options do we have?" Possible solutions; what has worked before.
  W — Way forward: "What is the next practical step?" Commit to a path: who does what, and when.
- Key Idea (below showcase): "GROW is a flexible conversation shape, not a formal meeting. You can use it in 5–10 minutes."
- Download row (bottom): primary "Download GROW guide" → `/downloads/grow_card.png` + "Keep the four stages and guiding questions nearby for your next coaching conversation."

### 3a.2 — GROW in action (guided example)  [screen id: p3a-2]
- Title: "GROW in action"
- Instruction: "At each stage, choose the question that best moves the conversation forward."
- Persistent scenario card: "Priya is a strong performer who has recently started saying yes to everything. Two deliverables are now slipping, and she seems stretched thin. Coach her through a short GROW conversation."
- Stage stepper: G·R·O·W letters as progress indicator (same highlight logic as OSCAR step-by-step).
- Feedback mode `selected-only` (lighter than Coach Sam): wrong/partial → feedback only under selected; correct → CORRECT — CONTINUE under correct only; no distractor explanations; retry until correct. Nav aria: Previous/Next GROW stage; → locked until correct.
- Per stage: prompt + 3 choices:
  G — "What's the best opening question?"
   A. "Should you just drop the newsletter project?" → close: "You've jumped to a solution before Priya has defined the goal."
   B. "What would 'back on track' actually look like for you by Friday?" → correct: "A clear Goal question lets Priya define the target in her own terms."
   C. "What's wrong lately?" → close: "Too vague—a Goal question points forward at what she wants, not backward at what’s wrong."
  R — "What next?"
   A. "What's actually on your plate right now, and which pieces are competing?" → correct: "A Reality question surfaces the facts before moving to solutions."
   B. "You've taken on too much, haven't you?" → close: "That's your assumption stated as fact—draw out what you both can see."
   C. "Why didn't you say something sooner?" → incorrect: "A blaming 'why' shuts down the honest picture you need here."
  O — "What next?"
   A. "Here's what I'd do: push two deadlines and hand off the newsletter." → close: "That's your plan—Options is where Priya generates the possibilities."
   B. "What are a couple of ways you could create some room here?" → correct: "An Options question helps Priya generate possibilities before choosing."
   C. "Have you tried working weekends?" → incorrect: "A leading question toward one (unhealthy) fix—keep Options open."
  W — "How do you close?"
   A. "Okay, sounds like a plan." → close: "Too loose—Way forward names the specific first step and when."
   B. "Which of those will you try first, and when?" → correct: "A Way forward question turns the conversation into a specific next step and timeline."
   C. "Let me know how it goes." → close: "Friendly, but no commitment—pin the first step and timing before you wrap."
- Completion (after W correct): ACTIVITY COMPLETE — "You completed a full GROW conversation: define the goal, understand reality, explore options, and agree on a way forward."
### 2a.4 — Your turn: coach Sam  [screen id: p2a-4]
- Title: "Your turn: coach Sam"
- Instruction (body paragraph): "You're the manager. At each moment, choose what you'd say. Weak choices will loop back so you can try again."
- Persistent scenario: "Sam is usually reliable, but for the third time, the weekly status report arrived a day late and without the revenue figures. You entered a leadership review without the numbers you needed. Coach Sam without turning the conversation into blame."
- Feedback mode `primary-then-misses`: wrong/partial → feedback only on selected option + labeled INCORRECT — TRY AGAIN / CLOSE — TRY AGAIN; correct → CORRECT — CONTINUE under selected, then light secondary list “Why the others fall short” (divider/spacing only — no bordered card). Forward locked until correct. Nav aria: Previous/Continue OSCAR decision.
- Five turns O→S→C→A→R (Observation & Specific choices unchanged; Specific correct feedback adds Observation vs Specific distinction).
  Consequences correct: "What impact do you think missing those figures had on the leadership review?"
  Results correct: "How would getting the report in complete and on time change the next review?"
- Completion: labeled ACTIVITY COMPLETE — "You completed a full OSCAR conversation: observed the facts, surfaced the impact, invited Sam’s solution, and connected it to a better result. Sam owns the fix—that’s coaching feedback."
- Note: turns map 1:1 to O, S, C, A, R. GROW practice uses lighter `selected-only` feedback (no distractor reveal).

## PART 2 — 2b: LISTENING & POWERFUL QUESTIONING

### 2b.1 — Listening makes questions work  [screen id: p2b-1]
- Title: "Listening makes questions work"
- Body paragraph: "Powerful questions only help when they respond to what the other person actually said. Coaching moves in a simple rhythm: listen, ask from what you heard, then listen again."
- Visual: horizontal three-stage coaching rhythm (Listen → Ask → Listen again). All three cards equal: white background, neutral border, soft shadow. Sequence via step numbers + arrows only. No habit chips on this page (habits taught on 2b.2).
  1. LISTEN — "Hear what the person is really saying." · "Pay attention to their words, tone, and what may be underneath the problem."
  2. ASK — "Ask a question based on what you heard." · "Help the person clarify the situation and think about what to do next."
  3. LISTEN AGAIN — "Listen closely to the answer." · "Use their response to decide what to ask or explore next."
- Desktop: three equal-height stages in a row (label → heading → body); arrows in fixed gaps, vertically centered. Tablet/mobile: stacked with downward arrows.
- Key Idea (shared component): "Good coaching is not a list of prepared questions. It is a responsive conversation."
- No interaction. No Skill 2 full-screen divider before this page — soft bridge from OSCAR wrap-up only.
- Title: "How to listen actively"
- Body paragraph: "Active listening comes down to four small habits—even in a two-minute conversation."
- Four static cards (2×2 grid), fully readable without interaction:
  • Attention (cue: Focus) — "Give the person your full attention, even in a short conversation. Put distractions aside."
  • Pause (cue: Wait) — "Leave room for silence. The pause is often where thinking happens."
  • Show it (cue: Signal) — "Use eye contact, nodding, and other small signals to show you are present."
  • Summarize (cue: Reflect back) — "Play back what you heard to confirm you understood it correctly."
- Hover polish only (informational card variant): pale mint background / stronger green border / optional 1–2px lift. Do not invert to forest or reverse text to white. Not keyboard-focusable.
- Cards top-aligned in equal-height 2×2 grid (header row + body; no vertical centering of short content).
- Key Idea (shared component, full grid width): "Active listening is visible. People can tell when you are present, patient, and following their thinking."

### 2b.3 — Four kinds of powerful questions  [screen id: p2b-3]
- Title: "Four kinds of powerful questions"
- Body paragraph: "You do not need a perfect question. You need the right kind at the right moment. These four families cover most everyday coaching conversations."
- Four labeled cards (2×2), each: family name, what it does, and 2–3 signature stems (verbatim from source):
  • Clarifying — Opens the conversation and gets more detail. "Tell me more about…?" · "What makes you say that?" · "What do you think caused this?"
  • Challenging — Tests assumptions and expands possibilities. "What options do you think you have?" · "What is stopping you?" · "If you had to start again, what would you do?"
  • Gaining commitment — Turns reflection into a clear next step. "What will you do next?" · "When will you do it?" · "What support do you need?"
  • Demonstrating listening — Confirms understanding and shows you are following. "What I hear you saying is…" · "Did I understand you correctly…"
- Instruction caption: "Preview each family below. Open a card to explore the full question bank."
- Interaction: pale informational-style hover (mint tint + lift); open/selected card stays light (white/pale mint, stronger green border + shadow, optional VIEWING badge) — never solid forest fill. Hint: "View full question bank →". Click opens a light modal with that family's when-to-use lead + full stem bank. Family cards rest on canvas/white (not mint).
- Modal: pale/white panel, forest title, dark body text, dimmed neutral overlay; Escape + focus trap; close labeled "Close question library"; focus returns to originating card.
- Below the four family cards:
  1. Download row — primary "Download question library" → `/downloads/question_card.png`; support: "Keep the full printable bank open during your next coaching conversation."
  2. Full-width pale mint callout (same family as Key Idea, no left stripe) — label "COACHING MOVE"; lead "If they are stuck, ask permission before offering your perspective:"; quoted question (slightly larger, semibold) "Would it help if I shared an idea, a suggestion, or my experience?"; caption "This is the same ask-permission move used in OSCAR." Not labeled KEY IDEA.
- Full stem lists live in `questionBank.js` (source of truth for the family modals).
- Note: former screen 2b.5 (Your question library) cut as redundant with 2b.3's modals; download stays on this page.

### 2b.4 — Practice: match the question  [screen id: p2b-4]
- Title: "Match the question to its type"
- Instruction line: "For each question, pick the family it belongs to. Six questions. Go."
- Sequential quiz (one stem at a time): stem mint card with eyebrow "N of 6:" + progress dots; four family ChoiceOptions (2×2) with one-line descriptors; bottom ← / → arrows (Sam/Priya rules — no auto-advance). Simple feedback variant: panel attached under selected option only; no other-choice explanations.
- Six stems in order:
  • "When will you do it?" → Gaining commitment
  • "Tell me more about…?" → Clarifying
  • "What is stopping you?" → Challenging
  • "What I hear you saying is…" → Demonstrating listening
  • "What support do you need?" → Gaining commitment
  • "What makes you say that?" → Clarifying
- Feedback: incorrect → INCORRECT — TRY AGAIN under selected; correct → CORRECT — CONTINUE under selected (e.g. “Yes—this question asks for more detail, so it is Clarifying.”); unlocks next. Previous items reviewable via ←.
- Completion: labeled ACTIVITY COMPLETE — “Six for six…” if all six correct on first attempt; otherwise “You completed all six…”. Screen marks complete then.
- Flow: next screen is 3.0 (Part 3 chapter divider); former 2b.5 removed.

### 3.0 — Part 3 chapter divider  [screen id: p3-0]
- Full-bleed forest chapter divider. In the lesson menu, this screen IS the Part 3 header (“Part 3 · Coaching in real life”) — no separate sidebar row. Same design language as p2-0. No decorative quotation. Immersive: BottomNav hidden; floating ← / → (same as p1-0). → leave-swipes left into GROW overview.
- Eyebrow: "PART 3 · COACHING IN REAL LIFE"
- Headline: "Now put the skills together."
- Body: "You've practiced feedback with OSCAR and strengthened your listening and questioning. Next, use GROW to shape a short coaching conversation from goal to action."
- Closing line: "A simple structure can help the skills work together in the moment."
- Continue via side → into GROW overview (p3a-1).

### 3a.3 — GROW takeaway  [screen id: p3a-3]
- Keep as high-value takeaway (time objection). Full-bleed forest panel; BottomNav Next remains.
- Eyebrow: "TAKEAWAY"
- Headline: "A GROW conversation can fit into 5–10 minutes."
- Body: "It is a structure you carry into the next conversation—not another meeting you have to schedule."
- Closing line: "Next: choose the right approach for real management situations."
- No Start button beyond standard Next.
## PART 3 — 3b: APPLYING COACHING — REAL SCENARIOS

### 3b.1 — Real situations: what would you do?  [screen id: p3b-1]
- Two views: **Overview** (landing) and **Scenario flow** (entered by clicking a scenario card; replaces overview — orientation + other cards not visible while in flow).
- Title: "Real situations: what would you do?" (both views; cheat sheet control stays top-right).
- **Overview**
  - Body (orientation): "You've learned the frameworks: OSCAR for feedback, GROW for structure, and the question families. This is where it comes together: three situations, pulled from a manager's real week, with no labels and no hints. There's no single right answer here. The skill you're practicing is choosing the approach and finding your first words." (italicize "choosing")
  - Task caption: "Complete at least one situation to continue. The other two are optional, and you can come back to them anytime. If you want to double-check a framework along the way, the Cheat sheet (top right) is always there." — "Cheat sheet" is an inline control that opens the same ReferenceDrawer as the top-right button.
  - Three scenario cards (check badge when completed). Course Next unlocks after **one** completed scenario; the other two remain optional.
  - Completion card (mint, below the three cards, once ≥1 done): "Nice work. You've completed [1/2] of the situations. Try another, or continue on when you're ready." / all three: "You've worked through all three situations. You've practiced choosing the approach. The last skill is knowing when not to coach at all. Continue on."
- **Scenario flow**
  - Top: ghost "← Back to situations" (returns to overview anytime; keeps progress if step 1 was completed).
  - Persistent mint SCENARIO card (Sam/Priya pattern) with the chosen situation.
  - Step 1 — "1. Which approach fits best?" ChoiceOptions + inline feedback (Sam-style retry). Bottom circular ←/→ like p2b-4: ← hidden on step 1; → disabled until correct.
  - Step 2 — "2. Write the first question you'd ask." Textarea; at ≥10 chars, primary "See the model response" reveals the model mint card + compare caption beneath. No → on step 2; ← returns to step 1.
  - After model revealed: one primary Button — "Explore other situations" if others remain, or "Finish" if this was the last of three — returns to Overview and marks the scenario complete.
- Scenario content (verbatim):
  A — Difficult feedback: "A normally solid team member has been short and dismissive with colleagues in the last few meetings. Others have noticed. You need to address it without blowing it up."
  B — Missing goals: "A direct report has missed their targets two months running and seems disengaged. You don't fully know why."
  C — After a mistake: "Someone on your team made an error that caused a client hiccup. It's resolved. You want them to learn from it, not just feel bad about it."
- Approach choices + feedback (verbatim):
  A: OSCAR ✅ "It's a feedback conversation. Start from observed facts." / GROW ⚠️ "GROW structures problem-solving; here the core move is delivering feedback well. OSCAR fits the moment better." / Questions only ⚠️ "Questions will matter, but without OSCAR's shape you risk circling. Anchor in the framework."
  B: GROW + powerful questions ✅ "You need structure AND the real picture. GROW's Reality stage is built for 'you don't fully know why.'" / OSCAR ⚠️ "You don't have a clear observed behavior to feed back yet. You need to understand first. GROW fits better." / Direct instruction ❌ "Telling a disengaged person to hit targets addresses the symptom. Coach first."
  C: Coaching questions (OSCAR-lite, learning-focused) ✅ "It's resolved. The goal is learning, not correction. Light questions do it." / Full OSCAR ⚠️ "Workable, but a full feedback structure can feel heavy for a resolved issue. A lighter learning conversation fits." / Let it go ❌ "No conversation means no learning. The mistake becomes a cost with no return."
- Models (verbatim):
  A: ""In the last two team meetings I noticed some sharp exchanges with colleagues. What impact do you think that's having on the team?" Opens with observed fact, then a Consequences question."
  B: ""What would a solid month look like for you? And what's getting in the way right now?" A Goal question then a Reality question."
  C: ""Now that it's sorted, what do you make of how it happened? What would you do differently next time?" Learning-focused, no blame."
  Caption under every model: "Yours doesn't need to match. Compare the shape: fact-based? open? forward-looking?"
- Optional coaching cheat sheet: persistent ghost button top-right ("Cheat sheet") opens a right slide-in `ReferenceDrawer` with compact OSCAR / GROW / question-family / when-not-to-coach cards. Framework-level reminder only — no scenario answers or hints. Close via X, outside click, or Escape.

### 3b.2 — When to coach, and when not to  [screen id: p3b-2]
- Title: "When to coach, and when not to"
- Body: "Coaching doesn't replace clear direction. In a crisis, a safety-critical moment, or a decision that's yours to make, you tell clearly and without apology. Coaching comes before (to prepare people) or after (to learn from it), not in the middle of the emergency."
- Highlight callout (forest/white, TAKEAWAY style): "Knowing when NOT to coach is part of the skill."
- No interaction. This pays off the seed planted in the Part 1 knowledge check.
## INTRO

### I.1 — Welcome  [screen id: intro-1]
- Full-screen hook using the BreathScreen treatment (forest, centered), plus a three-beat text reveal:
  Beat 1 (large): "Coaching = extra task?"
  Beat 2: the same line transforms — "extra task" gets struck through: "Coaching ≠ extra task"
  Beat 3 (large): "Coaching = a different way of communicating."
  Beats auto-advance (~1.4s apart) AND advance on click/tap; reduced-motion shows all three stacked.
- Below, persistent: the "~15 min" pill badge and a white "Start" button (Start = course Next).

### I.2 — What you'll learn  [screen id: intro-2]
- Title: "What you'll be able to do"
- Body intro line: "Fifteen minutes, five skills: everything hands-on:"
- Five objectives (styled list, one per line, small forest number or check):
  1. Tell when to coach and when to just direct, and why it matters.
  2. Give feedback that opens a conversation, using OSCAR.
  3. Ask powerful questions that get people thinking.
  4. Run a short coaching conversation with GROW.
  5. Pick the right approach for the real situations you face.
- Footnote caption: "You'll leave with downloadable coaching cards to keep: OSCAR, questioning, and GROW."

## PART 1 — WHAT IS COACHING?

### 1.1 — Coaching IS / IS NOT  [screen id: p1-1]
- Title: "What coaching is, and isn't"
- Intro (narrow, secondary): "Coaching helps people think through situations and take ownership, rather than relying on the manager to provide every answer."
- Two labeled columns (IS = mint-tint cards with check icons; IS NOT = canvas cards with a subtle ✕):
  Coaching IS: Supporting people's thinking instead of handing them the answer / Strengthening ownership and accountability / Helping people learn from everyday situations
  Coaching is NOT: A long, formal one-to-one every time—it can happen in minutes / Ignoring standards, quality, or expectations / A replacement for a clear decision when one is needed
- Reveal: IS column fades in first, IS NOT second. Caption: "Coaching starts with curiosity: focus on the person's thinking, not just the immediate problem."

### 1.2 — Coaching vs directing  [screen id: p1-2]
- Title: "Two ways to respond"
- Intro (narrow, secondary): "So what does coaching look like in the moment? When someone brings you a problem, you can either give the answer or create space for them to think."
- Two equal cards side by side:
  DIRECTING — "Do it exactly like this." You provide the answer. This is useful when speed, safety, or a clear decision matters most.
  COACHING — "What's the goal here? What do you think caused it? What will you try first?" You ask and listen so the other person can think, learn, and take ownership.
- Caption: "Coaching is not the absence of standards. It is a curious, deliberate way of helping someone think within them."
- Does not imply coaching is always better than directing.

### 1.3 — Manager vs coach  [screen id: p1-3]
- Title: "Same leader, two modes"
- Intro (narrow, secondary): "Directing and coaching are not separate roles. They are two modes the same leader uses."
- Two cards with a subtle always-visible “move between” cue (no click required):
  MANAGER MODE — Focus on execution and outcomes. Set priorities, allocate resources, make decisions, and ensure work is completed safely, on time, and to standard.
  COACH MODE — Focus on capability and growth. Create space for people to think, learn from experience, and take greater ownership through questions and feedback.
- Caption: "Coaching does not replace managing. Strong leaders move between both modes deliberately."

### 1.4 — Knowledge check  [screen id: p1-4]
- Title: "Quick check: coaching or directing?"
- Compact binary layout (numbered, A/B labels, inline feedback under selected option only until correct, bottom arrows, sequential gating):
  1. "A team member is unsure how to handle a client complaint. Their manager says: 'What do you think is driving the complaint, and what would you try first?' Coaching or directing?"
    A. Coaching ✅ "Right: open questions that get the person thinking and owning the next step. That's the core coaching move."
    B. Directing ❌ "Not quite: no instruction was given. The manager is asking so the person works it out: that's coaching."
  2. "A serious client emergency is unfolding. The manager says: 'Do exactly this, now, and we'll talk it through after.' Is that the right call?"
    A. Yes: direct now, coach after ✅ "Exactly. In a crisis, clear direction wins. Coaching has its place before or after the emergency, not during."
    B. No: they should have coached ❌ "Direction is right here. Forcing coaching into a crisis over-applies the skill. Coach around the event, not during it."
- After correct: compact secondary line “Why not B?” (not a card; not “WHY THE OTHER CHOICE MISSES THE MARK”). Q2 miss: “Direction is right during a crisis; coach before or after it.”
- Completion: labeled NEXT STEP callout — "You can tell the two approaches apart. Next, learn the two skills that make coaching work."

### 2.0 — Part 2 chapter divider  [screen id: p2-0]
- Full-bleed forest chapter divider. In the lesson menu, this screen IS the Part 2 header (“Part 2 · How to coach”) — no separate sidebar row for the divider title. No quote. Immersive: BottomNav hidden; floating ← / → (same as p1-0). → leave-swipes left into the first Part 2 content screen.
- Eyebrow: "PART 2 · HOW TO COACH"
- Headline: "Two skills turn coaching into action."
- Body: "First, you'll learn how to give feedback that opens a conversation instead of closing it. Then, you'll practice listening and asking questions that help people think for themselves."
- Preview items:
  1. Feedback with OSCAR — "Structure a clear, constructive conversation."
  2. Listening + powerful questions — "Create space for the other person to think and take ownership."
- Closing line: "Start with feedback: a moment every manager faces."
- Continue via side → into Feedback is a conversation (p2a-1).

## WRAP-UP

### W.1 — Key takeaways  [screen id: wrap-1]
- BreathScreen treatment (forest, centered). Eyebrow: "THREE THINGS TO TAKE WITH YOU"
- Three lines, staggered reveal (each its own line, generous spacing):
  "Coaching works under time pressure. It can happen in minutes."
  "One good question can beat a long explanation."
  "Small moments build long-term capability."

### W.2 — Your materials  [screen id: wrap-2]
- Title (sidebar + SectionHeading): "Your materials"
- Body: "Well done. You've completed the course. As promised, everything you worked with is yours to keep: the full slide deck behind this module, and the three coaching skills cards. Keep them close: the best time to use them is your next real conversation."
- Materials row (mirrors intro-2 layout — two cards):
  1. LEFT — "Course slides": preview thumbnail (`slides_preview.png`) + one-line description + primary "Download slides" → `/downloads/course-slides.pdf` (live).
  2. RIGHT — "Coaching skills cards": preview thumbnail (`cards_preview.png`) + one-line description + ONE primary "Download all three cards" → `/downloads/coaching-skills-cards.zip` (OSCAR + questioning + GROW). No per-card buttons here — individual PNG downloads live on framework pages.
- Below: unscored reflection input — label: "One coaching question I'll use this week:" (single-line text, subtle confirm: "Keep it somewhere you'll see it.")
- No summative quiz (deliberate — in-module practice already assessed all objectives).

### W.3 — Go coach  [screen id: wrap-3]
- Final BreathScreen (forest, full-bleed, centered). LAST screen of the course.
- Eyebrow: "ONE LAST THING"
- Large white statement: "You don't need the perfect question. You need a real one, asked with genuine curiosity."
- Bridge line (~85% white): "Fifteen minutes here. The real course is your next conversation. Go coach."
- Staggered fade entrance. Visiting marks course complete (100%). Bottom-nav Next is hidden.
- Sidebar title: "Go coach" (Wrap-up group).

### 2a.5 — OSCAR wrap-up + card  [screen id: p2a-5]  (UPDATED)
- See primary 2a.5 entry above (high-contrast recap cards + Next skill transition block + printable card download).

### 3a.1 — Meet GROW  (ADDITION)
- At the bottom of the screen, download row: primary "Download GROW guide" → `/downloads/grow_card.png` + "Keep the four stages and guiding questions nearby for your next coaching conversation."
- Key Idea above download: "GROW is a flexible conversation shape, not a formal meeting. You can use it in 5–10 minutes."

### W.1 — Your journey (REPLACES "Key takeaways")  [screen id: wrap-1]
- Title: "The whole module, at a glance"
- Body line: "Here's the ground you just covered, and how it fits together."
- A MODULE MAP: a horizontal flow of five nodes connected by arrows/line, each node a small card:
  1. WHAT COACHING IS — "Asking, not telling, and knowing when each fits."
  2. OSCAR — "Feedback as a conversation: Observation → Specific → Consequences → Actions → Results."
  3. LISTENING & QUESTIONS — "The container and what you do inside it: four question families."
  4. GROW — "A whole coaching conversation in four moves, hallway-sized."
  5. REAL SITUATIONS — "Choosing the approach, and knowing when not to coach."
- Nodes reveal sequentially on entrance (staggered, left to right, connector line drawing between them).
- Below the map, the three takeaway lines as a single caption row: "Coaching works under time pressure · One good question can beat a long explanation · Small moments build long-term capability."
### I.1 — Welcome (REDESIGNED — course landing page)  [screen id: intro-1]
- Modeled on standard online-course landing pages (Coursera/Google Learning): NOT a breath screen.
- Layout, top to bottom:
  - Eyebrow/category chip: "MANAGEMENT & LEADERSHIP · SELF-PACED ELEARNING"
  - Course title (display scale): "Coaching Skills for Managers"
  - One-line description: "Give feedback that lands, ask questions that unlock thinking, and coach in the everyday flow of work."
  - Meta row (icon + label chips): "~15 minutes" · "5 skills" · "3 take-away cards" · "No prerequisites"
  - Primary Button: "Start course" (= course next())
- Clean canvas background (standard screen, not full-bleed).

### 1.0 — Coaching is not an extra task (NEW — the relocated hook)  [screen id: p1-0, FIRST screen of Part 1]
- In the lesson menu, this screen IS the Part 1 header (“Part 1 · What is coaching?”) — no separate “Not an extra task” row.
- Immersive full-bleed forest screen; bottom nav hidden. In-screen → advances beats, then leave-swipes left into the next screen.
- Beat 1: "What is coaching?" + pale scattered worry phrases (extra work / no time / another meeting…).
- Beat 2: "Coaching = extra task?"
- Beat 3: slash drops onto "=" → "Coaching ≠ extra task"
- Beat 4: "Coaching = a different way of communicating."
- Reduced-motion: immediate state changes on click, no slash path animation.

### I.2 — What you'll learn (REDESIGNED)  [screen id: intro-2]
- Two sections of EQUAL visual weight:
- SECTION 1 — h2: "Skills you'll learn" — five cards (grid, 2–3 per row), each: short bold headline + one-line body, keywords highlighted in forest semibold:
  1. "Coach vs. direct" — Tell when to **coach** and when to just **direct**, and why it matters.
  2. "Feedback with OSCAR" — Give feedback that opens a conversation, using the **OSCAR framework**.
  3. "Powerful questions" — Ask **powerful questions** that get people thinking.
  4. "Structure with GROW" — Run a short coaching conversation with the **GROW framework**.
  5. "The right approach" — Pick the right approach for the **real situations** you face.
- SECTION 2 — h2: "Materials you'll get" — intro paragraph: "You'll receive the following materials at the end of the course: a full slide deck and three printable coaching skills cards." Two equal cards (title + body, then preview image aligned; no end-of-course captions; downloads live at wrap-2):
  1. "Course slides" — "The complete slide deck behind this module, as a PDF." + preview thumbnail (`slides_preview.png`)
  2. "Coaching skills cards" — "Three printable one-page cards: the OSCAR framework, the question library, and the GROW framework." + preview thumbnail (`cards_preview.png`)