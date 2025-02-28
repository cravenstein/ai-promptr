// Set form values temporarily and generate prompt
function setFormValues(variationValues) {
  // This function would set form values based on the passed object
  // Implementation depends on form structure
  Object.keys(variationValues).forEach(key => {
    const element = document.getElementById(key);
    if (element) {
      element.value = variationValues[key];
    }
  });
}

// Get current form values
function getFormValues() {
  // This function would get all relevant form values
  // Implementation depends on form structure
  const formValues = {};
  
  // Get values from all select elements
  document.querySelectorAll('select').forEach(select => {
    formValues[select.id] = select.value;
  });
  
  // Get values from text inputs and textareas
  formValues.basePrompt = document.getElementById('basePrompt').value;
  formValues.extraDetails = document.getElementById('extraDetails').value;
  formValues.advancedNotes = document.getElementById('advancedNotes').value;
  formValues.quality = document.getElementById('qualitySlider').value;
  
  return formValues;
}

// Generate prompt based on form values
function generatePrompt() {
  // Get form values
  const formValues = getFormValues();
  
  // Base prompt
  let baseText = formValues.basePrompt.trim();
  if (!baseText) {
    alert('Please enter a base prompt!');
    return;
  }
  
  // Build the prompt parts
  let promptParts = [baseText];
  
  // Add technical specifications
  let techSpecs = [];
  
  // Shot type
  if (formValues.shotType !== 'None') {
    techSpecs.push(formValues.shotType);
  }
  
  // Camera movement
  if (formValues.cameraMovement !== 'None') {
    techSpecs.push(formValues.cameraMovement);
  }
  
  // Time of day
  if (formValues.timeOfDay !== 'None') {
    techSpecs.push(formValues.timeOfDay);
  }
  
  // Lighting
  if (formValues.lighting !== 'None') {
    techSpecs.push(formValues.lighting + ' lighting');
  }
  
  // Add camera and lens info
  let cameraInfo = [];
  
  // Camera
  if (formValues.camera !== 'None') {
    cameraInfo.push('shot on ' + formValues.camera);
  }
  
  // Resolution
  if (formValues.resolution !== 'None') {
    cameraInfo.push(formValues.resolution);
  }
  
  // FPS
  if (formValues.fps !== 'None') {
    cameraInfo.push(formValues.fps);
  }
  
  // Aspect ratio
  if (formValues.aspectRatio !== 'None') {
    cameraInfo.push(formValues.aspectRatio + ' aspect ratio');
  }
  
  // Film stock
  if (formValues.filmStock !== 'None') {
    cameraInfo.push(formValues.filmStock);
  }
  
  // Lens info
  let lensInfo = [];
  
  // Lens brand
  if (formValues.lensBrand !== 'None') {
    lensInfo.push(formValues.lensBrand);
  }
  
  // Lens type
  if (formValues.lensType !== 'None') {
    lensInfo.push(formValues.lensType);
  }
  
  // Focal length
  if (formValues.focalLength !== 'None') {
    lensInfo.push(formValues.focalLength);
  }
  
  // Aperture
  if (formValues.aperture !== 'None') {
    lensInfo.push(formValues.aperture);
  }
  
  // Filter
  if (formValues.filter !== 'None') {
    lensInfo.push(formValues.filter + ' filter');
  }
  
  // Combine lens info
  if (lensInfo.length > 0) {
    cameraInfo.push(lensInfo.join(' ') + ' lens');
  }
  
  // Additional specifications
  let additionalSpecs = [];
  
  // Style
  if (formValues.style !== 'None') {
    additionalSpecs.push(formValues.style + ' style');
  }
  
  // Color grade
  if (formValues.colorGrade !== 'None') {
    additionalSpecs.push(formValues.colorGrade + ' color grade');
  }
  
  // Quality descriptor based on slider
  const qualityDescriptors = [
    'low quality', 'average quality', 'good quality', 
    'high quality', 'excellent quality', 'masterpiece'
  ];
  additionalSpecs.push(qualityDescriptors[formValues.quality]);
  
  // Extra details
  if (formValues.extraDetails.trim()) {
    promptParts.push(formValues.extraDetails.trim());
  }
  
  // Combine all specifications
  if (techSpecs.length > 0) {
    promptParts.push(techSpecs.join(', '));
  }
  
  if (cameraInfo.length > 0) {
    promptParts.push(cameraInfo.join(', '));
  }
  
  if (additionalSpecs.length > 0) {
    promptParts.push(additionalSpecs.join(', '));
  }
  
  // Advanced notes
  if (formValues.advancedNotes.trim()) {
    promptParts.push(formValues.advancedNotes.trim());
  }
  
  // Build the final prompt
  const finalPrompt = promptParts.join('. ');
  
  // Display the result
  document.getElementById('outputPrompt').textContent = finalPrompt;
  document.getElementById('promptLength').textContent = finalPrompt.length + ' characters';
  document.getElementById('outputContainer').style.display = 'block';
  
  return finalPrompt;
}

