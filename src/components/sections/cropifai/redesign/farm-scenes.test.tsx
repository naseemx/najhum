// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import FarmTour from './FarmTour';
import CropExplorer from './CropExplorer';
import DashboardDemo from './DashboardDemo';
const state = vi.hoisted(() => ({ renderers: [] as {
        dispose: ReturnType<typeof vi.fn>;
        forceContextLoss: ReturnType<typeof vi.fn>;
    }[] }));
vi.mock('three', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three')>();
    return { ...actual, WebGLRenderer: class {
            domElement = document.createElement('canvas');
            shadowMap = { enabled: false, type: 0 };
            dispose = vi.fn();
            forceContextLoss = vi.fn();
            constructor() { state.renderers.push(this); }
            setPixelRatio() { }
            setSize() { }
            render(scene: import('three').Scene, camera: import('three').Camera) { scene.updateMatrixWorld(true); camera.updateMatrixWorld(true); expect(camera.projectionMatrix.elements.every(Number.isFinite)).toBe(true); scene.traverse(node => expect(node.matrixWorld.elements.every(Number.isFinite)).toBe(true)); }
        } };
});
import { mountFarmScenes } from './farm-scenes';
afterEach(() => { document.body.innerHTML = ''; state.renderers.length = 0; vi.unstubAllGlobals(); vi.restoreAllMocks(); });
describe('ported Three.js scene lifecycle', () => {
    it('builds the farm, both dashboard scenes and all six crops with the installed Three.js API', () => {
        vi.stubGlobal('matchMedia', () => ({ matches: true }));
        vi.stubGlobal('ResizeObserver', class {
            observe() { }
            disconnect() { }
        });
        vi.stubGlobal('IntersectionObserver', class {
            observe() { }
            disconnect() { }
        });
        const warning = vi.spyOn(console, 'warn');
        const root = document.createElement('div');
        root.className = 'njcr';
        root.innerHTML = renderToStaticMarkup(<><FarmTour /><CropExplorer /><DashboardDemo /></>);
        document.body.append(root);
        const cleanup = mountFarmScenes(root);
        expect(warning).not.toHaveBeenCalled();
        expect(root.classList.contains('has3d')).toBe(true);
        expect(root.querySelectorAll('canvas')).toHaveLength(4);
        for (let i = 0; i < 6; i++) {
            const radio = root.querySelector<HTMLInputElement>(`#njcr-cp${i}`)!;
            radio.checked = true;
            radio.dispatchEvent(new Event('change', { bubbles: true }));
        }
        for (let i = 0; i < 7; i++) {
            const radio = root.querySelector<HTMLInputElement>(`#njcr-ft${i}`)!;
            radio.checked = true;
            radio.dispatchEvent(new Event('change', { bubbles: true }));
        }
        expect(warning).not.toHaveBeenCalled();
        cleanup();
        expect(root.querySelectorAll('canvas')).toHaveLength(0);
        expect(root.classList.contains('has3d')).toBe(false);
        for (const renderer of state.renderers) {
            expect(renderer.dispose).toHaveBeenCalledOnce();
            expect(renderer.forceContextLoss).toHaveBeenCalledOnce();
        }
    });
});
