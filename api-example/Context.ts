import { AddContext } from "./DataLayer/Context"

export enum REGISTERED_CONTEXT {
    "DATA_LAYER"
}

// The idea here being that we can import the context factory from the REGISTERED_CONTEXT provider
// to simplify, centralise and better test app context.
export function HasContextFactory (type: REGISTERED_CONTEXT) {
    // IRL we'd probably be doing some setup work to get secrets from automation etc.
    return AddContext("http://localhost:3000", "someuser", "somepass")
}