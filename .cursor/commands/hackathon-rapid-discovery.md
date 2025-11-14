<user_request>
#$ARGUMENTS
</user_request>

# Hackathon Rapid Discovery & MVP Definition

## Context
You're participating in a hackathon with **limited time** to ideate and prototype from scratch. The theme will be revealed on-site. You need to quickly validate an idea and define a minimal MVP that can be prototyped in the remaining time.

## Input
Product Idea: $ARGUMENTS

## Step 1: Quick Problem Validation
Using the `@lean-product-manager` agent, quickly analyze:
- **What problem does this solve?** (If unclear, ask clarifying questions)
- **Who has this problem?** (Target user - be specific)
- **Why is this problem important?** (Impact/urgency)
- **How do people solve this today?** (Current alternatives)

## Step 2: Rapid Research & Discovery
Using the `@lean-product-manager` agent, conduct FAST discovery:
- **Competitive landscape**: Quick web search for similar solutions (2-3 competitors max)
- **User needs validation**: Identify key assumptions that need validation
- **Market opportunity**: Size and urgency (quick assessment)
- **Technical feasibility**: Can this be prototyped in the available time? (High-level assessment)

## Step 3: Core Hypothesis & MVP Definition
Using the `@lean-product-manager` agent, define:
- **Core hypothesis**: What's the ONE key assumption we're testing?
- **MVP scope** (RUTHLESSLY minimal):
  - Must-have: Only features absolutely necessary to validate the core hypothesis
  - Nice-to-have: Explicitly deferred (write them down for later)
- **Success criteria**: How do we know if the MVP works? (Simple, measurable)
- **Prototype scope**: What can realistically be built/demoed in remaining time?

## Step 4: Quick Validation Plan
Using the `@lean-product-manager` agent, create:
- **Validation method**: How will we test the hypothesis? (Demo, landing page, prototype, etc.)
- **Key metrics**: What will tell us if we're on the right track?
- **Risks**: Top 3 risks that could derail the hackathon

## Step 5: Create Rapid Product Documentation
Create `.cursor/doc/hackathon_{timestamp}/product.md` with:

### Structure (Keep it SHORT and ACTIONABLE):
1. **Problem Statement** (2-3 sentences)
2. **Target User** (1 sentence)
3. **Core Hypothesis** (1 sentence)
4. **MVP Scope**:
   - Must-have features (bullet list, max 5 items)
   - Explicitly out-of-scope (bullet list)
5. **Success Criteria** (2-3 measurable items)
6. **Prototype Plan** (What we'll build/demo)
7. **Validation Method** (How we'll test)
8. **Top 3 Risks** (What could go wrong)

## Step 6: Quick Technical Feasibility Check
- **Tech stack recommendation**: What's the fastest way to prototype this?
- **Feasibility assessment**: Can we build the MVP in the available time?
- **Dependencies**: What external services/APIs do we need?

## Output Format
Your final message MUST include:
1. The product documentation file path: `.cursor/doc/hackathon_{timestamp}/product.md`
2. A **TL;DR summary** (3-4 bullet points) with:
   - The core problem we're solving
   - The MVP we'll build
   - The key hypothesis we're testing
   - Top risk to watch
3. **Next Step**: Recommend using `@hackathon-rapid-implementation-plan.md` to create the technical implementation plan with UX/UI focus

## Rules for Hackathon Context
- **SPEED over perfection**: Get to actionable insights FAST
- **RUTHLESS prioritization**: If it's not essential for the core hypothesis, it's out
- **Focus on demo-ability**: Can we show value in the demo?
- **Prioritize ruthlessly**: Focus on what matters most, cut if needed
- **Assume constraints**: Limited time, limited resources - work within them
- **Fail fast mindset**: If the idea doesn't work, pivot quickly

## Remember
- This is a HACKATHON - speed and learning are more important than perfection
- The MVP should be the SMALLEST thing that validates the core hypothesis
- Focus on what can be DEMOED, not what can be fully built
- Keep documentation SHORT and ACTIONABLE - no essays
- Use the `@lean-product-manager` agent for all discovery work
- If the idea seems unfeasible for a hackathon, suggest pivots early
