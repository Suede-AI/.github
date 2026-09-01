import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readme = async () =>
  readFile(new URL("../profile/README.md", import.meta.url), "utf8");

test("organization profile publishes a press and media kit section", async () => {
  const text = await readme();

  assert.match(text, /^## Press & media kit$/m);
  assert.match(text, /^### Approved names$/m);
  assert.match(text, /^### Boilerplate$/m);
  assert.match(text, /^### Media contact$/m);
});

test("press kit points at the canonical press page and brand assets", async () => {
  const text = await readme();

  assert.match(text, /https:\/\/suedeai\.ai\/press/);
  assert.match(text, /https:\/\/github\.com\/Suede-AI\/suede-brand-assets/);
  assert.match(text, /https:\/\/suedeai\.ai\/founder/);
});

test("press kit publishes the approved names press must use", async () => {
  const text = await readme();

  for (const value of [
    "Suede Labs AI",
    "Suede-AI",
    "Jason Colapietro",
    "Jay Colapietro",
    "Johnny Suede",
    "SUEDE",
  ]) {
    assert.match(text, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("press kit boilerplate matches the profile's own positioning line", async () => {
  const text = await readme();

  assert.match(
    text,
    /> Suede Labs AI builds programmable IP and creator ownership infrastructure for AI-native media\./,
  );
  assert.match(
    text,
    /> Suede Labs AI is the ownership layer for AI-native media: prove the work, register the right, program the license, route the royalty, and expose the result to paid agents\./,
  );
  assert.match(
    text,
    /> Jason Colapietro is Founder and CEO of Suede Labs AI, .*and a published author\./,
  );
});

test("the press page is reachable from the contact list", async () => {
  const text = await readme();

  assert.match(
    text,
    /- \*\*Press & media kit\*\* — \[suedeai\.ai\/press\]\(https:\/\/suedeai\.ai\/press\)/,
  );
});
