import React, { useEffect, useMemo, useState } from 'react'
import EmployeeSection from './EmployeeSection.jsx'
import { validateCompany, validateEmployee } from '../../utils/validators.js'
import { toMonthYearLabel } from '../../utils/helpers.js'

export default function CompanyForm({initialData, onCancel, onSubmit}){
  const [company, setCompany] = useState(()=> initialData || ({
    companyName:'',
    address:'',
    email:'',
    phoneNumber:'',
    empInfo:[{empName:'',designation:'',joinDate:'',email:'',phoneNumber:'',skillInfo:[{skillName:'', skillRating:3}],educationInfo:[{instituteName:'',courseName:'',completedYear:''}]}]
  }))
  const [errors, setErrors] = useState({})
  const [empErrors, setEmpErrors] = useState([])
  const [savedMsg, setSavedMsg] = useState('')

  useEffect(()=>{ if(initialData) setCompany(initialData) }, [initialData])
  const update = (patch) => setCompany(prev => ({...prev, ...patch}))

  const validateAll = () => {
    const ce = validateCompany(company)
    const eErrors = (company.empInfo || []).map(validateEmployee)
    setErrors(ce); setEmpErrors(eErrors)
    const okEmp = eErrors.every(e => Object.keys(e).length === 0)
    const okComp = Object.keys(ce).length === 0
    return okEmp && okComp
  }

  const onSave = (e) => {
    e.preventDefault()
    if(!validateAll()) return
    onSubmit(company)
    setSavedMsg('Company details saved successfully.')
    setTimeout(()=> setSavedMsg(''), 2500)
  }

  const previewJSON = useMemo(()=>{
    const copy = JSON.parse(JSON.stringify(company))
    copy.empInfo.forEach(emp => { (emp.educationInfo || []).forEach(ed => { ed.completedYearLabel = toMonthYearLabel(ed.completedYear) }) })
    return JSON.stringify(copy, null, 2)
  }, [company])

  return (
    <div className="card">
      <h2 className="page-title">{initialData ? 'Edit Company' : 'New Company'}</h2>
      <form onSubmit={onSave}>
        <div className="section-title">Company Basic Info</div>
        <div className="grid-2">
          <div className="field">
            <label>Company Name <span className="hint">(required, max 50)</span></label>
            <input type="text" value={company.companyName} maxLength="50" onChange={e=>update({companyName:e.target.value})}/>
            {errors.companyName && <div className="error">{errors.companyName}</div>}
          </div>
          <div className="field">
            <label>Company Address</label>
            <textarea value={company.address} onChange={e=>update({address:e.target.value})}></textarea>
            {errors.address && <div className="error">{errors.address}</div>}
          </div>
        </div>
        <div className="grid-2">
          <div className="field">
            <label>Email</label>
            <input type="email" maxLength="100" value={company.email} onChange={e=>update({email:e.target.value})}/>
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input type="tel" maxLength="15" value={company.phoneNumber} onChange={e=>update({phoneNumber:e.target.value})}/>
            {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
          </div>
        </div>

        <EmployeeSection employees={company.empInfo} setEmployees={(list)=>update({empInfo:list})} empErrors={empErrors} />

        <div className="toolbar">
          <button type="submit" className="btn success">Save Company</button>
          <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>
        </div>

        {savedMsg && <p className="hint" style={{marginTop:10}}>{savedMsg}</p>}
        <div className="section-title">Form output JSON</div>
        <div className="json-preview">{previewJSON}</div>
      </form>
    </div>
  )
}