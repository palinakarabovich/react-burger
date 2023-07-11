import { Dispatch, SetStateAction } from "react";

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
  };
  body?: string;
  mode?: string,
  cache?: string,
  credentials?: string,
};

export interface IOrder {
  ingredients: Array<string>;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IUser {
  name?: string;
  email?: string;
  password?: string;
}

export interface IOrderSubmitted {
success: boolean;
name: string;
order: IOrder;
}

export interface INav {
  constructor: boolean;
  orders: boolean;
  profile: boolean;
  ordersHistory?: boolean;
}

export interface INavProps {
  location: INav,
  menu?: boolean,
  setMenu?: Dispatch<SetStateAction<boolean>>;
}


