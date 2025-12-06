import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';

function 模组大卡({平台, 名称, platform, name}){
        let p = platform || 平台;
        let n = name || 名称;

        if(n == undefined){
            n =useActiveDocContext(undefined)?.activeDoc?.id
            if(n){
                let tmp = n.split("/")
                if(tmp.length > 0){
                    n = tmp[tmp.length-1]
                }
            }
        }

        return <div style={
            {
                border: "1px solid black",
                background: "gray",
                margin: "4px",
                padding: "4px",
                width:"fit-content"
            }
        }>
            模组信息占位（{p}，{n}）
        </div>

}

function 模组({平台, 名称, platform, name}){
        let p = platform || 平台;
        let n = name || 名称;

        if(n == undefined){
            n =useActiveDocContext(undefined)?.activeDoc?.id
            if(n){
                let tmp = n.split("/")
                if(tmp.length > 0){
                    n = tmp[tmp.length-1]
                }
            }
        }

        return <div style={
            {
                border: "1px solid black",
                background: "gray",
                margin: "4px",
                padding: "4px",
                width:"fit-content"
            }
        }>
            模组信息占位（{p}，{n}）
        </div>
    }


export default {
    模组大卡,
    模组
}