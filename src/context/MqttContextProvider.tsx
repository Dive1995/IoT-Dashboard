import mqtt from "mqtt";
import { createContext, useEffect, useState } from "react";

type Props = {
    children: React.ReactNode;
}

export const MqttContext = createContext<{ client: mqtt.MqttClient | null, message: string | null }>({ client: null, message: null });

// const MQTT_URL = 'ws://broker.emqx.io:8083/mqtt';
const MQTT_URL = 'wss://u39ce25e.ala.us-east-1.emqxsl.com:8084';
const MQTT_TOPIC = 'mqtt-arduino';


function MqttContextProvider({children}: Props){
  const [client, setClient] = useState<mqtt.MqttClient | null>(null); // MQTT client
  const [message, setMessage] = useState<string | null>(null); // Latest message received

  useEffect(() => {
    console.log('Connecting to MQTT broker...');
    // Connect to MQTT broker
    // const mqttClient = mqtt.connect(MQTT_URL);
    const mqttClient = mqtt.connect(MQTT_URL, {
      username: "sahil",
      password: "saini",
      path: "/mqtt"
      // clientId: "mqttjs_debugging",
      // protocolVersion: 5,
      // clean: true,
    });

    console.log('MQTT client: ', mqttClient);

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe(MQTT_TOPIC, (err) => {
        if (!err) console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
      });
    });

    mqttClient.on('message', (topic, payload) => {
      console.log(`Message received on ${topic}: ${payload.toString()}`);
      setMessage(payload.toString()); // Update message state
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT Error:', err);
    });

    mqttClient.on("offline", () => {
      console.log("Client is offline.");
  });

    setClient(mqttClient);

    // Cleanup on component unmount
    return () => {
      mqttClient.end();
    };
  }, []);

  return (
    <MqttContext.Provider value={{client, message}}>
        {children}
    </MqttContext.Provider>
  )
}

export default MqttContextProvider