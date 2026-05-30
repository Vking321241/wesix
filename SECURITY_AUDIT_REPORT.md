# Security Audit Report

## Executive summary
- **Project:** WeSix.io — landing page + blog editorial client-side CMS
- **Framework detected:** Next.js App Router — `output: "export"` (static site, sem servidor)
- **Audit date:** 2026-05-30
- **Overall assessment:** Dois problemas críticos confirmados no painel administrativo que permitem bypass total de autenticação e expõem a senha em texto claro no bundle JavaScript público. O restante dos findings do scanner automático é composto por falsos positivos originados dos artefatos compilados em `out/` (18 findings descartados) e uso legítimo de localStorage para dados de blog (não credenciais).

---

## Scope
- Paths revisados no código-fonte: `src/app/admin/page.tsx`, `src/app/blog/[slug]/BlogArticleClient.tsx`, `src/app/blog/preview/page.tsx`, `src/app/blog/page.tsx`, `src/app/features/page.tsx`, `src/app/page.tsx`, `next.config.ts`
- Superfícies de alto risco priorizadas: autenticação do admin, renderização de HTML arbitrário, persistência de dados no cliente

---

## Findings

### Critical

#### CRIT-01 — Senha de admin hardcoded no bundle JavaScript público

- **Severity:** critical
- **Confidence:** high
- **Status:** confirmed
- **Evidence:** `src/app/admin/page.tsx:169` — `if (password === "WeSix@2026")`
- **Impact:** Qualquer pessoa pode abrir o DevTools do navegador, inspecionar o bundle JS ou o source map, e descobrir a senha `WeSix@2026` sem precisar atacar nada. A "proteção por senha" é ilusória.
- **Affected files:** `src/app/admin/page.tsx`
- **Recommended fix:** Nunca compare senhas no lado do cliente. Como o projeto usa `output: "export"` (sem servidor), a opção mais segura é mover o painel admin para um subdomínio separado com autenticação server-side (ex: Vercel, Netlify Functions, ou um servidor Node/Bun com sessão HTTP). Se precisar permanecer puramente estático, proteja a rota `/admin` no nível do servidor de borda (Nginx básica auth, Cloudflare Access, ou EasyPanel password protect).

---

#### CRIT-02 — Bypass de autenticação via console do navegador

- **Severity:** critical
- **Confidence:** high
- **Status:** confirmed
- **Evidence:** `src/app/admin/page.tsx:151-153`
  ```js
  const sessionAuth = sessionStorage.getItem("wesix_admin_auth");
  if (sessionAuth === "true") { setIsAuthenticated(true); }
  ```
- **Impact:** Qualquer visitante pode digitar no console:
  ```js
  sessionStorage.setItem("wesix_admin_auth", "true")
  ```
  e recarregar a página `/admin` para obter acesso completo ao painel sem conhecer a senha. A lógica de autenticação existe apenas no cliente e é trivialmente contornável.
- **Affected files:** `src/app/admin/page.tsx`
- **Recommended fix:** Autenticação não pode ser controlada por estado client-side. Mesma solução do CRIT-01: mover para server-side ou aplicar proteção no nível da infraestrutura.

---

### High

#### HIGH-01 — XSS armazenado via `dangerouslySetInnerHTML` com conteúdo do editor

- **Severity:** high
- **Confidence:** medium
- **Status:** probable
- **Evidence:**
  - `src/app/blog/[slug]/BlogArticleClient.tsx:151` — `dangerouslySetInnerHTML={{ __html: post.content }}`
  - `src/app/blog/preview/page.tsx:122` — idem
  - O conteúdo vem do editor WYSIWYG via `editorRef.current.innerHTML` (contentEditable), salvo sem sanitização no localStorage.
- **Impact:** Se um atacante obtiver acesso ao painel admin (via CRIT-01 ou CRIT-02), pode criar um post com HTML/script malicioso que será executado no navegador de qualquer visitante que abrir o artigo. Mesmo sem atacante externo, o editor aceita `<script>`, `<img onerror=...>` e outros vetores XSS.
- **Affected files:** `src/app/blog/[slug]/BlogArticleClient.tsx`, `src/app/blog/preview/page.tsx`, `src/app/admin/page.tsx`
- **Recommended fix:** Sanitizar o HTML antes de armazenar e antes de renderizar usando `DOMPurify`:
  ```ts
  import DOMPurify from "dompurify";
  // ao salvar:
  const safeContent = DOMPurify.sanitize(editorRef.current.innerHTML);
  // ao renderizar:
  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
  ```

---

#### HIGH-02 — Painel admin sem proteção server-side

