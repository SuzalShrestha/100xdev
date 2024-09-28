import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Friend from "./Friend";
import { Gender } from "../enums/gender";
import SocketRoom from "./SocketRoom";
import Notification from "./Notification";
import FcmToken from "./FcmToken";

@Table({
  tableName: "Users",
  timestamps: true,
})
class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  username!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  fullName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
  })
  phone!: string;

  @Column({
    type: DataType.ENUM(...Object.values(Gender)),
    allowNull: true,
  })
  gender!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dob!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;

  // Friends where this user is the userId (initiator of the friendship)
  @HasMany(() => Friend, { foreignKey: "userId" })
  friends!: Friend[];

  // Friends where this user is the relatedUserId (receiver of the friendship)
  @HasMany(() => Friend, { foreignKey: "relatedUserId" })
  relatedFriends!: Friend[];

  @HasMany(() => SocketRoom, { foreignKey: "userId" })
  rooms!: SocketRoom[];

  @HasMany(() => Notification, { foreignKey: "userId" })
  notifications!: Notification[];

  @HasMany(() => FcmToken, { foreignKey: "userId" })
  fcmTokens!: FcmToken[];
}

export default User;
