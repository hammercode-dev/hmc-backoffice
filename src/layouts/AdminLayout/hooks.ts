import { useContext } from "react";
import { SettingCtx } from "./context";

export function useSettingsContext() {
  return useContext(SettingCtx);
}
