import {getLanguageService, config, LanguageServiceContext, LogLevel} from '@swagger-api/apidom-ls';
import { TextDocument } from 'vscode-languageserver-textdocument';
import fs from 'fs';
import path from "path";
import {rules} from "./rules";
import {functions} from "./functions";
import {loadFunctions} from "./utils";

const customConfig = config();
customConfig.rules = {
    openapi: {
        lint: rules(),
    }
}

customConfig.linterFunctions = {
    openapi: { ...functions(), ...loadFunctions(path.join(__dirname, '..', 'src', 'functions')) }
}

const context: LanguageServiceContext = {
    metadata: customConfig,
    performanceLogs: false,
    logLevel: LogLevel.WARN,
};
const languageService = getLanguageService(context);


const specOpenapi = fs
    .readFileSync(path.join(__dirname, '..', 'src', 'fixtures', 'custom-rules-simple.yaml'))
    .toString();


const doc = TextDocument.create('foo://bar/specOpenapi.yaml', 'apidom', 0, specOpenapi);
languageService.doValidation(doc).then((diagnostics) => {
    console.log(JSON.stringify(diagnostics, null, 2));
    for (let d of diagnostics) {
        const sev = (d.severity === 1 ? 'error' : 'warning').padEnd(7, ' ');
        const range = `${d.range.start.line}-${d.range.start.character}:${d.range.end.line}-${d.range.end.character}`.padEnd(20, ' ');
        const code = `${d.code}(${d.source})`.padEnd(20, ' ');
        console.log(range + '\t' + code + '\t' + sev + '\t' + d.message)
    }
    languageService.terminate();

});
