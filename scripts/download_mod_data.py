'''

直接使用即可，在git根目录下执行，会自动更新static/mod_db中的数据

'''



import requests
import json
import pathlib


VERSIONS_QUEST = [
    "1.40.8_7379",
    "1.37.0_9064817954"
]

VERSIONS_PC = [
    "1.40.8"
]

corejson = requests.get(f"https://github.com/QuestPackageManager/bs-coremods/raw/refs/heads/main/core_mods.json",
                        proxies=proxy).json()

class BufferedMod:
    def __init__(self, file:pathlib.Path):
        self.file = file
        if file.exists():
            self.json = json.loads(file.read_text(encoding='utf8'))
        else:
            self.json = {
                'platform': 'unk',
                'modPage':None,
                'name':'unk',
                'game_ver':[],
                'desc_zh':None,
                'extern_links':[],
                'iscore':False,
                'authors':[]
            }
        self.authors = set()
        self.versions = set()

    def save(self):
        auths = list(self.authors)
        auths.sort()
        self.json["authors"] = auths
        vers = list(self.versions)
        vers.sort()
        self.json["game_ver"] = vers

        self.file.write_text(json.dumps(self.json, indent=2, ensure_ascii=False, separators=(', ',': ')), encoding='utf8')

buffered_pages = dict[str, BufferedMod]()

for version in VERSIONS_QUEST:
    modjson = requests.get(f"https://mods.bsquest.xyz/{version}.json").json()

    coremod_ids = set()
    for mod in corejson[version]["mods"]:
        coremod_ids.add(mod["id"])

    # handle quest pages
    for k in modjson:
        latest = modjson[k][max(modjson[k])]
        page_name = f"static/mod_db/quest/{latest['id']}.json"

        if page_name in buffered_pages:
            buffered_page = buffered_pages[page_name]
        else:
            buffered_page = BufferedMod(pathlib.Path(page_name))
            buffered_pages[page_name] = buffered_page
            buffered_page.json["name"] = latest["name"]
            buffered_page.json["desc_en"] = latest["description"]
            buffered_page.json["platform"] = "quest"
            buffered_page.json["iscore"] = latest["id"] in coremod_ids
            buffered_page.json["editpath"] = page_name


        buffered_page.authors.add(latest["author"])
        buffered_page.versions.add(version)

for version in VERSIONS_PC:

    # handle pc mods
    pcmods = requests.get(f"https://beatmods.com/api/mods?gameName=BeatSaber&gameVersion={version}&status=verified&platform=universalpc", proxies=proxy).json()
    for mod in pcmods["mods"]:
        _latest = mod["latest"]
        _mod = mod["mod"]
        page_name = f"static/mod_db/pc/{_mod["name"]}.json"
        
        if page_name in buffered_pages:
            buffered_page = buffered_pages[page_name]
        else:
            buffered_page = BufferedMod(pathlib.Path(page_name))
            buffered_pages[page_name] = buffered_page
            buffered_page.json["name"] = _mod["name"]
            buffered_page.json["desc_en"] = _mod["description"]
            buffered_page.json["platform"] = "pc"
            buffered_page.json["iscore"] = _mod["category"] == "core"
            buffered_page.json["editpath"] = page_name
        for author in _mod["authors"]:
            buffered_page.authors.add(author['displayName'])
        for ver in _latest["supportedGameVersions"]:
            buffered_page.versions.add(ver["version"])

for buf in buffered_pages:
    buffered_pages[buf].save()
