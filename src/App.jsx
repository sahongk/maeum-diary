import { useState, useEffect } from "react";

const QUESTIONS_MORNING = [
  "지금 이 순간, 감사하고 싶은 일은 무엇인가요?",
  "어떻게 하면 오늘 하루를 더 좋게 보낼 수 있을까요?",
  "나를 위한 긍정의 한 줄을 써보세요.",
];
const QUESTIONS_EVENING = [
  "오늘 일어난 멋진 일 3가지는 무엇인가요?",
  "무엇을 했더라면 오늘 하루가 더 만족스러웠을까요?",
];
const PROVERBS_MORNING = [
  "작은 시작이 위대한 결실을 만든다.",
  "오늘 하루도 당신은 충분히 잘하고 있습니다.",
  "한 걸음씩 나아가는 것이 가장 확실한 길입니다.",
  "밝은 아침은 밝은 마음에서 시작됩니다.",
  "당신의 가능성은 아직 다 펼쳐지지 않았습니다.",
];
const ENCOURAGEMENTS_EVENING = [
  "오늘 하루도 정말 수고했습니다. 당신은 대단해요!",
  "완벽하지 않아도 괜찮아요. 오늘도 잘 해냈습니다.",
  "작은 것에도 감사할 줄 아는 당신, 정말 멋집니다.",
  "오늘의 당신은 어제보다 조금 더 성장했습니다.",
  "쉬어가는 것도 용기입니다. 오늘도 충분합니다.",
];

const SEASONS = {
  spring: { bg: "from-pink-50 to-rose-100", accent: "#e879a0", icon: "🌸", name: "봄" },
  summer: { bg: "from-sky-50 to-cyan-100", accent: "#0ea5e9", icon: "☀️", name: "여름" },
  autumn: { bg: "from-orange-50 to-amber-100", accent: "#f59e0b", icon: "🍂", name: "가을" },
  winter: { bg: "from-slate-50 to-blue-100", accent: "#6366f1", icon: "❄️", name: "겨울" },
};

