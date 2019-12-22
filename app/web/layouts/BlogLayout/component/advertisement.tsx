import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './advertisement.less';
/**
 * 广告位
 */
const advertisement: React.FC = () => (
  <div className={styles.advertisement}>
    <img
      src={require('web/assets/home_blog_guangtu@2x.png')}
      className={styles.img}
      alt={formatMessage({ id: 'advertisement.adv' })}
    />
  </div>
);
export default advertisement;
