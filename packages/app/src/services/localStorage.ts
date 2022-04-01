const keys: string[] = [];

export class LocalStore<T> {
  constructor(private key: string, private initialState: T) {
    if (keys.includes(this.key)) throw new Error("Key already exist");
  }

  private create() {
    localStorage.setItem(this.key, JSON.stringify(this.initialState));
  }

  private getRaw(): string | null {
    return localStorage.getItem(this.key);
  }

  get() {
    const raw = this.getRaw();
    if (!raw) this.create();
    return JSON.parse(this.getRaw()!) as T;
  }

  set(state: T) {
    localStorage.setItem(this.key, JSON.stringify(state));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
