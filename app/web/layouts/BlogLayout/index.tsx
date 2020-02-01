import React, { ReactNode } from 'react';
import User from './component/user';
import styles from './index.less';
import Advertisement from './component/advertisement';
import { BackTop } from 'antd';
import FontIcon, { FontIconType } from 'web/components/FontIcon';
import { IBloggerInfo } from 'app/dto/BloggerInfoDto';
import { connect } from 'dva';
import { IConnectState } from 'web/models/connect';
import { IBloggerModelState } from 'web/models/blogger';
class BlogLayout extends React.Component<IBloggerModelState> {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async getInitialProps(params: any): Promise<IBloggerInfo | void> {
    return await params.store.dispatch({
      type: 'blogger/getBloggerInfo',
      location: params.location
    });
  }
}

export default connect(({ blogger }: IConnectState) => ({
  ...blogger
}))(BlogLayout);
// export default connect()(BlogLayout);
