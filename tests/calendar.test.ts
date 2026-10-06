import assert from "node:assert/strict";
import { test } from "node:test";
import { dateKey } from "../app/components/contribution-chart";

test("uses the local calendar date for GitHub contribution keys", () => {
  const previousZone = process.env.TZ;
  try {
    process.env.TZ = "Asia/Kolkata";
    assert.equal(dateKey(new Date(2026, 9, 6)), "2026-10-06");
  } finally {
    if (previousZone === undefined) delete process.env.TZ;
    else process.env.TZ = previousZone;
  }
});
