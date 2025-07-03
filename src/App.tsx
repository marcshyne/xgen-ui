import { useState, useEffect } from "react"

const countries = ["🇺🇸 США", "🇩🇪 Германия", "🇫🇷 Франция", "🇳🇱 Нидерланды"]
const protocols = ["WireGuard", "OpenVPN", "Shadowsocks"]

export default function App() {
  const [country, setCountry] = useState("")
  const [protocol, setProtocol] = useState("")
  const [vpnKey, setVpnKey] = useState("")

  const isReady = country && protocol

  const generateKey = () => {
    const data = {
      country,
      protocol,
      action: "get_vpn_key",
    }

    if (window.Telegram?.WebApp?.sendData) {
      window.Telegram.WebApp.sendData(JSON.stringify(data))
    } else {
      alert("Telegram WebApp не инициализирован")
    }

    const key = `vpn-${country.slice(0, 2).toLowerCase()}-${protocol.toLowerCase()}-1A2B3C4D`
    setVpnKey(key)
  }

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
    } else {
      console.log("Telegram WebApp не найден")
    }
  }, [])

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
        onClick={generateKey}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold disabled:opacity-30"
      >
        🚀 Получить ключ
      </button>

      {vpnKey && (
        <div className="mt-6 bg-neutral-800 rounded-md p-4 text-center">
          <div className="mb-3 break-all font-mono text-green-400 text-xs">{vpnKey}</div>
          <div className="flex justify-center gap-3 text-sm">
            <button
              onClick={() => navigator.clipboard.writeText(vpnKey)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              📋 Скопировать
            </button>
            <button
              onClick={() => alert("Инструкция пока в разработке")}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
            >
              📘 Инструкция
            </button>
            <button
              onClick={() => alert("Скоро будет!")}
              className="bg-teal-700 hover:bg-teal-600 px-4 py-2 rounded-md"
            >
              ⚙️ Установить
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
