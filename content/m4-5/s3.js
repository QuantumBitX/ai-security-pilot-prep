/* 4.5 · Section 3: machine-to-machine (M2M) authentication protocols and API tokens */
module.exports = {
  title: 'Machine-to-machine authentication and API tokens', covers: [3],
  blocks: [
    { type: 'video', title: 'Machines proving who they are', kicker: 'Module 4.5 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.5 · Identity and authentication', title: 'Machines proving who they are', sub: 'M2M authentication protocols and API tokens', icon: 'key',
        say: 'Most traffic in an AI platform is machine to machine: pipelines calling storage, services calling model APIs, agents calling tools. Each call has to prove who is calling. | This video compares the main machine-to-machine authentication options, and how to handle API tokens safely.' },
      { t: 'compare', title: 'Three ways for machines to authenticate', labels: ['What is stored', 'Lifetime', 'Scoping', 'Main risk'],
        cols: [{ h: 'API key', icon: 'key', k: 'threat' }, { h: 'OAuth client', icon: 'id', k: 'human' }, { h: 'Workload identity', icon: 'shieldcheck', k: 'control' }],
        rows: [
          ['A static shared string', 'Client secret or private key', 'No stored secret'],
          ['Until someone rotates it', 'Short-lived tokens', 'Minutes to hours'],
          ['Often broad', 'Scopes and audience', 'Bound to the workload'],
          ['Leaks and reuse', 'Leaked client secret', 'Misconfigured trust'] ],
        say: 'There are three main options. | An API key is a static, shared string. With OAuth client credentials, the client holds a secret or private key and exchanges it for tokens. With workload identity, nothing secret is stored at all: the platform vouches for the workload. | API keys last until someone rotates them. OAuth access tokens are short-lived. Workload identity tokens last minutes to hours and renew automatically. | API keys are often broad, OAuth tokens carry scopes and an audience, and workload identity is bound to the specific workload. | So the main risks are, respectively: leaked and reused keys, a leaked client secret, and a misconfigured trust relationship. Prefer workload identity wherever the platform supports it.' },
      { t: 'flow', title: 'Workload identity federation',
        nodes: [
          { id: 'wl', x: 220, y: 330, icon: 'gear', label: 'Workload', sub: 'pipeline or service', k: 'neutral', w: 270 },
          { id: 'idt', x: 670, y: 330, icon: 'id', label: 'Platform identity token', sub: 'signed, short-lived', k: 'data', w: 330 },
          { id: 'sts', x: 1150, y: 330, icon: 'cycle', label: 'Token exchange', sub: 'trust policy checked', k: 'human', w: 290 },
          { id: 'at', x: 1150, y: 690, icon: 'key', label: 'Access token', sub: 'scoped, audience-bound', k: 'control', w: 300 },
          { id: 'api', x: 670, y: 690, icon: 'server', label: 'Target API', sub: 'validates every claim', k: 'model', w: 290 } ],
        edges: [{ from: 'wl', to: 'idt', k: 'neutral' }, { from: 'idt', to: 'sts', k: 'data' }, { from: 'sts', to: 'at', k: 'human' }, { from: 'at', to: 'api', k: 'control' }],
        steps: [
          { show: 'wl', hi: 'wl' },
          { show: 'idt wl-idt', flow: 'wl-idt', hi: 'idt' },
          { show: 'sts idt-sts', flow: 'idt-sts', hi: 'sts' },
          { show: 'at sts-at', flow: 'sts-at', hi: 'at', mark: { at: 'lock' } },
          { show: 'api at-api', flow: 'at-api', hi: 'api', mark: { api: 'ok' } } ],
        say: 'Here is how workload identity federation removes stored secrets. A workload, such as a training pipeline, needs to reach a cloud API. | Its own platform, for example a CI system or Kubernetes, issues it a signed, short-lived identity token describing exactly which workload it is. | The workload presents that token to the target cloud’s token service, which checks it against a trust policy: right issuer, right repository or service account, right branch. | If it matches, the workload receives a short-lived access token, scoped to specific permissions and bound to one audience. | The target API validates the token’s signature, issuer, audience, expiry and scope on every call. No long-lived key was ever stored.' },
      { t: 'bullets', title: 'API token hygiene', layout: 'grid', cols: 2, items: [
          { icon: 'clock', h: 'Short lifetimes', d: 'Minutes, not months', k: 'data' },
          { icon: 'target', h: 'Narrow scope and audience', d: 'One API, least privilege', k: 'control' },
          { icon: 'lock', h: 'Bind to a key', d: 'DPoP or mTLS-bound tokens', k: 'model' },
          { icon: 'x', h: 'Keep out of prompts and code', d: 'Never in clients or logs', k: 'threat' },
          { icon: 'rollback', h: 'Rotate and revoke', d: 'Tested, fast revocation', k: 'human' },
          { icon: 'eye', h: 'Monitor use', d: 'Spend, volume, location', k: 'neutral' } ],
        say: 'Whatever the mechanism, handle tokens carefully. | Keep lifetimes short: minutes, not months. | Give each token a narrow scope and a single audience. | Where possible, bind tokens to a key, using proof-of-possession or mutual TLS, so a stolen token can’t be replayed. | Keep tokens out of prompts, source code, client apps and logs. | Be able to rotate and revoke quickly, and test that you can. | And monitor use: unusual spend, volume or location can reveal a stolen key.' },
      { t: 'summary', items: ['Prefer workload identity; then OAuth; API keys only where unavoidable', 'Federation swaps platform identity for short-lived, scoped tokens', 'Validate signature, issuer, audience, expiry and scope', 'Short-lived, bound, scoped tokens; never in prompts, code or clients'],
        say: 'To recap. | Prefer workload identity, then OAuth client credentials, and use static API keys only where nothing else is possible. | Workload identity federation exchanges a platform-issued identity for short-lived, scoped tokens, with no stored secret. | APIs must validate every token’s signature, issuer, audience, expiry and scope. | And keep tokens short-lived, bound, narrowly scoped, and out of prompts, code and client apps.' } ] },
    { type: 'text', md: `### M2M protocols and patterns
| Mechanism | How it works | Notes |
|---|---|---|
| **API keys** | A static secret sent with each request | Simple but weak: often broad, long-lived and copied into many places. If unavoidable, scope per project, set spend limits and IP allow-lists, and rotate |
| **OAuth 2.0 client credentials** | A client authenticates to an authorisation server and receives a short-lived access token | Prefer private-key JWT client authentication (RFC 7523) or mTLS over shared client secrets |
| **Mutual TLS (mTLS)** | Both sides present certificates | Strong service-to-service authentication; certificates must be short-lived and rotated automatically |
| **Workload identity federation** | A platform-issued identity token (for example, from a CI system or Kubernetes) is exchanged for cloud credentials under a trust policy | Removes stored secrets; trust policies must be precise (repository, branch, service account) |
| **SPIFFE and SPIRE** | An open standard and runtime that issue short-lived identities (SVIDs, as X.509 certificates or JWTs) to workloads, based on attestation | Portable workload identity across clusters and clouds |
| **Kubernetes service account tokens** | Projected, audience-bound, expiring tokens for pods | Avoid legacy non-expiring tokens |

MCP servers use OAuth 2.1, and must accept only tokens issued for them (Module 4.1).

### Validating tokens
Every API should check a token’s **signature** (with the expected algorithm and a trusted key), **issuer**, **audience**, **expiry** and not-before time, and **scopes**. Reject tokens meant for other services, because accepting them enables confused deputy attacks. Prefer short-lived tokens with server-side revocation for high-risk actions.

### A cautionary case
In 2023, researchers at Wiz found that Microsoft AI researchers had shared open-source training material through a cloud storage link whose token granted **full control of the entire storage account**, with an expiry date decades away. The account held about 38 TB of internal data, including secrets, private keys and internal messages. The lesson: scope tokens to the exact resource and permission, keep lifetimes short, and track every token you issue.

### Model provider API keys
- Keep them **server-side**: never embed them in mobile apps, browsers or desktop clients; route requests through your own backend or AI gateway.
- Use **separate keys per application and environment**, with spending limits and usage alerts.
- Prefer **federated or workload-based access** to cloud-hosted models where the platform offers it.
- Treat a leaked key as an incident: revoke, review usage and cost, find the source (Section 5).` },
    { type: 'callout', kind: 'exam', title: 'M2M questions', md: `The strongest answer usually **removes the stored secret** (workload identity federation) or makes credentials **short-lived, scoped and bound**. Rotating a long-lived key more often is better than nothing, but rarely the best option.` },
    { type: 'check', q: { q: 'A CI pipeline deploys models to a cloud account using a long-lived access key stored in the CI system’s settings. Which change BEST reduces the risk of credential theft?', o: ['Rotate the access key every 30 days, and limit who can view the CI settings', 'Use workload identity federation, so the pipeline receives short-lived, scoped credentials', 'Encrypt the stored access key with the CI system’s built-in secret masking feature', 'Copy the access key into each individual pipeline job, so that no single place holds all of it'], a: 1, b: 3,
      why: 'Federation replaces the stored key with short-lived credentials issued only to the verified pipeline, so there is nothing long-lived to steal. Rotation and masking still leave a powerful static key, and copying it spreads the risk.' } }
  ]
};
