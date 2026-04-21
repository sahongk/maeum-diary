import { useState, useEffect } from "react";

const QUESTIONS_MORNING = [
  "오늘 꼭 하고 싶은 일은 무엇인가요?",
  "오늘 꼭 해야 할 일은 무엇인가요?",
  "오늘 일어났으면 하는 멋진 일은 무엇인가요?",
];
const QUESTIONS_EVENING = [
  "오늘 일어난 멋진 일 3가지는 무엇인가요?",
  "무엇을 했더라면 오늘 하루가 더 만족스러웠을까요?",
];

const PROVERBS_MORNING = [
  "천 리 길도 한 걸음부터. — 노자",
  "오늘 할 수 있는 일에 최선을 다하라. 그것이 내일을 위한 최고의 준비다. — 에머슨",
  "당신이 할 수 있다고 믿든, 할 수 없다고 믿든, 당신의 믿음은 옳다. — 헨리 포드",
  "성공은 매일 반복되는 작은 노력들의 합이다. — 로버트 콜리어",
  "꿈을 꾸는 사람은 영원히 젊다. — 괴테",
  "하루를 시작하는 가장 좋은 방법은 감사함으로 눈을 뜨는 것이다. — 달라이 라마",
  "시작이 반이다. — 아리스토텔레스",
  "인생은 자전거 타기와 같다. 균형을 유지하려면 계속 움직여야 한다. — 아인슈타인",
  "작은 일에 충실한 자가 큰 일에도 충실하다. — 성경 누가복음 16:10",
  "기회는 준비된 자에게만 찾아온다. — 루이 파스퇴르",
];

const ENCOURAGEMENTS_EVENING = [
  "오늘 하루도 최선을 다한 당신, 정말 대단합니다. — 내맘일기",
  "넘어져도 다시 일어나는 것, 그것이 진정한 강함입니다. — 공자",
  "오늘의 노력은 반드시 내일의 열매가 됩니다. — 내맘일기",
  "자신을 사랑하는 것이 모든 사랑의 시작입니다. — 오스카 와일드",
  "하루를 잘 마무리하는 것이 내일을 잘 시작하는 힘입니다. — 내맘일기",
  "고통은 일시적이지만, 포기는 영원합니다. — 랜스 암스트롱",
  "오늘 걸은 한 걸음이 모여 위대한 여정이 됩니다. — 내맘일기",
];

