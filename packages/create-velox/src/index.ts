import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import minimist from 'minimist'
import prompts from 'prompts'
import { red, green, bold } from 'kolorist'

const argv = minimist(process.argv.slice(2), { string: ['_'] })
const cwd = process.cwd()

const TEMPLATES = [
    {
        name: 'vanilla-ts',
        display: 'Vanilla TypeScript',
        color: green
    },
    {
        name: 'vanilla-js',
        display: 'Vanilla JavaScript',
        color: red // Just for distinction
    }
]

const renameFiles: Record<string, string | undefined> = {
    _gitignore: '.gitignore'
}

async function init() {
    const defaultTargetDir = 'velox-project'
    let targetDir = argv._[0] || defaultTargetDir

    let result: prompts.Answers<'projectName' | 'overwrite' | 'packageName' | 'framework'>

    try {
        result = await prompts(
            [
                {
                    type: targetDir ? null : 'text',
                    name: 'projectName',
                    message: 'Project name:',
                    initial: defaultTargetDir,
                    onState: (state) => {
                        targetDir = state.value.trim() || defaultTargetDir
                    }
                },
                {
                    type: () =>
                        !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
                    name: 'overwrite',
                    message: () =>
                        (targetDir === '.'
                            ? 'Current directory'
                            : `Target directory "${targetDir}"`) +
                        ` is not empty. Remove existing files and continue?`
                },
                {
                    type: (_, { overwrite }: { overwrite?: boolean }) => {
                        if (overwrite === false) {
                            throw new Error(red('✖') + ' Operation cancelled')
                        }
                        return null
                    },
                    name: 'overwriteChecker'
                },
                {
                    type: 'select',
                    name: 'framework',
                    message: 'Select a variant:',
                    initial: 0,
                    choices: TEMPLATES.map((framework) => {
                        const frameworkColor = framework.color
                        return {
                            title: frameworkColor(framework.display || framework.name),
                            value: framework
                        }
                    })
                }
            ],
            {
                onCancel: () => {
                    throw new Error(red('✖') + ' Operation cancelled')
                }
            }
        )
    } catch (cancelled: any) {
        console.log(cancelled.message)
        return
    }

    const { framework, overwrite, packageName } = result
    const root = path.join(cwd, targetDir)

    if (overwrite) {
        emptyDir(root)
    } else if (!fs.existsSync(root)) {
        fs.mkdirSync(root, { recursive: true })
    }

    // Determine template
    const templateDir = path.resolve(
        fileURLToPath(import.meta.url),
        '../..',
        `templates/${framework.name}`
    )

    const write = (file: string, content?: string) => {
        const targetPath = path.join(root, renameFiles[file] ?? file)
        if (content) {
            fs.writeFileSync(targetPath, content)
        } else {
            copy(path.join(templateDir, file), targetPath)
        }
    }

    const files = fs.readdirSync(templateDir)
    for (const file of files) {
        write(file)
    }

    const pkg = JSON.parse(
        fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8')
    )

    pkg.name = packageName || targetDir

    write('package.json', JSON.stringify(pkg, null, 2))

    console.log(`\n${bold(green('Done!'))} Now run:\n`)
    if (root !== cwd) {
        console.log(`  cd ${path.relative(cwd, root)}`)
    }
    console.log(`  npm install`)
    console.log(`  npm run dev`)
    console.log()
}

function copy(src: string, dest: string) {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
        copyDir(src, dest)
    } else {
        fs.copyFileSync(src, dest)
    }
}

function copyDir(srcDir: string, destDir: string) {
    fs.mkdirSync(destDir, { recursive: true })
    for (const file of fs.readdirSync(srcDir)) {
        const srcFile = path.resolve(srcDir, file)
        const destFile = path.resolve(destDir, file)
        copy(srcFile, destFile)
    }
}

function isEmpty(path: string) {
    const files = fs.readdirSync(path)
    return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

function emptyDir(dir: string) {
    if (!fs.existsSync(dir)) {
        return
    }
    for (const file of fs.readdirSync(dir)) {
        if (file === '.git') {
            continue
        }
        fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
    }
}

init().catch((e) => {
    console.error(e)
})
