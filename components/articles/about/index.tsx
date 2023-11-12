'use server'
import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  BackToHome,
  BackToTop,
} from '@/components/layouts'
import styles from '@/app/layout.module.css'

// export const dynamic = 'force-dynamic'

export default async function AboutContent() {

  return (
    <div className={styles.container}>

      <article className={styles.content}>

        <div className={styles.flexboxgrid}>

          {/* <div className='tableRowOdd py-0 text-center'>
            <div className='pt-0 pb-1'>
            <HRGradient />
            </div>
          </div> */}

          <h2 className='text-center'>
            Hi! I&#39;m Nathan, a.k.a StoneyDSP.
          </h2>

          <HRGradient />

          <p className='text-center'>
            I am a software developer with a strong interest in both native and web-based application programming, and a background in fullstack web development.
          </p>

          <HRGradient />

          <div className='flex justify-center align-middle items-center'>
            <MDXRemote source={`
            [![StoneyDSP's GitHub stats](https://gh-readme-stats.stoneydsp.com/api?username=nathanjhood&show_icons=true&theme=transparent&border_radius=0&hide_border=true)](https://github.com/nathanjhood)
            `} />
          </div>

          <HRGradient />

          <p className='text-center'>
            I am also a musician making Audio software plugins using a variety of languages and workflows.
          </p>

          <HRGradient />

          <div className='flex justify-center align-middle items-center'>
            <MDXRemote source={`
            [![StoneyDSP's Top Languages](https://gh-readme-stats.stoneydsp.com/api/top-langs/?username=nathanjhood&langs_count=8&show_icons=true&theme=transparent&hide=tex,css,html&border_radius=0&hide_border=true)](https://github.com/nathanjhood)
            `} />
          </div>

          <HRGradient />

          <p>
            I consider creativity to be a form of problem-solving, and myself a creative person, as well as a problem-solver. I see myself as a natural learner, unafraid of learning curves. I aim to be agnostic of language, platform, style, and opinion in my work.
          </p>

          <HRGradient />

          <p>
            After having studied DSP (digital signal processing) in audio and graphic systems - which began as a musical pursuit, but soon became another primary interest - I tentatively began translating some of this acquired knowledge into audio plugins beginning in 2021, primarily using the C++-based JUCE framework. Encouraged by some early success (despite the steep learning curve of C++ as a first language), and a strong mental affinity with Object Oriented Programming paradigm, I also became fascinated with the creative solutions to complex obstacles that we find in all of the most successful programming examples in the world today. Several of these early audio projects, written from the perspective of a tutorial, remain among my most enduringly popular to this day.
          </p>

          <HRGradient />

          <p>
            I soon ventured beyond my initial interests into Imperative, Structured, and Procedural programming styles; C and Objective C, script-based languages such as Python, Bash, Powerscript for control flow; CMake, Meson, yaml and friends for continuous integration/deployment and automated testing; and of course, HTML, CSS, and Javascript/Typescript for front end control and user experience. I then wrote a distro for Windows Subsystem for Linux based on Ubuntu, and learned the Apple/XCode tools.
          </p>

          <HRGradient />

          <p>
            When it became clear to me that there is more to software development beyond writing (and principally understanding) functional code, I took some opportunities to intern in some different fields, such as web dev consultancy, where my learning skills were well exercised with all things NodeJS, React, Next, Vue, Nuxt, SQL with Postgres and MySQL, SaaS and BaaS platforms, cybersecurity fundamentals, as well as daily routines and workflows in modern software development.
          </p>

          <HRGradient />

          <p>
            I am currently finessing several of my audio and system app projects as well as a website, where I intend to provide RESTful APIs and serverless/Edge functions via a secure content delivery mechanisms for further demonstrating and sharing new ideas in audio DSP, directly in the web browser.
          </p>

          <HRGradient />

          <BackToTop />

          <BackToHome />

          <HRGradient />


        </div>
      </article>
    </div>
  )
}
