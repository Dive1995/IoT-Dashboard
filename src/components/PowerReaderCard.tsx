import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";


type Props = {
    name: string;
    value: string | number;
}

function PowerReaderCard({ name, value }: Props){
    return (
        <div>
            <Card className="w-[250px] shadow-md rounded-xl">
                <CardHeader>
                <CardTitle>{value}</CardTitle>
                <CardDescription>{name}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};

export default PowerReaderCard;