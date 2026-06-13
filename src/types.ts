export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export type JsonObject = { [key: string]: JsonValue };

export interface SearchSection {
  section: string;
  entries: string[];
}

export interface ApiSearchSection {
  section: string;
  results: Array<{ result: { name: string } }>;
}

export interface BattleDraft {
  creature_name: string;
  initiative_roll: string;
  hit_points: string;
  team: string;
  creature_birthName: string;
}

export interface BattleEntry extends BattleDraft {
  id: string;
}

export interface AppState {
  query: string;
  db: SearchSection[] | null;
  popupdata: JsonObject | null;
  click: boolean;
  path: string;
  battle: BattleEntry[];
}

export type AppAction =
  | { type: "QUERY"; payload: string }
  | { type: "GETDATA_DB"; payload: SearchSection[] }
  | { type: "GETDATA_POPUP"; payload: JsonObject }
  | { type: "CLICK"; payload: string }
  | { type: "BATTLE"; payload: BattleDraft[] }
  | { type: "RESET_BATTLE" };

export interface ResourceSummary {
  overview: string;
  sections: Array<{ heading: string; facts: string[] }>;
  caveats: string[];
}
