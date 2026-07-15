export function toast(message: string) {
  const el = document.createElement('div');

  el.innerText = message;

  el.className =
    'fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-md shadow-lg z-50';

  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 2000);
}
