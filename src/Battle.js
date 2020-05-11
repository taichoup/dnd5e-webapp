import React from "react";
import StoreContext from "./StoreContext";
import { _Store } from "./Store";
import { Avatar } from "./Avatar";
import Autocomplete from "./Autocomplete";

/*
* Main event handler for the battle form
* @param {event object}
*/
function handleUserInput(event) {
  const creature_name = event.target["creature_name"].value;
  const initiative_roll = event.target["initiative_roll"].value;
  const hit_points = event.target["hit_points"].value;
  const team = event.target["team"].value;
  _Store.dispatch({
    type: "BATTLE",
    payload: {
      creature_name: creature_name,
      initiative_roll: initiative_roll,
      hit_points: hit_points,
      team: team,
    },
  });
  event.preventDefault();
  event.target.reset();
  document.getElementById("creature").focus();
}

/*
* Sort function for the battle order table
* @param {int} a
* @param {int} b
*/
function initiative(a, b) {
  return b.initiative_roll - a.initiative_roll;
}

/*
* Generate the label for the little avatars on the battleground
* @param {string} avatarName - either free text from user or autocomplete result
*/
function generateAvatarName(avatarName) {
  return avatarName.slice(0, 2);
}

// function rollInitiative() {
//   // use the mouse wheel in loose mode ?
// }

const getModifier = (abilityScore) => {
  return Math.floor((abilityScore - 10) / 2);
};

