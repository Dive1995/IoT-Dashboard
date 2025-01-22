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
  ChartConfig,
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

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "red",
    },
    mobile: {
      label: "Mobile",
      color: "green",
    },
  } satisfies ChartConfig;

function AnalysisChart() {
  const [data, setData] = useState(chartData);
  const [selectedValue, setSelectedValue] = useState("today");

  useEffect(() => {
    console.log("Call analytics");
    getAnalythicsData(selectedValue);
  }, []);

  const getAnalythicsData = async (value: string) => {
    // Fetch data based on selected value
    console.log(value);
    const token = "bxfaKjsQzKA0GK0BGufTkSllTtxBG0IYsOGOoGMYFkM=";
    const response = await fetch(`https://ada9-194-95-60-241.ngrok-free.app/data`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      // body: JSON.stringify({ value })
    });
    // const response = await fetch(`https://api.example.com/analytics/${value}`);
    const data = await response.json();
    console.log("Get analytics data:", data);
    setData(data);
  }

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    console.log("Selected Value:", value);
    // getAnalythicsData(selectedValue);
  };

  return (
    <Card>
            <div className="flex justify-between items-center">
              <CardHeader>
                <CardTitle className="text-xl font-normal">Analysis</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <div className="mr-6">
                <Select value={selectedValue} defaultValue="today" onValueChange={handleValueChange}>
                    <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="thisMonth">This Month</SelectItem>
                            <SelectItem value="lastMonth">Last Month</SelectItem>
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
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Line
                    dataKey="desktop"
                    type="monotone"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="mobile"
                    type="monotone"
                    stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex h-5 items-center space-x-4 text-sm">
                  <p>Average usage: <span className="font-bold">4 kWh</span></p>
                  <Separator orientation="vertical" className="bg-black"/>
                  <p>Total usage: <span className="font-bold">9 kWh</span></p>
                </div>
            </CardFooter>
          </Card>
  )
}

export default AnalysisChart