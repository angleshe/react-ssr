import styles from './user.less';
import { formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
/**
 * 用户信息组件
 */
const user: React.FC = () => (
  <div className={styles.user}>
    <div className={styles.face}>
      <img
        src={require('web/assets/user.png')}
        alt={formatMessage({ id: 'user.faceImage' })}
        className={styles.img}
      />
    </div>
    <div className={styles.nickname}>angle</div>
    <ul className={styles.info}>
      <li className={styles['info-line']}>我们写的不只是代码</li>
      <li className={styles['info-line']}>而是我们读过的书</li>
      <li className={styles['info-line']}>看过的电影</li>
      <li className={styles['info-line']}>听过的音乐</li>
      <li className={styles['info-line']}>走过的路</li>
      <li className={styles['info-line']}>爱过的人</li>
    </ul>
  </div>
);
export default user;
