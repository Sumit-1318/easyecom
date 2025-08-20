import React from 'react'
export default function EducationBlock({education, onChange, onAdd, onRemove, errors}){
  return (
    <div>
      <div className="section-title">Education Info</div>
      {errors && <div className="error">{errors}</div>}
      {education.map((ed, idx)=> (
        <div className="edu-row" key={idx}>
          <div className="field">
            <label>School / College Name <span className="hint">(max 50)</span></label>
            <input type="text" maxLength="50" value={ed.instituteName} onChange={e=>onChange(idx, {...ed, instituteName:e.target.value})} />
          </div>
          <div className="field">
            <label>Course Name <span className="hint">(max 25)</span></label>
            <input type="text" maxLength="25" value={ed.courseName} onChange={e=>onChange(idx, {...ed, courseName:e.target.value})} />
          </div>
          <div className="field">
            <label>Completed Year <span className="hint">(Month & Year)</span></label>
            <input type="month" value={ed.completedYear} onChange={e=>onChange(idx, {...ed, completedYear:e.target.value})} />
          </div>
          <div className="field">
            <button type="button" className="btn danger" onClick={()=>onRemove(idx)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="toolbar">
        <button type="button" className="btn" onClick={onAdd}>+ Add Education</button>
      </div>
    </div>
  )
}