/* Layout and illustrations ported from the supplied cropifAI design. */
export default function Workflow() {
    return (<section className={"scr"} aria-labelledby={"njcr-h-ly"} id={"cropifai-architecture"}>
    <div className={"wrap"}>
    <div className={"c"}>
    <p className={"kick rv"}>{"How cropifAI works"}</p>
    <h2 id={"njcr-h-ly"} className={"big rv d1"}>{"Sense. Think. "}<span className={"grad"}>{"Act."}</span>
    </h2>
    <p className={"sub rv d2"}>{"Whatever is installed on your farm, cropifAI reads it, decides, and acts on it, zone by zone."}</p>
    </div>
    <div className={"hx rv"}>
    <article className={"hx-c"}>
    <p className={"hx-k"}>
    <span>{"01"}</span>{"Sense"}</p>
    <h3>{"Read the field"}</h3>
    <p className={"hx-p"}>{"Sensors chosen for your crop, soil and water."}</p>
    <ul className={"hx-l"}>
    <li>
    <span className={"hx-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 21v-9M12 12C12 8 9 5 4 5c0 4 3 7 8 7zM12 10c0-3.5 2.5-6 7-6 0 3.5-2.5 6-7 6z"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Soil"}</b>
    <small>{"Moisture, temperature, EC, pH or NPK, at one depth or many"}</small>
    </div>
    </li>
    <li>
    <span className={"hx-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M7 15a4 4 0 0 1-.6-8A5.5 5.5 0 0 1 17 5.5 4.5 4.5 0 0 1 17.5 15M8 19l-1 2M12 18l-1 3M16 19l-1 2"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Weather"}</b>
    <small>{"Wind, rain, humidity and sun"}</small>
    </div>
    </li>
    <li>
    <span className={"hx-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 2s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Water"}</b>
    <small>{"Flow, pressure and tank level"}</small>
    </div>
    </li>
    <li>
    <span className={"hx-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M13 2 4 14h7l-1 8 9-12h-7l1-8z"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Pumps & power"}</b>
    <small>{"Motor current, generators and energy"}</small>
    </div>
    </li>
    <li>
    <span className={"hx-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M13 7 9 3 5 7l4 4M17 11l4 4-4 4-4-4M8 12l4 4M14.5 9.5l-5 5M3 21c0-3 2-5 5-5"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Crop health"}</b>
    <small>{"Satellite NDVI and canopy stress"}</small>
    </div>
    </li>
    </ul>
    </article>
    <i className={"hx-flow"} aria-hidden={"true"}>
    <i>
    </i>
    <i>
    </i>
    <i>
    </i>
    </i>
    <article className={"hx-c hx-ai"}>
    <p className={"hx-k"}>
    <span>{"02"}</span>{"Think"}</p>
    <h3>{"cropifAI decides"}</h3>
    <p className={"hx-p"}>{"Every reading, the forecast and satellite data, combined per zone."}</p>
    <ul className={"hx-d"}>
    <li className={"ok"}>
    <i>
    </i>
    <div>
    <b>{"Irrigate Zone B"}</b>
    <small>{"05:30 · 40 min · soil 23%"}</small>
    </div>
    </li>
    <li className={"wait"}>
    <i>
    </i>
    <div>
    <b>{"Skip Zone D"}</b>
    <small>{"8 mm rain forecast tonight"}</small>
    </div>
    </li>
    <li className={"amb"}>
    <i>
    </i>
    <div>
    <b>{"Stress in Field 3"}</b>
    <small>{"NDVI drop · check rows 12–18"}</small>
    </div>
    </li>
    <li className={"hot"}>
    <i>
    </i>
    <div>
    <b>{"Pump P1 fault"}</b>
    <small>{"Valve open, no flow"}</small>
    </div>
    </li>
    </ul>
    <p className={"hx-live"}>
    <i>
    </i>{"Live decisions · illustrative"}</p>
    </article>
    <i className={"hx-flow"} aria-hidden={"true"}>
    <i>
    </i>
    <i>
    </i>
    <i>
    </i>
    </i>
    <article className={"hx-c"}>
    <p className={"hx-k"}>
    <span>{"03"}</span>{"Act"}</p>
    <h3>{"The farm responds"}</h3>
    <p className={"hx-p"}>{"On schedule, on threshold, or from the dashboard."}</p>
    <ul className={"hx-l"}>
    <li>
    <span className={"hx-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M3 15h4M17 15h4M7 11h10v8H7zM12 11V6M9 6h6"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Smart valves"}</b>
    <small>{"Open, close or hold 0–100%"}</small>
    </div>
    </li>
    <li>
    <span className={"hx-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 21a9 9 0 1 1 9-9M12 12l4-4M3 12h2M12 3v2M19 12h2"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Pumps & controllers"}</b>
    <small>{"Start, stop and run zones in turn"}</small>
    </div>
    </li>
    <li>
    <span className={"hx-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Alerts"}</b>
    <small>{"Dashboard, SMS, email or call"}</small>
    </div>
    </li>
    <li>
    <span className={"hx-i"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Reports"}</b>
    <small>{"Water, yield and ESG, in a click"}</small>
    </div>
    </li>
    </ul>
    </article>
    </div>
    <p className={"hx-note rv"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"}>
    </path>
    <rect x={"9"} y={"2.5"} width={"6"} height={"3.5"} rx={"1"}>
    </rect>
    <path d={"m9 13 2 2 4-4"}>
    </path>
    </svg>
    </span>
    <span>
    <b>{"Built for your site."}</b>{" We survey the farm first: soil, crop, water source, power and coverage. Then we specify the sensors, depths and controllers it needs. No two setups are the same."}</span>
    </p>
    </div>
    </section>);
}
