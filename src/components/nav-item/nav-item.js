import navItemStyles from './nav-item.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const NavItem = ({ Icon, description, active }) => {

  const [isActive, setIsActive] = React.useState(false);

  const onMouseEnter = () => {
    setIsActive(true);
  }

  const onMouseLeave = () => {
    setIsActive(false);
  }

  return (
    <a className={`${navItemStyles.link} ${active || isActive ? navItemStyles.linkActive : ''}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Icon type={`${isActive || active ? 'primary' : 'secondary'}`} />
      <p className={navItemStyles.description}>{description}</p>
    </a>
  )
}

export default NavItem;

NavItem.propTypes = {
  Icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  description: PropTypes.string,
  active: PropTypes.bool
}



