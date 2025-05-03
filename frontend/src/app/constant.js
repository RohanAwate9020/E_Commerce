export const ITEMS_PER_PAGE =10;

export function discountPrice(product) {
    return +(product.price * (1 - product.discountPercentage / 100)).toFixed(2);
  }
  