import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "iot_web_app_v1";

const THEMES = {
  pinkDark: {
    name: "Merah Muda & Tua",
    bg: "bg-rose-50",
    panel: "bg-white/90",
    accent: "from-pink-500 to-rose-800",
    accentSolid: "bg-rose-600",
    text: "text-slate-900",
    border: "border-rose-200",
  },
  purpleSky: {
    name: "Ungu Muda & Biru Langit",
    bg: "bg-sky-50",
    panel: "bg-white/90",
    accent: "from-violet-400 to-sky-500",
    accentSolid: "bg-violet-500",
    text: "text-slate-900",
    border: "border-sky-200",
  },
  redOrange: {
    name: "Merah & Orange",
    bg: "bg-orange-50",
    panel: "bg-white/90",
    accent: "from-red-500 to-orange-500",
    accentSolid: "bg-red-600",
    text: "text-slate-900",
    border: "border-orange-200",
  },
  yellowCream: {
    name: "Kuning & Krem",
    bg: "bg-amber-50",
    panel: "bg-white/90",
    accent: "from-yellow-400 to-amber-200",
    accentSolid: "bg-amber-500",
    text: "text-slate-900",
    border: "border-amber-200",
  },
  brownLightDark: {
    name: "Coklat Muda & Tua",
    bg: "bg-stone-50",
    panel: "bg-white/90",
    accent: "from-amber-700 to-stone-700",
    accentSolid: "bg-stone-700",
    text: "text-slate-900",
    border: "border-stone-200",
  },
  greenLightDark: {
    name: "Hijau Muda & Tua",
    bg: "bg-emerald-50",
    panel: "bg-white/90",
    accent: "from-emerald-400 to-green-800",
    accentSolid: "bg-emerald-600",
    text: "text-slate-900",
    border: "border-emerald-200",
  },
};

const TEXT = {
  id: {
    appName: "Aplikasi IoT Perusahaan",
    loginTitle: "Masuk",
    username: "Nama pengguna",
    company: "Nama perusahaan pengguna",
    loginBtn: "Login",
    logout: "Keluar",
    dashboard: "Dashboard",
    history: "Riwayat",
    trackingElectronics: "Tracking Alat Elektronik",
    trackingProducts: "Tracking Produk",
    shipping: "Pengiriman / Penerimaan",
    reportProblem: "Report Problem",
    settings: "Setting Data",
    theme: "Tema",
    appearance: "Tampilan",
    language: "Bahasa",
    darkMode: "Gelap",
    lightMode: "Terang",
    english: "Inggris",
    indonesian: "Indonesia",
    addUser: "Tambah Data Pengguna",
    editUser: "Edit Data Pengguna",
    deleteUser: "Hapus",
    save: "Simpan",
    cancel: "Batal",
    search: "Cari",
    map: "Peta / GPS",
    status: "Status",
    problemInput: "Tulis masalah Anda di sini...",
    send: "Kirim",
    botReply: "Respon Bot",
    solution: "Solusi",
    newShipment: "Baru Dikirim / Diterima",
    inTransit: "Diperjalanan",
    delivered: "Sudah Dikirim / Diterima",
    received: "Diterima",
    shipped: "Dikirim",
    addItem: "Tambah Data",
    editItem: "Edit Data",
    noData: "Belum ada data",
    allGood: "Semua fitur aktif dan bisa digunakan.",
  },
  en: {
    appName: "Company IoT App",
    loginTitle: "Login",
    username: "Username",
    company: "User company name",
    loginBtn: "Login",
    logout: "Logout",
    dashboard: "Dashboard",
    history: "History",
    trackingElectronics: "Track Electronics",
    trackingProducts: "Track Products",
    shipping: "Shipping / Receiving",
    reportProblem: "Report Problem",
    settings: "Data Settings",
    theme: "Theme",
    appearance: "Appearance",
    language: "Language",
    darkMode: "Dark",
    lightMode: "Light",
    english: "English",
    indonesian: "Indonesian",
    addUser: "Add User Data",
    editUser: "Edit User Data",
    deleteUser: "Delete",
    save: "Save",
    cancel: "Cancel",
    search: "Search",
    map: "Map / GPS",
    status: "Status",
    problemInput: "Write your problem here...",
    send: "Send",
    botReply: "Bot Reply",
    solution: "Solution",
    newShipment: "Newly Shipped / Received",
    inTransit: "In Transit",
    delivered: "Shipped / Received",
    received: "Received",
    shipped: "Shipped",
    addItem: "Add Data",
    editItem: "Edit Data",
    noData: "No data yet",
    allGood: "All features are active and usable.",
  },
};

