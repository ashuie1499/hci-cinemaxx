// ============================================================
// CINEMAXX Master Database Seed File
// Contains your exact 14 custom movies + 4 upcoming movies + default logins!
// ============================================================

var DEFAULT_MOVIES = [
  {
    id: "mMV8UFAVF497",
    title: "Avengers: Infinity War",
    status: "now",
    rating: "PG-13",
    releaseDate: "2018-04-27",
    runtime: 149,
    genre: "Superhero",
    language: "English",
    subtitles: "Malay",
    classification: "U",
    synopsis: "Iron Man, Thor, the Hulk and the rest of the Avengers unite to battle their most powerful enemy yet -- the evil Thanos. On a mission to collect all six Infinity Stones, Thanos plans to use the artifacts to inflict his twisted will on reality. The fate of the planet and existence itself has never been more uncertain as everything the Avengers have fought for has led up to this moment.",
    director: "Anthony Russo, Joe Russo",
    cast: "Robert Downey JR., Chris Evans, Chris Hemsworth, Josh Brolin, Mark Rufallo",
    trailer: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
    poster: "media/movie1.jpg"
  },
  {
    id: "mMV8V2CRF815",
    title: "Avengers: Endgame",
    status: "now",
    rating: "PG-13",
    releaseDate: "2019-04-26",
    runtime: 190,
    genre: "Superhero",
    language: "English",
    subtitles: "Malay",
    classification: "U",
    synopsis: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos, the evil demigod who decimated the planet and the universe.",
    director: "Anthony Russo, Joe Russo",
    cast: "Robert Downey Jr., Chris Evans, Chris Hemsworth, Josh Brolin, Mark Ruffalo",
    trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    poster: "media/movie2.jpg"
  },
  {
    id: "mMV8V7057427",
    title: "Spider-Man: Brand New Day",
    status: "now",
    rating: "PG-13",
    releaseDate: "2026-07-31",
    runtime: 145,
    genre: "Superhero",
    language: "English",
    subtitles: "Malay",
    classification: "U",
    synopsis: "It's a BRAND NEW DAY for Peter Parker. Fighting crime full-time as Spider-Man in a world that doesn't remember him -- and the pressure of seeing his old friends move on without him -- sparks a change in Peter he may not have the power to control. But that transformation might also be the only thing that can stop a shocking new threat to the city and those he loves -- a powerful villain no one can even see. The world may have forgotten Peter Parker, but he hasn't forgotten them.",
    director: "Destin Daniel Cretton",
    cast: "Tom Holland, Zendaya, Sadie Sink",
    trailer: "https://www.youtube.com/watch?v=8TZMtslA3UY",
    poster: "media/movie3.jpg"
  },
  {
    id: "mMV8VYYM3418",
    title: "The Odyssey",
    status: "now",
    rating: "R",
    releaseDate: "2026-07-17",
    runtime: 172,
    genre: "Adventure",
    language: "English",
    subtitles: "Malay",
    classification: "18",
    synopsis: "Odysseus, king of Ithaca, embarks on a perilous journey to return home after the Trojan War. Crossing the Mediterranean Sea with his fellow soldiers, they soon find themselves battling not only the elements, but an array of deadly obstacles and mythical creatures along the way.",
    director: "Christopher Nolan",
    cast: "Matt Damon, Anne Hathaway",
    trailer: "https://www.youtube.com/watch?v=Mzw2ttJD2qQ",
    poster: "media/movie4.jpg"
  },
  {
    id: "mMV8W2P0Z909",
    title: "Superman",
    status: "now",
    rating: "PG-13",
    releaseDate: "2025-07-09",
    runtime: 129,
    genre: "Superhero",
    language: "English",
    subtitles: "Malay",
    classification: "U",
    synopsis: "When Superman gets drawn into conflicts at home and abroad, his actions are questioned, giving tech billionaire Lex Luthor the opportunity to get the Man of Steel out of the way for good. Will intrepid reporter Lois Lane and Superman's four-legged companion, Krypto, be able to help him before it's too late?",
    director: "James Gunn",
    cast: "David Correnswet, Nicholas Hoult, Rachel Briosnahan",
    trailer: "https://www.youtube.com/watch?v=Ox8ZLF6cGM0",
    poster: "media/movie5.jpg"
  },
  {
    id: "mMV8W83WJ769",
    title: "Your Name.",
    status: "now",
    rating: "PG",
    releaseDate: "2016-08-26",
    runtime: 106,
    genre: "Anime, Romance",
    language: "Japan",
    subtitles: "Malay, English",
    classification: "U",
    synopsis: "One morning, rural schoolgirl Mitsuha and city kid Taki awaken to discover that they've switched bodies. The total strangers struggle to navigate each other's lives, walking tightropes of intimacy and distance. But when they finally resolve to meet, the true nature of their connection threatens to seal their fate.",
    director: "Makoto Shinkai",
    cast: "Taki Tachibana, Mitsuha miyamizu",
    trailer: "https://www.youtube.com/watch?v=xU47nhruN-Q",
    poster: "media/movie6.jpg"
  },
  {
    id: "mMV8WC1P7328",
    title: "Avatar: Fire and Ash",
    status: "now",
    rating: "PG-13",
    releaseDate: "2025-12-19",
    runtime: 192,
    genre: "Sci-Fi, Fantasy, Adventure",
    language: "English",
    subtitles: "Malay",
    classification: "P13",
    synopsis: "With \"Avatar: Fire and Ash,\" James Cameron takes audiences back to Pandora in an immersive new adventure with Marine turned Na'vi leader Jake Sully (Sam Worthington), Na'vi warrior Neytiri (Zoe Saldaña), and the Sully family.",
    director: "James Cameron",
    cast: "Sam Worthington, Zoe Saldana",
    trailer: "https://www.youtube.com/watch?v=nb_fFj_0rq8",
    poster: "media/movie7.jpg"
  },
  {
    id: "mMV8WG1FV555",
    title: "Obsession",
    status: "now",
    rating: "R",
    releaseDate: "2026-05-15",
    runtime: 108,
    genre: "Horror, Mystery & Thriller",
    language: "English",
    subtitles: "Malay",
    classification: "18",
    synopsis: "After breaking the mysterious \"One Wish Willow\" to win his crush's heart, a hopeless romantic finds himself getting exactly what he asked for but soon discovers that some desires come at a dark, sinister price.",
    director: "Curry Barker",
    cast: "Michael Johnston, Inde Navarrette",
    trailer: "https://www.youtube.com/watch?v=gMC8kkwbIQQ",
    poster: "media/movie8.jpg"
  },
  {
    id: "mMV8WK5N8998",
    title: "Oppenheimer",
    status: "now",
    rating: "R",
    releaseDate: "2023-07-21",
    runtime: 180,
    genre: "Biography, History, Drama",
    language: "English",
    subtitles: "Malay",
    classification: "18",
    synopsis: "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
    director: "Christopher Nolan",
    cast: "Cillian Murphy",
    trailer: "https://www.youtube.com/watch?v=bK6ldnjE3Y0",
    poster: "media/movie9.jpg"
  },
  {
    id: "mMV8WOSIJ111",
    title: "Frozen",
    status: "now",
    rating: "PG",
    releaseDate: "2013-11-27",
    runtime: 102,
    genre: "Kids & Family, Musical, Fantasy, Animation",
    language: "English",
    subtitles: "Malay",
    classification: "U",
    synopsis: "When their kingdom becomes trapped in perpetual winter, fearless Anna (Kristen Bell) joins forces with mountaineer Kristoff (Jonathan Groff) and his reindeer sidekick to find Anna's sister, Snow Queen Elsa (Idina Menzel), and break her icy spell. Although their epic journey leads them to encounters with mystical trolls, a comedic snowman (Josh Gad), harsh conditions, and magic at every turn, Anna and Kristoff bravely push onward in a race to save their kingdom from winter's cold grip.",
    director: "Chris Buck, Jennfer Lee",
    cast: "Kristen Bell, Idina Menzel, Johnathan Groff, Josh Gad",
    trailer: "https://www.youtube.com/watch?v=TbQm5doF_Uc",
    poster: "media/movie10.jpg"
  },
  {
    id: "mMV8WSG0B184",
    title: "Toy Story 5",
    status: "now",
    rating: "PG",
    releaseDate: "2026-06-19",
    runtime: 102,
    genre: "Kids & Family, Comedy, Animation",
    language: "English",
    subtitles: "Malay",
    classification: "U",
    synopsis: "The toys are back in Disney and Pixar's \"Toy Story 5,\" and this time it's Toy meets Tech. Woody (voice of Tom Hanks), Buzz Lightyear (voice of Tim Allen), Jessie (voice of Joan Cusack) and the rest of the gang's jobs are challenged when they come face-to-face with Lilypad (voice of Greta Lee), a brand-new tablet device that arrives with her own disruptive ideas about what is best for their kid, Bonnie. Will playtime ever be the same?",
    director: "Andrew Stanton",
    cast: "Tom Hanks, Tim Allen",
    trailer: "https://www.youtube.com/watch?v=c51ND9Hdbw0",
    poster: "media/movie11.jpg"
  },
  {
    id: "mMV8WVQ7H897",
    title: "Colony",
    status: "now",
    rating: "R",
    releaseDate: "2026-05-21",
    runtime: 122,
    genre: "Horror, Action",
    language: "Korean",
    subtitles: "English, Malay",
    classification: "18",
    synopsis: "Horror master Yeon Sang-ho (Train to Busan) directs a new Korean zombie thriller starring Gianna Jun and Koo Kyo-hwan. Professor Se-jeong (Jun) is thrust into a bloody nightmare when a rapidly mutating virus is released during a biotech conference causing authorities to seal the facility. Trapped inside with no escape, Se-jeong along with a small group of survivors must fight to stay alive while the infected undergo horrific transformations.",
    director: "Yeon Sang-ho",
    cast: "Jun Ji-hyun",
    trailer: "https://www.youtube.com/watch?v=RjdGmIUbYIQ",
    poster: "media/movie12.jpg"
  },
  {
    id: "mMV8WZEYS736",
    title: "Black Clover: Sword of the Wizard King",
    status: "now",
    rating: "PG",
    releaseDate: "2023-06-16",
    runtime: 110,
    genre: "Anime, Fantasy, Action",
    language: "Japan",
    subtitles: "English, Malay",
    classification: "U",
    synopsis: "In a world where magic is everything, Asta, a boy who was born with no magic, aims to become the \"Wizard King,\" to overcome adversity, prove his power, and keep his oath with his friends.",
    director: "Yuki Tabata",
    cast: "Asta, Yuno, Noelle, Yami",
    trailer: "https://www.youtube.com/watch?v=PrgxJ1_sUcs",
    poster: "media/movie13.jpg"
  },
  {
    id: "mMV8X8HDH764",
    title: "Star Wars: The Mandalorian and Grogu",
    status: "now",
    rating: "PG-13",
    releaseDate: "2026-05-22",
    runtime: 132,
    genre: "Sci-Fi, Adventure, Action, Fantasy",
    language: "English",
    subtitles: "Malay",
    classification: "U",
    synopsis: "The evil Empire has fallen, and Imperial warlords remain scattered throughout the galaxy. As the fledgling New Republic works to protect everything the Rebellion fought for, they have enlisted the help of legendary Mandalorian bounty hunter Din Djarin (Pedro Pascal) and his young apprentice Grogu.",
    director: "Jon Favreau",
    cast: "Pedro Pascal",
    trailer: "https://www.youtube.com/watch?v=IHWlvwu8t1w",
    poster: "media/movie14.jpg"
  },
  
  // ============================================================
  // UPCOMING MOVIES ADDED (status: "soon")
  // ============================================================
  {
    id: "mMV9QDJY4323",
    title: "Avengers: Doomsday",
    status: "soon",
    rating: "PG-13",
    releaseDate: "2026-12-18",
    runtime: 165,
    genre: "Superhero, Sci-Fi, Adventure, Action, Fantasy",
    language: "English",
    subtitles: "Malay",
    classification: "",
    synopsis: "Universes collide and the Multiverse Saga begins its final chapter in Marvel Studios' Avengers: Doomsday. Beloved heroes from three distinct universes will be set on a deadly collision course and ultimately face an existential threat unlike anything they've ever encountered. This epic film will lay the foundation for the future of the Marvel Cinematic Universe. See it in Infinity Vision, the way it's meant to be seen, on bigger, brighter and more immersive screens.",
    director: "Anthony Russo, Joe Russo",
    cast: "Robert Downey Jr., Chris Evans, Chris Hemsworth, Mark Ruffalo",
    trailer: "https://www.youtube.com/watch?v=irVNGjRFZGk",
    poster: "media/upmovie1.jpg"
  },
  {
    id: "mMV9QJNNA834",
    title: "Dune: Part Three",
    status: "soon",
    rating: "PG-13",
    releaseDate: "2026-12-18",
    runtime: 120,
    genre: "Sci-Fi, Adventure, Action, Fantasy",
    language: "English",
    subtitles: "Malay",
    classification: "",
    synopsis: "Dune: Part Three is set nearly two decades after Paul Atreides seized control of the Imperium. Now a ruthless Emperor, Paul must face the consequences of his reign as old allies return, terrifying new threats emerge, and betrayal lurks in every shadow. Haunted by visions of Imperial collapse and the reappearance of his long-lost love, Paul is drawn into a sweeping conspiracy, with Chani at the heart of its unfolding mystery. As rebellion brews and enemies close in, Paul must confront the true cost of power and the fate of those he loves the most.",
    director: "Denis Villeneuve",
    cast: "Timothée Chalamet, Zendaya",
    trailer: "https://www.youtube.com/watch?v=NdvqHc56lE0",
    poster: "media/upmovie2.jpg"
  },
  {
    id: "mMV9QNLWT608",
    title: "Narnia: The Magician's Nephew",
    status: "soon",
    rating: "PG",
    releaseDate: "2027-02-12",
    runtime: 60,
    genre: "Fantasy, Adventure",
    language: "English",
    subtitles: "Malay",
    classification: "",
    synopsis: "Academy Award-nominated filmmaker Greta Gerwig brings C. S. Lewis' beloved story The Magician's Nephew to the screen for the first time in a sweeping adventure that invites dreamers of all ages to experience the creation of Narnia.",
    director: "Greta Gerwig",
    cast: "TBA",
    trailer: "https://www.youtube.com/watch?v=gDJ-ini7fF0",
    poster: "media/upmovie3.jpg"
  },
  {
    id: "mMV9QQWMB268",
    title: "Shrek 5",
    status: "soon",
    rating: "PG",
    releaseDate: "2027-06-30",
    runtime: 60,
    genre: "Kids & Family, Comedy, Adventure, Animation, Fantasy",
    language: "English",
    subtitles: "Malay",
    classification: "",
    synopsis: "Shrek and Donkey embark on a whirlwind, big-city adventure.",
    director: "TBA",
    cast: "TBA",
    trailer: "https://www.youtube.com/watch?v=Swiz1XyfhcI",
    poster: "media/upmovie4.jpg"
  }
];

