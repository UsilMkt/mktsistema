const users = {
  "gerencia@usil.edu.pe": { password: "123456", name: "Ivanna", role: "admin" },
  "andrea@usil.edu.pe": { password: "123456", name: "Andrea Rojas", role: "promotor" }
};

let currentUser = null;

let inventory = {
  fichas: { label: "Fichas", stock: 470, initial: 600 },
  lapiceros: { label: "Lapiceros", stock: 410, initial: 600 },
  mugs: { label: "Mugs", stock: 130, initial: 300 },
  libretas: { label: "Libretas ecológicas", stock: 260, initial: 400 },
  postits: { label: "Post-its", stock: 230, initial: 350 },
  bolsas: { label: "Bolsas", stock: 310, initial: 450 },
  tomatodos: { label: "Tomatodos", stock: 145, initial: 250 }
};

let facultad = [
  {
    id: 1,
    promotor: "Andrea Rojas",
    colegio: "Colegio San Ignacio",
    facultad: "Ingeniería",
    carrera: "Ing. Civil",
    actividad: "Feria Vocacional",
    fechaSolicitud: "2026-05-14",
    fechaEvento: "2026-05-20",
    horaInicio: "09:00 a. m.",
    modalidad: "Presencial",
    participantes: 120,
    estado: "Aprobada"
  },
  {
    id: 2,
    promotor: "Carlos Medina",
    colegio: "Santa Úrsula",
    facultad: "Psicología",
    carrera: "Psicología Clínica",
    actividad: "Charla Institucional",
    fechaSolicitud: "2026-05-16",
    fechaEvento: "2026-05-21",
    horaInicio: "11:00 a. m.",
    modalidad: "Presencial",
    participantes: 80,
    estado: "Pendiente"
  },
  {
    id: 3,
    promotor: "Valeria Torres",
    colegio: "La Inmaculada",
    facultad: "Comunicaciones",
    carrera: "Comunicación Audiovisual",
    actividad: "Taller de Orientación",
    fechaSolicitud: "2026-05-17",
    fechaEvento: "2026-05-22",
    horaInicio: "02:00 p. m.",
    modalidad: "Virtual",
    participantes: 65,
    estado: "Observada"
  },
  {
    id: 4,
    promotor: "Andrea Rojas",
    colegio: "Trilce Monterrico",
    facultad: "Derecho",
    carrera: "Derecho Corporativo",
    actividad: "Conferencia Universitaria",
    fechaSolicitud: "2026-05-18",
    fechaEvento: "2026-05-24",
    horaInicio: "10:00 a. m.",
    modalidad: "Presencial",
    participantes: 150,
    estado: "Ejecutada"
  }
];

let ov = [
  {
    id: 1,
    promotor: "Andrea Rojas",
    colegio: "Colegio San Ignacio",
    actividad: "OV Ingeniería",
    fecha: "2026-05-19",
    participantes: 90,
    modalidad: "Presencial",
    estado: "Programada"
  },
  {
    id: 2,
    promotor: "Carlos Medina",
    colegio: "Saco Oliveros",
    actividad: "OV Empresariales",
    fecha: "2026-05-22",
    participantes: 60,
    modalidad: "Virtual",
    estado: "Pendiente"
  }
];

let materiales = [
  {
    id: 1,
    promotor: "Andrea Rojas",
    colegio: "San Alfonso",
    actividad: "Charla Institucional",
    fecha: "2026-05-18",
    fichas: 75,
    lapiceros: 75,
    bolsas: 75,
    estado: "Registrada"
  },
  {
    id: 2,
    promotor: "Carlos Medina",
    colegio: "Aleph",
    actividad: "Feria",
    fecha: "2026-05-19",
    fichas: 100,
    lapiceros: 200,
    bolsas: 100,
    estado: "Registrada"
  }
];

let notes = [
  {
    id: 1,
    title: "Reunión con promotores",
    description: "Coordinar actividades de cierre de mes.",
    type: "Recordatorio",
    priority: "Alta",
    date: "2026-05-20",
    status: "Pendiente"
  },
  {
    id: 2,
    title: "Solicitar reposición de mugs",
    description: "Stock bajo para próximas ferias.",
    type: "Nota",
    priority: "Media",
    date: "2026-05-23",
    status: "Pendiente"
  }
];


function saveData(){
  localStorage.setItem("usil_facultad", JSON.stringify(facultad));
  localStorage.setItem("usil_ov", JSON.stringify(ov));
  localStorage.setItem("usil_materiales", JSON.stringify(materiales));
  localStorage.setItem("usil_inventory", JSON.stringify(inventory));
  localStorage.setItem("usil_notes", JSON.stringify(notes));
}

