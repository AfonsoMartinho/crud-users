export const Nationalities = {
	AU: 'AU',
    BR: 'BR',
    CA: 'CA',
    CH: 'CH',
    DE: 'DE',
    DK: 'DK',
    ES: 'ES',
    FI: 'FI',
    FR: 'FR',
    GB: 'GB',
    IE: 'IE',
    IN: 'IN',
    IR: 'IR',
    MX: 'MX',
    NL: 'NL',
    NO: 'NO',
    NZ: 'NZ',
    RS: 'RS',
    TR: 'TR',
    UA: 'UA',
    US: 'US'
} as const;

export type NationalitiesType = typeof Nationalities[keyof typeof Nationalities];


