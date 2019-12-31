import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  DataType,
  Column,
  NotNull,
  NotEmpty,
  Default,
  Comment
} from 'sequelize-typescript';
@Table
export class User extends Model<User> {
  /**
   * @description uid
   * @type {number}
   * @memberof User
   */
  @PrimaryKey
  @AutoIncrement
  @NotEmpty
  @Comment('uid')
  @Column(DataType.INTEGER)
  id!: number;
  /**
   * @description 昵称
   * @type {string}
   * @memberof User
   */
  @NotEmpty
  @NotNull
  @Comment('昵称')
  @Column(DataType.STRING(30))
  nickname!: string;
  /**
   * @description 头像
   * @type {string}
   * @memberof User
   */
  @Comment('头像')
  @Column(DataType.STRING)
  faceImg?: string;
  /**
   * @description 创建日期
   * @type {string}
   * @memberof User
   */
  @Default(DataType.NOW)
  @Comment('创建日期')
  @Column(DataType.DATE)
  createDate!: string;
  /**
   * @description 是否为管理员
   * @type {boolean}
   * @memberof User
   */
  @Default(false)
  @NotNull
  @Comment('是否为管理员')
  @Column(DataType.BOOLEAN)
  isAdmin!: boolean;
}
export default (): typeof User => User;
