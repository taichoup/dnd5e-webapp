const { hasChildren, pruneProperty, removeUselessProperties, removeNullishValues } = require('../src/utils/apiFormatter');
const helper = require('./test_helper');




// beforeEach(() => {

// });


describe('removeUselessProperties()', () => {

    test('it should work', () => {
        const machin = helper.api_result_1;

        removeUselessProperties(machin, "url");
        removeUselessProperties(machin, "index");

        expect(machin).toEqual(
            {
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
                            "name": "Saving Throw: CON",
                        }
                    },
                    {
                        "value": 3,
                        "proficiency": {
                            "name": "Saving Throw: WIS",
                        }
                    },
                    {
                        "value": 4,
                        "proficiency": {
                            "name": "Saving Throw: CHA",
                        }
                    },
                    {
                        "value": 9,
                        "proficiency": {
                            "name": "Skill: Athletics",
                        }
                    },
                    {
                        "value": 3,
                        "proficiency": {
                            "name": "Skill: Perception",
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
                                    "name": "Slashing",
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
                                    "name": "Bludgeoning",
                                },
                                "damage_dice": "4d10+6"
                            }
                        ]
                    }
                ],
            }
        );
    });
});

describe.only('removeNullishValues()', () => {
    test('it should work', () => {
        const testObject = {
            bla: "mlkmlk",
            ble: null,
            bli: {
                haha: 3,
                hehe: "",
                hoho: {
                    huhu: "damlk",
                    hmlk: null
                }
            },
            erer: 42,
            jj: 0
        };

        removeNullishValues(testObject);

        expect(testObject).toEqual({
            bla: "mlkmlk",
            bli: {
                haha: 3,
                hoho: {
                    huhu: "damlk",
                }
            },
            erer: 42
        });
    });
});


// afterAll(() => {
// });
