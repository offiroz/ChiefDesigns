/* בודק כל צמד צבע/רקע שבאמת בשימוש בקוד מול WCAG AA */
const L = (h) => {
  h = h.replace('#','')
  const c = [0,2,4].map(i => parseInt(h.slice(i,i+2),16)/255)
       .map(x => x <= 0.03928 ? x/12.92 : ((x+0.055)/1.055)**2.4)
  return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]
}
const CR = (a,b) => { const [x,y] = [L(a),L(b)].sort((p,q)=>q-p); return (x+0.05)/(y+0.05) }

const WHITE='#FFFFFF', NAVY='#273E47', MUTED_BG='#F5F7F8', FOOTER='#1D2F36'

const pairs = [
  ['body text',          '#273E47', WHITE,   4.5],
  ['ink-muted',          '#4A5C66', WHITE,   4.5],
  ['ink-fuchsia link',   '#A82A4C', WHITE,   4.5],
  ['ink-teal',           '#00706A', WHITE,   4.5],
  ['ink-orange',         '#A85E00', WHITE,   4.5],
  ['btn primary text',   WHITE,     '#A82A4C', 4.5],
  ['btn primary hover',  WHITE,     '#8F2241', 4.5],
  ['btn secondary text', '#273E47', '#00D9C0', 4.5],
  ['btn secondary hover','#273E47', '#00C2AC', 4.5],
  ['hero h1',            WHITE,     NAVY,    4.5],
  ['hero accent word',   '#FF9EB5', NAVY,    4.5],
  ['hero kicker',        '#00D9C0', NAVY,    4.5],
  ['hero body',          '#B8C4CA', NAVY,    4.5],
  ['footer links',       '#B8C4CA', FOOTER,  4.5],
  ['footer accent',      '#FF9EB5', FOOTER,  4.5],
  ['footer teal head',   '#00D9C0', FOOTER,  4.5],
  ['badge client',       WHITE,     '#00706A', 4.5],
  ['badge featured',     WHITE,     '#A82A4C', 4.5],
  ['ink-muted on muted', '#4A5C66', MUTED_BG, 4.5],
  ['focus ring',         '#A82A4C', WHITE,   3.0],
  ['border',             '#DDE3E6', WHITE,   1.0],
]

let fail = 0
for (const [name, fg, bg, min] of pairs) {
  const r = CR(fg, bg)
  const ok = r >= min
  if (!ok) fail++
  console.log(`${ok ? '✓' : '✗'}  ${name.padEnd(22)} ${fg} on ${bg}  ${r.toFixed(2)}:1  (min ${min})`)
}
console.log(fail === 0 ? '\nכל הצמדים עוברים WCAG AA' : `\n${fail} כשלונות`)
process.exit(fail ? 1 : 0)
