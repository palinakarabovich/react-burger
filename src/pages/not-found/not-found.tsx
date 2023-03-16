import notFoundStyles from './not-found.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  const onClick = () => {
    history.goBack();
  }

  return (
    <div className={notFoundStyles.container}>
      <h2 className={notFoundStyles.title}>404</h2>
      <p className={notFoundStyles.caption}>There is nothing here</p>
      <Button htmlType="button" type="secondary" size="medium" onClick={onClick}>
        Back
      </Button>
    </div>
  )
}

export default NotFound;