import React from 'react';
import { useFadeUp } from '../../hooks/useFadeUp';

const SCORES = [
  { date: '22 Jun 2026', value: 38, latest: true  },
  { date: '15 Jun 2026', value: 34, latest: false },
  { date: '08 Jun 2026', value: 41, latest: false },
  { date: '01 Jun 2026', value: 29, latest: false },
  { date: '25 May 2026', value: 36, latest: false },
];

const FEATURES = [
  { icon: '⛳', text: 'Stableford format, scores from 1 to 45' },
  { icon: '📅', text: 'One entry per date — edit or delete if needed' },
  { icon: '🔄', text: 'Rolling 5-score window, most recent always on top' },
  { icon: '⚡', text: 'Scores update your draw entry in real time' },
];

export default function ScoreSystem() {
  const ref = useFadeUp();

  return (
    <section id="scores" className="px-[5vw] py-24" style={{ background: '#0A0F1E' }} ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="fade-up">
          <div className="rounded-2xl p-8" style={{ background: '#141C2E', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-5" style={{ color: '#8A8FA8' }}>My Score History</p>
            {SCORES.map((s, i) => (
              <div
                key={s.date}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: i < SCORES.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
              >
                <span className="text-sm" style={{ color: '#8A8FA8' }}>{s.date}</span>
                <span className="font-bold text-base px-3 py-0.5 rounded-md tabular-nums" style={{ background: 'rgba(0,232,122,0.1)', color: '#00E87A' }}>{s.value}</span>
                {s.latest
                  ? <span className="text-[10px] font-bold tracking-[0.06em] uppercase px-2 py-0.5 rounded" style={{ background: 'rgba(0,232,122,0.15)', color: '#00E87A' }}>Latest</span>
                  : <span className="w-12" />
                }
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: '#8A8FA8' }}>Score System</p>
          <h2 className="font-extrabold tracking-tight text-4xl md:text-5xl leading-tight mb-4" style={{ color: '#F5F5F0' }}>
            Your last 5 rounds,<br />
            <span style={{ color: '#00E87A' }}>always current</span>
          </h2>
          <p className="text-base max-w-sm mb-6" style={{ color: '#8A8FA8' }}>
            Log a new score and the oldest one is automatically retired. Your draw entry updates instantly.
          </p>
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            {FEATURES.map((f) => (
              <li key={f.text} className="flex gap-3 text-sm" style={{ color: '#8A8FA8' }}>
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}