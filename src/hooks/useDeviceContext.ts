import { useContext } from "react";
import { DeviceContext } from "./deviceContext";

export const useDeviceContext = () => useContext(DeviceContext)
