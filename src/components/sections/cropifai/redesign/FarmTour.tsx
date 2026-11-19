/* Layout and illustrations ported from the supplied cropifAI design. */
export default function FarmTour() {
    return (<section className={"pd-tour"} id={"njcr-tour"} aria-label={"Field tour"}>
    <div className={"wrap"}>
    <figure className={"ph-twin"} aria-label={"Live 3D twin of a farm: zones coloured by soil moisture, valves irrigating in turn"}>
    <div className={"bx-map ph-map"}>
    <div className={"sc-i s0"}>
    <div className={"ph-fb"} aria-hidden={"true"}>
    </div>
    </div>
    </div>
    <ul className={"ph-kpi"}>
    <li>
    <span className={"hk-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 21v-9M12 12C12 8 9 5 4 5c0 4 3 7 8 7zM12 10c0-3.5 2.5-6 7-6 0 3.5-2.5 6-7 6z"}>
    </path>
    </svg>
    </span>
    <span>
    <small>{"Zone A soil, 30 cm"}</small>
    <b className={"num"}>{"27%"}</b>
    </span>
    <i className={"xb"}>
    </i>
    </li>
    <li>
    <span className={"hk-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M3 15h4M17 15h4M7 11h10v8H7zM12 11V6M9 6h6"}>
    </path>
    </svg>
    </span>
    <span>
    <small>{"Valves open"}</small>
    <b className={"num"}>{"2 of 6"}</b>
    </span>
    <i className={"xg"}>
    </i>
    </li>
    <li>
    <span className={"hk-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 2s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"}>
    </path>
    </svg>
    </span>
    <span>
    <small>{"Water today"}</small>
    <b className={"num"}>{"212 m³"}</b>
    </span>
    <i className={"xb"}>
    </i>
    </li>
    <li>
    <span className={"hk-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M7 15a4 4 0 0 1-.6-8A5.5 5.5 0 0 1 17 5.5 4.5 4.5 0 0 1 17.5 15M8 19l-1 2M12 18l-1 3M16 19l-1 2"}>
    </path>
    </svg>
    </span>
    <span>
    <small>{"Rain forecast"}</small>
    <b className={"num"}>{"8 mm tonight"}</b>
    </span>
    <i className={"xa"}>
    </i>
    </li>
    </ul>
    <div className={"ph-ft"} role={"group"} aria-label={"Field tour"}>
    <input className={"sr"} type={"radio"} name={"njcr-ft"} id={"njcr-ft0"} defaultChecked={true}/>
    <label htmlFor={"njcr-ft0"}>
    <span className={"num"}>{"0"}</span>{"Overview"}</label>
    <input className={"sr"} type={"radio"} name={"njcr-ft"} id={"njcr-ft1"}/>
    <label htmlFor={"njcr-ft1"}>
    <span className={"num"}>{"1"}</span>{"Soil"}</label>
    <input className={"sr"} type={"radio"} name={"njcr-ft"} id={"njcr-ft2"}/>
    <label htmlFor={"njcr-ft2"}>
    <span className={"num"}>{"2"}</span>{"Weather"}</label>
    <input className={"sr"} type={"radio"} name={"njcr-ft"} id={"njcr-ft3"}/>
    <label htmlFor={"njcr-ft3"}>
    <span className={"num"}>{"3"}</span>{"Valves"}</label>
    <input className={"sr"} type={"radio"} name={"njcr-ft"} id={"njcr-ft4"}/>
    <label htmlFor={"njcr-ft4"}>
    <span className={"num"}>{"4"}</span>{"Water"}</label>
    <input className={"sr"} type={"radio"} name={"njcr-ft"} id={"njcr-ft5"}/>
    <label htmlFor={"njcr-ft5"}>
    <span className={"num"}>{"5"}</span>{"Gateway"}</label>
    <input className={"sr"} type={"radio"} name={"njcr-ft"} id={"njcr-ft6"}/>
    <label htmlFor={"njcr-ft6"}>
    <span className={"num"}>{"6"}</span>{"Dashboard & AI"}</label>
    </div>
    <div className={"ph-tc"}>
    <div className={"ph-c c0"}>
    <p className={"ph-ck num"}>{"Field tour"}</p>
    <b>{"A farm on cropifAI"}</b>
    <p>{"Six irrigation zones, each coloured by soil moisture. Valves water the zones in turn, as the soil needs it."}</p>
    </div>
    <div className={"ph-c c1"}>
    <p className={"ph-ck num"}>{"Field tour · 1 of 6"}</p>
    <b>{"Soil sensors in the root zone"}</b>
    <p>{"Probes chosen for your crop and soil read moisture, temperature, EC and more, at the depths that matter, and report wirelessly."}</p>
    </div>
    <div className={"ph-c c2"}>
    <p className={"ph-ck num"}>{"Field tour · 2 of 6"}</p>
    <b>{"Field weather station"}</b>
    <p>{"Wind, temperature, humidity, rain and sun. Rain forecast? Tomorrow’s irrigation waits."}</p>
    </div>
    <div className={"ph-c c3"}>
    <p className={"ph-ck num"}>{"Field tour · 3 of 6"}</p>
    <b>{"Solar smart valves"}</b>
    <p>{"Each zone has a valve that opens, closes or holds any position from 0 to 100%, with no cabling."}</p>
    </div>
    <div className={"ph-c c4"}>
    <p className={"ph-ck num"}>{"Field tour · 4 of 6"}</p>
    <b>{"Tanks, pumps and flow"}</b>
    <p>{"Reservoir level, pump current and flow per zone. A valve open with no flow is flagged at once."}</p>
    </div>
    <div className={"ph-c c5"}>
    <p className={"ph-ck num"}>{"Field tour · 5 of 6"}</p>
    <b>{"One gateway, up to 15 km"}</b>
    <p>{"Every device reports over LPWAN to one gateway, and commands come back the same way."}</p>
    </div>
    <div className={"ph-c c6"}>
    <p className={"ph-ck num"}>{"Field tour · 6 of 6"}</p>
    <b>{"cropifAI decides and acts"}</b>
    <p>{"The cloud combines soil, weather and NDVI, sends advice and alerts to the dashboard, and runs the valves."}</p>
    </div>
    </div>
    <figcaption className={"ph-cap"}>
    <span className={"lc-live"}>
    <i>
    </i>{"Live twin"}</span>{"Drag to rotate · illustrative farm"}</figcaption>
    </figure>
    </div>
    </section>);
}
