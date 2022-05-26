export interface ITelegramStorageInstance {
  set(key: string, value: string): void;
  get(key: string): string | null;
}
