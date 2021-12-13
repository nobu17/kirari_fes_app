import { auth, signIn } from "./Firebase";

export class AdminAuthService {
  async sign(email: string, password: string): Promise<AdminAuthResult> {
    try {
      const result = await signIn(auth, email, password);
      return new AdminAuthResult(true, result.user.uid, "");
    } catch (err) {
      return new AdminAuthResult(false, "", err.message);
    }
  }
  async signOut(): Promise<void> {
    await auth.signOut();
  }
  async onAuthStateChange(callback: (data: AdminAuthResult) => void) {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        callback(new AdminAuthResult(false, "", ""));
      } else {
        callback(new AdminAuthResult(true, user.uid, ""));
      }
    });
  }
}

// DTO
export class AdminAuthResult {
  constructor(
    public isSucessful: boolean,
    public uid: string,
    public errorMessage: string
  ) {}

  public hasError(): boolean {
    if (!this.isSucessful && this.errorMessage !== "") {
      return true;
    }
    return false;
  }
}
