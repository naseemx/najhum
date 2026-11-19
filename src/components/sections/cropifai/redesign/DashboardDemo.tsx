'use client';
/* Layout and illustrations ported from the supplied cropifAI design. */
import type { CSSProperties } from 'react';
import { useDashboardDemo } from './interactions';
import { activateBackup, chartPath, storyClass } from './demo-state';
export default function DashboardDemo() {
    const { dashboard, dialog, story, setStory, screen, go, modal, setModal, openModal, more, setMore, text } = useDashboardDemo();
    return (<section className={"scr"} aria-labelledby={"njcr-h-dash"} id={"cropifai-interface"}>
    <div className={"wrap c"}>
    <p className={"kick rv"}>{"Live demo"}</p>
    <h2 id={"njcr-h-dash"} className={"big rv d1"}>{"Try "}<span className={"grad"}>{"cropifAI."}</span>
    </h2>
    <p className={"sub rv d2"}>{"This is the cropifAI dashboard at a date farm, the moment a zone valve opens with no water behind it. Open the alert and fix it."}</p>
    <div className={"dbdev rv"}>
    <div className={"lt-scr"}>
    <div className={"db"} data-screen={screen} role={"region"} aria-label={"Interactive demo of the cropifAI dashboard with illustrative data"} ref={dashboard}>
    <aside className={"db-side"}>
    <span className={"db-logo"} aria-hidden={"true"}>
    <svg viewBox={"0 0 24 24"} width={"26"} height={"26"} fill={"none"} stroke={"#BEF264"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"}>
    <path d={"M12 21v-9"}>
    </path>
    <path d={"M12 12c0-4 3-7 8-7 0 4-3 7-8 7z"}>
    </path>
    <path d={"M12 14c0-3-2.5-5.5-7-5.5 0 3 2.5 5.5 7 5.5z"}>
    </path>
    </svg>
    </span>
    <nav className={"db-navs"} aria-label={"Demo menu"}>
    <button type={"button"} className={"db-nav"} data-go={"ov"} onClick={() => go("ov")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <rect x={"4"} y={"4"} width={"6.5"} height={"6.5"} rx={"1.8"}>
    </rect>
    <rect x={"13.5"} y={"4"} width={"6.5"} height={"6.5"} rx={"1.8"}>
    </rect>
    <rect x={"4"} y={"13.5"} width={"6.5"} height={"6.5"} rx={"1.8"}>
    </rect>
    <rect x={"13.5"} y={"13.5"} width={"6.5"} height={"6.5"} rx={"1.8"}>
    </rect>
    </svg>
    <span>{"Overview"}</span>
    </button>
    <button type={"button"} className={"db-nav"} data-more={"Farm"} onClick={() => openModal("Farm")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <rect x={"5"} y={"3"} width={"14"} height={"18"} rx={"1.5"}>
    </rect>
    <path d={"M9 7h.01M12 7h.01M15 7h.01M9 10.5h.01M12 10.5h.01M15 10.5h.01M9 14h.01M12 14h.01M15 14h.01M10 21v-3h4v3"}>
    </path>
    </svg>
    <span>{"Farm"}</span>
    </button>
    <button type={"button"} className={"db-nav"} data-go={"dv"} onClick={() => go("dv")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <circle cx={"12"} cy={"12"} r={"3"}>
    </circle>
    <path d={"M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"}>
    </path>
    </svg>
    <span>{"Systems"}</span>
    <em className={storyClass("navdot", "db-dot", story)} data-v={"navdot"}>
    </em>
    </button>
    <button type={"button"} className={"db-nav"} data-more={"Alarms"} onClick={() => openModal("Alarms")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    <span>{"Alarms"}</span>
    <em className={storyClass("almdot", "db-dot", story)} data-v={"almdot"}>
    </em>
    </button>
    <button type={"button"} className={"db-nav"} data-more={"Automations"} onClick={() => openModal("Automations")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M13 2 4 14h7l-1 8 9-12h-7l1-8z"}>
    </path>
    </svg>
    <span>{"Automations"}</span>
    </button>
    <button type={"button"} className={"db-nav"} data-more={"Insights"} onClick={() => openModal("Insights")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M4 4v16h16"}>
    </path>
    <path d={"m7 14 4-4 3 3 5-6"}>
    </path>
    </svg>
    <span>{"Insights"}</span>
    </button>
    <button type={"button"} className={"db-nav"} data-more={"Reports"} onClick={() => openModal("Reports")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h6"}>
    </path>
    </svg>
    <span>{"Reports"}</span>
    </button>
    <button type={"button"} className={"db-nav"} data-more={"Devices"} onClick={() => openModal("Devices")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <rect x={"6"} y={"6"} width={"12"} height={"12"} rx={"2"}>
    </rect>
    <rect x={"9.5"} y={"9.5"} width={"5"} height={"5"} rx={"1"}>
    </rect>
    <path d={"M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"}>
    </path>
    </svg>
    <span>{"Devices"}</span>
    </button>
    </nav>
    <div className={"db-navb"}>
    <button type={"button"} className={"db-nav"} data-more={"Users"} onClick={() => openModal("Users")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"}>
    </path>
    </svg>
    <span>{"Users"}</span>
    </button>
    <button type={"button"} className={"db-nav"} data-more={"Settings"} onClick={() => openModal("Settings")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <circle cx={"12"} cy={"12"} r={"3"}>
    </circle>
    <path d={"M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"}>
    </path>
    </svg>
    <span>{"Settings"}</span>
    </button>
    </div>
    </aside>
    <div className={"db-main"}>
    <div className={"db-top"}>
    <span className={"db-pill"}>
    <span className={"db-pt"}>{"cropifAI demo"}</span>
    <span className={"db-ps"}>{"/"}</span>
    <b>{"North farm, Al Ain"}</b>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"m6 9 6 6 6-6"}>
    </path>
    </svg>
    </span>
    <span className={storyClass("crumb", "db-crumb", story)} data-v={"crumb"}>{text["crumb"] ?? "Overview"}</span>
    <span className={"db-tick num"}>
    <i>
    </i>
    <b data-v={"clk"} className={storyClass("clk", "", story)}>{text["clk"] ?? "05:42"}</b>
    <span>{"Zone B soil "}<b data-v={"sm0"} className={storyClass("sm0", "", story)}>{text["sm0"] ?? "21%"}</b>
    </span>
    <span>{"Reservoir "}<b data-v={"res"} className={storyClass("res", "", story)}>{text["res"] ?? "72%"}</b>
    </span>
    <span>{"Zones running "}<b data-v={"zr"} className={storyClass("zr", "", story)}>{text["zr"] ?? "1 / 6"}</b>
    </span>
    </span>
    <span className={"db-row2"}>
    <span className={"db-lang"}>
    <b>{"EN"}</b>
    <button type={"button"} data-more={"Arabic interface"} onClick={() => openModal("Arabic interface")}>{"عربي"}</button>
    </span>
    <button type={"button"} className={"db-bell"} data-more={"Alarms"} aria-label={"Alarms"} onClick={() => openModal("Alarms")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    <em data-v={"bell"} className={storyClass("bell", "", story)}>{text["bell"] ?? "3"}</em>
    </button>
    <span className={"db-av"} aria-hidden={"true"}>{"NJ"}</span>
    </span>
    </div>
    <section className={"db-scr s-ov"} aria-label={"Overview"} id={"cropifai-interface"}>
    <div className={"db-head"}>
    <div>
    <p className={storyClass("date", "db-k num", story)} data-v={"date"}>{text["date"] ?? "WED, 18 NOV 2026 · 05:42 GST"}</p>
    <h3>{"North farm, Al Ain."}</h3>
    </div>
    <div className={"db-hr"}>
    <span className={"db-ok"}>
    <i>
    </i>{"96 of 96 devices reporting"}</span>
    <span className={"db-ok"}>
    <i>
    </i>{"2 of 2 gateways"}</span>
    </div>
    </div>
    <div className={"db-card db-sev"}>
    <div className={"db-sv crit"}>
    <b className={storyClass("ncrit", "num", story)} data-v={"ncrit"}>{text["ncrit"] ?? "1"}</b>
    <span>{"Critical"}<small data-v={"ncrit-s"} className={storyClass("ncrit-s", "", story)}>{text["ncrit-s"] ?? "1 open"}</small>
    </span>
    </div>
    <div className={"db-sv maj"}>
    <b className={"num"}>{"1"}</b>
    <span>{"Major"}<small>{"acknowledged"}</small>
    </span>
    </div>
    <div className={"db-sv min"}>
    <b className={"num"}>{"1"}</b>
    <span>{"Minor"}<small>{"investigating"}</small>
    </span>
    </div>
    <div className={"db-sv clr"}>
    <b className={storyClass("nclr", "num", story)} data-v={"nclr"}>{text["nclr"] ?? "2"}</b>
    <span>{"Cleared"}<small data-v={"nclr-s"} className={storyClass("nclr-s", "", story)}>{text["nclr-s"] ?? "today"}</small>
    </span>
    </div>
    <p data-v={"sevtxt"} className={storyClass("sevtxt", "", story)}>{text["sevtxt"] ?? "3 items need you. Everything else is normal."}</p>
    </div>
    <div className={"db-g2"}>
    <div className={"db-card db-site"}>
    <div className={"db-ch"}>
    <div>
    <b>{"Farm, live"}</b>
    <small>{"Areas with an open alert are shaded. Tap the red one."}</small>
    </div>
    <button type={"button"} className={"db-lnk"} data-go={"dv"} onClick={() => go("dv")}>{"Open Zone B →"}</button>
    </div>
    <div className={"db-3d"} data-3d={"site"}>
    <div className={"db-fb"}>
    <button type={"button"} className={"db-fbb"} data-go={"dv"} onClick={() => go("dv")}>{"Zone B · valve open, no flow · open"}</button>
    </div>
    <div className={"db-ctl"}>
    <span className={"db-seg2"}>
    <button type={"button"} className={"on"} data-cam={"3d"}>{"3D"}</button>
    <button type={"button"} data-cam={"top"}>{"Top"}</button>
    </span>
    <button type={"button"} className={"db-mo on"} data-cam={"motion"}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"}>
    </path>
    </svg>{"Motion on"}</button>
    </div>
    <div className={"db-leg"}>
    <span>
    <i className={"crit"}>
    </i>{"Alert needs action"}</span>
    <span>
    <i className={"maj"}>
    </i>{"Warning or acknowledged"}</span>
    <span>
    <i>
    </i>{"Normal"}</span>
    </div>
    </div>
    </div>
    <div className={"db-card db-need"}>
    <div className={"db-ch"}>
    <b>{"Needs you"}</b>
    <span data-v={"needn"} className={storyClass("needn", "", story)}>{text["needn"] ?? "3 open"}</span>
    </div>
    <button type={"button"} className={storyClass("mini1", "db-al", story)} data-go={"dv"} data-v={"mini1"} onClick={() => go("dv")}>
    <span className={"db-ic crit"}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M12 2s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"}>
    </path>
    </svg>
    </span>
    <span className={"db-alb"}>
    <span className={"db-chips"}>
    <em className={storyClass("m1chip", "db-chip crit", story)} data-v={"m1chip"}>{text["m1chip"] ?? "Critical"}</em>
    <em className={storyClass("m1st", "db-chip act", story)} data-v={"m1st"} hidden={story.phase !== 'fault'}>{"Active"}</em>
    <span>{"Zone B · 05:40"}</span>
    </span>
    <b data-v={"m1t"} className={storyClass("m1t", "", story)}>{text["m1t"] ?? "Zone B: valve open, no water"}</b>
    <small data-v={"m1p"} className={storyClass("m1p", "", story)}>{text["m1p"] ?? "The valve opened on schedule at 05:30 but flow is 0 m³/h and soil at 30 cm is still falling. Pump P1 draws 0 A."}</small>
    </span>
    </button>
    <div className={"db-al"}>
    <span className={"db-ic maj"}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M4 12h4l3-8 3 16 3-8h3"}>
    </path>
    </svg>
    </span>
    <span className={"db-alb"}>
    <span className={"db-chips"}>
    <em className={"db-chip maj"}>{"Major"}</em>
    <em className={"db-chip ack"}>{"Acknowledged"}</em>
    <span>{"Zone D · yesterday"}</span>
    </span>
    <b>{"Salinity rising in Zone D"}</b>
    <small>{"EC at 30 cm up from 1.4 to 3.1 dS/m over 10 days. Leaching cycle planned."}</small>
    </span>
    </div>
    <div className={"db-al"}>
    <span className={"db-ic min"}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <circle cx={"12"} cy={"12"} r={"8"}>
    </circle>
    <path d={"M12 8v4l2 2"}>
    </path>
    </svg>
    </span>
    <span className={"db-alb"}>
    <span className={"db-chips"}>
    <em className={"db-chip min"}>{"Minor"}</em>
    <em className={"db-chip inv"}>{"Investigating"}</em>
    <span>{"Weather · 04:00"}</span>
    </span>
    <b>{"Rain forecast for tonight"}</b>
    <small>{"8 mm expected. Tomorrow’s 05:30 cycle will skip if it arrives."}</small>
    </span>
    </div>
    </div>
    </div>
    <div className={"db-stats num"}>
    <div>
    <span>{"Water today"}</span>
    <b data-v={"wt"} className={storyClass("wt", "", story)}>{text["wt"] ?? "212 m³"}</b>
    <small>{"target 260 m³"}</small>
    </div>
    <div>
    <span>{"Soil, farm average"}</span>
    <b data-v={"sav"} className={storyClass("sav", "", story)}>{text["sav"] ?? "27%"}</b>
    <small>{"refill 22% · full 34%"}</small>
    </div>
    <div>
    <span>{"Reservoir"}</span>
    <b data-v={"res2"} className={storyClass("res2", "", story)}>{text["res2"] ?? "72%"}</b>
    <small>{"refill booked Friday"}</small>
    </div>
    <div>
    <span>{"Field 3 NDVI"}</span>
    <b data-v={"ndvi"} className={storyClass("ndvi", "", story)}>{text["ndvi"] ?? "0.68"}</b>
    <small>{"yield +6% forecast"}</small>
    </div>
    </div>
    </section>
    <section className={"db-scr s-dv"} aria-label={"Zone B"} id={"cropifai-interface"}>
    <div className={"db-head"}>
    <div>
    <p className={"db-k num"}>{"WED 18 NOV · NORTH FARM · ZONES · ZONE B · DATE PALMS"}</p>
    <h3>{"Soil "}<span data-v={"dvlv"} className={storyClass("dvlv", "", story)}>{text["dvlv"] ?? "21"}</span>{"%"}</h3>
    <p className={storyClass("dvsub", "db-sub", story)} data-v={"dvsub"}>{text["dvsub"] ?? "The valve opened at 05:30, but flow is 0 m³/h and the soil is still drying. Pump P1 draws 0 A: the supply pump has failed."}</p>
    </div>
    <div className={"db-act"}>
    <em className={storyClass("dvchip", "db-chip crit", story)} data-v={"dvchip"}>{text["dvchip"] ?? "Critical"}</em>
    <button type={"button"} className={storyClass("dvbtn", "db-btn", story)} data-act={"go"} data-v={"dvbtn"} onClick={() => setStory(activateBackup)} disabled={story.phase === 'run'}>{text["dvbtn"] ?? "Start backup pump P2"}</button>
    </div>
    </div>
    <div className={"db-tabs"}>
    <span className={"on"}>{"Now"}</span>
    <button type={"button"} data-more={"Irrigation log"} onClick={() => openModal("Irrigation log")}>{"Irrigation log"}</button>
    <button type={"button"} data-more={"Soil by depth"} onClick={() => openModal("Soil by depth")}>{"Soil by depth"}</button>
    </div>
    <div className={"db-card db-tank"}>
    <div className={"db-ch"}>
    <b>{"The zone"}</b>
    <span>{"2.4 ha date palms · drip · NQT02 valve"}</span>
    </div>
    <div className={"db-3d tall"} data-3d={"dev"}>
    <div className={"db-fb"}>
    </div>
    <div className={"db-tleg"}>
    <b>{"Zone B, 30 cm"}</b>
    <span>
    <i className={"lo"}>
    </i>{"Refill point · 22%"}</span>
    <span>
    <i className={"cr"}>
    </i>{"Crop stress · 18%"}</span>
    </div>
    <div className={"db-ctl"}>
    <button type={"button"} className={"db-mo on"} data-cam={"motion"}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"}>
    </path>
    </svg>{"Motion on"}</button>
    </div>
    </div>
    </div>
    <div className={"db-g2 dv"}>
    <div className={"db-card"}>
    <div className={"db-ch"}>
    <b>{"Now"}</b>
    <span data-v={"dvago"} className={storyClass("dvago", "", story)}>{text["dvago"] ?? "just now"}</span>
    </div>
    <p className={"db-big num"}>
    <b data-v={"dvbig2"} className={storyClass("dvbig2", "", story)}>{text["dvbig2"] ?? "21"}</b>
    <span>{"%"}</span>
    </p>
    <p className={storyClass("dvbs", "db-bs num", story)} data-v={"dvbs"}>{text["dvbs"] ?? "Soil at 30 cm · EC 1.4 dS/m"}</p>
    <div className={"db-tiles num"}>
    <div>
    <span>{"Valve"}</span>
    <b data-v={"p1a"} className={storyClass("p1a", "", story)}>{text["p1a"] ?? "Open"}</b>
    </div>
    <div>
    <span>{"Flow"}</span>
    <b data-v={"p2a"} className={storyClass("p2a", "", story)}>{text["p2a"] ?? "0 m³/h"}</b>
    </div>
    <div>
    <span>{"Pump P1"}</span>
    <b data-v={"rate"} className={storyClass("rate", "", story)}>{text["rate"] ?? "0 A"}</b>
    </div>
    <div>
    <span>{"Sensor"}</span>
    <b data-v={"sens"} className={storyClass("sens", "", story)}>{text["sens"] ?? "Soil · Zone B"}</b>
    </div>
    </div>
    </div>
    <div className={"db-card db-fc"}>
    <div className={"db-ch"}>
    <b>{"Correlated diagnosis"}</b>
    <span className={"db-tag"}>{"From 3 sources"}</span>
    </div>
    <div className={storyClass("fr1", "db-fr crit", story)} data-v={"fr1"}>
    <i>
    </i>
    <span>
    <b data-v={"fr1t"} className={storyClass("fr1t", "", story)}>{text["fr1t"] ?? "Valve open on schedule"}</b>
    <small data-v={"fr1s"} className={storyClass("fr1s", "", story)}>{text["fr1s"] ?? "NQT02 · Zone B · 100%"}</small>
    </span>
    <em className={storyClass("fr1v", "num", story)} data-v={"fr1v"}>{text["fr1v"] ?? "05:30"}</em>
    </div>
    <div className={storyClass("fr2", "db-fr crit", story)} data-v={"fr2"}>
    <i>
    </i>
    <span>
    <b data-v={"fr2t"} className={storyClass("fr2t", "", story)}>{text["fr2t"] ?? "No flow, pump silent"}</b>
    <small data-v={"fr2s"} className={storyClass("fr2s", "", story)}>{text["fr2s"] ?? "Flow meter · pump P1 current"}</small>
    </span>
    <em className={storyClass("fr2v", "num", story)} data-v={"fr2v"}>{text["fr2v"] ?? "0 m³/h"}</em>
    </div>
    <div className={storyClass("fr3", "db-fr crit", story)} data-v={"fr3"}>
    <i>
    </i>
    <span>
    <b data-v={"fr3t"} className={storyClass("fr3t", "", story)}>{text["fr3t"] ?? "Crop stress if nothing changes"}</b>
    <small data-v={"fr3s"} className={storyClass("fr3s", "", story)}>{text["fr3s"] ?? "Soil reaches 18%"}</small>
    </span>
    <em className={storyClass("fr3v", "num", story)} data-v={"fr3v"}>{text["fr3v"] ?? "12:00"}</em>
    </div>
    <p className={storyClass("fn", "db-fn", story)} data-v={"fn"}>{text["fn"] ?? "Read together: , not the valve. Backup pump P2 is ready."}</p>
    </div>
    </div>
    <div className={"db-card db-chart"}>
    <div className={"db-ch"}>
    <b>{"Soil moisture and flow"}</b>
    <span className={"db-seg2"}>
    <button type={"button"} className={"on"}>{"6 h"}</button>
    <button type={"button"} data-more={"24 h history"} onClick={() => openModal("24 h history")}>{"24 h"}</button>
    <button type={"button"} data-more={"7 day history"} onClick={() => openModal("7 day history")}>{"7 days"}</button>
    </span>
    </div>
    <div className={"db-cw"}>
    <svg viewBox={"0 0 600 170"} preserveAspectRatio={"none"} role={"img"} aria-label={"Soil moisture over the last six hours, with irrigation flow below."}>
    <line className={"db-gl"} x1={"0"} x2={"600"} y1={"10"} y2={"10"}>
    </line>
    <line className={"db-gl"} x1={"0"} x2={"600"} y1={"60"} y2={"60"}>
    </line>
    <line className={"db-gl"} x1={"0"} x2={"600"} y1={"110"} y2={"110"}>
    </line>
    <line className={"db-thl"} x1={"0"} x2={"600"} y1={"70"} y2={"70"}>
    </line>
    <line className={"db-thh"} x1={"0"} x2={"600"} y1={"83"} y2={"83"}>
    </line>
    <path className={storyClass("area", "db-area", story)} data-v={"area"} d={chartPath(story.s1, 'soil') + ' L600 110 L0 110 Z'}>
    </path>
    <path className={storyClass("line", "db-line", story)} data-v={"line"} d={chartPath(story.s1, "soil")}>
    </path>
    <path className={storyClass("amp", "db-amp", story)} data-v={"amp"} d={chartPath(story.s2, "flow")}>
    </path>
    </svg>
    <span className={"db-tl2 o num"} style={{ "top": "37%" } as CSSProperties}>{"Refill 22%"}</span>
    <span className={"db-tl2  num"} style={{ "top": "45%" } as CSSProperties}>{"Stress 18%"}</span>
    </div>
    <div className={"db-cl num"}>
    <span>
    <i>
    </i>{"Soil moisture"}</span>
    <span>
    <i className={"a"}>
    </i>{"Flow"}</span>
    <span className={"r"}>{"last 6 h → now"}</span>
    </div>
    </div>
    </section>
    </div>
    <nav className={"db-tabbar"} aria-label={"Demo screens"}>
    <button type={"button"} data-go={"ov"} onClick={() => go("ov")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <rect x={"4"} y={"4"} width={"6.5"} height={"6.5"} rx={"1.8"}>
    </rect>
    <rect x={"13.5"} y={"4"} width={"6.5"} height={"6.5"} rx={"1.8"}>
    </rect>
    <rect x={"4"} y={"13.5"} width={"6.5"} height={"6.5"} rx={"1.8"}>
    </rect>
    <rect x={"13.5"} y={"13.5"} width={"6.5"} height={"6.5"} rx={"1.8"}>
    </rect>
    </svg>
    <span>{"Overview"}</span>
    </button>
    <button type={"button"} data-more={"Farm"} onClick={() => openModal("Farm")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <rect x={"5"} y={"3"} width={"14"} height={"18"} rx={"1.5"}>
    </rect>
    <path d={"M9 7h.01M12 7h.01M15 7h.01M9 10.5h.01M12 10.5h.01M15 10.5h.01M9 14h.01M12 14h.01M15 14h.01M10 21v-3h4v3"}>
    </path>
    </svg>
    <span>{"Farm"}</span>
    </button>
    <button type={"button"} data-go={"dv"} onClick={() => go("dv")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <circle cx={"12"} cy={"12"} r={"3"}>
    </circle>
    <path d={"M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"}>
    </path>
    </svg>
    <span>{"Systems"}</span>
    <em className={storyClass("tbdot", "db-dot", story)} data-v={"tbdot"}>
    </em>
    </button>
    <button type={"button"} data-more={"Alarms"} onClick={() => openModal("Alarms")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    <span>{"Alarms"}</span>
    <em className={storyClass("tbalm", "db-dot", story)} data-v={"tbalm"}>
    </em>
    </button>
    <button type={"button"} className={"db-morebtn"} aria-expanded={more} onClick={() => setMore(value => !value)}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <circle cx={"5"} cy={"12"} r={"1.3"}>
    </circle>
    <circle cx={"12"} cy={"12"} r={"1.3"}>
    </circle>
    <circle cx={"19"} cy={"12"} r={"1.3"}>
    </circle>
    </svg>
    <span>{"More"}</span>
    </button>
    </nav>
    <div className={"db-pop"} hidden={!more}>
    <button type={"button"} data-more={"Automations"} onClick={() => openModal("Automations")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M13 2 4 14h7l-1 8 9-12h-7l1-8z"}>
    </path>
    </svg>
    <span>{"Automations"}</span>
    </button>
    <button type={"button"} data-more={"Insights"} onClick={() => openModal("Insights")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M4 4v16h16"}>
    </path>
    <path d={"m7 14 4-4 3 3 5-6"}>
    </path>
    </svg>
    <span>{"Insights"}</span>
    </button>
    <button type={"button"} data-more={"Reports"} onClick={() => openModal("Reports")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h6"}>
    </path>
    </svg>
    <span>{"Reports"}</span>
    </button>
    <button type={"button"} data-more={"Devices"} onClick={() => openModal("Devices")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <rect x={"6"} y={"6"} width={"12"} height={"12"} rx={"2"}>
    </rect>
    <rect x={"9.5"} y={"9.5"} width={"5"} height={"5"} rx={"1"}>
    </rect>
    <path d={"M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"}>
    </path>
    </svg>
    <span>{"Devices"}</span>
    </button>
    <button type={"button"} data-more={"All sites"} onClick={() => openModal("All sites")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <rect x={"5"} y={"3"} width={"14"} height={"18"} rx={"1.5"}>
    </rect>
    <path d={"M9 7h.01M12 7h.01M15 7h.01M9 10.5h.01M12 10.5h.01M15 10.5h.01M9 14h.01M12 14h.01M15 14h.01M10 21v-3h4v3"}>
    </path>
    </svg>
    <span>{"All sites"}</span>
    </button>
    <button type={"button"} data-more={"Users"} onClick={() => openModal("Users")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <path d={"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"}>
    </path>
    </svg>
    <span>{"Users"}</span>
    </button>
    <button type={"button"} data-more={"Settings"} onClick={() => openModal("Settings")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <circle cx={"12"} cy={"12"} r={"3"}>
    </circle>
    <path d={"M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"}>
    </path>
    </svg>
    <span>{"Settings"}</span>
    </button>
    <button type={"button"} data-more={"My shift (technician view)"} onClick={() => openModal("My shift (technician view)")}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <circle cx={"12"} cy={"8"} r={"4"}>
    </circle>
    <path d={"M4 21a8 8 0 0 1 16 0"}>
    </path>
    </svg>
    <span>{"My shift (technician view)"}</span>
    </button>
    </div>
    <div className={"db-modal"} hidden={!modal} onClick={event => { if (event.target === event.currentTarget)
        setModal(''); }}>
    <div className={"db-mbox"} role={"dialog"} aria-modal={"true"} aria-labelledby={"njcr-dbm-t"} ref={dialog}>
    <span className={"db-mic"} aria-hidden={"true"}>
    <svg viewBox={"0 0 24 24"} aria-hidden={"true"}>
    <rect x={"4"} y={"4"} width={"6.5"} height={"6.5"} rx={"1.8"}>
    </rect>
    <rect x={"13.5"} y={"4"} width={"6.5"} height={"6.5"} rx={"1.8"}>
    </rect>
    <rect x={"4"} y={"13.5"} width={"6.5"} height={"6.5"} rx={"1.8"}>
    </rect>
    <rect x={"13.5"} y={"13.5"} width={"6.5"} height={"6.5"} rx={"1.8"}>
    </rect>
    </svg>
    </span>
    <p className={storyClass("mk", "db-k num", story)} data-v={"mk"}>{text["mk"] ?? "CROPIFAI"}</p>
    <h4 id={"njcr-dbm-t"} data-v={"mt"} className={storyClass("mt", "", story)}>{text["mt"] ?? "Explore the complete dashboard."}</h4>
    <p>{"This preview covers one use case. Our team can walk you through the complete cropifAI dashboard, set up for your own site."}</p>
    <div className={"db-mbt"}>
    <a className={"db-btn"} href={"/contact"}>{"Connect with our team"}</a>
    <button type={"button"} className={"db-btn2"} data-close={""} onClick={() => setModal('')}>{"Back to the preview"}</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div className={"lt-base"} aria-hidden={"true"}>
    </div>
    </div>
    <p className={"note dcap"}>{"Interactive preview with illustrative data. Tap the red alert, start the backup pump, and watch cropifAI close it."}</p>
    <ul className={"fits"}>
    <li className={"fit rv"}>
    <span className={"ico"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <circle cx={"12"} cy={"12"} r={"9"}>
    </circle>
    <path d={"M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"}>
    </path>
    </svg>
    </span>
    <div>
    <h3>{"One unified platform"}</h3>
    <p>{"Soil, weather, valves, tanks and flow on one cropifAI dashboard."}</p>
    </div>
    </li>
    <li className={"fit rv d1"}>
    <span className={"ico"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"}>
    </path>
    </svg>
    </span>
    <div>
    <h3>{"Escalating alerts"}</h3>
    <p>{"The right person hears first, by dashboard, SMS, email or call, day and night."}</p>
    </div>
    </li>
    <li className={"fit rv d2"}>
    <span className={"ico"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M4 12h4l3-8 3 16 3-8h3"}>
    </path>
    </svg>
    </span>
    <div>
    <h3>{"Correlated alarms"}</h3>
    <p>{"Readings from different systems combined into one alarm with a likely cause."}</p>
    </div>
    </li>
    <li className={"fit rv"}>
    <span className={"ico"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <rect x={"7"} y={"7"} width={"10"} height={"10"} rx={"1.5"}>
    </rect>
    <path d={"M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"}>
    </path>
    </svg>
    </span>
    <div>
    <h3>{"Hardware-agnostic"}</h3>
    <p>{"Connect any sensor or controller brand, with no vendor lock-in."}</p>
    </div>
    </li>
    <li className={"fit rv d1"}>
    <span className={"ico"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <path d={"M6 2h9l5 5v15H6z"}>
    </path>
    <path d={"M14 2v6h6M9 13h6M9 17h4"}>
    </path>
    </svg>
    </span>
    <div>
    <h3>{"Reports on demand"}</h3>
    <p>{"Water, yield and ESG reports, exported in a click."}</p>
    </div>
    </li>
    <li className={"fit rv d2"}>
    <span className={"ico"}>
    <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.8"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
    <rect x={"2"} y={"4"} width={"14"} height={"11"} rx={"1.5"}>
    </rect>
    <rect x={"15"} y={"9"} width={"7"} height={"12"} rx={"1.5"}>
    </rect>
    <path d={"M5 19h7"}>
    </path>
    </svg>
    </span>
    <div>
    <h3>{"Any screen"}</h3>
    <p>{"The web dashboard works on desktop, tablet and phone browsers."}</p>
    </div>
    </li>
    </ul>
    </div>
    </section>);
}
