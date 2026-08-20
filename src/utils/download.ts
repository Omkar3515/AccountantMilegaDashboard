import api from './api';

export const downloadFile = async (url?: string, fileName?: string) => {
  try {
    // Primary method: Download via authenticated backend proxy (prevents CORS & enforces attachment download)
    const response = await api.get('/candidate/resume/download', {
      responseType: 'blob',
    });

    const contentType = String(response.headers['content-type'] || 'application/pdf');
    const blob = response.data instanceof Blob
      ? response.data
      : new Blob([response.data], { type: contentType });

    // If backend returned a JSON error (e.g. 404 or 500), parse and throw
    if (blob.type && blob.type.includes('json')) {
      const text = await blob.text();
      const json = JSON.parse(text);
      throw new Error(json.message || 'Failed to download resume');
    }

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 500);
  } catch (error) {
    console.warn('Backend download proxy failed, trying direct URL fetch fallback:', error);
    if (url) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Direct fetch failed');
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName || 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => {
          window.URL.revokeObjectURL(blobUrl);
        }, 500);
      } catch (err) {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.download = fileName || 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
};
