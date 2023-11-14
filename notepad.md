MDX page component params

```
mdxSrc={'https://raw.githubusercontent.com/nathanjhood/CxxWin/main/README.md'}
userName={'nathanjhood'}
linkTo={'https://github.com/nathanjhood/CxxWin.git'}
altString={'CxxWin'}
repoName={'CxxWin'}
```

```
[
    {
        project: 'CxxWin'
        user: 'nathanjhood',
        repo: 'CxxWin',
        branch: 'main',
        path: 'README.md',
        description: '',
    },
    {
        project: 'Audio Plugin SVF'
        user: 'nathanjhood', // For Meta Title tag, heading element, nav bar, etc
        repo: 'AudioPlugin-SVF',
        branch: 'main', // For repo URL, Meta Tag Canonical link, etc
        path: 'README.md',
        description: '',
    }
]

mdxSrc = `${`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`}`
linkTo = `${`https://github.com/${user}/${repo}.git`}`
```
