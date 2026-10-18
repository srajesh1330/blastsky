export interface Block {
  h?: string;
  p?: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  blocks: Block[];
}

export const ARTICLES: Article[] = [
  {
    slug: "how-fireworks-work",
    title: "How Fireworks Work: Inside an Aerial Shell",
    description:
      "A plain-language look inside an aerial firework shell: the stars, the burst charge, the fuse and the lift charge, and why you see the flash before you hear the boom.",
    date: "2026-10-10",
    blocks: [
      {
        p: [
          "Every big firework you see in the sky starts as a small, carefully packed ball or cylinder called a shell. A shell is basically a delivery system: it carries glowing pellets high into the air, then opens at exactly the right moment. Understanding what is inside makes every show more fun to watch.",
        ],
      },
      {
        h: "The parts of a shell",
        list: [
          "The casing: a strong shell of layered paper or cardboard that holds everything together until it bursts.",
          "The stars: small pellets that burn with colour and light. These are what you actually see glowing in the sky.",
          "The burst charge: a powder packed in the middle or around the stars. When it ignites it breaks the casing open and throws the stars outward.",
          "The time fuse: a slow-burning fuse that sets how long the shell flies before it bursts.",
          "The lift charge: a separate charge at the bottom that fires the shell out of its tube, called a mortar.",
        ],
      },
      {
        h: "From launch to burst",
        p: [
          "At launch, the lift charge is lit and burns very fast. The gas it makes pushes the shell out of the mortar and up into the sky. At the same time, the flame lights the time fuse. The fuse burns while the shell climbs, and it is timed so that the shell reaches near its highest point before the burst charge goes off.",
          "When the burst charge ignites, it splits the casing and throws the stars out in every direction. The stars catch fire from the same flame, glow, and travel outward until they slow down in the air and fall under gravity.",
        ],
      },
      {
        h: "How the pattern is made",
        p: [
          "The shape you see depends on how the stars are arranged inside the shell. Stars packed evenly around a central charge make a round ball. Stars arranged in a ring make a ring. Smaller shells packed inside the main shell can create a second burst, or a different coloured core. Makers plan these layouts very carefully so the burst opens evenly.",
        ],
      },
      {
        h: "Why you see the flash before you hear the boom",
        p: [
          "Light travels almost instantly, while sound moves at roughly 340 metres per second, which is about 1,100 feet per second. If you hear the boom three seconds after the flash, you are roughly one kilometre, or a little over half a mile, from the burst. This is also why the sound seems to arrive late at big displays, and why the very first sparks look silent.",
        ],
      },
      {
        h: "Shell sizes and how high they go",
        p: [
          "Shells are measured by their diameter, usually in inches or millimetres. A bigger shell holds more stars and more burst charge, so it climbs higher and opens much wider. Small shells make a modest burst fairly low in the sky, while the largest shells used at big displays burst far higher and spread across a huge part of the sky. That is why crews place the largest shells furthest from the crowd.",
        ],
      },
      {
        h: "How modern shows are fired",
        p: [
          "Most professional displays no longer rely on a person lighting each fuse with a flame. Instead, each shell has an electric igniter wired to a control board, and a computer fires them in a planned order. This lets the crew stand at a safe distance and time every burst to the fraction of a second, which is how shows are matched to music.",
        ],
      },
      {
        h: "Why smoke hangs in the sky",
        p: [
          "The powder that lifts and bursts a shell makes a lot of smoke. On a still night it can hang over the show and block the view, and on a windy night it drifts away quickly. Smoke is also why later bursts sometimes look softly lit from behind: the flash of each new burst lights the cloud left by the one before it.",
        ],
      },
      {
        h: "Watch it on BlastSky",
        p: [
          "BlastSky is a simulation, so there is no real powder involved. It mimics what the stars do after the burst: they fly out fast, slow down in the air, cool from bright white to colour to a dim ember, and fall. Try tapping the sky to launch different shells and watch how each pattern forms.",
        ],
      },
    ],
  },
  {
    slug: "types-of-fireworks-explained",
    title: "Types of Fireworks Explained: Peony, Chrysanthemum, Willow, Kamuro and More",
    description:
      "A simple guide to the most common firework effects, from peonies and chrysanthemums to willows, brocades, kamuro, crossettes and pistils, and how to recognise each one.",
    date: "2026-10-10",
    blocks: [
      {
        p: [
          "Fireworks fans use special names for the different bursts. Once you know them, you can pick out each effect in the sky. Here are the main ones you will see at displays and on BlastSky.",
        ],
      },
      {
        h: "Peony",
        p: [
          "A peony is a round ball of bright stars with no tails. The stars glow evenly in all directions, like the petals of the flower. It is the classic shape that most people picture when they think of a firework.",
        ],
      },
      {
        h: "Chrysanthemum",
        p: [
          "A chrysanthemum looks like a peony, but each star leaves a trailing tail of sparks behind it. The tails curve slightly as the stars slow down, so the burst looks like the fine, curling petals of the flower.",
        ],
      },
      {
        h: "Willow and kamuro",
        p: [
          "Willow shells use heavy, long-burning gold stars that burst outward, then droop and fall in long, glowing strands, like the branches of a weeping willow. Kamuro is the Japanese name for a very large, rich version of this effect, with thick golden trails that hang in the sky for several seconds.",
        ],
      },
      {
        h: "Brocade",
        p: [
          "A brocade looks like a golden shower of glittering sparks that arch outward and drift down. The sparks often twinkle as they fall, which gives the effect a woven, shimmering look.",
        ],
      },
      {
        h: "Pistil and colour change",
        p: [
          "A pistil shell has a smaller burst of a different colour in the centre of the main burst, like the centre of a flower. A colour-change shell has stars that begin in one colour and switch to another while they are still flying.",
        ],
      },
      {
        h: "Crossette, ring and palm",
        list: [
          "Crossette: bright stars that split into several smaller stars part-way through their flight, making a pattern of crossing lines.",
          "Ring: stars arranged in a circle, which looks like an oval or a full ring depending on the angle you see it from.",
          "Palm: thick, rising stars with heavy trails that arch out and down, like the fronds of a palm tree.",
        ],
      },
      {
        h: "Crackle, strobe and others",
        p: [
          "Crackle stars end with many tiny bangs. Strobe stars blink on and off as they fall. Comets are large single stars that fly out with long tails. Many displays mix all of these together so each burst feels different.",
        ],
      },
      {
        h: "A quick guide to spotting them",
        list: [
          "Round ball of dots with no tails: peony.",
          "Round ball where every dot has a curling tail: chrysanthemum.",
          "Long gold strands drooping down like a weeping tree: willow, or kamuro if it is huge and heavy.",
          "Glittering gold that arches out and twinkles as it falls: brocade.",
          "A different coloured centre inside the burst: pistil.",
          "Lines that split and cross: crossette.",
          "Dots that blink on and off: strobe.",
        ],
      },
      {
        h: "Easy mix-ups",
        p: [
          "The most common mix-up is between a peony and a chrysanthemum. Look for tails: if the stars leave streaks behind them, it is a chrysanthemum. Willow and brocade are also easy to confuse. A willow droops in long, soft strands, while a brocade tends to look more sparkly and arched. Even experts sometimes disagree, so do not worry about being perfect.",
        ],
      },
    ],
  },
  {
    slug: "fireworks-colours-explained",
    title: "Fireworks Colours Explained: What Makes Red, Green, Blue and Gold",
    description:
      "How firework colours are made: the metal compounds behind red, orange, yellow, green, blue and purple, why blue is the hardest colour, and what makes white and gold sparks.",
    date: "2026-10-10",
    blocks: [
      {
        p: [
          "The colours in fireworks come from chemistry. When certain metal compounds are heated until they glow, they give off light of a particular colour. This is the same effect that gives a gas flame a green or orange tint when some salts fall into it. Here is a simple overview.",
        ],
      },
      {
        h: "The main colour makers",
        list: [
          "Red: compounds of strontium.",
          "Orange: compounds of calcium.",
          "Yellow: compounds of sodium, which burns bright yellow and can easily wash out other colours.",
          "Green: compounds of barium.",
          "Blue: compounds of copper, which is the hardest colour to get right.",
          "Purple: made by mixing a red-making and a blue-making compound.",
        ],
      },
      {
        h: "Why blue is so difficult",
        p: [
          "A rich blue needs the copper compound to stay at a fairly narrow range of temperatures. If the star burns too hot, the colour breaks down and turns pale. If it burns too cool, it is too weak to see. Making a deep, pure blue that holds its colour has long been one of the hardest challenges for firework makers, which is why a really good blue burst gets a special reaction from the crowd.",
        ],
      },
      {
        h: "White, silver and gold",
        p: [
          "Bright white and silver sparks come from burning metals such as aluminium, magnesium or titanium. They make very hot, bright sparks that can also add flashes and strobe effects. Gold sparks come from slower-burning materials such as charcoal or iron, which glow orange-gold as they fall. That is why willow and brocade effects look golden.",
        ],
      },
      {
        h: "Why colours change as sparks fall",
        p: [
          "Even a single star changes appearance as it burns. It begins white-hot and very bright, then settles into its main colour, and finally dims toward a red-orange ember as it cools. BlastSky copies this on screen, so you can watch the stars cool as they fall.",
        ],
      },
      {
        h: "Why colours look different from the ground",
        p: [
          "Colours can look different depending on where you stand. Distance, smoke, haze and the light from the city behind a burst all change how bright and how pure a colour looks. A deep blue that looks perfect on a dark, clear night can look pale in a hazy sky. Pale colours also show up less against the bright flash of a white or gold burst next to them.",
        ],
      },
      {
        h: "Why yellow can take over",
        p: [
          "Sodium makes a very strong yellow-orange light. Even a tiny amount of sodium in a mixture can add a yellow tint to other colours, so makers have to keep their ingredients very clean when they want a pure red, green or blue. This is one reason clean colours are a sign of high-quality work.",
        ],
      },
      {
        h: "Colours on BlastSky",
        p: [
          "On BlastSky, the Theme menu lets you pick a palette to match an occasion: gold for Diwali, white and gold for New Year, red, white and blue, Christmas colours or a full rainbow. The colours are drawn on the screen, so you can enjoy the look without any of the chemistry.",
        ],
      },
      {
        h: "A note about safety",
        p: [
          "Making fireworks is dangerous and is tightly regulated. This page is only a general explanation of why fireworks look the way they do. Only trained, licensed professionals should make or handle them.",
        ],
      },
    ],
  },
  {
    slug: "fireworks-safety-tips",
    title: "Fireworks Safety Tips for Families and Pets",
    description:
      "Practical fireworks safety tips: why a public display is the safest choice, rules to follow if fireworks are legal where you live, how to handle duds, and how to keep children and pets safe.",
    date: "2026-10-10",
    blocks: [
      {
        p: [
          "Fireworks are beautiful, but they cause burns, eye injuries and fires every year. The safest way to enjoy them is to watch a show run by trained professionals. If you do use consumer fireworks, make sure they are legal where you live and follow these basic rules.",
        ],
      },
      {
        h: "The safest choice: watch a public display",
        p: [
          "Professional displays are planned, permitted and fired from a safe distance by trained crews. You get bigger and better effects, and you can enjoy the show with no risk to yourself. This is the option we recommend for families.",
        ],
      },
      {
        h: "If you use consumer fireworks",
        list: [
          "Check your local laws first. Rules about what is allowed, and when, vary widely.",
          "Read and follow the instructions on every item.",
          "Only an adult who is sober should light fireworks.",
          "Use them outdoors on a flat, open area, away from buildings, trees, dry grass and vehicles.",
          "Keep a bucket of water or a garden hose close by.",
          "Light one at a time, and move away right after lighting.",
          "Never hold a lit firework, and never aim one at a person, an animal or a building.",
          "Wear eye protection, and keep spectators well back.",
        ],
      },
      {
        h: "Duds and leftovers",
        p: [
          "If a firework does not go off, do not go back to it or try to relight it. Wait a good while, then soak it in water and follow the guidance on its packaging for disposal. Never carry fireworks in your pockets.",
        ],
      },
      {
        h: "Sparklers",
        p: [
          "Sparklers look harmless, but they burn at about 1,100 degrees Celsius, or about 2,000 degrees Fahrenheit. They cause many injuries to young children. Keep young children away from them, give older children one at a time, and place the used wire in a bucket of water.",
        ],
      },
      {
        h: "Pets, children and noise",
        list: [
          "Keep pets indoors in a quiet room, with the curtains closed and some background sound playing.",
          "Make sure pets are wearing identification, in case they bolt.",
          "Use ear protection for young children and for anyone sensitive to noise.",
          "Warn neighbours and people with health issues, and think about veterans and others who can find loud bangs distressing.",
        ],
      },
      {
        h: "A quick checklist before the night",
        list: [
          "Confirm the fireworks are legal where you live and where you plan to use them.",
          "Choose an open, flat, clear area and check the wind. Do not use fireworks in strong wind.",
          "Fill a bucket of water and keep a hose or extinguisher close by.",
          "Agree who is in charge, and keep everyone else well back.",
          "Tell neighbours in advance, and keep the noise within the local rules.",
          "Plan how you will clear up afterwards, once everything has cooled and been soaked.",
        ],
      },
      {
        h: "If someone is hurt",
        p: [
          "This is general information, not medical advice. For a burn, cool it under cool running water for at least ten minutes, do not use ice, and get medical help for anything serious. If clothing catches fire, the person should stop, drop to the ground and roll. If anyone is hit in the eye, they should not rub it, and should get emergency medical care straight away. Call your local emergency number whenever you are unsure.",
        ],
      },
      {
        h: "Not ready to risk it?",
        p: [
          "If you want the fun without the danger, BlastSky is a free simulation that you can enjoy on any screen, with no fire, noise complaints or cleanup.",
        ],
      },
    ],
  },
  {
    slug: "festival-fireworks-guide",
    title: "Festival Fireworks Around the World, and How to Photograph Them",
    description:
      "A friendly guide to the biggest festivals that use fireworks, from New Year and Diwali to Independence Day, Bonfire Night and Lunar New Year, plus simple tips for watching and photographing a show.",
    date: "2026-10-10",
    blocks: [
      {
        p: [
          "Fireworks are part of celebrations in almost every part of the world. Here are some of the best-known occasions, followed by simple tips for watching and photographing a display. Dates for some festivals change every year, so check a calendar for the current one.",
        ],
      },
      {
        h: "Festivals with fireworks",
        list: [
          "New Year: cities around the world mark midnight with shows, from big harbour displays to local fireworks in town squares.",
          "Diwali: the Festival of Lights, celebrated by Hindus, Sikhs, Jains and some Buddhists, falls in autumn and uses lamps, lights and, in many places, fireworks. Some cities restrict fireworks because of air quality, so check local rules.",
          "Lunar New Year: celebrated across East and Southeast Asia, where loud firecrackers have long been used to welcome the new year and chase away bad luck.",
          "Independence Day in the United States, on 4 July, is famous for fireworks shows in towns across the country.",
          "Canada Day, on 1 July, and Bastille Day in France, on 14 July, also feature large displays.",
          "Bonfire Night in the United Kingdom, on 5 November, combines bonfires and fireworks.",
        ],
      },
      {
        h: "Tips for watching",
        list: [
          "Arrive early to find a good spot with a clear view of the sky.",
          "Choose a position upwind of the smoke, so your view stays clear.",
          "Bring ear protection for children, and something warm to sit on.",
          "Check the exact start time and the weather, since shows can be delayed in strong wind or rain.",
        ],
      },
      {
        h: "Tips for photographing fireworks",
        list: [
          "Use a tripod or rest your camera on something steady.",
          "Use a slow shutter speed of a few seconds, so the trails draw out into streaks.",
          "Set a low ISO, and a mid-range aperture, so the bright bursts do not wash out.",
          "Focus manually, set to infinity, so the camera does not hunt in the dark.",
          "Use a timer or remote so pressing the button does not shake the camera.",
          "Include some of the skyline or landscape for scale.",
        ],
      },
      {
        h: "A short history",
        p: [
          "Fireworks began in China, after people discovered black powder, and were used in celebrations and ceremonies for many centuries. The craft then spread along trade routes to the rest of Asia, the Middle East and Europe, where makers added new colours and larger shells. Today the tradition is shared around the world, and many families have a favourite festival that is not complete without fireworks.",
        ],
      },
      {
        h: "Being a considerate spectator",
        list: [
          "Take your litter home, and keep to the marked paths and viewing areas.",
          "Keep noise down late at night, and be aware that some neighbours, animals and people find loud bangs upsetting.",
          "Respect local rules, because some places limit fireworks to protect air quality, wildlife or fire safety.",
          "Leave plenty of time to travel home, since roads near large shows get crowded.",
        ],
      },
      {
        h: "Celebrate from home",
        p: [
          "Can't get to a show? Open BlastSky, choose a theme such as Diwali gold, New Year or Christmas, and start the countdown or the grand show. You can even type a message and send a greeting link, so a friend sees your wish written in the sky.",
        ],
      },
    ],
  },
  {
    slug: "host-a-virtual-fireworks-display",
    title: "How to Host a Virtual Fireworks Display at Home or at a Party",
    description:
      "Step-by-step ideas for running a virtual fireworks display: setting up the screen and sound, planning a short programme with a countdown, and fun ways to celebrate New Year, Diwali, birthdays and more without real fireworks.",
    date: "2026-10-13",
    blocks: [
      {
        p: [
          "A virtual fireworks display gives you the excitement of a show with none of the risk, smoke or noise complaints. It works for a quiet family evening, a birthday, a New Year's Eve gathering or a call with relatives who live far away. Here is how to set one up with a free fireworks simulator such as BlastSky.",
        ],
      },
      {
        h: "What you need",
        list: [
          "A screen: the bigger the better. A laptop works, and a TV is even better.",
          "Speakers: the booming sound is half the fun, so use speakers or a sound bar if you can.",
          "A dark room: close the curtains or dim the lights so the bursts stand out.",
          "A web browser and an internet connection. There is nothing to download or install.",
        ],
      },
      {
        h: "Getting it onto the big screen",
        p: [
          "You can connect a laptop to a television with an HDMI cable, or use your browser's cast option if your television supports it. Once it is on the screen, use the Full screen button so the sky fills the display. Before your guests arrive, press Start once and check that the sound plays at a comfortable volume.",
        ],
      },
      {
        h: "Plan a short programme",
        p: [
          "A good show has a beginning, a build-up and a finale. Here is a simple plan that takes about ten minutes:",
        ],
        list: [
          "Start with the Today's show button for a ready-made show that builds up slowly.",
          "Let everyone take a turn tapping the sky to launch a shell of their choice, using the Tap shell menu to pick a type.",
          "For a special moment, type a message such as a name or a wish and press Write in sky.",
          "Finish with the Finale or the Grand show, which ends with a big barrage.",
        ],
      },
      {
        h: "Ideas for different occasions",
        list: [
          "New Year's Eve: choose the New Year theme and use the Countdown button, which counts from ten and ends with a message and a finale.",
          "Diwali: pick the Diwali gold theme for warm golden bursts.",
          "Birthdays: write the birthday person's name in the sky, and save a photo of it.",
          "Long-distance celebrations: use Share greeting to send a link, so a friend sees your message written in their own sky.",
          "Children's parties: let each child choose a shell type and see who can find the biggest burst.",
        ],
      },
      {
        h: "Tips for children and pets",
        p: [
          "A virtual show is much gentler than real fireworks, but the booms can still surprise young children and some pets. Turn the volume down a little at first, sit close to the children, and keep pets in a calm room if loud noises upset them.",
        ],
      },
      {
        h: "A safe alternative",
        p: [
          "If fireworks are not allowed where you live, or the weather is bad, or you simply do not want the risks, a virtual display is a good alternative. For real fireworks, the safest choice is always a public show run by trained professionals. Our guide to fireworks safety has more tips.",
        ],
      },
    ],
  },
  {
    slug: "diwali-fireworks-guide",
    title: "Diwali and Fireworks: Meaning, Traditions and Greener Ideas",
    description:
      "What Diwali celebrates, how families mark the five days of the festival of lights, why fireworks are part of it, and gentler ways to enjoy the celebration, including a virtual fireworks show.",
    date: "2026-10-18",
    blocks: [
      {
        p: [
          "Diwali, also called Deepavali, is the festival of lights. It is celebrated by hundreds of millions of people around the world each autumn. The date changes every year because it follows a lunar calendar, but it usually falls between October and November. Homes are filled with lamps, families gather, sweets are shared, and in many places the night sky is lit with fireworks.",
        ],
      },
      {
        h: "What Diwali celebrates",
        p: [
          "Diwali means different things in different communities, but the heart of it is the victory of light over darkness and good over evil. Many Hindus link the festival to the return of Rama to Ayodhya, or to the goddess Lakshmi, who is associated with prosperity. Jains observe the day as a remembrance of Mahavira's liberation. Sikhs mark Bandi Chhor Divas, which remembers the release of Guru Hargobind. Some Buddhist communities in Nepal also take part.",
        ],
      },
      {
        h: "How families celebrate",
        list: [
          "Lighting rows of small oil lamps called diyas, as well as lanterns and electric lights.",
          "Drawing colourful patterns called rangoli at the door of the home.",
          "Cleaning and decorating the house, and wearing new clothes.",
          "Offering prayers, especially on the main evening of the festival.",
          "Sharing sweets and gifts, and visiting family and friends.",
          "Setting off sparklers and fireworks, or watching a community display.",
        ],
      },
      {
        h: "Why fireworks are part of Diwali",
        p: [
          "Bright lights and loud celebration are a long tradition of the festival. For many families, the glow and the noise mean joy and a welcome to good fortune. Children in particular love sparklers and the bright colours of the evening sky.",
        ],
      },
      {
        h: "Air quality, noise and safety",
        p: [
          "In recent years, many cities have raised concerns about smoke, noise and fire risks around Diwali. Smoke can add to air pollution and is hard on people with breathing problems, and the loud bangs can frighten pets, children and elderly people. Some places restrict or limit fireworks, and India has promoted so-called green crackers, which are designed to reduce emissions and noise. Rules vary from place to place, so always check what is allowed where you live, and read our fireworks safety guide before using anything at home.",
        ],
      },
      {
        h: "Greener ways to celebrate",
        list: [
          "Watch a public display run by trained professionals, instead of lighting your own.",
          "Fill your home with diyas, lanterns and LED string lights.",
          "Host a virtual fireworks show. On BlastSky, choose the Diwali gold theme for warm golden bursts.",
          "Write a greeting such as Shubh Deepavali in the sky, and send the link to relatives who live far away.",
          "Keep pets in a quiet room, and give them something comforting to chew.",
        ],
      },
      {
        h: "A happy Diwali, wherever you are",
        p: [
          "However you celebrate, the spirit of the festival is warmth, family and light. If you cannot be with loved ones this year, a shared greeting link can make the distance feel smaller.",
        ],
      },
    ],
  },
  {
    slug: "new-years-eve-fireworks-around-the-world",
    title: "New Year's Eve Fireworks Around the World",
    description:
      "How the new year arrives around the world, which cities are famous for their midnight fireworks, some New Year traditions beyond fireworks, and tips for watching in person or from home.",
    date: "2026-10-18",
    blocks: [
      {
        p: [
          "At midnight on New Year's Eve, cities around the world mark the moment with fireworks. Because of time zones, the new year does not arrive everywhere at once. It begins in the Pacific and then travels westward around the planet, so you can follow celebrations for about a day.",
        ],
      },
      {
        h: "How the new year travels",
        p: [
          "The world's time zones stretch across about 26 hours, from the earliest places in the Pacific to the last. Small island nations in the Pacific are among the first to welcome the new year. Large cities in Australia and Asia follow, then Europe and Africa, and finally the Americas. That is why people in one country can already be sharing photos of fireworks while others are still eating dinner.",
        ],
      },
      {
        h: "Famous New Year displays",
        p: [
          "These are long-running traditions, but organisers can change, shorten or cancel shows, so always check the plans for the current year.",
        ],
        list: [
          "Sydney: fireworks over the harbour, with the Harbour Bridge and Opera House as the backdrop.",
          "London: a show along the River Thames near the London Eye, usually with ticketed viewing areas.",
          "Dubai: displays around the Burj Khalifa, the world's tallest tower.",
          "Edinburgh: the Hogmanay street party, with fireworks above the castle.",
          "Rio de Janeiro: a huge beach party on Copacabana, where many people wear white.",
          "Taipei: fireworks launched from the sides of the Taipei 101 tower.",
        ],
      },
      {
        h: "Traditions beyond fireworks",
        list: [
          "Spain: eating twelve grapes, one with each stroke of midnight, for good luck in the new year.",
          "Japan: temple bells are rung 108 times to clear away worldly worries.",
          "Scotland: singing Auld Lang Syne with arms linked in a circle.",
          "Many countries: making resolutions, a midnight toast and a countdown out loud.",
        ],
      },
      {
        h: "Tips for watching in person",
        list: [
          "Arrive early. The best spots fill up hours ahead of the show.",
          "Plan your journey home before you go, since public transport is crowded afterward.",
          "Dress warmly and wear comfortable shoes.",
          "Agree a meeting point in case you are separated in the crowd.",
          "Bring ear protection for children, and check the weather forecast.",
        ],
      },
      {
        h: "Celebrate from home",
        p: [
          "You do not have to travel to enjoy the moment. On BlastSky, pick the New Year theme and press Countdown. It counts from ten down to one, writes a New Year message in the sky and finishes with a big finale. Connect a laptop to a television, turn the volume up, and everyone can count down together. Our guide to hosting a virtual fireworks display has more setup ideas.",
        ],
      },
    ],
  },
  {
    slug: "how-to-photograph-fireworks",
    title: "How to Photograph Fireworks on a Phone or Camera",
    description:
      "Clear, practical tips for photographing fireworks: what to do before the show, simple phone settings, starting settings for a camera, composition ideas and common mistakes to avoid.",
    date: "2026-10-18",
    blocks: [
      {
        p: [
          "Fireworks are fast, bright and happen in the dark, which makes them tricky to photograph. The good news is that a few simple habits make a big difference. This guide covers both phones and cameras.",
        ],
      },
      {
        h: "Before the show",
        list: [
          "Arrive early and pick a spot with a clear view and, if you like, an interesting foreground such as a skyline, a bridge or water.",
          "Check which way the wind blows, and stand upwind so smoke does not drift into your shot.",
          "Bring a tripod or something steady to rest on, and a fully charged battery.",
          "Wipe your lens clean. A smudge turns every burst into a blur.",
        ],
      },
      {
        h: "On a phone",
        list: [
          "Turn the flash off. It cannot reach the sky and only spoils the exposure.",
          "Use night mode if your phone has it, and keep the phone as still as you can.",
          "Tap the sky to set focus, then hold to lock it. If the bursts look too bright, lower the exposure slider a little.",
          "Try video as well. You can pull still frames from it afterward.",
          "On some phones, a long-exposure option turns a live photo into a streaky light trail.",
          "Avoid digital zoom, which makes the picture grainy. Move closer or crop later.",
        ],
      },
      {
        h: "On a camera: a starting point",
        p: [
          "Every show and every camera is different, so treat these as starting values and adjust after a few test shots.",
        ],
        list: [
          "Use manual mode, and put the camera on a tripod.",
          "Set a low ISO, such as 100 to 200.",
          "Choose a mid-range aperture, such as f/8 to f/11.",
          "Try a shutter speed of two to six seconds, so the trails of the burst draw out.",
          "Switch to manual focus and set it to a distant light or to infinity.",
          "Use a timer or a remote, so pressing the button does not shake the camera.",
          "Shoot in RAW if you can, so you can recover details later.",
        ],
      },
      {
        h: "Composition tips",
        list: [
          "Include some of the landscape so the bursts have a sense of scale.",
          "Leave empty sky above the skyline, because bursts can rise higher than you expect.",
          "Try both horizontal and vertical shots.",
          "For several bursts in one frame, keep the shutter open and cover the lens with a black card between bursts.",
        ],
      },
      {
        h: "Common mistakes",
        list: [
          "A shutter open for too long turns the sky white.",
          "Hand-held shots come out blurry and shaky.",
          "Autofocus hunts in the dark and misses the burst.",
          "Spending the whole show looking at the screen, so you miss the display.",
        ],
      },
      {
        h: "Practise first",
        p: [
          "Timing matters most. Use the Save photo button on BlastSky to capture your own sky, and watch how long a burst takes to open, trail and fade. That rhythm is the same one you will see at a real show.",
        ],
      },
    ],
  },
  {
    slug: "history-of-fireworks",
    title: "The History of Fireworks: From Ancient China to Modern Shows",
    description:
      "A short history of fireworks, from bamboo crackers and the discovery of gunpowder in China to Renaissance Europe, the rise of colour, and today's computer-controlled displays.",
    date: "2026-10-18",
    blocks: [
      {
        p: [
          "Fireworks are among the oldest forms of entertainment still enjoyed in much the same way. The story starts in China and travels across the world over many centuries. Some dates are debated by historians, so the dates here are approximate.",
        ],
      },
      {
        h: "Bamboo and the first bangs",
        p: [
          "Long before gunpowder, people in China threw green bamboo stalks into fires. As the air inside the hollow sections heated and expanded, the bamboo burst with a loud crack. The sound was believed to scare away evil spirits, and the habit became part of celebrations such as the New Year. The idea of using noise to drive away bad luck is still part of festivals today.",
        ],
      },
      {
        h: "Gunpowder is discovered",
        p: [
          "Historians believe that Chinese alchemists, who were searching for an elixir of life, discovered gunpowder around the ninth century. It is a mixture of saltpetre, sulphur and charcoal. Packed into paper or bamboo tubes, it gave a much louder bang than bamboo alone, and these tubes became the first firecrackers. Over the following centuries, makers learned to add effects, including sparks and flashes.",
        ],
      },
      {
        h: "Fireworks travel west",
        p: [
          "Knowledge of gunpowder spread along trade routes through the Middle East and into Europe by about the thirteenth century. During the Renaissance, Italian craftsmen developed fireworks into an art form, with displays at royal weddings, victories and festivals. Makers began building the aerial shells that burst high in the sky.",
        ],
      },
      {
        h: "Fireworks and national celebrations",
        p: [
          "Fireworks became tied to national days and public events. Many accounts describe the first anniversary of American independence in 1777 as being marked with fireworks, which helped start a tradition that continues on 4 July. Elsewhere, fireworks mark everything from royal events to harvest festivals.",
        ],
      },
      {
        h: "The arrival of colour",
        p: [
          "For a long time, fireworks were mostly orange, gold and white, because the available materials burned those colours. In the nineteenth century, chemists began adding new metal compounds, which brought strong reds and greens. Rich blue was the hardest colour to get right and came last. Our guide to firework colours explains the chemistry in simple terms.",
        ],
      },
      {
        h: "Fireworks today",
        list: [
          "Electric igniters and computer control let crews fire hundreds of shells in a precise order.",
          "Shows are timed to music to the fraction of a second.",
          "Designers plan patterns carefully, such as rings, hearts and layered bursts.",
          "Drone light shows have appeared as a quieter option that uses light and no powder.",
          "Virtual fireworks, such as BlastSky, let anyone enjoy a show with no smoke, noise or risk.",
        ],
      },
      {
        h: "Why we still love them",
        p: [
          "After more than a thousand years, the appeal is the same: a bright moment shared with other people under the night sky. Whether you watch a huge public show or a small virtual one with your family, you are taking part in one of the oldest celebrations we have.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
