#include "FxAudioDev/WebViewPluginDemo.hpp"
#include "FxAudioDev/WebViewPluginDemo/AudioProcessor/Processor.hpp"

//==============================================================================
// This creates new instances of the plugin..
juce::AudioProcessor *JUCE_CALLTYPE createPluginFilter()
{
	return new WebViewPluginDemoAudioProcessor();
}
