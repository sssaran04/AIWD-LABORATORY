const http = require("http");
const server = http.createServer((req, res) => {
  const name = "Saran";
  const currentTime = new Date();
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>Hello from ${name}'s Node.js Server</h2>`);
    res.write(`<p>Current Date and Time: ${currentTime}</p>`);
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h2>About Page</h2>");
    res.write("<p>This server is created using Node.js</p>");
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h2>Contact Page</h2>");
    res.write("<p>Email: saran@gmail.com</p>");
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h2>404 - Page Not Found</h2>");
  }
  res.end();
});
server.listen(3000, "0.0.0.0", () => {
  console.log("Server running at http://localhost:3000");
  console.log("  http://localhost:3000/");
  console.log("  http://localhost:3000/about");
  console.log("  http://localhost:3000/contact");
  console.log("  http://localhost:3000/test");
});
