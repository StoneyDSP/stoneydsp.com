import { Launch as BaseLaunch, Lightning, Log } from "@lightningjs/sdk";
import { bootstrapCanvas } from "./canvas";
import { patchSocialMetaToAbsolute } from "./lib/meta";
import { patchWebGLPreserveDrawingBuffer } from "./lib/webGLPatch";
import { bootstrapVercel } from "./vercel";

/**
 *
 * @param {Parameters<typeof BaseLaunch>[0]} App Application's Top-Level Component (will live as a child of the Root Application instance returned by this)
 * @param {Parameters<typeof BaseLaunch>[1]} appSettings Application Settings
 * @param {Parameters<typeof BaseLaunch>[2]} platformSettings Platform Settings
 * @param {Parameters<typeof BaseLaunch>[3]} appData Custom App Specific Data
 * @returns {ReturnType<typeof BaseLaunch>}
 */
function Launch(
  App: Parameters<typeof BaseLaunch>[0],
  appSettings: Parameters<typeof BaseLaunch>[1],
  platformSettings: Parameters<typeof BaseLaunch>[2],
  appData: Parameters<typeof BaseLaunch>[3]
): ReturnType<typeof BaseLaunch> {
  ///
  let app: Lightning.Application | null = null;
  ///
  void patchSocialMetaToAbsolute();
  ///
  void patchWebGLPreserveDrawingBuffer();
  ///
  app = BaseLaunch(App, appSettings, platformSettings, appData);
  ///
  void bootstrapCanvas(app);
  ///
  void document.body.appendChild(app!.stage.getCanvas());
  ///
  void bootstrapVercel({
    framework: "unknown",
  });
  ///
  void Log.debug("Launch", { App, appSettings, platformSettings, appData });
  ///
  return app;
}

export { Launch };
