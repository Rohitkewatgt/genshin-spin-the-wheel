// Boss location data
const bossLocations = {

    // Mondstadt

    "Anemo Hypostasis": {
        region: "Mondstadt",
        location: "Stormbearer Mountains",
        mapImage: "assets/maps/anemo-hypostasis.png"
    },

    "Electro Hypostasis": {
        region: "Mondstadt",
        location: "Cape Oath",
        mapImage: "assets/maps/electro-hypostasis.png"
    },

    "Cryo Hypostasis": {
        region: "Mondstadt",
        location: "Dragonspine — Outskirts",
        mapImage: "assets/maps/cryo-hypostasis.png"
    },

    "Cryo Regisvine": {
    region: "Mondstadt",
    location: "Thousand Winds Temple",
    mapImage: "assets/maps/cryo-regisvine.png",
    layer: "below"
},

    "Watcher: Fallen Vigil": {
        region: "Mondstadt",
        location: "Windrest Peak — Northwest of the Old Sanatorium Site",
        mapImage: "assets/maps/watcher-fallen-vigil.png"
    },

    "Dvalin": {
    region: "Mondstadt",
    location: "Stormterror's Lair",
    mapImage: "assets/maps/dvalin.png",
    layer: "above"
},


    "Andrius": {
        region: "Mondstadt",
        location: "Wolvendom",
        mapImage: "assets/maps/andrius.png"
    },

   "The Game Before the Gate": {
    region: "Mondstadt",
    location: "Unresolved Chess Game — Falcon Coast",
    mapImage: "assets/maps/the-game-before-the-gate.png",
    layer: "above"
},

    "Churldric": {
        region: "Mondstadt",
        location: "Northwest of Stormbearer Mountains",
        mapImage: "assets/maps/churldric.png"
    },

    "Maha Vasudevayaputra": {
        region: "Temple of Space",
        location: "Desert Pavilion",
        mapImage: "assets/maps/maha-vasudevayaputra.png"
    },



       // Liyue

    "Geo Hypostasis": {
        region: "Liyue",
        location: "Guyun Stone Forest",
        mapImage: "assets/maps/geo-hypostasis.png"
    },

    "Oceanid": {
        region: "Liyue",
        location: "Bishui Plain",
        mapImage: "assets/maps/oceanid.png"
    },

    "Pyro Regisvine": {
        region: "Liyue",
        location: "Cuijue Slope",
        mapImage: "assets/maps/pyro-regisvine.png"
    },

    "Primo Geovishap": {
    region: "Liyue",
    location: "Tianqiu Valley",
    mapImage: "assets/maps/primo-geovishap.png",
    layer: "below"
},

    "Solitary Suanni": {
    region: "Chenyu Vale",
    location: "Chizhang Wall",
    mapImage: "assets/maps/solitary-suanni.png",
    layer: "below"
},

    "Childe": {
        region: "Liyue",
        location: "Golden House",
        mapImage: "assets/maps/childe.png"
    },

    "Azhdaha": {
        region: "Liyue",
        location: "Beneath the Dragon-Queller",
        mapImage: "assets/maps/azhdaha.png"
    },

    "Ruler of the Chizhang Mountains": {
        region: "Chenyu Vale",
        location: "Chizhang Wall",
        mapImage: "assets/maps/ruler-of-the-chizhang-mountains.png"
    },

    "Ruin Serpent": {
        region: "The Chasm",
        location: "Underground Mines",
        mapImage: "assets/maps/ruin-serpent.png",
        layer: "below"
    },

        // Inazuma

    "Hydro Hypostasis": {
        region: "Inazuma",
        location: "Watatsumi Island",
        mapImage: "assets/maps/hydro-hypostasis.png",
        layer: "below"
    },

    "Pyro Hypostasis": {
        region: "Inazuma",
        location: "Kannazuka",
        mapImage: "assets/maps/pyro-hypostasis.png"
    },

    "Maguu Kenki": {
        region: "Inazuma",
        location: "Yashiori Island",
        mapImage: "assets/maps/maguu-kenki.png"
    },

    "Perpetual Mechanical Array": {
        region: "Inazuma",
        location: "Araumi",
        mapImage: "assets/maps/perpetual-mechanical-array.png",
        layer: "below"
    },

    "Thunder Manifestation": {
        region: "Inazuma",
        location: "Amakumo Peak",
        mapImage: "assets/maps/thunder-manifestation.png",
        layer: "above"
    },

    "Golden Wolflord": {
        region: "Inazuma",
        location: "Tsurumi Island",
        mapImage: "assets/maps/golden-wolflord.png"
    },

    "Bathysmal Vishap Herd": {
        region: "Enkanomiya",
        location: "Dainichi Mikoshi",
        mapImage: "assets/maps/bathysmal-vishap-herd.png",
        layer: "below"
    },

    "La Signora": {
    region: "Inazuma",
    location: "Tenshukaku",
    mapImage: "assets/maps/la-signora.png"
},

    "Magatsu Mitake Narukami no Mikoto": {
        region: "Inazuma",
        location: "Grand Narukami Shrine",
        mapImage: "assets/maps/magatsu-mitake-narukami-no-mikoto.png",
        layer: "below"
    },

        // Sumeru

    "Dendro Hypostasis": {
        region: "Sumeru",
        location: "Land of Lower Setekh",
        mapImage: "assets/maps/dendro-hypostasis.png",
        layer: "below"
    },

    "Jadeplume Terrorshroom": {
        region: "Sumeru",
        location: "Vissudha Field",
        mapImage: "assets/maps/jadeplume-terrorshroom.png"
    },

    "Aeonblight Drake": {
        region: "Sumeru",
        location: "Devantaka Mountain",
        mapImage: "assets/maps/aeonblight-drake.png",
        layer: "below"
    },

    "Algorithm of Semi-Intransient Matrix of Overseer Network": {
        region: "Sumeru",
        location: "The Dune of Elusion",
        mapImage: "assets/maps/algorithm-of-semi-intransient-matrix-of-overseer-network.png",
        layer: "below"
    },

    "Setekh Wenut": {
        region: "Sumeru",
        location: "Wenut Tunnels",
        mapImage: "assets/maps/setekh-wenut.png",
        layer: "below"
    },

    "Iniquitous Baptist": {
        region: "Sumeru",
        location: "Gate of Zulqarnain",
        mapImage: "assets/maps/iniquitous-baptist.png",
        layer: "below"
    },

    "Electro Regisvine": {
        region: "Sumeru",
        location: "Mawtiyima Forest",
        mapImage: "assets/maps/electro-regisvine.png",
        layer: "below"
    },

    "Shouki no Kami, the Prodigal": {
        region: "Sumeru",
        location: "Joururi Workshop",
        mapImage: "assets/maps/shouki-no-kami-the-prodigal.png"
    },

    "Guardian of Apep's Oasis": {
        region: "Sumeru",
        location: "Realm of Beginnings",
        mapImage: "assets/maps/guardian-of-apeps-oasis.png",
        layer: "below"
    },

    "Exalted Master of the Heretical Path": {
        region: "Sumeru",
        location: "Binding Field of Universal Nirvana",
        mapImage: "assets/maps/exalted-master-of-the-heretical-path.png"
    },

    // Fontaine

"Icewind Suite": {
    region: "Fontaine",
    location: "Fountain of Lucine — Near the Opera Epiclese",
    mapImage: "assets/maps/icewind-suite.png"
},

"Emperor of Fire and Iron": {
    region: "Fontaine",
    location: "Belleau Region — Underwater Cavern",
    mapImage: "assets/maps/emperor-of-fire-and-iron.png",
    layer: "underwater"
},

"Experimental Field Generator": {
    region: "Fontaine",
    location: "Fontaine Research Institute of Kinetic Energy Engineering",
    mapImage: "assets/maps/experimental-field-generator.png"
},

"Millennial Pearl Seahorse": {
    region: "Fontaine",
    location: "Liffey Region — Underwater Cave North of Liffey Region",
    mapImage: "assets/maps/millennial-pearl-seahorse.png",
    layer: "underwater"
},

"Hydro Tulpa": {
    region: "Fontaine",
    location: "Chemin de L'Espoir — Underwater Cave",
    mapImage: "assets/maps/hydro-tulpa.png",
    layer: "underwater"
},

"Legatus Golem": {
    region: "Nostoi Region",
    location: "Faded Castle — Underground Room — Fontaine",
    mapImage: "assets/maps/legatus-golem.png",
    layer: "below"
},

"All-Devouring Narwhal": {
    region: "Fontaine",
    location: "Shadow of Another World — Salacia Plain",
    mapImage: "assets/maps/all-devouring-narwhal.png",
    layer: "underwater"
},

"The Knave": {
    region: "Fontaine",
    location: "Scattered Ruins — Mont Esus East",
    mapImage: "assets/maps/the-knave.png"
},

// Fontaine — Local Legends

"Vivianne of the Lake": {
    region: "Fontaine",
    location: "North of the Court of Fontaine",
    mapImage: "assets/maps/vivianne-of-the-lake.png"
},

"Ninianne of the Lake": {
    region: "Fontaine",
    location: "North of Elynas — Beryl Region",
    mapImage: "assets/maps/ninianne-of-the-lake.png"
},

"Swords of the Gorge": {
    region: "Fontaine",
    location: "Thalatta Submarine Canyon",
    mapImage: "assets/maps/swords-of-the-gorge.png",
    layer: "underwater"
},

"Fairy Knight Twins": {
    region: "Fontaine",
    location: "Salacia Plain — Near Pale Forgotten Glory",
    mapImage: "assets/maps/fairy-knight-twins.png",
    layer: "underwater"
},

"Ocean Circuit Judge": {
    region: "Fontaine",
    location: "Elton Trench",
    mapImage: "assets/maps/ocean-circuit-judge.png",
    layer: "underwater"
},

"Iron Viscount": {
    region: "Fontaine",
    location: "Boiling Lake — Underwater Cavern",
    mapImage: "assets/maps/iron-viscount.png",
    layer: "underwater"
},

"Fading Veteran": {
    region: "Fontaine",
    location: "Elton Trench — Underwater Cavern",
    mapImage: "assets/maps/fading-veteran.png",
    layer: "underwater"
},

"Dobharcu, Lord of the Hidden": {
    region: "Fontaine",
    location: "Chemin de L'Espoir — Near Annapausis",
    mapImage: "assets/maps/dobharcu-lord-of-the-hidden.png",
    layer: "underwater"
},

"Luachra the Brilliant": {
    region: "Fontaine",
    location: "Liffey Region — Underwater Area near the Fortress of Meropide",
    mapImage: "assets/maps/luachra-the-brilliant.png",
    layer: "underwater"
},

"Yseut": {
    region: "Fontaine",
    location: "Mont Esus East",
    mapImage: "assets/maps/yseut.png"
},

"Deianeira of Snezhevna": {
    region: "Fontaine",
    location: "Mont Esus East — Near the Statue of the Seven",
    mapImage: "assets/maps/deianeira-of-snezhevna.png",
    layers: ["underwater", "below"]
},

"Automated Supercomputing Field Generator": {
    region: "Fontaine",
    location: "Fontaine Research Institute of Kinetic Energy Engineering",
    mapImage: "assets/maps/automated-supercomputing-field-generator.png"
},

"Liam": {
    region: "Fontaine",
    location: "Erinnyes Forest — Near Weeping Willow",
    mapImage: "assets/maps/liam.png"
},

"Rocky Avildsen": {
    region: "Fontaine",
    location: "Erinnyes Forest — Northeast of the Weeping Willow",
    mapImage: "assets/maps/rocky-avildsen.png"
},

"Mageblade Corrouge": {
    region: "Fontaine",
    location: "Tower of Ipsissimus — Underwater Area",
    mapImage: "assets/maps/mageblade-corrouge.png",
    layers: ["below", "underwater"]
},

"Chassanion": {
    region: "Fontaine",
    location: "Tower of Ipsissimus — Underwater Area",
    mapImage: "assets/maps/chassanion.png",
    layer: "underwater"
},

"Cineas": {
    region: "Sea of Bygone Eras",
    location: "Near the entrance to the Faded Castle",
    mapImage: "assets/maps/cineas.png",
    layers: ["underwater", "below"]
},

// Natlan

"Goldflame Qucusaur Tyrant": {
    region: "Natlan",
    location: "North of the Stadium of the Sacred Flame — Underground Cave",
    mapImage: "assets/maps/goldflame-qucusaur-tyrant.png",
    layer: "below"
},

"Gluttonous Yumkasaur Mountain King": {
    region: "Natlan",
    location: "Tequemecan Valley — Underground Cave",
    mapImage: "assets/maps/gluttonous-yumkasaur-mountain-king.png",
    layer: "below"
},

"Secret Source Automaton: Configuration Device": {
    region: "Natlan",
    location: "Toyac Springs — Underground Cave",
    mapImage: "assets/maps/secret-source-automaton-configuration-device.png",
    layer: "below"
},

"Tenebrous Papilla": {
    region: "Natlan",
    location: "Quahuacan Cliff — Underground Cave",
    mapImage: "assets/maps/tenebrous-papilla.png",
    layer: "below"
},

"Wayward Hermetic Spiritspeaker": {
    region: "Natlan",
    location: "Tezcatepetonco Range — Cave South of the Masters of the Night-Wind",
    mapImage: "assets/maps/wayward-hermetic-spiritspeaker.png",
    layer: "below"
},

"Lava Dragon Statue": {
    region: "Natlan",
    location: "Atocpan — Underground Cavern",
    mapImage: "assets/maps/lava-dragon-statue.png",
    layer: "below"
},

"Secret Source Automaton: Overseer Device": {
    region: "Natlan",
    location: "Isolated Island Southwest of Atocpan",
    mapImage: "assets/maps/secret-source-automaton-overseer-device.png"
},


    
  // Natlan — Local Legends

// Nightsoul Totem / Night Kingdom

"He Never Dies": {
    region: "Natlan",
    location: "Coatepec Mountain — Nightsoul Totem",
    mapImage: "assets/maps/he-never-dies.png",
    layers: [
        "night-kingdom"
    ]
},

"Ichcahuipilli's Aegis": {
    region: "Natlan",
    location: "Huitztli Hill — Nightsoul Totem",
    mapImage: "assets/maps/ichcahuipillis-aegis.png",
    layers: [
        "night-kingdom"
    ]
},

"Atlatl's Blessing": {
    region: "Natlan",
    location: "Tepeacac Rise — Hidden Cave / Nightsoul Totem",
    mapImage: "assets/maps/atlatls-blessing.png",
    layers: [
        "below",
        "night-kingdom"
    ]
},

"Cihuacoatl of Chimeric Bone": {
    region: "Natlan",
    location: "Coatepec Mountain — Nightsoul Totem",
    mapImage: "assets/maps/cihuacoatl-of-chimeric-bone.png",
    layers: [
        "night-kingdom"
    ]
},

"Tlatzacuilotl": {
    region: "Natlan",
    location: "Sulfurous Veins — Hidden Cave / Nightsoul Totem",
    mapImage: "assets/maps/tlatzacuilotl.png",
    layers: [
        "below",
        "night-kingdom"
    ]
},

"Chimalli's Shade": {
    region: "Natlan",
    location: "Ancestral Temple — Nightsoul Totem",
    mapImage: "assets/maps/chimallis-shade.png",
    layers: [
        "night-kingdom"
    ]
},

"Spirit of the Fallen Dawnstar": {
    region: "Natlan",
    location: "Tezcatepetonco Range — Nightsoul Totem",
    mapImage: "assets/maps/spirit-of-the-fallen-dawnstar.png",
    layers: [
        "night-kingdom"
    ]
},

"Potapo's Solidarity": {
    region: "Natlan",
    location: "Stadium of the Sacred Flame — Nightsoul Totem",
    mapImage: "assets/maps/potapos-solidarity.png",
    layers: [
        "night-kingdom"
    ]
},

"Tupayo's Aid": {
    region: "Natlan",
    location: "Quahuacan Cliff — Nightsoul Totem",
    mapImage: "assets/maps/tupayos-aid.png",
    layers: [
        "night-kingdom"
    ]
},

"Ironbeard": {
    region: "Natlan",
    location: "Quahuacan Cliff — Nightsoul Totem",
    mapImage: "assets/maps/ironbeard.png",
    layers: [
        "night-kingdom"
    ]
},

"Tupu's Lushness": {
    region: "Natlan",
    location: "Atocpan — Nightsoul Totem",
    mapImage: "assets/maps/tupus-lushness.png",
    layers: [
        "night-kingdom"
    ]
},

"Reji": {
    region: "Natlan",
    location: "Atocpan — Nightsoul Totem",
    mapImage: "assets/maps/reji.png",
    layers: [
        "night-kingdom"
    ]
},


// Overworld Local Legends

"Sappho Amidst the Waves": {
    region: "Natlan",
    location: "Tepeacac Rise",
    mapImage: "assets/maps/sappho-amidst-the-waves.png"
},

"Cocijo": {
    region: "Natlan",
    location: "Ameyalco Waters",
    mapImage: "assets/maps/cocijo.png"
},

"Polychrome Tri-Stars": {
    region: "Natlan",
    location: "Huitztli Hill",
    mapImage: "assets/maps/polychrome-tri-stars.png"
},

"Balachko": {
    region: "Natlan",
    location: "Ameyalco Waters — Hidden Cave near the Sanctum of Rainbow Spirits",
    mapImage: "assets/maps/balachko.png",
    layers: [
        "below"
    ]
},

"Bronzelock": {
    region: "Natlan",
    location: "Ochkanatlan — Floating Island",
    mapImage: "assets/maps/bronzelock.png",
    layers: [
        "above"
    ]
},

"Rilai": {
    region: "Natlan",
    location: "Tezcatepetonco Range — Southwest of the Masters of the Night-Wind",
    mapImage: "assets/maps/rilai.png"
},

"Battlegoat and Ironclaw": {
    region: "Natlan",
    location: "Atocpan — Near the Derelict Masonry Dock",
    mapImage: "assets/maps/battlegoat-and-ironclaw.png"
},

"The Peak": {
    region: "Natlan",
    location: "Atocpan — Northwest of Fallingstar Fields",
    mapImage: "assets/maps/the-peak.png"
},

"Infinitesimal": {
    region: "Natlan",
    location: "Ancient Sacred Mountain — Eastern Floating Island",
    mapImage: "assets/maps/infinitesimal.png"
    },

"The Last Survivor of Tenochtzitoc": {
    region: "Natlan",
    location: "Wavey Bay — Shallow River",
    mapImage: "assets/maps/the-last-survivor-of-tenochtzitoc.png"
},

// Natlan — Weekly Boss

"Lord of Eroded Primal Fire": {
    region: "Natlan",
    location: "Stone Stele Records — South of the Masters of the Night-Wind",
    mapImage: "assets/maps/lord-of-eroded-primal-fire.png"
},

// Nod-Krai — World Bosses

"Radiant Moonfly": {
    region: "Nod-Krai",
    location: "Lempo Isle — Cave near Blue Amber Lake",
    mapImage: "assets/maps/radiant-moonfly.png",
    layers: [
        "below"
    ]
},

"Radiant Moongecko": {
    region: "Nod-Krai",
    location: "Wavechaser Plain — Underground Cave near Favonius Keep",
    mapImage: "assets/maps/radiant-moongecko.png",
    layers: [
        "below"
    ]
},

"Knuckle Duckle": {
    region: "Nod-Krai",
    location: "Lempo Isle — Clink-Clank Krumkake Craftshop",
    mapImage: "assets/maps/knuckle-duckle.png"
},

"Frostnight Herra": {
    region: "Nod-Krai",
    location: "Hiisi Isle — Northern End",
    mapImage: "assets/maps/frostnight-herra.png"
},

"Super-Heavy Landrover: Mechanized Fortress": {
    region: "Nod-Krai",
    location: "Paha Isle — Underground Facility",
    mapImage: "assets/maps/super-heavy-landrover-mechanized-fortress.png",
    layers: [
        "below"
    ]
},

"Lord of the Hidden Depths: Whisperer of Nightmares": {
    region: "Nod-Krai",
    location: "Ashveil Peak — Kipumaki Cliff",
    mapImage: "assets/maps/lord-of-the-hidden-depths-whisperer-of-nightmares.png"
},

// Nod-Krai — Weekly Boss

"Heretic of the False Moon": {
    region: "Nod-Krai",
    location: "False Moon Institute — Special Territory Research Institute",
    mapImage: "assets/maps/heretic-of-the-false-moon.png"
},

// Nod-Krai — Local Legends

"Sigurd": {
    region: "Nod-Krai",
    location: "Lempo Isle — Tombstone near the western coast of Barrowmoss Barrens",
    mapImage: "assets/maps/sigurd.png"
},

"Crab Tsar": {
    region: "Nod-Krai",
    location: "Hiisi Island — Crab Tsar's Palace",
    mapImage: "assets/maps/crab-tsar.png",
    layers: [
        "below"
    ]
},

"Raskolnikov": {
    region: "Nod-Krai",
    location: "Paha Isle — Kuuvahki Experimental Design Bureau",
    mapImage: "assets/maps/raskolnikov.png",
    layers: [
        "above"
    ]
},

"Hexadecatonic Mandragora": {
    region: "Nod-Krai",
    location: "Ashveil Peak — Southwest of Dreadshade Mire",
    mapImage: "assets/maps/hexadecatonic-mandragora.png"
},

"Hiljetta": {
    region: "Nod-Krai",
    location: "Ashveil Peak — Southeast of Favonius Keep",
    mapImage: "assets/maps/hiljetta.png"
},

"The Homesick Lone Wolf": {
    region: "Nod-Krai",
    location: "Ashveil Peak — Northeast of Cliffwatch Camp",
    mapImage: "assets/maps/the-homesick-lone-wolf.png"
},

"Prism Slime": {
    region: "Frost Moon",
    location: "Ungien's Circle — Southern Area near Moon Lake",
    mapImage: "assets/maps/prism-slime.png"
},

"Mushteshir": {
    region: "Frost Moon",
    location: "Ungien's Circle — Northwest Underground Area",
    mapImage: "assets/maps/mushteshir.png",
    layers: [
        "below"
    ]
},

// Snezhnaya — World Bosses

"Immortal Construct": {
    region: "Snezhnaya",
    location: "Everfrozen Earth",
    mapImage: "assets/maps/immortal-construct.png"
},

"Chimeric Winged Lion": {
    region: "Snezhnaya",
    location: "Volkodlak Tundra — Near the Hunter's Cabin",
    mapImage: "assets/maps/chimeric-winged-lion.png"
},

// Snezhnaya — Local Legends

"Churin": {
    region: "Snezhnaya",
    location: "Fellfrost Peak — South of Jack Frost Village",
    mapImage: "assets/maps/churin.png"
},

"Bandersnatch": {
    region: "Snezhnaya",
    location: "Svetloledovka — Caverns of Prime Ice",
    mapImage: "assets/maps/bandersnatch.png",
    layers: [
        "below"
    ]
},

"Furiosa": {
    region: "Snezhnaya",
    location: "Everfrozen Earth — Near Scars of Cursed Obsession",
    mapImage: "assets/maps/furiosa.png"
},
};