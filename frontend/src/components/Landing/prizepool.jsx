import React from 'react';
import { useFadeUp } from '../../hooks/useFadeUp';

const PRIZES = [
  { tag: '5-Number Match', match: 'Jackpot',      pct: '40%', note: 'Of the total pool. Rolls over to next month if no winner.', rollover: true,  jackpot: true  },
  { tag: '4-Number Match', match: 'Major Prize',  pct: '35%', note: 'Split equally between all 4-match winners.',                rollover: false, jackpot: false },
  { tag: '3-Number Match', match: 'Entry Prize',  pct: '25%', note: 'Split equally between all 3-match winners.',                rollover: false, jackpot: false },
];

export default function PrizePools() {
  const ref = useFadeUp();

  return (
    <section id="prizes" className="px-[5vw] py-24" style={{ background: '#111827' }} ref={ref}>
      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: '#8A8FA8' }}>Prize Pools</p>
      <h2 className="font-extrabold tracking-tight text-4xl md:text-5xl leading-tight mb-3" style={{ color: '#F5F5F0' }}>
        Three ways to <span style={{ color: '#00E87A' }}>win</span>
      </h2>
      <p className="text-base max-w-md mb-14" style={{ color: '#8A8FA8' }}>
        The pool grows with the community. Match more numbers, win a bigger share.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {PRIZES.map((p) => (
          <div key={p.tag} className="fade-up">
            <div
              className="relative rounded-2xl p-8 cursor-default transition-all duration-200 overflow-hidden h-full"
              style={{
                background: p.jackpot ? 'linear-gradient(135deg, rgba(0,232,122,0.12), rgba(0,232,122,0.04))' : '#141C2E',
                border: p.jackpot ? '1px solid rgba(0,232,122,0.3)' : '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = p.jackpot ? 'rgba(0,232,122,0.5)' : 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = p.jackpot ? 'rgba(0,232,122,0.3)' : 'rgba(255,255,255,0.07)'; }}
            >
              {p.rollover && (
                <span
                  className="absolute top-5 right-5 text-[10px] font-bold tracking-[0.08em] uppercase px-2.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(0,232,122,0.15)', color: '#00E87A' }}
                >
                  Rollover
                </span>
              )}
              <span
                className="inline-block text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full mb-5"
                style={{ background: p.jackpot ? 'rgba(0,232,122,0.15)' : 'rgba(255,255,255,0.07)', color: p.jackpot ? '#00E87A' : '#8A8FA8' }}
              >
                {p.tag}
              </span>
              <p className="font-extrabold text-xl mb-1" style={{ color: '#F5F5F0' }}>{p.match}</p>
              <p className="font-extrabold text-5xl tracking-tighter mb-2" style={{ color: p.jackpot ? '#00E87A' : '#F5F5F0' }}>{p.pct}</p>
              <p className="text-sm" style={{ color: '#8A8FA8' }}>{p.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}