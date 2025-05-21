import { useSnackbar } from "./components/Snackbar/useSnackbar";
import { useState } from "react";
import type {
  SnackbarType,
  SnackbarPosition,
} from "./components/Snackbar/snackbar.types";

const typeOptions: SnackbarType[] = [
  "success",
  "error",
  "info",
  "default",
  "custom",
];
const positionOptions: SnackbarPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];
const colorOptions = ["light", "dark"] as const;

function SnackbarTester() {
  const { addSnackbar } = useSnackbar();
  const [type, setType] = useState<SnackbarType>("success");
  const [position, setPosition] = useState<SnackbarPosition>("top-center");
  const [color, setColor] = useState<"light" | "dark">("light");
  const [autoHideDuration, setAutoHideDuration] = useState<number>(3000);
  const [message, setMessage] = useState<string>("테스트 메시지");
  const [description, setDescription] = useState<string>("");

  const handleShowSnackbar = () => {
    addSnackbar({
      type,
      children: message,
      description: description || undefined,
      position,
      color,
      autoHideDuration,
    });
  };

  return (
    <section className="w-full max-w-lg bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-200 dark:border-gray-800 backdrop-blur">
      <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-2 tracking-tight flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2" />
        스낵바 테스트
      </h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleShowSnackbar();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              메시지
            </span>
            <input
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={50}
              placeholder="스낵바에 표시될 메시지"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              설명(선택)
            </span>
            <input
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
              placeholder="설명 텍스트 (선택)"
            />
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              타입
            </span>
            <select
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={type}
              onChange={(e) => setType(e.target.value as SnackbarType)}
            >
              {typeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              위치
            </span>
            <select
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={position}
              onChange={(e) => setPosition(e.target.value as SnackbarPosition)}
            >
              {positionOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              색상
            </span>
            <select
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={color}
              onChange={(e) => setColor(e.target.value as "light" | "dark")}
            >
              {colorOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <label className="flex flex-col gap-1 w-full md:w-1/2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              자동 닫힘(ms)
            </span>
            <input
              type="number"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition"
              value={autoHideDuration}
              min={500}
              max={10000}
              step={100}
              onChange={(e) => setAutoHideDuration(Number(e.target.value))}
            />
          </label>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 mt-2 md:mt-6 font-bold rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg"
          >
            스낵바 띄우기
          </button>
        </div>
      </form>
    </section>
  );
}

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500">
      <SnackbarTester />
    </div>
  );
}

export default App;
