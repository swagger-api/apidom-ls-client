import {getLanguageService, config, LanguageServiceContext, LogLevel} from '@swagger-api/apidom-ls';
import { TextDocument } from 'vscode-languageserver-textdocument';
import fs from 'fs';
import path from "path";
import {rules} from "./rules";

const customConfig = config();
customConfig.rules = {
    openapi: {
        lint: rules(),
    }
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
    languageService.terminate();

});
