import { describe, expect, it } from "vitest";
import type { InitApi, UpdateApi } from "@clockwyrks/simple-2d";
import { game, type ShatterDebugApi, type ShatterState } from "./game";

async function harness() {
  const diagnostics = new Map<string, (state: ShatterState) => unknown>();
  const init = {
    input: { register() {}, layout: () => null },
    audio: { define() {}, async load() {} },
    assets: {
      async loadImage() {},
      async loadAudio() {},
      async load() {},
      resolve: (p: string) => p,
    },
    diagnostics: {
      register(name: string, source: (s: ShatterState) => unknown) {
        diagnostics.set(name, source);
      },
    },
    events: {
      on() {
        return () => {};
      },
    },
    viewport: () => ({ width: 1280, height: 720, scale: 1, x: 0, y: 0 }),
  } as unknown as InitApi<ShatterState>;
  const [state, debug] = await game.initialize(init);
  return { state, debug: debug as ShatterDebugApi, diagnostics };
}

function updateApi(edges: string[] = [], values: Record<string, number> = {}) {
  const pending = new Set(edges);
  return {
    input: {
      value: (name: string) => values[name] ?? 0,
      pressed: (name: string) => {
        const had = pending.has(name);
        pending.delete(name);
        return had;
      },
    },
    audio: {
      muted: () => false,
      setMuted() {},
      play() {},
      loop() {},
      stop() {},
      looping: () => false,
    },
  } as unknown as UpdateApi;
}

describe("Shatter state and debug API", () => {
  it("initializes the complete title state and registers live diagnostics", async () => {
    const { state, debug, diagnostics } = await harness();
    expect(debug.snapshot(state)).toMatchObject({
      screen: "title",
      lives: 3,
      wave: 0,
      torpedoReady: true,
    });
    expect([...diagnostics.keys()]).toContain("simTime");
  });

  it("poses values immutably and derives snapshot measurements", async () => {
    const { state, debug } = await harness();
    const posed = debug.setShipVelocity(
      debug.setShipPosition(state, 15, 20),
      3,
      4,
    );
    expect(state.ship.x).toBe(640);
    expect(debug.snapshot(posed).ship).toMatchObject({
      x: 15,
      y: 20,
      speed: 5,
    });
    expect(
      debug.snapshot(debug.addRock(posed, "large", 10, 10)).rocks[0],
    ).toMatchObject({ radius: 46, health: 3 });
  });

  it("advances sim time in whole ticks while preserving frame remainder", async () => {
    const { state } = await harness();
    const api = updateApi(["confirm"]);
    const started = game.update(state, api, 0);
    const moved = game.update(started, updateApi(), 0.01);
    expect(moved.screen).toBe("playing");
    expect(moved.simTime).toBeCloseTo(1 / 120);
    expect(moved.tickClock).toBeCloseTo(0.01 - 1 / 120);
  });
});
