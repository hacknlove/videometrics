export default {
  getSignature (instance) {
    return fetch(instance.config.getSignatureUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(instance.config.customData),
      credentials: 'include',
    }).them(res => res.json())
  },
  async send (instance, bulk) {
    const signature = await instance.config.getSignature(instance)

    const formData = new FormData();
    formData.append('Content-Type', 'application/json');
    Object.entries(signature.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("file", JSON.stringify(bulk));

    const response = await fetch(signature.url, {
      method: "POST",
      body: formData,
    });

    return response.ok
  },
  getSignatureUrl: '/api/signature',
}