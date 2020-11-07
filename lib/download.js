const ora = require('ora')
const fs = require('fs')
const {promisify} = require('util')
const gitPullOrClone = promisify(require('git-pull-or-clone'))


async function clone(repo,output){
    const process = ora(`download...${repo}`)
    process.start()
    if(fs.existsSync(`./${output}`)){
        return process.fail()
    }
    await gitPullOrClone(repo,`./${output}`)
    return process.succeed()
}

module.exports ={
    clone
}