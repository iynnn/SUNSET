// Fungsi untuk hash password menggunakan SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

const users = [
  {
    username: "user1",
    password:
      "ea756c5b20177d48a1ccf72f67e5d42b0cd7bb6bad1a6fa73f55a2a0dc2fd63b",
  },
  {
    username: "user2",
    password:
      "3d6138ee3eb348f1e55abf9215ab9ffafab5864b1092d48042132d8ec4cd0d07",
  },
  {
    username: "admin",
    password:
      "a59c04ca3ccdee0b2dbdf790bca2c794e8a3880901d04aadb87a4c5701e6f389",
  },
  {
    username: "tugupayung",
    password:
      "40e3eb01708e918af39ba6e4b5e5d797434a657da9c80e65f3b7dccfcdb8fc82",
  },
];

// Fungsi untuk melakukan autentikasi
function authenticate(username, hashedPassword) {
  // Mencari pengguna berdasarkan username yang diberikan
  const user = users.find((user) => user.username === username);

  // Jika pengguna tidak ditemukan atau password hash salah
  if (!user) {
    return false;
  } else if (user.password !== hashedPassword) {
    return false;
  }

  return true; // Login berhasil
}

async function getForm(event) {
  event.preventDefault();

  const username = document
    .getElementById("exampleInputUsernname1")
    .value.trim();
  const password = document
    .getElementById("exampleInputPassword1")
    .value.trim();
  const message = document.getElementById("message");
  message.innerHTML = "";

  // Cek jika username atau password kosong
  if (username === "" || password === "") {
    // message.innerHTML = `<p>Username dan Password tidak boleh kosong</p>`;
    // message.setAttribute("class", "text-danger");
    const alert = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Error!</strong> Username dan Password tidak boleh kosong.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    message.innerHTML = alert;
  } else {
    const hashPass = await hashPassword(password); // Hash password yang dimasukkan

    // Autentikasi menggunakan username dan hashed password
    if (authenticate(username, hashPass)) {
      message.innerHTML = `<p>Login berhasil!</p>`;
      message.setAttribute("class", "text-success");

      // Tampilkan modal
      const warningModal = new bootstrap.Modal(
        document.getElementById("warningModal")
      );
      warningModal.show();

      // Tambahkan event listener untuk tombol "Proceed"
      document.getElementById("proceedButton").addEventListener("click", () => {
        window.location.href =
          "https://sunset7310.my.canva.site/ffg2ghegy364882jehdnbdbh4uyxuk4euy2hs4jeg2uy6487zydjkehggdhx4djh4kyu234y6o9kjejsjh3j4hxj783u62377t4hjrvxnvdhejd4rkludryefgfwsh56575tdbcvcnbj9u8776ghgjjopp0098cccvcvfddgrgkkhjhdgrjdghdegrh362746";
      });

      // window.location.href =
      // "https://sunset7310.my.canva.site/ffg2ghegy364882jehdnbdbh4uyxuk4euy2hs4jeg2uy6487zydjkehggdhx4djh4kyu234y6o9kjejsjh3j4hxj783u62377t4hjrvxnvdhejd4rkludryefgfwsh56575tdbcvcnbj9u8776ghgjjopp0098cccvcvfddgrgkkhjhdgrjdghdegrh362746"; // Redirect ke Google
    } else {
      // message.innerHTML = `<p>Username atau Password salah</p>`;
      // message.setAttribute("class", "text-danger");
      const alert = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Error!</strong> Username dan Password salah.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      message.innerHTML = alert;
      // message.innerHTML = ""; // Kosongkan message jika ada
      // const toastEl = document.getElementById("errorToast");
      // const toast = new bootstrap.Toast(toastEl);
      // toast.show(); // Tampilkan toast
    }
  }
}
// Menambahkan event listener untuk button
document.getElementById("loginButton").addEventListener("click", getForm);
