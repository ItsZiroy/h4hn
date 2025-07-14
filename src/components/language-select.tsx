import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenu } from "./ui/dropdown-menu";

export function LanguageSelect({
  languages,
  selectedLanguage,
  onLanguageChange,
}: {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{selectedLanguage}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => onLanguageChange(language)}
          >
            {language}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
