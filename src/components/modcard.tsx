import { useActiveDocContext, useDocById } from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { CSSProperties } from 'react';

interface ModData{
    platform: 'pc' | 'quest',
    modPage?:string,
    name:string,
    game_ver: string[],
    desc_zh: string|null,
    extern_links: string[]
}

function getPageName(){
        let pageName = undefined
    {
        let pgtmp = useActiveDocContext(undefined)?.activeDoc?.id
        if (pgtmp) {
            let tmp = pgtmp.split("/")
            if (tmp.length > 0) {
                pageName = tmp[tmp.length - 1]
            }
        }
    }
    return pageName
}

function renderMod(modData: ModData){
    let pageName = getPageName()

    let foots = []

    let isSelfPage = pageName != undefined && modData.modPage != undefined && pageName == modData.modPage
    let isNotSelfPage = pageName != undefined && modData.modPage != undefined && modData.modPage != pageName

    if(isNotSelfPage){
        foots.push(<div className="card__footer">
            <a href={useBaseUrl('docs/mod-info/'+modData.modPage)} className="button button--secondary button--block">转到介绍</a>
        </div>)
    }

    const cardStyle:CSSProperties = {
        margin: "16px"
    }

    if(isSelfPage){
        cardStyle.backgroundColor = 'var(--ifm-color-warning-lightest)'
        cardStyle.color = 'black'
    }

    return <div style={{
        width: "360px",
    }}>
        <div className={isSelfPage ? "card shadow--tl" : "card shadow--lw"} style={cardStyle}>
            <div className="card__header">
                <h3 style={{
                    textAlign: "center"
                }}>{modData.name}<sup style={{
                    transform: "scale(0.7)"
                }} className={modData.platform == 'pc' ? 'badge badge--success' : 'badge badge--info'}>{modData.platform == 'pc' ? 'PC' : 'Quest'}</sup></h3>
            </div>
            <div className="card__body">
                <p>
                    {modData.desc_zh ?? "暂无中文简介。"}
                </p>
            </div>
            {foots}
        </div>
    </div>

}

function 模组大卡({ 平台, 名称, platform, name }) {
    let p = platform || 平台;
    let n = name || 名称 || getPageName();

    return renderMod({
        name: n,
        platform: platform,
        game_ver: ['1.40.8','1.40.7'],
        desc_zh: "中文介绍TODO",
        extern_links: [],
        modPage: n
    })

}

function 模组({ 平台, 名称, platform, name }) {
    let p = platform || 平台;
    let n = name || 名称;

    if (n == undefined) {
        n = useActiveDocContext(undefined)?.activeDoc?.id
        if (n) {
            let tmp = n.split("/")
            if (tmp.length > 0) {
                n = tmp[tmp.length - 1]
            }
        }
    }

    return <div style={
        {
            border: "1px solid black",
            background: "gray",
            margin: "4px",
            padding: "4px",
            width: "fit-content"
        }
    }>
        模组信息占位（{p}，{n}）
    </div>
}


export default {
    模组大卡,
    模组
}