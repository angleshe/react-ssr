import assert from 'assert';
import styles from '../user.less';
import renderer, { ReactTestRenderer, ReactTestInstance } from 'react-test-renderer';
import React from 'react';
jest.mock('umi-plugin-react/locale', () => ({
  formatMessage({ id }: { id: string }): string {
    if (id === 'user.faceImage') {
      return 'faceImage';
    }
    return '';
  }
}));
import User from '../user';
describe('web/layout/BlogLayout/component/user', () => {
  it('ui测试', () => {
    const wrapper: ReactTestRenderer = renderer.create(
      <User faceImg="faceImg" nikckname="userName" />
    );
    const root: ReactTestInstance = wrapper.root;
    const imgTestInstance: ReactTestInstance = root.find(
      (node) => node.type === 'img' && node.props.className === styles.img
    );
    assert.strictEqual(imgTestInstance.props.src, 'faceImg');
    assert.strictEqual(imgTestInstance.props.alt, 'faceImage');
    assert.strictEqual(
      root.find((node) => node.type === 'div' && node.props.className === styles.nickname)
        .children[0],
      'userName'
    );
  });
});
