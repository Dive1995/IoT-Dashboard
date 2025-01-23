import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

type Reading = {
  timestamp: number;
  power: number;
};

const chartConfig = {
  totalReading: { label: "Total", color: "blue" },
  ledReading: { label: "LED", color: "green" },
  motorReading: { label: "Motor", color: "red" },
};

function AnalysisChart() {
  const [data, setData] = useState<{ timestamp: string; total: number; led: number; motor: number }[]>([]);
  const [selectedValue, setSelectedValue] = useState("daily");
  const [averageUsage, setAverageUsage] = useState(0);

  useEffect(() => {
    getAnalyticsData(selectedValue);
  }, [selectedValue]);

  const getAnalyticsData = async (value: string) => {
    const token = "bxfaKjsQzKA0GK0BGufTkSllTtxBG0IYsOGOoGMYFkM=";
    const params = new URLSearchParams({ time: value }).toString();
    const url = `http://ec2-52-59-202-209.eu-central-1.compute.amazonaws.com/data?${params}`;
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const rawData = await response.json();
      const formattedData = formatChartData(rawData);
      setData(formattedData);

      const total = formattedData.reduce((sum, entry) => sum + entry.total, 0);
      const average = formattedData.length > 0 ? total / formattedData.length : 0;
      setAverageUsage(Number(average.toFixed(2)));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  interface RawData {
    totalReading: Reading[];
    ledReading: Reading[];
    motorReading: Reading[];
  }

  const formatChartData = (rawData: RawData): { timestamp: string; total: number; led: number; motor: number }[] => {
    const allTimestamps = new Set<number>();
    const readings: (keyof RawData)[] = ["totalReading", "ledReading", "motorReading"];

    readings.forEach((key) => {
      rawData[key]?.forEach((item: Reading) => allTimestamps.add(item.timestamp));
    });

    const sortedTimestamps = Array.from(allTimestamps).map(Number).sort((a, b) => a - b);
    return sortedTimestamps.map((timestamp) => {
      const formattedTimestamp = new Date(timestamp).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return {
        timestamp: formattedTimestamp,
        total: rawData.totalReading?.find((x: Reading) => x.timestamp === timestamp)?.power || 0,
        led: rawData.ledReading?.find((x: Reading) => x.timestamp === timestamp)?.power || 0,
        motor: rawData.motorReading?.find((x: Reading) => x.timestamp === timestamp)?.power || 0,
      };
    });
  };

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Card>
      <div className="flex justify-between items-center">
        <CardHeader>
          <CardTitle className="text-xl font-normal">Analysis</CardTitle>
        </CardHeader>
        <div className="mr-6">
          <Select
            value={selectedValue}
            defaultValue="daily"
            onValueChange={handleValueChange}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={(props) => {
                if (props.active && props.payload && props.payload.length) {
                  const { payload } = props.payload[0];

                  return (
                    <div
                      className="custom-tooltip"
                      style={{
                        backgroundColor: "white",
                        padding: "8px",
                        borderRadius: "4px",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <p style={{ fontWeight: "bold", marginBottom: "4px" }}>
                        {payload.timestamp}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: chartConfig.totalReading.color }}>
                          Total: {payload.total.toFixed(2)} mW
                        </span>
                        <span style={{ color: chartConfig.ledReading.color }}>
                          LED: {payload.led.toFixed(2)} mW
                        </span>
                        <span style={{ color: chartConfig.motorReading.color }}>
                          Motor: {payload.motor.toFixed(2)} mW
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Line
              dataKey="total"
              type="monotone"
              stroke={chartConfig.totalReading.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="led"
              type="monotone"
              stroke={chartConfig.ledReading.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="motor"
              type="monotone"
              stroke={chartConfig.motorReading.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="h-5 items-center space-x-4 text-sm">
          <p>
            Average total usage: <span className="font-bold">{averageUsage} mW</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default AnalysisChart;
