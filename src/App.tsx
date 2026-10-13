import { useMemo, useState } from "react";

import { toDecisionCard, toRequestMessage } from "./decision";

const initialOptions = ["土曜にする", "日曜にする"];

export default function App() {
  const [topic, setTopic] = useState("次の集まりの日程");
  const [options, setOptions] = useState(initialOptions);
  const [deadline, setDeadline] = useState("");
  const [participants, setParticipants] = useState("あや、たく、みさき");
  const [notice, setNotice] = useState("");
  const decision = useMemo(() => ({ topic, options, deadline, participants: participants.split(/[、,]/) }), [topic, options, deadline, participants]);
  const card = useMemo(() => toDecisionCard(decision), [decision]);
  const request = useMemo(() => toRequestMessage(decision), [decision]);

  function updateOption(index: number, value: string) {
    setOptions((current) => current.map((option, currentIndex) => currentIndex === index ? value : option));
    setNotice("");
  }

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setNotice(`${label}をコピーしました。既存のチャットへ貼り付けて送れます。`);
    } catch {
      setNotice("コピーできませんでした。内容を選んでコピーしてください。");
    }
  }

  return <main>
    <div className="shell">
      <a className="back" href="https://www.ikg-systems.com/#experiments">← IKG Systems の実験へ</a>
      <header>
        <p className="eyebrow">MAKE A SMALL DECISION</p>
        <h1>KI<span>MERU</span></h1>
        <p className="lead">決めることを、一枚にする。</p>
        <p className="caption">少人数の予定・購入・役割分担を、チャットで決め始めるための下書きです。</p>
      </header>

      <section className="editor" aria-label="決定カードを作る">
        <div className="section-heading"><span>01</span><h2>決める内容</h2></div>
        <label>決めたいこと<input value={topic} maxLength={80} onChange={(event) => { setTopic(event.target.value); setNotice(""); }} placeholder="例：次の集まりの日程" /></label>
        <label>締切<input type="datetime-local" value={deadline} onChange={(event) => { setDeadline(event.target.value); setNotice(""); }} /></label>
        <label>参加者名 <small>読点かカンマで区切る</small><input value={participants} maxLength={120} onChange={(event) => { setParticipants(event.target.value); setNotice(""); }} placeholder="例：あや、たく、みさき" /></label>
        <div className="section-heading"><span>02</span><h2>選択肢</h2><small>2〜6個</small></div>
        <div className="options">
          {options.map((option, index) => <div key={index}><b>{index + 1}</b><input aria-label={`選択肢${index + 1}`} value={option} maxLength={60} onChange={(event) => updateOption(index, event.target.value)} />{options.length > 2 && <button type="button" aria-label={`選択肢${index + 1}を削除`} onClick={() => { setOptions((current) => current.filter((_, currentIndex) => currentIndex !== index)); setNotice(""); }}>×</button>}</div>)}
        </div>
        {options.length < 6 && <button className="add" type="button" onClick={() => { setOptions((current) => [...current, ""]); setNotice(""); }}>＋ 選択肢を追加</button>}
      </section>

      <section className="output">
        <div className="section-heading"><span>03</span><h2>決定カード</h2></div>
        <pre>{card}</pre>
        <button type="button" onClick={() => copy(card, "決定カード")}>決定カードをコピー ↗</button>
      </section>
      <section className="output request">
        <div><p className="eyebrow">SEND TO CHAT</p><h2>既存チャットへ送る依頼文</h2></div>
        <pre>{request}</pre>
        <button type="button" onClick={() => copy(request, "依頼文")}>依頼文をコピー ↗</button>
      </section>
      <p className="notice" role="status">{notice}</p>
      <footer>登録・保存なし。このページを閉じると入力内容は消えます。</footer>
    </div>
  </main>;
}
