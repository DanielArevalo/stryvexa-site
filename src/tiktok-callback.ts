const panel = document.getElementById('callback')!;
const indicator = document.getElementById('indicator')!;
const title = document.getElementById('status-title')!;
const message = document.getElementById('status-message')!;
const openApp = document.querySelector<HTMLButtonElement>('#open-app')!;
const params = new URLSearchParams(window.location.search);
const isAndroid = /Android/i.test(navigator.userAgent);

if (params.has('error') || !params.get('code')?.trim()) {
  panel.dataset.state = 'error';
  indicator.textContent = '!';
  title.textContent = 'No se pudo continuar con TikTok';
  message.textContent = params.get('error') === 'access_denied'
    ? 'La autorización se canceló. Puedes volver a Stryvexa e intentarlo de nuevo.'
    : 'TikTok no devolvió una autorización válida. Vuelve a Stryvexa e inicia la conexión de nuevo.';
} else {
  panel.dataset.state = 'success';
  indicator.textContent = '✓';
  title.textContent = 'Autorización recibida';
  message.textContent = isAndroid
    ? 'Abre Stryvexa para completar la conexión. Si Android no abre la app, revisa que Stryvexa tenga permitido abrir enlaces compatibles y vuelve a pulsar el botón.'
    : 'Vuelve a Stryvexa en el dispositivo donde iniciaste la conexión para continuar.';

  if (isAndroid) {
    openApp.hidden = false;
    openApp.addEventListener('click', () => {
      const appLink = 'stryvexa.ormivexa.com/tiktok-callback';
      const response = window.location.search + window.location.hash;
      // Chrome vuelve a este mismo callback si Android no puede abrir la app.
      const fallback = encodeURIComponent(window.location.href);
      const intent = `intent://${appLink}${response}#Intent;scheme=https;package=com.stryvexa.app;S.browser_fallback_url=${fallback};end`;
      window.location.assign(intent);
    });
  }
}

export {};
