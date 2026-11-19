/** Procedural scene geometry adapted from the supplied cropifAI design.
 * Three.js comes from the project's dependency; no bundled legacy library or eval.
 * React owns this renderer's mount/unmount and all resources are disposed below. */
import * as THREE from 'three';
export function mountFarmScenes(root) {
    const document = root.ownerDocument, frames = new Set(), timers = new Set(), intervals = new Set(), observers = [], listeners = [], renderers = [], scenes = [], nodes = [];
    let alive = true;
    const raf = fn => { if (!alive)
        return 0; const id = requestAnimationFrame(time => { frames.delete(id); if (alive)
        fn(time); }); frames.add(id); return id; };
    const interval = (fn, ms) => { const id = setInterval(() => { if (alive)
        fn(); }, ms); intervals.add(id); return id; };
    function listen(target, type, fn, options) { target.addEventListener(type, fn, options); listeners.push(() => target.removeEventListener(type, fn, options)); }
    function createElement(tag) { const node = document.createElement(tag); nodes.push(node); return node; }
    function ManagedResizeObserver(fn) { const observer = new ResizeObserver(entries => { if (alive)
        fn(entries); }); observers.push(observer); return observer; }
    function ManagedIntersectionObserver(fn, options) { const observer = new IntersectionObserver(entries => { if (alive)
        fn(entries); }, options); observers.push(observer); return observer; }
    function TrackedWebGLRenderer(options) { const renderer = new THREE.WebGLRenderer(options); renderers.push(renderer); return renderer; }
    function TrackedScene() { const scene = new THREE.Scene(); scenes.push(scene); return scene; }
    function initialise() {
        (function () {
            var db = root.querySelector('.db');
            if (!db || !THREE)
                return;
            var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            try { }
            catch {
                return;
            }
            var C = function (h) { return new THREE.Color(h); };
            var M = function (h, o) { var m = new THREE.MeshStandardMaterial({ color: C(h), roughness: 0.55, metalness: 0.02 }); if (o)
                for (var k in o) {
                    if (k === 'emissive')
                        m.emissive = C(o[k]);
                    else
                        m[k] = o[k];
                } return m; };
            var mesh = function (g, m, sh) { var x = new THREE.Mesh(g, m); x.castShadow = sh !== false; x.receiveShadow = true; return x; };
            var box = function (w, h, d, m) { var g = new THREE.BoxGeometry(w, h, d); g.translate(0, h / 2, 0); return mesh(g, m); };
            var cyl = function (rt, rb, h, m, seg) { var g = new THREE.CylinderGeometry(rt, rb, h, seg || 28); g.translate(0, h / 2, 0); return mesh(g, m); };
            var sph = function (r, m) { return mesh(new THREE.SphereGeometry(r, 20, 14), m); };
            var at = function (o, x, y, z) { o.position.set(x, y, z); return o; };
            var grp = function () { return new THREE.Group(); };
            var rbox = function (w, h, d, r, m) {
                r = Math.min(r, w / 2 - 0.001, d / 2 - 0.001);
                var s = new THREE.Shape(), x = -w / 2, y = -d / 2;
                s.moveTo(x + r, y);
                s.lineTo(x + w - r, y);
                s.quadraticCurveTo(x + w, y, x + w, y + r);
                s.lineTo(x + w, y + d - r);
                s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
                s.lineTo(x + r, y + d);
                s.quadraticCurveTo(x, y + d, x, y + d - r);
                s.lineTo(x, y + r);
                s.quadraticCurveTo(x, y, x + r, y);
                var g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: false, curveSegments: 6 });
                g.rotateX(-Math.PI / 2);
                return mesh(g, m);
            };
            var dot = function (c) { return '<i class="x' + c + '"></i>'; };
            var WHITE = M('#FFFFFF', { roughness: 0.45 }), GREY = M('#94A3B8'), DARK = M('#1E293B', { roughness: 0.4 });
            function View(host, build, opt) {
                var v = { host: host, labels: [], up: [], az: opt.az, el: opt.el, F: opt.F, tgt: opt.tgt, motion: true, drag: null, last: -9, T: 0 };
                v.r = new TrackedWebGLRenderer({ antialias: true, alpha: true });
                v.r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
                v.r.shadowMap.enabled = true;
                v.r.shadowMap.type = THREE.PCFSoftShadowMap;
                v.r.outputColorSpace = THREE.SRGBColorSpace;
                v.r.toneMapping = THREE.ACESFilmicToneMapping;
                v.r.toneMappingExposure = 1.08;
                host.insertBefore(v.r.domElement, host.firstChild);
                v.lab = createElement('div');
                v.lab.className = 'db-l';
                host.appendChild(v.lab);
                v.s = new TrackedScene();
                v.s.add(new THREE.HemisphereLight(C('#FFFFFF'), C('#CBD5E1'), 0.78));
                var d = new THREE.DirectionalLight(0xffffff, 1.1);
                d.position.set(7, 14, 9);
                d.castShadow = true;
                d.shadow.mapSize.set(1536, 1536);
                var sc = d.shadow.camera;
                sc.left = -12;
                sc.right = 12;
                sc.top = 12;
                sc.bottom = -12;
                d.shadow.bias = -0.0004;
                d.shadow.radius = 4;
                v.s.add(d);
                v.s.add(new THREE.AmbientLight(0xffffff, 0.12));
                var sh = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: 0.1 }));
                sh.rotation.x = -Math.PI / 2;
                sh.position.y = -0.01;
                sh.receiveShadow = true;
                v.s.add(sh);
                v.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
                v.L = function (pos, html, cls, goto) { var e = createElement('div'); e.className = 'db-p ' + (cls || ''); e.innerHTML = html; if (goto) {
                    e.classList.add('go');
                    listen.bind(null, e)('click', function () { db.dispatchEvent(new CustomEvent('dbgo', { detail: goto })); });
                } v.lab.appendChild(e); var l = { p: pos, e: e }; v.labels.push(l); return e; };
                build(v);
                var cv = v.r.domElement, W = 1, H = 1, p3 = new THREE.Vector3();
                v.size = function () { var b = host.getBoundingClientRect(); W = Math.max(10, b.width); H = Math.max(10, b.height); v.r.setSize(W, H, false); var a = W / H, F = v.F * (a < 1.25 ? Math.max(1, 1.1 / a) : 1) * (W < 480 ? 1.2 : 1); v.narrow = W < 480; v.cam.left = -F * a; v.cam.right = F * a; v.cam.top = F; v.cam.bottom = -F; v.cam.updateProjectionMatrix(); };
                v.frame = function (dt) {
                    v.T += dt;
                    v.up.forEach(function (f) { f(v.T, dt); });
                    var a = v.az + (reduce || !v.motion || v.drag || v.T - v.last < 4 ? 0 : Math.sin(v.T * 0.2) * 0.25), R = 40, t = v.tgt;
                    v.cam.position.set(t.x + R * Math.cos(v.el) * Math.sin(a), t.y + R * Math.sin(v.el), t.z + R * Math.cos(v.el) * Math.cos(a));
                    v.cam.lookAt(t);
                    v.r.render(v.s, v.cam);
                    v.labels.forEach(function (l) { p3.copy(l.p).project(v.cam); var x = (p3.x * 0.5 + 0.5) * W, y = (-p3.y * 0.5 + 0.5) * H; l.e.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) translate(-50%,-100%)'; l.e.style.opacity = (x < -30 || x > W + 30 || y < 0 || y > H + 20) ? 0 : 1; });
                };
                listen.bind(null, cv)('pointerdown', function (e) { v.drag = { x: e.clientX, y: e.clientY, az: v.az, el: v.el }; cv.setPointerCapture(e.pointerId); });
                listen.bind(null, cv)('pointermove', function (e) { if (!v.drag)
                    return; v.az = v.drag.az - (e.clientX - v.drag.x) * 0.008; v.el = Math.max(0.35, Math.min(1.5, v.drag.el + (e.clientY - v.drag.y) * 0.004)); v.last = v.T; });
                var end = function () { v.drag = null; v.last = v.T; };
                listen.bind(null, cv)('pointerup', end);
                listen.bind(null, cv)('pointercancel', end);
                host.querySelectorAll('[data-cam]').forEach(function (b) {
                    listen.bind(null, b)('click', function () {
                        var k = b.getAttribute('data-cam');
                        if (k === 'motion') {
                            v.motion = !v.motion;
                            b.classList.toggle('on', v.motion);
                            b.lastChild.textContent = v.motion ? 'Motion on' : 'Motion off';
                        }
                        else {
                            v.el = k === 'top' ? 1.45 : opt.el;
                            v.az = opt.az;
                            host.querySelectorAll('[data-cam="3d"],[data-cam="top"]').forEach(function (x) { x.classList.toggle('on', x === b); });
                        }
                    });
                });
                if ('ResizeObserver' in window)
                    new ManagedResizeObserver(function () { v.size(); }).observe(host);
                v.size();
                return v;
            }
            var ST = function () { return db._st || { phase: 'fault' }; };
            var person = function (col, sc) {
                var g = grp(), m = M(col || '#3B4BDB', { roughness: 0.35 });
                var b = mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.36, 16), m);
                b.position.y = 0.36;
                g.add(b);
                var s1 = sph(0.13, m);
                s1.position.y = 0.18;
                g.add(s1);
                var hd = sph(0.11, m);
                hd.position.y = 0.66;
                g.add(hd);
                if (sc)
                    g.scale.setScalar(sc);
                return g;
            };
            /* ---- cropifAI: the date farm (overview) and Zone B (close-up), same look as the hero twin ---- */
            var V3 = function (x, y, z) { return new THREE.Vector3(x, y, z); };
            var G0 = 0.3, TRUNK = M('#8B5E34', { roughness: 0.9 }), BOOT = M('#6B4423', { roughness: 0.9 });
            var FR = [M('#3F6212', { roughness: 0.75, side: THREE.DoubleSide }), M('#4D7C0F', { roughness: 0.75, side: THREE.DoubleSide }), M('#65A30D', { roughness: 0.75, side: THREE.DoubleSide })];
            var PIPE = M('#334155', { roughness: 0.5 }), DRIP = M('#1F2937', { roughness: 0.6 });
            var frondG = (function () {
                var g = new THREE.PlaneGeometry(0.3, 1, 2, 10);
                g.rotateX(-Math.PI / 2);
                g.translate(0, 0, 0.5);
                var p = g.attributes.position;
                for (var i = 0; i < p.count; i++) {
                    var z = p.getZ(i), x = p.getX(i), w = Math.sin(Math.min(1, z * 1.05) * Math.PI) * 0.85 + 0.12;
                    x *= w;
                    p.setX(i, x);
                    p.setY(i, 0.42 * z - 0.85 * z * z - Math.abs(x) * 0.35);
                }
                g.computeVertexNormals();
                return g;
            })();
            var palm = function (h, s) {
                var g = grp();
                g.add(cyl(0.06, 0.1, h, TRUNK, 7));
                g.add(at(cyl(0.12, 0.08, 0.22, BOOT, 7), 0, h - 0.12, 0));
                var n = 11, o = Math.random() * 6;
                for (var i = 0; i < n; i++) {
                    var f = mesh(frondG, FR[i % 3]);
                    f.rotation.order = 'YXZ';
                    f.rotation.y = o + i / n * Math.PI * 2;
                    f.rotation.x = -0.05 + (i % 2) * 0.12;
                    f.scale.setScalar(s);
                    f.position.y = h + 0.04;
                    g.add(f);
                }
                for (var j = 0; j < 4; j++) {
                    var u = mesh(frondG, FR[2]);
                    u.rotation.order = 'YXZ';
                    u.rotation.y = o + j * 1.57 + 0.4;
                    u.rotation.x = -0.75;
                    u.scale.setScalar(s * 0.55);
                    u.position.y = h + 0.06;
                    g.add(u);
                }
                return g;
            };
            var tree = function (h, col) { var g = grp(); g.add(cyl(0.06, 0.08, h * 0.5, TRUNK, 7)); g.add(at(sph(h * 0.42, M(col, { roughness: 0.8 })), 0, h * 0.75, 0)); return g; };
            var pipe = function (s, x0, z0, x1, z1, r, m, y) { var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz); var p = mesh(new THREE.CylinderGeometry(r, r, l, 8), m, false); p.rotation.z = Math.PI / 2; p.rotation.y = -Math.atan2(dz, dx); p.position.set((x0 + x1) / 2, y, (z0 + z1) / 2); s.add(p); return p; };
            var valve3 = function () {
                var g = grp();
                var b = mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.44, 12), DARK);
                b.rotation.z = Math.PI / 2;
                b.position.y = 0.12;
                g.add(b);
                g.add(at(cyl(0.12, 0.14, 0.26, M('#84CC16', { roughness: 0.35 })), 0, 0.18, 0));
                var p = box(0.3, 0.025, 0.22, M('#1E3A8A', { metalness: 0.4 }));
                p.position.set(-0.2, 0.56, 0);
                p.rotation.z = 0.6;
                g.add(p);
                g.add(at(cyl(0.015, 0.015, 0.5, GREY, 6), -0.2, 0.08, 0));
                var led = sph(0.035, M('#22C55E', { emissive: '#22C55E', emissiveIntensity: 1.6 }));
                led.position.set(0.08, 0.42, 0.12);
                g.add(led);
                g.userData.led = led;
                return g;
            };
            var probe = function () {
                var pr = grp();
                pr.add(cyl(0.035, 0.035, 0.9, GREY, 8));
                var h = rbox(0.26, 0.22, 0.2, 0.05, WHITE);
                h.position.y = 0.9;
                pr.add(h);
                var sp = box(0.24, 0.02, 0.18, M('#1E3A8A', { metalness: 0.4 }));
                sp.position.set(0, 1.16, 0);
                sp.rotation.x = -0.5;
                pr.add(sp);
                return pr;
            };
            var bed = function (s, cx, cz, zw, zd, sgn, m, bm, rows, cols, dx, dz) {
                var b = box(zw, 0.08, zd, m);
                b.position.set(cx, G0, cz);
                b.castShadow = false;
                s.add(b);
                var top = G0 + 0.08;
                pipe(s, cx - zw / 2 + 0.25, cz - sgn * (zd / 2 - 0.2), cx + zw / 2 - 0.25, cz - sgn * (zd / 2 - 0.2), 0.03, DRIP, top + 0.03);
                var px = [], pz = [];
                for (var c = 0; c < cols; c++)
                    px.push(cx - (cols - 1) * dx / 2 + c * dx);
                for (var r = 0; r < rows; r++)
                    pz.push(cz - (rows - 1) * dz / 2 + r * dz);
                px.forEach(function (x) {
                    pipe(s, x, cz - zd / 2 + 0.2, x, cz + zd / 2 - 0.2, 0.018, DRIP, top + 0.02);
                    pz.forEach(function (z) {
                        var bs = mesh(new THREE.CylinderGeometry(0.46, 0.5, 0.03, 20), bm, false);
                        bs.position.set(x, top + 0.015, z);
                        s.add(bs);
                        s.add(at(palm(1.25 + Math.random() * 0.45, 0.82 + Math.random() * 0.12), x, top, z));
                    });
                });
                return { px: px, pz: pz, top: top };
            };
            function farm(v) {
                var s = v.s;
                s.add(box(23.4, 0.3, 13, M('#E8D9B8', { roughness: 1 })));
                var yard = box(4.6, 0.04, 9.6, M('#D4D4D0', { roughness: 0.9 }));
                yard.position.set(8.6, G0, 0);
                yard.castShadow = false;
                s.add(yard);
                for (var t = 0; t < 9; t++)
                    s.add(at(tree(0.9 + (t % 3) * 0.15, t % 2 ? '#65A30D' : '#4D7C0F'), -10.6 + t * 2.0, G0, -5.9));
                pipe(s, -10.3, 0, 7.4, 0, 0.055, PIPE, G0 + 0.06);
                var zm = [], bz = [];
                for (var i = 0; i < 6; i++) {
                    var r = Math.floor(i / 3), c = i % 3, cx = -8 + c * 5.2, cz = (r ? 1 : -1) * 2.55, sgn = r ? 1 : -1;
                    var m = M('#C49A68', { roughness: 0.95 }), bm = M('#8A6239', { roughness: 0.95 });
                    zm.push(m);
                    bz.push(bm);
                    bed(s, cx, cz, 4.4, 4.0, sgn, m, bm, 2, 3, 1.45, 2.0);
                    var vv = valve3();
                    at(vv, cx - 2.2 + 0.45, G0, sgn * 0.42);
                    s.add(vv);
                    pipe(s, cx - 1.75, sgn * 0.42, cx - 1.75, cz - sgn * 1.8, 0.03, DRIP, G0 + 0.11);
                }
                s.add(at(probe(), -2.07, G0 + 0.08, -2.55));
                var tk = grp();
                tk.add(cyl(1.25, 1.25, 0.16, M('#CBD5E1')));
                tk.add(at(cyl(1.15, 1.15, 1.4, M('#E2E8F0', { metalness: 0.3 })), 0, 0.16, 0));
                var wtr = mesh(new THREE.CylinderGeometry(1.08, 1.08, 0.05, 32), M('#38BDF8', { transparent: true, opacity: 0.9 }), false);
                wtr.position.y = 1.5;
                tk.add(wtr);
                at(tk, 9.2, G0, -3.1);
                s.add(tk);
                pipe(s, 8.1, -2.4, 8.1, -0.6, 0.05, PIPE, G0 + 0.1);
                var hut = grp();
                hut.add(box(1.7, 1.1, 1.4, M('#F5F0E8')));
                hut.add(at(box(1.9, 0.1, 1.6, M('#15803D')), 0, 1.1, 0));
                at(hut, 8.3, G0, 0.2);
                s.add(hut);
                var ws = grp();
                ws.add(cyl(0.04, 0.04, 2.2, GREY, 8));
                ws.add(at(cyl(0.2, 0.2, 0.32, WHITE), 0, 1.75, 0));
                at(ws, 9.6, G0, 3.4);
                s.add(ws);
                var lz = v.L(V3(-2.8, 2.4, -2.55), '', 'big', 'dv');
                v.L(V3(9.2, 2.4, -3.1), dot('b') + 'Reservoir · <b>72%</b>', 'sm');
                v.L(V3(2.4, 2.3, 2.55), dot('a') + 'Zone F · <b>EC 3.1</b>', 'sm');
                v.L(V3(-8, 2.3, 2.55), dot('g') + 'Zone D · <b>29%</b>', 'sm');
                /* narrow (phone) panels: frame the farm tighter and lower */
                var fit = function (v, wide, nar) { var n = v.host.clientWidth < 480, k = n ? nar : wide; if (v._fitN === n)
                    return; v._fitN = n; v.F = k[0]; v.tgt.set(k[1], k[2], k[3]); v.size(); };
                v.up.push(function () { fit(v, [9.2, -1.2, 0.3, 0.7], [8.4, -0.9, 0.3, -1.5]); });
                v.up.push(function (t) {
                    var st = ST(), f = st.phase === 'fault', run = st.phase === 'run', sm = st.sm || 21;
                    zm[1].color.copy(C(f ? '#F3A6A0' : run ? '#E9C98A' : '#C49A68'));
                    zm[1].emissive = C(f ? '#EF4444' : '#000000');
                    zm[1].emissiveIntensity = f ? 0.22 + 0.18 * Math.sin(t * 4) : 0;
                    bz[1].color.copy(C(f ? '#DC2626' : run ? '#B45309' : '#8A6239'));
                    bz[1].emissive = C(f ? '#EF4444' : '#000000');
                    bz[1].emissiveIntensity = f ? 0.35 + 0.25 * Math.sin(t * 4) : 0;
                    zm[5].color.copy(C('#D9B77A'));
                    lz.className = 'db-p big go ' + (f ? 'hot' : run ? 'warn' : '');
                    lz.innerHTML = dot(f ? 'r' : run ? 'a' : 'g') + 'Zone B · <b>' + Math.round(sm) + '%</b>' + (f && !v.narrow ? ' · valve open, no water' : '');
                });
            }
            function zoneB(v) {
                var s = v.s;
                s.add(box(13, 0.3, 8.6, M('#E8D9B8', { roughness: 1 })));
                var soilM = M('#C49A68', { roughness: 0.95 }), bm = M('#8A6239', { roughness: 0.95 });
                var B = bed(s, 0.6, 0.2, 10.4, 6.6, -1, soilM, bm, 3, 5, 2.0, 2.0);
                pipe(s, -5.6, -3.6, -5.6, 3.6, 0.07, PIPE, G0 + 0.08);
                var vv = valve3();
                vv.rotation.y = Math.PI / 2;
                at(vv, -4.6, G0, -2.6);
                s.add(vv);
                pipe(s, -5.6, -2.6, -4.3, -2.6, 0.04, DRIP, G0 + 0.12);
                var drops = [];
                for (var k = 0; k < 60; k++) {
                    var e = mesh(new THREE.SphereGeometry(0.035, 8, 6), new THREE.MeshStandardMaterial({ color: C('#38BDF8'), emissive: C('#0EA5E9'), emissiveIntensity: 0.9, transparent: true, opacity: 0.85 }), false);
                    e.userData = { b: k % 15, a: Math.random() * 6.28, o: Math.random() };
                    s.add(e);
                    drops.push(e);
                }
                s.add(at(probe(), 1.6, G0 + 0.08, 1.2));
                var tech = person('#F59E0B');
                s.add(tech);
                tech.visible = false;
                var lv = v.L(V3(-4.6, 1.6, -2.6), '', 'big'), ls = v.L(V3(1.6, 1.9, 1.2), '', '');
                v.up.push(function (t) {
                    var st = ST(), f = st.phase === 'fault', run = st.phase === 'run', on = run && !(st.wait > 0), sm = st.sm || 21;
                    soilM.color.copy(C(sm > 28 ? '#8A6239' : sm > 23 ? '#A87A4A' : '#C9A06A'));
                    drops.forEach(function (e) {
                        var u = (e.userData.o + t * 0.8) % 1, b = e.userData.b, x = B.px[b % 5], z = B.pz[Math.floor(b / 5)];
                        e.visible = on;
                        e.position.set(x + Math.cos(e.userData.a) * 0.38, B.top + 0.05 + Math.sin(u * Math.PI) * 0.1, z + Math.sin(e.userData.a) * 0.38);
                    });
                    vv.userData.led.material.emissive = C(f ? '#EF4444' : '#22C55E');
                    tech.visible = run;
                    if (run)
                        tech.position.set(-5.2, G0 + 0.06, -1.4);
                    lv.className = 'db-p big ' + (f ? 'hot' : run ? 'warn' : '');
                    lv.innerHTML = dot(f ? 'r' : on ? 'g' : 'a') + 'Valve <b>' + (st.phase === 'done' ? 'closed' : 'open') + '</b> · ' + (on ? (st.fl || 18).toFixed(1) : '0') + ' m³/h' + (f ? ' · no water' : '');
                    ls.className = 'db-p ' + (sm < 22 ? 'warn' : '');
                    ls.innerHTML = dot(sm < 22 ? 'a' : 'g') + 'Soil 30 cm <b>' + Math.round(sm) + '%</b>';
                });
            }
            var SCENES = { site: function (v) { farm(v); }, dev: function (v) { zoneB(v); },
                siteCam: { az: 0.6, el: 0.62, F: 9.2, tgt: new THREE.Vector3(-1.2, 0.3, 0.7) }, devCam: { az: 0.5, el: 0.6, F: 3.9, tgt: new THREE.Vector3(-0.6, 0.7, 0.1) } };
            db.classList.add('has3d');
            var views = [], hostS = db.querySelector('[data-3d="site"]'), hostT = db.querySelector('[data-3d="dev"]');
            if (hostS)
                views.push(View(hostS, SCENES.site, SCENES.siteCam));
            if (hostT)
                views.push(View(hostT, SCENES.dev, SCENES.devCam));
            var running = false, vis = false, last = null;
            var active = function () { return views.filter(function (v) { return v.host.offsetParent !== null; }); };
            function loop(ts) { if (!running)
                return; if (last === null)
                last = ts; var dt = Math.min(0.05, (ts - last) / 1000); last = ts; active().forEach(function (v) { v.frame(dt); }); raf(loop); }
            function start() { if (running || !vis)
                return; running = true; last = null; raf(loop); }
            listen.bind(null, db)('dbscreen', function () { active().forEach(function (v) { v.size(); v.frame(0); }); });
            views.forEach(function (v) { if (v.host.offsetParent !== null)
                v.frame(0); });
            if (reduce) {
                interval(function () { if (vis)
                    active().forEach(function (v) { v.frame(0); }); }, 1200);
            }
            if ('IntersectionObserver' in window)
                new ManagedIntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis && !reduce)
                    start();
                else
                    running = false; }, { threshold: 0.05 }).observe(db);
            else {
                vis = true;
                if (!reduce)
                    start();
            }
            listen.bind(null, document)('visibilitychange', function () { if (document.hidden)
                running = false;
            else if (!reduce)
                start(); });
        })();
        /* ---------- Site explorer: real-time 3D scenes (three.js, local copy) ---------- */
        var host = root.querySelector('.bx-map');
        if (!host || !THREE)
            return;
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var renderer;
        try {
            renderer = new TrackedWebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        }
        catch {
            return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.08;
        /* stage */
        var stage = createElement('div');
        stage.className = 'g3';
        var lab = createElement('div');
        lab.className = 'g3-l';
        lab.setAttribute('aria-hidden', 'true');
        var hint = createElement('div');
        hint.className = 'g3-h';
        hint.textContent = 'Drag to rotate';
        stage.appendChild(renderer.domElement);
        stage.appendChild(lab);
        stage.appendChild(hint);
        root.classList.add('has3d');
        /* helpers */
        var C = function (h) { return new THREE.Color(h); };
        var M = function (h, o) { var m = new THREE.MeshStandardMaterial({ color: C(h), roughness: 0.55, metalness: 0.02 }); if (o)
            for (var k in o) {
                if (k === 'emissive')
                    m.emissive = C(o[k]);
                else
                    m[k] = o[k];
            } return m; };
        var mesh = function (g, m, sh) { var x = new THREE.Mesh(g, m); x.castShadow = sh !== false; x.receiveShadow = true; return x; };
        var rbox = function (w, h, d, r, m) {
            r = Math.min(r, w / 2 - 0.001, d / 2 - 0.001);
            var s = new THREE.Shape(), x = -w / 2, y = -d / 2;
            s.moveTo(x + r, y);
            s.lineTo(x + w - r, y);
            s.quadraticCurveTo(x + w, y, x + w, y + r);
            s.lineTo(x + w, y + d - r);
            s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
            s.lineTo(x + r, y + d);
            s.quadraticCurveTo(x, y + d, x, y + d - r);
            s.lineTo(x, y + r);
            s.quadraticCurveTo(x, y, x + r, y);
            var g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: true, bevelThickness: Math.min(0.06, h / 4), bevelSize: Math.min(0.05, r / 2), bevelSegments: 3, curveSegments: 8 });
            g.rotateX(-Math.PI / 2);
            g.translate(0, Math.min(0.06, h / 4), 0);
            return mesh(g, m);
        };
        var box = function (w, h, d, m) { var g = new THREE.BoxGeometry(w, h, d); g.translate(0, h / 2, 0); return mesh(g, m); };
        var cyl = function (rt, rb, h, m, seg) { var g = new THREE.CylinderGeometry(rt, rb, h, seg || 24); g.translate(0, h / 2, 0); return mesh(g, m); };
        var sph = function (r, m) { return mesh(new THREE.SphereGeometry(r, 24, 16), m); };
        var at = function (o, x, y, z) { o.position.set(x, y, z); return o; };
        var grp = function () { return new THREE.Group(); };
        var MAT = {
            floor: M('#EEF2F7'), slab: M('#E2E8F0'), white: M('#FFFFFF', { roughness: 0.45 }), wall: M('#F8FAFC'), dark: M('#1E293B', { roughness: 0.4 }),
            grey: M('#94A3B8'), mid: M('#CBD5E1'), blue: M('#3B82F6'), ink: M('#0F172A'),
            ledG: M('#22C55E', { emissive: '#22C55E', emissiveIntensity: 1.6 }), ledA: M('#F59E0B', { emissive: '#F59E0B', emissiveIntensity: 1.8 }), ledR: M('#EF4444', { emissive: '#EF4444', emissiveIntensity: 2 })
        };
        var pulse = function (m, t, a, b, sp) { m.emissiveIntensity = a + (b - a) * (0.5 + 0.5 * Math.sin(t * (sp || 3))); };
        /* labels projected from 3D */
        var L = function (sc, pos, html, cls) { var e = createElement('div'); e.className = 'g3-p ' + (cls || ''); e.innerHTML = html; sc.labels.push({ p: pos, e: e }); return e; };
        var dot = function (c) { return '<i class="' + c + '"></i>'; };
        /* scene factory */
        function base(F, tx, tz) {
            var s = new TrackedScene();
            var sc = { s: s, F: F, tgt: new THREE.Vector3(tx || 0, 0.6, tz || 0), labels: [], up: [] };
            s.add(new THREE.HemisphereLight(C('#FFFFFF'), C('#CBD5E1'), 0.75));
            var d = new THREE.DirectionalLight(0xffffff, 1.15);
            d.position.set(7, 14, 9);
            d.castShadow = true;
            d.shadow.mapSize.set(2048, 2048);
            var c = d.shadow.camera;
            c.left = -12;
            c.right = 12;
            c.top = 12;
            c.bottom = -12;
            c.near = 1;
            c.far = 40;
            d.shadow.bias = -0.0004;
            d.shadow.radius = 4;
            s.add(d);
            s.add(new THREE.AmbientLight(0xffffff, 0.12));
            var sh = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: 0.12 }));
            sh.rotation.x = -Math.PI / 2;
            sh.position.y = -0.01;
            sh.receiveShadow = true;
            s.add(sh);
            return sc;
        }
        var B = [];
        /* ---------- cold chain builders ---------- */
        var B = [];
        /* ---------- shared props for the new pages ---------- */
        var V3 = function (x, y, z) { return new THREE.Vector3(x, y, z); };
        var lerp = function (a, b, u) { return a + (b - a) * Math.max(0, Math.min(1, u)); };
        var GL = function (c, o) { return new THREE.MeshStandardMaterial({ color: C(c || '#BFDBFE'), transparent: true, opacity: o || 0.28, roughness: 0.08, metalness: 0.1, depthWrite: false, side: THREE.DoubleSide }); };
        var tree = function (h, col) { var g = grp(); g.add(cyl(0.07, 0.09, (h || 1.2) * 0.5, M('#92400E'))); var c = sph((h || 1.2) * 0.42, M(col || '#4ADE80', { roughness: 0.8 })); c.position.y = (h || 1.2) * 0.75; g.add(c); return g; };
        var palm = function (h) { var g = grp(); h = h || 2.2; g.add(cyl(0.08, 0.12, h, M('#A16207'))); for (var i = 0; i < 7; i++) {
            var l = box(0.16, 0.04, 1.1, M('#16A34A', { roughness: 0.7 }));
            l.geometry.translate(0, 0, 0.55);
            l.position.y = h;
            l.rotation.y = i / 7 * Math.PI * 2;
            l.rotation.x = 0.35;
            g.add(l);
        } return g; };
        var tankV = function (r, h, col) {
            var g = grp();
            g.add(cyl(r + 0.1, r + 0.1, 0.16, MAT.mid));
            var sh = mesh(new THREE.CylinderGeometry(r, r, h, 40, 1, true), GL('#CBD5E1', 0.3), false);
            sh.position.y = 0.16 + h / 2;
            g.add(sh);
            var lid = mesh(new THREE.CylinderGeometry(r + 0.05, r + 0.05, 0.1, 40), M('#E2E8F0', { metalness: 0.3 }));
            lid.position.y = 0.16 + h;
            g.add(lid);
            var w = mesh(new THREE.CylinderGeometry(r - 0.05, r - 0.05, 1, 40), new THREE.MeshStandardMaterial({ color: C(col || '#38BDF8'), transparent: true, opacity: 0.78, roughness: 0.1 }), false);
            w.geometry.translate(0, 0.5, 0);
            w.position.y = 0.18;
            g.add(w);
            g.userData.set = function (f) { w.scale.y = Math.max(0.02, (h - 0.06) * f); };
            g.userData.h = h;
            return g;
        };
        /* ---------- cropifAI hero: a live 3D twin of a date farm ---------- */
        var G0 = 0.3; /* top of the sand plate */
        var TRUNK = M('#8B5E34', { roughness: 0.9 }), BOOT = M('#6B4423', { roughness: 0.9 });
        var FR = [M('#3F6212', { roughness: 0.75, side: THREE.DoubleSide }), M('#4D7C0F', { roughness: 0.75, side: THREE.DoubleSide }), M('#65A30D', { roughness: 0.75, side: THREE.DoubleSide })];
        /* one drooping frond, shared by every palm: tapers to a point, arches up then down, with a folded midrib */
        var frondG = (function () {
            var g = new THREE.PlaneGeometry(0.3, 1, 2, 10);
            g.rotateX(-Math.PI / 2);
            g.translate(0, 0, 0.5);
            var p = g.attributes.position;
            for (var i = 0; i < p.count; i++) {
                var z = p.getZ(i), x = p.getX(i), w = Math.sin(Math.min(1, z * 1.05) * Math.PI) * 0.85 + 0.12;
                x *= w;
                p.setX(i, x);
                p.setY(i, 0.42 * z - 0.85 * z * z - Math.abs(x) * 0.35);
            }
            g.computeVertexNormals();
            return g;
        })();
        var palm = function (h, s) {
            var g = grp();
            g.add(cyl(0.06, 0.1, h, TRUNK, 7));
            g.add(at(cyl(0.12, 0.08, 0.22, BOOT, 7), 0, h - 0.12, 0));
            var n = 11, o = Math.random() * 6;
            for (var i = 0; i < n; i++) {
                var f = mesh(frondG, FR[i % 3]);
                f.rotation.order = 'YXZ';
                f.rotation.y = o + i / n * Math.PI * 2;
                f.rotation.x = -0.05 + (i % 2) * 0.12;
                f.scale.setScalar(s);
                f.position.y = h + 0.04;
                g.add(f);
            }
            for (var j = 0; j < 4; j++) {
                var u = mesh(frondG, FR[2]);
                u.rotation.order = 'YXZ';
                u.rotation.y = o + j * 1.57 + 0.4;
                u.rotation.x = -0.75;
                u.scale.setScalar(s * 0.55);
                u.position.y = h + 0.06;
                g.add(u);
            }
            return g;
        };
        var valve = function () {
            var g = grp();
            var b = mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.44, 12), MAT.dark);
            b.rotation.z = Math.PI / 2;
            b.position.y = 0.12;
            g.add(b);
            g.add(at(cyl(0.12, 0.14, 0.26, M('#84CC16', { roughness: 0.35 })), 0, 0.18, 0));
            var p = box(0.3, 0.025, 0.22, M('#1E3A8A', { metalness: 0.4 }));
            p.position.set(-0.2, 0.56, 0);
            p.rotation.z = 0.6;
            g.add(p);
            g.add(at(cyl(0.015, 0.015, 0.5, MAT.grey, 6), -0.2, 0.08, 0));
            var led = sph(0.035, MAT.ledG);
            led.position.set(0.08, 0.42, 0.12);
            led.castShadow = false;
            g.add(led);
            g.userData.led = led;
            return g;
        };
        var pipe = function (s, x0, z0, x1, z1, r, m, y) { var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz); var p = mesh(new THREE.CylinderGeometry(r, r, l, 8), m, false); p.rotation.z = Math.PI / 2; p.rotation.y = -Math.atan2(dz, dx); p.position.set((x0 + x1) / 2, y, (z0 + z1) / 2); s.add(p); return p; };
        B[0] = function () {
            var sc = base(8.2, 0.4, 0), s = sc.s;
            sc.tgt.y = 0.4;
            /* ground: sand plate, a gravel equipment yard and a windbreak along the back */
            s.add(box(23.4, 0.3, 13, M('#E8D9B8', { roughness: 1 })));
            var yard = box(4.6, 0.04, 9.6, M('#D4D4D0', { roughness: 0.9 }));
            yard.position.set(8.6, G0, 0);
            yard.castShadow = false;
            s.add(yard);
            for (var t = 0; t < 9; t++) {
                var tr = tree(0.9 + (t % 3) * 0.15, t % 2 ? '#65A30D' : '#4D7C0F');
                at(tr, -10.6 + t * 2.0, G0, -5.9);
                s.add(tr);
            }
            var Z = [], zw = 4.4, zd = 4.0, PIPE = M('#334155', { roughness: 0.5 }), DRIP = M('#1F2937', { roughness: 0.6 });
            /* main line along the central track, to the pump house */
            pipe(s, -10.3, 0, 7.4, 0, 0.055, PIPE, G0 + 0.06);
            for (var r = 0; r < 2; r++)
                for (var c = 0; c < 3; c++) {
                    var cx = -8 + c * 5.2, cz = (r ? 1 : -1) * 2.55, sgn = r ? 1 : -1;
                    var m = M('#B98B58', { roughness: 0.95 }), bm = M('#8A6239', { roughness: 0.95 });
                    var bed = box(zw, 0.08, zd, m);
                    bed.position.set(cx, G0, cz);
                    bed.castShadow = false;
                    s.add(bed);
                    var top = G0 + 0.08;
                    /* sub-main along the bed edge, a drip lateral down each palm row */
                    pipe(s, cx - zw / 2 + 0.25, cz - sgn * (zd / 2 - 0.2), cx + zw / 2 - 0.25, cz - sgn * (zd / 2 - 0.2), 0.03, DRIP, top + 0.03);
                    var px = [cx - 1.45, cx, cx + 1.45], pz = [cz - 1.0, cz + 1.0], basins = [];
                    px.forEach(function (x) {
                        pipe(s, x, cz - zd / 2 + 0.2, x, cz + zd / 2 - 0.2, 0.018, DRIP, top + 0.02);
                        pz.forEach(function (z) {
                            var b = mesh(new THREE.CylinderGeometry(0.46, 0.5, 0.03, 20), bm, false);
                            b.position.set(x, top + 0.015, z);
                            s.add(b);
                            basins.push(b);
                            var p = palm(1.25 + Math.random() * 0.45, 0.82 + Math.random() * 0.12);
                            at(p, x, top, z);
                            s.add(p);
                        });
                    });
                    var v = valve();
                    at(v, cx - zw / 2 + 0.45, G0, sgn * 0.42);
                    s.add(v);
                    pipe(s, cx - zw / 2 + 0.45, sgn * 0.42, cx - zw / 2 + 0.45, cz - sgn * (zd / 2 - 0.2), 0.03, DRIP, top + 0.03);
                    var dr = [];
                    for (var k = 0; k < 18; k++) {
                        var e = sph(0.03, M('#38BDF8', { emissive: '#0EA5E9', emissiveIntensity: 0.9, transparent: true, opacity: 0.85 }));
                        e.castShadow = false;
                        e.userData = { b: k % 6, a: Math.random() * 6.28, o: Math.random() };
                        s.add(e);
                        dr.push(e);
                    }
                    Z.push({ m: m, bm: bm, v: v, dr: dr, cx: cx, cz: cz, px: px, pz: pz, top: top, moist: 22 + Math.random() * 8 });
                }
            /* soil probe between the palms of zone A, and one in zone E */
            var PROBE = [[-7.27, -2.55], [-2.07, 2.55]];
            PROBE.forEach(function (q) {
                var pr = grp();
                pr.add(cyl(0.035, 0.035, 0.9, MAT.grey, 8));
                var h = rbox(0.26, 0.22, 0.2, 0.05, MAT.white);
                h.position.y = 0.9;
                pr.add(h);
                var sp = box(0.24, 0.02, 0.18, M('#1E3A8A', { metalness: 0.4 }));
                sp.position.set(0, 1.16, 0);
                sp.rotation.x = -0.5;
                pr.add(sp);
                var l = sph(0.025, MAT.ledG);
                l.position.set(0.1, 1.02, 0.11);
                l.castShadow = false;
                pr.add(l);
                at(pr, q[0], G0 + 0.08, q[1]);
                s.add(pr);
            });
            /* equipment yard: reservoir, pump house with gateway, flow meter, weather station */
            var tk = tankV(1.15, 1.5, '#38BDF8');
            at(tk, 9.2, G0, -3.1);
            s.add(tk);
            tk.userData.set(0.72);
            pipe(s, 8.1, -2.4, 8.1, -0.6, 0.05, PIPE, G0 + 0.1);
            var hut = grp();
            hut.add(box(1.7, 1.1, 1.4, M('#F5F0E8')));
            hut.add(at(box(1.9, 0.1, 1.6, M('#15803D')), 0, 1.1, 0));
            hut.add(at(box(0.5, 0.75, 0.02, M('#64748B')), 0.2, 0, 0.71));
            at(hut, 8.3, G0, 0.2);
            s.add(hut);
            var fm = grp();
            fm.add(rbox(0.36, 0.28, 0.3, 0.06, MAT.white));
            var fml = sph(0.03, MAT.ledG);
            fml.position.set(0.12, 0.24, 0.16);
            fm.add(fml);
            at(fm, 6.6, G0, 0);
            s.add(fm);
            var mast = grp();
            mast.add(cyl(0.035, 0.035, 1.2, MAT.grey, 8));
            var ant = box(0.1, 0.45, 0.1, MAT.white);
            ant.position.y = 1.2;
            mast.add(ant);
            at(mast, 8.8, G0 + 1.2, 0.4);
            s.add(mast);
            var ws = grp();
            ws.add(cyl(0.04, 0.04, 2.2, MAT.grey, 8));
            var hd = cyl(0.2, 0.2, 0.32, MAT.white);
            hd.position.y = 1.75;
            ws.add(hd);
            var cups = grp();
            for (var q = 0; q < 3; q++) {
                var a = box(0.34, 0.025, 0.025, MAT.dark);
                a.geometry.translate(0.17, 0, 0);
                a.rotation.y = q * 2.1;
                cups.add(a);
            }
            cups.position.y = 2.22;
            ws.add(cups);
            var wp = box(0.3, 0.02, 0.22, M('#1E3A8A', { metalness: 0.4 }));
            wp.position.set(0, 1.35, 0.14);
            wp.rotation.x = 0.6;
            ws.add(wp);
            at(ws, 9.6, G0, 3.4);
            s.add(ws);
            var waves = [];
            for (var w = 0; w < 3; w++) {
                var ring = mesh(new THREE.TorusGeometry(0.5, 0.025, 8, 40), M('#22C55E', { emissive: '#22C55E', emissiveIntensity: 1.2, transparent: true, opacity: 0.6 }), false);
                ring.rotation.x = Math.PI / 2;
                ring.position.set(8.8, G0 + 2.95, 0.4);
                ring.userData.o = w / 3;
                s.add(ring);
                waves.push(ring);
            }
            var focus = mesh(new THREE.TorusGeometry(0.6, 0.04, 8, 48), M('#16A34A', { emissive: '#22C55E', emissiveIntensity: 1.4, transparent: true, opacity: 0.9 }), false);
            focus.rotation.x = Math.PI / 2;
            s.add(focus);
            /* tour: camera target x, y, z, frame size, and where the focus ring and label sit */
            var vA = Z[0].v.position;
            var TOUR = [[-1.3, 0.2, 0.5, 12.8], [-7.27, 0.8, -2.55, 4.4], [9.4, 1.3, 3.2, 4.6], [vA.x + 0.6, 0.5, vA.z - 0.6, 4.2], [8.0, 0.9, -1.8, 5.4], [8.6, 1.9, 0.3, 5.0], [-1.3, 0.2, 0.5, 12.8]];
            var FOC = [null, [-7.27, -2.55, 1.6], [9.6, 3.4, 2.7], [vA.x, vA.z, 0.9], [9.2, -3.1, 2.1], [8.8, 0.4, 3.3], null];
            var tourIn = [].slice.call(root.querySelectorAll('.ph-ft input'));
            var stepNow = function () { for (var i = 0; i < tourIn.length; i++)
                if (tourIn[i].checked)
                    return i; return 0; };
            sc.zoom = true;
            sc.F = 12.8;
            sc.tgt.set(-1.3, 0.2, 0.5);
            var DEV = ['', 'Soil sensor · <b>27% · EC 1.4</b>', 'Weather station · <b>34 °C, rain tonight</b>', 'Smart valve · <b>Zone A</b>', 'Reservoir <b>72%</b> · flow <b>18 m³/h</b>', 'Gateway · <b>LPWAN, 15 km</b>', ''];
            var dl = L(sc, V3(0, 0, 0), '', 'big'), dlP = sc.labels[sc.labels.length - 1].p;
            var labs = Z.map(function (z) { return L(sc, V3(z.cx, 2.3, z.cz), '', 'sm'); });
            var names = 'ABCDEF';
            sc.up.push(function (t, dt) {
                var on = Math.floor(t / 4) % Z.length;
                cups.rotation.y += dt * 4;
                Z.forEach(function (z, i) {
                    var irr = i === on;
                    z.moist += (irr ? 2.6 : -0.12) * dt;
                    z.moist = Math.max(19, Math.min(34, z.moist));
                    var k = (z.moist - 19) / 15;
                    z.m.color.setRGB(lerp(0.78, 0.5, k), lerp(0.62, 0.38, k), lerp(0.42, 0.24, k));
                    z.m.color.convertSRGBToLinear();
                    z.bm.color.setRGB(lerp(0.6, 0.3, k), lerp(0.44, 0.2, k), lerp(0.27, 0.12, k));
                    z.bm.color.convertSRGBToLinear();
                    z.v.userData.led.material = irr ? MAT.ledG : MAT.ledA;
                    z.dr.forEach(function (e) {
                        var u = (e.userData.o + t * 0.8) % 1, b = e.userData.b, x = z.px[b % 3], zz = z.pz[b >> 1 & 1 ? 1 : 0];
                        if (b >= 3)
                            zz = z.pz[1];
                        else
                            zz = z.pz[0];
                        e.visible = irr;
                        e.position.set(x + Math.cos(e.userData.a) * 0.38, z.top + 0.05 + Math.sin(u * Math.PI) * 0.1, zz + Math.sin(e.userData.a) * 0.38);
                    });
                    labs[i].className = 'g3-p sm ' + (z.moist < 22 && !irr ? 'warn' : '');
                    labs[i].innerHTML = dot(irr ? 'b' : z.moist < 22 ? 'a' : 'g') + 'Zone ' + names[i] + ' <b>' + Math.round(z.moist) + '%</b>' + (irr ? ' · watering' : '');
                });
                var st = stepNow(), tg = TOUR[st] || TOUR[0], f = FOC[st], k2 = Math.min(1, dt * 2.6);
                sc.tgt.x += (tg[0] - sc.tgt.x) * k2;
                sc.tgt.y += (tg[1] - sc.tgt.y) * k2;
                sc.tgt.z += (tg[2] - sc.tgt.z) * k2;
                sc.F += (tg[3] - sc.F) * k2;
                focus.visible = !!f;
                dl.style.display = f ? '' : 'none';
                if (f) {
                    dl.innerHTML = dot('g') + DEV[st];
                    dlP.set(f[0], G0 + f[2], f[1]);
                    focus.position.set(f[0], G0 + 0.12, f[1]);
                    focus.scale.setScalar(1 + 0.15 * Math.sin(t * 4));
                }
                labs.forEach(function (l) { l.style.visibility = f ? 'hidden' : ''; });
                waves.forEach(function (r) { var u = (r.userData.o + t * 0.5) % 1; r.scale.setScalar(0.4 + u * 2.2); r.material.opacity = (st === 5 ? 0.9 : 0.4) * (1 - u); });
                pulse(MAT.ledG, t, 0.8, 2.2);
                pulse(MAT.ledA, t, 0.8, 1.6, 2);
            });
            return sc;
        };
        /* ---------- crop selector: six small scenes on their own renderer ---------- */
        (function () {
            var host2 = root.querySelector('.cp3');
            if (!host2)
                return;
            var r2;
            try {
                r2 = new TrackedWebGLRenderer({ antialias: true, alpha: true });
            }
            catch {
                return;
            }
            r2.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            r2.shadowMap.enabled = true;
            r2.shadowMap.type = THREE.PCFSoftShadowMap;
            r2.outputColorSpace = THREE.SRGBColorSpace;
            r2.toneMapping = THREE.ACESFilmicToneMapping;
            r2.toneMappingExposure = 1.08;
            var st2 = createElement('div');
            st2.className = 'g3';
            var lab2 = createElement('div');
            lab2.className = 'g3-l';
            lab2.setAttribute('aria-hidden', 'true');
            st2.appendChild(r2.domElement);
            st2.appendChild(lab2);
            host2.appendChild(st2);
            var SAND = M('#E8D9B8', { roughness: 1 }), SOIL = M('#B98B58', { roughness: 0.95 }), BAS = M('#8A6239', { roughness: 0.95 }), GRASS = M('#7CB342', { roughness: 0.9 }), GRASS2 = M('#9CCC65', { roughness: 0.9 });
            var DRIPM = M('#1F2937', { roughness: 0.6 });
            var drops = function (sc, n, fn) { var a = []; for (var k = 0; k < n; k++) {
                var e = sph(0.03, M('#38BDF8', { emissive: '#0EA5E9', emissiveIntensity: 0.9, transparent: true, opacity: 0.85 }));
                e.castShadow = false;
                e.userData = { o: Math.random(), k: k, r: Math.random() };
                sc.s.add(e);
                a.push(e);
            } sc.up.push(function (t) { a.forEach(function (e) { fn(e, t); }); }); };
            var plate = function (sc, w, d, m) { sc.s.add(box(w, 0.3, d, m || SAND)); };
            var CR = [
                function () {
                    var sc = base(5.6, 0, 0);
                    plate(sc, 9, 6.6);
                    var bed = box(7.6, 0.08, 5.2, SOIL);
                    bed.position.set(0, 0.3, 0);
                    bed.castShadow = false;
                    sc.s.add(bed);
                    var px = [-2.5, 0, 2.5], pz = [-1.3, 1.3], top = 0.38;
                    px.forEach(function (x) { pipe(sc.s, x, -2.4, x, 2.4, 0.02, DRIPM, top + 0.02); pz.forEach(function (z) { var b = mesh(new THREE.CylinderGeometry(0.55, 0.6, 0.03, 20), BAS, false); b.position.set(x, top + 0.015, z); sc.s.add(b); sc.s.add(at(palm(1.5 + Math.random() * 0.4, 0.95), x, top, z)); }); });
                    pipe(sc.s, -3.6, -2.4, 3.6, -2.4, 0.04, DRIPM, top + 0.03);
                    var v = valve();
                    at(v, -3.9, 0.3, -2.7);
                    sc.s.add(v);
                    var pr = grp();
                    pr.add(cyl(0.035, 0.035, 0.8, MAT.grey, 8));
                    var h = rbox(0.26, 0.22, 0.2, 0.05, MAT.white);
                    h.position.y = 0.8;
                    pr.add(h);
                    at(pr, 1.25, top, 0);
                    sc.s.add(pr);
                    L(sc, V3(1.25, 1.5, 0), dot('g') + 'Soil <b>27%</b> · EC <b>1.4</b>', 'sm');
                    drops(sc, 36, function (e, t) { var u = (e.userData.o + t * 0.8) % 1, i = e.userData.k % 6, x = px[i % 3], z = pz[i >> 1 & 1 ? 1 : 0], a = e.userData.r * 6.28; if (i >= 3)
                        z = pz[1];
                    else
                        z = pz[0]; e.position.set(x + Math.cos(a) * 0.45, top + 0.05 + Math.sin(u * Math.PI) * 0.1, z + Math.sin(a) * 0.45); });
                    return sc;
                },
                function () {
                    var sc = base(5.4, 0, 0.2);
                    plate(sc, 9, 6.4, M('#E5E7EB'));
                    var glass = mesh(new THREE.CylinderGeometry(2.6, 2.6, 7.4, 32, 1, true, 0, Math.PI), M('#D9F2EC', { transparent: true, opacity: 0.38, roughness: 0.15, metalness: 0.1, side: THREE.DoubleSide, depthWrite: false }), false);
                    glass.rotation.z = Math.PI / 2;
                    glass.position.y = 0.3;
                    sc.s.add(glass);
                    for (var h = -3.6; h <= 3.6; h += 1.2) {
                        var hoop = mesh(new THREE.TorusGeometry(2.6, 0.045, 6, 32, Math.PI), M('#CBD5E1', { metalness: 0.4 }));
                        hoop.rotation.y = Math.PI / 2;
                        hoop.position.set(h, 0.3, 0);
                        sc.s.add(hoop);
                    }
                    [-1.3, 0, 1.3].forEach(function (z) {
                        var b = box(6.4, 0.08, 0.8, M('#CBD5E1'));
                        b.position.set(0, 0.85, z);
                        sc.s.add(b);
                        [-3, 3].forEach(function (x) { sc.s.add(at(box(0.06, 0.55, 0.6, MAT.grey), x, 0.3, z)); });
                        for (var x = -2.9; x <= 2.9; x += 0.42) {
                            sc.s.add(at(cyl(0.11, 0.09, 0.16, M('#C2410C', { roughness: 0.8 }), 10), x, 0.93, z - 0.18));
                            sc.s.add(at(sph(0.15, x * 7 % 2 > 0 ? MAT.ledG && M('#22C55E', { roughness: 0.7 }) : M('#16A34A', { roughness: 0.7 })), x, 1.18, z - 0.18));
                            sc.s.add(at(cyl(0.11, 0.09, 0.16, M('#C2410C', { roughness: 0.8 }), 10), x, 0.93, z + 0.18));
                            sc.s.add(at(sph(0.15, M('#22C55E', { roughness: 0.7 })), x, 1.18, z + 0.18));
                        }
                        pipe(sc.s, -3.2, z, 3.2, z, 0.015, DRIPM, 1.5);
                    });
                    var th = grp();
                    th.add(cyl(0.03, 0.03, 1.6, MAT.grey, 8));
                    th.add(at(rbox(0.3, 0.36, 0.14, 0.05, MAT.white), 0, 1.6, 0));
                    at(th, 3.3, 0.3, 2.0);
                    sc.s.add(th);
                    L(sc, V3(3.3, 2.4, 2.0), dot('g') + '<b>26 °C</b> · 70% RH · CO₂ <b>620</b>', 'sm');
                    drops(sc, 40, function (e, t) { var u = (e.userData.o + t * 0.6) % 1, z = [-1.3, 0, 1.3][e.userData.k % 3]; e.position.set(-3 + e.userData.r * 6, 1.48 - u * 0.4, z); e.material.opacity = 0.8 * (1 - u); });
                    return sc;
                },
                function () {
                    var sc = base(6.2, 0, 0);
                    plate(sc, 10.4, 10.4, M('#E8D9B8', { roughness: 1 }));
                    var f = mesh(new THREE.CylinderGeometry(4.6, 4.6, 0.06, 64), M('#84A94B', { roughness: 0.95 }));
                    f.position.y = 0.33;
                    sc.s.add(f);
                    for (var r = 0.8; r < 4.6; r += 0.45) {
                        var ring = mesh(new THREE.TorusGeometry(r, 0.035, 4, 72), M('#5B7F2C', { roughness: 0.9 }), false);
                        ring.rotation.x = Math.PI / 2;
                        ring.position.y = 0.37;
                        sc.s.add(ring);
                    }
                    var dry = mesh(new THREE.CylinderGeometry(4.0, 4.0, 0.07, 24, 1, false, 0.6, 0.7), M('#C9B47A', { roughness: 1 }), false);
                    dry.position.y = 0.34;
                    dry.scale.set(1, 1, 1);
                    sc.s.add(dry);
                    sc.s.add(at(cyl(0.12, 0.16, 1.4, MAT.grey, 10), 0, 0.36, 0));
                    var arm = grp();
                    arm.position.y = 0.36;
                    sc.s.add(arm);
                    var span = box(4.4, 0.12, 0.12, M('#E2E8F0', { metalness: 0.4 }));
                    span.geometry.translate(2.2, 0, 0);
                    span.position.y = 1.25;
                    arm.add(span);
                    [1.4, 2.8, 4.2].forEach(function (x) { var a1 = box(0.04, 1.25, 0.04, MAT.grey); a1.position.set(x, 0, -0.18); a1.rotation.x = -0.15; arm.add(a1); var a2 = box(0.04, 1.25, 0.04, MAT.grey); a2.position.set(x, 0, 0.18); a2.rotation.x = 0.15; arm.add(a2); arm.add(at(cyl(0.12, 0.12, 0.08, MAT.dark, 12), x, 0, 0)); });
                    for (var k = 0; k < 4; k++) {
                        var tr = box(1.1, 0.05, 0.05, M('#94A3B8', { metalness: 0.4 }));
                        tr.position.set(0.7 + k * 1.1, 1.05, 0);
                        tr.rotation.z = k % 2 ? 0.25 : -0.25;
                        arm.add(tr);
                    }
                    L(sc, V3(3.2, 1.2, 2.6), dot('a') + 'Dry patch · <b>NDVI 0.41</b>', 'sm');
                    var dr = [];
                    for (var q = 0; q < 40; q++) {
                        var e = sph(0.03, M('#38BDF8', { emissive: '#0EA5E9', emissiveIntensity: 0.9, transparent: true, opacity: 0.85 }));
                        e.castShadow = false;
                        e.userData = { x: 0.4 + Math.random() * 4.0, o: Math.random() };
                        arm.add(e);
                        dr.push(e);
                    }
                    sc.up.push(function (t) { arm.rotation.y = -t * 0.22; dr.forEach(function (e) { var u = (e.userData.o + t * 0.9) % 1; e.position.set(e.userData.x, 1.2 - u * 1.1, (Math.random() - 0.5) * 0.1); }); });
                    return sc;
                },
                function () {
                    var sc = base(5.6, 0, 0);
                    plate(sc, 9.4, 7);
                    [-2.2, 0, 2.2].forEach(function (z, r) {
                        var strip = box(8.2, 0.05, 0.9, SOIL);
                        strip.position.set(0, 0.3, z);
                        strip.castShadow = false;
                        sc.s.add(strip);
                        pipe(sc.s, -4, z + 0.25, 4, z + 0.25, 0.02, DRIPM, 0.38);
                        for (var x = -3.4; x <= 3.5; x += 1.7) {
                            var tr = tree(1.3 + ((x + r) % 2 ? 0.2 : 0), r === 1 ? '#4D7C0F' : '#65A30D');
                            at(tr, x, 0.33, z);
                            sc.s.add(tr);
                            for (var f = 0; f < 4; f++)
                                sc.s.add(at(sph(0.06, M('#F97316', { roughness: 0.5 })), x + Math.cos(f * 1.6) * 0.45, 1.25 + (f % 2) * 0.2, z + Math.sin(f * 1.6) * 0.45));
                        }
                    });
                    var tp = grp();
                    tp.add(cyl(0.03, 0.03, 1.3, MAT.grey, 8));
                    tp.add(at(rbox(0.26, 0.3, 0.14, 0.05, MAT.white), 0, 1.3, 0));
                    at(tp, 4.2, 0.3, 1.1);
                    sc.s.add(tp);
                    L(sc, V3(4.2, 2.0, 1.1), dot('a') + 'Row 2 · <b>3 °C</b> · frost watch', 'sm');
                    return sc;
                },
                function () {
                    var sc = base(5.6, 0, 0);
                    plate(sc, 9.4, 7, GRASS);
                    var green = mesh(new THREE.SphereGeometry(1, 32, 16), GRASS2);
                    green.scale.set(3.2, 0.18, 2.2);
                    green.position.set(-0.6, 0.3, 0);
                    sc.s.add(green);
                    var bunker = mesh(new THREE.SphereGeometry(1, 24, 12), M('#EAD9A8', { roughness: 1 }), false);
                    bunker.scale.set(1.1, 0.06, 0.6);
                    bunker.position.set(2.6, 0.31, 1.6);
                    sc.s.add(bunker);
                    sc.s.add(at(cyl(0.02, 0.02, 1.6, MAT.white, 6), -0.4, 0.45, -0.2));
                    var flag = box(0.5, 0.3, 0.02, M('#EF4444'));
                    flag.position.set(-0.15, 1.85, -0.2);
                    sc.s.add(flag);
                    for (var k = 0; k < 7; k++)
                        sc.s.add(at(tree(0.9 + (k % 3) * 0.2, k % 2 ? '#4D7C0F' : '#65A30D'), -4 + k * 1.3, 0.3, -3.0));
                    var SP = [[-3.0, 1.6], [1.6, -1.2], [1.8, 2.4]];
                    SP.forEach(function (p) { sc.s.add(at(cyl(0.06, 0.06, 0.12, MAT.dark, 10), p[0], 0.3, p[1])); });
                    L(sc, V3(-0.6, 1.0, 1.2), dot('b') + 'Green 7 · <b>24%</b> · watering', 'sm');
                    drops(sc, 60, function (e, t) { var p = SP[e.userData.k % 3], u = (e.userData.o + t * 0.7) % 1, a = t * 1.2 + e.userData.r * 1.2 + (e.userData.k % 3) * 2; e.position.set(p[0] + Math.cos(a) * u * 1.6, 0.45 + Math.sin(u * Math.PI) * 0.7, p[1] + Math.sin(a) * u * 1.6); });
                    return sc;
                },
                function () {
                    var sc = base(5.4, 0, 0);
                    plate(sc, 9, 6.4, M('#E5E7EB'));
                    [-1.6, 0.2, 2.0].forEach(function (z, bi) {
                        sc.s.add(at(box(7, 0.08, 1.3, M('#94A3B8', { metalness: 0.3 })), 0, 0.85, z));
                        [-3.3, 3.3].forEach(function (x) { sc.s.add(at(box(0.06, 0.55, 1.1, MAT.grey), x, 0.3, z)); });
                        for (var x = -3.1; x <= 3.1; x += 0.36)
                            for (var r = -1; r <= 1; r++) {
                                sc.s.add(at(cyl(0.12, 0.09, 0.18, M('#1F2937', { roughness: 0.8 }), 8), x, 0.93, z + r * 0.38));
                                sc.s.add(at(sph(0.11, M(bi === 1 ? '#22C55E' : '#16A34A', { roughness: 0.7 })), x, 1.17, z + r * 0.38));
                            }
                        pipe(sc.s, -3.4, z, 3.4, z, 0.015, DRIPM, 1.55);
                    });
                    var lb = L(sc, V3(3.2, 1.9, 0.2), '', 'sm');
                    drops(sc, 40, function (e, t) { var on = Math.floor(t / 3) % 3, z = [-1.6, 0.2, 2.0][on], u = (e.userData.o + t * 0.8) % 1; e.position.set(-3.2 + e.userData.r * 6.4, 1.5 - u * 0.35, z + ((e.userData.k % 3) - 1) * 0.38); e.material.opacity = 0.8 * (1 - u); });
                    sc.up.push(function (t) { var on = Math.floor(t / 3) % 3; lb.innerHTML = dot('b') + 'Bench ' + (on + 1) + ' · <b>watering</b> · next in ' + (3 - Math.floor(t % 3)) + ' s'; });
                    return sc;
                }
            ];
            var cam2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200), built2 = [], cur2 = null, W2 = 1, H2 = 1, T2 = 0, run2 = false, last2 = null, vis2 = false, v32 = new THREE.Vector3();
            var size2 = function () { var b = host2.getBoundingClientRect(); W2 = Math.max(10, b.width); H2 = Math.max(10, b.height); r2.setSize(W2, H2, false); if (!cur2)
                return; var a = W2 / H2, F = cur2.F * (a < 1.2 ? 1.15 / a : 1); cam2.left = -F * a; cam2.right = F * a; cam2.top = F; cam2.bottom = -F; cam2.updateProjectionMatrix(); };
            var frame2 = function (dt) {
                T2 += dt;
                cur2.up.forEach(function (f) { f(T2, dt); });
                var a = 0.72 + (reduce ? 0 : T2 * 0.08), el = 0.66, R = 40, tg = cur2.tgt;
                cam2.position.set(tg.x + R * Math.cos(el) * Math.sin(a), tg.y + R * Math.sin(el), tg.z + R * Math.cos(el) * Math.cos(a));
                cam2.lookAt(tg);
                r2.render(cur2.s, cam2);
                cur2.labels.forEach(function (l) { v32.copy(l.p).project(cam2); var x = (v32.x * 0.5 + 0.5) * W2, y = (-v32.y * 0.5 + 0.5) * H2, hw = l.e.offsetWidth / 2 + 6; x = Math.max(hw, Math.min(W2 - hw, x)); l.e.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) translate(-50%,-100%)'; });
            };
            var loop2 = function (ts) { if (!run2)
                return; if (last2 === null)
                last2 = ts; var dt = Math.min(0.05, (ts - last2) / 1000); last2 = ts; frame2(dt); raf(loop2); };
            var show2 = function (i) { if (!built2[i])
                built2[i] = CR[i](); cur2 = built2[i]; lab2.innerHTML = ''; cur2.labels.forEach(function (l) { lab2.appendChild(l.e); }); size2(); frame2(0); };
            var rs = [].slice.call(root.querySelectorAll('input[name="njcr-cp"]'));
            rs.forEach(function (r, i) { listen.bind(null, r)('change', function () { if (r.checked)
                show2(i); }); });
            var f0 = 0;
            rs.forEach(function (r, i) { if (r.checked)
                f0 = i; });
            show2(f0);
            if ('ResizeObserver' in window)
                new ManagedResizeObserver(function () { size2(); if (!run2)
                    frame2(0); }).observe(host2);
            if ('IntersectionObserver' in window)
                new ManagedIntersectionObserver(function (es) { vis2 = es[0].isIntersecting; if (vis2 && !reduce && !run2) {
                    run2 = true;
                    last2 = null;
                    raf(loop2);
                }
                else if (!vis2)
                    run2 = false; }, { rootMargin: '120px' }).observe(host2);
            else {
                run2 = true;
                raf(loop2);
            }
        })();
        /* camera, controls, loop */
        var cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200), cur = null, built = [], az = 0.72, el = 0.74, drag = null, lastUser = -10, T = 0, running = false, last = null, visible = false;
        var W = 0, Hh = 0;
        function size() { var r = stage.getBoundingClientRect(); W = Math.max(10, r.width); Hh = Math.max(10, r.height); renderer.setSize(W, Hh, false); fit(); }
        function fit() { if (!cur)
            return; var a = W / Hh, F = cur.F * (a < 1.4 ? Math.max(1, 1.12 / a) : 1) * 0.74; cam.left = -F * a; cam.right = F * a; cam.top = F; cam.bottom = -F; cam.updateProjectionMatrix(); }
        function place(t) {
            var a = az + (reduce || drag || T - lastUser < 4 ? 0 : Math.sin(t * 0.18) * 0.22);
            var R = 40, tg = cur.tgt;
            cam.position.set(tg.x + R * Math.cos(el) * Math.sin(a), tg.y + R * Math.sin(el), tg.z + R * Math.cos(el) * Math.cos(a));
            cam.lookAt(tg);
        }
        var v3 = new THREE.Vector3();
        function labels() {
            cur.labels.forEach(function (l) { v3.copy(l.p).project(cam); var x = (v3.x * 0.5 + 0.5) * W, y = (-v3.y * 0.5 + 0.5) * Hh, hw = l.e.offsetWidth / 2 + 6; if (x > -40 && x < W + 40)
                x = Math.max(hw, Math.min(W - hw, x)); l.e.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) translate(-50%,-100%)'; l.e.style.opacity = (x < -40 || x > W + 40 || y < 0 || y > Hh + 20) ? 0 : 1; });
        }
        function frame(dt) { T += dt; cur.up.forEach(function (f) { f(T, dt); }); if (cur.zoom)
            fit(); place(T); renderer.render(cur.s, cam); labels(); }
        function loop(ts) { if (!running)
            return; if (last === null)
            last = ts; var dt = Math.min(0.05, (ts - last) / 1000); last = ts; frame(dt); raf(loop); }
        function start() { if (running || reduce || !visible)
            return; running = true; last = null; raf(loop); }
        function stop() { running = false; }
        function show(i) {
            var slot = root.querySelector('.sc-i.s' + i);
            if (!slot)
                return;
            var svg = slot.querySelector('svg');
            slot.insertBefore(stage, svg || slot.querySelector('.sk'));
            if (!built[i])
                built[i] = B[i]();
            cur = built[i];
            lab.innerHTML = '';
            cur.labels.forEach(function (l) { lab.appendChild(l.e); l.w = 0; });
            size();
            frame(0);
            if (reduce)
                frame(0);
        }
        /* drag to rotate */
        listen.bind(null, stage)('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, az: az, el: el }; stage.setPointerCapture(e.pointerId); stage.classList.add('drag'); hint.classList.add('gone'); });
        listen.bind(null, stage)('pointermove', function (e) { if (!drag)
            return; az = drag.az - (e.clientX - drag.x) * 0.008; el = Math.max(0.3, Math.min(1.15, drag.el + (e.clientY - drag.y) * 0.004)); lastUser = T; if (reduce || !running)
            frame(0); });
        var end = function () { drag = null; lastUser = T; stage.classList.remove('drag'); };
        listen.bind(null, stage)('pointerup', end);
        listen.bind(null, stage)('pointercancel', end);
        // Preserve field-tour camera controls when continuous motion is disabled.
        root.querySelectorAll('.ph-ft input').forEach(function (input) { listen(input, 'change', function () { if (reduce)
            frame(1); }); });
        /* tabs */
        var radios = [0, 1, 2, 3, 4, 5].map(function (i) { return root.querySelector('#njcr-b' + i); });
        radios.forEach(function (r, i) { if (r)
            listen.bind(null, r)('change', function () { if (r.checked)
                show(i); }); });
        var first = 0;
        radios.forEach(function (r, i) { if (r && r.checked)
            first = i; });
        show(first);
        if ('ResizeObserver' in window)
            new ManagedResizeObserver(function () { size(); if (!running)
                frame(0); }).observe(stage);
        else
            listen.bind(null, window)('resize', size);
        if ('IntersectionObserver' in window)
            new ManagedIntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible)
                start();
            else
                stop(); }, { threshold: 0.1 }).observe(host);
        else {
            visible = true;
            start();
        }
        listen.bind(null, document)('visibilitychange', function () { if (document.hidden)
            stop();
        else
            start(); });
    }
    function cleanup() {
        if (!alive)
            return;
        alive = false;
        frames.forEach(cancelAnimationFrame);
        timers.forEach(clearTimeout);
        intervals.forEach(clearInterval);
        observers.forEach(observer => observer.disconnect());
        listeners.forEach(remove => remove());
        const disposed = new Set();
        const dispose = resource => { if (resource && !disposed.has(resource)) {
            disposed.add(resource);
            resource.dispose?.();
        } };
        scenes.forEach(scene => scene.traverse(object => { dispose(object.geometry); const materials = Array.isArray(object.material) ? object.material : [object.material]; materials.forEach(material => { if (!material)
            return; Object.values(material).forEach(value => { if (value?.isTexture)
            dispose(value); }); dispose(material); }); dispose(object.shadow?.map); }));
        renderers.forEach(renderer => { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); });
        nodes.reverse().forEach(node => node.remove());
        root.classList.remove('has3d');
        root.querySelector('.db')?.classList.remove('has3d');
    }
    try {
        initialise();
    }
    catch (error) {
        cleanup();
        console.warn('cropifAI 3D preview unavailable; using the supplied illustration.', error);
    }
    return cleanup;
}
