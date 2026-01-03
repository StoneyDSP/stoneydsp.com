cmake_minimum_required(VERSION 3.22...3.28 FATAL_ERROR)

#[=============================================================================[
# PROPS
#]=============================================================================]
set_property(GLOBAL PROPERTY USE_FOLDERS YES)

#[=============================================================================[
# VCPKG
#]=============================================================================]
if(DEFINED ENV{VCPKG_ROOT} AND(NOT DEFINED CMAKE_TOOLCHAIN_FILE))
    set(VCPKG_ROOT $ENV{VCPKG_ROOT} CACHE FILEPATH "Path to vcpkg toolchain." FORCE)
    set(CMAKE_TOOLCHAIN_FILE "${VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake" CACHE FILEPATH "vcpkg toolchain file." FORCE)
endif()

#[=============================================================================[
# PROJECT
#]=============================================================================]
project("WebViewPluginDemo" VERSION 0.0.1)

#[=============================================================================[
# JUCE
#]=============================================================================]
find_package(JUCE 8.0.7 CONFIG REQUIRED)

#[=============================================================================[
# WEBVIEW BUILD COMMAND
#]=============================================================================]
add_custom_command(
    OUTPUT "${CMAKE_SOURCE_DIR}/dist"
    COMMAND "npm" ARGS "run" "build"
    WORKING_DIRECTORY "${CMAKE_SOURCE_DIR}"
)

#[=============================================================================[
# WEBVIEW TARGET
#]=============================================================================]
juce_add_binary_data("Assets"
    HEADER_NAME "PluginAssets"

    # NAMESPACE "FxAudioDev::WebViewPluginDemo"
    SOURCES
    "${CMAKE_SOURCE_DIR}/dist/index.html"
    "${CMAKE_SOURCE_DIR}/dist/assets/index.js"
    "${CMAKE_SOURCE_DIR}/dist/.webmanifest"
    "${CMAKE_SOURCE_DIR}/dist/favicon.ico"
    "${CMAKE_SOURCE_DIR}/dist/static/fonts/Roboto.ttf"
    "${CMAKE_SOURCE_DIR}/dist/static/fonts/RobotoCondensed.ttf"
    "${CMAKE_SOURCE_DIR}/dist/static/fonts/RobotoSlab.ttf"
    "${CMAKE_SOURCE_DIR}/dist/static/fonts/Roboto-Regular.ttf"
)

#[=============================================================================[
# Processor
#]=============================================================================]
configure_file("include/FxAudioDev/WebViewPluginDemo/JuceHeader.h" "include/FxAudioDev/WebViewPluginDemo/JuceHeader.h")
configure_file("include/FxAudioDev/WebViewPluginDemo/JucePluginDefines.h" "include/FxAudioDev/WebViewPluginDemo/JucePluginDefines.h")

add_library("Processor" OBJECT)
add_library("WebViewPluginDemo::Processor" ALIAS "Processor")
add_library("FxAudioDev::WebViewPluginDemo::Processor" ALIAS "Processor")
configure_file("include/FxAudioDev/WebViewPluginDemo/AudioProcessor/Processor.hpp" "include/FxAudioDev/WebViewPluginDemo/AudioProcessor/Processor.hpp")
target_sources("Processor"
    PUBLIC
    FILE_SET fxaudiodev_webviewaudioplugin_processor_PUBLIC_HEADERS
    TYPE HEADERS
    BASE_DIRS
    $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}/include>
    $<INSTALL_INTERFACE:include>
    FILES
    $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}/include/FxAudioDev/WebViewPluginDemo/AudioProcessor/Processor.hpp>
    $<INSTALL_INTERFACE:include/FxAudioDev/WebViewPluginDemo/AudioProcessor/Processor.hpp>
)
target_sources("Processor"
    PRIVATE
    "src/FxAudioDev/WebViewPluginDemo/AudioProcessor/Processor.cpp"
)
target_link_libraries("Processor"
    PUBLIC
    juce::juce_recommended_config_flags
    juce::juce_recommended_lto_flags
    juce::juce_recommended_warning_flags

    PRIVATE # juce::juce_audio_processors_headless
    juce::juce_audio_basics
    juce::juce_audio_devices
    juce::juce_audio_formats
    juce::juce_audio_plugin_client
    juce::juce_audio_processors
    juce::juce_audio_utils
    juce::juce_core
    juce::juce_data_structures
    juce::juce_dsp
    juce::juce_events
    juce::juce_graphics
    juce::juce_gui_basics
    juce::juce_gui_extra
)

