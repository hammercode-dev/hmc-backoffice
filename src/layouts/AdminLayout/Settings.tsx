import { Button } from "@/components";
import { useSettingsContext } from "./hooks";

export default function Settings() {
  const settings = useSettingsContext();

  return (
    <div className="bg-black text-white p-4">
      <h2 className="mb-2">Settings</h2>
      <ul className="text-sm">
        <li>
          Reset Data{" "}
          <Button>
            Reset
          </Button>
        </li>
        <li>
          <label>
            Button Validation{" "}
            <input
              type="checkbox"
              checked={settings.guardButton}
              onChange={settings.toggleGuardButton}
            />
          </label>
        </li>
      </ul>
    </div>
  );
}
