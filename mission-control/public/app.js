const statusTitles = {
  TODO: 'Todo',
  DOING: 'In Progress',
  BLOCKED: 'Blocked',
  DONE: 'Done',
  DEFERRED: 'Deferred'
};

let loading = false;

async function load() {
  if (loading) return;
  loading = true;
  try {
    const res = await fetch('./api/state', { cache: 'no-store' });
    const state = await res.json();
    render(state);
    const ts = state?.generatedAt ? new Date(state.generatedAt) : new Date();
    const el = document.getElementById('lastUpdated');
    if (el) el.textContent = `Last updated: ${ts.toLocaleTimeString()}`;
  } finally {
    loading = false;
  }
}

function chip(text, className = '') {
  return `<span class="chip ${className}">${text}</span>`;
}

function clean(text = '') {
  return String(text).replace(/\*\*/g, '');
}

function byPriority(tasks) {
  const rank = { P0: 0, P1: 1, P2: 2, P3: 3 };
  return [...tasks].sort((a, b) => (rank[a.priority] ?? 99) - (rank[b.priority] ?? 99));
}

function formatTaskCard(t, status) {
  return `
    <article class="task-card ${status.toLowerCase()}">
      <div class="card-top">
        ${chip(t.priority || '—', (t.priority || '').toLowerCase())}
        ${chip(t.owner || 'Unassigned')}
      </div>
      <h4>${t.title}</h4>
      ${t.goal ? `<p>${t.goal}</p>` : ''}
      ${t.currentState ? `<div class="meta"><strong>Current:</strong> ${t.currentState}</div>` : ''}
      ${t.nextAction ? `<div class="meta"><strong>Next:</strong> ${t.nextAction}</div>` : ''}
    </article>
  `;
}

function listTask(task, tone = '') {
  return `
    <div class="priority-item ${tone}">
      <div class="priority-top">
        <div class="priority-title-wrap">
          <strong>${task.title}</strong>
          <div class="priority-chips">${chip(task.priority || '—', (task.priority || '').toLowerCase())}${chip(task.status || '—', (task.status || '').toLowerCase())}</div>
        </div>
      </div>
      ${task.currentState ? `<div class="muted">${task.currentState}</div>` : ''}
      ${task.nextAction ? `<div class="priority-next"><strong>Next:</strong> ${task.nextAction}</div>` : ''}
    </div>
  `;
}

