import { ElementType, type ElementLayout } from "ispf-core";

export abstract class BaseRenderer {
    constructor(readonly element: ElementLayout) {
    }

    abstract render(): string;

    protected generateRequired(): string {
        if (this.element.type === ElementType.INPUT ||  this.element.type === ElementType.SELECTION) {
            return this.element.required === true ? 'required' : ''
        }

        return '';
    }
}