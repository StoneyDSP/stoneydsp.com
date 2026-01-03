/*
	==============================================================================

		This file contains the basic framework code for a JUCE plugin processor.

	==============================================================================
*/

#pragma once
#define FXAUDIODEV_WEBVIEWPLUGINDEMO_AUDIOPROCESSOR_PROCESSOR_HPP_INCLUDED

#include "FxAudioDev/WebViewPluginDemo/JuceHeader.h"

//==============================================================================
/**
 */
class WebViewPluginDemoAudioProcessor : public juce::AudioProcessor
{
public:
	//==============================================================================
	WebViewPluginDemoAudioProcessor();
	~WebViewPluginDemoAudioProcessor() override;

	//==============================================================================
	void prepareToPlay(double sampleRate, int samplesPerBlock) override;
	void releaseResources() override;

#ifndef JucePlugin_PreferredChannelConfigurations
	bool isBusesLayoutSupported(const BusesLayout &layouts) const override;
#endif

	void processBlock(juce::AudioBuffer<float> &, juce::MidiBuffer &) override;

	//==============================================================================
	juce::AudioProcessorEditor *createEditor() override;
	bool hasEditor() const override;

	//==============================================================================
	const juce::String getName() const override;

	bool acceptsMidi() const override;
	bool producesMidi() const override;
	bool isMidiEffect() const override;
	double getTailLengthSeconds() const override;

	//==============================================================================
	int getNumPrograms() override;
	int getCurrentProgram() override;
	void setCurrentProgram(int index) override;
	const juce::String getProgramName(int index) override;
	void changeProgramName(int index, const juce::String &newName) override;

	//==============================================================================
	void getStateInformation(juce::MemoryBlock &destData) override;
	void setStateInformation(const void *data, int sizeInBytes) override;

	juce::RangedAudioParameter &getMuteParam() const;

private:
	juce::AudioParameterBool *muteParam = nullptr;
	//==============================================================================
	JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(WebViewPluginDemoAudioProcessor)
};
