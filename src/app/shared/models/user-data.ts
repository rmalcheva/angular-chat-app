interface User {
  email: string;
  name: string;
  profilePic: string;
}

export interface UserData {
  token: string;
  user: User;
}
