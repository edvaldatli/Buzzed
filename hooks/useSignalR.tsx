import { useState, useEffect } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr";

export const useSignalR = (hubUrl: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Create and start the SignalR connection
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    const startConnection = async () => {
      try {
        await newConnection.start();
        setConnected(true);
        console.log("Connected to SignalR");
      } catch (err) {
        console.error("Connection failed:", err);
      }
    };

    startConnection();

    return () => {
      newConnection.stop().then(() => {
        console.log("Disconnected from SignalR");
        setConnected(false);
      });
    };
  }, [hubUrl]);

  return { connection, connected };
};
