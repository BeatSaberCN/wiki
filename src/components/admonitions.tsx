import Admonition from '@theme/Admonition';

function return_type(ty, title, children){
    if(title){
        return <Admonition type={ty} title={title}>{children}</Admonition>
    }else{
        return <Admonition type={ty}>{children}</Admonition>
    }
}

export default {
    备注({children, 标题, 内容}) {
        return return_type('note', 标题, 内容 || children)
    },提示({children, 标题, 内容}) {
        return return_type('tip', 标题, 内容 || children)
    },信息({children, 标题, 内容}) {
        return return_type('info', 标题, 内容 || children)
    },危险({children, 标题, 内容}) {
        return return_type('danger', 标题, 内容 || children)
    },警告({children, 标题, 内容}) {
        return return_type('caution', 标题, 内容 || children)
    },错误({children, 标题, 内容}) {
        return return_type('danger', 标题 || "错误", 内容 || children)
    }
} 

