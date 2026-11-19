/* Layout and illustrations ported from the supplied cropifAI design. */
export default function Impact() {
    return (<section className={"scr ph-st"} aria-label={"cropifAI in numbers"} id={"cropifai-impact"}>
    <div className={"wrap"}>
    <ul className={"st4 rv"}>
    <li>
    <small>{"up to"}</small>
    <b className={"num"}>
    <span data-count={"35"}>{"35"}</span>{"%"}</b>
    <p>{"less water and energy"}</p>
    </li>
    <li>
    <small>{"up to"}</small>
    <b className={"num"}>
    <span data-count={"20"}>{"20"}</span>{"%"}</b>
    <p>{"higher yields"}</p>
    </li>
    <li>
    <small>{"up to"}</small>
    <b className={"num"}>
    <span data-count={"15"}>{"15"}</span>{" km"}</b>
    <p>{"LPWAN range from one gateway"}</p>
    </li>
    <li>
    <small>
    </small>
    <b className={"num"}>
    <span data-count={"0"}>{"0"}</span>
    </b>
    <p>{"cables, cabinets or field network needed"}</p>
    </li>
    </ul>
    <p className={"note c"}>{"Up to 35% and up to 20% are cropifAI programme targets from the cropifAI brochure; results depend on crop, soil and baseline."}</p>
    </div>
    </section>);
}
