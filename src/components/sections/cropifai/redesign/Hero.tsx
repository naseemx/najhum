/* Layout and illustrations ported from the supplied cropifAI design. */
import Image from 'next/image';
export default function Hero() {
    return (<section className={"hero pd"} aria-labelledby={"njcr-h1"} id={"cropifai-hero"}>
    <div className={"wrap pd-g"}>
    <div className={"pd-l"}>
    <p className={"pd-brand rv"}>
    <Image className={"pd-logo"} src={"/images/cropifai/redesign/l-cropifai.webp"} alt={"cropifAI"} width={"372"} height={"188"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    <span className={"pd-by"}>{"by Najhum"}</span>
    </p>
    <h1 id={"njcr-h1"} className={"pd-h rv d1"}>{"Precision agritech."}<br />
    <span>{"Climate AI."}</span>
    </h1>
    <p className={"pd-sub rv d2"}>{"cropifAI senses every root zone, decides when to water and opens the valves itself. One platform for soil, weather, water and yield, built to run off-grid."}</p>
    <div className={"pd-btns rv d3"}>
    <a className={"pbtn"} href={"/contact"}>{"Book a cropifAI demo "}<svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M5 12h14M13 6l6 6-6 6"}>
    </path>
    </svg>
    </a>
    <a className={"pghost"} href={"#njcr-tour"}>{"Take the field tour"}</a>
    </div>
    <ul className={"pd-chips rv d3"}>
    <li>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M12 21v-9M12 12C12 8 9 5 4 5c0 4 3 7 8 7zM12 10c0-3.5 2.5-6 7-6 0 3.5-2.5 6-7 6z"}>
    </path>
    </svg>
    </span>{"Soil sensors for any crop"}</li>
    <li>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M3 15h4M17 15h4M7 11h10v8H7zM12 11V6M9 6h6"}>
    </path>
    </svg>
    </span>{"Solar smart valves"}</li>
    <li>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M7 15a4 4 0 0 1-.6-8A5.5 5.5 0 0 1 17 5.5 4.5 4.5 0 0 1 17.5 15M8 19l-1 2M12 18l-1 3M16 19l-1 2"}>
    </path>
    </svg>
    </span>{"Weather & rain"}</li>
    <li>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M13 7 9 3 5 7l4 4M17 11l4 4-4 4-4-4M8 12l4 4M14.5 9.5l-5 5M3 21c0-3 2-5 5-5"}>
    </path>
    </svg>
    </span>{"Off-grid LPWAN"}</li>
    </ul>
    </div>
    <div className={"pd-r rv d2"}>
    <div className={"pd-stage"}>
    <i className={"pd-ring r1"} aria-hidden={"true"}>
    </i>
    <i className={"pd-ring r2"} aria-hidden={"true"}>
    </i>
    <i className={"pd-ring r3"} aria-hidden={"true"}>
    </i>
    <figure className={"pd-dev v"}>
    <Image src={"/images/cropifai/redesign/c-nqt.webp"} alt={"Najhum NQT02 solar smart valve"} width={"263"} height={"460"} fetchPriority={"high"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"} loading={"eager"}/>
    <figcaption>
    <b>{"NQT02 smart valve"}</b>
    <span>{"0–100% · solar"}</span>
    </figcaption>
    </figure>
    <figure className={"pd-dev s"}>
    <Image src={"/images/cropifai/redesign/c-soil.webp"} alt={"Najhum wireless soil sensor"} width={"893"} height={"735"} fetchPriority={"high"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"} loading={"eager"}/>
    <figcaption>
    <b>{"Soil sensors"}</b>
    <span>{"Moisture · EC · pH · more"}</span>
    </figcaption>
    </figure>
    <figure className={"pd-dev w"}>
    <Image src={"/images/cropifai/redesign/c-weather.webp"} alt={"Field weather station"} width={"565"} height={"351"} fetchPriority={"high"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"} loading={"eager"}/>
    <figcaption>
    <b>{"Weather station"}</b>
    <span>{"Wind · rain · sun"}</span>
    </figcaption>
    </figure>
    <div className={"pd-app"} aria-label={"cropifAI dashboard card, illustrative"}>
    <p className={"pd-ak"}>
    <i>
    </i>{"cropifAI · Zone A"}</p>
    <p className={"pd-av"}>
    <b className={"num"}>{"27%"}</b>
    <span>{"soil at 30 cm"}</span>
    </p>
    <svg className={"pd-sp"} viewBox={"0 0 120 34"} preserveAspectRatio={"none"} aria-hidden={"true"}>
    <path d={"M0 8 L15 12 L30 15 L45 19 L60 22 L72 25 L80 9 L95 11 L110 14 L120 16"} fill={"none"} stroke={"#16A34A"} strokeWidth={"2.2"} strokeLinejoin={"round"}>
    </path>
    <path d={"M0 26 H120"} stroke={"#F59E0B"} strokeWidth={"1.2"} strokeDasharray={"3 3"}>
    </path>
    </svg>
    <p className={"pd-adv"}>
    <b>{"Irrigate 05:30 · 40 min"}</b>
    <span>{"Valve opens by itself"}</span>
    </p>
    </div>
    </div>
    </div>
    </div>
    </section>);
}
