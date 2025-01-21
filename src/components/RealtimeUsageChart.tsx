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
import { MqttContext } from "@/context/MqttContextProvider";
import { useContext, useEffect, useState } from "react";
import Message from "@/types/message";
import Threshold from "@/types/threshold";



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

  type Props = {
    threshold: Threshold;
};

function RealtimeUsageChart({threshold}: Props) {
  const {message} = useContext(MqttContext);

  const [chartData, setChartData] = useState<Message[]>([]);
  
  // [
  //   // { month: "January", desktop: 186, mobile: 80 },
  //   // { timestamp: 1734990111367, led_reading: 214, motor_reading: 140, total_reading: 354 },
  //   // { timestamp: 1734990121367, led_reading: 314, motor_reading: 120, total_reading: 434 },
  //   // { timestamp: 1734990131367, led_reading: 315, motor_reading: 120, total_reading: 434 },
  //   // { timestamp: 1734990141367, led_reading: 330, motor_reading: 130, total_reading: 434 },
  //   // { timestamp: 1734990151367, led_reading: 314, motor_reading: 110, total_reading: 434 },
  // ];

  useEffect(() => {
    //TODO: add message to chartData
    if(message){
      console.log("Update realtime chart");
      // chartData.push(message);
      setChartData((prev) => {
        if(prev.length > 8){
          prev.shift();
        }
        return [...prev, message];
      });
    }
  }, [message]);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp*1000); //To convert seconds to milliseconds
    return date.getHours() + ":" + date.getMinutes() + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
  };
  
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
              {chartData.length > 0 ? (
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
      tickFormatter={(date) => formatTime(date)}
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
    {Object.keys(threshold).map((key) => (
      <ReferenceLine
        key={key} // Use the key name as the key
        type="monotone"
        stroke={key === "led" ? "red" : key === "motor" ? "blue" : "green"}
        strokeWidth={2}
        y={threshold[key as keyof Threshold]} // Access the value from the threshold object
        // label={`${key}: ${threshold[key as keyof Threshold]}`} // Add the label with the value
        strokeDasharray="3 3"
        label={{
          value: `${key}: ${threshold[key as keyof Threshold]}`,
          position: "insideBottom", // Position the label below the line
          fill: "black", // Set label text color
          fontSize: 10, // Adjust the font size if needed
        }}
      />
    ))}
    {/* <ReferenceLine
      type="monotone"
      stroke="red"
      strokeWidth={2}
      y={300}
      label="Threshold: 300"
      strokeDasharray="3 3"
    /> */}
  </LineChart>
) : (
  <p>No data to display</p>
)}

                {/* <LineChart
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
                    tickFormatter={(date) => formatTime(date)}
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
                </LineChart> */}
              </ChartContainer>
            </CardContent>
          </Card>
  )
}

export default RealtimeUsageChart