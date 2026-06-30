const form = document.getElementById("formData");
const tableBody = document.getElementById("tableBody");
const btnSubmit = document.getElementById("btnSubmit");

// Ambil data dari Local Storage
let dataList = JSON.parse(localStorage.getItem("dataPengajuan")) || [];
let editIndex = -1;

// Tampilkan data saat halaman dibuka
tampilkanData();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        nama: document.getElementById("nama").value,
        nim: document.getElementById("nim").value,
        layanan: document.getElementById("layanan").value,
        keterangan: document.getElementById("keterangan").value
    };

    if (editIndex === -1) {
        dataList.push(data);
    } else {
        dataList[editIndex] = data;
        editIndex = -1;
        btnSubmit.textContent = "Simpan";
    }

    // Simpan ke Local Storage
    simpanData();

    form.reset();

    tampilkanData();
});

function tampilkanData() {

    tableBody.innerHTML = "";

    dataList.forEach((item, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.nim}</td>
            <td>${item.layanan}</td>
            <td>${item.keterangan}</td>
            <td>
                <button class="edit" onclick="editData(${index})">Edit</button>
                <button class="delete" onclick="hapusData(${index})">Hapus</button>
            </td>
        `;

        tableBody.appendChild(row);

    });

}

function editData(index) {

    document.getElementById("nama").value = dataList[index].nama;
    document.getElementById("nim").value = dataList[index].nim;
    document.getElementById("layanan").value = dataList[index].layanan;
    document.getElementById("keterangan").value = dataList[index].keterangan;

    editIndex = index;

    btnSubmit.textContent = "Update";

}

function hapusData(index) {

    if (confirm("Yakin ingin menghapus data?")) {

        dataList.splice(index, 1);

        // Update Local Storage
        simpanData();

        tampilkanData();

    }

}

// Fungsi menyimpan data ke Local Storage
function simpanData() {
    localStorage.setItem("dataPengajuan", JSON.stringify(dataList));
}