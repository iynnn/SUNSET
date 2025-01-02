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
  }, //ipds7310
  {
    username: "user2",
    password:
      "3d6138ee3eb348f1e55abf9215ab9ffafab5864b1092d48042132d8ec4cd0d07",
  }, // bps7310
  {
    username: "admin",
    password:
      "a59c04ca3ccdee0b2dbdf790bca2c794e8a3880901d04aadb87a4c5701e6f389",
  }, //bpsKabupatenBarru
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

  // Cek jika username atau password kosong
  if (username === "" || password === "") {
    message.innerHTML = `<p>Username dan Password tidak boleh kosong</p>`;
    message.setAttribute("class", "text-danger");
  } else {
    const hashPass = await hashPassword(password); // Hash password yang dimasukkan

    // Autentikasi menggunakan username dan hashed password
    if (authenticate(username, hashPass)) {
      message.innerHTML = `<p>Login berhasil!</p>`;
      message.setAttribute("class", "text-success");
      window.location.href = "https://sunset7310.my.canva.site/"; // Redirect ke Google
    } else {
      message.innerHTML = `<p>Username atau Password salah</p>`;
      message.setAttribute("class", "text-danger");
    }
  }
}
// Menambahkan event listener untuk button
document.getElementById("loginButton").addEventListener("click", getForm);
