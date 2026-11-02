/* 4.7 · Section 2: provisioning and deprovisioning transitions */
module.exports = {
  title: 'Provisioning and deprovisioning for AI identities', covers: [2],
  blocks: [
    { type: 'video', title: 'Joiners, movers, leavers, and agents', kicker: 'Module 4.7 · Video 2 of 4', scenes: [
      { t: 'title', kicker: 'Module 4.7 · Identity lifecycle', title: 'Joiners, movers, leavers, and agents', sub: 'Provisioning and deprovisioning transitions', icon: 'cycle',
        say: 'Access is easiest to get right at the moments when it changes: when someone joins, moves, or leaves, and when an agent is created, changed or retired. | This video covers provisioning and deprovisioning for human and non-human identities in AI systems.' },
      { t: 'flow', title: 'Joiner, mover, leaver',
        nodes: [
          { id: 'hr', x: 220, y: 330, icon: 'building', label: 'HR event', sub: 'source of truth', k: 'neutral', w: 270 },
          { id: 'j', x: 680, y: 330, icon: 'user', label: 'Joiner', sub: 'birthright access via SCIM', k: 'human', w: 310 },
          { id: 'm', x: 1150, y: 330, icon: 'split', label: 'Mover', sub: 'add new, remove old', k: 'data', w: 280 },
          { id: 'l', x: 1150, y: 690, icon: 'power', label: 'Leaver', sub: 'disable within hours', k: 'threat', w: 290 },
          { id: 'rv', x: 680, y: 690, icon: 'key', label: 'Revoke everything', sub: 'tokens, keys, sessions', k: 'control', w: 310 },
          { id: 'tr', x: 220, y: 690, icon: 'users', label: 'Transfer ownership', sub: 'agents, models, data', k: 'model', w: 300 } ],
        edges: [{ from: 'hr', to: 'j', k: 'neutral' }, { from: 'j', to: 'm', k: 'human' }, { from: 'm', to: 'l', k: 'data' }, { from: 'l', to: 'rv', k: 'threat' }, { from: 'rv', to: 'tr', k: 'control' }],
        steps: [
          { show: 'hr', hi: 'hr' },
          { show: 'j hr-j', flow: 'hr-j', hi: 'j' },
          { show: 'm j-m', flow: 'j-m', hi: 'm' },
          { show: 'l m-l', flow: 'm-l', hi: 'l', mark: { l: 'alert' } },
          { show: 'rv l-rv', flow: 'l-rv', hi: 'rv', mark: { rv: 'lock' } },
          { show: 'tr rv-tr', flow: 'rv-tr', hi: 'tr', mark: { tr: 'ok' } } ],
        say: 'For people, the HR system is the source of truth, and every change starts there. | A joiner receives birthright access to approved AI tools automatically, through the identity provider and SCIM, based on their role. | A mover gets the access for their new role, and, just as importantly, loses the access from the old one. Movers are where privileges quietly accumulate. | A leaver is disabled in the identity provider within hours, or immediately if the departure is hostile. | Then everything else is revoked: refresh tokens, OAuth grants to AI apps, personal API keys and active sessions. | Finally, ownership of anything they owned is transferred: agents, models, datasets and scheduled jobs.' },
      { t: 'flow', title: 'The lifecycle of an agent identity',
        nodes: [
          { id: 'rq', x: 220, y: 330, icon: 'doc', label: 'Request', sub: 'purpose, sponsor, risk', k: 'neutral', w: 290 },
          { id: 'ap', x: 680, y: 330, icon: 'check', label: 'Approve', sub: 'tools and scopes', k: 'control', w: 280 },
          { id: 'pv', x: 1150, y: 330, icon: 'key', label: 'Provision', sub: 'identity, credentials, registry', k: 'data', w: 330 },
          { id: 'op', x: 1150, y: 690, icon: 'eye', label: 'Operate', sub: 'monitor, rotate', k: 'model', w: 270 },
          { id: 'ch', x: 680, y: 690, icon: 'branch', label: 'Change', sub: 're-approve new scopes', k: 'human', w: 300 },
          { id: 'rt', x: 220, y: 690, icon: 'archive', label: 'Retire', sub: 'revoke, remove, archive', k: 'threat', w: 300 } ],
        edges: [{ from: 'rq', to: 'ap', k: 'neutral' }, { from: 'ap', to: 'pv', k: 'control' }, { from: 'pv', to: 'op', k: 'data' }, { from: 'op', to: 'ch', k: 'model' }, { from: 'ch', to: 'rt', k: 'human' }],
        steps: [
          { show: 'rq', hi: 'rq' },
          { show: 'ap rq-ap', flow: 'rq-ap', hi: 'ap' },
          { show: 'pv ap-pv', flow: 'ap-pv', hi: 'pv', mark: { pv: 'lock' } },
          { show: 'op pv-op', flow: 'pv-op', hi: 'op' },
          { show: 'ch op-ch', flow: 'op-ch', hi: 'ch' },
          { show: 'rt ch-rt', flow: 'ch-rt', hi: 'rt', mark: { rt: 'ok' } } ],
        say: 'Agents need a lifecycle too. It starts with a request that states the agent’s purpose, its sponsor and its risk. | Approval covers exactly which tools and scopes it receives. | Provisioning creates its own identity and scoped credentials, and registers it in the inventory. | In operation, it is monitored, and its credentials are rotated automatically. | Any change to its tools or scopes goes back through approval, just like a new request. | And when it is no longer needed, it is retired: credentials revoked, tools removed, memory deleted and logs archived for the retention period.' },
      { t: 'bullets', title: 'Deprovisioning gaps in AI environments', layout: 'grid', cols: 2, items: [
          { icon: 'key', h: 'Personal API keys', d: 'Outlive the person who made them', k: 'threat' },
          { icon: 'robot', h: 'Orphaned agents', d: 'Keep running after their owner leaves', k: 'model' },
          { icon: 'plug', h: 'OAuth grants', d: 'AI apps keep refresh tokens', k: 'data' },
          { icon: 'clock', h: 'Long sessions', d: 'Tools stay signed in for weeks', k: 'neutral' },
          { icon: 'code', h: 'Scheduled jobs', d: 'Notebooks running as the leaver', k: 'human' },
          { icon: 'database', h: 'Owned assets', d: 'Datasets and fine-tunes with no owner', k: 'control' } ],
        say: 'Disabling the main account isn’t enough in AI environments. Six gaps are common. | Personal API keys for model providers and AI platforms, which outlive the person who created them. | Agents built by the leaver, which keep running with no one responsible. | OAuth grants to AI apps, which hold refresh tokens that keep working after the password is gone. | Long-lived sessions in AI tools that stay signed in for weeks. | Scheduled notebooks and jobs that run under the leaver’s identity. | And datasets, fine-tuned models and prompts that no longer have an owner.' },
      { t: 'summary', items: ['HR drives joiner, mover and leaver changes through the IdP and SCIM', 'Movers lose old access; leavers are disabled within hours', 'Revoke tokens, OAuth grants, keys and sessions; transfer ownership', 'Agents: request, approve, provision, operate, change, retire'],
        say: 'To recap. | Drive joiner, mover and leaver changes from HR, through the identity provider and SCIM. | Make sure movers lose old access, and disable leavers within hours. | Revoke every token, OAuth grant, key and session, and transfer ownership of agents, models and data. | And give agents a full lifecycle: request, approve, provision, operate, change and retire.' } ] },
    { type: 'text', md: `### Human lifecycle
- **Joiner:** HR creates the record; the IdP provisions **birthright roles** for approved AI tools through **SCIM**; additional access is requested and approved.
- **Mover:** access is recalculated for the new role; old access is removed, not just added to. Time-limited overlap may be allowed for handover.
- **Leaver:** disable in the IdP promptly (immediately for terminations for cause); revoke sessions, refresh tokens and OAuth grants; disable personal access tokens and API keys; reassign owned agents, models, datasets, notebooks and scheduled jobs; recover devices.
- **Contractors and partners:** accounts carry end dates; sponsors confirm continued need; federated partner accounts follow the partner’s own lifecycle (Module 4.5).

**Continuous access evaluation** standards (CAEP, part of the OpenID Shared Signals Framework) let an identity provider tell connected applications instantly that a session must end, rather than waiting for tokens to expire.

### Non-human and agent lifecycle
| Stage | Controls |
|---|---|
| **Request** | Purpose, sponsor, data and tools required, risk tier |
| **Approve** | Least-privilege scopes (Module 4.6); approval proportionate to risk |
| **Provision** | Distinct identity, short-lived or workload-based credentials, inventory entry, monitoring |
| **Operate** | Automatic credential rotation, usage monitoring, periodic review |
| **Change** | Any new tool, scope or data source goes through approval again |
| **Retire** | Revoke credentials and tokens, remove tool connections, delete memory and caches, archive logs per retention, update inventory and AIBOM |

Expire by default: temporary agents and project service accounts get end dates, and are disabled automatically unless renewed by their sponsor.

### Disable, then delete
Disable first: it is immediate and reversible. Delete later, once ownership of dependent assets has been transferred, investigations are closed and retention requirements are met. Deleting too quickly can break dependent services and destroy evidence; never deleting leaves dormant identities behind.` },
    { type: 'scenario', title: 'The departed data scientist', md: `A data scientist leaves on good terms. IT disables her account the same day. Three weeks later, finance notices continued charges on a model provider account, and security finds that a scheduled notebook she wrote is still pulling customer data nightly, using a personal API key and an OAuth grant she approved for an AI analytics app.`,
      q: { q: 'Which improvement to the leaver process would MOST likely have prevented this?', o: ['Reminding departing staff in their exit interview to delete any keys and apps they created', 'Automatically revoking personal keys, OAuth grants and scheduled jobs, and transferring ownership', 'Disabling leavers’ accounts a full week before their last day, so there is time to check everything', 'Asking the model provider to block any further usage of the account once it notices leavers'], a: 1, b: 2,
        why: 'Deprovisioning must cover every credential type and transfer ownership of running assets, ideally automatically from the inventory. Reminders rely on memory, early disabling doesn’t find hidden keys, and providers can’t know who has left.' } },
    { type: 'callout', kind: 'exam', title: 'Lifecycle questions', md: `The best answers are **automated** and **driven by HR or the inventory**: SCIM for people, mandatory sponsors and expiry for non-human identities, and a leaver process that revokes **all** credential types and **transfers ownership**. Watch for movers keeping old access.` },
    { type: 'check', q: { q: 'An ML engineer moved from the fraud team to the marketing team six months ago. A review finds she still has write access to the fraud model registry and fraud training data. What process failure does this show?', o: ['A joiner failure, because her original access was granted without enough checks', 'A mover failure: new access was added, but the old access was never removed', 'A leaver failure, because she should have been removed from the company directory', 'No failure, because engineers often help their former teams after moving'], a: 1, b: 2,
      why: 'Mover processes must remove access that the new role doesn’t need. Accumulated privileges from past roles are a common source of excess access and toxic combinations.' } }
  ]
};
