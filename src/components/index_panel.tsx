import urls from "@site/urls"

export function NewBlogBtn(){
    return <button className="button button--warning" onClick={()=>{
        let date = new Date()
        let yyyy = date.getFullYear()
        let mm = (date.getMonth() + 1).toString()
        if(mm.length == 1)
            mm = "0" + mm
        let dd = date.getDate().toString()
        if(dd.length == 1)
            dd = "0" + dd

        let page_name = `${yyyy}-${mm}-${dd}-页面名称.md`
        let page_content = `---
authors: 匿名
---

# 博客标题

1. 修改上面的页面名称
2. 确保\`blog/authors.yml\`中有你的个人信息，并修改上面的“匿名”。如果没有个人信息请不要修改。
3. 修改正文。

在truncate之前的内容会作为文章摘要出现。

<!-- truncate -->

这部分不会被显示在摘要里。 `
        let url = urls.newBlogUrl("") + "?filename=" + encodeURIComponent(page_name) + "&value=" + encodeURIComponent(page_content)
        window.open(url)
    }}>新建博客</button>
}