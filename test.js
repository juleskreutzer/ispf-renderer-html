import { HtmlRenderer } from './dist/index.mjs';

const file = 'C:\\Users\\Jules.Kreutzer\\GIT\\ispf-core\\test\\assets\\PM.txt'
const source = HtmlRenderer.readSourceFile(file);
const renderer = new HtmlRenderer(source);
let variables = {
    ["D"] : 'Y',
    ["e"] : '7'
};
console.log(renderer.render(variables));