// ============================================================
// AUTOMATIC SHOWTIME RANDOMIZER & SEEDER
// ============================================================
function generateRandomShowtimes() {
  var movies = typeof getMovies === 'function' ? getMovies() : (typeof DEFAULT_MOVIES !== 'undefined' ? DEFAULT_MOVIES : []);
  if (movies.length === 0) return;

  var showtimesList = [];
  var halls = [1, 2, 3, 4, 5];
  var times = ["11:00", "14:30", "18:00", "21:30"];
  var experiences = ["2D", "IMAX", "3D"];

  // Helper date function in case script.js hasn't loaded yet
  function toDateKey(d) {
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }

  // Generate showtimes for the next 7 days starting from today
  for (var dayOffset = 0; dayOffset < 7; dayOffset++) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + dayOffset);
    var dateString = toDateKey(currentDate);

    halls.forEach(function (hallNum) {
      times.forEach(function (timeSlot) {
        // 1. Pick a random movie from your 14 movies
        var randomMovie = movies[Math.floor(Math.random() * movies.length)];

        // 2. Pick a random cinema experience
        var randomExp = experiences[Math.floor(Math.random() * experiences.length)];

        // 3. Set realistic pricing
        var ticketPrice = 14.00;
        if (randomExp === "3D") ticketPrice = 18.00;
        if (randomExp === "IMAX") ticketPrice = 24.00;

        // 4. Create unique showtime record
        var stId = 'ST' + Date.now().toString(36).toUpperCase() + Math.floor(Math.random() * 10000);
        showtimesList.push({
          id: stId,
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

  // Save directly to localStorage
  try {
    localStorage.setItem('showtimes', JSON.stringify(showtimesList));
    console.log("Auto-seeded " + showtimesList.length + " showtimes for the next 7 days!");
  } catch (e) {
    console.error("Could not auto-seed showtimes:", e);
  }
}

// Automatically check and seed if showtimes are empty
(function autoSeedShowtimesCheck() {
  try {
    var existingShowtimes = JSON.parse(localStorage.getItem('showtimes') || '[]');
    if (existingShowtimes.length === 0) {
      generateRandomShowtimes();
    }
  } catch (e) {
    generateRandomShowtimes();
  }
})();

// Seeded Customer Logins (cust1, cust2, cust3 | Password: cust123)
var DEFAULT_ACCOUNTS = [
  {
    username: "cust1",
    passwordPlain: "cust123", 
    created: new Date().toISOString()
  },
  {
    username: "cust2",
    passwordPlain: "cust123",
    created: new Date().toISOString()
  },
  {
    username: "cust3",
    passwordPlain: "cust123",
    created: new Date().toISOString()
  }
];
