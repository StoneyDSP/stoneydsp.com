# Graphs - JUCE

For now: please see the JUCE tutorial on their `juce::AudioProcessorGraph` class (many open-source examples of which can be found in the wild/on their forums)

- [https://juce.com/tutorials/tutorial_audio_processor_graph/](https://juce.com/tutorials/tutorial_audio_processor_graph/)

The code from the tutorial (there is an included zip file on the page) can be implemted inside the `native/src` (C++ source files) and `native/include` (C++ headers) directories, and added to the `native/CMakeLists.txt` project using [JUCE's CMake API](https://github.com/juce-framework/JUCE/blob/master/docs/CMake%20API.md).
