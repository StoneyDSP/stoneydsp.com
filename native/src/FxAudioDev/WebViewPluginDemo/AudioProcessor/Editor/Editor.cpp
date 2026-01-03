/*
	==============================================================================

		This file contains the basic framework code for a JUCE plugin editor.

	==============================================================================
*/

#include "FxAudioDev/WebViewPluginDemo/AudioProcessor/Processor.hpp"
#include "FxAudioDev/WebViewPluginDemo/AudioProcessor/Editor/Editor.hpp"

//==============================================================================
WebViewPluginDemoAudioProcessorEditor::WebViewPluginDemoAudioProcessorEditor(WebViewPluginDemoAudioProcessor &p)
		: AudioProcessorEditor(&p), audioProcessor(p), muteRelay("global:mute"), muteAttachment(audioProcessor.getMuteParam(), muteRelay, nullptr), web(makeOptions())
{
	addAndMakeVisible(web);

#if WEB_UI_DEV
	web.goToURL(WEB_UI_DEV_SERVER_ORIGIN); // e.g. "http://localhost:5173"
#else
	web.goToURL(juce::WebBrowserComponent::getResourceProviderRoot());
#endif

	auto *display = juce::Desktop::getInstance()
											.getDisplays()
											.getPrimaryDisplay();

	jassert(display != nullptr);

	auto area = display->userArea;

	// const int w = juce::jlimit(700, 1600, (int)std::round(area.getWidth() * 0.75));
	// const int h = juce::jlimit(450, 1100, (int)std::round(area.getHeight() * 0.75));

	auto w = area.getWidth();
	auto h = area.getHeight();

	// Make sure that before the constructor has finished, you've set the
	// editor's size to whatever you need it to be.
	setSize(w, h);
}

WebViewPluginDemoAudioProcessorEditor::~WebViewPluginDemoAudioProcessorEditor()
{
}

//==============================================================================
void WebViewPluginDemoAudioProcessorEditor::paint(juce::Graphics &g)
{
	// (Our component is opaque, so we must completely fill the background with a solid colour)
	g.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId));

	// g.setColour(juce::Colours::white);
	// g.setFont(juce::FontOptions(15.0f));
	// g.drawFittedText("Hello World!", getLocalBounds(), juce::Justification::centred, 1);
}

void WebViewPluginDemoAudioProcessorEditor::resized()
{
	// This is generally where you'll want to lay out the positions of any
	// subcomponents in your editor...
	web.setBounds(getLocalBounds());
}

std::optional<juce::WebBrowserComponent::Resource>
WebViewPluginDemoAudioProcessorEditor::serveWebAsset(const juce::String &rawPath)
{
	using Resource = juce::WebBrowserComponent::Resource;

	// Normalize path
	auto path = rawPath;
	if (path == "/" || path.isEmpty())
		path = "/index.html";

	// Remove leading slash
	path = path.fromFirstOccurrenceOf("/", false, false);

	const char *data = nullptr;
	int size = 0;
	juce::String mimeType;

	if (path == "index.html")
	{
		data = BinaryData::index_html;
		size = BinaryData::index_htmlSize;
		mimeType = "text/html";
	}
	else if (path == "assets/index.js")
	{
		data = BinaryData::index_js;
		size = BinaryData::index_jsSize;
		mimeType = "application/javascript";
	}
	else if (path == ".webmanifest")
	{
		data = BinaryData::_webmanifest;
		size = BinaryData::_webmanifestSize;
		mimeType = "application/json";
	}
	// else if (path == "assets/index.css")
	// {
	// 	data = BinaryData::assets_main_css;
	// 	size = BinaryData::assets_main_cssSize;
	// 	mimeType = "text/css";
	// }
	else
	{
		return std::nullopt;
	}

	std::vector<std::byte> bytes;
	bytes.resize((size_t)size);
	std::memcpy(bytes.data(), data, (size_t)size);

	return Resource{std::move(bytes), mimeType};
}

// void WebViewPluginDemoAudioProcessorEditor::parentHierarchyChanged()
// {
// 	if (didInitialResize)
// 		return;

// 	if (auto *peer = getPeer())
// 	{
// 		didInitialResize = true;

// 		auto area = juce::Desktop::getInstance().getDisplays().getDisplayForRect(peer->getAreaCoveredBy(this))->userArea;

// 		const int w = juce::jlimit(700, 1600, (int)std::round(area.getWidth() * 0.75));
// 		const int h = juce::jlimit(450, 1100, (int)std::round(area.getHeight() * 0.75));

// 		setSize(w, h);
// 	}
// }

juce::WebBrowserComponent::Options
WebViewPluginDemoAudioProcessorEditor::makeOptions()
{
	// using O = juce::WebBrowserComponent::Options;

	auto opts = juce::WebBrowserComponent::Options{}
									.withNativeIntegrationEnabled()
									.withResourceProvider(
											[this](const juce::String &path)
											{
												return serveWebAsset(path);
											}
#if WEB_UI_DEV
											,
											WEB_UI_DEV_SERVER_ORIGIN
#endif
											)
									.withOptionsFrom(muteRelay)
									.withNativeFunction(
											"log",
											[](const juce::Array<juce::var> &args,
												 juce::WebBrowserComponent::NativeFunctionCompletion complete)
											{
												juce::Logger::writeToLog(juce::JSON::toString(args));
												complete({});
											})
									.withNativeFunction(
											"getString",
											[](const juce::Array<juce::var> &args,
												 juce::WebBrowserComponent::NativeFunctionCompletion complete)
											{
												// Expect exactly 1 argument
												if (args.size() != 0)
												{
													// Return a JS object describing the error
													juce::DynamicObject::Ptr err = new juce::DynamicObject();
													err->setProperty("ok", false);
													err->setProperty("error", "geString expects no args");
													complete(juce::var(err.get()));
													return;
												}

												// Return a plain number:
												complete(juce::var("baz food your bar"));
											});
	;

#if JUCE_WINDOWS
	opts = opts.withBackend(juce::WebBrowserComponent::Options::Backend::webview2)
						 .withWinWebView2Options(juce::WebBrowserComponent::Options::WinWebView2{}
																				 .withUserDataFolder(juce::File::getSpecialLocation(juce::File::tempDirectory)));
#endif

	return opts;
}
