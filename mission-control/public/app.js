const statusOrder = ['TODO', 'DOING', 'BLOCKED', 'DONE', 'DEFERRED'];
const statusTitles = {
  TODO: 'Todo',
  DOING: 'In Progress',
  BLOCKED: 'Blocked',
  DONE: 'Done',
  DEFERRED: 'Deferred'
};

async function load() {
  const res = await fetch('./api/state', { cache: 'no-store' });
  const state = await res.json();
  render(state);
}

function chip(text, className = '') {
  return `<span class="chip ${className}">${text}</span>`;
}

function render(state) {
  document.getElementById('notionLink').href = state.notionLinks.find(x => /HQ Dashboard/i.test(x.label))?.url || '#';

  const stats = [
    ['Open Tasks', state.summary.totalTasks],
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

  document.getElementById('nextMoves').innerHTML = state.tasks
    .filter(t => ['P0', 'P1'].includes(t.priority) && t.nextAction && !['DONE', 'DEFERRED'].includes(t.status))
    .slice(0, 3)
    .map(t => `<li><strong>${t.title}</strong><br><span>${t.nextAction}</span></li>`)
    .join('');

  document.getElementById('systemSnapshot').innerHTML = state.infrastructure.slice(0, 8)
    .map(item => `<div class="row"><strong>${item.component.replace(/\*\*/g, '')}</strong>${chip(item.status)}</div>`)
    .join('');

  document.getElementById('agentBindings').innerHTML = state.agents
    .map(a => `<div class="row stacked"><strong>${a.name}</strong><span>Topic ${a.topicId || '—'} · ${a.model || '—'}</span><span class="muted">Fallback: ${a.fallback || '—'}</span></div>`)
    .join('');

  document.getElementById('notionAssets').innerHTML = state.notionLinks.slice(0, 8)
    .map(link => `<div class="row stacked"><a href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a><span class="muted">${link.section}</span></div>`)
    .join('');

  document.getElementById('board').innerHTML = statusOrder.map(status => {
    const tasks = state.tasks.filter(t => t.status === status);
    return `
      <section class="column">
        <div class="column-head">
          <h3>${statusTitles[status]}</h3>
          ${chip(tasks.length)}
        </div>
        <div class="cards">
          ${tasks.map(t => `
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
          `).join('') || '<div class="empty">No items</div>'}
        </div>
      </section>
    `;
  }).join('');

  document.getElementById('lanes').innerHTML = table(
    ['Lane', 'Agent', 'Topic', 'Model'],
    state.lanes.map(l => [l.lane, l.agent, l.topic, l.model])
  );

  document.getElementById('integrations').innerHTML = table(
    ['App', 'Status', 'Purpose'],
    state.integrations.map(i => [i.app, i.status, i.purpose])
  );
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
