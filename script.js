// ============================================================
// CINEMAXX shared code: saved data, helpers, login, clock, and UI upgrades
// ============================================================

var SEAT_ROWS = ['A', 'B', 'C', 'D', 'E'];
var SEATS_PER_ROW = 8;   
var CAPACITY = SEAT_ROWS.length * SEATS_PER_ROW;
var HALL_COUNT = 5;
var EXPERIENCES = ['2D', 'IMAX', '3D'];
var DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function load(key, fallback) {
  try {
    var v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) {
    return fallback;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    showAlert('Storage Full', 'Browser storage is full. Try a smaller poster image.');
    return false;
  }
}

function getMovies() { 
  var list = load('movies', []); 
  if (list.length === 0 && typeof DEFAULT_MOVIES !== 'undefined') {
    list = DEFAULT_MOVIES;
    saveMovies(list);
  }
  return list; 
}
function saveMovies(list) { var ok = save('movies', list); if (ok) recordSnapshot(); return ok; }

function getShowtimes() { 
  var list = load('showtimes', []); 
  if (list.length === 0 && typeof DEFAULT_SHOWTIMES !== 'undefined') {
    list = DEFAULT_SHOWTIMES;
    saveShowtimes(list);
  }
  return list; 
}
function saveShowtimes(list) { return save('showtimes', list); }

function getAccounts() { 
  var list = load('accounts', []); 
  if (list.length === 0 && typeof DEFAULT_ACCOUNTS !== 'undefined') {
    list = DEFAULT_ACCOUNTS.map(function(acc) {
      return {
        username: acc.username,
        pass: hashPass(acc.username, acc.passwordPlain),
        created: acc.created
      };
    });
    save('accounts', list);
  }
  return list; 
}

function getTickets() { return load('tickets', []); }
function saveTickets(list) { return save('tickets', list); }

function getHalls() {
  var h = load('hallStatus', null);
  if (!h || h.length !== HALL_COUNT) {
    h = [];
    h = [true, true, true, false, true]; //hall4 is unavailable by default
  }
  return h;
}
function saveHalls(list) { var ok = save('hallStatus', list); if (ok) recordSnapshot(); return ok; }

function recordSnapshot() {
  var snaps = load('snapshots', {});
  snaps[dateKey(new Date())] = {
    movies: getMovies().filter(function (m) { return m.status === 'now'; }).length,
    halls: getHalls().filter(Boolean).length
  };
  save('snapshots', snaps);
}

function pad(n) { return ('0' + n).slice(-2); }
function dateKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function qs(name) { return new URLSearchParams(window.location.search).get(name); }
function genId(prefix) { return prefix + Date.now().toString(36).toUpperCase() + Math.floor(Math.random() * 1000); }
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// FIXED: Upgraded date formatter to be 100% crash-proof against both ISO and custom dates!
function fmtDate(iso) {
  if (!iso) return '-';
  var datePart = iso.split('T')[0]; // Safe slice if full ISO timestamp is sent
  var p = datePart.split('-');
  if (p.length < 3) return iso;
  var d = new Date(+p[0], +p[1] - 1, +p[2]);
  if (isNaN(d.getTime())) return iso;
  return DAY_NAMES[d.getDay()] + ', ' + d.getDate() + ' ' + MONTH_NAMES[d.getMonth()] + ' ' + d.getFullYear();
}

function fmtTime(t) {
  var p = t.split(':');
  var h = +p[0];
  var ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12; if (h === 0) h = 12;
  return h + ':' + p[1] + ap;
}
function fmtDateTime(isoString) {
  var d = new Date(isoString);
  return fmtDate(dateKey(d)) + ', ' + fmtTime(pad(d.getHours()) + ':' + pad(d.getMinutes()));
}
function fmtMoney(n) { return 'RM ' + Number(n).toFixed(2); }
function showtimeStart(st) {
  var d = st.date.split('-'), t = st.time.split(':');
  return new Date(+d[0], +d[1] - 1, +d[2], +t[0], +t[1]);
}

function findMovie(id) {
  var list = getMovies();
  for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
  return null;
}
function findShowtime(id) {
  var list = getShowtimes();
  for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
  return null;
}
function findTicket(id) {
  var list = getTickets();
  for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
  return null;
}

function takenSeats(showtimeId) {
  var out = [];
  var t = getTickets();
  for (var i = 0; i < t.length; i++) if (t[i].showtimeId === showtimeId) out = out.concat(t[i].seats);
  return out;
}
function ticketsSoldForMovie(movieId) {
  var n = 0;
  var t = getTickets();
  for (var i = 0; i < t.length; i++) if (t[i].movieId === movieId) n += t[i].seats.length;
  return n;
}
function allSeats() {
  var out = [];
  SEAT_ROWS.forEach(function (r) {
    for (var n = 1; n <= SEATS_PER_ROW; n++) out.push(r + n);
  });
  return out;
}