// Generate batch prompts with variations
function generateBatchPrompts() {
  const baseValues = getFormValues();
  const numVariations = document.getElementById('variationsSlider').value;
  const batchOutputContainer = document.getElementById('batchOutput');
  
  batchOutputContainer.innerHTML = '';
  
  // Options for random variations
  const variationOptions = {
    shotType: ['close-up shot', 'medium shot', 'wide shot', 'extreme close-up', 'overhead shot', 'low angle shot'],
    cameraMovement: ['static shot', 'panning shot', 'tracking shot', 'dolly shot', 'steadicam shot'],
    timeOfDay: ['dawn', 'golden hour', 'night', 'midday', 'dusk'],
    lighting: ['natural', 'dramatic', 'cinematic', 'soft', 'hard', 'low-key'],
    camera: ['ARRI Alexa', 'RED Epic', 'Canon EOS R5', 'Sony A7S III', '35mm film camera'],
    resolution: ['4K', '8K', '6K'],
    fps: ['24fps', '60fps', 'slow motion'],
    aspectRatio: ['16:9', '2.35:1', '1.85:1'],
    filmStock: ['Kodak Portra 400', 'Fujifilm Superia', 'Kodak Tri-X'],
    lensBrand: ['Canon', 'Zeiss', 'Cooke', 'Leica'],
    lensType: ['prime', 'wide-angle', 'anamorphic', 'telephoto'],
    focalLength: ['24mm', '35mm', '50mm', '85mm'],
    aperture: ['f/1.4', 'f/2.8', 'f/4'],
    filter: ['polarizing', 'ND', 'pro-mist'],
    style: ['cinematic', 'photorealistic', 'vintage', 'hyperrealism'],
    colorGrade: ['warm', 'teal and orange', 'high contrast', 'vibrant']
  };
  
  // Generate variations
  for (let i = 0; i < numVariations; i++) {
    // Create a variation of the base values
    const variationValues = {...baseValues};
    
    // Randomly change 2-3 parameters
    const numChanges = Math.floor(Math.random() * 2) + 2; // 2-3 changes
    const parameters = Object.keys(variationOptions);
    const selectedParams = [];
    
    // Select random parameters to change
    while (selectedParams.length < numChanges) {
      const randomParam = parameters[Math.floor(Math.random() * parameters.length)];
      if (!selectedParams.includes(randomParam)) {
        selectedParams.push(randomParam);
      }
    }
    
    // Apply the changes
    selectedParams.forEach(param => {
      const options = variationOptions[param];
      variationValues[param] = options[Math.floor(Math.random() * options.length)];
    });
    
    // Set form values temporarily and generate prompt
    setFormValues(variationValues);
    const promptText = generatePrompt();

    // Create batch prompt element
    const batchPrompt = document.createElement('div');
    batchPrompt.className = 'batch-prompt';
    batchPrompt.innerHTML = `
      <div class="batch-prompt-title">Variation ${i + 1}</div>
      <div class="batch-prompt-content">${promptText}</div>
      <button class="primary copy-batch-btn">Copy</button>
      <button class="secondary save-batch-btn">Save to History</button>
    `;

    // Add event listeners to buttons
    batchPrompt.querySelector('.copy-batch-btn').addEventListener('click', () => {
      navigator.clipboard.writeText(promptText);
    });

    batchPrompt.querySelector('.save-batch-btn').addEventListener('click', () => {
      saveToHistory(promptText);
    });

    batchOutputContainer.appendChild(batchPrompt);
  }

  // Reset form to original values and show batch output
  setFormValues(baseValues);
  batchOutputContainer.style.display = 'block';
}

