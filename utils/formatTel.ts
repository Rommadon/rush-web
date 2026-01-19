export function formatTel(tel: string) {
  return [tel.slice(0, 3), tel.slice(3, 6), tel.slice(6)].join('-')
}

export default formatTel