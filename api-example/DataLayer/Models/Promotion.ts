interface PromotionModel {
    id: string,
    name: string
}

class Promotion {
    constructor(private promotion: PromotionModel){}

    // We could treat the response here if required
    getProp(prop: keyof PromotionModel) {
        return this.promotion[prop]
    }
}

export default Promotion;