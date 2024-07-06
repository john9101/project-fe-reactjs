export interface PhoneValidationResponse {
    // phone: string
    // valid: boolean
    // format: {
    //     international: string
    //     local: string
    // }
    // country: {
    //     code: string
    //     name: string
    //     prefix: string
    // }
    // location: string
    // type: string
    // carrier: string

    isValid: boolean
    e164Format: string
    internationalFormat: string
    nationalFormat: string
    location: string
    lineType: string
    country: {
        isoAlpha2: string
        isoAlpha3: string
        m49Code: number
        name: string
        isoName: string
        isoNameFull: string
        isoAdminLanguages: [
            {
                isoAlpha3: string
                isoAlpha2: string
                isoName: string
                nativeName: string
            }
        ]
        unRegion: string
        currency: {
            numericCode: number
            code: string
            name: string
            minorUnits: number
        }
        wbRegion: {
            id: string
            iso2Code: string
            value: string
        }
        wbIncomeLevel: {
            id: string
            iso2Code: string
            value: string
        }
        callingCode: string
        countryFlagEmoji: string
        wikidataId: string
        geonameId: number
        isIndependent: boolean
    }
}