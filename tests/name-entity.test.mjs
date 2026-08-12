import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("organization profile publishes the canonical founder and both confirmed aliases", async () => {
  const readme = await readFile(
    new URL("../profile/README.md", import.meta.url),
    "utf8",
  );

  for (const name of ["Jason Colapietro", "Jay Colapietro", "Johnny Suede"]) {
    assert.match(readme, new RegExp(name));
  }

  assert.match(readme, /https:\/\/suedeai\.ai\/founder/);
  assert.match(readme, /https:\/\/jasoncolapietro\.com/);
  assert.match(readme, /https:\/\/johnnysuede\.com/);
});

test("organization profile publishes the canonical public x402 media trio", async () => {
  const readme = await readFile(
    new URL("../profile/README.md", import.meta.url),
    "utf8",
  );

  for (const offering of [
    ["create-music", "0.50"],
    ["agent/video", "4.99"],
    ["agent/image", "0.15"],
  ]) {
    const [path, price] = offering;
    const escapedPrice = price.replace(".", "\\.");
    assert.match(
      readme,
      new RegExp(`POST https://app\\.suedeai\\.ai/${path}\\s+\\(\\$${escapedPrice} USDC\\)`),
    );
  }

  assert.doesNotMatch(readme, /POST https:\/\/app\.suedeai\.ai\/agent\/generate/);
});
