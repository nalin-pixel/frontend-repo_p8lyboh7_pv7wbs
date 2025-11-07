import React from 'react';
import { Home, FolderKanban, BookOpen, Tag, User, Mail } from 'lucide-react';

const Navbar = ({ current, onNavigate, lang, setLang, t }) => {
  const links = [
    { key: 'home', label: t('nav.home'), icon: <Home size={18} /> },
    { key: 'projects', label: t('nav.projects'), icon: <FolderKanban size={18} /> },
    { key: 'blog', label: t('nav.blog'), icon: <BookOpen size={18} /> },
    { key: 'tags', label: t('nav.tags'), icon: <Tag size={18} /> },
    { key: 'about', label: t('nav.about'), icon: <User size={18} /> },
    { key: 'contact', label: t('nav.contact'), icon: <Mail size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur bg-white/60 dark:bg-neutral-900/60 border-b border-neutral-200/60 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-semibold tracking-tight text-neutral-900 dark:text-white">{t('brand')}</div>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => onNavigate(l.key)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                current === l.key
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {l.icon}
              <span>{l.label}</span>
            </button>
          ))}
          <div className="w-px h-6 mx-2 bg-neutral-200 dark:bg-neutral-700" />
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-3 py-2 rounded-md text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            aria-label={t('actions.toggleLang')}
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
