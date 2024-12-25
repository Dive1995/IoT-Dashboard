import PowerReaderCard from "./PowerReaderCard"

function CurrentDeviceUsageCards() {
  return (
    <div className="my-8">
      <h2 className="text-xl mb-4">Current Device Usage</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <PowerReaderCard name="Total Power" value="1.1 kWh" color="bg-green-100"/>
          <PowerReaderCard name="Motor" value="1 kWh" color="bg-blue-100"/>
          <PowerReaderCard name="LED" value="0.1 kWh" color="bg-orange-100"/>
      </div>
    </div>
  )
}

export default CurrentDeviceUsageCards