import type { APIRoute } from 'astro';
import { Buffer } from 'node:buffer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const textData = await request.text();
    const params = new URLSearchParams(textData);
    const rawPayload = params.get('payload');

    if (!rawPayload) {
      throw new Error("Не отримано дані пейлоаду від форми");
    }

    const data = JSON.parse(rawPayload);
    
    // БЕЗПЕЧНИЙ ВИКЛИК ТОКЕНА (немає ризику блокування GitHub)
    const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;
    const REPO_OWNER = 'VolyaCore';
    const REPO_NAME = 'VolyaCoreWatch';

    if (!GITHUB_TOKEN) {
      throw new Error("Не вказано GitHub токен у змінних середовища!");
    }

    const FILE_PATH = 'src/data/lakorns.json';
    const getFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    
    const fileRes = await fetch(getFileUrl, {
      headers: { 
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Astro-Admin-Panel'
      }
    });
    
    let lakornsList = [];
    let sha = '';

    if (fileRes.ok) {
      const fileData = await fileRes.json().catch(() => ({}));
      sha = fileData.sha || '';
      if (fileData.content) {
        try {
          const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf8');
          lakornsList = JSON.parse(decodedContent);
        } catch (e) {
          lakornsList = [];
        }
      }
    }

    if (!Array.isArray(lakornsList)) {
      lakornsList = [];
    }

    const existingIndex = lakornsList.findIndex((item: any) => item.id === data.id);
    if (existingIndex >= 0) {
      lakornsList[existingIndex] = data;
    } else {
      lakornsList.push(data);
    }

    const updatedContent = Buffer.from(JSON.stringify(lakornsList, null, 2), 'utf8').toString('base64');

    const updateRes = await fetch(getFileUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Astro-Admin-Panel'
      },
      body: JSON.stringify({
        message: `Admin: update lakorn -> ${data.title}`,
        content: updatedContent,
        ...(sha ? { sha } : {})
      })
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text().catch(() => 'Невідома помилка GitHub');
      throw new Error(`GitHub відхилив запит: ${errText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Помилка сервера' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};