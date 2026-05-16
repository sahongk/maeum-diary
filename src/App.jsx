import { useState, useEffect, useRef } from "react";

// ── 상수 ──────────────────────────────────────────────────────────────
const DEFAULT_QUESTIONS_MORNING = [
  "오늘 꼭 하고 싶은 일은 무엇인가요?",
  "오늘 꼭 해야 할 일은 무엇인가요?",
  "오늘 일어났으면 하는 멋진 일은 무엇인가요?",
];
const DEFAULT_QUESTIONS_EVENING = [
  "오늘 일어난 멋진 일 3가지는 무엇인가요?",
  "무엇을 했더라면 오늘 하루가 더 만족스러웠을까요?",
];
const DEFAULT_PROVERBS = [
  "천 리 길도 한 걸음부터. — 노자",
  "오늘 할 수 있는 일에 최선을 다하라. — 에머슨",
  "당신이 할 수 있다고 믿든 없다고 믿든, 당신의 믿음은 옳다. — 헨리 포드",
  "성공은 매일 반복되는 작은 노력들의 합이다. — 로버트 콜리어",
  "꿈을 꾸는 사람은 영원히 젊다. — 괴테",
  "하루를 시작하는 가장 좋은 방법은 감사함으로 눈을 뜨는 것이다. — 달라이 라마",
  "시작이 반이다. — 아리스토텔레스",
  "인생은 자전거 타기와 같다. 균형을 유지하려면 계속 움직여야 한다. — 아인슈타인",
  "작은 일에 충실한 자가 큰 일에도 충실하다. — 성경",
  "기회는 준비된 자에게만 찾아온다. — 파스퇴르",
];
const DEFAULT_ENCOURAGEMENTS = [
  "오늘 하루도 최선을 다한 당신, 정말 대단합니다. — 내맘일기",
  "넘어져도 다시 일어나는 것, 그것이 진정한 강함입니다. — 공자",
  "오늘의 노력은 반드시 내일의 열매가 됩니다. — 내맘일기",
  "자신을 사랑하는 것이 모든 사랑의 시작입니다. — 오스카 와일드",
  "쉬어가는 것도 용기입니다. 오늘도 충분합니다. — 내맘일기",
];
const CONTRARIAN_THOUGHTS = [
  { question: "열심히 일하는 것보다 무엇을 하느냐가 훨씬 중요하다.", hint: "오늘 내가 하는 일이 정말 가치 있는 방향인지 생각해보세요." },
  { question: "대부분의 학교는 이미 지나간 세계를 가르친다.", hint: "내가 스스로 배워야 할 미래의 지식은 무엇인가요?" },
  { question: "치열한 경쟁은 모두를 같은 방향으로 달리게 만들어 진정한 가치 창출을 방해한다.", hint: "남들이 뛰지 않는 나만의 길이 있다면 무엇일까요?" },
  { question: "위대한 발견은 항상 소수의 의견에서 시작되었다.", hint: "내가 혼자만 옳다고 생각하는데 말하지 못한 것이 있나요?" },
  { question: "작은 실패를 피하려다 인생 전체를 실패하는 사람이 더 많다.", hint: "오늘 두려움 때문에 미루고 있는 일이 있나요?" },
  { question: "행복은 조건이 아니라 습관이다.", hint: "지금 이 순간, 조건 없이 행복할 수 있는 것은 무엇인가요?" },
  { question: "혁명적 변화는 항상 전문가가 아닌 아웃사이더에서 시작되었다.", hint: "내가 비전문가이기 때문에 오히려 볼 수 있는 것은 무엇인가요?" },
  { question: "욕망의 크기가 불행의 크기를 결정한다.", hint: "지금 내게 이미 충분한 것은 무엇인가요?" },
  { question: "모든 사람을 기쁘게 하려다 자신을 잃는 사람이 더 많다.", hint: "오늘 나 자신에게 먼저 친절했나요?" },
  { question: "가장 오래 지속되는 것들은 천천히 만들어졌다.", hint: "지금 서두르고 있는 것 중 사실 느려도 되는 것은 무엇인가요?" },
  { question: "성공한 사람의 길을 따라가면 그들을 따라잡을 수 없다.", hint: "나만의 방식으로 성공을 정의한다면 어떤 모습인가요?" },
  { question: "편리함이 깊이 있는 삶의 능력을 서서히 빼앗고 있다.", hint: "기술 없이도 할 수 있는 의미 있는 일이 있나요?" },
  { question: "꿈을 포기한 것을 현실적이라고 부를 뿐이다.", hint: "현실이라는 이름으로 포기한 꿈은 무엇인가요?" },
  { question: "나이는 경험만 쌓아줄 뿐, 성찰 없이는 편견만 깊어진다.", hint: "내 생각 중 나이가 만든 편견은 없는지 돌아보세요." },
  { question: "저축은 인플레이션 시대에 천천히 가난해지는 길일 수 있다.", hint: "내 돈이 지금 나를 위해 일하고 있나요?" },
];
const SEASONS = {
  spring: { bg: "from-pink-50 to-rose-100", accent: "#e879a0", icon: "🌸", name: "봄" },
  summer: { bg: "from-sky-50 to-cyan-100", accent: "#0ea5e9", icon: "☀️", name: "여름" },
  autumn: { bg: "from-orange-50 to-amber-100", accent: "#f59e0b", icon: "🍂", name: "가을" },
  winter: { bg: "from-slate-50 to-blue-100", accent: "#6366f1", icon: "❄️", name: "겨울" },
};

// ── 유틸 함수 ──────────────────────────────────────────────────────────
function getSeason() {
  const m = new Date().getMonth() + 1;
  if (m >= 3 && m <= 5) return "spring";
  if (m >= 6 && m <= 8) return "summer";
  if (m >= 9 && m <= 11) return "autumn";
  return "winter";
}
function getTimeOfDay(settings) {
  const h = new Date().getHours();
  const mStart = settings?.morningStart ?? 5;
  const mEnd   = settings?.morningEnd   ?? 12;
  const eStart = settings?.eveningStart ?? 18;
  if (h >= mStart && h < mEnd) return "morning";
  if (h >= eStart || h < 3)   return "evening"; // 새벽 0~2시는 전날 저녁 연장
  return "afternoon";
}
function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
// 일기 날짜 귀속: 새벽 3시 이전은 전날로 처리
function getJournalDateKey() {
  const now = new Date();
  if (now.getHours() < 3) {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    return `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,"0")}-${String(yesterday.getDate()).padStart(2,"0")}`;
  }
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
}
function formatDate(key) {
  if (!key) return "";
  const [y, m, d] = key.split("-");
  return `${y}년 ${parseInt(m)}월 ${parseInt(d)}일`;
}
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function getDailyThought() {
  const d = new Date();
  const idx = (d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate()) % CONTRARIAN_THOUGHTS.length;
  return CONTRARIAN_THOUGHTS[idx];
}

