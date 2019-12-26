import React from 'react';
import User from './component/user';
import styles from './index.less';
import Advertisement from './component/advertisement';
import { BackTop } from 'antd';
import FontIcon, { FontIconType } from 'web/components/FontIcon';

const BlogLayout: React.FC = (props) => (
  <div className={styles['blog-layout']}>
    <header className={styles.header}></header>
    <div className={styles.container}>
      <div className={styles['main-container']}>{props.children}</div>
      <ul className={styles['side-bar']}>
        <li className={styles['bar-item']}>
          <User nikckname="angle" faceImg="" />
        </li>
        <li className={styles['bar-item']}>
          <Advertisement
            src={require('web/assets/home_blog_guangtu@2x.png')}
            url="https://www.baidu.com"
            alt="百度"
          />
        </li>
      </ul>
    </div>
    <BackTop className={styles['side-tools']}>
      <FontIcon type={FontIconType.topping} className={styles['go-to-icon']} />
    </BackTop>
  </div>
);

export default BlogLayout;
