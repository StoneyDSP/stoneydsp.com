cmake_minimum_required(VERSION 3.22...3.28 FATAL_ERROR)

if(DEFINED ENV{VCPKG_ROOT} AND(NOT DEFINED CMAKE_TOOLCHAIN_FILE))
    set(VCPKG_ROOT $ENV{VCPKG_ROOT} CACHE FILEPATH "Path to vcpkg toolchain." FORCE)
    set(CMAKE_TOOLCHAIN_FILE "${VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake" CACHE FILEPATH "vcpkg toolchain file." FORCE)
endif()

list(APPEND CMAKE_MODULE_PATH
    "${CMAKE_CURRENT_LIST_DIR}/extras/Build/CMake"
)

project(WEBVIEW_PLUGIN_DEMO VERSION 0.0.1)

# find_package(JUCE CONFIG REQUIRED)
add_subdirectory($ENV{JUCE_DIR} "./juce")

juce_add_plugin(WebviewPluginDemo

    # VERSION ...                               # Set this if the plugin version is different to the project version
    # ICON_BIG ...                              # ICON_* arguments specify a path to an image file to use as an icon for the Standalone
    # ICON_SMALL ...
    # COMPANY_NAME ...                          # Specify the name of the plugin's author
    # IS_SYNTH TRUE/FALSE                       # Is this a synth or an effect?
    # NEEDS_MIDI_INPUT TRUE/FALSE               # Does the plugin need midi input?
    # NEEDS_MIDI_OUTPUT TRUE/FALSE              # Does the plugin need midi output?
    # IS_MIDI_EFFECT TRUE/FALSE                 # Is this plugin a MIDI effect?
    # EDITOR_WANTS_KEYBOARD_FOCUS TRUE/FALSE    # Does the editor need keyboard focus?
    # COPY_PLUGIN_AFTER_BUILD TRUE/FALSE        # Should the plugin be installed to a default location after building?
    PLUGIN_MANUFACTURER_CODE FxDi # A four-character manufacturer id with at least one upper-case character
    PLUGIN_CODE Wvd0 # A unique four-character plugin id with exactly one upper-case character

    # GarageBand 10.3 requires the first letter to be upper-case, and the remaining letters to be lower-case
    FORMATS AU VST3 Standalone # The formats to build. Other valid formats are: AAX Unity VST AU AUv3
    PRODUCT_NAME "WebView Plugin Demo" # The name of the final executable, which can differ from the target name
    NEEDS_WEBVIEW2 TRUE
)

target_compile_definitions(WebviewPluginDemo
    PRIVATE
    JUCE_IGNORE_VST3_MISMATCHED_PARAMETER_ID_WARNING=1
    JUCE_WEB_BROWSER=1 # This defaults to 1 unless explicitly specified
    JUCE_USE_WIN_WEBVIEW2_WITH_STATIC_LINKING=1
)

target_sources(WebviewPluginDemo
    PRIVATE
    native/Source/Main.cpp
)

target_include_directories(WebviewPluginDemo
    PUBLIC
    native/JuceLibraryCode
    native/Source
)

target_link_libraries(WebviewPluginDemo
    PRIVATE

    # AudioPluginData           # If we'd created a binary data target, we'd link to it here
    juce::juce_audio_basics
    juce::juce_audio_devices
    juce::juce_audio_formats
    juce::juce_audio_plugin_client
    juce::juce_audio_processors

    # juce::juce_audio_processors_headless
    juce::juce_audio_utils
    juce::juce_core
    juce::juce_data_structures
    juce::juce_dsp
    juce::juce_events
    juce::juce_graphics
    juce::juce_gui_basics
    juce::juce_gui_extra

    PUBLIC
    juce::juce_recommended_config_flags
    juce::juce_recommended_lto_flags
    juce::juce_recommended_warning_flags
)
