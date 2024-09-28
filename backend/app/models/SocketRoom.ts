import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./User";
import SocketMembers from "./Members";

@Table({ timestamps: true, tableName: "SocketRooms" })
class SocketRoom extends Model {
  @Column({ type: DataType.STRING(100) })
  socketId!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId!: number;

  @HasMany(() => SocketMembers, { foreignKey: "roomId" })
  members!: SocketMembers[];
}

export default SocketRoom;
