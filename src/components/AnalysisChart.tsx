import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "./ui/separator";
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

  useEffect(() => {
    getAnalyticsData(selectedValue);
  }, [selectedValue]);

  const getAnalyticsData = async (value: string) => {
    const token = "bxfaKjsQzKA0GK0BGufTkSllTtxBG0IYsOGOoGMYFkM=";
    const params = new URLSearchParams({ time: value }).toString();
    const url = `http://ec2-52-59-202-209.eu-central-1.compute.amazonaws.com/data?${params}`;
    
    try {
      const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      const rawData = await response.json();
      const formattedData = formatChartData(rawData);
      setData(formattedData);
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
    // Combine readings into a single array for the chart
    const allTimestamps = new Set<number>();
    const readings: (keyof RawData)[] = ["totalReading", "ledReading", "motorReading"];

    // Collect all unique timestamps
    readings.forEach((key) => {
      rawData[key]?.forEach((item: Reading) => allTimestamps.add(item.timestamp));
    });

    // Create an aggregated dataset
    const sortedTimestamps = Array.from(allTimestamps).map(Number).sort((a: number, b: number) => a - b);
    return sortedTimestamps.map((timestamp) => {
      const formattedTimestamp = new Date(timestamp).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
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
          <CardDescription>January - June 2024</CardDescription>
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
              content={<ChartTooltipContent />}
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
        <div className="flex h-5 items-center space-x-4 text-sm">
          <p>
            Average usage: <span className="font-bold">4 kWh</span>
          </p>
          <Separator orientation="vertical" className="bg-black" />
          <p>
            Total usage: <span className="font-bold">9 kWh</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default AnalysisChart;
