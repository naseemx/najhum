/* Layout and illustrations ported from the supplied cropifAI design. */
import type { CSSProperties } from 'react';
export default function Intelligence() {
    return (<section className={"scr gridbg"} aria-labelledby={"njcr-h-ai"} id={"cropifai-intelligence"}>
    <div className={"wrap c"}>
    <p className={"kick rv"}>{"Climate AI"}</p>
    <h2 id={"njcr-h-ai"} className={"big rv d1"}>{"Decisions, "}<span className={"grad"}>{"not just data."}</span>
    </h2>
    <p className={"sub rv d2"}>{"cropifAI reads soil, weather, flow and satellite together, so every alert and every schedule has a reason."}</p>
    <div className={"ai4 mcar rv"} data-label={"Climate AI"}>
    <article className={"ai-c"}>
    <span className={"ic"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 21v-9M12 12C12 8 9 5 4 5c0 4 3 7 8 7zM12 10c0-3.5 2.5-6 7-6 0 3.5-2.5 6-7 6z"}>
    </path>
    </svg>
    </span>
    <h3>{"Water by root need"}</h3>
    <div className={"ai-w"}>
    <div className={"lw-d num"}>
    <div className={"lw-r"}>
    <span>{"Moisture"}</span>
    <i>
    <b style={{ "--w": "54%" } as CSSProperties}>
    </b>
    </i>
    <em>{"27%"}</em>
    </div>
    <div className={"lw-r"}>
    <span>{"Temp."}</span>
    <i>
    <b style={{ "--w": "62%" } as CSSProperties}>
    </b>
    </i>
    <em>{"24.8 °C"}</em>
    </div>
    <div className={"lw-r"}>
    <span>{"EC"}</span>
    <i>
    <b style={{ "--w": "36%" } as CSSProperties}>
    </b>
    </i>
    <em>{"1.4 dS/m"}</em>
    </div>
    </div>
    </div>
    <p>{"Each zone has a refill and a full point. Irrigation starts and stops on the reading at the roots, not the clock."}</p>
    </article>
    <article className={"ai-c"}>
    <span className={"ic"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M7 15a4 4 0 0 1-.6-8A5.5 5.5 0 0 1 17 5.5 4.5 4.5 0 0 1 17.5 15M8 19l-1 2M12 18l-1 3M16 19l-1 2"}>
    </path>
    </svg>
    </span>
    <h3>{"Skip the rain"}</h3>
    <div className={"ai-w"}>
    <div className={"ai-rain num"}>
    <div>
    <small>{"Tonight"}</small>
    <b>{"8 mm"}</b>
    </div>
    <div className={"ai-sk"}>
    <small>{"Tomorrow 05:30"}</small>
    <b>{"Skipped"}</b>
    </div>
    </div>
    </div>
    <p>{"When rain is forecast or wind is high, schedules wait or shorten, and the soil confirms it after."}</p>
    </article>
    <article className={"ai-c"}>
    <span className={"ic"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M13 7 9 3 5 7l4 4M17 11l4 4-4 4-4-4M8 12l4 4M14.5 9.5l-5 5M3 21c0-3 2-5 5-5"}>
    </path>
    </svg>
    </span>
    <h3>{"See stress early"}</h3>
    <div className={"ai-w"}>
    <div className={"ai-nd"}>
    <svg viewBox={"0 0 240 132"} role={"img"} aria-label={"Illustrative NDVI map of Field 3 with one stressed patch in the north-east corner"}>
    <defs>
    <clipPath id={"njcr-ndc"}>
    <path d={"M14 22 Q16 10 30 9 L204 6 Q226 6 229 24 L233 104 Q234 122 214 123 L28 126 Q10 126 9 110 Z"}>
    </path>
    </clipPath>
    <radialGradient id={"njcr-nd1"} cx={".22"} cy={".7"} r={".45"}>
    <stop offset={"0"} stopColor={"#15803D"}>
    </stop>
    <stop offset={"1"} stopColor={"#15803D"} stopOpacity={"0"}>
    </stop>
    </radialGradient>
    <radialGradient id={"njcr-nd2"} cx={".5"} cy={".35"} r={".35"}>
    <stop offset={"0"} stopColor={"#4ADE80"}>
    </stop>
    <stop offset={"1"} stopColor={"#4ADE80"} stopOpacity={"0"}>
    </stop>
    </radialGradient>
    <radialGradient id={"njcr-nd3"} cx={".75"} cy={".33"} r={".32"}>
    <stop offset={"0"} stopColor={"#DC2626"}>
    </stop>
    <stop offset={".35"} stopColor={"#F97316"}>
    </stop>
    <stop offset={".65"} stopColor={"#FACC15"} stopOpacity={".8"}>
    </stop>
    <stop offset={"1"} stopColor={"#FACC15"} stopOpacity={"0"}>
    </stop>
    </radialGradient>
    <radialGradient id={"njcr-nd5"} cx={".18"} cy={".22"} r={".2"}>
    <stop offset={"0"} stopColor={"#FDE047"} stopOpacity={".85"}>
    </stop>
    <stop offset={"1"} stopColor={"#FDE047"} stopOpacity={"0"}>
    </stop>
    </radialGradient>
    <radialGradient id={"njcr-nd4"} cx={".4"} cy={".85"} r={".25"}>
    <stop offset={"0"} stopColor={"#86EFAC"}>
    </stop>
    <stop offset={"1"} stopColor={"#86EFAC"} stopOpacity={"0"}>
    </stop>
    </radialGradient>
    <pattern id={"njcr-ndr"} width={"7"} height={"7"} patternUnits={"userSpaceOnUse"} patternTransform={"rotate(-12)"}>
    <path d={"M0 0H7"} stroke={"#052E16"} strokeOpacity={".16"} strokeWidth={"1"}>
    </path>
    </pattern>
    <linearGradient id={"njcr-ndl"} x1={"0"} x2={"1"}>
    <stop offset={"0"} stopColor={"#DC2626"}>
    </stop>
    <stop offset={".3"} stopColor={"#F59E0B"}>
    </stop>
    <stop offset={".6"} stopColor={"#4ADE80"}>
    </stop>
    <stop offset={"1"} stopColor={"#15803D"}>
    </stop>
    </linearGradient>
    </defs>
    <g clipPath={"url(#njcr-ndc)"}>
    <rect width={"240"} height={"132"} fill={"#22C55E"}>
    </rect>
    <rect width={"240"} height={"132"} fill={"url(#njcr-nd1)"}>
    </rect>
    <rect width={"240"} height={"132"} fill={"url(#njcr-nd2)"}>
    </rect>
    <rect width={"240"} height={"132"} fill={"url(#njcr-nd4)"}>
    </rect>
    <rect width={"240"} height={"132"} fill={"url(#njcr-nd5)"}>
    </rect>
    <rect width={"240"} height={"132"} fill={"url(#njcr-nd3)"}>
    </rect>
    <rect width={"240"} height={"132"} fill={"url(#njcr-ndr)"}>
    </rect>
    </g>
    <path d={"M14 22 Q16 10 30 9 L204 6 Q226 6 229 24 L233 104 Q234 122 214 123 L28 126 Q10 126 9 110 Z"} fill={"none"} stroke={"#fff"} strokeWidth={"2"}>
    </path>
    <circle className={"ai-nd-p"} cx={"180"} cy={"44"} r={"26"} fill={"none"} stroke={"#fff"} strokeWidth={"2"} strokeDasharray={"4 4"}>
    </circle>
    <circle cx={"180"} cy={"44"} r={"26"} fill={"none"} stroke={"#fff"} strokeWidth={"1.5"} strokeDasharray={"4 4"}>
    </circle>
    <path d={"M180 70 L180 84"} stroke={"#fff"} strokeWidth={"1.5"}>
    </path>
    <g transform={"translate(130 84)"}>
    <rect width={"100"} height={"22"} rx={"11"} fill={"#fff"}>
    </rect>
    <circle cx={"12"} cy={"11"} r={"3.5"} fill={"#DC2626"}>
    </circle>
    <text x={"21"} y={"14.8"} fontSize={"9.5"} fontWeight={"700"} fill={"#0F172A"} fontFamily={"inherit"}>{"Stressed patch"}</text>
    </g>
    </svg>
    <div className={"ai-nd-l"}>
    <span>{"Low"}</span>
    <i>
    </i>
    <span>{"High"}</span>
    </div>
    <p className={"ai-nd-t num"}>{"Field 3 · NDVI "}<b>{"0.68"}</b>{" · 1 patch flagged"}</p>
    </div>
    </div>
    <p>{"Satellite NDVI shows stressed and over-watered patches before the eye can, and places sensors where they matter."}</p>
    </article>
    <article className={"ai-c"}>
    <span className={"ic"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    </span>
    <h3>{"Name the fault"}</h3>
    <div className={"ai-w"}>
    <div className={"ai-f num"}>
    <div>
    <small>{"Zone B valve"}</small>
    <b>{"Open"}</b>
    </div>
    <span>{"+"}</span>
    <div>
    <small>{"Flow"}</small>
    <b className={"hot"}>{"0 m³/h"}</b>
    </div>
    <span>{"="}</span>
    <div className={"ai-fr"}>
    <small>{"Diagnosis"}</small>
    <b>{"Pump failed"}</b>
    </div>
    </div>
    </div>
    <p>{"Valve open with no flow means a failed pump. Flow with no moisture rise means a broken line. Each alert says which."}</p>
    </article>
    </div>
    </div>
    </section>);
}
