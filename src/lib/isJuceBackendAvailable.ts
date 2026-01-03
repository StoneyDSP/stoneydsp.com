export function isJuceBackendAvailable(): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const j = (globalThis as any).__JUCE__;
  if (!j) return false;

  const init = j.initialisationData;
  // if placeholder object exists, initialisationData may exist but be empty
  if (!init) return false;

  // In real JUCE, these keys exist and are arrays
  const ok =
    Array.isArray(init.__juce__platform) &&
    Array.isArray(init.__juce__functions) &&
    Array.isArray(init.__juce__toggles) &&
    typeof j.postMessage === "function";

  // require platform non-empty (extra strictness check)
  return ok && init.__juce__platform.length > 0;
}
