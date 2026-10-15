import { version } from "../package.json";

// Mushroom Plus only ships the cards that differ from upstream Mushroom.
// Every element is renamed to `mushroom-plus-*` at build time (see
// vite.plus.config.ts) so it can be installed alongside the original.
import "./cards/vacuum-card/vacuum-card";

console.info(
  `%c🍄 Mushroom Plus 🍄 - based on Mushroom ${version}`,
  "color: #ef5350; font-weight: 700;"
);
