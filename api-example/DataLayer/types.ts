export interface ApolloResponse<T> {
    data: T,
    errors?: object[]
}

export enum STATUS {
    OK = 200
}

export interface POSTRequest {
    body: {
        query: string,
        variables: {}
    },
    options: {
        headers?: {}
    }
}