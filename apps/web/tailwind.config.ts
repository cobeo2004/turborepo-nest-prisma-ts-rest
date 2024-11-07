import type { Config } from "tailwindcss";
import config from "@repo/ui/tailwind.config";
export default {
  ...config,
  presets: [config],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
