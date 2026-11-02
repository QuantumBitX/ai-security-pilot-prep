/* 4.5 · Section 4: federated identities, MFA and SSO */
module.exports = {
  title: 'Federated identity, MFA and single sign-on for AI', covers: [4],
  blocks: [
    { type: 'video', title: 'One identity, many AI tools', kicker: 'Module 4.5 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.5 · Identity and authentication', title: 'One identity, many AI tools', sub: 'Federation, single sign-on and multi-factor authentication', icon: 'users',
        say: 'Staff now use dozens of AI tools and platforms. A separate password for each would be a security and governance nightmare, and leavers would keep access for months. | This video covers federated identity, single sign-on and multi-factor authentication for AI platforms and tools.' },
      { t: 'flow', title: 'Single sign-on through federation',
        nodes: [
          { id: 'u', x: 220, y: 330, icon: 'user', label: 'User', sub: 'opens an AI tool', k: 'human', w: 260 },
          { id: 'idp', x: 680, y: 330, icon: 'shieldcheck', label: 'Identity provider', sub: 'MFA, conditional access', k: 'control', w: 320 },
          { id: 'tok', x: 1160, y: 330, icon: 'doc', label: 'Signed assertion', sub: 'SAML or OIDC token', k: 'data', w: 300 },
          { id: 'app', x: 1160, y: 690, icon: 'model', label: 'AI application', sub: 'trusts the provider', k: 'model', w: 290 },
          { id: 'scim', x: 680, y: 690, icon: 'cycle', label: 'SCIM provisioning', sub: 'create and remove users', k: 'neutral', w: 320 },
          { id: 'off', x: 220, y: 690, icon: 'power', label: 'One switch', sub: 'disable once, everywhere', k: 'threat', w: 280 } ],
        edges: [{ from: 'u', to: 'idp', k: 'human' }, { from: 'idp', to: 'tok', k: 'control' }, { from: 'tok', to: 'app', k: 'data' }, { from: 'app', to: 'scim', k: 'model' }, { from: 'scim', to: 'off', k: 'neutral' }],
        steps: [
          { show: 'u', hi: 'u' },
          { show: 'idp u-idp', flow: 'u-idp', hi: 'idp', mark: { idp: 'lock' } },
          { show: 'tok idp-tok', flow: 'idp-tok', hi: 'tok' },
          { show: 'app tok-app', flow: 'tok-app', hi: 'app' },
          { show: 'scim app-scim', flow: 'app-scim', hi: 'scim' },
          { show: 'off scim-off', flow: 'scim-off', hi: 'off', mark: { off: 'ok' } } ],
        say: 'Here is single sign-on through federation. A user opens an AI tool. | Instead of a local password, the tool sends them to the organisation’s identity provider, which enforces multi-factor authentication and conditional access checks, such as device health and location. | The identity provider returns a signed assertion, using SAML or OpenID Connect. | The AI application trusts that assertion and starts a session, without ever seeing a password. | Alongside it, SCIM provisioning creates, updates and removes accounts in the tool automatically. | So when someone leaves, disabling them once in the identity provider removes their access everywhere.' },
      { t: 'compare', title: 'SAML and OpenID Connect', labels: ['Format', 'Built on', 'Typical use'],
        cols: [{ h: 'SAML 2.0', icon: 'doc', k: 'neutral' }, { h: 'OpenID Connect', icon: 'id', k: 'data' }],
        rows: [
          ['XML assertions', 'JSON web tokens'],
          ['Its own XML standard', 'OAuth 2.0'],
          ['Enterprise web SSO', 'Web, mobile and APIs'] ],
        say: 'Two federation protocols dominate. | SAML uses signed XML assertions. OpenID Connect uses JSON web tokens. | SAML is a standalone XML standard. OpenID Connect adds an identity layer on top of OAuth 2.0, which on its own handles authorisation, not authentication. | SAML remains common for enterprise web single sign-on. OpenID Connect suits modern web, mobile and API scenarios, and most new AI platforms support it.' },
      { t: 'bullets', title: 'MFA that resists phishing', layout: 'grid', cols: 2, items: [
          { icon: 'fingerprint', h: 'Passkeys and FIDO2', d: 'Phishing-resistant by design', k: 'control' },
          { icon: 'id', h: 'Smart cards', d: 'Certificate-based, strong', k: 'data' },
          { icon: 'phone', h: 'Push with number matching', d: 'Better than plain approve', k: 'human' },
          { icon: 'x', h: 'Avoid SMS for admins', d: 'Interceptable, swappable', k: 'threat' },
          { icon: 'globe', h: 'Conditional access', d: 'Device, location, risk', k: 'neutral' },
          { icon: 'shield', h: 'Step-up for sensitive actions', d: 'Re-verify at the moment of risk', k: 'model' } ],
        say: 'Not all multi-factor authentication is equal. | Passkeys and other FIDO2 authenticators are phishing-resistant by design, because they only work on the genuine site. | Smart cards and certificate-based methods are also strong. | If you use push notifications, require number matching, which defeats approval-fatigue attacks. | Avoid SMS and voice codes for administrators, because they can be intercepted or hijacked through SIM swaps. | Apply conditional access based on device, location and risk. | And require step-up authentication for sensitive AI actions, such as approving an agent’s payment or exporting model weights.' },
      { t: 'bullets', title: 'Federation for AI-specific cases', items: [
          { icon: 'cloud', h: 'AI SaaS tools', d: 'SSO only; block personal accounts', k: 'data' },
          { icon: 'gear', h: 'Model platform consoles', d: 'MFA and just-in-time admin', k: 'threat' },
          { icon: 'code', h: 'Notebooks and dev tools', d: 'SSO and short sessions', k: 'neutral' },
          { icon: 'robot', h: 'Agents acting for users', d: 'Delegated OAuth, never passwords', k: 'model' },
          { icon: 'building', h: 'Partners and suppliers', d: 'Federate, don’t create accounts', k: 'human' } ],
        say: 'Federation matters in five AI-specific places. | AI software-as-a-service tools should accept only corporate single sign-on, and block personal accounts, which also reduces shadow AI. | Model platform and cloud AI consoles need strong MFA and just-in-time administrative access. | Notebooks and developer tools should use single sign-on with short sessions. | Agents acting for users should get delegated OAuth tokens with consent, never a user’s password. | And partners should sign in through federation with their own identity provider, rather than with local accounts you have to remember to remove.' },
      { t: 'summary', items: ['Federate AI tools to one identity provider; provision with SCIM', 'SAML for enterprise web SSO; OIDC for modern apps and APIs', 'Phishing-resistant MFA, conditional access and step-up', 'SSO-only AI SaaS; delegated OAuth for agents; federate partners'],
        say: 'To recap. | Federate every AI tool to one identity provider, and provision and deprovision accounts with SCIM. | SAML suits enterprise web single sign-on; OpenID Connect suits modern apps and APIs. | Use phishing-resistant MFA, conditional access, and step-up authentication for sensitive actions. | And enforce single sign-on for AI services, delegated OAuth for agents, and federation for partners.' } ] },
    { type: 'text', md: `### Federation concepts
- **Identity provider (IdP):** authenticates users and issues assertions or tokens; enforces MFA and conditional access.
- **Service provider or relying party:** the application that trusts the IdP, such as an AI SaaS tool or model platform console.
- **SAML 2.0:** XML-based, widely used for enterprise web SSO.
- **OpenID Connect (OIDC):** an identity layer on OAuth 2.0, issuing ID tokens (JWTs); suited to web, mobile, APIs and single-page apps.
- **OAuth 2.0:** delegated *authorisation*, not authentication. Using an OAuth access token as proof of identity is a classic design error.
- **SCIM:** a standard API for provisioning and deprovisioning accounts and groups in connected applications.
- **Just-in-time provisioning:** creating an account at first login from the assertion; pair it with SCIM or regular reviews so accounts are also removed.

### MFA strength
NIST SP 800-63B defines authenticator assurance levels: higher levels require stronger, phishing-resistant authenticators, and SMS-based codes are restricted. CISA and other agencies recommend **phishing-resistant MFA** (FIDO2 passkeys or PKI-based smart cards) for privileged users and high-value systems. Push approval alone is vulnerable to **MFA fatigue**: in the 2022 Uber breach, an attacker repeatedly sent push requests and contacted the employee posing as IT support until a request was approved. Number matching and phishing-resistant methods counter this.

### AI-specific practice
- **Enforce SSO for AI services**, including enterprise tiers of public chatbots, and use domain controls to stop staff signing up with corporate email on personal plans (Module 2.6 covers shadow AI).
- **Privileged AI access:** consoles for model platforms, vector databases and training clusters need phishing-resistant MFA, just-in-time elevation and session recording for administrators (Module 4.6).
- **Session management:** short session lifetimes for high-risk tools, re-authentication for sensitive actions, and revocation when risk changes.
- **Agents:** use delegated OAuth flows with explicit consent and scoped tokens (Section 2); never store or share user passwords with an agent.
- **Customers:** offer passkeys and MFA for customer-facing AI services that act on accounts or payments.
- **Partners:** federate with partner identity providers, with attribute mapping and access reviews, rather than creating local accounts.` },
    { type: 'callout', kind: 'exam', title: 'Federation and MFA questions', md: `Prefer **centralised SSO with SCIM deprovisioning** over local accounts, **phishing-resistant MFA** over SMS or plain push, and **step-up authentication** for high-risk actions. Remember that **OAuth is for authorisation**; OpenID Connect adds authentication.` },
    { type: 'check', q: { q: 'An audit finds that 40 former employees still have active accounts on an AI writing platform, because accounts there are created and removed by hand. What is the BEST fix?', o: ['Ask managers to email IT whenever someone leaves, so the account can be removed', 'Federate the platform to the corporate IdP with SSO, and provision accounts through SCIM', 'Reset every account’s password each quarter, so that former employees are unable to sign in', 'Disable the platform’s accounts once a year during the annual access review'], a: 1, b: 4,
      why: 'Federation means disabling a user in the IdP blocks sign-in everywhere, and SCIM removes the account in the platform automatically. Manual emails and annual reviews are slow and error-prone, and password resets don’t remove access.' } }
  ]
};
