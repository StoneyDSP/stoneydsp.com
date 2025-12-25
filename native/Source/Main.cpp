/*
	==============================================================================

		This file was auto-generated and contains the startup code for a PIP.

	==============================================================================
*/

#include "../JuceLibraryCode/JuceHeader.h"
#include "WebViewPluginDemo.h"

//==============================================================================
juce::AudioProcessor *JUCE_CALLTYPE createPluginFilter()
{
	return new WebViewPluginAudioProcessorWrapper();
}
