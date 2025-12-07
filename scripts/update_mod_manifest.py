'''

自动读取src/server/mod_db中的json数据，并生成mod_data_generated.ts文件

'''
import pathlib
import json

database = {}

def createModMarkdown(md:pathlib.Path, data:dict):
    pass

def read_json(f:pathlib.Path):
    data = json.loads(f.read_text('utf8'))
    plat = data["platform"]
    if not plat in database:
        database[plat] = {}
    
    nameIndex = f.name[:-5]

    nameIndexLower = nameIndex.lower()
    database[plat][nameIndexLower] = data

    mdfile = pathlib.Path('docs/mod-info')/f'{nameIndex}.md'
    if not mdfile.exists():
        createModMarkdown(mdfile, data)


for f in pathlib.Path("cn_mod_db").rglob("**/*.json"):
    read_json(f)

pathlib.Path('src/server/mod_data_generated.ts').write_text("""
// 这个只允许用于服务器端渲染，因为它太大了

import { ModData } from "../mod_data"

let ret: Record<'pc' | 'quest', Record<string, ModData>> = 
""" + json.dumps(database) + """
export default ret
""", encoding='utf8')