#[=============================================================================[
# Editor
#]=============================================================================]
add_library("Editor" OBJECT)
add_library("WebViewPluginDemo::Editor" ALIAS "Editor")
add_library("FxAudioDev::WebViewPluginDemo::Editor" ALIAS "Editor")
configure_file("include/FxAudioDev/WebViewPluginDemo/AudioProcessor/Editor/Editor.hpp" "include/FxAudioDev/WebViewPluginDemo/AudioProcessor/Editor/Editor.hpp")
target_sources("Editor"
    PUBLIC
    FILE_SET fxaudiodev_webviewaudioplugin_editor_PUBLIC_HEADERS
    TYPE HEADERS
    BASE_DIRS
    $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}/include>
    $<INSTALL_INTERFACE:include>
    FILES
    $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}/include/FxAudioDev/WebViewPluginDemo/AudioProcessor/Editor/Editor.hpp>
    $<INSTALL_INTERFACE:include/FxAudioDev/WebViewPluginDemo/AudioProcessor/Editor/Editor.hpp>
)
target_sources("Editor"
    PRIVATE
    "src/FxAudioDev/WebViewPluginDemo/AudioProcessor/Editor/Editor.cpp"
)
target_link_libraries("Editor"
    PUBLIC
    FxAudioDev::WebViewPluginDemo::Processor
    juce::juce_recommended_config_flags
    juce::juce_recommended_lto_flags
    juce::juce_recommended_warning_flags

    PRIVATE # juce::juce_audio_processors_headless
    Assets
    juce::juce_audio_basics
    juce::juce_audio_devices
    juce::juce_audio_formats
    juce::juce_audio_plugin_client
    juce::juce_audio_processors
    juce::juce_audio_utils
    juce::juce_core
    juce::juce_data_structures
    juce::juce_dsp
    juce::juce_events
    juce::juce_graphics
    juce::juce_gui_basics
    juce::juce_gui_extra
)

#[=============================================================================[
# Plugin & Standalone
#]=============================================================================]
juce_add_plugin(WebViewPluginDemo

    # VERSION ...                               # Set this if the plugin version is different to the project version
    # ICON_BIG ...                              # ICON_* arguments specify a path to an image file to use as an icon for the Standalone
    # ICON_SMALL ...
    COMPANY_NAME "FxAudioDev" # Specify the name of the plugin's author

    MICROPHONE_PERMISSION_ENABLED FALSE
    CAMERA_PERMISSION_ENABLED FALSE
    BLUETOOTH_PERMISSION_ENABLED FALSE

    # IS_SYNTH TRUE/FALSE                       # Is this a synth or an effect?
    # NEEDS_MIDI_INPUT TRUE/FALSE               # Does the plugin need midi input?
    # NEEDS_MIDI_OUTPUT TRUE/FALSE              # Does the plugin need midi output?
    # IS_MIDI_EFFECT TRUE/FALSE                 # Is this plugin a MIDI effect?
    EDITOR_WANTS_KEYBOARD_FOCUS TRUE # Does the editor need keyboard focus?

    # COPY_PLUGIN_AFTER_BUILD TRUE/FALSE        # Should the plugin be installed to a default location after building?
    PLUGIN_MANUFACTURER_CODE FxDi # A four-character manufacturer id with at least one upper-case character
    PLUGIN_CODE Wvd0 # A unique four-character plugin id with exactly one upper-case character

    # GarageBand 10.3 requires the first letter to be upper-case, and the remaining letters to be lower-case
    FORMATS AU AUv3 VST3 Standalone # The formats to build. Other valid formats are: AAX Unity VST AU AUv3
    PRODUCT_NAME "WebViewPluginDemo" # The name of the final executable, which can differ from the target name

    NEEDS_WEBVIEW2 TRUE
    NEEDS_WEB_BROWSER TRUE
    VST3_AUTO_MANIFEST FALSE
)
configure_file("include/FxAudioDev/WebViewPluginDemo.hpp" "include/FxAudioDev/WebViewPluginDemo.hpp" @ONLY)
target_sources("WebViewPluginDemo"
    PUBLIC
    FILE_SET fxaudiodev_webviewplugindemo_PUBLIC_HEADERS
    TYPE HEADERS
    BASE_DIRS
    $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}/include>
    $<INSTALL_INTERFACE:include>
    FILES
    $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}/include/FxAudioDev/WebViewPluginDemo.hpp>
    $<INSTALL_INTERFACE:include/FxAudioDev/WebViewPluginDemo.hpp>
)
target_sources("WebViewPluginDemo"
    PRIVATE
    "src/FxAudioDev/WebViewPluginDemo.cpp"
)
target_compile_definitions("WebViewPluginDemo"
    PUBLIC
    JUCE_IGNORE_VST3_MISMATCHED_PARAMETER_ID_WARNING=1
    DONT_SET_USING_JUCE_NAMESPACE=1
)
target_link_libraries(WebViewPluginDemo
    PUBLIC
    juce::juce_recommended_config_flags
    juce::juce_recommended_lto_flags
    juce::juce_recommended_warning_flags

    PRIVATE # juce::juce_audio_processors_headless
    "FxAudioDev::WebViewPluginDemo::Processor"
    "FxAudioDev::WebViewPluginDemo::Editor"
    Assets
    juce::juce_audio_basics
    juce::juce_audio_devices
    juce::juce_audio_formats
    juce::juce_audio_plugin_client
    juce::juce_audio_processors
    juce::juce_audio_utils
    juce::juce_core
    juce::juce_data_structures
    juce::juce_dsp
    juce::juce_events
    juce::juce_graphics
    juce::juce_gui_basics
    juce::juce_gui_extra
)

#[=============================================================================[
#   Helpers
#]=============================================================================]
juce_generate_juce_header(WebViewPluginDemo)

juce_enable_vst3_manifest_step(WebViewPluginDemo)

juce_enable_copy_plugin_step(WebViewPluginDemo)

#[=============================================================================[
#
#]=============================================================================]
