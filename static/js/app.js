const templates = {
  classic: (data) => `
    <div class="cv-classic">
      <div class="name" contenteditable="true" data-field="name">${data.name}</div>
      <div class="title" contenteditable="true" data-field="title">${data.title}</div>
      <div class="contact" contenteditable="true" data-field="contact">${data.contact}</div>
      <hr>
      <div class="section summary"><h4>Summary</h4><div contenteditable="true" data-field="summary">${data.summary}</div></div>
      <div class="section experience"><h4>Experience</h4>${data.experience.map((e,i)=>`<div contenteditable="true" data-field="experience" data-index="${i}">${e}</div>`).join('')}</div>
      <div class="section skills"><h4>Skills</h4><div contenteditable="true" data-field="skills">${data.skills.join(', ')}</div></div>
    </div>
  `,
  modern: (data) => `
    <div class="cv-modern">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div class="name" contenteditable="true" data-field="name">${data.name}</div>
          <div class="title" contenteditable="true" data-field="title">${data.title}</div>
        </div>
        <div class="contact text-end" contenteditable="true" data-field="contact">${data.contact}</div>
      </div>
      <hr>
      <div class="section summary"><h4>About</h4><div contenteditable="true" data-field="summary">${data.summary}</div></div>
      <div class="section experience"><h4>Experience</h4>${data.experience.map((e,i)=>`<div contenteditable="true" data-field="experience" data-index="${i}">${e}</div>`).join('')}</div>
      <div class="section skills"><h4>Skills</h4><div contenteditable="true" data-field="skills">${data.skills.join(' • ')}</div></div>
    </div>
  `,
  minimal: (data) => `
    <div class="cv-minimal">
      <div class="name" contenteditable="true" data-field="name">${data.name}</div>
      <div class="contact" style="margin-bottom:8px" contenteditable="true" data-field="contact">${data.contact}</div>
      <div class="section summary"><div contenteditable="true" data-field="summary">${data.summary}</div></div>
      <div class="section experience">${data.experience.map((e,i)=>`<div contenteditable="true" data-field="experience" data-index="${i}">${e}</div>`).join('')}</div>
    </div>
  `
}

const draftSamples = [
  { id: 'product', title: 'Product Manager CV', template: 'modern', data: {
    name: 'Alex Product', title: 'Product Manager', contact: 'alex@pm.com • (123) 456-7890',
    summary: 'Product leader with 8+ years bringing user-centered products to market.',
    experience: ['Lead PM — Acme (2020–Present)', 'PM — BetaCorp (2016–2020)'],
    skills: ['Roadmapping','Research','Stakeholder Management']
  }},
  { id: 'engineer', title: 'Software Engineer CV', template: 'classic', data: {
    name: 'Sam Engineer', title: 'Senior Software Engineer', contact: 'sam@dev.com • (987) 654-3210',
    summary: 'Full-stack engineer focusing on scalable web systems.',
    experience: ['Senior Engineer — TechX (2019–Present)', 'Engineer — DevCo (2015–2019)'],
    skills: ['Python','Django','JavaScript']
  }},
  { id: 'designer', title: 'Designer CV', template: 'minimal', data: {
    name: 'Dana Designer', title: 'Product Designer', contact: 'dana@design.com',
    summary: 'Designer with a passion for UX and visual systems.',
    experience: ['Designer — CreativeStudio (2018–Present)'],
    skills: ['Figma','Prototyping','User Research']
  }},
]

function el(id){ return document.getElementById(id) }

// currentData is the single source of truth — preview is editable and updates this object
let currentData = {
  template: 'classic',
  name: 'Jane Doe',
  title: 'Software Engineer',
  contact: 'jane@example.com • (555) 555-5555 • City, Country',
  summary: 'Experienced software engineer with a focus on web applications.',
  experience: ['Senior Engineer — Company A (2021–Present)','Engineer — Company B (2018–2021)'],
  skills: ['Python','Django','JavaScript','React'],
  customFields: []
}

function render(){
  const html = templates[currentData.template](currentData)
  el('preview').innerHTML = html
  // append custom fields area
  el('preview').insertAdjacentHTML('beforeend', renderCustomFields())
  attachPreviewListeners()
}

function renderCustomFields(){
  if(!currentData.customFields || currentData.customFields.length === 0) return ''
  return `<div class="section custom-fields"><h4>Additional</h4>` + currentData.customFields.map(f=>{
    const id = f.id
    if(f.type === 'text' || f.type === 'textarea' || f.type === 'skills'){
      return `<div class="custom-field mb-2" data-id="${id}"><div class="cf-label" contenteditable="true" data-field="custom-label" data-id="${id}">${f.label}</div><div class="cf-value" contenteditable="true" data-field="custom" data-id="${id}">${Array.isArray(f.value) ? f.value.join(', ') : f.value}</div><button class="btn btn-sm btn-outline-danger mt-1" data-action="remove" data-id="${id}">Remove</button></div>`
    }
    if(f.type === 'checkbox'){
      return `<div class="custom-field mb-2" data-id="${id}"><label><input type="checkbox" data-action="toggle-checkbox" data-id="${id}" ${f.value? 'checked':''}> <span contenteditable="true" data-field="custom-label" data-id="${id}">${f.label}</span></label> <button class="btn btn-sm btn-outline-danger" data-action="remove" data-id="${id}">Remove</button></div>`
    }
    if(f.type === 'experience'){
      return `<div class="custom-field mb-2" data-id="${id}"><div class="cf-label" contenteditable="true" data-field="custom-label" data-id="${id}">${f.label}</div><div class="cf-value" contenteditable="true" data-field="custom-experience" data-id="${id}">${Array.isArray(f.value) ? f.value.join('\n') : f.value}</div><button class="btn btn-sm btn-outline-danger mt-1" data-action="remove" data-id="${id}">Remove</button></div>`
    }
    return ''
  }).join('') + `</div>`
}

