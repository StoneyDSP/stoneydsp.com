import {
  HRGradient,
  TextLargeBoldCenter,
  BackToHome
} from '@/components/layouts'
import Ribbon from '@/components/layouts/ribbon/ribbon'
import styles from './about.module.css'

export default async function About() {
  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className="flex flex-col gap-8 bg-background text-foreground">

          <HRGradient />

          <Ribbon>Hi! I'm Nathan, a.k.a StoneyDSP.</Ribbon>

          <HRGradient />

          <p>I am a software developer with a strong interest in both native and web-based application programming, and a background in fullstack web development.</p>

          <HRGradient />

          <HRGradient />

          <p>I am also a musician making Audio software plugins using a variety of languages and workflows.</p>

          <HRGradient />

          <HRGradient />

          <p>I consider creativity to be a form of problem-solving, and myself a creative person, as well as a problem-solver. I see myself as a natural learner, unafraid of learning curves. I aim to be agnostic of language, platform, style, and opinion in my work.</p>

          <HRGradient />

          <HRGradient />

          <p>After having studied DSP (digital signal processing) in audio and graphic systems - which began as a musical pursuit, but soon became another primary interest - I tentatively began translating some of this acquired knowledge into audio plugins beginning in 2021, primarily using the C++-based JUCE framework. Encouraged by some early success (despite the steep learning curve of C++ as a first language), and a strong mental affinity with Object Oriented Programming paradigm, I also became fascinated with the creative solutions to complex obstacles that we find in all of the most successful programming examples in the world today. Several of these early audio projects, written from the perspective of a tutorial, remain among my most enduringly popular to this day.</p>

          <HRGradient />

          <HRGradient />

          <p>I soon ventured beyond my initial interests into Imperative, Structured, and Procedural programming styles; C and Objective C, script-based languages such as Python, Bash, Powerscript for control flow; CMake, Meson, yaml and friends for continuous integration/deployment and automated testing; and of course, HTML, CSS, and Javascript/Typescript for front end control and user experience. I then wrote a distro for Windows Subsystem for Linux based on Ubuntu, and learned the Apple/XCode tools.</p>

          <HRGradient />

          <HRGradient />

          <p>When it became clear to me that there is more to software development beyond writing (and principally understanding) functional code, I took some opportunities to intern in some different fields, such as web dev consultancy, where my learning skills were well exercised with all things NodeJS, React, Next, Vue, Nuxt, SQL with Postgres and MySQL, SaaS and BaaS platforms, cybersecurity fundamentals, as well as daily routines and workflows in modern software development.</p>

          <HRGradient />

          <HRGradient />

          <p>I am currently finessing several of my audio and system app projects as well as a website, where I intend to provide RESTful APIs and serverless/Edge functions via a secure content delivery mechanisms for further demonstrating and sharing new ideas in audio DSP, directly in the web browser.</p>

          <HRGradient />

          <BackToHome />

          <HRGradient />

        </div>
      </div>
    </div>
  )
}
