import { ElementType, type ElementLayout, type InputElement, type VariableReferenceNode } from "ispf-core";
import { BaseRenderer } from "./base.renderer.ts";

export class InputRenderer extends BaseRenderer {
    private variables: Map<string, string>
    private _e: InputElement;
    
    constructor(element: ElementLayout, definedVariables: Map<string, VariableReferenceNode>, resolveVariables?: { [key: string]: string }) {
        super(element);

        if (element.type === ElementType.INPUT) {
            this._e = element as InputElement;
        } else {
            throw new Error(`Invalid element type '${element.type}' provided to InputRenderer`);
        }

        this.variables = new Map<string, string>();

        if (resolveVariables) {
            const keys = Object.keys(resolveVariables);
            for (const key of keys) {
                const match = `&${key.toUpperCase()}`;
                if (definedVariables.has(match)) {
                    this.variables.set(key, resolveVariables[key]!);
                }
            }
        }
    }

    render(): string {
        return `<input class="ispf-input" maxLength="${this._e.length}" size="${this._e.length}" id="${this._e.id}" value="${this.variables.get(this._e.id) ?? ''}" />`;
    }
}