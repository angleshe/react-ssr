import styles from '../advertisement.less';
import renderer, { ReactTestRenderer, ReactTestInstance } from 'react-test-renderer';
import assert from 'assert';
import React from 'react';
jest.mock('umi-plugin-react/locale', () => ({
  formatMessage({ id }: { id: string }): string {
    if (id === 'advertisement.adv') {
      return 'advertisement.adv';
    }
    return '';
  }
}));
import Advertisement from '../advertisement';
describe('web/layout/BlogLayout/component/advertisement', () => {
  it('ui测试', () => {
    const wrapper: ReactTestRenderer = renderer.create(
      <Advertisement src="testSrc" url="testUrl" />
    );
    let root: ReactTestInstance = wrapper.root;
    const imgTestInstance: ReactTestInstance = root.find(
      (node) => node.type === 'img' && node.props.className === styles.img
    );
    assert.strictEqual(imgTestInstance.props.src, 'testSrc');
    assert.strictEqual('advertisement.adv', imgTestInstance.props.alt);
    assert.strictEqual(
      'testUrl',
      root.find((node) => node.type === 'a' && node.props.className === styles.link).props.href
    );
    wrapper.update(<Advertisement src="testSrc" url="testUrl" alt="testAlt" />);
    root = wrapper.root;
    assert.strictEqual(
      'testAlt',
      root.find((node) => node.type === 'img' && node.props.className === styles.img).props.alt
    );
  });
});
