export class StorageUtil {
  static setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static getAllKeys(): string[] {
    return Object.keys(localStorage);
  }

  static getAllItems<T>(): T[] {
    const items: T[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      try {
        const value = JSON.parse(localStorage.getItem(key)!);
        items.push(value);
      } catch {}
    }
    return items;
  }
}
