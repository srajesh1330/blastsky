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
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
