import {
  GitStatsCard,
  GitStatsTopLangsCard,
  GitProjectCard
} from '@/components/cards'
import HRGradient from '@/components/layouts/HRGradient'
import BackToHome from '@/components/layouts/BackToHome'
import BackToTop from '@/components/layouts/BackToTop'
// import { Typography } from '@supabase/ui'

// const { Title, Text } = Typography

export default async function AboutContent() {

  return (
    <>
      <h2 className='text-center' tabIndex={0}>
        Hi! I&#39;m Nathan, a.k.a StoneyDSP.
      </h2>

      <HRGradient />

      <div className='flex justify-center align-middle items-center'>
        <GitStatsCard />
      </div>

      <HRGradient />

      <p className='text-center' tabIndex={0}>
        I am a software developer with a strong interest in both native and web-based application programming, and a background in fullstack web development.
      </p>

      <HRGradient />

      <div className='flex justify-center align-middle items-center'>
        <GitStatsTopLangsCard />
      </div>

      <HRGradient />

      <p className='text-center' tabIndex={0}>
        I am also a musician making Audio software plugins using a variety of languages and workflows.
      </p>

      <HRGradient />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GitProjectCard
          userName={'nathanjhood'}
          linkTo={'https://github.com/nathanjhood/Biquads.git'}
          altString={'Biquads'}
          repoName={'Biquads'}
        />

        <GitProjectCard
          userName={'nathanjhood'}
          linkTo={'https://github.com/nathanjhood/BiLinearEQ.git'}
          altString={'BiLinearEQ'}
          repoName={'BiLinearEQ'}
        />
      </div>

      <HRGradient />

      <p tabIndex={0}>
        I consider creativity to be a form of problem-solving, and myself a creative person, as well as a problem-solver. I see myself as a natural learner, unafraid of learning curves. I aim to be agnostic of language, platform, style, and opinion in my work.
      </p>

      <HRGradient />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GitProjectCard
          userName={'nathanjhood'}
          linkTo={'https://github.com/nathanjhood/UBento.git'}
          altString={'UBento'}
          repoName={'UBento'}
        />

        <GitProjectCard
          userName={'nathanjhood'}
          linkTo={'https://github.com/nathanjhood/MSYS2-Toolchain.git'}
          altString={'MSYS2 Toolchain'}
          repoName={'MSYS2-Toolchain'}
        />
      </div>

      <HRGradient />

      <p tabIndex={0}>
        After having studied DSP (digital signal processing) in audio and graphic systems - which began as a musical pursuit, but soon became another primary interest - I tentatively began translating some of this acquired knowledge into audio plugins beginning in 2021, primarily using the C++-based JUCE framework. Encouraged by some early success (despite the steep learning curve of C++ as a first language), and a strong mental affinity with Object Oriented Programming paradigm, I also became fascinated with the creative solutions to complex obstacles that we find in all of the most successful programming examples in the world today. Several of these early audio projects, written from the perspective of a tutorial, remain among my most enduringly popular to this day.
      </p>

      <HRGradient />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GitProjectCard
          userName={'nathanjhood'}
          linkTo={'https://github.com/nathanjhood/AudioPlugin-SVF.git'}
          altString={'AudioPlugin-SVF'}
          repoName={'AudioPlugin-SVF'}
        />

        <GitProjectCard
          userName={'nathanjhood'}
          linkTo={'https://github.com/nathanjhood/OrfanidisBiquad.git'}
          altString={'Orfanidis Biquad'}
          repoName={'OrfanidisBiquad'}
        />
      </div>

      <HRGradient />

      <p tabIndex={0}>
        I soon ventured beyond my initial interests into Imperative, Structured, and Procedural programming styles; C and Objective C, script-based languages such as Python, Bash, Powerscript for control flow; CMake, Meson, yaml and friends for continuous integration/deployment and automated testing; and of course, HTML, CSS, and Javascript/Typescript for front end control and user experience. I then wrote a distro for Windows Subsystem for Linux based on Ubuntu, and learned the Apple/XCode tools.
      </p>

      <HRGradient />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GitProjectCard
          userName={'nathanjhood'}
          linkTo={'https://github.com/nathanjhood/cmodule.git'}
          altString={'cmodule'}
          repoName={'cmodule'}
        />

        <GitProjectCard
          userName={'nathanjhood'}
          linkTo={'https://github.com/nathanjhood/CxxWin.git'}
          altString={'CxxWin'}
          repoName={'CxxWin'}
        />
      </div>

      <HRGradient />

      <p tabIndex={0}>
        When it became clear to me that there is more to software development beyond writing (and principally understanding) functional code, I took some opportunities to intern in some different fields, such as web dev consultancy, where my learning skills were well exercised with all things NodeJS, React, Next, Vue, Nuxt, SQL with Postgres and MySQL, SaaS and BaaS platforms, cybersecurity fundamentals, as well as daily routines and workflows in modern software development.
      </p>

      <HRGradient />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GitProjectCard
          userName={'nathanjhood'}
          linkTo={'https://github.com/nathanjhood/Biquads.git'}
          altString={'Biquads'}
          repoName={'Biquads'}
        />

        <GitProjectCard
          userName={'nathanjhood'}
          linkTo={'https://github.com/nathanjhood/OrfanidisBiquad.git'}
          altString={'Orfanidis Biquad'}
          repoName={'OrfanidisBiquad'}
        />
      </div>

      <HRGradient />

      <p tabIndex={0}>
        I am currently finessing several of my audio and system app projects as well as a website, where I intend to provide RESTful APIs and serverless/Edge functions via a secure content delivery mechanisms for further demonstrating and sharing new ideas in audio DSP, directly in the web browser.
      </p>

      <HRGradient />

      <BackToTop />

      <BackToHome />

      <HRGradient />

    </>
  )
}
