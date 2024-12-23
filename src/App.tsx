import CurrentDeviceUsageCards from "./components/CurrentDeviceUsageCards"
import DeviceUsageChart from "./components/DeviceUsageChart"
import DeviceUsageHistory from "./components/DeviceUsageHistory"

function App() {

  return (
    // bg-gradient-to-r from-green-50 via-green-50 to-green-100 
    // bg-gradient-to-b from-gray-50 to-amber-50
    // bg-gradient-to-r from-white to-gray-50
    <div className="min-h-screen bg-gray-50">
      <nav className="p-4">
        <h1 className="text-2xl font-semibold text-gray-600">Energy Usage Dashboard</h1>
      </nav>

      <div className="px-8">
        <CurrentDeviceUsageCards />

        <div className="md:flex gap-12">
          <div className="flex-1 ">
            <DeviceUsageHistory />
          </div>
          <div className="flex-1">
            <DeviceUsageChart />
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
