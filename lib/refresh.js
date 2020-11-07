const fs = require('fs')
const nunjucks = require("nunjucks");
const chalk = require('chalk');//颜色
const log = content => console.log(chalk.blue(content))

module.exports = async ()=>{
    if(!fs.existsSync('./src/pages')){
        return console.log(chalk.red('目录不正确,请至初始化后的界面操作'))
    }


    const List = fs.readdirSync('./src/pages')
        .filter(itm=>itm!=='index.jsx')
        .map(itm=>{
            return {
                name:itm.replace('.jsx','').toLowerCase(),
                path:itm,
            }
        })

    compile({List},'./src/router.jsx','./temp/router.temp.js')

    /**
     * @desc 编译模板文件
     * @param data 数据
     * @param outPath 输出地址
     * @param templatePath 模板地址
     */
    function compile(data,outPath,templatePath){
        if(fs.existsSync(templatePath)){
            const result = nunjucks.render(templatePath, data);
            fs.writeFileSync(outPath,result)
            log(`${outPath} create success`)
        }
    }
}