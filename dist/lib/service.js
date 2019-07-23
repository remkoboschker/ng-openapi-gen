"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gen_type_1 = require("./gen-type");
const gen_utils_1 = require("./gen-utils");
/**
 * Context to generate a service
 */
class Service extends gen_type_1.GenType {
    constructor(tag, operations, options) {
        super(tag.name, options);
        this.operations = operations;
        this.typeName = gen_utils_1.serviceClass(gen_utils_1.typeName(tag.name), options);
        this.fileName = gen_utils_1.fileName(this.typeName);
        // Angular standards demand that services have a period separating them
        if (this.fileName.endsWith('-service')) {
            this.fileName = this.fileName.substring(0, this.fileName.length - '-service'.length) + '.service';
        }
        this.tsComments = gen_utils_1.tsComments(tag.description || '', 0);
        // Collect the imports
        for (const operation of operations) {
            for (const parameter of operation.parameters) {
                this.collectImports(parameter.spec.schema);
            }
            for (const securityGroup of operation.security) {
                securityGroup.forEach(security => this.collectImports(security.spec.schema));
            }
            if (operation.requestBody) {
                for (const content of operation.requestBody.content) {
                    this.collectImports(content.spec.schema);
                }
            }
            for (const response of operation.allResponses) {
                const additional = response === operation.successResponse ? undefined : true;
                for (const content of response.content) {
                    this.collectImports(content.spec.schema, additional);
                }
            }
        }
        this.updateImports();
    }
    pathToModels() {
        return '../models/';
    }
}
exports.Service = Service;
//# sourceMappingURL=service.js.map