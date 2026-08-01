import { ElementType, type ElementLayout } from "ispf-core";
import { BaseRenderer } from "./base.renderer.ts";

export class InputRenderer extends BaseRenderer {
    constructor(element: ElementLayout) {
        super(element);
    }

    render(): string {
        if (this.element.type === ElementType.INPUT) {
            return `<input maxLength="${this.element.length}" id="${this.element.id}" value="${this.element.value}" />`;
        } else {
            throw new Error(`Unsupported element type '${this.element.type}'`);
        }
    }
}