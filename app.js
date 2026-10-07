/**
 * Hawaii trip — interactive island map
 * Snapshots / estimates as of Oct 6–7, 2026 PT — verify live before booking.
 * Low/Base/High all-in tiers; mid-range default; Wailea = High only.
 */
(function () {
  "use strict";


  /** All-in Low/Base/High — verified Oct 6–7 2026 PT (see live-quotes/hawaii-tiers-low-base-high.json) */
  const TIERS = {
    maui: {
      low:  { dates: "Nov 10\u201317 2026", flight: 541, flightNote: "Cash 2-pax RT", hotel: 1397, hotelNote: "Kihei Akahi #C-520 \u00b7 Expedia live", other: 1400, total: 3338, stay: "Kihei Akahi #C-520 condo", stayUrl: "https://www.expedia.com/Kihei-Hotels-Kihei-Akahi-C-520-Tastefully-Updated.h56513057.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2", recommend: true },
      base: { dates: "Nov 10\u201317 2026", flight: 541, flightNote: "Cash 2-pax RT", hotel: 2025, hotelNote: "Mana Kai Maui beachfront \u00b7 Expedia live", other: 1800, total: 4366, stay: "Mana Kai Maui \u00b7 beachfront Kihei", stayUrl: "https://www.expedia.com/Kihei-Hotels-Mana-Kai-Maui.h27810.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2" },
      high: { dates: "Nov hotel \u00b7 peakish flight", flight: 1280, flightNote: "Peakish (~Oct $1,278 snap)", hotel: 6666, hotelNote: "Andaz Maui OV \u00b7 Expedia live", other: 2400, total: 10346, stay: "Andaz Maui at Wailea \u00b7 ocean view", stayUrl: "https://www.expedia.com/Kihei-Hotels-Andaz-Maui-At-Wailea-Resort-A-Concept-By-Hyatt.h2552.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2" }
    },
    oahu: {
      low:  { dates: "Nov 10\u201317 2026", flight: 426, flightNote: "CP est. $415+$11 (seats not held)", hotel: 1655, hotelNote: "Hyatt Place Waikiki \u00b7 Expedia live", other: 1340, total: 3421, stay: "Hyatt Place Waikiki \u00b7 city view + breakfast", stayUrl: "https://www.expedia.com/Honolulu-Hotels-Hyatt-Place-Waikiki-Beach.h2766.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2", recommend: true },
      base: { dates: "Nov 10\u201317 2026", flight: 739, flightNote: "Cash 2-pax RT", hotel: 2608, hotelNote: "OUTRIGGER Reef Waikiki Beach \u00b7 Expedia live", other: 1800, total: 5147, stay: "OUTRIGGER Reef Waikiki Beach Resort", stayUrl: "https://www.expedia.com/Honolulu-Hotels-OUTRIGGER-Reef-Waikiki-Beach-Resort.h23249.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2" },
      high: { dates: "Nov \u00b7 peakish est.", flight: 960, flightNote: "Est. ~1.3\u00d7 cash", hotel: 6849, hotelNote: "Halekulani \u00b7 Expedia live", other: 2400, total: 10209, stay: "Halekulani \u00b7 Waikiki", stayUrl: "https://www.expedia.com/Honolulu-Hotels-Halekulani.h20136.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2" }
    },
    bigisland: {
      low:  { dates: "Nov 2026 (CP)", flight: 522, flightNote: "CP est. $511+$11 (seats not held)", hotel: 2075, hotelNote: "Courtyard Kona \u00b7 resort view \u00b7 Expedia live", other: 1400, total: 3997, stay: "Courtyard Kona Beach \u00b7 resort view", stayUrl: "https://www.expedia.com/Kailua-Kona-Hotels-Courtyard-By-Marriott-King-Kamehamehas-Kona-Beach-Hotel.h21741.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2", recommend: true },
      base: { dates: "Mar 2\u20139 2027 flights \u00b7 hotel Nov Expedia", flight: 913, flightNote: "Cash cheapest improved week", hotel: 2516, hotelNote: "Outrigger Kona Resort & Spa \u00b7 Expedia live", other: 2178, total: 5607, stay: "Outrigger Kona Resort and Spa", stayUrl: "https://www.expedia.com/Kailua-Kona-Hotels-Outrigger-Kona-Resort-And-Spa.h49175916.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2" },
      high: { dates: "Nov cash + Kohala resort", flight: 1033, flightNote: "Prior Nov cash ~$1,033", hotel: 8450, hotelNote: "Fairmont Orchid \u00b7 Expedia live", other: 2400, total: 11883, stay: "Fairmont Orchid, Kohala Coast", stayUrl: "https://www.expedia.com/Kamuela-Hotels-Fairmont-Orchid.h25190.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2" }
    },
    kauai: {
      low:  { dates: "~Nov 12\u201319 2026", flight: 336, flightNote: "CP est. $325+$11 (seats not held)", hotel: 2335, hotelNote: "Kauai Shores garden \u00b7 Expedia live", other: 1400, total: 4071, stay: "Kauai Shores \u00b7 garden view", stayUrl: "https://www.expedia.com/Kapaa-Hotels-Kauai-Shores-Hotel.h9733.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2", recommend: true },
      base: { dates: "~Nov 12\u201319 2026", flight: 721, flightNote: "Cash 2-pax RT", hotel: 3050, hotelNote: "Sheraton Kauai Resort Villas \u00b7 Expedia live", other: 2306, total: 6077, stay: "Sheraton Kauai Resort Villas \u00b7 Poipu", stayUrl: "https://www.expedia.com/Koloa-Hotels-Sheraton-Kauai-Resort-Villas.h41815407.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2" },
      high: { dates: "Nov \u00b7 peakish est.", flight: 940, flightNote: "Est. ~1.3\u00d7 cash", hotel: 3978, hotelNote: "Koloa Landing Autograph \u00b7 Expedia live (GH Kauai not listed)", other: 2400, total: 7318, stay: "Koloa Landing Resort at Poipu", stayUrl: "https://www.expedia.com/Koloa-Hotels-Koloa-Landing-Resort-At-Poipu.h3812333.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2" }
    }
  };

  const ISLANDS = {
    maui: {
      id: "maui",
      name: "Maui",
      airport: "OGG",
      recommended: true,
      title: "Maui / Kihei–Wailea",
      eyebrow: "Recommended · Mid-range default (Low tier)",
      pitch:
        "Cheapest all-in island for this brief: ~$541 nonstops + Kihei condo mid-range (~$1.4–1.8k) puts Low near ~$3.3k. Wailea Andaz/Fairmont stay under High / splurge only — not the default path.",
      fit: [
        "Lowest all-in Low tier (~$3,338) — recommended default",
        "Mid-range: Kihei ocean-view / near-beach condos ~$1,397–$1,777 (7n)",
        "High / splurge only: Andaz / Fairmont / Hotel Wailea OV",
        "Nonstops from SFO + SJC (Alaska, United; WN SJC~Nov 21 2026)",
      ],
      flights: {
        headline: "Nonstop Bay Area → OGG",
        body:
          "Alaska + United dominate SFO–OGG (~5h 25–30m). SJC also has Alaska nonstops; Southwest begins ~Nov 21, 2026.",
        rows: [
          { route: "SFO → OGG", note: "Alaska, United · ~155 monthly (Oct 2026 HVCB)" },
          { route: "SJC → OGG", note: "Alaska now; Southwest ~Nov 21, 2026" },
        ],
        companion:
          "Companion Pass edge: prefer SJC–OGG Southwest nonstops once live (~Nov 21, 2026). Companion flies free (taxes/fees only) — often cheaper than two Alaska/United tickets. Prefer Alaska Atmos only when WN isn’t available or the 2-paid + bags total still wins.",
        snapshots: [
          { window: "Nov 10–17, 2026", price: "~$541", detail: "SFO United or SJC Alaska/Hawaiian · 2 pax RT · primary" },
          { window: "Apr 17–24, 2027", price: "~$1,069", detail: "United · spring value · 2 pax RT" },
          { window: "May 8–15, 2027", price: "~$1,238", detail: "United · near weather alt May 1–8" },
        ],
      },
      shortlist:
        "Low: Kihei Akahi #C-520 $1,397. Base: Mana Kai Maui beachfront $2,025. High: Andaz Maui OV $6,666 (Expedia Nov 10–17).",
      hotels: [
        {
          tag: "Recommended · Mid-range (Low)",
          shortlist: true,
          name: "Kihei Akahi #C-520",
          blurb:
            "Corner studio condo — near-beach Kihei, balcony, 5th floor. Live Expedia total for Nov 10–17 2026. Fully refundable only until Oct 11 — re-check before booking.",
          meta: [
            ["Request", "Confirm bed / balcony / parking; condo not full-service resort"],
            ["Band", "Kihei ocean-view / near-beach condos roughly $1,397–$1,777 for 7 nights"],
          ],
          price: "$1,397",
          priceSrc:
            "Expedia live · Nov 10–17 2026 · 7 nights · 2 adults · $171/nt · as of Oct 7 2026 PT",
          links: [
            { label: "Expedia", href: "https://www.expedia.com/Kihei-Hotels-Kihei-Akahi-C-520-Tastefully-Updated.h56513057.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2", solid: true },
          ],
        },
        {
          tag: "High / splurge · Hyatt + FHR",
          shortlist: false,
          name: "Andaz Maui at Wailea",
          blurb:
            "Cascading ocean-facing infinity pools; reef snorkeling off Mokapu/Ulua; modern lanais; intimate vs mega-resort. Best loyalty fit for Leo.",
          meta: [
            ["Request", "Ocean View (avoid Garden / Mountain); villas for plunge-pool + stronger frontage"],
            ["Amex / loyalty", "FHR · Hyatt points (~136,782 as of Sep 24) — award nights if OV available"],
          ],
          price: "$7,084",
          priceSrc:
            "Expedia OV total · Nov 10–17 2026 · High / splurge · as of Oct 6 2026 PT (Apr week was ~$9,865)",
          links: [
            { label: "Amex FHR", href: "https://www.americanexpress.com/en-us/travel/discover/property/Andaz-Maui-At-Wailea-Resort", solid: true },
            { label: "Official", href: "https://www.hyatt.com/andaz/maui-hotels/hnlwa-andaz-maui-at-wailea-resort" },
            { label: "Expedia", href: "https://www.expedia.com/Hotel-Search?destination=Wailea%2C%20Maui&startDate=2026-11-10&endDate=2026-11-17&adults=2&rooms=1&room_views_group=ocean_room_view&hotelName=Andaz%20Maui" },
          ],
        },
        {
          tag: "High / splurge · All-suite beachfront",
          shortlist: false,
          name: "Fairmont Kea Lani",
          blurb:
            "All-suite property on quieter Polo Beach; large private lanais. Strong “suite for two” beachfront feel.",
          meta: [
            ["Request", "Oceanview Suite; prefer Deluxe or Signature Oceanview (top floors)"],
            ["Amex / loyalty", "FHR (confirm on Amex Travel); Accor / Fairmont stack"],
          ],
          price: "$9,781",
          priceSrc:
            "Expedia OV total · Nov 10–17 2026 · High / splurge · as of Oct 6 2026 PT (Apr week was ~$10,569)",
          links: [
            { label: "Amex FHR", href: "https://www.americanexpress.com/en-us/travel/discover/property/Hawaii-US/Wailea/fairmont-kea-lani-maui", solid: true },
            { label: "Official", href: "https://www.fairmont.com/en/hotels/hawaii-maui/fairmont-kea-lani.html" },
            { label: "Oceanview suite", href: "https://www.fairmont-kea-lani.com/accommodations/ocean-view-suite/" },
            { label: "Expedia", href: "https://www.expedia.com/Kihei-Hotels-Fairmont-Kea-Lani-Maui.h8765.Hotel-Information" },
          ],
        },
        {
          tag: "High / splurge · Adults-only Relais & Châteaux",
          shortlist: false,
          name: "Hotel Wailea",
          blurb:
            "Panoramic Pacific from elevated lanais (~300 ft). Adults-only (max 2/suite). Ideal if “view from the room + romance” beats walk-onto-sand.",
          meta: [
            ["Request", "Ocean View One Bedroom Suite; stretch to Celebration Ocean View for top-floor best views"],
            ["Trade-off", "Not beachfront — shuttle to sand. Confirm FHR live on Amex Travel."],
          ],
          price: "$15,427",
          priceSrc:
            "Expedia OV total · Nov 10–17 2026 · High / splurge · as of Oct 6 2026 PT (Apr week was ~$8,692)",
          links: [
            { label: "Suites", href: "https://www.hotelwailea.com/suites/", solid: true },
            { label: "Official", href: "https://www.hotelwailea.com/" },
            { label: "Amex Wailea", href: "https://www.americanexpress.com/en-us/travel/discover/property-results/dt/4/d/Wailea,Hawaii" },
          ],
        },
        {
          tag: "Splurge only · FHR",
          skip: true,
          name: "Four Seasons Maui",
          blurb:
            "Benchmark luxury on Wailea Beach; adults-only infinity pool with ocean backdrop. Club / oceanfront categories face Pacific + neighboring islands.",
          meta: [
            ["Request", "Ocean-View Room minimum; prefer Club Ocean-View or Oceanfront / Oceanfront Prime Suite"],
            ["Amex", "FHR — breakfast for 2, ~$100 credit, upgrade when available, late checkout"],
          ],
          price: "$40,101",
          priceHigh: true,
          priceSrc:
            "Expedia OV total · Apr 17–24 2027 · refundable · $4,826/nt · as of Oct 6 2026 PT — skip unless celebration",
          links: [
            { label: "Amex FHR", href: "https://www.americanexpress.com/en-us/travel/discover/property/four-seasons-resort-maui-at-wailea", solid: true },
            { label: "Official", href: "https://www.fourseasons.com/maui/" },
            { label: "Expedia", href: "https://www.expedia.com/Kihei-Hotels-Four-Seasons-Resort-Maui-At-Wailea.h14336.Hotel-Information" },
          ],
        },
        {
          tag: "Beachfront mega-resort · FHR",
          name: "Grand Wailea",
          blurb:
            "Wide Wailea Beach frontage; strong for families/pools. Still excellent beachfront OV if rate/Amex deal wins — less intimate than Andaz / FS / Hotel Wailea.",
          meta: [
            ["Request", "Deluxe Ocean View (unobstructed); Napua Ocean View for club benefits"],
            ["Amex", "FHR · Waldorf Astoria / Hilton Honors"],
          ],
          price: "Check Amex",
          priceSrc:
            "Book via FHR for breakfast + $100 credit + upgrade odds · estimate band ~$500–1,400+/nt OV · as of Oct 6 2026 PT",
          links: [
            { label: "Amex FHR", href: "https://www.americanexpress.com/en-us/travel/discover/property/Hawaii-US/Wailea/Grand-Wailea-A-Waldorf-Astoria-Resort", solid: true },
            { label: "Ocean View King", href: "https://www.grandwailea.com/stay/ocean-view-king" },
            { label: "Rooms", href: "https://www.grandwailea.com/stay/rooms-suites" },
          ],
        },
      ],
      extra:
        '<strong>Also on Expedia (Bonvoy-friendly, not shortlist for “great OV resort”):</strong> AC Hotel Maui Wailea — $4,521 OV total Apr 17–24 · refundable · Bonvoy. Residence Inn Maui Wailea — $3,806 · refundable · no resort fee + breakfast · Bonvoy. Useful if budget-tight; romance bar is below Andaz / Fairmont / Hotel Wailea.',
      activitiesIntro:
        "Chill + fully guided — resort mornings, ≤1 outing most days. Prefer Wailea / south-Maui operators and hotel pickup. Nov is early whale season.",
      activities: [
        {
          name: "Kai Kanani · Molokini Signature snorkel",
          vibe: "Catamaran · guided",
          why: "Only South Maui departure — short ride to Molokini + Turtle Town. Naturalists, gear, food/bar. Wailea resort shuttle.",
          duration: "~3.5 hrs",
          price: "$269/adult · live",
          day: "Day 3 morning",
          image: "media/kaikanani-signature-snorkel.webp",
          links: [
            { label: "Book snorkel", href: "https://kaikanani.com/our-tours/signature-deluxe-snorkel/", solid: true },
          ],
        },
        {
          name: "Kai Kanani · Adventure Sunset Sail",
          vibe: "Sunset sail · guided",
          why: "2-hr South Maui sail, plated pupus, open bar, sparkling toast, live music. No Lahaina Harbor. Wailea shuttle.",
          duration: "~2 hrs",
          price: "$199/adult · live",
          day: "Day 2 evening",
          image: "media/kaikanani-sunset-sail.webp",
          links: [
            { label: "Book sunset sail", href: "https://kaikanani.com/our-tours/adventure-sunset-sail/", solid: true },
          ],
        },
        {
          name: "Pacific Whale Foundation · Classic Whale Watch",
          vibe: "Early-season whale · optional",
          why: "Naturalist-led ~2-hr Maʻalaea cruise. Nov 10–17 is early season — sightings possible but less reliable than Jan–Mar. Book with soft expectations.",
          duration: "~2 hrs",
          price: "From ~$99 · live",
          day: "Day 5 morning (optional)",
          image: "media/pacwhale-whale-watch.webp",
          links: [
            { label: "Book PacWhale", href: "https://pacwhale.com/ecotours/whale-dolphin/", solid: true },
          ],
        },
        {
          name: "Resort spa · couples massage",
          vibe: "Spa · on-property",
          why: "Andaz ʻĀwili couples suites / hydrotherapy, or FS Kai Holo oceanside hale. Zero logistics — mid-trip reset.",
          duration: "50–90 min",
          price: "Menu n/a · est. ~$200–400+/pp",
          day: "Day 5 afternoon",
          image: "media/andaz-spa.webp",
          links: [
            { label: "Andaz spa", href: "https://andazmauiatwailea.com/spa-and-wellness/", solid: true },
            { label: "FS spa", href: "https://www.fourseasons.com/maui/spa/" },
          ],
        },
        {
          name: "Kihei food tour or resort chef’s table",
          vibe: "Food · guided / seated",
          why: "Local Tastes of Maui Kihei culinary walk (~2 hrs) — chill tastings, not a crawl. Or book chef’s table / tasting at Andaz / Fairmont / FS.",
          duration: "~2–3 hrs",
          price: "Check operator / restaurant",
          day: "Day 6 evening",
          links: [
            { label: "Kihei tour info", href: "https://www.mauihawaii.org/kihei-tour/", solid: true },
          ],
        },
        {
          name: "Optional · Blue Hawaiian Majestic Maui (doors-on)",
          vibe: "Scenic heli · optional",
          why: "Doors-on scenic overview — skip if either partner prefers zero flight noise. Not adrenaline / doors-off.",
          duration: "~50 min flight",
          price: "From $419/pp · live",
          day: "Day 7 morning or skip",
          image: "media/bluehawaiian-majestic-maui.webp",
          links: [
            { label: "Book Majestic Maui", href: "https://www.bluehawaiian.com/en/maui/tours/majestic-maui", solid: true },
          ],
        },
      ],
      itineraryTitle: "Sample 7-day chill · Maui Nov 10–17, 2026",
      itineraryNote:
        "Resort mornings + at most one guided thing most days. Two+ rest blocks built in. Verify operators live.",
      itinerary: [
        { day: "Mon Nov 10", plan: "Arrive OGG → resort transfer. Beach / pool. Early night. No activity." },
        { day: "Tue Nov 11", plan: "Resort morning. Evening: Kai Kanani Adventure Sunset Sail (Wailea shuttle)." },
        { day: "Wed Nov 12", plan: "Morning: Kai Kanani Molokini Signature snorkel (hotel pickup). Afternoon pool / nap." },
        { day: "Thu Nov 13", plan: "Full resort rest day — Wailea Beach Walk, sunset from room / beach." },
        { day: "Fri Nov 14", plan: "Optional early PacWhale whale watch if reports are good — else sleep in. Afternoon: couples spa." },
        { day: "Sat Nov 15", plan: "Late start. Kihei food tour or resort chef’s table / tasting dinner." },
        { day: "Sun Nov 16", plan: "Optional scenic heli or second beach day. Celebration dinner on-property." },
        { day: "Mon Nov 17", plan: "Breakfast, late checkout if FHR, transfer to OGG." },
      ],

    },

    oahu: {
      id: "oahu",
      name: "Oahu",
      airport: "HNL",
      recommended: false,
      title: "Oahu / Honolulu",
      eyebrow: "Runner-up · Strongest flights",
      pitch:
        "Best Bay Area seat capacity and easiest nonstops — but Waikiki is an urban beach vibe, not a secluded couples resort strip. Stronger if you want city + beach on a first Hawaii trip.",
      fit: [
        "Strongest nonstops from SFO + SJC (Alaska, United, Southwest)",
        "Weaker secluded resort vibe vs Wailea / Kohala",
        "OV options: Halekulani (Waikiki), Four Seasons Oahu at Ko Olina, Ko Olina lagoon resorts",
        "Skip as primary for this “great ocean-view resort” brief — solid runner-up for first-timers",
      ],
      flights: {
        headline: "Nonstop Bay Area → HNL",
        body:
          "Highest capacity of any Hawaii route from the Bay Area. SFO–HNL (~216 monthly Oct 2026 HVCB) and SJC–HNL (Alaska + Southwest).",
        rows: [
          { route: "SFO → HNL", note: "Alaska, United · strongest capacity" },
          { route: "SJC → HNL", note: "Alaska, Southwest" },
        ],
        companion:
          "Companion Pass helps on SJC–HNL Southwest, but this brief still prefers Maui’s resort density. WN to HNL is useful if you choose Oahu for city+beach — less of a “resort seclusion” win than SJC–OGG for Maui.",
        snapshots: [
          { window: "Cheapest cash (2 pax)", price: "~$739", detail: "SJC Southwest Companion Pass option · scan Oct 6 2026 PT" },
          { window: "CP From (Dot Nov)", price: "~$426", detail: "~$415 + $11 companion taxes · seats not held" },
        ],
      },
      shortlist:
        "Low: Hyatt Place Waikiki $1,655. Base: OUTRIGGER Reef Waikiki Beach $2,608. High: Halekulani $6,849 (Expedia Nov 10–17).",
      hotels: [
        {
          tag: "Recommended · Mid-range (Low)",
          shortlist: true,
          name: "Hyatt Place Waikiki Beach",
          blurb:
            "City view + breakfast included. Live Expedia total Nov 10–17 2026 — Oahu Low stay (Base is OUTRIGGER Reef).",
          meta: [
            ["Room", "Deluxe 1 King + sofa · city view · breakfast"],
            ["Refundable", "Fully refundable before Nov 7 (confirm live)"],
          ],
          price: "$1,655",
          priceSrc: "Expedia live · Nov 10–17 2026 · 7n · $199/nt · as of Oct 7 2026 PT",
          links: [
            { label: "Expedia", href: "https://www.expedia.com/Honolulu-Hotels-Hyatt-Place-Waikiki-Beach.h2766.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2", solid: true },
          ],
        },
        {
          tag: "High step-up · Waikiki icon · estimate",
          name: "Halekulani",
          blurb:
            "Classic Waikiki oceanfront luxury; House Without a Key sunset vibe. True ocean-facing categories, but urban beach setting — less secluded than Wailea.",
          meta: [
            ["Request", "Ocean View / Deluxe Ocean View — confirm unobstructed Pacific"],
            ["Fit", "Strong if you want dining, shopping, and beach in one walkable district"],
          ],
          price: "~$700–1,400+/nt",
          priceSrc: "Estimate · OV / oceanfront bands · as of Oct 6 2026 PT · verify live",
          links: [
            { label: "Official", href: "https://www.halekulani.com/", solid: true },
            { label: "Amex Travel search", href: "https://www.americanexpress.com/en-us/travel/discover/property-results/dt/5/d/Honolulu" },
          ],
        },
        {
          tag: "Ko Olina · lagoon resort · estimate",
          name: "Four Seasons Resort Oahu at Ko Olina",
          blurb:
            "West-side lagoon resort — more “resort bubble” than Waikiki. Ocean / lagoon views; stronger seclusion than downtown Honolulu.",
          meta: [
            ["Request", "Ocean View or higher; lagoon-facing can feel softer than open Pacific"],
            ["Amex", "Often FHR — confirm live on Amex Travel"],
          ],
          price: "~$1,000–2,000+/nt",
          priceSrc: "Estimate · premium OV / club bands · as of Oct 6 2026 PT · verify live",
          links: [
            { label: "Official", href: "https://www.fourseasons.com/oahu/", solid: true },
            { label: "Amex Travel", href: "https://www.americanexpress.com/en-us/travel/discover/property-results/dt/5/d/Oahu" },
          ],
        },
        {
          tag: "Ko Olina · lagoon · estimate",
          name: "Ko Olina lagoon resorts (Aulani / Disney, Marriott, etc.)",
          blurb:
            "Man-made lagoons and west-shore sunsets. Family-leaning at Aulani; other Ko Olina properties vary. Solid OV “resort” feel if Maui isn’t available — still second to Wailea for this couples brief.",
          meta: [
            ["Note", "Pick adults-leaning inventory carefully; many properties skew family"],
            ["Flights", "Same strong HNL nonstops; ~30–45 min transfer from HNL"],
          ],
          price: "Varies widely",
          priceSrc: "Estimate · check Amex Travel / official · as of Oct 6 2026 PT",
          links: [
            { label: "Amex Oahu luxury", href: "https://www.americanexpress.com/en-us/travel/discover/property-results/dt/5/d/Oahu", solid: true },
          ],
        },
      ],
      extra:
        "For this brief, treat Oahu as the flight-convenience runner-up — not the primary ocean-view resort pick. Maui still wins on couples density + SJC Companion Pass for OGG.",
      activitiesIntro:
        "Chill guided picks for Waikiki / Ko Olina — sails, spa, food. Urban beach vibe; keep the pace soft.",
      activities: [
        {
          name: "Waikiki Spirit of Aloha sunset sail",
          vibe: "Sunset sail · guided",
          why: "Short beach-departure catamaran; drinks + light bites. Low logistics if staying Waikiki.",
          duration: "~1–2 hrs",
          price: "Check operator (~$80–150 est.)",
          day: "Evening of Day 2",
          links: [
            { label: "Spirit of Aloha", href: "https://waikiki-sunset-cruise.com/spirit-of-aloha-sunset-cruise/", solid: true },
          ],
        },
        {
          name: "Turtle Canyon snorkel sail (Manu Kai style)",
          vibe: "Snorkel boat · guided",
          why: "Guided reef snorkel off Waikiki with gear + drinks — half-day energy, not a dive expedition.",
          duration: "Half-day",
          price: "Check operator",
          day: "Day 3 morning",
          links: [
            { label: "VELTRA listing", href: "https://www.hawaiiactivities.com/en/hawaii/oahu/a/200336", solid: true },
          ],
        },
        {
          name: "Resort spa · couples massage",
          vibe: "Spa · on-property",
          why: "Halekulani or Four Seasons Ko Olina spa — zero transfer stress.",
          duration: "50–90 min",
          price: "Check spa menu",
          day: "Day 4 afternoon",
          links: [
            { label: "Halekulani", href: "https://www.halekulani.com/", solid: true },
            { label: "FS Oahu", href: "https://www.fourseasons.com/oahu/" },
          ],
        },
        {
          name: "Guided Honolulu food tasting walk",
          vibe: "Food · guided",
          why: "Chinatown / Kakaʻako style culinary walk — tastings, not a nightlife crawl.",
          duration: "~2–3 hrs",
          price: "Check operator",
          day: "Day 5 late afternoon",
          links: [
            { label: "Search food tours", href: "https://www.google.com/search?q=Honolulu+guided+food+tour", solid: true },
          ],
        },
        {
          name: "Ko Olina lagoon beach day",
          vibe: "Resort · chill",
          why: "If west-side: calm lagoon swim + resort cabana. Prefer resort shuttle / transfer vs DIY North Shore day.",
          duration: "Half / full day",
          price: "Resort day · free–cabana fees",
          day: "Day 6",
          links: [
            { label: "FS Ko Olina", href: "https://www.fourseasons.com/oahu/", solid: true },
          ],
        },
      ],

    },

    bigisland: {
      id: "bigisland",
      name: "Big Island",
      airport: "KOA",
      recommended: false,
      title: "Big Island / Kona",
      eyebrow: "Runner-up · Seclusion + lava",
      pitch:
        "Kohala Coast luxury is excellent — dramatic lava-coast views, snorkel, and volcano day trips. Resorts are more spread out (car more useful). Four Seasons Hualalai is often cited among the state’s top resorts.",
      fit: [
        "Best if the resort itself + lava/snorkel scenery is the trip",
        "SFO nonstops only — no SJC–KOA nonstop in Oct 2026 HVCB grid",
        "Companion Pass less useful for the nonstop constraint (no SJC WN to KOA)",
        "FS Hualalai / Fairmont Orchid lead the OV luxury set",
      ],
      flights: {
        headline: "Nonstop Bay Area → KOA",
        body:
          "SFO–KOA on Alaska + United (~94 monthly Oct 2026 HVCB). SJC has zero KOA nonstops in that grid — plan SFO only for nonstop.",
        rows: [
          { route: "SFO → KOA", note: "Alaska, United · ~94 monthly" },
          { route: "SJC → KOA", note: "No nonstop (Oct 2026 HVCB) — connecting only" },
        ],
        companion:
          "No SJC–KOA Southwest nonstop in HVCB grid — cash nonstops are SFO. Dot still shows a CP “From” (~$511+$11) for Nov; treat as estimate (seats not held), not a held nonstop. Prefer Maui if CP + SJC WN is the priority.",
        snapshots: [
          { window: "Cheapest cash (2 pax)", price: "~$913", detail: "Mar 2–9 2027 · improved from ~$1,033 Nov 6–13" },
          { window: "CP From (Dot Nov)", price: "~$522", detail: "~$511 + $11 companion taxes · seats not held" },
        ],
      },
      shortlist:
        "Low: Courtyard Kona Beach resort view $2,075. Base: Outrigger Kona Resort & Spa $2,516. High: Fairmont Orchid $8,450 (Expedia Nov 10–17).",
      hotels: [
        {
          tag: "Recommended · Mid-range (Low)",
          shortlist: true,
          name: "Courtyard King Kamehameha’s Kona Beach",
          blurb:
            "Resort-view 2 Queen. Live Expedia total Nov 10–17 2026. Kona Coast View alt ~$2,474 same week.",
          meta: [
            ["Room", "2 Queen · Resort View (OV alt available)"],
            ["Refundable", "Fully refundable before Nov 7 · pay later (confirm live)"],
          ],
          price: "$2,075",
          priceSrc: "Expedia live · Nov 10–17 2026 · 7n · $250/nt · as of Oct 7 2026 PT",
          links: [
            { label: "Expedia", href: "https://www.expedia.com/Kailua-Kona-Hotels-Courtyard-By-Marriott-King-Kamehamehas-Kona-Beach-Hotel.h21741.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2", solid: true },
          ],
        },
        {
          tag: "High step-up · Kohala · estimate",
          shortlist: false,
          name: "Four Seasons Resort Hualalai",
          blurb:
            "Benchmark Big Island luxury on the Kona-Kohala coast — lava rock pools, private beach club feel, strong ocean-facing categories. Frequently cited as Hawaiʻi’s top resort.",
          meta: [
            ["Request", "Ocean View / Oceanfront — confirm category at booking"],
            ["Amex", "Typically FHR — confirm live"],
          ],
          price: "~$1,200–2,500+/nt",
          priceSrc: "Estimate · premium OV bands · as of Oct 6 2026 PT · verify live",
          links: [
            { label: "Official", href: "https://www.fourseasons.com/hualalai/", solid: true },
            { label: "Amex Travel", href: "https://www.americanexpress.com/en-us/travel/discover/property-results/dt/5/d/Kona" },
          ],
        },
        {
          tag: "High step-up · Kohala · estimate",
          shortlist: false,
          name: "Fairmont Orchid",
          blurb:
            "Full-service Kohala Coast resort with beach, spa, and golf. Solid ocean-view inventory; more classic resort scale than Hualalai’s intimate luxury.",
          meta: [
            ["Request", "Ocean View or partial — push for unobstructed at check-in"],
            ["Fit", "Good if you want amenities + lava-coast scenery without FS pricing"],
          ],
          price: "~$500–1,200+/nt",
          priceSrc: "Estimate · OV bands · as of Oct 6 2026 PT · verify live",
          links: [
            { label: "Official", href: "https://www.fairmont.com/en/hotels/hawaii/fairmont-orchid.html", solid: true },
            { label: "Amex Travel", href: "https://www.americanexpress.com/en-us/travel/discover/property-results/dt/5/d/Kohala" },
          ],
        },
        {
          tag: "Also consider · estimate",
          name: "Mauna Lani / Hapuna Beach area",
          blurb:
            "Additional Kohala luxury options with strong Pacific sightlines. Worth a live Amex Travel scan if Hualalai/Orchid dates or rates miss.",
          meta: [
            ["Car", "More useful on Big Island — resorts spaced along the coast"],
            ["Day trips", "Volcanoes National Park is a full-day commitment from Kohala"],
          ],
          price: "Varies",
          priceSrc: "Estimate · check Amex / official · as of Oct 6 2026 PT",
          links: [
            { label: "Amex Big Island", href: "https://www.americanexpress.com/en-us/travel/discover/property-results/dt/5/d/Hawaii", solid: true },
          ],
        },
      ],
      extra:
        "Runner-up if seclusion + lava/snorkel beat Wailea’s walkable strip — accept SFO-only nonstops and weaker Companion Pass utility.",
      activitiesIntro:
        "Kohala / Kona chill — guided snorkel, optional manta evening, spa. Car useful; prefer hotel pickup when offered.",
      activities: [
        {
          name: "Fair Wind · Kealakekua morning snorkel",
          vibe: "Snorkel boat · guided",
          why: "Stable boat, breakfast + lunch, guided snorkel at Captain Cook. Classic chill Big Island water day.",
          duration: "~4.5 hrs",
          price: "From ~$158 adult (est.)",
          day: "Day 3",
          links: [
            { label: "Fair Wind", href: "https://www.fair-wind.com/morning-kealakekua-snorkel-tour/", solid: true },
          ],
        },
        {
          name: "Sunset + manta ray snorkel",
          vibe: "Evening · guided",
          why: "Kona Style / Sea Paradise guided float; some boats offer ride-along if one person skips the water.",
          duration: "~3–4 hrs",
          price: "Check operator (~$100–150 band)",
          day: "Day 4 evening",
          links: [
            { label: "Kona Style", href: "https://konasnorkelandsail.com/sunset-manta-ray-snorkel/", solid: true },
            { label: "Sea Paradise", href: "https://seaparadise.com/1st-manta-ray-snorkel-tour/" },
          ],
        },
        {
          name: "Resort spa · couples massage",
          vibe: "Spa · on-property",
          why: "FS Hualalai or Fairmont Orchid — mid-trip reset without leaving the resort bubble.",
          duration: "50–90 min",
          price: "Check spa menu",
          day: "Day 5 afternoon",
          links: [
            { label: "FS Hualalai", href: "https://www.fourseasons.com/hualalai/", solid: true },
            { label: "Fairmont Orchid", href: "https://www.fairmont.com/en/hotels/hawaii/fairmont-orchid.html" },
          ],
        },
        {
          name: "Guided Kona coffee / farm tasting",
          vibe: "Food · guided",
          why: "Short seated tasting — skip long DIY mountain drives at dusk.",
          duration: "~2–3 hrs",
          price: "Check operator",
          day: "Day 6 morning",
          links: [
            { label: "Search Kona coffee tour", href: "https://www.google.com/search?q=Kona+guided+coffee+farm+tour+hotel+pickup", solid: true },
          ],
        },
        {
          name: "Calm Kailua Pier sunset sail (non-manta)",
          vibe: "Sunset sail · guided",
          why: "Backup if manta cancels for weather — still a golden-hour guided outing.",
          duration: "~2 hrs",
          price: "Check operator",
          day: "Flex evening",
          links: [
            { label: "Search Kona sunset sail", href: "https://www.google.com/search?q=Kailua+Kona+sunset+sail+catamaran", solid: true },
          ],
        },
      ],

    },

    kauai: {
      id: "kauai",
      name: "Kauai",
      airport: "LIH",
      recommended: false,
      title: "Kauai / Lihue",
      eyebrow: "Quieter · North Shore / Poipu",
      pitch:
        "Quieter, greener island with dramatic North Shore cliffs and sunny Poipu south shore. Luxury ocean-view inventory exists but is thinner than Wailea’s density. Strong if you want slower pace and nature over resort-strip dining.",
      fit: [
        "SFO nonstops (Alaska, United · ~85 monthly Oct 2026 HVCB)",
        "No SJC–LIH nonstop in Oct 2026 grid — Companion Pass less useful for nonstop",
        "North Shore (Princeville) and Poipu luxury / OV angle",
        "Brief card set — less researched than Maui for this trip",
      ],
      flights: {
        headline: "Nonstop Bay Area → LIH",
        body:
          "SFO–LIH on Alaska + United. SJC has no LIH nonstop in the Oct 2026 HVCB grid — same SFO-only constraint as KOA for nonstop travel.",
        rows: [
          { route: "SFO → LIH", note: "Alaska, United · ~85 monthly" },
          { route: "SJC → LIH", note: "No nonstop (Oct 2026 HVCB)" },
        ],
        companion:
          "No SJC–LIH Southwest nonstop in HVCB grid — cash nonstops are SFO. Dot still shows a CP “From” (~$325+$11) for Nov; treat as estimate (seats not held). Maui remains the cleaner CP nonstop story.",
        snapshots: [
          { window: "Cheapest cash (2 pax)", price: "~$721", detail: "Nov window ~Nov 12–19 · scan Oct 6 2026 PT" },
          { window: "CP From (Dot Nov)", price: "~$336", detail: "~$325 + $11 companion taxes · seats not held" },
        ],
      },
      shortlist:
        "Low: Kauai Shores $2,335 garden. Base: Sheraton Kauai Resort Villas $3,050. High: Koloa Landing $3,978 (Expedia Nov 10–17; Grand Hyatt not listed).",
      hotels: [
        {
          tag: "Recommended · Mid-range (Low)",
          shortlist: true,
          name: "Kauai Shores Hotel",
          blurb:
            "Garden-view renovated room; parking included. Live Expedia total Nov 10–17 2026 — Kauai Low stay (Base is Sheraton Villas).",
          meta: [
            ["Room", "Garden View (renovated) · parking included"],
            ["Refundable", "Fully refundable before Nov 7 (confirm live)"],
          ],
          price: "$2,335",
          priceSrc: "Expedia live · Nov 10–17 2026 · 7n · $281/nt · as of Oct 7 2026 PT",
          links: [
            { label: "Expedia", href: "https://www.expedia.com/Kapaa-Hotels-Kauai-Shores-Hotel.h9733.Hotel-Information?chkin=2026-11-10&chkout=2026-11-17&rm1=a2", solid: true },
          ],
        },
        {
          tag: "High step-up · North Shore · estimate",
          name: "1 Hotel Hanalei Bay / Princeville area",
          blurb:
            "North Shore drama — cliffs, Hanalei views, quieter luxury. Weather can be wetter than Poipu; views can be spectacular on clear days.",
          meta: [
            ["Request", "Ocean View / cliff-facing — confirm sightline"],
            ["Fit", "Romance + nature; less “beach club strip” than Wailea"],
          ],
          price: "~$800–1,800+/nt",
          priceSrc: "Estimate · luxury OV bands · as of Oct 6 2026 PT · verify live",
          links: [
            { label: "Amex Kauai", href: "https://www.americanexpress.com/en-us/travel/discover/property-results/dt/5/d/Kauai", solid: true },
          ],
        },
        {
          tag: "High step-up · Poipu · estimate",
          name: "Poipu luxury (Grand Hyatt Kauai & peers)",
          blurb:
            "Sunniest side of Kauai; classic resort beaches. Grand Hyatt Kauai and nearby luxury properties offer ocean-facing rooms — Hyatt points may apply at GH Kauai (check OV award inventory).",
          meta: [
            ["Loyalty", "Hyatt ~137k could matter at Grand Hyatt Kauai if OV awards exist"],
            ["Amex", "Scan FHR / Hotel Collection for Poipu properties"],
          ],
          price: "~$500–1,200+/nt",
          priceSrc: "Estimate · OV bands · as of Oct 6 2026 PT · verify live",
          links: [
            { label: "Hyatt — Grand Hyatt Kauai", href: "https://www.hyatt.com/grand-hyatt/en-US/lihgh-grand-hyatt-kauai-resort-and-spa", solid: true },
            { label: "Amex Kauai", href: "https://www.americanexpress.com/en-us/travel/discover/property-results/dt/5/d/Kauai" },
          ],
        },
        {
          tag: "Also · estimate",
          name: "Other Kauai oceanfront luxury",
          blurb:
            "Inventory is thinner than Maui. If Kauai wins on vibe, shortlist 2–3 properties on Amex Travel with confirmed Ocean View categories before locking flights.",
          meta: [
            ["Note", "Car often useful — island is spread out"],
            ["Weather", "North Shore wetter Nov–Mar; Poipu generally drier"],
          ],
          price: "Varies",
          priceSrc: "Estimate · as of Oct 6 2026 PT",
          links: [
            { label: "Amex Kauai luxury", href: "https://www.americanexpress.com/en-us/travel/discover/property-results/dt/5/d/Kauai", solid: true },
          ],
        },
      ],
      extra:
        "Quieter alternative when Maui dates or rates miss — accept thinner OV resort density and SFO-only nonstops.",
      activitiesIntro:
        "Nāpali by boat (not hike), spa, seated food. Prefer guided sails over cliff-road DIY if either partner gets nervy.",
      activities: [
        {
          name: "Capt. Andy’s Star · Nāpali sunset dinner sail",
          vibe: "Sunset dinner · guided",
          why: "Luxury catamaran, chef dinner, open bar along Nāpali — the chill way to see the cliffs.",
          duration: "~4.5 hrs",
          price: "~$260 adult (est.)",
          day: "Day 3 evening",
          links: [
            { label: "Capt. Andy’s", href: "https://www.napali.com/star/dinner/", solid: true },
          ],
        },
        {
          name: "Holo Holo / Kauai Sea Tours · Nāpali scenic (no snorkel)",
          vibe: "Scenic boat · guided",
          why: "Coastal sightseeing without the snorkel logistics — softer energy than combo adventure tours.",
          duration: "~3.5–4.5 hrs",
          price: "Check operator",
          day: "Day 2 or 4",
          links: [
            { label: "Holo Holo", href: "https://holoholocharters.com/tour/kauai-sunset-dinner-adventure/", solid: true },
          ],
        },
        {
          name: "Resort spa · couples massage",
          vibe: "Spa · on-property",
          why: "Grand Hyatt Kauai or North Shore luxury spa — pure reset.",
          duration: "50–90 min",
          price: "Check spa menu",
          day: "Day 5 afternoon",
          links: [
            { label: "Grand Hyatt Kauai", href: "https://www.hyatt.com/grand-hyatt/en-US/lihgh-grand-hyatt-kauai-resort-and-spa", solid: true },
          ],
        },
        {
          name: "Poipu seated tasting / luau-lite dinner",
          vibe: "Food · seated",
          why: "Prefer restaurant tasting or calm luau over island-wide food crawls.",
          duration: "~2–3 hrs",
          price: "Check restaurant",
          day: "Day 6 evening",
          links: [
            { label: "Amex Kauai", href: "https://www.americanexpress.com/en-us/travel/discover/property-results/dt/5/d/Kauai", solid: true },
          ],
        },
        {
          name: "Optional doors-on scenic helicopter",
          vibe: "Scenic heli · optional",
          why: "Only if both want aerial Na Pali / canyon views — doors-on, not doors-off.",
          duration: "~45–60 min",
          price: "Check operator",
          day: "Optional · or skip",
          links: [
            { label: "Search Kauai scenic heli", href: "https://www.google.com/search?q=Kauai+doors+on+scenic+helicopter+tour", solid: true },
          ],
        },
      ],

    },
  };

  const DISABLED = {
    molokai: "Not recommended for this brief — limited luxury ocean-view resort density.",
    lanai: "Not recommended for this brief — Four Seasons Lanai is ultra-luxury / limited access; not the Bay Area nonstop couples plan.",
  };

  const els = {
    panel: document.getElementById("island-panel"),
    live: document.getElementById("island-live"),
    chips: document.querySelectorAll("[data-island-select]"),
    shapes: document.querySelectorAll("[data-island-shape]"),
    disabled: document.querySelectorAll("[data-island-disabled]"),
    hotelsHeading: document.getElementById("hotels-heading"),
    hotelsLede: document.getElementById("hotels-lede"),
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function hotelCard(h) {
    const cls = ["hotel-card"];
    if (h.shortlist) cls.push("shortlist");
    if (h.skip) cls.push("skip");
    const meta = (h.meta || [])
      .map(
        ([dt, dd]) =>
          `<dt>${escapeHtml(dt)}</dt><dd>${escapeHtml(dd)}</dd>`
      )
      .join("");
    const links = (h.links || [])
      .map(
        (l) =>
          `<a class="btn${l.solid ? " btn-solid" : ""}" href="${escapeHtml(l.href)}" rel="noopener" target="_blank">${escapeHtml(l.label)}</a>`
      )
      .join("");
    return `
      <article class="${cls.join(" ")}">
        <div class="hotel-card-top">
          <p class="tag">${escapeHtml(h.tag)}</p>
          <h3>${escapeHtml(h.name)}</h3>
        </div>
        <div class="hotel-body">
          <p>${escapeHtml(h.blurb)}</p>
          <dl class="hotel-meta">${meta}</dl>
          <div class="price-tag">
            <div class="amount${h.priceHigh ? " high" : ""}">${escapeHtml(h.price)}</div>
            <div class="src">${escapeHtml(h.priceSrc)}</div>
          </div>
        </div>
        <div class="hotel-links">${links}</div>
      </article>`;
  }

  function activityCard(a) {
    const links = (a.links || [])
      .map(
        (l) =>
          `<a class="btn${l.solid ? " btn-solid" : ""}" href="${escapeHtml(l.href)}" rel="noopener" target="_blank">${escapeHtml(l.label)}</a>`
      )
      .join("");
    const img = a.image
      ? `<div class="activity-media"><img src="${escapeHtml(a.image)}" alt="" loading="lazy" width="640" height="400" /></div>`
      : "";
    return `
      <article class="activity-card">
        ${img}
        <p class="tag">${escapeHtml(a.vibe)}</p>
        <h4>${escapeHtml(a.name)}</h4>
        <p class="activity-why">${escapeHtml(a.why)}</p>
        <dl class="activity-meta">
          <dt>Duration</dt><dd>${escapeHtml(a.duration)}</dd>
          <dt>Price</dt><dd>${escapeHtml(a.price)}</dd>
          <dt>Best day</dt><dd>${escapeHtml(a.day)}</dd>
        </dl>
        <div class="hotel-links">${links}</div>
      </article>`;
  }

  function activitiesBlock(data) {
    if (!data.activities || !data.activities.length) return "";
    const cards = data.activities.map(activityCard).join("");
    let itin = "";
    if (data.itinerary && data.itinerary.length) {
      const rows = data.itinerary
        .map(
          (r) =>
            `<div class="itin-row"><strong>${escapeHtml(r.day)}</strong><span>${escapeHtml(r.plan)}</span></div>`
        )
        .join("");
      itin = `
        <div class="itin-block">
          <h4>${escapeHtml(data.itineraryTitle || "Sample chill itinerary")}</h4>
          <p class="itin-note">${escapeHtml(data.itineraryNote || "")}</p>
          <div class="itin-rows">${rows}</div>
        </div>`;
    }
    return `
      <div class="island-activities-block" id="activities">
        <p class="section-label">Do</p>
        <h3>Activities — chill &amp; guided</h3>
        <p class="lede">${escapeHtml(data.activitiesIntro || "Fully guided, low-stress picks. Prefer hotel pickup.")}</p>
        <p class="activity-skip"><strong>Skip:</strong> DIY Road to Hana self-drive, intense hiking, nightlife crawls.</p>
        <div class="activity-grid">${cards}</div>
        ${itin}
      </div>`;
  }


  function money(n) {
    return "$" + Number(n).toLocaleString("en-US");
  }

  function tiersBlock(islandId) {
    const t = TIERS[islandId];
    if (!t) return "";
    const order = ["low", "base", "high"];
    const labels = { low: "Low", base: "Base", high: "High" };
    const cards = order
      .map((key) => {
        const row = t[key];
        const rec = row.recommend ? " is-recommended" : "";
        const badge = row.recommend ? '<span class="tier-badge">Recommended default</span>' : "";
        return `
        <article class="tier-card tier-${key}${rec}">
          ${badge}
          <h4>${labels[key]}</h4>
          <div class="tier-total">${money(row.total)}</div>
          <p class="tier-dates">${escapeHtml(row.dates)}</p>
          <ul class="tier-breakdown">
            <li><span>Flights</span><strong>${money(row.flight)}</strong></li>
            <li class="tier-note">${escapeHtml(row.flightNote)}</li>
            <li><span>Hotel</span><strong>${money(row.hotel)}</strong></li>
            <li class="tier-note">${escapeHtml(row.hotelNote)}</li>
            <li><span>Other</span><strong>${money(row.other)}</strong></li>
          </ul>
          <p class="tier-stay">${row.stayUrl ? `<a href="${escapeHtml(row.stayUrl)}" target="_blank" rel="noopener">${escapeHtml(row.stay)}</a>` : escapeHtml(row.stay)}</p>
        </article>`;
      })
      .join("");
    return `
      <div class="island-tiers-block" id="tiers">
        <p class="section-label">All-in</p>
        <h3>Low · Base · High</h3>
        <p class="lede">2 adults · ~7 nights · Bay Area nonstops. Other = meals + ground + activities. CP = Companion Pass estimate (seats not held). Verified Oct 6–7 2026 PT.</p>
        <div class="tier-grid">${cards}</div>
      </div>`;
  }

  function render(islandId) {
    const data = ISLANDS[islandId];
    if (!data || !els.panel) return;

    const fit = data.fit
      .map((f) => `<li>${escapeHtml(f)}</li>`)
      .join("");
    const flightRows = data.flights.rows
      .map(
        (r) =>
          `<div class="flight-row"><strong>${escapeHtml(r.route)}</strong><span>${escapeHtml(r.note)}</span></div>`
      )
      .join("");
    const snaps = (data.flights.snapshots || [])
      .map(
        (s) =>
          `<article class="snap-card"><h4>${escapeHtml(s.window)}</h4><div class="snap-price">${escapeHtml(s.price)}</div><p>${escapeHtml(s.detail)}</p></article>`
      )
      .join("");

    const tierBlock = tiersBlock(data.id);

    els.panel.innerHTML = `
      <div class="island-panel-inner" data-active-island="${escapeHtml(data.id)}">
        <div class="island-panel-head">
          ${data.recommended ? '<span class="rec-badge">Recommended · Low default</span>' : ""}
          <p class="section-label">${escapeHtml(data.eyebrow)}</p>
          <h2 id="island-panel-title">${escapeHtml(data.title)} <span class="airport-code">${escapeHtml(data.airport)}</span></h2>
          <p class="lede">${escapeHtml(data.pitch)}</p>
          <ul class="fit-list">${fit}</ul>
        </div>

        ${tierBlock}

        <div class="island-flights">
          <h3>${escapeHtml(data.flights.headline)}</h3>
          <p>${escapeHtml(data.flights.body)}</p>
          <div class="flight-rows">${flightRows}</div>
          <aside class="callout companion" role="note">
            <strong>Companion Pass:</strong> ${escapeHtml(data.flights.companion)}
          </aside>
          <div class="snap-grid">${snaps}</div>
        </div>

        <div class="island-hotels-block" id="hotels">
          <p class="section-label">Stay</p>
          <h3 id="hotels-heading-dyn">Stays — ${escapeHtml(data.title)}</h3>
          <p class="lede">${escapeHtml(
            "Each tier uses a distinct named hotel (live Expedia Nov 10–17). Hotel names on Low/Base/High cards are clickable. Confirm categories and refund rules live."
          )}</p>
          <div class="shortlist-banner">${data.shortlist}</div>
          <div class="hotel-grid">${data.hotels.map(hotelCard).join("")}</div>
          ${data.extra ? `<div class="loyalty-callout mt-2"><p>${data.extra}</p></div>` : ""}
        </div>

        ${activitiesBlock(data)}
      </div>`;

    if (els.live) {
      els.live.textContent = `${data.name} selected. Showing pitch, flights, hotels, and chill guided activities for ${data.title}.`;
    }

    // Sync selection UI
    els.chips.forEach((btn) => {
      const on = btn.getAttribute("data-island-select") === islandId;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("is-selected", on);
    });
    els.shapes.forEach((shape) => {
      const on = shape.getAttribute("data-island-shape") === islandId;
      shape.classList.toggle("is-selected", on);
      shape.setAttribute("aria-pressed", on ? "true" : "false");
      shape.setAttribute("tabindex", on ? "0" : "0");
    });

    document.body.setAttribute("data-selected-island", islandId);

    // Update nav brand subtly
    const brand = document.querySelector(".nav-brand");
    if (brand) {
      brand.innerHTML = `${escapeHtml(data.name)} <span>·</span> Mid-range`;
    }
    const heroTitle = document.getElementById("hero-island-name");
    if (heroTitle) {
      heroTitle.textContent = data.name;
    }
    const heroPitch = document.getElementById("hero-pitch");
    if (heroPitch) {
      const t = TIERS[data.id] && TIERS[data.id].low;
      if (data.id === "maui" && t) {
        heroPitch.textContent =
          "Default path is mid-range: ~$541 nonstops + Kihei condo (~$1.4k) puts Maui Low near ~$3.3k all-in. Wailea Andaz is High / splurge only — not the plan default.";
      } else if (t) {
        heroPitch.textContent =
          data.pitch + " Low all-in ≈ $" + t.total.toLocaleString("en-US") + " (recommended default).";
      } else {
        heroPitch.textContent = data.pitch;
      }
    }
  }

  function selectIsland(islandId, opts) {
    if (!ISLANDS[islandId]) return;
    render(islandId);
    if (opts && opts.scroll && els.panel) {
      els.panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      history.replaceState(null, "", `#island-${islandId}`);
    } catch (_) { /* ignore */ }
  }

  function onActivate(islandId, scroll) {
    selectIsland(islandId, { scroll: !!scroll });
  }

  // Chip buttons
  els.chips.forEach((btn) => {
    btn.addEventListener("click", () => {
      onActivate(btn.getAttribute("data-island-select"), true);
    });
  });

  // SVG shapes — click + keyboard
  els.shapes.forEach((shape) => {
    shape.addEventListener("click", () => {
      onActivate(shape.getAttribute("data-island-shape"), true);
    });
    shape.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onActivate(shape.getAttribute("data-island-shape"), true);
      }
    });
  });

  // Disabled islands — tooltip / announce only
  els.disabled.forEach((el) => {
    const key = el.getAttribute("data-island-disabled");
    const msg = DISABLED[key] || "Not recommended for this brief.";
    el.setAttribute("aria-disabled", "true");
    el.setAttribute("title", msg);
    el.addEventListener("click", (e) => {
      e.preventDefault();
      if (els.live) els.live.textContent = msg;
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (els.live) els.live.textContent = msg;
      }
    });
  });

  // Initial: Maui, or hash if present
  let initial = "maui";
  const hash = (location.hash || "").replace(/^#island-/, "").replace(/^#/, "");
  if (ISLANDS[hash]) initial = hash;
  selectIsland(initial, { scroll: false });
})();
