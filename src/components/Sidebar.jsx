import React from 'react'
export default function Sidebar({current, onNav}){
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/favicon.svg" alt="" width="24" height="24"/>
        EasyEcom • UI
      </div>
      <div className="menu">
        <button className={current==='list' ? 'active' : ''} onClick={()=>onNav('list')}>📋 Company List</button>
        <button className={current==='new' ? 'active' : ''} onClick={()=>onNav('new')}>✍️ New Company</button>
      </div>
      <p className="hint" style={{marginTop:12}}>Use sidebar to switch between pages.</p>
    </aside>
  )
}