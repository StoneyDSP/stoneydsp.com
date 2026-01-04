# @stoneydsp/webview-plugin-demo

A multi-platform, multi-target Audio and Graphics application

*Putting "build once; run anywhere" to the test!*

## Features

- [LightningJS 2](https://lightningjs.io/docs/#/lightning-core-reference/HandlingInput/Touch) - WebGL UI w/touchscreen device, trackpad, and mouse support integrations
- [JUCE framework](https://juce.com/releases/whats-new/) - audio processing engine for native platforms
- [WebAudio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - audio processing engine for browser-based platforms
- [vcpkg](https://vcpkg.io/) - for native C++ dependency injection
- [vite](https://vite.dev/) - for TS support, JS tree-shaking + bundling, and fast-refreshing local development server
- [vitest](https://vitest.dev/) - for rapid testing iterations, vitest UI, and benchmarking support
- [custom port of ui-test-utils](https://github.com/nathanjhood/lightningjs-vitest-utils) - to support Vitest integrations

---

## Quickstart

See [requirements](#requirements); then:

```sh
$ vcpkg install
# ...

$ npm install
# ...

$ npm run dev --host

  VITE v7.2.7  ready in 120 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://xxx.xxx.x.xx:5173/
  ➜  press h + enter to show help
```

The app will open on `localhost:5173` in your browser, or can be opened on *any device sharing the same network* (such as a mobile or iPad) using the generated `Network:` url.

Using the mouse, or your device's touch surface, interact with the graphics to produce sound!

[Read our documentation](./doc/README.md) on how to create and load your own custom audio/graphics "scenes" and run them on any supported platform environment!

---

## Table of Contents

- [Features](#features)
- [Quickstart](#quickstart)
  - [Platforms](#platforms)
  - [Targets](#targets)
- [Description](#description)
- [Requirements](#requirements)
  - [CMake](#cmake)
  - [vcpkg](#vcpkg)
  - [JUCE](#juce)
  - [vite](#vite)
  - [NodeJS](#nodejs)
  - [vitest](#vitest)
- [Architecture](#architecture)
  - [How it works](#how-it-works)
    - [Endpoints](#endpoints)
      - [Example endpoints for a scene](#example-endpoints-for-a-scene)
    - [Scenes](#scenes)
      - [Loading a scene](#loading-a-scene)
      - [Calling an endpoint](#calling-an-endpoint)
  - [Making a scene](#making-a-scene)
  - [Summary](#summary)
- [Further Reading](#further-reading)

---

## Description

The application supports the creation of a recallable "scene"; a "scene" is a user-created Typescript file, describing *any* connectivity between graphics and audio that the user wishes to make. The application is then launched with this scene "loaded" by the audio engine.

The main "stage" area is a canvas which holds graphical "module" widgets which produce sound when interacted with. Many of the "modules" can be clicked and/or dragged by the user, as well as moved around freely in the canvas.

To the left of the "stage" is the "inspector"; a scrollable, auto-populating list of all modules being used in the currently.loaded scene. The inspector provides both an overview and a macro-like access to the full set of parameters and modules available for user interaction in the current scene.

The graphics and UI are rendered using a WebGL-flavoured backend, thanks to LightningJS 2.

The audio engine is switchable between JUCE ("native") and WebAudio ("web"), depending on runtime context.

Any number of "scenes" can be created and maintained by users, and stored wherever preferred. Different "scenes" must be created for each engine ("*.juce.ts*" and "*.web.ts"), due to the differences in JUCE's "parameter relay" reactivity paradigm and WebAudio's "context".

Other than this, no changes are required elsewhere within the codebase to enable the running of a user's chosen "scene" on either - or, any - audio engine!

COMING SOON: hot-swappable "scenes" at runtime XD - watch this space!

### Platforms

"native" engine support is available for the following platforms via JUCE:

- Windows
- MacOSX
- Linux
- Android
- iOS

"browser" engine support is available anywhere that supports WebAudio API and ES5:

- Chromium
- Safari

### Targets

The application build and deploy pipelines target the following outputs:

- Standalone desktop application
- VST3 audio plugin
- AU audio plugin (MacOSX only)
- Web Browser PWA (installable progressive web application)

---

## Requirements

### CMake

Just install the latest version from [the website](https://cmake.org/) or your favourite package manager (brew, apt, winget, etc) - and *always* keep your CMake up to date.

### vcpkg

[vcpkg](https://github.com/microsoft/vcpkg/tree/master) is a package manager for C/C++-powered projects. We may install this to easily resolve any missing dependencies on our local machines (far easier than resolving them manually!)

UNIX (MacOSX/Linux):

```sh
git clone https://github.com/microsoft/vcpkg.git "${HOME}/vcpkg" && "${HOME}/vcpkg/bootstrap-vcpkg.sh"
```

Windows:

```ps1
git clone https://github.com/microsoft/vcpkg.git "${HOME}\vcpkg" && "${HOME}\vcpkg\bootstrap-vcpkg.bat"
```

The above command will install vcpkg into your `${HOME}` directory, and add it to your shell's `PATH` so that you may use the `vcpkg` command anywhere in your terminal.

Lastly, set the location you cloned vcpkg into as the `VCPKG_ROOT` variable in your shell, so that CMake can find it:

```sh
# UNIX
export VCPKG_ROOT="${HOME}/vcpkg"
# Windows
set VCPKG_ROOT "${HOME}\vcpkg"
```

It must point to the *root directory* of the vcpkg repository you cloned - *not* to any executable file, or anything else.

### JUCE

Since we are using vcpkg to fetch and manage C++ package dependencies, this project *already* has a `vcpkg.json` file - equivalent to a `package.json` file - which tells vcpkg about our project and it's dependencies.

JUCE is indeed buildable via vcpkg; all you need to do is:

```sh
vcpkg install
```

...from the project root directory.

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

As of writing, most up-to-date Apple machines fall under `arm64-osx` ("ARM"-based chips), while most everything else is either `x64-windows` or `x64-linux` (64-bit Intel chips).

There is also partial (community-based) support for `android`, `ios`, and [*many* other triplets](https://github.com/microsoft/vcpkg/tree/master/triplets)!

This is important, because vcpkg installs JUCE into a directory using the *name* of the *triplet*, and in order for our Javascript (NodeJS/NPM) part to correctly find it, we may need to tweak our package.json accordingly.

For example; on an `arm64-osx` machine, you may note that vcpkg installed JUCE into `./vcpkg_installed/arm64-osx/*` (check the `include`, `tools`, and `share` dirs).

*NOTE: vcpkg has different modes it may operate in, and in some conditions, it *might* install all dependencies into `./build/vcpkg_installed/*` as well as, or instead of, the above location.

### Vite

Since the above path is quite *dynamic*, and we cannot really provide our `package.json` with a fixed path to the JUCE JS library code, we've written a small helper which is called inside our `vite.config.mts` and which provides the bundler with the dependency injection from the `vcpkg_installed/<platform>` directory, *before* any build or serve steps are performed. We also provide a few project-local typings of the JUCE JS API, for better intellisense in the IDE.

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

*NOTE: you may substitute `npm` for `yarn` or, ideally, `pnpm` (preferred) as desired

The app will open on `localhost:5173`

Using the mouse, or your device's touch surface, interact with the graphics to produce sound!

### Vitest

To run unit tests on the components using our custom Vitest/LightningJS testing utils (a home-spun port of the official `@lightningjs/ui-component-test-utils`):

```sh
npm run test
```

To inspect the test results and coverage using Vitest's Browser UI:

```sh
npm run test:ui
```

---

## Architecture

### How it works

#### AudioSM (service manager)

Think of `AudioSM` as the runtime host that provides a stable API to the UI:

- `audioSM.set(address, value)` ← UI sends intent

- `audioSM.subscribe(address, cb)` ← UI listens for truth

#### Engines

Internally, `AudioSM` doesn’t know what “mute” or “oscillator” means. It just routes addresses to handlers.

Therefore, an `AudioSM` implements a mapping of one or more audio service provider(s) to a generic interface, which in turn can be used throughout the codebase to provide access to audio services; this generic interface layer helps us make the code more agnostic of *which* audio service provider is being used.

We currently implement *two* `AudioSM`'s:

- `JUCEAudioSM` - maps to the JUCE audio framework (C++/native)
- `WebAudioSM` - maps to the Web Audio API (JS/browser)

#### Endpoints

An endpoint is the smallest unit of binding between an address and “do something in the engine”.

It’s literally:

- “when someone sets main:mute, call this function”

- “when someone subscribes to main:mute, here’s how to get current state”

So: endpoint = one control binding.

##### Example endpoints for a scene

- `main:mute` endpoint
- `main:master` endpoint
- `osc:wavetype` endpoint

etc.

#### Scenes

A "scene" is just a function that registers a bunch of endpoints as a group, and owns any resources needed.

So: scene = collection of endpoints + resources + cleanup.

In WebAudio, the “resource” is usually a graph (nodes).

In JUCE, the “resource” is usually relay state objects + listeners.

#### Loading a scene

Loading a scene means:

- calling the scene factory once

- it registers its endpoints into the AudioSM

- it returns a dispose() to clean up later

So: loading a scene is not calling an endpoint.
It’s installing a set of endpoints into AudioSM so later set/subscribe calls know what to do.

#### Calling an endpoint

Calling an endpoint is what happens when your UI does:

- `audio.set("global:mute", true)`

AudioSM looks up the endpoint registered for "global:mute" and invokes `endpoint.set(true)`.

So:

- scene is installed once

- endpoints are invoked many times

### Making a "scene"

Because “what the scene does” is the same, but how it talks to the engine differs:

- WebAudio scene uses WebAudio nodes/graphs

- JUCE scene uses JUCE relays/states

So:

`MyScene.web.ts` and `MyScene.juce.ts` are the same conceptual scene, with different backend plumbing.

Users of this app would develop and maintain two backends for the same feature.

(And can choose to only ship one backend in a given project or deployment, if wanted.)

### Summary

The key relationship

- Scene installs endpoints

- Endpoints implement address behaviour

- AudioSM routes to endpoints

That’s the whole model.

---

## Further Reading

- see [our documentation](./doc/README.md) on how to create and load your own custom audio/graphics "scenes" and run them on any supported platform environment!
- see [JUCE's WebView UI](https://juce.com/blog/juce-8-feature-overview-webview-uis/)'s for our initial inspiration!*

---
