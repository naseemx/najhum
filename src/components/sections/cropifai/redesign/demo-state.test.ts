import { describe, it, expect } from 'vitest';
import { initialFarmStory, activateBackup, advanceFarmStory, chartPath, waterSavings, farmTime } from './demo-state';
describe('cropifAI illustrative farm story', () => {
    it('starts with a failed pump and no flow, without mutating the previous state', () => {
        const initial = initialFarmStory(), next = advanceFarmStory(initial);
        expect(initial.sm).toBe(21);
        expect(initial.min).toBe(342);
        expect(next.sm).toBeLessThan(initial.sm);
        expect(next.fl).toBe(0);
        expect(next.s1).toHaveLength(72);
    });
    it('starts the backup, restores flow, reaches the full point and closes the valve', () => {
        let state = activateBackup(initialFarmStory());
        expect(state.phase).toBe('run');
        expect(state.wait).toBe(2);
        state = advanceFarmStory(advanceFarmStory(state));
        expect(state.fl).toBe(0);
        state = advanceFarmStory(state);
        expect(state.fl).toBeGreaterThan(17);
        expect(state.sm).toBeGreaterThan(21);
        for (let i = 0; i < 20; i++)
            state = advanceFarmStory(state);
        expect(state.phase).toBe('done');
        expect(state.fl).toBe(0);
        expect(state.sm).toBeGreaterThan(31);
        expect(state.done).toBeGreaterThan(342);
        expect(activateBackup(state)).toEqual(initialFarmStory());
    });
    it('does not restart a pump already running', () => { const running = activateBackup(initialFarmStory()); expect(activateBackup(running)).toBe(running); });
    it('keeps chart values finite and history bounded through a full demo cycle', () => {
        let state = activateBackup(initialFarmStory());
        for (let i = 0; i < 100; i++)
            state = advanceFarmStory(state);
        expect(state.s1).toHaveLength(72);
        expect(state.s2).toHaveLength(72);
        expect(chartPath(state.s1, 'soil')).not.toMatch(/NaN|Infinity/);
        expect(farmTime(342)).toBe('05:42');
    });
});
describe('water savings calculator', () => {
    it('uses the entered area, annual consumption, saving rate and unit cost', () => {
        expect(waterSavings({ h: 120, w: 12000, r: 25, c: 4 })).toEqual({ cubicMetres: 360000, annualValue: 1440000, monthlyValue: 120000, perHectare: 12000, tankers: 144 });
    });
    it('scales proportionally rather than presenting a fixed promotional number', () => {
        const small = waterSavings({ h: 1, w: 2000, r: 5, c: .5 });
        expect(small.cubicMetres).toBe(100);
        expect(small.annualValue).toBe(50);
        expect(small.perHectare).toBe(50);
    });
});
