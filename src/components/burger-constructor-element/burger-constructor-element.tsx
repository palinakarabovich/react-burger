import burgerConstructorElementStyles from './burger-constructor-element.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import React from 'react';
import { changeIngredientsOrder } from '../../services/slices/constructorSlice';
import { TIngredientDrag, DraggableTypes } from '../../types';

const BurgerConstructorElement: React.FunctionComponent<TIngredientDrag> = ({ type, ingredient, index, handleClose, isLocked, isDrag }) => {

  const ref = React.useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const [{ opacity }, drag] = useDrag({
    type: DraggableTypes.constructorIngredients,
    item: { index } as TIngredientDrag,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    }),
  });

  const [{ border }, drop] = useDrop({
    accept: DraggableTypes.constructorIngredients,
    drop(item: TIngredientDrag) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      } else {
        dispatch(changeIngredientsOrder([dragIndex, hoverIndex]))
      }
    },
    collect: monitor => ({
      border: monitor.isOver() ? '2px solid #4C4CFF' : '',
    })
  });

  isDrag && drag(drop(ref));

  return (
    <div draggable className={burgerConstructorElementStyles.element} style={{ opacity, border }} ref={ref}>
      <ConstructorElement
        type={type}
        text={`${ingredient.name}${type === 'bottom' ? ' (низ)' : type === 'top' ? ' (вверх)' : ''}`}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleClose}
        isLocked={isLocked}
      />
    </div>
  )
};

export default BurgerConstructorElement;