// ── 사진 압축 (Canvas) ─────────────────────────────────────────────────
// 최대 800px, JPEG quality 0.75 → 약 100~200KB 이하로 자동 압축
function compressImage(file) {
  return new Promise((resolve) => {
    const MAX_PX = 800;
    const QUALITY = 0.75;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width: w, height: h } = img;
        if (w > MAX_PX || h > MAX_PX) {
          if (w > h) { h = Math.round((h * MAX_PX) / w); w = MAX_PX; }
          else       { w = Math.round((w * MAX_PX) / h); h = MAX_PX; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", QUALITY));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ── 기념일 D-day 계산 ──────────────────────────────────────────────────
function getAnniversaryAlerts(anniversaries) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const alerts = [];
  (anniversaries || []).forEach((ann) => {
    if (!ann.date) return;
    const [, m, d] = ann.date.split("-");
    const thisYear = new Date(today.getFullYear(), parseInt(m) - 1, parseInt(d));
    if (thisYear < today) thisYear.setFullYear(thisYear.getFullYear() + 1);
    const diff = Math.round((thisYear - today) / 86400000);
    if (diff <= 7) alerts.push({ ...ann, diff });
  });
  return alerts.sort((a, b) => a.diff - b.diff);
}

// ── 1년 전 / 한 달 전 리마인드 ─────────────────────────────────────────
function getReminders(entries) {
  const today = getJournalDateKey();
  const [y, m, d] = today.split("-").map(Number);
  const reminders = [];
  // 1년 전
  const oneYearAgo = `${y - 1}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  if (entries[oneYearAgo]) reminders.push({ label: "1년 전 오늘", key: oneYearAgo, entry: entries[oneYearAgo] });
  // 한 달 전
  const oneMonthAgoDate = new Date(y, m - 2, d);
  const oneMonthAgo = `${oneMonthAgoDate.getFullYear()}-${String(oneMonthAgoDate.getMonth()+1).padStart(2,"0")}-${String(oneMonthAgoDate.getDate()).padStart(2,"0")}`;
  if (entries[oneMonthAgo] && oneMonthAgo !== oneYearAgo)
    reminders.push({ label: "한 달 전 오늘", key: oneMonthAgo, entry: entries[oneMonthAgo] });
  return reminders;
}

// ── 내보내기 ──────────────────────────────────────────────────────────
function exportToText(entries, from, to) {
  const days = Object.keys(entries).sort().filter((d) => d >= from && d <= to);
  let txt = "내맘일기 — MyHeart Journal\n";
  txt += `기간: ${formatDate(from)} ~ ${formatDate(to)}\n`;
  txt += "=".repeat(40) + "\n\n";
  days.forEach((day) => {
    const e = entries[day];
    txt += `【 ${formatDate(day)} 】\n`;
    if (e.photo) txt += `📸 오늘의 사진: (첨부됨)\n`;
    if (e.todayWord) txt += `💬 오늘의 한마디: ${e.todayWord}\n`;
    if (e.morning?.done) {
      txt += "\n🌅 아침\n";
      Object.entries(e.morning.answers).forEach(([q, a]) => { txt += `Q. ${q}\nA. ${a}\n`; });
      if (e.morning.thought?.answer)
        txt += `\n💡 생각코너\nQ. ${e.morning.thought.question}\nA. ${e.morning.thought.answer}\n`;
    }
    if (e.evening?.done) {
      txt += "\n🌙 저녁\n";
      Object.entries(e.evening.answers).forEach(([q, a]) => { txt += `Q. ${q}\nA. ${a}\n`; });
    }
    txt += "\n" + "-".repeat(40) + "\n\n";
  });
  const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `내맘일기_${from}_${to}.txt`; a.click();
  URL.revokeObjectURL(url);
}

// ── 로고 ──────────────────────────────────────────────────────────────
function Logo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <radialGradient id="lp" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="#fda4af"/><stop offset="100%" stopColor="#e879a0"/></radialGradient>
        <radialGradient id="ls" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#7c3aed"/></radialGradient>
      </defs>
      <path d="M50,82 C50,75 49,65 50,55 C51,48 49,40 50,33" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M49,62 C42,58 36,61 34,67 C32,73 38,76 45,72 C48,70 49,66 49,62Z" fill="#22c55e" opacity="0.9"/>
      <path d="M51,50 C58,46 64,48 65,54 C66,60 60,63 53,60 C51,58 51,54 51,50Z" fill="#22c55e" opacity="0.9"/>
      <ellipse cx="50" cy="18" rx="6" ry="10" fill="url(#lp)" opacity="0.95"/>
      <ellipse cx="50" cy="48" rx="6" ry="10" fill="url(#lp)" opacity="0.95"/>
      <ellipse cx="35" cy="33" rx="10" ry="6" fill="url(#lp)" opacity="0.95"/>
      <ellipse cx="65" cy="33" rx="10" ry="6" fill="url(#lp)" opacity="0.95"/>
      <ellipse cx="39" cy="22" rx="6" ry="10" fill="#fda4af" opacity="0.85" transform="rotate(-45,39,22)"/>
      <ellipse cx="61" cy="22" rx="6" ry="10" fill="#fda4af" opacity="0.85" transform="rotate(45,61,22)"/>
      <ellipse cx="39" cy="44" rx="6" ry="10" fill="#fda4af" opacity="0.85" transform="rotate(45,39,44)"/>
      <ellipse cx="61" cy="44" rx="6" ry="10" fill="#fda4af" opacity="0.85" transform="rotate(-45,61,44)"/>
      <circle cx="50" cy="33" r="10" fill="url(#ls)"/>
      <circle cx="50" cy="33" r="6" fill="#fde68a"/>
      <circle cx="50" cy="33" r="3" fill="#f59e0b"/>
      <circle cx="47" cy="31" r="1.5" fill="#fff" opacity="0.6"/>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════
// ── 메인 앱 ────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════
export default function App() {
  const season   = getSeason();
  const colors   = SEASONS[season];
  const font     = { fontFamily: "'Noto Sans KR',sans-serif" };

  // 설정
  const [settings, setSettings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("naemam_settings") || "null") || {
        morningStart: 5, morningEnd: 12, eveningStart: 18,
        qMorning: [...DEFAULT_QUESTIONS_MORNING],
        qEvening: [...DEFAULT_QUESTIONS_EVENING],
        anniversaries: [],        // 기념일 목록
      };
    } catch {
      return { morningStart:5, morningEnd:12, eveningStart:18,
               qMorning:[...DEFAULT_QUESTIONS_MORNING], qEvening:[...DEFAULT_QUESTIONS_EVENING], anniversaries:[] };
    }
  });

  const tod        = getTimeOfDay(settings);
  const todayKey   = getJournalDateKey();
  const dailyThought = getDailyThought();

  // 일기 데이터
  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem("naemam_entries") || "{}"); } catch { return {}; }
  });

  // 페이지 라우팅
  const [page, setPage] = useState("home"); // home|journal|photo|todayword|history|edit|export|settings|remind

  // 일기 작성 상태
  const [currentQ, setCurrentQ]     = useState(0);
  const [answers,  setAnswers]       = useState({});
  const [draft,    setDraft]         = useState("");
  const [done,     setDone]          = useState(false);
  const [showThought, setShowThought] = useState(false);

  // 사진 상태
  const [photoStep, setPhotoStep]   = useState("prompt"); // prompt|preview|done
  const [photoData, setPhotoData]   = useState(null);     // base64 압축 이미지

  // 오늘의 한마디 상태
  const [todayWord, setTodayWord]   = useState("");

  // 고쳐쓰기 상태
  const [editDay,     setEditDay]     = useState(null);
  const [editSection, setEditSection] = useState("morning");
  const [editAnswers, setEditAnswers] = useState({});
  const [editThought, setEditThought] = useState("");
  const [editPhoto,   setEditPhoto]   = useState(null);
  const [editWord,    setEditWord]    = useState("");

  // 내보내기 상태
  const [exportFrom, setExportFrom] = useState(getTodayKey().slice(0,7) + "-01");
  const [exportTo,   setExportTo]   = useState(getTodayKey());

  // 리마인드 모달
  const [showRemind, setShowRemind] = useState(false);

  const [proverb] = useState(() => pick(tod === "morning" ? DEFAULT_PROVERBS : DEFAULT_ENCOURAGEMENTS));
  const questions  = tod === "morning" ? settings.qMorning : settings.qEvening;

  const todayEntry = entries[todayKey] || {};
  const sectionKey = tod === "morning" ? "morning" : tod === "evening" ? "evening" : null;
  const alreadyDone = sectionKey && todayEntry[sectionKey]?.done;
  const hasPhoto    = !!todayEntry.photo;
  const hasWord     = !!todayEntry.todayWord;

  // 기념일 알림
  const annAlerts   = getAnniversaryAlerts(settings.anniversaries);
  // 리마인드 데이터
  const reminders   = getReminders(entries);

  // ── 저장 함수 ──
  function saveSettings(s) {
    setSettings(s);
    try { localStorage.setItem("naemam_settings", JSON.stringify(s)); } catch {}
  }
  function saveEntries(e) {
    setEntries(e);
    try { localStorage.setItem("naemam_entries", JSON.stringify(e)); } catch {}
  }

  // ── 일기 저장 ──
  function saveAnswer() {
    if (!draft.trim()) return;
    const q  = questions[currentQ];
    const na = { ...answers, [q]: draft.trim() };
    setAnswers(na); setDraft("");
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      if (tod === "morning") { setDone(true); setShowThought(true); }
      else {
        saveEntries({ ...entries, [todayKey]: { ...todayEntry, evening:{ done:true, proverb, answers:na, ts:new Date().toISOString() } } });
        setDone(true);
      }
    }
  }

  function saveWithThought(ta) {
    const fa = { ...answers };
    saveEntries({ ...entries, [todayKey]: { ...todayEntry, morning:{ done:true, proverb, answers:fa, thought:{ question:dailyThought.question, answer:ta }, ts:new Date().toISOString() } } });
    setShowThought(false);
  }

  // ── 사진 저장 ──
  function savePhoto(data) {
    saveEntries({ ...entries, [todayKey]: { ...todayEntry, photo: data, photoTs: new Date().toISOString() } });
  }
  function deletePhoto() {
    const updated = { ...entries, [todayKey]: { ...todayEntry, photo: null, photoTs: null } };
    saveEntries(updated);
  }

  // ── 오늘의 한마디 저장 ──
  function saveTodayWord(word) {
    saveEntries({ ...entries, [todayKey]: { ...todayEntry, todayWord: word, wordTs: new Date().toISOString() } });
  }

  // ── 고쳐쓰기 ──
  function saveEdit() {
    const updated = {
      ...entries,
      [editDay]: {
        ...entries[editDay],
        ...(editPhoto !== undefined ? { photo: editPhoto } : {}),
        ...(editWord  !== undefined ? { todayWord: editWord } : {}),
        [editSection]: {
          ...entries[editDay][editSection],
          answers: editAnswers,
          ...(editSection === "morning" ? { thought: { ...entries[editDay]?.morning?.thought, answer: editThought } } : {}),
        },
      },
    };
    saveEntries(updated); setPage("history");
  }

  function openEdit(day, section) {
    setEditDay(day); setEditSection(section);
    setEditAnswers({ ...(entries[day]?.[section]?.answers || {}) });
    setEditThought(entries[day]?.morning?.thought?.answer || "");
    setEditPhoto(entries[day]?.photo ?? null);
    setEditWord(entries[day]?.todayWord ?? "");
    setPage("edit");
  }

  const historyDays = Object.keys(entries).sort((a, b) => b.localeCompare(a)).slice(0, 90);

  // ══════════════════════════════════════════════════════════════════
  // ── HOME 페이지 ────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════
  if (page === "home") return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex flex-col`} style={font}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-4">

        {/* 로고 */}
        <div className="text-center">
          <div className="flex justify-center mb-2"><Logo size={70}/></div>
          <h1 className="text-3xl font-bold text-gray-800 mb-0.5">내맘일기</h1>
          <p className="text-gray-400 text-xs tracking-widest">MyHeart Journal</p>
          <p className="text-gray-400 text-sm mt-1">내 마음을 키우는 평생의 친구</p>
        </div>

        {/* 기념일 알림 배너 */}
        {annAlerts.length > 0 && (
          <div className="w-full max-w-sm bg-amber-50 border border-amber-200 rounded-2xl p-4">
            {annAlerts.map((ann, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-amber-800">
                <span className="text-lg">🎉</span>
                <span>
                  <strong>{ann.name}</strong>이{ann.diff === 0 ? " 오늘이에요!" : ` ${ann.diff}일 후예요!`}
                  {ann.diff > 0 && ann.hint && <span className="text-amber-600 text-xs ml-1">— {ann.hint}</span>}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 1년 전/한 달 전 리마인드 배너 */}
        {reminders.length > 0 && (
          <button onClick={() => setShowRemind(true)}
            className="w-full max-w-sm bg-purple-50 border border-purple-200 rounded-2xl p-4 text-left">
            <p className="text-xs font-semibold text-purple-500 mb-1">💭 오늘의 리마인드</p>
            {reminders.map((r, i) => (
              <p key={i} className="text-sm text-purple-700">
                {r.label}의 다짐을 확인해보세요 →
              </p>
            ))}
          </button>
        )}

        {/* 명언 카드 */}
        <div className="w-full max-w-sm bg-white/80 rounded-2xl shadow p-4">
          <p className="text-xs text-gray-400 mb-1">{tod === "morning" ? "🌅 오늘의 명언" : "🌙 오늘의 응원"}</p>
          <p className="text-gray-700 text-sm leading-relaxed italic">"{proverb}"</p>
        </div>

        {/* 액션 버튼 영역 */}
        <div className="w-full max-w-sm flex flex-col gap-3">

          {/* 일기 쓰기 버튼 */}
          {sectionKey ? (
            alreadyDone ? (
              <div className="bg-white/70 rounded-2xl p-4 text-center text-sm text-gray-500">
                ✅ 오늘 {tod === "morning" ? "아침" : "저녁"} 일기 완료!
              </div>
            ) : (
              <button onClick={() => { setPage("journal"); setCurrentQ(0); setAnswers({}); setDraft(""); setDone(false); setShowThought(false); }}
                className="w-full py-4 rounded-2xl text-white font-semibold text-base shadow-lg"
                style={{ background: `linear-gradient(135deg,${colors.accent},${colors.accent}cc)` }}>
                {tod === "morning" ? "🌅 아침 일기 쓰기" : "🌙 저녁 일기 쓰기"}
              </button>
            )
          ) : (
            <div className="bg-white/70 rounded-2xl p-4 text-center text-sm text-gray-500">☕ 오후 시간이에요.</div>
          )}

          {/* 📸 오늘의 사진 + 💬 오늘의 한마디 */}
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => { setPhotoStep("prompt"); setPhotoData(todayEntry.photo || null); setPage("photo"); }}
              className={`flex flex-col items-center py-3 rounded-2xl text-sm font-medium shadow border gap-1 ${hasPhoto ? "bg-pink-50 border-pink-200 text-pink-600" : "bg-white/80 text-gray-600 border-gray-100"}`}>
              <span style={{ fontSize: 22 }}>📸</span>
              <span className="text-xs">{hasPhoto ? "사진 보기/수정" : "오늘의 사진"}</span>
            </button>
            <button onClick={() => { setTodayWord(todayEntry.todayWord || ""); setPage("todayword"); }}
              className={`flex flex-col items-center py-3 rounded-2xl text-sm font-medium shadow border gap-1 ${hasWord ? "bg-indigo-50 border-indigo-200 text-indigo-600" : "bg-white/80 text-gray-600 border-gray-100"}`}>
              <span style={{ fontSize: 22 }}>💬</span>
              <span className="text-xs">{hasWord ? "한마디 보기/수정" : "오늘의 한마디"}</span>
            </button>
          </div>

          {/* 하단 메뉴 3개 */}
          <div className="grid grid-cols-3 gap-2 mt-1">
            {[
              { icon: "📖", label: "지난일기",   action: () => setPage("history")  },
              { icon: "📥", label: "내보내기",   action: () => setPage("export")   },
              { icon: "⚙️", label: "나만의설정", action: () => setPage("settings") },
            ].map(({ icon, label, action }) => (
              <button key={label} onClick={action}
                className="flex flex-col items-center py-3 rounded-2xl bg-white/80 text-gray-600 text-xs font-medium shadow border border-gray-100 gap-1">
                <span style={{ fontSize: 22 }}>{icon}</span>{label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400">{colors.name} {colors.icon} · {tod === "morning" ? "좋은 아침이에요" : tod === "evening" ? "오늘도 수고했어요" : "평온한 오후 되세요"}</p>
      </div>

      {/* 리마인드 모달 */}
      {showRemind && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800">💭 과거의 나</h3>
              <button onClick={() => setShowRemind(false)} className="text-gray-400 text-sm">✕ 닫기</button>
            </div>
            {reminders.map((r, i) => (
              <div key={i} className="mb-5">
                <p className="text-xs font-semibold text-purple-500 mb-2">{r.label} ({formatDate(r.key)})</p>
                {r.entry.morning?.done && (
                  <div className="mb-3">
                    <p className="text-xs text-rose-400 font-medium mb-1">🌅 아침 다짐</p>
                    {Object.entries(r.entry.morning.answers).slice(0,2).map(([q,a]) => (
                      <div key={q} className="bg-rose-50 rounded-xl px-3 py-2 mb-1">
                        <p className="text-xs text-gray-400">{q}</p>
                        <p className="text-sm text-gray-700">{a}</p>
                      </div>
                    ))}
                  </div>
                )}
                {r.entry.evening?.done && (
                  <div>
                    <p className="text-xs text-indigo-400 font-medium mb-1">🌙 저녁 소감</p>
                    {Object.entries(r.entry.evening.answers).slice(0,1).map(([q,a]) => (
                      <div key={q} className="bg-indigo-50 rounded-xl px-3 py-2 mb-1">
                        <p className="text-xs text-gray-400">{q}</p>
                        <p className="text-sm text-gray-700">{a}</p>
                      </div>
                    ))}
                  </div>
                )}
                {r.entry.todayWord && (
                  <div className="bg-gray-50 rounded-xl px-3 py-2 mt-1">
                    <p className="text-xs text-gray-400">💬 그날의 한마디</p>
                    <p className="text-sm text-gray-700 italic">"{r.entry.todayWord}"</p>
                  </div>
                )}
                {r.entry.photo && (
                  <img src={r.entry.photo} alt="그날의 사진" className="w-full rounded-xl mt-2 object-cover max-h-40"/>
                )}
                {i < reminders.length - 1 && <hr className="my-4 border-gray-100"/>}
              </div>
            ))}
            <p className="text-xs text-gray-400 text-center mt-2">지금의 당신은 어떻게 달라졌나요? 🌱</p>
          </div>
        </div>
      )}
    </div>
  );

  // ══════════════════════════════════════════════════════════════════
  // ── JOURNAL (일기 작성) ────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════
  if (page === "journal") return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex flex-col`} style={font}>
      {showThought ? (
        <ThoughtCorner thought={dailyThought} colors={colors} onSave={saveWithThought} onSkip={() => saveWithThought("")}/>
      ) : done ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
          <div style={{ fontSize: 48 }}>🎉</div>
          <h2 className="text-2xl font-bold text-gray-800">잘 했어요!</h2>
          <p className="text-gray-500 text-sm text-center">오늘의 마음을 기록했습니다.</p>
          <button onClick={() => setPage("home")} className="py-3 px-10 rounded-2xl text-white font-semibold shadow-lg" style={{ background: colors.accent }}>홈으로</button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col px-6 py-10 gap-5 max-w-md mx-auto w-full">
          <div className="flex items-center gap-3">
            <button onClick={() => setPage("home")} className="text-gray-400 text-sm">← 뒤로</button>
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div className="h-1.5 rounded-full transition-all" style={{ width: `${(currentQ / questions.length) * 100}%`, background: colors.accent }}/>
            </div>
            <span className="text-xs text-gray-400">{currentQ + 1}/{questions.length}</span>
          </div>
          <div className="bg-white/80 rounded-2xl p-5 shadow">
            <p className="text-xs font-medium mb-2" style={{ color: colors.accent }}>{tod === "morning" ? "🌅 아침 질문" : "🌙 저녁 질문"}</p>
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
            <textarea value={draft} onChange={e => setDraft(e.target.value)}
              placeholder="여기에 마음을 적어보세요..."
              className="w-full rounded-2xl border border-gray-200 bg-white/90 p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300" rows={4}/>
            <button onClick={saveAnswer} disabled={!draft.trim()}
              className="w-full py-4 rounded-2xl text-white font-semibold shadow-lg disabled:opacity-40"
              style={{ background: colors.accent }}>
              {currentQ < questions.length - 1 ? "다음 질문 →" : tod === "morning" ? "생각코너로 →" : "완료 ✓"}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ══════════════════════════════════════════════════════════════════
  // ── 📸 오늘의 사진 페이지 ──────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════
  if (page === "photo") return (
    <PhotoPage
      colors={colors} font={font}
      existingPhoto={todayEntry.photo || null}
      onSave={(data) => { savePhoto(data); setPage("home"); }}
      onDelete={() => { deletePhoto(); setPage("home"); }}
      onSkip={() => setPage("home")}
    />
  );

  // ══════════════════════════════════════════════════════════════════
  // ── 💬 오늘의 한마디 페이지 ────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════
  if (page === "todayword") return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex flex-col`} style={font}>
      <div className="flex-1 flex flex-col px-6 py-10 gap-5 max-w-md mx-auto w-full">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => setPage("home")} className="text-gray-400 text-sm">← 뒤로</button>
          <h2 className="text-xl font-bold text-gray-800">💬 오늘의 한마디</h2>
        </div>
        <div className="bg-white/80 rounded-2xl p-5 shadow">
          <p className="text-xs text-gray-400 mb-3">오늘 하루를 한 문장으로 표현한다면?</p>
          <textarea value={todayWord} onChange={e => setTodayWord(e.target.value)}
            placeholder="예) 오늘은 작은 용기를 냈다. 그것으로 충분하다."
            className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
            rows={4}/>
        </div>
        {todayEntry.todayWord && (
          <div className="bg-indigo-50 rounded-2xl p-4">
            <p className="text-xs text-indigo-400 mb-1">현재 저장된 한마디</p>
            <p className="text-sm text-indigo-700 italic">"{todayEntry.todayWord}"</p>
          </div>
        )}
        <div className="mt-auto space-y-3">
          <button onClick={() => { if(todayWord.trim()) saveTodayWord(todayWord.trim()); setPage("home"); }}
            disabled={!todayWord.trim()}
            className="w-full py-4 rounded-2xl text-white font-semibold shadow-lg disabled:opacity-40"
            style={{ background: "#6366f1" }}>
            저장하기 ✓
          </button>
          {todayEntry.todayWord && (
            <button onClick={() => { saveTodayWord(""); setPage("home"); }}
              className="w-full py-2 text-red-400 text-sm">삭제하기</button>
          )}
          <button onClick={() => setPage("home")} className="w-full py-2 text-gray-400 text-sm">건너뛰기</button>
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════
  // ── 지난일기 ──────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════
  if (page === "history") return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg}`} style={font}>
      <div className="px-6 py-8 max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setPage("home")} className="text-gray-400 text-sm">← 뒤로</button>
          <h2 className="text-xl font-bold text-gray-800">📖 지난일기</h2>
        </div>
        {historyDays.length === 0 ? (
          <div className="text-center text-gray-400 py-16"><p className="text-sm">아직 기록이 없어요.</p></div>
        ) : (
          <div className="space-y-4">
            {historyDays.map(day => {
              const e = entries[day];
              return (
                <div key={day} className="bg-white/80 rounded-2xl p-5 shadow">
                  <p className="text-xs font-semibold mb-3" style={{ color: colors.accent }}>{formatDate(day)}</p>

                  {/* 오늘의 사진 썸네일 */}
                  {e.photo && (
                    <img src={e.photo} alt="오늘의 사진" className="w-full rounded-xl mb-3 object-cover max-h-48"/>
                  )}

                  {/* 오늘의 한마디 */}
                  {e.todayWord && (
                    <div className="bg-indigo-50 rounded-xl px-3 py-2 mb-3">
                      <p className="text-xs text-indigo-400 mb-0.5">💬 한마디</p>
                      <p className="text-sm text-indigo-700 italic">"{e.todayWord}"</p>
                    </div>
                  )}

                  {e.morning?.done && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-rose-400">🌅 아침</p>
                        <button onClick={() => openEdit(day, "morning")} className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg">✏️ 고쳐쓰기</button>
                      </div>
                      {Object.entries(e.morning.answers).map(([q, a]) => (
                        <div key={q} className="mb-2"><p className="text-xs text-gray-400">{q}</p><p className="text-sm text-gray-700">{a}</p></div>
                      ))}
                      {e.morning.thought?.answer && (
                        <div className="mt-2 bg-purple-50 rounded-xl p-3">
                          <p className="text-xs font-medium mb-1" style={{ color: "#7c3aed" }}>💡 생각코너</p>
                          <p className="text-xs text-gray-500 mb-1">{e.morning.thought.question}</p>
                          <p className="text-sm text-gray-700">{e.morning.thought.answer}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {e.evening?.done && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-indigo-400">🌙 저녁</p>
                        <button onClick={() => openEdit(day, "evening")} className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg">✏️ 고쳐쓰기</button>
                      </div>
                      {Object.entries(e.evening.answers).map(([q, a]) => (
                        <div key={q} className="mb-2"><p className="text-xs text-gray-400">{q}</p><p className="text-sm text-gray-700">{a}</p></div>
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

  // ══════════════════════════════════════════════════════════════════
  // ── 고쳐쓰기 ──────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════
  if (page === "edit") return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg}`} style={font}>
      <div className="px-6 py-8 max-w-md mx-auto pb-20">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setPage("history")} className="text-gray-400 text-sm">← 뒤로</button>
          <h2 className="text-xl font-bold text-gray-800">✏️ 고쳐쓰기</h2>
        </div>
        <p className="text-xs font-semibold mb-4" style={{ color: colors.accent }}>{formatDate(editDay)} · {editSection === "morning" ? "🌅 아침" : "🌙 저녁"}</p>

        {/* 사진 수정 */}
        <div className="bg-white/80 rounded-2xl p-4 shadow mb-4">
          <p className="text-xs font-semibold text-gray-600 mb-3">📸 오늘의 사진</p>
          {editPhoto ? (
            <div className="relative">
              <img src={editPhoto} alt="사진" className="w-full rounded-xl object-cover max-h-48"/>
              <button onClick={() => setEditPhoto(null)}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg">삭제</button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl py-6 cursor-pointer bg-gray-50">
              <span className="text-2xl mb-1">📷</span>
              <span className="text-xs text-gray-400">사진 선택</span>
              <input type="file" accept="image/*" className="hidden"
                onChange={async (e) => { if(e.target.files[0]) { const d = await compressImage(e.target.files[0]); setEditPhoto(d); }}}/>
            </label>
          )}
        </div>

        {/* 한마디 수정 */}
        <div className="bg-white/80 rounded-2xl p-4 shadow mb-4">
          <p className="text-xs font-semibold text-gray-600 mb-2">💬 오늘의 한마디</p>
          <textarea value={editWord} onChange={e => setEditWord(e.target.value)}
            placeholder="오늘 하루를 한 문장으로..."
            className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-200"
            rows={2}/>
        </div>

        {/* 답변 수정 */}
        <div className="space-y-4">
          {Object.entries(editAnswers).map(([q, a]) => (
            <div key={q} className="bg-white/80 rounded-2xl p-4 shadow">
              <p className="text-xs text-gray-400 mb-2">{q}</p>
              <textarea value={a} onChange={e => setEditAnswers({ ...editAnswers, [q]: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-pink-200"
                rows={3}/>
            </div>
          ))}
          {editSection === "morning" && entries[editDay]?.morning?.thought && (
            <div className="bg-purple-50 rounded-2xl p-4 shadow">
              <p className="text-xs font-medium mb-1" style={{ color: "#7c3aed" }}>💡 생각코너</p>
              <p className="text-xs text-gray-500 mb-2">{entries[editDay]?.morning?.thought?.question}</p>
              <textarea value={editThought} onChange={e => setEditThought(e.target.value)}
                className="w-full rounded-xl border border-purple-200 bg-white p-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-200"
                rows={3}/>
            </div>
          )}
          <button onClick={saveEdit} className="w-full py-4 rounded-2xl text-white font-semibold shadow-lg" style={{ background: colors.accent }}>저장하기 ✓</button>
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════
  // ── 내보내기 ──────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════
  if (page === "export") return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg}`} style={font}>
      <div className="px-6 py-8 max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setPage("home")} className="text-gray-400 text-sm">← 뒤로</button>
          <h2 className="text-xl font-bold text-gray-800">📥 내보내기</h2>
        </div>
        <div className="bg-white/80 rounded-2xl p-5 shadow space-y-5">
          <p className="text-sm text-gray-600">기간을 선택하면 일기 내용을 텍스트 파일로 저장할 수 있어요.</p>
          <div>
            <p className="text-xs text-gray-400 mb-1">시작일</p>
            <input type="date" value={exportFrom} onChange={e => setExportFrom(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"/>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">종료일</p>
            <input type="date" value={exportTo} onChange={e => setExportTo(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"/>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">
              📊 해당 기간 기록: <span className="font-semibold text-gray-700">
                {Object.keys(entries).filter(d => d >= exportFrom && d <= exportTo).length}일
              </span>
            </p>
          </div>
          <button onClick={() => exportToText(entries, exportFrom, exportTo)}
            className="w-full py-4 rounded-2xl text-white font-semibold shadow-lg" style={{ background: colors.accent }}>
            📥 텍스트 파일로 저장하기
          </button>
          <p className="text-xs text-gray-400 text-center">* .txt 파일로 저장됩니다.</p>
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════
  // ── 나만의설정 ────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════
  if (page === "settings") return (
    <SettingsPage settings={settings} colors={colors}
      onSave={s => { saveSettings(s); setPage("home"); }}
      onBack={() => setPage("home")}/>
  );

  return null;
}

// ══════════════════════════════════════════════════════════════════════
// ── 📸 사진 페이지 (독립 컴포넌트) ─────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════
function PhotoPage({ colors, font, existingPhoto, onSave, onDelete, onSkip }) {
  const [step, setStep] = useState(existingPhoto ? "preview" : "prompt");
  const [preview, setPreview] = useState(existingPhoto || null);
  const [loading, setLoading] = useState(false);

  async function handleFile(file) {
    if (!file) return;
    setLoading(true);
    const compressed = await compressImage(file);
    setPreview(compressed);
    setStep("preview");
    setLoading(false);
  }

  // ── 선택 화면
  if (step === "prompt") return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex flex-col`} style={font}>
      <div className="flex-1 flex flex-col px-6 py-10 gap-5 max-w-md mx-auto w-full">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onSkip} className="text-gray-400 text-sm">← 뒤로</button>
          <h2 className="text-xl font-bold text-gray-800">📸 오늘의 사진</h2>
        </div>
        <div className="bg-white/80 rounded-2xl p-5 shadow text-center">
          <div className="text-4xl mb-3">🌅</div>
          <p className="text-gray-700 text-base font-medium mb-1">오늘 가장 기억하고 싶은 순간을</p>
          <p className="text-gray-700 text-base font-medium mb-4">사진으로 남겨보세요.</p>
          <p className="text-xs text-gray-400">하루 1장 · 자동 압축 (약 100KB 이하)</p>
        </div>
        <div className="mt-auto space-y-3">
          <label className="w-full py-4 rounded-2xl text-white font-semibold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            style={{ background: `linear-gradient(135deg,${colors.accent},${colors.accent}cc)` }}>
            <span>📷 사진 선택하기</span>
            <input type="file" accept="image/*" capture="environment" className="hidden"
              onChange={e => handleFile(e.target.files[0])}/>
          </label>
          {loading && <p className="text-center text-xs text-gray-400">압축 중...</p>}
          <button onClick={onSkip} className="w-full py-2 text-gray-400 text-sm">오늘은 건너뛰기</button>
        </div>
      </div>
    </div>
  );

  // ── 미리보기 화면
  if (step === "preview") return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex flex-col`} style={font}>
      <div className="flex-1 flex flex-col px-6 py-10 gap-5 max-w-md mx-auto w-full">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => { setPreview(null); setStep("prompt"); }} className="text-gray-400 text-sm">← 다시 선택</button>
          <h2 className="text-xl font-bold text-gray-800">📸 오늘의 사진</h2>
        </div>
        <div className="bg-white/80 rounded-2xl shadow overflow-hidden">
          <img src={preview} alt="오늘의 사진" className="w-full object-cover max-h-72"/>
        </div>
        <p className="text-xs text-gray-400 text-center">✅ 자동 압축 완료 — 저장 용량 최소화</p>
        <div className="mt-auto space-y-3">
          <button onClick={() => onSave(preview)}
            className="w-full py-4 rounded-2xl text-white font-semibold shadow-lg"
            style={{ background: colors.accent }}>
            이 사진으로 저장하기 ✓
          </button>
          <label className="w-full py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-600 font-medium text-sm flex items-center justify-center gap-2 cursor-pointer">
            🔄 다른 사진 선택
            <input type="file" accept="image/*" capture="environment" className="hidden"
              onChange={e => handleFile(e.target.files[0])}/>
          </label>
          {existingPhoto && (
            <button onClick={onDelete} className="w-full py-2 text-red-400 text-sm">🗑️ 사진 삭제하기</button>
          )}
          <button onClick={onSkip} className="w-full py-2 text-gray-400 text-sm">건너뛰기</button>
        </div>
      </div>
    </div>
  );

  return null;
}

// ══════════════════════════════════════════════════════════════════════
// ── 생각코너 ──────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════
function ThoughtCorner({ thought, colors, onSave, onSkip }) {
  const [reply, setReply] = useState("");
  return (
    <div className="flex-1 flex flex-col px-6 py-10 gap-5 max-w-md mx-auto w-full">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white mb-2" style={{ background: "#7c3aed" }}>💡 오늘의 생각코너</div>
        <p className="text-xs text-gray-400">피터 틸의 질문 — 대부분이 동의하지 않는 중요한 진실</p>
      </div>
      <div className="bg-white/90 rounded-2xl p-5 shadow border-l-4" style={{ borderColor: "#7c3aed" }}>
        <p className="text-gray-800 text-base font-medium leading-relaxed">"{thought.question}"</p>
        <p className="text-xs text-gray-400 mt-3">{thought.hint}</p>
      </div>
      <div className="mt-auto space-y-3">
        <textarea value={reply} onChange={e => setReply(e.target.value)}
          placeholder="이 질문에 대한 나의 생각을 자유롭게 적어보세요..."
          className="w-full rounded-2xl border border-purple-200 bg-white/90 p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-300" rows={4}/>
        <button onClick={() => onSave(reply)} disabled={!reply.trim()}
          className="w-full py-4 rounded-2xl text-white font-semibold shadow-lg disabled:opacity-40" style={{ background: "#7c3aed" }}>
          생각 저장하기 ✓
        </button>
        <button onClick={onSkip} className="w-full py-2 text-gray-400 text-sm">오늘은 건너뛰기</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// ── 나만의설정 페이지 ─────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════
function SettingsPage({ settings, colors, onSave, onBack }) {
  const [s, setS] = useState({
    ...settings,
    qMorning: [...settings.qMorning],
    qEvening: [...settings.qEvening],
    anniversaries: [...(settings.anniversaries || [])],
  });
  const [newQm, setNewQm] = useState("");
  const [newQe, setNewQe] = useState("");
  const [newAnn, setNewAnn] = useState({ name: "", date: "", hint: "" });

  function updQ(type, idx, val) {
    const arr = type === "morning" ? [...s.qMorning] : [...s.qEvening];
    arr[idx] = val;
    setS({ ...s, [type === "morning" ? "qMorning" : "qEvening"]: arr });
  }
  function delQ(type, idx) {
    const arr = type === "morning" ? [...s.qMorning] : [...s.qEvening];
    arr.splice(idx, 1);
    setS({ ...s, [type === "morning" ? "qMorning" : "qEvening"]: arr });
  }
  function addQ(type) {
    const val = type === "morning" ? newQm : newQe;
    if (!val.trim()) return;
    const arr = type === "morning" ? [...s.qMorning] : [...s.qEvening];
    arr.push(val.trim());
    setS({ ...s, [type === "morning" ? "qMorning" : "qEvening"]: arr });
    type === "morning" ? setNewQm("") : setNewQe("");
  }
  function addAnn() {
    if (!newAnn.name.trim() || !newAnn.date) return;
    setS({ ...s, anniversaries: [...s.anniversaries, { ...newAnn }] });
    setNewAnn({ name: "", date: "", hint: "" });
  }
  function delAnn(idx) {
    const arr = [...s.anniversaries]; arr.splice(idx, 1);
    setS({ ...s, anniversaries: arr });
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg}`} style={{ fontFamily: "'Noto Sans KR',sans-serif" }}>
      <div className="px-6 py-8 max-w-md mx-auto pb-20">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="text-gray-400 text-sm">← 뒤로</button>
          <h2 className="text-xl font-bold text-gray-800">⚙️ 나만의설정</h2>
        </div>

        {/* 시간 설정 */}
        <div className="bg-white/80 rounded-2xl p-5 shadow mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-4">⏰ 일기 시간 설정</p>
          {[
            { label: "🌅 아침 시작 (시)", key: "morningStart", min: 3,  max: 11 },
            { label: "🌅 아침 마감 (시)", key: "morningEnd",   min: 8,  max: 14 },
            { label: "🌙 저녁 시작 (시)", key: "eveningStart", min: 15, max: 23 },
          ].map(({ label, key, min, max }) => (
            <div key={key} className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-600">{label}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setS({ ...s, [key]: Math.max(min, s[key] - 1) })} className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 text-sm font-bold">-</button>
                <span className="text-sm font-semibold text-gray-700 w-10 text-center">{s[key]}시</span>
                <button onClick={() => setS({ ...s, [key]: Math.min(max, s[key] + 1) })} className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 text-sm font-bold">+</button>
              </div>
            </div>
          ))}
        </div>

        {/* 기념일 설정 ── v2.1 신규 ── */}
        <div className="bg-white/80 rounded-2xl p-5 shadow mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">🎉 기념일 설정</p>
          <p className="text-xs text-gray-400 mb-3">D-7·D-3·D-1에 홈 화면에서 알려드려요.</p>
          {s.anniversaries.map((ann, i) => (
            <div key={i} className="flex items-center gap-2 mb-2 bg-amber-50 rounded-xl px-3 py-2">
              <div className="flex-1">
                <p className="text-xs font-semibold text-amber-700">{ann.name}</p>
                <p className="text-xs text-gray-400">{ann.date}{ann.hint ? ` · ${ann.hint}` : ""}</p>
              </div>
              <button onClick={() => delAnn(i)} className="text-red-400 text-xs px-2">✕</button>
            </div>
          ))}
          <div className="space-y-2 mt-3">
            <input value={newAnn.name} onChange={e => setNewAnn({ ...newAnn, name: e.target.value })}
              placeholder="기념일 이름 (예: 손녀 하린이 생일)"
              className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-300"/>
            <input type="date" value={newAnn.date} onChange={e => setNewAnn({ ...newAnn, date: e.target.value })}
              className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-300"/>
            <input value={newAnn.hint} onChange={e => setNewAnn({ ...newAnn, hint: e.target.value })}
              placeholder="준비 힌트 (예: 선물 미리 준비하세요 🎁)"
              className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-300"/>
            <button onClick={addAnn}
              className="w-full py-2 rounded-xl text-white text-xs font-semibold"
              style={{ background: "#f59e0b" }}>기념일 추가 +</button>
          </div>
        </div>

        {/* 아침 질문 */}
        <div className="bg-white/80 rounded-2xl p-5 shadow mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">🌅 아침 질문 설정</p>
          {s.qMorning.map((q, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={q} onChange={e => updQ("morning", i, e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 p-2 text-xs focus:outline-none focus:ring-1 focus:ring-pink-300"/>
              <button onClick={() => delQ("morning", i)} className="text-red-400 text-xs px-2">✕</button>
            </div>
          ))}
          <div className="flex gap-2 mt-3">
            <input value={newQm} onChange={e => setNewQm(e.target.value)} placeholder="새 질문 추가..."
              className="flex-1 rounded-xl border border-gray-200 p-2 text-xs focus:outline-none focus:ring-1 focus:ring-pink-300"/>
            <button onClick={() => addQ("morning")} className="text-white text-xs px-3 py-2 rounded-xl" style={{ background: colors.accent }}>추가</button>
          </div>
        </div>

        {/* 저녁 질문 */}
        <div className="bg-white/80 rounded-2xl p-5 shadow mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">🌙 저녁 질문 설정</p>
          {s.qEvening.map((q, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={q} onChange={e => updQ("evening", i, e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 p-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-300"/>
              <button onClick={() => delQ("evening", i)} className="text-red-400 text-xs px-2">✕</button>
            </div>
          ))}
          <div className="flex gap-2 mt-3">
            <input value={newQe} onChange={e => setNewQe(e.target.value)} placeholder="새 질문 추가..."
              className="flex-1 rounded-xl border border-gray-200 p-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-300"/>
            <button onClick={() => addQ("evening")} className="text-white text-xs px-3 py-2 rounded-xl" style={{ background: "#6366f1" }}>추가</button>
          </div>
        </div>

        <button onClick={() => onSave(s)} className="w-full py-4 rounded-2xl text-white font-semibold shadow-lg" style={{ background: colors.accent }}>설정 저장하기 ✓</button>
      </div>
    </div>
  );
}