function downloadPDF(){
  const element = document.getElementById('preview')
  const filename = (currentData.name || 'cv') + '.pdf'
  const opt = { margin:0.4, filename, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } }
  html2pdf().set(opt).from(element).save()
}

function populateDrafts(){
  const list = el('draftList')
  list.innerHTML = ''
  draftSamples.forEach(d => {
    const a = document.createElement('button')
    a.className = 'list-group-item list-group-item-action'
    a.textContent = d.title
    a.onclick = ()=>{
      currentData = JSON.parse(JSON.stringify(d.data))
      currentData.template = d.template
      currentData.customFields = []
      el('templateSelect').value = d.template
      render()
    }
    list.appendChild(a)
  })
}

function attachPreviewListeners(){
  const preview = el('preview')
  if(!preview) return

  preview.querySelectorAll('[contenteditable="true"]').forEach(node=>{
    node.addEventListener('input', (e)=>{
      const field = e.target.dataset.field
      if(!field) return
      if(field === 'name' || field === 'title' || field === 'contact'){
        currentData[field] = e.target.textContent.trim()
      } else if(field === 'summary'){
        // store plain text with newlines
        const html = e.target.innerHTML
        currentData.summary = html.replace(/<br\s*\/?/gi, '\n').replace(/<div>/gi,'').replace(/<\/div>/gi,'\n').replace(/&nbsp;/g,' ').trim()
      } else if(field === 'experience'){
        const ex = Array.from(preview.querySelectorAll('[data-field="experience"]')).map(n=>n.textContent.trim()).filter(Boolean)
        currentData.experience = ex
      } else if(field === 'skills'){
        currentData.skills = e.target.textContent.split(/[,•]/).map(s=>s.trim()).filter(Boolean)
      } else if(field === 'custom'){
        const id = e.target.dataset.id
        const cf = currentData.customFields.find(x=>x.id === id)
        if(cf) cf.value = e.target.textContent.trim()
      } else if(field === 'custom-experience'){
        const id = e.target.dataset.id
        const cf = currentData.customFields.find(x=>x.id === id)
        if(cf) cf.value = e.target.innerHTML.replace(/<br\s*\/?/gi,'\n').replace(/<div>/gi,'').replace(/<\/div>/gi,'\n').trim().split('\n').filter(Boolean)
      } else if(field === 'custom-label'){
        const id = e.target.dataset.id
        const cf = currentData.customFields.find(x=>x.id === id)
        if(cf) cf.label = e.target.textContent.trim()
      }
    })
  })

  // handle checkbox toggles and remove buttons
  preview.querySelectorAll('[data-action]').forEach(node=>{
    node.addEventListener('click', (e)=>{
      const action = e.target.dataset.action
      const id = e.target.dataset.id
      if(action === 'remove'){
        currentData.customFields = currentData.customFields.filter(x=>x.id !== id)
        render()
      } else if(action === 'toggle-checkbox'){
        const cf = currentData.customFields.find(x=>x.id === id)
        if(cf) cf.value = e.target.checked
      }
    })
  })
}

window.addEventListener('DOMContentLoaded', ()=>{
  populateDrafts()
  el('templateSelect').addEventListener('change', (e)=>{ currentData.template = e.target.value; render() })
  el('previewBtn').addEventListener('click', render)
  el('downloadBtn').addEventListener('click', downloadPDF)
+  // add field buttons
+  el('addTextBtn').addEventListener('click', ()=> addCustomField('text'))
+  el('addTextareaBtn').addEventListener('click', ()=> addCustomField('textarea'))
+  el('addCheckboxBtn').addEventListener('click', ()=> addCustomField('checkbox'))
+  el('addSkillsBtn').addEventListener('click', ()=> addCustomField('skills'))
+  el('addExperienceBtn').addEventListener('click', ()=> addCustomField('experience'))
  render()
})
+
+function addCustomField(type){
+  const id = String(Date.now()) + Math.random().toString(36).slice(2,6)
+  let field = { id, type, label: 'New Field', value: '' }
+  if(type === 'checkbox') field.value = false
+  if(type === 'skills') field.value = []
+  if(type === 'experience') field.value = []
+  if(type === 'textarea') field.value = ''
+  currentData.customFields.push(field)
+  render()
+}

