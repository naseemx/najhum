/* Layout and illustrations ported from the supplied cropifAI design. */
export default function Questions() {
    return (<section className={"scr alt"} aria-labelledby={"njcr-h-faq"} id={"cropifai-faq"}>
    <div className={"wrap"}>
    <h2 id={"njcr-h-faq"} className={"big c rv"}>{"Questions."}</h2>
    <div className={"faq"}>
    <details>
    <summary>{"What does it measure?"}</summary>
    <p>{"Soil moisture, temperature and EC at several depths, weather, irrigation flow, tank and reservoir levels, pump status and valve position, on one dashboard."}</p>
    </details>
    <details>
    <summary>{"Can it control irrigation, or only report it?"}</summary>
    <p>{"Both. Smart valves open, close or hold any position from 0 to 100%, on a schedule, by soil threshold or from the dashboard, and zones can run one after another when water is limited."}</p>
    </details>
    <details>
    <summary>{"Does it work without site connectivity?"}</summary>
    <p>{"Yes. Sensors and valves report over LPWAN to a gateway with up to 15 km range, or over cellular, so a field with no network of its own still reports. Valves and controllers run on solar and battery power."}</p>
    </details>
    <details>
    <summary>{"What does correlation mean in practice?"}</summary>
    <p>{"cropifAI reads related sensors together. A valve open with no flow and falling soil moisture means the pump failed. Flow with no moisture rise means a broken line. Each alert names a likely cause, so the right person goes to the right place."}</p>
    </details>
    <details>
    <summary>{"Does it connect to our other systems?"}</summary>
    <p>{"Yes. cropifAI is API-ready and connects to ERP and SCADA systems, AWS, Azure and local servers."}</p>
    </details>
    <details>
    <summary>{"How do we start?"}</summary>
    <p>{"With an assessment and a field survey, then a pilot zone. Once the data shows the saving, roll out across the farm."}</p>
    </details>
    </div>
    </div>
    </section>);
}
