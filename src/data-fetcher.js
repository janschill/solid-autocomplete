import { getSolidDataset, getStringNoLocale, getThing, getUrl } from '@inrupt/solid-client'
import { VCARD } from '@inrupt/vocab-common-rdf'

export default class DataFetcher {
  static async fetchWebIdProfile (cardUrl) {
    const dataset = await getSolidDataset(cardUrl)
    const profile = getThing(dataset, `${cardUrl}#me`)
    const address = (getThing(dataset, getUrl(profile, VCARD.hasAddress)))
    // console.log(address)
    this.flattenThing(dataset, getUrl(profile, VCARD.hasAddress))
    // const region = getStringNoLocale(address, VCARD.region)
    const data = {}
    data[VCARD.fn.value] = getStringNoLocale(profile, VCARD.fn)
    data[VCARD.role.value] = getStringNoLocale(profile, VCARD.role)
    data[VCARD.tel.value] = getStringNoLocale(profile, VCARD.tel)
    data[VCARD.organization_name.value] = getStringNoLocale(profile, VCARD.organization_name)
    console.log(data)
    return data
    // return {
    // bday: getStringNoLocale(profile, VCARD.bday),
    // email: getStringNoLocale(profile, VCARD.email),
    // region: getStringNoLocale(profile, VCARD.region),
    // country_name: getStringNoLocale(profile, VCARD.country_name),
    // postal_code: getStringNoLocale(profile, VCARD.postal_code),
    // street_address: getStringNoLocale(profile, VCARD.street_address),
    // }
  }

  static flattenThing (dataset, thingUrl) {
    const thing = getThing(dataset, thingUrl)
    const a = {}

    for (const quad of thing._quads) {
      const predicate = quad[1].predicate.id
      const object = quad[1].object.id
      a[predicate] = object
    }

    // console.log(a)
  }
}
