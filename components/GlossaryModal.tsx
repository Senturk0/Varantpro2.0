import React from 'react';
import { X, BookOpen, Activity, Gauge, Clock, Scale, TrendingUp } from 'lucide-react';

interface GlossaryModalProps {
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ onClose }) => {
  const terms = [
    {
      title: "Delta",
      icon: <Gauge className="text-blue-600 dark:text-blue-400" size={20} />,
      def: "Dayanak varlığın fiyatı 1 TL değiştiğinde, varantın fiyatının ne kadar değişeceğini gösterir.",
      example: "Örnek: Dayanak hisse 10.00 TL, Varant 0.50 TL ve Delta 0.5 ise; Hisse 11.00 TL olduğunda varant fiyatı yaklaşık 1.00 TL olur (0.50 + 0.5)."
    },
    {
      title: "Gama",
      icon: <Activity className="text-purple-600 dark:text-purple-400" size={20} />,
      def: "Dayanak varlık fiyatındaki 1 birimlik değişime karşılık deltadaki değişimi ifade eder. Deltanın ivmesidir.",
      example: "Örnek: Gama yüksekse, hisse fiyatı değiştikçe Delta çok hızlı değişir. Bu da varantın fiyat hareketlerini hızlandırır."
    },
    {
      title: "Teta (Zaman Aşımı)",
      icon: <Clock className="text-red-600 dark:text-red-400" size={20} />,
      def: "Zamanın geçmesiyle varantın her gün kaybettiği değeri gösterir. Vade sonu yaklaştıkça Teta artar (negatif etkisi büyür).",
      example: "Örnek: Teta -0.01 ise, hisse fiyatı hiç değişmese bile varant her gün 1 kuruş değer kaybeder."
    },
    {
      title: "Etkin Kaldıraç",
      icon: <Scale className="text-green-600 dark:text-green-400" size={20} />,
      def: "Dayanak varlıktaki %1'lik değişimin varant fiyatında yüzde kaçlık değişim yaratacağını gösterir.",
      example: "Örnek: Kaldıraç 10 ise, hisse %1 yükseldiğinde Alım varantı yaklaşık %10 yükselir. Tersi durumda %10 düşer."
    },
    {
      title: "Duyarlılık",
      icon: <TrendingUp className="text-orange-600 dark:text-orange-400" size={20} />,
      def: "Varantın fiyatının 1 kuruş değişmesi için dayanak varlığın ne kadar değişmesi gerektiğini gösterir.",
      example: "Örnek: Duyarlılık 0.5 ise, hisse senedi 0.50 TL hareket ettiğinde varant fiyatı 0.01 TL hareket eder."
    }
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                <BookOpen size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Varant Sözlüğü</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Varant yatırımı yaparken kullanılan temel teknik terimler ve anlamları aşağıdadır.
          </p>

          <div className="space-y-4">
            {terms.map((term, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-white dark:bg-slate-800 rounded-lg shrink-0 border border-slate-100 dark:border-slate-700">
                    {term.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{term.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 leading-relaxed">{term.def}</p>
                    <div className="bg-blue-50 dark:bg-slate-800/50 p-3 rounded-lg border-l-2 border-blue-500">
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">{term.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};