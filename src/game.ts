import type {
  Game,
  InitApi,
  RenderApi,
  UpdateApi,
} from "@clockwyrks/simple-2d";
import type { DeepReadonly } from "ts-essentials";
import {
  ACTIONS,
  BINDINGS,
  BULLET_LIFE,
  BULLET_R,
  CORE_R,
  CUES,
  FACE_UP,
  FIELD_H,
  FIELD_W,
  FIRE_INTERVAL_TICKS,
  HALO_R,
  HIT_FLASH_TIME,
  INVULN_TIME,
  MAX_BULLETS,
  MU,
  MUZZLE_SPEED,
  ROCK_CHILD,
  ROCK_HEALTH,
  ROCK_RADIUS,
  ROCK_SPEED_MAX,
  ROCK_SPEED_MIN,
  SAFE_X,
  SAFE_Y,
  SAUCER_AIM_ERROR,
  SAUCER_BULLET_LIFE,
  SAUCER_BULLET_R,
  SAUCER_FIRE_INTERVAL,
  SAUCER_FIRST_DELAY,
  SAUCER_GAP_MAX,
  SAUCER_GAP_MIN,
  SAUCER_LIFETIME,
  SAUCER_R,
  SAUCER_SPEED,
  SAUCER_WEAVE_INTERVAL,
  SAUCER_WEAVE_SPEED,
  SCORE_LARGE,
  SCORE_MEDIUM,
  SCORE_SAUCER,
  SCORE_SMALL,
  SHIP_DRAG_HALFLIFE,
  SHIP_MAX,
  SHIP_R,
  SHIP_THRUST,
  SHIP_TURN,
  SPLIT_KICK,
  START_LIVES,
  STAR_X,
  STAR_Y,
  TICK_DT,
  TORPEDO_CONE,
  TORPEDO_LIFE,
  TORPEDO_RECHARGE,
  TORPEDO_R,
  TORPEDO_SCATTER,
  TORPEDO_SPEED,
  TORPEDO_TURN,
  WAVE_BASE_ROCKS,
  WAVE_BANNER_TIME,
  WAVE_MIN_SHIP_DIST,
  WAVE_MIN_STAR_DIST,
  WAVE_SPEED_CAP,
  WAVE_SPEED_STEP,
  EXTRA_LIFE_STEP,
  TITLE_ITEMS,
  PAUSE_ITEMS,
  GAMEOVER_ITEMS,
  TITLE_TEXT,
  TAGLINE_TEXT,
  SHATTER_DEBUG_VERSION,
  type RockSize,
} from "./constants";

