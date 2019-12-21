import React from 'react';
import styles from './index.css';
// eslint-disable-next-line import/named
import { formatMessage } from 'umi-plugin-react/locale';
const Index: React.FC = () => (
  <div className={styles.normal}>
    <div className={styles.welcome} />
    <ul className={styles.list}>
      <li>
        To get started, edit <code>src/pages/index.js</code> and save to reload.
      </li>
      <li>
        <a href="https://umijs.org/guide/getting-started.html">
          {formatMessage({ id: 'index.start' })}
          我是真的服jjbbjj
        </a>
      </li>
    </ul>
  </div>
);
export default Index;
