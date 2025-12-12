import Admonition from '@theme/Admonition';

function return_type(ty, title, children){
    if(title){
        return <Admonition type={ty} title={title}>{children}</Admonition>
    }else{
        return <Admonition type={ty}>{children}</Admonition>
    }
}

export default {
    备注({children, 标题, 内容, title, content}) {
        return return_type('note', 标题|| title, 内容 || content || children)
    },提示({children, 标题, 内容, title, content}) {
        return return_type('tip', 标题|| title, 内容 || content || children)
    },信息({children, 标题, 内容, title, content}) {
        return return_type('info', 标题|| title, 内容 || content || children)
    },危险({children, 标题, 内容, title, content}) {
        return return_type('danger', 标题|| title, 内容 || content || children)
    },警告({children, 标题, 内容, title, content}) {
        return return_type('caution', 标题|| title, 内容 || content || children)
    },注意({children, 标题, 内容, title, content}) {
        return return_type('caution', 标题|| title || "注意", 内容 || content || children)
    },错误({children, 标题, 内容, title, content}) {
        return return_type('danger', 标题 || title || "错误", 内容 || content || children)
    },
    需要扩展({children, 内容}){
        let hint = children || 内容
        return return_type('info', "需要扩展", 
            hint ? ["该内容需要扩展，您可以点击页面下方的编辑按钮进行编辑。", <br/>, hint]:
                ["该内容需要扩展，您可以点击页面下方的编辑按钮进行编辑。"]
        )
    },
    网络提示({children, 内容}){
        let hint = children || 内容
        return return_type('info', "网络提示", 
            hint ? ["该内容涉及的部分内容不向大陆地区提供服务。", <br />, hint]:
                ["该内容涉及的部分内容不向大陆地区提供服务。"]
        )
    }
} 

