import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './advertisement.less';
export interface IAdvertisementProps {
  /**
   * @description 广告图片地址
   * @type {string}
   * @memberof IAdvertisementProps
   */
  src: string;
  /**
   * @description 链接地址
   * @type {string}
   * @memberof IAdvertisementProps
   */
  url: string;
  /**
   * @description 图片说明
   * @type {string}
   * @memberof IAdvertisementProps
   */
  alt?: string;
}
/**
 * 广告位
 */
const advertisement: React.FC<IAdvertisementProps> = (props) => (
  <div className={styles.advertisement}>
    {/* link不能链接到外部页面??? */}
    <a href={props.url} className={styles.link}>
      <img
        src={props.src}
        className={styles.img}
        alt={props.alt || formatMessage({ id: 'advertisement.adv' })}
      />
    </a>
  </div>
);
export default advertisement;
