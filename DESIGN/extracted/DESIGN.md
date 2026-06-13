---
name: CNS Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#5c5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#626567'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The design system is rooted in the philosophy of **Functional Sophistication**. It targets individuals and teams who value their digital privacy and data integrity, evoking a sense of calm, reliability, and precision.

The visual direction is **Minimalist with Tactile Precision**. It draws inspiration from high-end productivity tools and operating systems, prioritizing clarity over decoration. The interface should feel like a well-organized physical workspace: open, quiet, and effortless to navigate. We avoid visual noise, focusing instead on perfect alignment, generous white space, and subtle depth cues that guide the user’s focus toward their media content.

## Colors
The palette is intentionally restrained to emphasize content over chrome. 

- **Primary (Blue):** Used for primary actions, active states, and focus indicators. It represents intelligence and connectivity.
- **Secondary (Tinted White):** Used for large surface areas like sidebars, utility bars, or background sections to create subtle contrast against the pure white workspace.
- **Neutral (Deep Navy):** Used for primary text and iconography to ensure high legibility and a premium feel.
- **Surface & Border:** Surfaces use pure `#FFFFFF`. Borders use a soft `#E2E8F0` to define structure without creating visual "cages."

## Typography
We use **Inter** across all levels to maintain a systematic, utilitarian aesthetic. 

- **Weight Strategy:** Use `600` (Semi-bold) for headings to provide strong hierarchy against the `400` (Regular) body text. 
- **Scale:** Larger headlines use negative letter spacing to feel more "locked" and editorial. 
- **Readability:** Body text uses a generous 1.6x line height to prevent fatigue during long periods of file management or reading. Labels and UI metadata are kept small and medium-weight for clear distinction from content.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. On desktop, content is contained within a max-width of 1280px to maintain readability, while sidebars or navigation elements can remain anchored to the viewport edges.

- **Grid:** A 12-column grid is used for dashboard layouts and media galleries.
- **Rhythm:** An 8px linear scale (built on a 4px base unit) governs all spacing.
- **Mobile:** Margins reduce to 16px. Vertical stacks are preferred over complex horizontal grids.
- **Density:** Use "Lg" (24px) or "Xl" (32px) padding for main content containers to maintain the "spacious" brand promise.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Ambient Shadows**.

- **Layers:** The base background is white. Secondary surfaces (sidebars, backgrounds for cards) use the secondary color to create a natural "step down" in importance.
- **Shadows:** We use highly diffused, low-opacity shadows (e.g., `0 4px 20px rgba(0,0,0,0.04)`). These should feel like soft natural light, not digital dropshadows.
- **Borders:** Subtle 1px borders in `#E2E8F0` are the primary method of separation. Shadows are reserved for "floating" elements like modals, dropdowns, or hovered cards.

## Shapes
The design system utilizes **Rounded** (0.5rem) geometry. This radius strikes a balance between the clinical sharpness of enterprise software and the overly "bubbly" feel of social apps.

- **Standard (8px):** Primary buttons, input fields, and standard cards.
- **Large (16px):** Main content containers or featured media cards.
- **Pill:** Used exclusively for status chips or tags to differentiate them from interactive buttons.

## Components

- **Buttons:** Primary buttons use a solid Blue background with white text. Secondary buttons use a white background with a subtle border. Interaction states (hover) should involve a slight darkening of the background color, not a change in elevation.
- **Cards:** Cards are the core container. They feature a white background, a 1px border, and a subtle shadow on hover to indicate interactivity. Padding within cards should be a minimum of 24px (`lg`).
- **Tables:** Data-heavy views should use a "clean table" style: no vertical borders, 1px horizontal dividers, and a subtle secondary background for the header row. Row hover states use the secondary color.
- **Inputs:** Fields are outlined with a light gray border. On focus, the border transitions to the primary Blue with a soft 2px outer glow (using the primary color at 10% opacity).
- **Chips:** Small, pill-shaped indicators with light gray backgrounds and dark navy text. Used for file types, categories, or status.
- **Media Thumbnails:** For a media cloud, thumbnails must have a subtle `inner-border` or `ring` to ensure they don't bleed into the white background if the image itself is white.