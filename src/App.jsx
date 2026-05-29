// PART 2: Constants & API Hook
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Zap, Sparkles, Layers, ChevronRight, Download, 
  Building2, CheckCircle2, Menu, X, Send, MapPin, Phone
} from 'lucide-react';

const WORKER_URL = "https://t.growagardentrade.online"; // СЮДА ССЫЛКУ НА ТВОЙ ВОРКЕР

const cardStyles = {
  obsidian: { name: 'Obsidian Black', gradient: 'from-zinc-900 via-neutral-950 to-zinc-800', border: 'border-zinc-700/50', price: '4,900 ₽/70 $' },
  cyber: { name: 'Cyber Cyan', gradient: 'from-cyan-950 via-slate-950 to-blue-900', border: 'border-cyan-500/30', price: '5,400 ₽/76 $' },
  aurum: { name: 'Liquid Gold', gradient: 'from-amber-950 via-stone-950 to-yellow-900', border: 'border-amber-500/30', price: '6,900 ₽/97 $' }
};

const api = {
  send: async (data) => {
    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return res.ok;
    } catch { return false; }
  }
};

// Анимационные пресеты для страниц
const pageTransition = {
  initial: { opacity: 0, x: 20, filter: 'blur(10px)' },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: -20, filter: 'blur(10px)' },
  transition: { duration: 0.5, ease: 'easeInOut' }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'features' | 'enterprise' | 'faq'
  const [activePreset, setActivePreset] = useState('obsidian');
  const [customName, setCustomName] = useState('ALEXANDER V.');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// PART 3: Form Components
const FormInput = ({ icon: Icon, ...props }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
      <Icon size={18} />
    </div>
    <input {...props} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-cyan-500 outline-none transition-all text-white placeholder:text-gray-600" />
  </div>
);

