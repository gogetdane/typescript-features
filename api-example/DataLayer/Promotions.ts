import Base from "./Base"
import Promotion from "./Models/Promotion";
import { POSTRequest } from "./types";

interface GetPromotionsResponse {
    promotions: {
        id: string,
        name: string,
    }[]
}

class Promotions extends Base {

    private _queries = {
        getPromotions:  `
            query Promotions {
                promotions {
                    id
                    name
                }
            }
        `
    }

    async getPromotions(){
        const request: POSTRequest = {
            body: {
                query: this._queries.getPromotions,
                variables: {},
            },
            options: {}
        }
        
        return super.sendRequest<GetPromotionsResponse>(request).then(apolloResponse => {
            (apolloResponse.errors ?? []).map(error => console.warn(error));
            return apolloResponse.data.promotions.map(promotion => new Promotion(promotion));
        })
    }
}

export default Promotions