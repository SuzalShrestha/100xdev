import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./User";

@Table({ tableName: "Notifications", timestamps: true })
class Notification extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
  })
  senderId!: number;

  @Column({
    type: DataType.STRING(255),
  })
  title!: string;

  @Column({
    type: DataType.STRING(255),
  })
  body!: string;

  @Column({
    type: DataType.TEXT,
  })
  data!: string;

  @Column({
    type: DataType.STRING,
  })
  type!: string;

  @Column({
    type: DataType.TINYINT({ length: 1 }),
  })
  isRead!: number;

  @Column({
    type: DataType.STRING(255),
  })
  deepLink!: string;

  @BelongsTo(() => User, { foreignKey: "userId" })
  user!: User;
}

export default Notification;
