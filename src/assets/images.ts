import heroLuxuryPerfume from './images/hero_luxury_perfume_1794041956636.jpg';
import collectionDesigner from './images/collection_designer_1794041957272.jpg';
import collectionNiche from './images/collection_niche_1794041958178.jpg';
import collectionArabic from './images/collection_arabic_1794041958483.jpg';
import editorialCraft from './images/editorial_craft_1794041957745.jpg';
import perfumeRougeCrystal from './images/perfume_rouge_crystal_1794041988691.jpg';
import perfumeRegalBlack from './images/perfume_regal_black_1794041989060.jpg';
import perfumeArabicKhamrah from './images/perfume_arabic_khamrah_1794041989513.jpg';
import perfumeRoseLuxury from './images/perfume_rose_luxury_1794041990276.jpg';
import logoPng from './logo.png';

export const IMAGES = {
  heroLuxuryPerfume,
  collectionDesigner,
  collectionNiche,
  collectionArabic,
  editorialCraft,
  perfumeRougeCrystal,
  perfumeRegalBlack,
  perfumeArabicKhamrah,
  perfumeRoseLuxury,
  logoPng,
};

// Fallback resolver for any persisted or legacy string paths
export function resolveFragranceImage(imagePath: string): string {
  if (!imagePath) return heroLuxuryPerfume;
  if (imagePath.includes('hero_luxury_perfume')) return heroLuxuryPerfume;
  if (imagePath.includes('collection_designer')) return collectionDesigner;
  if (imagePath.includes('collection_niche')) return collectionNiche;
  if (imagePath.includes('collection_arabic')) return collectionArabic;
  if (imagePath.includes('editorial_craft')) return editorialCraft;
  if (imagePath.includes('perfume_rouge_crystal')) return perfumeRougeCrystal;
  if (imagePath.includes('perfume_regal_black')) return perfumeRegalBlack;
  if (imagePath.includes('perfume_arabic_khamrah')) return perfumeArabicKhamrah;
  if (imagePath.includes('perfume_rose_luxury')) return perfumeRoseLuxury;
  if (imagePath.includes('logo.png')) return logoPng;
  return imagePath;
}
