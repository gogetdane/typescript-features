import Promotions from "./DataLayer/Promotions";
import Sites from "./DataLayer/Sites";

const s = new Sites();
s.getSites().then(sites => {
    sites.forEach(site => {
        console.log("Name: "+site.getProp("name"), "House Number: " + site.getProp("POSHouseNumber"), "ID:" + site.getProp("id"))
    })
    const p = new Promotions();
    return p.getPromotions().then(promotions => {
        promotions.forEach(promotion => console.log("Promotion name:" + promotion.getProp("name")))
    })
})