import type { ElementLayout } from "ispf-core";

export abstract class BaseRenderer {
    constructor(readonly element: ElementLayout) {
    }

    abstract render(): string;
}