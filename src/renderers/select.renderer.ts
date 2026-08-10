import { ElementType, type ElementLayout, type ISelectionElement, type VariableReferenceNode } from 'ispf-core';
import { BaseRenderer } from './base.renderer.ts';

export class SelectRenderer extends BaseRenderer {
    private _e: ISelectionElement;

    constructor(element: ElementLayout, readonly definedVariables: Map<string, VariableReferenceNode>, readonly resolveVariables?: { [key: string]: string }) {
        super(element);

        if (element.type === ElementType.SELECTION) {
            this._e = element as ISelectionElement;
        } else {
            throw new Error(`Invalid element type '${element.type}' provided to SelectRenderer`);
        }

        
    }

    render(): string {
        return `<select class="ispf-select" name="${this._e.id}" id="${this._e.id}-select">${this.generateOptions()}</select>`;
    }

    private generateOptions(): string {
        let options = '';
        for (const value of this._e.values) {
            options += `<option value="${value}" ${this.generateSelected(value)}>${value}</option>`;
        }

        return options;
    }

    private generateSelected(selectedValue: string): string {
        if (this.resolveVariables) {
            const val = this.resolveVariables[this._e.id];
            if (val && val === selectedValue) return 'selected';
            return '';
        }

        return '';
    }

}