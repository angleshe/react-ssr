import React, { ReactNode } from 'react';
import { connect } from 'dva';

interface IBaseLyaout {
  isServerError: boolean;
}
interface IConnectState {
  global: {
    serverError: boolean;
  };
}
@(connect(({ global }: IConnectState) => ({
  isServerError: global.serverError
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
})) as any)
export default class BaseLayout extends React.Component<IBaseLyaout> {
  public render(): ReactNode {
    return <div>{this.props.isServerError ? 'serverError' : '???'}</div>;
  }
}
