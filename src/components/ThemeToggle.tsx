import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-10 h-10 p-0 rounded-full"
        >
            {theme === "light" ? (
                <Moon className="h-5 w-5 text-slate-700" />
            ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};

export default ThemeToggle;
