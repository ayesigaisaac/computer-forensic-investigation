const storageKey = "forensics_tasks_progress_v1";
const task1Key = "forensics_task1_detail_v1";
const tasks = Array.from(document.querySelectorAll(".task"));
const progressEl = document.getElementById("progress");
const task1Checks = Array.from(document.querySelectorAll(".t1-check"));
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const resetBtn = document.getElementById("resetBtn");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const expandAllBtn = document.getElementById("expandAllBtn");
const collapseAllBtn = document.getElementById("collapseAllBtn");
const detailBlocks = Array.from(document.querySelectorAll("details.detail"));

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "{}");
  } catch {
    return {};
  }
}

function saveState(state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function updateProgress() {
  const doneCount = tasks.filter((task) => task.querySelector(".done").checked).length;
  progressEl.textContent = `${doneCount} / ${tasks.length} completed`;
  const percent = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;
  if (progressBar) {
    progressBar.style.width = `${percent}%`;
  }
  if (progressText) {
    progressText.textContent = `${percent}%`;
  }
}

function applyFilters() {
  const searchValue = (searchInput.value || "").trim().toLowerCase();
  const statusValue = statusFilter.value;
  tasks.forEach((task) => {
    const text = task.textContent.toLowerCase();
    const done = task.querySelector(".done").checked;
    const matchSearch = !searchValue || text.includes(searchValue);
    const matchStatus =
      statusValue === "all" ||
      (statusValue === "done" && done) ||
      (statusValue === "open" && !done);
    task.style.display = matchSearch && matchStatus ? "" : "none";
  });
}

const state = loadState();

tasks.forEach((task) => {
  const id = task.dataset.id;
  const checkbox = task.querySelector(".done");
  checkbox.checked = Boolean(state[id]);
  checkbox.addEventListener("change", () => {
    state[id] = checkbox.checked;
    saveState(state);
    updateProgress();
    applyFilters();
  });
});

updateProgress();

function loadTask1State() {
  try {
    return JSON.parse(localStorage.getItem(task1Key) || "{}");
  } catch {
    return {};
  }
}

function saveTask1State(stateObj) {
  localStorage.setItem(task1Key, JSON.stringify(stateObj));
}

const task1State = loadTask1State();
task1Checks.forEach((box) => {
  const id = box.dataset.id;
  box.checked = Boolean(task1State[id]);
  box.addEventListener("change", () => {
    task1State[id] = box.checked;
    saveTask1State(task1State);
  });
});

searchInput.addEventListener("input", applyFilters);
statusFilter.addEventListener("change", applyFilters);
resetBtn.addEventListener("click", () => {
  const clearedMain = {};
  tasks.forEach((task) => {
    task.querySelector(".done").checked = false;
    clearedMain[task.dataset.id] = false;
  });
  saveState(clearedMain);

  const clearedTask1 = {};
  task1Checks.forEach((box) => {
    box.checked = false;
    clearedTask1[box.dataset.id] = false;
  });
  saveTask1State(clearedTask1);

  updateProgress();
  applyFilters();
});

applyFilters();

if (expandAllBtn) {
  expandAllBtn.addEventListener("click", () => {
    detailBlocks.forEach((detail) => {
      detail.open = true;
    });
  });
}

if (collapseAllBtn) {
  collapseAllBtn.addEventListener("click", () => {
    detailBlocks.forEach((detail) => {
      detail.open = false;
    });
  });
}

const evidenceImages = Array.from(document.querySelectorAll(".evidence-image"));
const imageModal = document.getElementById("imageModal");
const imageModalPreview = document.getElementById("imageModalPreview");
const imageModalClose = document.getElementById("imageModalClose");

function closeImageModal() {
  imageModal.classList.remove("open");
  imageModal.setAttribute("aria-hidden", "true");
  imageModalPreview.src = "";
}

evidenceImages.forEach((img) => {
  img.addEventListener("click", () => {
    imageModalPreview.src = img.src;
    imageModalPreview.alt = img.alt || "Evidence preview";
    imageModal.classList.add("open");
    imageModal.setAttribute("aria-hidden", "false");
  });
});

imageModalClose.addEventListener("click", closeImageModal);

imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeImageModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageModal.classList.contains("open")) {
    closeImageModal();
  }
});
