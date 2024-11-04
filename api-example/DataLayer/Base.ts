import { ApolloResponse, POSTRequest, STATUS } from "./types";
import { DataLayerContext } from "./Context";
import { HasContextFactory, REGISTERED_CONTEXT } from "../Context";
// This decorator factory allows me to collect app context together which may come in useful later on
@HasContextFactory(REGISTERED_CONTEXT.DATA_LAYER)
class Base {
   
    constructor(protected context?: DataLayerContext){}

    // Expecting POSTRequest here because we might add GETRequest later in a union and narrow down
    async sendRequest<T>(request: POSTRequest) : Promise<ApolloResponse<T>> {
        if ( !this.context) {
            throw new Error("Context missing from sendRequest");
        }        
        const context = this.context;

        return context.getToken().then(token => {
            return fetch(context.baseUrl, {
                method: "POST",
                body: JSON.stringify(request.body),
                ...request.options,
                headers: {...request.options?.headers, "content-type": "application/json", "Authorization": `Bearer ${token}`}
            }).then(response => {
                if ( response.status !== STATUS.OK){
                    throw new Error(`Received ${response.status}: ${response.statusText} when POSTING to ${context.baseUrl}`)
                }
                return response.json()
            })
        })
    }
}

export default Base