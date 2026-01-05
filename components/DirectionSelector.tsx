import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Direction } from '../types';

interface DirectionSelectorProps {
  symbol: string;
  onSelect: (dir: Direction) => void;
}

export const DirectionSelector: React.FC<DirectionSelectorProps> = ({ symbol, onSelect }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-slate-900 dark:text-white mb-8">
        <span className="text-blue-600 dark:text-blue-400">{symbol}</span> için beklentiniz ne yönde?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => onSelect('CALL')}
          className="relative overflow-hidden group p-8 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-green-500 transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:shadow-xl"
        >
          <div className="absolute inset-0 bg-green-50/50 dark:bg-green-900/10 group-hover:bg-green-100/50 dark:group-hover:bg-green-900/20 transition-all"></div>
          <div className="p-4 rounded-full bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-500 mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp size={48} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400">Yükseliş (Alım)</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Hisse fiyatının yükseleceğini düşünüyorsanız<br/> 
            <span className="font-bold text-green-600 dark:text-green-400">CALL (Alım)</span> varantlarını inceleyin.
          </p>
        </button>

        <button
          onClick={() => onSelect('PUT')}
          className="relative overflow-hidden group p-8 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-red-500 transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:shadow-xl"
        >
          <div className="absolute inset-0 bg-red-50/50 dark:bg-red-900/10 group-hover:bg-red-100/50 dark:group-hover:bg-red-900/20 transition-all"></div>
          <div className="p-4 rounded-full bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 mb-4 group-hover:scale-110 transition-transform">
            <TrendingDown size={48} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400">Düşüş (Satım)</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Hisse fiyatının düşeceğini düşünüyorsanız<br/> 
            <span className="font-bold text-red-600 dark:text-red-400">PUT (Satım)</span> varantlarını inceleyin.
          </p>
        </button>
      </div>
    </div>
  );
};