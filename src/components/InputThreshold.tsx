import { Input } from "./ui/input"
import Threshold from "@/types/threshold";

type Props = {
    threshold: Threshold;
    setThreshold: (value: Threshold | ((prev: Threshold) => Threshold)) => void;
};


function InputThreshold({threshold, setThreshold}: Props) {
    // const [threshold, setThreshold] = useState({total: 0, motor: 0, led: 0});

    const handleThresholdChange = (key: string, value: string) => {
        console.log("-----------------");
        console.log("Threshold change:",key, value);
        console.log("-----------------");
        setThreshold((prev: Threshold) => ({
          ...prev,
          [key]: Number(value),
        }));

        console.log("Threshold:", threshold);
      };

  return (
    <div className="my-8">
    <div className="flex space-x-8">
      <div className="flex flex-col">
        <label htmlFor="total" className="text-sm font-medium text-gray-700">
          Total Threshold
        </label>
        <Input
          id="total"
          value={threshold.total}
          onChange={(e) => handleThresholdChange("total", e.target.value)}
          className="max-w-60"
          placeholder="Total threshold"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="motor" className="text-sm font-medium text-gray-700">
          Motor Threshold
        </label>
        <Input
          id="motor"
          value={threshold.motor}
          onChange={(e) => handleThresholdChange("motor", e.target.value)}
          className="max-w-60"
          placeholder="Motor threshold"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="led" className="text-sm font-medium text-gray-700">
          LED Threshold
        </label>
        <Input
          id="led"
          value={threshold.led}
          onChange={(e) => handleThresholdChange("led", e.target.value)}
          className="max-w-60"
          placeholder="LED threshold"
        />
      </div>
    </div>
  </div>  
  )
}

export default InputThreshold