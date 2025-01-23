
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

function DeviceUsageHistory() {
    const history = [
        {
          date: "20.01.2025",
          device: "Motor",
          usage: "773 mW"
        },
        {
          date: "20.01.2025",
          device: "Motor",
          usage: "820 mW"
        },
        {
          date: "21.01.2025",
          device: "LED",
          usage: "940 mW"
        },
        {
          date: "21.01.2025",
          device: "Motor",
          usage: "800 mW"
        },
        {
          date: "21.01.2025",
          device: "LED",
          usage: "900 mW"
        },
      ]
 

      //   API:
//   {
//     "total_reading": [{
//       "power":2.33,
//       "timestamp":1734990111367,
//     }],
//     "motor_reading": [{
//       "power":2.33,
//       "timestamp":1734990111367,
//     }],
//       "power":2.33,
//       "timestamp":1734990111367,
//     }]
//   }
  
      
  return (
    <div>
        <Card className="shadow-md rounded-xl">
            <CardHeader>
                <CardTitle className="text-xl font-normal">Device usage history</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of recent device usages.</TableCaption>

                    <TableHeader>
                        <TableRow>
                        <TableHead >Date</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Usage</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {history.map((history) => (
                        <TableRow key={history.date}>
                            <TableCell className="font-medium">{history.date}</TableCell>
                            <TableCell>{history.device}</TableCell>
                            <TableCell>{history.usage}</TableCell>
                            {/* <TableCell className="text-right">{history.totalAmount}</TableCell> */}
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}

export default DeviceUsageHistory