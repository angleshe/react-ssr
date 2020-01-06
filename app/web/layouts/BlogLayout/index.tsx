import React, { ReactNode } from 'react';
import User from './component/user';
import styles from './index.less';
import Advertisement from './component/advertisement';
import { BackTop } from 'antd';
import FontIcon, { FontIconType } from 'web/components/FontIcon';
import { ResCode } from 'app/dto/ResponseMessageModel';
import { IBloggerInfo } from 'app/dto/BloggerInfoDto';
import { getBlogger } from 'web/services/blogger';
export default class BlogLayout extends React.Component<IBloggerInfo> {
  public render(): ReactNode {
    return (
      <div className={styles['blog-layout']}>
        <header className={styles.header}></header>
        <div className={styles.container}>
          <div className={styles['main-container']}>{this.props.children}</div>
          <ul className={styles['side-bar']}>
            <li className={styles['bar-item']}>
              <User nikckname={this.props.nickname} faceImg={this.props.faceImg} />
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
  }
  public static async getInitialProps(arg): Promise<IBloggerInfo | undefined> {
    console.log(arg.context.redirect);
    const { code, data } = await getBlogger();
    if (code === ResCode.success) {
      console.log(data);
      return data;
    }
    return undefined;
  }
}
