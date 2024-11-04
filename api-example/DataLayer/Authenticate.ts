import { ApolloResponse, STATUS } from "./types";

interface AuthenticateResponse {
    authenticate: {
        id: string
    }
}

class Authenticate {
    private static instance?: Authenticate;

    private _expiresAt?: number;
    private _token?: string;

    private _query = `
        mutation Authenticate($username: String!, $password: String!) {
            authenticate(username: $username, password: $password) {
                id
            }
        }
    `;

    private constructor(private _authUrl: string, private _username: string, private _password:string){}

    // Use a singleton here because we're storing the token on the instance given there's no cache/storage
    // in this demo
    static getInstance(authUrl: string, username: string, password: string){
        if ( !Authenticate.instance ){
            Authenticate.instance = new Authenticate(authUrl, username, password)
        }
        return Authenticate.instance;
    }

    async getToken() : Promise<string>{
        if ( this._token && this._expiresAt && this._expiresAt > (new Date()).valueOf() ){
            return Promise.resolve(this._token);
        }

        const authenticate: RequestInit = {
            body: JSON.stringify({
                query: this._query,
                variables: {
                    password: this._password,
                    username: this._username,
                }
            }),
            headers: {
                'content-type': "application/json"
            },
            method: "POST"
        }

        return fetch(this._authUrl, authenticate).then(authResponse => {
            if ( authResponse.status !== STATUS.OK){
                throw new Error(`Received ${authResponse.status}: ${authResponse.statusText} when fetching an auth token.`)
            }
            return <Promise<ApolloResponse<AuthenticateResponse>>>authResponse.json();
        }).then(json => {
            this._token = json.data.authenticate.id
            this._expiresAt = (new Date()).valueOf() + 10000
            return this._token;
        })
    }
}

export default Authenticate