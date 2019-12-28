interface mysql {
  /**
   * @description 查询sql
   * @author angle
   * @date 2019-12-28
   * @template T
   * @param {string} sql sql语句 支持?参数
   * @param {(string | number | Array<string | number>)} [param] sql参数
   * @returns {Promise<T[]>} 结果集
   * @memberof mysql
   */
  query<T = any>(sql: string, param?: string | number | Array<string | number>) : Promise<T[]>;
  /**
   * @description 查询一条数据
   * @author angle
   * @date 2019-12-28
   * @template T
   * @param {string} tableName 表名
   * @param {{}} find 查询条件 数组相当于 in
   * @returns {Promise<T>} 结果
   * @memberof mysql
   */
  get<T = any>(tableName: string, find: {}): Promise<T>;
}
