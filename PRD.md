# Wealth Wars (Pixel Strategy Edition) - PRD

Competitive asynchronous strategy–idle economy where players build and defend a production empire, convert limited daily resources into $WEALTH, and tactically pressure others via battles and lottery risk.

**Experience Qualities**: 
1. **Strategic** - Every decision matters in resource allocation and timing
2. **Competitive** - Social pressure drives engagement through battles and leaderboards  
3. **Accessible** - Clear visual feedback makes complex systems understandable

**Complexity Level**: Complex Application (advanced functionality, accounts)
- Multi-layered economy with real scarcity mechanics, battle systems, and social competition requiring persistent state management

## Essential Features

**Daily Work Loop**
- Functionality: Players perform work actions to earn Credits, the primary soft currency
- Purpose: Creates consistent engagement and progression foundation
- Trigger: Player clicks work action buttons
- Progression: Click work → Gain credits → Visual credit counter increment → Enable business purchases
- Success criteria: Credits accumulate reliably with satisfying visual feedback

**Credit to $WEALTH Exchange**
- Functionality: Convert Credits to scarce $WEALTH currency (75:1 ratio, 1% fee, daily caps)
- Purpose: Creates meaningful resource scarcity and strategic timing decisions
- Trigger: Player clicks convert in Exchange Panel
- Progression: Select amount → Confirm conversion → Credits deduct → $WEALTH increases → Pool capacity decreases
- Success criteria: Conversion respects caps, shows clear feedback, updates all related UI

**Business Empire Building**
- Functionality: Purchase businesses that multiply future credit earnings
- Purpose: Long-term progression and strategic investment decisions
- Trigger: Player selects business from list and confirms purchase
- Progression: Browse businesses → See costs/benefits → Purchase → Credits deduct → Future earnings increase
- Success criteria: Clear ROI visibility, satisfying purchase animations, persistent upgrades

**Defense Shield System**
- Functionality: Spend $WEALTH on temporary protection from attacks (1hr/24hr/72hr options)
- Purpose: Creates defensive spending tension and timing strategy
- Trigger: Player anticipates attacks or sees warnings
- Progression: Select shield duration → Confirm $WEALTH cost → Shield activates → Visual barrier appears
- Success criteria: Clear duration display, attack blocking works, visual shield feedback

**Lottery Risk System**
- Functionality: Enter lottery with $WEALTH for chance at larger rewards (25W per ticket)
- Purpose: High-risk/high-reward gameplay creating excitement spikes
- Trigger: Player decides to gamble accumulated $WEALTH
- Progression: Choose ticket count → Confirm cost → Wait for draw → Win/lose animation → Rewards distribute
- Success criteria: Fair odds display, exciting win animations, clear loss feedback

**Battle Pressure System**
- Functionality: Attack other players to pressure their standings
- Purpose: Social interaction and competitive pressure
- Trigger: Player selects target and initiates attack
- Progression: Choose target → Confirm attack → Battle resolves → Results notify both players
- Success criteria: Clear combat feedback, effective shield interactions, social engagement

## Edge Case Handling

**Daily Reset Timing** - Smooth transition at UTC midnight with clear capacity restoration
**Insufficient Resources** - Graceful blocking with clear requirements messaging
**Attack While Offline** - Push notifications and catch-up summaries on return
**Lottery Edge Cases** - Handle ties, zero entries, and technical failures gracefully
**Network Interruption** - Local state persistence with sync recovery

## Design Direction

The design should evoke nostalgic gaming excitement mixed with strategic seriousness - reminiscent of classic pixel RPGs but with modern competitive edge. Minimal interface serves the complex systems without overwhelming new players.

## Color Selection

Custom palette using complementary relationships to create strategic tension.

- **Primary Color**: Deep Space Navy (oklch(0.15 0.05 240)) - Communicates serious strategy and depth
- **Secondary Colors**: Steel Blue (oklch(0.45 0.08 220)) for supporting UI panels  
- **Accent Color**: Wealth Gold (oklch(0.78 0.12 85)) - Attention-grabbing for $WEALTH elements and CTAs
- **Foreground/Background Pairings**:
  - Background (Deep Navy): Light Gray text (oklch(0.9 0 0)) - Ratio 12.5:1 ✓
  - Card (Steel Blue): White text (oklch(1 0 0)) - Ratio 8.2:1 ✓  
  - Primary (Navy): White text (oklch(1 0 0)) - Ratio 15.8:1 ✓
  - Accent (Gold): Dark Navy text (oklch(0.1 0 0)) - Ratio 18.4:1 ✓

## Font Selection

Typography should convey precision and gaming heritage while maintaining excellent readability for numbers and strategic information.

- **Typographic Hierarchy**:
  - H1 (Game Title): JetBrains Mono Bold/32px/tight letter spacing - Strong pixel-style identity
  - H2 (Panel Headers): JetBrains Mono Medium/20px/normal spacing
  - Body (Stats/Info): JetBrains Mono Regular/16px/relaxed for readability
  - Small (Timestamps): JetBrains Mono Light/14px for secondary information

## Animations

Motion should enhance strategic clarity without distracting from decision-making - quick confirmations for actions with celebratory moments for major achievements.

- **Purposeful Meaning**: Animations communicate system state changes and provide satisfying feedback for player actions
- **Hierarchy of Movement**: Resource changes get immediate feedback, major events (lottery wins) get celebration, ambient elements breathe subtly

## Component Selection

- **Components**: Cards for business listings, Dialogs for confirmations, Progress bars for daily caps, Badges for status indicators, custom pixel-styled buttons throughout
- **Customizations**: PixelButton, PixelProgressBar, PixelParticleEmitter for celebration effects, PixelStatusBadge for shield/battle states  
- **States**: Buttons show hover/active/disabled clearly, inputs validate in real-time, panels expand/collapse smoothly
- **Icon Selection**: Custom 16x16 pixel sprites for credits (coin), wealth ($), shield, attack (spark), lottery ticket
- **Spacing**: 8px base unit grid system, generous 16-24px gaps between major sections, tight 4-8px gaps within related elements
- **Mobile**: Stack panels vertically, expand touch targets to 44px minimum, prioritize most important actions above fold