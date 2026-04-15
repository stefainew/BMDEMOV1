# Design System Document: Precision Atelier

## 1. Overview & Creative North Star
**The Creative North Star: "The Digital Blade"**
This design system moves away from the cliché "reclaimed wood and Edison bulb" barbershop aesthetic. Instead, it embodies the spirit of a high-end atelier—sharp, surgical, and cinematic. It is rooted in the concept of "Precision Atelier," where every pixel is as intentional as a master stylist's cut. 

We break the "template" look through **Architectural Asymmetry**. Do not center-align everything; allow for wide horizontal margins and unexpected typographic placements that mimic high-fashion editorial spreads. By utilizing high-contrast typography scales and overlapping elements, we create a sense of depth and authority.

---

## 2. Colors & Tonal Depth
The palette is a study in shadow and light. We use a "Deep-Canvas" approach where the background is not just black, but an atmospheric void.

*   **Background (`#0A0A0A`):** The foundation. Use this for the base layer of all pages.
*   **Surface-Container Tiers:** 
    *   `surface-container-lowest`: `#0E0E0E` (Deepest recesses)
    *   `surface-container-low`: `#131313` (Standard sectioning)
    *   `surface-container-high`: `#2A2A2A` (Floating elements)
*   **Primary Gold (`#C9A84C`):** Reserved for moments of ultimate conversion and brand presence.
*   **Warm White Text (`#EDE8DF`):** High-readability ivory for primary content.
*   **Secondary Text (`#8A8070`):** Muted bronze for meta-data and labels.

**The "No-Line" Rule:**
Prohibit 1px solid borders for sectioning large content blocks. Boundaries must be defined by shifts between `background` and `surface-container-low`. We use light, not lines, to define space.

**The "Glass & Gradient" Rule:**
For modern polish, floating cards should utilize a subtle backdrop blur (20px) with a semi-transparent `surface-variant` (`#353534` at 60% opacity). Main CTAs should feature a subtle linear gradient from `primary` to `primary-container` at a 135-degree angle to give the gold a metallic "shimmer" rather than a flat plastic look.

---

## 3. Typography
Typography is the voice of the atelier. We mix the heritage of serifs with the cold precision of geometric sans-serifs and monospaces.

*   **Display & Headlines (Cormorant Garamond):** Used for "Brand Moments." Large, heavy, and elegant. It should feel like a masthead. 
    *   *Scale:* `display-lg` (3.5rem) should be used sparingly for hero statements.
*   **UI & Navigation (Josefin Sans):** All-caps, tracked out (+10% to +15%). This represents the "Precision" aspect. 
    *   *Scale:* `label-md` (0.75rem) for navigation and buttons.
*   **Body (Lora):** A warm, readable serif that provides a human touch to the dark, clinical environment.
    *   *Scale:* `body-lg` (1rem) for descriptions.
*   **Pricing & Technicals (DM Mono):** Monospaced precision. Used for service prices and timestamps to evoke the feeling of a craftsman’s invoice.

---

## 4. Elevation & Depth
In this system, we do not use structural boxes; we use **Tonal Layering**.

*   **The Layering Principle:** Treat the UI as a physical stack. A `surface-container-lowest` card sits on a `surface-container-low` section. This "negative elevation" creates a sense of carved-out space rather than protruding elements.
*   **Ambient Shadows:** For floating modals, use an extra-diffused shadow: `offset-y: 20px, blur: 40px, color: rgba(0,0,0, 0.5)`. Never use harsh, dark grey shadows.
*   **The "Ghost Border" Fallback:** If a container needs separation on a complex background, use the `outline-variant` token at 15% opacity. It should be felt, not seen.
*   **Texture:** Apply a 3% opacity film grain (noise texture) overlay across the entire UI. This breaks the digital smoothness and adds a "cinematic" grit consistent with the brand.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` gold, `label-md` (Josefin Sans, Uppercase), 2px border-radius. On hover, transition to `primary-fixed-dim`.
*   **Secondary/Ghost:** `outline` color (1px), sharp corners. High-precision interaction.

### Input Fields
*   **Style:** Underline only (1px `outline-variant`). No boxed inputs. Labels sit above in `label-sm` (Josefin Sans). Focus state shifts the underline to `primary` gold.

### Cards & Service Lists
*   **Structure:** No dividers. Use `surface-container-low` for the card background. Use `body-sm` (Lora) for descriptions and `DM Mono` for prices, right-aligned to create a strong vertical axis.

### Chips & Tags
*   **Execution:** `surface-container-highest` background with `secondary-fixed-dim` text. Sharp 2px radius. These should look like small metal plates or labels.

### Appointment Tooltips
*   **Style:** `surface-bright` background with a `primary` gold 2px top-border. Transitions should be a "long-draw" fade (300ms ease-out).

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Negative Space:** Allow headlines to have massive padding-top. The "Atelier" feels premium because it isn't crowded.
*   **Use Intentional Grain:** Ensure the grain texture is subtle enough that it doesn't interfere with the readability of the `DM Mono` pricing.
*   **Tighten the Radius:** Keep the 2px border radius consistent. It should feel "sharp but finished."

### Don't:
*   **Don't Use Pure White:** Never use `#FFFFFF`. It will break the cinematic atmosphere. Stick to the `warm-white-text` (`#EDE8DF`).
*   **Don't Use Round Elements:** Avoid circular buttons or heavy rounded corners. This system is about "edges" and "blades."
*   **Don't Use Divider Lines:** Never use a horizontal rule `<hr>` to separate list items. Use 24px of vertical whitespace or a 2% tonal shift in background color instead.