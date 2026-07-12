export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Якщо запит прийшов на pages.dev — редіректимо
  if (url.hostname === "volyacorewatch.pages.dev") {
    url.hostname = "volyacore.com";
    return Response.redirect(url.toString(), 301);
  }

  // Для volyacore.com віддаємо сайт без редіректу
  return context.next();
}
