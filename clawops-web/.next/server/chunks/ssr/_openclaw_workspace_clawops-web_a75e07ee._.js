module.exports=[47403,a=>{"use strict";let b=(0,a.i(43147).default)("plug",[["path",{d:"M12 22v-5",key:"1ega77"}],["path",{d:"M15 8V2",key:"18g5xt"}],["path",{d:"M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z",key:"1xoxul"}],["path",{d:"M9 8V2",key:"14iosj"}]]);a.s(["Plug",()=>b],47403)},84732,a=>{"use strict";let b=(0,a.i(43147).default)("chevron-down",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);a.s(["ChevronDown",()=>b],84732)},93187,a=>{"use strict";let b=(0,a.i(43147).default)("chevron-up",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);a.s(["ChevronUp",()=>b],93187)},82412,a=>{"use strict";let b=(0,a.i(43147).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);a.s(["Search",()=>b],82412)},99520,a=>{"use strict";let b=(0,a.i(43147).default)("users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]);a.s(["Users",()=>b],99520)},49896,a=>{"use strict";let b=(0,a.i(43147).default)("book-open",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);a.s(["BookOpen",()=>b],49896)},2790,a=>{"use strict";let b=(0,a.i(43147).default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);a.s(["ChevronRight",()=>b],2790)},72465,a=>{"use strict";let b=(0,a.i(43147).default)("server",[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]]);a.s(["Server",()=>b],72465)},43147,a=>{"use strict";var b=a.i(9510);let c=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim(),d=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)};var e={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let f=(0,b.forwardRef)(({color:a="currentColor",size:d=24,strokeWidth:f=2,absoluteStrokeWidth:g,className:h="",children:i,iconNode:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...e,width:d,height:d,stroke:a,strokeWidth:g?24*Number(f)/Number(d):f,className:c("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0;return!1})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(i)?i:[i]])),g=(a,e)=>{let g=(0,b.forwardRef)(({className:g,...h},i)=>(0,b.createElement)(f,{ref:i,iconNode:e,className:c(`lucide-${d(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,g),...h}));return g.displayName=d(a),g};a.s(["default",()=>g],43147)},2959,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},80467,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={DEFAULT_SEGMENT_KEY:function(){return l},NOT_FOUND_SEGMENT_KEY:function(){return m},PAGE_SEGMENT_KEY:function(){return k},addSearchParamsIfPageSegment:function(){return i},computeSelectedLayoutSegment:function(){return j},getSegmentValue:function(){return f},getSelectedLayoutSegmentPath:function(){return function a(b,c,d=!0,e=[]){let g;if(d)g=b[1][c];else{let a=b[1];g=a.children??Object.values(a)[0]}if(!g)return e;let h=f(g[0]);return!h||h.startsWith(k)?e:(e.push(h),a(g,c,!1,e))}},isGroupSegment:function(){return g},isParallelRouteSegment:function(){return h}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(a){return Array.isArray(a)?a[1]:a}function g(a){return"("===a[0]&&a.endsWith(")")}function h(a){return a.startsWith("@")&&"@children"!==a}function i(a,b){if(a.includes(k)){let a=JSON.stringify(b);return"{}"!==a?k+"?"+a:k}return a}function j(a,b){if(!a||0===a.length)return null;let c="children"===b?a[0]:a[a.length-1];return c===l?null:c}let k="__PAGE__",l="__DEFAULT__",m="/_not-found"},25838,a=>{"use strict";let b=(0,a.i(43147).default)("bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]);a.s(["Bot",()=>b],25838)},38740,40682,69195,a=>{"use strict";var b=a.i(43147);let c=(0,b.default)("rocket",[["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}],["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",key:"u4xsad"}],["path",{d:"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",key:"676m9"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05",key:"92ym6u"}]]);a.s(["Rocket",()=>c],38740);let d=(0,b.default)("monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);a.s(["Monitor",()=>d],40682);let e=(0,b.default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);a.s(["ArrowLeft",()=>e],69195)},64636,a=>{"use strict";var b=a.i(7808),c=a.i(9510),d=a.i(13630),e=a.i(23513),f=a.i(49896),g=a.i(38740),h=a.i(99520),i=a.i(25838),j=a.i(47403),k=a.i(40682),l=a.i(2790),m=a.i(82412),n=a.i(69195),o=a.i(72465);let p=[{section:"Getting Started",icon:g.Rocket,items:[{label:"Introduction",href:"/dashboard/docs"},{label:"Setup & Onboarding",href:"/dashboard/docs/getting-started"}]},{section:"Platform",icon:o.Server,items:[{label:"OpenClaw Agent OS",href:"/dashboard/docs/openclaw"},{label:"Gateway",href:"/dashboard/docs/gateway"}]},{section:"AI Agents",icon:i.Bot,items:[{label:"AI Agent Teams",href:"/dashboard/docs/agent-team"},{label:"Spawning Workers",href:"/dashboard/docs/spawning"}]},{section:"Core Features",icon:h.Users,items:[{label:"CRM",href:"/dashboard/docs/crm"},{label:"Social Media",href:"/dashboard/docs/social"},{label:"AI Agents",href:"/dashboard/docs/agents"}]},{section:"Browser & Tools",icon:k.Monitor,items:[{label:"Browser Automation",href:"/dashboard/docs/browser"},{label:"Skills",href:"/dashboard/docs/skills"},{label:"MCP Servers & Plugins",href:"/dashboard/docs/tools"}]},{section:"Integrations",icon:j.Plug,items:[{label:"Composio Setup",href:"/dashboard/docs/composio"},{label:"GoHighLevel (GHL)",href:"/dashboard/docs/ghl"},{label:"N8N Automation",href:"/dashboard/docs/n8n"},{label:"Browser Automation",href:"/dashboard/docs/browser"},{label:"Workspace",href:"/dashboard/docs/workspace"}]}];function q({children:a}){let g=(0,e.usePathname)(),[h,i]=(0,c.useState)(""),[j,k]=(0,c.useState)(!1),o=p.map(a=>({...a,items:a.items.filter(a=>!h||a.label.toLowerCase().includes(h.toLowerCase()))})).filter(a=>a.items.length>0);return(0,b.jsxs)("div",{className:"docs-shell",children:[(0,b.jsxs)("aside",{className:`docs-sidebar ${j?"collapsed":""}`,children:[(0,b.jsxs)("div",{className:"docs-sidebar-header",children:[(0,b.jsx)(d.default,{href:"/dashboard/docs",className:"docs-logo-link",children:(0,b.jsxs)("div",{className:"docs-logo",children:[(0,b.jsx)(f.BookOpen,{size:14}),!j&&(0,b.jsx)("span",{children:"Docs"})]})}),(0,b.jsx)("button",{className:"docs-collapse-btn hover-bg",onClick:()=>k(!j),title:j?"Expand sidebar":"Collapse sidebar",children:(0,b.jsx)(l.ChevronRight,{size:13,style:{transform:j?"rotate(0deg)":"rotate(180deg)",transition:"transform 200ms"}})})]}),!j&&(0,b.jsxs)("div",{className:"docs-search-wrap",children:[(0,b.jsx)(m.Search,{size:12,className:"docs-search-icon"}),(0,b.jsx)("input",{className:"docs-search",placeholder:"Search docs...",value:h,onChange:a=>i(a.target.value)})]}),(0,b.jsx)("nav",{className:"docs-nav",children:o.map(a=>{let c=a.icon;return(0,b.jsxs)("div",{className:"docs-nav-section",children:[(0,b.jsxs)("div",{className:"docs-nav-section-label",children:[(0,b.jsx)(c,{size:12}),!j&&(0,b.jsx)("span",{children:a.section})]}),a.items.map(a=>(0,b.jsxs)(d.default,{href:a.href,className:`docs-nav-item ${g===a.href?"active":""}`,children:[!j&&a.label,j&&(0,b.jsx)(c,{size:13})]},a.href))]},a.section)})}),(0,b.jsx)("div",{className:"docs-sidebar-footer",children:(0,b.jsxs)(d.default,{href:"/dashboard",className:"docs-back-link hover-bg",children:[(0,b.jsx)(n.ArrowLeft,{size:12}),!j&&(0,b.jsx)("span",{children:"Back to Dashboard"})]})})]}),(0,b.jsx)("main",{className:"docs-content",children:a}),(0,b.jsx)("style",{children:`
        .docs-shell {
          display: flex;
          height: calc(100vh - 52px);
          overflow: hidden;
        }
        .docs-sidebar {
          width: 220px;
          flex-shrink: 0;
          background: var(--sidebar-bg);
          border-right: 1px solid var(--separator);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: width 200ms ease-out;
        }
        .docs-sidebar.collapsed {
          width: 48px;
        }
        .docs-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 10px 8px;
          border-bottom: 1px solid var(--separator);
          min-height: 44px;
        }
        .docs-logo-link { text-decoration: none; }
        .docs-logo {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .docs-logo svg { color: var(--accent); }
        .docs-collapse-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 4px;
          border: none;
          background: transparent;
          color: var(--text-quaternary);
          cursor: pointer;
          flex-shrink: 0;
        }
        .docs-search-wrap {
          position: relative;
          padding: 8px 10px;
        }
        .docs-search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-quaternary);
          pointer-events: none;
        }
        .docs-search {
          width: 100%;
          padding: 6px 8px 6px 28px;
          background: var(--fill-quaternary);
          border: 1px solid var(--separator);
          border-radius: var(--radius-xs);
          color: var(--text-primary);
          font-size: 12px;
          outline: none;
          transition: border-color 150ms;
        }
        .docs-search:focus { border-color: var(--accent); }
        .docs-search::placeholder { color: var(--text-tertiary); }
        .docs-nav {
          flex: 1;
          overflow-y: auto;
          padding: 6px 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .docs-nav-section { display: flex; flex-direction: column; gap: 1px; }
        .docs-nav-section-label {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 6px 3px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--text-quaternary);
        }
        .docs-sidebar.collapsed .docs-nav-section-label {
          justify-content: center;
          padding: 6px 0 3px;
        }
        .docs-nav-item {
          display: block;
          padding: 6px 8px;
          border-radius: var(--radius-xs);
          font-size: 12px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: background 120ms, color 120ms;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .docs-sidebar.collapsed .docs-nav-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 7px 0;
          font-size: 13px;
        }
        .docs-nav-item:hover { background: var(--fill-secondary); color: var(--text-primary); }
        .docs-nav-item.active { background: var(--accent-fill); color: var(--accent); font-weight: 500; }
        .docs-sidebar-footer {
          padding: 8px 6px;
          border-top: 1px solid var(--separator);
        }
        .docs-back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 8px;
          border-radius: var(--radius-xs);
          font-size: 11px;
          color: var(--text-tertiary);
          text-decoration: none;
          transition: background 120ms, color 120ms;
        }
        .docs-sidebar.collapsed .docs-back-link { justify-content: center; padding: 6px 0; }
        .docs-sidebar.collapsed .docs-back-link span { display: none; }
        .docs-back-link:hover { color: var(--text-secondary); }
        .docs-content {
          flex: 1;
          overflow-y: auto;
          padding: 32px 48px;
          max-width: 860px;
        }
        @media (max-width: 768px) {
          .docs-sidebar { display: none; }
          .docs-content { padding: 24px 20px; }
        }
        /* ── Doc page typography ── */
        .doc-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-tertiary);
          margin-bottom: 24px;
        }
        .doc-breadcrumb a { color: var(--text-tertiary); text-decoration: none; }
        .doc-breadcrumb a:hover { color: var(--accent); }
        .doc-h1 { font-size: 26px; font-weight: 600; letter-spacing: -0.3px; color: var(--text-primary); margin-bottom: 8px; }
        .doc-lead { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 32px; }
        .doc-section { margin-bottom: 36px; }
        .doc-section-title { font-size: 11px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-quaternary); margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid var(--separator); }
        .doc-step { display: flex; gap: 16px; margin-bottom: 20px; }
        .doc-step-num {
          flex-shrink: 0;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: var(--accent-fill);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
          margin-top: 2px;
        }
        .doc-step-body { flex: 1; }
        .doc-step-title { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; }
        .doc-step-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 10px; }
        .doc-tip {
          display: flex; gap: 10px;
          padding: 10px 14px;
          background: var(--accent-secondary-fill);
          border: 1px solid rgba(0,209,255,0.2);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .doc-tip svg { color: var(--accent-secondary); flex-shrink: 0; margin-top: 1px; }
        .doc-warning {
          display: flex; gap: 10px;
          padding: 10px 14px;
          background: rgba(255,179,64,0.08);
          border: 1px solid rgba(255,179,64,0.2);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .doc-warning svg { color: var(--accent-energy); flex-shrink: 0; margin-top: 1px; }
        .doc-faq-item { border: 1px solid var(--separator); border-radius: var(--radius-sm); margin-bottom: 8px; overflow: hidden; }
        .doc-faq-q {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px;
          background: var(--material-thin);
          font-size: 13px; font-weight: 500; color: var(--text-primary);
          cursor: pointer;
          border: none; width: 100%; text-align: left;
          font-family: inherit;
          transition: background 120ms;
        }
        .doc-faq-q:hover { background: var(--fill-secondary); }
        .doc-faq-a { padding: 0 14px 12px; font-size: 13px; color: var(--text-secondary); line-height: 1.6; }
        .doc-card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
        .doc-card {
          display: flex; flex-direction: column; gap: 8px;
          padding: 16px;
          background: var(--material-regular);
          border: 1px solid var(--separator);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: border-color 150ms, transform 150ms, box-shadow 150ms;
        }
        .doc-card:hover { border-color: var(--accent); transform: translateY(-1px); box-shadow: var(--shadow-card); }
        .doc-card-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--accent-fill); display: flex; align-items: center; justify-content: center; color: var(--accent); }
        .doc-card-title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
        .doc-card-desc { font-size: 11px; color: var(--text-tertiary); line-height: 1.5; }
        .doc-card-arrow { margin-top: auto; color: var(--text-quaternary); }
        .doc-divider { height: 1px; background: var(--separator); margin: 28px 0; }
        .doc-inline-code {
          font-family: var(--font-mono);
          font-size: 12px;
          background: var(--code-bg);
          border: 1px solid var(--separator);
          border-radius: 3px;
          padding: 1px 6px;
          color: var(--accent-secondary);
        }
        .doc-badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: 600; background: var(--accent-fill); color: var(--accent); }
      `})]})}a.s(["default",()=>q])}];

//# sourceMappingURL=_openclaw_workspace_clawops-web_a75e07ee._.js.map