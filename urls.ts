
let edit_url = 'https://github.com/BeatSaberCN/wiki/edit/master/'
let new_url = 'https://github.com/BeatSaberCN/wiki/new/master/'

let datas_url = 'https://github.com/BeatSaberCN/wiki_datas/edit/master/'
let datas_new_url = 'https://github.com/BeatSaberCN/wiki_datas/new/master/'


export default {
    moddb_edit_path : "https://github.com/BeatSaberCN/cn_mod_db/edit/master/",
    editDocsUrl(path:string):string{
        return datas_url + "docs/" + path
    },

    editBlogUrl(path:string):string{
        return datas_url + "blog/" + path
    },

    editPagesUrl(path:string):string{
        return edit_url + "src/pages/" + path
    },

    newDocsUrl(path:string):string{
        return datas_new_url + "docs/" + path
    },

    newBlogUrl(path:string):string{
        return datas_new_url + "blog/" + path
    },

    newPagesUrl(path:string):string{
        return new_url + "src/pages/" + path
    },
};