const UniversalForm = ({ type, onComplete, onStartLoading }) => {
  const [fields, setFields] = useState({ name: '', contact: '', location: '', details: '', size: '10-50' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onStartLoading();
    const success = await api.send({ ...fields, type });
    if (success) onComplete();
    else alert("Ошибка отправки. Проверьте URL воркера.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput icon={Layers} required placeholder={type === 'business' ? "Название компании" : "Ваше Имя"} 
        onChange={e => setFields({...fields, name: e.target.value})} />
      
      <FormInput icon={Phone} required placeholder="Связь: +7... / @telegram" 
        onChange={e => setFields({...fields, contact: e.target.value})} />
      
      <FormInput icon={MapPin} required placeholder="Город, Область, Страна" 
        onChange={e => setFields({...fields, location: e.target.value})} />

      {type === 'business' && (
        <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 outline-none text-gray-400"
          onChange={e => setFields({...fields, size: e.target.value})}>
          <option value="5-10">5-10 сотрудников</option>
          <option value="10-50">10-50 сотрудников</option>
          <option value="50+">50+ сотрудников</option>
        </select>
      )}

      <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 h-24 outline-none focus:border-cyan-500 transition-all text-white" 
        placeholder="Дополнительные детали заказа..." onChange={e => setFields({...fields, details: e.target.value})} />

      <button className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${type === 'business' ? 'bg-white text-black hover:bg-cyan-400' : 'bg-cyan-500 text-black hover:bg-white'}`}>
        {type === 'business' ? 'ОТПРАВИТЬ ЗАПРОС' : 'ОФОРМИТЬ ЗАКАЗ'} <Send size={18} />
      </button>
    </form>
  );
};
  
  // Ссылка на скачивание с рандомными символами, как запрашивалось
  const downloadUrl = "https://cdn.growagardentrade.online/qK9fX2wZ4";

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-x-hidden font-sans selection:bg-cyan-500/30">
      
      {/* Фоновое интеллектуальное свечение */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      {/* Шапка сайта */}
      <header className="relative z-50 max-w-7xl mx-auto px-6 py-5 flex justify-between items-center backdrop-blur-xl bg-[#030303]/40 sticky top-0 border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="w-9 h-9 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Layers size={18} className="text-black font-bold" />
          </div>
          <span className="text-xl font-extrabold tracking-tighter">NFC.CORE</span>
        </div>
        
        {/* Десктопное меню */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <button onClick={() => navigateTo('home')} className={`hover:text-white transition-colors ${currentPage === 'home' ? 'text-cyan-400' : ''}`}>Главная</button>
          <button onClick={() => navigateTo('features')} className={`hover:text-white transition-colors ${currentPage === 'features' ? 'text-cyan-400' : ''}`}>Спецификации</button>
          <button onClick={() => navigateTo('enterprise')} className={`hover:text-white transition-colors ${currentPage === 'enterprise' ? 'text-cyan-400' : ''}`}>Бизнесу</button>
          <button onClick={() => navigateTo('faq')} className={`hover:text-white transition-colors ${currentPage === 'faq' ? 'text-cyan-400' : ''}`}>Вопросы</button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a 
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer" 
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
          >
            <Download size={14} className="text-cyan-400" /> Скачать приложение
          </a>
        </div>

        {/* Мобильный бургер-меню */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Мобильная навигация */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[73px] bg-[#030303] z-40 p-6 flex flex-col gap-6 border-t border-white/5"
          >
            <button onClick={() => navigateTo('home')} className="text-left text-xl font-bold">Главная</button>
            <button onClick={() => navigateTo('features')} className="text-left text-xl font-bold">Спецификации</button>
            <button onClick={() => navigateTo('enterprise')} className="text-left text-xl font-bold">Бизнесу</button>
            <button onClick={() => navigateTo('faq')} className="text-left text-xl font-bold">Вопросы</button>
            <a href={downloadUrl} className="mt-4 w-full py-4 bg-cyan-500 text-black text-center font-bold rounded-xl flex items-center justify-center gap-2">
              <Download size={18} /> Скачать приложение
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Динамический контент страниц */}
      <main className="relative z-10 min-h-[calc(100vh-180px)]">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div key="home" {...pageTransition}>
              {/* Hero Блок */}
              <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                    <Sparkles size={14} className="text-cyan-400" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Поколение 2026</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-8">
                    УМНАЯ КАРТА. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                      БЕЗГРАНИЧНЫЕ
                    </span> <br />
                    СВЯЗИ.
                  </h1>
                  <p className="text-gray-400 text-lg font-light max-w-xl mb-10">
                    Один физический носитель для передачи абсолютно всех ваших цифровых профилей. Обновляйте контент удаленно через приложение.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="#configurator" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/20 transition-all group">
                      Конфигуратор карт <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href={downloadUrl} className="px-8 py-4 bg-white text-black rounded-2xl font-bold flex items-center gap-2 hover:bg-cyan-400 transition-all">
                      <Download size={18} /> Получить App
                    </a>
                  </div>
                </div>

                {/* Интерактивная 3D-модель левитирующей карты */}
                <div className="lg:col-span-5 flex justify-center" style={{ perspective: 2000 }}>
                  <motion.div
                    animate={{ rotateY: [-10, 10, -10], rotateX: [5, -5, 5], y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className={`w-full max-w-[380px] aspect-[1.58/1] bg-gradient-to-br ${cardStyles[activePreset].gradient} rounded-3xl border ${cardStyles[activePreset].border} p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden`}
                  >
                    <div className="flex justify-between items-start z-10">
                      <Cpu size={28} className="text-cyan-400" />
                      <span className="text-[10px] tracking-widest opacity-40 font-mono">NFC.CORE SECURE</span>
                    </div>
                    <div className="z-10">
                      <p className="text-xl font-bold tracking-wider uppercase">{customName}</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                  </motion.div>
                </div>
              </section>

              {/* Конфигуратор */}
              <section id="configurator" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
                <div className="grid lg:grid-cols-2 gap-12 bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md">
                  <div className="flex flex-col justify-center items-center bg-black/40 rounded-2xl p-6 border border-white/5">
                    <div className={`w-full max-w-[340px] aspect-[1.58/1] bg-gradient-to-br ${cardStyles[activePreset].gradient} rounded-xl border ${cardStyles[activePreset].border} p-6 shadow-xl flex flex-col justify-between`}>
                      <Cpu size={24} className="text-white/60" />
                      <p className="text-lg font-bold tracking-wider">{customName || 'NAME'}</p>
                    </div>
                    <input 
                      type="text" 
                      maxLength={18}
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                      className="w-full max-w-[340px] mt-6 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-center"
                      placeholder="ИМЯ ДЛЯ ГРАВИРОВКИ"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-6">Выберите исполнение</h3>
                      <div className="flex flex-col gap-3">
                        {Object.entries(cardStyles).map(([key, value]) => (
                          <button
                            key={key}
                            onClick={() => setActivePreset(key)}
                            className={`p-4 rounded-xl border text-left flex justify-between items-center transition-all ${activePreset === key ? 'bg-cyan-500/10 border-cyan-500' : 'bg-white/5 border-white/5'}`}
                          >
                            <span className="font-bold">{value.name}</span>
                            <span className="text-cyan-400 font-mono">{value.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <p className="text-2xl font-black">{cardStyles[activePreset].price}</p>
                      <button className="px-6 py-3 bg-white text-black font-bold rounded-xl text-sm">Заказать карту</button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* Страница Спецификаций */}
          {currentPage === 'features' && (
            <motion.div key="features" {...pageTransition} className="max-w-4xl mx-auto px-6 py-16">
              <h2 className="text-4xl font-extrabold mb-4">Технические спецификации</h2>
              <p className="text-gray-400 mb-10">Протоколы шифрования и физические свойства используемых компонентов архитектуры NFC.CORE.</p>
              
              <div className="overflow-hidden border border-white/5 rounded-2xl bg-white/[0.01] mb-12">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="p-4 text-sm font-bold tracking-wider text-gray-300">Компонент</th>
                      <th className="p-4 text-sm font-bold tracking-wider text-gray-300">Характеристика</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm text-gray-400">
                    <tr>
                      <td className="p-4 font-bold text-white">Тип микрочипа</td>
                      <td className="p-4">NTAG213 / NTAG216 Высокой емкости</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Частотный диапазон</td>
                      <td className="p-4">13,56 МГц (Высокочастотный NFC)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Материал корпуса</td>
                      <td className="p-4">Авиационный сплав титана и углеродного волокна</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Шифрование</td>
                      <td className="p-4">Аппаратный криптографический ключ подписи ECC</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h4 className="text-xl font-bold mb-1">Управляйте спецификациями в приложении</h4>
                  <p className="text-sm text-gray-400">Наш софт позволяет изменять назначение секторов памяти «на лету».</p>
                </div>
                <a href={downloadUrl} className="px-6 py-3 bg-white text-black font-bold rounded-xl text-sm whitespace-nowrap flex items-center gap-2">
                  <Download size={16} /> Скачать софт
                </a>
              </div>
            </motion.div>
          )}

          {/* Страница Бизнес решений */}
          {currentPage === 'enterprise' && (
            <motion.div key="enterprise" {...pageTransition} className="max-w-5xl mx-auto px-6 py-16 text-center">
              <Building2 size={48} className="text-cyan-400 mx-auto mb-6" />
              <h2 className="text-4xl font-extrabold mb-4">Решения для бизнеса и команд</h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-12">Централизованная экосистема для корпоративного нетворкинга. Управляйте цифровыми визитками всех сотрудников из единой панели.</p>
              
              <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <CheckCircle2 className="text-cyan-400 mb-3" />
                  <h3 className="text-lg font-bold mb-2">Единый Корпоративный Стиль</h3>
                  <p className="text-sm text-gray-400">Брендирование всей партии карт логотипом и цветами вашей компании.</p>
                </div>
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <CheckCircle2 className="text-cyan-400 mb-3" />
                  <h3 className="text-lg font-bold mb-2">HR-интеграция</h3>
                  <p className="text-sm text-gray-400">Автоматическое отключение или переназначение карт при увольнении или переводе сотрудников.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Страница FAQ (Вопросы и ответы) */}
          {currentPage === 'faq' && (
            <motion.div key="faq" {...pageTransition} className="max-w-3xl mx-auto px-6 py-16">
              <h2 className="text-4xl font-extrabold mb-8 text-center">Часто задаваемые вопросы</h2>
              <div className="flex flex-col gap-4">
                <FaqItem question="Нужно ли получателю устанавливать приложение?" answer="Нет. Получателю достаточно приложить вашу карту к своему смартфону. На экране мгновенно появится всплывающее окно с вашими данными." />
                <FaqItem question="Что делать, если я потеряю карту?" answer="Вы можете мгновенно заблокировать карту или стереть с нее все данные удаленно через наше мобильное приложение." />
                <FaqItem question="Безопасно ли это для банковских карт?" answer="Наши чипы работают на изолированной частоте и не конфликтуют с вашими платежными картами в кошельке." />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Подвал */}
      <footer className="border-t border-white/5 py-8 mt-12 text-center text-sm text-gray-600">
        <p>© 2026 NFC.CORE LABS. Все права защищены.</p>
      </footer>
    </div>
  );
}

// Компонент раскрывающегося FAQ с анимацией
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/5 rounded-xl bg-white/[0.01] overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-5 text-left font-semibold flex justify-between items-center hover:bg-white/[0.02]">
        <span>{question}</span>
        <span className={`text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 pb-5 text-sm text-gray-400 leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
