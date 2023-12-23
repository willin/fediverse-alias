const INSTANCE = 'log.lu';

const handler: ExportedHandler = {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    if (url.pathname === '/.well-known/nodeinfo') {
      return new Response(
        JSON.stringify({
          links: [
            {
              rel: 'http://nodeinfo.diaspora.software/ns/schema/2.0',
              href: `https://${INSTANCE}/nodeinfo/2.0`
            }
          ]
        }),
        {
          headers: {
            'content-type': 'application/json;charset=UTF-8'
          }
        }
      );
    }
    const subject = url.searchParams.get('resource') || '';
    if (!/^acct:[^@]+@[^@]+$/.test(subject)) {
      return new Response('', { status: 400 });
    }
    const [, alias] = subject.split(':');

    const DB = env.DB as D1Database;
    const stmt = DB.prepare('SELECT * FROM aliases WHERE alias = ?1 AND valid = 1').bind(alias);
    const result = await stmt.first();
    if (result?.account) {
      const [, domain] = result.account.split('@');
      return fetch(`https://${domain}/.well-known/webfinger?resource=${result.account}`, req);
    }

    if (subject.endsWith(`@${INSTANCE}`)) {
      return fetch(`https://${INSTANCE}/.well-known/webfinger?resource=${subject}`, req);
    }

    return new Response('', { status: 404 });
  }
};

export default handler;
