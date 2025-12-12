export interface ModData{
    platform: 'pc' | 'quest',
    modPage?:string,
    name:string,
    name_zh: string,
    game_ver: string[],
    desc_en: string|undefined,
    desc_zh: string|undefined,
    extern_links: string[]
    iscore: boolean,
    authors: string[],
    editpath: string,
    beatmods_id?: number,
    game_to_mod_version?:Record<string/*game ver*/, string/*latest mod ver*/>,
}
