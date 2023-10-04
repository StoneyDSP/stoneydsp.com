import { serve } from "std/server";
import handler from "./handler.tsx";

console.log('Hello from og-image Function!');

serve(handler);
