import { getSolidDataset, getStringNoLocale, getThing } from '@inrupt/solid-client'
import { VCARD } from '@inrupt/vocab-common-rdf'

export default class DataFetcher {
  static async fetchWebIdProfile (cardUrl) {
    const myDataset = await getSolidDataset(cardUrl)
    const profile = getThing(myDataset, `${cardUrl}#me`)

    return {
      fn: getStringNoLocale(profile, VCARD.fn),
      role: getStringNoLocale(profile, VCARD.role),
      // bday: getStringNoLocale(profile, VCARD.bday),
      // email: getStringNoLocale(profile, VCARD.email),
      // region: getStringNoLocale(profile, VCARD.region),
      // country_name: getStringNoLocale(profile, VCARD.country_name),
      // postal_code: getStringNoLocale(profile, VCARD.postal_code),
      // street_address: getStringNoLocale(profile, VCARD.street_address),
      tel: getStringNoLocale(profile, VCARD.tel),
      organization_name: getStringNoLocale(profile, VCARD.organization_name)
    }
  }
}