// TODO: retrieve this dynamically?? should profile the perfs
const monstersInitHPDB = [
  {
    label: "Aboleth",
    dex: 9,
    modifier: -1,
    hp: 135,
  },
  {
    label: "Acolyte",
    dex: 10,
    modifier: 0,
    hp: 9,
  },
  {
    label: "Adult Black Dragon",
    dex: 14,
    modifier: 2,
    hp: 195,
  },
  {
    label: "Adult Blue Dragon",
    dex: 10,
    modifier: 0,
    hp: 225,
  },
  {
    label: "Adult Brass Dragon",
    dex: 10,
    modifier: 0,
    hp: 172,
  },
  {
    label: "Adult Bronze Dragon",
    dex: 10,
    modifier: 0,
    hp: 212,
  },
  {
    label: "Adult Copper Dragon",
    dex: 12,
    modifier: 1,
    hp: 184,
  },
  {
    label: "Adult Gold Dragon",
    dex: 14,
    modifier: 2,
    hp: 256,
  },
  {
    label: "Adult Green Dragon",
    dex: 12,
    modifier: 1,
    hp: 207,
  },
  {
    label: "Adult Red Dragon",
    dex: 10,
    modifier: 0,
    hp: 256,
  },
  {
    label: "Adult Silver Dragon",
    dex: 10,
    modifier: 0,
    hp: 243,
  },
  {
    label: "Adult White Dragon",
    dex: 10,
    modifier: 0,
    hp: 200,
  },
  {
    label: "Air Elemental",
    dex: 20,
    modifier: 5,
    hp: 90,
  },
  {
    label: "Ancient Black Dragon",
    dex: 14,
    modifier: 2,
    hp: 367,
  },
  {
    label: "Ancient Blue Dragon",
    dex: 10,
    modifier: 0,
    hp: 481,
  },
  {
    label: "Ancient Brass Dragon",
    dex: 10,
    modifier: 0,
    hp: 297,
  },
  {
    label: "Ancient Bronze Dragon",
    dex: 10,
    modifier: 0,
    hp: 444,
  },
  {
    label: "Ancient Copper Dragon",
    dex: 12,
    modifier: 1,
    hp: 350,
  },
  {
    label: "Ancient Gold Dragon",
    dex: 14,
    modifier: 2,
    hp: 546,
  },
  {
    label: "Ancient Green Dragon",
    dex: 12,
    modifier: 1,
    hp: 385,
  },
  {
    label: "Ancient Red Dragon",
    dex: 10,
    modifier: 0,
    hp: 546,
  },
  {
    label: "Ancient Silver Dragon",
    dex: 10,
    modifier: 0,
    hp: 487,
  },
  {
    label: "Ancient White Dragon",
    dex: 10,
    modifier: 0,
    hp: 333,
  },
  {
    label: "Androsphinx",
    dex: 10,
    modifier: 0,
    hp: 199,
  },
  {
    label: "Animated Armor",
    dex: 11,
    modifier: 0,
    hp: 33,
  },
  {
    label: "Ankheg",
    dex: 11,
    modifier: 0,
    hp: 39,
  },
  {
    label: "Ape",
    dex: 14,
    modifier: 2,
    hp: 19,
  },
  {
    label: "Archmage",
    dex: 14,
    modifier: 2,
    hp: 99,
  },
  {
    label: "Assassin",
    dex: 16,
    modifier: 3,
    hp: 78,
  },
  {
    label: "Awakened Shrub",
    dex: 8,
    modifier: -1,
    hp: 10,
  },
  {
    label: "Awakened Tree",
    dex: 6,
    modifier: -2,
    hp: 59,
  },
  {
    label: "Axe Beak",
    dex: 12,
    modifier: 1,
    hp: 19,
  },
  {
    label: "Azer",
    dex: 12,
    modifier: 1,
    hp: 39,
  },
  {
    label: "Baboon",
    dex: 14,
    modifier: 2,
    hp: 3,
  },
  {
    label: "Badger",
    dex: 11,
    modifier: 0,
    hp: 3,
  },
  {
    label: "Balor",
    dex: 15,
    modifier: 2,
    hp: 262,
  },
  {
    label: "Bandit",
    dex: 12,
    modifier: 1,
    hp: 11,
  },
  {
    label: "Bandit Captain",
    dex: 16,
    modifier: 3,
    hp: 65,
  },
  {
    label: "Barbed Devil",
    dex: 17,
    modifier: 3,
    hp: 110,
  },
  {
    label: "Basilisk",
    dex: 8,
    modifier: -1,
    hp: 52,
  },
  {
    label: "Bat",
    dex: 15,
    modifier: 2,
    hp: 1,
  },
  {
    label: "Bearded Devil",
    dex: 15,
    modifier: 2,
    hp: 52,
  },
  {
    label: "Behir",
    dex: 16,
    modifier: 3,
    hp: 168,
  },
  {
    label: "Berserker",
    dex: 12,
    modifier: 1,
    hp: 67,
  },
  {
    label: "Black Bear",
    dex: 10,
    modifier: 0,
    hp: 19,
  },
  {
    label: "Black Dragon Wyrmling",
    dex: 14,
    modifier: 2,
    hp: 33,
  },
  {
    label: "Black Pudding",
    dex: 5,
    modifier: -3,
    hp: 85,
  },
  {
    label: "Blink Dog",
    dex: 17,
    modifier: 3,
    hp: 22,
  },
  {
    label: "Blood Hawk",
    dex: 14,
    modifier: 2,
    hp: 7,
  },
  {
    label: "Blue Dragon Wyrmling",
    dex: 10,
    modifier: 0,
    hp: 52,
  },
  {
    label: "Boar",
    dex: 11,
    modifier: 0,
    hp: 11,
  },
  {
    label: "Bone Devil",
    dex: 16,
    modifier: 3,
    hp: 142,
  },
  {
    label: "Brass Dragon Wyrmling",
    dex: 10,
    modifier: 0,
    hp: 16,
  },
  {
    label: "Bronze Dragon Wyrmling",
    dex: 10,
    modifier: 0,
    hp: 32,
  },
  {
    label: "Brown Bear",
    dex: 10,
    modifier: 0,
    hp: 34,
  },
  {
    label: "Bugbear",
    dex: 14,
    modifier: 2,
    hp: 27,
  },
  {
    label: "Bulette",
    dex: 11,
    modifier: 0,
    hp: 94,
  },
  {
    label: "Camel",
    dex: 8,
    modifier: -1,
    hp: 15,
  },
  {
    label: "Cat",
    dex: 15,
    modifier: 2,
    hp: 2,
  },
  {
    label: "Centaur",
    dex: 14,
    modifier: 2,
    hp: 45,
  },
  {
    label: "Chain Devil",
    dex: 15,
    modifier: 2,
    hp: 85,
  },
  {
    label: "Chimera",
    dex: 11,
    modifier: 0,
    hp: 114,
  },
  {
    label: "Chuul",
    dex: 10,
    modifier: 0,
    hp: 93,
  },
  {
    label: "Clay Golem",
    dex: 9,
    modifier: -1,
    hp: 133,
  },
  {
    label: "Cloaker",
    dex: 15,
    modifier: 2,
    hp: 78,
  },
  {
    label: "Cloud Giant",
    dex: 10,
    modifier: 0,
    hp: 200,
  },
  {
    label: "Cockatrice",
    dex: 12,
    modifier: 1,
    hp: 27,
  },
  {
    label: "Commoner",
    dex: 10,
    modifier: 0,
    hp: 4,
  },
  {
    label: "Constrictor Snake",
    dex: 14,
    modifier: 2,
    hp: 13,
  },
  {
    label: "Copper Dragon Wyrmling",
    dex: 12,
    modifier: 1,
    hp: 22,
  },
  {
    label: "Couatl",
    dex: 20,
    modifier: 5,
    hp: 97,
  },
  {
    label: "Crab",
    dex: 11,
    modifier: 0,
    hp: 2,
  },
  {
    label: "Crocodile",
    dex: 10,
    modifier: 0,
    hp: 19,
  },
  {
    label: "Cult Fanatic",
    dex: 14,
    modifier: 2,
    hp: 22,
  },
  {
    label: "Cultist",
    dex: 12,
    modifier: 1,
    hp: 9,
  },
  {
    label: "Darkmantle",
    dex: 12,
    modifier: 1,
    hp: 22,
  },
  {
    label: "Death Dog",
    dex: 14,
    modifier: 2,
    hp: 39,
  },
  {
    label: "Deep Gnome (Svirfneblin)",
    dex: 14,
    modifier: 2,
    hp: 16,
  },
  {
    label: "Deer",
    dex: 16,
    modifier: 3,
    hp: 4,
  },
  {
    label: "Deva",
    dex: 18,
    modifier: 4,
    hp: 136,
  },
  {
    label: "Dire Wolf",
    dex: 15,
    modifier: 2,
    hp: 37,
  },
  {
    label: "Djinni",
    dex: 15,
    modifier: 2,
    hp: 161,
  },
  {
    label: "Doppelganger",
    dex: 18,
    modifier: 4,
    hp: 52,
  },
  {
    label: "Draft Horse",
    dex: 10,
    modifier: 0,
    hp: 19,
  },
  {
    label: "Dragon Turtle",
    dex: 10,
    modifier: 0,
    hp: 341,
  },
  {
    label: "Dretch",
    dex: 11,
    modifier: 0,
    hp: 18,
  },
  {
    label: "Drider",
    dex: 16,
    modifier: 3,
    hp: 123,
  },
  {
    label: "Drow",
    dex: 14,
    modifier: 2,
    hp: 13,
  },
  {
    label: "Druid",
    dex: 12,
    modifier: 1,
    hp: 27,
  },
  {
    label: "Dryad",
    dex: 12,
    modifier: 1,
    hp: 22,
  },
  {
    label: "Duergar",
    dex: 11,
    modifier: 0,
    hp: 26,
  },
  {
    label: "Dust Mephit",
    dex: 14,
    modifier: 2,
    hp: 17,
  },
  {
    label: "Eagle",
    dex: 15,
    modifier: 2,
    hp: 3,
  },
  {
    label: "Earth Elemental",
    dex: 8,
    modifier: -1,
    hp: 126,
  },
  {
    label: "Efreeti",
    dex: 12,
    modifier: 1,
    hp: 200,
  },
  {
    label: "Elephant",
    dex: 9,
    modifier: -1,
    hp: 76,
  },
  {
    label: "Elk",
    dex: 10,
    modifier: 0,
    hp: 13,
  },
  {
    label: "Erinyes",
    dex: 16,
    modifier: 3,
    hp: 153,
  },
  {
    label: "Ettercap",
    dex: 15,
    modifier: 2,
    hp: 44,
  },
  {
    label: "Ettin",
    dex: 8,
    modifier: -1,
    hp: 85,
  },
  {
    label: "Fire Elemental",
    dex: 17,
    modifier: 3,
    hp: 102,
  },
  {
    label: "Fire Giant",
    dex: 9,
    modifier: -1,
    hp: 162,
  },
  {
    label: "Flesh Golem",
    dex: 9,
    modifier: -1,
    hp: 93,
  },
  {
    label: "Flying Snake",
    dex: 18,
    modifier: 4,
    hp: 5,
  },
  {
    label: "Flying Sword",
    dex: 15,
    modifier: 2,
    hp: 17,
  },
  {
    label: "Frog",
    dex: 13,
    modifier: 1,
    hp: 1,
  },
  {
    label: "Frost Giant",
    dex: 9,
    modifier: -1,
    hp: 138,
  },
  {
    label: "Gargoyle",
    dex: 11,
    modifier: 0,
    hp: 52,
  },
  {
    label: "Gelatinous Cube",
    dex: 3,
    modifier: -4,
    hp: 84,
  },
  {
    label: "Ghast",
    dex: 17,
    modifier: 3,
    hp: 36,
  },
  {
    label: "Ghost",
    dex: 13,
    modifier: 1,
    hp: 45,
  },
  {
    label: "Ghoul",
    dex: 15,
    modifier: 2,
    hp: 22,
  },
  {
    label: "Giant Ape",
    dex: 14,
    modifier: 2,
    hp: 157,
  },
  {
    label: "Giant Badger",
    dex: 10,
    modifier: 0,
    hp: 13,
  },
  {
    label: "Giant Bat",
    dex: 16,
    modifier: 3,
    hp: 22,
  },
  {
    label: "Giant Boar",
    dex: 10,
    modifier: 0,
    hp: 42,
  },
  {
    label: "Giant Centipede",
    dex: 14,
    modifier: 2,
    hp: 4,
  },
  {
    label: "Giant Constrictor Snake",
    dex: 14,
    modifier: 2,
    hp: 60,
  },
  {
    label: "Giant Crab",
    dex: 15,
    modifier: 2,
    hp: 13,
  },
  {
    label: "Giant Crocodile",
    dex: 9,
    modifier: -1,
    hp: 85,
  },
  {
    label: "Giant Eagle",
    dex: 17,
    modifier: 3,
    hp: 26,
  },
  {
    label: "Giant Elk",
    dex: 16,
    modifier: 3,
    hp: 42,
  },
  {
    label: "Giant Fire Beetle",
    dex: 10,
    modifier: 0,
    hp: 4,
  },
  {
    label: "Giant Frog",
    dex: 13,
    modifier: 1,
    hp: 18,
  },
  {
    label: "Giant Goat",
    dex: 11,
    modifier: 0,
    hp: 19,
  },
  {
    label: "Giant Hyena",
    dex: 14,
    modifier: 2,
    hp: 45,
  },
  {
    label: "Giant Lizard",
    dex: 12,
    modifier: 1,
    hp: 19,
  },
  {
    label: "Giant Octopus",
    dex: 13,
    modifier: 1,
    hp: 52,
  },
  {
    label: "Giant Owl",
    dex: 15,
    modifier: 2,
    hp: 19,
  },
  {
    label: "Giant Poisonous Snake",
    dex: 18,
    modifier: 4,
    hp: 11,
  },
  {
    label: "Giant Rat",
    dex: 15,
    modifier: 2,
    hp: 7,
  },
  {
    label: "Giant Rat (Diseased)",
    dex: 15,
    modifier: 2,
    hp: 7,
  },
  {
    label: "Giant Scorpion",
    dex: 13,
    modifier: 1,
    hp: 52,
  },
  {
    label: "Giant Sea Horse",
    dex: 15,
    modifier: 2,
    hp: 16,
  },
  {
    label: "Giant Shark",
    dex: 11,
    modifier: 0,
    hp: 126,
  },
  {
    label: "Giant Spider",
    dex: 16,
    modifier: 3,
    hp: 26,
  },
  {
    label: "Giant Toad",
    dex: 13,
    modifier: 1,
    hp: 39,
  },
  {
    label: "Giant Vulture",
    dex: 10,
    modifier: 0,
    hp: 22,
  },
  {
    label: "Giant Wasp",
    dex: 14,
    modifier: 2,
    hp: 13,
  },
  {
    label: "Giant Weasel",
    dex: 16,
    modifier: 3,
    hp: 9,
  },
  {
    label: "Giant Wolf Spider",
    dex: 16,
    modifier: 3,
    hp: 11,
  },
  {
    label: "Gibbering Mouther",
    dex: 8,
    modifier: -1,
    hp: 67,
  },
  {
    label: "Glabrezu",
    dex: 15,
    modifier: 2,
    hp: 157,
  },
  {
    label: "Gladiator",
    dex: 15,
    modifier: 2,
    hp: 112,
  },
  {
    label: "Gnoll",
    dex: 12,
    modifier: 1,
    hp: 22,
  },
  {
    label: "Goat",
    dex: 10,
    modifier: 0,
    hp: 4,
  },
  {
    label: "Goblin",
    dex: 14,
    modifier: 2,
    hp: 7,
  },
  {
    label: "Gold Dragon Wyrmling",
    dex: 14,
    modifier: 2,
    hp: 60,
  },
  {
    label: "Gorgon",
    dex: 11,
    modifier: 0,
    hp: 114,
  },
  {
    label: "Gray Ooze",
    dex: 6,
    modifier: -2,
    hp: 22,
  },
  {
    label: "Green Dragon Wyrmling",
    dex: 12,
    modifier: 1,
    hp: 38,
  },
  {
    label: "Green Hag",
    dex: 12,
    modifier: 1,
    hp: 82,
  },
  {
    label: "Grick",
    dex: 14,
    modifier: 2,
    hp: 27,
  },
  {
    label: "Griffon",
    dex: 15,
    modifier: 2,
    hp: 59,
  },
  {
    label: "Grimlock",
    dex: 12,
    modifier: 1,
    hp: 11,
  },
  {
    label: "Guard",
    dex: 12,
    modifier: 1,
    hp: 11,
  },
  {
    label: "Guardian Naga",
    dex: 18,
    modifier: 4,
    hp: 127,
  },
  {
    label: "Gynosphinx",
    dex: 15,
    modifier: 2,
    hp: 136,
  },
  {
    label: "Half-Red Dragon Veteran",
    dex: 13,
    modifier: 1,
    hp: 65,
  },
  {
    label: "Harpy",
    dex: 13,
    modifier: 1,
    hp: 38,
  },
  {
    label: "Hawk",
    dex: 16,
    modifier: 3,
    hp: 1,
  },
  {
    label: "Hell Hound",
    dex: 12,
    modifier: 1,
    hp: 45,
  },
  {
    label: "Hezrou",
    dex: 17,
    modifier: 3,
    hp: 136,
  },
  {
    label: "Hill Giant",
    dex: 8,
    modifier: -1,
    hp: 105,
  },
  {
    label: "Hippogriff",
    dex: 13,
    modifier: 1,
    hp: 19,
  },
  {
    label: "Hobgoblin",
    dex: 12,
    modifier: 1,
    hp: 11,
  },
  {
    label: "Homunculus",
    dex: 15,
    modifier: 2,
    hp: 5,
  },
  {
    label: "Horned Devil",
    dex: 17,
    modifier: 3,
    hp: 148,
  },
  {
    label: "Hunter Shark",
    dex: 13,
    modifier: 1,
    hp: 45,
  },
  {
    label: "Hydra",
    dex: 12,
    modifier: 1,
    hp: 172,
  },
  {
    label: "Hyena",
    dex: 13,
    modifier: 1,
    hp: 5,
  },
  {
    label: "Ice Devil",
    dex: 14,
    modifier: 2,
    hp: 180,
  },
  {
    label: "Ice Mephit",
    dex: 13,
    modifier: 1,
    hp: 21,
  },
  {
    label: "Imp",
    dex: 17,
    modifier: 3,
    hp: 10,
  },
  {
    label: "Invisible Stalker",
    dex: 19,
    modifier: 4,
    hp: 104,
  },
  {
    label: "Iron Golem",
    dex: 9,
    modifier: -1,
    hp: 210,
  },
  {
    label: "Jackal",
    dex: 15,
    modifier: 2,
    hp: 3,
  },
  {
    label: "Killer Whale",
    dex: 10,
    modifier: 0,
    hp: 90,
  },
  {
    label: "Knight",
    dex: 11,
    modifier: 0,
    hp: 52,
  },
  {
    label: "Kobold",
    dex: 15,
    modifier: 2,
    hp: 5,
  },
  {
    label: "Kraken",
    dex: 11,
    modifier: 0,
    hp: 472,
  },
  {
    label: "Lamia",
    dex: 13,
    modifier: 1,
    hp: 97,
  },
  {
    label: "Lemure",
    dex: 5,
    modifier: -3,
    hp: 13,
  },
  {
    label: "Lich",
    dex: 16,
    modifier: 3,
    hp: 135,
  },
  {
    label: "Lion",
    dex: 15,
    modifier: 2,
    hp: 26,
  },
  {
    label: "Lizard",
    dex: 11,
    modifier: 0,
    hp: 2,
  },
  {
    label: "Lizardfolk",
    dex: 10,
    modifier: 0,
    hp: 22,
  },
  {
    label: "Mage",
    dex: 14,
    modifier: 2,
    hp: 40,
  },
  {
    label: "Magma Mephit",
    dex: 12,
    modifier: 1,
    hp: 22,
  },
  {
    label: "Magmin",
    dex: 15,
    modifier: 2,
    hp: 9,
  },
  {
    label: "Mammoth",
    dex: 9,
    modifier: -1,
    hp: 126,
  },
  {
    label: "Manticore",
    dex: 16,
    modifier: 3,
    hp: 68,
  },
  {
    label: "Marilith",
    dex: 20,
    modifier: 5,
    hp: 189,
  },
  {
    label: "Mastiff",
    dex: 14,
    modifier: 2,
    hp: 5,
  },
  {
    label: "Medusa",
    dex: 15,
    modifier: 2,
    hp: 127,
  },
  {
    label: "Merfolk",
    dex: 13,
    modifier: 1,
    hp: 11,
  },
  {
    label: "Merrow",
    dex: 10,
    modifier: 0,
    hp: 45,
  },
  {
    label: "Mimic",
    dex: 12,
    modifier: 1,
    hp: 58,
  },
  {
    label: "Minotaur",
    dex: 11,
    modifier: 0,
    hp: 76,
  },
  {
    label: "Minotaur Skeleton",
    dex: 11,
    modifier: 0,
    hp: 67,
  },
  {
    label: "Mule",
    dex: 10,
    modifier: 0,
    hp: 11,
  },
  {
    label: "Mummy",
    dex: 8,
    modifier: -1,
    hp: 58,
  },
  {
    label: "Mummy Lord",
    dex: 10,
    modifier: 0,
    hp: 97,
  },
  {
    label: "Nalfeshnee",
    dex: 10,
    modifier: 0,
    hp: 184,
  },
  {
    label: "Night Hag",
    dex: 15,
    modifier: 2,
    hp: 112,
  },
  {
    label: "Nightmare",
    dex: 15,
    modifier: 2,
    hp: 68,
  },
  {
    label: "Noble",
    dex: 12,
    modifier: 1,
    hp: 9,
  },
  {
    label: "Ochre Jelly",
    dex: 6,
    modifier: -2,
    hp: 45,
  },
  {
    label: "Octopus",
    dex: 15,
    modifier: 2,
    hp: 3,
  },
  {
    label: "Ogre",
    dex: 8,
    modifier: -1,
    hp: 59,
  },
  {
    label: "Ogre Zombie",
    dex: 6,
    modifier: -2,
    hp: 85,
  },
  {
    label: "Oni",
    dex: 11,
    modifier: 0,
    hp: 110,
  },
  {
    label: "Orc",
    dex: 12,
    modifier: 1,
    hp: 15,
  },
  {
    label: "Otyugh",
    dex: 11,
    modifier: 0,
    hp: 114,
  },
  {
    label: "Owl",
    dex: 13,
    modifier: 1,
    hp: 1,
  },
  {
    label: "Owlbear",
    dex: 12,
    modifier: 1,
    hp: 59,
  },
  {
    label: "Panther",
    dex: 15,
    modifier: 2,
    hp: 13,
  },
  {
    label: "Pegasus",
    dex: 15,
    modifier: 2,
    hp: 59,
  },
  {
    label: "Phase Spider",
    dex: 15,
    modifier: 2,
    hp: 32,
  },
  {
    label: "Pit Fiend",
    dex: 14,
    modifier: 2,
    hp: 300,
  },
  {
    label: "Planetar",
    dex: 20,
    modifier: 5,
    hp: 200,
  },
  {
    label: "Plesiosaurus",
    dex: 15,
    modifier: 2,
    hp: 68,
  },
  {
    label: "Poisonous Snake",
    dex: 16,
    modifier: 3,
    hp: 2,
  },
  {
    label: "Polar Bear",
    dex: 10,
    modifier: 0,
    hp: 42,
  },
  {
    label: "Pony",
    dex: 10,
    modifier: 0,
    hp: 11,
  },
  {
    label: "Priest",
    dex: 10,
    modifier: 0,
    hp: 27,
  },
  {
    label: "Pseudodragon",
    dex: 15,
    modifier: 2,
    hp: 7,
  },
  {
    label: "Purple Worm",
    dex: 7,
    modifier: -2,
    hp: 247,
  },
  {
    label: "Quasit",
    dex: 17,
    modifier: 3,
    hp: 7,
  },
  {
    label: "Quipper",
    dex: 16,
    modifier: 3,
    hp: 1,
  },
  {
    label: "Rakshasa",
    dex: 17,
    modifier: 3,
    hp: 110,
  },
  {
    label: "Rat",
    dex: 11,
    modifier: 0,
    hp: 1,
  },
  {
    label: "Raven",
    dex: 14,
    modifier: 2,
    hp: 1,
  },
  {
    label: "Red Dragon Wyrmling",
    dex: 10,
    modifier: 0,
    hp: 75,
  },
  {
    label: "Reef Shark",
    dex: 13,
    modifier: 1,
    hp: 22,
  },
  {
    label: "Remorhaz",
    dex: 13,
    modifier: 1,
    hp: 195,
  },
  {
    label: "Rhinoceros",
    dex: 8,
    modifier: -1,
    hp: 45,
  },
  {
    label: "Riding Horse",
    dex: 10,
    modifier: 0,
    hp: 13,
  },
  {
    label: "Roc",
    dex: 10,
    modifier: 0,
    hp: 248,
  },
  {
    label: "Roper",
    dex: 8,
    modifier: -1,
    hp: 93,
  },
  {
    label: "Rug of Smothering",
    dex: 14,
    modifier: 2,
    hp: 33,
  },
  {
    label: "Rust Monster",
    dex: 12,
    modifier: 1,
    hp: 27,
  },
  {
    label: "Saber-Toothed Tiger",
    dex: 14,
    modifier: 2,
    hp: 52,
  },
  {
    label: "Sahuagin",
    dex: 11,
    modifier: 0,
    hp: 22,
  },
  {
    label: "Salamander",
    dex: 14,
    modifier: 2,
    hp: 90,
  },
  {
    label: "Satyr",
    dex: 16,
    modifier: 3,
    hp: 31,
  },
  {
    label: "Scorpion",
    dex: 11,
    modifier: 0,
    hp: 1,
  },
  {
    label: "Scout",
    dex: 14,
    modifier: 2,
    hp: 16,
  },
  {
    label: "Sea Hag",
    dex: 13,
    modifier: 1,
    hp: 52,
  },
  {
    label: "Sea Horse",
    dex: 12,
    modifier: 1,
    hp: 1,
  },
  {
    label: "Shadow",
    dex: 14,
    modifier: 2,
    hp: 16,
  },
  {
    label: "Shambling Mound",
    dex: 8,
    modifier: -1,
    hp: 136,
  },
  {
    label: "Shield Guardian",
    dex: 8,
    modifier: -1,
    hp: 142,
  },
  {
    label: "Shrieker",
    dex: 1,
    modifier: -5,
    hp: 13,
  },
  {
    label: "Silver Dragon Wyrmling",
    dex: 10,
    modifier: 0,
    hp: 45,
  },
  {
    label: "Skeleton",
    dex: 14,
    modifier: 2,
    hp: 13,
  },
  {
    label: "Solar",
    dex: 22,
    modifier: 6,
    hp: 243,
  },
  {
    label: "Specter",
    dex: 14,
    modifier: 2,
    hp: 22,
  },
  {
    label: "Spider",
    dex: 14,
    modifier: 2,
    hp: 1,
  },
  {
    label: "Spirit Naga",
    dex: 17,
    modifier: 3,
    hp: 75,
  },
  {
    label: "Sprite",
    dex: 18,
    modifier: 4,
    hp: 2,
  },
  {
    label: "Spy",
    dex: 15,
    modifier: 2,
    hp: 27,
  },
  {
    label: "Steam Mephit",
    dex: 11,
    modifier: 0,
    hp: 21,
  },
  {
    label: "Stirge",
    dex: 16,
    modifier: 3,
    hp: 2,
  },
  {
    label: "Stone Giant",
    dex: 15,
    modifier: 2,
    hp: 126,
  },
  {
    label: "Stone Golem",
    dex: 9,
    modifier: -1,
    hp: 178,
  },
  {
    label: "Storm Giant",
    dex: 14,
    modifier: 2,
    hp: 230,
  },
  {
    label: "Succubus/Incubus",
    dex: 17,
    modifier: 3,
    hp: 66,
  },
  {
    label: "Swarm of Bats",
    dex: 15,
    modifier: 2,
    hp: 22,
  },
  {
    label: "Swarm of Beetles",
    dex: 13,
    modifier: 1,
    hp: 22,
  },
  {
    label: "Swarm of Centipedes",
    dex: 13,
    modifier: 1,
    hp: 22,
  },
  {
    label: "Swarm of Insects",
    dex: 13,
    modifier: 1,
    hp: 22,
  },
  {
    label: "Swarm of Poisonous Snakes",
    dex: 18,
    modifier: 4,
    hp: 36,
  },
  {
    label: "Swarm of Quippers",
    dex: 16,
    modifier: 3,
    hp: 28,
  },
  {
    label: "Swarm of Rats",
    dex: 11,
    modifier: 0,
    hp: 24,
  },
  {
    label: "Swarm of Ravens",
    dex: 14,
    modifier: 2,
    hp: 24,
  },
  {
    label: "Swarm of Spiders",
    dex: 13,
    modifier: 1,
    hp: 22,
  },
  {
    label: "Swarm of Wasps",
    dex: 13,
    modifier: 1,
    hp: 22,
  },
  {
    label: "Tarrasque",
    dex: 11,
    modifier: 0,
    hp: 676,
  },
  {
    label: "Thug",
    dex: 11,
    modifier: 0,
    hp: 32,
  },
  {
    label: "Tiger",
    dex: 15,
    modifier: 2,
    hp: 37,
  },
  {
    label: "Treant",
    dex: 8,
    modifier: -1,
    hp: 138,
  },
  {
    label: "Tribal Warrior",
    dex: 11,
    modifier: 0,
    hp: 11,
  },
  {
    label: "Triceratops",
    dex: 9,
    modifier: -1,
    hp: 95,
  },
  {
    label: "Troll",
    dex: 13,
    modifier: 1,
    hp: 84,
  },
  {
    label: "Tyrannosaurus Rex",
    dex: 10,
    modifier: 0,
    hp: 136,
  },
  {
    label: "Unicorn",
    dex: 14,
    modifier: 2,
    hp: 67,
  },
  {
    label: "Vampire",
    dex: 18,
    modifier: 4,
    hp: 144,
  },
  {
    label: "Vampire Spawn",
    dex: 16,
    modifier: 3,
    hp: 82,
  },
  {
    label: "Veteran",
    dex: 13,
    modifier: 1,
    hp: 58,
  },
  {
    label: "Violet Fungus",
    dex: 1,
    modifier: -5,
    hp: 18,
  },
  {
    label: "Vrock",
    dex: 15,
    modifier: 2,
    hp: 104,
  },
  {
    label: "Vulture",
    dex: 10,
    modifier: 0,
    hp: 5,
  },
  {
    label: "Warhorse",
    dex: 12,
    modifier: 1,
    hp: 19,
  },
  {
    label: "Warhorse Skeleton",
    dex: 12,
    modifier: 1,
    hp: 22,
  },
  {
    label: "Water Elemental",
    dex: 14,
    modifier: 2,
    hp: 114,
  },
  {
    label: "Weasel",
    dex: 16,
    modifier: 3,
    hp: 1,
  },
  {
    label: "Werebear",
    dex: 10,
    modifier: 0,
    hp: 135,
  },
  {
    label: "Wereboar",
    dex: 10,
    modifier: 0,
    hp: 78,
  },
  {
    label: "Wererat",
    dex: 15,
    modifier: 2,
    hp: 33,
  },
  {
    label: "Weretiger",
    dex: 15,
    modifier: 2,
    hp: 120,
  },
  {
    label: "Werewolf",
    dex: 13,
    modifier: 1,
    hp: 58,
  },
  {
    label: "White Dragon Wyrmling",
    dex: 10,
    modifier: 0,
    hp: 32,
  },
  {
    label: "Wight",
    dex: 14,
    modifier: 2,
    hp: 45,
  },
  {
    label: "Will-o'-Wisp",
    dex: 28,
    modifier: 9,
    hp: 22,
  },
  {
    label: "Winter Wolf",
    dex: 13,
    modifier: 1,
    hp: 75,
  },
  {
    label: "Wolf",
    dex: 15,
    modifier: 2,
    hp: 11,
  },
  {
    label: "Worg",
    dex: 13,
    modifier: 1,
    hp: 26,
  },
  {
    label: "Wraith",
    dex: 16,
    modifier: 3,
    hp: 67,
  },
  {
    label: "Wyvern",
    dex: 10,
    modifier: 0,
    hp: 110,
  },
  {
    label: "Xorn",
    dex: 10,
    modifier: 0,
    hp: 73,
  },
  {
    label: "Young Black Dragon",
    dex: 14,
    modifier: 2,
    hp: 127,
  },
  {
    label: "Young Blue Dragon",
    dex: 10,
    modifier: 0,
    hp: 152,
  },
  {
    label: "Young Brass Dragon",
    dex: 10,
    modifier: 0,
    hp: 110,
  },
  {
    label: "Young Bronze Dragon",
    dex: 10,
    modifier: 0,
    hp: 142,
  },
  {
    label: "Young Copper Dragon",
    dex: 12,
    modifier: 1,
    hp: 119,
  },
  {
    label: "Young Gold Dragon",
    dex: 14,
    modifier: 2,
    hp: 178,
  },
  {
    label: "Young Green Dragon",
    dex: 12,
    modifier: 1,
    hp: 136,
  },
  {
    label: "Young Red Dragon",
    dex: 10,
    modifier: 0,
    hp: 178,
  },
  {
    label: "Young Silver Dragon",
    dex: 10,
    modifier: 0,
    hp: 168,
  },
  {
    label: "Young White Dragon",
    dex: 10,
    modifier: 0,
    hp: 133,
  },
  {
    label: "Zombie",
    dex: 6,
    modifier: -2,
    hp: 22,
  },
];

