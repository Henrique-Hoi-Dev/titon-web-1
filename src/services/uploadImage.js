import api from '@/services/api'

/**
 * Faz upload de imagem para o backend e retorna a URL.
 * @param {File} file - Arquivo da imagem
 * @param {string} url - URL do recurso associado (ex: truck, cart, driver)
 * @param {string} id - ID do recurso associado (ex: truckId)
 * @param {Function} [onUploadProgress] - Callback para progresso de upload
 * @returns {Promise<string>} - URL da imagem no S3 (ou outro storage)
 */
export const uploadImage = async ({ url, file, body, id, onUploadProgress }) => {
  if (!file || !id || !url) throw new Error('Arquivo, ID e URL são obrigatórios.')

  const formData = new FormData()
  formData.append('file', file)

  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const response = await api.patch(`/${url}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  })

  return response.data?.data
}
