import { ElementType, PanelLayoutGenerator, PanelLexer, PanelParser, PanelValidator, type PanelBodyLineLayout } from "ispf-core";
import * as fs from 'fs';
import { TextRenderer } from "./renderers/text.renderer.ts";
import { InputRenderer } from "./renderers/input.renderer.ts";
import { HeaderRenderer } from "./renderers/header.renderer.ts";

export class HtmlRenderer {

    constructor(readonly source: string) {
        if (source === '') {
            throw new Error(`No source file provided to render panel`);
        }
    }

    render(): string {
        const tokens = new PanelLexer().lex(this.source);
        const parserResult = new PanelParser(tokens).parse();
        const validatedPanel = new PanelValidator(parserResult).validate();
        const layout = new PanelLayoutGenerator(validatedPanel).generate();

        if (layout.lines.length < 1) {
            throw new Error(`Panel body does not contain any valid lines`);
        }

        let result = '';
        for(const line of layout.lines) {
            result += `${this.handleLine(line)}<br>\n`;
        }

        return result;
    }

    public static readSourceFile(sourcePath: string) {
        if (fs.existsSync(sourcePath)) {
            return fs.readFileSync(sourcePath, { encoding: 'utf8' });
        } else {
            throw new Error(`Provided path '${sourcePath}' does not exist.`);
        }
    }

    private handleLine(line: PanelBodyLineLayout) {
        let oneline = ''
        for (const element of line.elements) {
            switch (element.type) {
                case ElementType.TEXT:
                    oneline += `${new TextRenderer(element).render()} `;
                    break;
                case ElementType.INPUT:
                    oneline += `${new InputRenderer(element).render()} `;
                    break;
                case ElementType.HEADER:
                    oneline += `${new HeaderRenderer(element).render()} `;
                    break;
            }
        }

        return oneline;
    }
}