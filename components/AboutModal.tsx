import React from 'react';
import { X, Info, Shield, Cpu, TrendingUp } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Info size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Hakkında</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-blue-600">VarantPro</span>, BIST 30 hisseleri üzerine yazılmış varantları analiz etmenizi, filtrelemenizi ve karşılaştırmanızı sağlayan yeni nesil bir finansal araçtır.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="mt-1 text-blue-500"><Cpu size={20} /></div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Yapay Zeka Destekli</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Gemini AI teknolojisi kullanılarak piyasa verileri simüle edilir ve analiz edilir.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 text-green-500"><TrendingUp size={20} /></div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Akıllı Filtreleme</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Hisse, yön ve risk algınıza göre binlerce varant arasından en uygun olanları saniyeler içinde bulur.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1 text-purple-500"><Shield size={20} /></div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Risk Yönetimi</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Vadeye kalan gün sayısına göre risk grupları belirleyerek stratejinize uygun yatırım araçlarını sunar.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
            <p className="text-xs text-slate-400">Versiyon 1.0.0 • 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};