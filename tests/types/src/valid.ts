import { assert, Has } from "conditional-type-checks";

import { loadLegalesign, Legalesign } from "../../../types";

const legalesignPromise: Promise<Legalesign | null> = loadLegalesign("");
const legalesignConnectPromise = loadLegalesign("");

const legalesign: Legalesign = window.Legalesign!("pk_123");

const legalesignWithBetas: Legalesign = window.Legalesign!("pk_123", {
  legalesignAccount: "123"
});