export type Screen = "title" | "howto" | "playing" | "paused" | "gameover";
export type SaucerEdge = "left" | "right";
export type FieldEdge = "top" | "bottom" | "left" | "right";
export interface ShipState {
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly angle: number;
  readonly thrusting: boolean;
  readonly invuln: number;
  readonly collision: boolean;
  readonly fireCooldown: number;
}
export interface BulletState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly life: number;
}
export interface RockState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly size: RockSize;
  readonly spin: number;
  readonly health: number;
  readonly flash: number;
}
export interface SaucerState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly mind: boolean;
  readonly gun: boolean;
  readonly travel: boolean;
  readonly weave: 1 | -1;
  readonly fireClock: number;
  readonly weaveClock: number;
  readonly age: number;
}
export interface TorpedoState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly heading: number;
  readonly life: number;
  readonly homing: boolean;
}
export interface ShatterState {
  readonly screen: Screen;
  readonly menuIndex: number;
  readonly score: number;
  readonly lives: number;
  readonly wave: number;
  readonly waveBanner: number;
  readonly ship: ShipState;
  readonly bullets: readonly BulletState[];
  readonly rocks: readonly RockState[];
  readonly saucer: SaucerState | null;
  readonly enemyBullets: readonly BulletState[];
  readonly torpedoes: readonly TorpedoState[];
  readonly torpedoCharge: number;
  readonly waveSpawning: boolean;
  readonly saucerSpawning: boolean;
  readonly saucerClock: number;
  readonly saucerDue: number;
  readonly nextSaucerEdge: SaucerEdge | null;
  readonly nextSaucerRow: number | null;
  readonly nextSaucerAim: number | null;
  readonly nextRockSpeed: number | null;
  readonly nextRecycleEdge: FieldEdge | null;
  readonly tickClock: number;
  readonly nextId: number;
  readonly simTime: number;
  readonly muted: boolean;
}
export interface ShatterDebugApi {
  readonly version: number;
  reset(s: DeepReadonly<ShatterState>): ShatterState;
  snapshot(s: DeepReadonly<ShatterState>): {
    version: number;
    screen: Screen;
    menuIndex: number;
    score: number;
    lives: number;
    wave: number;
    waveBanner: number;
    muted: boolean;
    waveSpawning: boolean;
    saucerSpawning: boolean;
    saucerClock: number;
    saucerDue: number;
    nextSaucerEdge: SaucerEdge | null;
    nextSaucerRow: number | null;
    nextSaucerAim: number | null;
    nextRockSpeed: number | null;
    nextRecycleEdge: FieldEdge | null;
    ship: ShipState & { speed: number };
    bullets: readonly BulletState[];
    rocks: readonly (RockState & { radius: number })[];
    saucer: SaucerState | null;
    enemyBullets: readonly BulletState[];
    torpedoes: readonly TorpedoState[];
    torpedoCharge: number;
    torpedoReady: boolean;
    simTime: number;
  };
  reconcile(s: DeepReadonly<ShatterState>): ShatterState;
  menuItemRect(
    s: DeepReadonly<ShatterState>,
    index: number,
  ): { x: number; y: number; w: number; h: number } | null;
  setScreen(s: DeepReadonly<ShatterState>, v: Screen): ShatterState;
  setMenuIndex(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setScore(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setLives(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setWave(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setWaveBanner(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setWaveSpawning(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerSpawning(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerDue(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setShipPosition(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
  ): ShatterState;
  setShipVelocity(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
  ): ShatterState;
  setShipAngle(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setShipInvuln(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setFireCooldown(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setShipCollision(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  addBullet(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): ShatterState;
  removeBullet(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearBullets(s: DeepReadonly<ShatterState>): ShatterState;
  addEnemyBullet(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): ShatterState;
  removeEnemyBullet(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearEnemyBullets(s: DeepReadonly<ShatterState>): ShatterState;
  addRock(
    s: DeepReadonly<ShatterState>,
    size: RockSize,
    x: number,
    y: number,
  ): ShatterState;
  setRockVelocity(
    s: DeepReadonly<ShatterState>,
    id: number,
    vx: number,
    vy: number,
  ): ShatterState;
  setRockHealth(
    s: DeepReadonly<ShatterState>,
    id: number,
    n: number,
  ): ShatterState;
  removeRock(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearRocks(s: DeepReadonly<ShatterState>): ShatterState;
  addSaucer(s: DeepReadonly<ShatterState>, x: number, y: number): ShatterState;
  setSaucerVelocity(
    s: DeepReadonly<ShatterState>,
    vx: number,
    vy: number,
  ): ShatterState;
  setSaucerWeave(s: DeepReadonly<ShatterState>, v: 1 | -1): ShatterState;
  removeSaucer(s: DeepReadonly<ShatterState>): ShatterState;
  setSaucerMind(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerGun(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerTravel(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setNextSaucerEdge(
    s: DeepReadonly<ShatterState>,
    v: SaucerEdge | null,
  ): ShatterState;
  setNextSaucerRow(
    s: DeepReadonly<ShatterState>,
    n: number | null,
  ): ShatterState;
  setNextSaucerAim(
    s: DeepReadonly<ShatterState>,
    n: number | null,
  ): ShatterState;
  setNextRockSpeed(
    s: DeepReadonly<ShatterState>,
    n: number | null,
  ): ShatterState;
  setNextRecycleEdge(
    s: DeepReadonly<ShatterState>,
    v: FieldEdge | null,
  ): ShatterState;
  setTorpedoCharge(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  addTorpedo(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    heading: number,
  ): ShatterState;
  setTorpedoHeading(
    s: DeepReadonly<ShatterState>,
    id: number,
    n: number,
  ): ShatterState;
  setTorpedoHoming(
    s: DeepReadonly<ShatterState>,
    id: number,
    v: boolean,
  ): ShatterState;
  removeTorpedo(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearTorpedoes(s: DeepReadonly<ShatterState>): ShatterState;
}

export const BACKGROUND = "#050914";
const TAU = Math.PI * 2;
const wrap = (n: number, size: number) => ((n % size) + size) % size;
const delta = (a: number, b: number, size: number) => {
  let d = b - a;
  if (d >= size / 2) d -= size;
  if (d < -size / 2) d += size;
  return d;
};
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(delta(a.x, b.x, FIELD_W), delta(a.y, b.y, FIELD_H));
const speed = (x: number, y: number) => Math.hypot(x, y);
const angleDiff = (a: number, b: number) =>
  wrap(b - a + Math.PI, TAU) - Math.PI;
const rng = () => Math.random();
const baseState = (): ShatterState => ({
  screen: "title",
  menuIndex: 0,
  score: 0,
  lives: START_LIVES,
  wave: 0,
  waveBanner: 0,
  ship: {
    x: SAFE_X,
    y: SAFE_Y,
    vx: 0,
    vy: 0,
    angle: FACE_UP,
    thrusting: false,
    invuln: 0,
    collision: true,
    fireCooldown: 0,
  },
  bullets: [],
  rocks: [],
  saucer: null,
  enemyBullets: [],
  torpedoes: [],
  torpedoCharge: 1,
  waveSpawning: true,
  saucerSpawning: true,
  saucerClock: 0,
  saucerDue: SAUCER_FIRST_DELAY,
  nextSaucerEdge: null,
  nextSaucerRow: null,
  nextSaucerAim: null,
  nextRockSpeed: null,
  nextRecycleEdge: null,
  tickClock: 0,
  nextId: 1,
  simTime: 0,
  muted: false,
});
const finite = (n: number) => {
  if (!Number.isFinite(n)) throw new TypeError("Expected a finite number");
  return n;
};
const updateShip = (s: DeepReadonly<ShatterState>, f: Partial<ShipState>) =>
  ({ ...s, ship: { ...s.ship, ...f } }) as ShatterState;
const replaceRock = (
  s: DeepReadonly<ShatterState>,
  id: number,
  f: Partial<RockState>,
) => {
  if (!s.rocks.some((r) => r.id === id)) throw new Error(`Unknown rock ${id}`);
  return {
    ...s,
    rocks: s.rocks.map((r) => (r.id === id ? { ...r, ...f } : r)),
  } as ShatterState;
};
const rect = (i: number) => ({ x: 410, y: 430 + i * 58, w: 460, h: 46 });
const menuItems = (s: DeepReadonly<ShatterState>) =>
  s.screen === "title"
    ? TITLE_ITEMS
    : s.screen === "paused"
      ? PAUSE_ITEMS
      : s.screen === "gameover"
        ? GAMEOVER_ITEMS
        : [];
const debug: ShatterDebugApi = {
  version: SHATTER_DEBUG_VERSION,
  reset: (s) => ({ ...baseState(), muted: s.muted }),
  snapshot(s) {
    return {
      version: SHATTER_DEBUG_VERSION,
      screen: s.screen,
      menuIndex: s.menuIndex,
      score: s.score,
      lives: s.lives,
      wave: s.wave,
      waveBanner: s.waveBanner,
      muted: s.muted,
      waveSpawning: s.waveSpawning,
      saucerSpawning: s.saucerSpawning,
      saucerClock: s.saucerClock,
      saucerDue: s.saucerDue,
      nextSaucerEdge: s.nextSaucerEdge,
      nextSaucerRow: s.nextSaucerRow,
      nextSaucerAim: s.nextSaucerAim,
      nextRockSpeed: s.nextRockSpeed,
      nextRecycleEdge: s.nextRecycleEdge,
      ship: { ...s.ship, speed: speed(s.ship.vx, s.ship.vy) },
      bullets: s.bullets.map((x) => ({ ...x })),
      rocks: s.rocks.map((x) => ({ ...x, radius: ROCK_RADIUS[x.size] })),
      saucer: s.saucer && { ...s.saucer },
      enemyBullets: s.enemyBullets.map((x) => ({ ...x })),
      torpedoes: s.torpedoes.map((x) => ({ ...x })),
      torpedoCharge: s.torpedoCharge,
      torpedoReady: s.torpedoCharge === 1,
      simTime: s.simTime,
    };
  },
  reconcile: (s) => ({ ...s }),
  menuItemRect: (s, i) => (menuItems(s)[i] === undefined ? null : rect(i)),
  setScreen: (s, v) => ({ ...s, screen: v }),
  setMenuIndex: (s, n) => ({ ...s, menuIndex: finite(n) }),
  setScore: (s, n) => ({ ...s, score: finite(n) }),
  setLives: (s, n) => ({ ...s, lives: finite(n) }),
  setWave: (s, n) => ({ ...s, wave: finite(n) }),
  setWaveBanner: (s, n) => ({
    ...s,
    waveBanner: finite(n),
    ...(n === 0 ? { wave: 0 } : {}),
  }),
  setWaveSpawning: (s, v) => ({ ...s, waveSpawning: v }),
  setSaucerSpawning: (s, v) => ({ ...s, saucerSpawning: v }),
  setSaucerDue: (s, n) => ({ ...s, saucerDue: finite(n) }),
  setShipPosition: (s, x, y) => updateShip(s, { x: finite(x), y: finite(y) }),
  setShipVelocity: (s, vx, vy) =>
    updateShip(s, { vx: finite(vx), vy: finite(vy) }),
  setShipAngle: (s, n) => updateShip(s, { angle: finite(n) }),
  setShipInvuln: (s, n) => updateShip(s, { invuln: finite(n) }),
  setFireCooldown: (s, n) => updateShip(s, { fireCooldown: finite(n) }),
  setShipCollision: (s, v) => updateShip(s, { collision: v }),
  addBullet: (s, x, y, vx, vy) => ({
    ...s,
    nextId: s.nextId + 1,
    bullets: [
      ...s.bullets,
      {
        id: s.nextId,
        x: finite(x),
        y: finite(y),
        vx: finite(vx),
        vy: finite(vy),
        life: BULLET_LIFE,
      },
    ],
  }),
  removeBullet: (s, id) => ({
    ...s,
    bullets: s.bullets.filter((b) => b.id !== id),
  }),
  clearBullets: (s) => ({ ...s, bullets: [] }),
  addEnemyBullet: (s, x, y, vx, vy) => ({
    ...s,
    nextId: s.nextId + 1,
    enemyBullets: [
      ...s.enemyBullets,
      {
        id: s.nextId,
        x: finite(x),
        y: finite(y),
        vx: finite(vx),
        vy: finite(vy),
        life: SAUCER_BULLET_LIFE,
      },
    ],
  }),
  removeEnemyBullet: (s, id) => ({
    ...s,
    enemyBullets: s.enemyBullets.filter((b) => b.id !== id),
  }),
  clearEnemyBullets: (s) => ({ ...s, enemyBullets: [] }),
  addRock: (s, size, x, y) => {
    if (!(size in ROCK_HEALTH)) throw new TypeError("Invalid rock size");
    return {
      ...s,
      nextId: s.nextId + 1,
      rocks: [
        ...s.rocks,
        {
          id: s.nextId,
          x: finite(x),
          y: finite(y),
          vx: 0,
          vy: 0,
          size,
          spin: 0,
          health: ROCK_HEALTH[size],
          flash: 0,
        },
      ],
    };
  },
  setRockVelocity: (s, id, vx, vy) =>
    replaceRock(s, id, { vx: finite(vx), vy: finite(vy) }),
  setRockHealth: (s, id, n) => replaceRock(s, id, { health: finite(n) }),
  removeRock: (s, id) => ({ ...s, rocks: s.rocks.filter((r) => r.id !== id) }),
  clearRocks: (s) => ({ ...s, rocks: [] }),
  addSaucer: (s, x, y) => ({
    ...s,
    nextId: s.nextId + 1,
    saucer: {
      id: s.nextId,
      x: finite(x),
      y: finite(y),
      vx: SAUCER_SPEED,
      vy: 0,
      mind: true,
      gun: true,
      travel: true,
      weave: 1,
      fireClock: SAUCER_FIRE_INTERVAL,
      weaveClock: SAUCER_WEAVE_INTERVAL,
      age: 0,
    },
  }),
  setSaucerVelocity: (s, vx, vy) =>
    s.saucer
      ? { ...s, saucer: { ...s.saucer, vx: finite(vx), vy: finite(vy) } }
      : { ...s },
  setSaucerWeave: (s, v) =>
    s.saucer ? { ...s, saucer: { ...s.saucer, weave: v } } : { ...s },
  removeSaucer: (s) => ({ ...s, saucer: null }),
  setSaucerMind: (s, v) =>
    s.saucer ? { ...s, saucer: { ...s.saucer, mind: v } } : { ...s },
  setSaucerGun: (s, v) =>
    s.saucer ? { ...s, saucer: { ...s.saucer, gun: v } } : { ...s },
  setSaucerTravel: (s, v) =>
    s.saucer ? { ...s, saucer: { ...s.saucer, travel: v } } : { ...s },
  setNextSaucerEdge: (s, v) => ({ ...s, nextSaucerEdge: v }),
  setNextSaucerRow: (s, n) => ({
    ...s,
    nextSaucerRow: n === null ? null : finite(n),
  }),
  setNextSaucerAim: (s, n) => ({
    ...s,
    nextSaucerAim: n === null ? null : finite(n),
  }),
  setNextRockSpeed: (s, n) => ({
    ...s,
    nextRockSpeed: n === null ? null : finite(n),
  }),
  setNextRecycleEdge: (s, v) => ({ ...s, nextRecycleEdge: v }),
  setTorpedoCharge: (s, n) => ({ ...s, torpedoCharge: finite(n) }),
  addTorpedo: (s, x, y, h) => {
    h = finite(h);
    return {
      ...s,
      nextId: s.nextId + 1,
      torpedoes: [
        ...s.torpedoes,
        {
          id: s.nextId,
          x: finite(x),
          y: finite(y),
          vx: Math.cos(h) * TORPEDO_SPEED,
          vy: Math.sin(h) * TORPEDO_SPEED,
          heading: h,
          life: TORPEDO_LIFE,
          homing: true,
        },
      ],
    };
  },
  setTorpedoHeading: (s, id, n) => ({
    ...s,
    torpedoes: s.torpedoes.map((t) =>
      t.id === id
        ? {
            ...t,
            heading: finite(n),
            vx: Math.cos(n) * TORPEDO_SPEED,
            vy: Math.sin(n) * TORPEDO_SPEED,
          }
        : t,
    ),
  }),
  setTorpedoHoming: (s, id, v) => ({
    ...s,
    torpedoes: s.torpedoes.map((t) => (t.id === id ? { ...t, homing: v } : t)),
  }),
  removeTorpedo: (s, id) => ({
    ...s,
    torpedoes: s.torpedoes.filter((t) => t.id !== id),
  }),
  clearTorpedoes: (s) => ({ ...s, torpedoes: [] }),
};

function spawnWave(s: ShatterState): ShatterState {
  const wave = s.wave;
  const rocks = [...s.rocks];
  let id = s.nextId;
  for (let i = 0; i < WAVE_BASE_ROCKS + wave; i++) {
    let x: number,
      y: number,
      tries = 0;
    do {
      x = rng() * FIELD_W;
      y = rng() * FIELD_H;
      tries++;
    } while (
      tries < 200 &&
      (dist({ x, y }, s.ship) < WAVE_MIN_SHIP_DIST ||
        Math.hypot(x - STAR_X, y - STAR_Y) < WAVE_MIN_STAR_DIST)
    );
    const a = rng() * TAU,
      base =
        s.nextRockSpeed ??
        ROCK_SPEED_MIN.large +
          rng() * (ROCK_SPEED_MAX.large - ROCK_SPEED_MIN.large);
    rocks.push({
      id: id++,
      x,
      y,
      vx:
        Math.cos(a) *
        base *
        (1 + Math.min(WAVE_SPEED_CAP, WAVE_SPEED_STEP * (wave - 1))),
      vy:
        Math.sin(a) *
        base *
        (1 + Math.min(WAVE_SPEED_CAP, WAVE_SPEED_STEP * (wave - 1))),
      size: "large",
      spin: rng() * TAU,
      health: ROCK_HEALTH.large,
      flash: 0,
    });
  }
  return { ...s, rocks, nextId: id, nextRockSpeed: null };
}
function startGame(s: DeepReadonly<ShatterState>): ShatterState {
  const n = {
    ...baseState(),
    muted: s.muted,
    screen: "playing" as Screen,
    wave: 1,
    waveBanner: WAVE_BANNER_TIME,
    saucerDue: SAUCER_FIRST_DELAY,
  };
  return n;
}

export const game: Game<ShatterState, ShatterDebugApi> = {
  initialize(api: InitApi<ShatterState>) {
    for (const a of ACTIONS) api.input.register(a, BINDINGS[a]);
    for (const [name, freq] of [
      [CUES.fire, 660],
      [CUES.shatter, 180],
      [CUES.thrust, 90],
      [CUES.saucer, 320],
      [CUES.death, 110],
      [CUES.extraLife, 880],
    ] as const)
      api.audio.define(name, {
        wave: "triangle",
        freq,
        durationMs: 100,
        gain: 0.12,
      });
    api.diagnostics.register("screen", (s) => s.screen);
    api.diagnostics.register("score", (s) => s.score);
    api.diagnostics.register("lives", (s) => s.lives);
    api.diagnostics.register("wave", (s) => s.wave);
    api.diagnostics.register(
      "ship",
      (s) => `${s.ship.x.toFixed(1)},${s.ship.y.toFixed(1)}`,
    );
    api.diagnostics.register(
      "velocity",
      (s) => `${s.ship.vx.toFixed(1)},${s.ship.vy.toFixed(1)}`,
    );
    api.diagnostics.register("speed", (s) => speed(s.ship.vx, s.ship.vy));
    api.diagnostics.register("facing", (s) => s.ship.angle);
    api.diagnostics.register("grace", (s) => s.ship.invuln);
    api.diagnostics.register("bullets", (s) => s.bullets.length);
    api.diagnostics.register("rocks", (s) => s.rocks.length);
    api.diagnostics.register("saucer", (s) =>
      s.saucer ? `${s.saucer.x.toFixed(0)},${s.saucer.y.toFixed(0)}` : "none",
    );
    api.diagnostics.register(
      "torpedo",
      (s) => `${s.torpedoCharge.toFixed(2)} / ${s.torpedoes.length}`,
    );
    api.diagnostics.register("simTime", (s) => s.simTime);
    return [baseState(), debug];
  },
  update(state: DeepReadonly<ShatterState>, api: UpdateApi, dt: number) {
    let s = { ...state } as ShatterState;
    const inp = api.input;
    const pressed = (k: string) => inp.pressed(k);
    s = { ...s, muted: api.audio.muted() };
    if (pressed("mute")) {
      api.audio.setMuted(!s.muted);
      s = { ...s, muted: !s.muted };
    }
    if (
      s.screen === "title" ||
      s.screen === "paused" ||
      s.screen === "gameover"
    ) {
      const list = menuItems(s);
      if (pressed("up"))
        s = { ...s, menuIndex: wrap(s.menuIndex - 1, list.length) };
      if (pressed("down"))
        s = { ...s, menuIndex: wrap(s.menuIndex + 1, list.length) };
      if (s.screen === "paused" && (pressed("pause") || pressed("back")))
        s = { ...s, screen: "playing" };
      else if (pressed("back")) {
        if (s.screen === "howto") s = { ...s, screen: "title", menuIndex: 1 };
        else if (s.screen !== "title")
          s = { ...s, screen: "title", menuIndex: 0 };
      } else if (pressed("confirm")) {
        if (s.screen === "title") {
          if (s.menuIndex === 0) s = startGame(s);
          else s = { ...s, screen: "howto" };
        } else if (s.screen === "paused") {
          if (s.menuIndex === 0) s = { ...s, screen: "playing" };
          else if (s.menuIndex === 1) s = startGame(s);
          else s = { ...baseState(), muted: s.muted };
        } else if (s.screen === "gameover") {
          if (s.menuIndex === 0) s = startGame(s);
          else s = { ...baseState(), muted: s.muted };
        } else if (s.screen === "howto")
          s = { ...s, screen: "title", menuIndex: 1 };
      }
    }
    if (s.screen === "howto" && pressed("back"))
      s = { ...s, screen: "title", menuIndex: 1 };
    if (s.screen === "playing" && pressed("pause"))
      s = { ...s, screen: "paused", menuIndex: 0 };
    if (s.screen === "playing") {
      let acc = s.tickClock + Math.min(dt, 0.25);
      while (acc >= TICK_DT) {
        acc -= TICK_DT;
        s = step(s, api);
      }
      s = { ...s, tickClock: acc };
    } else {
      let acc = s.tickClock + Math.min(dt, 0.25);
      while (acc >= TICK_DT) {
        acc -= TICK_DT;
        s = { ...s, simTime: s.simTime + TICK_DT };
      }
      s = { ...s, tickClock: acc };
    }
    return s;
  },
  render(state: DeepReadonly<ShatterState>, api: RenderApi) {
    draw(state, api.ctx);
  },
};

function step(s: ShatterState, api: UpdateApi): ShatterState {
  const inp = api.input,
    dt = TICK_DT;
  let ship = { ...s.ship };
  ship.angle +=
    ((inp.value("right") > 0 ? 1 : 0) - (inp.value("left") > 0 ? 1 : 0)) *
    SHIP_TURN *
    dt;
  const thrust = inp.value("up") > 0;
  ship.thrusting = thrust;
  if (thrust) {
    ship.vx += Math.cos(ship.angle) * SHIP_THRUST * dt;
    ship.vy += Math.sin(ship.angle) * SHIP_THRUST * dt;
  }
  const drag = Math.pow(0.5, dt / SHIP_DRAG_HALFLIFE);
  ship.vx *= drag;
  ship.vy *= drag;
  const sp = speed(ship.vx, ship.vy);
  if (sp > SHIP_MAX) {
    ship.vx *= SHIP_MAX / sp;
    ship.vy *= SHIP_MAX / sp;
  }
  ship.x = wrap(ship.x + ship.vx * dt, FIELD_W);
  ship.y = wrap(ship.y + ship.vy * dt, FIELD_H);
  ship.invuln = Math.max(0, ship.invuln - dt);
  ship.fireCooldown = Math.max(0, ship.fireCooldown - 1);
  let next = {
    ...s,
    ship,
    simTime: s.simTime + dt,
    torpedoCharge: Math.min(1, s.torpedoCharge + dt / TORPEDO_RECHARGE),
    waveBanner: Math.max(0, s.waveBanner - dt),
    saucerClock: s.saucer ? s.saucerClock : s.saucerClock + dt,
  };
  // Ship weapon inputs: edge plus held repeat at the specified tick gate.
  if (
    (inp.pressed("a") || (inp.value("a") > 0 && ship.fireCooldown === 0)) &&
    next.bullets.length < MAX_BULLETS &&
    ship.fireCooldown === 0
  ) {
    const x = wrap(ship.x + Math.cos(ship.angle) * SHIP_R, FIELD_W),
      y = wrap(ship.y + Math.sin(ship.angle) * SHIP_R, FIELD_H);
    next = {
      ...next,
      bullets: [
        ...next.bullets,
        {
          id: next.nextId,
          x,
          y,
          vx: ship.vx + Math.cos(ship.angle) * MUZZLE_SPEED,
          vy: ship.vy + Math.sin(ship.angle) * MUZZLE_SPEED,
          life: BULLET_LIFE,
        },
      ],
      nextId: next.nextId + 1,
      ship: { ...next.ship, fireCooldown: FIRE_INTERVAL_TICKS },
    };
    api.audio.play(CUES.fire);
  }
  if (
    inp.pressed("b") &&
    next.torpedoCharge === 1 &&
    next.torpedoes.length === 0
  ) {
    const x = wrap(ship.x + Math.cos(ship.angle) * SHIP_R, FIELD_W),
      y = wrap(ship.y + Math.sin(ship.angle) * SHIP_R, FIELD_H);
    next = {
      ...next,
      torpedoes: [
        {
          id: next.nextId,
          x,
          y,
          vx: Math.cos(ship.angle) * TORPEDO_SPEED,
          vy: Math.sin(ship.angle) * TORPEDO_SPEED,
          heading: ship.angle,
          life: TORPEDO_LIFE,
          homing: true,
        },
      ],
      nextId: next.nextId + 1,
      torpedoCharge: 0,
    };
  }
  let rocks = next.rocks.map((r) => {
    const dx = STAR_X - r.x,
      dy = STAR_Y - r.y,
      d = Math.hypot(dx, dy),
      a = MU / Math.max(d, 90) ** 2;
    const vx = r.vx + (d ? (dx / d) * a * dt : 0),
      vy = r.vy + (d ? (dy / d) * a * dt : 0);
    return {
      ...r,
      vx,
      vy,
      x: wrap(r.x + vx * dt, FIELD_W),
      y: wrap(r.y + vy * dt, FIELD_H),
      spin: r.spin + dt * 0.18,
      flash: Math.max(0, r.flash - dt),
    };
  });
  let bullets = next.bullets.map((b) => moveBullet(b, dt)),
    enemy = next.enemyBullets.map((b) => moveBullet(b, dt));
  bullets = bullets.filter((b) => b.life > 0);
  enemy = enemy.filter((b) => b.life > 0);
  let torpedoes = next.torpedoes
    .map((t) => {
      let h = t.heading;
      if (t.homing) {
        const targets = [...rocks, ...(next.saucer ? [next.saucer] : [])];
        let best: { x: number; y: number } | undefined,
          bd = Infinity;
        for (const r of targets) {
          const dx = delta(t.x, r.x, FIELD_W),
            dy = delta(t.y, r.y, FIELD_H),
            bearing = Math.atan2(dy, dx);
          if (
            Math.abs(angleDiff(h, bearing)) <= TORPEDO_CONE &&
            Math.hypot(dx, dy) < bd
          ) {
            best = r;
            bd = Math.hypot(dx, dy);
          }
        }
        if (best) {
          const want = Math.atan2(
            delta(t.y, best.y, FIELD_H),
            delta(t.x, best.x, FIELD_W),
          );
          h += Math.max(
            -TORPEDO_TURN * dt,
            Math.min(TORPEDO_TURN * dt, angleDiff(h, want)),
          );
        }
      }
      return {
        ...t,
        heading: h,
        vx: Math.cos(h) * TORPEDO_SPEED,
        vy: Math.sin(h) * TORPEDO_SPEED,
        x: wrap(t.x + Math.cos(h) * TORPEDO_SPEED * dt, FIELD_W),
        y: wrap(t.y + Math.sin(h) * TORPEDO_SPEED * dt, FIELD_H),
        life: t.life - dt,
      };
    })
    .filter(
      (t) => t.life > 0 && Math.hypot(t.x - STAR_X, t.y - STAR_Y) > CORE_R,
    );
  // Star absorbs bullets and recycles rocks to the opposite edge.
  bullets = bullets.filter(
    (b) => Math.hypot(b.x - STAR_X, b.y - STAR_Y) > CORE_R,
  );
  enemy = enemy.filter((b) => Math.hypot(b.x - STAR_X, b.y - STAR_Y) > CORE_R);
  rocks = rocks.map((r) => {
    if (Math.hypot(r.x - STAR_X, r.y - STAR_Y) >= CORE_R + ROCK_RADIUS[r.size])
      return r;
    const edge =
      next.nextRecycleEdge ??
      (["top", "bottom", "left", "right"] as FieldEdge[])[
        Math.floor(rng() * 4)
      ];
    next = { ...next, nextRecycleEdge: null };
    const p = rng() * (edge === "top" || edge === "bottom" ? FIELD_W : FIELD_H),
      x = edge === "left" ? 0 : edge === "right" ? FIELD_W : p,
      y = edge === "top" ? 0 : edge === "bottom" ? FIELD_H : p,
      a = Math.atan2(STAR_Y - y, STAR_X - x),
      v =
        next.nextRockSpeed ??
        ROCK_SPEED_MIN[r.size] +
          rng() * (ROCK_SPEED_MAX[r.size] - ROCK_SPEED_MIN[r.size]);
    next = { ...next, nextRockSpeed: null };
    return {
      ...r,
      x: wrap(x, FIELD_W),
      y: wrap(y, FIELD_H),
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
    };
  });
  // Weapons collide against rocks in roster order. Each hit is authoritative, including armor.
  const destroy = (
    rock: RockState,
    dx: number,
    dy: number,
    kick: number,
    along: boolean,
  ) => {
    const child = ROCK_CHILD[rock.size];
    if (!child) return;
    const a = Math.atan2(dy, dx) + (along ? 0 : Math.PI / 2);
    for (const sign of [-1, 1])
      rocks.push({
        id: next.nextId++,
        x: rock.x,
        y: rock.y,
        vx: rock.vx + Math.cos(a) * kick * sign,
        vy: rock.vy + Math.sin(a) * kick * sign,
        size: child,
        spin: rng() * TAU,
        health: ROCK_HEALTH[child],
        flash: 0,
      });
  };
  for (const weapon of ["bullet", "torpedo"] as const) {
    const roster = weapon === "bullet" ? bullets : torpedoes;
    for (const w of roster) {
      const i = rocks.findIndex(
        (r) =>
          dist(w, r) <=
          ROCK_RADIUS[r.size] + (weapon === "bullet" ? BULLET_R : TORPEDO_R),
      );
      if (i < 0) continue;
      const r = rocks[i];
      if (weapon === "bullet") bullets = bullets.filter((x) => x.id !== w.id);
      else torpedoes = torpedoes.filter((x) => x.id !== w.id);
      if (weapon === "torpedo" || r.health <= 1) {
        rocks.splice(i, 1);
        next = awardScore(
          next,
          r.size === "large"
            ? SCORE_LARGE
            : r.size === "medium"
              ? SCORE_MEDIUM
              : SCORE_SMALL,
          api,
        );
        destroy(
          r,
          w.vx,
          w.vy,
          weapon === "torpedo" ? TORPEDO_SCATTER : SPLIT_KICK,
          weapon === "torpedo",
        );
        api.audio.play(CUES.shatter);
      } else rocks[i] = { ...r, health: r.health - 1, flash: HIT_FLASH_TIME };
      break;
    }
  }
  let saucer = next.saucer;
  if (saucer) {
    saucer = {
      ...saucer,
      age: saucer.age + dt,
      fireClock: saucer.fireClock - dt,
      weaveClock: saucer.weaveClock - dt,
    };
    if (saucer.mind && saucer.weaveClock <= 0) {
      saucer = {
        ...saucer,
        weave: saucer.weave === 1 ? -1 : 1,
        vy: (saucer.weave === 1 ? 1 : -1) * SAUCER_WEAVE_SPEED,
        weaveClock: SAUCER_WEAVE_INTERVAL,
      };
    }
    if (saucer.travel) {
      const y = saucer.y + saucer.vy * dt;
      if (y < SAUCER_R || y > FIELD_H - SAUCER_R)
        saucer = { ...saucer, vy: -saucer.vy };
      saucer = {
        ...saucer,
        x: saucer.x + saucer.vx * dt,
        y: Math.max(SAUCER_R, Math.min(FIELD_H - SAUCER_R, y)),
      };
    }
    if (saucer.gun && saucer.fireClock <= 0) {
      const a =
        Math.atan2(ship.y - saucer.y, ship.x - saucer.x) +
        (next.nextSaucerAim ?? (rng() * 2 - 1) * SAUCER_AIM_ERROR);
      enemy.push({
        id: next.nextId++,
        x: saucer.x,
        y: saucer.y,
        vx: saucer.vx + Math.cos(a) * 300,
        vy: saucer.vy + Math.sin(a) * 300,
        life: SAUCER_BULLET_LIFE,
      });
      next = { ...next, nextSaucerAim: null };
      saucer = { ...saucer, fireClock: SAUCER_FIRE_INTERVAL };
    }
    if (
      saucer.age >= SAUCER_LIFETIME ||
      saucer.x < -SAUCER_R ||
      saucer.x > FIELD_W + SAUCER_R
    ) {
      saucer = null;
      next = {
        ...next,
        saucerClock: 0,
        saucerDue: SAUCER_GAP_MIN + rng() * (SAUCER_GAP_MAX - SAUCER_GAP_MIN),
      };
    }
  }
  if (!saucer && next.saucerSpawning && next.saucerClock >= next.saucerDue) {
    const edge = next.nextSaucerEdge ?? (rng() < 0.5 ? "left" : "right"),
      y = next.nextSaucerRow ?? SAUCER_R + rng() * (FIELD_H - 2 * SAUCER_R);
    saucer = {
      id: next.nextId++,
      x: edge === "left" ? -SAUCER_R : FIELD_W + SAUCER_R,
      y,
      vx: edge === "left" ? SAUCER_SPEED : -SAUCER_SPEED,
      vy: 0,
      mind: true,
      gun: true,
      travel: true,
      weave: rng() < 0.5 ? 1 : -1,
      fireClock: SAUCER_FIRE_INTERVAL,
      weaveClock: SAUCER_WEAVE_INTERVAL,
      age: 0,
    };
    next = { ...next, nextSaucerEdge: null, nextSaucerRow: null };
    api.audio.play(CUES.saucer);
  }
  // Player contact and enemy projectile contact.
  if (ship.collision && ship.invuln === 0) {
    const hit =
      rocks.some((r) => dist(ship, r) <= SHIP_R + ROCK_RADIUS[r.size]) ||
      (!!saucer && dist(ship, saucer) <= SHIP_R + SAUCER_R);
    const eb = enemy.find((b) => dist(ship, b) <= SHIP_R + SAUCER_BULLET_R);
    if (hit || eb) {
      if (eb) enemy = enemy.filter((b) => b.id !== eb.id);
      next = { ...next, lives: next.lives - 1 };
      api.audio.play(CUES.death);
      if (next.lives <= 0) next = { ...next, screen: "gameover", menuIndex: 0 };
      else
        ship = {
          x: SAFE_X,
          y: SAFE_Y,
          vx: 0,
          vy: 0,
          angle: FACE_UP,
          thrusting: false,
          invuln: INVULN_TIME,
          collision: true,
          fireCooldown: 0,
        };
    }
  }
  // Core slide for the ship.
  const sx = delta(STAR_X, ship.x, FIELD_W),
    sy = delta(STAR_Y, ship.y, FIELD_H),
    sd = Math.hypot(sx, sy);
  if (sd < CORE_R + SHIP_R) {
    const nx = sx / (sd || 1),
      ny = sy / (sd || 1);
    ship = {
      ...ship,
      x: wrap(STAR_X + nx * (CORE_R + SHIP_R), FIELD_W),
      y: wrap(STAR_Y + ny * (CORE_R + SHIP_R), FIELD_H),
    };
    const inward = ship.vx * -nx + ship.vy * -ny;
    if (inward > 0)
      ship = { ...ship, vx: ship.vx + nx * inward, vy: ship.vy + ny * inward };
  }
  // Torpedo and gun may destroy saucer.
  if (saucer) {
    const target = saucer;
    const hitB = bullets.find((b) => dist(b, target) <= BULLET_R + SAUCER_R),
      hitT = torpedoes.find((t) => dist(t, target) <= TORPEDO_R + SAUCER_R);
    if (hitB || hitT) {
      if (hitB) bullets = bullets.filter((b) => b.id !== hitB.id);
      if (hitT) torpedoes = torpedoes.filter((t) => t.id !== hitT.id);
      saucer = null;
      next = {
        ...awardScore(next, SCORE_SAUCER, api),
        saucerClock: 0,
        saucerDue: SAUCER_GAP_MIN + rng() * (SAUCER_GAP_MAX - SAUCER_GAP_MIN),
      };
    }
  }
  next = {
    ...next,
    ship,
    rocks,
    bullets,
    enemyBullets: enemy,
    torpedoes,
    saucer,
  };
  if (next.waveBanner === 0 && s.waveBanner > 0 && next.waveSpawning)
    next = spawnWave(next);
  if (next.rocks.length === 0 && s.rocks.length > 0 && next.waveSpawning) {
    next = { ...next, wave: next.wave + 1, waveBanner: WAVE_BANNER_TIME };
  }
  return next;
}
function awardScore(
  s: ShatterState,
  points: number,
  api: UpdateApi,
): ShatterState {
  const score = s.score + points;
  const extras =
    Math.floor(score / EXTRA_LIFE_STEP) - Math.floor(s.score / EXTRA_LIFE_STEP);
  if (extras > 0) api.audio.play(CUES.extraLife);
  return { ...s, score, lives: s.lives + extras };
}
function moveBullet(b: BulletState, dt: number): BulletState {
  const dx = STAR_X - b.x,
    dy = STAR_Y - b.y,
    d = Math.hypot(dx, dy),
    a = MU / Math.max(d, 90) ** 2;
  const vx = b.vx + (d ? (dx / d) * a * dt : 0),
    vy = b.vy + (d ? (dy / d) * a * dt : 0);
  return {
    ...b,
    vx,
    vy,
    x: wrap(b.x + vx * dt, FIELD_W),
    y: wrap(b.y + vy * dt, FIELD_H),
    life: b.life - dt,
  };
}

function draw(s: DeepReadonly<ShatterState>, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, FIELD_W, FIELD_H);
  ctx.save();
  ctx.strokeStyle = "rgba(94,130,190,.12)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 70; i++) {
    const x = (i * 197 + 23) % FIELD_W,
      y = (i * 83 + 17) % FIELD_H;
    ctx.fillStyle = i % 4 === 0 ? "#b9d8ff" : "#7188ad";
    ctx.globalAlpha = 0.18 + (i % 3) * 0.1;
    ctx.fillRect(x, y, i % 7 === 0 ? 2 : 1, i % 7 === 0 ? 2 : 1);
  }
  ctx.globalAlpha = 1;
  const halo = ctx.createRadialGradient(
    STAR_X,
    STAR_Y,
    CORE_R,
    STAR_X,
    STAR_Y,
    HALO_R * 1.5,
  );
  halo.addColorStop(0, "rgba(255,155,78,.34)");
  halo.addColorStop(0.45, "rgba(129,84,219,.18)");
  halo.addColorStop(1, "rgba(50,52,120,0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(STAR_X, STAR_Y, HALO_R * 1.5, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#ffca82";
  ctx.shadowColor = "#ff8748";
  ctx.shadowBlur = 30;
  ctx.beginPath();
  ctx.arc(STAR_X, STAR_Y, CORE_R, 0, TAU);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff3d2";
  ctx.beginPath();
  ctx.arc(STAR_X, STAR_Y, 13, 0, TAU);
  ctx.fill();
  const circle = (x: number, y: number, r: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
  };
  for (const r of s.rocks) {
    ctx.save();
    ctx.translate(r.x, r.y);
    ctx.rotate(r.spin);
    const rad = ROCK_RADIUS[r.size],
      points = 10;
    ctx.beginPath();
    for (let i = 0; i < points; i++) {
      const a = (i * TAU) / points,
        rr = rad * (0.82 + ((i * 7 + r.id * 3) % 5) * 0.045);
      if (i === 0) ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
      else ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    ctx.closePath();
    ctx.fillStyle = r.flash > 0 ? "#fff2d2" : "#26364b";
    ctx.strokeStyle =
      r.health === ROCK_HEALTH[r.size]
        ? "#b6c8d5"
        : r.health === 1
          ? "#ff795f"
          : "#efa66c";
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();
    if (r.health < ROCK_HEALTH[r.size]) {
      ctx.strokeStyle = "rgba(255,133,100,.8)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-rad * 0.2, -rad * 0.35);
      ctx.lineTo(rad * 0.08, 0);
      ctx.lineTo(-rad * 0.12, rad * 0.36);
      ctx.stroke();
    }
    ctx.restore();
  }
  for (const b of [...s.bullets, ...s.enemyBullets]) {
    ctx.strokeStyle = "rgba(103,239,255,.18)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(b.x - b.vx * 0.035, b.y - b.vy * 0.035);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    circle(b.x, b.y, BULLET_R, b.life === BULLET_LIFE ? "#e5ffff" : "#91fbff");
  }
  for (const t of s.torpedoes) {
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.rotate(t.heading);
    ctx.fillStyle = "#ffcf70";
    ctx.shadowColor = "#ff9b45";
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(-8, -5);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-8, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  if (s.saucer) {
    ctx.save();
    ctx.translate(s.saucer.x, s.saucer.y);
    ctx.fillStyle = "#a9e7ed";
    ctx.strokeStyle = "#e1ffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 2, 22, 8, 0, 0, TAU);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#74a8c8";
    ctx.beginPath();
    ctx.ellipse(0, -4, 11, 8, 0, Math.PI, TAU);
    ctx.fill();
    ctx.restore();
  }
  ctx.save();
  ctx.translate(s.ship.x, s.ship.y);
  ctx.rotate(s.ship.angle);
  ctx.globalAlpha =
    s.ship.invuln > 0 && Math.floor(s.simTime * 12) % 2 === 0 ? 0.35 : 1;
  if (s.ship.thrusting) {
    ctx.fillStyle = "#ff8b49";
    ctx.beginPath();
    ctx.moveTo(-12, -6);
    ctx.lineTo(-26, 0);
    ctx.lineTo(-12, 6);
    ctx.fill();
  }
  ctx.fillStyle = "#b4f8ff";
  ctx.strokeStyle = "#f2ffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(18, 0);
  ctx.lineTo(-12, -11);
  ctx.lineTo(-8, 0);
  ctx.lineTo(-12, 11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.globalAlpha = 1;
  if (
    s.screen === "playing" ||
    s.screen === "paused" ||
    s.screen === "gameover"
  ) {
    ctx.fillStyle = "#f3f7ff";
    ctx.textAlign = "left";
    ctx.font = "700 25px ui-monospace, monospace";
    ctx.fillText(String(s.score).padStart(6, "0"), 34, 46);
    ctx.font = "13px ui-monospace, monospace";
    ctx.fillStyle = "#94aec9";
    ctx.fillText("SCORE", 35, 64);
    for (let i = 0; i < Math.max(0, s.lives - 1); i++) {
      ctx.save();
      ctx.translate(42 + i * 28, 92);
      ctx.fillStyle = "#b4f8ff";
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(-6, -6);
      ctx.lineTo(-4, 0);
      ctx.lineTo(-6, 6);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = "#78ddf3";
    ctx.font = "12px ui-monospace, monospace";
    ctx.fillText("TORPEDO", 34, 127);
    ctx.strokeStyle = "#64849e";
    ctx.strokeRect(34, 136, 112, 8);
    ctx.fillStyle = s.torpedoCharge === 1 ? "#ffe39a" : "#70cde2";
    ctx.fillRect(35, 137, 110 * s.torpedoCharge, 6);
    if (s.waveBanner > 0) {
      ctx.textAlign = "center";
      ctx.font = "700 32px ui-monospace, monospace";
      ctx.fillStyle = "#f4f2ff";
      ctx.shadowColor = "#b37cff";
      ctx.shadowBlur = 18;
      ctx.fillText(`WAVE ${s.wave}`, FIELD_W / 2, 115);
      ctx.shadowBlur = 0;
    }
  }
  if (s.screen === "title") {
    ctx.textAlign = "center";
    ctx.fillStyle = "#f3f6ff";
    ctx.shadowColor = "#7de8ff";
    ctx.shadowBlur = 26;
    ctx.font = "900 94px ui-monospace, monospace";
    ctx.fillText(TITLE_TEXT, FIELD_W / 2, 260);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#8faacb";
    ctx.font = "16px ui-monospace, monospace";
    ctx.fillText(TAGLINE_TEXT, FIELD_W / 2, 298);
    menuDraw(ctx, TITLE_ITEMS, s.menuIndex, 430);
  }
  if (s.screen === "howto") {
    panel(ctx);
    ctx.textAlign = "center";
    ctx.fillStyle = "#f2f7ff";
    ctx.font = "700 38px ui-monospace, monospace";
    ctx.fillText("HOW TO PLAY", FIELD_W / 2, 130);
    ctx.textAlign = "left";
    ctx.font = "17px ui-sans-serif, sans-serif";
    ctx.fillStyle = "#c2d0e6";
    const lines = [
      "Break every rock through its fragments to clear each wave.",
      "The star bends rocks and bullets, never your ship. Curve shots around it.",
      "Rocks swallowed by the star return from a field edge. Larger rocks are armored.",
      "A hunting saucer crosses the field. Shoot it down before it shoots you.",
      "F launches a guided torpedo: one charge, ten seconds to recharge, any rock destroyed.",
      "ARROWS / WASD steer and thrust     SPACE fires     F torpedo",
      "ENTER selects     ESC backs out / pauses     P pause     M mute",
    ];
    lines.forEach((l, i) => ctx.fillText(l, 210, 220 + i * 43));
    ctx.textAlign = "center";
    ctx.fillStyle = "#83e8ff";
    ctx.fillText("PRESS ENTER OR ESC TO RETURN", FIELD_W / 2, 590);
  }
  if (s.screen === "paused" || s.screen === "gameover") {
    panel(ctx);
    ctx.textAlign = "center";
    ctx.font = "800 45px ui-monospace, monospace";
    ctx.fillStyle = s.screen === "paused" ? "#eff7ff" : "#ff9a83";
    ctx.fillText(
      s.screen === "paused" ? "PAUSED" : "RUN ENDED",
      FIELD_W / 2,
      280,
    );
    if (s.screen === "gameover") {
      ctx.font = "18px ui-monospace, monospace";
      ctx.fillStyle = "#c3d2e5";
      ctx.fillText(`SCORE ${s.score}     WAVE ${s.wave}`, FIELD_W / 2, 327);
    }
    menuDraw(
      ctx,
      s.screen === "paused" ? PAUSE_ITEMS : GAMEOVER_ITEMS,
      s.menuIndex,
      370,
    );
  }
  ctx.restore();
}
function panel(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "rgba(4,10,23,.76)";
  ctx.fillRect(280, 70, 720, 590);
  ctx.strokeStyle = "rgba(125,219,255,.28)";
  ctx.strokeRect(280, 70, 720, 590);
}
function menuDraw(
  ctx: CanvasRenderingContext2D,
  items: readonly string[],
  selected: number,
  start: number,
) {
  items.forEach((item, i) => {
    const y = start + i * 58;
    ctx.fillStyle =
      i === selected ? "rgba(55,131,166,.3)" : "rgba(20,34,55,.3)";
    ctx.fillRect(410, y - 30, 460, 46);
    ctx.strokeStyle = i === selected ? "#75e9ff" : "rgba(137,168,201,.23)";
    ctx.strokeRect(410, y - 30, 460, 46);
    ctx.textAlign = "center";
    ctx.font = `${i === selected ? 700 : 500} 20px ui-monospace, monospace`;
    ctx.fillStyle = i === selected ? "#eaffff" : "#91a8c4";
    ctx.fillText(`${i === selected ? "›  " : "   "}${item}`, 640, y);
  });
}