const DEFAULT_USERS = [
  { id: 1, name: "Andi", company: "PT Maju Jaya", role: "Admin", phone: "+62 812-0000-1111" },
  { id: 2, name: "Siti", company: "PT Sumber Rejeki", role: "Operator", phone: "+62 813-0000-2222" },
];

const DEFAULT_ELECTRONICS = [
  { id: 1, name: "Laptop Gudang A", code: "EL-001", lat: -6.9175, lng: 107.6191, status: "Aktif" },
  { id: 2, name: "Router Produksi", code: "EL-002", lat: -6.9189, lng: 107.6158, status: "Dipantau" },
  { id: 3, name: "Printer Cabang", code: "EL-003", lat: -6.9201, lng: 107.6214, status: "Perlu cek" },
];

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Produk A", code: "PR-101", lat: -6.9162, lng: 107.6172, status: "Pada tempatnya" },
  { id: 2, name: "Produk B", code: "PR-102", lat: -6.9195, lng: 107.6205, status: "Dipindahkan" },
  { id: 3, name: "Produk C", code: "PR-103", lat: -6.9154, lng: 107.6161, status: "Aman" },
];

const DEFAULT_SHIPMENTS = [
  { id: 1, item: "Produk A", type: "Dikirim", state: "Baru dikirim", updatedAt: "2026-04-23 07:30" },
  { id: 2, item: "Produk B", type: "Diterima", state: "Diperjalanan", updatedAt: "2026-04-23 07:45" },
  { id: 3, item: "Produk C", type: "Dikirim", state: "Sudah dikirim", updatedAt: "2026-04-22 16:10" },
];

const DEFAULT_HISTORY = [
  { id: 1, title: "Login berhasil", detail: "Admin masuk ke aplikasi", time: "07:10" },
  { id: 2, title: "Data produk diperbarui", detail: "Produk B dipindahkan", time: "07:22" },
  { id: 3, title: "Pengiriman dibuat", detail: "Produk A dikirim ke cabang", time: "07:30" },
];

function loadState() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatThemeLabel(key, lang) {
  const map = THEMES[key];
  if (!map) return key;
  return map.name;
}

