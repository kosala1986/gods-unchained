
/** Card model */
export interface Card {
    id: number,
    name: string,
    effect: string,
    god: God,
    rarity: Rarity,
    [propName: string]: any;
}

/** options of God type */
export enum God {
    LIGHT = 'light',
    DEATH = 'death',
    NATURE = 'nature',
    WAR = 'war',
    MAGIC = 'magic',
    DECEPTION = 'deception',
    NEUTRAL = 'neutral',
}

/** options of Rarity type */
export enum Rarity {
    COMMON = 'common',
    RARE = 'rare',
    EPIC = 'epic',
    LEGENDARY = 'legendary',
    MYTHIC = 'mythic',
}

/** card cosmetic quality */
export enum Quality {
    SHADOW = 3,
    PLAIN = 5,
}