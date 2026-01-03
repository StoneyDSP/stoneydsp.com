#pragma once
#define FXAUDIODEV_WEBVIEWPLUGINDEMO_HPP_INCLUDED

#if __has_include("AppConfig.h")
#include "AppConfig.h"
#endif

#include <juce_audio_basics/juce_audio_basics.h>
#include <juce_audio_devices/juce_audio_devices.h>
#include <juce_audio_formats/juce_audio_formats.h>
#include <juce_audio_plugin_client/juce_audio_plugin_client.h>
#include <juce_audio_processors/juce_audio_processors.h>
// #include <juce_audio_processors_headless/juce_audio_processors_headless.h>
#include <juce_audio_utils/juce_audio_utils.h>
#include <juce_core/juce_core.h>
#include <juce_data_structures/juce_data_structures.h>
#include <juce_dsp/juce_dsp.h>
#include <juce_events/juce_events.h>
#include <juce_graphics/juce_graphics.h>
#include <juce_gui_basics/juce_gui_basics.h>
#include <juce_gui_extra/juce_gui_extra.h>
#include <juce_javascript/juce_javascript.h>

#if JUCE_TARGET_HAS_BINARY_DATA
#include "BinaryData.h"
#endif

namespace FxAudioDev
{
	/** @addtogroup FxAudioDev
	 *  @{
	 */

	/**
	 * @brief The ```@VENDOR@::WebViewPluginDemo``` namespace.
	 *
	 */
	namespace WebViewPluginDemo
	{
		/** @addtogroup WebViewPluginDemo
		 *  @{
		 */
		namespace ProjectInfo
		{
			extern const char *const projectName;
			extern const char *const companyName;
			extern const char *const versionString;
			extern const int versionNumber;
		}

		class WebViewPluginDemoAudioProcessor;

		/// @} group WebViewPluginDemo
	} // namespace WebViewPluginDemo

	/// @} group FxAudioDev
} // namespace FxAudioDev
