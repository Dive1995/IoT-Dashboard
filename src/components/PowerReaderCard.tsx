import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";


type Props = {
    name: string;
    color?: string;
    value: number;
}

function PowerReaderCard({ name, value, color }: Props){
    return (
        <div>
            <Card className={"w-[250px] shadow-md rounded-xl " + (color ? color : "")}>
                <CardHeader>
                <CardTitle>{parseFloat(value.toFixed(2))} <span className=" text-sm">mW</span></CardTitle>
                <CardDescription>{name}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};

export default PowerReaderCard;