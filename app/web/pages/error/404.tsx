import React from 'react';
import styles from './style.less';
import { formatMessage } from 'umi-plugin-react/locale';
import { Helmet } from 'react-helmet';
import Link from 'umi/link';
const errorPage: React.FC = () => (
  <div className={styles.error}>
    <Helmet>
      <title>404</title>
    </Helmet>
    <div className={styles.container}>
      <img src={require('web/assets/404@2x.png')} alt="404" className={styles.img} />
      <div className={styles.title}>{formatMessage({ id: 'error404.title' })}</div>
      <div className={styles.info}>{formatMessage({ id: 'error404.info' })}</div>
      <Link to="/" className="main-btn">
        {formatMessage({ id: 'error.goHome' })}
      </Link>
    </div>
  </div>
);
export default errorPage;
