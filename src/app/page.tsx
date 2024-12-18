"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Settings } from "@/types/Setting";

const initialSettings = {
  fontFamily: "Arial",
  fontSize: "16px",
  color: "#000000",
  fontWeight: "normal",
  fontStyle: "normal",
};

export default function Home() {
  const [settings, setSettings] = useState(initialSettings);
  const [history, setHistory] = useState([initialSettings]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const vehicles = [
    { id: 1, model: "Toyota Camry", license: "ABC-123" },
    { id: 2, model: "Ford Focus", license: "XYZ-789" },
    { id: 3, model: "Honda Accord", license: "DEF-456" },
  ];

  const applySettings = (newSettings: Settings) => {
    const newHistory = history.slice(0, currentIndex + 1);
    setHistory([...newHistory, newSettings]);
    setCurrentIndex(newHistory.length);
    setSettings(newSettings);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSettings(history[currentIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSettings(history[currentIndex + 1]);
    }
  };

  const handleReset = () => {
    applySettings(initialSettings);
  };

  return (
    <div className="container mt-4">
      <h2>Система управління автопарком</h2>
      <div className="mb-3">
        <label className="form-label">Тип шрифту</label>
        <select
          className="form-select"
          onChange={(e) =>
            applySettings({ ...settings, fontFamily: e.target.value })
          }
          value={settings.fontFamily}
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Розмір шрифту</label>
        <input
          type="number"
          className="form-control"
          onChange={(e) =>
            applySettings({ ...settings, fontSize: `${e.target.value}px` })
          }
          value={parseInt(settings.fontSize)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Колір шрифту</label>
        <input
          type="color"
          className="form-control form-control-color"
          onChange={(e) =>
            applySettings({ ...settings, color: e.target.value })
          }
          value={settings.color}
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="bold"
          onChange={(e) =>
            applySettings({
              ...settings,
              fontWeight: e.target.checked ? "bold" : "normal",
            })
          }
          checked={settings.fontWeight === "bold"}
        />
        <label className="form-check-label" htmlFor="bold">
          Напівжирний
        </label>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="italic"
          onChange={(e) =>
            applySettings({
              ...settings,
              fontStyle: e.target.checked ? "italic" : "normal",
            })
          }
          checked={settings.fontStyle === "italic"}
        />
        <label className="form-check-label" htmlFor="italic">
          Курсив
        </label>
      </div>

      <div className="mb-3">
        <button
          className="btn btn-primary me-2"
          onClick={handleUndo}
          disabled={currentIndex === 0}
        >
          Undo
        </button>
        <button
          className="btn btn-secondary me-2"
          onClick={handleRedo}
          disabled={currentIndex === history.length - 1}
        >
          Redo
        </button>
        <button className="btn btn-danger" onClick={handleReset}>
          Reset
        </button>
      </div>

      <table className="table table-bordered" style={settings}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Модель</th>
            <th>Номерний знак</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td style={{ color: settings.color }}>{vehicle.id}</td>
              <td style={{ color: settings.color }}>{vehicle.model}</td>
              <td style={{ color: settings.color }}>{vehicle.license}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
