import React, { useState, useEffect } from 'react';
import { StepWizard } from './components/StepWizard';
import { StockSelector } from './components/StockSelector';
import { DirectionSelector } from './components/DirectionSelector';
import { MaturitySelector } from './components/MaturitySelector';
import { WarrantResults } from './components/WarrantResults';
import { GlossaryModal } from './components/GlossaryModal';
import { AboutModal } from './components/AboutModal';
import { Sidebar } from './components/Sidebar';
import { SelectionCriteria, Warrant, Direction, RiskGroup } from './types';
import { fetchWarrants } from './services/geminiService';
import { Loader2, Menu } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modals & Sidebar State
  const [showGlossary, setShowGlossary] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Selection Data
  const [criteria, setCriteria] = useState<SelectionCriteria>({
    symbol: null,
    direction: null,
    riskGroup: null,
  });
  const [warrants, setWarrants] = useState<Warrant[]>([]);

  // Toggle Theme Class on HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleStockSelect = (symbol: string) => {
    setCriteria(prev => ({ ...prev, symbol }));
    setStep(2);
  };

  const handleDirectionSelect = (direction: Direction) => {
    setCriteria(prev => ({ ...prev, direction }));
    setStep(3);
  };

  const handleRiskGroupSelect = async (riskGroup: RiskGroup) => {
    const finalCriteria = { ...criteria, riskGroup };
    setCriteria(finalCriteria);
    setLoading(true);
    setError(null);
    setStep(4);

    try {
      const data = await fetchWarrants(finalCriteria);
      setWarrants(data);
    } catch (err) {
      setError("Veriler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setCriteria({ symbol: null, direction: null, riskGroup: null });
    setWarrants([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300">
      
      {/* Modals */}
      {showGlossary && <GlossaryModal onClose={() => setShowGlossary(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onReset={handleReset}
        onOpenGlossary={() => setShowGlossary(true)}
        onOpenAbout={() => setShowAbout(true)}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center space-x-3 cursor-pointer" onClick={handleReset}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-lg">V</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Varant<span className="text-blue-500">Pro</span></h1>
            </div>
          </div>
          
          <div className="text-xs text-slate-500 hidden md:block">
             Veriler Gemini AI ile simüle edilmiştir.
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {step < 4 && <StepWizard currentStep={step} />}

        <div className="fade-in">
          {step === 1 && (
            <StockSelector onSelect={handleStockSelect} />
          )}

          {step === 2 && criteria.symbol && (
            <DirectionSelector 
              symbol={criteria.symbol} 
              onSelect={handleDirectionSelect} 
            />
          )}

          {step === 3 && (
            <MaturitySelector onSelect={handleRiskGroupSelect} />
          )}

          {step === 4 && (
            <div className="min-h-[50vh]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                  <Loader2 className="animate-spin text-blue-500" size={48} />
                  <p className="text-slate-600 dark:text-slate-400 text-lg">Piyasa verileri taranıyor...</p>
                  <p className="text-slate-500 dark:text-slate-600 text-sm">İş Varant, Ak Varant ve İnfo Varant kontrol ediliyor</p>
                </div>
              ) : error ? (
                <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-xl">
                  <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                  <button 
                    onClick={handleReset}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                  >
                    Başa Dön
                  </button>
                </div>
              ) : (
                <WarrantResults warrants={warrants} onReset={handleReset} />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}