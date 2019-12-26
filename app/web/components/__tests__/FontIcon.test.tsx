import FontIcon, { FontIconType } from '../FontIcon';
import assert from 'assert';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import styles from 'web/assets/iconfont/iconfont.css';
import React from 'react';
describe('web/components/FontIcon', () => {
  it('UI测试', () => {
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<FontIcon type={FontIconType.topping} className="testClass" />);
    const res: React.ReactElement = renderer.getRenderOutput();
    assert.strictEqual(`${styles.iconfont} testClass`, res.props.className);
    assert.ok(res.props.children[0]);
  });
});
