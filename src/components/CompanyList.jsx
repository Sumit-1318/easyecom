import React from 'react'
const EditIcon = () => (
  <svg className="icon edit" viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M12 20h9" stroke="currentColor"/>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor"/>
  </svg>
)
const DeleteIcon = () => (
  <svg className="icon delete" viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M3 6h18" stroke="currentColor"/>
    <path d="M8 6V4h8v2" stroke="currentColor"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor"/>
    <path d="M10 11v6M14 11v6" stroke="currentColor"/>
  </svg>
)
export default function CompanyList({companies, onEdit, onDelete}){
  return (
    <div className="card">
      <h2 className="page-title">Company List</h2>
      <div style={{overflowX:'auto'}}>
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 && (
              <tr><td colSpan="5" style={{padding:'20px', color:'#94a3b8'}}>No companies yet. Click <span className="pill">New Company</span> to add.</td></tr>
            )}
            {companies.map((c)=> (
              <tr key={c.id}>
                <td>{c.companyName}</td><td>{c.email}</td><td>{c.phoneNumber}</td>
                <td><span className="pill">{new Date(c.createdAt).toLocaleString()}</span></td>
                <td>
                  <div className="row-actions">
                    <button className="icon-btn" title="Edit" onClick={()=>onEdit(c.id)} aria-label="edit"><EditIcon/></button>
                    <button className="icon-btn" title="Delete" onClick={()=>onDelete(c.id)} aria-label="delete"><DeleteIcon/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}