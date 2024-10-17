import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle = () => {
  const { selectedTheme, setSelectedTheme } = useTheme();

  return (
    <Button
      className="transition-none"
      onClick={() => setSelectedTheme(selectedTheme === "dark" ? "light" : "dark")}
      size="icon"
      title="Toggle theme"
      variant="outline"
    >
      <Sun className="size-6 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
