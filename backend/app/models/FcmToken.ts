import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./User";

@Table({ tableName: "FcmTokens", timestamps: true })
class FcmToken extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @Column({ type: DataType.STRING(255) , allowNull: false})
  token!: string;

  @Column({ type: DataType.STRING })
  deviceType!: string;

  @Column({ type: DataType.STRING(255) })
  deviceId!: string;

  @BelongsTo(() => User, { foreignKey: "userId" })
  user!: User;
}

export default FcmToken;
