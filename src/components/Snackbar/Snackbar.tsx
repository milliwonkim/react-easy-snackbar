import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { SnackbarProps } from "./snackbar.types";

const typeColor: Record<string, string> = {
  success: "border-green-500",
  error: "border-red-500",
  info: "border-blue-500",
  default: "border-gray-400",
  custom: "",
};

const colorBg: Record<"light" | "dark", string> = {
  light: "bg-white text-gray-900",
  dark: "bg-gray-900 text-white",
};

const Snackbar: React.FC<SnackbarProps> = ({
  snackbarKey,
  children,
  type,
  position,
  description,
  autoHideDuration = 3000,
  renderStartIcon,
  renderEndIcon,
  renderActionButton,
  color = "light",
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(snackbarKey);
    }, autoHideDuration);
    return () => clearTimeout(timer);
  }, [snackbarKey, autoHideDuration, onClose]);

  const renderDefaultIcon = () => {
    switch (type) {
      case "success":
        return <span aria-label="성공">✅</span>;
      case "error":
        return <span aria-label="실패">❌</span>;
      case "info":
        return <span aria-label="정보">ℹ️</span>;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={snackbarKey}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.25 }}
        className={`snackbar-root border-l-4 shadow-lg rounded-lg px-5 py-3 min-w-[250px] max-w-[500px] flex flex-col gap-1 pointer-events-auto ${typeColor[type]} ${colorBg[color]}`}
        role="alert"
      >
        <div className="snackbar-content flex items-center gap-2">
          {type === "custom" ? renderStartIcon?.() : renderDefaultIcon()}
          <div className="snackbar-message flex-1">{children}</div>
          {renderActionButton?.({ snackbarKey })}
        </div>
        {description && (
          <div className="snackbar-description text-sm text-gray-500 dark:text-gray-300">
            {description}
          </div>
        )}
        {renderEndIcon?.()}
      </motion.div>
    </AnimatePresence>
  );
};

export default Snackbar;