// 피터 틸 스타일 '생각코너' — 날짜 기반으로 매일 다른 질문
const CONTRARIAN_THOUGHTS = [
  { question: "열심히 일하는 것이 성공의 비결이라고 하지만, 사실 '무엇을 하느냐'가 '얼마나 하느냐'보다 훨씬 중요하다.", hint: "오늘 내가 하는 일이 정말 가치 있는 방향인지 생각해보세요." },
  { question: "학교 교육이 미래를 준비시켜 준다고 하지만, 사실 대부분의 학교는 이미 지나간 세계를 가르친다.", hint: "내가 스스로 배워야 할 미래의 지식은 무엇인가요?" },
  { question: "경쟁이 건강하다고 하지만, 사실 치열한 경쟁은 모두를 같은 방향으로 달리게 만들어 진정한 가치 창출을 방해한다.", hint: "남들이 뛰지 않는 나만의 길이 있다면 무엇일까요?" },
  { question: "다수결이 최선의 결정 방식이라고 하지만, 사실 위대한 발견은 항상 소수의 의견에서 시작되었다.", hint: "내가 혼자만 옳다고 생각하는데 말하지 못한 것이 있나요?" },
  { question: "저축이 미덕이라고 하지만, 사실 인플레이션 시대에 저축은 천천히 가난해지는 길일 수 있다.", hint: "내 돈이 지금 나를 위해 일하고 있나요?" },
  { question: "실패를 두려워하는 것이 당연하지만, 사실 작은 실패를 피하려다 인생 전체를 실패하는 사람이 더 많다.", hint: "오늘 두려움 때문에 미루고 있는 일이 있나요?" },
  { question: "나이가 들면 지혜로워진다고 하지만, 사실 나이는 경험만 쌓아줄 뿐, 성찰 없이는 편견만 깊어진다.", hint: "내 생각 중 나이가 만든 편견은 없는지 돌아보세요." },
  { question: "행복은 조건이 갖춰질 때 온다고 하지만, 사실 행복은 조건이 아니라 습관이다.", hint: "지금 이 순간, 조건 없이 행복할 수 있는 것은 무엇인가요?" },
  { question: "전문가를 믿으라고 하지만, 사실 혁명적 변화는 항상 전문가가 아닌 아웃사이더에서 시작되었다.", hint: "내가 비전문가이기 때문에 오히려 볼 수 있는 것은 무엇인가요?" },
  { question: "더 많이 가져야 더 행복하다고 하지만, 사실 욕망의 크기가 불행의 크기를 결정한다.", hint: "지금 내게 이미 충분한 것은 무엇인가요?" },
  { question: "모든 사람에게 친절해야 한다고 하지만, 사실 모든 사람을 기쁘게 하려다 자신을 잃는 사람이 더 많다.", hint: "오늘 나 자신에게 먼저 친절했나요?" },
  { question: "빠를수록 좋다고 하지만, 사실 가장 오래 지속되는 것들은 천천히 만들어졌다.", hint: "지금 내가 서두르고 있는 것 중, 사실 느려도 되는 것은 무엇인가요?" },
  { question: "성공한 사람들이 롤모델이 되어야 한다고 하지만, 사실 그들의 길을 따라가면 그들을 따라잡을 수 없다.", hint: "나만의 방식으로 성공을 정의한다면 어떤 모습인가요?" },
  { question: "기술이 삶을 편리하게 만든다고 하지만, 사실 편리함이 깊이 있는 삶의 능력을 서서히 빼앗고 있다.", hint: "오늘 기술 없이도 할 수 있는 의미 있는 일이 있나요?" },
  { question: "나이 들면 꿈을 현실적으로 조정해야 한다고 하지만, 사실 꿈을 포기한 것을 '현실적'이라고 부를 뿐이다.", hint: "내가 현실이라는 이름으로 포기한 꿈은 무엇인가요?" },
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
function getDailyThought() {
  const d = new Date();
  const idx = (d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate()) % CONTRARIAN_THOUGHTS.length;
  return CONTRARIAN_THOUGHTS[idx];
}

// 내맘일기 로고 SVG 컴포넌트
function Logo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <radialGradient id="petal" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fda4af"/>
          <stop offset="100%" stopColor="#e879a0"/>
        </radialGradient>
        <radialGradient id="seed" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#a78bfa"/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </radialGradient>
      </defs>
      {/* 줄기 */}
      <path d="M50,82 C50,75 49,65 50,55 C51,48 49,40 50,33" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* 잎 */}
      <path d="M49,62 C42,58 36,61 34,67 C32,73 38,76 45,72 C48,70 49,66 49,62Z" fill="#22c55e" opacity="0.9"/>
      <path d="M51,50 C58,46 64,48 65,54 C66,60 60,63 53,60 C51,58 51,54 51,50Z" fill="#22c55e" opacity="0.9"/>
      {/* 꽃잎 8개 */}
      <ellipse cx="50" cy="18" rx="6" ry="10" fill="url(#petal)" opacity="0.95"/>
      <ellipse cx="50" cy="48" rx="6" ry="10" fill="url(#petal)" opacity="0.95"/>
      <ellipse cx="35" cy="33" rx="10" ry="6" fill="url(#petal)" opacity="0.95"/>
      <ellipse cx="65" cy="33" rx="10" ry="6" fill="url(#petal)" opacity="0.95"/>
      <ellipse cx="39" cy="22" rx="6" ry="10" fill="#fda4af" opacity="0.85" transform="rotate(-45,39,22)"/>
      <ellipse cx="61" cy="22" rx="6" ry="10" fill="#fda4af" opacity="0.85" transform="rotate(45,61,22)"/>
      <ellipse cx="39" cy="44" rx="6" ry="10" fill="#fda4af" opacity="0.85" transform="rotate(45,39,44)"/>
      <ellipse cx="61" cy="44" rx="6" ry="10" fill="#fda4af" opacity="0.85" transform="rotate(-45,61,44)"/>
      {/* 꽃 중심 */}
      <circle cx="50" cy="33" r="10" fill="url(#seed)"/>
      <circle cx="50" cy="33" r="6" fill="#fde68a"/>
      <circle cx="50" cy="33" r="3" fill="#f59e0b"/>
      <circle cx="47" cy="31" r="1.5" fill="#fff" opacity="0.6"/>
    </svg>
  );
}

