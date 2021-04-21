export default class Mapper {
  constructor (params) {
    this.initDictionary()
  }

  initDictionary () {
    this.dictionary = {
      country: 'countryName',
      countryName: 'countryName',
      affiliation: 'organizationName',
      organisation: 'organizationName',
      organization: 'organizationName',
      organisationName: 'organizationName',
      organizationName: 'organizationName',
      institution: 'organizationName',
      organizationTitle: 'role',
      position: 'role',
      job: 'role',
      fullName: 'name',
      fullname: 'name',
      name: 'name'
    }
  }
}
