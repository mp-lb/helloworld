import { mergeConfig } from "vitest/config";
import reactConfig from "../../etc/vitest.react.config";
import viteConfig from "./vite.config";

export default mergeConfig(viteConfig, reactConfig);
