export type ParticalRetHelper<T extends {
  type: string
  [u: string]: string
}> = {
  [k in keyof T]: k extends 'type' ?
    `${T[k]}?`
    : T[k]
} & {};
export type ParticalRet<T extends {
  [x:string]: string | {
    type: string
    [u: string]: string
  }
}> = {
  [k in keyof T]: T[k] extends string ?
    T[k] extends `${T[k]}?` ?
      T[k]
      :`${T[k]}?`
    : T[k] extends { type: string; [u: string]: string; } ? ParticalRetHelper<T[k]>
      : never
} & {};
export const partical = <
  T extends Record<string, string | {type: string}>
  // T extends {[x:string]: string | {type: string}}
>(val:T): ParticalRet<T> => {
  const obj = Object.create(null);
  for (const [ key, value ] of Object.entries(val)) {
    if (typeof value === 'string') {
      obj[key] = value.endsWith('?') ? value : `${value}?`;
    }
    if (value instanceof Object) {
      if ('type' in value) {
        value.type = value.type.endsWith('?') ? value.type : `${value.type}?`;
      }
      obj[key] = value;
    }
  }
  return obj;
};
