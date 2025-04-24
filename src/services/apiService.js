import { API_BASE_URL } from '../config';

// API service functions
export const previewSeatingChart = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/seating/preview`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Preview API error:', error);
    throw error;
  }
};

export const generateSeatingChart = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/seating/generate`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    return await response.blob();
  } catch (error) {
    console.error('Generate API error:', error);
    throw error;
  }
};

// Helper function to download templates
export const downloadTemplate = async (templateType) => {
  try {
    const fileName = `${templateType}.xlsx`;
    const response = await fetch(`${API_BASE_URL}/assets/templates/${fileName}`);
    
    if (!response.ok) {
      throw new Error('Template file not found');
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    return true;
  } catch (error) {
    console.error('Download template error:', error);
    throw error;
  }
};