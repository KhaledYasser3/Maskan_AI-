import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { MOCK_FEATURED_LISTINGS } from '../home/FeaturedListings';
import { ListingCard } from '../explore/ListingCard';
import { useToast } from '../../context/ToastContext';

export const AIMatchPage: React.FC = () => {
  const { success } = useToast();
  const [university, setUniversity] = useState('Cairo University');
  const [faculty, setFaculty] = useState('Faculty of Engineering');
  const [budgetPerStudent, setBudgetPerStudent] = useState(2000);
  const [maxWalkMinutes, setMaxWalkMinutes] = useState(15);
  const [roommatesCount, setRoommatesCount] = useState(3);
  const [needsQuietStudy, setNeedsQuietStudy] = useState(true);
  const [needsFiber, setNeedsFiber] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(true);

  const handleCalculateMatch = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setHasCalculated(true);
      success('AI Match Matrix recalculated across all Cairo student residences!', 'AI Engine');
    }, 700);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-margin py-8 flex flex-col gap-8 text-left animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-sm font-bold mb-2">
          <span className="material-symbols-outlined text-[16px] text-secondary material-symbols-filled">
            bolt
          </span>
          <span>Personalized Academic Compatibility</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
          AI Student Housing Match Assistant
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-1">
          Tell us your faculty gate, monthly budget per student, and study preferences. Our AI evaluates walking fatigue, roommate space ratios, and noise levels.
        </p>
      </div>

      {/* Interactive Preference Quiz Card */}
      <Card elevation="level-1" className="p-6 sm:p-8 bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-6">
        <h3 className="font-headline-sm text-primary">Your Academic & Lifestyle Profile</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Target University */}
          <Select
            label="University"
            options={[
              { value: 'Cairo University', label: 'Cairo University (Main Campus)' },
              { value: 'Ain Shams University', label: 'Ain Shams University (Abbaseya)' },
              { value: 'German University in Cairo', label: 'German University in Cairo (GUC)' },
              { value: 'American University in Cairo', label: 'American University in Cairo (AUC)' },
            ]}
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />

          {/* Faculty / Gate */}
          <Input
            label="Faculty or Specific Gate"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            placeholder="e.g. Faculty of Engineering / Gate 4"
          />

          {/* Budget Per Student */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-label-md font-label-md text-on-surface">
                Budget / Student
              </label>
              <span className="font-bold text-secondary text-sm">
                EGP {budgetPerStudent.toLocaleString()}/mo
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={5000}
              step={100}
              value={budgetPerStudent}
              onChange={(e) => setBudgetPerStudent(Number(e.target.value))}
              className="w-full accent-secondary cursor-pointer mt-2"
            />
          </div>

          {/* Max Walk Distance */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-label-md font-label-md text-on-surface">
                Max Walk Time
              </label>
              <span className="font-bold text-secondary text-sm">
                ≤ {maxWalkMinutes} mins
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={25}
              step={1}
              value={maxWalkMinutes}
              onChange={(e) => setMaxWalkMinutes(Number(e.target.value))}
              className="w-full accent-secondary cursor-pointer mt-2"
            />
          </div>

          {/* Roommates Cohort Size */}
          <Select
            label="Cohort Size"
            options={[
              { value: 1, label: 'Solo Student (Private Studio/Room)' },
              { value: 2, label: '2 Roommates (1-2 Bedrooms)' },
              { value: 3, label: '3 Roommates (3 Bedrooms)' },
              { value: 4, label: '4 Roommates (3-4 Bedrooms)' },
            ]}
            value={roommatesCount}
            onChange={(e) => setRoommatesCount(Number(e.target.value))}
          />

          {/* Quick Study Toggles */}
          <div className="flex flex-col gap-2 justify-center pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={needsQuietStudy}
                onChange={(e) => setNeedsQuietStudy(e.target.checked)}
                className="w-4 h-4 accent-secondary rounded"
              />
              <span className="text-body-sm text-on-surface font-medium">
                Quiet study room required
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={needsFiber}
                onChange={(e) => setNeedsFiber(e.target.checked)}
                className="w-4 h-4 accent-secondary rounded"
              />
              <span className="text-body-sm text-on-surface font-medium">
                High-speed Fiber Wi-Fi mandatory
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-outline-variant/20">
          <Button
            variant="accent"
            size="lg"
            isLoading={isCalculating}
            onClick={handleCalculateMatch}
            leftIcon={
              <span className="material-symbols-outlined text-[20px]">
                psychology
              </span>
            }
          >
            Compute AI Match Scores
          </Button>
        </div>
      </Card>

      {/* Computed Match Results */}
      {hasCalculated && (
        <div className="flex flex-col gap-6 animate-slide-in">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-secondary tracking-widest">
                Ranked by Compatibility
              </span>
              <h3 className="font-headline-sm text-primary font-bold mt-0.5">
                Top Matches For Your Profile ({MOCK_FEATURED_LISTINGS.length})
              </h3>
            </div>
            <span className="text-body-sm text-on-surface-variant">
              Targeting: <strong className="text-primary">{faculty}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_FEATURED_LISTINGS.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
