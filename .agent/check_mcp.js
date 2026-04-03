const { spawn } = require('child_process');
const fs = require('fs');

async function listTools(serverCommand, args, envAdditions) {
  return new Promise((resolve) => {
    const server = spawn(serverCommand, args, {
      env: { ...process.env, ...envAdditions },
      shell: true
    });

    let tools = null;

    server.stdout.on('data', (data) => {
      const lines = data.toString().split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const msg = JSON.parse(line);
          if (msg.id === 2 && msg.result && msg.result.tools) {
            tools = msg.result.tools;
            server.kill();
            resolve(tools);
          }
        } catch (e) {}
      }
    });

    const initMsg = {
      jsonrpc: "2.0", id: 1, method: "initialize",
      params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "0.1" } }
    };
    const toolsMsg = { jsonrpc: "2.0", id: 2, method: "tools/list" };

    server.stdin.write(JSON.stringify(initMsg) + '\n');
    setTimeout(() => {
      server.stdin.write(JSON.stringify(toolsMsg) + '\n');
    }, 1000);

    setTimeout(() => { if (!tools) { server.kill(); resolve(null); } }, 5000);
  });
}

(async () => {
  let output = "MCP TOOLS SUMMARY\n=================\n\n";
  
  const githubTools = await listTools('npx', ['-y', '@modelcontextprotocol/server-github'], {
    GITHUB_PERSONAL_ACCESS_TOKEN: 'placeholder'
  });
  if (githubTools) {
    output += "GitHub MCP:\n" + githubTools.map(t => " - " + t.name).join('\n') + "\n\n";
  } else {
    output += "GitHub MCP: Failed to fetch\n\n";
  }

  const pwTools = await listTools('npx', ['-y', '@playwright/mcp'], {});
  if (pwTools) {
    output += "Playwright MCP:\n" + pwTools.map(t => " - " + t.name).join('\n') + "\n\n";
  } else {
    output += "Playwright MCP: Failed to fetch\n\n";
  }
  
  fs.writeFileSync('.agent/mcp_tools.txt', output);
  console.log("Done. Wrote to .agent/mcp_tools.txt");
})();
