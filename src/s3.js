export default {
  getSignature (instance) {
    return fetch(instance.mergedConfig.getSignatureUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(instance.mergedConfig.customData)
    }).them(res => res.json())
  },
  async send (instance, bulk) {
    const signature = instance.mergedConfig.signature ?? await instance.mergedConfig.getSignature(instance)

    const formData = new FormData();
    formData.append('Content-Type', 'application/json');
    Object.entries(signature.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("file", JSON.stringify(bulk));

    const response = await fetch(uploadRon.url, {
      method: "POST",
      body: formData,
    });

    return response.ok
  }
}