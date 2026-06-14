// orbit-worker — drains the mission telemetry queue. Companion service for the
// multi-root demo (its own Tachyon workspace / Bridge / namespace).

/** Summarize a drained batch — pure, so it's unit-testable (what `verify` runs). */
export function drain(batch) {
  return { drained: batch.length, empty: batch.length === 0 };
}

function tick() {
  const batch = []; // a real worker would pull from a queue
  const { drained } = drain(batch);
  console.log(`[worker] drained ${drained} at ${new Date().toISOString()}`);
}

// Run as a long-lived service only when invoked directly (not when imported by a test).
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  setInterval(tick, 5000);
  tick();
}
