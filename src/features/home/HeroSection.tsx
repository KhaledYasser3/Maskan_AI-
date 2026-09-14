import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchPrompt, setSearchPrompt] = useState(
    'Furnished 3-bedroom flat near Cairo University under EGP 6,000 with fiber Wi-Fi'
  );
  const [activePill, setActivePill] = useState<string>('Under EGP 6,000');

  const constraintPills = [
    'Under EGP 6,000',
    '≤ 15 min walk to Gate 4',
    '3 Occupants / 3 Desks',
    'Fiber Internet',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchPrompt.trim()) {
      navigate(`/explore?prompt=${encodeURIComponent(searchPrompt.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const handlePillClick = (pill: string) => {
    setActivePill(pill);
    if (!searchPrompt.includes(pill)) {
      setSearchPrompt((prev) => `${prev} • ${pill}`);
    }
  };

  return (
    <section className="relative w-full pt-space-xl pb-space-xl overflow-hidden text-center">
      {/* Ambient Light Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-gradient-to-b from-secondary-fixed-dim/20 via-surface-container/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1200px] mx-auto px-margin flex flex-col items-center">
        {/* Overline Badge */}
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-on-surface-variant mb-space-lg shadow-sm border border-outline-variant/25 animate-fade-in">
          <span className="material-symbols-outlined text-[16px] text-secondary material-symbols-filled">
            auto_awesome
          </span>
          <span className="font-label-md text-label-md tracking-wider uppercase text-secondary font-bold">
            Verified Egyptian Campus Housing
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Cairo Uni • Ain Shams • GUC
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary max-w-4xl tracking-tight leading-tight mb-space-md">
          Find student housing that actually fits your academic life.
        </h1>

        {/* Subtitle */}
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-space-xl leading-relaxed">
          AI-curated flats vetted for walking distance, genuine budgets, and zero rental traps around Cairo campuses.
        </p>

        {/* Natural Language Search Bar Card */}
        <div className="w-full max-w-4xl bg-surface-container-lowest rounded-xl p-space-md shadow-warm-lg border border-outline-variant/40 transition-all">
          <form onSubmit={handleSearch} className="flex flex-col gap-space-md">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-lg border border-outline-variant/30 focus-within:border-secondary/50 focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-secondary text-[24px] hidden sm:inline-block">
                psychology
              </span>
              <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="e.g. Furnished 3-bedroom flat near Cairo University under EGP 6,000 with fiber Wi-Fi"
                className="w-full bg-transparent font-body-lg text-body-md sm:text-body-lg text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none py-1"
              />
              <button
                type="submit"
                className="shrink-0 flex items-center justify-center gap-space-xs px-space-lg py-3 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg shadow-warm-sm hover:bg-primary-container transition-all active:scale-[0.98]"
              >
                <span>Search with AI</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Quick constraint pills */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm px-space-xs pt-1">
              <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
                <span className="material-symbols-outlined text-[16px] text-outline">tune</span>
                <span>Quick Constraints:</span>
              </div>
              <div className="flex flex-wrap items-center gap-space-xs">
                {constraintPills.map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => handlePillClick(pill)}
                    className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-colors ${
                      activePill === pill
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
