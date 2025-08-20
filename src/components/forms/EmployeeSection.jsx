import React from 'react'
import SkillBlock from './SkillBlock.jsx'
import EducationBlock from './EducationBlock.jsx'
import { todayISO } from '../../utils/helpers.js'

const DESIGNATIONS = ['Developer','Manager','System Admin','Team Lead','PM']

export default function EmployeeSection({employees, setEmployees, empErrors}){
  const update = (idx, next) => { const copy = employees.slice(); copy[idx] = next; setEmployees(copy) }
  const addEmp = () => setEmployees([...employees, {empName:'',designation:'',joinDate:'',email:'',phoneNumber:'',skillInfo:[{skillName:'',skillRating:3}],educationInfo:[{instituteName:'',courseName:'',completedYear:''}]}])
  const removeEmp = (idx) => { const copy = employees.slice(); copy.splice(idx,1); setEmployees(copy) }

  const updateSkills = (i, j, nextSkill) => { const emp = employees[i]; const list = emp.skillInfo.slice(); list[j] = nextSkill; update(i, {...emp, skillInfo:list}) }
  const addSkill = (i) => { const emp = employees[i]; update(i, {...emp, skillInfo:[...emp.skillInfo, {skillName:'', skillRating:3}] }) }
  const removeSkill = (i, j) => { const emp = employees[i]; const list = emp.skillInfo.slice(); list.splice(j,1); update(i, {...emp, skillInfo:list}) }

  const updateEdu = (i, j, nextEdu) => { const emp = employees[i]; const list = emp.educationInfo.slice(); list[j] = nextEdu; update(i, {...emp, educationInfo:list}) }
  const addEdu = (i) => { const emp = employees[i]; update(i, {...emp, educationInfo:[...emp.educationInfo, {instituteName:'',courseName:'',completedYear:''}] }) }
  const removeEdu = (i, j) => { const emp = employees[i]; const list = emp.educationInfo.slice(); list.splice(j,1); update(i, {...emp, educationInfo:list}) }

  return (
    <div>
      <div className="section-title">Employee Info</div>
      {employees.map((emp, i)=> (
        <div className="employee" key={i}>
          <div className="grid-3">
            <div className="field">
              <label>Employee Name <span className="hint">(required, max 25)</span></label>
              <input type="text" maxLength="25" value={emp.empName} onChange={e=>update(i,{...emp, empName:e.target.value})}/>
              {empErrors?.[i]?.empName && <div className="error">{empErrors[i].empName}</div>}
            </div>
            <div className="field">
              <label>Designation</label>
              <select value={emp.designation} onChange={e=>update(i,{...emp, designation:e.target.value})}>
                <option value="">-- Select --</option>
                {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {empErrors?.[i]?.designation && <div className="error">{empErrors[i].designation}</div>}
            </div>
            <div className="field">
              <label>Join Date <span className="hint">(past only)</span></label>
              <input type="date" max={todayISO()} value={emp.joinDate} onChange={e=>update(i,{...emp, joinDate:e.target.value})}/>
              {empErrors?.[i]?.joinDate && <div className="error">{empErrors[i].joinDate}</div>}
            </div>
          </div>
          <div className="grid-3">
            <div className="field">
              <label>Email</label>
              <input type="email" maxLength="100" value={emp.email} onChange={e=>update(i,{...emp, email:e.target.value})}/>
              {empErrors?.[i]?.email && <div className="error">{empErrors[i].email}</div>}
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input type="tel" maxLength="15" value={emp.phoneNumber} onChange={e=>update(i,{...emp, phoneNumber:e.target.value})} placeholder="+91 9XXXXXXXXX"/>
              {empErrors?.[i]?.phoneNumber && <div className="error">{empErrors[i].phoneNumber}</div>}
            </div>
          </div>
          <SkillBlock skills={emp.skillInfo} onChange={(j, sk)=>updateSkills(i, j, sk)} onAdd={()=>addSkill(i)} onRemove={(j)=>removeSkill(i,j)} errors={empErrors?.[i]?.skillInfo} />
          <EducationBlock education={emp.educationInfo} onChange={(j, ed)=>updateEdu(i, j, ed)} onAdd={()=>addEdu(i)} onRemove={(j)=>removeEdu(i,j)} errors={empErrors?.[i]?.educationInfo} />
          <div className="toolbar"><button type="button" className="btn danger" onClick={()=>removeEmp(i)}>Remove Employee</button></div>
        </div>
      ))}
      <div className="toolbar"><button type="button" className="btn" onClick={ () => setEmployees([...employees, {empName:'',designation:'',joinDate:'',email:'',phoneNumber:'',skillInfo:[{skillName:'',skillRating:3}],educationInfo:[{instituteName:'',courseName:'',completedYear:''}]}]) }>+ Add Employee</button></div>
    </div>
  )
}