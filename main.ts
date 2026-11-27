// One Line to Your Younger Self — deterministic one-liner entry.
//
// The program writes exactly one line — the single line its writer would
// send back to their younger self — to $OUTPUT_DIR/entry.txt (or
// /output/entry.txt when OUTPUT_DIR is unset). No randomness, no clock, no
// network, no input: the same bytes every run.
//
// The line is addressed to a younger self, not a slogan for anyone: don't
// wait until you're rich to call Dad back, because he dies proud of you at
// twenty-three, and the phone just keeps ringing. It is specific, hard-won
// and stings a little — the turn is the phone that keeps ringing after the
// call that never came, the one that can never be made now.
//
// Gate enforced before writing: UTF-8 text, 1–200 characters, not only
// whitespace, a single line. The gate is a tripwire against accidental edits
// that would push the line over 200 characters.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Don't wait until you're rich to call Dad back — he dies proud of you at twenty-three, and the phone just keeps ringing.";

function enforceGate(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`line is ${length} characters, gate requires 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

enforceGate(LINE);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
