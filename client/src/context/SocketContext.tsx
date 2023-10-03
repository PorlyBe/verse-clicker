import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { useAccount, useNetwork } from "wagmi";

export interface SocketCtxState {
  socket: Socket;
  isConnected: boolean;
}

export const SocketCtxContext = createContext<SocketCtxState>(
  {} as SocketCtxState,
);

export const useSocketCtx = () => useContext(SocketCtxContext);

const SocketCtxProvider: FC<PropsWithChildren> = ({ children }) => {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const socketRef = useRef(
    io(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://verse-clicker-server.fly.dev",
      {
        autoConnect: false,
      },
    ),
  );

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      if (!chain || !address) return;
      console.log("socket connected");
      socketRef.current.emit("join", { address, chain: chain.name });
    };

    const onDisconnect = (e: unknown) => {
      setIsConnected(false);
      console.log("socket disconnected", e);
    };

    const onError = (e: unknown) => {
      console.log("socket error", e);
    };

    // socketRef.current.connect();
    socketRef.current.on("connect", onConnect);
    socketRef.current.on("disconnect", onDisconnect);
    socketRef.current.on("connect_error", onError);
    return () => {
      socketRef.current.off("connect", onConnect);
      socketRef.current.off("disconnect", onDisconnect);
      socketRef.current.off("connect_error", onError);

      socketRef.current.disconnect();
    };
  }, [address, chain]);

  return (
    <SocketCtxContext.Provider
      value={{ socket: socketRef.current, isConnected }}
    >
      {children}
    </SocketCtxContext.Provider>
  );
};

export default SocketCtxProvider;
