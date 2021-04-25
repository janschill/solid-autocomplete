import { getSolidDataset, getStringNoLocale, getThing, getUrl, getUrlAll } from '@inrupt/solid-client'
import { VCARD } from '@inrupt/vocab-common-rdf'
import { stripMailtoTag } from './util/email-address'

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
    const emailAddress = this.handleEmail(dataset, profile)
    const address = this.handleAddress(dataset, profile)

    return {
      ...data,
      ...address,
      ...emailAddress
    }
  }

  static flattenThing (dataset, thingUrl, objectGetter) {
    const thing = getThing(dataset, thingUrl)
    const flattened = {}

    for (const quad of thing._quads) {
      // a quad is stored in a Map with (key, value)
      const predicate = quad[1].predicate.id
      const object = objectGetter(thing, predicate)
      flattened[predicate] = object
    }

    return flattened
  }

  static handleAddress (dataset, profile) {
    // country-name, locality, postal-code, region, street address
    // those objects are all strings, therefore it can be naively parsed
    const addresses = []
    const hasAddressUrls = getUrlAll(profile, VCARD.hasAddress)

    for (const hasAddressUrl of hasAddressUrls) {
      addresses.push(this.flattenThing(dataset, hasAddressUrl, getStringNoLocale))
    }

    // we are only interested in the first address
    return addresses[0] || {}
  }

  static handleEmail (dataset, profile) {
    const emailAddresses = []
    const hasEmailAddressUrls = getUrlAll(profile, VCARD.hasEmail)
    const email = {}

    for (const hasEmailAddressUrl of hasEmailAddressUrls) {
      const emailThing = getThing(dataset, hasEmailAddressUrl)
      const emailValue = getUrl(emailThing, VCARD.value)

      emailAddresses.push(stripMailtoTag(emailValue))
    }

    if (emailAddresses[0]) {
      email[VCARD.email.value] = emailAddresses[0]
    }

    return email
  }
}
