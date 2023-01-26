export enum IngredientType {
  bun = 'bun',
  sauce = 'sauce',
  main = 'main',
}

export type TIngredient = {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
};

export type TIngredientDrag = {
  type?: "top" | "bottom" | undefined;
  ingredient: TIngredient;
  index?: number;
  handleClose?: () => void;
  isLocked?: boolean;
  isDrag?: boolean;
}

export enum DraggableTypes {
  constructorIngredients = 'constructorIngredients',
  ingredients = 'ingredients'
}

export type TCheckTokenHeader = {
  method: string;
  headers: {
    [key: string]: string;
    authorization: string;
  }
};