import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';

export const CampusNeighborhoods: React.FC = () => {
  const navigate = useNavigate();

  const neighborhoods = [
    {
      id: 'dokki',
      name: 'Dokki & Mesaha',
      university: 'Cairo University (Main Campus)',
      flatsCount: 42,
      avgRent: 5800,
      avgWalkMinutes: 12,
      imageUrl:
        'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'giza-square',
      name: 'Giza Square & Bein El-Sarayat',
      university: 'CU Engineering & Science',
      flatsCount: 38,
      avgRent: 4900,
      avgWalkMinutes: 7,
      imageUrl:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'nasr-city',
      name: 'Abbas El-Akkad & 7th District',
      university: 'Ain Shams & Al-Azhar',
      flatsCount: 56,
      avgRent: 6200,
      avgWalkMinutes: 14,
      imageUrl:
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'new-cairo',
      name: '1st & 5th Settlement',
      university: 'GUC & AUC Campuses',
      flatsCount: 29,
      avgRent: 8500,
      avgWalkMinutes: 10,
      imageUrl:
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="w-full max-w-[1200px] mx-auto px-margin py-10 text-left">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
        <div>
          <span className="font-label-sm text-secondary uppercase tracking-widest font-bold">
            Popular Egyptian Campus Zones
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">
            Browse by Campus Neighborhood
          </h2>
        </div>
        <button
          onClick={() => navigate('/explore')}
          className="text-secondary hover:text-on-secondary-container font-label-md text-label-md flex items-center gap-1 mt-2 sm:mt-0"
        >
          <span>View all neighborhoods</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {neighborhoods.map((n) => (
          <Card
            key={n.id}
            elevation="level-1"
            interactive
            onClick={() => navigate(`/explore?neighborhood=${encodeURIComponent(n.name)}`)}
            className="group flex flex-col"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={n.imageUrl}
                alt={n.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] font-medium bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full inline-block mb-1">
                  {n.university}
                </span>
                <h4 className="font-headline-sm text-white font-bold leading-snug">{n.name}</h4>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between bg-surface-container-lowest text-body-sm text-on-surface-variant">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-secondary text-[16px]">
                  directions_walk
                </span>
                <span>~{n.avgWalkMinutes} min walk</span>
              </div>
              <div className="font-label-md text-primary font-semibold">
                {n.flatsCount} flats
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
