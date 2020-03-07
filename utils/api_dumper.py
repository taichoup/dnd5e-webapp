import requests, json

routes = [
	{"name": "ability-scores", "path": "api/ability-scores"}, 
	{"name": "classes", "path": "api/classes"}, 
	{"name": "conditions", "path": "api/conditions"}, 
	{"name": "damage-types", "path": "api/damage-types"}, 
	{"name": "equipment-categories", "path": "api/equipment-categories"}, 
	{"name": "equipment", "path": "api/equipment"}, 
	{"name": "features", "path": "api/features"}, 
	{"name": "languages", "path": "api/languages"}, 
	{"name": "magic-schools", "path": "api/magic-schools"}, 
	{"name": "monsters", "path": "api/monsters"}, 
	{"name": "proficiencies", "path": "api/proficiencies"}, 
	{"name": "races", "path": "api/races"}, 
	{"name": "skills", "path": "api/skills"}, 
	{"name": "spellcasting", "path": "api/spellcasting"}, 
	{"name": "spells", "path": "api/spells"}, 
	{"name": "starting-equipment", "path": "api/starting-equipment"}, 
	{"name": "subclasses", "path": "api/subclasses"}, 
	{"name": "subraces", "path": "api/subraces"}, 
	{"name": "traits", "path": "api/traits"}, 
	{"name": "weapon-properties", "path": "api/weapon-properties"}
]

json_results = []

base_url = "http://www.dnd5eapi.co/"

for route in routes:
	url = "%s%s" % (base_url, route["path"])
	print "Requesting %s..." % url
	r = requests.get(url)
	print "\tResult: %s" % r.status_code
	json_results.append(r.json())

for collection in json_results:
	for result in collection["results"]:
		if result["url"]:
			url = "%s%s" % (base_url[:-1], result["url"])
			print "\t\tRequesting %s..." % url
			r2 = requests.get(url)
			print "\t\t\tResult: %s" % r.status_code
			result["result"] = r2.json()


with open("C://repos//react-training//dnd5e//utils//data.json", "w") as _file:
	json.dump(json_results, _file)

