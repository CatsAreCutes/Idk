(() => {
  "use strict";

  const $ = id => document.getElementById(id);

  // Replace this with the actual URL of The Forgotten Arcade.
  const FORGOTTEN_ARCADE_URL = "https://example.com";

  const items = [
    {
      id: "01",
      title: "A cloud with a job",
      icon: "☁️ 😀",
      tag: "odd",
      color: "#dbe8ed",
      description: "It has been assigned to float above one specific house. It takes its job extremely seriously.",
      extra: "EMPLOYEE RECORD\nPosition: Cloud\nDepartment: Weather\nPerformance: Mostly cloudy\nDays off: Never"
    },
    {
      id: "02",
      title: "Rainy afternoon",
      icon: "🌧️",
      tag: "cozy",
      color: "#d6e0ef",
      description: "A window, a blanket, and the sound of rain tapping on the roof. Absolutely nowhere else to be.",
      extra: "CURRENT CONDITIONS\nRain: Gentle\nTea: Optional\nObligations: Postponed\nMood: Excellent"
    },
    {
      id: "03",
      title: "The tiny museum",
      icon: "🏛️",
      tag: "creative",
      color: "#f3d8bc",
      description: "An imaginary museum containing objects that nobody else would think to keep.",
      extra: "TODAY'S EXHIBITION\nOne interesting pebble.\nA receipt from 2009.\nA button with no shirt.\nA drawing made during math class."
    },
    {
      id: "04",
      title: "Extremely suspicious frog",
      icon: "🐸",
      tag: "odd",
      color: "#d9e9c4",
      description: "This frog knows something about the moon. It will not elaborate.",
      extra: "INTERROGATION NOTES\nQuestion: What do you know?\nAnswer: Ribbit.\nQuestion: About the moon?\nAnswer: ...ribbit.\nCase status: UNRESOLVED"
    },
    {
      id: "05",
      title: "The blanket fort",
      icon: "⛺",
      tag: "cozy",
      color: "#ead8e9",
      description: "A highly advanced architectural structure made entirely of blankets and questionable engineering.",
      extra: "BUILDING SPECIFICATIONS\nWalls: 4 blankets\nRoof: 1 bedsheet\nLighting: Fairy lights\nStructural integrity: Depends on the cat"
    },
    {
      id: "06",
      title: "Pocket-sized universe",
      icon: "🌌",
      tag: "odd",
      color: "#d9d6f3",
      description: "A universe so small that its stars look like glitter. Its inhabitants have no idea they're tiny.",
      extra: "COSMIC REPORT\nStars: Too many to count\nGalaxies: 3\nBlack holes: 0\nPopulation: Approximately everyone"
    },
    {
      id: "07",
      title: "A very good pencil",
      icon: "✏️",
      tag: "creative",
      color: "#f3e1a9",
      description: "It draws exactly what you imagine. Unfortunately, it only works on Tuesdays.",
      extra: "USER MANUAL\n1. Hold pencil.\n2. Imagine something.\n3. Draw it.\n4. Wait until Tuesday if it refuses.\n5. Do not sharpen the magic away."
    },
    {
      id: "08",
      title: "Sleepy orange cat",
      icon: "🐈",
      tag: "cozy",
      color: "#f4d4b3",
      description: "A cat that has mastered the ancient art of doing absolutely nothing for six consecutive hours.",
      extra: "DAILY SCHEDULE\n12:00 — Nap\n13:00 — Longer nap\n14:00 — Consider food\n14:01 — Nap\nTomorrow — Repeat"
    },
    {
      id: "09",
      title: "The wrong door",
      icon: "🚪",
      tag: "odd",
      color: "#ead4c8",
      description: "Every time you open it, you find a completely different room. Nobody remembers installing it.",
      extra: "DOOR LOG\nAttempt 1: A library.\nAttempt 2: A swimming pool.\nAttempt 3: A room full of smaller doors.\nAttempt 4: The same room, but everything is upside down."
    },
    {
      id: "10",
      title: "Color collector",
      icon: "🎨",
      tag: "creative",
      color: "#f4c9cc",
      description: "Someone who collects colors that do not have names yet. Their collection is growing rapidly.",
      extra: "LATEST DISCOVERIES\nAlmost-sunset orange.\nThe blue of an old screen.\nThe green of a forgotten place.\nA color that only exists in dreams."
    },
    {
      id: "11",
      title: "Midnight kitchen",
      icon: "🍞",
      tag: "cozy",
      color: "#e8d7c0",
      description: "The kitchen at night, when the refrigerator hums and the floor feels colder than usual.",
      extra: "KITCHEN INVENTORY\nOne glass of water.\nThree mysterious crumbs.\nA suspicious refrigerator noise.\nSomeone's leftover cake."
    },
    {
      id: "12",
      title: "The button",
      icon: "🔴",
      tag: "odd",
      color: "#f0cece",
      description: "A red button with a handwritten note that says: please do not press. There is no other information.",
      extra: "BUTTON REPORT\nColor: Red\nTexture: Smooth\nInstructions: DO NOT PRESS\nPress count: Nobody is talking about that"
    },
    {
      id: "13",
      title: "Cloud-shaped island",
      icon: "🏝️",
      tag: "creative",
      color: "#cce5df",
      description: "A tiny floating island where the trees grow upside down and the ocean hangs in the sky.",
      extra: "TRAVEL GUIDE\nBest season: Whenever\nLocal transport: Floating\nNative wildlife: Probably friendly\nReturn tickets: Not required"
    },
    {
      id: "14",
      title: "A little ghost",
      icon: "👻",
      tag: "cozy",
      color: "#e0e0ed",
      description: "A ghost who is not very good at haunting. It mostly leaves encouraging notes around the house.",
      extra: "RECENT HAUNTINGS\nYou did a good job today.\nDrink some water.\nYour drawing is cool.\nI put the remote on the table."
    },
    {
      id: "15",
      title: "The forgotten arcade",
      icon: "🕹️",
      tag: "creative",
      color: "#d3d1ef",
      description: "An arcade where every machine contains a different little world. One of them is still running.",
      extra: "MACHINE STATUS\nPIXEL RUNNER: Online\nMOON JUMP: Offline\nFROG QUEST: Unknown\nMYSTERY GAME: INSERT COIN"
    }
  ];

  let filter = "all";
  let query = "";
  let current = null;

  function getSaved() {
    try {
      return JSON.parse(
        localStorage.getItem("littleThingsSaved") || "[]"
      );
    } catch {
      return [];
    }
  }

  function setSaved(ids) {
    try {
      localStorage.setItem(
        "littleThingsSaved",
        JSON.stringify(ids)
      );
    } catch {
      // Saving is optional if browser storage is unavailable.
    }
  }

  function render() {
    const saved = getSaved();

    const shown = items.filter(item => {
      const matchesFilter =
        filter === "all" ||
        item.tag === filter ||
        (filter === "saved" && saved.includes(item.id));

      const text = (
        item.title + " " +
        item.description + " " +
        item.tag
      ).toLowerCase();

      return matchesFilter && text.includes(query);
    });

    $("grid").replaceChildren();
    $("empty").style.display = shown.length ? "none" : "block";

    shown.forEach(item => {
      const card = document.createElement("article");
      card.className = "card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Explore " + item.title);

      const visual = document.createElement("div");
      visual.className = "visual";
      visual.style.background = item.color;

      const icon = document.createElement("span");
      icon.textContent = item.icon;
      visual.appendChild(icon);

      const body = document.createElement("div");
      body.className = "cardBody";

      const title = document.createElement("h2");
      title.textContent = item.title;

      const description = document.createElement("p");
      description.textContent = item.description;

      const foot = document.createElement("div");
      foot.className = "cardFoot";

      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = item.tag;

      const save = document.createElement("button");
      const isSaved = saved.includes(item.id);

      save.className = "save" + (isSaved ? " saved" : "");
      save.textContent = isSaved ? "♥ Saved" : "♡ Save";
      save.setAttribute(
        "aria-label",
        (isSaved ? "Remove " : "Save ") + item.title
      );

      save.addEventListener("click", event => {
        event.stopPropagation();

        const list = getSaved();
        const index = list.indexOf(item.id);

        if (index >= 0) {
          list.splice(index, 1);
        } else {
          list.push(item.id);
        }

        setSaved(list);
        render();
      });

      foot.append(tag, save);
      body.append(title, description, foot);
      card.append(visual, body);

      card.addEventListener("click", () => openItem(item));

      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openItem(item);
        }
      });

      $("grid").appendChild(card);
    });
  }

  function openItem(item) {
    current = item;

    $("bigIcon").textContent = item.icon;
    $("detailTag").textContent = "COLLECTION / " + item.id;
    $("detailTitle").textContent = item.title;
    $("detailDescription").textContent = item.description;

    // Show the redirect button only for The Forgotten Arcade.
    $("arcadeBtn").style.display =
      item.id === "15" ? "block" : "none";

    $("surprise").style.display = "none";
    $("surprise").textContent = "";

    $("modal").classList.add("open");
  }

  function randomItem() {
    const choices = items.filter(item =>
      !current || item.id !== current.id
    );

    const collection = choices.length ? choices : items;

    const item = collection[
      Math.floor(Math.random() * collection.length)
    ];

    openItem(item);
  }

  $("newBtn").addEventListener("click", randomItem);
  $("newBtn2").addEventListener("click", randomItem);

  $("close").addEventListener("click", () => {
    $("modal").classList.remove("open");
  });

  // Redirect to The Forgotten Arcade when its button is clicked.
  $("arcadeBtn").addEventListener("click", () => {
    window.location.href = FORGOTTEN_ARCADE_URL;
  });

  $("modal").addEventListener("click", event => {
    if (event.target === $("modal")) {
      $("modal").classList.remove("open");
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      $("modal").classList.remove("open");
    }
  });

  $("filters").querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      filter = button.dataset.filter;

      $("filters").querySelectorAll("button").forEach(other => {
        other.classList.toggle("active", other === button);
      });

      render();
    });
  });

  $("search").addEventListener("input", event => {
    query = event.target.value.toLowerCase().trim();
    render();
  });

  function updateClock() {
    $("clock").textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  updateClock();
  setInterval(updateClock, 1000);

  render();
})();
