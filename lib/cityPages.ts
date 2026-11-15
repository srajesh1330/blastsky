import type { CityId } from "./skylines";
import type { Theme } from "./fireworks";

export interface PageBlock {
  h?: string;
  p?: string[];
  list?: string[];
}

export interface CityPage {
  slug: string;
  name: string;
  city: CityId;
  theme: Theme;
  title: string;
  description: string;
  h1: string;
  intro: string;
  guide: string; // slug of a related guide
  blocks: PageBlock[];
}

const HOW_TO = (extra: string): PageBlock => ({
  h: "How to use this simulator",
  list: [
    "Press Start and turn your sound on.",
    "Tap or click the sky to launch your own shells, or press Space.",
    "Press Countdown for a ten-to-one count that ends with a message and a finale.",
    "Open Controls to change the theme, the city and the volume, and to write a message in the sky.",
    extra,
  ],
});

export const CITY_PAGES: CityPage[] = [
  {
    slug: "new-year-fireworks-simulator",
    name: "New Year's Eve",
    city: "generic",
    theme: "newyear",
    title: "New Year's Eve Fireworks Simulator with Countdown",
    description:
      "A free New Year's Eve fireworks simulator with a ten-to-one countdown, a New Year message and a big finale. Works on phones and computers.",
    h1: "New Year's Eve Fireworks Simulator",
    intro:
      "Count down to midnight with a free virtual fireworks show. This page opens BlastSky with the New Year colours already chosen. Press Start, turn your sound on, then press Countdown when you are ready.",
    guide: "new-years-eve-fireworks-around-the-world",
    blocks: [
      {
        h: "How the countdown works",
        list: [
          "Press Countdown. Big numbers from 10 down to 1 appear in the sky, one shell for each number.",
          "After 1, a shell writes HAPPY NEW YEAR, and a large finale follows.",
          "Use the Stop show button at any time if you want to stop early.",
        ],
      },
      {
        h: "Pick a city skyline",
        p: [
          "Open Controls and choose a city, or jump straight to one: Sydney, London, New York, Toronto, Auckland or Paris. Each has its own famous landmarks behind the fireworks.",
        ],
      },
      {
        h: "Party ideas",
        list: [
          "Connect a laptop to a television and turn the speakers up.",
          "Write the name of someone special in the sky with the message box.",
          "Send a greeting link to family far away, so they see your message in their own sky.",
          "Take a photo of your sky with the Save photo button.",
        ],
      },
    ],
  },
  {
    slug: "sydney-fireworks-simulator",
    name: "Sydney",
    city: "sydney",
    theme: "newyear",
    title: "Sydney Fireworks Simulator: Harbour Bridge Show",
    description:
      "Watch a free virtual Sydney New Year's Eve fireworks show over a Harbour Bridge and Opera House skyline. Plays in your browser, with sound.",
    h1: "Sydney Fireworks Simulator",
    intro:
      "This page opens BlastSky with a Sydney skyline behind the fireworks: the arch of the Harbour Bridge and the sails of the Opera House. Press Start, turn your sound on, and launch your own shells or let the show run.",
    guide: "australia-fireworks-guide",
    blocks: [
      {
        h: "About Sydney's New Year's Eve fireworks",
        p: [
          "Sydney's harbour display is one of the most watched New Year's Eve shows in the world. It is launched around the Harbour Bridge and the Opera House, with an early show in the evening that is aimed at families and a larger show at midnight. Details change each year, so check the official event information. Because Sydney is far ahead of Europe and the Americas, many people around the world see its fireworks first.",
        ],
      },
      HOW_TO("Choose the New Year theme for gold and silver bursts."),
      {
        h: "Tips for the real show",
        list: [
          "Arrive very early, because the best spots fill up hours before.",
          "Check the official event site for road closures and public transport changes.",
          "Bring water, sun protection and something to sit on.",
          "Plan your journey home in advance.",
        ],
      },
    ],
  },
  {
    slug: "london-fireworks-simulator",
    name: "London",
    city: "london",
    theme: "newyear",
    title: "London Fireworks Simulator: Big Ben and the Eye",
    description:
      "A free virtual fireworks show over a London skyline with Big Ben, the London Eye and the Shard. Try New Year's Eve or Bonfire Night in your browser.",
    h1: "London Fireworks Simulator",
    intro:
      "This page opens BlastSky with a London skyline: the Shard, the London Eye and the tower that holds Big Ben. Press Start, turn your sound on, and light up the sky over the Thames.",
    guide: "bonfire-night-guide",
    blocks: [
      {
        h: "About London's fireworks",
        p: [
          "London marks New Year's Eve with a fireworks display along the River Thames near the London Eye, and the main viewing areas usually need a ticket. Many people also gather to hear the bell known as Big Ben, which is housed in the Elizabeth Tower, strike midnight. Bonfire Night, on 5 November, brings displays and bonfires across the city and the rest of the UK. Details change from year to year, so check the official information.",
        ],
      },
      HOW_TO("For Bonfire Night, try the Grand show with a colourful mix."),
      {
        h: "Tips for the real show",
        list: [
          "Check whether you need a ticket for the viewing area.",
          "Public transport is very busy afterwards, so plan the way home.",
          "Dress warmly, since winter nights by the river are cold.",
        ],
      },
    ],
  },
  {
    slug: "new-york-fireworks-simulator",
    name: "New York",
    city: "newyork",
    theme: "patriotic",
    title: "New York Fireworks Simulator: July 4 and New Year",
    description:
      "Run a free virtual fireworks show over a New York skyline with the Empire State Building and One World Trade Center, for July 4 or New Year's Eve.",
    h1: "New York Fireworks Simulator",
    intro:
      "This page opens BlastSky with a New York skyline and the red, white and blue colours. You will see the stepped tower of the Empire State Building and the tall spire of One World Trade Center behind the show.",
    guide: "fourth-of-july-fireworks-guide",
    blocks: [
      {
        h: "About New York's fireworks",
        p: [
          "New York is famous for two big nights. On July 4, a large fireworks show over the water is held each year and is often shown on television. On New Year's Eve the focus is Times Square, where a lit ball is lowered at midnight, and fireworks are also held in some other parts of the city. Check the official information, because plans change.",
        ],
      },
      {
        h: "The landmarks",
        list: [
          "The Empire State Building opened in 1931 and is known for its stepped tower and spire.",
          "One World Trade Center is 1,776 feet tall, a number chosen to echo the year of the Declaration of Independence.",
        ],
      },
      HOW_TO("Choose the red, white and blue theme for a July 4 look."),
    ],
  },
  {
    slug: "toronto-fireworks-simulator",
    name: "Toronto",
    city: "toronto",
    theme: "patriotic",
    title: "Toronto Fireworks Simulator: CN Tower Skyline",
    description:
      "A free virtual fireworks show with the CN Tower and the Rogers Centre dome on the skyline. Try Canada Day, Victoria Day or New Year's Eve fireworks.",
    h1: "Toronto Fireworks Simulator",
    intro:
      "This page opens BlastSky with a Toronto skyline: the slender CN Tower with its main pod, and the dome of the Rogers Centre. Press Start and light up the sky for Canada Day, or any night you like.",
    guide: "canada-day-fireworks-guide",
    blocks: [
      {
        h: "About Toronto's fireworks",
        p: [
          "Fireworks are part of several Toronto occasions, including Canada Day on 1 July, the Victoria Day weekend in late May and New Year's Eve. Dates, places and rules change from year to year, so check the city's official listings before you plan anything.",
        ],
      },
      {
        h: "The landmarks",
        list: [
          "The CN Tower, finished in 1976, was the world's tallest free-standing structure for more than thirty years.",
          "The Rogers Centre is the stadium with a retractable roof, close to the base of the tower.",
        ],
      },
      HOW_TO("Choose the red, white and blue theme and write Happy Canada Day in the sky."),
    ],
  },
  {
    slug: "auckland-fireworks-simulator",
    name: "Auckland",
    city: "auckland",
    theme: "newyear",
    title: "Auckland Fireworks Simulator: Sky Tower Show",
    description:
      "Watch a free virtual fireworks show beside the Auckland Sky Tower. Count down to New Year with one of the first big cities to see the new year.",
    h1: "Auckland Fireworks Simulator",
    intro:
      "This page opens BlastSky with an Auckland skyline and the Sky Tower rising over the city. Press Start, turn your sound on, and count down to the new year with one of the first big cities to reach it.",
    guide: "new-zealand-fireworks-guide",
    blocks: [
      {
        h: "About Auckland's fireworks",
        p: [
          "Auckland's New Year's Eve display is launched from the Sky Tower. Because New Zealand is among the first countries to reach each new year, it is one of the earliest big shows of the night. Guy Fawkes Night on 5 November and some other events also bring fireworks. Rules and plans change, so check local information.",
        ],
      },
      {
        h: "The Sky Tower",
        p: [
          "The Sky Tower stands in the centre of the city and is about 328 metres tall, with a pod near the top that holds viewing decks and a restaurant.",
        ],
      },
      HOW_TO("You can also write Kia ora or Happy New Year in the sky."),
    ],
  },
  {
    slug: "paris-fireworks-simulator",
    name: "Paris",
    city: "paris",
    theme: "patriotic",
    title: "Paris Fireworks Simulator: Eiffel Tower Skyline",
    description:
      "A free virtual fireworks show with the Eiffel Tower on the skyline, inspired by Bastille Day. Choose patriotic colours and press Start in your browser.",
    h1: "Paris Fireworks Simulator",
    intro:
      "This page opens BlastSky with an Eiffel Tower skyline and the blue, white and red colours of the French flag. Press Start, turn your sound on, and picture Bastille Day over Paris.",
    guide: "history-of-fireworks",
    blocks: [
      {
        h: "About fireworks in Paris",
        p: [
          "On 14 July, France's national day known as Bastille Day, Paris holds a large fireworks display close to the Eiffel Tower, and many people watch from the nearby gardens and bridges. New Year's Eve celebrations also take place around the city. Plans change, so check the official information.",
        ],
      },
      {
        h: "The Eiffel Tower",
        p: [
          "The tower was built for the 1889 World's Fair and is about 330 metres tall, including its antenna. Its iron lattice and wide curved legs make it one of the most recognisable shapes in the world.",
        ],
      },
      HOW_TO("The red, white and blue theme matches the French flag."),
    ],
  },
];

export function getCityPage(slug: string): CityPage | undefined {
  return CITY_PAGES.find((c) => c.slug === slug);
}