function loadData(){
  resetDemoData();
}
function resetDemoData(){
  facultad = [
    {
      id: 1,
      promotor: "Andrea Rojas",
      tipoActividad: "FERIA",
      codigo: "1351428",
      tipoColegio: "GOLD",
      colegio: "Colegio San Ignacio",
      facultad: "INGENIERÍA",
      carrera: "Ing. Civil",
      actividad: "Feria Vocacional",
      fechaSolicitud: "2026-05-14",
      fechaEvento: "2026-05-20",
      horaInicio: "09:00 a. m.",
      horaFin: "12:00 p. m.",
      publico: "ALUMNOS",
      grado: "5TO",
      participantes: 120,
      modalidad: "Presencial",
      material: "SI",
      universidades: "NO",
      lugar: "LIMA",
      estado: "Aprobada",
      taxi: "NO",
      recojo: "",
      retorno: "",
      docente: "Carlos Solórzano"
    },
    {
      id: 2,
      promotor: "Carlos Medina",
      tipoActividad: "CHARLA",
      codigo: "1057884",
      tipoColegio: "PLATINUM",
      colegio: "Colegio Santa Úrsula",
      facultad: "PSICOLOGÍA",
      carrera: "Psicología Clínica",
      actividad: "Charla Institucional",
      fechaSolicitud: "2026-05-16",
      fechaEvento: "2026-05-21",
      horaInicio: "11:00 a. m.",
      horaFin: "12:30 p. m.",
      publico: "ALUMNOS",
      grado: "5TO",
      participantes: 80,
      modalidad: "Presencial",
      material: "NO",
      universidades: "NO",
      lugar: "LIMA",
      estado: "Pendiente",
      taxi: "NO",
      recojo: "",
      retorno: "",
      docente: "Pendiente"
    },
    {
      id: 3,
      promotor: "Valeria Torres",
      tipoActividad: "TALLER",
      codigo: "1669688",
      tipoColegio: "SILVER",
      colegio: "Colegio La Inmaculada",
      facultad: "COMUNICACIONES",
      carrera: "Comunicación Audiovisual",
      actividad: "Taller de Orientación",
      fechaSolicitud: "2026-05-17",
      fechaEvento: "2026-05-22",
      horaInicio: "02:00 p. m.",
      horaFin: "04:00 p. m.",
      publico: "ALUMNOS",
      grado: "4TO Y 5TO",
      participantes: 65,
      modalidad: "Virtual",
      material: "PPT",
      universidades: "SI",
      lugar: "LIMA",
      estado: "Observada",
      taxi: "NO",
      recojo: "",
      retorno: "",
      docente: ""
    },
    {
      id: 4,
      promotor: "Andrea Rojas",
      tipoActividad: "CONFERENCIA",
      codigo: "1313832",
      tipoColegio: "GOLD",
      colegio: "Trilce Monterrico",
      facultad: "DERECHO",
      carrera: "Derecho Corporativo",
      actividad: "Conferencia Universitaria",
      fechaSolicitud: "2026-05-18",
      fechaEvento: "2026-05-24",
      horaInicio: "10:00 a. m.",
      horaFin: "11:30 a. m.",
      publico: "PADRES",
      grado: "PADRES",
      participantes: 150,
      modalidad: "Presencial",
      material: "SI",
      universidades: "NO",
      lugar: "LIMA",
      estado: "Ejecutada",
      taxi: "SI",
      recojo: "Campus USIL",
      retorno: "Trilce Monterrico",
      docente: "María Salazar"
    }
  ];

  ov = [
    {
      promotor: "Andrea Rojas",
      colegio: "Colegio San Ignacio",
      actividad: "Test vocacional QE",
      fecha: "2026-05-19",
      inicio: "08:00 a. m.",
      fin: "09:00 a. m.",
      cantidad: 90,
      poblacion: "ALUMNOS",
      psicologo: "Nikolle Ojeda",
      costo: 80
    },
    {
      promotor: "Carlos Medina",
      colegio: "Saco Oliveros",
      actividad: "Taller de orientación vocacional",
      fecha: "2026-05-22",
      inicio: "10:00 a. m.",
      fin: "11:30 a. m.",
      cantidad: 60,
      poblacion: "ALUMNOS",
      psicologo: "Carlos Solórzano",
      costo: 120
    },
    {
      promotor: "Andrea Rojas",
      colegio: "Lord Byron",
      actividad: "Capacitación docente",
      fecha: "2026-05-25",
      inicio: "03:00 p. m.",
      fin: "04:30 p. m.",
      cantidad: 35,
      poblacion: "DOCENTES",
      psicologo: "Camila Saldaña",
      costo: 100
    }
  ];

  materiales = [
    {
      id: 101,
      promotor: "Andrea Rojas",
      colegio: "San Alfonso",
      actividad: "Charla Institucional",
      fecha: "2026-05-18",
      fichas: 75,
      lapiceros: 75,
      mugs: 0,
      libretas: 40,
      posits: 0,
      bolsas: 75,
      tomatodos: 0,
      estado: "Registrada",
      descontado: false
    },
    {
      id: 102,
      promotor: "Carlos Medina",
      colegio: "Aleph",
      actividad: "Feria Colegio",
      fecha: "2026-05-19",
      fichas: 100,
      lapiceros: 200,
      mugs: 20,
      libretas: 35,
      posits: 15,
      bolsas: 100,
      tomatodos: 10,
      estado: "Registrada",
      descontado: false
    },
    {
      id: 103,
      promotor: "Andrea Rojas",
      colegio: "Trilce Monterrico",
      actividad: "Conferencia Universitaria",
      fecha: "2026-05-24",
      fichas: 120,
      lapiceros: 120,
      mugs: 0,
      libretas: 60,
      posits: 25,
      bolsas: 120,
      tomatodos: 0,
      estado: "Registrada",
      descontado: false
    }
  ];

  inventory = {
    fichas: { label: "Fichas", category: "Material impreso", stock: 470, initial: 600, min: 120 },
    lapiceros: { label: "Lapiceros", category: "Útiles", stock: 410, initial: 600, min: 140 },
    mugs: { label: "Mugs", category: "Merchandising", stock: 130, initial: 300, min: 60 },
    libretas: { label: "Libretas ecológicas", category: "Merchandising", stock: 260, initial: 400, min: 90 },
    posits: { label: "Post-its", category: "Útiles", stock: 230, initial: 350, min: 80 },
    bolsas: { label: "Bolsas", category: "Merchandising", stock: 310, initial: 450, min: 120 },
    tomatodos: { label: "Tomatodos", category: "Merchandising", stock: 145, initial: 250, min: 70 }
  };

  notes = [
    {
      id: 1,
      owner: "Ivanna",
      type: "Recordatorio",
      title: "Reunión con promotores",
      description: "Revisar actividades de cierre de mes y pendientes por colegio.",
      date: "2026-05-20",
      priority: "Alta",
      status: "Pendiente"
    },
    {
      id: 2,
      owner: "Ivanna",
      type: "Nota",
      title: "Revisar stock de mugs",
      description: "El stock está bajando para próximas ferias.",
      date: "",
      priority: "Normal",
      status: "Pendiente"
    },
    {
      id: 3,
      owner: "Andrea Rojas",
      type: "Recordatorio",
      title: "Confirmar cantidad de alumnos",
      description: "Validar participantes con Colegio San Ignacio.",
      date: "2026-05-19",
      priority: "Normal",
      status: "Pendiente"
    }
  ];
}

resetDemoData();



function login(event){
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  const user = users[email];

  if(!user || user.password !== password){
    alert("Correo o contraseña incorrectos.");
    return;
  }

  currentUser = user;
  resetDemoData();
  document.getElementById("loginView").classList.add("hidden");
  document.getElementById("appView").classList.remove("hidden");

  setupInterface();
  showSection("dashboard");
  renderAll();

  setTimeout(() => {
    resetDemoData();
    renderAll();
  }, 100);
}

function logout(){
  currentUser = null;
  document.getElementById("appView").classList.add("hidden");
  document.getElementById("loginView").classList.remove("hidden");
}

function setupInterface(){
  document.getElementById("userName").textContent = currentUser.name;
  document.getElementById("userRole").textContent = currentUser.role === "admin" ? "Gerencia" : "Promotor";

  const menu = currentUser.role === "admin"
    ? [
      ["dashboard","Dashboard","home"],
      ["facultad","Facultad y CGE","users"],
      ["ov","Solicitudes OV","file"],
      ["material","Materiales","box"],
      ["inventario","Inventario","archive"],
      ["notas","Notas y recordatorios","note"],
      ["reportes","Reportes","chart"]
    ]
    : [
      ["dashboard","Mi resumen","home"],
      ["facultad","Mis Facultad y CGE","users"],
      ["ov","Mis OV","file"],
      ["material","Mis materiales","box"],
      ["notas","Notas y recordatorios","note"]
    ];

  document.getElementById("menu").innerHTML = menu.map(([id,label,icon]) => `
    <button data-section="${id}" onclick="showSection('${id}')">
      <span class="nav-icon">${navIcon(icon)}</span>
      <span>${label}</span>
    </button>
  `).join("");
}

