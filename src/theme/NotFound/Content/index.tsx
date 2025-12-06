import React, { useContext, type ReactNode } from 'react';
import Content from '@theme-original/NotFound/Content';
import type ContentType from '@theme/NotFound/Content';
import type { WrapperProps } from '@docusaurus/types';
import useBaseUrl from '@docusaurus/useBaseUrl';
import config from "@site/docusaurus.config"

type Props = WrapperProps<typeof ContentType>;

const markdown_template = `---
sidebar_position: 200
---
# 新建页面模板

你可以更改上面的sidebar_position，越小的数字越靠上`

export default function ContentWrapper(props: Props): ReactNode {
  let url = window.location.pathname

  const appends = []
  if (url.startsWith(config.baseUrl + "docs")) {
    let fileUrl = 'https://github.com/BeatSaberCN/wiki/new/master/' + url.substring(config.baseUrl.length) + ".md"
    let folderSplit = fileUrl.lastIndexOf("/")
    let githubUrl = fileUrl.substring(0, folderSplit) + "?filename=" + encodeURIComponent(fileUrl.substring(folderSplit + 1)) + "&value=" + encodeURIComponent(markdown_template)
    appends.push(<a key="docedit" className='button button--warning' style={{ textAlign: "center", display:'inline-block', width:'fit-content', margin:'auto' }} href={githubUrl}>在Github上创建这个页面<sup className='badge badge--info' style={{
      transform:'scale(0.8)'
    }}>测试</sup></a>)
  }
  return (
    <>
      <Content {...props} />
      {appends}
    </>
  );
}
