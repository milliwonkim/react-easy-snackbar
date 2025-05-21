import { ReactNode } from "react";

export type SnackbarType = "success" | "error" | "info" | "default" | "custom";

export type SnackbarPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface SnackbarProps {
  snackbarKey: string;
  children: ReactNode;
  type: SnackbarType;
  position?: SnackbarPosition;
  description?: ReactNode;
  autoHideDuration?: number;
  renderStartIcon?: () => ReactNode;
  renderEndIcon?: () => ReactNode;
  renderActionButton?: (args: { snackbarKey: string }) => ReactNode;
  color?: "light" | "dark";
  onClose: (key: string) => void;
}
