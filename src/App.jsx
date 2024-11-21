import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = (message) => {
    toast.error(message);
  };

  const [command, setCommand] = useState("");
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const [commandHistory, setCommandHistory] = useState([]);

  const handleExecuteCommand = () => {
    let newTop = top;
    let newLeft = left;

    for (let i = 0; i < command.length; i++) {
      const char = command[i].toLowerCase();

      switch (char) {
        case "l":
          if (newLeft - 127 < 0) {
            notify("Chapga harakatlanib bo'lmaydi, chegaradan chiqib ketmoqda!");
            return;
          }
          newLeft -= 127; // Move left
          break;
        case "t":
          if (newTop - 47 < 0) {
            notify("Yuqoriga harakatlanib bo'lmaydi, chegaradan chiqib ketmoqda!");
            return;
          }
          newTop -= 47; // Move top (up)
          break;
        case "r":
          if (newLeft + 127 > 1200) { // Example limit, depends on your grid size
            notify("O'ngga harakatlanib bo'lmaydi, chegaradan chiqib ketmoqda!");
            return;
          }
          newLeft += 127; // Move right
          break;
        case "b":
          if (newTop + 47 > 600) { // Example limit, depends on your grid size
            notify("Pastga harakatlanib bo'lmaydi, chegaradan chiqib ketmoqda!");
            return;
          }
          newTop += 47; // Move bottom (down)
          break;
        default:
          notify("faqat LLll,RRrr,BBbb,TTtt harflaridan foydalaning");
          return;
      }
    }

    if (command.trim() !== "") {
      const currentTimestamp = new Date().toLocaleString();
      setCommandHistory((prevHistory) => [
        ...prevHistory,
        {
          original: command,
          optimized: "ЗПЗНЗПЗНО", // Placeholder for optimized result
          timestamp: currentTimestamp,
          before: `(${top}, ${left})`,
          after: `(${newTop}, ${newLeft})`,
        },
      ]);
      setTop(newTop);
      setLeft(newLeft);
      setCommand("");
    }
  };

  const handleInputChange = (e) => {
    const allowedChars = /^[lLrRbBtT]*$/;
    if (allowedChars.test(e.target.value)) {
      setCommand(e.target.value);
    } else {
      notify("faqat LLll,RRrr,BBbb,TTtt harflaridan foydalaning");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white w-[1200px] p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Laboratory Manipulator Control
        </h1>
        <div className={`grid grid-cols-9 gap-2 mb-4 relative`}>
          <div
            className="w-[120px] h-[40px] text-white text-center absolute bg-red-700"
            style={{
              left: `${left}px`,
              top: `${top}px`,
              transition: "left 0.5s ease, top 0.5s ease",
            }}
          >
            robot
          </div>

          {Array.from({ length: 45 }).map((_, i) => (
            <div key={i} className="bg-green-700 py-2 text-center">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Command"
            value={command}
            onChange={handleInputChange}
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
