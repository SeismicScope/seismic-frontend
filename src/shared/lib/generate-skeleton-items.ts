export function generateSkeletonItems(length = 4, key = "item") {
  return Array.from({ length }, (_, i) => `${key}-${i}`);
}
