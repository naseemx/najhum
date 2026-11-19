'use client';
/* Layout and illustrations ported from the supplied cropifAI design. */
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { useState } from 'react';
export default function ValveDemo() {
    const [position, setPosition] = useState(60);
    return (<section className={"scr"} aria-labelledby={"njcr-h-nq"} id={"nqt02"}>
    <div className={"wrap"}>
    <div className={"nq"}>
    <figure className={"nq-stage rv"}>
    <div className={"nq-img"}>
    <Image src={"/images/cropifai/redesign/c-nqt.webp"} alt={"Najhum wireless smart valve NQT02 with solar panel"} width={"263"} height={"460"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </div>
    <ol className={"nq-pins"}>
    <li className={"nq-pin"} style={{ "left": "12%", "top": "22%" } as CSSProperties}>
    <i>{"1"}</i>
    <span>
    <b>{"Solar and battery power"}</b>
    <em>{"Off-grid, no control cabinet or cabling."}</em>
    </span>
    </li>
    <li className={"nq-pin"} style={{ "left": "62%", "top": "30%" } as CSSProperties}>
    <i>{"2"}</i>
    <span>
    <b>{"Motorised valve control"}</b>
    <em>{"Open, close or hold any position from 0 to 100%."}</em>
    </span>
    </li>
    <li className={"nq-pin"} style={{ "left": "56%", "top": "78%" } as CSSProperties}>
    <i>{"3"}</i>
    <span>
    <b>{"Integrated ultrasonic flow meter"}</b>
    <em>{"Water flow measured as standard."}</em>
    </span>
    </li>
    </ol>
    </figure>
    <div className={"nq-t rv d1"}>
    <p className={"kick"}>{"Najhum hardware · NQT02"}</p>
    <h2 id={"njcr-h-nq"} className={"big"}>{"Najhum wireless "}<span className={"grad"}>{"smart valve."}</span>
    </h2>
    <ul className={"nq-spec"}>
    <li>{"IP67 enclosure"}</li>
    <li>{"Solar or battery power"}</li>
    <li>{"Internal or external antenna"}</li>
    </ul>
    <div className={"nq-live"} aria-label={"Try the valve"}>
    <div className={"nq-lh"}>
    <span className={"lc-live"}>
    <i>
    </i>{"Try it"}</span>
    <b>{"Valve position"}</b>
    <output className={"num"} data-nq={"pos"}>{`${position}%`}</output>
    </div>
    <input type={"range"} min={"0"} max={"100"} step={"5"} data-nq={"in"} aria-label={"Valve position"} value={position} onChange={event => setPosition(Number(event.target.value))} style={{ "--p": `${position}%` } as CSSProperties}/>
    <div className={"nq-lr num"}>
    <div>
    <span>{"Flow"}</span>
    <b data-nq={"flow"}>{`${(18.3 * Math.pow(position / 100, .85)).toFixed(1)} m³/h`}</b>
    </div>
    <div>
    <span>{"Zone"}</span>
    <b data-nq={"zone"}>{position === 0 ? 'Closed' : position < 20 ? 'Trickle' : position === 100 ? 'Full flow' : 'Irrigating'}</b>
    </div>
    <div>
    <span>{"Power"}</span>
    <b>{"Solar 92%"}</b>
    </div>
    </div>
    </div>
    <ul className={"nq-f"}>
    <li>
    <span className={"ic"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Cycle irrigation"}</b>
    <p>{"Start time and duration per cycle."}</p>
    </div>
    </li>
    <li>
    <span className={"ic"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Group control"}</b>
    <p>{"Valves managed in groups by zone."}</p>
    </div>
    </li>
    <li>
    <span className={"ic"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M3 15h4M17 15h4M7 11h10v8H7zM12 11V6M9 6h6"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Sequential task mode"}</b>
    <p>{"Zones one after another when water is limited."}</p>
    </div>
    </li>
    <li>
    <span className={"ic"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Safety alarms"}</b>
    <p>{"Abnormal flow, pressure and sensor faults."}</p>
    </div>
    </li>
    </ul>
    </div>
    </div>
    </div>
    </section>);
}
