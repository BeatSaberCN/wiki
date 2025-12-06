---
sidebar_position: 1000
---
# JS/CSS/MDX设计【程序员】

## 开发一个新的维基标签

<提示>这需要您具备基本的React/TypeScript技能。</提示>

这里记录如何编写代码，以开发新的维基标签。

如果需要在Markdown中支持以下内容：

```html
<示例标签 属性xxx="xx">asf</示例标签>
```

文件`src/theme/MDXComponents.tsx`中应该包含以下内容，请注意`示例标签`的写法：
```tsx title=src/theme/MDXComponents.tsx
import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';

function 示例标签({children, 属性xxx}){
    return <div className="example_class">{children}</div>
}

export default {
  ...MDXComponents,
  示例标签,
};
```


## CSS设计指南

Docusaurus的默认主题使用了[infima](https://infima.dev/docs/getting-started/introduction)作为style框架，请参考这个。

不要在正文里写css，请做成组件。
