export interface EmailValidationResponse {
    // email: string
    // autocorrect: string
    // deliverability: string
    // quality_score: string
    // is_valid_format: {
    //     value: boolean
    //     text: string
    // }
    // is_free_email: {
    //     value: boolean
    //     text: string
    // }
    // is_disposable_email: {
    //     value: boolean
    //     text: string
    // }
    // is_role_email: {
    //     value: boolean
    //     text: string
    // }
    // is_catchall_email: {
    //     value: boolean
    //     text: string
    // }
    // is_mx_found: {
    //     value: boolean
    //     text: string
    // }
    // is_smtp_valid: {
    //     value: boolean
    //     text: string
    // }
    
    inputData: string
    isValid: boolean
    isSyntaxValid: boolean
    isMailServerDefined: boolean
    isKnownSpammerDomain: boolean
    isDisposable: boolean
}