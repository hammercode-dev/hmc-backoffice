import { createContext, PropsWithChildren, useCallback, useState } from "react";

type SettingsContext = {
  guardButton: boolean;
  toggleGuardButton: () => void;
};

export const SettingCtx = createContext<SettingsContext>({
  guardButton: true,
  toggleGuardButton: () => {},
});

export function SettingsProvider({ children }: PropsWithChildren<unknown>) {
  const [guarded, setGuarded] = useState<boolean>(true);

  const toggleGuardButton = useCallback(() => {
    setGuarded((guarded) => !guarded);
  }, []);

  return (
    <SettingCtx.Provider value={{ guardButton: guarded, toggleGuardButton }}>
      {children}
    </SettingCtx.Provider>
  );
}
