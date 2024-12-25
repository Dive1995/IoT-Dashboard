import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    // { month: "January", desktop: 186, mobile: 80 },
    // { month: "February", desktop: 305, mobile: 200 },
    // { month: "March", desktop: 237, mobile: 120 },
    // { month: "April", desktop: 73, mobile: 190 },
    // { month: "May", desktop: 209, mobile: 130 },
    // { month: "June", desktop: 214, mobile: 140 },
    { timestamp: 1734990111367, led_reading: 214, motor_reading: 140, total_reading: 354 },
    { timestamp: 1734990121367, led_reading: 314, motor_reading: 120, total_reading: 434 },
    { timestamp: 1734990141367, led_reading: 314, motor_reading: 120, total_reading: 434 }
  ];

//   MQTT:
//   [
//     {
//       "power":2.33,
//       "timestamp":1734990111367,
//       "sensorId": "led_reading"
//     },
//     {
//       "power":2.33,
//       "timestamp":1734990111367,
//       "sensorId": "motor_reading"
//     },
//     {
//       "power":2.33,
//       "timestamp":1734990111367,
//       "sensorId": "total_reading"
//     }
//   ]

  const chartConfig = {
    led_reading: {
      label: "LED",
      color: "orange",
    },
    motor_reading: {
      label: "Motor",
      color: "blue",
    },
    total_reading: {
      label: "Total",
      color: "green",
    },
  } satisfies ChartConfig;

function RealtimeUsageChart() {
  return (
        <Card>
            <CardHeader>
              <CardTitle className="text-xl font-normal">
                Realtime device usage
              </CardTitle>
              {/* <CardDescription>January - June 2024</CardDescription> */}
            </CardHeader>
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
                    dataKey="timestamp"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Line
                    dataKey="led_reading"
                    type="monotone"
                    stroke="var(--color-led_reading)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="motor_reading"
                    type="monotone"
                    stroke="var(--color-motor_reading)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="total_reading"
                    type="monotone"
                    stroke="var(--color-total_reading)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <ReferenceLine
                    type="monotone"
                    stroke="red"
                    strokeWidth={2}
                    y={300}
                    label="Threshold: 300"
                    strokeDasharray="3 3"
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
  )
}

export default RealtimeUsageChart