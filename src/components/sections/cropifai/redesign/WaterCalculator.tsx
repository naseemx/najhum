'use client';
/* Layout and illustrations ported from the supplied cropifAI design. */
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { waterSavings } from './demo-state';
export default function WaterCalculator() {
    const [values, setValues] = useState({ h: 120, w: 12000, r: 25, c: 4 });
    const savings = waterSavings(values);
    const format = (value: number) => Math.round(value).toLocaleString('en-US');
    const outputs = { h: format(values.h), w: format(values.w), r: values.r + '%', c: 'AED ' + values.c.toFixed(1) };
    const results = { vy: format(savings.annualValue >= 100000 ? Math.round(savings.annualValue / 1000) * 1000 : savings.annualValue), my: format(savings.cubicMetres) + ' m³', op: format(savings.tankers), ph: format(savings.perHectare), vm: format(savings.monthlyValue) };
    return (<section className={"scr cx gridbg"} aria-labelledby={"njcr-h-cx"} id={"cropifai-savings"}>
    <div className={"wrap"}>
    <div className={"c"}>
    <p className={"kick rv"}>{"Your water, in dirhams"}</p>
    <h2 id={"njcr-h-cx"} className={"big rv d1"}>{"What will cropifAI "}<span className={"m2"}>{"save you?"}</span>
    </h2>
    <p className={"sub rv d2"}>{"Enter your own figures. cropifAI targets up to 35% less water and energy; set the saving you want to test."}</p>
    </div>
    <div className={"cx-grid rv"}>
    <div className={"cx-in"}>
    <div className={"cx-f"}>
    <div className={"cx-l"}>
    <label htmlFor={"njcr-cx-h"}>{"Irrigated area (hectares)"}</label>
    <output className={"num"} data-o={"h"} htmlFor={"njcr-cx-h"}>{outputs.h}</output>
    </div>
    <input type={"range"} id={"njcr-cx-h"} data-k={"h"} min={"1"} max={"2000"} step={"1"} value={values.h} onChange={event => setValues(previous => ({ ...previous, h: Number(event.target.value) }))} style={{ "--p": `${(values.h - 1) / (2000 - 1) * 100}%` } as CSSProperties}/>
    </div>
    <div className={"cx-f"}>
    <div className={"cx-l"}>
    <label htmlFor={"njcr-cx-w"}>{"Water per hectare per year (m³)"}</label>
    <output className={"num"} data-o={"w"} htmlFor={"njcr-cx-w"}>{outputs.w}</output>
    </div>
    <input type={"range"} id={"njcr-cx-w"} data-k={"w"} min={"2000"} max={"30000"} step={"500"} value={values.w} onChange={event => setValues(previous => ({ ...previous, w: Number(event.target.value) }))} style={{ "--p": `${(values.w - 2000) / (30000 - 2000) * 100}%` } as CSSProperties}/>
    </div>
    <div className={"cx-f"}>
    <div className={"cx-l"}>
    <label htmlFor={"njcr-cx-r"}>{"Water saved with cropifAI"}</label>
    <output className={"num"} data-o={"r"} htmlFor={"njcr-cx-r"}>{outputs.r}</output>
    </div>
    <input type={"range"} id={"njcr-cx-r"} data-k={"r"} min={"5"} max={"35"} step={"1"} value={values.r} onChange={event => setValues(previous => ({ ...previous, r: Number(event.target.value) }))} style={{ "--p": `${(values.r - 5) / (35 - 5) * 100}%` } as CSSProperties}/>
    </div>
    <div className={"cx-f"}>
    <div className={"cx-l"}>
    <label htmlFor={"njcr-cx-c"}>{"Water cost (AED per m³)"}</label>
    <output className={"num"} data-o={"c"} htmlFor={"njcr-cx-c"}>{outputs.c}</output>
    </div>
    <input type={"range"} id={"njcr-cx-c"} data-k={"c"} min={"0.5"} max={"12"} step={"0.5"} value={values.c} onChange={event => setValues(previous => ({ ...previous, c: Number(event.target.value) }))} style={{ "--p": `${(values.c - 0.5) / (12 - 0.5) * 100}%` } as CSSProperties}/>
    </div>
    <p className={"cx-note"}>{"Your figures, your calculation. It shows potential, not a promised saving. Include pumping energy and desalination or tanker costs in your water cost."}</p>
    </div>
    <div className={"cx-out"} aria-live={"polite"}>
    <p className={"cx-k"}>{"Potential saving, per year"}</p>
    <p className={"cx-big num"}>
    <b data-r2={"vy"}>{results.vy}</b>
    <span>{"AED"}</span>
    </p>
    <div className={"cx-row num"}>
    <div>
    <span>{"Water saved per year"}</span>
    <b data-r2={"my"}>{results.my}</b>
    </div>
    <div>
    <span>{"Olympic pools of water"}</span>
    <b data-r2={"op"}>{results.op}</b>
    </div>
    </div>
    <div className={"cx-save"}>
    <span>{"That is about"}</span>
    <strong className={"num"}>
    <b data-r2={"ph"}>{results.ph}</b>
    <em>{"AED per hectare a year"}</em>
    </strong>
    <p className={"cx-sm num"}>{"Before labour, energy and yield gains · "}<b data-r2={"vm"}>{results.vm}</b>{" AED a month"}</p>
    </div>
    </div>
    </div>
    </div>
    </section>);
}
