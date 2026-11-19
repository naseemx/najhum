export type FarmStory = {
    phase: 'fault' | 'run' | 'done';
    min: number;
    sm: number;
    fl: number;
    wt: number;
    wait: number;
    done: number;
    s1: number[];
    s2: number[];
};
export function initialFarmStory(): FarmStory { return { phase: 'fault', min: 342, sm: 21, fl: 0, wt: 212, wait: 0, done: 0, s1: Array.from({ length: 72 }, (_, i) => (26.5 - i / 71 * 5.5 + Math.sin(i * 1.2) * .15 - 10) / 30 * 100), s2: Array(72).fill(0) }; }
export function advanceFarmStory(previous: FarmStory): FarmStory { const st = { ...previous, min: previous.min + 1, s1: [...previous.s1], s2: [...previous.s2] }; if (st.phase === 'fault') {
    st.sm = Math.max(17.5, st.sm - .06);
    st.fl = 0;
}
else if (st.phase === 'run') {
    if (st.wait > 0) {
        st.wait--;
        st.fl = 0;
        st.sm -= .06;
    }
    else {
        st.fl = 18.2 + Math.sin(st.min) * .3;
        st.sm = Math.min(34, st.sm + 1.1);
        st.wt += .3;
        if (st.sm >= 33.9) {
            st.phase = 'done';
            st.done = st.min;
            st.fl = 0;
        }
    }
}
else {
    st.sm = Math.max(31, st.sm - .03);
    st.fl = 0;
} st.s1.push((st.sm - 10) / 30 * 100); st.s1.shift(); st.s2.push(st.fl); st.s2.shift(); return st; }
export function activateBackup(st: FarmStory): FarmStory { return st.phase === 'done' ? initialFarmStory() : st.phase === 'fault' ? { ...st, phase: 'run', wait: 2 } : st; }
export const farmTime = (min: number) => `${String(Math.floor(min / 60) % 24).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
export function storyText(st: FarmStory, screen: 'ov' | 'dv', modal: string) {
    const f = st.phase === 'fault', run = st.phase === 'run', done = st.phase === 'done', on = run && st.wait === 0, s = Math.round(st.sm), t = farmTime(st.min);
    return {
        crumb: screen === 'dv' ? 'Systems / Zones / Zone B' : 'Overview', clk: t, date: `WED, 18 NOV 2026 · ${t} GST`, sm0: `${s}%`, dvlv: String(s), dvbig2: String(s), wt: `${Math.round(st.wt)} m³`, p1a: done ? 'Closed' : 'Open', p2a: `${st.fl.toFixed(1)} m³/h`, rate: on ? 'P2 · 14 A' : f ? '0 A' : 'P2 ready', zr: done ? '0 / 6' : '1 / 6', dvsub: f ? 'The valve opened at 05:30, but flow is 0 m³/h and the soil is still drying. Pump P1 draws 0 A: the supply pump has failed.' : run ? (st.wait > 0 ? 'Backup pump P2 is starting. The valve stays open, ready for the water.' : 'Water is reaching the roots at 18 m³/h. Soil at 30 cm is rising.') : `Soil back at ${s}%, above the full point. The valve closed itself and pump P1 is booked for repair.`, dvchip: f ? 'Critical' : run ? 'Acknowledged' : 'Resolved', dvbtn: f ? 'Start backup pump P2' : run ? (st.wait > 0 ? 'Pump P2 starting…' : 'Backup pump P2 running') : 'Replay the morning', dvago: `at ${t} · just now`, fr2t: f ? 'No flow, pump silent' : 'Flow restored', fr2s: f ? 'Flow meter · pump P1 current' : 'Backup pump P2 · 14 A', fr2v: `${st.fl.toFixed(0)} m³/h`, fr3t: f ? 'Crop stress if nothing changes' : done ? 'Full point reached' : 'Soil rising', fr3s: f ? 'Soil reaches 18%' : done ? '34% at 30 cm' : 'Refill to 34%', fr3v: f ? '12:00' : done ? '34%' : '↑', m1t: done ? 'Zone B irrigated by backup pump' : run ? 'Zone B: irrigating with backup pump' : 'Zone B: valve open, no water', m1p: f ? 'The valve opened on schedule at 05:30 but flow is 0 m³/h and soil at 30 cm is still falling. Pump P1 draws 0 A.' : run ? `Backup pump P2 started. Soil ${s}% and rising.` : `Closed at ${farmTime(st.done)}. Pump P1 repair booked.`, m1chip: f ? 'Critical' : run ? 'Acknowledged' : 'Cleared', ncrit: f ? '1' : '0', 'ncrit-s': f ? '1 open' : 'none open', nclr: done ? '3' : '2', sevtxt: `${done ? 2 : 3} items need you. Everything else is normal.`, needn: `${done ? 2 : 3} open`, bell: done ? '2' : '3', mk: modal.toUpperCase(), mt: `${modal} is in the full dashboard.`, fn: f ? 'Read together: the supply pump has failed, not the valve. Backup pump P2 is ready.' : run ? 'Backup pump started from the alert. The alert is acknowledged and stays open until the soil reaches its full point.' : `Resolved. The alert closed itself at the full point. Pump P1 repair is booked.`
    };
}
export function storyClass(key: string, fallback: string, st: FarmStory) { const f = st.phase === 'fault', run = st.phase === 'run', done = st.phase === 'done'; switch (key) {
    case 'sm0':
    case 'rate': return f ? 'bad' : '';
    case 'p2a': return f ? 'bad' : run && st.wait === 0 ? 'good' : '';
    case 'dvchip': return `db-chip ${f ? 'crit' : run ? 'ack' : 'good'}`;
    case 'dvbtn': return `db-btn${f ? ' pulse' : ''}`;
    case 'mini1': return `db-al${f ? '' : run ? ' ack' : ' good'}`;
    case 'm1chip': return `db-chip ${f ? 'crit' : run ? 'ack' : 'good'}`;
    case 'fr1': return `db-fr ${f ? 'crit' : 'good'}`;
    case 'fr2': return `db-fr ${f ? 'crit' : run ? '' : 'good'}`;
    case 'fr3': return `db-fr ${f ? '' : 'good'}`;
    case 'navdot':
    case 'tbdot': return `db-dot${!f ? ' off' : ''}`;
    case 'almdot':
    case 'tbalm': return `db-dot${done ? ' off' : ''}`;
    default: return fallback;
} }
export function chartPath(values: number[], kind: 'soil' | 'flow') { return values.map((v, i) => `${i ? 'L' : 'M'}${(i / (values.length - 1) * 600).toFixed(1)} ${(kind === 'soil' ? 10 + (1 - v / 100) * 100 : 165 - v / 25 * 45).toFixed(1)}`).join(' '); }
export function waterSavings(values: {
    h: number;
    w: number;
    r: number;
    c: number;
}) { const cubicMetres = values.h * values.w * values.r / 100, annualValue = cubicMetres * values.c; return { cubicMetres, annualValue, monthlyValue: annualValue / 12, perHectare: annualValue / values.h, tankers: cubicMetres / 2500 }; }
