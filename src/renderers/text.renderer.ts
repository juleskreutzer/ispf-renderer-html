import { ElementType, type ElementLayout, type ITextElement } from "ispf-core";
import { BaseRenderer } from "./base.renderer.ts";

export class TextRenderer extends BaseRenderer {
    private _e: ITextElement;
    constructor(element: ElementLayout) {
        super(element);

        if (element.type === ElementType.TEXT) {
            this._e = element as ITextElement;
        } else {
            throw new Error(`Invalid element type '${element.type}' provided to TextRenderer`);
        }
    }

    render(): string {
        return `<span class="${this.generateClasses()}">${this._e.value}</span>`;
    }

    private generateClasses(): string {
        return `ispf-text${this.generateCapsClass()}${this.generateColorClass()}${this.generateIntensifiedClass()}${this.generateJustifyClass()}`;
    }

    private generateCapsClass(): string {
        return this._e.caps ? ' ispf-uppercase' : '';
    }

    private generateColorClass(): string {
        if (this._e.color) {
            switch (this._e.color.toLowerCase()) {
                case 'white':
                    return ' ispf-text-info';
                case 'red':
                    return ' ispf-text-danger';
                case 'blue':
                    return ' ispf-text-primary';
                case 'green':
                    return ' ispf-text-success';
                case 'pink':
                    return ' ispf-text-secondary';
                case 'yellow':
                    return ' ispf-text-warning';
                case 'turquoise':
                    return ' ispf-text-alert';
                default:
                    return ' ispf-text-info';
            }
        }
        return ' ispf-text-info';
    }

    private generateIntensifiedClass(): string {
        return this._e.intensify ? ' ispf-intensified' : '';
    }

    private generateJustifyClass(): string {
        if (this._e.justify) {
            switch (this._e.justify.toLowerCase()) {
                case 'left':
                    return ' ispf-justify-left';
                case 'right': 
                    return ' ispf-justify-right';
                default:
                    return '';
            }
        }
        return '';
    }
}