fetch("/download")
  .then((response) => {
    // Salva o arquivo xlsx no disco local
    return response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "meu_arquivo.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  })
  .catch((error) => {
    console.error(error);
  });
