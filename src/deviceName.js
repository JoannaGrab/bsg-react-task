import { v4 as uuidv4 } from "uuid";

export function getDeviceName() {
  try {
    let deviceName = localStorage.getItem("deviceName");
    if (!deviceName) {
      deviceName = uuidv4();
      localStorage.setItem("deviceName", deviceName);
    }
    return deviceName;
  } catch {
    return "";
  }
}