function getSeason() {
  const m = new Date().getMonth() + 1;
  if (m >= 3 && m <= 5) return "spring";
  if (m >= 6 && m <= 8) return "summer";
  if (m >= 9 && m <= 11) return "autumn";
  return "winter";
}
function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "morning";
  if (h >= 18 || h < 5) return "evening";
  return "afternoon";
}
function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function formatDate(key) {
  const [y, m, d] = key.split("-");
  return `${y}년 ${parseInt(m)}월 ${parseInt(d)}일`;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function App() {
  const season = getSeason();
  const tod = getTimeOfDay();
  const colors = SEASONS[season];
  const todayKey = getTodayKey();

  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem("maeum_entries") || "{}"); }
    catch { return {}; }
  });
  const [page, setPage] = useState("home");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [draft, setDraft] = useState("");
  const [done, setDone] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  const [proverb] = useState(() =>
    pick(tod === "morning" ? PROVERBS_MORNING : ENCOURAGEMENTS_EVENING)
  );
  const [questions] = useState(() =>
    tod === "morning" ? QUESTIONS_MORNING : QUESTIONS_EVENING
  );

  // PWA 설치 배너 감지
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const todayEntry = entries[todayKey] || {};
  const sectionKey = tod === "morning" ? "morning" : tod === "evening" ? "evening" : null;
  const alreadyDone = sectionKey && todayEntry[sectionKey]?.done;

  function saveAnswer() {
    if (!draft.trim()) return;
    const q = questions[currentQ];
    const newAnswers = { ...answers, [q]: draft.trim() };
    setAnswers(newAnswers);
    setDraft("");
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const newEntries = {
        ...entries,
        [todayKey]: {
          ...todayEntry,
          [sectionKey]: { done: true, proverb, answers: newAnswers, ts: new Date().toISOString() }
        }
      };
      setEntries(newEntries);
      try { localStorage.setItem("maeum_entries", JSON.stringify(newEntries)); } catch {}
      setDone(true);
    }
  }

  async function handleInstall() {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  const historyDays = Object.keys(entries).sort((a, b) => b.localeCompare(a)).slice(0, 60);

  // ── HOME ──
  if (page === "home") return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex flex-col`}
      style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-6">

        {/* 앱 설치 배너 (Android Chrome) */}
        {installPrompt && (
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-4 flex items-center gap-3">
            <span className="text-2xl">📲</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">홈화면에 설치하기</p>
              <p className="text-xs text-gray-400">앱처럼 바로 실행할 수 있어요</p>
            </div>
            <button onClick={handleInstall}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
              style={{ background: colors.accent }}>설치</button>
          </div>
        )}

        <div className="text-center">
          <div className="text-5xl mb-2">{colors.icon}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">마음일기</h1>
          <p className="text-gray-400 text-sm">매일 나를 돌보는 작은 습관</p>
        </div>

        <div className="w-full max-w-sm bg-white/80 backdrop-blur rounded-2xl shadow p-5">
          <p className="text-xs text-gray-400 font-medium mb-1">
            {tod === "morning" ? "🌅 오늘의 격언" : "🌙 오늘의 응원"}
          </p>
          <p className="text-gray-700 text-sm leading-relaxed italic">"{proverb}"</p>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-3">
          {sectionKey ? (
            alreadyDone ? (
              <div className="bg-white/70 rounded-2xl p-4 text-center text-sm text-gray-500">
                ✅ 오늘 {tod === "morning" ? "아침" : "저녁"} 일기 완료!
              </div>
            ) : (
              <button
                onClick={() => { setPage("journal"); setCurrentQ(0); setAnswers({}); setDraft(""); setDone(false); }}
                className="w-full py-4 rounded-2xl text-white font-semibold text-base shadow-lg active:opacity-80 transition"
                style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}cc)` }}>
                {tod === "morning" ? "🌅 아침 일기 쓰기" : "🌙 저녁 일기 쓰기"}
              </button>
            )
          ) : (
            <div className="bg-white/70 rounded-2xl p-4 text-center text-sm text-gray-500">
              ☕ 오후 시간이에요. 아침·저녁 시간에 일기를 써보세요.
            </div>
          )}
          <button
            onClick={() => setPage("history")}
            className="w-full py-3 rounded-2xl bg-white/80 text-gray-600 font-medium text-sm shadow active:opacity-80 transition border border-gray-100">
            📖 지난 기록 보기
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center">
          {colors.name} {colors.icon} · {tod === "morning" ? "좋은 아침이에요" : tod === "evening" ? "오늘도 수고했어요" : "평온한 오후 되세요"}
        </p>
      </div>
    </div>
  );

  // ── JOURNAL ──
  if (page === "journal") return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex flex-col`}
      style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      {done ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800">잘 했어요!</h2>
          <p className="text-gray-500 text-sm text-center">오늘의 마음을 기록했습니다.<br />작은 습관이 큰 변화를 만들어요.</p>
          <div className="w-full max-w-sm bg-white/80 rounded-2xl p-5 space-y-4">
            {Object.entries(answers).map(([q, a]) => (
              <div key={q}>
                <p className="text-xs text-gray-400 mb-1">{q}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setPage("home")}
            className="py-3 px-10 rounded-2xl text-white font-semibold shadow-lg"
            style={{ background: colors.accent }}>홈으로</button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col px-6 py-10 gap-5 max-w-md mx-auto w-full">
          <div className="flex items-center gap-3">
            <button onClick={() => setPage("home")} className="text-gray-400 text-sm">← 뒤로</button>
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div className="h-1.5 rounded-full transition-all"
                style={{ width: `${(currentQ / questions.length) * 100}%`, background: colors.accent }} />
            </div>
            <span className="text-xs text-gray-400">{currentQ + 1}/{questions.length}</span>
          </div>

          <div className="bg-white/80 rounded-2xl p-5 shadow">
            <p className="text-xs font-medium mb-2" style={{ color: colors.accent }}>
              {tod === "morning" ? "🌅 아침 질문" : "🌙 저녁 질문"}
            </p>
            <p className="text-gray-800 text-lg font-medium leading-snug">{questions[currentQ]}</p>
          </div>

          {Object.entries(answers).length > 0 && (
            <div className="space-y-2">
              {Object.entries(answers).map(([q, a]) => (
                <div key={q} className="bg-white/50 rounded-xl px-4 py-2">
                  <p className="text-xs text-gray-400">{q}</p>
                  <p className="text-sm text-gray-600">{a}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto space-y-3">
            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="여기에 마음을 적어보세요..."
              className="w-full rounded-2xl border border-gray-200 bg-white/90 p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
              rows={4}
            />
            <button
              onClick={saveAnswer}
              disabled={!draft.trim()}
              className="w-full py-4 rounded-2xl text-white font-semibold text-base shadow-lg disabled:opacity-40 transition"
              style={{ background: colors.accent }}>
              {currentQ < questions.length - 1 ? "다음 질문 →" : "완료 ✓"}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ── HISTORY ──
  if (page === "history") return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg}`}
      style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="px-6 py-8 max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setPage("home")} className="text-gray-400 text-sm">← 뒤로</button>
          <h2 className="text-xl font-bold text-gray-800">📖 지난 기록</h2>
        </div>
        {historyDays.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <div className="text-4xl mb-3">📝</div>
            <p className="text-sm">아직 기록이 없어요.<br />오늘 첫 일기를 써보세요!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {historyDays.map(day => {
              const entry = entries[day];
              return (
                <div key={day} className="bg-white/80 rounded-2xl p-5 shadow">
                  <p className="text-xs font-semibold mb-3" style={{ color: colors.accent }}>
                    {formatDate(day)}
                  </p>
                  {entry.morning?.done && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-rose-400 mb-2">🌅 아침</p>
                      {Object.entries(entry.morning.answers).map(([q, a]) => (
                        <div key={q} className="mb-2">
                          <p className="text-xs text-gray-400">{q}</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{a}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {entry.evening?.done && (
                    <div>
                      <p className="text-xs font-medium text-indigo-400 mb-2">🌙 저녁</p>
                      {Object.entries(entry.evening.answers).map(([q, a]) => (
                        <div key={q} className="mb-2">
                          <p className="text-xs text-gray-400">{q}</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{a}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
