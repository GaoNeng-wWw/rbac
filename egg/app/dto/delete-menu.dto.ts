export const deleteMenu = {
  id: 'int',
  name: 'string?',
} as const;

export type DeleteMenu = {
  id:number;
  name?:string;
};
