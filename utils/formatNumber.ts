export function formatNumber(num: number | string): string {
  return Math.floor(+num)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
