/* Layout and illustrations ported from the supplied cropifAI design. */
export default function CropExplorer() {
    return (<section className={"scr"} aria-labelledby={"njcr-h-cp"} id={"cropifai-crops"}>
    <div className={"wrap"}>
    <div className={"c"}>
    <p className={"kick rv"}>{"Built for every crop"}</p>
    <h2 id={"njcr-h-cp"} className={"big rv d1"}>{"From date palms "}<span className={"grad"}>{"to greenhouses."}</span>
    </h2>
    <p className={"sub rv d2"}>{"Pick a crop to see how cropifAI is set up for it."}</p>
    </div>
    <div className={"cq rv"}>
    <div className={"cq-tb"} role={"group"} aria-label={"Crops"}>
    <input className={"sr"} type={"radio"} name={"njcr-cp"} id={"njcr-cp0"} defaultChecked={true}/>
    <label htmlFor={"njcr-cp0"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 21v-9M12 12C12 8 9 5 4 5c0 4 3 7 8 7zM12 10c0-3.5 2.5-6 7-6 0 3.5-2.5 6-7 6z"}>
    </path>
    </svg>
    </span>{"Date palms"}</label>
    <input className={"sr"} type={"radio"} name={"njcr-cp"} id={"njcr-cp1"}/>
    <label htmlFor={"njcr-cp1"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M5 21c0-9 5-15 15-16-1 10-7 15-15 16zM5 21l7-7"}>
    </path>
    </svg>
    </span>{"Greenhouses"}</label>
    <input className={"sr"} type={"radio"} name={"njcr-cp"} id={"njcr-cp2"}/>
    <label htmlFor={"njcr-cp2"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M4 15V8h7l2 4h5a2 2 0 0 1 2 2v3M7 18a3 3 0 1 0 0-.01M18 18a2 2 0 1 0 0-.01M11 8V5"}>
    </path>
    </svg>
    </span>{"Open-field crops"}</label>
    <input className={"sr"} type={"radio"} name={"njcr-cp"} id={"njcr-cp3"}/>
    <label htmlFor={"njcr-cp3"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 21v-9M12 12C12 8 9 5 4 5c0 4 3 7 8 7zM12 10c0-3.5 2.5-6 7-6 0 3.5-2.5 6-7 6z"}>
    </path>
    </svg>
    </span>{"Orchards"}</label>
    <input className={"sr"} type={"radio"} name={"njcr-cp"} id={"njcr-cp4"}/>
    <label htmlFor={"njcr-cp4"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14"}>
    </path>
    </svg>
    </span>{"Landscapes & golf"}</label>
    <input className={"sr"} type={"radio"} name={"njcr-cp"} id={"njcr-cp5"}/>
    <label htmlFor={"njcr-cp5"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 2s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"}>
    </path>
    </svg>
    </span>{"Nurseries"}</label>
    </div>
    <div className={"cq-g"}>
    <figure className={"cq-v"} aria-label={"Illustrative 3D scene of the selected crop"}>
    <div className={"cp3"}>
    </div>
    <figcaption>
    <span className={"lc-live"}>
    <i>
    </i>{"Live"}</span>{"Illustrative"}</figcaption>
    </figure>
    <div className={"cq-ps"}>
    <div className={"cq-p p0"}>
    <p className={"cq-k"}>{"cropifAI for"}</p>
    <h3>{"Date palms"}</h3>
    <p className={"cq-d"}>{"Deep-root drip in sandy soil, with salinity watched before it hurts the yield."}</p>
    <p className={"cq-h"}>{"Sensors we'd fit"}</p>
    <ul className={"cq-s"}>
    <li>{"Soil moisture & EC"}</li>
    <li>{"Multi-depth probes"}</li>
    <li>{"Weather station"}</li>
    <li>{"Flow & tank level"}</li>
    </ul>
    <div className={"cq-r"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"How it irrigates"}</b>
    <small>{"Drip or bubbler rings, zone by zone"}</small>
    </div>
    </div>
    <div className={"cq-r"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"What it watches for"}</b>
    <small>{"Salt build-up, heat stress, failed pumps"}</small>
    </div>
    </div>
    </div>
    <div className={"cq-p p1"}>
    <p className={"cq-k"}>{"cropifAI for"}</p>
    <h3>{"Greenhouses"}</h3>
    <p className={"cq-d"}>{"Tight climate and fertigation control, bench by bench."}</p>
    <p className={"cq-h"}>{"Sensors we'd fit"}</p>
    <ul className={"cq-s"}>
    <li>{"Temperature & humidity"}</li>
    <li>{"CO₂"}</li>
    <li>{"Substrate moisture & EC"}</li>
    <li>{"Water quality"}</li>
    </ul>
    <div className={"cq-r"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"How it irrigates"}</b>
    <small>{"Fertigation and misting on threshold"}</small>
    </div>
    </div>
    <div className={"cq-r"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"What it watches for"}</b>
    <small>{"Heat, humidity spikes, nutrient drift"}</small>
    </div>
    </div>
    </div>
    <div className={"cq-p p2"}>
    <p className={"cq-k"}>{"cropifAI for"}</p>
    <h3>{"Open-field crops"}</h3>
    <p className={"cq-d"}>{"Pivots and drip across large fields, scheduled on soil and weather."}</p>
    <p className={"cq-h"}>{"Sensors we'd fit"}</p>
    <ul className={"cq-s"}>
    <li>{"Soil moisture per field"}</li>
    <li>{"Weather station"}</li>
    <li>{"Satellite NDVI"}</li>
    <li>{"Pump current"}</li>
    </ul>
    <div className={"cq-r"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"How it irrigates"}</b>
    <small>{"Centre pivot or drip, run in sequence"}</small>
    </div>
    </div>
    <div className={"cq-r"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"What it watches for"}</b>
    <small>{"Dry patches, rain to skip, pump faults"}</small>
    </div>
    </div>
    </div>
    <div className={"cq-p p3"}>
    <p className={"cq-k"}>{"cropifAI for"}</p>
    <h3>{"Orchards"}</h3>
    <p className={"cq-d"}>{"Per-row moisture with frost and heat alerts."}</p>
    <p className={"cq-h"}>{"Sensors we'd fit"}</p>
    <ul className={"cq-s"}>
    <li>{"Soil moisture per row"}</li>
    <li>{"Temperature probes"}</li>
    <li>{"Weather station"}</li>
    </ul>
    <div className={"cq-r"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"How it irrigates"}</b>
    <small>{"Drip per row, night-time cycles"}</small>
    </div>
    </div>
    <div className={"cq-r"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"What it watches for"}</b>
    <small>{"Frost risk, heat waves, uneven rows"}</small>
    </div>
    </div>
    </div>
    <div className={"cq-p p4"}>
    <p className={"cq-k"}>{"cropifAI for"}</p>
    <h3>{"Landscapes & golf"}</h3>
    <p className={"cq-d"}>{"Parks, communities and courses watered on need, not on a timer."}</p>
    <p className={"cq-h"}>{"Sensors we'd fit"}</p>
    <ul className={"cq-s"}>
    <li>{"Soil moisture per area"}</li>
    <li>{"Weather station"}</li>
    <li>{"Flow & leak"}</li>
    <li>{"Water quality"}</li>
    </ul>
    <div className={"cq-r"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"How it irrigates"}</b>
    <small>{"Sprinkler zones, run in turn"}</small>
    </div>
    </div>
    <div className={"cq-r"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"What it watches for"}</b>
    <small>{"Leaks, over-watering, rain to skip"}</small>
    </div>
    </div>
    </div>
    <div className={"cq-p p5"}>
    <p className={"cq-k"}>{"cropifAI for"}</p>
    <h3>{"Nurseries"}</h3>
    <p className={"cq-d"}>{"Many small zones, run one after another as the water allows."}</p>
    <p className={"cq-h"}>{"Sensors we'd fit"}</p>
    <ul className={"cq-s"}>
    <li>{"Substrate moisture"}</li>
    <li>{"Temperature & humidity"}</li>
    <li>{"Flow & pressure"}</li>
    </ul>
    <div className={"cq-r"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"How it irrigates"}</b>
    <small>{"Sequential micro-zones"}</small>
    </div>
    </div>
    <div className={"cq-r"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"What it watches for"}</b>
    <small>{"Missed zones, low pressure, heat"}</small>
    </div>
    </div>
    </div>
    <p className={"cq-n"}>{"The final setup is specified after a site survey."}</p>
    </div>
    </div>
    </div>
    </div>
    </section>);
}
