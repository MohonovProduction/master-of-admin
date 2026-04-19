import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/shared/api'

/**
 * @typedef {Object} MediaItem
 * @property {number|string} id
 * @property {string} url
 * @property {string} name
 * @property {number} size - в байтах
 * @property {string} type - 'image' | 'video' | 'document'
 * @property {string} createdAt
 */

/**
 * @typedef {Object} UploadQueueItem
 * @property {string} id - уникальный ID загрузки
 * @property {File} file
 * @property {string} name
 * @property {number} progress - 0-100
 * @property {string} status - 'uploading' | 'success' | 'error'
 * @property {string|null} error
 * @property {MediaItem|null} result
 */

export const useMediaStore = defineStore('media', () => {
  // ==================== State ====================
  const mediaItems = ref([])
  const uploadQueue = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ==================== Getters ====================
  /** @type {import('vue').ComputedRef<MediaItem[]>} */
  const imageMedia = computed(() =>
    mediaItems.value.filter(m => m.type === 'image')
  )

  /** @type {import('vue').ComputedRef<MediaItem[]>} */
  const activeUploads = computed(() =>
    uploadQueue.value.filter(u => u.status === 'uploading')
  )

  /** @type {import('vue').ComputedRef<boolean>} */
  const isUploading = computed(() =>
    activeUploads.value.length > 0
  )

  // ==================== Actions ====================

  /**
   * Получение списка медиафайлов
   */
  async function fetchMedia() {
    loading.value = true
    error.value = null
    try {
      const res = await api.get('/media')
      mediaItems.value = res.data
    } catch (err) {
      error.value = err.message || 'Ошибка загрузки медиа'
      console.error('[MediaStore] fetchMedia error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Загрузка файла с эмуляцией прогресса
   * @param {File} file
   * @returns {Promise<MediaItem>}
   */
  async function uploadFile(file) {
    const uploadId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const queueItem = {
      id: uploadId,
      file,
      name: file.name,
      progress: 0,
      status: 'uploading',
      error: null,
      result: null
    }
    
    uploadQueue.value.push(queueItem)
    error.value = null

    try {
      // Эмуляция прогресса загрузки
      await simulateUploadProgress(uploadId)

      // Отправка на сервер
      const formData = new FormData()
      formData.append('file', file)
      
      const res = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      // Обновление очереди
      const queueIndex = uploadQueue.value.findIndex(u => u.id === uploadId)
      if (queueIndex !== -1) {
        uploadQueue.value[queueIndex].status = 'success'
        uploadQueue.value[queueIndex].progress = 100
        uploadQueue.value[queueIndex].result = res.data
      }

      // Добавление в общий список
      mediaItems.value.unshift(res.data)
      
      return res.data
    } catch (err) {
      const queueIndex = uploadQueue.value.findIndex(u => u.id === uploadId)
      if (queueIndex !== -1) {
        uploadQueue.value[queueIndex].status = 'error'
        uploadQueue.value[queueIndex].error = err.message
      }
      
      error.value = err.message || 'Ошибка загрузки файла'
      console.error('[MediaStore] uploadFile error:', err)
      throw err
    }
  }

  /**
   * Удаление медиафайла
   * @param {number|string} id
   */
  async function deleteMedia(id) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/media/${id}`)
      mediaItems.value = mediaItems.value.filter(m => m.id !== id)
    } catch (err) {
      error.value = err.message || 'Ошибка удаления медиа'
      console.error('[MediaStore] deleteMedia error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Очистка завершённых загрузок из очереди
   */
  function clearCompletedUploads() {
    uploadQueue.value = uploadQueue.value.filter(
      u => u.status === 'uploading'
    )
  }

  /**
   * Эмуляция прогресса загрузки
   * @param {string} uploadId
   * @returns {Promise<void>}
   */
  function simulateUploadProgress(uploadId) {
    return new Promise((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          
          const queueIndex = uploadQueue.value.findIndex(u => u.id === uploadId)
          if (queueIndex !== -1) {
            uploadQueue.value[queueIndex].progress = 100
          }
          
          resolve()
        } else {
          const queueIndex = uploadQueue.value.findIndex(u => u.id === uploadId)
          if (queueIndex !== -1) {
            uploadQueue.value[queueIndex].progress = Math.round(progress)
          }
        }
      }, 200)
    })
  }

  return {
    // State
    mediaItems,
    uploadQueue,
    loading,
    error,
    // Getters
    imageMedia,
    activeUploads,
    isUploading,
    // Actions
    fetchMedia,
    uploadFile,
    deleteMedia,
    clearCompletedUploads
  }
})
