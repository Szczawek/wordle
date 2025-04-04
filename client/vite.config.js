import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";

export default defineConfig({
    plugins: [react()],
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
