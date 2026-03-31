# Chrome Route Fix Notes

- Tailscale Serve path `/chrome/` proxies to `http://127.0.0.1:5800`.
- The chrome-vnc container's nginx originally only handled `/` and `/websockify`.
- Fix applied inside container `chrome-vnc-new`:
  - add `location /chrome/websockify` to the same VNC unix socket
  - add `location /chrome/` rewrite so static noVNC assets work under subpath
- Verification:
  - `/chrome/` => 200
  - `/chrome/app/ui.js` => 200
  - `/chrome/websockify` => 400 on plain HTTP (expected for websocket endpoint)
- Note: this fix currently lives inside the running container config and should be baked into the image or startup process later if we want it durable across container recreation.
