import nextVitals from "eslint-config-next/core-web-vitals";
import { globalIgnores } from "eslint/config";

const config = [...nextVitals, globalIgnores([".vercel/**", ".wrangler/**"])];

export default config;
