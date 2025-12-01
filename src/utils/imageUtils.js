// src/utils/imageUtils.js
export function getImageUrl(imagePath) {
  if (!imagePath) {
    return getPlaceholderUrl('No Image', 400, 300);
  }

  // Jika sudah URL lengkap, gunakan langsung
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Ambil nama file saja
  const fileName = imagePath.split('/').pop();

  // Tentukan folder berdasarkan path
  let folder = 'categories';
  if (imagePath.includes('body-types')) folder = 'body-types';
  if (imagePath.includes('styles')) folder = 'styles';
  if (imagePath.includes('dictionary')) folder = 'dictionary';

  const supabaseUrl = `https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion-images/${folder}/${fileName}`;
  
  return supabaseUrl;
}

export function handleImageError(e) {
  console.error('❌ Image failed to load:', e.target.src);
  const fileName = e.target.src.split('/').pop();
  e.target.src = getPlaceholderUrl('Missing: ' + fileName, 400, 300);
}

export function getPlaceholderUrl(text, width = 400, height = 300) {
  const encodedText = encodeURIComponent(text);
  return `https://placehold.co/${width}x${height}/e5e7eb/9ca3af?text=${encodedText}&font=montserrat`;
}