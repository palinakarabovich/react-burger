import navItemStyles from './nav-item.module.css';
import React from 'react';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

interface INavItemProps {
  Icon: ({ type }: TIconProps) => JSX.Element
  description: string;
  active?: boolean;
}

const NavItem: React.FunctionComponent<INavItemProps> = ({ Icon, description, active }) => {

  const [isActive, setIsActive] = React.useState<boolean>(false);

  const onMouseEnter = () => {
    setIsActive(true);
  }

  const onMouseLeave = () => {
    setIsActive(false);
  }

  return (
    <div className={`${navItemStyles.link} ${active || isActive ? navItemStyles.linkActive : ''}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Icon type={`${isActive || active ? 'primary' : 'secondary'}`} />
      <p className={navItemStyles.description}>{description}</p>
    </div>
  )
}

export default NavItem;


