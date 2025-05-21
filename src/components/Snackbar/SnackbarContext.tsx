import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import Snackbar from "./Snackbar";
import type { SnackbarPosition, SnackbarProps } from "./snackbar.types";

// Context 타입
interface SnackbarContextType {
  addSnackbar: (
    snackbar: Omit<Partial<SnackbarProps>, "snackbarKey"> &
      Pick<SnackbarProps, "children" | "type">
  ) => void;
  removeSnackbar: (snackbarKey: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

type SnackbarState = SnackbarProps[];
type SnackbarAction =
  | { type: "ADD"; payload: SnackbarProps }
  | { type: "REMOVE"; payload: string };

function snackbarReducer(
  state: SnackbarState,
  action: SnackbarAction
): SnackbarState {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter(
        (snackbar) => snackbar.snackbarKey !== action.payload
      );
    default:
      return state;
  }
}

function getUniqueId() {
  return Math.random().toString(36).slice(2) + Date.now();
}

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [snackbars, dispatch] = useReducer(snackbarReducer, []);
  const timeoutRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const addSnackbar: SnackbarContextType["addSnackbar"] = (snackbar) => {
    const snackbarKey = getUniqueId();
    const autoHideDuration = snackbar.autoHideDuration ?? 3000;
    const position = snackbar.position ?? "top-center";
    const color = snackbar.color ?? "light";

    const fullSnackbar: SnackbarProps = {
      snackbarKey,
      ...snackbar,
      autoHideDuration,
      position,
      color,
      onClose: removeSnackbar,
    };

    dispatch({ type: "ADD", payload: fullSnackbar });

    const timeoutId = setTimeout(() => {
      removeSnackbar(snackbarKey);
    }, autoHideDuration);
    timeoutRefs.current.set(snackbarKey, timeoutId);
  };

  const removeSnackbar = (snackbarKey: string) => {
    dispatch({ type: "REMOVE", payload: snackbarKey });
    const timeoutId = timeoutRefs.current.get(snackbarKey);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutRefs.current.delete(snackbarKey);
    }
  };

  const positions: SnackbarPosition[] = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  return (
    <SnackbarContext.Provider value={{ addSnackbar, removeSnackbar }}>
      {children}
      {positions.map((position) => (
        <div
          key={position}
          className={`snackbar-container fixed z-[9999] flex flex-col gap-3 pointer-events-none ${
            position.startsWith("top") ? "top-10" : "bottom-10"
          } ${
            position.endsWith("left")
              ? "left-10"
              : position.endsWith("right")
              ? "right-10"
              : "left-1/2 -translate-x-1/2"
          }`}
        >
          {snackbars
            .filter((snackbar) => snackbar.position === position)
            .map((snackbar) => (
              <Snackbar key={snackbar.snackbarKey} {...snackbar} />
            ))}
        </div>
      ))}
    </SnackbarContext.Provider>
  );
};

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  return context;
}

export default SnackbarContext;
