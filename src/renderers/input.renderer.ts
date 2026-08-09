import { ElementType, type ElementLayout, type IInputElement, type VariableReferenceNode } from "ispf-core";
import { BaseRenderer } from "./base.renderer.ts";
import { detectPatternType } from "../util/index.ts";

export class InputRenderer extends BaseRenderer {
    private variables: Map<string, string>
    private _e: IInputElement;
    
    constructor(element: ElementLayout, definedVariables: Map<string, VariableReferenceNode>, resolveVariables?: { [key: string]: string }) {
        super(element);

        if (element.type === ElementType.INPUT) {
            this._e = element as IInputElement;
        } else {
            throw new Error(`Invalid element type '${element.type}' provided to InputRenderer`);
        }

        this.variables = new Map<string, string>();

        if (resolveVariables) {
            const keys = Object.keys(resolveVariables);
            for (const key of keys) {
                const match = `${key.toUpperCase()}`;
                if (definedVariables.has(match)) {
                    // Remove & from variable name
                    this.variables.set(key.replace('&', ''), resolveVariables[key]!);
                }
            }
        }
    }

    render(): string {
        return `<input class="ispf-input" ${this.generateType()} maxLength="${this._e.length}" size="${this._e.length}" id="${this._e.id}" value="${this.variables.get(this._e.id) ?? ''}" ${this.generateRequired()} ${this.generatePattern()} />`;
    }

    private generatePattern(): string {
        if (this._e.pattern === '') return '';
        return `pattern="${this._e.pattern}"`;
    }

    private generateType(): string {
        const patternMatch = detectPatternType(this._e.pattern);
        
        switch(this._e.valueType) {
            case 'NUM':
                return patternMatch.inputType === 'text' ? `type="number"` : `type="${patternMatch.inputType}"`;
            default: 
                return `type="${patternMatch.inputType}"`;
        }
    }
}