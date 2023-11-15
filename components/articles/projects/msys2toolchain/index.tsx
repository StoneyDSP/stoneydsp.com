'use server'
import 'server-only'
import {
  HRGradient,
  BackToHome,
  BackToTop
} from '@/components/layouts'
import { GitProjectCard } from '@/components/cards'
import MDXCache from '@/components/MDXCache'
import BlogArticle from '@/components/elements/article/blogArticle'
// import mdxFetch from '@/utils/mdx/mdxFetch'
import styles from '@/app/template.module.css'

export default async function MsystoolchainContent() {

  // const mdx = await mdxFetch('https://raw.githubusercontent.com/nathanjhood/MSYS2-Toolchain/master/README.md')

  const mdx = `# MSYS2 toolchain

THIS PAGE FAILED TO RENDER...

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

All rights reserved.`

  return (
    <BlogArticle>
      <div className={styles.container}>

        <article className={styles.content}>

          <div className={styles.flexboxgrid}>

            <div className="py-4"></div>

            <div className="grid grid-cols-1 gap-4">
              <GitProjectCard
                userName={'nathanjhood'}
                linkTo={'https://github.com/nathanjhood/MSYS2-Toolchain.git'}
                altString={'MSYS2 Toolchain'}
                repoName={'MSYS2-Toolchain'}
              />
            </div>

            <MDXCache source={mdx ? mdx : '# 404: not found'} />

            <HRGradient />

            <BackToTop />

            <BackToHome />

            <HRGradient />

          </div>
        </article>
      </div>
    </BlogArticle>
  )
}
