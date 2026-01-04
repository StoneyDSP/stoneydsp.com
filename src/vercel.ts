import { inject, type AnalyticsProps } from "@vercel/analytics";
import {
  injectSpeedInsights,
  type SpeedInsightsProps,
} from "@vercel/speed-insights";

export function bootstrapVercel(props?: {
  framework?: string | undefined;
  basePath?: string | undefined;
  debug?: boolean | undefined;
}) {
  ///
  const analyticsProps: AnalyticsProps = {
    mode: "auto",
    debug: false,
  };
  ///
  const speedInsightsProps: SpeedInsightsProps = {
    debug: false,
  };
  ///
  void inject({
    ...analyticsProps,
    ...props,
  });
  ///
  void injectSpeedInsights({
    ...speedInsightsProps,
    ...props,
  });
}
