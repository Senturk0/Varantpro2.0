import React, { useState } from 'react';
import { ArrowLeftRight, Check, Info, ListFilter, Eye } from 'lucide-react';
import { Warrant } from '../types';
import { ComparisonTable } from './ComparisonTable';
import { WarrantDetailModal } from './WarrantDetailModal';

interface WarrantResultsProps {
  warrants: Warrant[];
  onReset: () => void;
}

export const WarrantResults: React.FC<WarrantResultsProps> = ({ warrants, onReset }) => {
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedWarrantDetail, setSelectedWarrantDetail] = useState<Warrant | null>(null);

  const toggleSelect = (code: string) => {
    setSelectedCodes(prev => {
      if (prev.includes(code)) {
        return prev.filter(c => c !== code);
      }
      if (prev.length >= 4) {
        alert("En fazla 4 varant karşılaştırabilirsiniz.");
        return prev;
      }
      return [...prev, code];
    });
  };

  const handleRowClick = (warrant: Warrant) => {
    if (isSelectionMode) {
      toggleSelect(warrant.code);
    } else {
      setSelectedWarrantDetail(warrant);
    }
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
  };

  const selectedWarrants = warrants.filter(w => selectedCodes.includes(w.code));

  if (showComparison) {
    return (
      <ComparisonTable 
        warrants={selectedWarrants} 
        onBack={() => setShowComparison(false)} 
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto pb-20 relative">
      {/* Detail Modal */}
      {selectedWarrantDetail && (
        <WarrantDetailModal 
          warrant={selectedWarrantDetail} 
          onClose={() => setSelectedWarrantDetail(null)} 
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          Bulunan Varantlar 
          <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs px-2 py-1 rounded-full">{warrants.length}</span>
        </h2>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSelectionMode}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isSelectionMode 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-900/50' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-400'
            }`}
          >
            {isSelectionMode ? <Check size={16} /> : <ListFilter size={16} />}
            <span>{isSelectionMode ? 'Seçim Modu Aktif' : 'Karşılaştırma Modunu Aç'}</span>
          </button>
          
          <button 
            onClick={onReset}
            className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white underline ml-2"
          >
            Aramayı Temizle
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {/* Only show Select column if in selection mode */}
              <th className={`p-4 font-medium transition-all duration-300 ${isSelectionMode ? 'w-16 opacity-100' : 'w-0 p-0 opacity-0 overflow-hidden'}`}>
                Seç
              </th>
              <th className="p-4 font-medium">Kod</th>
              <th className="p-4 font-medium">İhraççı</th>
              <th className="p-4 font-medium">Kullanım F.</th>
              <th className="p-4 font-medium">Vade</th>
              <th className="p-4 font-medium">Fiyat</th>
              <th className="p-4 font-medium hidden md:table-cell">Delta</th>
              <th className="p-4 font-medium hidden md:table-cell">Kaldıraç</th>
              {!isSelectionMode && <th className="p-4 font-medium text-right">Detay</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-sm">
            {warrants.map((w) => {
              const isSelected = selectedCodes.includes(w.code);
              return (
                <tr 
                  key={w.code} 
                  className={`
                    transition-colors cursor-pointer group
                    ${isSelected && isSelectionMode ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}
                  `}
                  onClick={() => handleRowClick(w)}
                >
                  <td className={`transition-all duration-300 ${isSelectionMode ? 'p-4 opacity-100' : 'p-0 w-0 opacity-0 overflow-hidden'}`}>
                     <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-400 dark:border-slate-500 group-hover:border-slate-600 dark:group-hover:border-slate-400'}`}>
                      {isSelected && <Check size={14} className="text-white" />}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {w.code}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      w.issuer === 'IS' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      w.issuer === 'AK' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                    }`}>
                      {w.issuer === 'IS' ? 'İş' : w.issuer === 'AK' ? 'Ak' : 'İnfo'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{w.strikePrice.toFixed(2)} TL</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{w.maturityDate}</td>
                  <td className="p-4 font-mono text-slate-900 dark:text-white font-semibold">{w.price.toFixed(2)}</td>
                  <td className="p-4 hidden md:table-cell text-slate-500 dark:text-slate-400">{w.delta.toFixed(2)}</td>
                  <td className="p-4 hidden md:table-cell text-green-600 dark:text-green-400 font-medium">{w.leverage.toFixed(1)}x</td>
                  {!isSelectionMode && (
                    <td className="p-4 text-right text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Eye size={18} className="inline" />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Info Tip when not in selection mode */}
      {!isSelectionMode && (
        <div className="mt-4 text-center text-slate-500 text-sm">
          <p>Detaylı parametreleri (Gama, Teta vb.) görmek için varantın üzerine tıklayın.</p>
        </div>
      )}

      {/* Sticky Bottom Bar for Comparison - Only visible when items selected and in selection mode */}
      <div 
        className={`fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 transform transition-transform duration-300 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-none
        ${selectedCodes.length > 0 && isSelectionMode ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Info size={18} className="text-blue-600 dark:text-blue-400" />
            <span className="text-slate-900 dark:text-white text-sm font-medium">
              {selectedCodes.length} varant seçildi
            </span>
          </div>
          <button
            onClick={() => setShowComparison(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/30 dark:shadow-blue-900/50"
          >
            <ArrowLeftRight size={18} />
            <span>Karşılaştır</span>
          </button>
        </div>
      </div>
    </div>
  );
};