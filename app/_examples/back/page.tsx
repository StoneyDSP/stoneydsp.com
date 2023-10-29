import { getSession, getUser, getUserDetails } from '@/_utils/supabase-server'
import { getURL } from '@/_utils/helpers'
import GitStats from '@/components/cards/GitStats/GitStats'

import { redirect } from 'next/navigation'

import '@/assets/doxygen/doxygen.css'

export const dynamic = 'force-dynamic'

export default async function Back() {

  const [ session, user, userDetails, ] = await Promise.all([
    getSession(),
    getUser(),
    getUserDetails(),
  ])

  if (!session) {
    return redirect(`${getURL()}/login`)
  }

  const gitStats = GitStats()

  return (
    <div className="contents">
      <div className="textblock">
        <p>
          <a className="anchor" id="md__r_e_a_d_m_e"></a>
        </p>
        <table className="markdownTable">
          <tr className="markdownTableHead">
            <th className="markdownTableHeadCenter">Hi! I'm Nathan (aka StoneyDSP).</th>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">I am a software developer with a strong interest in system-level programming.</td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">
              <a href="https://github.com/nathanjhood">
                <img
                  src="https://github-readme-stats-two-lime-18.vercel.app/api?username=nathanjhood&show_icons=true&theme=transparent"
                  alt="StoneyDSP's GitHub stats"
                  className="
                    git-stats-card
                    transition__glow
                  "
                />
              </a>
            </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">I am also a musician making Audio software plugins using a variety of languages and workflows, and also have experience in web development.    </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">
              <a href="https://github.com/nathanjhood">
                <img
                  src="https://github-readme-stats-two-lime-18.vercel.app/api/top-langs/?username=nathanjhood&langs_count=8&show_icons=true&theme=transparent&hide=tex,html"
                  alt="StoneyDSP's Top Languages"
                  className="
                    top-langs-card
                    transition__glow
                  "
                />
              </a>
            </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">In my personal work, I have developed an interest in automating build systems for system-agnostic interoperabilities and cross-compiling routines, with an eye for driving continuous integration/deployment pipelines in modern software development and production workflows.    </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">
              <img src="https://www.skillicons.dev/icons?i=cpp&theme=light" alt="Tech Stack: C++" className="lang-icon-cpp transition__glow" />
              <img src="https://www.skillicons.dev/icons?i=c&theme=light" alt="Tech Stack: C" className="lang-icon-c transition__glow" />
              <img src="https://www.skillicons.dev/icons?i=cmake&theme=light" alt="Tech Stack: CMake" className="lang-icon-cmake transition__glow" />
              <img src="https://www.skillicons.dev/icons?i=nodejs&theme=light" alt="Tech Stack: NodeJS" className="lang-icon-nodejs transition__glow" />
              <img src="https://www.skillicons.dev/icons?i=js&theme=light" alt="Tech Stack: JavaScript" className="lang-icon-js transition__glow" />
              <img src="https://www.skillicons.dev/icons?i=ts&theme=light" alt="Tech Stack: TypeScript" className="lang-icon-ts transition__glow" />
              <img src="https://www.skillicons.dev/icons?i=css&theme=light" alt="Tech Stack: CSS" className="lang-icon-css transition__glow" />
              <img src="https://www.skillicons.dev/icons?i=html&theme=light" alt="Tech Stack: HTML" className="lang-icon-html transition__glow" />
            </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">Here you will find public repos of my personal research and development of audio plugins using popular frameworks such as JUCE and my own DSP, and more recently; explorations in cross-compiling toolchain technologies (WSL, MSYS2, MinGW, etc) and popular buildsystems (CMake, Meson, Make, Autotools, etc); code bindings to families such as the Win32 API, Linux Standards Base and Unix Single Specification; and usage of the Component Object Model alongside the C and C++ standard libraries, which you may download, compile, use, and study for free (mostly MIT or GPL2/3).    </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">
              <a href="https://github.com/nathanjhood/Biquads.git">
                <img
                  width="400"
                  height="150"
                  src="https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood&repo=Biquads&theme=transparent"
                  alt="StoneyDSP Biquads"
                  className="
                    card-repo__biquads
                    transition__glow
                  "
                />
              </a>
              <a href="https://github.com/nathanjhood/UBento.git">
                <img
                  width="400"
                  height="150"
                  src="https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood&repo=UBento&theme=transparent"
                  alt="StoneyDSP UBento"
                  className="
                    card-repo__ubento
                    transition__glow
                  "
                />
              </a>
            </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">
              <a href="https://github.com/nathanjhood/OrfanidisBiquad.git">
                <img
                  width="400"
                  height="150"
                  src="https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood&repo=OrfanidisBiquad&theme=transparent"
                  alt="StoneyDSP OrfanidisBiquad"
                  className="
                    card-repo__orfanidis
                    transition__glow
                  "
                />
              </a>
              <a href="https://github.com/nathanjhood/CxxWin.git">
                <img
                  width="400"
                  height="150"
                  src="https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood&repo=CxxWin&theme=transparent"
                  alt="StoneyDSP CxxWin"
                  className="
                    card-repo__cxxwin
                    transition__glow
                  "
                />
              </a>
            </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">
              <a href="https://github.com/nathanjhood/NonLinearFilters.git">
                <img
                  width="400"
                  height="150"
                  src="https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood&repo=NonLinearFilters&theme=transparent"
                  alt="StoneyDSP NonLinearFilters"
                  className="
                    card-repo__nonlinearfilters
                    transition__glow
                  "
                />
              </a>
              <a href="https://github.com/nathanjhood/cmodule.git">
                <img
                  width="400"
                  height="150"
                  src="https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood&repo=cmodule&theme=transparent"
                  alt="StoneyDSP cmodule"
                  className="
                    card-repo__cmodule
                    transition__glow
                  "
                />
              </a>
            </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">
              <a href="https://github.com/nathanjhood/AudioPlugin-SVF.git">
                <img
                  width="400"
                  height="150"
                  src="https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood&repo=AudioPlugin-SVF&theme=transparent"
                  alt="StoneyDSP AudioPlugin-SVF"
                  className="
                    card-repo__audioplugin-svf
                    transition__glow
                  "
                />
              </a>
              <a href="https://github.com/nathanjhood/AudioPlugin.git">
                <img
                  width="400"
                  height="150"
                  src="https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood&repo=AudioPlugin&theme=transparent"
                  alt="StoneyDSP AudioPlugin"
                  className="
                    card-repo__audioplugin
                    transition__glow
                  "
                />
              </a>
            </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">
              <p
                className="starttd"
                // align="centre"
              >
              </p>
              <p className="intertd"
              >
                Currently on the workbench:
              </p>
              <p
                className="intertd"
                // align="left"
              >
              </p>
              <ul>
                <li>
                  <a href="https://github.com/nathanjhood/MSYS2-toolchain.git">A CMake buildsystem and toolchain for (Msys2) MinGW/Cygwin-based C/C++ projects on Windows, inspired by microsoft vcpkg</a>.
                </li>
                <li>
                  <a href="https://github.com/nathanjhood/MSYS2-libconfig.git">A piecewise conversion of Arch Linux Pacman package manager to the CMake build platform, for eventual usage with the above</a>.
                </li>
                <li>
                  <a href="https://github.com/nathanjhood/CxxWin.git">A Windows-Native graphics application using Direct2D and Microsoft's COM - a good tester project for the Msys toolchains!</a>.
                </li>
                <li>
                  <a href="https://github.com/nathanjhood/cmodule.git">A study on bridging the gap between NodeJS-based application binary development and C/C++ code libraries</a>.
                </li>
                <li>A large pot of coffee, forever in need of refilling.</li>
              </ul>
              <p className="endtd"></p>
            </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">Much of my code as presented here is something of a personal archive, a series of breadcrumbs through a journey of personal development. I anticipate that my work might mostly be useful as study pieces for other learners on the same path. My projects are typically either something I needed for a specific reason, or something I needed to learn about. The codebase itself strives for a minimal dependency overhead, in favour of longer shelf-life, cross-environment stability, and lower cognitive load. I tend toward traditionalism over modernism, but consider myself flexible and emperically-minded. If you have any suggestions or questions, get in touch - I love to chat code!    </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter"></td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">
              Coffee! That's how I get things done!! If you'd like to see me get more things done, please kindly consider <a href="https://www.patreon.com/bePatron?u=8549187" data-patreon-widget-type="become-patron-button">buying me a coffee</a> or two!
            </td>
          </tr>
          <tr className="markdownTableRowEven">
            <td className="markdownTableBodyCenter">
            </td>
          </tr>
          <tr className="markdownTableRowOdd">
            <td className="markdownTableBodyCenter">
              <p>
                <a href="https://paypal.me/StoneyDSPAudio?country.x=ES&amp;locale.x=en_US">
                  <img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt="Paypal button" className="paypal-button transition__glow" />
                </a>
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}
