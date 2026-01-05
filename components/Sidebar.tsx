import React from 'react';
import { X, Home, BookOpen, Info, Moon, Sun, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  onOpenGlossary: () => void;
  onOpenAbout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onReset, 
  onOpenGlossary, 
  onOpenAbout,
  isDarkMode,
  toggleTheme
}) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
             <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white text-lg">V</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Varant<span className="text-blue-500">Pro</span></h2>
              </div>
              <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X size={20} />
              </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
            <button 
              onClick={() => { onReset(); onClose(); }}
              className="w-full flex items-center justify-between p-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Home size={20} />
                <span className="font-medium">Ana Sayfa</span>
              </div>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button 
              onClick={() => { onOpenGlossary(); onClose(); }}
              className="w-full flex items-center justify-between p-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400 transition-all group"
            >
              <div className="flex items-center gap-3">
                <BookOpen size={20} />
                <span className="font-medium">Varant Sözlüğü</span>
              </div>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button 
              onClick={() => { onOpenAbout(); onClose(); }}
              className="w-full flex items-center justify-between p-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Info size={20} />
                <span className="font-medium">Hakkında</span>
              </div>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Footer / Theme Toggle */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-1 flex relative">
               {/* Slider Background */}
               <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-slate-700 rounded-lg shadow-sm transition-all duration-300 ${isDarkMode ? 'left-[calc(50%+2px)]' : 'left-1'}`}></div>

               <button 
                onClick={toggleTheme}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium z-10 transition-colors ${!isDarkMode ? 'text-slate-900' : 'text-slate-500 dark:text-slate-400'}`}
               >
                 <Sun size={18} />
                 <span>Aydınlık</span>
               </button>
               <button 
                onClick={toggleTheme}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium z-10 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-500'}`}
               >
                 <Moon size={18} />
                 <span>Karanlık</span>
               </button>
            </div>
            <p className="text-center text-xs text-slate-400 mt-4">
              © 2024 VarantPro
            </p>
          </div>
        </div>
      </div>
    </>
  );
};