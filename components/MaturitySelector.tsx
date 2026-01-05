import React from 'react';
import { AlertTriangle, Zap, Clock, ShieldCheck } from 'lucide-react';
import { RiskGroup } from '../types';

interface MaturitySelectorProps {
  onSelect: (riskGroup: RiskGroup) => void;
}

export const MaturitySelector: React.FC<MaturitySelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-slate-900 dark:text-white mb-2">
        Risk Tercihinizi Belirleyin
      </h2>
      <p className="text-center text-slate-500 dark:text-slate-400 mb-8 text-sm">
        Vadeye kalan gün sayısı risk ve getiri potansiyelini doğrudan etkiler.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 0-15 Gün - Çok Yüksek Risk */}
        <button
          onClick={() => onSelect('0-15')}
          className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-500 hover:bg-red-50 dark:hover:bg-slate-750 transition-all text-left group relative overflow-hidden shadow-sm hover:shadow-md"
        >
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap size={64} className="text-red-500" />
          </div>
          <div className="flex items-center mb-3">
            <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg text-red-600 dark:text-red-500 mr-3">
              <Zap size={20} />
            </div>
            <h3 className="text-md font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400">Çok Yüksek Risk</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">0 - 15 Gün</p>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Vade sonu yaklaşmıştır. Zaman değeri kaybı (Teta) maksimumdur. Çok sert fiyat hareketleri görülebilir.
          </p>
        </button>

        {/* 16-30 Gün - Yüksek Risk */}
        <button
          onClick={() => onSelect('16-30')}
          className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-750 transition-all text-left group relative overflow-hidden shadow-sm hover:shadow-md"
        >
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertTriangle size={64} className="text-orange-500" />
          </div>
          <div className="flex items-center mb-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-500/10 rounded-lg text-orange-600 dark:text-orange-500 mr-3">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-md font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">Yüksek Risk</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">16 - 30 Gün</p>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Kaldıraç etkisi yüksektir. Günlük değer kayıpları hızlanmaya başlar. Spekülatif işlemler için uygundur.
          </p>
        </button>

        {/* 31-60 Gün - Orta Risk */}
        <button
          onClick={() => onSelect('31-60')}
          className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-750 transition-all text-left group relative overflow-hidden shadow-sm hover:shadow-md"
        >
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock size={64} className="text-blue-500" />
          </div>
          <div className="flex items-center mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-500 mr-3">
              <Clock size={20} />
            </div>
            <h3 className="text-md font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Orta Risk</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">31 - 60 Gün</p>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Dengeli bir profil sunar. Zaman değeri kaybı daha makuldür. Trend takibi için tercih edilebilir.
          </p>
        </button>

        {/* 60-90 Gün - Düşük Risk */}
        <button
          onClick={() => onSelect('60-90')}
          className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-green-500 hover:bg-green-50 dark:hover:bg-slate-750 transition-all text-left group relative overflow-hidden shadow-sm hover:shadow-md"
        >
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck size={64} className="text-green-500" />
          </div>
          <div className="flex items-center mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-500/10 rounded-lg text-green-600 dark:text-green-500 mr-3">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-md font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">Düşük Risk</h3>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">60 - 90 Gün</p>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Kaldıraç düşüktür ancak vade uzundur. Piyasa dalgalanmalarına karşı daha korunaklıdır.
          </p>
        </button>
      </div>
    </div>
  );
};