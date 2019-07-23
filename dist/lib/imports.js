"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Import {
    constructor(type, file) {
        this.type = type;
        this.file = file;
    }
}
exports.Import = Import;
/**
 * Manages the imports to be added to a generated file
 */
class Imports {
    constructor() {
        this._imports = new Map();
    }
    /**
     * Adds an import
     */
    add(type, file) {
        this._imports.set(type, file);
    }
    toArray() {
        const keys = [...this._imports.keys()];
        keys.sort();
        return keys.map(k => new Import(k, this._imports.get(k)));
    }
}
exports.Imports = Imports;
//# sourceMappingURL=imports.js.map