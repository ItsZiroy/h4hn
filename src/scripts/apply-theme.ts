// Apply system theme ASAP if no saved preference (before CSS loads)
(function () {
  try {
    // Helper function to get cookie value
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const part = parts.pop();
        if (typeof part === "string") {
          return part.split(";").shift();
        }
      }
      return null;
    }

    // Update theme-color meta tag
    function updateThemeColor(isDarkMode: boolean) {
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute(
          "content",
          isDarkMode ? "#282524" : "#FDF9F1"
        );
      }
    }

    const savedTheme = getCookie("theme");

    // If no saved theme, use system preference
    if (!savedTheme) {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      updateThemeColor(isDarkMode);
    } else {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
      updateThemeColor(savedTheme === "dark");
    }
    // If there is a saved theme, it's already applied by the server-side class
  } catch (_) {}
})();