export default function App() {
  const season = getSeason();
  const tod = getTimeOfDay();
  const colors = SEASONS[season];
  const todayKey = getTodayKey();
  const dailyThought = getDailyThought();

  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem("naemam_entries") || "{}"); }
    catch { return {}; }
  });
  const [page, setPage] = useState("home");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [draft, setDraft] = useState("");
  const [done, setDone] = useState(false);
  const [showThought, setShowThought] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  const [proverb] = useState(() =>
    pick(tod === "morning" ? PROVERBS_MORNING : ENCOURAGEMENTS_EVENING)
  );
  const [questions] = useState(() =>
    tod === "morning" ? QUESTIONS_MORNING : QUESTIONS_EVENING
  );

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
      // 아침일기 완료 후 생각코너 표시
      if (tod === "morning") {
        setDone(true);
        setShowThought(true);
      } else {
        const newEntries = {
          ...entries,
          [todayKey]: {
            ...todayEntry,
            [sectionKey]: { done: true, proverb, answers: newAnswers, ts: new Date().toISOString() }
          }
        };
        setEntries(newEntries);
        try { localStorage.setItem("naemam_entries", JSON.stringify(newEntries)); } catch {}
        setDone(true);
      }
    }
  }

  function saveWithThought(thoughtAnswer) {
    const q = questions[questions.length - 1];
    const finalAnswers = { ...answers, [q]: answers[q] || "" };
    const newEntries = {
      ...entries,
      [todayKey]: {
        ...todayEntry,
        morning: {
          done: true, proverb,
          answers: finalAnswers,
          thought: { question: dailyThought.question, answer: thoughtAnswer },
          ts: new Date().toISOString()
        }
      }
    };
    setEntries(newEntries);
    try { localStorage.setItem("naemam_entries", JSON.stringify(newEntries)); } catch {}
    setShowThought(false);
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

        {installPrompt && (
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-4 flex items-center gap-3">
            <span style={{fontSize:16}}>📲</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">홈화면에 설치하기</p>
              <p className="text-xs text-gray-400">앱처럼 바로 실행할 수 있어요</p>
            </div>
            <button onClick={handleInstall}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
              style={{ background: colors.accent }}>설치</button>
          </div>
        )}

        {/* 로고 */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Logo size={72} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">내맘일기</h1>
          <p className="text-gray-400 text-xs tracking-widest">MyHeart Journal</p>
          <p className="text-gray-400 text-sm mt-1">내 마음을 키우는 평생의 친구</p>
        </div>

        {/* 오늘의 명언 */}
        <div className="w-full max-w-sm bg-white/80 backdrop-blur rounded-2xl shadow p-5">
          <p className="text-xs text-gray-400 font-medium mb-2">
            {tod === "morning" ? "🌅 오늘의 명언" : "🌙 오늘의 응원"}
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
                onClick={() => { setPage("journal"); setCurrentQ(0); setAnswers({}); setDraft(""); setDone(false); setShowThought(false); }}
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

      {/* 생각코너 */}
      {showThought ? (
        <ThoughtCorner
          thought={dailyThought}
          colors={colors}
          onSave={saveWithThought}
          onSkip={() => saveWithThought("")}
          answers={answers}
        />
      ) : done ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          <div style={{fontSize:48}}>🎉</div>
          <h2 className="text-2xl font-bold text-gray-800">잘 했어요!</h2>
          <p className="text-gray-500 text-sm text-center">오늘의 마음을 기록했습니다.<br/>작은 습관이 큰 변화를 만들어요.</p>
          <div className="w-full max-w-sm bg-white/80 rounded-2xl p-5 space-y-4">
            {Object.entries(answers).map(([q, a]) => (
              <div key={q}>
                <p className="text-xs text-gray-400 mb-1">{q}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
            {todayEntry?.morning?.thought?.answer && (
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-medium mb-1" style={{color:"#7c3aed"}}>💡 오늘의 생각</p>
                <p className="text-xs text-gray-400 mb-1">{todayEntry.morning.thought.question}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{todayEntry.morning.thought.answer}</p>
              </div>
            )}
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
              {currentQ < questions.length - 1 ? "다음 질문 →" : tod === "morning" ? "생각코너로 →" : "완료 ✓"}
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
            <div style={{fontSize:36}} className="mb-3">📝</div>
            <p className="text-sm">아직 기록이 없어요.<br/>오늘 첫 일기를 써보세요!</p>
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
                      {entry.morning.thought?.answer && (
                        <div className="mt-3 bg-purple-50 rounded-xl p-3">
                          <p className="text-xs font-medium mb-1" style={{color:"#7c3aed"}}>💡 생각코너</p>
                          <p className="text-xs text-gray-500 mb-1">{entry.morning.thought.question}</p>
                          <p className="text-sm text-gray-700">{entry.morning.thought.answer}</p>
                        </div>
                      )}
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

// ── 생각코너 컴포넌트 ──
function ThoughtCorner({ thought, colors, onSave, onSkip, answers }) {
  const [reply, setReply] = useState("");

  return (
    <div className="flex-1 flex flex-col px-6 py-10 gap-5 max-w-md mx-auto w-full">
      {/* 헤더 */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white mb-3"
          style={{background:"#7c3aed"}}>
          💡 오늘의 생각코너
        </div>
        <p className="text-xs text-gray-400">피터 틸의 질문 — 대부분이 동의하지 않는 중요한 진실</p>
      </div>

      {/* 오늘의 생각 질문 */}
      <div className="bg-white/90 rounded-2xl p-5 shadow border-l-4" style={{borderColor:"#7c3aed"}}>
        <p className="text-gray-800 text-base font-medium leading-relaxed">"{thought.question}"</p>
        <p className="text-xs text-gray-400 mt-3 leading-relaxed">{thought.hint}</p>
      </div>

      {/* 이전 답변 요약 */}
      <div className="bg-white/50 rounded-xl px-4 py-3">
        <p className="text-xs text-gray-400 mb-2">📝 오늘 아침 일기</p>
        {Object.entries(answers).map(([q, a]) => (
          <div key={q} className="mb-1">
            <p className="text-xs text-gray-500 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      {/* 답변 입력 */}
      <div className="mt-auto space-y-3">
        <textarea
          value={reply}
          onChange={e => setReply(e.target.value)}
          placeholder="이 질문에 대한 나의 생각을 자유롭게 적어보세요..."
          className="w-full rounded-2xl border border-purple-200 bg-white/90 p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-300"
          rows={4}
        />
        <button
          onClick={() => onSave(reply)}
          disabled={!reply.trim()}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base shadow-lg disabled:opacity-40 transition"
          style={{background:"#7c3aed"}}>
          생각 저장하기 ✓
        </button>
        <button
          onClick={onSkip}
          className="w-full py-2 text-gray-400 text-sm">
          오늘은 건너뛰기
        </button>
      </div>
    </div>
  );
}
