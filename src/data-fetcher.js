import { getSolidDataset, getStringNoLocale, getThing, getUrl } from '@inrupt/solid-client'
import { VCARD } from '@inrupt/vocab-common-rdf'

export default class DataFetcher {
  static webId (url) {
    const webId = url.split('#')

    // If it could not split on '#', it can be concluded
    // that the WebIdProfileUrl was given
    // The default/common identifier is #me
    if (webId.length === 1) {
      return { webIdUrl: `${webId[0]}#me`, webIdProfileUrl: webId[0] }
    }
    return { webIdUrl: `${webId[0]}#${webId[1]}`, webIdProfileUrl: webId[0] }
  }

  static async fetchWebIdProfile (cardUrl) {
    const dataset = await getSolidDataset(this.webId(cardUrl).webIdProfileUrl)
    const profile = getThing(dataset, this.webId(cardUrl).webIdUrl)
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
