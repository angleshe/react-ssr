import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { IConnectState } from 'web/models/connect';
import ErrorPage from 'web/pages/error/500';

interface IBaseLyaout {
  isServerError: boolean;
}
class BaseLayout extends React.Component<IBaseLyaout> {
  public render(): ReactNode {
    return <div>{this.props.isServerError ? <ErrorPage /> : this.props.children}</div>;
  }
}
export default connect(({ global }: IConnectState) => ({
  isServerError: global.serverError
}))(BaseLayout);
