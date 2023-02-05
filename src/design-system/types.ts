export type Brand = "freddie" | "frida";

export interface MetadataProperties {
  description?: string;
  value: string;
}

export interface MetadataGroup {
  [token: string]: MetadataProperties;
}

export interface MetadataBase {
  [tokenGroup: string]: MetadataGroup;
}

export type TokenGroup<T extends MetadataGroup = MetadataGroup> = {
  [K in keyof T]: T[K]["value"];
};
