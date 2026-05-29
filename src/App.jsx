import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Zap, Sparkles, Layers, ChevronRight, Download, 
  Building2, CheckCircle2, Menu, X, Send, MapPin, Phone, ShieldCheck, Globe
} from 'lucide-react';

// --- КОНФИГУРАЦИЯ ---
const WORKER_URL = "https://t.growagardentrade.online"; 
const DOWNLOAD_URL = "https://cdn.growagardentrade.online/qK9fX2wZ4";

const CARD_STYLES = {
  obsidian: { 
    name: 'Obsidian Black', 
    gradient: 'from-zinc-900 via-neutral-950 to-zinc-800', 
    border: 'border-zinc-700/50', 
    price: '4,900 ₽ / $70',
    accent: 'text-zinc-400'
  },
  cyber: { 
    name: 'Cyber Cyan', 
    gradient: 'from-cyan-950 via-slate-950 to-blue-900', 
    border: 'border-cyan-500/30', 
    price: '5,400 ₽ / $76',
    accent: 'text-cyan-400'
  },
  aurum: { 
    name: 'Liquid Gold', 
    gradient: 'from-amber-950 via-stone-950 to-yellow-900', 
    border: 'border-amber-500/30', 
    price: '6,900 ₽ / $97',
    accent: 'text-amber-500'
  }
};

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---

const FormInput = ({ icon: Icon, ...props }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
      <Icon size={18} />
    </div>
    <input 
      {...props} 
      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-cyan-500 outline-none transition-all text-white placeholder:text-gray-600 focus:bg-white/[0.08]" 
    />
  </div>
);

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/5 rounded-2xl bg-white/[0.01] overflow-hidden transition-all hover:border-white/10">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 text-left font-bold flex justify-between items-center">
        <span className="text-sm md:text-base">{question}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-cyan-400">▼</motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="px-6 pb-6 text-gray-400 text-sm leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- ОСНОВНАЯ ФОРМА ---

