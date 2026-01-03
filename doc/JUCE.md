# JUCE

For an introduction to the world of JUCE, check out their excellent tutorials - with buildable examples - on their webpage:

- [https://juce.com/learn/tutorials/](https://juce.com/learn/tutorials/)

_Many_ commercial as well as open source audio plugins are created with the JUCE audio framework; while it is not the _only_ framework providing an entrypoint a pre-condifugred deployment targets for supporting a wide range of platforms, it is likely the most widely-used, definitely the most well-support and maintained, and offers a vast, extensive library for managing literally every component of almost _any_ type of software; from console app to 3D OpenGL desktop games to multi-platform audio plugins. Additionally, it has a very wide online community and large talent pool.

JUCE ships with several very useful classes which this project relies on.

One is the `juce::WebBrowserComponent` - an actual fully fledged native browser, instantable with almost 0 config - and its' `juce::WebAttachment` classes - which allow connections between C++ GUI Component classes and a custom Javascript event listener wrapper, which provides a set of corresponding Javascript functions for creating and subscribing to events on the C++ side, thus powering bindings to any UI frameworks or libraries using Javascript.

Another JUCE class of great importance is the `juce::AudioProcessorGraph` class.

- [https://juce.com/tutorials/tutorial_audio_processor_graph/](https://juce.com/tutorials/tutorial_audio_processor_graph/)

In short;

JUCE's AudioProcessorGraph works with the concepts of an audio "graph" which describes connections between various audio "nodes".

A "node" is a processing block which may have some number of audio "inputs" and/or "outputs"; examples include waveform oscillators, equalizer filters, and simple gain controllers.

A "graph" therefore is something like a "context" in which the audio DSP "node" connections are described and performed within.

Further reading:

- See [our documentation on creating and loading your own JUCE graphs](./graphs/JUCE.md) as a "scene"!
- see [our documentation on connecting your JS code to your JUCE graphs](./endpoints/JUCE.md) using "endpoints"!

## Building JUCE manually with CMake

This is a short guide on building and installing JUCE manually, using CMake.

It is highly recommended that you do this with:

- [vcpkg](https://github.com/microsoft/vcpkg) installed on your system - it will resolve any missing dependencies you might need
- `VCPKG_ROOT` set as a shell variable, pointing at the root of your vcpkg installation
- `VCPKG_ROOT` appended to your shell's `PATH` variable, such as `PATH="${VCPKG_ROOT}":"${PATH}"`

First, we need to acquire JUCE the old-fashioned way:

```sh
git clone https://github.com/juce-framework/JUCE.git && cd JUCE
```

It is also _highly_ recommended that you clone it into a location which does _not_ require elevated user priviliges to read/write from, as this will prevent npm from being able to install it later.

Clone it into somewhere within your user or home directory.

### Configure

NOTE: be _very careful_ to stringify all path variables in this step, otherwise the command will be completely broken by 'space' characters in your operating system's paths!

#### MacOSX

To configure on MacOSX ARM64 machines with XCode:

```sh
cmake \
    -B ./build \
    -DCMAKE_BUILD_TYPE:STRING=Release \
    -DJUCE_BUILD_EXTRAS:BOOL=ON \
    -DJUCE_BUILD_EXAMPLES:BOOL=ON \
    -DCMAKE_OSX_ARCHITECTURES:STRING="arm64" \
    --toolchain "${VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake" \
    --install-prefix /usr/local \
    -G "Xcode" \
    --fresh
```

NOTE: change `CMAKE_OSX_ARCHITECTURES` to `x86_64` if _not_ building for ARM64 chips.

#### Linux

To configure on Linux machines with GNU Make:

```sh
cmake \
    -B ./build \
    -DCMAKE_BUILD_TYPE:STRING=Release \
    -DJUCE_BUILD_EXTRAS:BOOL=ON \
    -DJUCE_BUILD_EXAMPLES:BOOL=ON \
    --toolchain "${VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake" \
    --install-prefix /usr/local \
    -G "Unix Makefiles" \
    --fresh
```

#### Windows

To configure on Windows machines with MSVC:

```sh
cmake \
    -B ./build \
    -DCMAKE_BUILD_TYPE:STRING=Release \
    -DJUCE_BUILD_EXTRAS:BOOL=ON \
    -DJUCE_BUILD_EXAMPLES:BOOL=ON \
    --toolchain "${VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake" \
    --install-prefix /usr/local \
    -G "MSVC" \
    --fresh
```

### Build

To build the configured JUCE project:

```sh
cmake \
    --build ./build \
    --config Release
```

### Install

To install the JUCE library on your machine (required! for now...) into the location you just specified with `--install-prefix`:

```sh
sudo cmake \
    --install ./build \
    --config Release
```

NOTE: If you followed these steps _exactly_, then CMake should have just successfully installed the JUCE library under `/usr/local` - _or_, wherever you specific with the `--install-prefix` arg when configuring.

Although it isn't too important where does JUCE get installed to (it's entirely portable, even after installation), it is worth being very aware that a typical JUCE WebView project _expects to know_ where to find JUCE on your file system.

```json
{
  "dependencies": {
    "juce-framework-frontend": "file:/usr/local/include/JUCE-8.0.11/modules/juce_gui_extra/native/javascript"
 },
}
```

As we can see, we're currently expected hard-wiring the NodeJS package manager to find the JUCE code at a fixed place on the user's operating system. One small benefit is that the path includes a version number, making it possible to actually version-control this dependency.

However, requiring this to be a fixed path on the user's (developer's) OS is a major issue, and is precisely what we solve by using vcpkg, instead of manually installing JUCE with CMake in this way.

Getting around this is possible and not too hard thanks to vite's ability to resolve package dependencies dynamically; thanks to this, we have solved the issue using NodeJS server-side code within this project's configuration.

(check the `vite.config.mts` for a helper function...)

We have also added a custom typings package under `vendors/@types/juce-framework-frontend`. In this package, we provide some typings to ensure working with JUCE's JS layer is intuitive and comfortable (despite their lack of hard documentation). The code contained inside is purely reference material for IDE support; the actual Javascript being imported is coming from wherever the helper function in our `vite.config.mts` finds it.

---