- **Severity:** high
- **Confidence:** high
- **Status:** confirmed
- **Evidence:** `next.config.ts` define `output: "export"`. Não existe middleware, API route, ou qualquer proteção de rota no servidor. A rota `/admin` é pública e acessível por qualquer pessoa.
- **Impact:** Combinado com CRIT-01 e CRIT-02, o painel editorial completo (criar/editar/deletar posts, gerenciar autores e categorias) está efetivamente aberto.
- **Affected files:** `next.config.ts`, `src/app/admin/page.tsx`
- **Recommended fix:** Proteger a rota `/admin` na camada de infraestrutura. No EasyPanel/Nginx, adicionar autenticação básica HTTP para o path `/admin`. Alternativamente, mover o admin para um projeto Next.js separado com SSR.

---

### Medium

#### MED-01 — Ausência de Content Security Policy (CSP)

- **Severity:** medium
- **Confidence:** high
- **Status:** confirmed
- **Evidence:** Nenhuma configuração de cabeçalho CSP encontrada em `next.config.ts`, `nginx.conf`, ou qualquer middleware.
- **Impact:** Sem CSP, scripts injetados via XSS têm permissão irrestrita de executar no contexto da página, enviar dados para domínios externos, e roubar localStorage.
- **Affected files:** `next.config.ts`, `nginx.conf`
- **Recommended fix:** Adicionar ao `nginx.conf`:
  ```nginx
  add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;" always;
  ```

---

### Low

#### LOW-01 — `document.execCommand` depreciado no editor WYSIWYG

- **Severity:** low
- **Confidence:** high
- **Status:** confirmed
- **Evidence:** `src/app/admin/page.tsx:347` — `document.execCommand(command, false, value)`
- **Impact:** API marcada como depreciada nos browsers modernos. Sem impacto de segurança imediato, mas pode parar de funcionar em versões futuras do Chrome/Safari.
- **Affected files:** `src/app/admin/page.tsx`
- **Recommended fix:** Substituir por uma biblioteca de rich text como Tiptap ou Quill quando houver oportunidade.

---

## Manual review items

- Verificar se o Nginx do EasyPanel (conforme `nginx.conf`) aplica algum rate limiting ou restrição de acesso ao path `/admin` antes do Next.js processar a rota.
- Confirmar se o repositório Git em `git@github.com:Vking321241/wesix.git` nunca teve um arquivo `.env` com segredos commitado — executar `git log --all --full-history -- .env` para verificar histórico.
- Revisar se a rota `/blog/preview` deve ser indexável por buscadores ou deve estar bloqueada em `robots.txt`, pois exibe rascunhos não publicados.

---

## Falsos positivos descartados

- **22 findings em `out/_next/static/chunks/*.js`:** São artefatos do build compilado/minificado. O scanner detectou padrões heurísticos no código transpilado de bibliotecas de terceiros (React Router, etc.). Não representam vulnerabilidades no código da aplicação.
- **6 findings de "localStorage token" nos arquivos fonte:** O uso de localStorage é para persistência de dados editoriais (`wesix_posts`, `wesix_authors`, `wesix_post_views`, etc.), não para armazenamento de tokens de autenticação ou credenciais. O único item de sessão (`wesix_admin_auth`) já está coberto pelo CRIT-02.

---

## Remediation roadmap

### Imediato (antes do próximo deploy)
1. **CRIT-01 + CRIT-02:** Proteger `/admin` no Nginx com `auth_basic` (solução emergencial de 10 minutos) enquanto a solução definitiva não está pronta:
   ```nginx
   location /admin {
     auth_basic "Admin Area";
     auth_basic_user_file /etc/nginx/.htpasswd;
     try_files $uri $uri.html /index.html;
   }
   ```
2. **HIGH-01:** Instalar `dompurify` e sanitizar o conteúdo no save e no render.

### Esta semana
3. **MED-01:** Adicionar headers de segurança no `nginx.conf` (CSP, X-Frame-Options, X-Content-Type-Options).
4. **HIGH-02:** Avaliar migração do painel admin para Netlify/Vercel com proteção de rota server-side ou Cloudflare Access.

### Este mês
5. **LOW-01:** Substituir `document.execCommand` por Tiptap ou editor similar.
6. Revisar se a estratégia de CMS client-side (localStorage) é adequada para o longo prazo ou se deve migrar para um CMS headless (Sanity, Directus, Strapi).

---

## Before/after delta
- Resolved findings: N/A (primeiro audit)
- New findings: 2 critical, 2 high, 1 medium, 1 low
- Remaining risks: Admin panel security is the top priority; XSS via dangerouslySetInnerHTML is the second.
