/* Layout and illustrations ported from the supplied cropifAI design. */
import Image from 'next/image';
export default function Contact() {
    return (<section className={"pfoot"} aria-labelledby={"njcr-h-cta"} id={"contact"}>
    <div className={"wrap"}>
    <div className={"pf-card rv"}>
    <div className={"pf-l"}>
    <p className={"pd-brand"}>
    <Image className={"pd-logo"} src={"/images/cropifai/redesign/l-cropifai.webp"} alt={"cropifAI"} width={"372"} height={"188"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </p>
    <h2 id={"njcr-h-cta"} className={"pf-h"}>{"Grow more."}<br />
    <span>{"Use less water."}</span>
    </h2>
    <p className={"pf-sub"}>{"Tell us about your farm. We’ll survey it, place the sensors, and start with a pilot zone before you scale."}</p>
    <div className={"pd-btns"}>
    <a className={"pbtn"} href={"/contact"}>{"Book a cropifAI demo "}<svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M5 12h14M13 6l6 6-6 6"}>
    </path>
    </svg>
    </a>
    <a className={"pghost"} href={"#njcr-tour"}>{"Replay the field tour"}</a>
    </div>
    </div>
    <div className={"pf-r"}>
    <p className={"pf-k"}>{"Talk to the cropifAI team"}</p>
    <a className={"pf-row"} href={"/contact"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <rect x={"3"} y={"5"} width={"18"} height={"16"} rx={"2"}>
    </rect>
    <path d={"M3 10h18M8 3v4M16 3v4"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"Book a farm demo"}</b>
    <small>{"We bring the field tour to your meeting"}</small>
    </div>
    </a>
    <a className={"pf-row"} href={"mailto:info@najhumgroup.com"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <rect x={"3"} y={"5"} width={"18"} height={"14"} rx={"2"}>
    </rect>
    <path d={"m3 7 9 6 9-6"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"info@najhumgroup.com"}</b>
    <small>{"Send your farm size and crops"}</small>
    </div>
    </a>
    <a className={"pf-row"} href={"tel:+971556177234"}>
    <span>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"}>
    </path>
    </svg>
    </span>
    <div>
    <b>{"+971 55 61 77 234"}</b>
    <small>{"or +971 52 569 9979"}</small>
    </div>
    </a>
    <ul className={"pf-bd"}>
    <li>{"IP67 hardware"}</li>
    <li>{"Solar & battery"}</li>
    <li>{"LPWAN up to 15 km"}</li>
    <li>{"Cloud or on-premise"}</li>
    </ul>
    </div>
    </div>
    <nav className={"pf-nav"} aria-label={"On this page"}>
    <a href={"#njcr-tour"}>{"Field tour"}</a>
    <a href={"#njcr-h-ly"}>{"How it works"}</a>
    <a href={"#njcr-h-hw"}>{"Hardware"}</a>
    <a href={"#njcr-h-ea"}>{"Ecosystem"}</a>
    <a href={"#njcr-h-dash"}>{"Live demo"}</a>
    <a href={"#njcr-h-cx"}>{"Savings"}</a>
    <a href={"#njcr-h-faq"}>{"FAQ"}</a>
    </nav>
    <p className={"pf-legal"}>{"cropifAI is a product of Najhum Technologies. Farm readings, names and alerts on this page are illustrative."}</p>
    </div>
    </section>);
}
