import { getDeviceName } from "./deviceName";
import { bsgAPI } from "./bsgAPI";

const token = { value: "", expires: "" };

export function getFreshToken(onSuccess, onFailure) {
  const deviceName = getDeviceName();
  if (!deviceName) {
    if (onFailure) {
      onFailure(new Error("Device name is required"));
    }
    return;
  }

  if (token.value && token.expires && isTokenFresh(token.expires)) {
    if (onSuccess) {
      onSuccess(token);
    }
    return;
  }

  bsgAPI.signIn(
    deviceName,
    (response) => {
      token.value = response.AuthorizationToken.Token;
      token.expires = response.AuthorizationToken.TokenExpires;
      if (onSuccess) {
        onSuccess(token);
      }
    },
    onFailure
  );
}

function isTokenFresh(tokenExpires) {
  try {
    const expires = Date.parse(tokenExpires);
    const now = Date.now();
    const offset = 30 * 1000; // offset in miliseconds
    return expires - offset > now;
  } catch {
    return false;
  }
}
