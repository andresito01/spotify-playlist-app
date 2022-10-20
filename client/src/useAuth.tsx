import { useState, useEffect } from "react"
import axios from "axios"

export default function useAuth({ code }: {code: any}) {
  
  // The issue is that window is typed Window & typeof globalThis (intentional), and that (typeof globalThis)['location'] is typed Location, not Location | string. I'm not sure where globalThis is defined.

  // As a workaround you can do:
  const win: Window = window;

  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<number>();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code: code
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        console.log("login complete token: ", res.data.accessToken);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    console.log(
      "refreshing token standby for transmission expires in",
      expiresIn
    );

    const interval = setInterval(() => {
      axios
      .post("http://localhost:3001/refresh", {
        refreshToken,
      })
      .then((res) => {
        console.log("refresh done new token: ", res.data.accessToken);
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);
      })
      .catch(() => {
        win.location = "/";
      });
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn]);

  return accessToken;
}
