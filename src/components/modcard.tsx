import { useActiveDocContext, useDocById } from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { CSSProperties } from 'react';

import { ModData } from '../mod_data';

import modDataGenerated from "@site/src/server/mod_data_generated"
import Link from '@docusaurus/Link';
import urls from '@site/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GithubSvg from "@site/src/icons/github-mark.svg"
import BeatModsSvg from "@site/src/icons/Beatmods.svg"

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

    if(pageName != undefined && modData.name.toLowerCase() == pageName.toLowerCase()){
        isSelfPage = true
    }

    let extern_id = 1

    modData.extern_links.forEach((v,index)=>{
        let btnName:any = "外链"
        if(v.indexOf("github.com") > 0){
            btnName = <GithubSvg className='dark-contrast' style={{
                transform:"scale(0.15)",
                margin:"-42px"
            }} />
        }else if(v.indexOf("patreon.com") > 0)
            btnName = "捐助"
        else
            btnName = "外链" + (extern_id++)
        if (btnName == "外链1"){
            btnName = "外链"
        }
        foots.push(<a key={"extern"+index} target='_blank' style={{width:"fit-content", padding:'8px', display:"inline-block"}} href={v} className="button button--sm button--active button--link">
            {btnName}
        </a>)

    })

    if(modData.beatmods_id != undefined && modData.beatmods_id != null){
        foots.push(<a key="beatmods" target='_blank' style={{width:"fit-content", padding:'8px', display:"inline-block"}} href={'https://beatmods.com/mods/' + modData.beatmods_id} className="button button--sm button--active button--link">
            <BeatModsSvg style={{
                transform:"scale(0.8) translateY(-5px)",
                margin:"-10px"
            }}/>
        </a>)
    }
    
    if(isNotSelfPage){
        foots.push(
            <a key="wikipage" target='_blank' style={{width:"fit-content", padding:'8px', display:"inline-block"}} href={useBaseUrl('docs/mod-info/'+modData.modPage)} className="button button--sm button--active button--link">维基详情</a>
        )
    }

    foots.push(<a key="edit" target='_blank' href={urls.moddb_edit_path + modData.editpath } style={{padding:"8px"}} className="button button--sm button--active button--link">编辑</a>)
    const cardStyle:CSSProperties = {
        margin: "16px"
    }

    if(isSelfPage){
        cardStyle.backgroundColor = 'var(--mod-card-color-bg)'
    }

    return <div key={modData.name + modData.platform} style={{
        width: "360px",
        display: 'inline-block'
    }}>
        <div className={isSelfPage ? "card shadow--tl" : "card shadow--lw"} style={cardStyle}>
            <div className="card__header">
                <h3 style={{
                    textAlign: "center"
                }}>{modData.name + (modData.name_zh && modData.name_zh != null ? ("/" + modData.name_zh) : "")}<sup style={{
                    transform: "scale(0.7)"
                }} className={modData.platform == 'pc' ? 'badge badge--success' : 'badge badge--info'}>{modData.platform == 'pc' ? 'PC' : 'Quest'}</sup></h3>
            </div>
            <div className="card__body">
                <p style={{textAlign:"right"}}>
                    作者：{modData.authors}
                </p>
                <p dangerouslySetInnerHTML={{__html: modData.desc_zh ?? modData.desc_en}}>
                </p>
            </div>
            <div className="card__footer" style={{textAlign:"right"}}>
            {foots}
            </div>
        </div>
    </div>

}

function 模组大卡({ 平台, 名称, platform, name }) {
    let p = platform || 平台;
    let n = name || 名称 || getPageName();

    if(p != undefined)
        p = p.toLowerCase()

    let ret = []

    if(n == undefined){
        return <p>模组名称不能为空</p>
    }



    if(p == 'pc' || p == undefined){
        let data = modDataGenerated.pc[n.toLowerCase()]
        if(data != undefined){
            ret.push(renderMod(data))
        }
    }

    if(p == 'quest' || p == undefined){
        let data = modDataGenerated.quest[n.toLowerCase()]
        if(data != undefined){
            ret.push(renderMod(data))
        }
    }

    if(ret.length == 0){
        return <p>没有找到名为{n}的模组</p>
    }

    return <>{ret}</>

}

function renderSmallMod(modData:ModData){
    if(modData.modPage){
        return <Link href={'/docs/mod-info/' + modData.modPage}>{modData.name + (modData.name_zh && modData.name_zh != null ? ("(" + modData.name_zh + ")") : "")}</Link>
    }else{
        return <span>{modData.name + (modData.name_zh && modData.name_zh != null ? ("(" + modData.name_zh + ")") : "")}</span>
    }
}

function 模组({ 平台, 名称, platform, name }) {
    let p = platform || 平台;
    let n = name || 名称 || getPageName();
    if(p != undefined)
        p = p.toLowerCase()

    let ret = []

    if(n == undefined){
        return <p>模组名称不能为空</p>
    }

    if(p == 'pc' || p == undefined){
        let data = modDataGenerated.pc[n.toLowerCase()]
        if(data != undefined){
            ret.push(renderSmallMod(data))
        }
    }

    if(p == 'quest' || p == undefined){
        let data = modDataGenerated.quest[n.toLowerCase()]
        if(data != undefined){
            ret.push(renderSmallMod(data))
        }
    }

    if(ret.length == 0){
        return <span>{n}(无维基数据)</span>
    }
    return <>{ret}</>

}

function versionCompare(a, b) {
  if (a == b) return 0;
  let aarr = a.split("-")[0].split(".");
  let barr = b.split("-")[0].split(".");
  for (let i = 0; i < Math.max(aarr.length, barr.length); i++) {
    if (aarr.length <= i) return 1; //b large
    if (barr.length <= i) return -1; //a large
    if (aarr[i] != barr[i]) {
      return +aarr[i] > +barr[i] ? -1 : 1;
    }
  }
  return a > b ? -1 : 1;
}

function 模组支持版本({名称,name, platform, 平台}){
    let mod_name = 名称 || name
    let plat = platform||平台||"quest"


    let data:ModData = modDataGenerated[plat.toLowerCase()][mod_name.toLowerCase()]
    if(data == undefined)
        return <>找不到{plat}模组{mod_name}</>
    if(!data.game_to_mod_version){
        return <>无</>
    }
    let latest_mod_ver:string
    for(let game_ver in data.game_to_mod_version){
        if(latest_mod_ver == undefined)
            latest_mod_ver = data.game_to_mod_version[game_ver]
        else if(versionCompare(latest_mod_ver, data.game_to_mod_version[game_ver]) == 1)
            latest_mod_ver = data.game_to_mod_version[game_ver]
    }

    if(latest_mod_ver == undefined){
        return <>无</>
    }

    let supported_game_ver = []
    for(let game_ver in data.game_to_mod_version){
        if(supported_game_ver.length > 0)
            supported_game_ver.push(" ")
        if(data.game_to_mod_version[game_ver] == latest_mod_ver){
            supported_game_ver.push(<span className="badge badge--primary">{game_ver.split("_")[0]}</span>)
        }else{
            supported_game_ver.push(<span className="badge badge--secondary">{game_ver.split("_")[0]}</span>)
        }
    }

    return <>{supported_game_ver}</>
}

export default {
    模组大卡,
    模组,
    模组支持版本
}