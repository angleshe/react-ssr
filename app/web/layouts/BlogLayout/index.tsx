import React, { ReactNode } from 'react';
import User from './component/user';
import styles from './index.less';
import Advertisement from './component/advertisement';
import { BackTop } from 'antd';
import FontIcon, { FontIconType } from 'web/components/FontIcon';
import { ResCode } from 'app/dto/ResponseMessageModel';
import { IBloggerInfo } from 'app/dto/BloggerInfoDto';
import { getBlogger } from 'web/services/blogger';
// import { connect } from 'dva';
import { IPropsDispatch } from 'web/models/connect';

class BlogLayout extends React.Component<(IBloggerInfo | undefined) & IPropsDispatch> {
  constructor(p: Readonly<IBloggerInfo & IPropsDispatch>) {
    super(p);
    if (!this.props.uid) {
      this.props.dispatch({
        type: 'global/setServerError'
      });
    }
  }
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
  public static async getInitialProps(params: any): Promise<IBloggerInfo | undefined> {
    const { code, data } = await getBlogger();
    // console.log(params.store);
    // await params.store.dispatch({
    //   type: 'blogger/getBloggerInfo',
    //   location: params.location
    // });
    // return undefined;
    if (code === ResCode.success) {
      return data;
    }
    return undefined;
  }
  // public componentDidMount(): void {
  //   this.props.dispatch({
  //     type: 'blogger/getBloggerInfo'
  //   });
  // }
}

// export default connect(({ blogger, loading }: IConnectState) => ({
//   ...blogger,
//   loading: loading.effects['blogger/getBloggerInfo']
// }))(BlogLayout);
export default BlogLayout;
