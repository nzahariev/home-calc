import React, { useState, useMemo } from 'react';
import { 
  Building, 
  CreditCard, 
  Wrench, 
  Calculator, 
  Sparkles, 
  Hammer, 
  Users, 
  CheckCircle2, 
  Euro, 
  TrendingDown, 
  Percent, 
  Home,
  ShieldCheck,
  Zap,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkle,
  Sliders,
  DollarSign,
  PieChart as PieIcon,
  BarChart3,
  ListFilter,
  Check,
  Info,
  ArrowRight,
  Shield
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend 
} from 'recharts';

const MASTER_CATEGORIES_DATA = [
  {
    id: 'cat1',
    code: '01',
    name: 'Административни, Надзор & Институции',
    subtitle: 'Акт 15, Акт 16, Енерго-Про, ВиК, Кадастър, Община, Архитектура',
    color: '#6366f1', // Indigo
    icon: Building,
    items: [
      { id: 'c1_1', name: 'Лицензиран строителен надзор (договор, Акт 15 & Доклад за Акт 16)', unit: 'услуга', qty: 1, matPrice: 0, laborPrice: 1500, diySaving: 0, note: 'Задължително лицензирана фирма' },
      { id: 'c1_2', name: 'Технически паспорт & Енергийна ефективност (одит)', unit: 'услуга', qty: 1, matPrice: 0, laborPrice: 800, diySaving: 0, note: 'Задължителен независим одитор' },
      { id: 'c1_3', name: 'Геодезическо заснемане и нанасяне в Кадастъра (АГКК)', unit: 'услуга', qty: 1, matPrice: 0, laborPrice: 500, diySaving: 0, note: 'Инженер-геодезист' },
      { id: 'c1_4', name: 'Такси ВиК Варна & Енерго-Про (паркиране, табла, окончателни партиди)', unit: 'услуга', qty: 1, matPrice: 600, laborPrice: 800, diySaving: 0, note: 'Държавни и монополни такси' },
      { id: 'c1_5', name: 'Общински такси за Разрешение за ползване (Акт 16)', unit: 'услуга', qty: 1, matPrice: 0, laborPrice: 400, diySaving: 0, note: 'Община Аксаково / Варна' }
    ]
  },
  {
    id: 'cat2',
    code: '02',
    name: 'Фасада, Външни работи, Двор & Ограда',
    subtitle: 'Топлоизолация, мазилка, скеле, дограма, външна врата, двор & вертикална планировка',
    color: '#0ea5e9', // Sky
    icon: Home,
    items: [
      { id: 'c2_1', name: 'Топлоизолация фасада (EPS 10cm EPS-F, лепила, мрежа, армировка)', unit: 'кв.м', qty: 210, matPrice: 18, laborPrice: 14, diySaving: 0, note: 'Фасадна система' },
      { id: 'c2_2', name: 'Силикатна/Силиконова драскана мазилка', unit: 'кв.м', qty: 210, matPrice: 10, laborPrice: 8, diySaving: 0, note: 'Финишно фасадно покритие' },
      { id: 'c2_3', name: 'Наем и монтаж/демонтаж на фасадно скеле', unit: 'кв.м', qty: 210, matPrice: 3, laborPrice: 3, diySaving: 0, note: 'За 30 дни наем' },
      { id: 'c2_4', name: 'Външна блиндирана блиндирана врата с висок клас заключване', unit: 'бр.', qty: 1, matPrice: 1400, laborPrice: 200, diySaving: 0, note: 'Устойчива на външни условия' },
      { id: 'c2_5', name: 'Допълнителни прозорци / дограма козирки & обръщане', unit: 'бр.', qty: 1, matPrice: 1600, laborPrice: 400, diySaving: 0, note: 'Монтаж и обръщане' },
      { id: 'c2_6', name: 'Бетонов цокъл за ограда & ажурни оградни пана', unit: 'л.м.', qty: 60, matPrice: 25, laborPrice: 20, diySaving: 0, note: 'Ограда на двора (566 кв.м)' },
      { id: 'c2_7', name: 'Вертикална планировка, тротоарни плочи & подравняване на двора', unit: 'кв.м', qty: 120, matPrice: 15, laborPrice: 12, diySaving: 0, note: 'Пътеки около къщата' }
    ]
  },
  {
    id: 'cat3',
    code: '03',
    name: 'Инсталации - Ел. & ВиК',
    subtitle: 'Окабеляване, табло, ключове/контакти, тръбни трасета, структури Grohe/Geberit',
    color: '#14b8a6', // Teal
    icon: Zap,
    items: [
      { id: 'c3_1', name: 'Ел. окабеляване (СВТ/ПВВ-МБ1 тръби, конзолни кутии, точково окабеляване)', unit: 'точки', qty: 110, matPrice: 8, laborPrice: 10, diySaving: 0, note: 'Пълно вътрешно трасе' },
      { id: 'c3_2', name: 'Главно ел. табло + дефектнотокови автоматични предпазители Schneider/Legrand', unit: 'комплект', qty: 1, matPrice: 450, laborPrice: 250, diySaving: 0, note: 'Защита и автоматика' },
      { id: 'c3_3', name: 'Ключове & контакти (серия Schneider Asfora / Legrand Valena)', unit: 'бр.', qty: 85, matPrice: 6, laborPrice: 4, diySaving: 0, note: 'Монтаж на ключове и контакти' },
      { id: 'c3_4', name: 'ВиК тръбопровод (PPR за топла/студена вода + PVC канализационни тръби)', unit: 'точки', qty: 22, matPrice: 25, laborPrice: 35, diySaving: 0, note: 'За 2 бани + кухня + перално' },
      { id: 'c3_5', name: 'Вградени казанчета & структури за тоалетна Grohe/Geberit', unit: 'бр.', qty: 2, matPrice: 240, laborPrice: 60, diySaving: 0, note: 'Структури за вграждане' },
      { id: 'c3_6', name: 'Линейни и точкови рогови сифони с клапа против миризми', unit: 'бр.', qty: 3, matPrice: 70, laborPrice: 30, diySaving: 0, note: 'За бани и мокро помещение' }
    ]
  },
  {
    id: 'cat4',
    code: '04',
    name: 'Груби & Фини вътрешни работи',
    subtitle: 'Машинна замазка, мазилка, фино шпакловане 3 ръце, боядисване с латекс',
    color: '#f59e0b', // Amber
    icon: Wrench,
    items: [
      { id: 'c4_1', name: 'Машинна подова циментова замазка (армирана с фибри 5-6cm)', unit: 'кв.м', qty: 157, matPrice: 7, laborPrice: 8, diySaving: 0, note: 'Подготовка за настилки' },
      { id: 'c4_2', name: 'Машинна варово-циментова / гипсова мазилка за стени и тавани', unit: 'кв.м', qty: 420, matPrice: 5, laborPrice: 7, diySaving: 0, note: 'Основно изравняване' },
      { id: 'c4_3', name: 'Фино шпакловане (2 ръце колоркит/шитрок + 1 ръце заглаждаща)', unit: 'кв.м', qty: 420, matPrice: 3, laborPrice: 6, diySaving: 0, note: 'Подготовка за боя' },
      { id: 'c4_4', name: 'Шлайфане, грундиране & двойно боядисване с премиум латекс (Dulux/Caparol)', unit: 'кв.м', qty: 420, matPrice: 2.5, laborPrice: 4.5, diySaving: 1890, note: 'Може да спестите 1,890€ с личен труд!' },
      { id: 'c4_5', name: 'Окачени тавани от гипсокартон в хола/коридора за скрито осветление', unit: 'кв.м', qty: 50, matPrice: 12, laborPrice: 14, diySaving: 0, note: 'Декоративни тавани' }
    ]
  },
  {
    id: 'cat5',
    code: '05',
    name: 'Бани & Мокри помещения (2 Бани + Перално)',
    subtitle: 'Двукомпонентна хидроизолация, плочки/гранитогрес, душ кабини, смесители',
    color: '#ec4899', // Pink
    icon: ShieldCheck,
    items: [
      { id: 'c5_1', name: 'Двукомпонентна хидроизолация на под и ъгли (Mapei / Ceresit)', unit: 'кв.м', qty: 65, matPrice: 12, laborPrice: 10, diySaving: 0, note: 'Критично за защита от течове' },
      { id: 'c5_2', name: 'Гранитогрес & фаянс за бани (висок клас 60x120cm)', unit: 'кв.м', qty: 110, matPrice: 28, laborPrice: 25, diySaving: 0, note: 'Майстор плочкаджия' },
      { id: 'c5_3', name: 'Лепила C2TE S1, епоксидна фугираща смес & лайсни', unit: 'комплект', qty: 2, matPrice: 350, laborPrice: 100, diySaving: 0, note: 'Високоякостни лепила' },
      { id: 'c5_4', name: 'Стъклени душ кабини / закалени стъклени паравани 8mm', unit: 'бр.', qty: 2, matPrice: 450, laborPrice: 100, diySaving: 0, note: 'Монтаж паравани' },
      { id: 'c5_5', name: 'Смесители за мивки & вградени душ системи (Grohe/Hansgrohe)', unit: 'комплект', qty: 2, matPrice: 550, laborPrice: 100, diySaving: 0, note: 'Термостатни смесители' },
      { id: 'c5_6', name: 'Мебели за баня (водоустойчив ПВЦ шкаф с мивка & огледало с LED)', unit: 'комплект', qty: 2, matPrice: 480, laborPrice: 70, diySaving: 0, note: 'Влагоустойчиви шкафове' }
    ]
  },
  {
    id: 'cat6',
    code: '06',
    name: 'Подови настилки, Врати & Климатизация',
    subtitle: 'Ламинат 8/10mm Class AC4/AC5, гранитогрес коридор, МДФ врати, климатици Daikin/Gree',
    color: '#8b5cf6', // Purple
    icon: CheckCircle2,
    items: [
      { id: 'c6_1', name: 'Ламинат 10mm Class AC5 / 33 клас + 3mm XPS подложка + МДФ первази', unit: 'кв.м', qty: 95, matPrice: 22, laborPrice: 8, diySaving: 760, note: 'Спални & Хол (спестете 760€ труд)' },
      { id: 'c6_2', name: 'Гранитогрес за коридор, стълбище & входно антре', unit: 'кв.м', qty: 45, matPrice: 26, laborPrice: 20, diySaving: 0, note: 'Устойчив гранитогрес' },
      { id: 'c6_3', name: 'Интериорни интериорни врати МДФ с каси и первази', unit: 'бр.', qty: 6, matPrice: 280, laborPrice: 60, diySaving: 0, note: 'Доставка & професионален монтаж' },
      { id: 'c6_4', name: 'Инверторни климатици (1x18000 BTU за хол + 3x9000 BTU за спални Daikin/Gree)', unit: 'бр.', qty: 4, matPrice: 850, laborPrice: 150, diySaving: 0, note: 'Включен пълен тръбен монтаж' }
    ]
  },
  {
    id: 'cat7',
    code: '07',
    name: 'Обзавеждане, Кухня & Електроуреди',
    subtitle: 'Кухня МДФ по поръчка, вградени уреди Bosch/Whirlpool, гардероби, спални, диван',
    color: '#10b981', // Emerald
    icon: Sparkles,
    items: [
      { id: 'c7_1', name: 'Кухня по индивидуален проект (МДФ лак/меламин, механизми Blum)', unit: 'л.м.', qty: 5.5, matPrice: 850, laborPrice: 250, diySaving: 3000, note: 'С познат мебелист спестявате над 3,000€!' },
      { id: 'c7_2', name: 'Вградени уреди (фурна, индукционни котлони, съдомиялна, абсорбатор, хладилник Bosch)', unit: 'комплект', qty: 1, matPrice: 3200, laborPrice: 200, diySaving: 200, note: 'Висок енергиен клас A+++' },
      { id: 'c7_3', name: 'Вградени гардероби с плъзгащи врати & Портманто за антре', unit: 'бр.', qty: 3, matPrice: 1100, laborPrice: 200, diySaving: 1500, note: 'Спални & Коридор' },
      { id: 'c7_4', name: 'Спални комплекти (легла 160x200 + анатомични матраци + нощни шкафчета)', unit: 'комплект', qty: 3, matPrice: 950, laborPrice: 100, diySaving: 300, note: '3 пълноценни спални' },
      { id: 'c7_5', name: 'Ъглов диван за хол, трапезарна маса + 6 стола + ТВ шкаф', unit: 'комплект', qty: 1, matPrice: 2400, laborPrice: 100, diySaving: 100, note: 'Обзавеждане за дневна' }
    ]
  }
];

