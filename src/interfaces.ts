export type Permutable = Record<MapKeys, any>;

export type Permutation = Record<MapKeys, AnyExceptArray>;

// Helper Types
export type MapKeys = string | number;
export type AnyExceptArray = Exclude<any, []>;
