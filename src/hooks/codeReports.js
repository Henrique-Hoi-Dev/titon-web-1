import { errorNotification } from '@/utils/notification';

const downloadFile = async () => {
  try {
    const response = await fetch('/download');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'meu_arquivo.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  } catch (error) {
    errorNotification(error);
  }
};

export default downloadFile;
