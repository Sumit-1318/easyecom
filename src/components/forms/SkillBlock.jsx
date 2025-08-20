import React from 'react'
export const SKILL_OPTIONS = ['Java','Angular','CSS','HTML','JavaScript','UI','SQL','React','PHP','GIT','AWS','Python','Django','C','C++','C#','Unity','R','AI','NLP','Photoshop','Node.js']
export default function SkillBlock({skills, onChange, onAdd, onRemove, errors}){
  return (
    <div>
      <div className="section-title">Skills Info</div>
      {errors && <div className="error">{errors}</div>}
      {skills.map((sk, idx)=> (
        <div className="skill-row" key={idx}>
          <div className="field">
            <label>Skill Set Name <span className="hint">(required)</span></label>
            <select value={sk.skillName} onChange={e=>onChange(idx, {...sk, skillName:e.target.value})} className="select-tall">
              <option value="">-- Select Skill --</option>
              {SKILL_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Skill Rating (1 to 5)</label>
            <input type="number" min="1" max="5" value={sk.skillRating} onChange={e=>onChange(idx, {...sk, skillRating:Number(e.target.value)})} />
          </div>
          <div className="field">
            <button type="button" className="btn danger" onClick={()=>onRemove(idx)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="toolbar">
        <button type="button" className="btn" onClick={onAdd}>+ Add Skill</button>
      </div>
    </div>
  )
}