import React, { useState } from 'react';

const Contact = ({ t }) => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">{t('contact.title')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('contact.name')}</label>
          <input name="name" required className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('contact.email')}</label>
          <input type="email" name="email" required className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('contact.message')}</label>
          <textarea name="message" rows="5" required className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900" />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 rounded-md bg-neutral-900 text-white disabled:opacity-60"
        >
          {status === 'loading' ? t('actions.sending') : t('actions.send')}
        </button>
        {status === 'success' && <p className="text-green-600">{t('contact.success')}</p>}
        {status === 'error' && <p className="text-red-600">{t('contact.error')}</p>}
      </form>
    </section>
  );
};

export default Contact;
