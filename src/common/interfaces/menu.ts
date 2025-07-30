import type { FunctionalComponent, HTMLAttributes, VNodeProps } from "vue";

export interface ISidebarMenu {
  label: string;
  path?: string;
  pathnames?: string[];
  count?: number;
  iconName?: FunctionalComponent<HTMLAttributes & VNodeProps>;
  roles?: string[];
  onClick?: () => void;
}
