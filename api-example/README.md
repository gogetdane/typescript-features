# Simple API Wrapper

A simple demo wrapper around a GQL API with a couple of models.

A *decorator* is used to decorate the [Base Class](./DataLayer/Base.ts) with some application context. The approach here is to allow each of the controller classes (currently just in the api-example root) to extend a class with abstracted logic in.  For example, the Sites controller class just calls a `sendRequest` method from the parent and the parent is responsible for the `fetch` logic and auth token acquisition.

The [Authenticate](./DataLayer/Authenticate.ts) class implements a *singleton* because in this example there's no storage, so it's an effective way of sharing a token between controllers.

The controllers just need to maintain their own api response data type and the *Generic* `ApolloResponse` type will provide type on the responses.

The *context* is something that's intended to be expanded on and is a way to share common setup work throughout the application.
