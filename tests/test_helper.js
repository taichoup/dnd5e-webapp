const api_result_1 = {
    "index": "frost-giant",
    "name": "Frost Giant",
    "size": "Huge",
    "type": "giant",
    "subtype": null,
    "alignment": "neutral evil",
    "armor_class": 15,
    "hit_points": 138,
    "hit_dice": "12d12",
    "speed": {
        "walk": "40 ft."
    },
    "strength": 23,
    "dexterity": 9,
    "constitution": 21,
    "intelligence": 9,
    "wisdom": 10,
    "charisma": 12,
    "proficiencies": [
        {
            "value": 8,
            "proficiency": {
                "index": "saving-throw-con",
                "name": "Saving Throw: CON",
                "url": "/api/proficiencies/saving-throw-con"
            }
        },
        {
            "value": 3,
            "proficiency": {
                "index": "saving-throw-wis",
                "name": "Saving Throw: WIS",
                "url": "/api/proficiencies/saving-throw-wis"
            }
        },
        {
            "value": 4,
            "proficiency": {
                "index": "saving-throw-cha",
                "name": "Saving Throw: CHA",
                "url": "/api/proficiencies/saving-throw-cha"
            }
        },
        {
            "value": 9,
            "proficiency": {
                "index": "skill-athletics",
                "name": "Skill: Athletics",
                "url": "/api/proficiencies/skill-athletics"
            }
        },
        {
            "value": 3,
            "proficiency": {
                "index": "skill-perception",
                "name": "Skill: Perception",
                "url": "/api/proficiencies/skill-perception"
            }
        }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
        "cold"
    ],
    "condition_immunities": [],
    "senses": {
        "passive_perception": 13
    },
    "languages": "Giant",
    "challenge_rating": 8,
    "xp": 3900,
    "actions": [
        {
            "name": "Multiattack",
            "desc": "The giant makes two greataxe attacks.",
            "options": {
                "choose": 1,
                "from": [
                    [
                        {
                            "name": "Greataxe",
                            "count": 2,
                            "type": "melee"
                        }
                    ]
                ]
            },
            "damage": []
        },
        {
            "name": "Greataxe",
            "desc": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 25 (3d12 + 6) slashing damage.",
            "attack_bonus": 9,
            "damage": [
                {
                    "damage_type": {
                        "index": "slashing",
                        "name": "Slashing",
                        "url": "/api/damage-types/slashing"
                    },
                    "damage_dice": "3d12+6"
                }
            ]
        },
        {
            "name": "Rock",
            "desc": "Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage.",
            "attack_bonus": 9,
            "damage": [
                {
                    "damage_type": {
                        "index": "bludgeoning",
                        "name": "Bludgeoning",
                        "url": "/api/damage-types/bludgeoning"
                    },
                    "damage_dice": "4d10+6"
                }
            ]
        }
    ],
    "url": "/api/monsters/frost-giant"
};

const api_result_2 = {
    "index": "clothes-fine",
    "name": "Clothes, fine",
    "equipment_category": {
        "index": "adventuring-gear",
        "name": "Adventuring Gear",
        "url": "/api/equipment-categories/adventuring-gear"
    },
    "gear_category": {
        "index": "standard-gear",
        "name": "Standard Gear",
        "url": "/api/equipment-categories/standard-gear"
    },
    "cost": {
        "quantity": 15,
        "unit": "gp"
    },
    "weight": 6,
    "url": "/api/equipment/clothes-fine"
};

module.exports = {
    api_result_1,
    api_result_2
}