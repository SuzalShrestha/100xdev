import { initialUsers } from "../data/usersData";
import User from "../models/User";
import { hashPassword } from "../utils/passwordUtils";

const userSeeder = async () => {
  if(await User.count() > 0 ) return;
  await User.destroy({ where: {}, force: true });

  for (const user of initialUsers) {
    user.password = await hashPassword(user.password);
    await User.create({
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        password: user.password,
        dob: user.dob,
        gender: user.gender,
        address: user.address
    });
  }
};

export default userSeeder;
