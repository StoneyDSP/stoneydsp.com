/*
	==============================================================================

		This file contains the basic framework code for a JUCE plugin editor.

	==============================================================================
*/

#pragma once
#define FXAUDIODEV_WEBVIEWPLUGINDEMO_AUDIOPROCESSOR_EDITOR_EDITOR_HPP_INCLUDED

#include "FxAudioDev/WebViewPluginDemo/JuceHeader.h"
#include "FxAudioDev/WebViewPluginDemo/AudioProcessor/Processor.hpp"
#include "../juce_binarydata_Assets/JuceLibraryCode/PluginAssets"

//==============================================================================
/**
 */
class WebViewPluginDemoAudioProcessorEditor : public juce::AudioProcessorEditor
{
public:
	WebViewPluginDemoAudioProcessorEditor(WebViewPluginDemoAudioProcessor &);
	~WebViewPluginDemoAudioProcessorEditor() override;

	//==============================================================================
	void paint(juce::Graphics &) override;
	void resized() override;

private:
	// This reference is provided as a quick way for your editor to
	// access the processor object that created it.
	WebViewPluginDemoAudioProcessor &audioProcessor;

	// The order matters: relays must be constructed before the
	// WebBrowserComponent, because they’re passed into
	// Options::withOptionsFrom(...) and need to receive WebView lifetime
	// notifications.
	juce::WebToggleButtonRelay muteRelay{"global:mute"};
	juce::WebToggleButtonParameterAttachment muteAttachment{audioProcessor.getMuteParam(), muteRelay, nullptr};
	juce::WebBrowserComponent web; // MUST come _after_ the relay members!

	bool didInitialResize = false;

	// void parentHierarchyChanged();
	juce::WebBrowserComponent::Options makeOptions(); // member!
	std::optional<juce::WebBrowserComponent::Resource> serveWebAsset(const juce::String &path);

	JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(WebViewPluginDemoAudioProcessorEditor)
};
