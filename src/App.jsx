import React, { useMemo, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

const messages = {
  en: {
    brand: 'My Portfolio',
    nav: { home: 'Home', projects: 'Projects', blog: 'Blog', tags: 'Tags', about: 'About', contact: 'Contact' },
    actions: { toggleLang: 'Toggle language', send: 'Send Message', sending: 'Sending…' },
    hero: { title: 'Hi, I build modern web experiences', subtitle: 'Full‑stack developer focused on delightful products.' },
    projects: { title: 'Featured Projects', viewDemo: 'View Demo', viewCode: 'Source Code' },
    blog: { title: 'Latest Posts', empty: 'No posts yet. Check back soon!' },
    tags: { title: 'Tags' },
    about: { title: 'About Me', body: 'I am a developer who loves building interactive, playful, and modern web apps.' },
    contact: { title: 'Contact Me', name: 'Your Name', email: 'Email', message: 'Message', success: 'Thanks! Your message has been sent.', error: 'Something went wrong. Please try again.' },
    footer: { rights: 'All rights reserved.' },
  },
  ar: {
    brand: 'ملفي الشخصي',
    nav: { home: 'الرئيسية', projects: 'المشاريع', blog: 'المدونة', tags: 'الوسوم', about: 'نبذة', contact: 'تواصل' },
    actions: { toggleLang: 'تبديل اللغة', send: 'إرسال الرسالة', sending: 'جارٍ الإرسال…' },
    hero: { title: 'مرحباً، أبني تجارب ويب حديثة', subtitle: 'مطوّر متكامل يركز على منتجات ممتعة وسلسة.' },
    projects: { title: 'أبرز المشاريع', viewDemo: 'مشاهدة العرض', viewCode: 'شيفرة المصدر' },
    blog: { title: 'أحدث المقالات', empty: 'لا توجد مقالات بعد.' },
    tags: { title: 'الوسوم' },
    about: { title: 'نبذة عني', body: 'أنا مطوّر أعشق بناء تطبيقات ويب تفاعلية وعصرية ومرحة.' },
    contact: { title: 'تواصل معي', name: 'اسمك', email: 'البريد الإلكتروني', message: 'رسالتك', success: 'شكراً! تم إرسال رسالتك بنجاح.', error: 'حدث خطأ ما. حاول مرة أخرى.' },
    footer: { rights: 'جميع الحقوق محفوظة.' },
  },
};

function useI18n(initial = 'en') {
  const [lang, setLang] = useState(initial);
  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved && (saved === 'en' || saved === 'ar')) setLang(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.classList.toggle('arabic', lang === 'ar');
  }, [lang]);
  const t = useMemo(() => {
    const dict = messages[lang];
    return (key) => key.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), dict) || key;
  }, [lang]);
  return { lang, setLang, t };
}

const Tags = ({ t }) => (
  <section className="max-w-6xl mx-auto px-6 py-12">
    <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">{t('tags.title')}</h2>
    <div className="flex flex-wrap gap-3 text-sm">
      {['react', 'fastapi', 'mongodb', 'tailwind', 'threejs'].map((tag) => (
        <span key={tag} className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">#{tag}</span>
      ))}
    </div>
  </section>
);

const About = ({ t }) => (
  <section className="max-w-3xl mx-auto px-6 py-12">
    <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">{t('about.title')}</h2>
    <p className="text-neutral-700 dark:text-neutral-300 leading-7">{t('about.body')}</p>
  </section>
);

export default function App() {
  const { lang, setLang, t } = useI18n('en');
  const [page, setPage] = useState('home');

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
      <Navbar current={page} onNavigate={setPage} lang={lang} setLang={setLang} t={t} />
      {page === 'home' && (
        <>
          <Hero t={t} />
          <Projects t={t} />
          <Blog t={t} />
        </>
      )}
      {page === 'projects' && <Projects t={t} />}
      {page === 'blog' && <Blog t={t} />}
      {page === 'tags' && <Tags t={t} />}
      {page === 'about' && <About t={t} />}
      {page === 'contact' && <Contact t={t} />}
      <Footer t={t} />
    </div>
  );
}
