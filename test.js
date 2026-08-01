import { HtmlRenderer } from './dist/index.mjs';

const file = 'C:\\Users\\jules\\Documents\\GIT\\ispf-core\\.company_test_files\\panel_definitions\\PM.txt'
const source = HtmlRenderer.readSourceFile(file);
const renderer = new HtmlRenderer(source);
console.log(renderer.render());