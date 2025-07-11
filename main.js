// Enhanced Dashboard Application for Visualgv.com
class VisualGVDashboard {
  constructor() {
    this.currentModule = "organizaciones"
    this.modules = new Map()
    this.forms = new Map()
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.initializeModules()
    this.setupFormHandlers()
    this.setupFileUpload()
    this.setupChat()
    this.setupModuleCreation()
    this.loadUserData()
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll(".nav-link[data-module]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const module = e.currentTarget.dataset.module
        this.switchModule(module)
      })
    })

    // Submenu toggles
    document.querySelectorAll(".has-submenu > .nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (!e.currentTarget.dataset.module) {
          e.preventDefault()
          const parent = e.currentTarget.closest(".has-submenu")
          parent.classList.toggle("open")
        }
      })
    })

    // Mobile sidebar toggle
    const sidebarToggle = document.getElementById("sidebarToggle")
    const sidebar = document.getElementById("sidebar")

    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open")
      })
    }

    // Search functionality
    const searchInput = document.getElementById("searchInput")
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value)
      })
    }

    // Header actions
    const exportBtn = document.getElementById("exportBtn")
    const saveBtn = document.getElementById("saveBtn")

    if (exportBtn) {
      exportBtn.addEventListener("click", () => this.exportData())
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", () => this.saveData())
    }

    // Close sidebar on mobile when clicking outside
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
          sidebar.classList.remove("open")
        }
      }
    })
  }

  initializeModules() {
    const moduleElements = document.querySelectorAll(".dashboard-module")
    moduleElements.forEach((module) => {
      const id = module.id.replace("module-", "")
      this.modules.set(id, {
        element: module,
        name: module.querySelector("h2").textContent.trim(),
        active: module.classList.contains("active"),
      })
    })
  }

  switchModule(moduleName) {
    // Update navigation
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
    })
    document.querySelector(`[data-module="${moduleName}"]`).classList.add("active")

    // Update modules
    document.querySelectorAll(".dashboard-module").forEach((module) => {
      module.classList.remove("active")
    })
    document.getElementById(`module-${moduleName}`).classList.add("active")

    // Update breadcrumb
    const moduleInfo = this.modules.get(moduleName)
    if (moduleInfo) {
      document.getElementById("currentModuleName").textContent = moduleInfo.name
    }

    this.currentModule = moduleName
    this.trackModuleView(moduleName)
  }

  setupFormHandlers() {
    document.querySelectorAll(".enhanced-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleFormSubmit(form)
      })

      // Real-time validation
      form.querySelectorAll("input, textarea, select").forEach((input) => {
        input.addEventListener("blur", () => {
          this.validateField(input)
        })

        input.addEventListener("input", () => {
          this.clearFieldError(input)
        })
      })
    })

    // Button actions
    document.querySelectorAll("button[data-action]").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        const action = button.dataset.action
        const form = button.closest("form")
        this.handleButtonAction(action, form)
      })
    })
  }

  handleFormSubmit(form) {
    const formType = form.dataset.form
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    if (this.validateForm(form)) {
      this.processFormData(formType, data)
      this.showToast("Datos guardados correctamente", "success")
      this.resetForm(form)
    }
  }

  validateForm(form) {
    let isValid = true
    const inputs = form.querySelectorAll("input[required], textarea[required], select[required]")

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false
      }
    })

    return isValid
  }

  validateField(input) {
    const value = input.value.trim()
    const feedback = input.parentNode.querySelector(".input-feedback")

    if (input.hasAttribute("required") && !value) {
      this.showFieldError(input, "Este campo es obligatorio")
      return false
    }

    if (input.type === "email" && value && !this.isValidEmail(value)) {
      this.showFieldError(input, "Ingrese un email válido")
      return false
    }

    if (input.type === "url" && value && !this.isValidURL(value)) {
      this.showFieldError(input, "Ingrese una URL válida")
      return false
    }

    this.showFieldSuccess(input)
    return true
  }

  showFieldError(input, message) {
    const feedback = input.parentNode.querySelector(".input-feedback")
    input.style.borderColor = "var(--danger-color)"
    feedback.textContent = message
    feedback.className = "input-feedback error"
  }

  showFieldSuccess(input) {
    const feedback = input.parentNode.querySelector(".input-feedback")
    input.style.borderColor = "var(--success-color)"
    feedback.textContent = ""
    feedback.className = "input-feedback success"
  }

  clearFieldError(input) {
    const feedback = input.parentNode.querySelector(".input-feedback")
    input.style.borderColor = "var(--border-color)"
    feedback.textContent = ""
    feedback.className = "input-feedback"
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  isValidURL(url) {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  handleButtonAction(action, form) {
    const formType = form.dataset.form
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    switch (action) {
      case "crear":
        this.createItem(formType, data)
        break
      case "editar":
        this.editItem(formType, data)
        break
      case "borrar":
        this.deleteItem(formType, data)
        break
      case "archivar":
        this.archiveItem(formType, data)
        break
      case "recuperar":
        this.recoverItem(formType, data)
        break
    }
  }

  createItem(type, data) {
    console.log("Creating item:", type, data)
    this.showToast(`${type} creado correctamente`, "success")
    this.saveToStorage(type, data)
  }

  editItem(type, data) {
    console.log("Editing item:", type, data)
    this.showToast(`${type} editado correctamente`, "info")
  }

  deleteItem(type, data) {
    if (confirm("¿Está seguro de que desea borrar este elemento?")) {
      console.log("Deleting item:", type, data)
      this.showToast(`${type} borrado correctamente`, "warning")
    }
  }

  archiveItem(type, data) {
    console.log("Archiving item:", type, data)
    this.showToast(`${type} archivado correctamente`, "info")
  }

  recoverItem(type, data) {
    console.log("Recovering item:", type, data)
    this.showToast(`${type} recuperado correctamente`, "success")
  }

  processFormData(formType, data) {
    // Process different form types
    switch (formType) {
      case "organizacion":
        this.processOrganization(data)
        break
      case "proyecto":
        this.processProject(data)
        break
      case "invitar-organizacion":
      case "invitar-proyecto":
        this.processInvitation(data)
        break
      case "link":
        this.processLink(data)
        break
      default:
        console.log("Processing form:", formType, data)
    }
  }

  processOrganization(data) {
    console.log("Processing organization:", data)
    // Add organization logic here
  }

  processProject(data) {
    console.log("Processing project:", data)
    // Add project logic here
  }

  processInvitation(data) {
    console.log("Processing invitation:", data)
    // Add invitation logic here
  }

  processLink(data) {
    console.log("Processing link:", data)
    // Add link processing logic here
  }

  setupFileUpload() {
    const uploadArea = document.getElementById("uploadArea")
    const fileInput = document.getElementById("fileInput")
    const browseBtn = document.getElementById("browseBtn")
    const uploadProgress = document.getElementById("uploadProgress")
    const filesList = document.getElementById("filesList")

    if (uploadArea && fileInput) {
      // Click to browse files
      uploadArea.addEventListener("click", () => {
        fileInput.click()
      })

      browseBtn?.addEventListener("click", (e) => {
        e.stopPropagation()
        fileInput.click()
      })

      // Drag and drop functionality
      uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault()
        uploadArea.classList.add("dragover")
      })

      uploadArea.addEventListener("dragleave", (e) => {
        e.preventDefault()
        uploadArea.classList.remove("dragover")
      })

      uploadArea.addEventListener("drop", (e) => {
        e.preventDefault()
        uploadArea.classList.remove("dragover")
        const files = Array.from(e.dataTransfer.files)
        this.handleFiles(files)
      })

      // File input change
      fileInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files)
        this.handleFiles(files)
      })
    }
  }

  handleFiles(files) {
    const filesList = document.getElementById("filesList")
    const uploadProgress = document.getElementById("uploadProgress")

    files.forEach((file) => {
      this.uploadFile(file)
      this.displayFile(file)
    })
  }

  uploadFile(file) {
    const uploadProgress = document.getElementById("uploadProgress")
    const progressFill = uploadProgress?.querySelector(".progress-fill")
    const progressText = uploadProgress?.querySelector(".progress-text")

    if (uploadProgress) {
      uploadProgress.style.display = "block"
    }

    // Simulate file upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setTimeout(() => {
          if (uploadProgress) {
            uploadProgress.style.display = "none"
          }
          this.showToast(`Archivo "${file.name}" subido correctamente`, "success")
        }, 500)
      }

      if (progressFill) {
        progressFill.style.width = `${progress}%`
      }
      if (progressText) {
        progressText.textContent = `${Math.round(progress)}%`
      }
    }, 200)
  }

  displayFile(file) {
    const filesList = document.getElementById("filesList")
    if (!filesList) return

    const fileItem = document.createElement("div")
    fileItem.className = "file-item"
    fileItem.innerHTML = `
            <div class="file-icon">
                <i class="fas fa-file"></i>
            </div>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${this.formatFileSize(file.size)}</div>
            </div>
            <button class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">
                <i class="fas fa-trash"></i>
            </button>
        `
    filesList.appendChild(fileItem)
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  setupChat() {
    const chatInput = document.getElementById("chatInput")
    const sendButton = document.getElementById("sendMessage")
    const chatMessages = document.getElementById("chatMessages")

    if (chatInput && sendButton) {
      const sendMessage = () => {
        const message = chatInput.value.trim()
        if (message) {
          this.addChatMessage(message, true)
          chatInput.value = ""

          // Simulate response
          setTimeout(() => {
            this.addChatMessage("Mensaje recibido", false)
          }, 1000)
        }
      }

      sendButton.addEventListener("click", sendMessage)
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendMessage()
        }
      })
    }
  }

  addChatMessage(text, isOwn) {
    const chatMessages = document.getElementById("chatMessages")
    if (!chatMessages) return

    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${isOwn ? "message-own" : "message-other"}`

    const now = new Date()
    const time = now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })

    messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${time}</div>
        `

    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  setupModuleCreation() {
    const addModuleBtn = document.getElementById("addModuleBtn")
    const moduleModal = document.getElementById("moduleModal")
    const modalClose = document.getElementById("modalClose")
    const cancelModule = document.getElementById("cancelModule")
    const moduleForm = document.getElementById("moduleForm")

    if (addModuleBtn) {
      addModuleBtn.addEventListener("click", () => {
        moduleModal?.classList.add("active")
      })
    }

    if (modalClose) {
      modalClose.addEventListener("click", () => {
        moduleModal?.classList.remove("active")
      })
    }

    if (cancelModule) {
      cancelModule.addEventListener("click", () => {
        moduleModal?.classList.remove("active")
      })
    }

    if (moduleForm) {
      moduleForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.createCustomModule()
      })
    }

    // Close modal on outside click
    if (moduleModal) {
      moduleModal.addEventListener("click", (e) => {
        if (e.target === moduleModal) {
          moduleModal.classList.remove("active")
        }
      })
    }
  }

  createCustomModule() {
    const name = document.getElementById("moduleName").value
    const description = document.getElementById("moduleDescription").value
    const icon = document.getElementById("moduleIcon").value

    if (!name || !description || !icon) {
      this.showToast("Por favor complete todos los campos", "error")
      return
    }

    const moduleId = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    // Add to navigation
    this.addModuleToNavigation(moduleId, name, icon)

    // Create module content
    this.createModuleContent(moduleId, name, description, icon)

    // Close modal and reset form
    document.getElementById("moduleModal").classList.remove("active")
    document.getElementById("moduleForm").reset()

    this.showToast(`Módulo "${name}" creado correctamente`, "success")
  }

  addModuleToNavigation(id, name, icon) {
    const navMenu = document.querySelector(".nav-menu")
    const newNavItem = document.createElement("li")
    newNavItem.className = "nav-item"
    newNavItem.innerHTML = `
            <a href="#" class="nav-link" data-module="${id}">
                <i class="${icon}"></i>
                <span>${name}</span>
            </a>
        `

    // Add before the last item (add module button)
    const lastItem = navMenu.lastElementChild
    navMenu.insertBefore(newNavItem, lastItem)

    // Add event listener
    const newLink = newNavItem.querySelector(".nav-link")
    newLink.addEventListener("click", (e) => {
      e.preventDefault()
      this.switchModule(id)
    })
  }

  createModuleContent(id, name, description, icon) {
    const dashboardModules = document.querySelector(".dashboard-modules")
    const newModule = document.createElement("section")
    newModule.className = "dashboard-module"
    newModule.id = `module-${id}`
    newModule.innerHTML = `
            <div class="module-header">
                <h2><i class="${icon}"></i> ${name}</h2>
                <div class="module-actions">
                    <button class="btn-icon" title="Configurar">
                        <i class="fas fa-cog"></i>
                    </button>
                </div>
            </div>
            <div class="module-content">
                <div class="content-placeholder">
                    <i class="${icon}"></i>
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <textarea placeholder="Agrega contenido para ${name}..." rows="4"></textarea>
                </div>
            </div>
        `

    dashboardModules.appendChild(newModule)

    // Register module
    this.modules.set(id, {
      element: newModule,
      name: name,
      active: false,
    })
  }

  handleSearch(query) {
    if (!query.trim()) {
      this.clearSearch()
      return
    }

    const searchResults = this.searchModules(query)
    this.displaySearchResults(searchResults)
  }

  searchModules(query) {
    const results = []
    const lowerQuery = query.toLowerCase()

    this.modules.forEach((module, id) => {
      if (module.name.toLowerCase().includes(lowerQuery)) {
        results.push({ id, ...module })
      }
    })

    return results
  }

  displaySearchResults(results) {
    // Highlight matching navigation items
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("search-highlight")
    })

    results.forEach((result) => {
      const link = document.querySelector(`[data-module="${result.id}"]`)
      if (link) {
        link.classList.add("search-highlight")
      }
    })
  }

  clearSearch() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("search-highlight")
    })
  }

  showToast(message, type = "info") {
    const toastContainer = document.getElementById("toastContainer")
    if (!toastContainer) return

    const toast = document.createElement("div")
    toast.className = `toast ${type}`
    toast.innerHTML = `
            <i class="fas fa-${this.getToastIcon(type)}"></i>
            <span>${message}</span>
        `

    toastContainer.appendChild(toast)

    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = "slideOut 0.3s ease"
      setTimeout(() => {
        toast.remove()
      }, 300)
    }, 3000)
  }

  getToastIcon(type) {
    const icons = {
      success: "check-circle",
      error: "exclamation-circle",
      warning: "exclamation-triangle",
      info: "info-circle",
    }
    return icons[type] || "info-circle"
  }

  saveData() {
    const data = this.collectAllData()
    localStorage.setItem("visualgv_data", JSON.stringify(data))
    this.showToast("Datos guardados correctamente", "success")
  }

  exportData() {
    const data = this.collectAllData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `visualgv_export_${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    this.showToast("Datos exportados correctamente", "success")
  }

  collectAllData() {
    const data = {
      timestamp: new Date().toISOString(),
      currentModule: this.currentModule,
      modules: Array.from(this.modules.entries()),
      forms: this.getFormData(),
      userPreferences: this.getUserPreferences(),
    }
    return data
  }

  getFormData() {
    const formData = {}
    document.querySelectorAll(".enhanced-form").forEach((form) => {
      const formType = form.dataset.form
      const inputs = form.querySelectorAll("input, textarea, select")
      formData[formType] = {}

      inputs.forEach((input) => {
        if (input.name) {
          formData[formType][input.name] = input.value
        }
      })
    })
    return formData
  }

  getUserPreferences() {
    return {
      theme: "light",
      language: "es",
      notifications: true,
    }
  }

  loadUserData() {
    const savedData = localStorage.getItem("visualgv_data")
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        this.restoreFormData(data.forms)
        console.log("Datos de usuario cargados")
      } catch (error) {
        console.error("Error loading user data:", error)
      }
    }
  }

  restoreFormData(formData) {
    if (!formData) return

    Object.keys(formData).forEach((formType) => {
      const form = document.querySelector(`[data-form="${formType}"]`)
      if (form) {
        Object.keys(formData[formType]).forEach((fieldName) => {
          const field = form.querySelector(`[name="${fieldName}"]`)
          if (field) {
            field.value = formData[formType][fieldName]
          }
        })
      }
    })
  }

  saveToStorage(type, data) {
    const key = `visualgv_${type}`
    const existing = JSON.parse(localStorage.getItem(key) || "[]")
    existing.push({
      ...data,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem(key, JSON.stringify(existing))
  }

  resetForm(form) {
    form.reset()
    form.querySelectorAll(".input-feedback").forEach((feedback) => {
      feedback.textContent = ""
      feedback.className = "input-feedback"
    })
    form.querySelectorAll("input, textarea, select").forEach((input) => {
      input.style.borderColor = "var(--border-color)"
    })
  }

  trackModuleView(moduleName) {
    // Analytics tracking
    console.log(`Module viewed: ${moduleName}`)

    // You can integrate with analytics services here
    if (window.gtag) {
      window.gtag("event", "module_view", {
        module_name: moduleName,
        timestamp: new Date().toISOString(),
      })
    }
  }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.visualGVDashboard = new VisualGVDashboard()
})

// Add CSS for search highlighting
const style = document.createElement("style")
style.textContent = `
    .search-highlight {
        background-color: rgba(72, 157, 243, 0.1) !important;
        border-left: 3px solid var(--primary-color) !important;
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
