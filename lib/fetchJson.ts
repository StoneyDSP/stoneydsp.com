/// <reference types="node" />

export const fetchJson = <T extends json = json>(
  file: string | URL
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    // eslint-disable-next-line no-var
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        // file protocol returns 0
        // http(s) protocol returns 200
        if (xhr.status === 0 || xhr.status === 200)
          resolve(JSON.parse(xhr.responseText) as T);
        else reject(xhr.statusText);
      }
    };
    xhr.open("GET", file);
    xhr.send(null);
  });
};

export const fetchJsonAsync = async <T extends json = json>(
  file: string | URL
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    // eslint-disable-next-line no-var
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        // file protocol returns 0
        // http(s) protocol returns 200
        if (xhr.status === 0 || xhr.status === 200)
          resolve(JSON.parse(xhr.responseText) as T);
        else reject(xhr.statusText);
      }
    };
    xhr.open("GET", file, true);
    xhr.send(null);
  });
};