export const Battle = (props) => {
  return (
    <StoreContext.Consumer>
      {(store) => (
        <div>
          <form className="pure-form battle-form" onSubmit={handleUserInput}>
            {/* <input
              type="text"
              name="creature_name"
              placeholder="Name"
              id="creature"
            /> */}
            
            <Autocomplete
              suggestions={monstersInitHPDB.map((entry) => entry.label)}
            />

            <select name="team" required>
              <option value="" disabled selected>
                Team
              </option>
              <option style={{ color: "blue" }} value="Blue">
                PCs
              </option>
              <option style={{ color: "red" }} value="Red">
                Enemies
              </option>
            </select>
            <input
              type="text"
              name="initiative_roll"
              placeholder="Initiative roll"
              // onWheel={rollInitiative}
            />
            <input type="text" name="hit_points" placeholder="Hit points" />
            <button type="submit" className="pure-button pure-button-primary">
              ADD
            </button>
          </form>
          {_Store.getState().battle.length >= 1 && (
            <>
              <table className="pure-table battle-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Initiative</th>
                    <th>HP</th>
                    <th>State</th>
                  </tr>
                </thead>
                {_Store
                  .getState()
                  .battle.sort(initiative)
                  .map((item) => (
                    <tr>
                      <td>{_Store.getState().battle.indexOf(item) + 1}</td>
                      <td>{item.creature_name}</td>
                      <td>{item.initiative_roll}</td>
                      <td>
                        <div contentEditable>{item.hit_points}</div>
                      </td>
                      <td>
                        <div contentEditable>-</div>
                      </td>
                    </tr>
                  ))}
              </table>

              <div id="battleground">
                <div>
                  {_Store.getState().battle.map((item) => (
                    <Avatar
                      name={generateAvatarName(item.creature_name)}
                      team={item.team}
                    />
                  ))}
                </div>
              </div>

              <div className="battle-reset">
                <button
                  type="submit"
                  className="pure-button"
                  onClick={() => _Store.dispatch({ type: "RESET_BATTLE" })}
                >
                  Reset battle
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </StoreContext.Consumer>
  );
};
