import { ElementType, type ElementLayout } from "ispf-core";
import { BaseRenderer } from "./base.renderer.ts";

export class TextRenderer extends BaseRenderer {
    constructor(element: ElementLayout) {
        super(element);
    }

    render(): string {
        if (this.element.type === ElementType.TEXT) {
            return `<span>${this.element.value}</span>`;
        } else {
            throw new Error(`Unsupported element type '${this.element.type}`);
        }
    }
}