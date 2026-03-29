import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = Number(process.env.PORT || 8082);

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function safeJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function parseTaskFile(text) {
  const lines = text.split(/\r?\n/);
  let currentPriority = null;
  const tasks = [];
  let current = null;

  const finishCurrent = () => {
    if (current) {
      tasks.push(current);
      current = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    const pMatch = line.match(/^###\s+(P\d)\s+—/);
    if (pMatch) {
      finishCurrent();
      currentPriority = pMatch[1];
      continue;
    }

    const taskMatch = line.match(/^- \[(TODO|DOING|BLOCKED|DONE|DEFERRED)\]\s+\*\*(.+?)\*\*/);
    if (taskMatch) {
      finishCurrent();
      current = {
        priority: currentPriority,
        status: taskMatch[1],
        title: taskMatch[2],
        owner: '',
        goal: '',
        currentState: '',
        nextAction: '',
        definitionOfDone: []
      };
      continue;
    }

    if (!current) continue;

    const ownerMatch = line.match(/^\s*-\s+Owner:\s+(.+)$/);
    if (ownerMatch) { current.owner = ownerMatch[1].trim(); continue; }

    const goalMatch = line.match(/^\s*-\s+Goal:\s+(.+)$/);
    if (goalMatch) { current.goal = goalMatch[1].trim(); continue; }

    const stateMatch = line.match(/^\s*-\s+Current state:\s+(.+)$/);
    if (stateMatch) { current.currentState = stateMatch[1].trim(); continue; }

    const nextMatch = line.match(/^\s*-\s+Next action:\s+(.+)$/);
    if (nextMatch) { current.nextAction = nextMatch[1].trim(); continue; }

    const dodMatch = line.match(/^\s*-\s+Definition of done:/);
    if (dodMatch) { current._inDod = true; continue; }

    const dodItem = line.match(/^\s*-\s+(.+)$/);
    if (current._inDod && dodItem && !ownerMatch && !goalMatch && !stateMatch && !nextMatch) {
      current.definitionOfDone.push(dodItem[1].trim());
      continue;
    }

    if (!line.startsWith('    ') && !line.startsWith('- Definition of done')) {
      current._inDod = false;
    }
  }

  finishCurrent();
  return tasks.map(({ _inDod, ...task }) => task);
}

function parseOperatingPriorities(text) {
  const block = text.split('## Operating Priorities')[1]?.split('## Active Queue')[0] || '';
  return block
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => /^\d+\./.test(l))
    .map(l => l.replace(/^\d+\.\s*/, ''));
}

function parseTable(text, heading) {
  const after = text.split(heading)[1];
  if (!after) return [];
  const block = after.split('\n\n---')[0];
  return block
    .split(/\r?\n/)
    .filter(line => line.trim().startsWith('|') && !line.includes('---'))
    .slice(1)
    .map(line => line.split('|').slice(1, -1).map(cell => cell.trim()));
}

function parseNotionIndex(text) {
  const links = [];
  let section = 'General';
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.startsWith('## ')) {
      section = line.replace(/^##\s+/, '');
      continue;
    }
    if (line.startsWith('- https://')) {
      links.push({ section, label: section, url: line.slice(2) });
      continue;
    }
    const bullet = line.match(/^-\s+(.+)$/);
    if (bullet) {
      links.push({ section, label: bullet[1], url: '' });
      continue;
    }
    if (line.startsWith('https://www.notion.so/')) {
      const last = links[links.length - 1];
      if (last && !last.url) last.url = line;
    }
  }
  return links.filter(x => x.url);
}

function getAgentBindings() {
  const config = safeJson('/root/.openclaw/openclaw.json');
  const ids = new Set(['henry', 'ryan', 'arjun', 'dev', 'dave', 'kyle', 'tyler']);
  return (config.agents?.list || [])
    .filter(a => ids.has(a.id))
    .map(a => {
      const heartbeatTo = a.heartbeat?.to || '';
      const topicId = heartbeatTo.includes(':topic:') ? heartbeatTo.split(':topic:')[1] : null;
      const chatId = heartbeatTo.includes(':topic:') ? heartbeatTo.split(':topic:')[0] : null;
      return {
        key: a.id,
        name: a.name || a.id,
        topicId,
        chatId,
        model: typeof a.model === 'string' ? a.model : a.model?.primary || null,
        fallback: typeof a.model === 'object' && a.model?.fallbacks?.length ? a.model.fallbacks[0] : null,
        heartbeatEvery: a.heartbeat?.every || null,
        workspace: a.workspace || null
      };
    });
}

function buildState() {
  const tasksMd = read('TASKS.md');
  const overviewMd = read('docs/SYSTEM-OVERVIEW.md');
  const notionIndexMd = read('docs/NOTION-INDEX.md');
  const tasks = parseTaskFile(tasksMd);
  const operatingPriorities = parseOperatingPriorities(tasksMd);
  const infraRows = parseTable(overviewMd, '## 🏗️ Current Infrastructure').map(([component, status, purpose]) => ({ component, status, purpose }));
  const appRows = parseTable(overviewMd, '## 🔌 Apps & Integrations Connected').map(([app, status, purpose]) => ({ app, status, purpose }));
  const laneRows = parseTable(overviewMd, '## 💬 Operating Model — Telegram Lanes').map(([lane, agent, topic, model, role]) => ({ lane, agent, topic, model, role }));
  const counts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      totalTasks: tasks.length,
      p0Open: tasks.filter(t => t.priority === 'P0' && !['DONE', 'DEFERRED'].includes(t.status)).length,
      blockers: tasks.filter(t => t.status === 'BLOCKED').length,
      doing: counts.DOING || 0,
      todo: counts.TODO || 0,
      done: counts.DONE || 0
    },
    operatingPriorities,
    tasks,
    infrastructure: infraRows,
    integrations: appRows,
    lanes: laneRows,
    agents: getAgentBindings(),
    notionLinks: parseNotionIndex(notionIndexMd)
  };
}

function contentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (filePath.endsWith('.json')) return 'application/json; charset=utf-8';
  return 'text/plain; charset=utf-8';
}

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url, `http://${req.headers.host}`);
  let pathname = parsed.pathname;
  if (pathname === '/dashboard') pathname = '/';
  if (pathname.startsWith('/dashboard/')) pathname = pathname.slice('/dashboard'.length);

  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, service: 'mission-control' }));
    return;
  }

  if (pathname === '/api/state') {
    try {
      const state = buildState();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(state, null, 2));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(PUBLIC_DIR, filePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType(filePath) });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Mission Control running on http://0.0.0.0:${PORT}`);
});
