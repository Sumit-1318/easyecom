export const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)
export const todayISO = () => new Date().toISOString().slice(0,10)
export const toMonthYearLabel = (ym) => {
  try{
    if(!ym) return ''
    let d = ym
    if(/^\d{4}-\d{2}$/.test(ym)) d = ym + '-01'
    const dt = new Date(d)
    return dt.toLocaleString('en-US', { month:'short', year:'numeric' })
  }catch(e){ return ym }
}
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj))