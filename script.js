// مفتاح التخزين في LocalStorage
const STORAGE_KEY = "companiesData";

// تحميل البيانات من LocalStorage
function loadCompanies() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// حفظ البيانات في LocalStorage
function saveCompanies(companies) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
}

// إضافة شركة جديدة
function addCompany(company) {
  const companies = loadCompanies();
  companies.push(company);
  saveCompanies(companies);
}

// تعديل شركة
function updateCompany(index, updatedCompany) {
  const companies = loadCompanies();
  companies[index] = updatedCompany;
  saveCompanies(companies);
}

// حذف شركة
function deleteCompany(index) {
  const companies = loadCompanies();
  companies.splice(index, 1);
  saveCompanies(companies);
}

// عرض الشركات في الجدول
function renderCompanies() {
  const companies = loadCompanies();
  const tableBody = document.getElementById("companiesTable");
  tableBody.innerHTML = "";

  companies.forEach((company, index) => {
    const row = `
      <tr>
        <td>${company.name}</td>
        <td>${company.status}</td>
        <td>${company.contact}</td>
        <td>${company.notes}</td>
        <td>
          <button onclick="editCompany(${index})" class="text-blue-500">✏️ تعديل</button>
          <button onclick="deleteCompanyHandler(${index})" class="text-red-500">🗑 حذف</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// هندلر الحذف
function deleteCompanyHandler(index) {
  deleteCompany(index);
  renderCompanies();
}

// هندلر التعديل
function editCompany(index) {
  const companies = loadCompanies();
  const company = companies[index];

  document.getElementById("companyName").value = company.name;
  document.getElementById("companyStatus").value = company.status;
  document.getElementById("contactPerson").value = company.contact;
  document.getElementById("companyNotes").value = company.notes;

  document.getElementById("saveBtn").onclick = function () {
    const updatedCompany = {
      name: document.getElementById("companyName").value,
      status: document.getElementById("companyStatus").value,
      contact: document.getElementById("contactPerson").value,
      notes: document.getElementById("companyNotes").value,
    };
    updateCompany(index, updatedCompany);
    renderCompanies();
    resetForm();
  };
}

// إضافة شركة جديدة من الفورم
document.getElementById("saveBtn").onclick = function () {
  const company = {
    name: document.getElementById("companyName").value,
    status: document.getElementById("companyStatus").value,
    contact: document.getElementById("contactPerson").value,
    notes: document.getElementById("companyNotes").value,
  };

  addCompany(company);
  renderCompanies();
  resetForm();
};

// إعادة ضبط الفورم
function resetForm() {
  document.getElementById("companyName").value = "";
  document.getElementById("companyStatus").value = "active";
  document.getElementById("contactPerson").value = "";
  document.getElementById("companyNotes").value = "";
  document.getElementById("saveBtn").onclick = addCompanyHandler;
}

// تحميل الشركات أول ما الصفحة تفتح
window.onload = renderCompanies;
