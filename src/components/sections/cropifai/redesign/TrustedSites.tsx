/* Layout and illustrations ported from the supplied cropifAI design. */
import Image from 'next/image';
export default function TrustedSites() {
    return (<section className={"ph-trust"} aria-label={"Trusted by"} id={"cropifai-trust"}>
    <div className={"wrap c"}>
    <p className={"ph-tk"}>{"Trusted by companies across the UAE"}</p>
    <div className={"mq"}>
    <div className={"mq-t"}>
    <ul className={"rows"}>
    <li className={"w"}>
    <Image src={"/images/cropifai/redesign/c-row1.webp"} alt={"Space42, Al Rostamani Communications, Expo 2020 Dubai"} width={"807"} height={"110"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </li>
    <li className={"w"}>
    <Image src={"/images/cropifai/redesign/c-row2.webp"} alt={"Dubai Electricity and Water Authority, Aramtec, e&, ATGC, Al Mulla Group, Abdulla Al Rostamani Properties"} width={"1748"} height={"109"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </li>
    <li className={"w"}>
    <Image src={"/images/cropifai/redesign/c-row3.webp"} alt={"Gargash, DTC, The Dubai Mall, Sidco Foods, Sehouse"} width={"1531"} height={"97"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </li>
    <li className={""}>
    <Image src={"/images/cropifai/redesign/c-skidubai.webp"} alt={"Ski Dubai"} width={"259"} height={"107"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </li>
    <li className={""}>
    <Image src={"/images/cropifai/redesign/c-emaar.webp"} alt={"Emaar"} width={"300"} height={"101"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </li>
    </ul>
    <ul className={"rows"} aria-hidden={"true"}>
    <li className={"w"}>
    <Image src={"/images/cropifai/redesign/c-row1.webp"} alt={""} width={"807"} height={"110"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </li>
    <li className={"w"}>
    <Image src={"/images/cropifai/redesign/c-row2.webp"} alt={""} width={"1748"} height={"109"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </li>
    <li className={"w"}>
    <Image src={"/images/cropifai/redesign/c-row3.webp"} alt={""} width={"1531"} height={"97"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </li>
    <li className={""}>
    <Image src={"/images/cropifai/redesign/c-skidubai.webp"} alt={""} width={"259"} height={"107"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </li>
    <li className={""}>
    <Image src={"/images/cropifai/redesign/c-emaar.webp"} alt={""} width={"300"} height={"101"} loading={"lazy"} decoding={"async"} sizes={"(max-width: 760px) 60vw, 420px"}/>
    </li>
    </ul>
    </div>
    </div>
    </div>
    </section>);
}
