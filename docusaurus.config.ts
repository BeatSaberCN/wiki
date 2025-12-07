import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
import docsFiles from "./docs"

function getDocFiles(){
  let ret = []
  docsFiles.forEach(v=>{
    if(v.displayInNav){
      ret.push({
        to:'/docs/' + v.dirName,
        label: v.displayName
      })
    }
  })
  return ret
}

import urls from './urls';

const config: Config = {
  title: '节奏光剑模组中文维基',
  tagline: '维基建设中……',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/wiki/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'BeatSaberCN', // Usually your GitHub org/user name.
  projectName: 'wiki', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        pages:{
          editUrl: (e)=>urls.editPagesUrl(e.pagesPath)
        },
        docs: {
          path:'docs',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            (e)=>urls.editDocsUrl(e.docPath),
        },
        blog: {
          blogSidebarTitle: '最近更新',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            e=>urls.editBlogUrl(e.blogPath),
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: false,
      // disableSwitch: true,
      // defaultMode: 'dark'
    },
    navbar: {
      title: '节奏光剑模组中文维基',
      logo: {
        alt: '节奏光剑模组中文维基',
        src: 'img/bsicon.png',
      },
      items: [
        ...getDocFiles(),
        // {to: '/docs/category/维基建设指南', label: '维基建设', position: 'left'},
        {
          href: 'https://github.com/BeatSaberCN/wiki',
          label: 'GitHub',
          position: 'right',
        },
        {to: '/blog', label: '博客', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
      ],
      copyright: `版权所有 © ${new Date().getFullYear()} 节奏光剑中文维基编辑组，基于扩展的Docusaurus。维基内容以CC BY-NC-SA 4.0协议许可，严禁商业使用。<br/>模组英文数据来自<a href='https://beatmods.com/mods'>BeatMods</a>和<a href='https://mods.bsquest.xyz/'>bsqmods</a>，本站非主要展示用途，其版权归原作者所有。`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
