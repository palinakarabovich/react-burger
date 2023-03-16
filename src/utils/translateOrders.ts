import { TMessage } from "../services/slices/ordersAllSlice";

export const translateOrders = (data: TMessage) => {
  data.orders.forEach((o) => {
    o.name = o.name
      .replace(/люминесцентный/ig, 'luminescent')
      .replace(/флюоресцентный/ig, 'fluorescent')
      .replace(/фалленианский/ig, 'fallenian')
      .replace(/антарианский/ig, 'antarian')
      .replace(/краторный/ig, 'crater')
      .replace(/экзо-плантаго/ig, 'exo-plantago')
      .replace(/минеральный/ig, 'mineral')
      .replace(/астероидный/ig, 'asteroid')
      .replace(/бессмертный/ig, 'immortal')
      .replace(/альфа-сахаридный/ig, 'alpha-saccharide')
      .replace(/метеоритный/ig, 'meteoritic')
      .replace(/био-марсианский/ig, 'bio-martian')
      .replace(/традиционный-галактический/ig, 'traditional-galactic')
      .replace(/бургер/ig, 'burger');
      o.name = o.name.replace(o.name[0], o.name[0].toUpperCase());
  })
  return data;
}