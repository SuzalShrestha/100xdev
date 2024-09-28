import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./User";
import SocketRoom from "./SocketRoom";

@Table({ timestamps: true, tableName: "SocketMembers" })
class SocketMembers extends Model {
  @ForeignKey(() => SocketRoom)
  @Column({ type: DataType.INTEGER })
  roomId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId!: number;

  @BelongsTo(() => SocketRoom, { foreignKey: "roomId" })
  room!: SocketRoom;
}

export default SocketMembers;
