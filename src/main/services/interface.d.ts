export type IServiceConfig = Record<string, IServiceConfigItem>;

export interface IServiceConfigItem {
  name: string;
  path: string;
}
