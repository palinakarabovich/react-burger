import { TIngredient } from "../types";

export const translateIngredients = (ingredients: TIngredient[]) : TIngredient[] => {
  ingredients.forEach((i) => {
    if(i.name === 'Флюоресцентная булка R2-D3'){
      i.name = 'Fluorescent bun R2-D3'
    }
    if(i.name === 'Краторная булка N-200i'){
      i.name = 'Moon crater bun N-200i'
    }
    if(i.name === 'Филе Люминесцентного тетраодонтимформа'){
      i.name = 'Fillet of Luminescent Tetraodontimform'
    }
    if(i.name === 'Мясо бессмертных моллюсков Protostomia'){
      i.name = 'Meat of immortal shellfish Protostomia'
    }
    if(i.name === 'Говяжий метеорит (отбивная)'){
      i.name = 'Beef meteorite (chops)'
    }
    if(i.name === 'Биокотлета из марсианской Магнолии'){
      i.name = 'Bio Martian Magnolia Cutlet'
    }
    if(i.name === 'Соус Spicy-X'){
      i.name = 'Sauce Spicy-X'
    }
    if(i.name === 'Соус фирменный Space Sauce'){
      i.name = 'Special Space sause'
    }
    if(i.name === 'Соус традиционный галактический'){
      i.name = 'Traditional Galactic sause'
    }
    if(i.name === 'Соус с шипами Антарианского плоскоходца'){
      i.name = 'Antarian Flatwalker Spiked Sauce'
    }
    if(i.name === 'Хрустящие минеральные кольца'){
      i.name = 'Crispy Mineral Rings'
    }
    if(i.name === 'Плоды Фалленианского дерева'){
      i.name = 'The fruits of the fallenian tree'
    }
    if(i.name === 'Кристаллы марсианских альфа-сахаридов'){
      i.name = 'Crystals of martian alpha saccharides'
    }
    if(i.name === 'Мини-салат Экзо-Плантаго'){
      i.name = 'Mini salad Exo-Plantago'
    }
    if(i.name === 'Сыр с астероидной плесенью'){
      i.name = 'Cheese with asteroid pieces'
    }
  })
  return ingredients;
}