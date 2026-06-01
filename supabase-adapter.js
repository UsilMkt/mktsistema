const USIL_DB = {
  client: null,
  profile: null,
  profiles: {},
  productsByKey: {},
  materialItems: {},
  ready: false
};

function ensureFeedbackUi(){
  if(!document.body) return;
  if(!document.getElementById("appToastStack")){
    const stack = document.createElement("div");
    stack.id = "appToastStack";
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }

  if(!document.getElementById("appDialog")){
    const dialog = document.createElement("div");
    dialog.id = "appDialog";
    dialog.className = "app-dialog hidden";
    dialog.innerHTML = `
      <div class="app-dialog-card">
        <div class="app-dialog-icon" id="appDialogIcon">!</div>
        <div>
          <h3 id="appDialogTitle">Mensaje del sistema</h3>
          <p id="appDialogText"></p>
          <input id="appDialogInput" class="hidden" />
        </div>
        <div class="app-dialog-actions">
          <button type="button" class="ghost" id="appDialogCancel">Cancelar</button>
          <button type="button" id="appDialogOk">Aceptar</button>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);
  }
}

function notify(message, type = "info"){
  ensureFeedbackUi();
  const stack = document.getElementById("appToastStack");
  if(!stack) return;
  const toast = document.createElement("div");
  toast.className = `app-toast ${type}`;
  toast.innerHTML = `
    <span>${type === "success" ? "OK" : type === "error" ? "!" : type === "warning" ? "!" : "i"}</span>
    <div>${message}</div>
  `;
  stack.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 180);
  }, type === "error" ? 5200 : 3400);
}

function showDialog({ title = "Mensaje del sistema", message = "", type = "info", input = false, placeholder = "", defaultValue = "" }){
  ensureFeedbackUi();
  return new Promise(resolve => {
    const dialog = document.getElementById("appDialog");
    const titleEl = document.getElementById("appDialogTitle");
    const textEl = document.getElementById("appDialogText");
    const inputEl = document.getElementById("appDialogInput");
    const cancelBtn = document.getElementById("appDialogCancel");
    const okBtn = document.getElementById("appDialogOk");
    const iconEl = document.getElementById("appDialogIcon");

    titleEl.textContent = title;
    textEl.textContent = message;
    iconEl.textContent = type === "success" ? "OK" : type === "error" ? "!" : type === "warning" ? "!" : "i";
    iconEl.className = `app-dialog-icon ${type}`;
    inputEl.classList.toggle("hidden", !input);
    inputEl.value = defaultValue;
    inputEl.placeholder = placeholder;
    cancelBtn.classList.toggle("hidden", type === "notice");
    dialog.classList.remove("hidden");
    if(input) setTimeout(() => inputEl.focus(), 30);

    const cleanup = value => {
      dialog.classList.add("hidden");
      okBtn.onclick = null;
      cancelBtn.onclick = null;
      resolve(value);
    };

    okBtn.onclick = () => cleanup(input ? inputEl.value.trim() : true);
    cancelBtn.onclick = () => cleanup(input ? null : false);
  });
}

window.alert = message => notify(String(message), "info");

function initSupabase(){
  if(USIL_DB.client) return USIL_DB.client;
  const cfg = window.USIL_SUPABASE;
  if(!cfg?.url || !cfg?.anonKey){
    throw new Error("Falta configurar Supabase en config.js");
  }
  USIL_DB.client = window.supabase.createClient(cfg.url, cfg.anonKey);
  return USIL_DB.client;
}

function normalizeKey(value){
  return String(value || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

function timeValue(value){
  return String(value || "").slice(0, 5);
}

function boolToSiNo(value){
  return value ? "SI" : "NO";
}

function siNoToBool(value){
  return String(value || "").toUpperCase() === "SI";
}

function fieldValue(id){
  return document.getElementById(id)?.value?.trim() || "";
}

function requireFields(fields){
  const missing = fields.filter(([id]) => !fieldValue(id));
  if(missing.length){
    const labels = missing.map(([, label]) => label).join(", ");
    notify(`Completa los campos obligatorios: ${labels}.`, "warning");
    document.getElementById(missing[0][0])?.focus();
    return false;
  }
  return true;
}

function isEndAfterStart(start, end){
  return calculateHours(start, end) > 0;
}

function getProfileName(id){
  return USIL_DB.profiles[id]?.name || currentUser?.name || "Sin promotor";
}

async function fetchProfiles(){
  const db = initSupabase();
  const { data, error } = await db.from("profiles").select("id,email,name,role,active");
  if(error) throw error;
  USIL_DB.profiles = Object.fromEntries((data || []).map(item => [item.id, item]));
}

function mapActivity(row){
  return {
    id: row.id,
    promotor: getProfileName(row.promoter_id),
    promoterId: row.promoter_id,
    tipoActividad: row.activity_type,
    codigo: row.school_code,
    tipoColegio: row.school_category,
    colegio: row.school_name,
    facultad: row.faculty_name,
    carrera: row.career_name,
    actividad: row.activity_name,
    fechaSolicitud: row.requested_on,
    fechaEvento: row.event_date,
    horaInicio: timeValue(row.start_time),
    horaFin: timeValue(row.end_time),
    publico: row.audience,
    grado: row.grade,
    participantes: Number(row.participants || 0),
    modalidad: row.modality,
    material: row.material_required,
    universidades: boolToSiNo(row.other_universities),
    lugar: row.location,
    estado: row.executed ? "Ejecutada" : row.status,
    taxi: boolToSiNo(row.taxi_required),
    recojo: row.pickup_address,
    retorno: row.return_address,
    dni: row.teacher_dni,
    docente: row.teacher_name,
    celular: row.teacher_phone,
    correo: row.teacher_email
  };
}

function mapOv(row){
  return {
    id: row.id,
    promotor: getProfileName(row.promoter_id),
    promoterId: row.promoter_id,
    codigo: row.school_code,
    tipoColegio: row.school_category,
    colegio: row.school_name,
    distrito: row.district,
    tipoActividad: row.activity_type,
    actividad: row.activity_name,
    fecha: row.event_date,
    inicio: timeValue(row.start_time),
    fin: timeValue(row.end_time),
    modalidad: row.modality,
    cantidad: Number(row.quantity || 0),
    poblacion: row.population,
    grado: row.grade,
    psicologo: row.psychologist_name,
    observacion: row.observation,
    estado: row.status,
    horas: Number(row.hours || 0),
    tarifaHora: Number(row.hourly_rate || 80),
    costo: Number(row.amount || 0),
    pago: row.payment_status
  };
}

function mapInventoryProduct(row){
  const key = normalizeKey(row.name);
  return [
    key,
    {
      dbId: row.id,
      label: row.name,
      category: row.category,
      stock: Number(row.stock || 0),
      initial: Math.max(Number(row.stock || 0), 1),
      min: Number(row.minimum_stock || 0)
    }
  ];
}

function mapMaterial(row){
  const mapped = {
    id: row.id,
    promotor: getProfileName(row.promoter_id),
    promoterId: row.promoter_id,
    codigo: row.school_code,
    colegio: row.school_name,
    clasificacion: row.school_category,
    actividad: row.activity_name,
    fecha: row.activity_date,
    estado: row.status,
    fichas: 0,
    lapiceros: 0,
    mugs: 0,
    libretas: 0,
    posits: 0,
    bolsas: 0,
    tomatodos: 0
  };

  (USIL_DB.materialItems[row.id] || []).forEach(item => {
    const productName = item.inventory_products?.name || "";
    const key = normalizeKey(productName);
    if(key.includes("ficha")) mapped.fichas += Number(item.quantity || 0);
    if(key.includes("lapicero")) mapped.lapiceros += Number(item.quantity || 0);
    if(key.includes("mug")) mapped.mugs += Number(item.quantity || 0);
    if(key.includes("libreta")) mapped.libretas += Number(item.quantity || 0);
    if(key.includes("post")) mapped.posits += Number(item.quantity || 0);
    if(key.includes("bolsa")) mapped.bolsas += Number(item.quantity || 0);
    if(key.includes("tomatodo")) mapped.tomatodos += Number(item.quantity || 0);
  });

  return mapped;
}

function mapNote(row){
  return {
    id: row.id,
    ownerId: row.owner_id,
    owner: getProfileName(row.owner_id),
    type: row.type,
    title: row.title,
    description: row.description,
    date: row.reminder_date || "",
    priority: row.priority,
    status: row.status
  };
}

async function fetchAllData(){
  const db = initSupabase();
  await fetchProfiles();

  const [
    activitiesRes,
    ovRes,
    productsRes,
    materialRes,
    materialItemsRes,
    notesRes
  ] = await Promise.all([
    db.from("activities").select("*").order("event_date", { ascending: false }),
    db.from("ov_requests").select("*").order("event_date", { ascending: false }),
    db.from("inventory_products").select("*").eq("active", true).order("name", { ascending: true }),
    db.from("material_requests").select("*").order("activity_date", { ascending: false }),
    db.from("material_request_items").select("*, inventory_products(name)"),
    db.from("notes").select("*").order("created_at", { ascending: false })
  ]);

  [activitiesRes, ovRes, productsRes, materialRes, materialItemsRes, notesRes].forEach(res => {
    if(res.error) throw res.error;
  });

  USIL_DB.materialItems = {};
  (materialItemsRes.data || []).forEach(item => {
    if(!USIL_DB.materialItems[item.request_id]) USIL_DB.materialItems[item.request_id] = [];
    USIL_DB.materialItems[item.request_id].push(item);
  });

  facultad = (activitiesRes.data || []).map(mapActivity);
  ov = (ovRes.data || []).map(mapOv);
  inventory = Object.fromEntries((productsRes.data || []).map(mapInventoryProduct));
  USIL_DB.productsByKey = Object.fromEntries(Object.entries(inventory).map(([key, value]) => [key, value.dbId]));
  materiales = (materialRes.data || []).map(mapMaterial);
  notes = (notesRes.data || []).map(mapNote);
}

async function refreshData(){
  try{
    await loadData();
    renderAll();
  }catch(error){
    console.error(error);
    notify("No se pudieron cargar los datos desde Supabase: " + error.message, "error");
  }
}

loadData = async function(){
  if(!currentUser) return;
  await fetchAllData();
};

saveData = function(){};

login = async function(event){
  event.preventDefault();
  const db = initSupabase();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if(error){
    notify("No se pudo iniciar sesion: " + error.message, "error");
    return;
  }

  const { data: profile, error: profileError } = await db
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if(profileError){
    notify("El usuario existe, pero no tiene perfil configurado en Supabase.", "error");
    await db.auth.signOut();
    return;
  }

  USIL_DB.profile = profile;
  currentUser = {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    role: profile.role === "gerencia" ? "admin" : "promotor"
  };

  document.getElementById("loginView").classList.add("hidden");
  document.getElementById("appView").classList.remove("hidden");
  setupInterface();
  showSection("dashboard");
  await refreshData();
};

logout = async function(){
  await initSupabase().auth.signOut();
  currentUser = null;
  USIL_DB.profile = null;
  document.getElementById("appView").classList.add("hidden");
  document.getElementById("loginView").classList.remove("hidden");
};

function activityPayload(){
  const tipoColegio = document.getElementById("fTipoColegio").value;
  const executed = document.getElementById("fEjecutado").value === "SI";
  const requiresReview = tipoColegio === "SILVER" || tipoColegio === "BRONCE";
  const taxiRequired = siNoToBool(document.getElementById("fTaxi").value);
  return {
    promoter_id: currentUser.id,
    created_by: currentUser.id,
    school_code: document.getElementById("fCodigo").value.trim(),
    school_category: tipoColegio,
    school_name: document.getElementById("fColegio").value.trim(),
    activity_type: document.getElementById("fTipoActividad").value,
    faculty_name: document.getElementById("fFacultad").value,
    career_name: document.getElementById("fCarrera").value.trim(),
    activity_name: document.getElementById("fActividad").value.trim(),
    requested_on: document.getElementById("fFechaSolicitud").value,
    event_date: document.getElementById("fFechaEvento").value,
    start_time: document.getElementById("fHoraInicio").value,
    end_time: document.getElementById("fHoraFin").value,
    audience: document.getElementById("fPublico").value,
    grade: document.getElementById("fGrado").value.trim(),
    participants: Number(document.getElementById("fParticipantes").value || 0),
    modality: document.getElementById("fModalidad").value,
    material_required: document.getElementById("fMaterial").value,
    other_universities: siNoToBool(document.getElementById("fUniversidades").value),
    location: document.getElementById("fLugar").value.trim(),
    executed,
    status: executed ? "Ejecutada" : (requiresReview ? "Observada" : "Pendiente"),
    taxi_required: taxiRequired,
    pickup_address: taxiRequired ? document.getElementById("fRecojo").value.trim() : "",
    return_address: taxiRequired ? document.getElementById("fRetorno").value.trim() : "",
    teacher_dni: document.getElementById("fDni").value.trim(),
    teacher_name: document.getElementById("fDocente").value.trim(),
    teacher_phone: document.getElementById("fCelular").value.trim(),
    teacher_email: document.getElementById("fCorreo").value.trim()
  };
}

saveFacultad = async function(event){
  event.preventDefault();
  const requiredOk = requireFields([
    ["fTipoActividad", "Tipo de actividad"],
    ["fCodigo", "Codigo de colegio"],
    ["fTipoColegio", "Tipo de colegio"],
    ["fColegio", "Nombre del colegio"],
    ["fFacultad", "Facultad"],
    ["fCarrera", "Carrera"],
    ["fActividad", "Nombre de actividad"],
    ["fFechaSolicitud", "Fecha de solicitud"],
    ["fFechaEvento", "Fecha del evento"],
    ["fHoraInicio", "Hora inicio"],
    ["fHoraFin", "Hora fin"],
    ["fParticipantes", "Numero de participantes"],
    ["fLugar", "Lima / Provincia"]
  ]);
  if(!requiredOk) return;

  const fechaSolicitud = document.getElementById("fFechaSolicitud").value;
  const fechaEvento = document.getElementById("fFechaEvento").value;

  if(diffHours(fechaSolicitud, fechaEvento) < 48){
    notify("La solicitud debe registrarse con minimo 48 horas habiles de anticipacion.", "warning");
    return;
  }

  if(!isEndAfterStart(document.getElementById("fHoraInicio").value, document.getElementById("fHoraFin").value)){
    notify("La hora fin debe ser posterior a la hora de inicio.", "warning");
    document.getElementById("fHoraFin").focus();
    return;
  }

  if(Number(document.getElementById("fParticipantes").value || 0) <= 0){
    notify("El numero de participantes debe ser mayor a cero.", "warning");
    document.getElementById("fParticipantes").focus();
    return;
  }

  if(document.getElementById("fTaxi").value === "SI" && (!fieldValue("fRecojo") || !fieldValue("fRetorno"))){
    notify("Si requiere taxi, completa direccion de recojo y retorno.", "warning");
    (!fieldValue("fRecojo") ? document.getElementById("fRecojo") : document.getElementById("fRetorno")).focus();
    return;
  }

  if(fieldValue("fCorreo") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue("fCorreo"))){
    notify("El correo del docente no tiene un formato valido.", "warning");
    document.getElementById("fCorreo").focus();
    return;
  }

  const duplicate = facultad.some(item =>
    String(item.id) !== String(editingFacultadId || "") &&
    String(item.colegio || "").toLowerCase() === fieldValue("fColegio").toLowerCase() &&
    item.fechaEvento === fechaEvento &&
    item.horaInicio === document.getElementById("fHoraInicio").value
  );
  if(duplicate){
    notify("Ya existe una solicitud para ese colegio, fecha y hora.", "warning");
    return;
  }

  const wasEditing = Boolean(editingFacultadId);
  const payload = activityPayload();
  if(editingFacultadId){
    const previous = facultad.find(item => item.id === editingFacultadId);
    payload.promoter_id = previous?.promoterId || currentUser.id;
    payload.status = payload.executed ? "Ejecutada" : (previous?.estado || payload.status);
    delete payload.created_by;
  }
  const db = initSupabase();
  const request = editingFacultadId
    ? db.from("activities").update(payload).eq("id", editingFacultadId).select().single()
    : db.from("activities").insert(payload).select().single();

  const { error } = await request;
  if(error){
    notify("No se pudo guardar la solicitud: " + error.message, "error");
    return;
  }

  event.target.reset();
  resetFacultadFormState();
  await refreshData();
  showSection("facultad");
  notify(wasEditing ? "Solicitud actualizada correctamente." : "Solicitud registrada correctamente.", "success");
};

function ovPayload(){
  return {
    promoter_id: currentUser.id,
    created_by: currentUser.id,
    school_code: document.getElementById("ovCodigo").value.trim(),
    school_category: document.getElementById("ovTipo").value.trim(),
    school_name: document.getElementById("ovColegio").value.trim(),
    district: document.getElementById("ovDistrito").value.trim(),
    activity_type: document.getElementById("ovTipoActividad").value,
    activity_name: document.getElementById("ovActividad").value.trim(),
    event_date: document.getElementById("ovFecha").value,
    start_time: document.getElementById("ovInicio").value,
    end_time: document.getElementById("ovFin").value,
    modality: document.getElementById("ovModalidad").value,
    quantity: Number(document.getElementById("ovCantidad").value || 0),
    population: document.getElementById("ovPoblacion").value,
    grade: document.getElementById("ovGrado").value.trim(),
    psychologist_name: document.getElementById("ovPsicologo").value.trim(),
    observation: document.getElementById("ovObservacion").value.trim(),
    hourly_rate: OV_HOURLY_RATE,
    status: "Pendiente"
  };
}

saveOv = async function(event){
  event.preventDefault();
  const requiredOk = requireFields([
    ["ovCodigo", "Codigo modular"],
    ["ovTipo", "Tipo de colegio"],
    ["ovColegio", "Colegio"],
    ["ovDistrito", "Distrito"],
    ["ovActividad", "Nombre de actividad"],
    ["ovFecha", "Fecha"],
    ["ovInicio", "Hora inicio"],
    ["ovFin", "Hora fin"],
    ["ovCantidad", "Cantidad"],
    ["ovPsicologo", "Psicologo a cargo"]
  ]);
  if(!requiredOk) return;

  const horas = calculateHours(document.getElementById("ovInicio").value, document.getElementById("ovFin").value);
  if(horas <= 0){
    notify("Revisa la hora de inicio y fin para calcular el pago OV.", "warning");
    document.getElementById("ovFin").focus();
    return;
  }

  if(Number(document.getElementById("ovCantidad").value || 0) <= 0){
    notify("La cantidad debe ser mayor a cero.", "warning");
    document.getElementById("ovCantidad").focus();
    return;
  }

  const duplicate = ov.some(item =>
    String(item.id) !== String(editingOvId || "") &&
    String(item.colegio || "").toLowerCase() === fieldValue("ovColegio").toLowerCase() &&
    item.fecha === document.getElementById("ovFecha").value &&
    item.inicio === document.getElementById("ovInicio").value
  );
  if(duplicate){
    notify("Ya existe una solicitud OV para ese colegio, fecha y hora.", "warning");
    return;
  }

  const wasEditing = Boolean(editingOvId);
  const payload = ovPayload();
  if(editingOvId){
    const previous = ov.find(item => item.id === editingOvId);
    payload.promoter_id = previous?.promoterId || currentUser.id;
    payload.status = previous?.estado || payload.status;
    payload.payment_status = previous?.pago || "Pendiente";
    delete payload.created_by;
  }
  const db = initSupabase();
  const request = editingOvId
    ? db.from("ov_requests").update(payload).eq("id", editingOvId).select().single()
    : db.from("ov_requests").insert(payload).select().single();

  const { error } = await request;
  if(error){
    notify("No se pudo guardar la solicitud OV: " + error.message, "error");
    return;
  }

  event.target.reset();
  resetOvFormState();
  await refreshData();
  showSection("ov");
  notify(wasEditing ? "Solicitud OV actualizada correctamente." : "Solicitud OV registrada correctamente.", "success");
};

async function getProductIdFor(field){
  const aliases = {
    fichas: ["fichas", "ficha"],
    lapiceros: ["lapiceros", "lapicero"],
    mugs: ["mugs", "mug"],
    libretas: ["libretas_ecologicas", "libretas", "libreta"],
    posits: ["post_its", "postits", "posits"],
    bolsas: ["bolsas", "bolsa"],
    tomatodos: ["tomatodos", "tomatodo"]
  };
  const keys = aliases[field] || [field];
  const match = Object.entries(USIL_DB.productsByKey).find(([key]) => keys.some(alias => key.includes(alias)));
  return match?.[1] || null;
}

renderInventory = function(){
  const search = (document.getElementById("inventorySearch")?.value || "").toLowerCase();
  const statusFilter = document.getElementById("inventoryStatus")?.value || "";
  const entries = Object.entries(inventory).filter(([, item]) => {
    const status = getStockStatus(item);
    const matchesSearch = item.label.toLowerCase().includes(search);
    const matchesStatus = !statusFilter || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalProducts = Object.keys(inventory).length;
  const totalStock = Object.values(inventory).reduce((sum,item)=>sum + Number(item.stock || 0), 0);
  const critical = Object.values(inventory).filter(item => getStockStatus(item) === "Crítico" || getStockStatus(item) === "CrÃ­tico").length;

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
      const canDelete = currentUser?.role === "admin";
      return `
        <tr>
          <td>
            <div class="product-cell">
              <div class="product-dot">${initials}</div>
              <div>
                <b>${item.label}</b><br>
                <small>${item.category || "General"} · ID: ${key}</small>
              </div>
            </div>
          </td>
          <td>${item.category || "General"}</td>
          <td><b>${item.stock}</b></td>
          <td>${item.min || 0}</td>
          <td><span class="status-pill ${status}">${status}</span></td>
          <td>
            <div class="stock-actions">
              <div class="stock-control">
                <button type="button" title="Restar 10" onclick="quickStock('${key}', -10)">-</button>
                <span class="stock-mini">${item.stock}</span>
                <button type="button" title="Sumar 10" onclick="quickStock('${key}', 10)">+</button>
              </div>
              ${canDelete ? `<button type="button" class="ghost danger-action" onclick="deleteProduct('${key}')">Eliminar</button>` : ""}
            </div>
          </td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="6" class="empty-row">No hay productos para mostrar.</td></tr>`;
  }

  renderInventoryUsage();
  fillStockProductSelect();
};

quickStock = async function(key, amount){
  const product = inventory[key];
  if(!product?.dbId) return;
  const { error } = await initSupabase().from("inventory_movements").insert({
    product_id: product.dbId,
    movement_type: amount > 0 ? "Ingreso" : "Salida",
    quantity: Math.abs(amount),
    note: amount > 0 ? "Ajuste rapido de ingreso" : "Ajuste rapido de salida",
    created_by: currentUser.id
  });

  if(error){
    notify("No se pudo ajustar el stock: " + error.message, "error");
    return;
  }

  notify("Stock actualizado.", "success");
  await refreshData();
};

deleteProduct = async function(key){
  const product = inventory[key];
  if(!product?.dbId) return;
  const ok = await showDialog({
    title: "Eliminar producto",
    message: `¿Quieres eliminar "${product.label}" del inventario? Si ya tiene movimientos, se desactivara para conservar el historial.`,
    type: "warning"
  });
  if(!ok) return;

  const db = initSupabase();
  let { error } = await db.from("inventory_products").delete().eq("id", product.dbId);
  if(error){
    const softDelete = await db.from("inventory_products").update({ active: false }).eq("id", product.dbId);
    error = softDelete.error;
  }

  if(error){
    notify("No se pudo eliminar el producto: " + error.message, "error");
    return;
  }

  notify("Producto eliminado del inventario.", "success");
  await refreshData();
};

saveMaterial = async function(event){
  event.preventDefault();
  const requiredOk = requireFields([
    ["mCodigo", "Codigo modular"],
    ["mColegio", "Colegio"],
    ["mTipoActividad", "Tipo de actividad"],
    ["mFecha", "Fecha de actividad"]
  ]);
  if(!requiredOk) return;

  const fields = {
    fichas: Number(document.getElementById("mFichas").value || 0),
    lapiceros: Number(document.getElementById("mLapiceros").value || 0),
    mugs: Number(document.getElementById("mMugs").value || 0),
    libretas: Number(document.getElementById("mLibretas").value || 0),
    posits: Number(document.getElementById("mPosits").value || 0),
    bolsas: Number(document.getElementById("mBolsas").value || 0),
    tomatodos: Number(document.getElementById("mTomatodos").value || 0)
  };

  if(Object.values(fields).every(value => value <= 0)){
    notify("Agrega al menos un material con cantidad mayor a cero.", "warning");
    document.getElementById("mFichas").focus();
    return;
  }

  const db = initSupabase();
  const payload = {
    promoter_id: currentUser.id,
    created_by: currentUser.id,
    school_code: document.getElementById("mCodigo").value.trim(),
    school_name: document.getElementById("mColegio").value.trim(),
    school_category: document.getElementById("mClasificacion").value,
    activity_name: document.getElementById("mTipoActividad").value.trim(),
    activity_date: document.getElementById("mFecha").value,
    status: "Pendiente"
  };

  const { data: request, error } = await db.from("material_requests").insert(payload).select().single();
  if(error){
    notify("No se pudo guardar la solicitud de material: " + error.message, "error");
    return;
  }

  const items = [];
  for(const [field, quantity] of Object.entries(fields)){
    if(quantity <= 0) continue;
    const productId = await getProductIdFor(field);
    if(productId) items.push({ request_id: request.id, product_id: productId, quantity });
  }

  if(items.length){
    const { error: itemError } = await db.from("material_request_items").insert(items);
    if(itemError){
      notify("La solicitud se guardo, pero fallaron los items: " + itemError.message, "warning");
    }
  }

  event.target.reset();
  await refreshData();
  showSection("material");
  notify("Solicitud de material registrada correctamente.", "success");
};

saveProduct = async function(event){
  event.preventDefault();
  if(!requireFields([
    ["productName", "Nombre del producto"],
    ["productStock", "Stock inicial"],
    ["productMin", "Stock minimo"]
  ])) return;

  if(Number(document.getElementById("productStock").value || 0) < 0 || Number(document.getElementById("productMin").value || 0) < 0){
    notify("El stock y el minimo no pueden ser negativos.", "warning");
    return;
  }

  const db = initSupabase();
  const { error } = await db.from("inventory_products").insert({
    name: document.getElementById("productName").value.trim(),
    category: document.getElementById("productCategory").value,
    stock: Number(document.getElementById("productStock").value || 0),
    minimum_stock: Number(document.getElementById("productMin").value || 0)
  });

  if(error){
    notify("No se pudo guardar el producto: " + error.message, "error");
    return;
  }

  event.target.reset();
  closeInventoryModal();
  await refreshData();
  notify("Producto guardado correctamente.", "success");
};

saveStockAdjustment = async function(event){
  event.preventDefault();
  if(!requireFields([
    ["stockProduct", "Producto"],
    ["stockAmount", "Cantidad"]
  ])) return;

  const key = document.getElementById("stockProduct").value;
  const movement = document.getElementById("stockMovement").value;
  const product = inventory[key];
  if(!product?.dbId) return;

  const movementType = movement === "add" ? "Ingreso" : movement === "subtract" ? "Salida" : "Ajuste";
  const amount = Number(document.getElementById("stockAmount").value || 0);
  if(amount < 0){
    notify("La cantidad no puede ser negativa.", "warning");
    return;
  }

  const { error } = await initSupabase().from("inventory_movements").insert({
    product_id: product.dbId,
    movement_type: movementType,
    quantity: amount,
    note: document.getElementById("stockNote").value.trim(),
    created_by: currentUser.id
  });

  if(error){
    notify("No se pudo ajustar el stock: " + error.message, "error");
    return;
  }

  event.target.reset();
  closeInventoryModal();
  await refreshData();
  notify("Stock ajustado correctamente.", "success");
};

saveQuickNote = async function(){
  const input = document.getElementById("quickNoteInput");
  if(!input || !input.value.trim()) return;

  const { error } = await initSupabase().from("notes").insert({
    owner_id: currentUser.id,
    type: "Nota",
    title: "Nota rapida",
    description: input.value.trim(),
    priority: "Normal",
    status: "Pendiente"
  });

  if(error){
    notify("No se pudo guardar la nota: " + error.message, "error");
    return;
  }

  input.value = "";
  await refreshData();
  notify("Nota guardada.", "success");
};

saveNote = async function(event){
  event.preventDefault();
  if(!requireFields([
    ["noteTitle", "Titulo"],
    ["noteDescription", "Descripcion"]
  ])) return;

  if(document.getElementById("noteType").value === "Recordatorio" && !fieldValue("noteDate")){
    notify("Selecciona la fecha del recordatorio.", "warning");
    document.getElementById("noteDate").focus();
    return;
  }

  const { error } = await initSupabase().from("notes").insert({
    owner_id: currentUser.id,
    type: document.getElementById("noteType").value,
    title: document.getElementById("noteTitle").value.trim(),
    description: document.getElementById("noteDescription").value.trim(),
    reminder_date: document.getElementById("noteDate").value || null,
    priority: document.getElementById("notePriority").value,
    status: "Pendiente"
  });

  if(error){
    notify("No se pudo guardar la nota: " + error.message, "error");
    return;
  }

  event.target.reset();
  closeNoteModal();
  await refreshData();
  notify("Anotacion guardada.", "success");
};

toggleNoteStatus = async function(id){
  const note = notes.find(n => n.id === id);
  if(!note) return;
  const { error } = await initSupabase()
    .from("notes")
    .update({ status: note.status === "Completado" ? "Pendiente" : "Completado" })
    .eq("id", id);
  if(error){
    notify("No se pudo actualizar la nota: " + error.message, "error");
    return;
  }
  await refreshData();
  notify("Nota actualizada.", "success");
};

deleteNote = async function(id){
  const ok = await showDialog({
    title: "Eliminar nota",
    message: "Esta accion eliminara la nota o recordatorio seleccionado.",
    type: "warning"
  });
  if(!ok) return;

  const { error } = await initSupabase().from("notes").delete().eq("id", id);
  if(error){
    notify("No se pudo eliminar la nota: " + error.message, "error");
    return;
  }
  await refreshData();
  notify("Nota eliminada.", "success");
};

approveRequest = async function(id){
  const { error } = await initSupabase().from("activities").update({ status: "Aprobada", executed: false }).eq("id", id);
  if(error){
    notify("No se pudo aprobar: " + error.message, "error");
    return;
  }
  await refreshData();
  notify("Solicitud aprobada.", "success");
};

observeRequest = async function(id){
  const reason = await showDialog({
    title: "Observar solicitud",
    message: "Indica el motivo de la observacion para que quede registrado.",
    type: "warning",
    input: true,
    placeholder: "Ej. Falta confirmar docente"
  });
  if(reason === null) return;
  const { error } = await initSupabase().from("activities").update({ status: "Observada", observation_reason: reason }).eq("id", id);
  if(error){
    notify("No se pudo observar: " + error.message, "error");
    return;
  }
  await refreshData();
  notify("Solicitud observada.", "success");
};

restoreDemoData = async function(){
  await refreshData();
  notify("Datos actualizados desde Supabase.", "success");
};

function exportReport(){
  const rows = [
    ["Modulo","Colegio","Actividad","Promotor","Fecha","Participantes","Costo OV"],
    ...facultad.map(item => ["Facultad/CGE", item.colegio, item.actividad, item.promotor, item.fechaEvento, item.participantes, ""]),
    ...ov.map(item => ["OV", item.colegio, item.actividad, item.promotor, item.fecha, item.cantidad, item.costo]),
    ...materiales.map(item => ["Materiales", item.colegio, item.actividad, item.promotor, item.fecha, "", ""])
  ];
  const csv = rows.map(row => row.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `reporte-usil-${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

toggleTaxiRequired = function(){
  const taxi = document.getElementById("fTaxi")?.value;
  const recojo = document.getElementById("fRecojo");
  const retorno = document.getElementById("fRetorno");
  const required = taxi === "SI";

  [recojo, retorno].forEach(input => {
    if(!input) return;
    input.required = required;
    input.disabled = !required;
    input.closest("label")?.classList.toggle("field-disabled", !required);
    if(!required) input.value = "";
  });
};

window.addEventListener("DOMContentLoaded", async () => {
  ensureFeedbackUi();
  document.querySelectorAll("form").forEach(form => form.noValidate = true);
  document.querySelector(".demo-box")?.classList.add("hidden");
  document.querySelectorAll(".demo-loaded-banner").forEach(el => el.textContent = "Datos conectados a Supabase");
  document.querySelector(".demo-restore").textContent = "Actualizar datos";
  document.querySelector(".report-actions .btn-primary")?.setAttribute("onclick", "exportReport()");
  document.getElementById("fTaxi")?.addEventListener("change", toggleTaxiRequired);
  toggleTaxiRequired();

  const db = initSupabase();
  const { data } = await db.auth.getSession();
  if(data.session?.user){
    const { data: profile } = await db.from("profiles").select("*").eq("id", data.session.user.id).single();
    if(profile){
      USIL_DB.profile = profile;
      currentUser = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role === "gerencia" ? "admin" : "promotor"
      };
      document.getElementById("loginView").classList.add("hidden");
      document.getElementById("appView").classList.remove("hidden");
      setupInterface();
      showSection("dashboard");
      await refreshData();
    }
  }
});
