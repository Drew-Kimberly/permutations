export type Permutable = Record<MapKeys, any>;
export type PermutableArrayValue = [KeyOf<Permutable>, ValueOf<Permutable>];
export type PermutableArray = PermutableArrayValue[];

export type Permutation = Permutable;
export type PermutationArrayValue = [KeyOf<Permutation>, ValueOf<Permutation>];
export type PermutationArray = PermutationArrayValue[];

// Helper Types
export type MapKeys = string | number;
export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
