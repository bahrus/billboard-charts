//@ts-check
const fs = require('fs')
function processFile(filePath, newLines){
    const contents = fs.readFileSync(filePath, 'utf8');
    const lines = contents.split('\n');
    lines.forEach(line =>{
        const tl = line.trimLeft();
        if(tl.startsWith('import ')) return;
        if(tl.startsWith('export ')){
            newLines.push(line.replace('export ', ''));
        }else{
            newLines.push(line);
        }
        
    })
}
const newLines = [];
processFile('node_modules/templ-mount/templ-mount.js', newLines);
processFile('node_modules/bra-ket/bra-ket.js', newLines);
processFile('text-input/xtal-text-input-md.js', newLines);
processFile('checkbox-input/xtal-checkbox-input-md.js', newLines);
processFile('radio-group/xtal-radio-group-md.js', newLines);
processFile('text-area/xtal-text-area-md.js', newLines);
let newContent = `
//@ts-check
(function () {
${newLines.join('\n')}
})();  
    `;
fs.writeFileSync("xtal-material.js", newContent, 'utf8');



