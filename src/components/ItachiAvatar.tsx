import React from 'react';

interface ItachiAvatarProps {
  className?: string;
}

export default function ItachiAvatar({ className = 'w-full h-full' }: ItachiAvatarProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      id="itachi-custom-svg-avatar"
    >
      <defs>
        {/* Dark Moody Background Gradient */}
        <radialGradient id="bg-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1E0A0A" />
          <stop offset="50%" stopColor="#0B0303" />
          <stop offset="100%" stopColor="#010000" />
        </radialGradient>

        {/* Halo Glow Filter */}
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur1" />
          <feGaussianBlur stdDeviation="16" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Eye Glow Filter */}
        <filter id="eye-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Hair Gradient */}
        <linearGradient id="hair-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1C1D24" />
          <stop offset="60%" stopColor="#111215" />
          <stop offset="100%" stopColor="#07080A" />
        </linearGradient>

        {/* Hair Highlight Gradient */}
        <linearGradient id="hair-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF3333" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#FF3333" stopOpacity="0" />
          <stop offset="100%" stopColor="#FF3333" stopOpacity="0.2" />
        </linearGradient>

        {/* Skin Gradient */}
        <linearGradient id="skin-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EAD3C3" />
          <stop offset="60%" stopColor="#D5BAA7" />
          <stop offset="100%" stopColor="#B39480" />
        </linearGradient>

        {/* Cloak Gradient */}
        <linearGradient id="cloak-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#18191E" />
          <stop offset="50%" stopColor="#0E0F12" />
          <stop offset="100%" stopColor="#050506" />
        </linearGradient>

        {/* Crimson Shadow */}
        <radialGradient id="red-flare" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#990000" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#990000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="512" height="512" fill="url(#bg-grad)" />

      {/* Soft Ambient Red Flare/Smoke in Background */}
      <circle cx="256" cy="180" r="180" fill="url(#red-flare)" />
      
      {/* Dynamic Red Glow Flares (Soft Clouds) */}
      <path d="M120,400 Q200,320 320,380 T450,420" stroke="#FF0000" strokeWidth="2" strokeOpacity="0.1" fill="none" filter="url(#neon-glow)" />
      <path d="M50,300 Q150,220 280,300 T480,260" stroke="#FF0000" strokeWidth="1.5" strokeOpacity="0.08" fill="none" filter="url(#neon-glow)" />

      {/* Luminous Red Neon Halo - Positioned elegantly above the head */}
      <g filter="url(#neon-glow)">
        {/* Inner core */}
        <ellipse cx="256" cy="110" rx="140" ry="24" stroke="#FF4D4D" strokeWidth="6" fill="none" />
        {/* Intense neon bloom */}
        <ellipse cx="256" cy="110" rx="140" ry="24" stroke="#FF0000" strokeWidth="12" strokeOpacity="0.5" fill="none" />
        {/* Soft back aura */}
        <ellipse cx="256" cy="110" rx="142" ry="25" stroke="#990000" strokeWidth="20" strokeOpacity="0.2" fill="none" />
      </g>

      {/* Back Hair Ponytail Extension */}
      <path d="M210,340 C190,380 200,440 210,480 C180,440 180,380 190,340 Z" fill="#0C0D10" />
      <path d="M302,340 C322,380 312,440 302,480 C332,440 332,380 322,340 Z" fill="#0C0D10" />

      {/* Akatsuki Cloak Back Collar (Dark red lining visible behind neck) */}
      <path
        d="M170,300 C170,250 210,240 256,240 C302,240 342,250 342,300 C342,360 170,360 170,300 Z"
        fill="#5E0D0D"
        stroke="#400606"
        strokeWidth="2"
      />

      {/* Neck */}
      <path d="M210,240 L210,330 L302,330 L302,240 Z" fill="url(#skin-grad)" />
      {/* Neck Shadow (under chin) */}
      <path d="M210,240 C230,285 282,285 302,240 L302,260 C282,305 230,305 210,260 Z" fill="#9C7F6C" opacity="0.8" />

      {/* Character Face */}
      <path
        d="M180,180 C180,240 210,290 256,290 C302,290 332,240 332,180 C332,140 180,140 180,180 Z"
        fill="url(#skin-grad)"
      />

      {/* Ear Left */}
      <path d="M181,175 C170,175 168,210 180,210 Z" fill="url(#skin-grad)" />
      <path d="M180,183 C174,183 173,200 180,200 Z" fill="#B39480" opacity="0.6" />

      {/* Ear Right */}
      <path d="M331,175 C342,175 344,210 332,210 Z" fill="url(#skin-grad)" />
      <path d="M332,183 C338,183 339,200 332,200 Z" fill="#B39480" opacity="0.6" />

      {/* Nose */}
      <path d="M256,205 L252,225 L256,226 Z" fill="#9C7F6C" />

      {/* Mouth (Mysterious, calm line) */}
      <path d="M242,248 C248,251 264,251 270,248" stroke="#7A5D4A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Face Tear Marks (Itachi's iconic deep grooves running diagonal from inner eyes) */}
      <path d="M218,197 L210,250" stroke="#7E604F" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M294,197 L302,250" stroke="#7E604F" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

      {/* Eyes Area */}
      {/* Left Eye */}
      <path d="M204,184 C212,180 228,180 236,187 C228,194 212,194 204,184 Z" fill="#FFFFFF" stroke="#2D0A0A" strokeWidth="1.5" />
      <g filter="url(#eye-glow)">
        {/* Red Iris */}
        <circle cx="220" cy="185.5" r="5.5" fill="#FF0000" />
        {/* Pupil (sharingan core) */}
        <circle cx="220" cy="185.5" r="2" fill="#000000" />
        {/* Tiny Sharingan tomoe circles/lines */}
        <circle cx="220" cy="182.5" r="0.8" fill="#000000" />
        <circle cx="217.5" cy="187" r="0.8" fill="#000000" />
        <circle cx="222.5" cy="187" r="0.8" fill="#000000" />
      </g>
      
      {/* Right Eye */}
      <path d="M308,184 C300,180 284,180 276,187 C284,194 300,194 308,184 Z" fill="#FFFFFF" stroke="#2D0A0A" strokeWidth="1.5" />
      <g filter="url(#eye-glow)">
        {/* Red Iris */}
        <circle cx="292" cy="185.5" r="5.5" fill="#FF0000" />
        {/* Pupil */}
        <circle cx="292" cy="185.5" r="2" fill="#000000" />
        {/* Tomoe */}
        <circle cx="292" cy="182.5" r="0.8" fill="#000000" />
        <circle cx="289.5" cy="187" r="0.8" fill="#000000" />
        <circle cx="294.5" cy="187" r="0.8" fill="#000000" />
      </g>

      {/* Eyebrows (Calm but warning, angled slightly up towards center) */}
      <path d="M200,175 C210,171 228,172 235,178" stroke="#111215" strokeWidth="3" strokeLinecap="round" />
      <path d="M312,175 C302,171 284,172 277,178" stroke="#111215" strokeWidth="3" strokeLinecap="round" />

      {/* Headband Plate Foreground */}
      <path d="M190,140 L322,140 L318,162 L194,162 Z" fill="#111215" /> {/* Dark fabric wrapper */}
      <path
        d="M210,143 C220,141 292,141 302,143 L298,159 C288,160 224,160 214,159 Z"
        fill="#667280"
        stroke="#47515D"
        strokeWidth="1"
      /> {/* Steel plate */}
      <circle cx="216" cy="151" r="1.2" fill="#374151" />
      <circle cx="296" cy="151" r="1.2" fill="#374151" />
      
      {/* Slashed Village Symbol (A customized minimal design on plate) */}
      <path d="M246,151 C248,147 254,147 256,151 C258,155 264,155 266,151" stroke="#222A35" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M242,152 C252,150 260,150 270,152" stroke="#B30000" strokeWidth="2.5" strokeLinecap="round" /> {/* Crimson Strikeout Line */}

      {/* Beautiful High-Quality Hair Layer over ears and forehead */}
      <g>
        {/* Back Head Hair Mass */}
        <path d="M190,140 C160,140 160,200 176,230 C182,210 188,170 196,150 Z" fill="url(#hair-grad)" />
        <path d="M322,140 C352,140 352,200 336,230 C330,210 324,170 316,150 Z" fill="url(#hair-grad)" />

        {/* Fringes / Side-bangs (Framing the face, very stylized and long) */}
        <path d="M184,150 C184,200 195,250 195,260 C188,230 180,190 180,150 Z" fill="url(#hair-grad)" /> {/* Left face-fringe */}
        <path d="M328,150 C328,200 317,250 317,260 C324,230 332,190 332,150 Z" fill="url(#hair-grad)" /> {/* Right face-fringe */}

        {/* Top spiking bangs on the headband */}
        <path d="M196,140 C210,120 220,130 225,138 C220,136 210,136 200,140 Z" fill="url(#hair-grad)" />
        <path d="M316,140 C302,120 292,130 287,138 C292,136 302,136 312,140 Z" fill="url(#hair-grad)" />

        {/* Middle hairline shadow & stray strands in front of face */}
        <path d="M250,140 C246,150 236,170 234,178 C238,172 246,155 252,140 Z" fill="#0C0D10" />
        <path d="M262,140 C266,150 276,170 278,178 C274,172 266,155 260,140 Z" fill="#0C0D10" />

        {/* Soft edge highlights matching the red halo bloom */}
        <path d="M184,150 C184,200 195,250 195,260" stroke="url(#hair-highlight)" strokeWidth="1.5" fill="none" />
        <path d="M328,150 C328,200 317,250 317,260" stroke="url(#hair-highlight)" strokeWidth="1.5" fill="none" />
      </g>

      {/* Akatsuki Cloak Collar Layer */}
      {/* Left Collar Side */}
      <path
        d="M170,290 C150,330 142,390 140,440 L216,400 L212,320 L170,290 Z"
        fill="url(#cloak-grad)"
        stroke="#0F1013"
        strokeWidth="2"
      />
      {/* Left Collar Inner Red Emblem Lining */}
      <path
        d="M170,291 C155,325 150,375 148,425 L168,415 C170,370 178,335 186,310 Z"
        fill="#9E1414"
      />
      {/* Right Collar Side */}
      <path
        d="M342,290 C362,330 370,390 372,440 L296,400 L300,320 L342,290 Z"
        fill="url(#cloak-grad)"
        stroke="#0F1013"
        strokeWidth="2"
      />
      {/* Right Collar Inner Red Emblem Lining */}
      <path
        d="M342,291 C357,325 362,375 364,425 L344,415 C342,370 334,335 326,310 Z"
        fill="#9E1414"
      />

      {/* Main Cloak Body shoulders */}
      <path
        d="M140,430 C120,450 100,500 80,512 L432,512 C412,500 392,450 372,430 L296,396 L216,396 Z"
        fill="url(#cloak-grad)"
      />

      {/* Red Highlight tracing the left and right shoulder edges */}
      <path d="M140,430 C120,450 101,498 84,512" stroke="#FF3333" strokeWidth="2.5" strokeOpacity="0.5" strokeLinecap="round" filter="url(#eye-glow)" />
      <path d="M372,430 C392,450 411,498 428,512" stroke="#FF3333" strokeWidth="2.5" strokeOpacity="0.5" strokeLinecap="round" filter="url(#eye-glow)" />

      {/* Akatsuki Cloud Emblem stitched on center/sides of Cloak (with neon highlights) */}
      <g>
        {/* Soft back aura of the red cloud */}
        <path
          d="M210,480 C210,465 225,455 240,455 C246,440 266,440 274,455 C288,450 298,460 298,474 C298,485 288,495 270,495 C250,495 240,495 224,495 C212,495 210,490 210,480 Z"
          fill="#3D0000"
          stroke="#FF0000"
          strokeWidth="1"
          opacity="0.8"
        />
        {/* Glowing border of cloud */}
        <path
          d="M212,480 C212,467 226,458 240,458 C245,444 263,444 270,458 C284,453 293,463 293,475 C293,485 284,492 270,492 C252,492 242,492 226,492 C215,492 212,487 212,480 Z"
          fill="#940D0D"
          stroke="#FFAAAA"
          strokeWidth="1.5"
        />
        {/* White inner curl of Akatsuki cloud */}
        <path d="M228,485 Q235,482 242,486 Q245,480 250,484" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.9" />
      </g>
    </svg>
  );
}