function posterTag(m) {
  return (m && m.poster) ? '<img src="' + esc(m.poster) + '" alt="" onerror="this.style.opacity=0">' : '';
}

function trailerHtml(url) {
  if (!url) return '<div class="trailer-video notrailer">no trailer</div>';
  var iframeSrcMatch = url.match(/src=["'](https?:\/\/[^"']+)["']/i);
  if (iframeSrcMatch) url = iframeSrcMatch[1];
  if (url.indexOf('youtube.com/embed/') >= 0) {
    return '<iframe class="trailer-video" src="' + esc(url) + '" allowfullscreen style="border:0;"></iframe>';
  }
  var ytIdMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/i);
  if (ytIdMatch) {
    return '<iframe class="trailer-video" src="https://www.youtube.com/embed/' + ytIdMatch[1] + '" allowfullscreen style="border:0;"></iframe>';
  }
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
    return '<video class="trailer-video" src="' + esc(url) + '" controls></video>';
  }
  return '<div class="trailer-video notrailer"><a class="btn" href="' + esc(url) + '" target="_blank">Watch Trailer</a></div>';
}

var ADMIN_NAMES = ['admin', 'admin1', 'admin2', 'admin3'];
var ADMIN_PASSWORD = 'admin123';

function hashPass(username, password) {
  var p = 'cinemaxx:' + username.toLowerCase() + ':' + password;
  var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (var i = 0; i < p.length; i++) {
    var ch = p.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

function findAccount(username) {
  var list = getAccounts();
  for (var i = 0; i < list.length; i++) {
    if (list[i].username.toLowerCase() === username.toLowerCase()) return list[i];
  }
  return null;
}

function register() {
  var userEl = document.getElementById('username');
  var passEl = document.getElementById('password');
  var confEl = document.getElementById('confirm');
  var msg = document.getElementById('msg');
  msg.style.color = '';

  clearInputErrors([userEl, passEl, confEl]);

  var user = userEl.value.trim();
  var pass = passEl.value;
  var confirmPass = confEl.value;

  if (user === '' || pass === '' || confirmPass === '') {
    highlightErrorFields([userEl, passEl, confEl].filter(function(el) { return el.value === ''; }));
    msg.innerText = 'Please fill in every field'; 
    return; 
  }
  if (!/^[A-Za-z0-9_]{3,20}$/.test(user)) {
    highlightErrorFields([userEl]);
    msg.innerText = 'Username must be 3-20 letters, numbers or _'; 
    return; 
  }
  if (ADMIN_NAMES.indexOf(user.toLowerCase()) >= 0 || findAccount(user)) {
    highlightErrorFields([userEl]);
    msg.innerText = 'That username is already taken'; 
    return; 
  }
  if (pass.length < 6) {
    highlightErrorFields([passEl]);
    msg.innerText = 'Password must be at least 6 characters'; 
    return; 
  }
  if (pass !== confirmPass) {
    highlightErrorFields([passEl, confEl]);
    msg.innerText = 'Passwords do not match'; 
    return; 
  }

  var list = getAccounts();
  list.push({ username: user, pass: hashPass(user, pass), created: new Date().toISOString() });
  if (!save('accounts', list)) return;

  window.location.href = 'login.html?registered=1';
}

function login() {
  var userEl = document.getElementById('username');
  var passEl = document.getElementById('password');
  var msg = document.getElementById('msg');
  msg.style.color = '';

  clearInputErrors([userEl, passEl]);

  var user = userEl.value.trim();
  var pass = passEl.value;

  if (user === '' || pass === '') {
    highlightErrorFields([userEl, passEl].filter(function(el) { return el.value === ''; }));
    msg.innerText = 'Please enter username and password'; 
    return; 
  }

  var key = user.toLowerCase();

  if (ADMIN_NAMES.indexOf(key) >= 0) {
    if (pass !== ADMIN_PASSWORD) {
      highlightErrorFields([userEl, passEl]);
      msg.innerText = 'Wrong username or password'; 
      return; 
    }
    localStorage.setItem('user', key);
    localStorage.setItem('role', 'admin');
    window.location.href = 'adminmenu.html';
    return;
  }

  var acc = findAccount(user);
  if (!acc || acc.pass !== hashPass(acc.username, pass)) {
    highlightErrorFields([userEl, passEl]);
    msg.innerText = 'Wrong username or password'; 
    return; 
  }

  localStorage.setItem('user', acc.username);
  localStorage.setItem('role', 'user');
  window.location.href = 'index.html';
}

function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  localStorage.removeItem('booking');
  window.location.href = 'login.html';
}

function userOnly() {
  if (!localStorage.getItem('user')) {
    document.body.style.display = 'none';
    window.addEventListener('DOMContentLoaded', function() {
      document.body.style.display = 'block';
      showAlert(
        'Authentication Required', 
        'Log in first to access this menu.', 
        function() {
          window.location.href = 'login.html';
        }
      );
    });
  }
}

function adminOnly() {
  if (localStorage.getItem('role') !== 'admin') {
    window.location.href = 'login.html';
  }
}

function startClock() {
  var el = document.getElementById('clock');
  if (!el) return;
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function tick() {
    var d = new Date();
    var h = d.getHours();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12; if (h === 0) h = 12;
    el.innerText = days[d.getDay()] + ', ' + d.getDate() + ' ' + MONTH_NAMES[d.getMonth()] + ' ' + d.getFullYear() +
                   ' | ' + h + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + ' ' + ampm;
  }
  tick();
  setInterval(tick, 1000);
}

function doSearch() {
  var q = document.getElementById('searchbox').value.trim();
  window.location.href = 'index.html' + (q ? '?search=' + encodeURIComponent(q) : '');
}

function movieSide(m, extra) {
  var dash = function (v) { return v ? esc(v) : '-'; };
  return '<div class="sideposter">' + posterTag(m) + '</div>' +
    '<h2>' + esc(m.title) + '</h2>' +
    (m.rating ? '<span class="rating small">' + esc(m.rating) + '</span>' : '') +
    '<div class="sidedetails">' +
      '<p><span>Release Date</span>' + (m.releaseDate ? fmtDate(m.releaseDate) : '-') + '</p>' +
      '<p><span>Running Time</span>' + (m.runtime ? m.runtime + ' min' : '-') + '</p>' +
      '<p><span>Genre</span>' + dash(m.genre) + '</p>' +
      '<p><span>Language</span>' + dash(m.language) + '</p>' +
      '<p><span>Subtitles</span>' + dash(m.subtitles) + '</p>' +
    '</div>' + (extra || '');
}

var FOOTER_INFO = { address: 'Cinemaxx Central, Kuala Lumpur, Malaysia', hours: '10:00 AM - 12:00 AM', contact: '+60 3-1234 5678' };

function renderFooter() {
  if (document.getElementById('clock') || document.body.classList.contains('center-page')) return;
  var f = document.createElement('footer');
  f.className = 'sitefooter';
  f.innerHTML =
    '<div class="footgrid">' +
      '<div><h4>CINEMAXX</h4><p>Book your seats online.</p></div>' +
      '<div><h4>Quick Links</h4><a href="index.html">Movies</a><a href="myhistory.html">My History</a></div>' +
      '<div><h4>Visit Us</h4>' +
        '<p>Address: ' + esc(FOOTER_INFO.address) + '</p>' +
        '<p>Opening Hours: ' + esc(FOOTER_INFO.hours) + '</p>' +
        '<p>Contact: ' + esc(FOOTER_INFO.contact) + '</p></div>' +
    '</div>' +
    '<p class="footcopy">&copy; ' + new Date().getFullYear() + ' CINEMAXX. All rights reserved.</p>';
  document.body.appendChild(f);
  var fb = document.querySelector('.booknow, .confirmbtn');
  if (fb && fb.style.display !== 'none') f.classList.add('fixedbtnspace');
}

function setupCustomModal() {
  if (document.getElementById('custom-modal')) return;
  var modalOverlay = document.createElement('div');
  modalOverlay.id = 'custom-modal';
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = 
    '<div class="modal-content">' +
      '<h2 id="modal-title">Notification</h2>' +
      '<p id="modal-text">Something happened.</p>' +
      '<button class="modal-close-btn" onclick="closeCustomModal()">OK</button>' +
    '</div>';
  document.body.appendChild(modalOverlay);
}

function showAlert(title, text, onConfirm) {
  setupCustomModal();
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-text').innerText = text;
  var overlay = document.getElementById('custom-modal');
  overlay.classList.add('show');
  var closeBtn = overlay.querySelector('.modal-close-btn');
  closeBtn.onclick = function() {
    closeCustomModal();
    if (onConfirm) onConfirm();
  };
}

function closeCustomModal() {
  var overlay = document.getElementById('custom-modal');
  if (overlay) overlay.classList.remove('show');
}

window.alert = function(msg) {
  showAlert('Notification', msg);
};

function highlightActiveNavLinks() {
  var currentPath = window.location.pathname.split('/').pop().toLowerCase();
  if (currentPath === '') currentPath = 'index.html';
  var navLinks = document.querySelectorAll('.nav nav a');
  navLinks.forEach(function(link) {
    var hrefPath = link.getAttribute('href').split('/').pop().toLowerCase();
    if (hrefPath === currentPath) {
      link.classList.add('active-nav-link');
    } else {
      link.classList.remove('active-nav-link');
    }
  });
}

function highlightErrorFields(elements) {
  elements.forEach(function(el) {
    if (!el) return;
    el.classList.add('input-error');
    var resetHandler = function() {
      el.classList.remove('input-error');
      el.removeEventListener('input', resetHandler);
      el.removeEventListener('change', resetHandler);
    };
    el.addEventListener('input', resetHandler);
    el.addEventListener('change', resetHandler);
  });
}

function clearInputErrors(elements) {
  elements.forEach(function(el) {
    if (el) el.classList.remove('input-error');
  });
}

// ============================================================
// AUTOMATIC SHOWTIME & TICKET SALES RANDOMIZERS
// ============================================================
function generateRandomShowtimes() {
  var movies = getMovies();
  if (movies.length === 0) return;

  var showtimesList = [];
  var halls = [1, 2, 3, 4, 5];
  var times = ["11:00", "14:30", "18:00", "21:30"];
  var experiences = ["2D", "IMAX", "3D"];

  for (var dayOffset = 0; dayOffset < 7; dayOffset++) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + dayOffset);
    var dateString = dateKey(currentDate);

    halls.forEach(function (hallNum) {
      times.forEach(function (timeSlot) {
        var randomMovie = movies[Math.floor(Math.random() * movies.length)];
        var randomExp = experiences[Math.floor(Math.random() * experiences.length)];
        var ticketPrice = 14.00;
        if (randomExp === "3D") ticketPrice = 18.00;
        if (randomExp === "IMAX") ticketPrice = 24.00;

        showtimesList.push({
          id: genId("ST"),
          movieId: randomMovie.id,
          hall: hallNum,
          exp: randomExp,
          date: dateString,
          time: timeSlot,
          price: ticketPrice
        });
      });
    });
  }
  saveShowtimes(showtimesList);
  console.log("Auto-seeded " + showtimesList.length + " showtimes for the next 7 days!");
}

