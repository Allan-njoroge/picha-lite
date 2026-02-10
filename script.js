// --- Configuration ---
const QUALITY = 0.8; // 80% Quality
const MAX_WIDTH = 1080; // Reasonable max width for ID verification

// --- Elements ---
const fileInput = document.getElementById("file-input");
const resultsDiv = document.getElementById("results");
const imgOriginal = document.getElementById("img-original");
const imgOptimized = document.getElementById("img-optimized");
const sizeOriginal = document.getElementById("size-original");
const sizeOptimized = document.getElementById("size-optimized");
const typeOriginal = document.getElementById("type-original");
const savingsPercent = document.getElementById("savings-percent");
const savingsDetail = document.getElementById("savings-detail");

// --- Event Listener ---
fileInput.addEventListener("change", handleFileSelect);

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;

  // 1. Display Original Stats
  displayFileSize(file.size, sizeOriginal);
  typeOriginal.textContent = file.type;

  // Create URL for preview
  const objectUrl = URL.createObjectURL(file);
  imgOriginal.src = objectUrl;

  // 2. Start Compression Process
  processImage(file);
}

function processImage(file) {
  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    // Calculation: Resize logic
    let width = img.width;
    let height = img.height;

    if (width > MAX_WIDTH) {
      height = Math.round((height * MAX_WIDTH) / width);
      width = MAX_WIDTH;
    }

    // Draw to Canvas
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    // Convert to WebP Blob
    canvas.toBlob(
      (blob) => {
        // Update Optimized Image
        const optimizedUrl = URL.createObjectURL(blob);
        imgOptimized.src = optimizedUrl;

        // Update Stats
        displayFileSize(blob.size, sizeOptimized);

        // Calculate Savings
        calculateSavings(file.size, blob.size);
      },
      "image/webp",
      QUALITY,
    );
  };
}

// Helper: Format Bytes to KB/MB
function displayFileSize(bytes, element) {
  if (bytes === 0) {
    element.textContent = "0 Bytes";
    return;
  }
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  element.textContent =
    parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Helper: Calculate Percentage
function calculateSavings(originalBytes, newBytes) {
  const savedBytes = originalBytes - newBytes;
  const percentage = ((savedBytes / originalBytes) * 100).toFixed(1);

  savingsPercent.textContent = `${percentage}% SAVED`;

  // Format detailed text
  const savedMB = (savedBytes / (1024 * 1024)).toFixed(2);
  savingsDetail.textContent = `Reduced payload by ${savedMB} MB per upload`;

  // Show results
  resultsDiv.style.display = "grid";
}
