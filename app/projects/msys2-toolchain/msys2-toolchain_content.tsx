import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import { Article } from '@/components/elements'
import styles from '@/app/layout.module.css'

export const dynamic = 'force-dynamic'

export default async function MsystoolchainContent() {

  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  const markdown = `
# MSYS2 toolchain

<i>The below is quoted from <a href="https://www.msys2.org/license/">https://www.msys2.org/license/</a></i>

"MSYS2 is a software distribution consisting of several independent parts, each with their own licenses, comparable to a Linux distribution.

The installer, for example, is based on the qt-installer-framework and pre-packs the direct and indirect dependencies of the base meta package. Each package has its own licenses.

The "pacman" package manager in MSYS2 allows users to install other packages available in our repository, each with their own licenses.

The license information for each package as visible on <a href="https://www.msys2.org/license/">https://packages.msys2.org</a> is maintained on a best effort basis and "we" (quote) make no guarantee that it is accurate or complete."

## vcpkg

vcpkg - C++ Library Manager for Windows, Linux, and MacOS

Copyright (c) Microsoft Corporation

vcpkg is distributed under the MIT License

All rights reserved.

## CMake

CMake - Cross Platform Makefile Generator

Copyright 2000-2023 Kitware, Inc. and Contributors

CMake is distributed under the OSI-approved BSD 3-clause License

All rights reserved.
`

  return (
    <Article>
      <div className={styles.container}>

        <div className={styles.content}>

          <div className={styles.flexboxgrid}>

            <div className='flex justify-center align-middle'>
              <MDXRemote source={`[![MSYS2-Toolchain](https://github-readme-stats-two-lime-18.vercel.app/api/pin/?username=nathanjhood\&repo=MSYS2-Toolchain\&theme=transparent)](https://github.com/nathanjhood/MSYS2-Toolchain)`} />
            </div>

            <MDXRemote source={markdown} />

            <HRGradient />

            <BackToTop />

            <BackToHome />

            <HRGradient />

          </div>
        </div>
      </div>
    </Article>
  )
}
