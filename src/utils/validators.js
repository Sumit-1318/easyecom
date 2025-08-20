export function validateCompany(company){
  const errors = {}
  if(!company.companyName || company.companyName.trim().length === 0) errors.companyName = 'Company Name is required'
  if(company.companyName && company.companyName.length > 50) errors.companyName = 'Max length 50'
  if(!company.address || company.address.trim().length === 0) errors.address = 'Company Address is required'
  if(!company.email) errors.email = 'Email is required'
  if(company.email && company.email.length > 100) errors.email = 'Email max length 100'
  if(company.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(company.email)) errors.email = 'Invalid email format'
  if(!company.phoneNumber) errors.phoneNumber = 'Phone Number is required'
  if(company.phoneNumber && company.phoneNumber.length > 15) errors.phoneNumber = 'Max length 15'
  if(!company.empInfo || company.empInfo.length === 0) errors.empInfo = 'Add at least one employee'
  return errors
}
export function validateEmployee(emp){
  const errors = {}
  if(!emp.empName) errors.empName = 'Employee Name is required'
  if(emp.empName && emp.empName.length > 25) errors.empName = 'Max length 25'
  if(!emp.designation) errors.designation = 'Select Designation'
  if(!emp.joinDate) errors.joinDate = 'Join Date is required'
  if(emp.joinDate && new Date(emp.joinDate) > new Date()) errors.joinDate = 'Join Date must be in the past'
  if(!emp.email) errors.email = 'Email is required'
  if(emp.email && emp.email.length > 100) errors.email = 'Email max length 100'
  if(emp.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emp.email)) errors.email = 'Invalid email'
  if(!emp.phoneNumber) errors.phoneNumber = 'Phone Number is required'
  if(emp.phoneNumber && emp.phoneNumber.length > 15) errors.phoneNumber = 'Max length 15'
  if(!emp.skillInfo || emp.skillInfo.length === 0) errors.skillInfo = 'Add at least one skill'
  if(!emp.educationInfo || emp.educationInfo.length === 0) errors.educationInfo = 'Add at least one education record'
  return errors
}