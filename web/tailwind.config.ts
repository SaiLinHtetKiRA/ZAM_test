import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        'half-circle-top': '50% 50% 0 0 / 100% 100% 0 0',
        'half-circle-bottom': '0 0 50% 50% / 0 0 100% 100%',
      },
      aspectRatio: {
          "photo":"8/11"
      },
    },
  },
  plugins: [],
};
export default config;
