import { CircleAlert } from "lucide-react"
import CurrentDeviceUsageCards from "./components/CurrentDeviceUsageCards"
import DeviceUsageChart from "./components/DeviceUsageChart"
import DeviceUsageHistory from "./components/DeviceUsageHistory"
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert"
import { useEffect } from "react"

function App() {
  useEffect(() => {
    sendNotification("Welcome to Energy Usage Dashboard", "This is a demo dashboard for monitoring energy usage.");
  }, [])

  const sendNotification = (title: string, body?:string) => {
    const notify = () => {
        new Notification(title, {
          body: body,
        //   icon: hamper
        })
  
      }

    if("Notification" in window){
        if(Notification.permission === "granted"){
          notify();
        }else {
            Notification.requestPermission().then(res => {
                if(res === "granted"){
                    notify()
                }
            })
        }
    }
}

  return (
    // bg-gradient-to-r from-green-50 via-green-50 to-green-100 
    // bg-gradient-to-b from-gray-50 to-amber-50
    // bg-gradient-to-r from-white to-gray-50
    <div className="min-h-screen bg-gray-50">
      <nav className="p-4">
        <h1 className="text-2xl font-semibold text-gray-600">Energy Usage Dashboard</h1>
      </nav>

      <div className="fixed right-4 top-4 z-50">
        <Alert className="bg-red-50 min-w-[350px]">
          {/* <Terminal  /> */}
          <CircleAlert className="h-4 w-4" color="red"/>
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            Peek usage has been detected.
          </AlertDescription>
        </Alert>
      </div>

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
