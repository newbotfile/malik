mini.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <title>JAWAD-MD | Mini BOT</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background: #0a0a0f;
      color: white;
      min-height: 100vh;
      position: relative;
      overflow-x: hidden;
    }

    .bg-gradient {
      position: fixed;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 30% 40%, rgba(102, 126, 234, 0.15) 0%, transparent 60%),
                  radial-gradient(circle at 70% 70%, rgba(118, 75, 162, 0.15) 0%, transparent 60%),
                  #0a0a0f;
      z-index: 0;
    }

    .glow-orb {
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.3;
      z-index: 1;
      animation: float 20s infinite ease-in-out;
    }

    .orb-1 {
      top: -200px;
      left: -200px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      animation-delay: 0s;
    }

    .orb-2 {
      bottom: -200px;
      right: -200px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      animation-delay: -10s;
    }

    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      33% {
        transform: translate(50px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-50px, 50px) scale(0.9);
      }
    }

    .container {
      position: relative;
      z-index: 10;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .card {
      width: 100%;
      max-width: 480px;
      background: rgba(20, 20, 30, 0.7);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 30px;
      padding: 40px 30px;
      box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
      animation: slideIn 0.6s ease;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #667eea, #764ba2, transparent);
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
    }

    .logo-container {
      width: 90px;
      height: 90px;
      margin: 0 auto 20px;
      position: relative;
    }

    .logo-ring {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top-color: #667eea;
      border-right-color: #764ba2;
      border-radius: 50%;
      animation: spin 3s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .logo {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 38px;
      color: white;
      box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
    }

    .title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 400;
    }

    .server-info {
      background: rgba(102, 126, 234, 0.1);
      border: 1px solid rgba(102, 126, 234, 0.3);
      border-radius: 16px;
      padding: 15px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .server-info:hover {
      background: rgba(102, 126, 234, 0.15);
      border-color: rgba(102, 126, 234, 0.4);
      transform: translateY(-2px);
    }

    .server-info-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .server-info-left i {
      color: #667eea;
      font-size: 20px;
    }

    .server-details {
      flex: 1;
    }

    .server-name {
      display: block;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 2px;
    }

    .server-stats {
      display: flex;
      gap: 15px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
    }

    .server-stat {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .server-stat i {
      font-size: 10px;
    }

    .change-server-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      padding: 8px 16px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .change-server-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }

    .server-selection {
      display: none;
      background: rgba(15, 15, 25, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 20px;
      max-height: 300px;
      overflow-y: auto;
    }

    .server-selection.show {
      display: block;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .server-selection-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 15px;
      color: rgba(255, 255, 255, 0.9);
      text-align: center;
    }

    .server-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .server-option {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 15px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .server-option:hover {
      background: rgba(102, 126, 234, 0.1);
      border-color: rgba(102, 126, 234, 0.3);
      transform: translateY(-2px);
    }

    .server-option.selected {
      background: rgba(102, 126, 234, 0.15);
      border-color: #667eea;
    }

    .server-option-name {
      font-weight: 500;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
    }

    .server-option-stats {
      display: flex;
      gap: 10px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
    }

    .info-box {
      background: rgba(102, 126, 234, 0.1);
      border: 1px solid rgba(102, 126, 234, 0.3);
      border-radius: 16px;
      padding: 18px;
      margin-bottom: 25px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .info-box i {
      color: #667eea;
      font-size: 20px;
      margin-top: 2px;
    }

    .info-box-text {
      flex: 1;
    }

    .info-box-text strong {
      display: block;
      margin-bottom: 4px;
      font-size: 15px;
    }

    .info-box-text p {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.5;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .label {
      display: block;
      margin-bottom: 10px;
      font-weight: 500;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
    }

    .input-wrapper {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(255, 255, 255, 0.5);
      font-size: 18px;
    }

    .input {
      width: 100%;
      padding: 16px 20px 16px 55px;
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      color: white;
      font-size: 15px;
      font-family: inherit;
      transition: all 0.3s ease;
    }

    .input:focus {
      outline: none;
      border-color: #667eea;
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    .input:focus + .input-icon {
      color: #667eea;
    }

    .input::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    .hint {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .hint i {
      font-size: 11px;
    }

    .btn {
      width: 100%;
      padding: 16px;
      border: none;
      border-radius: 16px;
      font-size: 16px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .btn-generate {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
      margin-bottom: 15px;
    }

    .btn-generate:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
    }

    .btn-generate:active:not(:disabled) {
      transform: translateY(-1px);
    }

    .btn-generate:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .btn-copy {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: none;
    }

    .btn-copy:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }

    .loading {
      display: none;
      text-align: center;
      margin: 20px 0;
    }

    .spinner {
      width: 45px;
      height: 45px;
      border: 4px solid rgba(102, 126, 234, 0.2);
      border-radius: 50%;
      border-top-color: #667eea;
      animation: spin 1s linear infinite;
      margin: 0 auto 12px;
    }

    .loading-text {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
    }

    .code-box {
      background: rgba(0, 0, 0, 0.4);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 20px;
      text-align: center;
      margin-bottom: 15px;
      min-height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .code-box.has-code {
      border-color: rgba(0, 212, 170, 0.5);
      background: rgba(0, 212, 170, 0.05);
    }

    .code-box.has-error {
      border-color: rgba(255, 107, 107, 0.5);
      background: rgba(255, 107, 107, 0.05);
    }

    .code-placeholder {
      color: rgba(255, 255, 255, 0.4);
      font-size: 14px;
    }

    .code-value {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 3px;
      color: #00d4aa;
      font-family: 'Courier New', monospace;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .code-value i {
      font-size: 22px;
    }

    .error-value {
      color: #ff6b6b;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .footer {
      text-align: center;
      margin-top: 25px;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .footer-text {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.4);
    }

    .toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(150px);
      background: #00d4aa;
      color: white;
      padding: 14px 24px;
      border-radius: 50px;
      font-weight: 500;
      box-shadow: 0 10px 40px rgba(0, 212, 170, 0.4);
      transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      z-index: 1000;
      opacity: 0;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
    }

    .toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    .toast.error {
      background: #ff6b6b;
    }

    @media (max-width: 580px) {
      .card {
        padding: 35px 20px;
        border-radius: 25px;
      }

      .title {
        font-size: 26px;
      }

      .logo-container {
        width: 80px;
        height: 80px;
      }

      .logo {
        font-size: 34px;
      }

      .code-value {
        font-size: 22px;
      }

      .server-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="bg-gradient"></div>
  <div class="glow-orb orb-1"></div>
  <div class="glow-orb orb-2"></div>

  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo-container">
          <div class="logo-ring"></div>
          <div class="logo">
            <i class="fas fa-bolt"></i>
          </div>
        </div>
        <h1 class="title">JAWAD-MD</h1>
        <p class="subtitle">Generate Your Pairing Code</p>
      </div>

      <!-- Server Info Section -->
      <div class="server-info" id="serverInfo">
        <div class="server-info-left">
          <i class="fas fa-server"></i>
          <div class="server-details">
            <span class="server-name" id="currentServerName">Select Server</span>
            <div class="server-stats">
              <span class="server-stat" id="activeCount">
                <i class="fas fa-circle" style="color: #00d4aa;"></i>
                Active: --
              </span>
              <span class="server-stat" id="serverLimit">
                <i class="fas fa-users"></i>
                Limit: --/50
              </span>
            </div>
          </div>
        </div>
        <div class="change-server-btn">
          <i class="fas fa-chevron-down"></i>
          Select
        </div>
      </div>

      <!-- Server Selection Section -->
      <div class="server-selection" id="serverSelection">
        <div class="server-selection-title">Select a Server</div>
        <div class="server-grid" id="serverGrid">
          <!-- Server options will be populated here -->
        </div>
      </div>

      <div class="info-box">
        <i class="fas fa-info-circle"></i>
        <div class="info-box-text">
          <strong>Quick Setup</strong>
          <p>Select a server, enter your WhatsApp number to instantly generate a pairing code. No deployment needed!</p>
        </div>
      </div>

      <form id="pairForm">
        <div class="form-group">
          <label class="label">WhatsApp Number</label>
          <div class="input-wrapper">
            <input 
              type="tel" 
              id="phoneNumber" 
              class="input" 
              placeholder="92342758xxxxx"
              pattern="[0-9]+"
              required
            >
            <i class="fas fa-phone input-icon"></i>
          </div>
          <div class="hint">
            <i class="fas fa-lightbulb"></i>
            Include country code (e.g., 92 for Pakistan)
          </div>
        </div>

        <button type="submit" class="btn btn-generate" id="generateBtn" disabled>
          <i class="fas fa-key"></i>
          Generate Pair Code
        </button>

        <div class="loading" id="loading">
          <div class="spinner"></div>
          <p class="loading-text">Generating your pair code...</p>
        </div>

        <div class="code-box" id="codeBox">
          <div class="code-placeholder">Your pairing code will appear here</div>
        </div>

        <button type="button" class="btn btn-copy" id="copyBtn">
          <i class="fas fa-copy"></i>
          Copy Code
        </button>
      </form>

      <div class="footer">
        <p class="footer-text">
          © 2026 JAWAD-MD | Powered By JawadTechX
        </p>
      </div>
    </div>
  </div>

  <div class="toast" id="toast">
    <i class="fas fa-check-circle"></i>
    <span>Code copied successfully</span>
  </div>

  <script>
    // DOM Elements
    const phoneInput = document.getElementById('phoneNumber');
    const generateBtn = document.getElementById('generateBtn');
    const loading = document.getElementById('loading');
    const codeBox = document.getElementById('codeBox');
    const copyBtn = document.getElementById('copyBtn');
    const toast = document.getElementById('toast');
    const form = document.getElementById('pairForm');
    const serverInfo = document.getElementById('serverInfo');
    const serverSelection = document.getElementById('serverSelection');
    const serverGrid = document.getElementById('serverGrid');
    const currentServerName = document.getElementById('currentServerName');
    const activeCount = document.getElementById('activeCount');
    const serverLimit = document.getElementById('serverLimit');

    let currentCode = null;
    let selectedServer = null;
    let selectedServerStatus = null;

    // Initialize the app
    async function initApp() {
      serverInfo.style.display = 'flex';
      serverSelection.style.display = 'none';
      
      await loadServers();
      serverInfo.addEventListener('click', showServerSelection);
    }

    // Load servers from our backend API
    async function loadServers() {
      try {
        const response = await axios.get('/api/servers');
        populateServerGrid(response.data.servers);
      } catch (error) {
        console.error('Error loading servers:', error);
        // Fallback to default servers
        const defaultServers = Array.from({length: 10}, (_, i) => ({
          id: `server${i + 1}`,
          name: `Server ${i + 1}`
        }));
        populateServerGrid(defaultServers);
      }
    }

    // Populate server grid
    function populateServerGrid(servers) {
      serverGrid.innerHTML = '';
      
      servers.forEach(server => {
        const serverOption = document.createElement('div');
        serverOption.className = `server-option ${selectedServer === server.id ? 'selected' : ''}`;
        serverOption.dataset.server = server.id;
        
        serverOption.innerHTML = `
          <div class="server-option-name">
            ${server.name}
          </div>
          <div class="server-option-stats">
            <span>Click to select</span>
          </div>
        `;
        
        serverOption.addEventListener('click', () => selectServer(server.id));
        serverGrid.appendChild(serverOption);
      });
    }

    // Select a server
    async function selectServer(serverId) {
      selectedServer = serverId;
      await updateServerStatus(serverId);
      hideServerSelection();
    }

    // Update server status from our backend API
    async function updateServerStatus(serverId) {
      try {
        const response = await axios.get(`/api/status/${serverId}`);
        selectedServerStatus = {
          count: response.data.count || 0,
          limit: response.data.limit || 50
        };
        
        updateSelectedServerUI(serverId, selectedServerStatus);
      } catch (error) {
        console.error('Error fetching server status:', error);
        selectedServerStatus = {
          count: 0,
          limit: 50
        };
        updateSelectedServerUI(serverId, selectedServerStatus);
      }
    }

    // Update UI with selected server info
    function updateSelectedServerUI(serverId, status) {
      const serverNum = serverId.replace('server', '');
      
      currentServerName.textContent = `Server ${serverNum}`;
      
      if (status) {
        activeCount.innerHTML = `<i class="fas fa-circle" style="color:#00d4aa;"></i> Active: ${status.count}`;
        serverLimit.innerHTML = `<i class="fas fa-users"></i> Limit: ${status.count}/${status.limit}`;
        
        // Always enable generate button
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i class="fas fa-key"></i> Generate Pair Code';
      }
      
      loadServers(); // Update grid to show selected server
    }

    // Show server selection
    function showServerSelection() {
      serverInfo.style.display = 'none';
      serverSelection.style.display = 'block';
      serverSelection.classList.add('show');
      generateBtn.disabled = true;
    }

    // Hide server selection
    function hideServerSelection() {
      serverInfo.style.display = 'flex';
      serverSelection.style.display = 'none';
      serverSelection.classList.remove('show');
    }

    // Toast notification
    function showToast(message, isError = false) {
      const toastIcon = toast.querySelector('i');
      const toastText = toast.querySelector('span');
      
      toastIcon.className = isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
      toastText.textContent = message;
      toast.className = `toast ${isError ? 'error' : ''} show`;
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    // Phone validation
    function validatePhone(number) {
      const cleaned = number.replace(/[^\d]/g, '');
      return cleaned.length >= 10 && cleaned.length <= 15;
    }

    // Show error in code box
    function showError(message) {
      codeBox.className = 'code-box has-error';
      codeBox.innerHTML = `
        <div class="error-value">
          <i class="fas fa-exclamation-circle"></i>
          <span>${message}</span>
        </div>
      `;
      copyBtn.style.display = 'none';
    }

    // Show generated code
    function showCode(code) {
      currentCode = code;
      codeBox.className = 'code-box has-code';
      codeBox.innerHTML = `
        <div class="code-value">
          <i class="fas fa-check-circle"></i>
          <span>${code}</span>
        </div>
      `;
      copyBtn.style.display = 'flex';
    }

    // Reset code box
    function resetCodeBox() {
      codeBox.className = 'code-box';
      codeBox.innerHTML = '<div class="code-placeholder">Your pairing code will appear here</div>';
      copyBtn.style.display = 'none';
      currentCode = null;
    }

    // Generate pair code using our backend API
    async function generatePairCode(e) {
      e.preventDefault();
      
      if (!selectedServer) {
        showError('Please select a server first');
        showToast('Click on "Select Server" to choose a server', true);
        showServerSelection();
        return;
      }
      
      const phoneNumber = phoneInput.value.trim();
      
      if (!phoneNumber) {
        showError('Please enter your WhatsApp number');
        showToast('Phone number is required', true);
        return;
      }
      
      if (!validatePhone(phoneNumber)) {
        showError('Please enter a valid phone number');
        showToast('Invalid phone number format', true);
        return;
      }
      
      generateBtn.style.display = 'none';
      loading.style.display = 'block';
      resetCodeBox();
      
      try {
        const response = await axios.get('/api/code', {
          params: {
            server: selectedServer,
            number: phoneNumber.replace(/[^\d]/g, '')
          }
        });
        
        if (response.data.code) {
          showCode(response.data.code);
          showToast('Pair code generated successfully!');
          
          // Update server status
          await updateServerStatus(selectedServer);
        } else {
          throw new Error(response.data.error || 'Failed to generate code');
        }
        
      } catch (error) {
        console.error('Error:', error);
        showError(error.response?.data?.error || 'Failed to generate code. Please try again.');
        showToast('Error generating code', true);
      } finally {
        generateBtn.style.display = 'flex';
        loading.style.display = 'none';
      }
    }

    // Copy code to clipboard
    async function copyCode() {
      if (!currentCode) return;
      
      try {
        await navigator.clipboard.writeText(currentCode);
        
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.disabled = true;
        copyBtn.style.opacity = '0.7';
        
        showToast('Code copied to clipboard!');
        
        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
          copyBtn.disabled = false;
          copyBtn.style.opacity = '1';
        }, 2000);
        
      } catch (error) {
        console.error('Copy failed:', error);
        showToast('Failed to copy code', true);
      }
    }

    // Event Listeners
    form.addEventListener('submit', generatePairCode);
    copyBtn.addEventListener('click', copyCode);

    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^\d]/g, '');
    });

    phoneInput.addEventListener('focus', () => {
      if (codeBox.classList.contains('has-error')) {
        resetCodeBox();
      }
    });

    // Initialize the application
    document.addEventListener('DOMContentLoaded', initApp);
  </script>
</body>
</html>


mini.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Server URLs for JAWAD-MD
const serverUrls = {
    'server1': 'https://jawadtaklaofca1-676bd10b9578.herokuapp.com',
    'server2': 'https://jawadtaklaofca10-b517ad7e1708.herokuapp.com',
    'server3': 'https://jawadtaklaofca2-c40de34fc805.herokuapp.com',
    'server4': 'https://jawadtaklaofca3-00d65c972a1e.herokuapp.com',
    'server5': 'https://jawadtaklaofca4-ad8a0ca5e1be.herokuapp.com',
    'server6': 'https://jawadtaklaofca5-ba2adac81d11.herokuapp.com',
    'server7': 'https://jawadtaklaofca6-70ee2dc897dd.herokuapp.com',
    'server8': 'https://jawadtaklaofca7-5b0110dc75dd.herokuapp.com',
    'server9': 'https://jawadtaklaofca8-f764ab5568cc.herokuapp.com',
    'server10': 'https://jawadtaklaofca9-15d694fb0ac3.herokuapp.com',
    'server11': 'https://jawadtaklaofcb1-4126412342ec.herokuapp.com',
    'server12': 'https://jawadtaklaofcb10-8af69e23609f.herokuapp.com',
    'server13': 'https://jawadtaklaofcb2-df28cecbe30d.herokuapp.com',
    'server14': 'https://jawadtaklaofcb3-a09e072f5284.herokuapp.com',
    'server15': 'https://jawadtaklaofcb4-ffa057949a9b.herokuapp.com',
    'server16': 'https://jawadtaklaofcb5-fe1d50b2c060.herokuapp.com',
    'server17': 'https://jawadtaklaofcb6-a7d550120aca.herokuapp.com',
    'server18': 'https://jawadtaklaofcb7-5a1a3214c218.herokuapp.com',
    'server19': 'https://jawadtaklaofcb8-c1da07b047f5.herokuapp.com',
    'server20': 'https://jawadtaklaofcb9-65d849c59602.herokuapp.com',
    'server21': 'https://jawadtaklaofcc1-25bb0124f110.herokuapp.com',
    'server22': 'https://jawadtaklaofcc10-2dc7000ca4ad.herokuapp.com',
    'server23': 'https://jawadtaklaofcc2-6347f0067d53.herokuapp.com',
    'server24': 'https://jawadtaklaofcc3-b298b074b59b.herokuapp.com',
    'server25': 'https://jawadtaklaofcc4-396d9636077d.herokuapp.com',
    'server26': 'https://jawadtaklaofcc5-5d2b7dfe4ed7.herokuapp.com',
    'server27': 'https://jawadtaklaofcc6-635747c913a6.herokuapp.com',
    'server28': 'https://jawadtaklaofcc7-3d28af72b294.herokuapp.com',
    'server29': 'https://jawadtaklaofcc8-269f362e2e73.herokuapp.com',
    'server30': 'https://jawadtaklaofcc9-709e0773b03a.herokuapp.com',
    'server31': 'https://jawadtaklaofcd1-3ec657001023.herokuapp.com',
    'server32': 'https://jawadtaklaofcd10-784346697a7a.herokuapp.com',
    'server33': 'https://jawadtaklaofcd2-37380cba7c5c.herokuapp.com',
    'server34': 'https://jawadtaklaofcd3-35dc9b202d61.herokuapp.com',
    'server35': 'https://jawadtaklaofcd4-e86b23d0fdc1.herokuapp.com',
    'server36': 'https://jawadtaklaofcd5-cb5e312fd05d.herokuapp.com',
    'server37': 'https://jawadtaklaofcd6-c127f05224ed.herokuapp.com',
    'server38': 'https://jawadtaklaofcd7-3699ecd0c540.herokuapp.com',
    'server39': 'https://jawadtaklaofcd8-bb61681597dc.herokuapp.com',
    'server40': 'https://jawadtaklaofcd9-f9b98d9a3000.herokuapp.com',
    'server41': 'https://jawadtaklaofce1-755f9a30b571.herokuapp.com',
    'server42': 'https://jawadtaklaofce10-837a2b42631c.herokuapp.com',
    'server43': 'https://jawadtaklaofce2-e2501448cf00.herokuapp.com',
    'server44': 'https://jawadtaklaofce3-37104e61acf5.herokuapp.com',
    'server45': 'https://jawadtaklaofce4-8cd23d19e4fe.herokuapp.com',
    'server46': 'https://jawadtaklaofce5-c9de9c024c4d.herokuapp.com',
    'server47': 'https://jawadtaklaofce6-7aed9124a7b5.herokuapp.com',
    'server48': 'https://jawadtaklaofce7-d0e938d564a8.herokuapp.com',
    'server49': 'https://jawadtaklaofce8-eeb6183f1c4a.herokuapp.com',
    'server50': 'https://jawadtaklaofce9-d88aaacf553d.herokuapp.com',
    'server51': 'https://jawadtaklaofcf1-f11e502200b2.herokuapp.com',
    'server52': 'https://jawadtaklaofcf10-092ba87ca85d.herokuapp.com',
    'server53': 'https://jawadtaklaofcf2-769645eb6a2e.herokuapp.com',
    'server54': 'https://jawadtaklaofcf3-ec9fd281174c.herokuapp.com',
    'server55': 'https://jawadtaklaofcf4-03bc4ddd87ce.herokuapp.com',
    'server56': 'https://jawadtaklaofcf5-e985afc85ab5.herokuapp.com',
    'server57': 'https://jawadtaklaofcf6-52c86539a5d1.herokuapp.com',
    'server58': 'https://jawadtaklaofcf7-65340798bd87.herokuapp.com',
    'server59': 'https://jawadtaklaofcf8-50eab1198128.herokuapp.com',
    'server60': 'https://jawadtaklaofcf9-9345f463a6fc.herokuapp.com',
    'server61': 'https://jawadtaklaofcg1-2f8b4593c9a7.herokuapp.com',
    'server62': 'https://jawadtaklaofcg2-121fcd376e35.herokuapp.com',
    'server63': 'https://jawadtaklaofcg3-611a6d37ee04.herokuapp.com',
    'server64': 'https://jawadtaklaofci1-551a44da74b8.herokuapp.com',
    'server65': 'https://jawadtaklaofci2-b9f874a049a6.herokuapp.com',
    'server66': 'https://jawadtaklaofci3-443a2b9bd98e.herokuapp.com',
    'server67': 'https://jawadtaklaofci4-9955f9e03078.herokuapp.com',
    'server68': 'https://jawadtaklaofci5-e47047cd1080.herokuapp.com',
    'server69': 'https://jawadtaklaofci6-57987f14498c.herokuapp.com',
    'server70': 'https://jawadtaklaofci7-0ff1682c7051.herokuapp.com',
    'server71': 'https://jawadtaklaofck1-e7b633887074.herokuapp.com',
    'server72': 'https://jawadtaklaofck10-5e06105bbe2b.herokuapp.com',
    'server73': 'https://jawadtaklaofck2-ace39839fda2.herokuapp.com',
    'server74': 'https://jawadtaklaofck3-54f129b8edca.herokuapp.com',
    'server75': 'https://jawadtaklaofck4-48a64b9e78f1.herokuapp.com',
    'server76': 'https://jawadtaklaofck5-0310df3cb041.herokuapp.com',
    'server77': 'https://jawadtaklaofck6-4f118ac7dcb2.herokuapp.com',
    'server78': 'https://jawadtaklaofck7-859a74b020a8.herokuapp.com',
    'server79': 'https://jawadtaklaofck8-6f244b60abef.herokuapp.com',
    'server80': 'https://jawadtaklaofck9-734a2494047d.herokuapp.com',
    'server81': 'https://jawadtaklofxp1-6c97468e94d9.herokuapp.com',
    'server82': 'https://jawadtaklofxp10-5433d9b4546a.herokuapp.com',
    'server83': 'https://jawadtaklofxp2-460ecfee769f.herokuapp.com',
    'server84': 'https://jawadtaklofxp3-47572aeea1f3.herokuapp.com',
    'server85': 'https://jawadtaklofxp4-13f315145ee8.herokuapp.com',
    'server86': 'https://jawadtaklofxp5-b1810094edb6.herokuapp.com',
    'server87': 'https://jawadtaklofxp6-8ae3571b087c.herokuapp.com',
    'server88': 'https://jawadtaklofxp7-2451c7d3cd1f.herokuapp.com',
    'server89': 'https://jawadtaklofxp8-e4530bacb46b.herokuapp.com',
    'server90': 'https://jawadtaklofxp9-8513f1ae9076.herokuapp.com',
    'server91': 'https://jawadtaklofxpz1-c132ca061786.herokuapp.com',
    'server92': 'https://jawadtaklofxpz10-0f1aee2f1f69.herokuapp.com',
    'server93': 'https://jawadtaklofxpz2-0ae94d353c3e.herokuapp.com',
    'server94': 'https://jawadtaklofxpz3-900fb31b7a0d.herokuapp.com',
    'server95': 'https://jawadtaklofxpz4-aba59cc79176.herokuapp.com',
    'server96': 'https://jawadtaklofxpz5-d742a10f5570.herokuapp.com',
    'server97': 'https://jawadtaklofxpz6-888f64122ee7.herokuapp.com',
    'server98': 'https://jawadtaklofxpz7-a08ef089e2ba.herokuapp.com',
    'server99': 'https://jawadtaklofxpz8-8239eb082d22.herokuapp.com',
    'server100': 'https://jawadtaklofxpz9-bf180fbb2723.herokuapp.com'
};

// Get server list
router.get('/servers', (req, res) => {
    const servers = Object.keys(serverUrls).map(key => ({
        id: key,
        name: `Server ${key.replace('server', '')}`,
        url: serverUrls[key]
    }));
    res.json({ servers });
});

// Get server status
router.get('/status/:serverId', async (req, res) => {
    try {
        const { serverId } = req.params;
        const serverUrl = serverUrls[serverId];
        
        if (!serverUrl) {
            return res.json({ error: 'Server not found' });
        }
        
        const response = await axios.get(`${serverUrl}/active`, {
            timeout: 5000
        });
        
        res.json({
            count: response.data.count || 0,
            limit: response.data.limit || 50
        });
    } catch (error) {
        res.json({
            count: 0,
            limit: 50,
            error: 'Failed to fetch status'
        });
    }
});

// Generate pair code
router.get('/code', async (req, res) => {
    try {
        const { server, number } = req.query;
        
        if (!server || !number) {
            return res.json({ error: 'Server and number are required' });
        }
        
        const serverUrl = serverUrls[server];
        if (!serverUrl) {
            return res.json({ error: 'Server not found' });
        }
        
        const phoneNumber = number.replace(/[^\d]/g, '');
        if (phoneNumber.length < 10 || phoneNumber.length > 15) {
            return res.json({ error: 'Invalid phone number format' });
        }
        
        const response = await axios.get(`${serverUrl}/code?number=${phoneNumber}`, {
            timeout: 15000
        });
        
        // Return ONLY the code
        if (response.data && response.data.code) {
            res.json({ code: response.data.code });
        } else {
            res.json({ error: 'No code received' });
        }
    } catch (error) {
        res.json({ error: 'Failed to generate code' });
    }
});

// Random server endpoint for bot pair command
router.get('/random', (req, res) => {
    const servers = Object.keys(serverUrls);
    const randomServer = servers[Math.floor(Math.random() * servers.length)];
    res.json({ 
        server: randomServer,
        url: serverUrls[randomServer] 
    });
});

module.exports = router;