function navIcon(type){
  const icons = {
    home: '<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
    users: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2"/><path d="M15 18a5 5 0 0 1 6 2"/></svg>',
    file: '<svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg>',
    box: '<svg viewBox="0 0 24 24"><path d="M4 7l8-4 8 4-8 4z"/><path d="M4 7v10l8 4 8-4V7"/><path d="M12 11v10"/></svg>',
    archive: '<svg viewBox="0 0 24 24"><path d="M4 4h16v4H4z"/><path d="M6 8h12v12H6z"/><path d="M10 12h4"/></svg>',
    note: '<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    chart: '<svg viewBox="0 0 24 24"><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5M12 16V8M16 16v-8"/></svg>'
  };
  return icons[type] || icons.file;
}

function showSection(id){
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  document.querySelectorAll(".menu button").forEach(b => {
    b.classList.toggle("active", b.dataset.section === id);
  });

  const titles = {
    dashboard: currentUser.role === "admin" ? "Dashboard ejecutivo" : "Mi panel de actividades",
    facultad: "Facultad y CGE",
    formFacultad: "Nueva solicitud Facultad y CGE",
    ov: "Solicitudes OV",
    formOv: "Nueva solicitud OV",
    material: "Solicitud de materiales",
    formMaterial: "Nueva solicitud de material",
    inventario: "Inventario",
    aprobaciones: "Aprobaciones",
    notas: "Notas y recordatorios",
    reportes: "Reportes ejecutivos"
  };

  const descriptions = {
    dashboard: "Vista general de control y seguimiento.",
    facultad: "Gestión de actividades académicas para colegios.",
    formFacultad: "Registro validado de actividades de facultad.",
    ov: "Gestión de orientación vocacional y talleres.",
    formOv: "Registro de solicitudes OV.",
    material: "Solicitudes de material y control de aprobación.",
    formMaterial: "Registro de materiales con validación de inventario.",
    inventario: "Stock disponible y consumo de materiales.",
    aprobaciones: "Solicitudes pendientes de decisión.",
    notas: "Anotaciones personales y recordatorios de seguimiento.",
    reportes: "Estadísticas consolidadas para gerencia."
  };

  document.getElementById("pageTitle").textContent = titles[id];
  document.getElementById("pageDescription").textContent = descriptions[id];

  setTimeout(renderAll, 0);
}

function visible(data){
  if(!Array.isArray(data)) return [];
  if(!currentUser) return data;
  if(currentUser.role !== "promotor") return data;
  const mine = data.filter(x => x.promotor === currentUser.name);
  return mine.length ? mine : data.slice(0, 3);
}



function safeRender(fn){
  try{
    fn();
  }catch(error){
    console.warn("Render omitido:", error);
  }
}

function renderAll(){
  [
    renderGreeting,
    renderKpis,
    renderDonut,
    renderAlerts,
    renderUpcoming,
    renderDashboardFacultyChart,
    renderDashboardReminders,
    renderRecentActivity,
    renderCriticalInventory,
    renderCalendarMini,
    renderFacultad,
    renderOv,
    renderMaterial,
    renderInventory,
    renderNotes,
    renderReports,
    toggleAdminOnly
  ].forEach(safeRender);
}

function renderGreeting(){
  const hour = new Date().getHours();
  const saludo = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";

  const greeting = document.getElementById("greeting");
  if(greeting){
    greeting.textContent = `${saludo}, ${currentUser.name}`;
  }

  const welcomeTitle = document.getElementById("welcomeTitle");
  if(welcomeTitle){
    welcomeTitle.textContent = currentUser.role === "admin"
      ? `Bienvenida, ${currentUser.name}`
      : `Bienvenido, ${currentUser.name}`;
  }

  const welcomeText = document.getElementById("welcomeText");
  if(welcomeText){
    welcomeText.textContent = currentUser.role === "admin"
      ? "Revisa el estado operativo de solicitudes, materiales e inventario."
      : "Consulta tus solicitudes registradas, revisa observaciones y registra nuevas actividades.";
  }

  const managerMessage = document.getElementById("managerMessage");
  if(managerMessage){
    managerMessage.classList.toggle("hidden", currentUser.role !== "admin");
  }
}

function renderKpis(){
  const kpiTotal = document.getElementById("kpiTotal");
  if(!kpiTotal) return;

  const f = visible(facultad);
  const o = visible(ov);
  const m = visible(materiales);
  const total = f.length + o.length + m.length;
  const pendientes = f.filter(x=>x.estado==="Pendiente").length + m.filter(x=>x.estado==="Pendiente").length;
  const observadas = f.filter(x=>x.estado==="Observada").length + m.filter(x=>x.estado==="Observada").length;
  const participantes = f.reduce((s,x)=>s+Number(x.participantes||0),0) + o.reduce((s,x)=>s+Number(x.cantidad||x.participantes||0),0);

  document.getElementById("kpiTotal").textContent = total;
  document.getElementById("kpiPendientes").textContent = pendientes;
  document.getElementById("kpiObservadas").textContent = observadas;
  document.getElementById("kpiParticipantes").textContent = participantes;

  const detail = document.getElementById("kpiTotalDetail");
  if(detail) detail.textContent = `${f.length} Facultad · ${o.length} OV · ${m.length} Materiales`;
}

function renderDonut(){
  const data = visible(facultad);
  const donut = document.getElementById("statusDonut");
  const legend = document.getElementById("statusLegend");
  if(!donut || !legend) return;

  if(data.length === 0){
    donut.style.background = "conic-gradient(#e2e8f0 0 100%)";
    legend.innerHTML = `<div><span>Sin datos</span><b>0%</b></div>`;
    return;
  }

  const total = data.length;
  const ok = data.filter(x => x.estado === "Aprobada" || x.estado === "Ejecutada").length;
  const pending = data.filter(x => x.estado === "Pendiente").length;
  const observed = data.filter(x => x.estado === "Observada").length;

  const okP = Math.round(ok/total*100);
  const pendingP = Math.round(pending/total*100);
  const observedP = Math.max(0, 100-okP-pendingP);

  donut.style.background =
    `conic-gradient(var(--navy) 0 ${okP}%, #94a3b8 ${okP}% ${okP+pendingP}%, #d6a437 ${okP+pendingP}% 100%)`;

  legend.innerHTML = `
    <div><span>Aprobadas / Ejecutadas</span><b>${okP}%</b></div>
    <div><span>Pendientes</span><b>${pendingP}%</b></div>
    <div><span>Observadas</span><b>${observedP}%</b></div>
  `;
}

