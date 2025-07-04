import { useState, useEffect } from "react";

const countries = ["🇺🇸 США", "🇩🇪 Германия", "🇫🇷 Франция", "🇳🇱 Нидерланды"];
const protocols = ["WireGuard", "OpenVPN", "Shadowsocks"];

export default function App() {
  const [country, setCountry] = useState("");
  const [protocol, setProtocol] = useState("");

  const isReady = country && protocol;

  const sendDataToBot = () => {
    const data = {
      action: "get_vpn_key",
      country,
      protocol,
    };

    if (window.Telegram?.WebApp?.sendData) {
      window.Telegram.WebApp.sendData(JSON.stringify(data));
    } else {
      alert("❌ Telegram WebApp не инициализирован");
    }
  };

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      console.log("✅ Telegram WebApp готов");
    } else {
      console.log("❌ Telegram WebApp не найден");
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white px-4 py-6 text-sm">
      <h2 className="text-center font-semibold text-lg mb-4">🌐 Настройка VPN</h2>

      <div className="mb-3">
        <label className="mb-1 block">Страна:</label>
        <div className="grid grid-cols-2 gap-2">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className={`rounded-md px-4 py-2 text-sm border ${
                country === c
                  ? "bg-blue-600 border-blue-400"
                  : "bg-neutral-800 border-neutral-700 hover:border-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block">Протокол:</label>
        <div className="flex flex-wrap gap-2">
          {protocols.map((p) => (
            <button
              key={p}
              onClick={() => setProtocol(p)}
              className={`rounded-md px-4 py-2 text-sm border ${
                protocol === p
                  ? "bg-green-600 border-green-400"
                  : "bg-neutral-800 border-neutral-700 hover:border-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!isReady}
        onClick={sendDataToBot}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold disabled:opacity-30"
      >
        🚀 Получить ключ
      </button>
    </div>
  );
}
