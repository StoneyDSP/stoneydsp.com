export function patchSocialMetaToAbsolute() {
  const origin = window.location.origin;

  const ogUrl = document.querySelector<HTMLMetaElement>(
    'meta[property="og:url"]'
  );
  if (ogUrl && ogUrl.content === "/") ogUrl.content = origin + "/";

  const twSite = document.querySelector<HTMLMetaElement>(
    'meta[name="twitter:site"]'
  );
  if (twSite && twSite.content.startsWith("http") === false) {
    twSite.content = origin;
  }

  const metas = document.querySelectorAll<HTMLMetaElement>(
    'meta[property="og:image"], meta[name="twitter:image"]'
  );
  metas.forEach((m) => {
    const c = m.getAttribute("content") || "";
    if (c.startsWith("/")) m.setAttribute("content", origin + c);
  });

  const canon = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (canon && canon.getAttribute("href") === "/")
    canon.setAttribute("href", origin + "/");
}
