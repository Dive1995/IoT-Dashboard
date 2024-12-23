import PowerReaderCard from "./PowerReaderCard"

function CurrentDeviceUsageCards() {
  return (
    <div className="my-8">
      <h2 className="text-xl mb-4">Current Device Usage</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <PowerReaderCard name="Total Power" value="1.1 kWh" />
          <PowerReaderCard name="Motor 1" value="1 kWh" />
          <PowerReaderCard name="LED 1" value="0.1 kWh" />
      </div>
    </div>
  )
}

export default CurrentDeviceUsageCards