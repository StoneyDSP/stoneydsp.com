let ctx: AudioContext | null = null;

export function getAudioContext(
  contextOptions?: AudioContextOptions | undefined
): AudioContext {
  if (!ctx) ctx = new AudioContext(contextOptions);
  return ctx;
}

export async function ensureRunning(
  contextOptions?: AudioContextOptions | undefined
): Promise<AudioContext> {
  const c = getAudioContext(contextOptions);
  if (c.state !== "running") await c.resume();
  return c;
}

export async function suspendContext(): Promise<void> {
  if (ctx && ctx.state === "running") await ctx.suspend();
}

document.addEventListener("click", () => {
  void ensureRunning();
});
