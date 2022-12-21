export const Nationalities = {
	AU: 'au',
    BR: 'br',
    CA: 'ca',
    CH: 'ch',
    DE: 'de',
    DK: 'dk',
    ES: 'es',
    FI: 'fi',
    FR: 'fr',
    GB: 'gb', 
    IE: 'ie',
    IN: 'in',
    IR: 'ir',
    MX: 'mx',
    NL: 'nl',
    NO: 'no',
    NZ: 'nz', 
    RS: 'rs',
    TR: 'tr',
    UA: 'ua',
    US: 'us'
} as const;

export type NationalitiesType = typeof Nationalities[keyof typeof Nationalities];


