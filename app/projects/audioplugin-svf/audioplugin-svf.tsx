import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  TextLargeBoldCenter,
  BackToHome
} from '@/components/layouts'
// import '@/app/globals.css'
import styles from '@/app/projects/audioplugin-svf/audioplugin-svf.module.css'

export default async function AudiopluginsvfContent() {
  
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  const markdown = `
# AudioPlugin-SVF
Simple Multi-Mode State Variable Filter using TPT, built directly from the StoneyDSP AudioPlugin template repository and the juce State Variable TPT Filter module (with a few mods)...

This plugin is left quite bare-bones as it is intended to show how to integrate the AudioPlugin template repository with the off-the-shelf juce modules and ways of working (as best I can).

One should be able to compare the AudioPlugin template project against this source code, and easily spot how we've instantiated a dsp module and interacted with it via the APVTS.

# Built-in features:
+ variable oversampling up to 16x
+ variable processing precision (floats or doubles)
+ dry/wet mix with optional latency compensation
+ master output gain for "wet" signal
+ local context bypass switch
+ master bypass switch
+ resizeable GUI
+ de-coupled processing and true-bypass of audio processors in a lock-free atomic structure

# Manual - v1.0.0b

+ Frequency - Sets the centre frequency of the equalizer filter.
+ Resonance - Increases the amount of "emphasis" of the corner frequency
+ Type* - Chooses the type of filter to use. See below for more.
+ Oversampling - Increasing the oversampling will improve performance at high frequencies - at the cost of more CPU!
+ Mix - Blend between the filter affect (100%) and the dry signal (0%).
+ Bypass - Toggles the entire plugin on or off.

For further information, please continue reading at https://github.com/nathanjhood/AudioPlugin
`

  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className="flex flex-col gap-8 bg-background text-foreground">

          <HRGradient />

          <MDXRemote source={markdown} />

          <HRGradient />

          <BackToHome />

          <HRGradient />

        </div>
      </div>
    </div>
  )
}
