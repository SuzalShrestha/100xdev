import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User";

@Table({
  tableName: "Friends",
  timestamps: true,
})
class Friend extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    references: {
      model: "Users",
      key: "id",
    },
  })
  userId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    references: {
      model: "Users",
      key: "id",
    },
  })
  relatedUserId!: number;

  // Associate with User for userId
  @BelongsTo(() => User, { foreignKey: "userId" })
  user!: User;

  // Associate with User for relatedUserId
  @BelongsTo(() => User, { foreignKey: "relatedUserId" })
  relatedUser!: User;
}

export default Friend;
