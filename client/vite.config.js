import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";
import "dotenv/config";

export default defineConfig({
    plugins: [react()],
    define: {
        "process.env":process.env,
    },
    server: {
        https: {
            key: fs.readFileSync("./ssl/client.key"),
            cert: fs.readFileSync("./ssl/client.cert"),
        },
        host:"0.0.0.0",
        open:true,
        port:8443,
    }
})
