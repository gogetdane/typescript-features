import Base from "./Base"
import Site from "./Models/Site";
import { POSTRequest } from "./types";

interface GetSitesResponse {
    sites: {
        id: string,
        name: string,
        POSHouseNumber: number
    }[]
}

class Sites extends Base {

    private _queries = {
        getSites:  `
            query Sites {
                sites {
                    id
                    name
                    POSHouseNumber
                }
            }
        `
    }

    async getSites(){
        const request: POSTRequest = {
            body: {
                query: this._queries.getSites,
                variables: {},
            },
            options: {}
        }
        
        // Use the generic to expand on the ApolloResponse because we know we'll get a GetSitesResponse back
        return super.sendRequest<GetSitesResponse>(request).then(apolloResponse => {
            (apolloResponse.errors ?? []).map(error => console.warn(error));
            return apolloResponse.data.sites.map(site => new Site(site));
        })
    }
}

export default Sites