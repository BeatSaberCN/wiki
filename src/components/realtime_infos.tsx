import build_info from "@site/src/server/realtime_infos.ts"

export function BuildTime(){
    return <>{build_info.build_time}</>
}

export function QuestLatestVersion(){
    return <>{build_info.quest_ver}</>
}
export function BSManagerRecommand(){
    return <>{build_info.bsm_recomm_ver}</>
}