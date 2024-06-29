const encrypt = require("./encrypt");
const http = require('http');
const EventEmitter = require("events");
const emitter = new EventEmitter();


emitter.on("encryptString", async (data) => {
    try {
        const value = await encrypt.encryptString(data);
        console.log(value);
    } catch (error) {
        console.error("Error in encryptString:", error);
    }
});

emitter.on("compareString", async (data) => {
    try {
        const { originalString, hash } = data;
        const value = await encrypt.compareString(originalString, hash);
        console.log(value);
    } catch (error) {
        console.error("Error in compareString:", error);
    }
});

const server = http.createServer((req, res) => {
    if (req.method === "POST" && (req.url === "/encrypt" || req.url === "/compare")) {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const data = JSON.parse(body);
            if (req.url === "/encrypt") {
                emitter.emit("encryptString", data);
            } else if (req.url === "/compare") {
                emitter.emit("compareString", data);
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "success" }));
        });
    }
    else {
        res.writeHead(404);
        res.end("Not found");
    }
})


const port = 3000;
server.listen(port, () => {
    console.log(`server running port: ${port}`);
});