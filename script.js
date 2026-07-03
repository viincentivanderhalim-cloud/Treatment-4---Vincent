const search = document.getElementById("search");
const form = document.getElementById("formData");
const tableBody = document.getElementById("tableBody");
const btnSubmit = document.getElementById("btnSubmit");

// Ambil data dari Local Storage
let dataList = JSON.parse(localStorage.getItem("dataPengajuan")) || [];
let editIndex = -1;

// Tampilkan data saat halaman dibuka
tampilkanData();

search.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const hasil = dataList.filter(item =>

        item.nama.toLowerCase().includes(keyword) ||

        item.nim.toLowerCase().includes(keyword) ||

        item.layanan.toLowerCase().includes(keyword) ||

        item.keterangan.toLowerCase().includes(keyword)

    );

    tampilkanData(hasil);

});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        nama: document.getElementById("nama").value.trim(),
        nim: document.getElementById("nim").value.trim(),
        layanan: document.getElementById("layanan").value,
        keterangan: document.getElementById("keterangan").value.trim()
    };

    // Validasi NIM
    const nimPattern = /^[0-9]{8}$/;

    if (!nimPattern.test(data.nim)) {
        alert("NIM harus terdiri dari 8 digit angka.");
        return;
    }

    const konfirmasi = confirm(
    editIndex === -1
        ? "Apakah Anda yakin ingin menyimpan data ini?"
        : "Apakah Anda yakin ingin memperbarui data ini?"
);

if (!konfirmasi) {
    return;
}

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

function tampilkanData(list = dataList) {

    tableBody.innerHTML = "";

    list.forEach((item, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.nim}</td>
            <td>${item.layanan}</td>
            <td>${item.keterangan}</td>
            <td>
                <button class="edit" onclick="editData(${dataList.indexOf(item)})">Edit</button>
                <button class="delete" onclick="hapusData(${dataList.indexOf(item)})">Hapus</button>
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