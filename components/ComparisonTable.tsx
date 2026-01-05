import React from 'react';
import { ArrowLeft, BarChart2 } from 'lucide-react';
import { Warrant } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ComparisonTableProps {
  warrants: Warrant[];
  onBack: () => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ warrants, onBack }) => {
  // Prepare data for leverage chart
  const leverageData = warrants.map(w => ({
    name: w.code,
    leverage: w.leverage,
    fill: w.issuer === 'IS' ? '#3b82f6' : w.issuer === 'AK' ? '#ef4444' : '#f97316'
  }));

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        Listeye Dön
      </button>

      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Detaylı Karşılaştırma</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left bg-white dark:bg-slate-800">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 text-slate-500 dark:text-slate-400 font-normal w-1/4">Parametre</th>
                {warrants.map(w => (
                  <th key={w.code} className="p-4 text-slate-900 dark:text-white font-bold text-center border-l border-slate-200 dark:border-slate-700 min-w-[120px]">
                    {w.code}
                    <div className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-1">{w.issuer}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-sm">
              <tr>
                <td className="p-4 text-slate-500 dark:text-slate-400">Dayanak Varlık</td>
                {warrants.map(w => <td key={w.code} className="p-4 text-center text-slate-900 dark:text-white border-l border-slate-200 dark:border-slate-700">{w.underlying}</td>)}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 dark:text-slate-400">Tip</td>
                {warrants.map(w => <td key={w.code} className="p-4 text-center font-bold border-l border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">{w.type === 'CALL' ? 'ALIM' : 'SATIM'}</td>)}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 dark:text-slate-400">Vade</td>
                {warrants.map(w => <td key={w.code} className="p-4 text-center text-slate-900 dark:text-white border-l border-slate-200 dark:border-slate-700">{w.maturityDate}</td>)}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50">Fiyat</td>
                {warrants.map(w => <td key={w.code} className="p-4 text-center text-xl font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border-l border-slate-200 dark:border-slate-700">{w.price.toFixed(2)}</td>)}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 dark:text-slate-400">Kullanım Fiyatı</td>
                {warrants.map(w => <td key={w.code} className="p-4 text-center text-slate-900 dark:text-white border-l border-slate-200 dark:border-slate-700">{w.strikePrice.toFixed(2)}</td>)}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 dark:text-slate-400">Etkin Kaldıraç</td>
                {warrants.map(w => <td key={w.code} className="p-4 text-center text-green-600 dark:text-green-400 font-bold border-l border-slate-200 dark:border-slate-700">{w.leverage.toFixed(2)}x</td>)}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 dark:text-slate-400">Delta</td>
                {warrants.map(w => <td key={w.code} className="p-4 text-center text-slate-900 dark:text-white border-l border-slate-200 dark:border-slate-700">{w.delta.toFixed(2)}</td>)}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 dark:text-slate-400">Gama</td>
                {warrants.map(w => <td key={w.code} className="p-4 text-center text-purple-600 dark:text-purple-400 border-l border-slate-200 dark:border-slate-700">{w.gamma.toFixed(3)}</td>)}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 dark:text-slate-400">Teta (Zaman Aşımı)</td>
                {warrants.map(w => <td key={w.code} className="p-4 text-center text-red-600 dark:text-red-400 border-l border-slate-200 dark:border-slate-700">{w.theta.toFixed(3)}</td>)}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 dark:text-slate-400">Duyarlılık</td>
                {warrants.map(w => <td key={w.code} className="p-4 text-center text-slate-900 dark:text-white border-l border-slate-200 dark:border-slate-700">{w.sensitivity.toFixed(3)}</td>)}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Charts Section */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col shadow-sm">
          <div className="flex items-center mb-4 text-slate-600 dark:text-slate-300">
            <BarChart2 size={20} className="mr-2" />
            <h3 className="font-semibold">Kaldıraç Analizi</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leverageData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--tw-prose-invert-bg)', borderColor: 'var(--tw-prose-invert-border)', color: 'var(--tw-prose-invert-text)' }}
                  cursor={{fill: 'transparent'}}
                  wrapperClassName="dark:!bg-slate-800 !bg-white !border-slate-200 dark:!border-slate-700 !text-slate-900 dark:!text-white"
                  itemStyle={{ color: 'inherit' }}
                  labelStyle={{ color: 'inherit' }}
                />
                <Bar dataKey="leverage" radius={[4, 4, 0, 0]}>
                  {leverageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">
            Yüksek kaldıraç daha yüksek getiri potansiyeli sunarken riski de artırır.
          </p>
        </div>
      </div>
    </div>
  );
};