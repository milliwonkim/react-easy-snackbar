import React from "react";
import "./App.css";
import { useSnackbar } from "./components/Snackbar/useSnackbar";

function DemoComponent() {
  const { addSnackbar } = useSnackbar();

  const handleClick = () => {
    addSnackbar({
      type: "success",
      children: "저장에 성공했습니다!",
      description: "데이터가 정상적으로 저장되었습니다.",
      position: "top-center",
      autoHideDuration: 2500,
    });
  };

  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      onClick={handleClick}
    >
      스낵바 띄우기
    </button>
  );
}

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <DemoComponent />
    </div>
  );
}

export default App;
