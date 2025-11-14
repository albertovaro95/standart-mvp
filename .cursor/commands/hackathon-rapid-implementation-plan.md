<user_request>
#$ARGUMENTS
</user_request>

# Hackathon Rapid Implementation Plan

## Context
You've completed the discovery phase and have limited time to build a functional prototype. This command creates a fast, actionable implementation plan that prioritizes functionality AND good UX/UI. The result must be demo-able and polished enough to impress judges.

## Prerequisites
Before starting, ensure you have:
- The product discovery document from `hackathon-rapid-discovery.md` (`.cursor/doc/hackathon_{timestamp}/product.md`)
- Clear understanding of the MVP scope and core hypothesis

## Step 1: Load Discovery Context & Identify Parallel Opportunities
- Read the product discovery document: `.cursor/doc/hackathon_{timestamp}/product.md`
- Extract: MVP scope, core features, target user, success criteria
- Identify the demo flow (what will we show in the demo?)
- **Identify independent features**: Analyze MVP features to find ones that can be developed in parallel
  - Features with no dependencies between them
  - Features that can be mocked/stubbed for integration
  - Different user flows that don't interfere
  - Backend endpoints that don't depend on each other
  - Frontend components that are independent

## Step 2: Quick Architecture Decision
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

## Step 3: Team Selection & Parallel Advice
Invoke these agents IN PARALLEL to get quick technical recommendations:

### Backend Agent (`@hexagonal-backend-architect`)
Ask for:
- Minimal API endpoints needed for MVP
- Simplest architecture that still follows clean code principles
- Data models/schemas for core entities
- **Independent endpoints**: Which endpoints can be built in parallel?

### Frontend Agent (`@frontend-developer`)
Ask for:
- Component structure for the demo flow
- UI/UX recommendations for the core user journey
- State management approach (React Query + Context if needed)
- **Independent components**: Which components can be built in parallel?
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

## Step 4: Setup Git Branch
Before creating the implementation plan, set up the development workflow:

1. **Create a descriptive branch name**:
   - Extract a short, descriptive name from the MVP scope (e.g., `feature/user-authentication`, `feat/payment-integration`, `hackathon/mvp-prototype`)
   - Use format: `feature/` or `feat/` prefix + kebab-case description
   - Create and checkout the branch: `git checkout -b <branch-name>`

## Step 5: Create Implementation Plan
Create `.cursor/doc/hackathon_{timestamp}/implementation-plan.md` with:

### Structure:

1. **Demo Flow** (The demo story we'll tell)
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
   - **Integration points**: When and how to merge parallel tracks

6. **UX/UI Polish Checklist**
   - [ ] Clean, modern design
   - [ ] Clear visual hierarchy
   - [ ] Intuitive navigation
   - [ ] Good spacing and typography
   - [ ] Loading states
   - [ ] Error handling (user-friendly messages)
   - [ ] Mobile responsive (at least basic)
   - [ ] Smooth interactions (transitions if possible)

7. **Risks & Mitigations**
   - Technical risks and quick fixes
   - Scope risks and what to cut if needed

## Step 6: UX/UI Design Guidelines
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
- **Mobile-first**: Ensure it works on mobile if possible
- **Progressive enhancement**: Core works first, polish second

## Step 7: Implementation Checklist with Parallel Tracks
Create a prioritized checklist organized by parallel tracks:

### Track 1: Core Infrastructure (Must be done first)
- [ ] Project setup (backend + frontend)
- [ ] Basic routing/navigation
- [ ] Shared components (layout, common UI)
- [ ] API client setup

### Track 2: Feature A (Can run in parallel with Track 3)
- [ ] Backend: Feature A endpoints
- [ ] Frontend: Feature A components
- [ ] Integration: Feature A API calls
- [ ] Styling: Feature A UI

### Track 3: Feature B (Can run in parallel with Track 2)
- [ ] Backend: Feature B endpoints
- [ ] Frontend: Feature B components
- [ ] Integration: Feature B API calls
- [ ] Styling: Feature B UI

### Track 4: Integration & Polish (After Tracks 2 & 3)
- [ ] Connect all features in demo flow
- [ ] End-to-end testing
- [ ] Loading states
- [ ] Error handling
- [ ] Better styling/UX polish
- [ ] Mobile responsiveness

### Nice-to-Have (If Time Permits)
- [ ] Animations/transitions
- [ ] Advanced styling
- [ ] Additional polish

**Note**: If only one feature exists, use single-track approach. Parallel tracks only make sense when features are truly independent.

## Step 8: Create Pull Request (After Implementation)
Once the implementation is complete and tested:

1. **Commit all changes**:
   - Stage all changes: `git add .`
   - Commit with descriptive message: `git commit -m "feat: implement MVP [feature description]"`
   - Use conventional commit format (feat:, fix:, etc.)

2. **Push branch to remote**:
   - Push the branch: `git push -u origin <branch-name>`

3. **Create Pull Request using MCP GitHub**:
   - Use `mcp_github_create_pull_request` with:
     - **owner**: Repository owner (username or organization)
     - **repo**: Repository name
     - **title**: Descriptive PR title (e.g., "feat: MVP Implementation - [Feature Name]")
     - **head**: The branch name you just pushed
     - **base**: Target branch (usually `main` or `master`)
     - **body**: PR description including:
       - Summary of what was implemented
       - Demo flow description
       - Key features added
       - Testing notes
       - Screenshots or demo links (if available)
   - Save the PR number for reference

## Output Format
Your final message MUST include:

1. **Git branch**: Branch name created
2. **Implementation plan file**: `.cursor/doc/hackathon_{timestamp}/implementation-plan.md`
3. **UI guidelines file**: `.cursor/doc/hackathon_{timestamp}/ui-guidelines.md`
4. **Parallel tracks file** (if applicable): `.cursor/doc/hackathon_{timestamp}/parallel-tracks.md`
   - List of independent tracks
   - Dependencies between tracks
   - Integration points
5. **TL;DR Summary**:
   - Critical path (what to build first)
   - Parallel opportunities identified
   - Top 3 UX/UI priorities
   - Biggest risk and mitigation
   - Branch name for development

**After Implementation**: Once implementation is complete, create the Pull Request following Step 8 and include:
   - PR number and link

## Rules for Hackathon Context

### Speed & Functionality:
- **Build the demo flow first** - everything else is secondary
- **Parallel work opportunities**:
  - Backend and frontend can be built simultaneously (with mocks)
  - Independent features can be built in parallel tracks
  - Independent components can be developed simultaneously
  - Use parallel tracks to maximize efficiency
- **Cut ruthlessly**: If it's not in the demo flow, it's out
- **Prioritize ruthlessly**: Focus on what matters most, cut if needed
- **Coordinate parallel work**: Ensure clear integration points and mock contracts

### UX/UI Quality:
- **Functional AND polished**: It must work AND look good
- **Focus on first impression**: Landing page and core flow must be clean
- **Progressive enhancement**: Core works first, polish second
- **Mobile consideration**: At least basic responsive if possible
- **User feedback**: Loading states, errors, success messages are essential

### Technical:
- **Use existing patterns**: Don't invent new architectures
- **Leverage agent recommendations**: They know the codebase patterns
- **Keep it simple**: Complex solutions are inefficient
- **Test manually**: No automated tests in hackathon (unless critical)

## Remember
- **Demo-ability is king**: Can we show value in the demo?
- **First impression matters**: Landing page and core flow must be polished
- **Functionality + UX**: Both are important, balance them
- **Time is limited**: Cut features, not quality of what remains
- **Use agent expertise**: They'll give you fast, actionable plans