function renderAlerts(){
  const alerts = [];

  visible(facultad).forEach(item => {
    if(item.estado === "Observada") alerts.push({level:"medium", title:"Solicitud observada", text:`${item.colegio} requiere revisión antes de aprobarse.`});
    if((item.tipoColegio === "SILVER" || item.tipoColegio === "BRONCE") && item.estado !== "Aprobada") alerts.push({level:"medium", title:"Evaluación previa", text:`${item.colegio} es ${item.tipoColegio}. Requiere aprobación previa.`});
    if(item.taxi === "SI" && (!item.recojo || !item.retorno)) alerts.push({level:"high", title:"Taxi incompleto", text:`${item.colegio} requiere taxi, pero falta dirección de recojo o retorno.`});
    if(!item.docente || item.docente === "Pendiente") alerts.push({level:"low", title:"Docente pendiente", text:`${item.actividad} aún no tiene docente asignado.`});
  });

  Object.entries(inventory).forEach(([key, item]) => {
    if(getStockStatus(item) === "Crítico") alerts.push({level:"high", title:"Stock crítico", text:`${item.label} está por debajo del stock mínimo (${item.stock} unidades).`});
  });

  if(alerts.length === 0) alerts.push({level:"low", title:"Sin alertas críticas", text:"No hay incidencias pendientes de atención."});

  document.getElementById("alertsList").innerHTML = alerts.slice(0,5).map(a => `
    <div class="clean-item ${a.level}">
      <strong>${a.title}</strong>
      <span>${a.text}</span>
    </div>
  `).join("");
}

function renderUpcoming(){
  const rows = visible(facultad)
    .slice()
    .sort((a,b)=>a.fechaEvento.localeCompare(b.fechaEvento))
    .slice(0,3);

  const box = document.getElementById("upcomingList");
  if(!box) return;

  if(rows.length === 0){
    box.innerHTML = `<div class="empty-data">No hay actividades próximas registradas.</div>`;
    return;
  }

  box.innerHTML = rows.map(x => {
    const date = new Date(x.fechaEvento + "T00:00:00");
    const day = isNaN(date) ? "--" : String(date.getDate()).padStart(2,"0");
    const month = isNaN(date) ? "" : date.toLocaleDateString("es-PE",{month:"short"}).replace(".","");
    return `
      <div class="upcoming-mini">
        <div class="upcoming-date">${day}<small>${month}</small></div>
        <div>
          <b>${x.actividad} - ${x.colegio}</b>
          <span>${x.horaInicio} · ${x.modalidad} · ${x.promotor}</span>
        </div>
        <div class="upcoming-dot"></div>
      </div>
    `;
  }).join("");
}

function renderDashboardFacultyChart(){
  const box = document.getElementById("dashboardFacultyChart");
  if(!box) return;

  const data = countBy(visible(facultad), "facultad");
  const entries = Object.entries(data).sort((a,b)=>b[1]-a[1]).slice(0,5);

  if(entries.length === 0){
    box.innerHTML = `<div class="empty-data">Aún no hay solicitudes por facultad.</div>`;
    return;
  }

  const max = Math.max(...entries.map(e=>e[1]), 1);
  box.innerHTML = entries.map(([label,value]) => `
    <div class="small-bar-row">
      <span title="${label}">${label}</span>
      <div class="small-bar-track"><i style="width:${Math.round(value/max*100)}%"></i></div>
      <b>${value}</b>
    </div>
  `).join("");
}

function renderDashboardReminders(){
  const box = document.getElementById("dashboardReminderList");
  if(!box) return;

  const items = visibleNotes()
    .filter(n => n.type === "Recordatorio" && n.status !== "Completado")
    .sort((a,b)=>(a.date || "9999").localeCompare(b.date || "9999"))
    .slice(0,3);

  if(items.length === 0){
    box.innerHTML = `<div class="empty-data">No hay recordatorios pendientes.</div>`;
    return;
  }

  box.innerHTML = items.map(n => `
    <div class="dash-reminder">
      <div class="dash-reminder-icon"></div>
      <div>
        <b>${n.title}</b>
        <span>${n.date || "Sin fecha"} · ${n.priority}</span>
      </div>
      <button class="link-button" onclick="showSection('notas')">Ver</button>
    </div>
  `).join("");
}

function renderRecentActivity(){
  const box = document.getElementById("recentActivityList");
  if(!box) return;

  const rows = [
    ...visible(facultad).map(x => ({type:"Facultad/CGE", title:x.actividad, detail:`${x.colegio} · ${x.promotor}`, date:x.fechaSolicitud || x.fechaEvento})),
    ...visible(ov).map(x => ({type:"OV", title:x.actividad, detail:`${x.colegio} · ${x.promotor}`, date:x.fecha})),
    ...visible(materiales).map(x => ({type:"Material", title:x.actividad, detail:`${x.colegio} · ${x.promotor}`, date:x.fecha}))
  ].sort((a,b)=>(b.date || "").localeCompare(a.date || "")).slice(0,4);

  if(rows.length === 0){
    box.innerHTML = `<div class="empty-data">Aún no hay movimientos registrados.</div>`;
    return;
  }

  box.innerHTML = rows.map(row => `
    <div class="recent-item">
      <span class="recent-type">${row.type}</span>
      <b>${row.title}</b>
      <span>${row.detail}</span>
    </div>
  `).join("");
}

function renderCriticalInventory(){
  const box = document.getElementById("criticalInventoryList");
  if(!box) return;

  const entries = Object.values(inventory)
    .sort((a,b)=>(a.stock/a.initial)-(b.stock/b.initial))
    .slice(0,3);

  box.innerHTML = entries.map(item => {
    const percent = Math.max(0, Math.round(item.stock / item.initial * 100));
    return `
      <div class="critical-item">
        <span>${item.label}</span>
        <div class="critical-track"><i style="width:${percent}%"></i></div>
        <b>${item.stock}/${item.initial}</b>
      </div>
    `;
  }).join("");
}

function renderCalendarMini(){
  const grid = document.getElementById("calendarGrid");
  const monthLabel = document.getElementById("calendarMonth");
  if(!grid || !monthLabel) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  monthLabel.textContent = now.toLocaleDateString("es-PE", { month:"long", year:"numeric" });

  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const eventDays = new Set(facultad.map(x => {
    const d = new Date(x.fechaEvento + "T00:00:00");
    return !isNaN(d) && d.getMonth() === month && d.getFullYear() === year ? d.getDate() : null;
  }).filter(Boolean));

  let cells = ["L","M","M","J","V","S","D"].map(d => `<span>${d}</span>`);

  for(let i=0;i<42;i++){
    const dayNum = i - startOffset + 1;
    let label = dayNum;
    let cls = "";
    if(dayNum < 1){
      label = prevDays + dayNum;
      cls = "muted-day";
    } else if(dayNum > daysInMonth){
      label = dayNum - daysInMonth;
      cls = "muted-day";
    } else {
      if(dayNum === now.getDate()) cls = "today-mini";
      if(eventDays.has(dayNum)) cls += " has-event";
    }
    cells.push(`<b class="${cls.trim()}">${label}</b>`);
  }

  grid.innerHTML = cells.join("");
}

