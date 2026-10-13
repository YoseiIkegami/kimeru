import assert from "node:assert/strict";
import test from "node:test";

import { toDecisionCard, toRequestMessage } from "../src/decision";

test("決定カードに未決・選択肢・締切・参加者を含める", () => {
  const card = toDecisionCard({ topic: "ランチの店", options: ["和食", "カレー", ""], deadline: "2026-10-15 12:00", participants: ["あや", "たく"] });
  assert.match(card, /状態：未決/);
  assert.match(card, /1\. 和食/);
  assert.match(card, /締切：2026-10-15 12:00/);
  assert.match(card, /参加者：あや・たく/);
  assert.doesNotMatch(card, /3\./);
});

test("依頼文は選択肢を番号で提示する", () => {
  const message = toRequestMessage({ topic: "集合時間", options: ["10時", "11時"], deadline: "金曜", participants: [] });
  assert.match(message, /締切は金曜/);
  assert.match(message, /1\.10時 \/ 2\.11時/);
  assert.match(message, /返信してください/);
});
