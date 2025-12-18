'''

自动读取src/server/mod_db中的json数据，并生成mod_data_generated.ts文件

'''
import pathlib
import json
import requests

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
import { ModData } from "../mod_data"

let ret: Record<'pc' | 'quest', Record<string, ModData>> = 
""" + json.dumps(database) + """
export default ret
""", encoding='utf8')

############### update realtime infos ##########

import datetime
import re
build_time = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8), name='Asia/Shanghai')).date()

quest_mod_versions = [x for x in requests.get(f"https://raw.githubusercontent.com/QuestPackageManager/bs-coremods/refs/heads/main/core_mods.json").json()]
filtered_quest_mod_versions = [x for x in quest_mod_versions if re.match('^[0-9\\._]+$', x)]
latest_quest_version = max(filtered_quest_mod_versions)

bsm_versions = requests.get(f"https://raw.githubusercontent.com/Zagrios/bs-manager/refs/heads/master/assets/jsons/bs-versions.json").json()
recommand_bsm_version = "暂无推荐"
for v in bsm_versions:
    if 'recommended' in v:
        recommand_bsm_version = v["BSVersion"]

pathlib.Path('src/server/realtime_infos.ts').write_text(f"""
export default {'{'}
    build_time : "{build_time.year}年{build_time.month}月{build_time.day}日",
    quest_ver : "{latest_quest_version}",
    bsm_recomm_ver: "{recommand_bsm_version}"
{'}'}
""", encoding='utf8')