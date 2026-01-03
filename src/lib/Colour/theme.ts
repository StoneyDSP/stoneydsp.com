import { palette } from "./palette";

const brandColor: keyof typeof palette = "emerald";

const surfaceColour: keyof typeof palette = "cyan";

const textColour: keyof typeof palette = "neutral";

/**
 * - surface: gives you a consistent “depth vocabulary” (background/panel/raised/sunken + header/footer).
 * - action: cleanly separates CTA buttons/links from control widgets.
 * - control: knobs/sliders/faders always need track, fill, thumb (and active variants).
 * - menu: menus are their own micro-world (bg + item states + separators).
 * - state + meter: audio UIs almost always want “safe/warn/clip” semantics.
 */
/// A good rule: have global roles (brand/text/surface) and then interactive
/// roles (action/control/state). You’ll reach for these constantly with
/// buttons, knobs, sliders, menus, focus states, and disabled states.
export const theme = {
  brand: {
    primary: palette[brandColor][600], // main CTA
    secondary: palette[brandColor][500], // less emphasis
    tertiary: palette[brandColor][400], // subtle accents
    accent: palette[brandColor][700], // strong accents
    subtle: palette[brandColor][100], // gentle tints, chips, tags
  },

  // text: {
  //   default: palette[textColour][950],
  //   muted: palette[textColour][500],
  //   subtle: palette[textColour][400], // secondary labels, helper text
  //   inverse: palette[textColour][50],
  //   disabled: palette[textColour][300], // disabled labels
  // },

  text: {
    light: {
      default: palette[textColour][50],
      muted: palette[textColour][500],
      subtle: palette[textColour][600], // secondary labels, helper text
      inverse: palette[textColour][950],
      disabled: palette[textColour][700], // disabled labels
    },
    dark: {
      default: palette[textColour][950],
      muted: palette[textColour][500],
      subtle: palette[textColour][400], // secondary labels, helper text
      inverse: palette[textColour][50],
      disabled: palette[textColour][300], // disabled labels
    },
  },

  surface: {
    background: palette[surfaceColour][100], // app canvas
    panel: palette[surfaceColour][900], // cards / modules / main widgets
    raised: palette[surfaceColour][800], // popovers, dropdowns, tooltips
    sunken: palette[surfaceColour][950], // wells / tracks / meter beds
    header: palette[surfaceColour][950], // top chrome
    footer: palette[surfaceColour][950], // bottom chrome
  },

  border: {
    default: palette[surfaceColour][700], // component outlines
    subtle: palette[surfaceColour][800], // dividers
    strong: palette[surfaceColour][600], // emphasis borders
  },

  shadow: {
    // even if you don’t literally render “shadows”, this is useful as a
    // semantic knob for glow/outline/inner-shadow styling in your renderer.
    glow: palette[brandColor][400],
  },

  action: {
    // “action” = buttons/links/primary interactive affordances
    primary: palette[brandColor][700],
    primaryHover: palette[brandColor][600],
    primaryActive: palette[brandColor][800],
    onPrimary: palette[textColour][50],

    secondary: palette[surfaceColour][800],
    onSecondary: palette[textColour][50],

    ghost: palette[surfaceColour][900], // transparent/low emphasis
    onGhost: palette[textColour][50],
  },

  control: {
    // “control” = knobs/sliders/faders/switches
    track: palette[surfaceColour][950],
    trackFill: palette[brandColor][700],
    thumb: palette[surfaceColour][700],
    thumbActive: palette[brandColor][600],

    value: palette[brandColor][600], // numeric readouts, meters
    caret: palette[textColour][300], // cursors/indicators
  },

  focus: {
    ring: palette[brandColor][400], // focus outline for keyboard/nav
  },

  state: {
    // feedback semantics: can be reused for validation, alerts, clip indicators, etc.
    success: palette["emerald"][600],
    warning: palette["amber"][600],
    danger: palette["red"][600],
    info: palette["sky"][600],
  },

  meter: {
    // audio-specific semantics you’ll likely want (even if you map them later)
    ok: palette["emerald"][500],
    caution: palette["amber"][500],
    clip: palette["red"][600],
    background: palette[surfaceColour][950],
  },

  menu: {
    // dropdowns/context menus/list items
    background: palette[surfaceColour][100],
    item: palette[surfaceColour][900],
    itemHover: palette[surfaceColour][800],
    itemActive: palette[surfaceColour][700],
    separator: palette[surfaceColour][800],
    text: palette[textColour][50],
    textMuted: palette[textColour][300],
  },
} as const;
