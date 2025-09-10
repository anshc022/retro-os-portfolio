// Lightweight JSONP helper (no dependencies)
export default function jsonp(url, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const callbackName = `__jsonp_cb_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const hasQuery = url.includes("?");
    const jsonpUrl = `${url}${hasQuery ? "&" : "?"}callback=${callbackName}`;

    const script = document.createElement('script');
    script.src = jsonpUrl;
    script.async = true;

    let timer = setTimeout(() => {
      cleanup();
      reject(new Error('JSONP request timed out'));
    }, timeoutMs);

    function cleanup() {
      if (script.parentNode) script.parentNode.removeChild(script);
      try { delete window[callbackName]; } catch (_) { window[callbackName] = undefined; }
      if (timer) clearTimeout(timer);
      timer = null;
    }

    window[callbackName] = (data) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('JSONP network error'));
    };

    document.body.appendChild(script);
  });
}
