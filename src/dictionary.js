import { VCARD } from '@inrupt/vocab-common-rdf'

const address = {
  country: VCARD.country_name.value,
  countryName: VCARD.country_name.value,
  region: VCARD.region.value,
  locality: VCARD.locality.value,
  city: VCARD.locality.value,
  streetAddress: VCARD.street_address.value,
  street: VCARD.street_address.value,
  postalCode: VCARD.postal_code.value
}

const name = {
  firstName: 'first_name',
  fName: 'first_name',
  givenName: 'first_name',
  lastName: 'last_name',
  lName: 'last_name',
  familyName: 'last_name',
  fullName: VCARD.fn.value,
  fullname: VCARD.fn.value,
  name: VCARD.fn.value
}

export const dictionary = {
  ...address,
  ...name,
  affiliation: VCARD.organization_name.value,
  organisation: VCARD.organization_name.value,
  organization: VCARD.organization_name.value,
  organisationName: VCARD.organization_name.value,
  organizationName: VCARD.organization_name.value,
  institution: VCARD.organization_name.value,
  organizationTitle: VCARD.role.value,
  position: VCARD.role.value,
  job: VCARD.role.value,
  email: VCARD.email.value,
  emailAddress: VCARD.email.value
}
