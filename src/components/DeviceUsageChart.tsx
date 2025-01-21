import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import RealtimeUsageChart from "./RealtimeUsageChart";
import AnalysisChart from "./AnalysisChart";
import Threshold from "@/types/threshold";

type Props = {
    threshold: Threshold;
};

function DeviceUsageChart({threshold}: Props) {
  // const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("desktop")

  return (
    <div className="my-8 md:my-0">
      <Tabs defaultValue="realtime" className="shadow-md rounded-xl">
        <TabsList className="grid grid-cols-2 max-w-[300px]">
          <TabsTrigger value="realtime">Realtime data</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime">
          <RealtimeUsageChart threshold={threshold}/>
        </TabsContent>

        <TabsContent value="analysis">
          <AnalysisChart/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DeviceUsageChart;
