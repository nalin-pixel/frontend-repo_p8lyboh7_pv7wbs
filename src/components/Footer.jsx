import React from 'react';

const Footer = ({ t }) => {
  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
        <p>© {new Date().getFullYear()} {t('brand')}. {t('footer.rights')}</p>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
