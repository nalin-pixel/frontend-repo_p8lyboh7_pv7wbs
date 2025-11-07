import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = ({ t }) => {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          {t('hero.title')}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-neutral-700 dark:text-neutral-300">
          {t('hero.subtitle')}
        </p>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80 dark:from-neutral-900/60 dark:to-neutral-900/90" />
      </div>
    </section>
  );
};

export default Hero;
