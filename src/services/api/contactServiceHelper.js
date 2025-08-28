function getApperClient() {
  try {
    if (!window.ApperSDK) {
      throw new Error('ApperSDK not loaded. Please check that the SDK script is included in index.html')
    }
    
    const { ApperClient } = window.ApperSDK
    
    if (!import.meta.env.VITE_APPER_PROJECT_ID || !import.meta.env.VITE_APPER_PUBLIC_KEY) {
      throw new Error('Missing Apper configuration. Please check VITE_APPER_PROJECT_ID and VITE_APPER_PUBLIC_KEY environment variables')
    }
    
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
  } catch (error) {
    console.error('Failed to initialize ApperClient:', error)
    throw error
  }
}

export { getApperClient }