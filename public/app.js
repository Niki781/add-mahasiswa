const api = 'http://localhost:4000/mahasiswa';
const list = document.getElementById('listMahasiswa');
const form = document.getElementById('formMahasiswa');
const editMode = document.getElementById('editMode');

// Ambil data dari server dan tampilkan
function loadMahasiswa() {
  fetch(api)
    .then(res => res.json())
    .then(data => {
      list.innerHTML = '';
      data.forEach(mhs => {
        const item = document.createElement('li');
        item.className = 'bg-white shadow p-4 rounded flex justify-between items-center';

        item.innerHTML = `
          <div>
            <strong>${mhs.nim}</strong> - ${mhs.nama} (${mhs.jurusan})
          </div>
          <div class="space-x-2">
            <button class="text-blue-600" onclick='editMahasiswa(${JSON.stringify(mhs)})'>Edit</button>
            <button class="text-red-600" onclick='hapusMahasiswa("${mhs.nim}")'>Hapus</button>
          </div>
        `;
        list.appendChild(item);
      });
    });
}

// Tambah atau update mahasiswa
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nim = document.getElementById('nim').value;
  const nama = document.getElementById('nama').value;
  const jurusan = document.getElementById('jurusan').value;

  const mahasiswa = { nim, nama, jurusan };

  if (editMode.value) {
    // UPDATE
    await fetch(`${api}/${nim}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mahasiswa)
    });
    editMode.value = '';
  } else {
    // CREATE
    await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mahasiswa)
    });
  }

  form.reset();
  loadMahasiswa();
});

// Isi form untuk edit
function editMahasiswa(mhs) {
  document.getElementById('nim').value = mhs.nim;
  document.getElementById('nama').value = mhs.nama;
  document.getElementById('jurusan').value = mhs.jurusan;
  editMode.value = 'true';
}

// Hapus data
async function hapusMahasiswa(nim) {
  if (
    confirm(`Hapus mahasiswa NIM ${nim}?`)) {
    await fetch(`${api}/${nim}`, {
      method: 'DELETE'
    });
    loadMahasiswa();
  }
}

loadMahasiswa(); // Load saat halaman dibuka
