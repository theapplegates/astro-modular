import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

function parseViewsFromBase(content: string) {
  const lines = content.split(/\r?\n/);
  const views: any[] = [];
  let inViews = false;
  let current: any | null = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inViews) {
      if (/^views:\s*$/.test(line.trim())) {
        inViews = true;
      }
      continue;
    }
    // Stop if we hit an unindented line (end of views)
    if (inViews && line.trim() !== '' && !/^\s+/.test(line)) break;

    // Start of a new view
    if (/^\s*-\s*type:\s*/.test(line)) {
      if (current) views.push(current);
      current = { name: '', folder: '', order: [], sort: null as any, limit: undefined as number | undefined };
      continue;
    }
    if (!current) continue;

    const nameMatch = line.match(/^\s*name:\s*(.+)$/);
    if (nameMatch) {
      current.name = nameMatch[1].trim().replace(/^"|"$/g, '');
      continue;
    }
    const limitMatch = line.match(/^\s*limit:\s*(\d+)/);
    if (limitMatch) {
      current.limit = Number(limitMatch[1]);
      continue;
    }
    const folderMatch = line.match(/file\.folder\.startsWith\(\"([^\"]+)\"\)/);
    if (folderMatch) {
      current.folder = folderMatch[1];
      continue;
    }
    if (/^\s*order:\s*$/.test(line)) {
      // Read subsequent indented dash lines
      let j = i + 1;
      while (j < lines.length) {
        const l = lines[j];
        if (/^\s*-\s+/.test(l)) {
          const val = l.replace(/^\s*-\s+/, '').trim();
          current.order.push(val);
          j++;
          continue;
        }
        if (/^\s*(sort|name|type|filters|image|cardSize|imageAspectRatio|columnSize):/.test(l) || /^\s*-\s*type:/.test(l) || (l.trim() !== '' && !/^\s+/.test(l))) {
          break;
        }
        j++;
      }
      i = j - 1;
      continue;
    }
    if (/^\s*sort:\s*$/.test(line)) {
      // Look ahead for property and direction
      const propLine = lines[i + 1] || '';
      const dirLine = lines[i + 2] || '';
      const propMatch = propLine.match(/property:\s*([^\r\n]+)/);
      const dirMatch = dirLine.match(/direction:\s*([^\r\n]+)/);
      if (propMatch && dirMatch) {
        current.sort = { property: propMatch[1].trim(), direction: dirMatch[1].trim().toUpperCase() === 'DESC' ? 'DESC' : 'ASC' };
      }
      continue;
    }
  }
  if (current) views.push(current);
  return views;
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const name = (url.searchParams.get('name') || 'home').replace(/[^a-zA-Z0-9-_]/g, '');
    const basePath = path.join(process.cwd(), 'src', 'content', '_bases', `${name}.base`);
    if (!fs.existsSync(basePath)) {
      return new Response(JSON.stringify({ error: 'base not found', name }), { status: 404 });
    }
    const text = fs.readFileSync(basePath, 'utf8');

    const views = parseViewsFromBase(text);

    const chosen = (views.find(v => (v.name || '').toLowerCase() === 'posts') || views[0]) || null;

    let rows: any[] = [];
    if (chosen && (chosen.folder || '').startsWith('posts')) {
      const { getCollection } = await import('astro:content');
      const posts = await getCollection('posts');
      // map to rows
      rows = posts.map((p: any) => ({
        title: p.data.title,
        path: `/posts/${p.id}`,
        date: p.data.date ? new Date(p.data.date).toISOString().slice(0, 10) : null
      })).filter(r => !!r.title && !!r.date);
      if (chosen.sort?.property && String(chosen.sort.property).toLowerCase().includes('date')) {
        const dir = chosen.sort.direction === 'DESC' ? -1 : 1;
        rows.sort((a, b) => ((new Date(a.date).getTime() - new Date(b.date).getTime()) * dir));
      }
      if (chosen.limit && chosen.limit > 0) {
        rows = rows.slice(0, chosen.limit);
      }
      // Apply order to columns
      const order = chosen.order?.length ? chosen.order : ['title','formula.Slug','date'];
      const columns = order.map((o: string) => o.toLowerCase() === 'formula.slug' ? 'path' : (o.toLowerCase().startsWith('note.') ? o.split('.').slice(1).join('.') : o));
      rows = rows.map((r) => {
        const out: any = {};
        columns.forEach((c) => out[c] = (r as any)[c]);
        return out;
      });
      return new Response(JSON.stringify({ name, chosen, columns, count: rows.length, rows }), { status: 200 });
    }

    return new Response(JSON.stringify({ name, chosen, columns: [], count: rows.length, rows }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'debug failure' }), { status: 500 });
  }
};


