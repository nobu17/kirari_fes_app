import { compareDate, addDays } from "./Utility";

export class UserAuthService {
  private static readonly UserKey: string = "UserKey";
  private static readonly ExpiredDays: number = 7;
  private readonly storeService: IStoregeService;
  private readonly dataProvider: IAuthDataProvider;
  private userData: UserLocalStoredData | null = null;

  constructor() {
    this.storeService = new LocalStoregeService();
    this.dataProvider = new AuthDataProvider();
    this.initStore();
  }
  public login(passcode: string): UserAuthResult {
    try {
      const pass = this.dataProvider.getPassCode();
      if (passcode === pass) {
        // need to check expired
        this.storeData();
        return new UserAuthResult(true, "");
      }
      return new UserAuthResult(false, "");
    } catch (err) {
      console.error(err);
      return new UserAuthResult(false, "error is happened");
    }
  }
  public logout(): void {
    this.resetStore();
  }
  public getInitState(): UserAuthResult {
    if (this.userData != null) {
      return new UserAuthResult(true, "");
    }
    return new UserAuthResult(false, "auth is failed");
  }
  private initStore(): void {
    try {
      this.userData = this.storeService.getStore(UserAuthService.UserKey);
      if (this.userData != null) {
        // check expire
        const baseDate = new Date();
        if (compareDate(baseDate, this.userData.expiredDate) > 0) {
          console.log("exprired");
          this.resetStore();
          return;
        }
      }
    } catch (error) {
      console.error("failed to init", error);
      this.resetStore();
    }
  }
  private storeData(): void {
    const expiredDate = addDays(new Date(), UserAuthService.ExpiredDays);
    this.storeService.setStore(
      UserAuthService.UserKey,
      new UserLocalStoredData(expiredDate)
    );
  }
  private resetStore(): void {
    // reset
    this.userData = null;
    this.storeService.clearStore(UserAuthService.UserKey);
  }
}

// DTO
export class UserAuthResult {
  constructor(public isSucessful: boolean, public errorMessage: string) {}

  public hasError(): boolean {
    if (!this.isSucessful && this.errorMessage !== "") {
      return true;
    }
    return false;
  }
}

class UserLocalStoredData {
  constructor(public expiredDate: Date) {}
}

// StorageService
interface IStoregeService {
  getStore(key: string): UserLocalStoredData | null;
  setStore(key: string, value: UserLocalStoredData): void;
  clearStore(key: string): void;
}

class LocalStoregeService implements IStoregeService {
  getStore(key: string): UserLocalStoredData | null {
    const str = localStorage.getItem(key);
    if (str !== null) {
      return JSON.parse(str) as UserLocalStoredData;
    }
    return null;
  }
  setStore(key: string, value: UserLocalStoredData): void {
    const str = JSON.stringify(value);
    localStorage.setItem(key, str);
  }
  clearStore(key: string): void {
    localStorage.removeItem(key);
  }
}

// EnvProvider
interface IAuthDataProvider {
  getPassCode(): string;
}

class AuthDataProvider implements IAuthDataProvider {
  public getPassCode(): string {
    const pass = process.env.REACT_APP_USER_PASSCODE;
    if (pass === null) {
      throw new Error("failed to get pass code");
    }
    return pass!;
  }
}
