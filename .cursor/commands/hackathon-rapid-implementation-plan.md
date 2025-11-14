<user_request>
#$ARGUMENTS
</user_request>

# Hackathon Rapid Implementation Plan

## Context
You've completed the discovery phase and have ~1.5 hours to build a functional prototype. This command creates a fast, actionable implementation plan that prioritizes functionality AND good UX/UI. The result must be demo-able and polished enough to impress judges.

## Prerequisites
Before starting, ensure you have:
- The product discovery document from `hackathon-rapid-discovery.md` (`.cursor/doc/hackathon_{timestamp}/product.md`)
- Clear understanding of the MVP scope and core hypothesis

## Step 1: Load Discovery Context & Identify Parallel Opportunities (3 min)
- Read the product discovery document: `.cursor/doc/hackathon_{timestamp}/product.md`
- Extract: MVP scope, core features, target user, success criteria
- Identify the demo flow (what will we show in 2 minutes?)
- **Identify independent features**: Analyze MVP features to find ones that can be developed in parallel
  - Features with no dependencies between them
  - Features that can be mocked/stubbed for integration
  - Different user flows that don't interfere
  - Backend endpoints that don't depend on each other
  - Frontend components that are independent

## Step 2: Quick Architecture Decision (3 min)
- **Tech Stack**: FastAPI (backend) + React/Vite (frontend) - default for speed
- **UI Approach**: 
  - Use modern, clean design with good spacing and typography
  - Focus on ONE primary user flow (the demo flow)
  - Ensure mobile-responsive (at least basic)
  - Use the colors from `frontend/src/index.css` or extend them minimally
- **Data Storage**: 
  - For hackathon: In-memory or simple JSON file (no DB setup)
  - Or use a free tier service (Supabase, Firebase) if needed
- **Authentication**: Skip or mock for MVP (unless core to hypothesis)

## Step 3: Team Selection & Parallel Advice (10 min)
Invoke these agents IN PARALLEL to get quick technical recommendations:

### Backend Agent (`@hexagonal-backend-architect`)
Ask for:
- Minimal API endpoints needed for MVP
- Simplest architecture that still follows clean code principles
- Data models/schemas for core entities
- **Independent endpoints**: Which endpoints can be built in parallel?
- **Time estimate**: Can this be built in ~45 min?

### Frontend Agent (`@frontend-developer`)
Ask for:
- Component structure for the demo flow
- UI/UX recommendations for the core user journey
- State management approach (React Query + Context if needed)
- **Independent components**: Which components can be built in parallel?
- **Time estimate**: Can this be built in ~45 min?
- **UX/UI focus**: 
  - Clean, modern interface
  - Clear visual hierarchy
  - Intuitive user flow
  - Good spacing and typography
  - Responsive layout (mobile-first if possible)
  - Loading states and error handling (even if simple)

### If Multiple Independent Features Identified:
For each independent feature, create a separate implementation track:
- **Feature A Track**: Backend + Frontend for Feature A
- **Feature B Track**: Backend + Frontend for Feature B
- **Core Infrastructure Track**: Shared setup, routing, common components

Each track can be developed in parallel by different team members or sequentially with clear handoff points.

## Step 4: Create Implementation Plan (10 min)
Create `.cursor/doc/hackathon_{timestamp}/implementation-plan.md` with:

### Structure:

