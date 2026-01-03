import { Launch as BaseLaunch, Lightning, Log } from "@lightningjs/sdk";

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
): ReturnType<typeof BaseLaunch> | null {
  ///
  let app: Lightning.Application | null = null;
  ///
  app = BaseLaunch(App, appSettings, platformSettings, appData);
  ///
  app!.stage.getCanvas().id = "canvas";
  ///
  document.body.appendChild(app!.stage.getCanvas());
  ///
  Log.debug("Launch", App, appSettings, platformSettings, appData);
  ///
  return app;
}

export { Launch };
