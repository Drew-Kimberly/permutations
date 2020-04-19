export type Permutable = Record<MapKeys, any>;

export type Permutation = Record<MapKeys, AnyExceptArray>;

export type ComplexPermutable = Record<MapKeys, []>;

export type SplitPermutable = {
  permutation: Permutation;
  permutable: ComplexPermutable;
};

// Helper Types
export type MapKeys = string | number;
export type AnyExceptArray = Exclude<any, []>;