1. **Demo Flow** (The 2-minute story we'll tell)
   - Step-by-step user journey
   - What screens/components are needed
   - What API calls are needed

2. **Tech Stack & Setup**
   - Backend: FastAPI setup
   - Frontend: React/Vite setup
   - Dependencies needed
   - Quick setup commands

3. **Backend Implementation Plan**
   - API endpoints (minimal, only for MVP)
   - Data models/schemas
   - Business logic (simplified)
   - File structure
   - **Time estimate per endpoint**

4. **Frontend Implementation Plan**
   - Component structure
   - Pages/screens needed
   - State management
   - API integration
   - **UX/UI specifications**:
     - Layout structure
     - Color scheme (from index.css or minimal extension)
     - Typography
     - Spacing system
     - Component styling approach
     - Mobile responsiveness strategy
   - **Time estimate per component**

5. **Implementation Order & Parallel Tracks** (Critical path)
   - **Critical path**: What to build first (demo flow)
   - **Dependencies**: Map dependencies between features/tasks
   - **Parallel tracks**: Identify independent work streams
     - Track 1: [Feature/Component A] - Can be built independently
     - Track 2: [Feature/Component B] - Can be built independently
     - Track 3: [Core/Shared] - Must be built first
   - **Parallel work opportunities**: 
     - Backend endpoints that don't depend on each other
     - Frontend components that are independent
     - Features that can be mocked for integration
   - **Time budget per task and per track**
   - **Integration points**: When and how to merge parallel tracks

6. **UX/UI Polish Checklist**
   - [ ] Clean, modern design
   - [ ] Clear visual hierarchy
   - [ ] Intuitive navigation
   - [ ] Good spacing and typography
   - [ ] Loading states
   - [ ] Error handling (user-friendly messages)
   - [ ] Mobile responsive (at least basic)
   - [ ] Smooth interactions (transitions if time permits)

7. **Risks & Mitigations**
   - Technical risks and quick fixes
   - Time risks and what to cut if needed

## Step 5: UX/UI Design Guidelines (5 min)
Create `.cursor/doc/hackathon_{timestamp}/ui-guidelines.md` with:

### Quick Design System:
- **Color Palette**: Primary, secondary, accent, background, text
- **Typography**: Font sizes, weights, line heights
- **Spacing**: Consistent spacing scale (4px, 8px, 16px, 24px, 32px)
- **Components**: Button styles, input styles, card styles
- **Layout**: Container max-width, padding, grid system (if needed)

### UX Principles for Hackathon:
- **Clarity over cleverness**: Make it obvious what to do
- **One thing at a time**: Focus on the demo flow
- **Feedback everywhere**: Loading states, success messages, errors
- **Mobile-first**: If time allows, ensure it works on mobile
- **Progressive enhancement**: Core works, polish if time permits

## Step 6: Time-Boxed Implementation Checklist with Parallel Tracks (5 min)
Create a prioritized checklist with time estimates, organized by parallel tracks:

### Track 1: Core Infrastructure (Must be done first) - ~15 min
- [ ] Project setup (backend + frontend)
- [ ] Basic routing/navigation
- [ ] Shared components (layout, common UI)
- [ ] API client setup

### Track 2: Feature A (Can run in parallel with Track 3) - ~X min
- [ ] Backend: Feature A endpoints (X min)
- [ ] Frontend: Feature A components (X min)
- [ ] Integration: Feature A API calls (X min)
- [ ] Styling: Feature A UI (X min)

### Track 3: Feature B (Can run in parallel with Track 2) - ~X min
- [ ] Backend: Feature B endpoints (X min)
- [ ] Frontend: Feature B components (X min)
- [ ] Integration: Feature B API calls (X min)
- [ ] Styling: Feature B UI (X min)

### Track 4: Integration & Polish (After Tracks 2 & 3) - ~30 min
- [ ] Connect all features in demo flow
- [ ] End-to-end testing
- [ ] Loading states
- [ ] Error handling
- [ ] Better styling/UX polish
- [ ] Mobile responsiveness

### Nice-to-Have (If Time) - ~20 min
- [ ] Animations/transitions
- [ ] Advanced styling
- [ ] Additional polish

**Note**: If only one feature exists, use single-track approach. Parallel tracks only make sense when features are truly independent.

## Output Format
Your final message MUST include:

1. **Implementation plan file**: `.cursor/doc/hackathon_{timestamp}/implementation-plan.md`
2. **UI guidelines file**: `.cursor/doc/hackathon_{timestamp}/ui-guidelines.md`
3. **Parallel tracks file** (if applicable): `.cursor/doc/hackathon_{timestamp}/parallel-tracks.md`
   - List of independent tracks
   - Dependencies between tracks
   - Time estimates per track
   - Integration points
4. **TL;DR Summary**:
   - Total estimated time (sequential vs parallel)
   - Critical path (what to build first)
   - Parallel opportunities identified
   - Top 3 UX/UI priorities
   - Biggest risk and mitigation

## Rules for Hackathon Context

### Speed & Functionality:
- **Build the demo flow first** - everything else is secondary
- **Parallel work opportunities**:
  - Backend and frontend can be built simultaneously (with mocks)
  - Independent features can be built in parallel tracks
  - Independent components can be developed simultaneously
  - Use parallel tracks to maximize time efficiency
- **Cut ruthlessly**: If it's not in the demo flow, it's out
- **Time-box everything**: Stick to estimates, cut if over
- **Coordinate parallel work**: Ensure clear integration points and mock contracts

### UX/UI Quality:
- **Functional AND polished**: It must work AND look good
- **Focus on first impression**: Landing page and core flow must be clean
- **Progressive enhancement**: Core works first, polish second
- **Mobile consideration**: At least basic responsive (if time allows)
- **User feedback**: Loading states, errors, success messages are essential

### Technical:
- **Use existing patterns**: Don't invent new architectures
- **Leverage agent recommendations**: They know the codebase patterns
- **Keep it simple**: Complex solutions waste time
- **Test manually**: No automated tests in hackathon (unless critical)

## Remember
- **Demo-ability is king**: Can we show value in 2 minutes?
- **First impression matters**: Landing page and core flow must be polished
- **Functionality + UX**: Both are important, balance them
- **Time is the constraint**: Cut features, not quality of what remains
- **Use agent expertise**: They'll give you fast, actionable plans

## Time Budget
- Load context & identify parallel opportunities: 3 min
- Architecture decision: 3 min
- Agent advice (parallel): 10 min
- Implementation plan: 10 min
- UI guidelines: 5 min
- Checklist with parallel tracks: 5 min
- **Total: ~36 minutes** (leaving ~54 minutes for actual building)

**Time Savings with Parallel Tracks**: If you identify 2 independent features that can be built in parallel, you can potentially save 20-30 minutes compared to sequential development. Example: If Feature A takes 20 min and Feature B takes 20 min, sequential = 40 min, parallel = 20 min (saving 20 min).

