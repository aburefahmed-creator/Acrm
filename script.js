let companies = JSON.parse(localStorage.getItem('companies')) || [];
let editIndex = null;

function renderTable() {
  const tbody = document.getElementById("companyTable");
  const search = document.getElementById("search").value.toLowerCase();
  const statusFilter = document.getElementById("statusFilter").value;
  tbody.innerHTML = "";
  companies
    .filter(c => c.name.toLowerCase().includes(search))
    .filter(c => (statusFilter ? c.status === statusFilter : true))
    .forEach((c, i) => {
      tbody.innerHTML += `
        <tr class="border">
          <td class="p-2">${c.name}</td>
          <td class="p-2">${c.status}</td>
          <td class="p-2">${c.contact}</td>
          <td class="p-2">
            <button onclick="editCompany(${i})" class="bg-yellow-500 text-white px-2 py-1 rounded">تعديل</button>
            <button onclick="deleteCompany(${i})" class="bg-red-500 text-white px-2 py-1 rounded">حذف</button>
          </td>
        </tr>`;
    });
}

function openForm() {
  document.getElementById("formModal").classList.remove("hidden");
}

function closeForm() {
  document.getElementById("formModal").classList.add("hidden");
  editIndex = null;
}

function saveCompany() {
  const name = document.getElementById("companyName").value;
  const contact = document.getElementById("contactPerson").value;
  const status = document.getElementById("companyStatus").value;
  const notes = document.getElementById("notes").value;
  if (!name) return alert("الرجاء إدخال اسم الشركة");

  const data = { name, contact, status, notes };
  if (editIndex !== null) {
    companies[editIndex] = data;
  } else {
    companies.push(data);
  }
  localStorage.setItem("companies", JSON.stringify(companies));
  renderTable();
  closeForm();
}

function editCompany(i) {
  const c = companies[i];
  document.getElementById("companyName").value = c.name;
  document.getElementById("contactPerson").value = c.contact;
  document.getElementById("companyStatus").value = c.status;
  document.getElementById("notes").value = c.notes;
  document.getElementById("formModal").classList.remove("hidden");
  editIndex = i;
}

function deleteCompany(i) {
  if (confirm("هل تريد حذف هذه الشركة؟")) {
    companies.splice(i, 1);
    localStorage.setItem("companies", JSON.stringify(companies));
    renderTable();
  }
}

document.getElementById("search").addEventListener("input", renderTable);
document.getElementById("statusFilter").addEventListener("change", renderTable);

renderTable();