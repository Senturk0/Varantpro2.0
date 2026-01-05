import React from 'react';
import { X, TrendingUp, TrendingDown, Clock, Activity, Gauge, Scale } from 'lucide-react';
import { Warrant } from '../types';

interface WarrantDetailModalProps {
  warrant: Warrant;
  onClose: () => void;
}

export const WarrantDetailModal: React.FC<WarrantDetailModalProps> = ({ warrant, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{warrant.code}</h2>
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                warrant.issuer === 'IS' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                warrant.issuer === 'AK' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
              }`}>
                {warrant.issuer === 'IS' ? 'İş Varant' : warrant.issuer === 'AK' ? 'Ak Varant' : 'İnfo Varant'}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Dayanak Varlık: <span className="text-slate-900 dark:text-white font-medium">{warrant.underlying}</span> • 
              Vade: <span className="text-slate-900 dark:text-white font-medium">{warrant.maturityDate}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Price Section */}
          <div className="flex items-center justify-between mb-8 bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Piyasa Fiyatı</p>
              <p className="text-4xl font-mono text-slate-900 dark:text-white">{warrant.price.toFixed(2)} <span className="text-lg text-slate-400 dark:text-slate-500">TL</span></p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Kullanım Fiyatı</p>
              <p className="text-2xl font-mono text-slate-700 dark:text-slate-200">{warrant.strikePrice.toFixed(2)} <span className="text-sm text-slate-400 dark:text-slate-500">TL</span></p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Tip</p>
              <div className={`flex items-center gap-1 ${warrant.type === 'CALL' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {warrant.type === 'CALL' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <span className="font-bold text-lg">{warrant.type === 'CALL' ? 'ALIM' : 'SATIM'}</span>
              </div>
            </div>
          </div>

          {/* Greeks Grid */}
          <h3 className="text-slate-900 dark:text-white font-semibold mb-4 flex items-center gap-2">
            <Activity size={18} className="text-blue-600 dark:text-blue-400" />
            Teknik Parametreler (Yunanlar)
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                <Gauge size={16} />
                <span className="text-xs font-medium">Delta</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{warrant.delta.toFixed(2)}</p>
              <p className="text-[10px] text-slate-500 mt-1">Dayanak varlık 1 TL değiştiğinde varantın değişimi.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500/50 transition-colors">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                <Activity size={16} />
                <span className="text-xs font-medium">Gama</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{warrant.gamma.toFixed(3)}</p>
              <p className="text-[10px] text-slate-500 mt-1">Delta'nın değişim hızı.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-500/50 transition-colors">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                <Clock size={16} />
                <span className="text-xs font-medium">Teta</span>
              </div>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">{warrant.theta.toFixed(3)}</p>
              <p className="text-[10px] text-slate-500 mt-1">Günlük zaman değeri kaybı.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-500/50 transition-colors">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                <Scale size={16} />
                <span className="text-xs font-medium">Kaldıraç</span>
              </div>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">{warrant.leverage.toFixed(1)}x</p>
              <p className="text-[10px] text-slate-500 mt-1">Sermaye esnekliği.</p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/50 text-xs text-blue-800 dark:text-blue-200 flex items-start gap-2">
             <Activity size={14} className="mt-0.5 shrink-0" />
             <p>Duyarlılık: <span className="font-bold">{warrant.sensitivity.toFixed(3)}</span>. Dayanak varlık fiyatındaki {warrant.sensitivity.toFixed(3)} kuruşluk değişim varant fiyatını 1 kuruş değiştirir.</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 dark:bg-slate-900 p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
            <button onClick={onClose} className="px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg transition-colors font-medium">
                Kapat
            </button>
        </div>

      </div>
    </div>
  );
};