import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import CompanyList from './components/CompanyList.jsx'
import CompanyForm from './components/forms/CompanyForm.jsx'
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)
const LS_KEY = 'ee_companies'

export default function App(){
  const [view, setView] = useState('list')
  const [companies, setCompanies] = useState(()=> { try{ return JSON.parse(localStorage.getItem(LS_KEY)) || [] }catch(e){ return [] } })
  const [editingId, setEditingId] = useState(null)

  useEffect(()=>{ localStorage.setItem(LS_KEY, JSON.stringify(companies)) }, [companies])
  const editingCompany = useMemo(()=> companies.find(c => c.id === editingId), [companies, editingId])

  const handleCreate = (data) => { const toSave = { ...data, id: uid(), createdAt: new Date().toISOString() }; setCompanies(prev => [toSave, ...prev]); setView('list') }
  const handleUpdate = (data) => { setCompanies(prev => prev.map(c => c.id === editingId ? {...data, id: editingId, createdAt: c.createdAt} : c)); setEditingId(null); setView('list') }
  const handleDelete = (id) => { const victim = companies.find(c => c.id === id); if(!victim) return; if(confirm(`Delete company "${victim.companyName}"?`)){ setCompanies(prev => prev.filter(c => c.id !== id)) } }
  const onEdit = (id) => { setEditingId(id); setView('edit') }

  return (
    <div className="layout">
      <Sidebar current={view==='edit' ? 'new' : view} onNav={(v)=>{ setView(v); if(v!=='edit') setEditingId(null) }} />
      <main>
        {view === 'list' && <CompanyList companies={companies} onEdit={onEdit} onDelete={handleDelete} />}
        {view === 'new' && <CompanyForm onCancel={()=>setView('list')} onSubmit={handleCreate} />}
        {view === 'edit' && <CompanyForm initialData={editingCompany} onCancel={()=>{setEditingId(null); setView('list')}} onSubmit={handleUpdate} />}
      </main>
    </div>
  )
}