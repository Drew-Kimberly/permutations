export type Permutable = Record<MapKeys, any>;

export type Permutation = Record<MapKeys, AnyExceptArray>;

// Helper Types
type MapKeys = string | number;
type AnyExceptArray = Exclude<any, []>;
