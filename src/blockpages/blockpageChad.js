let quotes = [
  ["Jordan Peterson", "The masculine spirit is under assault. It’s obvious."],
  [
    "Jordan Peterson",
    "Once someone has spent enough time cultivating bad habits and biding their time, they are much diminished. Much of what they could have been has dissipated.",
  ],
  [
    "Jordan Peterson",
    "Can you imagine yourself in 10 years if, instead of avoiding the things you know you should do, you actually did them every single day? That’s powerful.",
  ],
  [
    "Jordan Peterson",
    "The successful among us delay gratification. The successful among us bargain with the future.",
  ],
  [
    "Jordan Peterson",
    "Don't compare yourself with other people; compare yourself with who you were yesterday.",
  ],
  [
    "Jordan Peterson",
    "To suffer terribly and to know yourself as the cause: that is Hell.",
  ],
  ["Jordan Peterson", "Dare to be dangerous."],
  ["Batman", "I have one power. I never give up."],
  ["Superman", "Dreams save us."],
  ["James Bond", "Bond. James Bond."],
  [
    "Elon Musk",
    "Persistence is very important. You should not give up unless you are forced to give up.",
  ],
  [
    "Elon Musk",
    "I think it is possible for ordinary people to choose to be extraordinary.",
  ],
  [
    "Elon Musk",
    "If humanity doesn't land on Mars in my lifetime, I would be very disappointed.",
  ],
  [
    "Ramsay Bolton",
    "If you think this has a happy ending you haven't been paying attention.",
  ],
  ["Spiderman", "With great power comes great responsibility."],
  [
    "Lord of the Rings",
    "Precious, precious, precious!’ Gollum cried. ‘My Precious! O my Precious!",
  ],
  ["Gollum", "My precious."],
  ["Samwise Gamgee", "Wake up, Mr. Frodo!"],
  [
    "Lord of the Rings",
    "You are wise and powerful. Will you not take the Ring?” “No!” cried Gandalf, springing to his feet. “With that power I should have power too great and terrible. And over me the Ring would gain a power still greater and more deadly.",
  ],
  [
    "Marcus Aurelius",
    "Do every act of your life as though it were the very last act of your life.",
  ],
  [
    "Marcus Aurelius",
    "You have power over your mind — not outside events. Realize this, and you will find strength.",
  ],
  ["Marcus Aurelius", "If it is not right do not do it."],
  [
    "Yukio Mishima",
    "The special quality of hell is to see everything clearly down to the last detail.",
  ],
  [
    "Yukio Mishima",
    "The instant that the blade tore open his flesh, the bright disk of the sun soared up and exploded behind his eyelids.",
  ],
  ["Yukio Mishima", "Human life is limited but I would like to live forever."],
  ["", ""],
  ["", ""],
  ["", ""],
];

let rand = Math.floor(Math.random() * quotes.length);
let randImage = Math.floor(Math.random() * 6);
let blockingType = 3;

console.log("rand", rand);
console.log("length", quotes.length);
console.log(quotes[rand]);

document.getElementById("quote").innerHTML = quotes[rand][1];
document.getElementById("author").innerHTML = quotes[rand][0];

if (blockingType == 3) {
  switch (randImage) {
    case 0:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall0.jpg)";
      break;
    case 1:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall1.jpg)";
      break;
    case 2:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall2.jpg)";
      break;
    case 3:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall3.jpg)";
      break;
    case 4:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall4.jpg)";
      break;
    case 5:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall5.jpg)";
      break;
    case 6:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall6.jpg)";
      break;
  }
} else if (blockingType == 4) {
  switch (randImage) {
    case 0:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall0r.jpg)";
      break;
    case 1:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall1r.jpg)";
      break;
    case 2:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall2r.jpg)";
      break;
    case 3:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall3r.jpg)";
      break;
    case 4:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall4r.jpg)";
      break;
    case 5:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall5r.jpg)";
      break;
    case 6:
      document.getElementById("imageid").style.backgroundImage =
        "url(./blockChads/wall6r.jpg)";
      break;
  }
}

// var text = document.getElementById('quote');
// var newDom = '';
// var animationDelay = 6;

// for(let i = 0; i < text.innerText.length; i++)
// {
//     newDom += '<span class="char">' + (text.innerText[i] == ' ' ? '&nbsp;' : text.innerText[i])+ '</span>';
// }

// text.innerHTML = newDom;
// var length = text.children.length;

// for(let i = 0; i < length; i++)
// {
//     text.children[i].style['animation-delay'] = animationDelay * i + 'ms';
// }