export default function App() {
  // Theme & Mode State
  const [isDiyMode, setIsDiyMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'breakdown' | 'credit'
  const [expandedCategories, setExpandedCategories] = useState({ cat1: true, cat2: true });

  // Customizable Dynamic Inputs
  const [houseArea, setHouseArea] = useState(157.23);
  const [contingencyPct, setContingencyPct] = useState(8); // 8% Default buffer
  const [interestRate, setInterestRate] = useState(2.5);
  const [loanYears, setLoanYears] = useState(30);

  // Property Base Values
  const purchasePrice = 130000;
  const selfParticipationPct = 10; // 10%
  const brokerPct = 2; // 2%
  const notaryPct = 5; // ~5%
  const existingDebt = 99950; // Existing refinanced loans

  // Toggle Category Accordion
  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const expandAll = () => {
    const all = {};
    MASTER_CATEGORIES_DATA.forEach(c => all[c.id] = true);
    setExpandedCategories(all);
  };

  const collapseAll = () => {
    setExpandedCategories({});
  };

  const computedData = useMemo(() => {
    let grandTotalMaterials = 0;
    let grandTotalLaborFull = 0;
    let grandTotalLaborActive = 0;
    let grandTotalDiySavings = 0;

    const categories = MASTER_CATEGORIES_DATA.map(cat => {
      let catMaterials = 0;
      let catLaborFull = 0;
      let catLaborActive = 0;
      let catDiySavings = 0;

      const items = cat.items.map(item => {
        const matCost = item.matPrice * item.qty;
        const laborCostFull = item.laborPrice * item.qty;
        const diySavingCost = isDiyMode ? item.diySaving : 0;
        const laborCostActive = Math.max(0, laborCostFull - diySavingCost);

        catMaterials += matCost;
        catLaborFull += laborCostFull;
        catLaborActive += laborCostActive;
        catDiySavings += item.diySaving;

        return {
          ...item,
          matCost,
          laborCostFull,
          laborCostActive,
          totalCostFull: matCost + laborCostFull,
          totalCostActive: matCost + laborCostActive
        };
      });

      const catTotalFull = catMaterials + catLaborFull;
      const catTotalActive = catMaterials + catLaborActive;

      grandTotalMaterials += catMaterials;
      grandTotalLaborFull += catLaborFull;
      grandTotalLaborActive += catLaborActive;
      grandTotalDiySavings += catDiySavings;

      return {
        ...cat,
        items,
        catMaterials,
        catLaborFull,
        catLaborActive,
        catTotalFull,
        catTotalActive,
        catDiySavings
      };
    });

    const activeFinishingSubtotal = isDiyMode 
      ? (grandTotalMaterials + grandTotalLaborActive) 
      : (grandTotalMaterials + grandTotalLaborFull);

    const contingencyBufferAmount = (activeFinishingSubtotal * contingencyPct) / 100;
    const finalFinishingWithBuffer = activeFinishingSubtotal + contingencyBufferAmount;

    return {
      categories,
      grandTotalMaterials,
      grandTotalLaborFull,
      grandTotalLaborActive,
      grandTotalDiySavings,
      activeFinishingSubtotal,
      contingencyBufferAmount,
      finalFinishingWithBuffer
    };
  }, [isDiyMode, contingencyPct]);

  // Upfront cash required for Act 14 deal
  const upfrontCosts = useMemo(() => {
    return purchasePrice * (selfParticipationPct + brokerPct + notaryPct) / 100; // 22,100 €
  }, [purchasePrice]);

  // Total Investment
  const totalInvestment = purchasePrice + upfrontCosts + computedData.finalFinishingWithBuffer;

  // Monthly Payment Formula
  const calculateMonthlyPayment = (principal, annualRate, years) => {
    if (principal <= 0) return 0;
    const monthlyRate = (annualRate / 100) / 12;
    const numberOfPayments = years * 12;
    if (monthlyRate === 0) return principal / numberOfPayments;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  };

  const loan1Principal = purchasePrice * 0.9; // 117,000 € (90% Mortgage)
  const loan2Principal = existingDebt + upfrontCosts; // 99,950 + 22,100 = 122,050 €

  const loan1Payment = useMemo(() => calculateMonthlyPayment(loan1Principal, interestRate, loanYears), [loan1Principal, interestRate, loanYears]);
  const loan2Payment = useMemo(() => calculateMonthlyPayment(loan2Principal, interestRate, loanYears), [loan2Principal, interestRate, loanYears]);
  const totalMonthlyPayment = loan1Payment + loan2Payment;

  // Formatter Utility
  const formatEuro = (amount) => {
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Background Glow Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Navigation & Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase">
              <Sparkle className="w-4 h-4 text-indigo-400" /> Финансов Анализ & Инвестиционен Паспорт
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-1">
              Къща с. Калиманци <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">130,000 €</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1 flex flex-wrap items-center gap-3">
              <span>🏠 Разгърната площ: <strong className="text-slate-200">{houseArea} кв.м</strong></span>
              <span>•</span>
              <span>🌳 Двор: <strong className="text-slate-200">566 кв.м</strong></span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Акт 14 ➔ Пълно довършване до Акт 16</span>
            </p>
          </div>

          {/* Execution Mode Selector Toggle */}
          <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-xl flex items-center shadow-2xl w-full sm:w-auto">
            <button
              onClick={() => setIsDiyMode(false)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                !isDiyMode 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              Пълна услуга (100% Майстори)
            </button>
            <button
              onClick={() => setIsDiyMode(true)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                isDiyMode 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Hammer className="w-4 h-4" />
              Личен Труд + Мебелист
            </button>
          </div>
        </header>

        {/* Dynamic Savings Alert Banner */}
        {isDiyMode && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 backdrop-blur-md flex items-center justify-between flex-wrap gap-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-300 text-base">Активиран икономичен режим с личен труд!</h4>
                <p className="text-xs text-emerald-200/80">
                  Спестявате точно <strong className="text-white font-bold">{formatEuro(computedData.grandTotalDiySavings)}</strong> от латекс, редене на ламинат и отстъпки за обзавеждане от познат мебелист.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-black border border-emerald-500/40">
                Спестени {formatEuro(computedData.grandTotalDiySavings)}
              </span>
            </div>
          </div>
        )}

        {/* Top Summary Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex justify-between">
              <span>Имот (Акт 14)</span>
              <Building className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">{formatEuro(purchasePrice)}</div>
            <div className="text-[11px] text-slate-400 mt-2">
              Базова цена: <strong className="text-slate-200">827 €/кв.м</strong>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex justify-between">
              <span>Първоначални такси</span>
              <Percent className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400">{formatEuro(upfrontCosts)}</div>
            <div className="text-[11px] text-slate-400 mt-2">
              10% самоучастие + 2% брокер + ~5% нотариус
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex justify-between">
              <span>Довършване + Резерв</span>
              <Wrench className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">{formatEuro(computedData.finalFinishingWithBuffer)}</div>
            <div className="text-[11px] text-slate-400 mt-2">
              Вкл. <strong className="text-slate-200">{contingencyPct}% непредвидени</strong> ({formatEuro(computedData.contingencyBufferAmount)})
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden group hover:border-indigo-500/50 transition">
            <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1 flex justify-between">
              <span>Обща Крайна Сума</span>
              <Euro className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">{formatEuro(totalInvestment)}</div>
            <div className="text-[11px] text-indigo-200/80 mt-2">
              Напълно обзаведена къща с двор
            </div>
          </div>
        </div>

        {/* Main Tab Navigation */}
        <div className="flex border-b border-slate-800/80 mt-10 mb-8 gap-2 sm:gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 pb-3.5 px-1 font-semibold text-sm border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Интерактивна Визуализация & Графики
          </button>
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`flex items-center gap-2 pb-3.5 px-1 font-semibold text-sm border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'breakdown'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListFilter className="w-4 h-4" />
            Пълна Подробна Разбивка (7 Раздела)
          </button>
          <button
            onClick={() => setActiveTab('credit')}
            className={`flex items-center gap-2 pb-3.5 px-1 font-semibold text-sm border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'credit'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Кредитна Структура & Вноски
          </button>
        </div>

        {/* TAB 1: OVERVIEW & GRAPH VISUALIZATIONS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Interactive Customization Controls Bar */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" /> Персонализиране на Параметрите
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs text-slate-400 font-medium flex justify-between mb-2">
                    <span>Площ на къщата (кв.м)</span>
                    <strong className="text-white">{houseArea} m²</strong>
                  </label>
                  <input 
                    type="number" 
                    value={houseArea} 
                    onChange={(e) => setHouseArea(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-medium flex justify-between mb-2">
                    <span>Буфер за Непредвидени Разходи (%)</span>
                    <strong className="text-emerald-400 font-bold">{contingencyPct}% ({formatEuro(computedData.contingencyBufferAmount)})</strong>
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="20" 
                    step="1"
                    value={contingencyPct}
                    onChange={(e) => setContingencyPct(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>0%</span>
                    <span>8% (Стандартен)</span>
                    <span>20%</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-medium flex justify-between mb-2">
                    <span>Ипотечна Лихва (%)</span>
                    <strong className="text-indigo-400 font-bold">{interestRate}%</strong>
                  </label>
                  <input 
                    type="range" 
                    min="1.5" 
                    max="5.0" 
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1.5%</span>
                    <span>2.5%</span>
                    <span>5.0%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recharts Data Visualization Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chart 1: Donut Allocation */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
                <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                  <PieIcon className="w-5 h-5 text-indigo-400" />
                  Разпределение на бюджета по категории
                </h3>
                <p className="text-xs text-slate-400 mb-6">Дял на всеки от 7-те раздела в довършителните работи.</p>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={computedData.categories}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={4}
                        dataKey="catTotalActive"
                      >
                        {computedData.categories.map((entry) => (
                          <Cell key={entry.id} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(val) => [formatEuro(val), 'Сума']}
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs">
                  {computedData.categories.map((cat) => (
                    <div key={cat.id} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800/40 transition">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className="text-slate-300 truncate">{cat.name}:</span>
                      <span className="font-bold text-white ml-auto">{formatEuro(cat.catTotalActive)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 2: Materials vs Labor Stacked Bar */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
                <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  Сравнение: Материали vs Труд
                </h3>
                <p className="text-xs text-slate-400 mb-6">Стойност на вложени суровини спрямо разходи за майстори.</p>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={computedData.categories}
                      margin={{ top: 10, right: 10, left: -15, bottom: 35 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="code" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                      <Tooltip 
                        formatter={(val) => formatEuro(val)}
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                      <Bar dataKey="catMaterials" name="Материали" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="catLaborActive" name="Труд / Майстори" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 mt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Общо заделени за Материали:</span>
                    <span className="font-bold text-sky-400">{formatEuro(computedData.grandTotalMaterials)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Общо за Майстори & Труд:</span>
                    <span className="font-bold text-rose-400">{formatEuro(computedData.grandTotalLaborActive)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                    <span>Сума преди буфер:</span>
                    <span className="text-emerald-400">{formatEuro(computedData.activeFinishingSubtotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED ITEMIZED BREAKDOWN TABLE / ACCORDION */}
        {activeTab === 'breakdown' && (
          <div className="space-y-6">
            {/* Table Action Controls Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Пълна Количествено-Стойностна Сметка</h3>
                <p className="text-xs text-slate-400">Всички единични цени, количества, материали и труд за 157.23 кв.м</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={expandAll}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
                >
                  Отвори всички
                </button>
                <button
                  onClick={collapseAll}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
                >
                  Свий всички
                </button>
              </div>
            </div>

            {/* Accordion Categories Loop */}
            <div className="space-y-4">
              {computedData.categories.map((cat) => {
                const IconComp = cat.icon;
                const isExpanded = !!expandedCategories[cat.id];

                return (
                  <div 
                    key={cat.id}
                    className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    {/* Category Header Banner */}
                    <div 
                      onClick={() => toggleCategory(cat.id)}
                      className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer hover:bg-slate-800/40 transition select-none"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-xl flex-shrink-0" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-400 tracking-wider">
                              РАЗДЕЛ {cat.code}
                            </span>
                            {isDiyMode && cat.catDiySavings > 0 && (
                              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold border border-emerald-500/30">
                                -{formatEuro(cat.catDiySavings)} Спестени
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-white mt-0.5">{cat.name}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{cat.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full md:w-auto gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                        <div className="text-left md:text-right">
                          <div className="text-[11px] text-slate-400">Общо Раздел</div>
                          <div className="text-lg font-black text-white">{formatEuro(cat.catTotalActive)}</div>
                        </div>
                        <div className="p-2 text-slate-400">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Itemized Table */}
                    {isExpanded && (
                      <div className="border-t border-slate-800/80 overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                          <thead>
                            <tr className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                              <th className="py-3 px-4">Дейност / Материал</th>
                              <th className="py-3 px-3 text-center">Мярка</th>
                              <th className="py-3 px-3 text-center">Кол.</th>
                              <th className="py-3 px-3 text-right">Мат. (€)</th>
                              <th className="py-3 px-3 text-right">Труд (€)</th>
                              <th className="py-3 px-4 text-right">Общо (€)</th>
                              <th className="py-3 px-4">Бележки</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/50 text-xs">
                            {cat.items.map((item) => {
                              const hasDiySavingOnItem = isDiyMode && item.diySaving > 0;

                              return (
                                <tr key={item.id} className="hover:bg-slate-800/30 transition">
                                  <td className="py-3.5 px-4 font-semibold text-slate-200">
                                    {item.name}
                                  </td>
                                  <td className="py-3.5 px-3 text-center text-slate-400">{item.unit}</td>
                                  <td className="py-3.5 px-3 text-center font-bold text-white">{item.qty}</td>
                                  <td className="py-3.5 px-3 text-right text-sky-400 font-medium">{formatEuro(item.matCost)}</td>
                                  <td className="py-3.5 px-3 text-right text-rose-400 font-medium">
                                    {hasDiySavingOnItem ? (
                                      <span className="line-through text-slate-500 mr-1">{formatEuro(item.laborCostFull)}</span>
                                    ) : null}
                                    {formatEuro(item.laborCostActive)}
                                  </td>
                                  <td className="py-3.5 px-4 text-right font-black text-white">{formatEuro(item.totalCostActive)}</td>
                                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                                    {item.note}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: MORTGAGE & CREDIT STRUCTURE CALCULATOR */}
        {activeTab === 'credit' && (
          <div className="space-y-8">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-indigo-400" />
                Банков Кредитен Модел (Двойно Финансиране)
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Изчисление на месечна вноска за ипотечен кредит за имота + втори кредит/рефинансиране за стари задължения и първоначални такси.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-slate-300 flex justify-between mb-2">
                    <span>Годишна Лихва (%)</span>
                    <span className="text-indigo-400 font-bold">{interestRate}%</span>
                  </label>
                  <input 
                    type="range" 
                    min="1.5" 
                    max="6.0" 
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex justify-between mb-2">
                    <span>Срок на Кредита (Години)</span>
                    <span className="text-indigo-400 font-bold">{loanYears} год.</span>
                  </label>
                  <input 
                    type="range" 
                    min="10" 
                    max="35" 
                    step="1"
                    value={loanYears}
                    onChange={(e) => setLoanYears(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Two Loans Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Loan Line 1 */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500" />
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
                  Линия А: Ипотека за Имота (90%)
                </span>
                <h4 className="text-xl font-bold text-white mt-3">Покупка Къща с. Калиманци</h4>

                <div className="space-y-3 text-xs my-6">
                  <div className="flex justify-between text-slate-300">
                    <span>Покупна цена (Акт 14):</span>
                    <span className="font-semibold text-white">{formatEuro(purchasePrice)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Самоучастие (10%):</span>
                    <span className="font-semibold text-amber-400">- {formatEuro(purchasePrice * 0.1)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                    <span>Главница Кредит Линия А:</span>
                    <span className="font-bold text-indigo-300">{formatEuro(loan1Principal)}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 uppercase font-medium">Месечна вноска Линия А</div>
                  <div className="text-3xl font-black text-indigo-400 mt-1">
                    ~{formatEuro(loan1Payment)} <span className="text-xs font-normal text-slate-400">/мес</span>
                  </div>
                </div>
              </div>

              {/* Loan Line 2 */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500" />
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
                  Линия Б: Рефинансиране & Такси
                </span>
                <h4 className="text-xl font-bold text-white mt-3">Стари Кредити + Първоначални Разходи</h4>

                <div className="space-y-3 text-xs my-6">
                  <div className="flex justify-between text-slate-300">
                    <span>Стари задължения за покриване:</span>
                    <span className="font-semibold text-white">{formatEuro(existingDebt)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Първоначални такси и нотариус:</span>
                    <span className="font-semibold text-amber-400">+ {formatEuro(upfrontCosts)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                    <span>Главница Кредит Линия Б:</span>
                    <span className="font-bold text-emerald-300">{formatEuro(loan2Principal)}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 uppercase font-medium">Месечна вноска Линия Б</div>
                  <div className="text-3xl font-black text-emerald-400 mt-1">
                    ~{formatEuro(loan2Payment)} <span className="text-xs font-normal text-slate-400">/мес</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Combined Monthly Payment Hero Box */}
            <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-slate-900 border border-indigo-500/40 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-xl">
              <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1">
                Окончателна Обща Месечна Вноска
              </div>
              <div className="text-4xl sm:text-6xl font-black text-white my-2">
                ~{formatEuro(totalMonthlyPayment)} <span className="text-base font-normal text-slate-300">/ месец</span>
              </div>
              <p className="text-xs text-slate-300/80 max-w-xl mx-auto mt-2">
                Общата сума за обслужване на двата кредита при {interestRate}% годишна лихва за {loanYears} години.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
          <p>© 2026 Имотен Финансов Паспорт & Детайлен Бюджет • с. Калиманци, Област Варна</p>
        </footer>
      </div>
    </div>
  );
}
