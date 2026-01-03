/**
 * This file defines all of the existing interfaces from Lightning Core and SDK that
 * may be added to (aka. augmented) by your Application.
 *
 * @module
 */
import "@lightningjs/sdk";
import type { Container } from "./Container";
import type { EventBus } from "./Events";
import type { BaseSM } from "./Services";
import type { AudioSM } from "./Services/AudioSM/AudioSM";

declare module "@lightningjs/sdk" {
  /**
   * Lightning Core Augmentations
   */
  namespace Lightning {
    namespace Component {
      /**
       * These handlers augmented here will be _added_ to the existing default key handlers
       * Be sure to name and type them appropriately. There should be 4 forms of each:
       * - `_capture{KeyName}`
       * - `_capture{KeyName}Release`
       * - `_handle{KeyName}`
       * - `_handle{KeyName}Release`
       */

      interface DefaultKeyHandlers {
        // Examples:
        // _captureHome?(e: KeyboardEvent): boolean | void;
        // _captureHomeRelease?(e: KeyboardEvent): boolean | void;
        // _handleHome?(e: KeyboardEvent): boolean | void;
        // _handleHomeRelease?(e: KeyboardEvent): boolean | void;
        //
        /// -------------------------------------------------------------- CLICK
        // _captureClick?(
        //   target: Lightning.Component,
        //   localCoords: { x: number; y: number }
        // ): boolean | void;
        // _captureClickRelease?(
        //   target: Lightning.Component,
        //   localCoords: { x: number; y: number }
        // ): boolean | void;
        _handleClick?(
          target: Lightning.Component,
          localCoords: { x: number; y: number }
        ): boolean | void;
        // _handleClickRelease?(
        //   target: Lightning.Component,
        //   localCoords: { x: number; y: number }
        // ): boolean | void;
        _handleScroll?(localCoords: { x: number; y: number }): boolean | void;
        /// -------------------------------------------------------------- HOVER
        // _captureHover?(target: Lightning.Component): boolean | void;
        // _captureHoverRelease?(target: Lightning.Component): boolean | void;
        _handleHover?(target: Lightning.Component): boolean | void;
        // _handleHoverRelease?(target: Lightning.Component): boolean | void;
        /// ------------------------------------------------------------ UNHOVER
        // _captureUnhover?(target: Lightning.Component): boolean | void;
        // _captureUnhoverRelease?(target: Lightning.Component): boolean | void;
        _handleUnhover?(target: Lightning.Component): boolean | void;
        // _handleUnhoverRelease?(target: Lightning.Component): boolean | void;
      }

      /**
       * If any handlers are augmented here, the will _replace_ the default key handlers
       * declared in {@link DefaultKeyHandlers}.
       *
       * Use this if you have a radically different set of keys you'd like to orient your app around.
       */
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      interface CustomKeyHandlers {
        // Examples:
        // _captureHome?(e: KeyboardEvent): boolean | void;
        // _captureHomeRelease?(e: KeyboardEvent): boolean | void;
        // _handleHome?(e: KeyboardEvent): boolean | void;
        // _handleHomeRelease?(e: KeyboardEvent): boolean | void;
      }

      /**
       * Fire Ancestor Definitions
       */
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      interface FireAncestorsMap {
        // Examples:
        // $itemCreated(): void;
        // $firstItemCreated(): void;
        // $selectItem(arg: {item: ContentItem}): void;
      }
    }

    namespace Application {
      /**
       * Application Event Definitions (emitted from/onto the Lightning.Application instance)
       *
       * @remarks
       * These appear in
       */
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      interface EventMap {
        // Examples:
        // titleLoaded(): void;
        // ratingColor(color: number): void;
        // setBackground(evt: { src: string }): void;
        // contentHeight(height: number): void;
        // backgroundLoaded(): void;
        // readyForBackground(): void;
        // itemAnimationEnded(): void;
        // setItem(evt: { item: ContentItem, direction?: -1 | 0 | 1 }): void;
        // contentHidden(): void;
      }
    }
  }

  /**
   * Lightning SDK Router Augmentations
   */
  namespace Router {
    /**
     * App-specifc Widgets Definitions
     *
     * @remarks
     * These appear in:
     * ```ts
     * anyRouterPage.widgets.menu;
     * Router.focusWidget('Menu');
     * ```
     */

    interface CustomWidgets {
      // Examples:
      // Menu: typeof Menu;
      // Overlay: typeof OverlayComponent;
      HeaderWidget: typeof import("./Components/Widgets/HeaderWidget/HeaderWidget");
      FooterWidget: typeof import("./Components/Widgets/FooterWidget/FooterWidget");
      SideBarWidget: typeof import("./Components/Widgets/SideBarWidget/SideBarWidget");
    }
  }

  /**
   * Lightning SDK Application Augmentations
   */
  namespace Application {
    /**
     * AppData (Application SDK) definitions
     */

    export interface AppData {
      // Examples:
      // myAppDataParam1: string;
      // myAppDataParam2: number;
      container: Container;
    }
  }

  namespace Application {
    interface AppData {
      container: Container;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AppData extends Application.AppData {}

  namespace Application {
    export interface Services extends Record<string | symbol, BaseSM> {
      audio: AudioSM;
      eventBus: EventBus;
    }
  }
}
