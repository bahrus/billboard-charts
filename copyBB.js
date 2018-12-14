//@ts-check
const fs = require('fs');
const bb_files = [
    'billboard.js', 'billboard.js.map', 'billboard.min.js', 'billboard.min.js.map', 
    'billboard.css', 'billboard.css.map', 'billboard.min.css', 'billboard.min.css.map',
    
]
const d3_files = [
    'd3.js', 'd3.min.js'
]
bb_files.forEach(file =>{
    fs.copyFileSync('node_modules/billboard.js/dist/' + file, file);
})
d3_files.forEach(file =>{
    fs.copyFileSync('node_modules/d3/dist/' + file, file);
})
