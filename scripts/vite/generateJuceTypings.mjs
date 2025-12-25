import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { resolveJuceJsDir } from './resolveJuceJsDir.mjs';

const outDir = 'packages/@types/juce-framework-frontend';

(async () => {
  const srcDir = await resolveJuceJsDir();
  fs.mkdirSync(outDir, { recursive: true });
  execSync(
    `npx tsc --allowJs --declaration --emitDeclarationOnly --outDir ${outDir} --target es2020 "${srcDir}/**/*.js"`,
    { stdio: 'inherit' }
  );
})();
