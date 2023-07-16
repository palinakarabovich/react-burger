import burgerConstructorElementStyles from './burger-constructor-element.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd'
import React from 'react';
import { changeIngredientsOrder } from '../../services/slices/constructorSlice';
import { TIngredientDrag, DraggableTypes } from '../../types';
import { useTypedDispatch } from '../../services';
import { getCurrentDimension } from '../../utils/getCurrentDemention';
import ConsctructorElementMobile from '../constructor-element-mobile/constructor-element-mobile';

const BurgerConstructorElement: React.FunctionComponent<TIngredientDrag> = ({ type, ingredient, index, handleClose, isLocked, isDrag }) => {

  const ref = React.useRef<HTMLDivElement>(null)
  const dispatch = useTypedDispatch();
  const [screenSize, setScreenSize] = React.useState(getCurrentDimension());

  React.useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const resizeHandler = () => {
    setScreenSize(getCurrentDimension())
  }

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
        if (dragIndex !== undefined && hoverIndex !== undefined)
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
      {
        screenSize.width > 1100
          ?
          <ConstructorElement
            type={type}
            text={`${ingredient.name}${type === 'bottom' ? ' (bottom)' : type === 'top' ? ' (top)' : ''}`}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={handleClose}
            isLocked={isLocked}
          />
          : <ConsctructorElementMobile
            ingredient={ingredient}
            type={type}
          />
      }
    </div>
  )
};

export default BurgerConstructorElement;