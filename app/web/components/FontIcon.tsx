import styles from 'web/assets/iconfont/iconfont.css';
import React from 'react';
/**
 * @description fontIcon类型
 * @export
 * @enum {string}
 */
export enum FontIconType {
  topping = '&#xe637;'
}
export interface IFontIcon {
  className?: string;
  type: FontIconType;
}
/**
 * fontIcon 组件
 * @param props
 */
const FontIcon: React.FC<IFontIcon> = (props) => (
  <span className={[styles.iconfont, props.className].join(' ')}>
    {unescape(props.type.replace(/&#x/g, '%u').replace(/;/g, ''))}
  </span>
);
export default FontIcon;
