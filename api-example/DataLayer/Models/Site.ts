interface SiteModel {
    id: string,
    name: string,
    POSHouseNumber: number
    // There are more, but for simplicity we'll leave it here
}

class Site {
    constructor(private site: SiteModel){}

    // We could treat the response here if required
    getProp(prop: keyof SiteModel) {
        return this.site[prop]
    }
}

export default Site;