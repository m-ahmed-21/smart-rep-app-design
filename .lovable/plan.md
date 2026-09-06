# SmartRep Mobile PoC Plan

## Goal
Build a polished, interactive mobile-first proof of concept that presents SmartRep as one cohesive cross-platform product. The result will cover every screen named in the proposal and let reviewers move through the full gym-session journey without requiring real Bluetooth hardware, a camera, or a backend.

## Visual direction
- Use the **monochrome uploaded logo** as the primary app mark because it fits the required dark, black/white professional identity; reserve red, yellow, and green for performance ratings and safety feedback only.
- Create a high-contrast graphite/black interface with crisp white type, disciplined gray surfaces, compact spacing, precise dividers, and restrained motion.
- Use a distinctive condensed display face for large workout numbers and a highly legible sans-serif for controls and supporting information.
- Keep the experience phone-native and thumb-friendly, with consistent top bars, bottom navigation where appropriate, large touch targets, safe-area spacing, and responsive behavior on wider screens.
- Build accurate custom vector artwork for the Lat Pulldown machine and custom SVG/data visualizations for ROM, speed, progress, and workout quality rather than relying on generic stock imagery.

## Product flow and screens
1. **Authentication**
   - Branded sign-in and sign-up states.
   - Monochrome logo above the form and a subtle enlarged repetition of the mark worked into the background.
   - Functional tab/state switching, password visibility, validation feedback, and a clear continue action.

2. **QR machine scan**
   - Simulated camera view, precise scanner frame, torch control, gallery affordance, and Bluetooth readiness indicator.
   - A demo scan action advances into connection states.

3. **Bluetooth connection**
   - Animated searching, connecting, and connected states.
   - Live-stream confirmation, signal/battery details, a clean Lat Pulldown illustration, concise machine description, and “Start Lifting.”

4. **Machine reservation setup**
   - Selected machine summary with stepper controls for sets and reps per set.
   - Clear temporary-reservation explanation and confirmation action.

5. **Personal calibration**
   - Guided multi-rep calibration with progress, phase cues, a simplified live ROM preview, and completion state.
   - Explain personalization through concise status copy rather than technical paragraphs.

6. **Profile and progress**
   - Profile photo, name, age, phone number, calibration status, personal ROM/tempo baseline, recent improvement, and calibration management.
   - Bottom navigation connects Profile, Scan, and Progress areas.

7. **Live rep tracking — primary screen**
   - Current set and oversized rep count as the strongest visual signals.
   - Accurate vertical color-zoned ROM bar with moving position marker, min/max boundaries, and completed-rep percentage.
   - Speed gauge with dynamic value and labeled state: too slow, slow, ideal, fast, or too fast.
   - Contextual pause timer appearing only between concentric and eccentric phases.
   - Clearly separated quality, tempo, ROM, and change-vs-previous-rep indicators.
   - Functional demo controls that advance reps and visibly update metrics without real sensor input.

8. **Form-breakdown warning**
   - Gentle, non-blocking warning layered over the least critical part of live tracking.
   - Acknowledge/dismiss action, concise coaching cue, and motivating language for late-set fatigue.

9. **Between-set rest timer**
   - Prominent countdown, completed-set recap, next-set preview, skip/add-time controls, and begin-next-set action.

10. **Session summary**
    - Total sets/reps, overall quality distribution, ROM and tempo trends, improvement figures, and fatigue/form flags.
    - Custom charts optimized for mobile readability and a finish/share-style action area.

11. **Machine unavailable**
    - Reserved Lat Pulldown state with privacy-safe occupancy information, current set progress, and estimated availability.
    - Back-to-scan action.

## Interaction model
- Use an in-app prototype navigator so every screen is directly reachable during a defense while the main path still behaves like a real session.
- Simulate meaningful state transitions: scan → connect → reserve → calibrate → lift → warning/rest → summary.
- Add restrained motion to the scanner, connection status, ROM marker, gauges, rep updates, and timer while respecting reduced-motion preferences.
- Keep all data fictional and local to the prototype; no authentication service, Bluetooth connection, camera access, or saved records will be implemented.

## Technical details
- Implement in the existing React/TanStack app with reusable screen-shell, navigation, metric, chart, gauge, stepper, modal, and machine-illustration components.
- Define the full dark design system as semantic tokens in the global stylesheet and avoid ad hoc colors in page code.
- Integrate the selected uploaded logo through the project asset flow.
- Add app-specific page metadata and accessible labels, focus states, contrast, and semantic structure.
- Validate the complete journey and individual screen access at mobile and desktop widths, checking for clipped text, overlaps, broken controls, and visual consistency.

## Deliverable boundary
This is a high-fidelity interactive frontend PoC. Hardware communication, real QR decoding, production authentication, machine-learning inference, reservations, and persistent storage remain simulated by design.
