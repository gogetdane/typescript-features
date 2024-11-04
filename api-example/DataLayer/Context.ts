import Authenticate from "./Authenticate";

export interface DataLayerContext  {
    baseUrl: string,
    getToken: () => Promise<string>
}

export function AddContext(authUrl: string, username: string, password: string) {
    return function <T extends {new(...args: any[]): {}}>(originalConstructor: T){
        return class extends originalConstructor {   
            constructor(...args: any[]){
                const context: DataLayerContext = {
                    baseUrl: "http://localhost:3000/",
                    getToken(){
                        const authInstance = Authenticate.getInstance(authUrl, username, password);
                        return authInstance.getToken()
                    }
                };
                args.push(context)
                super(...args)
            }
        }
    }
}