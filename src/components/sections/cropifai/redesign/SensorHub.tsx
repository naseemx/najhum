'use client';
/* Layout and illustrations ported from the supplied cropifAI design. */
import Image from 'next/image';
import { useState } from 'react';
export default function SensorHub() {
    const [connected, setConnected] = useState<number[]>([]);
    const [last, setLast] = useState('Irrigation core online');
    function toggle(index: number, name: string) { const enabled = !connected.includes(index); setConnected(previous => enabled ? [...previous, index] : previous.filter(value => value !== index)); setLast(name + (enabled ? ' connected' : ' disconnected')); }
    return (<section className={"scr"} aria-labelledby={"njcr-h-ea"} id={"cropifai-ecosystem"}>
    <div className={"wrap"}>
    <div className={"c"}>
    <p className={"kick rv"}>{"One platform, any sensor"}</p>
    <h2 id={"njcr-h-ea"} className={"big rv d1"}>{"Start with irrigation. "}<span className={"grad"}>{"Add the whole farm."}</span>
    </h2>
    <p className={"sub rv d2"}>{"The same gateway and the same dashboard carry every other system on the farm. Tap one to plug it in."}</p>
    </div>
    <div className={"eb rv"} data-hub={""}>
    <button type={"button"} className={"eb-n t" + (connected.includes(0) ? ' on' : '')} data-hub-i={"0"} aria-pressed={connected.includes(0)} data-v={"3.4 °C"} data-name={"Cold room temperature"} onClick={() => toggle(0, "Cold room temperature")}>
    <span className={"eb-img"}>
    <Image src={"/images/cropifai/redesign/h-th.webp"} alt={""} width={"667"} height={"700"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </span>
    <span className={"eb-t"}>
    <b>{"Cold room temperature"}</b>
    <small className={"eb-w"}>{"Packhouse cold room"}</small>
    <small className={"eb-v num"}>
    <i>
    </i>{"3.4 °C"}</small>
    </span>
    <span className={"eb-st"} aria-hidden={"true"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} strokeLinejoin={"round"}>
    <path className={"p"} d={"M12 5v14M5 12h14"}>
    </path>
    <path className={"k"} d={"m5 12 5 5 9-10"}>
    </path>
    </svg>
    </span>
    </button>
    <button type={"button"} className={"eb-n t" + (connected.includes(1) ? ' on' : '')} data-hub-i={"1"} aria-pressed={connected.includes(1)} data-v={"68%"} data-name={"Water tank level"} onClick={() => toggle(1, "Water tank level")}>
    <span className={"eb-img"}>
    <Image src={"/images/cropifai/redesign/x-level.webp"} alt={""} width={"330"} height={"243"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </span>
    <span className={"eb-t"}>
    <b>{"Water tank level"}</b>
    <small className={"eb-w"}>{"Overhead tank"}</small>
    <small className={"eb-v num"}>
    <i>
    </i>{"68%"}</small>
    </span>
    <span className={"eb-st"} aria-hidden={"true"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} strokeLinejoin={"round"}>
    <path className={"p"} d={"M12 5v14M5 12h14"}>
    </path>
    <path className={"k"} d={"m5 12 5 5 9-10"}>
    </path>
    </svg>
    </span>
    </button>
    <button type={"button"} className={"eb-n t" + (connected.includes(2) ? ' on' : '')} data-hub-i={"2"} aria-pressed={connected.includes(2)} data-v={"Standby · 412 h"} data-name={"Generator & machine data"} onClick={() => toggle(2, "Generator & machine data")}>
    <span className={"eb-img"}>
    <Image src={"/images/cropifai/redesign/x-ctrl.webp"} alt={""} width={"420"} height={"222"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </span>
    <span className={"eb-t"}>
    <b>{"Generator & machine data"}</b>
    <small className={"eb-w"}>{"IoT controller · Modbus, RS485, PLC"}</small>
    <small className={"eb-v num"}>
    <i>
    </i>{"Standby · 412 h"}</small>
    </span>
    <span className={"eb-st"} aria-hidden={"true"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} strokeLinejoin={"round"}>
    <path className={"p"} d={"M12 5v14M5 12h14"}>
    </path>
    <path className={"k"} d={"m5 12 5 5 9-10"}>
    </path>
    </svg>
    </span>
    </button>
    <button type={"button"} className={"eb-n t" + (connected.includes(3) ? ' on' : '')} data-hub-i={"3"} aria-pressed={connected.includes(3)} data-v={"Running · 14 A"} data-name={"Pump & motor control"} onClick={() => toggle(3, "Pump & motor control")}>
    <span className={"eb-img"}>
    <Image src={"/images/cropifai/redesign/e-act.webp"} alt={""} width={"525"} height={"560"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </span>
    <span className={"eb-t"}>
    <b>{"Pump & motor control"}</b>
    <small className={"eb-w"}>{"Three-phase actuator · borehole pump"}</small>
    <small className={"eb-v num"}>
    <i>
    </i>{"Running · 14 A"}</small>
    </span>
    <span className={"eb-st"} aria-hidden={"true"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} strokeLinejoin={"round"}>
    <path className={"p"} d={"M12 5v14M5 12h14"}>
    </path>
    <path className={"k"} d={"m5 12 5 5 9-10"}>
    </path>
    </svg>
    </span>
    </button>
    <i className={"eb-c u" + (connected.includes(0) ? ' on' : '')} data-hub-p={"0"} aria-hidden={"true"}>
    <i>
    </i>
    </i>
    <i className={"eb-c u" + (connected.includes(1) ? ' on' : '')} data-hub-p={"1"} aria-hidden={"true"}>
    <i>
    </i>
    </i>
    <i className={"eb-c u" + (connected.includes(2) ? ' on' : '')} data-hub-p={"2"} aria-hidden={"true"}>
    <i>
    </i>
    </i>
    <i className={"eb-c u" + (connected.includes(3) ? ' on' : '')} data-hub-p={"3"} aria-hidden={"true"}>
    <i>
    </i>
    </i>
    <div className={"eb-bar"} aria-live={"polite"}>
    <div className={"eb-id"}>
    <Image className={"eb-logo"} src={"/images/cropifai/redesign/l-cropifai.webp"} alt={"cropifAI"} width={"372"} height={"188"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    <span className={"eb-live"}>
    <i>
    </i>{"Live"}</span>
    </div>
    <p className={"eb-cnt num"}>
    <b data-hub-n={""}>{3 + connected.length}</b>
    <span>{"systems"}<br />{"on one dashboard"}</span>
    </p>
    <div className={"eb-mid"}>
    <ul className={"eb-core"}>
    <li>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 21v-9M12 12C12 8 9 5 4 5c0 4 3 7 8 7zM12 10c0-3.5 2.5-6 7-6 0 3.5-2.5 6-7 6z"}>
    </path>
    </svg>{"Soil"}</li>
    <li>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M3 15h4M17 15h4M7 11h10v8H7zM12 11V6M9 6h6"}>
    </path>
    </svg>{"Valves"}</li>
    <li>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M7 15a4 4 0 0 1-.6-8A5.5 5.5 0 0 1 17 5.5 4.5 4.5 0 0 1 17.5 15M8 19l-1 2M12 18l-1 3M16 19l-1 2"}>
    </path>
    </svg>{"Weather"}</li>
    </ul>
    <p className={"eb-last"} data-hub-last={""}>{last}</p>
    </div>
    <div className={"eb-ctl"}>
    <button type={"button"} className={"eb-all"} data-hub-all={""} onClick={() => { setConnected([0, 1, 2, 3, 4, 5, 6, 7]); setLast('All systems connected'); }}>{"Connect all"}</button>
    <button type={"button"} className={"eb-rst"} data-hub-reset={""} onClick={() => { setConnected([]); setLast('Irrigation core online'); }}>{"Reset"}</button>
    </div>
    </div>
    <i className={"eb-c d" + (connected.includes(4) ? ' on' : '')} data-hub-p={"4"} aria-hidden={"true"}>
    <i>
    </i>
    </i>
    <i className={"eb-c d" + (connected.includes(5) ? ' on' : '')} data-hub-p={"5"} aria-hidden={"true"}>
    <i>
    </i>
    </i>
    <i className={"eb-c d" + (connected.includes(6) ? ' on' : '')} data-hub-p={"6"} aria-hidden={"true"}>
    <i>
    </i>
    </i>
    <i className={"eb-c d" + (connected.includes(7) ? ' on' : '')} data-hub-p={"7"} aria-hidden={"true"}>
    <i>
    </i>
    </i>
    <button type={"button"} className={"eb-n b" + (connected.includes(4) ? ' on' : '')} data-hub-i={"4"} aria-pressed={connected.includes(4)} data-v={"62% · 1,240 L"} data-name={"Fuel level"} onClick={() => toggle(4, "Fuel level")}>
    <span className={"eb-img"}>
    <Image src={"/images/cropifai/redesign/e-fuelsensor.webp"} alt={""} width={"560"} height={"507"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </span>
    <span className={"eb-t"}>
    <b>{"Fuel level"}</b>
    <small className={"eb-w"}>{"Generator diesel tank"}</small>
    <small className={"eb-v num"}>
    <i>
    </i>{"62% · 1,240 L"}</small>
    </span>
    <span className={"eb-st"} aria-hidden={"true"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} strokeLinejoin={"round"}>
    <path className={"p"} d={"M12 5v14M5 12h14"}>
    </path>
    <path className={"k"} d={"m5 12 5 5 9-10"}>
    </path>
    </svg>
    </span>
    </button>
    <button type={"button"} className={"eb-n b" + (connected.includes(5) ? ' on' : '')} data-hub-i={"5"} aria-pressed={connected.includes(5)} data-v={"Dry"} data-name={"Leak detection"} onClick={() => toggle(5, "Leak detection")}>
    <span className={"eb-img"}>
    <Image src={"/images/cropifai/redesign/e-leak.webp"} alt={""} width={"520"} height={"306"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </span>
    <span className={"eb-t"}>
    <b>{"Leak detection"}</b>
    <small className={"eb-w"}>{"Pump room"}</small>
    <small className={"eb-v num"}>
    <i>
    </i>{"Dry"}</small>
    </span>
    <span className={"eb-st"} aria-hidden={"true"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} strokeLinejoin={"round"}>
    <path className={"p"} d={"M12 5v14M5 12h14"}>
    </path>
    <path className={"k"} d={"m5 12 5 5 9-10"}>
    </path>
    </svg>
    </span>
    </button>
    <button type={"button"} className={"eb-n b" + (connected.includes(6) ? ' on' : '')} data-hub-i={"6"} aria-pressed={connected.includes(6)} data-v={"12 tracked"} data-name={"Asset tracking"} onClick={() => toggle(6, "Asset tracking")}>
    <span className={"eb-img"}>
    <Image src={"/images/cropifai/redesign/e-tag.webp"} alt={""} width={"285"} height={"520"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </span>
    <span className={"eb-t"}>
    <b>{"Asset tracking"}</b>
    <small className={"eb-w"}>{"Tractors and tools"}</small>
    <small className={"eb-v num"}>
    <i>
    </i>{"12 tracked"}</small>
    </span>
    <span className={"eb-st"} aria-hidden={"true"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} strokeLinejoin={"round"}>
    <path className={"p"} d={"M12 5v14M5 12h14"}>
    </path>
    <path className={"k"} d={"m5 12 5 5 9-10"}>
    </path>
    </svg>
    </span>
    </button>
    <button type={"button"} className={"eb-n b" + (connected.includes(7) ? ' on' : '')} data-hub-i={"7"} aria-pressed={connected.includes(7)} data-v={"26 °C · CO₂ 620 ppm"} data-name={"Greenhouse climate"} onClick={() => toggle(7, "Greenhouse climate")}>
    <span className={"eb-img"}>
    <Image src={"/images/cropifai/redesign/e-iaq.webp"} alt={""} width={"494"} height={"560"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </span>
    <span className={"eb-t"}>
    <b>{"Greenhouse climate"}</b>
    <small className={"eb-w"}>{"IAQ sensor · greenhouse 2"}</small>
    <small className={"eb-v num"}>
    <i>
    </i>{"26 °C · CO₂ 620 ppm"}</small>
    </span>
    <span className={"eb-st"} aria-hidden={"true"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} strokeLinejoin={"round"}>
    <path className={"p"} d={"M12 5v14M5 12h14"}>
    </path>
    <path className={"k"} d={"m5 12 5 5 9-10"}>
    </path>
    </svg>
    </span>
    </button>
    </div>
    <p className={"eb-ft rv"}>{"Same gateway · same alerts · same reports · same login"}</p>
    </div>
    </section>);
}