const UniversalForm = ({ type, onComplete, onStartLoading, presetName }) => {
  const [fields, setFields] = useState({ 
    name: presetName || '', 
    contact: '', 
    location: '', 
    details: '', 
    size: '10-50 чел' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onStartLoading();
    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, type, timestamp: new Date().toISOString() })
      });
      if (response.ok) onComplete();
      else alert("Ошибка сервера. Убедитесь, что Worker развернут.");
    } catch (err) {
      alert("Сетевая ошибка. Проверьте соединение.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput 
        icon={type === 'business' ? Building2 : Layers} 
        required 
        placeholder={type === 'business' ? "Название компании" : "Ваше Имя"} 
        value={fields.name}
        onChange={e => setFields({...fields, name: e.target.value})} 
      />
      <FormInput 
        icon={Phone} 
        required 
        placeholder="Связь: +7... / @telegram" 
        onChange={e => setFields({...fields, contact: e.target.value})} 
      />
      <FormInput 
        icon={MapPin} 
        required 
        placeholder="Город, Область, Страна" 
        onChange={e => setFields({...fields, location: e.target.value})} 
      />
      
      {type === 'business' && (
        <select 
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 outline-none text-gray-400 focus:border-cyan-500 transition-all cursor-pointer"
          onChange={e => setFields({...fields, size: e.target.value})}
        >
          <option value="1-5 чел">1-5 сотрудников</option>
          <option value="10-50 чел">10-50 сотрудников</option>
          <option value="100+ чел">100+ сотрудников</option>
        </select>
      )}

      <textarea 
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 h-28 outline-none focus:border-cyan-500 transition-all text-white placeholder:text-gray-600 resize-none" 
        placeholder="Дополнительные пожелания или вопросы..." 
        onChange={e => setFields({...fields, details: e.target.value})} 
      />

      <button 
        type="submit"
        className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl ${
          type === 'business' 
          ? 'bg-white text-black hover:bg-cyan-400' 
          : 'bg-cyan-500 text-black hover:bg-white hover:shadow-cyan-500/20'
        }`}
      >
        {type === 'business' ? 'ПОДАТЬ ЗАЯВКУ' : 'ЗАКАЗАТЬ КАРТУ'} <Send size={18} />
      </button>
    </form>
  );
};

// --- ГЛАВНОЕ ПРИЛОЖЕНИЕ ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [activePreset, setActivePreset] = useState('obsidian');
  const [customName, setCustomName] = useState('ALEXANDER ROLE');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Анимированный фон */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      {/* Навигация */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-cyan-500/20 group-hover:rotate-12 transition-transform">
              <Layers size={22} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">NFC.CORE</span>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            {['home', 'features', 'enterprise', 'faq'].map((p) => (
              <button 
                key={p}
                onClick={() => navigateTo(p)} 
                className={`hover:text-white transition-colors ${currentPage === p ? 'text-cyan-400 underline underline-offset-8' : ''}`}
              >
                {p === 'home' ? 'Главная' : p === 'features' ? 'Спеки' : p === 'enterprise' ? 'Бизнес' : 'Вопросы'}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href={DOWNLOAD_URL} className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase hover:bg-white/10 transition-all">
              <Download size={14} className="text-cyan-400" /> App
            </a>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-black pt-24 px-8 flex flex-col gap-8">
            {['home', 'features', 'enterprise', 'faq'].map((p) => (
              <button key={p} onClick={() => navigateTo(p)} className="text-3xl font-black uppercase text-left">
                {p === 'home' ? 'Главная' : p === 'features' ? 'Спецификации' : p === 'enterprise' ? 'Для бизнеса' : 'FAQ'}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          
          {/* ГЛАВНАЯ: КОНФИГУРАТОР */}
          {currentPage === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <Sparkles size={12} /> New Generation 2026
                </div>
                <h1 className="text-6xl md:text-8xl font-black leading-[0.85] mb-8 tracking-tighter">
                  ТВОЙ <br /> <span className="text-cyan-500">DIGITAL</span> <br /> КЛЮЧ.
                </h1>
                <div className="p-1 w-full bg-gradient-to-r from-white/10 to-transparent rounded-[2.8rem]">
                  <div className="p-8 md:p-10 bg-[#050505] rounded-[2.5rem]">
                    <UniversalForm 
                      type="order" 
                      presetName={customName} 
                      onStartLoading={() => setStatus('loading')} 
                      onComplete={() => setStatus('success')} 
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex flex-col items-center">
                {/* Карта */}
                <motion.div 
                  style={{ perspective: 1000 }}
                  animate={{ y: [0, -15, 0], rotateY: [-5, 5, -5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className={`w-full max-w-[420px] aspect-[1.58/1] bg-gradient-to-br ${CARD_STYLES[activePreset].gradient} rounded-[2rem] border ${CARD_STYLES[activePreset].border} p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden group`}
                >
                  <div className="flex justify-between items-start mb-16">
                    <Cpu size={36} className={`${CARD_STYLES[activePreset].accent} opacity-80`} />
                    <Zap size={24} className="text-white/20" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">Card Holder</p>
                    <p className="text-2xl md:text-3xl font-black tracking-widest uppercase truncate">{customName || 'NAME'}</p>
                  </div>
                  <div className="absolute top-0 right-[-50%] w-full h-full bg-white/5 skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
                </motion.div>

                {/* Селектор */}
                <div className="mt-12 w-full max-w-[420px] space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Имя на карте</label>
                    <input 
                      maxLength={18} 
                      value={customName} 
                      onChange={e => setCustomName(e.target.value.toUpperCase())}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center font-bold uppercase tracking-widest focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>
                  <div className="flex justify-center gap-6">
                    {Object.keys(CARD_STYLES).map(s => (
                      <button 
                        key={s} 
                        onClick={() => setActivePreset(s)} 
                        className={`w-14 h-14 rounded-full border-4 ${activePreset === s ? 'border-white scale-110' : 'border-transparent'} bg-gradient-to-br ${CARD_STYLES[s].gradient} transition-all shadow-xl`}
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black tracking-tighter italic">{CARD_STYLES[activePreset].price}</p>
                    <p className="text-[10px] text-gray-500 uppercase mt-1">Доставка включена по РФ</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* СПЕЦИФИКАЦИИ */}
          {currentPage === 'features' && (
            <motion.div key="features" {...pageTransition} className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-black mb-12 tracking-tighter uppercase italic">Технологии <span className="text-cyan-500">Core</span></h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: ShieldCheck, title: "Криптозащита", desc: "Аппаратное шифрование AES-256 в каждом чипе NTAG." },
                  { icon: Zap, title: "Zero Latency", desc: "Считывание за 0.1 сек любым смартфоном с NFC." },
                  { icon: Globe, title: "Cloud Sync", desc: "Меняй ссылку в приложении, карта обновится мгновенно." },
                  { icon: Cpu, title: "Titanium Base", desc: "Авиационный сплав и анти-царапийное покрытие." }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex gap-5">
                    <item.icon className="text-cyan-500 shrink-0" size={32} />
                    <div>
                      <h4 className="font-black uppercase mb-2 tracking-widest text-sm">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* БИЗНЕС */}
          {currentPage === 'enterprise' && (
            <motion.div key="enterprise" {...pageTransition} className="max-w-2xl mx-auto text-center">
              <Building2 size={64} className="text-cyan-500 mx-auto mb-8" />
              <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase italic">Enterprise</h2>
              <p className="text-gray-500 mb-12 text-lg">Единая экосистема для корпоративного нетворкинга. Управляйте картами сотрудников через HRM-панель.</p>
              <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] text-left">
                <UniversalForm type="business" onStartLoading={() => setStatus('loading')} onComplete={() => setStatus('success')} />
              </div>
            </motion.div>
          )}

          {/* FAQ */}
          {currentPage === 'faq' && (
            <motion.div key="faq" {...pageTransition} className="max-w-3xl mx-auto">
              <h2 className="text-5xl font-black mb-12 tracking-tighter text-center uppercase italic">Вопросы</h2>
              <div className="space-y-4">
                <FaqItem question="Нужно ли получателю приложение?" answer="Нет. Считывание происходит стандартными средствами iOS и Android. Ваша визитка откроется в браузере или контактах." />
                <FaqItem question="Как изменить данные на карте?" answer="В нашем мобильном приложении. Вы просто вставляете новую ссылку, и при следующем касании карта выдаст актуальную информацию." />
                <FaqItem question="Что делать при утере?" answer="Вы можете мгновенно деактивировать карту через приложение, чтобы никто не получил доступ к вашим ссылкам." />
                <FaqItem question="Есть ли абонентская плата?" answer="Нет. Вы платите только один раз за физический носитель. Облачный сервис базово бесплатен." />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ОВЕРЛЕИ СТАТУСА */}
      <AnimatePresence>
        {status !== 'idle' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl bg-black/80 p-6">
            <div className="bg-[#080808] border border-white/10 p-12 rounded-[3.5rem] text-center max-w-sm w-full shadow-2xl">
              {status === 'loading' ? (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-8" />
                  <p className="font-black tracking-[0.3em] uppercase text-xs">Шифрование данных...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black mb-4 uppercase italic">Отправлено</h3>
                  <p className="text-gray-500 text-sm mb-10 leading-relaxed">Мы получили ваш запрос. Менеджер свяжется с вами в течение 15 минут в Telegram.</p>
                  <button onClick={() => setStatus('idle')} className="w-full py-4 bg-white text-black font-black rounded-2xl active:scale-95 transition-all">ОТЛИЧНО</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em]">© 2026 NFC.CORE LABS • SECURED INFRASTRUCTURE</p>
        </div>
      </footer>
    </div>
  );
}

const pageTransition = {
  initial: { opacity: 0, y: 30, filter: 'blur(15px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -30, filter: 'blur(15px)' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};
