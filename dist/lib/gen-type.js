"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gen_utils_1 = require("./gen-utils");
const imports_1 = require("./imports");
/**
 * Base definitions of a generated type
 */
class GenType {
    constructor(name, 
    /** Generation options */
    options) {
        this.name = name;
        this.options = options;
        this._imports = new imports_1.Imports();
        this._additionalDependencies = new Set();
    }
    addImport(type) {
        type = gen_utils_1.modelClass(type, this.options);
        if (type && this.typeName !== type) {
            // Don't add an import to this own file
            this._imports.add(type, `${this.pathToModels()}${gen_utils_1.fileName(type)}`);
        }
    }
    updateImports() {
        this.imports = this._imports.toArray();
        this.additionalDependencies = [...this._additionalDependencies];
    }
    collectImports(schema, additional = false, processOneOf = false) {
        if (!schema) {
            return;
        }
        else if (schema.$ref) {
            const dep = gen_utils_1.simpleName(schema.$ref);
            if (additional) {
                this._additionalDependencies.add(gen_utils_1.modelClass(dep, this.options));
            }
            else {
                this.addImport(dep);
            }
        }
        else {
            schema = schema;
            (schema.allOf || []).forEach(i => this.collectImports(i, additional));
            (schema.anyOf || []).forEach(i => this.collectImports(i, additional));
            if (processOneOf) {
                (schema.oneOf || []).forEach(i => this.collectImports(i, additional));
            }
            if (schema.items) {
                this.collectImports(schema.items, additional);
            }
            if (schema.properties) {
                const properties = schema.properties;
                Object.keys(properties).forEach(p => {
                    const prop = properties[p];
                    this.collectImports(prop, additional, true);
                });
            }
            if (typeof schema.additionalProperties === 'object') {
                this.collectImports(schema.additionalProperties, additional);
            }
        }
    }
}
exports.GenType = GenType;
//# sourceMappingURL=gen-type.js.map