function renderFacultad(){
  const table = document.getElementById("facTable");
  if(!table) return;

  const search = (document.getElementById("facSearch")?.value || "").toLowerCase();
  const status = document.getElementById("facStatus")?.value || "";
  const tipo = document.getElementById("facTipo")?.value || "";

  const rows = visible(facultad).filter(x => {
    const text = `${x.colegio || ""} ${x.actividad || ""} ${x.carrera || ""}`.toLowerCase();
    const rowStatus = x.estado || "";
    const rowTipo = x.tipoColegio || "";
    return text.includes(search) && (!status || rowStatus === status) && (!tipo || rowTipo === tipo);
  });

  if(rows.length === 0){
    table.innerHTML = `
      <tr>
        <td colspan="9" class="empty-row">
          No hay registros para mostrar con los filtros actuales.
        </td>
      </tr>
    `;
    return;
  }

  table.innerHTML = rows.map(x => `
    <tr>
      <td><b>${x.colegio || "-"}</b><br><small>${x.tipoColegio || "-"} · Cód. ${x.codigo || "-"}</small></td>
      <td><b>${x.actividad || "-"}</b><br><small>${x.facultad || "-"} · ${x.carrera || "-"}</small></td>
      <td>${x.promotor || "-"}</td>
      <td>${x.fechaEvento || x.fecha || "-"}<br><small>${x.horaInicio || "-"} ${x.horaFin ? " - " + x.horaFin : ""}</small></td>
      <td>${x.modalidad || "-"}</td>
      <td>${x.participantes || x.cantidad || 0}<br><small>${x.publico || "-"}</small></td>
      <td>${x.material || "-"}</td>
      <td><span class="badge ${x.estado || "Pendiente"}">${x.estado || "Pendiente"}</span></td>
      <td><span class="table-link" onclick="showRequestDetail('${x.colegio || "-"}', '${x.actividad || "-"}')">Ver detalle</span></td>
    </tr>
  `).join("");
}

function renderOv(){
  const table = document.getElementById("ovTable");
  if(!table) return;

  const rows = visible(ov);

  if(rows.length === 0){
    table.innerHTML = `
      <tr>
        <td colspan="7" class="empty-row">
          No hay solicitudes OV registradas para mostrar.
        </td>
      </tr>
    `;
    return;
  }

  table.innerHTML = rows.map(x => `
    <tr>
      <td><b>${x.colegio || "-"}</b></td>
      <td>${x.actividad || "-"}</td>
      <td>${x.promotor || "-"}</td>
      <td>${x.fecha || "-"}<br><small>${x.inicio || ""} ${x.fin ? " - " + x.fin : ""}</small></td>
      <td>${x.cantidad || x.participantes || 0} ${x.poblacion || ""}</td>
      <td>${x.psicologo || "-"}</td>
      <td>S/ ${x.costo || 0}</td>
    </tr>
  `).join("");
}

function renderMaterial(){
  const table = document.getElementById("materialTable");
  if(!table) return;

  const rows = visible(materiales);

  if(rows.length === 0){
    table.innerHTML = `
      <tr>
        <td colspan="9" class="empty-row">
          No hay solicitudes de materiales registradas para mostrar.
        </td>
      </tr>
    `;
    return;
  }

  table.innerHTML = rows.map(x => `
    <tr>
      <td><b>${x.colegio || "-"}</b></td>
      <td>${x.actividad || "-"}</td>
      <td>${x.promotor || "-"}</td>
      <td>${x.fecha || "-"}</td>
      <td>${x.fichas || 0}</td>
      <td>${x.lapiceros || 0}</td>
      <td>${x.bolsas || 0}</td>
      <td><span class="badge ${x.estado || "Registrada"}">${x.estado || "Registrada"}</span></td>
      <td><span class="table-link" onclick="showRequestDetail('${x.colegio || "-"}', '${x.actividad || "-"}')">Ver detalle</span></td>
    </tr>
  `).join("");
}

