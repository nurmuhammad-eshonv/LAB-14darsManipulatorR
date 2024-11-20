import React from "react";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = () => {
    toast.error("faqat LLll,RRrr,BBbb,TTtt harflaridan foydalaning");
  };

  const [command, setCommand] = useState("");
  const [value, setValue] = useState("");
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  console.log(top);
  console.log(bottom);
  console.log(left);
  console.log(right);

  const [commandHistory, setCommandHistory] = useState([
    {
      original: "LLRRTTBB",
      optimized: "ЗПЗНЗПЗНО",
      timestamp: "20/11/2024, 07:36:15",
      before: "(0, 0)",
      after: "(0, 2)",
    },
  ]);

  const handleExecuteCommand = () => {
    for (let i = 0; i <= command.length; i++) {
      
      if ((command[i] == "l", "L")) {
        setRight(right + 127);
      }
      if ((command[i] == "t", "T")) {
        setBottom(bottom + 47);
      }
      if ((command[i] == "r", "R")) {
        setLeft(left + 127);
      }
      if ((command[i] == "B", "b")) {
        setTop(top + 47);
      }
    }

    if (command.trim() !== "") {
      const currentTimestamp = new Date().toLocaleString();
      setCommandHistory((prevHistory) => [
        ...prevHistory,
        {
          original: command,
          optimized: "ЗПЗНЗПЗНО",
          timestamp: currentTimestamp,
          before: "(0, 2)",
          after: "(0, 2)",
        },
      ]);
      setCommand("");
    }
  };

  const handleInputChange = (e) => {
    const allowedChars = /^[L, R, B, T, t,b,r,l]*$/;
    if (allowedChars.test(e.target.value)) {
      setCommand(e.target.value);
    } else {
      notify();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white w-[1200px] p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Laboratory Manipulator Control
        </h1>
        <div className={`grid grid-cols-9 gap-2 mb-4 relative mt-${top} mb-${bottom} mr-${right}`}>
          <div
            className="w-[120px] h-[40px] text-white text-center absolute bg-red-700"
          >
            robot
          </div>

          {Array.from({ length: 45 }).map((_, i) => (
            <div
              onClick={(e) => setValue(e.target.textContent)}
              key={i}
              className="bg-green-700 py-2 text-center"
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Command"
            value={command}
            onChange={handleInputChange} // Input qiymatini cheklash uchun
            className="border rounded-md py-2 px-4 w-full"
          />
          <button
            onClick={handleExecuteCommand}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 w-full"
          >
            Execute Command
          </button>
        </div>
        <div className="overflow-y-auto max-h-64">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Original</th>
                <th className="py-2 px-4 text-left">Optimized</th>
                <th className="py-2 px-4 text-left">Timestamp</th>
                <th className="py-2 px-4 text-left">Before</th>
                <th className="py-2 px-4 text-left">After</th>
              </tr>
            </thead>
            <tbody>
              {commandHistory.map((entry, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="py-2 px-4">{entry.original}</td>
                  <td className="py-2 px-4">{entry.optimized}</td>
                  <td className="py-2 px-4">{entry.timestamp}</td>
                  <td className="py-2 px-4">{entry.before}</td>
                  <td className="py-2 px-4">{entry.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;


