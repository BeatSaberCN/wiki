import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Admonitions from "@site/src/components/admonitions"
import modcard from "@site/src/components/modcard"
function 示例标签({children}){
    return <div className="example_class">{children}</div>
}

export default {
  ...MDXComponents,
  示例标签,

  ...Admonitions,
  模组:modcard
};


