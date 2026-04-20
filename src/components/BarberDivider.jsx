export default function BarberDivider() {
  return (
    <>
      <style>{`
        .bd-slot {
          position: relative;
          height: 160px;
          background: #0a0a0a;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px solid #121212;
          border-bottom: 1px solid #121212;
        }
        .bd-rail {
          position: absolute;
          left: 0; right: 0;
          top: 50%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9a961 15%, #e8d27a 50%, #c9a961 85%, transparent);
          opacity: .7;
        }
        .bd-rail.dim {
          background: linear-gradient(90deg, transparent, #2a2a2a 50%, transparent);
          top: calc(50% + 14px);
          opacity: .6;
        }
        .bd-rail.dim2 {
          background: linear-gradient(90deg, transparent, #2a2a2a 50%, transparent);
          top: calc(50% - 14px);
          opacity: .6;
        }
        .bd-tools {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 80px;
        }
        .bd-tool {
          width: 90px; height: 90px;
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transform: translateY(8px);
          animation: bdToolCycle 9s infinite;
        }
        .bd-tool:nth-child(1) { animation-delay: 0s }
        .bd-tool:nth-child(2) { animation-delay: 3s }
        .bd-tool:nth-child(3) { animation-delay: 6s }
        @keyframes bdToolCycle {
          0%,3%   { opacity: 0; transform: translateY(10px) scale(.96) }
          6%,28%  { opacity: 1; transform: translateY(0) scale(1) }
          31%,33% { opacity: 0; transform: translateY(-10px) scale(.96) }
          100%    { opacity: 0; transform: translateY(10px) scale(.96) }
        }
        .bd-labels {
          position: absolute;
          left: 0; right: 0; bottom: 22px;
          display: flex;
          justify-content: center;
          gap: 80px;
          pointer-events: none;
          font-family: 'JetBrains Mono', 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: .4em;
          text-transform: uppercase;
          color: #e8d27a;
        }
        .bd-labels span {
          width: 90px;
          text-align: center;
          opacity: .4;
        }
        .bd-sparks { position: absolute; inset: 0; pointer-events: none; }
        .bd-spark {
          position: absolute;
          width: 3px; height: 3px;
          border-radius: 50%;
          background: #e8d27a;
          box-shadow: 0 0 6px #e8d27a;
          opacity: 0;
          animation: bdSparkFly 9s linear infinite;
        }
        .bd-spark:nth-child(1) { left: 20%; top: 50%; animation-delay: .3s }
        .bd-spark:nth-child(2) { left: 72%; top: 50%; animation-delay: 3.3s }
        .bd-spark:nth-child(3) { left: 45%; top: 50%; animation-delay: 6.3s }
        .bd-spark:nth-child(4) { left: 30%; top: 40%; animation-delay: .6s }
        .bd-spark:nth-child(5) { left: 68%; top: 60%; animation-delay: 3.6s }
        @keyframes bdSparkFly {
          0%,3%  { opacity: 0; transform: translate(0,0) scale(.6) }
          4%     { opacity: 1 }
          10%    { opacity: 0; transform: translate(30px,-20px) scale(0) }
          100%   { opacity: 0 }
        }
      `}</style>

      <div className="bd-slot">
        <div className="bd-rail dim2" />
        <div className="bd-rail" />
        <div className="bd-rail dim" />

        <div className="bd-sparks">
          <span className="bd-spark" />
          <span className="bd-spark" />
          <span className="bd-spark" />
          <span className="bd-spark" />
          <span className="bd-spark" />
        </div>

        <div className="bd-tools">
          {/* Razor */}
          <div className="bd-tool">
            <svg viewBox="0 0 120 60" width="110" height="55">
              <defs>
                <linearGradient id="bdGr" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f6e59a" />
                  <stop offset="50%" stopColor="#e8d27a" />
                  <stop offset="100%" stopColor="#7a6930" />
                </linearGradient>
              </defs>
              <path d="M10 25 L70 22 L74 30 L70 38 L10 35 Z" fill="url(#bdGr)" stroke="#c9a961" strokeWidth=".5" />
              <line x1="14" y1="28" x2="66" y2="28" stroke="#7a6930" strokeWidth=".4" opacity=".6" />
              <line x1="14" y1="32" x2="66" y2="32" stroke="#7a6930" strokeWidth=".4" opacity=".6" />
              <circle cx="74" cy="30" r="2.4" fill="#1a1a1a" stroke="#e8d27a" strokeWidth=".6" />
              <rect x="74" y="27.5" width="40" height="5" rx="2" fill="#141414" stroke="#3a3a3a" strokeWidth=".5" />
              <rect x="78" y="29" width="32" height="2" fill="#2a2a2a" />
            </svg>
          </div>

          {/* Scissors */}
          <div className="bd-tool">
            <svg viewBox="0 0 120 90" width="100" height="75">
              <defs>
                <linearGradient id="bdGs" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f6e59a" />
                  <stop offset="100%" stopColor="#8b6914" />
                </linearGradient>
              </defs>
              <path d="M15 20 L70 42 L72 46 L65 48 L12 26 Z" fill="url(#bdGs)" stroke="#c9a961" strokeWidth=".5" />
              <path d="M15 70 L70 48 L72 44 L65 42 L12 64 Z" fill="url(#bdGs)" stroke="#c9a961" strokeWidth=".5" />
              <circle cx="70" cy="45" r="3" fill="#0a0a0a" stroke="#e8d27a" strokeWidth=".8" />
              <ellipse cx="90" cy="30" rx="13" ry="10" fill="none" stroke="#c9a961" strokeWidth="2.5" />
              <ellipse cx="90" cy="60" rx="13" ry="10" fill="none" stroke="#c9a961" strokeWidth="2.5" />
              <path d="M70 45 L83 33" stroke="#e8d27a" strokeWidth="2" fill="none" />
              <path d="M70 45 L83 57" stroke="#e8d27a" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Comb */}
          <div className="bd-tool">
            <svg viewBox="0 0 140 50" width="120" height="45">
              <defs>
                <linearGradient id="bdGc" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#e8d27a" />
                  <stop offset="100%" stopColor="#8b6914" />
                </linearGradient>
              </defs>
              <rect x="8" y="12" width="124" height="10" rx="2" fill="url(#bdGc)" stroke="#c9a961" strokeWidth=".5" />
              <g fill="url(#bdGc)" stroke="#7a6930" strokeWidth=".3">
                <rect x="10" y="22" width="2.2" height="18" />
                <rect x="16" y="22" width="2.2" height="18" />
                <rect x="22" y="22" width="2.2" height="18" />
                <rect x="28" y="22" width="2.2" height="18" />
                <rect x="34" y="22" width="2.2" height="18" />
                <rect x="40" y="22" width="2.2" height="18" />
                <rect x="48" y="22" width="1.2" height="14" />
                <rect x="54" y="22" width="1" height="14" />
                <rect x="58" y="22" width="1" height="14" />
                <rect x="62" y="22" width="1" height="14" />
                <rect x="66" y="22" width="1" height="14" />
                <rect x="70" y="22" width="1" height="14" />
                <rect x="74" y="22" width="1" height="14" />
                <rect x="78" y="22" width="1" height="14" />
                <rect x="82" y="22" width="1" height="14" />
                <rect x="86" y="22" width="1" height="14" />
                <rect x="90" y="22" width="1" height="14" />
                <rect x="94" y="22" width="1" height="14" />
                <rect x="98" y="22" width="1" height="14" />
                <rect x="102" y="22" width="1" height="14" />
                <rect x="106" y="22" width="1" height="14" />
                <rect x="110" y="22" width="1" height="14" />
                <rect x="114" y="22" width="1" height="14" />
                <rect x="118" y="22" width="1" height="14" />
                <rect x="122" y="22" width="1" height="14" />
                <rect x="126" y="22" width="1" height="14" />
              </g>
            </svg>
          </div>
        </div>

        <div className="bd-labels">
          <span>· ПРЕЦИЗНОСТ ·</span>
          <span>· ЗАНАЯТ ·</span>
          <span>· ТРАДИЦИЯ ·</span>
        </div>
      </div>
    </>
  )
}