function generateRandomTickets() {
  var showtimes = getShowtimes();
  if (showtimes.length === 0) return;

  var mockUsers = ["cust1", "cust2", "cust3", "mickey123", "angel_line", "neo_anderson", "pro_jason", "sarah_lim", "john_smith"];
  var ticketList = [];
  var allSeatCodes = [];
  
  SEAT_ROWS.forEach(function(r) {
    for (var n = 1; n <= SEATS_PER_ROW; n++) {
      allSeatCodes.push(r + n);
    }
  });

  showtimes.forEach(function(st) {
    if (Math.random() > 0.4) { // 60% chance showtime has sales
      var seatsCount = Math.floor(Math.random() * 10) + 3; // 3 to 12 seats sold
      var shuffledSeats = allSeatCodes.slice().sort(function() { return 0.5 - Math.random(); });
      var bookedSeats = shuffledSeats.slice(0, seatsCount);

      var user1 = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      var user2 = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      
      var splitIndex = Math.ceil(bookedSeats.length / 2);
      var seats1 = bookedSeats.slice(0, splitIndex);
      var seats2 = bookedSeats.slice(splitIndex);

      if (seats1.length > 0) {
        var cost1 = seats1.length * st.price;
        ticketList.push({
          id: genId("TK"),
          user: user1,
          username: user1,
          showtimeId: st.id,
          movieId: st.movieId,
          seats: seats1,
          price: st.price,
          total: cost1,
          totalPaid: cost1,
          created: st.date             // FIX: Spreads tickets across 7 days for the chart!
        });
      }

      if (seats2.length > 0 && user1 !== user2) {
        var cost2 = seats2.length * st.price;
        ticketList.push({
          id: genId("TK"),
          user: user2,
          username: user2,
          showtimeId: st.id,
          movieId: st.movieId,
          seats: seats2,
          price: st.price,
          total: cost2,
          totalPaid: cost2,
          created: st.date             // FIX: Spreads tickets across 7 days for the chart!
        });
      }
    }
  });

  saveTickets(ticketList);
  console.log("Auto-seeded " + ticketList.length + " mock seat bookings across your schedule!");
}


// Window Loader & Database initialization checks
window.addEventListener('load', function () {
  var sb = document.getElementById('searchbox');
  if (sb && qs('search')) sb.value = qs('search');

  var btn = document.getElementById('authbtn');
  if (btn && localStorage.getItem('user')) {
    btn.innerText = 'Logout';
    btn.href = '#';
    btn.onclick = logout;
  }
  
  setupCustomModal();
  highlightActiveNavLinks();
  startClock();
  renderFooter();

  // Run Auto-Seeding checks after ensuring helper functions are loaded
  try {
    var existingShowtimes = load('showtimes', []);
    if (existingShowtimes.length === 0) {
      generateRandomShowtimes();
    }
    var existingTickets = load('tickets', []);
    if (existingTickets.length === 0) {
      generateRandomTickets();
    }
  } catch (e) {
    console.error("Auto-seeding error:", e);
  }
});
