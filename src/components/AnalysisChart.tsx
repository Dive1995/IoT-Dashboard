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
  return (
    <Card>
            <div className="flex justify-between items-center">
              <CardHeader>
                <CardTitle className="text-xl font-normal">Analysis</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <div className="mr-6">
                <Select defaultValue="today">
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
                  data={chartData}
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