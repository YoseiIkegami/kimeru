export type Decision = {
  topic: string;
  options: string[];
  deadline: string;
  participants: string[];
};

function filled(values: string[]) {
  return values.map((value) => value.trim()).filter(Boolean);
}

export function toDecisionCard(decision: Decision) {
  const options = filled(decision.options);
  const participants = filled(decision.participants);
  const deadline = decision.deadline || "未設定";
  return [
    "KIMERU｜決定カード",
    "",
    `決めること：${decision.topic.trim() || "未入力"}`,
    "状態：未決",
    `締切：${deadline}`,
    "",
    "選択肢",
    ...options.map((option, index) => `${index + 1}. ${option}`),
    "",
    `参加者：${participants.length ? participants.join("・") : "未入力"}`,
  ].join("\n");
}

export function toRequestMessage(decision: Decision) {
  const options = filled(decision.options);
  const deadline = decision.deadline || "未設定";
  return [
    `みんなで「${decision.topic.trim() || "この件"}」を決めたいです。`,
    `締切は${deadline}です。`,
    options.length ? `候補：${options.map((option, index) => `${index + 1}.${option}`).join(" / ")}` : "候補を確認中です。",
    "希望の番号か意見をこのチャットに返信してください。",
  ].join("\n");
}
