import { getSolidDataset, getStringNoLocale, getThing } from '@inrupt/solid-client'
import { VCARD } from '@inrupt/vocab-common-rdf'

export default class DataFetcher {
  static async fetchWebIdProfile (cardUrl) {
    const myDataset = await getSolidDataset(cardUrl)
    const profile = getThing(myDataset, `${cardUrl}#me`)
    return {
      name: getStringNoLocale(profile, VCARD.fn),
      role: getStringNoLocale(profile, VCARD.role),
      bday: getStringNoLocale(profile, VCARD.bday)
      // organizationName: getStringNoLocale(profile, VCARD.organizationName)
    }
  }
}