// Save current settings as preset
function savePreset() {
  const presetNameInput = document.getElementById('presetNameInput');
  const savedPresets = document.getElementById('savedPresets');
  
  const presetName = presetNameInput.value.trim();
  if (!presetName) {
    alert('Please enter a name for your preset!');
    return;
  }
  
  const presetValues = getFormValues();
  presetValues.name = presetName;
  
  const presets = JSON.parse(localStorage.getItem('cinePromptPresets')) || [];
  presets.push(presetValues);
  localStorage.setItem('cinePromptPresets', JSON.stringify(presets));
  
  loadPresets();
  presetNameInput.value = '';
}

// Load saved presets
function loadPresets() {
  const savedPresets = document.getElementById('savedPresets');
  const presets = JSON.parse(localStorage.getItem('cinePromptPresets')) || [];
  savedPresets.innerHTML = '';
  
  if (presets.length === 0) {
    savedPresets.innerHTML = '<p>No presets saved yet.</p>';
    return;
  }
  
  presets.forEach((preset, index) => {
    const presetCard = document.createElement('div');
    presetCard.className = 'preset-card';
    
    // Create preset details summary
    let details = [];
    if (preset.shotType !== 'None') details.push(preset.shotType);
    if (preset.camera !== 'None') details.push(preset.camera);
    if (preset.style !== 'None') details.push(preset.style);
    
    const detailsText = details.length > 0 
      ? details.join(', ')
      : 'Basic settings';
    
    presetCard.innerHTML = `
      <div class="preset-title">${preset.name}</div>
      <div class="preset-description">${detailsText}</div>
      <div class="preset-actions">
        <button class="primary preset-btn load-preset-btn">Load</button>
        <button class="danger preset-btn delete-preset-btn">Delete</button>
      </div>
    `;
    
    // Add event listeners to buttons
    presetCard.querySelector('.load-preset-btn').addEventListener('click', () => {
      setFormValues(preset);
      switchTab('generator');
    });
    
    presetCard.querySelector('.delete-preset-btn').addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete the preset "${preset.name}"?`)) {
        presets.splice(index, 1);
        localStorage.setItem('cinePromptPresets', JSON.stringify(presets));
        loadPresets();
      }
    });
    
    savedPresets.appendChild(presetCard);
  });
}

// Save prompt to history
function saveToHistory(promptText) {
  const historyItem = {
    prompt: promptText,
    timestamp: new Date().toISOString()
  };
  
  const history = JSON.parse(localStorage.getItem('cinePromptHistory')) || [];
  history.unshift(historyItem); // Add to beginning
  
  // Limit history to 20 items
  if (history.length > 20) {
    history.pop();
  }
  
  localStorage.setItem('cinePromptHistory', JSON.stringify(history));
  loadHistory();
}

// Load prompt history
function loadHistory() {
  const historyItems = document.getElementById('historyItems');
  const history = JSON.parse(localStorage.getItem('cinePromptHistory')) || [];
  historyItems.innerHTML = '';
  
  if (history.length === 0) {
    historyItems.innerHTML = '<p>No history yet.</p>';
    return;
  }
  
  history.forEach((item, index) => {
    const historyCard = document.createElement('div');
    historyCard.className = 'history-item';
    
    const date = new Date(item.timestamp);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    
    historyCard.innerHTML = `
      <div class="preset-title">${formattedDate}</div>
      <div class="preset-description">${item.prompt.substring(0, 100)}${item.prompt.length > 100 ? '...' : ''}</div>
      <div class="preset-actions">
        <button class="primary preset-btn copy-history-btn">Copy</button>
        <button class="secondary preset-btn load-history-btn">Load</button>
        <button class="danger preset-btn delete-history-btn">Delete</button>
      </div>
    `;
    
    // Add event listeners to buttons
    historyCard.querySelector('.copy-history-btn').addEventListener('click', () => {
      navigator.clipboard.writeText(item.prompt);
    });
    
    historyCard.querySelector('.load-history-btn').addEventListener('click', () => {
      const outputPrompt = document.getElementById('outputPrompt');
      const promptLength = document.getElementById('promptLength');
      const outputContainer = document.getElementById('outputContainer');
      
      outputPrompt.textContent = item.prompt;
      promptLength.textContent = item.prompt.length + ' characters';
      outputContainer.style.display = 'block';
      switchTab('generator');
    });
    
    historyCard.querySelector('.delete-history-btn').addEventListener('click', () => {
      history.splice(index, 1);
      localStorage.setItem('cinePromptHistory', JSON.stringify(history));
      loadHistory();
    });
    
    historyItems.appendChild(historyCard);
  });
}

// I'm Feeling Lucky - randomize settings
function randomizeSettings() {
  const options = {
    shotType: ['close-up shot', 'medium shot', 'wide shot', 'extreme close-up', 'overhead shot', 'low angle shot'],
    cameraMovement: ['static shot', 'panning shot', 'tracking shot', 'dolly shot', 'steadicam shot'],
    timeOfDay: ['dawn', 'golden hour', 'night', 'midday', 'dusk'],
    lighting: ['natural', 'dramatic', 'cinematic', 'soft', 'hard', 'low-key'],
    camera: ['ARRI Alexa', 'RED Epic', 'Canon EOS R5', 'Sony A7S III', '35mm film camera'],
    resolution: ['4K', '8K', '6K'],
    fps: ['24fps', '60fps', 'slow motion'],
    aspectRatio: ['16:9', '2.35:1', '1.85:1'],
    filmStock: ['Kodak Portra 400', 'Fujifilm Superia', 'Kodak Tri-X'],
    lensBrand: ['Canon', 'Zeiss', 'Cooke', 'Leica'],
    lensType: ['prime', 'wide-angle', 'anamorphic', 'telephoto'],
    focalLength: ['24mm', '35mm', '50mm', '85mm'],
    aperture: ['f/1.4', 'f/2.8', 'f/4'],
    filter: ['polarizing', 'ND', 'pro-mist'],
    style: ['cinematic', 'photorealistic', 'vintage', 'hyperrealism'],
    colorGrade: ['warm', 'teal and orange', 'high contrast', 'vibrant']
  };
  
  // Randomize each field
  Object.keys(options).forEach(field => {
    const element = document.getElementById(field);
    if (element) {
      const randomOption = options[field][Math.floor(Math.random() * options[field].length)];
      element.value = randomOption;
    }
  });
  
  // Randomize quality
  const qualitySlider = document.getElementById('qualitySlider');
  const qualityValue = document.getElementById('qualityValue');
  qualitySlider.value = Math.floor(Math.random() * 6);
  qualityValue.textContent = qualitySlider.value;
}

// Switch between tabs
function switchTab(tabId) {
  // Deactivate all tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Hide all tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Activate selected tab
  document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
  document.getElementById(`${tabId}Tab`).classList.add('active');
}

// Initialize application
function initApp() {
  // Initialize local storage if needed
  if (!localStorage.getItem('cinePromptPresets')) {
    localStorage.setItem('cinePromptPresets', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('cinePromptHistory')) {
    localStorage.setItem('cinePromptHistory', JSON.stringify([]));
  }
  
  // Load presets and history
  loadPresets();
  loadHistory();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app
  initApp();
  
  // Reference DOM elements
  const outputContainer = document.getElementById('outputContainer');
  const outputPrompt = document.getElementById('outputPrompt');
  const promptLength = document.getElementById('promptLength');
  const qualityValue = document.getElementById('qualityValue');
  const variationsValue = document.getElementById('variationsValue');
  
  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.getAttribute('data-tab'));
    });
  });
  
  // Generate prompt button
  document.getElementById('generateBtn').addEventListener('click', generatePrompt);
  
  // I'm Feeling Lucky button
  document.getElementById('getLuckyBtn').addEventListener('click', () => {
    randomizeSettings();
    generatePrompt();
  });
  
  // Clear form button
  document.getElementById('clearBtn').addEventListener('click', () => {
    document.querySelectorAll('select').forEach(select => {
      select.value = 'None';
    });
    document.getElementById('basePrompt').value = '';
    document.getElementById('extraDetails').value = '';
    document.getElementById('advancedNotes').value = '';
    document.getElementById('qualitySlider').value = 3;
    qualityValue.textContent = '3';
    outputContainer.style.display = 'none';
  });
  
  // Copy to clipboard button
  document.getElementById('copyBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(outputPrompt.textContent);
  });
  
  // Save to history button
  document.getElementById('saveHistoryBtn').addEventListener('click', () => {
    saveToHistory(outputPrompt.textContent);
  });
  
  // Batch generate button
  document.getElementById('batchGenerateBtn').addEventListener('click', generateBatchPrompts);
  
  // Save preset button
  document.getElementById('savePresetBtn').addEventListener('click', savePreset);
  
  // Quality slider
  document.getElementById('qualitySlider').addEventListener('input', function() {
    qualityValue.textContent = this.value;
  });
  
  // Variations slider
  document.getElementById('variationsSlider').addEventListener('input', function() {
    variationsValue.textContent = this.value;
  });
});