function App() {
  const loaded = loadState();
  const [loggedIn, setLoggedIn] = useState(loaded?.loggedIn ?? false);
  const [user, setUser] = useState(loaded?.user ?? { username: "", company: "" });
  const [language, setLanguage] = useState(loaded?.language ?? "id");
  const [theme, setTheme] = useState(loaded?.theme ?? "pinkDark");
  const [mode, setMode] = useState(loaded?.mode ?? "light");
  const [activeMenu, setActiveMenu] = useState(loaded?.activeMenu ?? "dashboard");
  const [users, setUsers] = useState(loaded?.users ?? DEFAULT_USERS);
  const [electronics, setElectronics] = useState(loaded?.electronics ?? DEFAULT_ELECTRONICS);
  const [products, setProducts] = useState(loaded?.products ?? DEFAULT_PRODUCTS);
  const [shipments, setShipments] = useState(loaded?.shipments ?? DEFAULT_SHIPMENTS);
  const [history, setHistory] = useState(loaded?.history ?? DEFAULT_HISTORY);
  const [problemInput, setProblemInput] = useState("");
  const [botConversation, setBotConversation] = useState([
    { role: "bot", text: "Halo, kirimkan masalah Anda. Saya akan langsung memberikan solusi." },
  ]);
  const [userForm, setUserForm] = useState({ name: "", company: "", role: "", phone: "" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(loaded?.message ?? "");

  const t = TEXT[language];
  const th = THEMES[theme];

  useEffect(() => {
    if (!loaded) return;
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode, loaded]);

  useEffect(() => {
    const state = {
      loggedIn,
      user,
      language,
      theme,
      mode,
      activeMenu,
      users,
      electronics,
      products,
      shipments,
      history,
      message,
    };
    try {
      saveState(state);
    } catch {}
  }, [loggedIn, user, language, theme, mode, activeMenu, users, electronics, products, shipments, history, message]);

  const isDark = mode === "dark";
  const appBg = isDark ? "bg-slate-950 text-slate-100" : `${th.bg} ${th.text}`;
  const panelBg = isDark ? "bg-slate-900/80 border-slate-700" : `${th.panel} ${th.border}`;
  const softText = isDark ? "text-slate-300" : "text-slate-600";

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) =>
      [u.name, u.company, u.role, u.phone].join(" ").toLowerCase().includes(q)
    );
  }, [users, search]);

  const filteredElectronics = useMemo(() => {
    const q = search.toLowerCase();
    return electronics.filter((u) => [u.name, u.code, u.status].join(" ").toLowerCase().includes(q));
  }, [electronics, search]);

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((u) => [u.name, u.code, u.status].join(" ").toLowerCase().includes(q));
  }, [products, search]);

  const filteredShipments = useMemo(() => {
    const q = search.toLowerCase();
    return shipments.filter((u) => [u.item, u.type, u.state, u.updatedAt].join(" ").toLowerCase().includes(q));
  }, [shipments, search]);

  function addHistory(title, detail) {
    setHistory((prev) => [{ id: Date.now(), title, detail, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...prev].slice(0, 50));
  }

  function handleLogin() {
    if (!user.username.trim() || !user.company.trim()) {
      setMessage(language === "id" ? "Nama pengguna dan nama perusahaan wajib diisi." : "Username and company name are required.");
      return;
    }
    setLoggedIn(true);
    setActiveMenu("dashboard");
    addHistory("Login", `${user.username} masuk ke aplikasi`);
    setMessage(language === "id" ? "Login berhasil." : "Login successful.");
  }

  function handleLogout() {
    setLoggedIn(false);
    setActiveMenu("dashboard");
    addHistory("Logout", `${user.username} keluar dari aplikasi`);
  }

  function submitProblem() {
    if (!problemInput.trim()) return;
    const lower = problemInput.toLowerCase();
    let reply = "";
    let solution = "";

    if (lower.includes("login") || lower.includes("masuk")) {
      reply = language === "id" ? "Masalah login terdeteksi." : "Login issue detected.";
      solution = language === "id"
        ? "Periksa nama pengguna, nama perusahaan, dan pastikan tombol Login ditekan. Jika masih gagal, hapus cache browser lalu coba lagi."
        : "Check username, company name, and press Login. If it still fails, clear the browser cache and try again.";
    } else if (lower.includes("peta") || lower.includes("gps")) {
      reply = language === "id" ? "Masalah peta/GPS terdeteksi." : "Map/GPS issue detected.";
      solution = language === "id"
        ? "Pastikan koordinat data terisi, lalu klik menu tracking. Jika marker tidak tampil, refresh halaman dan pastikan mode gelap/terang tidak menutupi panel." 
        : "Make sure coordinates are filled in, then open the tracking menu. If markers do not appear, refresh the page and make sure dark/light mode is not covering the panel.";
    } else if (lower.includes("data") || lower.includes("crud") || lower.includes("hapus") || lower.includes("edit")) {
      reply = language === "id" ? "Masalah data/CRUD terdeteksi." : "Data/CRUD issue detected.";
      solution = language === "id"
        ? "Gunakan tombol Tambah, Edit, dan Hapus pada menu Setting Data. Data tersimpan otomatis di database lokal browser (localStorage)."
        : "Use Add, Edit, and Delete buttons in Data Settings. Data is saved automatically in the browser local database (localStorage).";
    } else {
      reply = language === "id" ? "Masalah diterima." : "Problem received.";
      solution = language === "id"
        ? "Coba muat ulang aplikasi, periksa koneksi, lalu pastikan semua field wajib sudah terisi. Bila masih bermasalah, kirim detail langkah yang gagal." 
        : "Try reloading the app, check your connection, and make sure all required fields are filled. If it still fails, send the exact step that breaks.";
    }

    setBotConversation((prev) => [
      ...prev,
      { role: "user", text: problemInput },
      { role: "bot", text: `${reply} ${solution}` },
    ]);
    addHistory("Report Problem", problemInput);
    setProblemInput("");
  }

  function resetUserForm() {
    setUserForm({ name: "", company: "", role: "", phone: "" });
    setEditingUserId(null);
  }

  function submitUserForm(e) {
    e.preventDefault();
    if (!userForm.name.trim() || !userForm.company.trim()) return;

    if (editingUserId) {
      setUsers((prev) => prev.map((u) => (u.id === editingUserId ? { ...u, ...userForm, id: editingUserId } : u)));
      addHistory("Edit User", `${userForm.name} diperbarui`);
    } else {
      const newUser = { id: Date.now(), ...userForm };
      setUsers((prev) => [newUser, ...prev]);
      addHistory("Tambah User", `${userForm.name} ditambahkan`);
    }
    resetUserForm();
  }

  function startEditUser(u) {
    setEditingUserId(u.id);
    setUserForm({ name: u.name, company: u.company, role: u.role, phone: u.phone });
  }

  function deleteUser(id) {
    const target = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    addHistory("Hapus User", `${target?.name ?? "Data"} dihapus`);
  }

  function updateShipment(id, state) {
    setShipments((prev) => prev.map((s) => (s.id === id ? { ...s, state, updatedAt: new Date().toLocaleString() } : s)));
    addHistory("Update Shipment", `Status pengiriman ${id} -> ${state}`);
  }

  function MapPanel({ items, title }) {
    const bounds = { minLat: -6.922, maxLat: -6.914, minLng: 107.614, maxLng: 107.622 };
    const toPos = (lat, lng) => {
      const top = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 78 + 8;
      const left = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 78 + 8;
      return { top: `${Math.max(6, Math.min(86, top))}%`, left: `${Math.max(6, Math.min(86, left))}%` };
    };

    return (
      <div className={cx("rounded-3xl border p-4 shadow-sm", panelBg)}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className={cx("text-sm", softText)}>{t.map}</p>
          </div>
          <div className={cx("text-xs px-3 py-1 rounded-full bg-gradient-to-r text-white", th.accent)}>
            GPS Online
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-dashed min-h-[320px] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.25)_1px,transparent_0)] bg-[size:18px_18px]">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/40" />
          {items.map((item) => {
            const pos = toPos(item.lat, item.lng);
            return (
              <div key={item.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos}>
                <div className={cx("px-3 py-2 rounded-2xl shadow-lg border backdrop-blur-sm", isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200")}>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className={cx("inline-flex h-3 w-3 rounded-full", th.accentSolid)} />
                    {item.name}
                  </div>
                  <div className={cx("text-xs mt-1", softText)}>{item.code}</div>
                  <div className={cx("text-xs", softText)}>{item.lat.toFixed(4)}, {item.lng.toFixed(4)}</div>
                </div>
              </div>
            );
          })}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between text-xs opacity-80">
            <span>North</span><span>East</span><span>South</span><span>West</span>
          </div>
        </div>
      </div>
    );
  }

  function SidebarButton({ id, label }) {
    const active = activeMenu === id;
    return (
      <button
        onClick={() => setActiveMenu(id)}
        className={cx(
          "w-full text-left px-4 py-3 rounded-2xl transition border",
          active
            ? `text-white bg-gradient-to-r ${th.accent} border-transparent shadow-lg`
            : `${isDark ? "bg-slate-900 border-slate-700 hover:bg-slate-800" : "bg-white border-slate-200 hover:bg-slate-50"}`
        )}
      >
        {label}
      </button>
    );
  }

  if (!loggedIn) {
    return (
      <div className={cx("min-h-screen flex items-center justify-center p-4", appBg)}>
        <div className={cx("w-full max-w-lg rounded-3xl border p-6 shadow-xl", panelBg)}>
          <div className={cx("w-14 h-14 rounded-2xl mb-4 bg-gradient-to-r", th.accent)} />
          <h1 className="text-3xl font-bold">{t.appName}</h1>
          <p className={cx("mt-2", softText)}>{t.loginTitle}</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">{t.username}</label>
              <input
                className={cx("mt-2 w-full rounded-2xl border px-4 py-3 outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}
                value={user.username}
                onChange={(e) => setUser((p) => ({ ...p, username: e.target.value }))}
                placeholder={t.username}
              />
            </div>
            <div>
              <label className="text-sm font-medium">{t.company}</label>
              <input
                className={cx("mt-2 w-full rounded-2xl border px-4 py-3 outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}
                value={user.company}
                onChange={(e) => setUser((p) => ({ ...p, company: e.target.value }))}
                placeholder={t.company}
              />
            </div>
            <button onClick={handleLogin} className={cx("w-full rounded-2xl py-3 font-semibold text-white shadow-lg bg-gradient-to-r", th.accent)}>
              {t.loginBtn}
            </button>
            {message ? <div className={cx("text-sm rounded-2xl px-4 py-3 border", isDark ? "bg-slate-950 border-slate-700" : "bg-slate-50 border-slate-200")}>{message}</div> : null}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <button onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))} className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>{mode === "dark" ? t.darkMode : t.lightMode}</button>
            <button onClick={() => setLanguage((l) => (l === "id" ? "en" : "id"))} className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>{language === "id" ? t.indonesian : t.english}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cx("min-h-screen", appBg)}>
      <div className="max-w-[1600px] mx-auto p-4 lg:p-6 grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-4">
        <aside className={cx("rounded-3xl border p-4 shadow-sm h-fit sticky top-4", panelBg)}>
          <div className="flex items-center gap-3 mb-5">
            <div className={cx("w-12 h-12 rounded-2xl bg-gradient-to-r", th.accent)} />
            <div>
              <div className="font-bold">{t.appName}</div>
              <div className={cx("text-xs", softText)}>{user.company}</div>
            </div>
          </div>

          <div className="space-y-2">
            <SidebarButton id="dashboard" label={t.dashboard} />
            <SidebarButton id="history" label={t.history} />
            <SidebarButton id="electronics" label={t.trackingElectronics} />
            <SidebarButton id="products" label={t.trackingProducts} />
            <SidebarButton id="shipping" label={t.shipping} />
            <SidebarButton id="report" label={t.reportProblem} />
            <SidebarButton id="settings" label={t.settings} />
          </div>

          <div className="mt-5 space-y-3">
            <button onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))} className={cx("w-full rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>{mode === "dark" ? t.darkMode : t.lightMode}</button>
            <button onClick={() => setLanguage((l) => (l === "id" ? "en" : "id"))} className={cx("w-full rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>{language === "id" ? t.indonesian : t.english}</button>
            <button onClick={handleLogout} className={cx("w-full rounded-2xl border px-4 py-3 text-white bg-gradient-to-r", th.accent)}>{t.logout}</button>
          </div>
        </aside>

        <main className="space-y-4">
          <section className={cx("rounded-3xl border p-5 shadow-sm", panelBg)}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{t.appName}</h2>
                <p className={cx("mt-1", softText)}>{user.username} · {user.company}</p>
                <p className={cx("mt-1 text-sm", softText)}>{t.allGood}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full lg:w-auto">
                <div className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                  <div className="text-xs opacity-70">Users</div>
                  <div className="text-xl font-bold">{users.length}</div>
                </div>
                <div className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                  <div className="text-xs opacity-70">Electronics</div>
                  <div className="text-xl font-bold">{electronics.length}</div>
                </div>
                <div className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                  <div className="text-xs opacity-70">Products</div>
                  <div className="text-xl font-bold">{products.length}</div>
                </div>
                <div className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                  <div className="text-xs opacity-70">Shipments</div>
                  <div className="text-xl font-bold">{shipments.length}</div>
                </div>
              </div>
            </div>
          </section>

          {(activeMenu === "dashboard" || activeMenu === "history") && (
            <section className={cx("rounded-3xl border p-5 shadow-sm", panelBg)}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{activeMenu === "dashboard" ? t.dashboard : t.history}</h3>
                  <p className={cx("text-sm", softText)}>{activeMenu === "dashboard" ? "Ringkasan aplikasi dan akses cepat." : "Seluruh riwayat terakhir aktivitas aplikasi."}</p>
                </div>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} className={cx("w-full md:w-80 rounded-2xl border px-4 py-3 outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")} />
              </div>
              {activeMenu === "dashboard" ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {[
                    { title: t.history, desc: "Log aktivitas dan event terbaru", menu: "history" },
                    { title: t.trackingElectronics, desc: "Pantau alat elektronik perusahaan", menu: "electronics" },
                    { title: t.trackingProducts, desc: "Pastikan produk tetap pada tempatnya", menu: "products" },
                    { title: t.shipping, desc: "Status kirim dan terima produk", menu: "shipping" },
                  ].map((card) => (
                    <button key={card.title} onClick={() => setActiveMenu(card.menu)} className={cx("text-left rounded-3xl border p-5 transition hover:scale-[1.01]", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                      <div className={cx("w-12 h-12 rounded-2xl mb-4 bg-gradient-to-r", th.accent)} />
                      <div className="font-semibold text-lg">{card.title}</div>
                      <div className={cx("mt-1 text-sm", softText)}>{card.desc}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 max-h-[430px] overflow-auto pr-1">
                  {history.length ? history.map((item) => (
                    <div key={item.id} className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold">{item.title}</div>
                        <div className={cx("text-xs", softText)}>{item.time}</div>
                      </div>
                      <div className={cx("text-sm mt-1", softText)}>{item.detail}</div>
                    </div>
                  )) : <div className={cx("text-sm", softText)}>{t.noData}</div>}
                </div>
              )}
            </section>
          )}

          {activeMenu === "electronics" && (
            <section className="grid xl:grid-cols-[1.1fr_0.9fr] gap-4">
              <MapPanel items={filteredElectronics} title={t.trackingElectronics} />
              <div className={cx("rounded-3xl border p-4 shadow-sm", panelBg)}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Daftar Alat Elektronik</h3>
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} className={cx("w-44 rounded-2xl border px-3 py-2 text-sm outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")} />
                </div>
                <div className="space-y-3 max-h-[390px] overflow-auto pr-1">
                  {filteredElectronics.map((item) => (
                    <div key={item.id} className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className={cx("text-sm", softText)}>{item.code}</div>
                        </div>
                        <div className={cx("text-xs px-3 py-1 rounded-full text-white", th.accentSolid)}>{item.status}</div>
                      </div>
                    </div>
                  ))}
                  {!filteredElectronics.length && <div className={cx("text-sm", softText)}>{t.noData}</div>}
                </div>
              </div>
            </section>
          )}

          {activeMenu === "products" && (
            <section className="grid xl:grid-cols-[1.1fr_0.9fr] gap-4">
              <MapPanel items={filteredProducts} title={t.trackingProducts} />
              <div className={cx("rounded-3xl border p-4 shadow-sm", panelBg)}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Produk Tersimpan</h3>
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} className={cx("w-44 rounded-2xl border px-3 py-2 text-sm outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")} />
                </div>
                <div className="space-y-3 max-h-[390px] overflow-auto pr-1">
                  {filteredProducts.map((item) => (
                    <div key={item.id} className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className={cx("text-sm", softText)}>{item.code}</div>
                        </div>
                        <div className={cx("text-xs px-3 py-1 rounded-full text-white", th.accentSolid)}>{item.status}</div>
                      </div>
                    </div>
                  ))}
                  {!filteredProducts.length && <div className={cx("text-sm", softText)}>{t.noData}</div>}
                </div>
              </div>
            </section>
          )}

          {activeMenu === "shipping" && (
            <section className={cx("rounded-3xl border p-5 shadow-sm", panelBg)}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{t.shipping}</h3>
                  <p className={cx("text-sm", softText)}>Baru dikirim/dite­rima, diperjalanan, dan sudah dikirim/diterima.</p>
                </div>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} className={cx("w-full md:w-80 rounded-2xl border px-4 py-3 outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")} />
              </div>
              <div className="grid xl:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {filteredShipments.map((s) => (
                    <div key={s.id} className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <div className="font-semibold">{s.item}</div>
                          <div className={cx("text-sm", softText)}>{s.type} · {s.updatedAt}</div>
                        </div>
                        <select value={s.state} onChange={(e) => updateShipment(s.id, e.target.value)} className={cx("rounded-2xl border px-3 py-2 text-sm outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                          <option>{t.newShipment}</option>
                          <option>{t.inTransit}</option>
                          <option>{t.delivered}</option>
                        </select>
                      </div>
                      <div className={cx("mt-3 text-xs inline-flex px-3 py-1 rounded-full text-white", th.accentSolid)}>{s.state}</div>
                    </div>
                  ))}
                </div>
                <div className={cx("rounded-3xl border p-4", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                  <h4 className="font-semibold mb-3">Status Cepat</h4>
                  <div className="space-y-2 text-sm">
                    <div>• {t.newShipment}</div>
                    <div>• {t.inTransit}</div>
                    <div>• {t.delivered}</div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeMenu === "report" && (
            <section className={cx("rounded-3xl border p-5 shadow-sm", panelBg)}>
              <h3 className="text-xl font-semibold">{t.reportProblem}</h3>
              <p className={cx("text-sm mt-1", softText)}>Bot membalas segera dengan solusi perbaikan.</p>
              <div className="mt-4 grid xl:grid-cols-[1fr_0.9fr] gap-4">
                <div className="space-y-3">
                  <textarea value={problemInput} onChange={(e) => setProblemInput(e.target.value)} placeholder={t.problemInput} rows={5} className={cx("w-full rounded-3xl border p-4 outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")} />
                  <button onClick={submitProblem} className={cx("rounded-2xl px-5 py-3 font-semibold text-white bg-gradient-to-r", th.accent)}>{t.send}</button>
                </div>
                <div className={cx("rounded-3xl border p-4 max-h-[350px] overflow-auto", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                  <h4 className="font-semibold mb-3">{t.botReply}</h4>
                  <div className="space-y-3">
                    {botConversation.map((msg, idx) => (
                      <div key={idx} className={cx("rounded-2xl px-4 py-3 text-sm", msg.role === "bot" ? (isDark ? "bg-slate-800" : "bg-slate-100") : `bg-gradient-to-r ${th.accent} text-white`)}>
                        {msg.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeMenu === "settings" && (
            <section className="grid xl:grid-cols-[0.9fr_1.1fr] gap-4">
              <div className={cx("rounded-3xl border p-5 shadow-sm", panelBg)}>
                <h3 className="text-xl font-semibold">{t.settings}</h3>
                <p className={cx("text-sm mt-1", softText)}>Kelola data pengguna, tema, bahasa, dan mode tampilan.</p>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="text-sm font-medium">{t.theme}</label>
                    <select value={theme} onChange={(e) => setTheme(e.target.value)} className={cx("mt-2 w-full rounded-2xl border px-4 py-3 outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                      {Object.entries(THEMES).map(([key, value]) => <option key={key} value={key}>{value.name}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setMode("light")} className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>{t.lightMode}</button>
                    <button onClick={() => setMode("dark")} className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>{t.darkMode}</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setLanguage("id")} className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>{t.indonesian}</button>
                    <button onClick={() => setLanguage("en")} className={cx("rounded-2xl border px-4 py-3", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>{t.english}</button>
                  </div>
                </div>
              </div>

              <div className={cx("rounded-3xl border p-5 shadow-sm", panelBg)}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{editingUserId ? t.editUser : t.addUser}</h3>
                  <button onClick={() => { resetUserForm(); setSearch(""); }} className={cx("text-sm px-3 py-2 rounded-2xl border", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>{t.cancel}</button>
                </div>
                <form onSubmit={submitUserForm} className="mt-4 grid md:grid-cols-2 gap-3">
                  <input value={userForm.name} onChange={(e) => setUserForm((p) => ({ ...p, name: e.target.value }))} placeholder={t.username} className={cx("rounded-2xl border px-4 py-3 outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")} />
                  <input value={userForm.company} onChange={(e) => setUserForm((p) => ({ ...p, company: e.target.value }))} placeholder={t.company} className={cx("rounded-2xl border px-4 py-3 outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")} />
                  <input value={userForm.role} onChange={(e) => setUserForm((p) => ({ ...p, role: e.target.value }))} placeholder="Role" className={cx("rounded-2xl border px-4 py-3 outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")} />
                  <input value={userForm.phone} onChange={(e) => setUserForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Phone" className={cx("rounded-2xl border px-4 py-3 outline-none", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")} />
                  <button type="submit" className={cx("md:col-span-2 rounded-2xl px-4 py-3 font-semibold text-white bg-gradient-to-r", th.accent)}>
                    {editingUserId ? t.save : t.addItem}
                  </button>
                </form>

                <div className="mt-5 space-y-3 max-h-[340px] overflow-auto pr-1">
                  {filteredUsers.map((u) => (
                    <div key={u.id} className={cx("rounded-2xl border p-4", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <div className="font-semibold">{u.name}</div>
                          <div className={cx("text-sm", softText)}>{u.company} · {u.role} · {u.phone}</div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => startEditUser(u)} className={cx("px-3 py-2 rounded-2xl border text-sm", isDark ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200")}>{t.editItem}</button>
                          <button onClick={() => deleteUser(u.id)} className={cx("px-3 py-2 rounded-2xl text-white text-sm bg-gradient-to-r", th.accent)}>{t.deleteUser}</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!filteredUsers.length && <div className={cx("text-sm", softText)}>{t.noData}</div>}
                </div>
              </div>
            </section>
          )}

          <section className={cx("rounded-3xl border p-4 text-sm shadow-sm", panelBg)}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <span className="font-semibold">Tema:</span> {formatThemeLabel(theme, language)} · <span className="font-semibold">Mode:</span> {mode} · <span className="font-semibold">Language:</span> {language.toUpperCase()}
              </div>
              <div className={softText}>Database lokal aktif: data tersimpan di browser dan bisa tambah, edit, hapus.</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
