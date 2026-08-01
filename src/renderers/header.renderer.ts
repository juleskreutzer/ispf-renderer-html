import { ElementType, type ElementLayout } from "ispf-core";
import { BaseRenderer } from "./base.renderer.ts";

export class HeaderRenderer extends BaseRenderer {
    constructor(element: ElementLayout) {
        super(element);
    }

    render(): string {
        if (this.element.type === ElementType.HEADER) {
            return `<h1>${this.element.value}</h1>`;
        } else {
            throw new Error(`Unsupported element type '${this.element.type}'`);
        }
    }
}