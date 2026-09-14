import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/30 pt-12 pb-8 mt-20 text-left">
      <div className="max-w-[1200px] mx-auto px-margin">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold shadow-warm-sm">
                <span className="material-symbols-outlined text-[20px]">apartment</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
                Maskan <span className="text-secondary font-bold">AI</span>
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant leading-relaxed">
              Egypt’s premier AI-powered student housing network. Curated walking-distance flats, verified ownership, and zero rental traps.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                <span className="material-symbols-outlined text-[12px]">verified</span>
                Verified Housing
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2.5">
            <h5 className="font-label-lg text-primary text-label-md">Explore Flats</h5>
            <Link to="/explore?neighborhood=Dokki" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Flats in Dokki (Cairo Univ)
            </Link>
            <Link to="/explore?neighborhood=Giza" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Flats in Giza
            </Link>
            <Link to="/explore?neighborhood=NasrCity" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Flats in Nasr City (Ain Shams)
            </Link>
            <Link to="/explore?neighborhood=NewCairo" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Flats in New Cairo (GUC / AUC)
            </Link>
          </div>

          {/* AI Tools */}
          <div className="flex flex-col gap-2.5">
            <h5 className="font-label-lg text-primary text-label-md">AI Intelligence</h5>
            <Link to="/ai-match" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              AI Student Match Score
            </Link>
            <Link to="/lease-analyzer" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              AI Lease Contract Analyzer
            </Link>
            <Link to="/compare" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Roommate Cohort Matrix
            </Link>
            <Link to="/owner" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              List Your Student Property
            </Link>
          </div>

          {/* Campus Support */}
          <div className="flex flex-col gap-2.5">
            <h5 className="font-label-lg text-primary text-label-md">Student Safety</h5>
            <p className="text-body-sm text-on-surface-variant">
              Every lease verified with official ownership documents prior to listing.
            </p>
            <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 mt-1">
              <span className="text-label-sm font-bold text-secondary block">Need Urgent Assistance?</span>
              <span className="text-body-sm text-on-surface-variant">support@maskan-ai.edu.eg</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-body-sm text-on-surface-variant/70">
          <p>© {new Date().getFullYear()} Maskan AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Student Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
