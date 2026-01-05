import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { BIST30 } from '../constants';

interface StockSelectorProps {
  onSelect: (symbol: string) => void;
}

export const StockSelector: React.FC<StockSelectorProps> = ({ onSelect }) => {
  const [filter, setFilter] = useState('');

  const filteredStocks = BIST30.filter(stock => 
    stock.code.toLowerCase().includes(filter.toLowerCase()) || 
    stock.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Hisse ara (Örn: THYAO, Garanti)"
          className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {filteredStocks.map((stock) => (
          <button
            key={stock.code}
            onClick={() => onSelect(stock.code)}
            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl transition-all duration-200 group text-center h-24 shadow-sm"
          >
            <span className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">{stock.code}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate w-full px-2">{stock.name}</span>
          </button>
        ))}
      </div>
      
      {filteredStocks.length === 0 && (
        <div className="text-center py-10 text-slate-500">
          Hisse bulunamadı.
        </div>
      )}
    </div>
  );
};