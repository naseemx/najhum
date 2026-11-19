'use client';
/* Layout and illustrations ported from the supplied cropifAI design. */
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { useHardwareRail } from './interactions';
export default function HardwareRail() {
    const { track, rail, updateRail, scrollRail, onRailKey } = useHardwareRail();
    return (<section className={"scr alt"} aria-labelledby={"njcr-h-hw"} id={"cropifai-hardware"}>
    <div className={"wrap"}>
    <div className={"c"}>
    <p className={"kick rv"}>{"The hardware family"}</p>
    <h2 id={"njcr-h-hw"} className={"big rv d1"}>{"Built for the field. "}<span className={"grad"}>{"Chosen for your site."}</span>
    </h2>
    <p className={"sub rv d2"}>{"Soil, water, climate, weather and control. We pick the devices after a site survey, and every one reports to the same cropifAI platform."}</p>
    </div>
    <div className={"hr rv"} data-rail={""}>
    <ul className={"hr-t"} tabIndex={0} aria-label={"Hardware family, scroll sideways"} ref={track} onScroll={updateRail} onKeyDown={onRailKey}>
    <li className={"hr-c"} aria-roledescription={"slide"} aria-label={"1 of 6: Soil sensors"}>
    <div className={"hr-img"}>
    <span className={"hr-k"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 21v-9M12 12C12 8 9 5 4 5c0 4 3 7 8 7zM12 10c0-3.5 2.5-6 7-6 0 3.5-2.5 6-7 6z"}>
    </path>
    </svg>{"Soil"}</span>
    <Image src={"/images/cropifai/redesign/c-soil.webp"} alt={"Soil sensors"} width={"893"} height={"735"} loading={"lazy"} decoding={"async"} style={{ "--s": "1.0" } as CSSProperties} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </div>
    <div className={"hr-b"}>
    <h3>{"Soil sensors"}</h3>
    <p className={"hr-d"}>{"Wireless probes chosen for your crop and soil. Shown: NSM-500."}</p>
    <dl className={"hr-s"}>
    <div>
    <dt>{"Measures"}</dt>
    <dd>{"Moisture, temperature, EC"}</dd>
    </div>
    <div>
    <dt>{"Options"}</dt>
    <dd>{"Multi-depth, pH, NPK"}</dd>
    </div>
    <div>
    <dt>{"Key spec"}</dt>
    <dd>{"IP68 probe · EC to 20,000 µS/cm"}</dd>
    </div>
    </dl>
    </div>
    </li>
    <li className={"hr-c"} aria-roledescription={"slide"} aria-label={"2 of 6: Water quality sensors"}>
    <div className={"hr-img"}>
    <span className={"hr-k"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 2s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"}>
    </path>
    </svg>{"Water"}</span>
    <Image src={"/images/cropifai/redesign/h-wq.webp"} alt={"Water quality sensors"} width={"820"} height={"678"} loading={"lazy"} decoding={"async"} style={{ "--s": "1.0" } as CSSProperties} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </div>
    <div className={"hr-b"}>
    <h3>{"Water quality sensors"}</h3>
    <p className={"hr-d"}>{"Know what goes into the drip lines and the tanks."}</p>
    <dl className={"hr-s"}>
    <div>
    <dt>{"Measures"}</dt>
    <dd>{"pH, dissolved oxygen, turbidity"}</dd>
    </div>
    <div>
    <dt>{"Best for"}</dt>
    <dd>{"Reservoirs, fertigation tanks, ponds"}</dd>
    </div>
    <div>
    <dt>{"Alerts"}</dt>
    <dd>{"Drift and out-of-range readings"}</dd>
    </div>
    </dl>
    </div>
    </li>
    <li className={"hr-c"} aria-roledescription={"slide"} aria-label={"3 of 6: NPT-500 temperature probe"}>
    <div className={"hr-img"}>
    <span className={"hr-k"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"}>
    </path>
    </svg>{"Temperature"}</span>
    <Image src={"/images/cropifai/redesign/h-temp.webp"} alt={"NPT-500 temperature probe"} width={"436"} height={"460"} loading={"lazy"} decoding={"async"} style={{ "--s": "0.92" } as CSSProperties} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </div>
    <div className={"hr-b"}>
    <h3>{"NPT-500 temperature probe"}</h3>
    <p className={"hr-d"}>{"A stainless PT100 probe for liquids, soil and cold storage."}</p>
    <dl className={"hr-s"}>
    <div>
    <dt>{"Measures"}</dt>
    <dd>{"Temperature (PT100)"}</dd>
    </div>
    <div>
    <dt>{"Range"}</dt>
    <dd>{"−200 to +800 °C · ±0.5 °C"}</dd>
    </div>
    <div>
    <dt>{"Battery"}</dt>
    <dd>{"Up to 10 years"}</dd>
    </div>
    </dl>
    </div>
    </li>
    <li className={"hr-c"} aria-roledescription={"slide"} aria-label={"4 of 6: NTH-300 temperature and humidity"}>
    <div className={"hr-img"}>
    <span className={"hr-k"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M5 21c0-9 5-15 15-16-1 10-7 15-15 16zM5 21l7-7"}>
    </path>
    </svg>{"Climate"}</span>
    <Image src={"/images/cropifai/redesign/h-th.webp"} alt={"NTH-300 temperature and humidity"} width={"667"} height={"700"} loading={"lazy"} decoding={"async"} style={{ "--s": "0.78" } as CSSProperties} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </div>
    <div className={"hr-b"}>
    <h3>{"NTH-300 temperature & humidity"}</h3>
    <p className={"hr-d"}>{"For greenhouses, packhouses, cold rooms and stores."}</p>
    <dl className={"hr-s"}>
    <div>
    <dt>{"Measures"}</dt>
    <dd>{"Temperature and humidity"}</dd>
    </div>
    <div>
    <dt>{"Accuracy"}</dt>
    <dd>{"±0.3 °C · ±3% RH"}</dd>
    </div>
    <div>
    <dt>{"Build"}</dt>
    <dd>{"IP67 · up to 10 km range"}</dd>
    </div>
    </dl>
    </div>
    </li>
    <li className={"hr-c"} aria-roledescription={"slide"} aria-label={"5 of 6: NWT-506 weather station"}>
    <div className={"hr-img"}>
    <span className={"hr-k"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M7 15a4 4 0 0 1-.6-8A5.5 5.5 0 0 1 17 5.5 4.5 4.5 0 0 1 17.5 15M8 19l-1 2M12 18l-1 3M16 19l-1 2"}>
    </path>
    </svg>{"Weather"}</span>
    <Image src={"/images/cropifai/redesign/c-weather.webp"} alt={"NWT-506 weather station"} width={"565"} height={"351"} loading={"lazy"} decoding={"async"} style={{ "--s": "1.0" } as CSSProperties} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </div>
    <div className={"hr-b"}>
    <h3>{"NWT-506 weather station"}</h3>
    <p className={"hr-d"}>{"Six-in-one, ultrasonic, with no moving parts to wear in dust."}</p>
    <dl className={"hr-s"}>
    <div>
    <dt>{"Measures"}</dt>
    <dd>{"Wind, rain, temp, RH, pressure"}</dd>
    </div>
    <div>
    <dt>{"Power"}</dt>
    <dd>{"15 W solar with battery"}</dd>
    </div>
    <div>
    <dt>{"Placed"}</dt>
    <dd>{"Field edge, one per site"}</dd>
    </div>
    </dl>
    </div>
    </li>
    <li className={"hr-c"} aria-roledescription={"slide"} aria-label={"6 of 6: Valve and flow controllers"}>
    <div className={"hr-img"}>
    <span className={"hr-k"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M3 15h4M17 15h4M7 11h10v8H7zM12 11V6M9 6h6"}>
    </path>
    </svg>{"Control"}</span>
    <Image src={"/images/cropifai/redesign/c-flow.webp"} alt={"Valve and flow controllers"} width={"565"} height={"528"} loading={"lazy"} decoding={"async"} style={{ "--s": "1.0" } as CSSProperties} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </div>
    <div className={"hr-b"}>
    <h3>{"Valve & flow controllers"}</h3>
    <p className={"hr-d"}>{"Solar smart valves, solenoid controllers and flow control."}</p>
    <dl className={"hr-s"}>
    <div>
    <dt>{"Controls"}</dt>
    <dd>{"Valves 0–100%, solenoids, flow"}</dd>
    </div>
    <div>
    <dt>{"Power"}</dt>
    <dd>{"Solar and battery"}</dd>
    </div>
    <div>
    <dt>{"Runs"}</dt>
    <dd>{"Zones in turn, on schedule or threshold"}</dd>
    </div>
    </dl>
    <a className={"hr-more"} href={"#njcr-h-nq"}>{"Meet the NQT02 smart valve "}<svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M5 12h14M13 6l6 6-6 6"}>
    </path>
    </svg>
    </a>
    </div>
    </li>
    </ul>
    <div className={"hr-ctl"}>
    <span className={"hr-n num"} data-rail-n={""}>{rail.label}</span>
    <i className={"hr-bar"} aria-hidden={"true"}>
    <i data-rail-bar={""} style={{ width: `${rail.progress}%` } as CSSProperties}>
    </i>
    </i>
    <button type={"button"} className={"hr-btn"} data-rail-prev={""} aria-label={"Previous devices"} onClick={() => scrollRail(-1)} disabled={rail.start}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"m15 6-6 6 6 6"}>
    </path>
    </svg>
    </button>
    <button type={"button"} className={"hr-btn"} data-rail-next={""} aria-label={"Next devices"} onClick={() => scrollRail(1)} disabled={rail.end}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"m9 6 6 6-6 6"}>
    </path>
    </svg>
    </button>
    </div>
    </div>
    </div>
    </section>);
}
