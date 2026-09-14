import React from 'react';
import { Card } from '../../components/ui/Card';

export const ValueProposition: React.FC = () => {
  const pillars = [
    {
      icon: 'verified_user',
      title: 'Verified Ownership Only',
      desc: 'Zero fake landlords. Every flat is physically inspected and backed by official ownership contracts before publishing.',
      badge: '100% Verified',
    },
    {
      icon: 'directions_walk',
      title: 'Pedestrian Precision',
      desc: 'Precise walking minutes to specific faculty gates and metro stations calculated using actual student footpaths.',
      badge: 'Gate Accurate',
    },
    {
      icon: 'policy',
      title: 'AI Lease Protection',
      desc: 'Instant AI scanning of lease contracts to flag unfair deposit deductions, predatory terms, or surprise fees.',
      badge: 'Zero Traps',
    },
  ];

  return (
    <section className="w-full max-w-[1200px] mx-auto px-margin py-14 text-left">
      <div className="bg-surface-container-low rounded-2xl p-8 sm:p-12 border border-outline-variant/30">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-label-sm text-secondary uppercase tracking-widest font-bold">
            Why Students Trust Maskan AI
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">
            Built from scratch to eliminate off-campus rental headaches.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <Card key={idx} elevation="level-1" className="p-6 bg-surface-container-lowest flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-4 shadow-warm-sm">
                  <span className="material-symbols-outlined text-[24px] material-symbols-filled">{p.icon}</span>
                </div>
                <h4 className="font-headline-sm text-primary mb-2 font-bold">{p.title}</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{p.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant/20">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-secondary px-2.5 py-1 rounded-full bg-secondary-fixed/40">
                  {p.badge}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
