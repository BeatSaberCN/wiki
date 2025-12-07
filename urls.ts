
let edit_url = 'https://github.com/BeatSaberCN/wiki/edit/master/'
let new_url = 'https://github.com/BeatSaberCN/wiki/new/master/'

let datas_url = 'https://github.com/BeatSaberCN/wiki_datas/edit/main/'
let datas_new_url = 'https://github.com/BeatSaberCN/wiki_datas/new/main/'


export default {
    moddb_edit_path : "https://github.com/BeatSaberCN/cn_mod_db/edit/main/",
    editDocsUrl(path:string):string{
        return datas_url + "docs/" + path
    },

    editBlogUrl(path:string):string{
        return datas_url + "blog/" + path
    },

    editPagesUrl(path:string):string{
        return datas_url + "pages/" + path
    },

    newDocsUrl(path:string):string{
        return datas_new_url + "docs/" + path
    },

    newBlogUrl(path:string):string{
        return datas_new_url + "blog/" + path
    },

    newPagesUrl(path:string):string{
        return datas_new_url + "pages/" + path
    },
};