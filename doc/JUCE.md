# JUCE

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

## Configure

NOTE: be _very careful_ to stringify all path variables in this step, otherwise the command will be completely broken by 'space' characters in your operating system's paths!

### MacOSX

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

### Linux

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

### Windows

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

## Build

To build the configured JUCE project:

```sh
cmake \
    --build ./build \
    --config Release
```

## Install

To install the JUCE library on your machine (required! for now...) into the location you just specified with `--install-prefix`:

```sh
sudo cmake \
    --install ./build \
    --config Release
```

NOTE: If you followed these steps _exactly_, then CMake should have just successfully installed the JUCE library under `/usr/local` - _or_, wherever you specific with the `--install-prefix` arg when configuring.

Although it isn't too important where does JUCE get installed to (it's entirely portable, even after installation), it is worth being very aware that this project _expects to know_ where to find JUCE on your file system.

Getting around this is possible but a but complex, and something to look into later. For now, just be aware that we have added a custom package under `packages/@juce-framework/frontend`. In this package, we have the following dependency in our `package.json`:

```json
{
  "dependencies": {
    "juce-framework-frontend": "file:/usr/local/include/JUCE-8.0.11/modules/juce_gui_extra/native/javascript"
 },
}
```

As we can see, we're currently hard-wiring the NodeJS package manager to find the JUCE code at a fixed place on the user's operating system. One small benefit is that the path includes a version number, making it possible to actually version-control this dependency.

However, requiring this to be a fixed path on the user's (developer's) OS is a major issue, and is precisely what we'll solve later using vcpkg instead.

(watch this space...)

---
