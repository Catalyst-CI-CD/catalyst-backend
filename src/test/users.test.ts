import { User } from "../interfaces/user.interface";
import { register } from "../services/users.service";

describe("test register service", () => {
  it("should return success registeration", async () => {
    const user: User = {
      name: "mahmoud abdulshakour",
      username: "MahmoudShakour",
      password: "123456789",
      email: "mahmoudshakour.dev@gmail.com",
    };
    const registeredUser=await register(user);
    console.log(registeredUser);
    expect(user).toEqual(user);
  });
});
