import { ElementType, PanelLayoutGenerator, PanelLexer, PanelParser, PanelValidator, type PanelBodyLineLayout, type VariableReferenceNode } from "ispf-core";
import * as fs from 'fs';
import { TextRenderer } from "./renderers/text.renderer.ts";
import { InputRenderer } from "./renderers/input.renderer.ts";
import { HeaderRenderer } from "./renderers/header.renderer.ts";
import { SelectRenderer } from "./renderers/select.renderer.ts";

export class HtmlRenderer {

    constructor(readonly source: string) {
        if (source === '') {
            throw new Error(`No source file provided to render panel`);
        }
    }

    /**
     * Render the HTML layout of the provided panel source.
     *
     * @param {Record<string, string>} resolveVariables List of variables with their values to be resolved in the panel source before rendering
     * @return {*}  {string}
     * @memberof HtmlRenderer
     */
    render(resolveVariables?: { [key: string]: string}): string {
        console.log(`Resolved variables:`);
        console.log(resolveVariables);
        const tokens = new PanelLexer().lex(this.source);
        const parserResult = new PanelParser(tokens).parse();
        const validatedPanel = new PanelValidator(parserResult).validate();
        console.log(validatedPanel);
        const layout = new PanelLayoutGenerator(validatedPanel).generate();
        console.log(layout);

        if (layout.lines.length < 1) {
            throw new Error(`Panel body does not contain any valid lines`);
        }

        let result = '<div class="ispf-panel">\n'; // First element in DOM
        for(const line of layout.lines) {
            result += `${this.handleLine(line, validatedPanel.body.variables, resolveVariables)}<br>\n`;
        }

        result += '</div>'; // Close div element opened first
        return result;
    }

    public static readSourceFile(sourcePath: string): string {
        if (fs.existsSync(sourcePath)) {
            return fs.readFileSync(sourcePath, { encoding: 'utf8' });
        } else {
            throw new Error(`Provided path '${sourcePath}' does not exist.`);
        }
    }

    private handleLine(line: PanelBodyLineLayout, definedVariables: Map<string, VariableReferenceNode>, resolveVariables?: { [key: string]: string}) {
        let oneline = ''
        for (const element of line.elements) {
            switch (element.type) {
                case ElementType.TEXT:
                    oneline += `${new TextRenderer(element).render()} `;
                    break;
                case ElementType.INPUT:
                    oneline += `${new InputRenderer(element, definedVariables, resolveVariables).render()} `;
                    break;
                case ElementType.SELECTION:
                    oneline += `${new SelectRenderer(element).render()} `;
                    break;
                case ElementType.HEADER:
                    oneline += `${new HeaderRenderer(element).render()} `;
                    break;
            }
        }

        return oneline;
    }
}