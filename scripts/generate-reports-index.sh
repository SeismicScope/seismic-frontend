#!/bin/bash

mkdir -p ./public


cat > ./public/index.html << 'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SeismicScope Reports</title>
  <style>
    body { font-family: -apple-system, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #18181b; }
    h1 { font-size: 1.8rem; margin-bottom: 24px; border-bottom: 2px solid #f4f4f5; padding-bottom: 12px; }
    .links { display: flex; flex-direction: column; gap: 12px; }
    a { display: block; padding: 16px; background: #f4f4f5; border-radius: 12px; text-decoration: none; color: inherit; font-weight: 600; transition: all 0.2s ease; border: 1px solid transparent; }
    a:hover { background: #e4e4e7; transform: translateY(-2px); border-color: #d4d4d8; }
    .type { font-size: 0.8rem; color: #71717a; font-weight: 400; margin-top: 4px; display: block; }
  </style>
</head>
<body>
  <h1>Project Reports</h1>
  <div class="links">
    <a href="./storybook/">
      Storybook Components
      <span class="type">UI Library documentation and testing</span>
    </a>
    <a href="./bundle-analysis/client.html">
      Bundle Analysis (Client)
      <span class="type">Visualization of client-side JS chunks</span>
    </a>
    <a href="./bundle-analysis/server.html">
      Bundle Analysis (Server)
      <span class="type">Node.js server-side bundle structure</span>
    </a>
  </div>
</body>
</html>
HTML

echo "✅ Reports index.html generated successfully in ./public"