function renderInventory(){
  const search = (document.getElementById("inventorySearch")?.value || "").toLowerCase();
  const statusFilter = document.getElementById("inventoryStatus")?.value || "";

  const entries = Object.entries(inventory).filter(([key,item]) => {
    const status = getStockStatus(item);
    const text = `${item.label} ${item.category}`.toLowerCase();
    return text.includes(search) && (!statusFilter || status === statusFilter);
  });

  const totalProducts = Object.keys(inventory).length;
  const totalStock = Object.values(inventory).reduce((sum,item)=>sum + Number(item.stock || 0), 0);
  const critical = Object.values(inventory).filter(item => getStockStatus(item) === "Crítico").length;

  const invProducts = document.getElementById("invProducts");
  if(invProducts){
    invProducts.textContent = totalProducts;
    document.getElementById("invTotalStock").textContent = totalStock;
    document.getElementById("invCritical").textContent = critical;
  }

  const table = document.getElementById("inventoryTable");
  if(table){
    table.innerHTML = entries.map(([key,item]) => {
      const status = getStockStatus(item);
      const initials = item.label.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
      return `
        <tr>
          <td>
            <div class="product-cell">
              <div class="product-dot">${initials}</div>
              <div>
                <b>${item.label}</b><br>
                <small>ID: ${key}</small>
              </div>
            </div>
          </td>
          <td>${item.category || "General"}</td>
          <td><b>${item.stock}</b></td>
          <td>${item.min || 0}</td>
          <td><span class="status-pill ${status}">${status}</span></td>
          <td>
            <div class="stock-control">
              <button onclick="quickStock('${key}', -10)">−</button>
              <span class="stock-mini">${item.stock}</span>
              <button onclick="quickStock('${key}', 10)">+</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  renderInventoryUsage();
  fillStockProductSelect();
}

function getStockStatus(item){
  if(item.stock <= (item.min || 0)) return "Crítico";
  if(item.stock <= (item.min || 0) * 1.5) return "Bajo";
  return "Disponible";
}

function renderInventoryUsage(){
  const usage = {
    Fichas: materiales.reduce((s,x)=>s+Number(x.fichas||0),0),
    Lapiceros: materiales.reduce((s,x)=>s+Number(x.lapiceros||0),0),
    Bolsas: materiales.reduce((s,x)=>s+Number(x.bolsas||0),0),
    Mugs: materiales.reduce((s,x)=>s+Number(x.mugs||0),0),
    Libretas: materiales.reduce((s,x)=>s+Number(x.libretas||0),0)
  };
  const entries = Object.entries(usage).sort((a,b)=>b[1]-a[1]);
  const max = Math.max(...entries.map(e=>e[1]), 1);
  const box = document.getElementById("inventoryUsage");
  if(!box) return;
  box.innerHTML = entries.map(([label,value]) => `
    <div class="usage-item">
      <div><span>${label}</span><b>${value}</b></div>
      <div class="usage-track"><i style="width:${Math.round(value/max*100)}%"></i></div>
    </div>
  `).join("");
}

function quickStock(key, amount){
  if(!inventory[key]) return;
  inventory[key].stock = Math.max(0, inventory[key].stock + amount);
  inventory[key].initial = Math.max(inventory[key].initial, inventory[key].stock);
  renderAll();
}

function openProductForm(){
  document.getElementById("inventoryModal").classList.remove("hidden");
  document.getElementById("modalTitle").textContent = "Nuevo producto";
  document.getElementById("modalText").textContent = "Registra un nuevo material para el inventario.";
  document.getElementById("productForm").classList.remove("hidden");
  document.getElementById("stockForm").classList.add("hidden");
}

function openStockEditor(){
  document.getElementById("inventoryModal").classList.remove("hidden");
  document.getElementById("modalTitle").textContent = "Ajustar stock";
  document.getElementById("modalText").textContent = "Registra ingresos, salidas o define una cantidad exacta.";
  document.getElementById("productForm").classList.add("hidden");
  document.getElementById("stockForm").classList.remove("hidden");
  fillStockProductSelect();
}

function closeInventoryModal(){
  document.getElementById("inventoryModal").classList.add("hidden");
}

function saveProduct(event){
  event.preventDefault();
  const name = document.getElementById("productName").value.trim();
  const key = name.toLowerCase()
    .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

  if(!key){
    alert("Ingresa un nombre válido.");
    return;
  }

  if(inventory[key]){
    alert("Ese producto ya existe.");
    return;
  }

  const stock = Number(document.getElementById("productStock").value);
  inventory[key] = {
    label: name,
    category: document.getElementById("productCategory").value,
    stock,
    initial: Math.max(stock, 1),
    min: Number(document.getElementById("productMin").value)
  };

  event.target.reset();
  closeInventoryModal();
  saveData();
  renderAll();
}

function fillStockProductSelect(){
  const select = document.getElementById("stockProduct");
  if(!select) return;
  select.innerHTML = Object.entries(inventory).map(([key,item]) => `
    <option value="${key}">${item.label}</option>
  `).join("");
}

function saveStockAdjustment(event){
  event.preventDefault();
  const key = document.getElementById("stockProduct").value;
  const movement = document.getElementById("stockMovement").value;
  const amount = Number(document.getElementById("stockAmount").value);

  if(!inventory[key]) return;

  if(movement === "add"){
    inventory[key].stock += amount;
  } else if(movement === "subtract"){
    inventory[key].stock = Math.max(0, inventory[key].stock - amount);
  } else {
    inventory[key].stock = amount;
  }

  inventory[key].initial = Math.max(inventory[key].initial, inventory[key].stock);
  event.target.reset();
  closeInventoryModal();
  saveData();
  renderAll();
}


function renderApprovals(){
  const fRows = facultad.filter(x => x.estado === "Pendiente" || x.estado === "Observada").map(x => ({
    type:"Facultad y CGE",
    id:x.id,
    title:x.colegio,
    detail:`${x.actividad} · ${x.promotor}`,
    action:`approveRequest(${x.id})`,
    observe:`observeRequest(${x.id})`
  }));

  const mRows = materiales.filter(x => x.estado === "Pendiente" || x.estado === "Observada").map(x => ({
    type:"Materiales",
    id:x.id,
    title:x.colegio,
    detail:`${x.actividad} · ${x.promotor}`,
    action:`approveMaterial(${x.id})`,
    observe:`observeMaterial(${x.id})`
  }));

  const rows = [...fRows, ...mRows];

  document.getElementById("approvalList").innerHTML = rows.map(x => `
    <div class="activity-card">
      <div>
        <b>${x.title}</b>
        <small>${x.type} · ${x.detail}</small>
      </div>
      <div class="action-buttons">
        <button class="approve" onclick="${x.action}">Aprobar</button>
        <button class="observe" onclick="${x.observe}">Observar</button>
      </div>
    </div>
  `).join("");
}

function renderReports(){
  const allFac = facultad;
  const allRequests = [...facultad, ...ov, ...materiales];

  const colegios = new Set(allFac.map(x=>x.colegio)).size;
  const participantes = facultad.reduce((s,x)=>s+Number(x.participantes||0),0) + ov.reduce((s,x)=>s+Number(x.cantidad||0),0);
  const conMaterial = facultad.filter(x=>x.material && x.material !== "NO").length + materiales.length;
  const conTaxi = facultad.filter(x=>x.taxi === "SI").length;

  const byFacultad = countBy(allFac, "facultad");
  const byPromotor = countBy(allRequests, "promotor");
  const byTipoColegio = countBy(allFac, "tipoColegio");
  const bySchool = countBy(allFac, "colegio");

  const materialUse = {
    Fichas: materiales.reduce((s,x)=>s+Number(x.fichas||0),0),
    Lapiceros: materiales.reduce((s,x)=>s+Number(x.lapiceros||0),0),
    Bolsas: materiales.reduce((s,x)=>s+Number(x.bolsas||0),0),
    Mugs: materiales.reduce((s,x)=>s+Number(x.mugs||0),0),
    Libretas: materiales.reduce((s,x)=>s+Number(x.libretas||0),0)
  };

  const repColegios = document.getElementById("repColegios");
  if(!repColegios) return;

  repColegios.textContent = colegios;
  document.getElementById("repParticipantes").textContent = participantes;
  document.getElementById("repConMaterial").textContent = conMaterial;
  document.getElementById("repConTaxi").textContent = conTaxi;

  renderMonthlyChart();
  renderBarChart("chartPromotores", byPromotor);
  renderBarChart("chartColegios", byTipoColegio);
  renderBarChart("chartFacultades", byFacultad);
  renderBarChart("chartMateriales", materialUse);
  renderOperationalIndicators();
  renderSchoolRanking(bySchool);
}

function renderMonthlyChart(){
  const monthLabels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const months = Array(12).fill(0);

  facultad.forEach(item => {
    const date = new Date(item.fechaEvento + "T00:00:00");
    if(!isNaN(date)) months[date.getMonth()] += 1;
  });

  const max = Math.max(...months, 1);
  document.getElementById("chartMeses").innerHTML = months.map((value,index) => `
    <div class="vbar">
      <b>${value}</b>
      <i style="height:${Math.max(6, Math.round(value/max*190))}px"></i>
      <span>${monthLabels[index]}</span>
    </div>
  `).join("");
}

function renderOperationalIndicators(){
  const total = facultad.length || 1;
  const fueraControl = facultad.filter(x => x.estado === "Observada").length;
  const taxi = facultad.filter(x => x.taxi === "SI").length;
  const material = facultad.filter(x => x.material && x.material !== "NO").length;
  const presencial = facultad.filter(x => x.modalidad === "PRESENCIAL").length;
  const pendienteDocente = facultad.filter(x => !x.docente || x.docente === "Pendiente").length;

  const indicators = [
    ["Solicitudes observadas", `${fueraControl} de ${total}`],
    ["Actividades presenciales", `${Math.round(presencial/total*100)}%`],
    ["Solicitudes con taxi", taxi],
    ["Actividades con material", material],
    ["Pendientes de docente", pendienteDocente]
  ];

  document.getElementById("operationalIndicators").innerHTML = indicators.map(([label,value]) => `
    <div class="indicator-item">
      <span>${label}</span>
      <b>${value}</b>
    </div>
  `).join("");
}

function renderSchoolRanking(data){
  const entries = Object.entries(data).sort((a,b)=>b[1]-a[1]).slice(0,5);
  document.getElementById("schoolRanking").innerHTML = entries.map(([school,value], index) => `
    <div class="ranking-row">
      <span class="rank">${index + 1}</span>
      <div>
        <b>${school}</b>
        <small>Solicitudes registradas</small>
      </div>
      <strong>${value}</strong>
    </div>
  `).join("");
}

function showRequestDetail(colegio, actividad){
  alert(`Detalle de solicitud\\n\\nColegio: ${colegio}\\nActividad: ${actividad}`);
}

function countBy(data, key){
  return data.reduce((acc,item)=>{
    const value = item[key] || "Sin dato";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  },{});
}

function topKey(obj){
  const entries = Object.entries(obj);
  if(entries.length === 0) return "--";
  return entries.sort((a,b)=>b[1]-a[1])[0][0];
}

function renderBarChart(id, data){
  const entries = Object.entries(data).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const max = Math.max(...entries.map(e=>e[1]), 1);
  document.getElementById(id).innerHTML = entries.map(([label,value]) => `
    <div class="bar-row">
      <span title="${label}">${label}</span>
      <div class="bar-bg"><i style="width:${Math.round(value/max*100)}%"></i></div>
      <b>${value}</b>
    </div>
  `).join("");
}

function toggleAdminOnly(){
  document.querySelectorAll(".admin-only").forEach(el => {
    el.style.display = currentUser.role === "admin" ? "" : "none";
  });
}

function approveRequest(id){
  const item = facultad.find(x=>x.id===id);
  if(item){
    item.estado = "Aprobada";
    alert("Solicitud aprobada correctamente.");
    saveData();
    renderAll();
  }
}

function observeRequest(id){
  const item = facultad.find(x=>x.id===id);
  if(item){
    item.estado = "Observada";
    alert("Solicitud marcada como observada.");
    renderAll();
  }
}

function approveMaterial(id){
  const item = materiales.find(x=>x.id===id);
  if(!item) return;

  if(item.descontado){
    item.estado = "Aprobada";
    renderAll();
    return;
  }

  const required = {
    fichas:item.fichas || 0,
    lapiceros:item.lapiceros || 0,
    mugs:item.mugs || 0,
    libretas:item.libretas || 0,
    posits:item.posits || 0,
    bolsas:item.bolsas || 0,
    tomatodos:item.tomatodos || 0
  };

  const missing = Object.entries(required).filter(([key,value]) => inventory[key] && inventory[key].stock < value);

  if(missing.length){
    item.estado = "Observada";
    alert("No hay stock suficiente. La solicitud fue marcada como observada.");
    renderAll();
    return;
  }

  Object.entries(required).forEach(([key,value]) => {
    if(inventory[key]) inventory[key].stock -= value;
  });

  item.estado = "Aprobada";
  item.descontado = true;
  alert("Solicitud aprobada. El inventario fue actualizado.");
  saveData();
  renderAll();
}

function observeMaterial(id){
  const item = materiales.find(x=>x.id===id);
  if(item){
    item.estado = "Observada";
    alert("Solicitud de material marcada como observada.");
    renderAll();
  }
}

function restockInventory(){
  openStockEditor();
}

function toggleTaxiRequired(){
  const taxi = document.getElementById("fTaxi").value;
  document.getElementById("fRecojo").required = taxi === "SI";
  document.getElementById("fRetorno").required = taxi === "SI";
}

function diffHours(a,b){
  return (new Date(b+"T00:00:00") - new Date(a+"T00:00:00")) / 36e5;
}

function saveFacultad(event){
  event.preventDefault();

  const fechaSolicitud = document.getElementById("fFechaSolicitud").value;
  const fechaEvento = document.getElementById("fFechaEvento").value;

  if(diffHours(fechaSolicitud, fechaEvento) < 48){
    alert("La solicitud debe registrarse con mínimo 48 horas hábiles de anticipación.");
    return;
  }

  const colegio = document.getElementById("fColegio").value.trim();
  const hora = document.getElementById("fHoraInicio").value;

  const duplicate = facultad.some(x => x.colegio.toLowerCase() === colegio.toLowerCase() && x.fechaEvento === fechaEvento && x.horaInicio === hora);

  if(duplicate){
    alert("Ya existe una solicitud para ese colegio, fecha y hora.");
    return;
  }

  const tipoColegio = document.getElementById("fTipoColegio").value;
  const requiresReview = tipoColegio === "SILVER" || tipoColegio === "BRONCE";

  facultad.push({
    id:Date.now(),
    promotor:currentUser.name,
    tipoActividad:document.getElementById("fTipoActividad").value,
    codigo:document.getElementById("fCodigo").value,
    tipoColegio,
    colegio,
    facultad:document.getElementById("fFacultad").value,
    carrera:document.getElementById("fCarrera").value,
    actividad:document.getElementById("fActividad").value,
    fechaSolicitud,
    fechaEvento,
    horaInicio:hora,
    horaFin:document.getElementById("fHoraFin").value,
    publico:document.getElementById("fPublico").value,
    grado:document.getElementById("fGrado").value,
    participantes:Number(document.getElementById("fParticipantes").value),
    modalidad:document.getElementById("fModalidad").value,
    material:document.getElementById("fMaterial").value,
    universidades:document.getElementById("fUniversidades").value,
    lugar:document.getElementById("fLugar").value,
    estado:requiresReview ? "Observada" : "Pendiente",
    taxi:document.getElementById("fTaxi").value,
    recojo:document.getElementById("fRecojo").value,
    retorno:document.getElementById("fRetorno").value,
    docente:document.getElementById("fDocente").value
  });

  alert(requiresReview ? "Solicitud guardada. Requiere evaluación previa." : "Solicitud guardada correctamente.");
  event.target.reset();
  saveData();
  showSection("facultad");
}

function saveOv(event){
  event.preventDefault();
  ov.push({
    promotor:currentUser.name,
    colegio:document.getElementById("ovColegio").value,
    actividad:document.getElementById("ovActividad").value,
    fecha:document.getElementById("ovFecha").value,
    inicio:document.getElementById("ovInicio").value,
    fin:document.getElementById("ovFin").value,
    cantidad:Number(document.getElementById("ovCantidad").value),
    poblacion:document.getElementById("ovPoblacion").value,
    psicologo:document.getElementById("ovPsicologo").value,
    costo:80
  });
  alert("Solicitud OV guardada correctamente.");
  event.target.reset();
  saveData();
  showSection("ov");
}

function saveMaterial(event){
  event.preventDefault();
  materiales.push({
    id:Date.now(),
    promotor:currentUser.name,
    colegio:document.getElementById("mColegio").value,
    actividad:document.getElementById("mTipoActividad").value,
    fecha:document.getElementById("mFecha").value,
    fichas:Number(document.getElementById("mFichas").value),
    lapiceros:Number(document.getElementById("mLapiceros").value),
    mugs:Number(document.getElementById("mMugs").value),
    libretas:Number(document.getElementById("mLibretas").value),
    posits:Number(document.getElementById("mPosits").value),
    bolsas:Number(document.getElementById("mBolsas").value),
    tomatodos:Number(document.getElementById("mTomatodos").value),
    estado:"Pendiente",
    descontado:false
  });
  alert("Solicitud de material guardada correctamente.");
  event.target.reset();
  saveData();
  showSection("material");
}



function saveQuickNote(){
  const input = document.getElementById("quickNoteInput");
  if(!input || !input.value.trim()) return;

  notes.push({
    id: Date.now(),
    owner: currentUser.name,
    type: "Nota",
    title: "Nota rápida",
    description: input.value.trim(),
    date: "",
    priority: "Normal",
    status: "Pendiente"
  });

  input.value = "";
  renderAll();
}

function visibleNotes(){
  if(currentUser.role === "admin"){
    return notes.filter(n => n.owner === currentUser.name || n.owner === "Ivanna");
  }
  return notes.filter(n => n.owner === currentUser.name);
}

function renderNotes(){
  const list = document.getElementById("notesList");
  if(!list) return;

  const search = (document.getElementById("notesSearch")?.value || "").toLowerCase();
  const filter = document.getElementById("notesFilter")?.value || "";

  let data = visibleNotes().filter(note => {
    const text = `${note.title} ${note.description}`.toLowerCase();
    const matchesSearch = text.includes(search);
    const matchesFilter = !filter || note.type === filter || note.status === filter;
    return matchesSearch && matchesFilter;
  });

  document.getElementById("notesActive").textContent = visibleNotes().filter(n => n.status !== "Completado").length;
  document.getElementById("notesPending").textContent = visibleNotes().filter(n => n.type === "Recordatorio" && n.status !== "Completado").length;
  document.getElementById("notesHigh").textContent = visibleNotes().filter(n => n.priority === "Alta" && n.status !== "Completado").length;

  list.innerHTML = data.map(note => `
    <article class="note-card ${note.priority}">
      <div class="note-top">
        <div>
          <span class="note-type">${note.type}</span>
          <h3>${note.title}</h3>
        </div>
        <span class="note-status ${note.status}">${note.status}</span>
      </div>
      <p>${note.description}</p>
      <div class="note-meta">
        <span>Prioridad: ${note.priority}</span>
        <span>${note.date ? "Fecha: " + note.date : "Sin fecha"}</span>
      </div>
      <div class="note-actions">
        <button class="ghost" onclick="toggleNoteStatus(${note.id})">${note.status === "Completado" ? "Reabrir" : "Marcar como hecho"}</button>
        <button class="ghost" onclick="deleteNote(${note.id})">Eliminar</button>
      </div>
    </article>
  `).join("");

  renderReminderList();
}

function renderReminderList(){
  const box = document.getElementById("reminderList");
  if(!box) return;

  const reminders = visibleNotes()
    .filter(n => n.type === "Recordatorio" && n.status !== "Completado")
    .sort((a,b) => (a.date || "9999").localeCompare(b.date || "9999"))
    .slice(0, 6);

  if(reminders.length === 0){
    box.innerHTML = `<div class="empty-state">No hay recordatorios pendientes.</div>`;
    return;
  }

  box.innerHTML = reminders.map(note => `
    <div class="reminder-item">
      <strong>${note.title}</strong>
      <span>${note.date || "Sin fecha"} · ${note.priority}</span>
    </div>
  `).join("");
}

function openNoteModal(){
  document.getElementById("noteModal").classList.remove("hidden");
  toggleReminderDate();
}

function closeNoteModal(){
  document.getElementById("noteModal").classList.add("hidden");
}

function toggleReminderDate(){
  const type = document.getElementById("noteType").value;
  const field = document.getElementById("reminderDateField");
  const input = document.getElementById("noteDate");
  field.style.display = type === "Recordatorio" ? "" : "none";
  input.required = type === "Recordatorio";
}

function saveNote(event){
  event.preventDefault();

  notes.push({
    id: Date.now(),
    owner: currentUser.name,
    type: document.getElementById("noteType").value,
    title: document.getElementById("noteTitle").value.trim(),
    description: document.getElementById("noteDescription").value.trim(),
    date: document.getElementById("noteDate").value,
    priority: document.getElementById("notePriority").value,
    status: "Pendiente"
  });

  event.target.reset();
  closeNoteModal();
  saveData();
  renderAll();
}

function toggleNoteStatus(id){
  const note = notes.find(n => n.id === id);
  if(note){
    note.status = note.status === "Completado" ? "Pendiente" : "Completado";
    saveData();
    renderAll();
  }
}

function deleteNote(id){
  notes = notes.filter(n => n.id !== id);
  saveData();
  renderAll();
}



function restoreDemoData(){
  resetDemoData();
  saveData();
  renderAll();
  alert("Datos demo restaurados correctamente.");
}

function updateClock(){
  const now = new Date();
  const time = now.toLocaleTimeString("es-PE", { hour:"2-digit", minute:"2-digit", second:"2-digit" });
  const date = now.toLocaleDateString("es-PE", { weekday:"long", day:"2-digit", month:"long" });
  document.getElementById("liveClock").textContent = time;
  document.getElementById("sideClock").textContent = time;
  document.getElementById("todayText").textContent = date;
  document.getElementById("sideDate").textContent = date;
}

setInterval(updateClock,1000);
updateClock();



window.addEventListener("DOMContentLoaded", () => {
  resetDemoData();
});
