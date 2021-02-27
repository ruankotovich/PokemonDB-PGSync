export interface PKMJsonSchema{
    pokemon: Array<{
        id: number;
        name: string;
        height: number;
        weight: number;
        xp: number;
        types: Array<string>;
        image: string;
    }>;
}
