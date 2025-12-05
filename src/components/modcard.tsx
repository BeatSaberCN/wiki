export default function({平台, 名称, platform, name}){
    let p = platform || 平台;
    let n = name || 名称;

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