# @stoneydsp/webview-plugin-demo

Features:

- LightningJS 2 UI
- JUCE framework for low-level audio processing and bindings
- vcpkg for C++ dependencies
- vite for bundling and fast-refreshing local dev server
- vitest for rapid testing iterations and benchmarking
- custom port of ui-test-utils for vitest support
- insallable webmanifest progressive web app

For now, see [JUCE's WebView UI](https://juce.com/blog/juce-8-feature-overview-webview-uis/)'s...

## Table of Content

- [Requirements](#requirements)
  - [CMake](#cmake)
  - [vcpkg](#vcpkg)
  - [JUCE](#juce)
  - [NodeJS](#nodejs)

## Requirements

### CMake

Just install the latest version from [the website](https://cmake.org/) or your favourite package manager (brew, apt, winget, etc) - and _always_ keep your CMake up to date.

### vcpkg

[vcpkg](https://github.com/microsoft/vcpkg/tree/master) is a package manager for C/C++-powered projects. We may install this to easily resolve any missing dependencies on our local machines (far easier than resolving them manually!)

```sh
https://github.com/microsoft/vcpkg.git && cd vcpkg
```

UNIX (MacOSX/Linux):

```sh
./bootstrap-vcpkg.sh
```

Windows:

```sh
.\bootstrap-vcpkg.bat
```

The above command will install vcpkg into the repository directory, and add it to your shell's `PATH` so that you may use the `vcpkg` command in your terminal, if needed.

Lastly, set the location you cloned vcpkg into as the `VCPKG_ROOT` variable in your shell, so that CMake can find it:

```sh
export VCPKG_ROOT="/path/to/vcpkg"
```

It must point to the _root directory_ of the vcpkg repository you cloned - _not_ to any executable file, or anything else.

### JUCE

Since we are using `vcpkg` to fetch and manage C++ package dependencies, the project already has a `vcpkg.json` file - equivalent to a `package.json` file - which tells vcpkg about our project and it's dependencies. JUCE is indeed buildable via vcpkg, all you need to do is:

```sh
vcpkg install
```

From the project root directory.

As long as you already have CMake - and vcpkg - installed, you should see vcpkg come to life and install a number of packages, including JUCE, most likely into `vcpkg_installed` at the project root. (note: this can be changed, check the vcpkg docs if you don't see this directory appear after running the command).

vcpkg utilizes the concept of "triplets" to describe criteria about the machine on which you are compiling. A triplet is just a short string of the form:

```sh
<cpu><arch>-<platform>
```

Here are some examples of the most typical "triplets":

```sh
# ARM machines
arm64-osx
arm64-windows

# intel 64-bit machines
x64-windows
x64-linux
x64-osx

# intel 32-bit machines
x86-windows
x86-linux
x86-osx
```

As of writing, most up-to-date Apple machines fall under `arm64-osx`, while most everything else is either `x64-windows` or `x64-linux`.

This is important, because vcpkg installs JUCE into a directory using the _name_ of the _triplet_, and in order for our Javascript (NodeJS/NPM) part to correctly find it, we may need to tweak our package.json accordingly.

On an `arm64-osx` machine, you will find that vcpkg install JUCE into `vcpkg_installed/arm64-osx/*`.

Therefore, the `package.json` at the root of this project must specifiy the following path in `dependencies`:

```json
{
  "dependencies": {
    "juce-framework-frontend": "file:./vcpkg_installed/arm64-osx/include/JUCE-8.0.7/modules/juce_gui_extra/native/javascript"
  }
}
```

### NodeJS

At this point:

- the JUCE code should have been built
- the NodeJS package manager should be able to link to the built code without any issue
- we may simply think of the remainder of the project as a standard JS web front end project

Assuming the above path is correctly pointing to wherever vcpkg installed JUCE on your machine, you can now:

```sh
npm install
```

```sh
npm run dev
```

The app will open on `localhost:5173`!

In this case, I'm combining a few other R&D points by adding:

- vite for fast bundling and dev serving
- vitest for rapid modern testing and benchmarking
- LightningJS 2 instead of React for UI components (just personal preference tbh)
- latest eslint config
- several VSCode extensions and integrations

---