function render(state) {
  document.getElementById('notionLink').href = state.notionLinks.find(x => /HQ Dashboard/i.test(x.label))?.url || '#';

  const activeTasks = byPriority(state.tasks.filter(t => ['TODO', 'DOING', 'BLOCKED'].includes(t.status)));
  const topTasks = activeTasks.filter(t => ['P0', 'P1'].includes(t.priority)).slice(0, 4);
  const blockers = byPriority(state.tasks.filter(t => t.status === 'BLOCKED'));
  const doing = byPriority(state.tasks.filter(t => t.status === 'DOING')).slice(0, 4);
  const todo = byPriority(state.tasks.filter(t => t.status === 'TODO')).slice(0, 6);
  const done = byPriority(state.tasks.filter(t => t.status === 'DONE')).slice(0, 6);
  const deferred = byPriority(state.tasks.filter(t => t.status === 'DEFERRED')).slice(0, 6);

  document.getElementById('headline').textContent = `${state.summary.p0Open} P0 items open · ${state.summary.blockers} blockers · ${state.summary.doing} actively moving`;
  document.getElementById('heroSub').textContent = topTasks[0]?.nextAction || 'Refresh after updating TASKS.md or SYSTEM-OVERVIEW.md.';
  document.getElementById('heroActions').innerHTML = topTasks.slice(0, 2).map(t => `
    <div class="hero-action-card">
      <span class="eyebrow">Next move</span>
      <strong>${t.title}</strong>
      <span class="muted">${t.nextAction || t.currentState || t.goal || 'No next action recorded yet.'}</span>
    </div>
  `).join('') || '<div class="hero-action-card"><strong>No active moves</strong><span class="muted">Board is clear or needs fresh backlog input.</span></div>';

  const stats = [
    ['Open Tasks', activeTasks.length],
    ['P0 Open', state.summary.p0Open],
    ['In Progress', state.summary.doing],
    ['Blocked', state.summary.blockers],
    ['Done', state.summary.done]
  ];
  document.getElementById('stats').innerHTML = stats.map(([label, value]) => `
    <div class="stat-card">
      <div class="stat-value">${value}</div>
      <div class="stat-label">${label}</div>
    </div>
  `).join('');

  document.getElementById('topPriorities').innerHTML = topTasks.map(t => listTask(t, 'focus')).join('') || '<div class="empty">No priority items right now.</div>';
  document.getElementById('blockers').innerHTML = blockers.map(t => listTask(t, 'blocked')).join('') || '<div class="empty">No active blockers. Keep shipping.</div>';

  document.getElementById('nextMoves').innerHTML = activeTasks
    .filter(t => t.nextAction)
    .slice(0, 3)
    .map(t => `<li><strong>${t.title}</strong><span>${t.nextAction}</span></li>`)
    .join('') || '<li><strong>No immediate next moves logged.</strong><span>Update TASKS.md to drive the board.</span></li>';

  document.getElementById('systemSnapshot').innerHTML = state.infrastructure.slice(0, 8)
    .map(item => `<div class="row"><strong>${clean(item.component)}</strong>${chip(clean(item.status))}</div>`)
    .join('');

  document.getElementById('agentBindings').innerHTML = state.agents
    .map(a => `<div class="row stacked agent-row"><strong>${clean(a.name)}</strong><span>Topic ${a.topicId || '—'} · ${clean(a.model || '—')}</span><span class="muted">Fallback: ${clean(a.fallback || '—')} · ${clean(a.heartbeatEvery || 'No heartbeat')}</span></div>`)
    .join('');

  document.getElementById('notionAssets').innerHTML = state.notionLinks.slice(0, 10)
    .map(link => `<a class="notion-link" href="${link.url}" target="_blank" rel="noreferrer"><strong>${clean(link.label)}</strong><span class="muted">${clean(link.section)}</span></a>`)
    .join('');

  document.getElementById('boardPrimary').innerHTML = renderColumn('In Progress', doing, 'DOING') + renderColumn('Todo Queue', todo, 'TODO') + renderColumn('Blocked', blockers, 'BLOCKED');
  document.getElementById('boardSecondary').innerHTML = renderColumn('Done', done, 'DONE') + renderColumn('Deferred', deferred, 'DEFERRED');

  document.getElementById('lanes').innerHTML = table(
    ['Lane', 'Agent', 'Topic', 'Model'],
    state.lanes.map(l => [clean(l.lane), clean(l.agent), clean(l.topic), clean(l.model)])
  );

  document.getElementById('integrations').innerHTML = table(
    ['App', 'Status', 'Purpose'],
    state.integrations.map(i => [clean(i.app), clean(i.status), clean(i.purpose)])
  );
}

function renderColumn(title, tasks, status) {
  return `
    <section class="column ${status.toLowerCase()}">
      <div class="column-head">
        <h3>${title}</h3>
        ${chip(tasks.length)}
      </div>
      <div class="cards">
        ${tasks.map(t => formatTaskCard(t, status)).join('') || '<div class="empty">No items</div>'}
      </div>
    </section>
  `;
}

function table(headers, rows) {
  return `
    <table>
      <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c || '—'}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
  `;
}

document.getElementById('refreshBtn').addEventListener('click', load);
load().catch(err => {
  document.body.innerHTML = `<pre style="padding:20px;color:#fff">Failed to load Mission Control: ${err.message}</pre>`;
});
setInterval(() => {
  load().catch(() => {});
}, 30000);
