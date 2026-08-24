import type { StoredElementDetail } from '../../types/element/detail'

export const elementDetails: Record<string, StoredElementDetail> = {
  "H": {
    "overview": {
      "latinName": "Hydrogenium",
      "englishName": "Hydrogen",
      "discoveryYear": "1766",
      "casNumber": "CAS1333-74-0",
      "discoverer": { "ru": "Генри Кавендиш", "en": "Henry Cavendish", "zh": "Henry Cavendish" },
      "discoveryCountry": "GB",
      "sampleColors": [
        { "hex": "#E8E8E8", "finish": "subtle", "label": { "ru": "Газ", "en": "Gas", "zh": "气体" } },
        { "hex": "#C05CC0", "finish": "subtle", "label": { "ru": "Газоразряд", "en": "Gas discharge", "zh": "气体放电" } }
      ],
      "electronShellConfig": "K1-L0-M0-N0-O0-P0-Q0-R0",
      "electronCount": "1",
      "protonCount": "1",
      "neutronCount": "0",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "1s1"
    },
    "description": { "ru": "Самый лёгкий элемент; бесцветный газ, основа звёзд и воды, самое распространённое вещество во Вселенной.", "en": "The lightest element; a colorless gas and the most abundant substance in the universe, essential for stars and water.", "zh": "最轻的元素；无色气体，宇宙中最丰富的物质，恒星和水的基础。" },
    "applications": { "ru": "Ракетное топливо, аммиак, нефтепереработка, водородные топливные элементы", "en": "Rocket fuel, ammonia, oil refining, hydrogen fuel cells", "zh": "火箭燃料、氨、炼油、氢燃料电池" },
    "properties": {
      "atomicMass": "1.00797094202593",
      "density": "0.00008988",
      "meltingPoint": "-259.16",
      "boilingPoint": "-252.879",
      "valence": "1",
      "group": "1/I+",
      "block": "s",
      "aggregationState": "gas"
    },
    "thermo": {
      "fusionHeat": "0.117",
      "specificHeat": "14300",
      "vaporizationHeat": "0.904"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,-,1,-,-,-,-,-,-,-,-",
      "ionCharge": "1-, 1+",
      "ionizationPotential": "13.598",
      "atomicRadius": "53",
      "covalentRadius": "32",
      "vanDerWaalsRadius": "120"
    },
    "electromagnetic": {
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-2.23 ⋅ 10⁻⁹",
      "massMagneticSusceptibility": "-2.48 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "-4.999 ⋅ 10⁻¹¹"
    },
    "grid": {
      "structureCode": "1",
      "gridParams": "a=3.780 Å; c=6.167 Å",
      "axialRatio": "1.631",
      "debyeTemperature": "119",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID783",
      "rtecsNumber": "RTECSMW8900000",
      "molarVolume": "0.01121",
      "soundSpeed": "1310.0",
      "refractiveIndex": "1.000132",
      "thermalConductivity": "0.1805"
    },
    "reactivity": {
      "electronegativity": "2.2",
      "electronAffinity": "72.769"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.332",
      "nfpaCube": "4,3,0,-"
    },
    "prevalence": {
      "universe": "75.0",
      "sun": "71.0",
      "ocean": "11.0",
      "humanBody": "9.98774236967546",
      "crust": "0.14",
      "meteorites": "2.4"
    },
    "ghs": [
      "flammable",
      "compressedGas"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 1,
          "abundance": "99.9885"
        },
        {
          "mass": 2,
          "abundance": "0.0115"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=oRxaGQe0zj8",
    "productionCountries": [
      { "country": "cn" },
      { "country": "us" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "Не добывается как руда — производится промышленно (в основном паровым риформингом метана); Китай, США и Россия — крупнейшие производители и потребители водорода.", "en": "Not mined as an ore — produced industrially (mostly via steam methane reforming); China, the US and Russia are the largest hydrogen producers and consumers.", "zh": "不以矿石形式开采——通过工业方法生产（主要为甲烷蒸汽重整）；中国、美国和俄罗斯是最大的氢气生产国和消费国。" }
  },
  "He": {
    "overview": {
      "latinName": "Helium",
      "englishName": "Helium",
      "discoveryYear": "1868",
      "casNumber": "CAS7440-59-7",
      "discoverer": { "ru": "Пьер Жюль Сезар Жансен, Джозеф Норман Локьер", "en": "Pierre Jules César Janssen, Joseph Norman Lockyer", "zh": "Pierre Jules César Janssen, Joseph Norman Lockyer" },
      "discoveryCountry": "FR, GB",
      "sampleColors": [
        { "hex": "#E8E8E8", "finish": "subtle", "label": { "ru": "Газ", "en": "Gas", "zh": "气体" } },
        { "hex": "#F0D8B8", "finish": "subtle", "label": { "ru": "Газоразряд", "en": "Gas discharge", "zh": "气体放电" } }
      ],
      "electronShellConfig": "K2-L0-M0-N0-O0-P0-Q0-R0",
      "electronCount": "2",
      "protonCount": "2",
      "neutronCount": "2",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "1s2"
    },
    "description": { "ru": "Благородный газ, второй по лёгкости элемент; химически инертен, образуется в звёздах.", "en": "A noble gas, second lightest element; chemically inert and formed mainly in stellar nucleosynthesis.", "zh": "稀有气体，第二轻的元素；化学惰性，主要在恒星中形成。" },
    "applications": { "ru": "Дыхательные смеси для дайвинга, охлаждение МРТ, инертная сварка, воздушные шары", "en": "Diving gas mixes, MRI cooling, inert welding, balloons", "zh": "潜水呼吸气、核磁共振冷却、惰性焊接、气球" },
    "properties": {
      "atomicMass": "4.00260128098301",
      "density": "0.0001785",
      "meltingPoint": "-273.15",
      "boilingPoint": "-268.928",
      "valence": "0",
      "group": "1/VIII+",
      "block": "s",
      "aggregationState": "gas"
    },
    "thermo": {
      "fusionHeat": "0.0138",
      "specificHeat": "5193.1",
      "vaporizationHeat": "0.0829"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,-,-,-,-,-,-,-,-,-",
      "ionizationPotential": "24.587",
      "atomicRadius": "31",
      "covalentRadius": "28",
      "vanDerWaalsRadius": "140"
    },
    "electromagnetic": {
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.05 ⋅ 10⁻⁹",
      "massMagneticSusceptibility": "-5.9 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-2.36 ⋅ 10⁻¹¹"
    },
    "grid": {
      "structureCode": "2 | 7",
      "gridParams": "a=3.570 Å; c=5.84 Å | 0",
      "axialRatio": "1.633 | 0",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23987",
      "rtecsNumber": "RTECSMH6520000",
      "molarVolume": "0.022424",
      "soundSpeed": "965.0",
      "refractiveIndex": "1.000035",
      "thermalConductivity": "0.1513"
    },
    "reactivity": {
      "electronAffinity": "0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.007",
      "nfpaCube": "0,0,0,SA"
    },
    "prevalence": {
      "universe": "23.0",
      "sun": "27.1",
      "ocean": "7.2 ⋅ 10⁻¹⁰",
      "crust": "8.0 ⋅ 10⁻⁷"
    },
    "ghs": [
      "compressedGas"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 4,
          "abundance": "99.999866"
        },
        {
          "mass": 3,
          "abundance": "0.000134"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=TngesFm8xiQ",
    "productionCountries": [
      { "country": "us", "share": "42.6" },
      { "country": "qa", "share": "33.2" },
      { "country": "dz" },
      { "country": "ru" },
      { "country": "ca" }
    ],
    "productionNote": { "ru": "США и Катар вместе обеспечивают основную часть мировой добычи гелия (извлекается из природного газа), Алжир, Россия и Канада — гораздо меньший второй эшелон.", "en": "The US and Qatar together dominate world helium production (extracted from natural gas fields), with Algeria, Russia and Canada forming a much smaller second tier.", "zh": "美国和卡塔尔合计占世界氦气产量的大部分（从天然气中提取），阿尔及利亚、俄罗斯和加拿大构成规模小得多的第二梯队。" }
  },
  "Li": {
    "overview": {
      "latinName": "Lithium",
      "englishName": "Lithium",
      "discoveryYear": "1817",
      "casNumber": "CAS7439-93-2",
      "discoverer": { "ru": "Иоганн Арфведсон", "en": "Johan August Arfwedson", "zh": "Johan August Arfwedson" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L1-M0-N0-O0-P0-Q0-R0",
      "electronCount": "3",
      "protonCount": "3",
      "neutronCount": "4",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "1s2 2s1"
    },
    "description": { "ru": "Самый лёгкий металл; мягкий, серебристый и очень активный, хранят под маслом или в инертной среде.", "en": "The lightest metal; soft, silvery, and highly reactive, stored under oil or inert atmosphere.", "zh": "最轻的金属；柔软银白色，高度活泼，需保存在油或惰性气氛中。" },
    "applications": { "ru": "Литий-ионные аккумуляторы, авиационные сплавы, керамика, психиатрические препараты", "en": "Lithium-ion batteries, aerospace alloys, ceramics, psychiatric drugs", "zh": "锂离子电池、航空合金、陶瓷、精神科药物" },
    "properties": {
      "atomicMass": "6.941765353712",
      "density": "0.534",
      "meltingPoint": "180.5",
      "boilingPoint": "1342.0",
      "valence": "1",
      "group": "2/I+",
      "block": "s",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "3.0",
      "specificHeat": "3570",
      "thermalExpansion": "46 ⋅ 10⁻⁶",
      "vaporizationHeat": "136.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,1,-,-,-,-,-,-,-,-",
      "ionCharge": "1+",
      "ionizationPotential": "5.392",
      "atomicRadius": "167",
      "covalentRadius": "130",
      "vanDerWaalsRadius": "182"
    },
    "electromagnetic": {
      "electricalConductivity": "10775862.0689655",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "1.37 ⋅ 10⁻⁹",
      "massMagneticSusceptibility": "2.56 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "1.78 ⋅ 10⁻¹⁰",
      "electricalResistivity": "9.28 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "3 | 2",
      "gridParams": "3.490 Å | a=3.080 Å; c=4.82 Å",
      "debyeTemperature": "344",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID3028194",
      "rtecsNumber": "RTECSOJ5540000",
      "brinellHardness": "5.0",
      "mohsHardness": "0.6",
      "bulkModulus": "11.0",
      "youngModulus": "4.9",
      "liquidDensity": "0.512",
      "molarVolume": "0.00001297",
      "shearModulus": "4.2",
      "soundSpeed": "6000.0",
      "thermalConductivity": "84.8"
    },
    "reactivity": {
      "electronegativity": "0.98",
      "electronAffinity": "59.6326"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "71.0",
      "nfpaCube": "2,3,2,W"
    },
    "prevalence": {
      "universe": "6 ⋅ 10⁻⁷",
      "sun": "6 ⋅ 10⁻⁹",
      "ocean": "1.8 ⋅ 10⁻⁵",
      "humanBody": "3 ⋅ 10⁻⁶",
      "crust": "0.002",
      "meteorites": "0.00017"
    },
    "ghs": [
      "flammable",
      "corrosive",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 7,
          "abundance": "92.41"
        },
        {
          "mass": 6,
          "abundance": "7.59"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=ZTTb-GomRmc",
    "productionCountries": [
      { "country": "au", "share": "36.7" },
      { "country": "cl", "share": "20.4" },
      { "country": "cn", "share": "17.1" },
      { "country": "zw", "share": "9.2" },
      { "country": "ar", "share": "7.5" },
      { "country": "us", "share": "0.4" },
      { "country": "pt", "share": "0.16" }
    ],
    "productionNote": { "ru": "Австралия, Чили и Китай вместе дают более 85% мировой добычи лития; Аргентина — быстрорастущий производитель из рассолов.", "en": "Australia, Chile and China together account for over 85% of world lithium mine output, with Argentina a fast-growing brine producer.", "zh": "澳大利亚、智利和中国合计占世界锂矿产量的85%以上，阿根廷是快速增长的盐湖卤水生产国。" }
  },
  "Be": {
    "overview": {
      "latinName": "Beryllium",
      "englishName": "Beryllium",
      "discoveryYear": "1798",
      "casNumber": "CAS7440-41-7",
      "discoverer": { "ru": "Луи Никола Воклен", "en": "Louis-Nicolas Vauquelin", "zh": "Louis-Nicolas Vauquelin" },
      "discoveryCountry": "FR",
      "sampleColors": [{ "hex": "#B5B5A8" }],
      "electronShellConfig": "K2-L2-M0-N0-O0-P0-Q0-R0",
      "electronCount": "4",
      "protonCount": "4",
      "neutronCount": "5",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "1s2 2s2"
    },
    "description": { "ru": "Лёгкий щелочноземельный металл; токсичен в виде пыли, ценится за жёсткость и теплопроводность в сплавах.", "en": "A lightweight alkaline-earth metal; toxic as powder but valued for stiffness and heat conductivity in alloys.", "zh": "轻质碱土金属；粉末有毒，但在合金中以高刚度和导热性著称。" },
    "applications": { "ru": "Аэрокосмические сплавы, рентгеновские окна, ядерная физика", "en": "Aerospace alloys, X-ray windows, nuclear physics", "zh": "航空合金、X射线窗口、核物理" },
    "properties": {
      "atomicMass": "9.01218306156802",
      "density": "1.85",
      "meltingPoint": "1287.0",
      "boilingPoint": "2469.0",
      "valence": "2",
      "group": "2/II+",
      "block": "s",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "7.895",
      "specificHeat": "1820",
      "thermalExpansion": "11.3 ⋅ 10⁻⁶",
      "vaporizationHeat": "292.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,-,-,-,-,-,-,-",
      "ionCharge": "2+",
      "ionizationPotential": "9.323",
      "atomicRadius": "112",
      "covalentRadius": "99",
      "vanDerWaalsRadius": "153"
    },
    "electromagnetic": {
      "electricalConductivity": "28089887.6404494",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-2.328 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-1.26 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "-1.136 ⋅ 10⁻¹⁰",
      "electricalResistivity": "3.56 ⋅ 10⁻⁸",
      "superconductingTemperature": "0.026"
    },
    "grid": {
      "structureCode": "2 | 3",
      "gridParams": "a=2.286 Å; c=3.584 Å; z = 2 | a = 2.5515 Å",
      "debyeTemperature": "1160",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID5460467",
      "rtecsNumber": "RTECSDS1750000",
      "brinellHardness": "600.0",
      "mohsHardness": "5.5",
      "vickersHardness": "1670.0",
      "bulkModulus": "130.0",
      "youngModulus": "287.0",
      "liquidDensity": "1.69",
      "molarVolume": "0.0000048767",
      "poissonRatio": "0.032",
      "shearModulus": "132.0",
      "soundSpeed": "12870.0",
      "thermalConductivity": "200.0"
    },
    "reactivity": {
      "electronegativity": "1.57",
      "electronAffinity": "0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.0092",
      "nfpaCube": "1,3,0,-"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁷",
      "sun": "1 ⋅ 10⁻⁸",
      "ocean": "6 ⋅ 10⁻¹¹",
      "humanBody": "5.136553 ⋅ 10⁻⁸",
      "crust": "2.8 ⋅ 10⁻⁴",
      "meteorites": "2.9 ⋅ 10⁻⁶"
    },
    "ghs": [
      "healthHazard"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 9,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=z2JJ_YccUXQ",
    "productionCountries": [
      { "country": "us", "share": "85" },
      { "country": "br" },
      { "country": "cn" },
      { "country": "kz" }
    ],
    "productionNote": { "ru": "США — крупнейший добытчик бериллия (около двух третей мировой добычи), Китай — на втором месте.", "en": "The United States is the leading producer of mined beryllium (about two-thirds of world output), with China second.", "zh": "美国是铍矿开采的主要生产国（约占世界产量的三分之二），中国居第二位。" }
  },
  "B": {
    "overview": {
      "latinName": "Borum",
      "englishName": "Boron",
      "discoveryYear": "1808",
      "casNumber": "CAS7440-42-8",
      "discoverer": { "ru": "Жозеф Луи Гей-Люссак, Луи Жак Тенар, Гемфри Дэви", "en": "Joseph Louis Gay-Lussac, Louis Jacques Thénard, Humphry Davy", "zh": "Joseph Louis Gay-Lussac, Louis Jacques Thénard, Humphry Davy" },
      "discoveryCountry": "FR, GB",
      "sampleColors": [{ "hex": "#1A1A1A", "finish": "matte" }],
      "electronShellConfig": "K2-L3-M0-N0-O0-P0-Q0-R0",
      "electronCount": "5",
      "protonCount": "5",
      "neutronCount": "6",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "1s2 2s2 2p1"
    },
    "description": { "ru": "Металлоид; твёрдый и хрупкий, основа борной химии и жаростойких материалов.", "en": "A metalloid; hard and brittle, essential to boron chemistry and high-temperature materials.", "zh": "类金属；硬而脆，硼化学和耐高温材料的基础。" },
    "applications": { "ru": "Боросиликатное стекло, стекловолокно, керамика, полупроводники", "en": "Borosilicate glass, fiberglass, ceramics, semiconductors", "zh": "硼硅玻璃、玻璃纤维、陶瓷、半导体" },
    "properties": {
      "atomicMass": "10.8135187949825",
      "density": "2.34",
      "meltingPoint": "2076.0",
      "boilingPoint": "3927.0",
      "valence": "3",
      "group": "2/III+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "50.2",
      "specificHeat": "1030",
      "thermalExpansion": "6 ⋅ 10⁻⁶",
      "vaporizationHeat": "508.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionizationPotential": "8.298",
      "atomicRadius": "87",
      "covalentRadius": "84",
      "vanDerWaalsRadius": "192"
    },
    "electromagnetic": {
      "electricalConductivity": "6.66666666666667e-05",
      "electricalType": "2",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-2.14 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-8.7 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-9.41 ⋅ 10⁻¹¹",
      "electricalResistivity": "15000.0"
    },
    "grid": {
      "structureCode": "5",
      "gridParams": "a=10.17; α=65.18 Å",
      "axialRatio": "0.576",
      "debyeTemperature": "1480",
      "spaceGroup": "R_ 3m",
      "spaceGroupNumber": "166"
    },
    "additional": {
      "pubchemCid": "CID5462311",
      "rtecsNumber": "RTECSED7350000",
      "mohsHardness": "9.5",
      "vickersHardness": "49000.0",
      "bulkModulus": "185.0",
      "liquidDensity": "02.08",
      "molarVolume": "0.0000043943",
      "soundSpeed": "16200.0",
      "thermalConductivity": "27.4"
    },
    "reactivity": {
      "electronegativity": "2.04",
      "electronAffinity": "26.989"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "760.0",
      "nfpaCube": "3,2,0,-"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁷",
      "sun": "2 ⋅ 10⁻⁷",
      "ocean": "4.4 ⋅ 10⁻⁴",
      "humanBody": "7 ⋅ 10⁻⁵",
      "crust": "0.001",
      "meteorites": "0.00016"
    },
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 11,
          "abundance": "80.1"
        },
        {
          "mass": 10,
          "abundance": "19.9"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=YRWWf3Obsdg",
    "productionCountries": [
      { "country": "tr" },
      { "country": "cn" },
      { "country": "cl" },
      { "country": "ar" },
      { "country": "us" }
    ],
    "productionNote": { "ru": "Турция — крупнейший в мире производитель бора (боратов); США (Калифорния) — единственный другой значимый производитель.", "en": "Turkey is the world's leading boron producer; the United States (California) is the only other major producer.", "zh": "土耳其是世界领先的硼生产国；美国（加利福尼亚州）是唯一另一个主要生产国。" }
  },
  "C": {
    "overview": {
      "latinName": "Сarbonium (Carboneum)",
      "englishName": "Carbon",
      "discoveryYear": "3750 BC",
      "casNumber": "CAS7440-44-0",
      "discoverer": { "ru": "Антуан Лоран Лавуазье", "en": "Antoine Laurent de Lavoisier", "zh": "Antoine Laurent de Lavoisier" },
      "discoveryCountry": "Middle",
      "sampleColors": [
        { "hex": "#1A1A1A", "finish": "matte", "label": { "ru": "Графит", "en": "Graphite", "zh": "石墨" } },
        { "hex": "#F0F7F5", "finish": "glossy", "label": { "ru": "Алмаз", "en": "Diamond", "zh": "钻石" } }
      ],
      "electronShellConfig": "K2-L4-M0-N0-O0-P0-Q0-R0",
      "electronCount": "6",
      "protonCount": "6",
      "neutronCount": "6",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "1s2 2s2 2p2"
    },
    "description": { "ru": "Неметалл — основа органической жизни; существует как графит, алмаз и аморфный углерод.", "en": "A nonmetal forming the basis of organic life; exists as graphite, diamond, and amorphous carbon.", "zh": "非金属，有机生命的基础；以石墨、金刚石和无定形碳存在。" },
    "applications": { "ru": "Сталь, графит, углеродные волокна, алмазы, органическая химия", "en": "Steel, graphite, carbon fiber, diamonds, organic chemistry", "zh": "钢铁、石墨、碳纤维、金刚石、有机化学" },
    "properties": {
      "atomicMass": "12.0106355612542",
      "density": "2.267",
      "meltingPoint": "3527.0",
      "boilingPoint": "3915.0",
      "valence": "2, 4",
      "group": "2/IV+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "117.0",
      "specificHeat": "710",
      "thermalExpansion": "0.8 ⋅ 10⁻⁶",
      "vaporizationHeat": "715.0"
    },
    "atomic": {
      "oxidationState": "-,4,3,2,1,0,1,2,3,4,-,-,-,-,-",
      "ionizationPotential": "11.260",
      "atomicRadius": "67",
      "covalentRadius": "75",
      "vanDerWaalsRadius": "170"
    },
    "electromagnetic": {
      "electricalConductivity": "72727.2727272727",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.4 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-6.2 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-7.45 ⋅ 10⁻¹¹",
      "electricalResistivity": "1.375 ⋅ 10⁻⁵"
    },
    "grid": {
      "structureCode": "6 | 8",
      "gridParams": "a=2.46; c=6.71; а=3.567 | а=3.567",
      "axialRatio": "2.73 | 0",
      "debyeTemperature": "413 | 2200",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID5462310",
      "rtecsNumber": "RTECSHL4158550",
      "mohsHardness": "0.5",
      "bulkModulus": "33.0",
      "molarVolume": "0.0000053146",
      "soundSpeed": "18350.0",
      "refractiveIndex": "2.417",
      "thermalConductivity": "140.0"
    },
    "reactivity": {
      "electronegativity": "2.55",
      "electronAffinity": "121.7763"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.0035",
      "nfpaCube": "1,0,0,-"
    },
    "prevalence": {
      "universe": "0.5",
      "sun": "0.4",
      "ocean": "0.0028",
      "humanBody": "22.829125416401",
      "crust": "0.02",
      "meteorites": "1.5"
    },
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 12,
          "abundance": "98.93"
        },
        {
          "mass": 13,
          "abundance": "1.07"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=q-Oyp936Big",
    "productionCountries": [
      { "country": "cn", "share": "78" },
      { "country": "mg", "share": "5.5" },
      { "country": "mz", "share": "4.6" },
      { "country": "br" }
    ],
    "productionNote": { "ru": "Как природный графит: Китай обеспечивает около трёх четвертей мировой добычи, Мадагаскар и Мозамбик — следующие по величине производители, Бразилия — крупный держатель запасов.", "en": "As natural graphite: China accounts for about three-quarters of world mine output, with Madagascar and Mozambique the next-largest producers and Brazil a major reserve holder.", "zh": "以天然石墨计：中国占世界矿产量的约四分之三，马达加斯加和莫桑比克是次于中国的主要生产国，巴西是重要的储量持有国。" }
  },
  "N": {
    "overview": {
      "latinName": "Nitrogenium",
      "englishName": "Nitrogen",
      "discoveryYear": "1772",
      "casNumber": "CAS7727-37-9",
      "discoverer": { "ru": "Даниель Резерфорд", "en": "Daniel Rutherford", "zh": "Daniel Rutherford" },
      "discoveryCountry": "GB",
      "sampleColors": [
        { "hex": "#E8E8E8", "finish": "subtle", "label": { "ru": "Газ", "en": "Gas", "zh": "气体" } },
        { "hex": "#C79BC0", "finish": "subtle", "label": { "ru": "Газоразряд", "en": "Gas discharge", "zh": "气体放电" } }
      ],
      "electronShellConfig": "K2-L5-M0-N0-O0-P0-Q0-R0",
      "electronCount": "7",
      "protonCount": "7",
      "neutronCount": "7",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "1s2 2s2 2p3"
    },
    "description": { "ru": "Двухатомный газ, составляющий большую часть атмосферы; ключевой элемент белков и промышленности.", "en": "A diatomic gas making up most of Earth's atmosphere; key to proteins, nucleic acids, and industry.", "zh": "双原子气体，占地球大气的大部分；蛋白质、核酸和工业的关键元素。" },
    "applications": { "ru": "Удобрения, взрывчатые вещества, азотная кислота, пищевая упаковка", "en": "Fertilizers, explosives, nitric acid, food packaging", "zh": "肥料、炸药、硝酸、食品包装" },
    "properties": {
      "atomicMass": "14.0068577516411",
      "density": "0.001251",
      "meltingPoint": "-210.0",
      "boilingPoint": "-195.795",
      "valence": "1, 2, 3, 4, 5",
      "group": "2/V+",
      "block": "p",
      "aggregationState": "gas"
    },
    "thermo": {
      "fusionHeat": "0.72",
      "specificHeat": "1040",
      "vaporizationHeat": "5.57"
    },
    "atomic": {
      "oxidationState": "-,-,3,2,1,0,1,2,3,4,5,-,-,-,-",
      "ionCharge": "3-",
      "ionizationPotential": "14.534",
      "atomicRadius": "56",
      "covalentRadius": "71",
      "vanDerWaalsRadius": "155"
    },
    "electromagnetic": {
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-6.8 ⋅ 10⁻⁹",
      "massMagneticSusceptibility": "-5.4 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-1.5 ⋅ 10⁻¹⁰"
    },
    "grid": {
      "structureCode": "1 | 7",
      "gridParams": "5.661 Å | a=4.116 Å; c=6.734 Å",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID947",
      "rtecsNumber": "RTECSQW9700000",
      "molarVolume": "0.011197",
      "soundSpeed": "353.0",
      "refractiveIndex": "1.000298",
      "thermalConductivity": "0.02583"
    },
    "reactivity": {
      "electronegativity": "3.04",
      "electronAffinity": "-6.8"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "1.91",
      "nfpaCube": "0,0,0,SA"
    },
    "prevalence": {
      "universe": "0.1",
      "sun": "0.1",
      "ocean": "5.0 ⋅ 10⁻⁵",
      "humanBody": "2.56827660934512",
      "crust": "0.0019",
      "meteorites": "0.14"
    },
    "ghs": [
      "compressedGas"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 14,
          "abundance": "99.636"
        },
        {
          "mass": 15,
          "abundance": "0.364"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=Pmz3hi9Bm0Q",
    "productionCountries": [
      { "country": "cn" },
      { "country": "ru" },
      { "country": "in" },
      { "country": "us" }
    ],
    "productionNote": { "ru": "Не добывается как руда — выделяется из воздуха; как фиксированный азот (аммиак) крупнейшие производители — Китай, Россия, Индия и США.", "en": "Not mined as an ore — separated from air; as fixed nitrogen (ammonia), China, Russia, India and the US are the largest producers.", "zh": "不以矿石形式开采——从空气中分离；作为固定氮（氨），中国、俄罗斯、印度和美国是最大的生产国。" }
  },
  "O": {
    "overview": {
      "latinName": "Oxygenium",
      "englishName": "Oxygen",
      "discoveryYear": "1771",
      "casNumber": "CAS7782-44-7",
      "discoverer": { "ru": "Джозеф Пристли, Карл Вильгельм Шееле", "en": "Joseph Priestley, Carl Wilhelm Scheele", "zh": "Joseph Priestley, Carl Wilhelm Scheele" },
      "discoveryCountry": "SE, GB",
      "sampleColors": [
        { "hex": "#E8E8E8", "finish": "subtle", "label": { "ru": "Газ", "en": "Gas", "zh": "气体" } },
        { "hex": "#9E8EC0", "finish": "subtle", "label": { "ru": "Газоразряд", "en": "Gas discharge", "zh": "气体放电" } }
      ],
      "electronShellConfig": "K2-L6-M0-N0-O0-P0-Q0-R0",
      "electronCount": "8",
      "protonCount": "8",
      "neutronCount": "8",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "1s2 2s2 2p4"
    },
    "description": { "ru": "Активный неметалл-газ; необходим для дыхания и горения, около пятой части воздуха.", "en": "A reactive nonmetal gas; vital for respiration, combustion, and about one fifth of the air.", "zh": "活泼的非金属气体；呼吸和燃烧必需，约占空气的五分之一。" },
    "applications": { "ru": "Металлургия, медицинский кислород, ракетные окислители, очистка воды", "en": "Steelmaking, medical oxygen, rocket oxidizers, water treatment", "zh": "炼钢、医用氧、火箭氧化剂、水处理" },
    "properties": {
      "atomicMass": "15.9994049240801",
      "density": "0.001429",
      "meltingPoint": "-218.79",
      "boilingPoint": "-182.962",
      "valence": "2",
      "group": "2/VI+",
      "block": "p",
      "aggregationState": "gas"
    },
    "thermo": {
      "fusionHeat": "0.444",
      "specificHeat": "919",
      "vaporizationHeat": "6.82"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,1,0,1,2,-,-,-,-,-,-,-",
      "ionCharge": "2-",
      "ionizationPotential": "13.618",
      "atomicRadius": "48",
      "covalentRadius": "64",
      "vanDerWaalsRadius": "152"
    },
    "electromagnetic": {
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "1.90772 ⋅ 10⁻⁶",
      "massMagneticSusceptibility": "1.335 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "4.27184 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "7",
      "gridParams": "a=5.403 Å; b=3.429 Å; c=5.086 Å; β=132.53°",
      "debyeTemperature": "104",
      "spaceGroup": "C12/m1",
      "spaceGroupNumber": "12"
    },
    "additional": {
      "pubchemCid": "CID977",
      "rtecsNumber": "RTECSRS2060000",
      "molarVolume": "0.011196",
      "soundSpeed": "330.0",
      "refractiveIndex": "1.000271",
      "thermalConductivity": "0.02658"
    },
    "reactivity": {
      "electronegativity": "3.44",
      "electronAffinity": "140.976"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.00019",
      "nfpaCube": "0,3,2,OX"
    },
    "prevalence": {
      "universe": "1",
      "sun": "0.97",
      "ocean": "86.0",
      "humanBody": "61.3532745565778",
      "crust": "46.1",
      "meteorites": "40.0"
    },
    "ghs": [
      "oxidizer",
      "compressedGas"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 16,
          "abundance": "99.757"
        },
        {
          "mass": 18,
          "abundance": "0.205"
        },
        {
          "mass": 17,
          "abundance": "0.038"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=xrnupfHJJ-o",
    "productionCountries": [
      { "country": "us" },
      { "country": "cn" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "Не добывается как руда — выделяется из воздуха; США, Китай и Россия производят больше всего промышленного кислорода (вместе — около 44% мирового объёма).", "en": "Not mined as an ore — separated from air; the US, China and Russia produce the most industrial oxygen (together about 44% of world volume).", "zh": "不以矿石形式开采——从空气中分离；美国、中国和俄罗斯生产的工业氧气最多（合计约占世界总量的44%）。" }
  },
  "F": {
    "overview": {
      "latinName": "Fluorum",
      "englishName": "Fluorine",
      "discoveryYear": "1886",
      "casNumber": "CAS7782-41-4",
      "discoverer": { "ru": "Анри Муассан", "en": "Ferdinand Frederic Henri Moissan", "zh": "Ferdinand Frederic Henri Moissan" },
      "discoveryCountry": "FR",
      "sampleColors": [
        { "hex": "#F5F0D8", "finish": "subtle", "label": { "ru": "Газ", "en": "Gas", "zh": "气体" } },
        { "hex": "#D8C878", "finish": "subtle", "label": { "ru": "Газоразряд", "en": "Gas discharge", "zh": "气体放电" } }
      ],
      "electronShellConfig": "K2-L7-M0-N0-O0-P0-Q0-R0",
      "electronCount": "9",
      "protonCount": "9",
      "neutronCount": "10",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "1s2 2s2 2p5"
    },
    "description": { "ru": "Самый электроотрицательный элемент; бледно-жёлтый газ, агрессивно реагирует и разъедает.", "en": "The most electronegative element; pale yellow gas, aggressively reactive and corrosive.", "zh": "电负性最强的元素；淡黄色气体，反应性极强且具有腐蚀性。" },
    "applications": { "ru": "Фторполимеры (тефлон), фторирование воды, хладагенты, фармацевтика", "en": "Fluoropolymers (Teflon), water fluoridation, refrigerants, pharmaceuticals", "zh": "氟聚合物（特氟龙）、饮水加氟、制冷剂、医药" },
    "properties": {
      "atomicMass": "18.9984031620854",
      "density": "0.001696",
      "meltingPoint": "-219.67",
      "boilingPoint": "-188.11",
      "valence": "1",
      "group": "2/VII+",
      "block": "p",
      "aggregationState": "gas"
    },
    "thermo": {
      "fusionHeat": "0.51",
      "specificHeat": "824",
      "vaporizationHeat": "6.62"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,-,-,-,-,-,-,-,-,-,-",
      "ionCharge": "1-",
      "ionizationPotential": "17.423",
      "atomicRadius": "42",
      "covalentRadius": "60",
      "vanDerWaalsRadius": "135"
    },
    "electromagnetic": {
      "magneticType": "diamagnetic"
    },
    "grid": {
      "structureCode": "12 | 7",
      "gridParams": "β = 102.088°; a = 5.4780 Å; b = 3.2701 Å; c = 7.28",
      "spaceGroup": "C12/c1",
      "spaceGroupNumber": "15"
    },
    "additional": {
      "pubchemCid": "CID24524",
      "rtecsNumber": "RTECSLM6475000",
      "molarVolume": "0.011202",
      "refractiveIndex": "1.000195",
      "thermalConductivity": "0.0277"
    },
    "reactivity": {
      "electronegativity": "3.98",
      "electronAffinity": "328.1649"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.0096",
      "nfpaCube": "0,4,4,OX"
    },
    "prevalence": {
      "universe": "4 ⋅ 10⁻⁵",
      "sun": "5 ⋅ 10⁻⁵",
      "ocean": "1.3 ⋅ 10⁻⁴",
      "humanBody": "0.00370973288017",
      "crust": "0.0585",
      "meteorites": "0.0087"
    },
    "ghs": [
      "oxidizer",
      "compressedGas",
      "corrosive",
      "acuteToxicity"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 19,
          "abundance": "100"
        }
      ]
    },
    "productionCountries": [
      { "country": "cn", "share": "38" },
      { "country": "mx", "share": "10" },
      { "country": "vn", "share": "2" },
      { "country": "mn", "share": "2" },
      { "country": "za", "share": "2" }
    ],
    "productionNote": { "ru": "Как плавиковый шпат (флюорит): Китай доминирует в мировой добыче, за ним следуют Мексика, Монголия и ЮАР.", "en": "As fluorspar (fluorite) ore: China dominates world mine output, followed by Mexico, Mongolia and South Africa.", "zh": "以萤石矿计：中国主导世界矿产量，其次是墨西哥、蒙古和南非。" }
  },
  "Ne": {
    "overview": {
      "latinName": "Neon",
      "englishName": "Neon",
      "discoveryYear": "1898",
      "casNumber": "CAS7440-01-9",
      "discoverer": { "ru": "Уильям Рамзай, Траверс, Морис Уильям", "en": "Sir William Ramsay, Morris William Travers", "zh": "Sir William Ramsay, Morris William Travers" },
      "discoveryCountry": "GB",
      "sampleColors": [
        { "hex": "#E8E8E8", "finish": "subtle", "label": { "ru": "Газ", "en": "Gas", "zh": "气体" } },
        { "hex": "#FF5A1F", "finish": "subtle", "label": { "ru": "Газоразряд", "en": "Gas discharge", "zh": "气体放电" } }
      ],
      "electronShellConfig": "K2-L8-M0-N0-O0-P0-Q0-R0",
      "electronCount": "10",
      "protonCount": "10",
      "neutronCount": "10",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "1s2 2s2 2p6"
    },
    "description": { "ru": "Благородный газ; бесцветный, без запаха и химически инертный в обычных условиях.", "en": "A noble gas; colorless, odorless, and chemically inert under normal conditions.", "zh": "稀有气体；无色无味，在通常条件下化学惰性。" },
    "applications": { "ru": "Рекламная неоновая подсветка, лазеры, криогеника", "en": "Neon signage, lasers, cryogenics", "zh": "霓虹灯、激光、低温技术" },
    "properties": {
      "atomicMass": "20.1800463795723",
      "density": "0.000900",
      "meltingPoint": "-248.59",
      "boilingPoint": "-246.046",
      "valence": "0",
      "group": "2/VIII+",
      "block": "p",
      "aggregationState": "gas"
    },
    "thermo": {
      "fusionHeat": "0.335",
      "specificHeat": "1030",
      "vaporizationHeat": "1.71"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,-,-,-,-,-,-,-,-,-",
      "ionizationPotential": "21.565",
      "atomicRadius": "38",
      "covalentRadius": "62",
      "vanDerWaalsRadius": "154"
    },
    "electromagnetic": {
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-3.69 ⋅ 10⁻⁹",
      "massMagneticSusceptibility": "-4.1 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-8.27 ⋅ 10⁻¹¹"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "4.430 Å",
      "debyeTemperature": "74.6",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23935",
      "rtecsNumber": "RTECSQP4450000",
      "bulkModulus": "654",
      "molarVolume": "0.02242",
      "soundSpeed": "435.0",
      "refractiveIndex": "1.000067",
      "thermalConductivity": "0.0491"
    },
    "reactivity": {
      "electronAffinity": "0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.04",
      "nfpaCube": "0,0,0,SA"
    },
    "prevalence": {
      "universe": "0.13",
      "sun": "0.058",
      "ocean": "1.2 ⋅ 10⁻⁸",
      "crust": "5.0 ⋅ 10⁻⁷"
    },
    "ghs": [
      "compressedGas"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 20,
          "abundance": "90.48"
        },
        {
          "mass": 22,
          "abundance": "9.25"
        },
        {
          "mass": 21,
          "abundance": "0.27"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=CjXagBB9y9U",
    "productionCountries": [
      { "country": "cn" },
      { "country": "ru" },
      { "country": "us" },
      { "country": "ua" }
    ],
    "productionNote": { "ru": "Исторически Украина обеспечивала до 70% мирового неона (побочный продукт крупных установок разделения воздуха), но с 2022 года её производство сильно нарушено войной — часть спроса перешла к Китаю, России и США.", "en": "Ukraine historically supplied up to 70% of the world's neon (a byproduct of large air-separation plants), but its output has been severely disrupted by the war since 2022, shifting more supply to China, Russia and the US.", "zh": "乌克兰历史上曾供应全球高达70%的氖气（大型空气分离装置的副产品），但自2022年以来其产量因战争受到严重影响，更多供应转向中国、俄罗斯和美国。" }
  },
  "Na": {
    "overview": {
      "latinName": "Natrium",
      "englishName": "Sodium",
      "discoveryYear": "1807",
      "casNumber": "CAS7440-23-5",
      "discoverer": { "ru": "Гемфри Дэви", "en": "Humphry Davy", "zh": "Humphry Davy" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M1-N0-O0-P0-Q0-R0",
      "electronCount": "11",
      "protonCount": "11",
      "neutronCount": "12",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ne] 3s1 = 1s2 2s2 2p6 3s1"
    },
    "description": { "ru": "Мягкий серебристый щелочной металл; бурно реагирует с водой, распространён в солях и море.", "en": "A soft, silvery alkali metal; highly reactive with water and abundant in salts and seawater.", "zh": "柔软银白色碱金属；与水剧烈反应，广泛存在于盐和海水中。" },
    "applications": { "ru": "Поваренная соль, мыло и синтетические моющие, сода для стекольной промышленности, уличное освещение", "en": "Table salt, soap and detergents, soda ash for glassmaking, street lighting", "zh": "食盐、肥皂和洗涤剂、玻璃工业用纯碱、路灯" },
    "properties": {
      "atomicMass": "22.9897692819791",
      "density": "0.968",
      "meltingPoint": "97.794",
      "boilingPoint": "882.94",
      "valence": "1",
      "group": "3/I+",
      "block": "s",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "2.6",
      "specificHeat": "1230",
      "thermalExpansion": "71 ⋅ 10⁻⁶",
      "vaporizationHeat": "97.42"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,-,1,-,-,-,-,-,-,-,-",
      "ionCharge": "1+",
      "ionizationPotential": "5.139",
      "atomicRadius": "190",
      "covalentRadius": "160",
      "vanDerWaalsRadius": "227"
    },
    "electromagnetic": {
      "electricalConductivity": "20964360.5870021",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "8.6 ⋅ 10⁻⁶",
      "massMagneticSusceptibility": "8.8 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "2 ⋅ 10⁻¹⁰",
      "electricalResistivity": "4.77 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "3 | 1",
      "gridParams": "4.2820 Å | a=3.767 Å; c=6.154 Å",
      "debyeTemperature": "158",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID5360545",
      "rtecsNumber": "RTECSVY0686000",
      "brinellHardness": "0.69",
      "mohsHardness": "0.5",
      "bulkModulus": "6.3",
      "youngModulus": "10.0",
      "liquidDensity": "0.927",
      "molarVolume": "0.00002375",
      "shearModulus": "3.3",
      "soundSpeed": "3200.0",
      "thermalConductivity": "142.0"
    },
    "reactivity": {
      "electronegativity": "0.93",
      "electronAffinity": "52.867"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.53",
      "nfpaCube": "3,3,2,W"
    },
    "prevalence": {
      "universe": "0.002",
      "sun": "0.004",
      "ocean": "1.1",
      "humanBody": "0.14268203385251",
      "crust": "2.36",
      "meteorites": "0.55"
    },
    "ghs": [
      "flammable",
      "corrosive",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 23,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=fFuA8XC8tIM",
    "productionCountries": [
      { "country": "cn", "share": "20" },
      { "country": "us", "share": "14" },
      { "country": "in", "share": "10" },
      { "country": "de", "share": "6" },
      { "country": "au", "share": "5" },
      { "country": "ca", "share": "4" }
    ],
    "productionNote": { "ru": "Металлический натрий не добывается напрямую, но добывается/выпаривается поваренная соль (NaCl) — сырьё для его промышленного производства; крупнейшие страны-добытчики соли.", "en": "Sodium metal itself isn't mined, but common salt (sodium chloride) — the feedstock for its industrial production — is mined/evaporated worldwide; top salt-producing countries shown.", "zh": "金属钠本身不进行开采，但作为其工业生产原料的食盐（氯化钠）在世界各地开采/蒸发提取；图中显示主要产盐国。" }
  },
  "Mg": {
    "overview": {
      "latinName": "Magnesium",
      "englishName": "Magnesium",
      "discoveryYear": "1755",
      "casNumber": "CAS7439-95-4",
      "discoverer": { "ru": "Джозеф Блэк, Гемфри Дэви", "en": "Joseph Black, Humphry Davy", "zh": "Joseph Black, Humphry Davy" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#B0B0B0" }],
      "electronShellConfig": "K2-L8-M2-N0-O0-P0-Q0-R0",
      "electronCount": "12",
      "protonCount": "12",
      "neutronCount": "12",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ne] 3s2 = 1s2 2s2 2p6 3s2"
    },
    "description": { "ru": "Лёгкий щелочноземельный металл; серебристый, горит ослепительно белым пламенем, входит в хлорофилл.", "en": "A lightweight alkaline-earth metal; silvery, burns with a bright white flame, central to chlorophyll.", "zh": "轻质碱土金属；银白色，燃烧时发出耀眼白光，叶绿素的核心成分。" },
    "applications": { "ru": "Легкие магниевые сплавы, фейерверки, металлургия титана, фармацевтические препараты", "en": "Light alloys, fireworks, titanium metallurgy, pharmaceuticals", "zh": "轻质合金、烟花、钛冶金、医药" },
    "properties": {
      "atomicMass": "24.3050516136388",
      "density": "1.738",
      "meltingPoint": "650.0",
      "boilingPoint": "1090.0",
      "valence": "2",
      "group": "3/II+",
      "block": "s",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "8.48",
      "specificHeat": "1020",
      "thermalExpansion": "24.8 ⋅ 10⁻⁶",
      "vaporizationHeat": "128.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,-,-,-,-,-,-,-",
      "ionCharge": "2+",
      "ionizationPotential": "7.646",
      "atomicRadius": "145",
      "covalentRadius": "140",
      "vanDerWaalsRadius": "173"
    },
    "electromagnetic": {
      "electricalConductivity": "22779043.2801822",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "1.2 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "6.9 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "1.68 ⋅ 10⁻¹⁰",
      "electricalResistivity": "4.39 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=3.2091 Å; c=5.2103 Å",
      "axialRatio": "1.624",
      "debyeTemperature": "406",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID5462224",
      "brinellHardness": "260.0",
      "mohsHardness": "2.5",
      "bulkModulus": "45.0",
      "youngModulus": "45.0",
      "liquidDensity": "1.584",
      "molarVolume": "0.000013984",
      "poissonRatio": "0.29",
      "shearModulus": "17.0",
      "soundSpeed": "4940.0",
      "thermalConductivity": "156.0"
    },
    "reactivity": {
      "electronegativity": "1.31",
      "electronAffinity": "0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.063",
      "nfpaCube": "1,0,1,-"
    },
    "prevalence": {
      "universe": "0.06",
      "sun": "0.076",
      "ocean": "0.13",
      "humanBody": "0.02710958643198",
      "crust": "2.33",
      "meteorites": "12.0"
    },
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 24,
          "abundance": "78.99"
        },
        {
          "mass": 26,
          "abundance": "11.01"
        },
        {
          "mass": 25,
          "abundance": "10.00"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=56VXdYNb0MA",
    "productionCountries": [
      { "country": "cn", "share": "95" },
      { "country": "il", "share": "2" },
      { "country": "kz", "share": "2" },
      { "country": "br", "share": "2" },
      { "country": "ru", "share": "1.5" },
      { "country": "tr", "share": "1.5" },
      { "country": "ir", "share": "0.5" }
    ],
    "productionNote": { "ru": "Китай обеспечивает около 85-90% мирового производства металлического магния.", "en": "China dominates world magnesium metal production (roughly 85-90% of output).", "zh": "中国主导世界金属镁产量（约占产量的85%-90%）。" }
  },
  "Al": {
    "overview": {
      "latinName": "Aluminium",
      "englishName": "Aluminum",
      "discoveryYear": "1825",
      "casNumber": "CAS7429-90-5",
      "discoverer": { "ru": "Ханс Кристиан Эрстед", "en": "Hans Christian Ørsted", "zh": "Hans Christian Ørsted" },
      "discoveryCountry": "DK",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M3-N0-O0-P0-Q0-R0",
      "electronCount": "13",
      "protonCount": "13",
      "neutronCount": "14",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ne] 3s2 3p1 = 1s2 2s2 2p6 3s2 3p1"
    },
    "description": { "ru": "Мягкий серебристый металл; лёгкий, коррозионностойкий, самый распространённый металл в земной коре.", "en": "A soft, silvery post-transition metal; lightweight, corrosion-resistant, and the most abundant metal in Earth's crust.", "zh": "柔软银白色金属；质轻、耐腐蚀，是地壳中含量最丰富的金属。" },
    "applications": { "ru": "Упаковка, строительство, авиация и авто, электропроводка", "en": "Packaging, construction, transport, electrical wiring", "zh": "包装、建筑、交通运输、电线电缆" },
    "properties": {
      "atomicMass": "26.9815384123685",
      "density": "2.7",
      "meltingPoint": "660.32",
      "boilingPoint": "2519.0",
      "valence": "3, 1",
      "group": "3/III+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "10.71",
      "specificHeat": "904",
      "thermalExpansion": "23.1 ⋅ 10⁻⁶",
      "vaporizationHeat": "284.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,1,-,1,2,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "5.986",
      "atomicRadius": "125",
      "covalentRadius": "124",
      "vanDerWaalsRadius": "184"
    },
    "electromagnetic": {
      "electricalConductivity": "37735849.0566038",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "2.11 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "7.8 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "2.1 ⋅ 10⁻¹⁰",
      "electricalResistivity": "2.65 ⋅ 10⁻⁸",
      "superconductingTemperature": "1.18"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "4.050 Å",
      "debyeTemperature": "426",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID5359268",
      "rtecsNumber": "RTECSBD0330000",
      "brinellHardness": "245.0",
      "mohsHardness": "2.75",
      "vickersHardness": "167.0",
      "bulkModulus": "76.0",
      "youngModulus": "70.0",
      "liquidDensity": "2.375",
      "molarVolume": "0.00000999",
      "poissonRatio": "0.35",
      "shearModulus": "26.0",
      "soundSpeed": "5000.0",
      "thermalConductivity": "237.0"
    },
    "reactivity": {
      "electronegativity": "1.61",
      "electronAffinity": "41.762"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.231",
      "nfpaCube": "1,0,1,-"
    },
    "prevalence": {
      "universe": "0.005",
      "sun": "0.006",
      "ocean": "5 ⋅ 10⁻⁷",
      "humanBody": "8.560922031 ⋅ 10⁻⁵",
      "crust": "8.23",
      "meteorites": "0.9"
    },
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 27,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=BOv3Etp72_I",
    "productionCountries": [
      { "country": "gn", "share": "34.2" },
      { "country": "au", "share": "22.1" },
      { "country": "cn", "share": "19.8" },
      { "country": "br", "share": "7.5" },
      { "country": "in", "share": "5.7" },
      { "country": "id", "share": "2.3" },
      { "country": "jm", "share": "1.4" },
      { "country": "ru", "share": "1.3" },
      { "country": "sa", "share": "1.3" },
      { "country": "kz", "share": "1.1" },
      { "country": "vn", "share": "0.9" },
      { "country": "tr", "share": "0.9" },
      { "country": "gr", "share": "0.2" }
    ],
    "productionNote": { "ru": "Как боксит (алюминиевая руда): Австралия, Гвинея, Китай, Бразилия и Индия — крупнейшие страны-добытчики.", "en": "As bauxite (aluminium ore): Australia, Guinea, China, Brazil and India are the top mining countries.", "zh": "以铝土矿（铝矿石）计：澳大利亚、几内亚、中国、巴西和印度是主要开采国。" }
  },
  "Si": {
    "overview": {
      "latinName": "Silicium",
      "englishName": "Silicon",
      "discoveryYear": "1824",
      "casNumber": "CAS7440-21-3",
      "discoverer": { "ru": "Йёнс Якоб Берцелиус", "en": "Jöns Jakob Berzelius", "zh": "Jöns Jakob Berzelius" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#808080" }],
      "electronShellConfig": "K2-L8-M4-N0-O0-P0-Q0-R0",
      "electronCount": "14",
      "protonCount": "14",
      "neutronCount": "14",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ne] 3s2 3p2 = 1s2 2s2 2p6 3s2 3p2"
    },
    "description": { "ru": "Металлоид; твёрдый, хрупкий, основа полупроводников, стекла и силикатных минералов.", "en": "A metalloid; hard, brittle, and the foundation of semiconductors, glass, and silicate minerals.", "zh": "类金属；硬而脆，半导体、玻璃和硅酸盐矿物的基础。" },
    "applications": { "ru": "Микроэлектроника, солнечные панели, стекло, кремний для сплавов", "en": "Microelectronics, solar panels, glass, alloying element", "zh": "微电子、太阳能板、玻璃、合金添加剂" },
    "properties": {
      "atomicMass": "28.0849993456101",
      "density": "2.3296",
      "meltingPoint": "1414.0",
      "boilingPoint": "3265.0",
      "valence": "2, 4",
      "group": "3/IV+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "50.21",
      "specificHeat": "710",
      "thermalExpansion": "2.6 ⋅ 10⁻⁶",
      "vaporizationHeat": "359.0"
    },
    "atomic": {
      "oxidationState": "-,4,-,2,1,-,1,2,-,4,-,-,-,-,-",
      "ionizationPotential": "8.152",
      "atomicRadius": "111",
      "covalentRadius": "114",
      "vanDerWaalsRadius": "210"
    },
    "electromagnetic": {
      "electricalConductivity": "1000.0",
      "electricalType": "3",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-2.73 ⋅ 10⁻⁶",
      "massMagneticSusceptibility": "-1.6 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-4.49 ⋅ 10⁻¹¹",
      "electricalResistivity": "0.001"
    },
    "grid": {
      "structureCode": "8 | 10 | 7 | 1",
      "gridParams": "5.4307 Å | a=4.686 Å; c=2.585 Å | a=6.44 Å | a=3.80 Å; c=6.28 Å",
      "debyeTemperature": "645",
      "spaceGroup": "Fd_ 3m",
      "spaceGroupNumber": "227"
    },
    "additional": {
      "pubchemCid": "CID5461123",
      "rtecsNumber": "RTECSVW0400000",
      "mohsHardness": "6.5",
      "vickersHardness": "9630.13",
      "bulkModulus": "100.0",
      "youngModulus": "47.0",
      "liquidDensity": "2.57",
      "molarVolume": "0.000012054",
      "thermalConductivity": "149.0"
    },
    "reactivity": {
      "electronegativity": "1.9",
      "electronAffinity": "134.0684"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.171",
      "nfpaCube": "0,1,0,-"
    },
    "prevalence": {
      "universe": "0.07",
      "sun": "0.099",
      "ocean": "1.0 ⋅ 10⁻⁴",
      "humanBody": "0.026",
      "crust": "28.3",
      "meteorites": "14.0"
    },
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 28,
          "abundance": "92.223"
        },
        {
          "mass": 29,
          "abundance": "4.685"
        },
        {
          "mass": 30,
          "abundance": "3.092"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=uHHMTQqziAA",
    "productionCountries": [
      { "country": "cn", "share": "85" },
      { "country": "br", "share": "4" },
      { "country": "no", "share": "2.6" },
      { "country": "fr", "share": "2" },
      { "country": "ru", "share": "1.1" }
    ],
    "productionNote": { "ru": "Китай обеспечивает около 80% мирового производства кремния; Бразилия, Норвегия и Россия — гораздо менее крупные производители.", "en": "China accounts for about 80% of world silicon metal production; Brazil, Norway and Russia are distant secondary producers.", "zh": "中国占世界硅金属产量的约80%；巴西、挪威和俄罗斯是规模较小的次要生产国。" }
  },
  "P": {
    "overview": {
      "latinName": "Phosphorus",
      "englishName": "Phosphorus",
      "discoveryYear": "1669",
      "casNumber": "CAS7723-14-0",
      "discoverer": { "ru": "Хенниг Бранд", "en": "Hennig Brand", "zh": "Hennig Brand" },
      "discoveryCountry": "DE",
      "sampleColors": [
        { "hex": "#F0E68C", "finish": "glossy", "label": { "ru": "Белый фосфор", "en": "White phosphorus", "zh": "白磷" } },
        { "hex": "#8C2A2A", "finish": "glossy", "label": { "ru": "Красный фосфор", "en": "Red phosphorus", "zh": "红磷" } },
        { "hex": "#241F1C", "finish": "metallic", "label": { "ru": "Чёрный фосфор", "en": "Black phosphorus", "zh": "黑磷" } }
      ],
      "electronShellConfig": "K2-L8-M5-N0-O0-P0-Q0-R0",
      "electronCount": "15",
      "protonCount": "15",
      "neutronCount": "16",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ne] 3s2 3p3 = 1s2 2s2 2p6 3s2 3p3"
    },
    "description": { "ru": "Активный неметалл; существует в белой, красной и чёрной модификациях, входит в ДНК и АТФ.", "en": "A reactive nonmetal; exists in white, red, and black allotropes, essential to DNA and ATP.", "zh": "活泼非金属；有白、红、黑等同素异形体，DNA和ATP的组成元素。" },
    "applications": { "ru": "Удобрения, детергенты, спички, пищевые добавки", "en": "Fertilizers, detergents, matches, food additives", "zh": "肥料、洗涤剂、火柴、食品添加剂" },
    "properties": {
      "atomicMass": "30.9737619977018",
      "density": "1.823",
      "meltingPoint": "44.15",
      "boilingPoint": "277.0",
      "valence": "3, 5",
      "group": "3/V+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "0.66",
      "specificHeat": "769.7",
      "vaporizationHeat": "12.4"
    },
    "atomic": {
      "oxidationState": "-,-,3,2,1,0,1,2,3,4,5,-,-,-,-",
      "ionCharge": "3-",
      "ionizationPotential": "10.487",
      "atomicRadius": "98",
      "covalentRadius": "109",
      "vanDerWaalsRadius": "180"
    },
    "electromagnetic": {
      "electricalConductivity": "10000000.0",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-2.06 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-1.13 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "-3.5 ⋅ 10⁻¹⁰",
      "electricalResistivity": "1 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "18.800 Å",
      "spaceGroup": "I-43m",
      "spaceGroupNumber": "217"
    },
    "additional": {
      "pubchemCid": "CID5462309",
      "rtecsNumber": "RTECSTH3495000",
      "bulkModulus": "11.0",
      "molarVolume": "0.000016991",
      "refractiveIndex": "1.001212",
      "thermalConductivity": "0.236"
    },
    "reactivity": {
      "electronegativity": "2.19",
      "electronAffinity": "72.037"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.172",
      "nfpaCube": "4,4,2,-"
    },
    "prevalence": {
      "universe": "0.0007",
      "sun": "0.0007",
      "ocean": "7 ⋅ 10⁻⁶",
      "humanBody": "1.11291986404955",
      "crust": "0.105",
      "meteorites": "0.11"
    },
    "ghs": [
      "flammable",
      "acuteToxicity"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 31,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=zsG1SWUeFE0",
    "productionCountries": [
      { "country": "cn", "share": "44" },
      { "country": "ma", "share": "14" },
      { "country": "us", "share": "8" },
      { "country": "ru", "share": "6" },
      { "country": "jo", "share": "5" },
      { "country": "eg", "share": "2" }
    ],
    "productionNote": { "ru": "Как фосфоритная руда: Китай, Марокко, США и Россия — крупнейшие страны-добытчики.", "en": "As phosphate rock: China, Morocco, the United States and Russia are the leading mining countries.", "zh": "以磷矿石计：中国、摩洛哥、美国和俄罗斯是主要开采国。" }
  },
  "S": {
    "overview": {
      "latinName": "Sulphuris",
      "englishName": "Sulfur",
      "discoveryYear": "2000 BC",
      "casNumber": "CAS7704-34-9",
      "discoveryCountry": "MiddleEast",
      "sampleColors": [{ "hex": "#FFF030", "finish": "glossy" }],
      "electronShellConfig": "K2-L8-M6-N0-O0-P0-Q0-R0",
      "electronCount": "16",
      "protonCount": "16",
      "neutronCount": "16",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ne] 3s2 3p4 = 1s2 2s2 2p6 3s2 3p4"
    },
    "description": { "ru": "Жёлтый неметалл; известен запахом соединений, встречается у вулканов и в сульфидных рудах.", "en": "A yellow nonmetal; known for its smell in compounds, found near volcanoes and in sulfide ores.", "zh": "黄色非金属；化合物常有特征气味，见于火山附近和硫化物矿石中。" },
    "applications": { "ru": "Серная кислота, вулканизация резины, порох, фунгициды", "en": "Sulfuric acid, rubber vulcanization, gunpowder, fungicides", "zh": "硫酸、橡胶硫化、火药、杀菌剂" },
    "properties": {
      "atomicMass": "32.0647874056212",
      "density": "2.07",
      "meltingPoint": "115.21",
      "boilingPoint": "444.6",
      "valence": "2, 4, 6",
      "group": "3/VI+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "1.727",
      "specificHeat": "705",
      "vaporizationHeat": "45.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,1,0,1,2,3,4,5,6,-,-,-",
      "ionCharge": "2-",
      "ionizationPotential": "10.360",
      "atomicRadius": "88",
      "covalentRadius": "104",
      "vanDerWaalsRadius": "180"
    },
    "electromagnetic": {
      "electricalConductivity": "5.0e-16",
      "electricalType": "2",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.22 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-6.2 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-1.99 ⋅ 10⁻¹⁰",
      "electricalResistivity": "2¹⁵"
    },
    "grid": {
      "structureCode": "9",
      "gridParams": "a=10.437 Å; b=12.845 Å; c=24.369 Å",
      "spaceGroup": "Fddd",
      "spaceGroupNumber": "70"
    },
    "additional": {
      "pubchemCid": "CID5362487",
      "rtecsNumber": "RTECSWS4250000",
      "mohsHardness": "2.0",
      "bulkModulus": "7.7",
      "liquidDensity": "1.819",
      "molarVolume": "0.000016357",
      "refractiveIndex": "1.001111",
      "thermalConductivity": "0.205"
    },
    "reactivity": {
      "electronegativity": "2.58",
      "electronAffinity": "200.4101"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.53",
      "nfpaCube": "1,2,0,-"
    },
    "prevalence": {
      "universe": "0.05",
      "sun": "0.04",
      "ocean": "0.093",
      "humanBody": "0.19975484739351",
      "crust": "0.035",
      "meteorites": "4.0"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 32,
          "abundance": "94.99"
        },
        {
          "mass": 34,
          "abundance": "4.25"
        },
        {
          "mass": 33,
          "abundance": "0.75"
        },
        {
          "mass": 36,
          "abundance": "0.0157"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=fkzmef2_RxY",
    "productionCountries": [
      { "country": "cn", "share": "18" },
      { "country": "us", "share": "8" },
      { "country": "sa" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "В основном извлекается как побочный продукт переработки нефти и газа; Китай, США, Россия и Саудовская Аравия — крупнейшие производители.", "en": "Mostly recovered as a byproduct of oil and gas refining; China, the US, Russia and Saudi Arabia are the leading producers.", "zh": "主要作为石油和天然气精炼的副产品回收；中国、美国、俄罗斯和沙特阿拉伯是主要生产国。" }
  },
  "Cl": {
    "overview": {
      "latinName": "Сhlorum",
      "englishName": "Chlorine",
      "discoveryYear": "1774",
      "casNumber": "CAS7782-50-5",
      "discoverer": { "ru": "Карл Вильгельм Шееле", "en": "Carl Wilhelm Scheele", "zh": "Carl Wilhelm Scheele" },
      "discoveryCountry": "SE",
      "sampleColors": [
        { "hex": "#E8E2B0", "finish": "subtle", "label": { "ru": "Газ", "en": "Gas", "zh": "气体" } },
        { "hex": "#B8D848", "finish": "subtle", "label": { "ru": "Газоразряд", "en": "Gas discharge", "zh": "气体放电" } }
      ],
      "electronShellConfig": "K2-L8-M7-N0-O0-P0-Q0-R0",
      "electronCount": "17",
      "protonCount": "17",
      "neutronCount": "18",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ne] 3s2 3p5 = 1s2 2s2 2p6 3s2 3p5"
    },
    "description": { "ru": "Жёлто-зелёный газ-галоген; сильный окислитель и дезинфектант, очень реакционноспособен.", "en": "A yellow-green halogen gas; strong oxidizer and disinfectant, extremely reactive.", "zh": "黄绿色卤素气体；强氧化剂和消毒剂，反应性极强。" },
    "applications": { "ru": "ПВХ, отбеливатели, дезинфекция воды, растворители", "en": "PVC, bleaches, water disinfection, solvents", "zh": "PVC、漂白剂、水消毒、溶剂" },
    "properties": {
      "atomicMass": "35.4521387667802",
      "density": "0.00321",
      "meltingPoint": "-101.5",
      "boilingPoint": "-34.04",
      "valence": "1, 2, 3, 4, 5, 7",
      "group": "3/VII+",
      "block": "p",
      "aggregationState": "gas"
    },
    "thermo": {
      "fusionHeat": "6.406",
      "specificHeat": "478.2",
      "vaporizationHeat": "20.41"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,-,-,-,3,4,5,-,7,-,-",
      "ionCharge": "1-",
      "ionizationPotential": "12.968",
      "atomicRadius": "79",
      "covalentRadius": "100",
      "vanDerWaalsRadius": "175"
    },
    "electromagnetic": {
      "electricalConductivity": "0.1",
      "electricalType": "2",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-2.31 ⋅ 10⁻⁸",
      "massMagneticSusceptibility": "-7.2 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-5.11 ⋅ 10⁻¹⁰",
      "electricalResistivity": "10.0"
    },
    "grid": {
      "structureCode": "9",
      "gridParams": "a=6.29 Å; b=4.50 Å; c=8.21 Å",
      "spaceGroup": "Cmca",
      "spaceGroupNumber": "64"
    },
    "additional": {
      "pubchemCid": "CID24526",
      "rtecsNumber": "RTECSFO2100000",
      "bulkModulus": "1.1",
      "molarVolume": "0.01103",
      "soundSpeed": "206.0",
      "refractiveIndex": "1.000773",
      "thermalConductivity": "0.0089"
    },
    "reactivity": {
      "electronegativity": "3.16",
      "electronAffinity": "348.575"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "33.5",
      "nfpaCube": "0,4,0,OX"
    },
    "prevalence": {
      "universe": "0.0001",
      "sun": "0.0008",
      "ocean": "2.0",
      "humanBody": "0.13554793215988",
      "crust": "0.0145",
      "meteorites": "0.037"
    },
    "ghs": [
      "oxidizer",
      "compressedGas",
      "corrosive",
      "acuteToxicity"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 35,
          "abundance": "75.76"
        },
        {
          "mass": 37,
          "abundance": "24.24"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=Oygj_Z_TR44",
    "productionCountries": [
      { "country": "cn" },
      { "country": "us" },
      { "country": "de" },
      { "country": "jp" }
    ],
    "productionNote": { "ru": "Не добывается как руда — производится электролизом рассола (хлорно-щелочной процесс); Китай, США, Германия и Япония вместе дают около 85% мирового производства хлора.", "en": "Not mined as an ore — produced via electrolysis of salt brine (the chlor-alkali process); China, the US, Germany and Japan together account for about 85% of world chlorine output.", "zh": "不以矿石形式开采——通过盐水电解（氯碱工艺）生产；中国、美国、德国和日本合计占世界氯气产量的约85%。" }
  },
  "Ar": {
    "overview": {
      "latinName": "Argon",
      "englishName": "Argon",
      "discoveryYear": "1894",
      "casNumber": "CAS7440-37-1",
      "discoverer": { "ru": "Лорд Рэлей, Уильям Рамзай", "en": "Lord Rayleigh, Sir William Ramsay", "zh": "Lord Rayleigh, Sir William Ramsay" },
      "discoveryCountry": "GB",
      "sampleColors": [
        { "hex": "#E8E8E8", "finish": "subtle", "label": { "ru": "Газ", "en": "Gas", "zh": "气体" } },
        { "hex": "#9B85D4", "finish": "subtle", "label": { "ru": "Газоразряд", "en": "Gas discharge", "zh": "气体放电" } }
      ],
      "electronShellConfig": "K2-L8-M8-N0-O0-P0-Q0-R0",
      "electronCount": "18",
      "protonCount": "18",
      "neutronCount": "22",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ne] 3s2 3p6 = 1s2 2s2 2p6 3s2 3p6"
    },
    "description": { "ru": "Благородный газ; бесцветный, инертный, составляет около 1% атмосферы.", "en": "A noble gas; colorless, inert, and makes up about 1% of the atmosphere.", "zh": "稀有气体；无色惰性，约占大气的1%。" },
    "applications": { "ru": "Инертная сварочная среда, лампы, виноделие", "en": "Inert welding gas, lighting, winemaking", "zh": "惰性焊接气、照明、酿酒" },
    "properties": {
      "atomicMass": "39.9477985618953",
      "density": "0.001784",
      "meltingPoint": "-189.34",
      "boilingPoint": "-185.848",
      "valence": "0",
      "group": "3/VIII+",
      "block": "p",
      "aggregationState": "gas"
    },
    "thermo": {
      "fusionHeat": "1.18",
      "specificHeat": "520.33",
      "vaporizationHeat": "6.53"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,-,-,-,-,-,-,-",
      "ionizationPotential": "15.760",
      "atomicRadius": "71",
      "covalentRadius": "101",
      "vanDerWaalsRadius": "188"
    },
    "electromagnetic": {
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.07 ⋅ 10⁻⁸",
      "massMagneticSusceptibility": "-6 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-2.4 ⋅ 10⁻¹⁰"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "5.260 Å",
      "debyeTemperature": "92",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23968",
      "rtecsNumber": "RTECSCF2300000",
      "molarVolume": "0.022392",
      "soundSpeed": "323.0",
      "refractiveIndex": "1.000281",
      "thermalConductivity": "0.01772"
    },
    "reactivity": {
      "electronAffinity": "0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.675",
      "nfpaCube": "0,0,0,SA"
    },
    "prevalence": {
      "universe": "0.02",
      "sun": "0.007",
      "ocean": "4.5 ⋅ 10⁻⁵",
      "crust": "3.5 ⋅ 10⁻⁴"
    },
    "ghs": [
      "compressedGas"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 40,
          "abundance": "99.6035"
        },
        {
          "mass": 36,
          "abundance": "0.3336"
        },
        {
          "mass": 38,
          "abundance": "0.0629"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=aFNVjWVOwSM",
    "productionCountries": [
      { "country": "de" },
      { "country": "cn" },
      { "country": "be" },
      { "country": "nl" },
      { "country": "ca" }
    ],
    "productionNote": { "ru": "Не добывается как руда — выделяется из воздуха как побочный продукт производства кислорода/азота; Германия, Китай, Бельгия, Нидерланды и Канада — крупнейшие экспортёры (данные по производству отдельно не публикуются).", "en": "Not mined as an ore — separated from air as a byproduct of oxygen/nitrogen production; Germany, China, Belgium, the Netherlands and Canada are the leading exporters (dedicated production-by-country figures aren't published).", "zh": "不以矿石形式开采——作为氧气/氮气生产的副产品从空气中分离；德国、中国、比利时、荷兰和加拿大是主要出口国（未单独发布产量统计数据）。" }
  },
  "K": {
    "overview": {
      "latinName": "Kalium",
      "englishName": "Potassium",
      "discoveryYear": "1807",
      "casNumber": "CAS7440-09-7",
      "discoverer": { "ru": "Гемфри Дэви", "en": "Humphry Davy", "zh": "Humphry Davy" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M8-N1-O0-P0-Q0-R0",
      "electronCount": "19",
      "protonCount": "19",
      "neutronCount": "20",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 4s1 = 1s2 2s2 2p6 3s2 3p6 4s1"
    },
    "description": { "ru": "Мягкий щелочной металл; серебристый, бурно реагирует с водой, важен для работы нервов.", "en": "A soft alkali metal; silvery, reacts violently with water, essential for nerve function in living organisms.", "zh": "柔软碱金属；银白色，与水剧烈反应，对生物神经功能至关重要。" },
    "applications": { "ru": "Удобрения, мыло, стекольная промышленность, заменители соли", "en": "Fertilizers, soap, glass industry, salt substitutes", "zh": "肥料、肥皂、玻璃工业、代盐" },
    "properties": {
      "atomicMass": "39.0983009088233",
      "density": "0.862",
      "meltingPoint": "63.5",
      "boilingPoint": "759.0",
      "valence": "1",
      "group": "4/I+",
      "block": "s",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "2.321",
      "specificHeat": "757",
      "thermalExpansion": "83.3 ⋅ 10⁻⁶",
      "vaporizationHeat": "76.9"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,-,1,-,-,-,-,-,-,-,-",
      "ionCharge": "1+",
      "ionizationPotential": "4.341",
      "atomicRadius": "235",
      "covalentRadius": "200",
      "vanDerWaalsRadius": "275"
    },
    "electromagnetic": {
      "electricalConductivity": "13888888.8888889",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "5.74 ⋅ 10⁻⁶",
      "massMagneticSusceptibility": "6.7 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "2.62 ⋅ 10⁻¹⁰",
      "electricalResistivity": "7.26 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "5.332 Å",
      "debyeTemperature": "91",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID5462222",
      "rtecsNumber": "RTECSTS6460000",
      "brinellHardness": "0.36",
      "mohsHardness": "0.4",
      "bulkModulus": "3.1",
      "liquidDensity": "0.828",
      "molarVolume": "0.00004568",
      "shearModulus": "1.3",
      "soundSpeed": "2000.0",
      "thermalConductivity": "102.5"
    },
    "reactivity": {
      "electronegativity": "0.82",
      "electronAffinity": "48.383"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "2.1",
      "nfpaCube": "3,3,2,W"
    },
    "prevalence": {
      "universe": "0.0003",
      "sun": "0.0004",
      "ocean": "0.042",
      "humanBody": "0.19975484739351",
      "crust": "2.09",
      "meteorites": "0.07"
    },
    "ghs": [
      "flammable",
      "corrosive",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 39,
          "abundance": "93.258"
        },
        {
          "mass": 41,
          "abundance": "6.730"
        },
        {
          "mass": 40,
          "abundance": "0.012"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=oEKSJBX-hKA",
    "productionCountries": [
      { "country": "ca", "share": "31" },
      { "country": "ru", "share": "19" },
      { "country": "by", "share": "15" },
      { "country": "cn", "share": "13" },
      { "country": "de", "share": "6" }
    ],
    "productionNote": { "ru": "Как калийная соль (поташ): Канада — крупнейший производитель, за ней следуют Россия, Беларусь и Китай.", "en": "As potash: Canada is the leading producer, followed by Russia, Belarus and China.", "zh": "以钾盐计：加拿大是主要生产国，其次是俄罗斯、白俄罗斯和中国。" }
  },
  "Ca": {
    "overview": {
      "latinName": "Сalcium",
      "englishName": "Calcium",
      "discoveryYear": "1808",
      "casNumber": "CAS7440-70-2",
      "discoverer": { "ru": "Гемфри Дэви", "en": "Humphry Davy", "zh": "Humphry Davy" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#D0C8A0" }],
      "electronShellConfig": "K2-L8-M8-N2-O0-P0-Q0-R0",
      "electronCount": "20",
      "protonCount": "20",
      "neutronCount": "20",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 4s2 = 1s2 2s2 2p6 3s2 3p6 4s2"
    },
    "description": { "ru": "Серебристый щелочноземельный металл; пятый по распространённости в коре, основа костей и раковин.", "en": "A silvery alkaline-earth metal; fifth most abundant element in Earth's crust, key to bones and shells.", "zh": "银白色碱土金属；地壳中第五丰富的元素，骨骼和贝壳的主要成分。" },
    "applications": { "ru": "Цемент, известь, металлургия, пищевые добавки", "en": "Cement, lime, metallurgy, food additives", "zh": "水泥、石灰、冶金、食品添加剂" },
    "properties": {
      "atomicMass": "40.0780224976209",
      "density": "1.54",
      "meltingPoint": "842.0",
      "boilingPoint": "1484.0",
      "valence": "2",
      "group": "4/II+",
      "block": "s",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "8.54",
      "specificHeat": "631",
      "thermalExpansion": "22.3 ⋅ 10⁻⁶",
      "vaporizationHeat": "154.7"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,-,-,-,-,-,-,-",
      "ionCharge": "2+",
      "ionizationPotential": "6.113",
      "atomicRadius": "194",
      "covalentRadius": "174",
      "vanDerWaalsRadius": "231"
    },
    "electromagnetic": {
      "electricalConductivity": "29761904.7619048",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "2.139 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "1.38 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "5.531 ⋅ 10⁻¹⁰",
      "electricalResistivity": "3.36 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "4 | 3",
      "gridParams": "5.580 Å | a=4.48 Å",
      "debyeTemperature": "229",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID5460341",
      "brinellHardness": "167.0",
      "mohsHardness": "1.75",
      "bulkModulus": "17.0",
      "youngModulus": "20.0",
      "liquidDensity": "1.378",
      "molarVolume": "0.000025857",
      "poissonRatio": "0.31",
      "shearModulus": "7.4",
      "soundSpeed": "3810.0",
      "thermalConductivity": "201.0"
    },
    "reactivity": {
      "electronegativity": "1",
      "electronAffinity": "2.37"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.43",
      "nfpaCube": "1,3,2,W"
    },
    "prevalence": {
      "universe": "0.007",
      "sun": "0.007",
      "ocean": "0.042",
      "humanBody": "1.42682033852507",
      "crust": "4.15",
      "meteorites": "1.1"
    },
    "ghs": [
      "flammable",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 40,
          "abundance": "96.941"
        },
        {
          "mass": 44,
          "abundance": "2.086"
        },
        {
          "mass": 42,
          "abundance": "0.647"
        },
        {
          "mass": 43,
          "abundance": "0.135"
        },
        {
          "mass": 46,
          "abundance": "0.004"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=q4LSaB-EYsg",
    "productionCountries": [
      { "country": "cn", "share": "47.5" },
      { "country": "in", "share": "11" },
      { "country": "vn", "share": "5" },
      { "country": "ru" },
      { "country": "us" }
    ],
    "productionNote": { "ru": "Известняк (основное сырьё) добывают почти повсеместно, но как металлический кальций производит в основном Китай (около 95% мирового объёма), Россия и США — гораздо меньшие производители.", "en": "Limestone (the feedstock) is quarried almost everywhere, but as metallic calcium it's overwhelmingly produced in China (roughly 95% of world output), with Russia and the US as much smaller producers.", "zh": "石灰岩（原料）几乎在各地都有开采，但金属钙的生产绝大部分集中在中国（约占世界产量的95%），俄罗斯和美国是规模小得多的生产国。" }
  },
  "Sc": {
    "overview": {
      "latinName": "Scandium",
      "englishName": "Scandium",
      "discoveryYear": "1879",
      "casNumber": "CAS7440-20-2",
      "discoverer": { "ru": "Ларс Фредерик Нильсон", "en": "Lars Fredrik Nilson", "zh": "Lars Fredrik Nilson" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M9-N2-O0-P0-Q0-R0",
      "electronCount": "21",
      "protonCount": "21",
      "neutronCount": "24",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d1 4s2 = 1s2 2s2 2p6 3s2 3p6 3d1 4s2"
    },
    "description": { "ru": "Серебристый переходный металл; лёгкий и прочный, связан с химией редкоземельных элементов.", "en": "A silvery transition metal; light and strong, used in aerospace alloys and often associated with rare-earth chemistry.", "zh": "银白色过渡金属；轻质高强，与稀土化学密切相关。" },
    "applications": { "ru": "Авиационные сплавы, спортивное оборудование, металлогалогенные лампы", "en": "Aerospace alloys, sports equipment, metal-halide lamps", "zh": "航空合金、体育器材、金属卤化物灯" },
    "properties": {
      "atomicMass": "44.9559070745661",
      "density": "2.985",
      "meltingPoint": "1541.0",
      "boilingPoint": "2836.0",
      "valence": "3",
      "group": "4/III-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "14.1",
      "specificHeat": "567",
      "thermalExpansion": "10.2 ⋅ 10⁻⁶",
      "vaporizationHeat": "332.7"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "6.561",
      "atomicRadius": "184",
      "covalentRadius": "170",
      "vanDerWaalsRadius": "211"
    },
    "electromagnetic": {
      "electricalConductivity": "1779359.43060498",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "2.627 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "8.8 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "3.956 ⋅ 10⁻⁹",
      "electricalResistivity": "5.62 ⋅ 10⁻⁷",
      "superconductingTemperature": "0.05"
    },
    "grid": {
      "structureCode": "2 | 3",
      "gridParams": "a=3.309 Å; c=5.268 Å",
      "axialRatio": "1.592",
      "debyeTemperature": "346",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23952",
      "brinellHardness": "750.0",
      "bulkModulus": "56.6",
      "youngModulus": "74.4",
      "liquidDensity": "2.8",
      "molarVolume": "0.000015061",
      "poissonRatio": "0.28",
      "shearModulus": "29.1",
      "thermalConductivity": "15.8"
    },
    "reactivity": {
      "electronegativity": "1.36",
      "electronAffinity": "18.0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "27.5",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "3 ⋅ 10⁻⁶",
      "sun": "4 ⋅ 10⁻⁶",
      "ocean": "1.5 ⋅ 10⁻¹⁰",
      "humanBody": "2 ⋅ 10⁻⁵",
      "crust": "0.0022",
      "meteorites": "0.00064"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 45,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=GzEuy18eljQ",
    "productionCountries": [
      { "country": "cn" },
      { "country": "kz" },
      { "country": "ph" }
    ],
    "productionNote": { "ru": "Извлекается только как побочный продукт (переработка редкоземельных металлов, титана, циркония, урана); Китай, Россия, Казахстан и Филиппины — основные источники, мировое производство — менее 40 тонн в год.", "en": "Recovered only as a byproduct (of rare-earth, titanium, zirconium and uranium processing); China, Russia, Kazakhstan and the Philippines are the main sources, with world output under 40 tons a year.", "zh": "仅作为副产品回收（稀土、钛、锆和铀加工的副产品）；中国、俄罗斯、哈萨克斯坦和菲律宾是主要来源，世界年产量不足40吨。" }
  },
  "Ti": {
    "overview": {
      "latinName": "Titanium",
      "englishName": "Titanium",
      "discoveryYear": "1791",
      "casNumber": "CAS7440-32-6",
      "discoverer": { "ru": "Уильям Грегор", "en": "William Gregor", "zh": "William Gregor" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M10-N2-O0-P0-Q0-R0",
      "electronCount": "22",
      "protonCount": "22",
      "neutronCount": "26",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d2 4s2 = 1s2 2s2 2p6 3s2 3p6 3d2 4s2"
    },
    "description": { "ru": "Прочный коррозионностойкий переходный металл; серебристо-белый, отличное соотношение прочности и массы.", "en": "A strong, corrosion-resistant transition metal; silvery-white, with an excellent strength-to-weight ratio.", "zh": "强韧耐腐蚀的过渡金属；银白色，强度重量比优异。" },
    "applications": { "ru": "Авиация, медицинские импланты, белые пигменты, спортинвентарь", "en": "Aerospace, medical implants, white pigments, sports gear", "zh": "航空航天、医疗植入物、白色颜料、运动装备" },
    "properties": {
      "atomicMass": "47.8667436596202",
      "density": "4.506",
      "meltingPoint": "1668.0",
      "boilingPoint": "3287.0",
      "valence": "2, 3, 4",
      "group": "4/IV-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "14.15",
      "specificHeat": "520",
      "thermalExpansion": "8.6 ⋅ 10⁻⁶",
      "vaporizationHeat": "425.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,1,0,1,2,3,4,-,-,-,-,-",
      "ionCharge": "3+, 4+",
      "ionizationPotential": "6.828",
      "atomicRadius": "176",
      "covalentRadius": "160",
      "vanDerWaalsRadius": "187"
    },
    "electromagnetic": {
      "electricalConductivity": "2380952.38095238",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "1.807 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "4.01 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "1.919 ⋅ 10⁻⁹",
      "electricalResistivity": "4.2 ⋅ 10⁻⁷",
      "superconductingTemperature": "0.4"
    },
    "grid": {
      "structureCode": "2 | 3",
      "gridParams": "a=2.951 Å; с=4.697 Å | a=3.269 Å",
      "axialRatio": "1.587 | 3260",
      "debyeTemperature": "420",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23963",
      "brinellHardness": "715.0",
      "mohsHardness": "6.0",
      "vickersHardness": "970.0",
      "bulkModulus": "110.0",
      "youngModulus": "116.0",
      "liquidDensity": "4.11",
      "molarVolume": "0.000010621",
      "poissonRatio": "0.32",
      "shearModulus": "44.0",
      "soundSpeed": "5090.0",
      "thermalConductivity": "21.9"
    },
    "reactivity": {
      "electronegativity": "1.54",
      "electronAffinity": "7.289"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "6.1",
      "nfpaCube": "1,1,2,-"
    },
    "prevalence": {
      "universe": "0.0003",
      "sun": "4 ⋅ 10⁻⁴",
      "ocean": "1 ⋅ 10⁻⁷",
      "humanBody": "2.853640677 ⋅ 10⁻⁵",
      "crust": "0.565",
      "meteorites": "0.054"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 48,
          "abundance": "73.72"
        },
        {
          "mass": 46,
          "abundance": "8.25"
        },
        {
          "mass": 47,
          "abundance": "7.44"
        },
        {
          "mass": 49,
          "abundance": "5.41"
        },
        {
          "mass": 50,
          "abundance": "5.18"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=-wVfhEdWaDk",
    "productionCountries": [
      { "country": "au" },
      { "country": "za" },
      { "country": "cn" },
      { "country": "mz" },
      { "country": "ke" }
    ],
    "productionNote": { "ru": "Как титановые минеральные концентраты (ильменит/рутил): Австралия, ЮАР, Китай, Мозамбик и Кения — крупнейшие страны-добытчики.", "en": "As titanium mineral concentrates (ilmenite/rutile): Australia, South Africa, China, Mozambique and Kenya are the top mining countries.", "zh": "以钛矿物精矿（钛铁矿/金红石）计：澳大利亚、南非、中国、莫桑比克和肯尼亚是主要开采国。" }
  },
  "V": {
    "overview": {
      "latinName": "Vanadium",
      "englishName": "Vanadium",
      "discoveryYear": "1801",
      "casNumber": "CAS7440-62-2",
      "discoverer": { "ru": "Андрес Мануэль дель Рио", "en": "Andres Manuel del Rio", "zh": "Andres Manuel del Rio" },
      "discoveryCountry": "MX",
      "sampleColors": [{ "hex": "#8FA4B4" }],
      "electronShellConfig": "K2-L8-M11-N2-O0-P0-Q0-R0",
      "electronCount": "23",
      "protonCount": "23",
      "neutronCount": "28",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d3 4s2 = 1s2 2s2 2p6 3s2 3p6 3d3 4s2"
    },
    "description": { "ru": "Твёрдый серебристо-серый переходный металл; образует ярко окрашенные соединения, устойчив к коррозии.", "en": "A hard, silvery-gray transition metal; forms colorful compounds and resists corrosion.", "zh": "硬而银灰的过渡金属；形成色彩丰富的化合物，抗腐蚀。" },
    "applications": { "ru": "Легированная сталь, катализаторы, ванадиевые аккумуляторы", "en": "Alloy steel, catalysts, vanadium flow batteries", "zh": "合金钢、催化剂、钒液流电池" },
    "properties": {
      "atomicMass": "50.9414656566912",
      "density": "6.11",
      "meltingPoint": "1910.0",
      "boilingPoint": "3407.0",
      "valence": "2, 3, 4, 5",
      "group": "4/V-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "21.5",
      "specificHeat": "489",
      "thermalExpansion": "8.4 ⋅ 10⁻⁶",
      "vaporizationHeat": "444.0"
    },
    "atomic": {
      "oxidationState": "-,-,3,2,1,0,1,2,3,4,5,-,-,-,-",
      "ionCharge": "3+, 5+",
      "ionizationPotential": "6.746",
      "atomicRadius": "171",
      "covalentRadius": "153",
      "vanDerWaalsRadius": "179"
    },
    "electromagnetic": {
      "electricalConductivity": "5076142.1319797",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "3.837 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "5.28 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "3.199 ⋅ 10⁻⁹",
      "electricalResistivity": "1.97 ⋅ 10⁻⁷",
      "superconductingTemperature": "5.4"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "3.024 Å",
      "debyeTemperature": "399",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID23990",
      "brinellHardness": "628.0",
      "mohsHardness": "7.0",
      "vickersHardness": "628.0",
      "bulkModulus": "160.0",
      "youngModulus": "128.0",
      "liquidDensity": "5.5",
      "molarVolume": "0.0000083374",
      "poissonRatio": "0.37",
      "shearModulus": "47.0",
      "soundSpeed": "4560.0",
      "thermalConductivity": "30.7"
    },
    "reactivity": {
      "electronegativity": "1.63",
      "electronAffinity": "50.911"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "5.08",
      "nfpaCube": "1,2,0,-"
    },
    "prevalence": {
      "universe": "0.0001",
      "sun": "4 ⋅ 10⁻⁵",
      "ocean": "1.5 ⋅ 10⁻⁷",
      "humanBody": "3 ⋅ 10⁻⁶",
      "crust": "0.012",
      "meteorites": "0.0061"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 51,
          "abundance": "99.75"
        },
        {
          "mass": 50,
          "abundance": "0.25"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=M2HCDbVO5Ak",
    "productionCountries": [
      { "country": "cn", "share": "70" },
      { "country": "ru", "share": "21" },
      { "country": "za", "share": "8" },
      { "country": "br", "share": "5" }
    ],
    "productionNote": { "ru": "Китай, Россия, ЮАР и Бразилия — крупнейшие страны-добытчики ванадия.", "en": "China, Russia, South Africa and Brazil are the top vanadium mining countries.", "zh": "中国、俄罗斯、南非和巴西是主要的钒矿开采国。" }
  },
  "Cr": {
    "overview": {
      "latinName": "Chromium",
      "englishName": "Chromium",
      "discoveryYear": "1797",
      "casNumber": "CAS7440-47-3",
      "discoverer": { "ru": "Луи Никола Воклен", "en": "Louis-Nicolas Vauquelin", "zh": "Louis-Nicolas Vauquelin" },
      "discoveryCountry": "FR",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M13-N1-O0-P0-Q0-R0",
      "electronCount": "24",
      "protonCount": "24",
      "neutronCount": "28",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d5 4s1 = 1s2 2s2 2p6 3s2 3p6 3d5 4s1"
    },
    "description": { "ru": "Твёрдый блестящий переходный металл; основа нержавеющей стали и декоративного хромирования.", "en": "A hard, lustrous transition metal; prized for stainless steel and decorative plating.", "zh": "硬而有光泽的过渡金属；不锈钢和装饰镀铬的基础。" },
    "applications": { "ru": "Нержавеющая сталь, хромирование, пигменты, дубление кожи", "en": "Stainless steel, chrome plating, pigments, leather tanning", "zh": "不锈钢、镀铬、颜料、制革" },
    "properties": {
      "atomicMass": "51.9961302818614",
      "density": "7.15",
      "meltingPoint": "1907.0",
      "boilingPoint": "2671.0",
      "valence": "2, 3, 6",
      "group": "4/VI-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "21.0",
      "specificHeat": "448",
      "thermalExpansion": "4.9 ⋅ 10⁻⁶",
      "vaporizationHeat": "339.5"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,-,2,3,4,5,6,-,-,-",
      "ionCharge": "2+, 3+",
      "ionizationPotential": "6.767",
      "atomicRadius": "166",
      "covalentRadius": "139",
      "vanDerWaalsRadius": "189"
    },
    "electromagnetic": {
      "electricalConductivity": "8000000.0",
      "electricalType": "1",
      "magneticType": "antiferromagnetic",
      "volumeMagneticSusceptibility": "3.177 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "4.45 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "2.314 ⋅ 10⁻⁹",
      "electricalResistivity": "1.25 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "2.885 Å",
      "debyeTemperature": "610",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID23976",
      "rtecsNumber": "RTECSGB4200000",
      "brinellHardness": "1120.0",
      "mohsHardness": "8.5",
      "vickersHardness": "1060.0",
      "bulkModulus": "160.0",
      "youngModulus": "279.0",
      "liquidDensity": "6.3",
      "molarVolume": "0.0000072317",
      "poissonRatio": "0.21",
      "shearModulus": "115.0",
      "soundSpeed": "5940.0",
      "thermalConductivity": "93.9"
    },
    "reactivity": {
      "electronegativity": "1.66",
      "electronAffinity": "65.21"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "3.05",
      "nfpaCube": "1,2,1,-"
    },
    "prevalence": {
      "universe": "0.0015",
      "sun": "0.002",
      "ocean": "6 ⋅ 10⁻⁸",
      "humanBody": "3 ⋅ 10⁻⁶",
      "crust": "0.0102",
      "meteorites": "0.3"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 52,
          "abundance": "83.789"
        },
        {
          "mass": 53,
          "abundance": "9.501"
        },
        {
          "mass": 50,
          "abundance": "4.345"
        },
        {
          "mass": 54,
          "abundance": "2.365"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=ODFNQIn39JI",
    "productionCountries": [
      { "country": "za", "share": "43.9" },
      { "country": "kz", "share": "14.6" },
      { "country": "tr", "share": "14.6" },
      { "country": "in", "share": "10.2" }
    ],
    "productionNote": { "ru": "Как хромитовая руда: ЮАР одна обеспечивает около 40-45% мировой добычи, за ней следуют Казахстан, Турция и Индия.", "en": "As chromite ore: South Africa alone accounts for roughly 40-45% of world output, followed by Kazakhstan, Turkey and India.", "zh": "以铬铁矿计：南非一国就占世界产量的约40%-45%，其次是哈萨克斯坦、土耳其和印度。" }
  },
  "Mn": {
    "overview": {
      "latinName": "Manganum",
      "englishName": "Manganese",
      "discoveryYear": "1774",
      "casNumber": "CAS7439-96-5",
      "discoverer": { "ru": "Юхан Готлиб Ган, Игнатий Готфрид Кайм", "en": "Johan Gottlieb Gahn, Ignatius Gottfried Kaim", "zh": "Johan Gottlieb Gahn, Ignatius Gottfried Kaim" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M13-N2-O0-P0-Q0-R0",
      "electronCount": "25",
      "protonCount": "25",
      "neutronCount": "30",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d5 4s2 = 1s2 2s2 2p6 3s2 3p6 3d5 4s2"
    },
    "description": { "ru": "Твёрдый хрупкий переходный металл; необходим для стали, встречается во многих минералах.", "en": "A hard, brittle transition metal; essential for steel and found in many common minerals.", "zh": "硬而脆的过渡金属；钢铁必需，常见于多种矿物中。" },
    "applications": { "ru": "Легирование стали, аккумуляторы, удобрения, производство стекла", "en": "Steel alloying, batteries, fertilizers, glass production", "zh": "炼钢合金、电池、肥料、玻璃生产" },
    "properties": {
      "atomicMass": "54.9380430430528",
      "density": "7.3",
      "meltingPoint": "1246.0",
      "boilingPoint": "2061.0",
      "valence": "2, 3, 4, 6, 7",
      "group": "4/VII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "12.91",
      "specificHeat": "479",
      "thermalExpansion": "21.7 ⋅ 10⁻⁶",
      "vaporizationHeat": "221.0"
    },
    "atomic": {
      "oxidationState": "-,-,3,-,1,0,1,2,3,4,5,6,7,-,-",
      "ionCharge": "2+, 4+",
      "ionizationPotential": "7.434",
      "atomicRadius": "161",
      "covalentRadius": "139",
      "vanDerWaalsRadius": "197"
    },
    "electromagnetic": {
      "electricalConductivity": "694444.444444444",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "9.0387 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "1.21 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "6.6475 ⋅ 10⁻⁹",
      "electricalResistivity": "1.44 ⋅ 10⁻⁶"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "8.890 Å",
      "debyeTemperature": "409",
      "spaceGroup": "I_ 43m",
      "spaceGroupNumber": "217"
    },
    "additional": {
      "pubchemCid": "CID23930",
      "brinellHardness": "196.0",
      "mohsHardness": "6.0",
      "bulkModulus": "120.0",
      "youngModulus": "198.0",
      "liquidDensity": "5.95",
      "molarVolume": "0.0000073545",
      "soundSpeed": "5150.0",
      "thermalConductivity": "7.81"
    },
    "reactivity": {
      "electronegativity": "1.55",
      "electronAffinity": "0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "13.3",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "0.0008",
      "sun": "0.001",
      "ocean": "2 ⋅ 10⁻⁷",
      "humanBody": "1.712184406 ⋅ 10⁻⁵",
      "crust": "0.095",
      "meteorites": "0.27"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 55,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=zYvUl5JBzBI",
    "productionCountries": [
      { "country": "za", "share": "38" },
      { "country": "ga", "share": "25" },
      { "country": "gh", "share": "10" },
      { "country": "au", "share": "8" },
      { "country": "br", "share": "4" },
      { "country": "in", "share": "3.95" },
      { "country": "cn", "share": "3.5" }
    ],
    "productionNote": { "ru": "ЮАР, Австралия, Габон и Китай — крупнейшие страны-добытчики марганцевой руды.", "en": "South Africa, Australia, Gabon and China are the top manganese ore mining countries.", "zh": "南非、澳大利亚、加蓬和中国是主要的锰矿开采国。" }
  },
  "Fe": {
    "overview": {
      "latinName": "Ferrum",
      "englishName": "Iron",
      "discoveryYear": "~3500 BC",
      "casNumber": "CAS7439-89-6",
      "discoveryCountry": "MiddleEast",
      "sampleColors": [{ "hex": "#808080" }],
      "electronShellConfig": "K2-L8-M14-N2-O0-P0-Q0-R0",
      "electronCount": "26",
      "protonCount": "26",
      "neutronCount": "30",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d6 4s2 = 1s2 2s2 2p6 3s2 3p6 3d6 4s2"
    },
    "description": { "ru": "Самый распространённый металл Земли по массе; ферромагнитен, входит в гемоглобин.", "en": "The most common metal on Earth by mass; magnetic in its metallic form and central to hemoglobin.", "zh": "地球质量上最常见的金属；金属态有磁性，血红蛋白的核心元素。" },
    "applications": { "ru": "Сталь, чугун, машиностроение, строительство", "en": "Steel, cast iron, machinery, construction", "zh": "钢铁、铸铁、机械、建筑" },
    "properties": {
      "atomicMass": "55.8451436425238",
      "density": "7.874",
      "meltingPoint": "1538.0",
      "boilingPoint": "2861.0",
      "valence": "2, 3, 4, 6",
      "group": "4/VIII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "13.81",
      "specificHeat": "449",
      "thermalExpansion": "11.8 ⋅ 10⁻⁶",
      "vaporizationHeat": "340.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,1,0,1,2,3,4,5,6,-,-,-",
      "ionCharge": "2+, 3+",
      "ionizationPotential": "7.902",
      "atomicRadius": "156",
      "covalentRadius": "132",
      "vanDerWaalsRadius": "194"
    },
    "electromagnetic": {
      "electricalConductivity": "10405827.2632674",
      "electricalType": "1",
      "magneticType": "ferromagnetic",
      "electricalResistivity": "9.7 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "3 | 4 | 3",
      "gridParams": "2.866 Å | a=3.656 Å | a=2.93",
      "debyeTemperature": "464 | 349 | 464",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID23925",
      "rtecsNumber": "RTECSNO4565500",
      "brinellHardness": "490.0",
      "mohsHardness": "4.0",
      "vickersHardness": "608.0",
      "bulkModulus": "170.0",
      "youngModulus": "211.0",
      "liquidDensity": "6.98",
      "molarVolume": "0.0000070923",
      "poissonRatio": "0.29",
      "shearModulus": "82.0",
      "soundSpeed": "5120.0",
      "thermalConductivity": "80.4"
    },
    "reactivity": {
      "electronegativity": "1.83",
      "electronAffinity": "14.785"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "2.56",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "0.11",
      "sun": "0.14",
      "ocean": "3 ⋅ 10⁻⁷",
      "humanBody": "0.00599264542181",
      "crust": "5.63",
      "meteorites": "22.0"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 56,
          "abundance": "91.754"
        },
        {
          "mass": 54,
          "abundance": "5.845"
        },
        {
          "mass": 57,
          "abundance": "2.119"
        },
        {
          "mass": 58,
          "abundance": "0.282"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=wC83O_SYVKc",
    "productionCountries": [
      { "country": "au", "share": "37.2" },
      { "country": "br", "share": "17.6" },
      { "country": "cn", "share": "10.8" },
      { "country": "in", "share": "10.8" },
      { "country": "ru", "share": "3.6" },
      { "country": "ir", "share": "3.6" },
      { "country": "za", "share": "2.6" },
      { "country": "ca", "share": "2.2" },
      { "country": "us", "share": "1.9" },
      { "country": "ua", "share": "1.7" },
      { "country": "kz", "share": "1.2" },
      { "country": "se", "share": "1.1" },
      { "country": "pe", "share": "0.8" },
      { "country": "cl", "share": "0.7" },
      { "country": "tr", "share": "0.7" },
      { "country": "mr", "share": "0.6" },
      { "country": "mx", "share": "0.3" },
      { "country": "mn", "share": "0.3" },
      { "country": "lr", "share": "0.2" },
      { "country": "vn", "share": "0.07" }
    ],
    "productionNote": { "ru": "Крупнейшие страны-добытчики железной руды.", "en": "Top iron ore mining countries by output.", "zh": "铁矿石产量最高的国家。" }
  },
  "Co": {
    "overview": {
      "latinName": "Cobaltum",
      "englishName": "Cobalt",
      "discoveryYear": "1739",
      "casNumber": "CAS7440-48-4",
      "discoverer": { "ru": "Георг Брандт", "en": "Georg Brandt", "zh": "Georg Brandt" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#808080" }],
      "electronShellConfig": "K2-L8-M15-N2-O0-P0-Q0-R0",
      "electronCount": "27",
      "protonCount": "27",
      "neutronCount": "32",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d7 4s2 = 1s2 2s2 2p6 3s2 3p6 3d7 4s2"
    },
    "description": { "ru": "Твёрдый серебристый переходный металл; ферромагнитен, образует интенсивно окрашенные соединения.", "en": "A hard, silvery transition metal; ferromagnetic and forms intensely colored compounds.", "zh": "硬而银白的过渡金属；铁磁性，化合物颜色鲜艳。" },
    "applications": { "ru": "Аккумуляторы, магниты, катализаторы, твердосплавный инструмент", "en": "Batteries, magnets, catalysts, cutting tools", "zh": "电池、磁铁、催化剂、切削工具" },
    "properties": {
      "atomicMass": "58.9331935652212",
      "density": "8.86",
      "meltingPoint": "1495.0",
      "boilingPoint": "2927.0",
      "valence": "2, 3",
      "group": "4/VIII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "16.06",
      "specificHeat": "421",
      "thermalExpansion": "13 ⋅ 10⁻⁶",
      "vaporizationHeat": "377.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,0,-,2,3,4,5,-,-,-,-",
      "ionCharge": "2+, 3+",
      "ionizationPotential": "7.881",
      "atomicRadius": "152",
      "covalentRadius": "126",
      "vanDerWaalsRadius": "192"
    },
    "electromagnetic": {
      "electricalConductivity": "16025641.025641",
      "electricalType": "1",
      "magneticType": "ferromagnetic",
      "electricalResistivity": "6.24 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "2 | 4",
      "gridParams": "a=2.505 Å; c=4.070 Å | a=3.5370 Å",
      "axialRatio": "1.632",
      "debyeTemperature": "460",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID104730",
      "rtecsNumber": "RTECSGF8750000",
      "brinellHardness": "700.0",
      "mohsHardness": "5.0",
      "vickersHardness": "1043.0",
      "bulkModulus": "180.0",
      "youngModulus": "209.0",
      "liquidDensity": "7.75",
      "molarVolume": "0.00000662",
      "poissonRatio": "0.31",
      "shearModulus": "75.0",
      "soundSpeed": "4720.0",
      "thermalConductivity": "100.0"
    },
    "reactivity": {
      "electronegativity": "1.88",
      "electronAffinity": "63.898"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "37.2",
      "nfpaCube": "2,1,0,-"
    },
    "prevalence": {
      "universe": "0.0003",
      "sun": "0.0004",
      "ocean": "8 ⋅ 10⁻⁹",
      "humanBody": "2 ⋅ 10⁻⁶",
      "crust": "0.0025",
      "meteorites": "0.059"
    },
    "ghs": [
      "healthHazard",
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 59,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=vrl2ZylxQfU",
    "productionCountries": [
      { "country": "cd", "share": "74.2" },
      { "country": "id", "share": "14.2" },
      { "country": "ru", "share": "2.5" },
      { "country": "mg", "share": "1.3" },
      { "country": "ph", "share": "1.2" },
      { "country": "au", "share": "1.2" },
      { "country": "ca", "share": "1.1" },
      { "country": "pg", "share": "0.9" },
      { "country": "cu", "share": "0.6" },
      { "country": "tr", "share": "0.6" }
    ],
    "productionNote": { "ru": "ДР Конго обеспечивает более 70% мировой добычи кобальта, Индонезия — быстрорастущий второй производитель (побочный продукт добычи никеля).", "en": "The Democratic Republic of the Congo dominates world cobalt mine output (over 70%), with Indonesia a fast-growing second producer (a byproduct of nickel mining).", "zh": "刚果民主共和国主导世界钴矿产量（超过70%），印度尼西亚是快速增长的第二大生产国（镍矿开采的副产品）。" }
  },
  "Ni": {
    "overview": {
      "latinName": "Niccolum",
      "englishName": "Nickel",
      "discoveryYear": "1751",
      "casNumber": "CAS7440-02-0",
      "discoverer": { "ru": "Аксель Кронстедт", "en": "Axel Frederic von Cronstedt", "zh": "Axel Frederic von Cronstedt" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#808080" }],
      "electronShellConfig": "K2-L8-M16-N2-O0-P0-Q0-R0",
      "electronCount": "28",
      "protonCount": "28",
      "neutronCount": "31",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d8 4s2 = 1s2 2s2 2p6 3s2 3p6 3d8 4s2"
    },
    "description": { "ru": "Серебристо-белый переходный металл; ферромагнитен, коррозионностойкий, широко используется в сплавах.", "en": "A silvery-white transition metal; ferromagnetic, corrosion-resistant, and widely used in alloys.", "zh": "银白色过渡金属；铁磁性、耐腐蚀，广泛用于合金。" },
    "applications": { "ru": "Нержавеющая сталь, аккумуляторы, монеты, гальванические покрытия", "en": "Stainless steel, batteries, coins, electroplating", "zh": "不锈钢、电池、硬币、电镀" },
    "properties": {
      "atomicMass": "58.6933503482247",
      "density": "8.908",
      "meltingPoint": "1455.0",
      "boilingPoint": "2730.0",
      "valence": "2, 3",
      "group": "4/VIII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "17.48",
      "specificHeat": "445",
      "thermalExpansion": "13.4 ⋅ 10⁻⁶",
      "vaporizationHeat": "379.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,1,2,3,4,-,-,-,-,-",
      "ionCharge": "2+, 3+",
      "ionizationPotential": "7.640",
      "atomicRadius": "149",
      "covalentRadius": "124",
      "vanDerWaalsRadius": "163"
    },
    "electromagnetic": {
      "electricalConductivity": "14430014.4300144",
      "electricalType": "1",
      "magneticType": "ferromagnetic",
      "electricalResistivity": "6.93 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "3.524 Å",
      "debyeTemperature": "440",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID935",
      "rtecsNumber": "RTECSQR5950000",
      "brinellHardness": "700.0",
      "mohsHardness": "4.0",
      "vickersHardness": "638.0",
      "bulkModulus": "180.0",
      "youngModulus": "200.0",
      "liquidDensity": "7.81",
      "molarVolume": "0.0000065888",
      "poissonRatio": "0.31",
      "shearModulus": "76.0",
      "soundSpeed": "4900.0",
      "thermalConductivity": "90.9"
    },
    "reactivity": {
      "electronegativity": "1.91",
      "electronAffinity": "111.65"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "4.5",
      "nfpaCube": "4,2,1,-"
    },
    "prevalence": {
      "universe": "0.006",
      "sun": "0.008",
      "ocean": "2 ⋅ 10⁻⁷",
      "humanBody": "1 ⋅ 10⁻⁵",
      "crust": "0.0084",
      "meteorites": "1.3"
    },
    "ghs": [
      "flammable",
      "healthHazard",
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 58,
          "abundance": "68.077"
        },
        {
          "mass": 60,
          "abundance": "26.223"
        },
        {
          "mass": 62,
          "abundance": "3.634"
        },
        {
          "mass": 61,
          "abundance": "1.1399"
        },
        {
          "mass": 64,
          "abundance": "0.9256"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=c4PkwpQFRwQ",
    "productionCountries": [
      { "country": "id", "share": "61.1" },
      { "country": "ph", "share": "9.2" },
      { "country": "ru", "share": "5.8" },
      { "country": "ca", "share": "5.3" },
      { "country": "cn", "share": "3.3" },
      { "country": "nc", "share": "3.1" },
      { "country": "au", "share": "3.1" },
      { "country": "br", "share": "2.1" },
      { "country": "us", "share": "0.2" }
    ],
    "productionNote": { "ru": "Индонезия доминирует в мировой добыче никеля, за ней следуют Филиппины, Россия, Новая Каледония и Австралия.", "en": "Indonesia dominates world nickel mine output, followed by the Philippines, Russia, New Caledonia and Australia.", "zh": "印度尼西亚主导世界镍矿产量，其次是菲律宾、俄罗斯、新喀里多尼亚和澳大利亚。" }
  },
  "Cu": {
    "overview": {
      "latinName": "Cuprum",
      "englishName": "Copper",
      "discoveryYear": "9000 BC",
      "casNumber": "CAS7440-50-8",
      "discoveryCountry": "Anatolia",
      "sampleColors": [{ "hex": "#B87333" }],
      "electronShellConfig": "K2-L8-M18-N1-O0-P0-Q0-R0",
      "electronCount": "29",
      "protonCount": "29",
      "neutronCount": "35",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d10 4s1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s1"
    },
    "description": { "ru": "Мягкий красноватый переходный металл; отличный проводник тепла и тока, один из древнейших металлов.", "en": "A soft, reddish transition metal; excellent conductor of heat and electricity, one of humanity's first metals.", "zh": "柔软红棕色过渡金属；热和电的优良导体，人类最早使用的金属之一。" },
    "applications": { "ru": "Электропроводка, трубы, бронза и латунь, антимикробные покрытия", "en": "Electrical wiring, plumbing, bronze and brass, antimicrobial surfaces", "zh": "电线电缆、管道、青铜黄铜、抗菌表面" },
    "properties": {
      "atomicMass": "63.5460394301709",
      "density": "8.96",
      "meltingPoint": "1084.62",
      "boilingPoint": "2562.0",
      "valence": "1, 2",
      "group": "4/I-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "13.26",
      "specificHeat": "384.3",
      "thermalExpansion": "16.5 ⋅ 10⁻⁶",
      "vaporizationHeat": "300.4"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,1,2,3,4,-,-,-,-,-",
      "ionCharge": "2+, 1+",
      "ionizationPotential": "7.726",
      "atomicRadius": "145",
      "covalentRadius": "132",
      "vanDerWaalsRadius": "140"
    },
    "electromagnetic": {
      "electricalConductivity": "59594755.6615018",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-9.63 ⋅ 10⁻⁶",
      "massMagneticSusceptibility": "-1.08 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-6.86 ⋅ 10⁻¹¹",
      "electricalResistivity": "1.678 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "3.615 Å",
      "debyeTemperature": "345",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23978",
      "rtecsNumber": "RTECSGL5325000",
      "brinellHardness": "874.0",
      "mohsHardness": "3.0",
      "vickersHardness": "369.0",
      "bulkModulus": "140.0",
      "youngModulus": "130.0",
      "liquidDensity": "08.02",
      "molarVolume": "0.0000070922",
      "poissonRatio": "0.34",
      "shearModulus": "48.0",
      "soundSpeed": "3810.0",
      "thermalConductivity": "401.0"
    },
    "reactivity": {
      "electronegativity": "1.9",
      "electronAffinity": "119.235"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "3.78",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "6 ⋅ 10⁻⁶",
      "sun": "7 ⋅ 10⁻⁵",
      "ocean": "3 ⋅ 10⁻⁷",
      "humanBody": "0.00010273106437",
      "crust": "0.006",
      "meteorites": "0.011"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 63,
          "abundance": "69.15"
        },
        {
          "mass": 65,
          "abundance": "30.85"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=nqzK-trc4Jg",
    "productionCountries": [
      { "country": "cl", "share": "23.0" },
      { "country": "cd", "share": "14.3" },
      { "country": "pe", "share": "11.3" },
      { "country": "cn", "share": "7.8" },
      { "country": "us", "share": "4.8" },
      { "country": "id", "share": "4.8" },
      { "country": "ru", "share": "4.0" },
      { "country": "au", "share": "3.5" },
      { "country": "kz", "share": "3.2" },
      { "country": "zm", "share": "3.0" },
      { "country": "mx", "share": "3.0" },
      { "country": "ca", "share": "2.0" },
      { "country": "mn", "share": "1.8" },
      { "country": "pl", "share": "1.8" },
      { "country": "pa", "share": "1.5" },
      { "country": "br", "share": "1.3" },
      { "country": "rs", "share": "0.9" },
      { "country": "tz", "share": "0.5" },
      { "country": "tr", "share": "0.5" }
    ],
    "productionNote": { "ru": "Чили одна обеспечивает около четверти мировой добычи меди; далее следуют Перу, ДР Конго, Китай и США.", "en": "Chile alone accounts for roughly a quarter of world copper mine output; Peru, the DR Congo, China and the US follow.", "zh": "智利一国就占世界铜矿产量的约四分之一；秘鲁、刚果民主共和国、中国和美国紧随其后。" }
  },
  "Zn": {
    "overview": {
      "latinName": "Zincum",
      "englishName": "Zinc",
      "discoveryYear": "1000 BC",
      "casNumber": "CAS7440-66-6",
      "discoverer": { "ru": "Андреас Сигизмунд Маргграф", "en": "Andreas Sigismund Marggraf", "zh": "Andreas Sigismund Marggraf" },
      "discoveryCountry": "IndiaContinent",
      "sampleColors": [{ "hex": "#8FA4B4" }],
      "electronShellConfig": "K2-L8-M18-N2-O0-P0-Q0-R0",
      "electronCount": "30",
      "protonCount": "30",
      "neutronCount": "35",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d10 4s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2"
    },
    "description": { "ru": "Сине-белый переходный металл; хрупок при комнатной температуре, основа оцинковки железа.", "en": "A bluish-white transition metal; brittle at room temperature and essential for galvanizing iron.", "zh": "蓝白色过渡金属；室温下较脆，镀锌保护铁的基础。" },
    "applications": { "ru": "Оцинковка, латунь, батарейки, пищевые добавки", "en": "Galvanizing, brass, batteries, dietary supplements", "zh": "镀锌、黄铜、电池、营养补充剂" },
    "properties": {
      "atomicMass": "65.3777823033184",
      "density": "7.134",
      "meltingPoint": "419.53",
      "boilingPoint": "907.0",
      "valence": "2",
      "group": "4/II-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "7.32",
      "specificHeat": "388",
      "thermalExpansion": "30.4 ⋅ 10⁻⁶",
      "vaporizationHeat": "115.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,1,2,-,-,-,-,-,-,-",
      "ionCharge": "2+",
      "ionizationPotential": "9.394",
      "atomicRadius": "142",
      "covalentRadius": "120",
      "vanDerWaalsRadius": "139"
    },
    "electromagnetic": {
      "electricalConductivity": "16949152.5423729",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.58 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-2.21 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-1.45 ⋅ 10⁻¹⁰",
      "electricalResistivity": "5.9 ⋅ 10⁻⁸",
      "superconductingTemperature": "0.85"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=2.6648 Å; c=4.9468 Å",
      "axialRatio": "1.856",
      "debyeTemperature": "300",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23994",
      "rtecsNumber": "RTECSZG8600000",
      "brinellHardness": "412.0",
      "mohsHardness": "2.5",
      "bulkModulus": "70.0",
      "youngModulus": "108.0",
      "liquidDensity": "6.57",
      "molarVolume": "0.000009157",
      "poissonRatio": "0.25",
      "shearModulus": "43.0",
      "soundSpeed": "3850.0",
      "refractiveIndex": "1.00205",
      "thermalConductivity": "116.0"
    },
    "reactivity": {
      "electronegativity": "1.65",
      "electronAffinity": "0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "1.1",
      "nfpaCube": "3,1,2,W"
    },
    "prevalence": {
      "universe": "3 ⋅ 10⁻⁵",
      "sun": "0.0002",
      "ocean": "5 ⋅ 10⁻⁷",
      "humanBody": "0.00328168677861",
      "crust": "0.007",
      "meteorites": "0.018"
    },
    "ghs": [
      "flammable",
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 64,
          "abundance": "49.17"
        },
        {
          "mass": 68,
          "abundance": "18.45"
        },
        {
          "mass": 66,
          "abundance": "27.73"
        },
        {
          "mass": 67,
          "abundance": "4.04"
        },
        {
          "mass": 70,
          "abundance": "0.61"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=McEmVMSY44Y",
    "productionCountries": [
      { "country": "cn", "share": "32.0" },
      { "country": "pe", "share": "10.4" },
      { "country": "au", "share": "8.8" },
      { "country": "in", "share": "6.9" },
      { "country": "us", "share": "6.0" },
      { "country": "mx", "share": "5.6" },
      { "country": "bo", "share": "4.1" },
      { "country": "kz", "share": "3.0" },
      { "country": "ru", "share": "2.5" },
      { "country": "se", "share": "1.9" },
      { "country": "za", "share": "1.0" }
    ],
    "productionNote": { "ru": "Китай, Австралия, Перу, Индия и Мексика — крупнейшие страны-добытчики цинковой руды.", "en": "China, Australia, Peru, India and Mexico are the top zinc mining countries.", "zh": "中国、澳大利亚、秘鲁、印度和墨西哥是主要的锌矿开采国。" }
  },
  "Ga": {
    "overview": {
      "latinName": "Gallium",
      "englishName": "Gallium",
      "discoveryYear": "1875",
      "casNumber": "CAS7440-55-3",
      "discoverer": { "ru": "Поль Эмиль Лекок де Буабодран", "en": "Paul Emile Lecoq de Boisbaudran", "zh": "Paul Emile Lecoq de Boisbaudran" },
      "discoveryCountry": "FR",
      "sampleColors": [{ "hex": "#8FA4B4" }],
      "electronShellConfig": "K2-L8-M18-N3-O0-P0-Q0-R0",
      "electronCount": "31",
      "protonCount": "31",
      "neutronCount": "39",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d10 4s2 4p1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p1"
    },
    "description": { "ru": "Мягкий серебристый металл; плавится чуть выше комнатной температуры и расширяется при застывании.", "en": "A soft, silvery post-transition metal; melts just above room temperature and expands on freezing.", "zh": "柔软银白色金属；熔点略高于室温，凝固时体积膨胀。" },
    "applications": { "ru": "Полупроводники, светодиоды, термометры, солнечные элементы", "en": "Semiconductors, LEDs, thermometers, solar cells", "zh": "半导体、LED、温度计、太阳能电池" },
    "properties": {
      "atomicMass": "69.7230661032944",
      "density": "5.91",
      "meltingPoint": "29.7646",
      "boilingPoint": "2400.0",
      "valence": "2, 3",
      "group": "4/III+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "5.59",
      "specificHeat": "371",
      "thermalExpansion": "18 ⋅ 10⁻⁶",
      "vaporizationHeat": "256.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,1,2,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "5.999",
      "atomicRadius": "136",
      "covalentRadius": "123",
      "vanDerWaalsRadius": "187"
    },
    "electromagnetic": {
      "electricalConductivity": "7352941.17647059",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.77 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-3 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-2.09 ⋅ 10⁻¹⁰",
      "electricalResistivity": "1.36 ⋅ 10⁻⁷",
      "superconductingTemperature": "1.083"
    },
    "grid": {
      "structureCode": "9",
      "gridParams": "a=4.519 Å; b=7.658 Å; c=4.526 Å",
      "debyeTemperature": "325",
      "spaceGroup": "Cmca",
      "spaceGroupNumber": "64"
    },
    "additional": {
      "pubchemCid": "CID5360835",
      "rtecsNumber": "RTECSLW8600000",
      "brinellHardness": "60.0",
      "mohsHardness": "1.5",
      "bulkModulus": "56.0",
      "liquidDensity": "6.095",
      "molarVolume": "0.000011809",
      "soundSpeed": "2740.0",
      "thermalConductivity": "40.6"
    },
    "reactivity": {
      "electronegativity": "1.81",
      "electronAffinity": "29.061"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "2.75",
      "nfpaCube": "0,1,0,-"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁶",
      "sun": "4 ⋅ 10⁻⁶",
      "ocean": "3 ⋅ 10⁻⁹",
      "crust": "0.0019",
      "meteorites": "7.6 ⋅ 10⁻⁴"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 69,
          "abundance": "60.108"
        },
        {
          "mass": 71,
          "abundance": "39.892"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=LkI1lihNeH0",
    "productionCountries": [
      { "country": "cn", "share": "99" },
      { "country": "jp" },
      { "country": "kr" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "Китай обеспечивает практически всё (около 98-99%) мировое первичное производство галлия — побочный продукт переработки алюминиевых и цинковых руд.", "en": "China accounts for essentially all (roughly 98-99%) of world primary gallium production, recovered as a byproduct of aluminium/zinc ore processing.", "zh": "中国几乎占世界原生镓产量的全部（约98%-99%），镓是铝土矿/锌矿加工的副产品。" }
  },
  "Ge": {
    "overview": {
      "latinName": "Germanium",
      "englishName": "Germanium",
      "discoveryYear": "1886",
      "casNumber": "CAS7440-56-4",
      "discoverer": { "ru": "Клеменс Александр Винклер", "en": "Clemens Alexander Winkler", "zh": "Clemens Alexander Winkler" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#9A9A96" }],
      "electronShellConfig": "K2-L8-M18-N4-O0-P0-Q0-R0",
      "electronCount": "32",
      "protonCount": "32",
      "neutronCount": "41",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d10 4s2 4p2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p2"
    },
    "description": { "ru": "Хрупкий металлоид; серо-белый, важный полупроводник и оптический материал.", "en": "A brittle metalloid; gray-white, important semiconductor and optical material.", "zh": "脆性类金属；灰白色，重要的半导体和光学材料。" },
    "applications": { "ru": "Оптоволокно, инфракрасная оптика, транзисторы", "en": "Fiber optics, infrared optics, transistors", "zh": "光纤、红外光学、晶体管" },
    "properties": {
      "atomicMass": "72.6298488671316",
      "density": "5.323",
      "meltingPoint": "938.25",
      "boilingPoint": "2833.0",
      "valence": "2, 4",
      "group": "4/IV+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "36.94",
      "specificHeat": "321.4",
      "thermalExpansion": "6 ⋅ 10⁻⁶",
      "vaporizationHeat": "334.0"
    },
    "atomic": {
      "oxidationState": "-,4,-,-,-,-,-,2,-,4,-,-,-,-,-",
      "ionCharge": "4+",
      "ionizationPotential": "7.899",
      "atomicRadius": "125",
      "covalentRadius": "120",
      "vanDerWaalsRadius": "211"
    },
    "electromagnetic": {
      "electricalConductivity": "1886.79245283019",
      "electricalType": "3",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-7.98 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-1.5 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-1.09 ⋅ 10⁻¹⁰",
      "electricalResistivity": "0.00053"
    },
    "grid": {
      "structureCode": "8",
      "gridParams": "5.660 Å",
      "debyeTemperature": "370",
      "spaceGroup": "Fd_ 3m",
      "spaceGroupNumber": "227"
    },
    "additional": {
      "pubchemCid": "CID6326954",
      "rtecsNumber": "RTECSLY5200000",
      "brinellHardness": "7273.4",
      "mohsHardness": "6.0",
      "vickersHardness": "8012.03",
      "bulkModulus": "75.8",
      "liquidDensity": "5.6",
      "molarVolume": "0.000013645",
      "soundSpeed": "5400.0",
      "thermalConductivity": "60.2"
    },
    "reactivity": {
      "electronegativity": "2.01",
      "electronAffinity": "118.9352"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "2.2",
      "nfpaCube": "0,1,0,-"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁵",
      "sun": "2 ⋅ 10⁻⁵",
      "ocean": "6 ⋅ 10⁻⁹",
      "crust": "1.5 ⋅ 10⁻⁴",
      "meteorites": "0.0021"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 74,
          "abundance": "36.52"
        },
        {
          "mass": 72,
          "abundance": "27.45"
        },
        {
          "mass": 70,
          "abundance": "20.52"
        },
        {
          "mass": 73,
          "abundance": "7.76"
        },
        {
          "mass": 76,
          "abundance": "7.75"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=jI1eTv5zdzg",
    "productionCountries": [
      { "country": "cn", "share": "63" },
      { "country": "be" },
      { "country": "ca" },
      { "country": "ru" },
      { "country": "us" },
      { "country": "jp" },
      { "country": "de" }
    ],
    "productionNote": { "ru": "Китай — доминирующий переработчик германия (около 75-80% мирового производства), извлекаемого как побочный продукт переработки цинковых руд и угля.", "en": "China is the dominant refiner of germanium (roughly 75-80% of world output), recovered as a byproduct of zinc ore processing and coal.", "zh": "中国是锗的主要精炼国（约占世界产量的75%-80%），锗是锌矿加工和煤炭的副产品。" }
  },
  "As": {
    "overview": {
      "latinName": "Arsenicum",
      "englishName": "Arsenic",
      "discoveryYear": "~1250",
      "casNumber": "CAS7440-38-2",
      "discoverer": { "ru": "Альберт Великий", "en": "Albertus Magnus", "zh": "Albertus Magnus" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#9A9A96" }],
      "electronShellConfig": "K2-L8-M18-N5-O0-P0-Q0-R0",
      "electronCount": "33",
      "protonCount": "33",
      "neutronCount": "42",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d10 4s2 4p3 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p3"
    },
    "description": { "ru": "Металлоид; серый, многие соединения токсичны, исторически называли «царской отравой».", "en": "A metalloid; gray, toxic in many compounds, historically known as the 'king of poisons'.", "zh": "类金属；灰色，许多化合物有毒，历史上被称为“砒霜之王”。" },
    "applications": { "ru": "Полупроводники, защита древесины (исторически), пестициды (ограниченно)", "en": "Semiconductors, wood preservation (historical), pesticides (limited)", "zh": "半导体、木材防腐（历史用途）、农药（有限）" },
    "properties": {
      "atomicMass": "74.921594565322",
      "density": "5.727",
      "meltingPoint": "817.0",
      "boilingPoint": "614.0",
      "valence": "2, 3, 5",
      "group": "4/V+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "24.44",
      "specificHeat": "328.9",
      "thermalExpansion": "5.6 ⋅ 10⁻⁶",
      "vaporizationHeat": "32.4"
    },
    "atomic": {
      "oxidationState": "-,-,3,-,-,0,1,2,3,4,5,-,-,-,-",
      "ionCharge": "3-",
      "ionizationPotential": "9.815",
      "atomicRadius": "114",
      "covalentRadius": "120",
      "vanDerWaalsRadius": "185"
    },
    "electromagnetic": {
      "electricalConductivity": "3003003.003003",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "-2.23 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-3.9 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-2.92 ⋅ 10⁻¹⁰",
      "electricalResistivity": "3.33 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "5",
      "gridParams": "a=4.1315 Å; α=54.17°",
      "debyeTemperature": "282",
      "spaceGroup": "R_ 3m",
      "spaceGroupNumber": "166"
    },
    "additional": {
      "pubchemCid": "CID5359596",
      "rtecsNumber": "RTECSCG0525000",
      "brinellHardness": "1440.0",
      "mohsHardness": "3.5",
      "vickersHardness": "1510.0",
      "bulkModulus": "22.0",
      "youngModulus": "8.0",
      "liquidDensity": "5.22",
      "molarVolume": "0.000013082",
      "refractiveIndex": "1.001552",
      "thermalConductivity": "50.2"
    },
    "reactivity": {
      "electronegativity": "2.18",
      "electronAffinity": "77.65"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "4.5",
      "nfpaCube": "2,3,0,-"
    },
    "prevalence": {
      "universe": "8 ⋅ 10⁻⁷",
      "ocean": "2.3 ⋅ 10⁻⁷",
      "humanBody": "9.98774237 ⋅ 10⁻⁶",
      "crust": "1.8 ⋅ 10⁻⁴",
      "meteorites": "1.8 ⋅ 10⁻⁴"
    },
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 75,
          "abundance": "100"
        }
      ]
    },
    "productionCountries": [
      { "country": "pe" },
      { "country": "cn" },
      { "country": "ma" }
    ],
    "productionNote": { "ru": "Китай доминирует в мировом производстве мышьяка (в виде оксида мышьяка), Марокко и Россия — гораздо меньшие источники.", "en": "China dominates world arsenic (arsenic trioxide) production, with Morocco and Russia as much smaller secondary sources.", "zh": "中国主导世界砷（三氧化二砷）产量，摩洛哥和俄罗斯是规模小得多的次要来源。" }
  },
  "Se": {
    "overview": {
      "latinName": "Selenium",
      "englishName": "Selenium",
      "discoveryYear": "1817",
      "casNumber": "CAS7782-49-2",
      "discoverer": { "ru": "Йёнс Якоб Берцелиус", "en": "Jöns Jakob Berzelius", "zh": "Jöns Jakob Berzelius" },
      "discoveryCountry": "SE",
      "sampleColors": [
        { "hex": "#808080", "label": { "ru": "Серый селен", "en": "Gray selenium", "zh": "灰硒" } },
        { "hex": "#A32E2E", "finish": "matte", "label": { "ru": "Красный селен", "en": "Red selenium", "zh": "红硒" } }
      ],
      "electronShellConfig": "K2-L8-M18-N6-O0-P0-Q0-R0",
      "electronCount": "34",
      "protonCount": "34",
      "neutronCount": "45",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d10 4s2 4p4 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p4"
    },
    "description": { "ru": "Неметалл, необходимый для жизни; серый, фотопроводим, важен для антиоксидантных ферментов.", "en": "A nonmetal essential to life; gray, photoconductive, and vital in antioxidant enzymes.", "zh": "生命必需的非金属；灰色，具有光导性，抗氧化酶的关键元素。" },
    "applications": { "ru": "Стекло, копиры, пищевые добавки, солнечные элементы", "en": "Glass, photocopiers, supplements, solar cells", "zh": "玻璃、复印机、营养补充剂、太阳能电池" },
    "properties": {
      "atomicMass": "78.9710814817005",
      "density": "4.81",
      "meltingPoint": "221.0",
      "boilingPoint": "685.0",
      "valence": "2, 4, 6",
      "group": "4/VI+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "6.69",
      "specificHeat": "321.2",
      "thermalExpansion": "37 ⋅ 10⁻⁶",
      "vaporizationHeat": "95.48"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,1,-,1,2,-,4,-,6,-,-,-",
      "ionCharge": "2-",
      "ionizationPotential": "9.752",
      "atomicRadius": "103",
      "covalentRadius": "118",
      "vanDerWaalsRadius": "190"
    },
    "electromagnetic": {
      "electricalConductivity": "83333333.3333333",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.93 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-4 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-3.16 ⋅ 10⁻¹⁰",
      "electricalResistivity": "1.2 ⋅ 10¹⁰"
    },
    "grid": {
      "structureCode": "1",
      "gridParams": "a=4.364 Å; c=4.959 Å",
      "axialRatio": "1.136",
      "debyeTemperature": "90",
      "spaceGroup": "P3₁21",
      "spaceGroupNumber": "152"
    },
    "additional": {
      "pubchemCid": "CID6326970",
      "rtecsNumber": "RTECSVS7700000",
      "brinellHardness": "736.0",
      "mohsHardness": "2.0",
      "bulkModulus": "8.3",
      "youngModulus": "10.0",
      "liquidDensity": "3.99",
      "molarVolume": "0.000016387",
      "poissonRatio": "0.33",
      "shearModulus": "3.7",
      "soundSpeed": "3350.0",
      "refractiveIndex": "1.000895",
      "thermalConductivity": "0.519"
    },
    "reactivity": {
      "electronegativity": "2.55",
      "electronAffinity": "194.9587"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "11.7",
      "nfpaCube": "0,2,0,-"
    },
    "prevalence": {
      "universe": "3 ⋅ 10⁻⁶",
      "ocean": "4.5 ⋅ 10⁻⁸",
      "humanBody": "5 ⋅ 10⁻⁶",
      "crust": "5.0⋅ 10⁻⁶",
      "meteorites": "0.0013"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 80,
          "abundance": "49.80"
        },
        {
          "mass": 78,
          "abundance": "23.69"
        },
        {
          "mass": 77,
          "abundance": "7.60"
        },
        {
          "mass": 82,
          "abundance": "8.82"
        },
        {
          "mass": 76,
          "abundance": "9.23"
        },
        {
          "mass": 74,
          "abundance": "0.86"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=RBimQgOpjZQ",
    "productionCountries": [
      { "country": "jp" },
      { "country": "de" },
      { "country": "be" },
      { "country": "ru" },
      { "country": "ph" }
    ],
    "productionNote": { "ru": "Извлекается как побочный продукт переработки медных руд; Япония, Германия, Бельгия, Россия и Филиппины — ведущие переработчики.", "en": "Recovered as a byproduct of copper refining; Japan, Germany, Belgium, Russia and the Philippines are the leading refiners.", "zh": "硒作为铜精炼的副产品回收；日本、德国、比利时、俄罗斯和菲律宾是主要的精炼国。" }
  },
  "Br": {
    "overview": {
      "latinName": "Bromum",
      "englishName": "Bromine",
      "discoveryYear": "1826",
      "casNumber": "CAS7726-95-6",
      "discoverer": { "ru": "Антуан Жером Балар, Карл Якоб Лёвих", "en": "Antoine-Jérôme Balard, Karl Jakob Leuwich", "zh": "Antoine-Jérôme Balard, Karl Jakob Leuwich" },
      "discoveryCountry": "FR, DE",
      "sampleColors": [{ "hex": "#A62929", "finish": "glossy" }],
      "electronShellConfig": "K2-L8-M18-N7-O0-P0-Q0-R0",
      "electronCount": "35",
      "protonCount": "35",
      "neutronCount": "45",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d10 4s2 4p5 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p5"
    },
    "description": { "ru": "Красно-бурая жидкость-галоген; летуч, едок, один из двух элементов-жидкостей при комнатной температуре.", "en": "A red-brown liquid halogen; volatile, corrosive, and one of only two elements liquid at room temperature.", "zh": "红棕色液态卤素；挥发性强、腐蚀性强，是室温下两种液态元素之一。" },
    "applications": { "ru": "Пламегасители, фармацевтика, фотография", "en": "Flame retardants, pharmaceuticals, photography", "zh": "阻燃剂、医药、摄影" },
    "properties": {
      "atomicMass": "79.9043261630963",
      "density": "3.102",
      "meltingPoint": "-7.3",
      "boilingPoint": "58.8",
      "valence": "1, 3, 4, 5",
      "group": "4/VII+",
      "block": "p",
      "aggregationState": "liquid"
    },
    "thermo": {
      "fusionHeat": "10.57",
      "specificHeat": "473.6",
      "vaporizationHeat": "29.96"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,-,1,-,3,-,5,-,7,-,-",
      "ionCharge": "1-",
      "ionizationPotential": "11.814",
      "atomicRadius": "94",
      "covalentRadius": "117",
      "vanDerWaalsRadius": "183"
    },
    "electromagnetic": {
      "electricalConductivity": "1.28205128205128e-11",
      "electricalType": "2",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.53 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-4.9 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-7.83 ⋅ 10⁻¹⁰",
      "electricalResistivity": "78000000000.0"
    },
    "grid": {
      "structureCode": "9",
      "gridParams": "a=6.67 Å; b=4.48 Å; c=8.72 Å",
      "spaceGroup": "Cmca",
      "spaceGroupNumber": "64"
    },
    "additional": {
      "pubchemCid": "CID24408",
      "rtecsNumber": "RTECSEF9100000",
      "bulkModulus": "1.9",
      "liquidDensity": "3.12",
      "molarVolume": "0.00002561",
      "refractiveIndex": "1.001132",
      "thermalConductivity": "0.122"
    },
    "reactivity": {
      "electronegativity": "2.96",
      "electronAffinity": "324.5369"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "6.9",
      "nfpaCube": "0,3,0,OX"
    },
    "prevalence": {
      "universe": "7 ⋅ 10⁻⁷",
      "ocean": "0.0066",
      "humanBody": "0.00037097328802",
      "crust": "2.4 ⋅ 10⁻⁴",
      "meteorites": "1.2 ⋅ 10⁻⁴"
    },
    "ghs": [
      "oxidizer",
      "corrosive",
      "acuteToxicity"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 79,
          "abundance": "50.69"
        },
        {
          "mass": 81,
          "abundance": "49.31"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=bHKNPTiMf1Y",
    "productionCountries": [
      { "country": "il", "share": "43.2" },
      { "country": "jo", "share": "25.5" },
      { "country": "cn", "share": "22.7" },
      { "country": "us" }
    ],
    "productionNote": { "ru": "Израиль и Иордания (рассолы Мёртвого моря) вместе обеспечивают большую часть мировой добычи брома; Китай и США (Арканзас) — другие крупные производители.", "en": "Israel and Jordan (Dead Sea brines) together supply the majority of world bromine, with China and the United States (Arkansas) as other major producers.", "zh": "以色列和约旦（死海卤水）合计供应了世界大部分的溴，中国和美国（阿肯色州）是其他主要生产国。" }
  },
  "Kr": {
    "overview": {
      "latinName": "Krypton",
      "englishName": "Krypton",
      "discoveryYear": "1898",
      "casNumber": "CAS7439-90-9",
      "discoverer": { "ru": "Уильям Рамзай, Траверс, Морис Уильям", "en": "Sir William Ramsay, Morris William Travers", "zh": "Sir William Ramsay, Morris William Travers" },
      "discoveryCountry": "GB",
      "sampleColors": [
        { "hex": "#E8E8E8", "finish": "subtle", "label": { "ru": "Газ", "en": "Gas", "zh": "气体" } },
        { "hex": "#C8D4C0", "finish": "subtle", "label": { "ru": "Газоразряд", "en": "Gas discharge", "zh": "气体放电" } }
      ],
      "electronShellConfig": "K2-L8-M18-N8-O0-P0-Q0-R0",
      "electronCount": "36",
      "protonCount": "36",
      "neutronCount": "48",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Ar] 3d10 4s2 4p6 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6"
    },
    "description": { "ru": "Бесцветный благородный газ; инертен, присутствует в атмосфере в малых количествах.", "en": "A colorless noble gas; inert and present in tiny amounts in the atmosphere.", "zh": "无色稀有气体；惰性，在大气中含量极少。" },
    "applications": { "ru": "Лампы, лазеры, энергосберегающие окна", "en": "Lighting, lasers, energy-efficient windows", "zh": "照明、激光、节能窗" },
    "properties": {
      "atomicMass": "83.7979997384043",
      "density": "0.003749",
      "meltingPoint": "-157.37",
      "boilingPoint": "-153.415",
      "valence": "0",
      "group": "4/VIII+",
      "block": "p",
      "aggregationState": "gas"
    },
    "thermo": {
      "fusionHeat": "1.64",
      "specificHeat": "248.05",
      "vaporizationHeat": "9.08"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,-,2,-,-,-,-,-,-,-",
      "ionizationPotential": "14.000",
      "atomicRadius": "88",
      "covalentRadius": "116",
      "vanDerWaalsRadius": "202"
    },
    "electromagnetic": {
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.65 ⋅ 10⁻⁸",
      "massMagneticSusceptibility": "-4.4 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-3.69 ⋅ 10⁻¹⁰"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "5.638 Å",
      "debyeTemperature": "72",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID5416",
      "rtecsNumber": "RTECSOC6772500",
      "molarVolume": "0.02235",
      "soundSpeed": "221.0",
      "refractiveIndex": "1.000427",
      "thermalConductivity": "0.00943"
    },
    "reactivity": {
      "electronegativity": "3",
      "electronAffinity": "0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "25.0",
      "nfpaCube": "0,0,0,SA"
    },
    "prevalence": {
      "universe": "4 ⋅ 10⁻⁶",
      "ocean": "2.1 ⋅ 10⁻⁸",
      "crust": "1.0 ⋅ 10⁻⁸"
    },
    "ghs": [
      "compressedGas"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 84,
          "abundance": "56.987"
        },
        {
          "mass": 86,
          "abundance": "17.279"
        },
        {
          "mass": 82,
          "abundance": "11.593"
        },
        {
          "mass": 83,
          "abundance": "11.500"
        },
        {
          "mass": 80,
          "abundance": "2.286"
        },
        {
          "mass": 78,
          "abundance": "0.355"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=0QwmgHKaiUQ",
    "productionCountries": [
      { "country": "cn" },
      { "country": "ru" },
      { "country": "us" },
      { "country": "ua" }
    ],
    "productionNote": { "ru": "Как и неон, криптон — побочный продукт крупных установок разделения воздуха; Украина исторически была крупным поставщиком, но с 2022 года её производство сильно нарушено войной.", "en": "Like neon, krypton is a byproduct of large air-separation plants; Ukraine was historically a major supplier, but its output has been severely disrupted by the war since 2022.", "zh": "与氖气一样，氪气是大型空气分离装置的副产品；乌克兰历史上是主要供应国，但自2022年以来其产量因战争受到严重影响。" }
  },
  "Rb": {
    "overview": {
      "latinName": "Rubidium",
      "englishName": "Rubidium",
      "discoveryYear": "1861",
      "casNumber": "CAS7440-17-7",
      "discoverer": { "ru": "Роберт Вильгельм Бунзен, Густав Кирхгоф", "en": "Robert Wilhelm Bunsen, Gustav Robert Kirchhoff", "zh": "Robert Wilhelm Bunsen, Gustav Robert Kirchhoff" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N8-O1-P0-Q0-R0",
      "electronCount": "37",
      "protonCount": "37",
      "neutronCount": "48",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 5s1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 5s1"
    },
    "description": { "ru": "Мягкий серебристый щелочной металл; самовоспламеняется на воздухе, используется в атомных часах.", "en": "A soft, silvery alkali metal; pyrophoric in air and used in ultra-precise atomic clocks.", "zh": "柔软银白色碱金属；在空气中自燃，用于高精度原子钟。" },
    "applications": { "ru": "Атомные часы, исследования, специальная оптика", "en": "Atomic clocks, research, specialty optics", "zh": "原子钟、科研、特种光学" },
    "properties": {
      "atomicMass": "85.4676635933375",
      "density": "1.532",
      "meltingPoint": "39.3",
      "boilingPoint": "688.0",
      "valence": "1",
      "group": "5/I+",
      "block": "s",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "2.19",
      "specificHeat": "364",
      "vaporizationHeat": "75.77"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,-,1,-,-,-,-,-,-,-,-",
      "ionCharge": "1+",
      "ionizationPotential": "4.177",
      "atomicRadius": "265",
      "covalentRadius": "215",
      "vanDerWaalsRadius": "303"
    },
    "electromagnetic": {
      "electricalConductivity": "7812500.0",
      "electricalType": "1",
      "volumeMagneticSusceptibility": "0.00000398",
      "massMagneticSusceptibility": "2.6 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "2.22 ⋅ 10⁻¹⁰",
      "electricalResistivity": "1.28 ⋅ 10⁻⁷",
      "magneticType": "paramagnetic"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "5.710 Å",
      "debyeTemperature": "56.5",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID5357696",
      "rtecsNumber": "RTECSVL8500000",
      "brinellHardness": "0.22",
      "mohsHardness": "0.3",
      "bulkModulus": "2.5",
      "youngModulus": "2.4",
      "liquidDensity": "1.46",
      "molarVolume": "0.000055788",
      "soundSpeed": "1300.0",
      "thermalConductivity": "58.2"
    },
    "reactivity": {
      "electronegativity": "0.82",
      "electronAffinity": "46.884"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.38",
      "nfpaCube": "3,2,2,W"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁶",
      "sun": "3 ⋅ 10⁻⁶",
      "ocean": "1.2 ⋅ 10⁻⁵",
      "humanBody": "0.00046",
      "crust": "0.009",
      "meteorites": "3.2 ⋅ 10⁻⁴"
    },
    "ghs": [
      "flammable",
      "corrosive",
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 85,
          "abundance": "72.17"
        },
        {
          "mass": 87,
          "abundance": "27.83"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=V1-LcbGSsmw",
    "productionCountries": [
      { "country": "cn", "share": "99" }
    ],
    "productionNote": { "ru": "Отдельных месторождений рубидия нет — он извлекается в небольших количествах как побочный продукт переработки литиевой (лепидолит) и цезиевой (поллуцит) руды, в основном в Китае.", "en": "Rubidium has no dedicated mines — it's recovered only in small amounts as a byproduct of lithium (lepidolite) and cesium (pollucite) ore processing, mostly in China.", "zh": "铷没有专门的矿山——它仅作为锂矿（锂云母）和铯矿（铯榴石）加工的副产品少量回收，主要在中国。" }
  },
  "Sr": {
    "overview": {
      "latinName": "Strontium",
      "englishName": "Strontium",
      "discoveryYear": "1790",
      "casNumber": "CAS7440-24-6",
      "discoverer": { "ru": "Адер Крофорд", "en": "Adair Crawford", "zh": "Adair Crawford" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#D0C8A0" }],
      "electronShellConfig": "K2-L8-M18-N8-O2-P0-Q0-R0",
      "electronCount": "38",
      "protonCount": "38",
      "neutronCount": "50",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 5s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 5s2"
    },
    "description": { "ru": "Мягкий щелочноземельный металл; серебристый, активный, даёт малиновый цвет пламени.", "en": "A soft alkaline-earth metal; silvery, reactive, and responsible for crimson flame color.", "zh": "柔软碱土金属；银白色，反应活泼，火焰呈深红色。" },
    "applications": { "ru": "Фейерверки, магниты, радиоизотопы в медицине", "en": "Fireworks, magnets, medical radioisotopes", "zh": "烟花、磁铁、医用放射性同位素" },
    "properties": {
      "atomicMass": "87.6166442781531",
      "density": "2.63",
      "meltingPoint": "777.0",
      "boilingPoint": "1382.0",
      "valence": "2",
      "group": "5/II+",
      "block": "s",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "7.43",
      "specificHeat": "300",
      "thermalExpansion": "22.5 ⋅ 10⁻⁶",
      "vaporizationHeat": "141.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,-,-,-,-,-,-,-",
      "ionCharge": "2+",
      "ionizationPotential": "5.695",
      "atomicRadius": "219",
      "covalentRadius": "190",
      "vanDerWaalsRadius": "249"
    },
    "electromagnetic": {
      "electricalConductivity": "7575757.57575758",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "-3.47 ⋅ 10⁻⁶",
      "massMagneticSusceptibility": "1.32 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "1.16 ⋅ 10⁻¹⁰",
      "electricalResistivity": "1.32 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "4 | 6 | 3",
      "gridParams": "6.080 Å | a=4.31 Å; c=7.05 Å | a=4.85 Å",
      "debyeTemperature": "147",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID5359327",
      "mohsHardness": "1.5",
      "liquidDensity": "2.375",
      "molarVolume": "0.000033316",
      "poissonRatio": "0.28",
      "shearModulus": "6.1",
      "thermalConductivity": "35.4"
    },
    "reactivity": {
      "electronegativity": "0.95",
      "electronAffinity": "5.023"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "1.28",
      "nfpaCube": "1,3,2,W"
    },
    "prevalence": {
      "universe": "4 ⋅ 10⁻⁶",
      "sun": "5 ⋅ 10⁻⁶",
      "ocean": "8.0 ⋅ 10⁻⁴",
      "humanBody": "0.00045658250833",
      "crust": "0.037",
      "meteorites": "8.6 ⋅ 10⁻⁴"
    },
    "ghs": [
      "flammable",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 88,
          "abundance": "82.58"
        },
        {
          "mass": 86,
          "abundance": "9.86"
        },
        {
          "mass": 87,
          "abundance": "7.00"
        },
        {
          "mass": 84,
          "abundance": "0.56"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=vSJw0Ds2CV0",
    "productionCountries": [
      { "country": "ir", "share": "50" },
      { "country": "es", "share": "25" },
      { "country": "cn" },
      { "country": "mx" },
      { "country": "ar" }
    ],
    "productionNote": { "ru": "Как целестиновая руда: Испания, Китай, Мексика и Аргентина — крупнейшие страны-добытчики стронция.", "en": "As celestine ore: Spain, China, Mexico and Argentina are the top strontium mining countries.", "zh": "以天青石矿计：西班牙、中国、墨西哥和阿根廷是主要的锶矿开采国。" }
  },
  "Y": {
    "overview": {
      "latinName": "Yttrium",
      "englishName": "Yttrium",
      "discoveryYear": "1794",
      "casNumber": "CAS7440-65-5",
      "discoverer": { "ru": "Юхан Гадолин", "en": "Johan Gadolin", "zh": "Johan Gadolin" },
      "discoveryCountry": "FI",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N9-O2-P0-Q0-R0",
      "electronCount": "39",
      "protonCount": "39",
      "neutronCount": "50",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d1 5s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d1 5s2"
    },
    "description": { "ru": "Серебристый переходный металл; активный, химически близок к редкоземельным элементам.", "en": "A silvery transition metal; reactive, often grouped with rare earths in chemistry.", "zh": "银白色过渡金属；活泼，化学上与稀土元素相近。" },
    "applications": { "ru": "Люминофоры экранов, лазеры, керамика, сверхпроводники", "en": "Display phosphors, lasers, ceramics, superconductors", "zh": "显示荧光粉、激光、陶瓷、超导体" },
    "properties": {
      "atomicMass": "88.9058381585322",
      "density": "4.472",
      "meltingPoint": "1526.0",
      "boilingPoint": "2930.0",
      "valence": "3",
      "group": "5/III-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "11.42",
      "specificHeat": "298",
      "thermalExpansion": "10.6 ⋅ 10⁻⁶",
      "vaporizationHeat": "390.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "6.217",
      "atomicRadius": "212",
      "covalentRadius": "176",
      "vanDerWaalsRadius": "219"
    },
    "electromagnetic": {
      "electricalConductivity": "1677852.34899329",
      "electricalType": "1",
      "volumeMagneticSusceptibility": "2.978 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "6.66 ⋅ 10⁻⁵",
      "molarMagneticSusceptibility": "5.921 ⋅ 10⁻⁹",
      "electricalResistivity": "5.96 ⋅ 10⁻⁷",
      "superconductingTemperature": "1.3",
      "magneticType": "paramagnetic"
    },
    "grid": {
      "structureCode": "2 | 7",
      "gridParams": "a=3.647 Å; c=5.731 Å | a=4.08 Å",
      "axialRatio": "1.571",
      "debyeTemperature": "248",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23993",
      "rtecsNumber": "RTECSZG2980000",
      "brinellHardness": "588.0",
      "bulkModulus": "41.2",
      "youngModulus": "63.5",
      "liquidDensity": "4.24",
      "molarVolume": "0.000019881",
      "poissonRatio": "0.24",
      "shearModulus": "25.6",
      "soundSpeed": "3300.0",
      "thermalConductivity": "17.2"
    },
    "reactivity": {
      "electronegativity": "1.22",
      "electronAffinity": "29.6"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "1.28",
      "nfpaCube": "2,2,0,-"
    },
    "prevalence": {
      "universe": "7 ⋅ 10⁻⁷",
      "sun": "9.9 ⋅ 10⁻⁷",
      "ocean": "1.3 ⋅ 10⁻⁹",
      "crust": "0.0033",
      "meteorites": "1.9 ⋅ 10⁻⁴"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 89,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=mQ4lyy0QhCM",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Иттрий добывают вместе с другими редкоземельными элементами, преимущественно из ионно-адсорбционных глин в Китае; Мьянма — крупный дополнительный источник руды.", "en": "Yttrium is extracted alongside other rare earths, concentrated in China's ion-adsorption clay deposits, with Myanmar a major supplementary ore source.", "zh": "钇与其他稀土元素一同提取，集中于中国的离子吸附型粘土矿床，缅甸是重要的补充矿石来源。" }
  },
  "Zr": {
    "overview": {
      "latinName": "Zirconium",
      "englishName": "Zirconium",
      "discoveryYear": "1789",
      "casNumber": "CAS7440-67-7",
      "discoverer": { "ru": "Мартин Генрих Клапрот", "en": "Martin Heinrich Klaproth", "zh": "Martin Heinrich Klaproth" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N10-O2-P0-Q0-R0",
      "electronCount": "40",
      "protonCount": "40",
      "neutronCount": "51",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d2 5s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d2 5s2"
    },
    "description": { "ru": "Прочный серый переходный металл; высоко коррозионностойкий, распространён в огнеупорах.", "en": "A strong, gray transition metal; highly resistant to corrosion and common in refractory materials.", "zh": "强韧灰色过渡金属；高度耐腐蚀，常见于耐火材料。" },
    "applications": { "ru": "Ядерные реакторы, керамика, биоимпланты", "en": "Nuclear reactors, ceramics, bio-implants", "zh": "核反应堆、陶瓷、生物植入物" },
    "properties": {
      "atomicMass": "91.2236427905792",
      "density": "6.52",
      "meltingPoint": "1855.0",
      "boilingPoint": "4377.0",
      "valence": "2, 3, 4",
      "group": "5/IV-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "14.0",
      "specificHeat": "278",
      "thermalExpansion": "5.7 ⋅ 10⁻⁶",
      "vaporizationHeat": "573.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,1,2,3,4,-,-,-,-,-",
      "ionCharge": "4+",
      "ionizationPotential": "6.634",
      "atomicRadius": "206",
      "covalentRadius": "164",
      "vanDerWaalsRadius": "186"
    },
    "electromagnetic": {
      "electricalConductivity": "2375296.91211401",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "1.081 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "1.68 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "1.53 ⋅ 10⁻⁹",
      "electricalResistivity": "4.21 ⋅ 10⁻⁷",
      "superconductingTemperature": "0.61"
    },
    "grid": {
      "structureCode": "2 | 7",
      "gridParams": "a=3.231 Å; c=5.148 Å | a=3.61 Å",
      "axialRatio": "1.593",
      "debyeTemperature": "291",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23995",
      "brinellHardness": "650.0",
      "mohsHardness": "5.0",
      "vickersHardness": "904.0",
      "bulkModulus": "91.1",
      "youngModulus": "68.0",
      "liquidDensity": "5.8",
      "molarVolume": "0.000014011",
      "poissonRatio": "0.34",
      "shearModulus": "33.0",
      "soundSpeed": "3800.0",
      "thermalConductivity": "22.6"
    },
    "reactivity": {
      "electronegativity": "1.33",
      "electronAffinity": "41.806"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.185",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "5 ⋅ 10⁻⁶",
      "sun": "4 ⋅ 10⁻⁶",
      "ocean": "2.6 ⋅ 10⁻⁹",
      "humanBody": "5 ⋅ 10⁻⁶",
      "crust": "0.0165",
      "meteorites": "6.6 ⋅ 10⁻⁴"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 90,
          "abundance": "51.45"
        },
        {
          "mass": 94,
          "abundance": "17.38"
        },
        {
          "mass": 92,
          "abundance": "17.15"
        },
        {
          "mass": 91,
          "abundance": "11.22"
        },
        {
          "mass": 96,
          "abundance": "2.80"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=_6rAywpEka0",
    "productionCountries": [
      { "country": "au" },
      { "country": "za" },
      { "country": "cn" },
      { "country": "mz" },
      { "country": "id" }
    ],
    "productionNote": { "ru": "Цирконий встречается вместе с гафнием в циркониевой руде; Австралия и ЮАР лидируют в добыче циркониевых концентратов, за ними следуют Китай, Мозамбик и Индонезия.", "en": "Zirconium occurs together with hafnium in zircon ore; Australia and South Africa lead zircon mineral-concentrate mining, followed by China, Mozambique and Indonesia.", "zh": "锆与铪共生于锆石矿中；澳大利亚和南非在锆精矿开采中领先，其次是中国、莫桑比克和印度尼西亚。" }
  },
  "Nb": {
    "overview": {
      "latinName": "Niobium",
      "englishName": "Niobium",
      "discoveryYear": "1801",
      "casNumber": "CAS7440-03-1",
      "discoverer": { "ru": "Чарльз Хэтчетт", "en": "Charles Hatchett", "zh": "Charles Hatchett" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#8FA4B4" }],
      "electronShellConfig": "K2-L8-M18-N12-O1-P0-Q0-R0",
      "electronCount": "41",
      "protonCount": "41",
      "neutronCount": "52",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d4 5s1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d4 5s1"
    },
    "description": { "ru": "Серый ковкий переходный металл; сверхпроводник при низких температурах, устойчив к кислотам.", "en": "A gray, ductile transition metal; superconducting at low temperatures and resistant to acids.", "zh": "灰色韧性过渡金属；低温下超导，耐酸。" },
    "applications": { "ru": "Суперсплавы, легированная сталь, сверхпроводники", "en": "Superalloys, alloy steel, superconductors", "zh": "高温合金、合金钢、超导体" },
    "properties": {
      "atomicMass": "92.9063732129128",
      "density": "8.57",
      "meltingPoint": "2477.0",
      "boilingPoint": "4744.0",
      "valence": "2, 3, 4, 5",
      "group": "5/V-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "30.0",
      "specificHeat": "265",
      "thermalExpansion": "7.3 ⋅ 10⁻⁶",
      "vaporizationHeat": "689.9"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,4,5,-,-,-,-",
      "ionCharge": "3+, 5+",
      "ionizationPotential": "6.759",
      "atomicRadius": "198",
      "covalentRadius": "156",
      "vanDerWaalsRadius": "207"
    },
    "electromagnetic": {
      "electricalConductivity": "6578947.36842105",
      "electricalType": "1",
      "volumeMagneticSusceptibility": "2.408 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "2.76 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "2.56 ⋅ 10⁻⁹",
      "electricalResistivity": "1.52 ⋅ 10⁻⁷",
      "superconductingTemperature": "9.25",
      "magneticType": "paramagnetic"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "3.301 Å",
      "debyeTemperature": "320",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID23936",
      "rtecsNumber": "RTECSQT9900000",
      "brinellHardness": "736.0",
      "mohsHardness": "6.0",
      "vickersHardness": "1320.0",
      "bulkModulus": "170",
      "youngModulus": "105.0",
      "molarVolume": "0.000010841",
      "poissonRatio": "0.4",
      "shearModulus": "38.0",
      "soundSpeed": "3480.0",
      "thermalConductivity": "53.7"
    },
    "reactivity": {
      "electronegativity": "1.6",
      "electronAffinity": "88.516"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "1.15",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁷",
      "sun": "4 ⋅ 10⁻⁷",
      "ocean": "1.0 ⋅ 10⁻¹⁰",
      "crust": "0.002",
      "meteorites": "1.9 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 93,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=n0N3VeNX6n4",
    "productionCountries": [
      { "country": "br", "share": "92.9" },
      { "country": "ca", "share": "6.0" },
      { "country": "cd" },
      { "country": "rw" }
    ],
    "productionNote": { "ru": "Бразилия доминирует в мировой добыче ниобия (около 90% мировой добычи), намного опережая Канаду.", "en": "Brazil dominates niobium mining (about 90% of world output), far ahead of Canada.", "zh": "巴西主导世界铌矿开采（约占世界产量的90%），远超加拿大。" }
  },
  "Mo": {
    "overview": {
      "latinName": "Molybdaenum",
      "englishName": "Molybdenum",
      "discoveryYear": "1778",
      "casNumber": "CAS7439-98-7",
      "discoverer": { "ru": "Карл Вильгельм Шееле", "en": "Carl Wilhelm Scheele", "zh": "Carl Wilhelm Scheele" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#808080" }],
      "electronShellConfig": "K2-L8-M18-N13-O1-P0-Q0-R0",
      "electronCount": "42",
      "protonCount": "42",
      "neutronCount": "54",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d5 5s1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d5 5s1"
    },
    "description": { "ru": "Серебристый переходный металл; микроэлемент для живых организмов, важен для азотфиксации.", "en": "A silvery transition metal; essential trace nutrient and key to nitrogen fixation in biology.", "zh": "银白色过渡金属；必需微量元素，生物固氮的关键。" },
    "applications": { "ru": "Суперсплавы, катализаторы, смазки, высокопрочная сталь", "en": "Superalloys, catalysts, lubricants, high-strength steel", "zh": "高温合金、催化剂、润滑剂、高强钢" },
    "properties": {
      "atomicMass": "95.9487770772113",
      "density": "10.28",
      "meltingPoint": "2623.0",
      "boilingPoint": "4639.0",
      "valence": "2, 3, 4, 5, 6",
      "group": "5/VI-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "37.48",
      "specificHeat": "251",
      "thermalExpansion": "4.8 ⋅ 10⁻⁶",
      "vaporizationHeat": "617.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,-,0,-,2,3,4,5,6,-,-,-",
      "ionCharge": "6+",
      "ionizationPotential": "7.092",
      "atomicRadius": "190",
      "covalentRadius": "146",
      "vanDerWaalsRadius": "209"
    },
    "electromagnetic": {
      "electricalConductivity": "18726591.7602996",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "1.203 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "1.17 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "1.122 ⋅ 10⁻⁹",
      "electricalResistivity": "5.34 ⋅ 10⁻⁸",
      "superconductingTemperature": "0.915"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "3.147 Å",
      "debyeTemperature": "476",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID23932",
      "rtecsNumber": "RTECSQA4680000",
      "brinellHardness": "1500.0",
      "mohsHardness": "5.5",
      "vickersHardness": "1530.0",
      "bulkModulus": "230",
      "youngModulus": "329.0",
      "liquidDensity": "9.33",
      "molarVolume": "0.000009334",
      "poissonRatio": "0.31",
      "shearModulus": "120.0",
      "soundSpeed": "5400.0",
      "thermalConductivity": "138.0"
    },
    "reactivity": {
      "electronegativity": "2.16",
      "electronAffinity": "72.1"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "2.48",
      "nfpaCube": "3,1,0,-"
    },
    "prevalence": {
      "universe": "5 ⋅ 10⁻⁷",
      "sun": "9 ⋅ 10⁻⁷",
      "ocean": "9.9 ⋅ 10⁻⁷",
      "humanBody": "7.13410169 ⋅ 10⁻⁶",
      "crust": "0.00012",
      "meteorites": "1.2 ⋅ 10⁻⁴"
    },
    "ghs": [
      "flammable",
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 98,
          "abundance": "24.39"
        },
        {
          "mass": 96,
          "abundance": "16.67"
        },
        {
          "mass": 95,
          "abundance": "15.84"
        },
        {
          "mass": 92,
          "abundance": "14.53"
        },
        {
          "mass": 97,
          "abundance": "9.60"
        },
        {
          "mass": 100,
          "abundance": "9.82"
        },
        {
          "mass": 94,
          "abundance": "9.15"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=eH7yKgetw08",
    "productionCountries": [
      { "country": "cn", "share": "40.7" },
      { "country": "pe", "share": "15.2" },
      { "country": "cl", "share": "14.1" },
      { "country": "us", "share": "12.2" },
      { "country": "mx", "share": "6.3" }
    ],
    "productionNote": { "ru": "Китай лидирует в добыче молибдена, за ним следуют Чили, Перу, США и Мексика — вместе они дают 93% мировой добычи.", "en": "China leads molybdenum mine production, followed by Chile, Peru, the US and Mexico, which together supply 93% of world output.", "zh": "中国在钼矿产量方面领先，其次是智利、秘鲁、美国和墨西哥，五国合计供应世界产量的93%。" }
  },
  "Tc": {
    "overview": {
      "latinName": "Technetium",
      "englishName": "Technetium",
      "discoveryYear": "1937",
      "casNumber": "CAS7440-26-8",
      "discoverer": { "ru": "Эмилио Джино Сегре, Карло Перье", "en": "Emilio Gino Segrè, Carlo Perrier", "zh": "Emilio Gino Segrè, Carlo Perrier" },
      "discoveryCountry": "IT",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N13-O2-P0-Q0-R0",
      "electronCount": "43",
      "protonCount": "43",
      "neutronCount": "55",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d5 5s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d5 5s2"
    },
    "description": { "ru": "Самый лёгкий радиоактивный элемент; серебристый, все изотопы нестабильны, первый искусственный элемент.", "en": "The lightest radioactive element; silvery, all isotopes unstable, first artificially produced element.", "zh": "最轻的放射性元素；银白色，所有同位素不稳定，首个人工合成元素。" },
    "applications": { "ru": "Медицинская визуализация (⁹⁹ᵐTc), только искусственный", "en": "Medical imaging (⁹⁹ᵐTc), artificial only", "zh": "医学成像（⁹⁹ᵐTc），仅人工合成" },
    "properties": {
      "atomicMass": "97.4429222893571",
      "density": "11.5",
      "meltingPoint": "2157.0",
      "boilingPoint": "4265.0",
      "valence": "6",
      "group": "5/VII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "33.29",
      "specificHeat": "247.7",
      "vaporizationHeat": "585.2"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,0,1,-,3,4,5,6,7,-,-",
      "ionCharge": "7+",
      "ionizationPotential": "7.119",
      "atomicRadius": "183",
      "covalentRadius": "147",
      "vanDerWaalsRadius": "209"
    },
    "electromagnetic": {
      "electricalConductivity": "5000000.0",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "3.933 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "3.42 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "3.352 ⋅ 10⁻⁹",
      "electricalResistivity": "2 ⋅ 10⁻⁷",
      "superconductingTemperature": "7.8"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=2.737 Å; c=4.391 Å",
      "axialRatio": "1.602",
      "debyeTemperature": "453",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "molarVolume": "0.000008434782608696",
      "thermalConductivity": "50.6"
    },
    "reactivity": {
      "electronegativity": "1.9",
      "electronAffinity": "53.0"
    },
    "nucleus": {
      "halfLife": "211100/1",
      "lifetime": "304553/1",
      "neutronCrossSection": "20.0",
      "nfpaCube": "1,4,1,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "radiacodeIsotope": {
      "isotope": "⁹⁹ᵐTc",
      "slug": "tc-99m"
    },
    "isotopes": {
      "decay": "betaMinus",
      "isotopes": [
        {
          "mass": 97
        },
        {
          "mass": 98
        },
        {
          "mass": 99
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=2UbPY7VHLWs",
    "productionCountries": [
      { "country": "nl" },
      { "country": "be" },
      { "country": "za" },
      { "country": "au" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "У технеция нет стабильных изотопов, он не добывается в виде руды; в природе встречается лишь в следовых количествах как продукт спонтанного деления урана, а промышленно производится в исследовательских реакторах (Канада, Нидерланды, Бельгия, ЮАР) для медицинских генераторов Tc-99m.", "en": "Technetium has no stable isotopes and isn't mined as an ore; it occurs naturally only in trace amounts from spontaneous uranium fission and is industrially produced in research reactors (Canada, the Netherlands, Belgium, South Africa) for medical Tc-99m generators.", "zh": "锝没有稳定同位素，不以矿石形式开采；它在自然界中仅以铀自发裂变产生的痕量存在，工业上在研究堆（加拿大、荷兰、比利时、南非）中生产，用于医用锝-99m发生器。" }
  },
  "Ru": {
    "overview": {
      "latinName": "Ruthenium",
      "englishName": "Ruthenium",
      "discoveryYear": "1844",
      "casNumber": "CAS7440-18-8",
      "discoverer": { "ru": "Карл Карлович Клаус", "en": "Karl Ernst Claus", "zh": "Karl Ernst Claus" },
      "discoveryCountry": "RU",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N15-O1-P0-Q0-R0",
      "electronCount": "44",
      "protonCount": "44",
      "neutronCount": "57",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d7 5s1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d7 5s1"
    },
    "description": { "ru": "Твёрдый белый переходный металл; платиновая группа, редкий и не подвержен коррозии.", "en": "A hard, white transition metal; member of the platinum group, rare and corrosion-proof.", "zh": "硬而白色的过渡金属；铂族成员，稀有且抗腐蚀。" },
    "applications": { "ru": "Катализаторы, электроника, ювелирные покрытия", "en": "Catalysts, electronics, jewelry coatings", "zh": "催化剂、电子、首饰镀层" },
    "properties": {
      "atomicMass": "101.064936840548",
      "density": "12.45",
      "meltingPoint": "2334.0",
      "boilingPoint": "4150.0",
      "valence": "2, 3, 4, 6, 7, 8",
      "group": "5/VIII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "38.59",
      "specificHeat": "238",
      "thermalExpansion": "6.4 ⋅ 10⁻⁶",
      "vaporizationHeat": "619.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,-,0,-,2,3,4,5,6,7,8,-",
      "ionCharge": "3+, 4+",
      "ionizationPotential": "7.361",
      "atomicRadius": "178",
      "covalentRadius": "146",
      "vanDerWaalsRadius": "207"
    },
    "electromagnetic": {
      "electricalConductivity": "14084507.0422535",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "6.7 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "5.42 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "5.48 ⋅ 10⁻¹⁰",
      "electricalResistivity": "7.1 ⋅ 10⁻⁸",
      "superconductingTemperature": "0.49"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=2.706 Å; c=4.282 Å",
      "axialRatio": "1.582",
      "debyeTemperature": "555",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23950",
      "brinellHardness": "2160.0",
      "mohsHardness": "6.5",
      "vickersHardness": "2298.14",
      "bulkModulus": "220.0",
      "youngModulus": "447.0",
      "liquidDensity": "10.65",
      "molarVolume": "0.0000081706",
      "poissonRatio": "0.3",
      "shearModulus": "173.0",
      "soundSpeed": "5970.0",
      "thermalConductivity": "117.0"
    },
    "reactivity": {
      "electronegativity": "2.2",
      "electronAffinity": "100.96"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "2.6",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "4 ⋅ 10⁻⁷",
      "sun": "5 ⋅ 10⁻⁷",
      "ocean": "7.0 ⋅ 10⁻¹¹",
      "crust": "1 ⋅ 10⁻⁷",
      "meteorites": "8.1 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 102,
          "abundance": "31.55"
        },
        {
          "mass": 104,
          "abundance": "18.62"
        },
        {
          "mass": 101,
          "abundance": "17.06"
        },
        {
          "mass": 99,
          "abundance": "12.76"
        },
        {
          "mass": 100,
          "abundance": "12.60"
        },
        {
          "mass": 96,
          "abundance": "5.54"
        },
        {
          "mass": 98,
          "abundance": "1.87"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=Ha13RFROO44",
    "productionCountries": [
      { "country": "za" },
      { "country": "ru" },
      { "country": "zw" }
    ],
    "productionNote": { "ru": "Рутений добывается совместно с платиной и другими металлами платиновой группы из одной руды и отдельно по странам не учитывается; ЮАР и Россия доминируют в добыче МПГ.", "en": "Ruthenium is co-produced with platinum and other PGMs from the same ore and is not separately tracked by country; South Africa and Russia dominate PGM mine output.", "zh": "钌与铂及其他铂族金属从同一矿石中联合生产，没有单独的国别统计；南非和俄罗斯主导铂族金属矿产量。" }
  },
  "Rh": {
    "overview": {
      "latinName": "Rhodium",
      "englishName": "Rhodium",
      "discoveryYear": "1803",
      "casNumber": "CAS7440-16-6",
      "discoverer": { "ru": "Уильям Хайд Волластон", "en": "William Hyde Wollaston", "zh": "William Hyde Wollaston" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N16-O1-P0-Q0-R0",
      "electronCount": "45",
      "protonCount": "45",
      "neutronCount": "58",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d8 5s1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d8 5s1"
    },
    "description": { "ru": "Серебристый твёрдый переходный металл; крайне редкий, зеркально блестящий, активный катализатор.", "en": "A silvery, hard transition metal; extremely rare, mirror-like, and catalytically active.", "zh": "银白色硬质过渡金属；极其稀有，光泽如镜面，催化活性高。" },
    "applications": { "ru": "Автокатализаторы, химический синтез, отражающие покрытия", "en": "Auto catalysts, chemical synthesis, reflective coatings", "zh": "汽车催化剂、化学合成、反射涂层" },
    "properties": {
      "atomicMass": "102.905494087647",
      "density": "12.41",
      "meltingPoint": "1964.0",
      "boilingPoint": "3695.0",
      "valence": "2, 3, 4, 6",
      "group": "5/VIII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "26.59",
      "specificHeat": "240",
      "thermalExpansion": "8.2 ⋅ 10⁻⁶",
      "vaporizationHeat": "494.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,1,2,3,4,5,6,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "7.459",
      "atomicRadius": "173",
      "covalentRadius": "142",
      "vanDerWaalsRadius": "195"
    },
    "electromagnetic": {
      "electricalConductivity": "23094688.221709",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "1.643 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "1.36 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "1.4 ⋅ 10⁻⁹",
      "electricalResistivity": "4.33 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "a=3.803 Å",
      "debyeTemperature": "478",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23948",
      "rtecsNumber": "RTECSVI9069000",
      "brinellHardness": "1100.0",
      "mohsHardness": "6.0",
      "vickersHardness": "1246.0",
      "bulkModulus": "380.0",
      "youngModulus": "275.0",
      "liquidDensity": "10.7",
      "molarVolume": "0.0000082655",
      "poissonRatio": "0.26",
      "shearModulus": "150.0",
      "soundSpeed": "4700.0",
      "thermalConductivity": "150.0"
    },
    "reactivity": {
      "electronegativity": "2.28",
      "electronAffinity": "110.27"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "145.0",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "6 ⋅ 10⁻⁸",
      "sun": "2 ⋅ 10⁻⁷",
      "crust": "7 ⋅ 10⁻⁸",
      "meteorites": "1.8 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 103,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=aTCYhuD9vfM",
    "productionCountries": [
      { "country": "za", "share": "81.5" },
      { "country": "ru" },
      { "country": "zw" },
      { "country": "ca" }
    ],
    "productionNote": { "ru": "Родий добывается совместно с платиной и другими металлами платиновой группы; ЮАР — ведущий источник, за ней следуют Россия, Зимбабве и Канада.", "en": "Rhodium is co-produced with platinum and other PGMs from the same ore; South Africa is the leading source, with Russia, Zimbabwe and Canada following.", "zh": "铑与铂及其他铂族金属联合生产；南非是主要来源，俄罗斯、津巴布韦和加拿大紧随其后。" }
  },
  "Pd": {
    "overview": {
      "latinName": "Palladium",
      "englishName": "Palladium",
      "discoveryYear": "1803",
      "casNumber": "CAS7440-05-3",
      "discoverer": { "ru": "Уильям Хайд Волластон", "en": "William Hyde Wollaston", "zh": "William Hyde Wollaston" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N18-O0-P0-Q0-R0",
      "electronCount": "46",
      "protonCount": "46",
      "neutronCount": "60",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d10 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10"
    },
    "description": { "ru": "Редкий серебристо-белый переходный металл; самый мягкий металл платиновой группы, отличный катализатор.", "en": "A rare, silvery-white transition metal; softest platinum-group metal and excellent catalyst.", "zh": "稀有银白色过渡金属；铂族中最软，优良催化剂。" },
    "applications": { "ru": "Катализаторы, ювелирные изделия, электроника, водородная энергетика", "en": "Catalysts, jewelry, electronics, hydrogen economy", "zh": "催化剂、首饰、电子、氢能" },
    "properties": {
      "atomicMass": "106.415327899964",
      "density": "12.02",
      "meltingPoint": "1554.9",
      "boilingPoint": "2963.0",
      "valence": "2, 4, 6",
      "group": "5/VIII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "16.74",
      "specificHeat": "240",
      "thermalExpansion": "11.8 ⋅ 10⁻⁶",
      "vaporizationHeat": "358.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,1,2,-,4,-,-,-,-,-",
      "ionCharge": "2+, 4+",
      "ionizationPotential": "8.337",
      "atomicRadius": "169",
      "covalentRadius": "139",
      "vanDerWaalsRadius": "163"
    },
    "electromagnetic": {
      "electricalConductivity": "9487666.0341556",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "7.899 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "6.57 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "6.992 ⋅ 10⁻⁹",
      "electricalResistivity": "1.054 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "3.890 Å",
      "debyeTemperature": "274",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23938",
      "rtecsNumber": "RTECSRT3480500",
      "brinellHardness": "37.2",
      "mohsHardness": "4.75",
      "vickersHardness": "461.0",
      "bulkModulus": "180.0",
      "youngModulus": "121.0",
      "liquidDensity": "10.38",
      "molarVolume": "0.0000088514",
      "poissonRatio": "0.39",
      "shearModulus": "44.0",
      "soundSpeed": "3070.0",
      "thermalConductivity": "71.8"
    },
    "reactivity": {
      "electronegativity": "2.2",
      "electronAffinity": "54.24"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "6.9",
      "nfpaCube": "0,1,0,-"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁷",
      "sun": "3 ⋅ 10⁻⁷",
      "crust": "6.3 ⋅ 10⁻⁷",
      "meteorites": "6.5 ⋅ 10⁻⁵"
    },
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 106,
          "abundance": "27.33"
        },
        {
          "mass": 108,
          "abundance": "26.46"
        },
        {
          "mass": 105,
          "abundance": "22.33"
        },
        {
          "mass": 110,
          "abundance": "11.72"
        },
        {
          "mass": 104,
          "abundance": "11.14"
        },
        {
          "mass": 102,
          "abundance": "1.02"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=zDRGZ53Mhp4",
    "productionCountries": [
      { "country": "ru", "share": "39.5" },
      { "country": "za", "share": "37.9" },
      { "country": "ca", "share": "7.9" },
      { "country": "zw", "share": "7.9" },
      { "country": "us", "share": "4.2" }
    ],
    "productionNote": { "ru": "Россия — крупнейший производитель палладия, за ней следуют ЮАР, Канада, Зимбабве и США.", "en": "Russia is the world's leading palladium producer, followed closely by South Africa, then Canada, Zimbabwe and the United States.", "zh": "俄罗斯是世界领先的钯生产国，南非紧随其后，然后是加拿大、津巴布韦和美国。" }
  },
  "Ag": {
    "overview": {
      "latinName": "Argentum",
      "englishName": "Silver",
      "discoveryYear": "5000 BC",
      "casNumber": "CAS7440-22-4",
      "discoveryCountry": "AsiaMinor",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N18-O1-P0-Q0-R0",
      "electronCount": "47",
      "protonCount": "47",
      "neutronCount": "61",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d10 5s1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s1"
    },
    "description": { "ru": "Блестящий белый благородный металл; лучший проводник тепла и электричества среди элементов.", "en": "A lustrous white precious metal; best thermal and electrical conductor among elements.", "zh": "光亮的白色贵金属；所有元素中最佳的热电导体。" },
    "applications": { "ru": "Ювелирные изделия, электроника, фотография, антибактериальные покрытия", "en": "Jewelry, electronics, photography, antibacterial coatings", "zh": "首饰、电子、摄影、抗菌涂层" },
    "properties": {
      "atomicMass": "107.868149833461",
      "density": "10.49",
      "meltingPoint": "961.78",
      "boilingPoint": "2162.0",
      "valence": "1, 2, 3",
      "group": "5/I-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "11.28",
      "specificHeat": "235",
      "thermalExpansion": "18.9 ⋅ 10⁻⁶",
      "vaporizationHeat": "254.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,1,2,3,4,-,-,-,-,-",
      "ionCharge": "1+",
      "ionizationPotential": "7.576",
      "atomicRadius": "165",
      "covalentRadius": "145",
      "vanDerWaalsRadius": "172"
    },
    "electromagnetic": {
      "electricalConductivity": "63011972.2747322",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "2.41 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-2.27 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-2.45 ⋅ 10⁻¹⁰",
      "electricalResistivity": "1.587 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "4.086 Å",
      "debyeTemperature": "225",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23954",
      "rtecsNumber": "RTECSVW3500000",
      "brinellHardness": "24.5",
      "mohsHardness": "2.5",
      "vickersHardness": "251.0",
      "bulkModulus": "100.0",
      "youngModulus": "83.0",
      "liquidDensity": "9.32",
      "molarVolume": "0.000010283",
      "poissonRatio": "0.37",
      "shearModulus": "30.0",
      "soundSpeed": "2680.0",
      "thermalConductivity": "429.0"
    },
    "reactivity": {
      "electronegativity": "1.93",
      "electronAffinity": "125.862"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "63.6",
      "nfpaCube": "0,1,0,-"
    },
    "prevalence": {
      "universe": "6 ⋅ 10⁻⁸",
      "sun": "1 ⋅ 10⁻⁷",
      "ocean": "1.0 ⋅ 10⁻⁸",
      "crust": "7.5 ⋅ 10⁻⁶",
      "meteorites": "1.4 ⋅ 10⁻⁵"
    },
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 107,
          "abundance": "51.839"
        },
        {
          "mass": 109,
          "abundance": "48.161"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=GEdjIYBqMNU",
    "productionCountries": [
      { "country": "mx", "share": "24.4" },
      { "country": "cn", "share": "12.8" },
      { "country": "pe", "share": "12.0" },
      { "country": "bo", "share": "5.0" },
      { "country": "pl", "share": "5.0" },
      { "country": "cl", "share": "4.7" },
      { "country": "ru", "share": "4.7" },
      { "country": "us", "share": "4.3" },
      { "country": "au", "share": "3.9" },
      { "country": "kz", "share": "3.9" }
    ],
    "productionNote": { "ru": "Мексика — безусловный лидер по добыче серебра, за ней следуют Китай, Перу, Чили и Польша.", "en": "Mexico is by far the largest silver mine producer, followed by China, Peru, Chile and Poland.", "zh": "墨西哥是迄今为止最大的银矿生产国，其次是中国、秘鲁、智利和波兰。" }
  },
  "Cd": {
    "overview": {
      "latinName": "Cadmium",
      "englishName": "Cadmium",
      "discoveryYear": "1817",
      "casNumber": "CAS7440-43-9",
      "discoverer": { "ru": "Фридрих Штромейер, Карл Самуэль Леберехт Герман", "en": "Friedrich Stromeyer, Karl Samuel Leberecht Hermann", "zh": "Friedrich Stromeyer, Karl Samuel Leberecht Hermann" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#8FA4B4" }],
      "electronShellConfig": "K2-L8-M18-N18-O2-P0-Q0-R0",
      "electronCount": "48",
      "protonCount": "48",
      "neutronCount": "64",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d10 5s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2"
    },
    "description": { "ru": "Мягкий сине-белый переходный металл; токсичен в растворимой форме, используется в аккумуляторах.", "en": "A soft, bluish-white transition metal; toxic in soluble form and used in rechargeable batteries.", "zh": "柔软蓝白色过渡金属；可溶性形式有毒，用于充电电池。" },
    "applications": { "ru": "Аккумуляторы Ni-Cd, пигменты, гальванические покрытия", "en": "Ni-Cd batteries, pigments, electroplating", "zh": "镍镉电池、颜料、电镀" },
    "properties": {
      "atomicMass": "112.413818634622",
      "density": "8.65",
      "meltingPoint": "321.07",
      "boilingPoint": "767.0",
      "valence": "1, 2",
      "group": "5/II-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "6.21",
      "specificHeat": "231.5",
      "thermalExpansion": "30.8 ⋅ 10⁻⁶",
      "vaporizationHeat": "99.87"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,1,2,-,-,-,-,-,-,-",
      "ionCharge": "2+",
      "ionizationPotential": "8.994",
      "atomicRadius": "161",
      "covalentRadius": "144",
      "vanDerWaalsRadius": "158"
    },
    "electromagnetic": {
      "electricalConductivity": "13755158.1843191",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.99 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-2.3 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-2.59 ⋅ 10⁻¹⁰",
      "electricalResistivity": "7.27 ⋅ 10⁻⁸",
      "superconductingTemperature": "0.517"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=2.979 Å; c=5.618 Å",
      "axialRatio": "1.886",
      "debyeTemperature": "209",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23973",
      "rtecsNumber": "RTECSEU9800000",
      "brinellHardness": "203.0",
      "mohsHardness": "2.0",
      "bulkModulus": "42.0",
      "youngModulus": "50.0",
      "liquidDensity": "7.996",
      "molarVolume": "0.000012996",
      "poissonRatio": "0.3",
      "shearModulus": "19.0",
      "soundSpeed": "2310.0",
      "thermalConductivity": "96.6"
    },
    "reactivity": {
      "electronegativity": "1.69",
      "electronAffinity": "-68.0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "2520.0",
      "nfpaCube": "2,2,0,-"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁷",
      "sun": "6 ⋅ 10⁻⁷",
      "ocean": "5 ⋅ 10⁻⁹",
      "humanBody": "7.134101693 ⋅ 10⁻⁵",
      "crust": "1.5 ⋅ 10⁻⁵",
      "meteorites": "4.4 ⋅ 10⁻⁵"
    },
    "ghs": [
      "healthHazard",
      "irritant",
      "environment"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 114,
          "abundance": "28.73"
        },
        {
          "mass": 112,
          "abundance": "24.13"
        },
        {
          "mass": 111,
          "abundance": "12.80"
        },
        {
          "mass": 110,
          "abundance": "12.470"
        },
        {
          "mass": 113,
          "abundance": "12.227"
        },
        {
          "mass": 116,
          "abundance": "7.512"
        },
        {
          "mass": 106,
          "abundance": "1.245"
        },
        {
          "mass": 108,
          "abundance": "0.888"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=PjWz0ROaBeg",
    "productionCountries": [
      { "country": "cn", "share": "39" },
      { "country": "kr", "share": "19" },
      { "country": "ca" },
      { "country": "jp" },
      { "country": "mx" }
    ],
    "productionNote": { "ru": "Кадмий извлекается как побочный продукт переработки цинковых руд; Китай лидирует, за ним следуют Южная Корея, Канада, Япония и Мексика.", "en": "Cadmium is recovered as a byproduct of zinc refining; China leads world refined output, followed by South Korea, Canada, Japan and Mexico.", "zh": "镉作为锌精炼的副产品回收；中国精炼产量领先，其次是韩国、加拿大、日本和墨西哥。" }
  },
  "In": {
    "overview": {
      "latinName": "Indium",
      "englishName": "Indium",
      "discoveryYear": "1863",
      "casNumber": "CAS7440-74-6",
      "discoverer": { "ru": "Фердинанд Райх, Иероним Теодор Рихтер", "en": "Ferdinand Reich, Hieronymous Theodor Richter", "zh": "Ferdinand Reich, Hieronymous Theodor Richter" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N18-O3-P0-Q0-R0",
      "electronCount": "49",
      "protonCount": "49",
      "neutronCount": "66",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d10 5s2 5p1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p1"
    },
    "description": { "ru": "Мягкий серебристый металл; оставляет след на бумаге, плавится при низкой температуре.", "en": "A soft, silvery post-transition metal; leaves a mark on paper and melts at low temperature.", "zh": "柔软银白色金属；可在纸上划痕，低熔点。" },
    "applications": { "ru": "ЖК-дисплеи, полупроводники, припои", "en": "LCD displays, semiconductors, solders", "zh": "液晶显示、半导体、焊料" },
    "properties": {
      "atomicMass": "114.818266549865",
      "density": "7.31",
      "meltingPoint": "156.6",
      "boilingPoint": "2072.0",
      "valence": "1, 2, 3",
      "group": "5/III+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "3.281",
      "specificHeat": "233",
      "thermalExpansion": "32.1 ⋅ 10⁻⁶",
      "vaporizationHeat": "231.8"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,1,2,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "5.786",
      "atomicRadius": "156",
      "covalentRadius": "142",
      "vanDerWaalsRadius": "193"
    },
    "electromagnetic": {
      "electricalConductivity": "11947431.30227",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.02 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-1.4 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-1.61 ⋅ 10⁻¹⁰",
      "electricalResistivity": "8.37 ⋅ 10⁻⁸",
      "superconductingTemperature": "3.41"
    },
    "grid": {
      "structureCode": "10",
      "gridParams": "a=3.252 Å; c=4.946 Å",
      "axialRatio": "1.52",
      "debyeTemperature": "109",
      "spaceGroup": "I4/mmm",
      "spaceGroupNumber": "139"
    },
    "additional": {
      "pubchemCid": "CID5359967",
      "rtecsNumber": "RTECSNL1050000",
      "brinellHardness": "8.83",
      "mohsHardness": "1.2",
      "youngModulus": "11.0",
      "liquidDensity": "07.02",
      "molarVolume": "0.000015707",
      "soundSpeed": "1215.0",
      "thermalConductivity": "81.8"
    },
    "reactivity": {
      "electronegativity": "1.78",
      "electronAffinity": "37.043"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "194.0",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "3 ⋅ 10⁻⁸",
      "sun": "4 ⋅ 10⁻⁷",
      "ocean": "1.0 ⋅ 10⁻¹¹",
      "crust": "2.5 ⋅ 10⁻⁵",
      "meteorites": "4.4 ⋅ 10⁻⁶"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 115,
          "abundance": "95.71"
        },
        {
          "mass": 113,
          "abundance": "4.29"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=O8kbUMP5-m4",
    "productionCountries": [
      { "country": "cn", "share": "39" },
      { "country": "kr", "share": "27" },
      { "country": "ca", "share": "9" },
      { "country": "jp", "share": "9" }
    ],
    "productionNote": { "ru": "Индий, извлекаемый в основном как побочный продукт переработки цинковых руд, перерабатывается преимущественно в Китае, за ним следуют Южная Корея, Япония, Канада и Бельгия.", "en": "Indium, recovered mainly as a byproduct of zinc ore processing, is refined predominantly in China, followed by South Korea, Japan, Canada and Belgium.", "zh": "铟主要作为锌矿加工的副产品回收，主要在中国精炼，其次是韩国、日本、加拿大和比利时。" }
  },
  "Sn": {
    "overview": {
      "latinName": "Stannum",
      "englishName": "Tin",
      "discoveryYear": "3500 BC",
      "casNumber": "CAS7440-31-5",
      "discoveryCountry": "Kestel",
      "sampleColors": [
        { "hex": "#C6C6C6", "label": { "ru": "Белое олово", "en": "White tin", "zh": "白锡" } },
        { "hex": "#8A8A82", "finish": "matte", "label": { "ru": "Серое олово", "en": "Gray tin", "zh": "灰锡" } }
      ],
      "electronShellConfig": "K2-L8-M18-N18-O4-P0-Q0-R0",
      "electronCount": "50",
      "protonCount": "50",
      "neutronCount": "69",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d10 5s2 5p2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p2"
    },
    "description": { "ru": "Серебристый металл; известен с древности, устойчив к коррозии и легко легируется.", "en": "A silvery post-transition metal; known since antiquity, resistant to corrosion and easily alloyed.", "zh": "银白色金属；自古已知，耐腐蚀且易于合金化。" },
    "applications": { "ru": "Припои, жесть, стекло, бронза", "en": "Solders, tinplate, glass, bronze", "zh": "焊料、镀锡铁皮、玻璃、青铜" },
    "properties": {
      "atomicMass": "118.71011319607",
      "density": "7.287",
      "meltingPoint": "231.93",
      "boilingPoint": "2602.0",
      "valence": "2, 4",
      "group": "5/IV+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "7.03",
      "specificHeat": "228.4",
      "thermalExpansion": "22 ⋅ 10⁻⁶",
      "vaporizationHeat": "296.1"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,-,4,-,-,-,-,-",
      "ionCharge": "2+, 4+",
      "ionizationPotential": "7.344",
      "atomicRadius": "145",
      "covalentRadius": "140",
      "vanDerWaalsRadius": "217"
    },
    "electromagnetic": {
      "electricalConductivity": "8695652.17391304",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "-2.27 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-3.1 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-3.68 ⋅ 10⁻¹⁰",
      "electricalResistivity": "1.15 ⋅ 10⁻⁷",
      "superconductingTemperature": "3.72"
    },
    "grid": {
      "structureCode": "10",
      "gridParams": "a=5.831 Å; c=3.181 Å",
      "axialRatio": "0.546",
      "debyeTemperature": "195",
      "spaceGroup": "I4₁/amd",
      "spaceGroupNumber": "141"
    },
    "additional": {
      "pubchemCid": "CID5352426",
      "rtecsNumber": "RTECSXP7320000",
      "brinellHardness": "51.0",
      "mohsHardness": "1.5",
      "bulkModulus": "58.0",
      "youngModulus": "50.0",
      "liquidDensity": "6.99",
      "molarVolume": "0.000016239",
      "poissonRatio": "0.36",
      "shearModulus": "18.0",
      "soundSpeed": "2730.0",
      "thermalConductivity": "66.8"
    },
    "reactivity": {
      "electronegativity": "1.96",
      "electronAffinity": "107.2984"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.63",
      "nfpaCube": "3,1,3,-"
    },
    "prevalence": {
      "universe": "4 ⋅ 10⁻⁷",
      "sun": "9 ⋅ 10⁻⁷",
      "ocean": "9.9 ⋅ 10⁻¹⁰",
      "humanBody": "2.853640677 ⋅ 10⁻⁵",
      "crust": "0.00023",
      "meteorites": "1.2 ⋅ 10⁻⁴"
    },
    "ghs": [
      "flammable",
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 120,
          "abundance": "32.58"
        },
        {
          "mass": 118,
          "abundance": "24.22"
        },
        {
          "mass": 116,
          "abundance": "14.54"
        },
        {
          "mass": 119,
          "abundance": "8.59"
        },
        {
          "mass": 117,
          "abundance": "7.68"
        },
        {
          "mass": 124,
          "abundance": "5.79"
        },
        {
          "mass": 122,
          "abundance": "4.63"
        },
        {
          "mass": 112,
          "abundance": "0.97"
        },
        {
          "mass": 114,
          "abundance": "0.66"
        },
        {
          "mass": 115,
          "abundance": "0.34"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=QJhFyaMJcSM",
    "productionCountries": [
      { "country": "cn", "share": "26.4" },
      { "country": "id", "share": "19.2" },
      { "country": "pe", "share": "11.9" },
      { "country": "br", "share": "11.1" },
      { "country": "cd", "share": "9.6" },
      { "country": "bo", "share": "8.0" },
      { "country": "au", "share": "3.8" },
      { "country": "ng", "share": "2.7" },
      { "country": "vn", "share": "2.6" },
      { "country": "rw", "share": "1.4" },
      { "country": "ru", "share": "1.1" },
      { "country": "my", "share": "1.1" },
      { "country": "la", "share": "0.6" },
      { "country": "mm" }
    ],
    "productionNote": { "ru": "Китай — ведущий добытчик олова, за ним следуют Мьянма, Индонезия, Перу и ДР Конго.", "en": "China is the leading tin mine producer, followed by Myanmar, Indonesia, Peru and the Democratic Republic of the Congo.", "zh": "中国是主要的锡矿生产国，其次是缅甸、印度尼西亚、秘鲁和刚果民主共和国。" }
  },
  "Sb": {
    "overview": {
      "latinName": "Stibium",
      "englishName": "Antimony",
      "discoveryYear": "~1600 BC",
      "casNumber": "CAS7440-36-0",
      "discoveryCountry": "MiddleEast",
      "sampleColors": [{ "hex": "#9A9A96" }],
      "electronShellConfig": "K2-L8-M18-N18-O5-P0-Q0-R0",
      "electronCount": "51",
      "protonCount": "51",
      "neutronCount": "71",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d10 5s2 5p3 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p3"
    },
    "description": { "ru": "Серебристый хрупкий металлоид; расширяется при застывании, образует огнезащитные соединения.", "en": "A silvery, brittle metalloid; expands on freezing and forms flame-retardant compounds.", "zh": "银白色脆性类金属；凝固时膨胀，形成阻燃化合物。" },
    "applications": { "ru": "Пламегасители, аккумуляторы, полупроводники", "en": "Flame retardants, batteries, semiconductors", "zh": "阻燃剂、电池、半导体" },
    "properties": {
      "atomicMass": "121.759784168018",
      "density": "6.697",
      "meltingPoint": "630.63",
      "boilingPoint": "1635.0",
      "valence": "3, 4, 5",
      "group": "5/V+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "19.79",
      "specificHeat": "207",
      "thermalExpansion": "11 ⋅ 10⁻⁶",
      "vaporizationHeat": "193.43"
    },
    "atomic": {
      "oxidationState": "-,-,3,2,1,-,1,2,3,4,5,-,-,-,-",
      "ionCharge": "3+, 5+",
      "ionizationPotential": "8.608",
      "atomicRadius": "133",
      "covalentRadius": "140",
      "vanDerWaalsRadius": "206"
    },
    "electromagnetic": {
      "electricalConductivity": "2398081.53477218",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-7.3 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-1.09 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-1.327 ⋅ 10⁻⁹",
      "electricalResistivity": "4.17 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "5",
      "gridParams": "a(hex)=4.307 Å; c(hex)=11.27 Å",
      "axialRatio": "2.62",
      "debyeTemperature": "220",
      "spaceGroup": "R_ 3m",
      "spaceGroupNumber": "166"
    },
    "additional": {
      "pubchemCid": "CID5354495",
      "rtecsNumber": "RTECSCC4025000",
      "brinellHardness": "294.0",
      "mohsHardness": "3.0",
      "bulkModulus": "42.0",
      "youngModulus": "55.0",
      "liquidDensity": "6.53",
      "molarVolume": "0.000018181",
      "shearModulus": "20.0",
      "soundSpeed": "3420.0",
      "thermalConductivity": "24.4"
    },
    "reactivity": {
      "electronegativity": "2.05",
      "electronAffinity": "101.059"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "4.91",
      "nfpaCube": "2,1,0,-"
    },
    "prevalence": {
      "universe": "4 ⋅ 10⁻⁸",
      "sun": "1 ⋅ 10⁻⁷",
      "ocean": "2.0 ⋅ 10⁻⁸",
      "humanBody": "1.1 ⋅ 10⁻⁵",
      "crust": "2.0 ⋅ 10⁻⁵",
      "meteorites": "1.2 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 121,
          "abundance": "57.21"
        },
        {
          "mass": 123,
          "abundance": "42.79"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=5ECFECcqaKM",
    "productionCountries": [
      { "country": "cn", "share": "33.6" },
      { "country": "ru", "share": "33.6" },
      { "country": "tj", "share": "18.5" },
      { "country": "mm", "share": "3.8" },
      { "country": "tr", "share": "2.5" }
    ],
    "productionNote": { "ru": "Китай доминирует в добыче сурьмы (около 48% мировой добычи), за ним следуют Таджикистан, Турция, Мьянма и Россия.", "en": "China dominates antimony mine production (about 48% of world output), followed by Tajikistan, Turkey, Myanmar and Russia.", "zh": "中国主导锑矿产量（约占世界产量的48%），其次是塔吉克斯坦、土耳其、缅甸和俄罗斯。" }
  },
  "Te": {
    "overview": {
      "latinName": "Tellurium",
      "englishName": "Tellurium",
      "discoveryYear": "1782",
      "casNumber": "CAS13494-80-9",
      "discoveryCountry": "RO",
      "sampleColors": [{ "hex": "#9A9A96" }],
      "electronShellConfig": "K2-L8-M18-N18-O6-P0-Q0-R0",
      "electronCount": "52",
      "protonCount": "52",
      "neutronCount": "76",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d10 5s2 5p4 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p4"
    },
    "description": { "ru": "Хрупкий серебристый металлоид; полупроводник и термоэлектрик с металлическим блеском.", "en": "A brittle, silvery metalloid; semiconductor and thermoelectric material with a metallic luster.", "zh": "脆性银白色类金属；半导体和热电材料，具金属光泽。" },
    "applications": { "ru": "Термоэлектрика, металлургия, солнечные панели", "en": "Thermoelectrics, metallurgy, solar panels", "zh": "热电、冶金、太阳能板" },
    "properties": {
      "atomicMass": "127.603126893528",
      "density": "6.24",
      "meltingPoint": "449.51",
      "boilingPoint": "988.0",
      "valence": "2, 4, 6",
      "group": "5/VI+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "17.49",
      "specificHeat": "201",
      "vaporizationHeat": "114.1"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,1,-,1,2,-,4,-,6,-,-,-",
      "ionCharge": "2-",
      "ionizationPotential": "9.010",
      "atomicRadius": "123",
      "covalentRadius": "137",
      "vanDerWaalsRadius": "206"
    },
    "electromagnetic": {
      "electricalConductivity": "10000.0",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-2.43 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-3.9 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-4.98 ⋅ 10⁻¹⁰",
      "electricalResistivity": "0.0001"
    },
    "grid": {
      "structureCode": "1 | 5",
      "gridParams": "a=4.457 Å; c=5.929",
      "axialRatio": "1.330",
      "debyeTemperature": "152",
      "spaceGroup": "P3₁21",
      "spaceGroupNumber": "152"
    },
    "additional": {
      "pubchemCid": "CID6327182",
      "rtecsNumber": "RTECSWY2625000",
      "brinellHardness": "180.0",
      "mohsHardness": "2.25",
      "bulkModulus": "65.0",
      "youngModulus": "43.0",
      "liquidDensity": "5.7",
      "molarVolume": "0.000020449",
      "shearModulus": "16.0",
      "soundSpeed": "2610.0",
      "refractiveIndex": "1.000991",
      "thermalConductivity": "3.0"
    },
    "reactivity": {
      "electronegativity": "2.1",
      "electronAffinity": "190.161"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "4.7",
      "nfpaCube": "0,2,0,-"
    },
    "prevalence": {
      "universe": "9 ⋅ 10⁻⁷",
      "humanBody": "1.2 ⋅ 10⁻⁵",
      "crust": "1.0 ⋅ 10⁻⁷",
      "meteorites": "2.1 ⋅ 10⁻⁴"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 130,
          "abundance": "34.08"
        },
        {
          "mass": 128,
          "abundance": "31.74"
        },
        {
          "mass": 126,
          "abundance": "18.84"
        },
        {
          "mass": 125,
          "abundance": "7.07"
        },
        {
          "mass": 124,
          "abundance": "4.74"
        },
        {
          "mass": 122,
          "abundance": "2.55"
        },
        {
          "mass": 123,
          "abundance": "0.89"
        },
        {
          "mass": 120,
          "abundance": "0.09"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=OEU9QVxMmOo",
    "productionCountries": [
      { "country": "cn", "share": "50" },
      { "country": "ru", "share": "4.7" },
      { "country": "jp", "share": "4.7" },
      { "country": "se", "share": "3.1" },
      { "country": "ca", "share": "1.8" },
      { "country": "uz", "share": "0.9" }
    ],
    "productionNote": { "ru": "Теллур, извлекаемый как побочный продукт переработки медных руд, перерабатывается в основном в Китае (около двух третей мирового производства), за ним следуют Россия, Япония, Канада и Швеция.", "en": "Tellurium, recovered as a byproduct of copper refining, is refined mainly in China (about two-thirds of world output), followed by Russia, Japan, Canada and Sweden.", "zh": "碲作为铜精炼的副产品回收，主要在中国精炼（约占世界产量的三分之二），其次是俄罗斯、日本、加拿大和瑞典。" }
  },
  "I": {
    "overview": {
      "latinName": "Iodium",
      "englishName": "Iodine",
      "discoveryYear": "1811",
      "casNumber": "CAS7553-56-2",
      "discoverer": { "ru": "Бернар Куртуа", "en": "Bernard Courtois", "zh": "Bernard Courtois" },
      "discoveryCountry": "FR",
      "sampleColors": [
        { "hex": "#5C5C66", "finish": "metallic", "label": { "ru": "Кристаллический йод", "en": "Solid iodine", "zh": "碘晶体" } },
        { "hex": "#940094", "finish": "subtle", "label": { "ru": "Пары йода", "en": "Iodine vapor", "zh": "碘蒸气" } }
      ],
      "electronShellConfig": "K2-L8-M18-N18-O7-P0-Q0-R0",
      "electronCount": "53",
      "protonCount": "53",
      "neutronCount": "74",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d10 5s2 5p5 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p5"
    },
    "description": { "ru": "Фиолетово-чёрный неметалл; сублимирует в фиолетовый пар, необходим для гормонов щитовидной железы.", "en": "A violet-black nonmetal; sublimes to purple vapor and essential for thyroid hormones.", "zh": "紫黑色非金属；升华成紫色蒸气，甲状腺激素必需元素。" },
    "applications": { "ru": "Антисептики, рентген-контраст, йодированная соль", "en": "Antiseptics, X-ray contrast, iodized salt", "zh": "消毒剂、X射线造影、加碘盐" },
    "properties": {
      "atomicMass": "126.904472825143",
      "density": "4.933",
      "meltingPoint": "113.7",
      "boilingPoint": "184.3",
      "valence": "1, 3, 4, 5, 7",
      "group": "5/VII+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "15.52",
      "specificHeat": "214",
      "vaporizationHeat": "41.57"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,-,1,-,3,-,5,-,7,-,-",
      "ionCharge": "1-",
      "ionizationPotential": "10.451",
      "atomicRadius": "115",
      "covalentRadius": "139",
      "vanDerWaalsRadius": "198"
    },
    "electromagnetic": {
      "electricalConductivity": "7.69230769230769e-08",
      "electricalType": "2",
      "volumeMagneticSusceptibility": "-2.22 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-4.5 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-1.14 ⋅ 10⁻⁹",
      "electricalResistivity": "13000000.0"
    },
    "grid": {
      "structureCode": "9 | 6",
      "gridParams": "a=7.18 Å; b=4.71 Å; c=9.81 Å",
      "debyeTemperature": "109",
      "spaceGroup": "Cmca",
      "spaceGroupNumber": "64"
    },
    "additional": {
      "pubchemCid": "CID807",
      "rtecsNumber": "RTECSNN1575000",
      "bulkModulus": "7.7",
      "molarVolume": "0.000025689",
      "thermalConductivity": "0.449"
    },
    "reactivity": {
      "electronegativity": "2.66",
      "electronAffinity": "295.1531"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "6.2",
      "nfpaCube": "0,3,0,-"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁷",
      "ocean": "6 ⋅ 10⁻⁶",
      "humanBody": "2.853640677 ⋅ 10⁻⁵",
      "crust": "4.5 ⋅ 10⁻⁵",
      "meteorites": "2.5 ⋅ 10⁻⁵"
    },
    "ghs": [
      "corrosive",
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 127,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=U-sijD3MGSM",
    "productionCountries": [
      { "country": "cl", "share": "64" },
      { "country": "jp", "share": "25" },
      { "country": "us" },
      { "country": "tm" },
      { "country": "ir" }
    ],
    "productionNote": { "ru": "Чили — ведущий производитель йода из пустынных нитратных рассолов, за ней следуют Япония (рассолы газовых/нефтяных месторождений) и США (рассолы Оклахомы).", "en": "Chile is the world's leading iodine producer from desert nitrate-brine deposits, followed by Japan (gas/oil-field brines) and the United States (Oklahoma brines).", "zh": "智利是世界领先的碘生产国，产自沙漠硝酸盐卤水矿床，其次是日本（气田/油田卤水）和美国（俄克拉荷马州卤水）。" }
  },
  "Xe": {
    "overview": {
      "latinName": "Xenon",
      "englishName": "Xenon",
      "discoveryYear": "1898",
      "casNumber": "CAS7440-63-3",
      "discoverer": { "ru": "Уильям Рамзай, Траверс, Морис Уильям", "en": "William Ramsey, Morris William Travers", "zh": "William Ramsey, Morris William Travers" },
      "discoveryCountry": "GB",
      "sampleColors": [
        { "hex": "#E8E8E8", "finish": "subtle", "label": { "ru": "Газ", "en": "Gas", "zh": "气体" } },
        { "hex": "#9CAAC0", "finish": "subtle", "label": { "ru": "Газоразряд", "en": "Gas discharge", "zh": "气体放电" } }
      ],
      "electronShellConfig": "K2-L8-M18-N18-O8-P0-Q0-R0",
      "electronCount": "54",
      "protonCount": "54",
      "neutronCount": "77",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Kr] 4d10 5s2 5p6 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p6"
    },
    "description": { "ru": "Бесцветный благородный газ; инертен, используется в освещении, один из тяжёлых стабильных благородных газов.", "en": "A colorless noble gas; inert, used in lighting, and one of the heaviest stable noble gases.", "zh": "无色稀有气体；惰性，用于照明，是最重的稳定稀有气体之一。" },
    "applications": { "ru": "Лампы, анестезия, ионные двигатели", "en": "Lighting, anesthesia, ion thrusters", "zh": "照明、麻醉、离子推进器" },
    "properties": {
      "atomicMass": "131.29277126863",
      "density": "0.005894",
      "meltingPoint": "-111.75",
      "boilingPoint": "-108.099",
      "valence": "0",
      "group": "5/VIII+",
      "block": "p",
      "aggregationState": "gas"
    },
    "thermo": {
      "fusionHeat": "2.27",
      "specificHeat": "158.32",
      "vaporizationHeat": "12.64"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,-,2,-,4,-,6,-,8,-",
      "ionizationPotential": "12.130",
      "atomicRadius": "108",
      "covalentRadius": "140",
      "vanDerWaalsRadius": "216"
    },
    "electromagnetic": {
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-2.54 ⋅ 10⁻⁸",
      "massMagneticSusceptibility": "-4.3 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-5.65 ⋅ 10⁻¹⁰"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "6.200 Å",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23991",
      "rtecsNumber": "RTECSZE1280000",
      "molarVolume": "0.0223",
      "soundSpeed": "178.0",
      "refractiveIndex": "1.000702",
      "thermalConductivity": "0.00565"
    },
    "reactivity": {
      "electronegativity": "2.6",
      "electronAffinity": "-77.0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "23.9",
      "nfpaCube": "0,0,0,SA"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁶",
      "ocean": "5 ⋅ 10⁻¹⁰",
      "crust": "3.0 ⋅ 10⁻⁹"
    },
    "ghs": [
      "compressedGas"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 132,
          "abundance": "26.91"
        },
        {
          "mass": 129,
          "abundance": "26.4"
        },
        {
          "mass": 131,
          "abundance": "21.23"
        },
        {
          "mass": 134,
          "abundance": "10.436"
        },
        {
          "mass": 136,
          "abundance": "8.857"
        },
        {
          "mass": 130,
          "abundance": "4.071"
        },
        {
          "mass": 128,
          "abundance": "1.910"
        },
        {
          "mass": 124,
          "abundance": "0.095"
        },
        {
          "mass": 126,
          "abundance": "0.089"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=rOyE8yg-xvg",
    "productionCountries": [
      { "country": "cn" },
      { "country": "ru" },
      { "country": "us" },
      { "country": "in" },
      { "country": "de" }
    ],
    "productionNote": { "ru": "Ксенон добывается промышленно как побочный продукт крупномасштабного криогенного разделения воздуха, а не путём горной добычи; производство сосредоточено в немногих странах с развитой инфраструктурой промышленных газов, доля Украины (ранее около 30%) сильно снизилась из-за войны с 2022 года.", "en": "Xenon is extracted industrially as a byproduct of large-scale cryogenic air separation, not mined; production capacity is concentrated among a handful of countries with major industrial-gas infrastructure, and Ukraine's formerly large (~30%) share was largely knocked offline by the war since 2022.", "zh": "氙气是大规模低温空气分离的工业副产品，而非开采所得；生产能力集中在少数拥有大型工业气体基础设施的国家，乌克兰此前约30%的份额自2022年战争以来已大幅下降。" }
  },
  "Cs": {
    "overview": {
      "latinName": "Caesium",
      "englishName": "Caesium",
      "discoveryYear": "1860",
      "casNumber": "CAS7440-46-2",
      "discoverer": { "ru": "Роберт Вильгельм Бунзен, Густав Кирхгоф", "en": "Robert Wilhelm Bunsen, Gustav Robert Kirchhoff", "zh": "Robert Wilhelm Bunsen, Gustav Robert Kirchhoff" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#D4B060" }],
      "electronShellConfig": "K2-L8-M18-N18-O8-P1-Q0-R0",
      "electronCount": "55",
      "protonCount": "55",
      "neutronCount": "78",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 6s1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p6 6s1"
    },
    "description": { "ru": "Мягкий золотистый щелочной металл; самый электроположительный стабильный элемент, плавится около комнатной температуры.", "en": "A soft, golden alkali metal; most electropositive stable element and melts near room temperature.", "zh": "柔软金黄色碱金属；稳定元素中电正性最强，熔点接近室温。" },
    "applications": { "ru": "Буровые жидкости, атомные часы, фотоумножители", "en": "Drilling fluids, atomic clocks, photomultipliers", "zh": "钻井液、原子钟、光电倍增管" },
    "properties": {
      "atomicMass": "132.905451958556",
      "density": "1.93",
      "meltingPoint": "28.5",
      "boilingPoint": "671.0",
      "valence": "1",
      "group": "6/I+",
      "block": "s",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "2.09",
      "specificHeat": "242",
      "thermalExpansion": "92.6 ⋅ 10⁻⁶",
      "vaporizationHeat": "63.9"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,-,1,-,-,-,-,-,-,-,-",
      "ionCharge": "1+",
      "ionizationPotential": "3.894",
      "atomicRadius": "298",
      "covalentRadius": "244",
      "vanDerWaalsRadius": "343"
    },
    "electromagnetic": {
      "electricalConductivity": "4878048.7804878",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "-5.26 ⋅ 10⁻⁶",
      "massMagneticSusceptibility": "2.8 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "3.72 ⋅ 10⁻¹⁰",
      "electricalResistivity": "2.05 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "6.140 Å",
      "debyeTemperature": "40.5",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID5354618",
      "rtecsNumber": "RTECSFK9225000",
      "brinellHardness": "0.15",
      "mohsHardness": "0.2",
      "bulkModulus": "1.6",
      "youngModulus": "1.7",
      "liquidDensity": "1.843",
      "molarVolume": "0.000070732",
      "thermalConductivity": "35.9"
    },
    "reactivity": {
      "electronegativity": "0.79",
      "electronAffinity": "45.505"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "29.0",
      "nfpaCube": "3,3,2,W"
    },
    "prevalence": {
      "universe": "8 ⋅ 10⁻⁸",
      "sun": "8 ⋅ 10⁻⁷",
      "ocean": "5 ⋅ 10⁻⁸",
      "humanBody": "2 ⋅ 10⁻⁶",
      "crust": "0.0003",
      "meteorites": "1.4 ⋅ 10⁻⁵"
    },
    "ghs": [
      "flammable",
      "corrosive",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 133,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=1gh5JJDvdiQ",
    "productionCountries": [
      { "country": "cn" },
      { "country": "ca" }
    ],
    "productionNote": { "ru": "В 2023 году официально не сообщалось о добыче цезия нигде в мире — прежние поллуцитовые месторождения в Зимбабве, Намибии и Австралии истощены или закрыты; только Китай и Канада (рудник Танко, эпизодически) вели недавнюю добычу, спрос покрывается в основном за счёт запасов.", "en": "No official cesium mine production was reported anywhere in 2023 — the main historic pollucite-ore mines in Zimbabwe, Namibia and Australia are depleted or closed; only China and Canada (Tanco mine, intermittent) had any recent extraction, with existing stockpiles supplying most current demand.", "zh": "2023年全球没有官方报告的铯矿开采——津巴布韦、纳米比亚和澳大利亚的主要历史铯榴石矿已枯竭或关闭；只有中国和加拿大（坦科矿，间歇性）有近期开采，现有库存供应了当前大部分需求。" }
  },
  "Ba": {
    "overview": {
      "latinName": "Barium",
      "englishName": "Barium",
      "discoveryYear": "1808",
      "casNumber": "CAS7440-39-3",
      "discoverer": { "ru": "Гемфри Дэви", "en": "Humphry Davy", "zh": "Humphry Davy" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#D0C8A0" }],
      "electronShellConfig": "K2-L8-M18-N18-O8-P2-Q0-R0",
      "electronCount": "56",
      "protonCount": "56",
      "neutronCount": "81",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p6 6s2"
    },
    "description": { "ru": "Мягкий серебристый щелочноземельный металл; активный, придаёт фейерверкам зелёный цвет.", "en": "A soft, silvery alkaline-earth metal; reactive and gives fireworks a green color.", "zh": "柔软银白色碱土金属；反应活泼，烟花呈绿色。" },
    "applications": { "ru": "Рентген-контраст, фейерверки, стекло, нефтедобыча", "en": "X-ray contrast, fireworks, glass, oil drilling", "zh": "X射线造影、烟花、玻璃、石油钻井" },
    "properties": {
      "atomicMass": "137.32667172235",
      "density": "3.62",
      "meltingPoint": "727.0",
      "boilingPoint": "1845.0",
      "valence": "2",
      "group": "6/II+",
      "block": "s",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "7.12",
      "specificHeat": "205",
      "thermalExpansion": "20.6 ⋅ 10⁻⁶",
      "vaporizationHeat": "142"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,-,-,-,-,-,-,-",
      "ionCharge": "2+",
      "ionizationPotential": "5.212",
      "atomicRadius": "253",
      "covalentRadius": "215",
      "vanDerWaalsRadius": "268"
    },
    "electromagnetic": {
      "electricalConductivity": "3012048.19277108",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "3.966 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "1.13 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "1.552 ⋅ 10⁻⁹",
      "electricalResistivity": "3.32 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "5.020 Å",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID5355457",
      "rtecsNumber": "RTECSCQ8370000",
      "mohsHardness": "1.25",
      "bulkModulus": "9.6",
      "youngModulus": "13.0",
      "liquidDensity": "3.338",
      "molarVolume": "0.000039125",
      "shearModulus": "4.9",
      "soundSpeed": "1620.0",
      "thermalConductivity": "18.4"
    },
    "reactivity": {
      "electronegativity": "0.89",
      "electronAffinity": "13.954"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "1.1",
      "nfpaCube": "1,2,2,W"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁶",
      "sun": "9.9 ⋅ 10⁻⁷",
      "ocean": "3 ⋅ 10⁻⁶",
      "humanBody": "3.139004745 ⋅ 10⁻⁵",
      "crust": "0.0425",
      "meteorites": "2.7 ⋅ 10⁻⁴"
    },
    "ghs": [
      "flammable",
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 138,
          "abundance": "71.698"
        },
        {
          "mass": 137,
          "abundance": "11.232"
        },
        {
          "mass": 136,
          "abundance": "7.854"
        },
        {
          "mass": 135,
          "abundance": "6.592"
        },
        {
          "mass": 134,
          "abundance": "2.417"
        },
        {
          "mass": 130,
          "abundance": "0.106"
        },
        {
          "mass": 132,
          "abundance": "0.101"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=R4Vzn9fmBLI",
    "productionCountries": [
      { "country": "in", "share": "32" },
      { "country": "cn", "share": "25" },
      { "country": "ma", "share": "12" },
      { "country": "kz", "share": "8" },
      { "country": "la" }
    ],
    "productionNote": { "ru": "Барий добывают как баритовую руду; Индия и Китай — ведущие производители, за ними следуют Марокко, Казахстан и Лаос.", "en": "Barium is mined as barite ore; India and China are the leading producers, followed by Morocco, Kazakhstan and Laos.", "zh": "钡以重晶石矿的形式开采；印度和中国是主要生产国，其次是摩洛哥、哈萨克斯坦和老挝。" }
  },
  "La": {
    "overview": {
      "latinName": "Lanthanum",
      "englishName": "Lanthanum",
      "discoveryYear": "1839",
      "casNumber": "CAS7439-91-0",
      "discoverer": { "ru": "Карл Густав Мосандер", "en": "Carl Gustaf Mosander", "zh": "Carl Gustaf Mosander" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N18-O9-P2-Q0-R0",
      "electronCount": "57",
      "protonCount": "57",
      "neutronCount": "82",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 5d1 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p6 5d1 6s2"
    },
    "description": { "ru": "Мягкий серебристый лантаноид; начало ряда редкоземельных элементов, активнее большинства лантаноидов.", "en": "A soft, silvery lanthanide; starts the rare-earth series and is more reactive than most lanthanides.", "zh": "柔软银白色镧系元素；稀土系列的开端，比多数镧系更活泼。" },
    "applications": { "ru": "Катализаторы НПЗ, оптика, NiMH-аккумуляторы", "en": "Oil refining catalysts, optics, NiMH batteries", "zh": "炼油催化剂、光学、镍氢电池" },
    "properties": {
      "atomicMass": "138.90547548286",
      "density": "6.146",
      "meltingPoint": "920.0",
      "boilingPoint": "3464.0",
      "valence": "3",
      "group": "6/III-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "6.2",
      "specificHeat": "195",
      "thermalExpansion": "5.1 ⋅ 10⁻⁶",
      "vaporizationHeat": "400.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "5.577",
      "atomicRadius": "195",
      "covalentRadius": "207",
      "vanDerWaalsRadius": "240"
    },
    "electromagnetic": {
      "electricalConductivity": "1626016.2601626",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "6.761 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "1.1 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "1.528 ⋅ 10⁻⁹",
      "electricalResistivity": "6.15 ⋅ 10⁻⁷",
      "superconductingTemperature": "4.88"
    },
    "grid": {
      "structureCode": "11",
      "gridParams": "a=3.772 Å; c=12.14 Å",
      "axialRatio": "3.22",
      "debyeTemperature": "135",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23926",
      "brinellHardness": "363.0",
      "mohsHardness": "2.5",
      "vickersHardness": "491.0",
      "bulkModulus": "27.9",
      "youngModulus": "36.6",
      "liquidDensity": "5.94",
      "molarVolume": "0.000022601",
      "poissonRatio": "0.28",
      "shearModulus": "14.3",
      "soundSpeed": "2475.0",
      "thermalConductivity": "13.4"
    },
    "reactivity": {
      "electronegativity": "1.1",
      "electronAffinity": "53.795"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "8.98",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁷",
      "sun": "2 ⋅ 10⁻⁷",
      "ocean": "3.4 ⋅ 10⁻¹⁰",
      "humanBody": "1.37 ⋅ 10⁻⁴",
      "crust": "0.0039",
      "meteorites": "2.8 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 139,
          "abundance": "99.91"
        },
        {
          "mass": 138,
          "abundance": "0.09"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=woTgDruJWkI",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "USGS учитывает добычу редкоземельных металлов как одну общую цифру; Китай доминирует в мировой добыче, за ним следуют США, Мьянма, Австралия и Таиланд.", "en": "USGS reports rare-earth mine production as one combined figure; China dominates world output, followed by the United States, Myanmar, Australia and Thailand.", "zh": "美国地质调查局将稀土矿产量作为一个合并数字统计；中国主导世界产量，其次是美国、缅甸、澳大利亚和泰国。" }
  },
  "Ce": {
    "overview": {
      "latinName": "Cerium",
      "englishName": "Cerium",
      "discoveryYear": "1803",
      "casNumber": "CAS7440-45-1",
      "discoverer": { "ru": "Мартин Генрих Клапрот, Йёнс Якоб Берцелиус, Вильгельм Хисингер", "en": "Martin Heinrich Klaproth, Jöns Jakob Berzelius, Wilhelm Hisinger", "zh": "Martin Heinrich Klaproth, Jöns Jakob Berzelius, Wilhelm Hisinger" },
      "discoveryCountry": "DE, SE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N19-O9-P2-Q0-R0",
      "electronCount": "58",
      "protonCount": "58",
      "neutronCount": "82",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f1 5d1 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f2 5s2 5p6 6s2"
    },
    "description": { "ru": "Серебристый лантаноид; самый распространённый редкозем, легко окисляется, соединения бледно-жёлтые.", "en": "A silvery lanthanide; most abundant rare earth, easily oxidizes and forms pale yellow compounds.", "zh": "银白色镧系元素；最丰富的稀土，易氧化，化合物呈淡黄色。" },
    "applications": { "ru": "Автокатализаторы, полировка стекла, люминофоры", "en": "Auto catalysts, glass polishing, phosphors", "zh": "汽车催化剂、玻璃抛光、荧光粉" },
    "properties": {
      "atomicMass": "140.115695483639",
      "density": "6.77",
      "meltingPoint": "795.0",
      "boilingPoint": "3443.0",
      "valence": "3, 4",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "5.46",
      "specificHeat": "192",
      "thermalExpansion": "6.3 ⋅ 10⁻⁶",
      "vaporizationHeat": "398.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,4,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "5.539",
      "atomicRadius": "181.8",
      "covalentRadius": "204",
      "vanDerWaalsRadius": "235"
    },
    "electromagnetic": {
      "electricalConductivity": "1207729.46859903",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "0.0014716",
      "massMagneticSusceptibility": "2.2 ⋅ 10⁻⁷",
      "molarMagneticSusceptibility": "3.0826 ⋅ 10⁻⁸",
      "electricalResistivity": "8.28 ⋅ 10⁻⁷",
      "superconductingTemperature": "0.022"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "5.160 Å",
      "debyeTemperature": "138",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23974",
      "brinellHardness": "412.0",
      "mohsHardness": "2.5",
      "vickersHardness": "270.0",
      "bulkModulus": "21.5",
      "youngModulus": "33.6",
      "liquidDensity": "6.55",
      "molarVolume": "0.000020947",
      "poissonRatio": "0.24",
      "shearModulus": "13.5",
      "soundSpeed": "2100.0",
      "thermalConductivity": "11.3"
    },
    "reactivity": {
      "electronegativity": "1.12",
      "electronAffinity": "55.0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.6",
      "nfpaCube": "3,2,2,-"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁶",
      "sun": "4 ⋅ 10⁻⁷",
      "ocean": "1.2 ⋅ 10⁻¹⁰",
      "humanBody": "5.707281354 ⋅ 10⁻⁵",
      "crust": "0.00665",
      "meteorites": "7.5 ⋅ 10⁻⁵"
    },
    "ghs": [
      "flammable",
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 140,
          "abundance": "88.450"
        },
        {
          "mass": 142,
          "abundance": "11.114"
        },
        {
          "mass": 138,
          "abundance": "0.251"
        },
        {
          "mass": 136,
          "abundance": "0.185"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=2_-PT3ipxG8",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Церий добывают вместе с другими редкоземельными металлами; Китай доминирует в мировой добыче, за ним следуют США, Мьянма, Австралия и Таиланд.", "en": "Cerium is extracted alongside other rare earths; China dominates world rare-earth mine production, followed by the United States, Myanmar, Australia and Thailand.", "zh": "铈与其他稀土元素一同提取；中国主导世界稀土矿产量，其次是美国、缅甸、澳大利亚和泰国。" }
  },
  "Pr": {
    "overview": {
      "latinName": "Praseodymium",
      "englishName": "Praseodymium",
      "discoveryYear": "1885",
      "casNumber": "CAS7440-10-0",
      "discoverer": { "ru": "Карл Ауэр фон Вельсбах", "en": "Carl Auer von Welsbach", "zh": "Carl Auer von Welsbach" },
      "discoveryCountry": "AT",
      "sampleColors": [{ "hex": "#9A9A96" }],
      "electronShellConfig": "K2-L8-M18-N21-O8-P2-Q0-R0",
      "electronCount": "59",
      "protonCount": "59",
      "neutronCount": "82",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f3 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f3 5s2 5p6 6s2"
    },
    "description": { "ru": "Мягкий серебристый лантаноид; покрывается зелёной оксидной плёнкой на воздухе.", "en": "A soft, silvery lanthanide; develops a green oxide coating in air.", "zh": "柔软银白色镧系元素；在空气中形成绿色氧化层。" },
    "applications": { "ru": "Магниты, оптическое стекло, катализаторы", "en": "Magnets, optical glass, catalysts", "zh": "磁铁、光学玻璃、催化剂" },
    "properties": {
      "atomicMass": "140.907659640811",
      "density": "6.77",
      "meltingPoint": "935.0",
      "boilingPoint": "3130.0",
      "valence": "3",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "6.89",
      "specificHeat": "193",
      "thermalExpansion": "4.5 ⋅ 10⁻⁶",
      "vaporizationHeat": "331.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,4,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "5.464",
      "atomicRadius": "247",
      "covalentRadius": "203",
      "vanDerWaalsRadius": "239"
    },
    "electromagnetic": {
      "electricalConductivity": "1428571.42857143",
      "electricalType": "2",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "0.0028087",
      "massMagneticSusceptibility": "4.23 ⋅ 10⁻⁷",
      "molarMagneticSusceptibility": "5.9604 ⋅ 10⁻⁸",
      "electricalResistivity": "7 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "11",
      "gridParams": "a=3.673 Å; c=11.84 Å",
      "axialRatio": "3.22",
      "debyeTemperature": "152",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23942",
      "brinellHardness": "481.0",
      "mohsHardness": "1.41",
      "vickersHardness": "400.0",
      "bulkModulus": "28.8",
      "youngModulus": "37.3",
      "liquidDensity": "6.5",
      "molarVolume": "0.000021221",
      "poissonRatio": "0.28",
      "shearModulus": "14.8",
      "soundSpeed": "2280.0",
      "thermalConductivity": "12.5"
    },
    "reactivity": {
      "electronegativity": "1.13",
      "electronAffinity": "10.539"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "11.5",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁷",
      "sun": "1 ⋅ 10⁻⁷",
      "ocean": "6.0 ⋅ 10⁻¹¹",
      "crust": "0.00092",
      "meteorites": "9.8 ⋅ 10⁻⁶"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 141,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=9qk3KEkEtcc",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Празеодим добывают вместе с другими редкоземельными металлами; Китай доминирует в мировой добыче, за ним следуют США, Мьянма, Австралия и Таиланд.", "en": "Praseodymium is extracted alongside other rare earths; China dominates world rare-earth mine production, followed by the United States, Myanmar, Australia and Thailand.", "zh": "镨与其他稀土元素一同提取；中国主导世界稀土矿产量，其次是美国、缅甸、澳大利亚和泰国。" }
  },
  "Nd": {
    "overview": {
      "latinName": "Neodymium",
      "englishName": "Neodymium",
      "discoveryYear": "1885",
      "casNumber": "CAS7440-00-8",
      "discoverer": { "ru": "Карл Ауэр фон Вельсбах", "en": "Carl Auer von Welsbach", "zh": "Carl Auer von Welsbach" },
      "discoveryCountry": "AT",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N22-O8-P2-Q0-R0",
      "electronCount": "60",
      "protonCount": "60",
      "neutronCount": "84",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f4 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f4 5s2 5p6 6s2"
    },
    "description": { "ru": "Серебристый лантаноид; быстро реагирует с кислородом, основа мощнейших постоянных магнитов (сплав NdFeB).", "en": "A silvery lanthanide; reacts quickly with oxygen, the basis of the strongest permanent magnets (NdFeB alloy).", "zh": "银白色镧系元素；与氧反应迅速，是最强永磁体的核心成分（钕铁硼合金）。" },
    "applications": { "ru": "Неодимовые магниты, лазеры, оптическое стекло", "en": "Neodymium magnets, lasers, optical glass", "zh": "钕磁铁、激光、光学玻璃" },
    "properties": {
      "atomicMass": "144.241585785245",
      "density": "7.01",
      "meltingPoint": "1024.0",
      "boilingPoint": "3074.0",
      "valence": "3, 4",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "7.14",
      "specificHeat": "190",
      "thermalExpansion": "6.7 ⋅ 10⁻⁶",
      "vaporizationHeat": "289.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,4,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "5.525",
      "atomicRadius": "206",
      "covalentRadius": "201",
      "vanDerWaalsRadius": "229"
    },
    "electromagnetic": {
      "electricalConductivity": "1555209.9533437",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "0.0033648",
      "massMagneticSusceptibility": "4.8 ⋅ 10⁻⁷",
      "molarMagneticSusceptibility": "6.9235 ⋅ 10⁻⁸",
      "electricalResistivity": "6.43 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "11",
      "gridParams": "a=3.658 Å; c=11.80 Å",
      "axialRatio": "3.23",
      "debyeTemperature": "163",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23934",
      "rtecsNumber": "RTECSQO8575000",
      "brinellHardness": "265.0",
      "mohsHardness": "1.23",
      "vickersHardness": "343.0",
      "bulkModulus": "31.8",
      "youngModulus": "41.4",
      "liquidDensity": "6.89",
      "molarVolume": "0.000020577",
      "poissonRatio": "0.28",
      "shearModulus": "16.3",
      "soundSpeed": "2330.0",
      "thermalConductivity": "16.5"
    },
    "reactivity": {
      "electronegativity": "1.14",
      "electronAffinity": "9.406"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "50.5",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁶",
      "sun": "3 ⋅ 10⁻⁷",
      "ocean": "2.8 ⋅ 10⁻¹⁰",
      "crust": "0.00415",
      "meteorites": "5.0 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 142,
          "abundance": "27.2"
        },
        {
          "mass": 144,
          "abundance": "23.8"
        },
        {
          "mass": 146,
          "abundance": "17.2"
        },
        {
          "mass": 143,
          "abundance": "12.174"
        },
        {
          "mass": 145,
          "abundance": "8.293"
        },
        {
          "mass": 148,
          "abundance": "5.756"
        },
        {
          "mass": 150,
          "abundance": "5.638"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=W-j4sSmrvcs",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Неодим добывают вместе с другими редкоземельными металлами; Китай доминирует в мировой добыче, за ним следуют США, Мьянма, Австралия и Таиланд.", "en": "Neodymium is extracted alongside other rare earths; China dominates world rare-earth mine production, followed by the United States, Myanmar, Australia and Thailand.", "zh": "钕与其他稀土元素一同提取；中国主导世界稀土矿产量，其次是美国、缅甸、澳大利亚和泰国。" }
  },
  "Pm": {
    "overview": {
      "latinName": "Promethium",
      "englishName": "Promethium",
      "discoveryYear": "1945",
      "casNumber": "CAS7440-12-2",
      "discoverer": { "ru": "Джейкоб Маринский, Лоуренс Гленденин, Чарльз Кориелл", "en": "Jacob A. Marinsky, Lawrence E. Glendenin, Charles D. Coryell", "zh": "Jacob A. Marinsky, Lawrence E. Glendenin, Charles D. Coryell" },
      "discoveryCountry": "US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N23-O8-P2-Q0-R0",
      "electronCount": "61",
      "protonCount": "61",
      "neutronCount": "84",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f5 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f5 5s2 5p6 6s2"
    },
    "description": { "ru": "Радиоактивный лантаноид; все изотопы нестабильны, некоторые соединения слабо светятся голубым.", "en": "A radioactive lanthanide; all isotopes unstable, glows faintly blue in some compounds.", "zh": "放射性镧系元素；所有同位素不稳定，某些化合物发微弱蓝光。" },
    "applications": { "ru": "Ядерные батареи, люминесцентные краски", "en": "Nuclear batteries, luminous paint", "zh": "核电池、发光涂料" },
    "properties": {
      "atomicMass": "145.229483134757",
      "density": "7.26",
      "meltingPoint": "1042.0",
      "boilingPoint": "3000.0",
      "valence": "3",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "7.13",
      "thermalExpansion": "11 ⋅ 10⁻⁶",
      "vaporizationHeat": "289.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "5.582",
      "atomicRadius": "205",
      "covalentRadius": "199",
      "vanDerWaalsRadius": "236"
    },
    "electromagnetic": {
      "electricalConductivity": "1333333.33333333",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "electricalResistivity": "7.5 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "11",
      "gridParams": "a=3.65 Å; c=11.65 Å",
      "axialRatio": "3.19",
      "debyeTemperature": "163",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "bulkModulus": "33.0",
      "youngModulus": "46.0",
      "molarVolume": "1.996145374449e-05",
      "poissonRatio": "0.28",
      "shearModulus": "18.0",
      "thermalConductivity": "17.9"
    },
    "reactivity": {
      "electronegativity": "1.13",
      "electronAffinity": "12.45"
    },
    "nucleus": {
      "halfLife": "2.6234/1",
      "lifetime": "3.7855/1",
      "neutronCrossSection": "8400.0",
      "nfpaCube": "1,4,2,W+RAD"
    },
    "prevalence": {},
    "ghs": [
      "flammable",
      "acuteToxicity",
      "healthHazard"
    ],
    "radiacodeIsotope": {
      "isotope": "¹⁴⁷Pm",
      "slug": "pm-147"
    },
    "isotopes": {
      "decay": "betaMinus",
      "isotopes": [
        {
          "mass": 145
        },
        {
          "mass": 147
        }
      ]
    },
    "productionCountries": [
      { "country": "us" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "У прометия нет стабильных изотопов, он не добывается в виде руды; в природе встречается лишь в следовых количествах как продукт деления урана, промышленно производится в реакторах — Национальная лаборатория Ок-Ридж (США) возобновила заметное производство в 2024 году, Россия также нарабатывает его в исследовательских реакторах.", "en": "Promethium has no stable isotopes and isn't mined as an ore; it occurs in nature only in trace amounts from uranium fission, and is produced in reactors — Oak Ridge National Laboratory (US) resumed meaningful production in 2024, and Russia also produces it in research reactors.", "zh": "钷没有稳定同位素，不以矿石形式开采；它在自然界中仅以铀裂变产生的痕量存在，在反应堆中生产——美国橡树岭国家实验室于2024年恢复了有意义的产量，俄罗斯也在研究堆中生产钷。" }
  },
  "Sm": {
    "overview": {
      "latinName": "Samarium",
      "englishName": "Samarium",
      "discoveryYear": "1879",
      "casNumber": "CAS7440-19-9",
      "discoverer": { "ru": "Поль Эмиль Лекок де Буабодран", "en": "Paul Emile Lecoq de Boisbaudran", "zh": "Paul Emile Lecoq de Boisbaudran" },
      "discoveryCountry": "FR",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N24-O8-P2-Q0-R0",
      "electronCount": "62",
      "protonCount": "62",
      "neutronCount": "88",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f6 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f6 5s2 5p6 6s2"
    },
    "description": { "ru": "Серебристый лантаноид; умеренно твёрдый, используется в магнитах и стержнях управления реакторами.", "en": "A silvery lanthanide; moderately hard and used in magnets and reactor control rods.", "zh": "银白色镧系元素；中等硬度，用于磁体和反应堆控制棒。" },
    "applications": { "ru": "Магниты, контроль ядерных реакторов, лазеры", "en": "Magnets, reactor control, lasers", "zh": "磁铁、反应堆控制、激光" },
    "properties": {
      "atomicMass": "150.364653219894",
      "density": "7.52",
      "meltingPoint": "1072.0",
      "boilingPoint": "1794.0",
      "valence": "2, 3",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "8.62",
      "specificHeat": "196",
      "thermalExpansion": "12.7 ⋅ 10⁻⁶",
      "vaporizationHeat": "192.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,-,-,-,-,-,-",
      "ionCharge": "2+, 3+",
      "ionizationPotential": "5.644",
      "atomicRadius": "238",
      "covalentRadius": "198",
      "vanDerWaalsRadius": "229"
    },
    "electromagnetic": {
      "electricalConductivity": "1063829.78723404",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "8.1618 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "1.11 ⋅ 10⁻⁷",
      "molarMagneticSusceptibility": "1.669 ⋅ 10⁻⁸",
      "electricalResistivity": "9.4 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "5",
      "gridParams": "a(H)=3.621 Å; c(H)=26.25 Å",
      "axialRatio": "7.25",
      "debyeTemperature": "169",
      "spaceGroup": "R_ 3m",
      "spaceGroupNumber": "166"
    },
    "additional": {
      "pubchemCid": "CID23951",
      "brinellHardness": "441.0",
      "mohsHardness": "1.44",
      "vickersHardness": "412.0",
      "bulkModulus": "37.8",
      "youngModulus": "49.7",
      "liquidDensity": "7.16",
      "molarVolume": "0.000020449",
      "poissonRatio": "0.27",
      "shearModulus": "19.5",
      "soundSpeed": "2130.0",
      "thermalConductivity": "13.3"
    },
    "reactivity": {
      "electronegativity": "1.17",
      "electronAffinity": "15.63"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "5900.0",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "5 ⋅ 10⁻⁷",
      "sun": "1 ⋅ 10⁻⁷",
      "ocean": "4.5 ⋅ 10⁻¹¹",
      "humanBody": "7.134102 ⋅ 10⁻⁸",
      "crust": "6.0 ⋅ 10⁻⁴",
      "meteorites": "1.7 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 154,
          "abundance": "22.75"
        },
        {
          "mass": 152,
          "abundance": "26.75"
        },
        {
          "mass": 144,
          "abundance": "3.07"
        },
        {
          "mass": 147,
          "abundance": "14.99"
        },
        {
          "mass": 149,
          "abundance": "13.82"
        },
        {
          "mass": 148,
          "abundance": "11.24"
        },
        {
          "mass": 150,
          "abundance": "7.38"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=kAFN1KWIh6A",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Самарий добывают вместе с другими редкоземельными металлами; Китай доминирует в мировой добыче, за ним следуют США, Мьянма, Австралия и Таиланд.", "en": "Samarium is extracted alongside other rare earths; China dominates world rare-earth mine production, followed by the United States, Myanmar, Australia and Thailand.", "zh": "钐与其他稀土元素一同提取；中国主导世界稀土矿产量，其次是美国、缅甸、澳大利亚和泰国。" }
  },
  "Eu": {
    "overview": {
      "latinName": "Europium",
      "englishName": "Europium",
      "discoveryYear": "1901",
      "casNumber": "CAS7440-53-1",
      "discoverer": { "ru": "Демарсе Эжен Анатоль", "en": "Eugène-Anatole Demarçay", "zh": "Eugène-Anatole Demarçay" },
      "discoveryCountry": "FR",
      "sampleColors": [{ "hex": "#D0C8A0" }],
      "electronShellConfig": "K2-L8-M18-N25-O8-P2-Q0-R0",
      "electronCount": "63",
      "protonCount": "63",
      "neutronCount": "89",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f7 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f7 5s2 5p6 6s2"
    },
    "description": { "ru": "Мягкий серебристый лантаноид; самый активный из редкоземельных, быстро покрывается патиной.", "en": "A soft, silvery lanthanide; most reactive of the rare earths, tarnishes quickly in air.", "zh": "柔软银白色镧系元素；稀土中最活泼，在空气中迅速失光。" },
    "applications": { "ru": "Люминофоры дисплеев, люминесцентные лампы", "en": "Display phosphors, fluorescent lamps", "zh": "显示荧光粉、荧光灯" },
    "properties": {
      "atomicMass": "151.964376904171",
      "density": "5.244",
      "meltingPoint": "822.0",
      "boilingPoint": "1529.0",
      "valence": "2, 3",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "9.21",
      "specificHeat": "182",
      "thermalExpansion": "35 ⋅ 10⁻⁶",
      "vaporizationHeat": "176.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,-,-,-,-,-,-",
      "ionCharge": "2+, 3+",
      "ionizationPotential": "5.670",
      "atomicRadius": "231",
      "covalentRadius": "198",
      "vanDerWaalsRadius": "233"
    },
    "electromagnetic": {
      "electricalConductivity": "1111111.11111111",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "0.0014473",
      "massMagneticSusceptibility": "2.76 ⋅ 10⁻⁷",
      "molarMagneticSusceptibility": "4.1942 ⋅ 10⁻⁸",
      "electricalResistivity": "9 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "4.581 Å",
      "debyeTemperature": "118",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID23981",
      "mohsHardness": "3.07",
      "vickersHardness": "167.0",
      "bulkModulus": "8.3",
      "youngModulus": "18.2",
      "liquidDensity": "5.13",
      "molarVolume": "0.000028979",
      "poissonRatio": "0.15",
      "shearModulus": "7.9",
      "thermalConductivity": "13.9"
    },
    "reactivity": {
      "electronegativity": "1.20",
      "electronAffinity": "11.2"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "4570.0",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "5 ⋅ 10⁻⁸",
      "sun": "5 ⋅ 10⁻⁸",
      "ocean": "1.3 ⋅ 10⁻¹¹",
      "crust": "2.0 ⋅ 10⁻⁴",
      "meteorites": "5.9 ⋅ 10⁻⁶"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 153,
          "abundance": "52.19"
        },
        {
          "mass": 151,
          "abundance": "47.81"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=gAXR2nM410Q",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Европий добывают вместе с другими редкоземельными металлами; Китай доминирует в мировой добыче, за ним следуют США, Мьянма, Австралия и Таиланд.", "en": "Europium is extracted alongside other rare earths; China dominates world rare-earth mine production, followed by the United States, Myanmar, Australia and Thailand.", "zh": "铕与其他稀土元素一同提取；中国主导世界稀土矿产量，其次是美国、缅甸、澳大利亚和泰国。" }
  },
  "Gd": {
    "overview": {
      "latinName": "Gadolinium",
      "englishName": "Gadolinium",
      "discoveryYear": "1880",
      "casNumber": "CAS7440-54-2",
      "discoverer": { "ru": "Жан Шарль Галиссар де Мариньяк", "en": "Jean Charles Galissard de Marignac", "zh": "Jean Charles Galissard de Marignac" },
      "discoveryCountry": "CH",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N25-O9-P2-Q0-R0",
      "electronCount": "64",
      "protonCount": "64",
      "neutronCount": "93",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f7 5d1 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f7 5s2 5p6 5d1 6s2"
    },
    "description": { "ru": "Серебристо-белый лантаноид; ферромагнитен, применяется в контрастных средствах для МРТ.", "en": "A silvery-white lanthanide; ferromagnetic and used in MRI contrast agents.", "zh": "银白色镧系元素；铁磁性，用于MRI造影剂。" },
    "applications": { "ru": "МРТ-контраст, ядерные реакторы, магниты", "en": "MRI contrast, nuclear reactors, magnets", "zh": "核磁共振造影、核反应堆、磁铁" },
    "properties": {
      "atomicMass": "157.252129498784",
      "density": "7.90",
      "meltingPoint": "1312.0",
      "boilingPoint": "3273.0",
      "valence": "3",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "10.05",
      "specificHeat": "240",
      "thermalExpansion": "9.4 ⋅ 10⁻⁶",
      "vaporizationHeat": "301.3"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "6.150",
      "atomicRadius": "233",
      "covalentRadius": "196",
      "vanDerWaalsRadius": "237"
    },
    "electromagnetic": {
      "electricalConductivity": "763358.778625954",
      "electricalType": "1",
      "magneticType": "ferromagnetic",
      "electricalResistivity": "1.31 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=3.636 Å; c=5.783 Å",
      "axialRatio": "1.590",
      "debyeTemperature": "182",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23982",
      "rtecsNumber": "RTECSLW3850000",
      "mohsHardness": "5.13",
      "vickersHardness": "570.0",
      "bulkModulus": "37.9",
      "youngModulus": "54.8",
      "liquidDensity": "7.4",
      "molarVolume": "0.000019903",
      "poissonRatio": "0.26",
      "shearModulus": "21.8",
      "soundSpeed": "2680.0",
      "thermalConductivity": "10.6"
    },
    "reactivity": {
      "electronegativity": "1.2",
      "electronAffinity": "13.22"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "49000.0",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁷",
      "sun": "2 ⋅ 10⁻⁷",
      "ocean": "7 ⋅ 10⁻¹¹",
      "crust": "6.2 ⋅ 10⁻⁴",
      "meteorites": "2.3 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 158,
          "abundance": "24.84"
        },
        {
          "mass": 160,
          "abundance": "21.86"
        },
        {
          "mass": 156,
          "abundance": "20.47"
        },
        {
          "mass": 157,
          "abundance": "15.65"
        },
        {
          "mass": 155,
          "abundance": "14.80"
        },
        {
          "mass": 154,
          "abundance": "2.18"
        },
        {
          "mass": 152,
          "abundance": "0.20"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=mQWWeDY2k3w",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Гадолиний добывают вместе с другими редкоземельными металлами; Китай доминирует в мировой добыче, за ним следуют США, Мьянма, Австралия и Таиланд.", "en": "Gadolinium is extracted alongside other rare earths; China dominates world rare-earth mine production, followed by the United States, Myanmar, Australia and Thailand.", "zh": "钆与其他稀土元素一同提取；中国主导世界稀土矿产量，其次是美国、缅甸、澳大利亚和泰国。" }
  },
  "Tb": {
    "overview": {
      "latinName": "Terbium",
      "englishName": "Terbium",
      "discoveryYear": "1843",
      "casNumber": "CAS7440-27-9",
      "discoverer": { "ru": "Карл Густав Мосандер", "en": "Carl Gustaf Mosander", "zh": "Carl Gustaf Mosander" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N27-O8-P2-Q0-R0",
      "electronCount": "65",
      "protonCount": "65",
      "neutronCount": "94",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f9 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f8 5s2 5p6 5d1 6s2"
    },
    "description": { "ru": "Серебристый лантаноид; ковкий, умеренно активный, используется в зелёных люминофорах.", "en": "A silvery lanthanide; malleable, moderately reactive, and used in green phosphors.", "zh": "银白色镧系元素；有延展性，中等活泼，用于绿色荧光粉。" },
    "applications": { "ru": "Люминофоры, магнитострикционные сплавы, лазеры", "en": "Phosphors, magnetostrictive alloys, lasers", "zh": "荧光粉、磁致伸缩合金、激光" },
    "properties": {
      "atomicMass": "158.925353687351",
      "density": "8.23",
      "meltingPoint": "1356.0",
      "boilingPoint": "3230.0",
      "valence": "3, 4",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "10.15",
      "specificHeat": "182",
      "thermalExpansion": "10.3 ⋅ 10⁻⁶",
      "vaporizationHeat": "295.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,1,2,3,4,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "5.864",
      "atomicRadius": "225",
      "covalentRadius": "194",
      "vanDerWaalsRadius": "221"
    },
    "electromagnetic": {
      "electricalConductivity": "869565.217391304",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "0.1117784",
      "massMagneticSusceptibility": "1.36 ⋅ 10⁻⁵",
      "molarMagneticSusceptibility": "2.161385 ⋅ 10⁻⁶",
      "electricalResistivity": "1.15 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=3.600 Å; c=5.694 Å",
      "axialRatio": "1.582",
      "debyeTemperature": "176",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23958",
      "brinellHardness": "677.0",
      "mohsHardness": "2.33",
      "vickersHardness": "863.0",
      "bulkModulus": "38.7",
      "youngModulus": "55.7",
      "liquidDensity": "7.65",
      "molarVolume": "0.000019336",
      "poissonRatio": "0.26",
      "shearModulus": "22.1",
      "soundSpeed": "2620.0",
      "thermalConductivity": "11.1"
    },
    "reactivity": {
      "electronegativity": "1.2",
      "electronAffinity": "12.67"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "23.0",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "5 ⋅ 10⁻⁸",
      "sun": "1 ⋅ 10⁻⁸",
      "ocean": "1.4 ⋅ 10⁻¹¹",
      "crust": "1.2 ⋅ 10⁻⁴",
      "meteorites": "3.9 ⋅ 10⁻⁶"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 159,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=TKS7eJdRvgw",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Тербий — тяжёлый редкоземельный элемент, сосредоточенный в ионно-адсорбционных глинах Китая; Мьянма — крупный дополнительный источник руды для китайских переработчиков.", "en": "Terbium is a heavy rare earth concentrated in China's ion-adsorption clay deposits, with Myanmar a major supplementary ore source feeding Chinese processors.", "zh": "铽是一种重稀土元素，集中于中国的离子吸附型粘土矿床，缅甸是供应中国加工商的重要补充矿石来源。" }
  },
  "Dy": {
    "overview": {
      "latinName": "Dysprosium",
      "englishName": "Dysprosium",
      "discoveryYear": "1886",
      "casNumber": "CAS7429-91-6",
      "discoverer": { "ru": "Поль Эмиль Лекок де Буабодран", "en": "Paul Emile Lecoq de Boisbaudran", "zh": "Paul Emile Lecoq de Boisbaudran" },
      "discoveryCountry": "FR",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N28-O8-P2-Q0-R0",
      "electronCount": "66",
      "protonCount": "66",
      "neutronCount": "96",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f10 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f10 5s2 5p6 6s2"
    },
    "description": { "ru": "Серебристый лантаноид; обладает одним из самых высоких магнитных моментов среди природных элементов.", "en": "A silvery lanthanide; has one of the highest magnetic moments among naturally occurring elements.", "zh": "银白色镧系元素；天然元素中磁矩最大之一。" },
    "applications": { "ru": "Магниты, лазеры, ядерная физика", "en": "Magnets, lasers, nuclear physics", "zh": "磁铁、激光、核物理" },
    "properties": {
      "atomicMass": "162.49947173356",
      "density": "8.54",
      "meltingPoint": "1407.0",
      "boilingPoint": "2567.0",
      "valence": "3",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "11.06",
      "specificHeat": "167",
      "thermalExpansion": "9.9 ⋅ 10⁻⁶",
      "vaporizationHeat": "280.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,4,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "5.939",
      "atomicRadius": "228",
      "covalentRadius": "192",
      "vanDerWaalsRadius": "229"
    },
    "electromagnetic": {
      "electricalConductivity": "1079913.60691145",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "0.046603",
      "massMagneticSusceptibility": "5.45 ⋅ 10⁻⁶",
      "molarMagneticSusceptibility": "8.85625 ⋅ 10⁻⁷",
      "electricalResistivity": "9.26 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=3.593 Å; c=5.654 Å",
      "axialRatio": "1.574",
      "debyeTemperature": "183",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23912",
      "brinellHardness": "500.0",
      "mohsHardness": "1.8",
      "vickersHardness": "540.0",
      "bulkModulus": "40.5",
      "youngModulus": "61.4",
      "liquidDensity": "8.37",
      "molarVolume": "0.000019004",
      "poissonRatio": "0.25",
      "shearModulus": "24.7",
      "soundSpeed": "2710.0",
      "thermalConductivity": "10.7"
    },
    "reactivity": {
      "electronegativity": "1.22",
      "electronAffinity": "33.96"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "950.0",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁷",
      "sun": "2 ⋅ 10⁻⁷",
      "ocean": "9.1 ⋅ 10⁻¹¹",
      "crust": "5.2 ⋅ 10⁻⁴",
      "meteorites": "2.7 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 164,
          "abundance": "28.260"
        },
        {
          "mass": 163,
          "abundance": "24.896"
        },
        {
          "mass": 162,
          "abundance": "25.475"
        },
        {
          "mass": 161,
          "abundance": "18.889"
        },
        {
          "mass": 160,
          "abundance": "2.329"
        },
        {
          "mass": 158,
          "abundance": "0.095"
        },
        {
          "mass": 156,
          "abundance": "0.056"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=PZS8FZyIFrA",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Диспрозий — тяжёлый редкоземельный элемент, сосредоточенный в ионно-адсорбционных глинах Китая; Мьянма — крупный дополнительный источник руды для китайских переработчиков.", "en": "Dysprosium is a heavy rare earth concentrated in China's ion-adsorption clay deposits, with Myanmar a major supplementary ore source feeding Chinese processors.", "zh": "镝是一种重稀土元素，集中于中国的离子吸附型粘土矿床，缅甸是供应中国加工商的重要补充矿石来源。" }
  },
  "Ho": {
    "overview": {
      "latinName": "Holmium",
      "englishName": "Holmium",
      "discoveryYear": "1878",
      "casNumber": "CAS7440-60-0",
      "discoverer": { "ru": "Пер Теодор Клеве, Луи Соре, Марк Делафонтен", "en": "Per Teodor Cleve, Louis Soret, Marc Delafontaine", "zh": "Per Teodor Cleve, Louis Soret, Marc Delafontaine" },
      "discoveryCountry": "SE, CH",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N29-O8-P2-Q0-R0",
      "electronCount": "67",
      "protonCount": "67",
      "neutronCount": "98",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f11 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f11 5s2 5p6 6s2"
    },
    "description": { "ru": "Серебристый лантаноид; относительно устойчив на воздухе по сравнению с другими редкоземами.", "en": "A silvery lanthanide; relatively stable in air compared with other rare earths.", "zh": "银白色镧系元素；相比其他稀土在空气中较稳定。" },
    "applications": { "ru": "Лазеры, магниты, калибровка спектрометров", "en": "Lasers, magnets, spectrometer calibration", "zh": "激光、磁铁、光谱仪校准" },
    "properties": {
      "atomicMass": "164.930329134847",
      "density": "8.79",
      "meltingPoint": "1472.0",
      "boilingPoint": "2700.0",
      "valence": "3",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "17.0",
      "specificHeat": "165",
      "thermalExpansion": "11.2 ⋅ 10⁻⁶",
      "vaporizationHeat": "251.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "6.022",
      "atomicRadius": "226",
      "covalentRadius": "192",
      "vanDerWaalsRadius": "216"
    },
    "electromagnetic": {
      "electricalConductivity": "1228501.22850123",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "0.0482845",
      "massMagneticSusceptibility": "5.49 ⋅ 10⁻⁶",
      "molarMagneticSusceptibility": "9.05467 ⋅ 10⁻⁷",
      "electricalResistivity": "8.14 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=3.577 Å; c=5.616 Å",
      "axialRatio": "1.570",
      "debyeTemperature": "190",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23988",
      "brinellHardness": "746.0",
      "mohsHardness": "1.65",
      "vickersHardness": "481.0",
      "bulkModulus": "40.2",
      "youngModulus": "64.8",
      "liquidDensity": "8.34",
      "molarVolume": "0.000018753",
      "poissonRatio": "0.23",
      "shearModulus": "26.3",
      "soundSpeed": "2760.0",
      "thermalConductivity": "16.2"
    },
    "reactivity": {
      "electronegativity": "1.23",
      "electronAffinity": "32.61"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "64.7",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "5 ⋅ 10⁻⁸",
      "ocean": "2.2 ⋅ 10⁻¹¹",
      "crust": "1.3 ⋅ 10⁻⁴",
      "meteorites": "5.9 ⋅ 10⁻⁶"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 165,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=xf6lhjW21gU",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Гольмий добывают вместе с другими редкоземельными металлами; Китай доминирует в мировой добыче, за ним следуют США, Мьянма, Австралия и Таиланд.", "en": "Holmium is extracted alongside other rare earths; China dominates world rare-earth mine production, followed by the United States, Myanmar, Australia and Thailand.", "zh": "钬与其他稀土元素一同提取；中国主导世界稀土矿产量，其次是美国、缅甸、澳大利亚和泰国。" }
  },
  "Er": {
    "overview": {
      "latinName": "Erbium",
      "englishName": "Erbium",
      "discoveryYear": "1843",
      "casNumber": "CAS7440-52-0",
      "discoverer": { "ru": "Карл Густав Мосандер", "en": "Carl Gustaf Mosander", "zh": "Carl Gustaf Mosander" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N30-O8-P2-Q0-R0",
      "electronCount": "68",
      "protonCount": "68",
      "neutronCount": "99",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f12 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f12 5s2 5p6 6s2"
    },
    "description": { "ru": "Серебристый лантаноид; ионы Er³⁺ розового цвета используются в лазерах и оптоволокне.", "en": "A silvery lanthanide; pink-colored Er³⁺ ions are used in lasers and fiber optics.", "zh": "银白色镧系元素；Er³⁺离子呈粉红色，用于激光和光纤。" },
    "applications": { "ru": "Оптоволокно, лазеры, металлургия", "en": "Fiber optics, lasers, metallurgy", "zh": "光纤、激光、冶金" },
    "properties": {
      "atomicMass": "167.259084222944",
      "density": "9.066",
      "meltingPoint": "1529.0",
      "boilingPoint": "2868.0",
      "valence": "3",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "19.9",
      "specificHeat": "168",
      "thermalExpansion": "12.2 ⋅ 10⁻⁶",
      "vaporizationHeat": "280.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "6.108",
      "atomicRadius": "226",
      "covalentRadius": "189",
      "vanDerWaalsRadius": "235"
    },
    "electromagnetic": {
      "electricalConductivity": "1162790.69767442",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "0.0341788",
      "massMagneticSusceptibility": "3.77 ⋅ 10⁻⁶",
      "molarMagneticSusceptibility": "6.30566 ⋅ 10⁻⁷",
      "electricalResistivity": "8.6 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=3.560 Å; c=5.587 Å",
      "axialRatio": "1.570",
      "debyeTemperature": "188",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23980",
      "brinellHardness": "814.0",
      "mohsHardness": "1.97",
      "vickersHardness": "430–700",
      "bulkModulus": "44.4",
      "youngModulus": "69.9",
      "liquidDensity": "8.86",
      "molarVolume": "0.000018449",
      "poissonRatio": "0.24",
      "shearModulus": "28.3",
      "soundSpeed": "2830.0",
      "thermalConductivity": "14.5"
    },
    "reactivity": {
      "electronegativity": "1.24",
      "electronAffinity": "30.1"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "159.0",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁷",
      "sun": "1 ⋅ 10⁻⁷",
      "ocean": "9.0 ⋅ 10⁻¹¹",
      "crust": "3.5 ⋅ 10⁻⁴",
      "meteorites": "1.8 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 166,
          "abundance": "33.503"
        },
        {
          "mass": 168,
          "abundance": "26.978"
        },
        {
          "mass": 167,
          "abundance": "22.869"
        },
        {
          "mass": 170,
          "abundance": "14.910"
        },
        {
          "mass": 164,
          "abundance": "1.601"
        },
        {
          "mass": 162,
          "abundance": "0.139"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=5W-rkW71zOI",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Эрбий добывают вместе с другими редкоземельными металлами; Китай доминирует в мировой добыче, за ним следуют США, Мьянма, Австралия и Таиланд.", "en": "Erbium is extracted alongside other rare earths; China dominates world rare-earth mine production, followed by the United States, Myanmar, Australia and Thailand.", "zh": "铒与其他稀土元素一同提取；中国主导世界稀土矿产量，其次是美国、缅甸、澳大利亚和泰国。" }
  },
  "Tm": {
    "overview": {
      "latinName": "Thulium",
      "englishName": "Thulium",
      "discoveryYear": "1879",
      "casNumber": "CAS7440-30-4",
      "discoverer": { "ru": "Пер Теодор Клеве", "en": "Per Teodor Cleve", "zh": "Per Teodor Cleve" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#808080" }],
      "electronShellConfig": "K2-L8-M18-N31-O8-P2-Q0-R0",
      "electronCount": "69",
      "protonCount": "69",
      "neutronCount": "100",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f13 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f13 5s2 5p6 6s2"
    },
    "description": { "ru": "Мягкий серебристый лантаноид; самый мягкий и ковкий редкоземельный металл.", "en": "A soft, silvery lanthanide; the softest and most malleable rare earth metal.", "zh": "柔软银白色镧系元素；最软、最具延展性的稀土金属。" },
    "applications": { "ru": "Лазеры, рентгеновские источники", "en": "Lasers, X-ray sources", "zh": "激光、X射线源" },
    "properties": {
      "atomicMass": "168.934218907193",
      "density": "9.32",
      "meltingPoint": "1545.0",
      "boilingPoint": "1950.0",
      "valence": "2, 3",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "16.84",
      "specificHeat": "160",
      "thermalExpansion": "13.3 ⋅ 10⁻⁶",
      "vaporizationHeat": "191.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,4,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "6.184",
      "atomicRadius": "222",
      "covalentRadius": "190",
      "vanDerWaalsRadius": "222"
    },
    "electromagnetic": {
      "electricalConductivity": "1479289.9408284",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "0.0185488",
      "massMagneticSusceptibility": "1.99 ⋅ 10⁻⁶",
      "molarMagneticSusceptibility": "3.36179 ⋅ 10⁻⁷",
      "electricalResistivity": "6.76 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=3.540 Å; c=5.56 Å",
      "axialRatio": "1.570",
      "debyeTemperature": "200",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23961",
      "brinellHardness": "471.0",
      "mohsHardness": "1.77",
      "vickersHardness": "520.0",
      "bulkModulus": "44.5",
      "youngModulus": "74.0",
      "liquidDensity": "8.56",
      "molarVolume": "0.000018126",
      "poissonRatio": "0.21",
      "shearModulus": "30.5",
      "thermalConductivity": "16.9"
    },
    "reactivity": {
      "electronegativity": "1.25",
      "electronAffinity": "99.0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "100.0",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁸",
      "sun": "2 ⋅ 10⁻⁸",
      "ocean": "2.0 ⋅ 10⁻¹¹",
      "crust": "5.2 ⋅ 10⁻⁵",
      "meteorites": "2.9 ⋅ 10⁻⁶"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 169,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=xId4EOIX1DE",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Тулий добывают вместе с другими редкоземельными металлами; Китай доминирует в мировой добыче, за ним следуют США, Мьянма, Австралия и Таиланд.", "en": "Thulium is extracted alongside other rare earths; China dominates world rare-earth mine production, followed by the United States, Myanmar, Australia and Thailand.", "zh": "铥与其他稀土元素一同提取；中国主导世界稀土矿产量，其次是美国、缅甸、澳大利亚和泰国。" }
  },
  "Yb": {
    "overview": {
      "latinName": "Ytterbium",
      "englishName": "Ytterbium",
      "discoveryYear": "1878",
      "casNumber": "CAS7440-64-4",
      "discoverer": { "ru": "Жан Шарль Галиссар де Мариньяк", "en": "Jean Charles Galissard de Marignac", "zh": "Jean Charles Galissard de Marignac" },
      "discoveryCountry": "CH",
      "sampleColors": [{ "hex": "#D0C8A0" }],
      "electronShellConfig": "K2-L8-M18-N32-O8-P2-Q0-R0",
      "electronCount": "70",
      "protonCount": "70",
      "neutronCount": "103",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 6s2"
    },
    "description": { "ru": "Серебристый лантаноид; большой атомный радиус и повышенная реакционноспособность из-за состояния Yb²⁺.", "en": "A silvery lanthanide; large atomic radius and elevated reactivity due to its Yb2+ state.", "zh": "银白色镧系元素；因Yb²⁺状态而原子半径较大、反应性较强。" },
    "applications": { "ru": "Лазеры, атомные часы, оптоволокно", "en": "Lasers, atomic clocks, fiber optics", "zh": "激光、原子钟、光纤" },
    "properties": {
      "atomicMass": "173.045",
      "density": "6.9",
      "meltingPoint": "824.0",
      "boilingPoint": "1196.0",
      "valence": "2, 3",
      "group": "6/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "7.66",
      "specificHeat": "154",
      "thermalExpansion": "24.31 ⋅ 10⁻⁶",
      "vaporizationHeat": "129.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,-,-,-,-,-,-",
      "ionCharge": "2+, 3+",
      "ionizationPotential": "6.254",
      "atomicRadius": "222",
      "covalentRadius": "187",
      "vanDerWaalsRadius": "242"
    },
    "electromagnetic": {
      "electricalConductivity": "4000000.0",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "3.88 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "5.9 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "1.02 ⋅ 10⁻⁹",
      "electricalResistivity": "2.5 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "5.490 Å",
      "debyeTemperature": "118",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23992",
      "rtecsNumber": "RTECSZG1925000",
      "brinellHardness": "343.0",
      "vickersHardness": "206.0",
      "bulkModulus": "30.5",
      "youngModulus": "23.9",
      "liquidDensity": "6.21",
      "molarVolume": "0.000026339",
      "poissonRatio": "0.21",
      "shearModulus": "9.9",
      "soundSpeed": "1590.0",
      "thermalConductivity": "38.5"
    },
    "reactivity": {
      "electronegativity": "1.1",
      "electronAffinity": "-1.93"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "35.0",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁷",
      "sun": "1 ⋅ 10⁻⁷",
      "ocean": "8.0 ⋅ 10⁻¹¹",
      "crust": "2.8 ⋅ 10⁻⁴",
      "meteorites": "1.8 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 174,
          "abundance": "31.896"
        },
        {
          "mass": 172,
          "abundance": "21.754"
        },
        {
          "mass": 173,
          "abundance": "16.098"
        },
        {
          "mass": 171,
          "abundance": "14.216"
        },
        {
          "mass": 176,
          "abundance": "12.887"
        },
        {
          "mass": 170,
          "abundance": "3.023"
        },
        {
          "mass": 168,
          "abundance": "0.126"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=0Yi4eOOPVaA",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Иттербий добывают вместе с другими редкоземельными металлами; Китай доминирует в мировой добыче, за ним следуют США, Мьянма, Австралия и Таиланд.", "en": "Ytterbium is extracted alongside other rare earths; China dominates world rare-earth mine production, followed by the United States, Myanmar, Australia and Thailand.", "zh": "镱与其他稀土元素一同提取；中国主导世界稀土矿产量，其次是美国、缅甸、澳大利亚和泰国。" }
  },
  "Lu": {
    "overview": {
      "latinName": "Lutetium",
      "englishName": "Lutetium",
      "discoveryYear": "1906",
      "casNumber": "CAS7439-94-3",
      "discoverer": { "ru": "Жорж Урбен, Карл Ауэр фон Вельсбах", "en": "Georges Urbain, Carl Auer von Welsbach", "zh": "Georges Urbain, Carl Auer von Welsbach" },
      "discoveryCountry": "FR, AT",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O9-P2-Q0-R0",
      "electronCount": "71",
      "protonCount": "71",
      "neutronCount": "104",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d1 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d1 5f1 6s2"
    },
    "description": { "ru": "Серебристый лантаноид; последний в ряду, плотнее и твёрже большинства редкоземельных металлов.", "en": "A silvery lanthanide; last of the series, denser and harder than most rare earths.", "zh": "银白色镧系元素；系列末尾，比多数稀土更密更硬。" },
    "applications": { "ru": "ПЭТ-сканирование, катализаторы", "en": "PET scanning, catalysts", "zh": "PET扫描、催化剂" },
    "properties": {
      "atomicMass": "174.96669",
      "density": "9.84",
      "meltingPoint": "1663.0",
      "boilingPoint": "3402.0",
      "valence": "3",
      "group": "6/III-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "22.0",
      "specificHeat": "154",
      "thermalExpansion": "9.9 ⋅ 10⁻⁶",
      "vaporizationHeat": "414.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "5.426",
      "atomicRadius": "217",
      "covalentRadius": "187",
      "vanDerWaalsRadius": "258"
    },
    "electromagnetic": {
      "electricalConductivity": "1718213.05841924",
      "electricalType": "1",
      "volumeMagneticSusceptibility": "1.18 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "1.2 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "2.1 ⋅ 10⁻¹⁰",
      "electricalResistivity": "5.82 ⋅ 10⁻⁷",
      "superconductingTemperature": "0.1"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=3.503 Å; c=5.551 Å",
      "axialRatio": "1.585",
      "debyeTemperature": "183",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23929",
      "brinellHardness": "893.0",
      "mohsHardness": "2.6",
      "vickersHardness": "1160.0",
      "bulkModulus": "47.6",
      "youngModulus": "68.6",
      "liquidDensity": "9.3",
      "molarVolume": "0.000017779",
      "poissonRatio": "0.26",
      "shearModulus": "27.2",
      "thermalConductivity": "16.4"
    },
    "reactivity": {
      "electronegativity": "1.27",
      "electronAffinity": "23.04"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "74.0",
      "nfpaCube": "1,1,1,-"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁸",
      "sun": "1 ⋅ 10⁻⁷",
      "ocean": "1.5 ⋅ 10⁻¹¹",
      "crust": "8.0 ⋅ 10⁻⁵",
      "meteorites": "2.9 ⋅ 10⁻⁶"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 175,
          "abundance": "97.41"
        },
        {
          "mass": 176,
          "abundance": "2.59"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=VXx_vSxkdxg",
    "productionCountries": [
      { "country": "cn", "share": "69.2" },
      { "country": "us", "share": "13.1" },
      { "country": "au", "share": "7.4" },
      { "country": "mm", "share": "5.6" },
      { "country": "ng", "share": "3.3" },
      { "country": "in", "share": "0.7" },
      { "country": "th" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "Лютеций — самый редкий тяжёлый редкоземельный элемент, сосредоточенный в ионно-адсорбционных глинах Китая; Мьянма — крупный дополнительный источник руды.", "en": "Lutetium is the rarest heavy rare earth, concentrated in China's ion-adsorption clay deposits, with Myanmar a major supplementary ore source.", "zh": "镥是最稀有的重稀土元素，集中于中国的离子吸附型粘土矿床，缅甸是重要的补充矿石来源。" }
  },
  "Hf": {
    "overview": {
      "latinName": "Hafnium",
      "englishName": "Hafnium",
      "discoveryYear": "1923",
      "casNumber": "CAS7440-58-6",
      "discoverer": { "ru": "Дирк Костер, Дьёрдь де Хевеши", "en": "Dirk Coster, George de Hevesy", "zh": "Dirk Coster, George de Hevesy" },
      "discoveryCountry": "DK",
      "sampleColors": [{ "hex": "#6A7078" }],
      "electronShellConfig": "K2-L8-M18-N32-O10-P2-Q0-R0",
      "electronCount": "72",
      "protonCount": "72",
      "neutronCount": "106",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d2 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d2 6s2"
    },
    "description": { "ru": "Блестящий серебристый переходный металл; коррозионностойкий, применяется в стержнях управления реакторами.", "en": "A lustrous, silvery transition metal; corrosion-resistant and used in nuclear control rods.", "zh": "有光泽的银白色过渡金属；耐腐蚀，用于核反应堆控制棒。" },
    "applications": { "ru": "Ядерная энергетика, суперсплавы, полупроводники", "en": "Nuclear power, superalloys, semiconductors", "zh": "核电、高温合金、半导体" },
    "properties": {
      "atomicMass": "178.484981221495",
      "density": "13.31",
      "meltingPoint": "2233.0",
      "boilingPoint": "4603.0",
      "valence": "4",
      "group": "6/IV-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "27.2",
      "specificHeat": "144",
      "thermalExpansion": "5.9 ⋅ 10⁻⁶",
      "vaporizationHeat": "648.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,-,0,1,2,3,4,-,-,-,-,-",
      "ionCharge": "4+",
      "ionizationPotential": "6.825",
      "atomicRadius": "208",
      "covalentRadius": "175",
      "vanDerWaalsRadius": "263"
    },
    "electromagnetic": {
      "electricalConductivity": "3021148.03625378",
      "electricalType": "1",
      "volumeMagneticSusceptibility": "7.05 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "5.3 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "9.46 ⋅ 10⁻¹⁰",
      "electricalResistivity": "3.31 ⋅ 10⁻⁷",
      "superconductingTemperature": "0.128"
    },
    "grid": {
      "structureCode": "2 | 3",
      "gridParams": "a=3.196 Å; c=5.051 Å | a=3.60 Å",
      "axialRatio": "1.580",
      "debyeTemperature": "252",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23986",
      "rtecsNumber": "RTECSMG4600000",
      "brinellHardness": "1700.0",
      "mohsHardness": "5.5",
      "vickersHardness": "1760.0",
      "bulkModulus": "110.0",
      "youngModulus": "78.0",
      "liquidDensity": "12.0",
      "molarVolume": "0.0000134102",
      "poissonRatio": "0.37",
      "shearModulus": "30.0",
      "soundSpeed": "3010.0",
      "thermalConductivity": "23.0"
    },
    "reactivity": {
      "electronegativity": "1.3",
      "electronAffinity": "17.18"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "104.0",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "7 ⋅ 10⁻⁸",
      "sun": "1 ⋅ 10⁻⁷",
      "ocean": "8.0 ⋅ 10⁻¹⁰",
      "crust": "3.0 ⋅ 10⁻⁴",
      "meteorites": "1.7 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 180,
          "abundance": "35.08"
        },
        {
          "mass": 178,
          "abundance": "27.28"
        },
        {
          "mass": 177,
          "abundance": "18.60"
        },
        {
          "mass": 179,
          "abundance": "13.63"
        },
        {
          "mass": 176,
          "abundance": "5.24"
        },
        {
          "mass": 174,
          "abundance": "0.161"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=j2R1EZu2DKE",
    "productionCountries": [
      { "country": "fr", "share": "72" },
      { "country": "de", "share": "10" },
      { "country": "be", "share": "7" },
      { "country": "cn", "share": "4" }
    ],
    "productionNote": { "ru": "Гафний встречается вместе с цирконием в циркониевой руде в соотношении примерно 1:36 и отдельно не добывается; Австралия и ЮАР лидируют в добыче циркониевых концентратов, за ними следуют Китай, Мозамбик и Индонезия.", "en": "Hafnium occurs with zirconium in zircon ore at roughly a 1:36 ratio and is not mined separately; Australia and South Africa lead zircon mineral-concentrate mining, followed by China, Mozambique and Indonesia.", "zh": "铪与锆共生于锆石矿中，比例约为1:36，不单独开采；澳大利亚和南非在锆精矿开采中领先，其次是中国、莫桑比克和印度尼西亚。" }
  },
  "Ta": {
    "overview": {
      "latinName": "Tantalum",
      "englishName": "Tantalum",
      "discoveryYear": "1802",
      "casNumber": "CAS7440-25-7",
      "discoverer": { "ru": "Андерс Густав Экеберг", "en": "Anders Gustaf Ekeberg", "zh": "Anders Gustaf Ekeberg" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#8FA4B4" }],
      "electronShellConfig": "K2-L8-M18-N32-O11-P2-Q0-R0",
      "electronCount": "73",
      "protonCount": "73",
      "neutronCount": "108",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d3 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d3 6s2"
    },
    "description": { "ru": "Твёрдый сине-серый переходный металл; плотный, ковкий, устойчив к кислотам.", "en": "A hard, blue-gray transition metal; dense, ductile, and resistant to corrosion by acids.", "zh": "硬而蓝灰色的过渡金属；密度大、韧性好、耐酸。" },
    "applications": { "ru": "Конденсаторы, импланты, суперсплавы", "en": "Capacitors, implants, superalloys", "zh": "电容器、植入物、高温合金" },
    "properties": {
      "atomicMass": "180.947878335825",
      "density": "16.69",
      "meltingPoint": "3017.0",
      "boilingPoint": "5458.0",
      "valence": "3, 4, 5",
      "group": "6/V-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "36.57",
      "specificHeat": "140",
      "thermalExpansion": "6.3 ⋅ 10⁻⁶",
      "vaporizationHeat": "732.8"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,4,5,-,-,-,-",
      "ionCharge": "5+",
      "ionizationPotential": "7.5496",
      "atomicRadius": "200",
      "covalentRadius": "170",
      "vanDerWaalsRadius": "217"
    },
    "electromagnetic": {
      "electricalConductivity": "7633587.78625954",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "1.782 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "1.07 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "1.936 ⋅ 10⁻⁹",
      "electricalResistivity": "1.31 ⋅ 10⁻⁷",
      "superconductingTemperature": "4.47"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "3.310 Å",
      "debyeTemperature": "250",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID23956",
      "rtecsNumber": "RTECSWW5505000",
      "brinellHardness": "800.0",
      "mohsHardness": "6.5",
      "vickersHardness": "873.0",
      "bulkModulus": "200.0",
      "youngModulus": "186.0",
      "liquidDensity": "15.0",
      "molarVolume": "0.0000108677",
      "poissonRatio": "0.34",
      "shearModulus": "69.0",
      "soundSpeed": "3400.0",
      "thermalConductivity": "57.5"
    },
    "reactivity": {
      "electronegativity": "1.5",
      "electronAffinity": "31.0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "20.5",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "8 ⋅ 10⁻⁹",
      "ocean": "2.0 ⋅ 10⁻¹⁰",
      "humanBody": "2.8536407 ⋅ 10⁻⁷",
      "crust": "2.0 ⋅ 10⁻⁴",
      "meteorites": "2.0 ⋅ 10⁻⁶"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 181,
          "abundance": "99.988"
        },
        {
          "mass": 180,
          "abundance": "0.012"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=eXrywAs6nEE",
    "productionCountries": [
      { "country": "cd", "share": "41.9" },
      { "country": "ng", "share": "18.6" },
      { "country": "rw", "share": "16.7" },
      { "country": "br", "share": "10.0" },
      { "country": "cn", "share": "3.6" },
      { "country": "mz", "share": "2.6" },
      { "country": "au", "share": "2.5" },
      { "country": "et", "share": "1.9" }
    ],
    "productionNote": { "ru": "ДР Конго — ведущий добытчик тантала, за ней следуют Руанда, Бразилия, Нигерия и Китай.", "en": "The Democratic Republic of the Congo is the leading tantalum mine producer, followed by Rwanda, Brazil, Nigeria and China.", "zh": "刚果民主共和国是主要的钽矿生产国，其次是卢旺达、巴西、尼日利亚和中国。" }
  },
  "W": {
    "overview": {
      "latinName": "Wolframium",
      "englishName": "Tungsten",
      "discoveryYear": "1783",
      "casNumber": "CAS7440-33-7",
      "discoverer": { "ru": "Хуан Хосе Эльуар, Фаусто Эльуар", "en": "Juan José Elhuyar, Fausto Elhuyar", "zh": "Juan José Elhuyar, Fausto Elhuyar" },
      "discoveryCountry": "ES",
      "sampleColors": [{ "hex": "#6A7078" }],
      "electronShellConfig": "K2-L8-M18-N32-O12-P2-Q0-R0",
      "electronCount": "74",
      "protonCount": "74",
      "neutronCount": "110",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d4 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d4 6s2"
    },
    "description": { "ru": "Стально-серый переходный металл; наивысшая температура плавления среди металлов, очень твёрдый.", "en": "A steel-gray transition metal; highest melting point of all metals and extremely hard.", "zh": "钢灰色过渡金属；所有金属中熔点最高，极硬。" },
    "applications": { "ru": "Нити накаливания, режущий инструмент, броня, легирование стали", "en": "Filament wire, cutting tools, armor, steel alloying", "zh": "灯丝、切削工具、装甲、钢材合金化" },
    "properties": {
      "atomicMass": "183.841779591731",
      "density": "19.25",
      "meltingPoint": "3422.0",
      "boilingPoint": "5555.0",
      "valence": "2, 3, 4, 5, 6",
      "group": "6/VI-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "52.31",
      "specificHeat": "132",
      "thermalExpansion": "4.5 ⋅ 10⁻⁶",
      "vaporizationHeat": "806.7"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,-,2,3,4,5,6,-,-,-",
      "ionCharge": "6+",
      "ionizationPotential": "7.864",
      "atomicRadius": "193",
      "covalentRadius": "162",
      "vanDerWaalsRadius": "210"
    },
    "electromagnetic": {
      "electricalConductivity": "18939393.9393939",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "7.51 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "4.59 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "8.44 ⋅ 10⁻¹⁰",
      "electricalResistivity": "5.28 ⋅ 10⁻⁸",
      "superconductingTemperature": "0.015"
    },
    "grid": {
      "structureCode": "3 | 7",
      "gridParams": "3.160 Å | z=8",
      "debyeTemperature": "383",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID23964",
      "rtecsNumber": "RTECSYO7175000",
      "brinellHardness": "2570.0",
      "mohsHardness": "7.5",
      "vickersHardness": "3430.0",
      "bulkModulus": "310.0",
      "youngModulus": "411.0",
      "liquidDensity": "17.6",
      "molarVolume": "0.0000095501",
      "poissonRatio": "0.28",
      "shearModulus": "161.0",
      "soundSpeed": "4620.0",
      "thermalConductivity": "173.0"
    },
    "reactivity": {
      "electronegativity": "2.36",
      "electronAffinity": "78.76"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "18.4",
      "nfpaCube": "2,1,1,-"
    },
    "prevalence": {
      "universe": "5 ⋅ 10⁻⁸",
      "sun": "4 ⋅ 10⁻⁷",
      "ocean": "1.2 ⋅ 10⁻⁸",
      "humanBody": "2.853641 ⋅ 10⁻⁸",
      "crust": "1.25 ⋅ 10⁻⁴",
      "meteorites": "1.2 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 184,
          "abundance": "30.64"
        },
        {
          "mass": 182,
          "abundance": "26.50"
        },
        {
          "mass": 186,
          "abundance": "28.43"
        },
        {
          "mass": 183,
          "abundance": "14.31"
        },
        {
          "mass": 180,
          "abundance": "0.12"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=MxHQCvnOqEk",
    "productionCountries": [
      { "country": "cn", "share": "83" },
      { "country": "vn", "share": "7.9" },
      { "country": "bo", "share": "2.3" },
      { "country": "ru", "share": "2.3" },
      { "country": "kp", "share": "2.0" },
      { "country": "rw", "share": "1.0" },
      { "country": "es", "share": "0.9" }
    ],
    "productionNote": { "ru": "Китай доминирует в мировой добыче вольфрама (более 80% мировой добычи), за ним следуют Вьетнам, Россия, КНДР и Боливия.", "en": "China dominates world tungsten mine production (over 80% of output), followed by Vietnam, Russia, North Korea and Bolivia.", "zh": "中国主导世界钨矿产量（超过80%的产量），其次是越南、俄罗斯、朝鲜和玻利维亚。" }
  },
  "Re": {
    "overview": {
      "latinName": "Rhenium",
      "englishName": "Rhenium",
      "discoveryYear": "1925",
      "casNumber": "CAS7440-15-5",
      "discoverer": { "ru": "Вальтер Ноддак, Ида Такке, Отто Берг", "en": "Walter Noddack, Ida Tacke, Otto Berg", "zh": "Walter Noddack, Ida Tacke, Otto Berg" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#6A7078" }],
      "electronShellConfig": "K2-L8-M18-N32-O13-P2-Q0-R0",
      "electronCount": "75",
      "protonCount": "75",
      "neutronCount": "111",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d5 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d5 6s2"
    },
    "description": { "ru": "Серебристо-белый переходный металл; один из самых плотных элементов, устойчив к большинству кислот.", "en": "A silvery-white transition metal; one of the densest elements and resists most acids.", "zh": "银白色过渡金属；密度最高的元素之一，耐大多数酸。" },
    "applications": { "ru": "Нефтепереработка, суперсплавы, термопары", "en": "Oil refining, superalloys, thermocouples", "zh": "石油炼制、高温合金、热电偶" },
    "properties": {
      "atomicMass": "186.206707351458",
      "density": "21.02",
      "meltingPoint": "3186.0",
      "boilingPoint": "5596.0",
      "valence": "1, 2, 3, 4, 5, 6, 7",
      "group": "6/VII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "60.43",
      "specificHeat": "137",
      "thermalExpansion": "6.2 ⋅ 10⁻⁶",
      "vaporizationHeat": "704.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,0,1,2,3,4,5,6,7,-,-",
      "ionCharge": "7+",
      "ionizationPotential": "7.83",
      "atomicRadius": "188",
      "covalentRadius": "151",
      "vanDerWaalsRadius": "217"
    },
    "electromagnetic": {
      "electricalConductivity": "5181347.15025907",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "9.59 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "4.56 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "8.49 ⋅ 10⁻¹⁰",
      "electricalResistivity": "1.93 ⋅ 10⁻⁷",
      "superconductingTemperature": "1.7"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=2.761 Å; c=4.456 Å",
      "axialRatio": "1.614",
      "debyeTemperature": "416",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23947",
      "rtecsNumber": "RTECSVI0780000",
      "brinellHardness": "1320.0",
      "mohsHardness": "7.0",
      "vickersHardness": "2450.0",
      "bulkModulus": "370.0",
      "youngModulus": "463.0",
      "liquidDensity": "18.9",
      "molarVolume": "0.00000885856",
      "poissonRatio": "0.3",
      "shearModulus": "178.0",
      "soundSpeed": "4700.0",
      "thermalConductivity": "48.0"
    },
    "reactivity": {
      "electronegativity": "1.9",
      "electronAffinity": "5.8273"
    },
    "nucleus": {
      "halfLife": "41577000000/1",
      "lifetime": "59985627339/1",
      "neutronCrossSection": "90.0",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁸",
      "sun": "1 ⋅ 10⁻⁸",
      "ocean": "1.0 ⋅ 10⁻¹⁰",
      "crust": "7.0 ⋅ 10⁻⁸",
      "meteorites": "4.9 ⋅ 10⁻⁶"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "betaMinus",
      "isotopes": [
        {
          "mass": 187,
          "abundance": "62.60"
        },
        {
          "mass": 185,
          "abundance": "37.40"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=3x8VM08eUy8",
    "productionCountries": [
      { "country": "cl", "share": "37" },
      { "country": "us", "share": "12.1" },
      { "country": "pl" },
      { "country": "uz" },
      { "country": "kr" }
    ],
    "productionNote": { "ru": "Рений, извлекаемый как побочный продукт добычи медно-молибденовых руд, лидирует Чили, за ней следуют США, Польша, Узбекистан и Южная Корея.", "en": "Rhenium, recovered as a byproduct of copper-molybdenum mining, is led by Chile, followed by the United States, Poland, Uzbekistan and South Korea.", "zh": "铼作为铜钼矿开采的副产品回收，智利领先，其次是美国、波兰、乌兹别克斯坦和韩国。" }
  },
  "Os": {
    "overview": {
      "latinName": "Osmium",
      "englishName": "Osmium",
      "discoveryYear": "1803",
      "casNumber": "CAS7440-04-2",
      "discoverer": { "ru": "Смитсон Теннант", "en": "Smithson Tennant", "zh": "Smithson Tennant" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#8FA4B4" }],
      "electronShellConfig": "K2-L8-M18-N32-O14-P2-Q0-R0",
      "electronCount": "76",
      "protonCount": "76",
      "neutronCount": "114",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d6 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d6 6s2"
    },
    "description": { "ru": "Твёрдый хрупкий сине-белый переходный металл; самый плотный природный элемент.", "en": "A hard, brittle, bluish-white transition metal; densest naturally occurring element.", "zh": "硬而脆的蓝白色过渡金属；天然元素中密度最大。" },
    "applications": { "ru": "Шарикоподшипники, электрические контакты, катализаторы", "en": "Ball bearings, electrical contacts, catalysts", "zh": "轴承、电触点、催化剂" },
    "properties": {
      "atomicMass": "190.22486145925",
      "density": "22.59",
      "meltingPoint": "3033.0",
      "boilingPoint": "5012.0",
      "valence": "2, 3, 4, 6, 8",
      "group": "6/VIII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "57.85",
      "specificHeat": "130",
      "thermalExpansion": "5.1 ⋅ 10⁻⁶",
      "vaporizationHeat": "630.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,1,0,1,2,3,4,5,6,7,8,-",
      "ionCharge": "4+",
      "ionizationPotential": "8.4382",
      "atomicRadius": "185",
      "covalentRadius": "144",
      "vanDerWaalsRadius": "216"
    },
    "electromagnetic": {
      "electricalConductivity": "12315270.9359606",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "1.4 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "6.0 ⋅ 10⁻¹⁰",
      "molarMagneticSusceptibility": "1.1 ⋅ 10⁻¹⁰",
      "electricalResistivity": "8.12 ⋅ 10⁻⁸",
      "superconductingTemperature": "0.66"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a=2.734 Å; c=4.317 Å",
      "axialRatio": "1.579",
      "debyeTemperature": "467",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23937",
      "rtecsNumber": "RTECSRN1100000",
      "brinellHardness": "3920.0",
      "mohsHardness": "7.0",
      "vickersHardness": "4137.06",
      "bulkModulus": "462.0",
      "liquidDensity": "20.0",
      "molarVolume": "0.000008421",
      "poissonRatio": "0.25",
      "shearModulus": "222.0",
      "soundSpeed": "4940.0",
      "thermalConductivity": "87.6"
    },
    "reactivity": {
      "electronegativity": "2.2",
      "electronAffinity": "103.99"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "16.0",
      "nfpaCube": "3,3,1,W"
    },
    "prevalence": {
      "universe": "3 ⋅ 10⁻⁷",
      "sun": "2 ⋅ 10⁻⁷",
      "crust": "1.5 ⋅ 10⁻⁷",
      "meteorites": "6.5 ⋅ 10⁻⁵"
    },
    "ghs": [
      "flammable",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 192,
          "abundance": "40.78"
        },
        {
          "mass": 190,
          "abundance": "26.26"
        },
        {
          "mass": 189,
          "abundance": "16.15"
        },
        {
          "mass": 188,
          "abundance": "13.24"
        },
        {
          "mass": 187,
          "abundance": "1.96"
        },
        {
          "mass": 186,
          "abundance": "1.59"
        },
        {
          "mass": 184,
          "abundance": "0.02"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=gTrhMFygoTs",
    "productionCountries": [
      { "country": "ca" },
      { "country": "ru" },
      { "country": "za" }
    ],
    "productionNote": { "ru": "Осмий добывается совместно с платиной и другими металлами платиновой группы и отдельно по странам не учитывается; ЮАР и Россия доминируют в добыче МПГ.", "en": "Osmium is co-produced with platinum and other PGMs from the same ore and is not separately tracked by country; South Africa and Russia dominate PGM mine output.", "zh": "锇与铂及其他铂族金属联合生产，没有单独的国别统计；南非和俄罗斯主导铂族金属矿产量。" }
  },
  "Ir": {
    "overview": {
      "latinName": "Iridium",
      "englishName": "Iridium",
      "discoveryYear": "1803",
      "casNumber": "CAS7439-88-5",
      "discoverer": { "ru": "Смитсон Теннант", "en": "Smithson Tennant", "zh": "Smithson Tennant" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O15-P2-Q0-R0",
      "electronCount": "77",
      "protonCount": "77",
      "neutronCount": "115",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d7 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d7 6s2"
    },
    "description": { "ru": "Плотный серебристо-белый переходный металл; наиболее коррозионностойкий, платиновая группа.", "en": "A dense, silvery-white transition metal; most corrosion-resistant metal and member of the platinum group.", "zh": "致密银白色过渡金属；最耐腐蚀的金属，铂族元素。" },
    "applications": { "ru": "Свечи зажигания, катализаторы, электроды", "en": "Spark plugs, catalysts, electrodes", "zh": "火花塞、催化剂、电极" },
    "properties": {
      "atomicMass": "192.216053820407",
      "density": "22.56",
      "meltingPoint": "2446.0",
      "boilingPoint": "4130.0",
      "valence": "1, 2, 3, 4, 6",
      "group": "6/VIII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "41.12",
      "specificHeat": "131",
      "thermalExpansion": "6.4 ⋅ 10⁻⁶",
      "vaporizationHeat": "564.0"
    },
    "atomic": {
      "oxidationState": "-,-,3,-,1,0,1,2,3,4,5,6,7,8,9",
      "ionCharge": "4+",
      "ionizationPotential": "8.967",
      "atomicRadius": "180",
      "covalentRadius": "141",
      "vanDerWaalsRadius": "202"
    },
    "electromagnetic": {
      "electricalConductivity": "21231422.5053079",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "3.77 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "1.67 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "3.21 ⋅ 10⁻¹⁰",
      "electricalResistivity": "4.71 ⋅ 10⁻⁸",
      "superconductingTemperature": "0.11"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "3.840 Å",
      "debyeTemperature": "420",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23924",
      "brinellHardness": "1670.0",
      "mohsHardness": "6.5",
      "vickersHardness": "1760.0",
      "bulkModulus": "320.0",
      "youngModulus": "528.0",
      "liquidDensity": "19.0",
      "molarVolume": "0.0000085203",
      "poissonRatio": "0.26",
      "shearModulus": "210.0",
      "soundSpeed": "4825.0",
      "thermalConductivity": "147.0"
    },
    "reactivity": {
      "electronegativity": "2.2",
      "electronAffinity": "150.94"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "425.0",
      "nfpaCube": "1,1,0,-"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁷",
      "sun": "2 ⋅ 10⁻⁷",
      "crust": "1.0 ⋅ 10⁻⁷",
      "meteorites": "5.4 ⋅ 10⁻⁵"
    },
    "ghs": [
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 193,
          "abundance": "62.7"
        },
        {
          "mass": 191,
          "abundance": "37.3"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=PR6XD-afjYI",
    "productionCountries": [
      { "country": "za" },
      { "country": "ca" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "Иридий добывается совместно с платиной и другими металлами платиновой группы и отдельно по странам не учитывается; ЮАР и Россия доминируют в добыче МПГ.", "en": "Iridium is co-produced with platinum and other PGMs from the same ore and is not separately tracked by country; South Africa and Russia dominate PGM mine output.", "zh": "铱与铂及其他铂族金属联合生产，没有单独的国别统计；南非和俄罗斯主导铂族金属矿产量。" }
  },
  "Pt": {
    "overview": {
      "latinName": "Platinum",
      "englishName": "Platinum",
      "discoveryYear": "1735",
      "casNumber": "CAS7440-06-4",
      "discoverer": { "ru": "Антонио де Ульоа", "en": "Antonio de Ulloa", "zh": "Antonio de Ulloa" },
      "discoveryCountry": "PE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O17-P1-Q0-R0",
      "electronCount": "78",
      "protonCount": "78",
      "neutronCount": "117",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d9 6s1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d9 6s1"
    },
    "description": { "ru": "Плотный ковкий благородный металл; мало реагирует, блестящий, один из самых редких стабильных металлов в земной коре.", "en": "A dense, malleable precious metal; unreactive, lustrous, and one of the rarest stable metals in Earth's crust.", "zh": "致密韧性贵金属；反应性低，光泽夺目，是地壳中最稀有的稳定金属之一。" },
    "applications": { "ru": "Автокатализаторы, ювелирные изделия, электроды, химический синтез", "en": "Auto catalysts, jewelry, electrodes, chemical synthesis", "zh": "汽车催化剂、首饰、电极、化学合成" },
    "properties": {
      "atomicMass": "195.084429339468",
      "density": "21.45",
      "meltingPoint": "1768.3",
      "boilingPoint": "3825.0",
      "valence": "2, 4",
      "group": "6/VIII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "22.17",
      "specificHeat": "133",
      "thermalExpansion": "8.9 ⋅ 10⁻⁶",
      "vaporizationHeat": "510.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,1,0,-,2,-,4,-,6,-,-,-",
      "ionCharge": "2+, 4+",
      "ionizationPotential": "9",
      "atomicRadius": "177",
      "covalentRadius": "136",
      "vanDerWaalsRadius": "175"
    },
    "electromagnetic": {
      "electricalConductivity": "9523809.52380952",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "2.573 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "1.22 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "2.38 ⋅ 10⁻⁹",
      "electricalResistivity": "1.05 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "3.920 Å",
      "debyeTemperature": "240",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23939",
      "rtecsNumber": "RTECSTP2160000",
      "brinellHardness": "300–500",
      "mohsHardness": "3.5",
      "vickersHardness": "549.0",
      "bulkModulus": "230.0",
      "youngModulus": "168.0",
      "liquidDensity": "19.77",
      "molarVolume": "0.0000090948",
      "poissonRatio": "0.38",
      "shearModulus": "61.0",
      "soundSpeed": "2800.0",
      "thermalConductivity": "71.6"
    },
    "reactivity": {
      "electronegativity": "2.28",
      "electronAffinity": "205.041"
    },
    "nucleus": {
      "halfLife": "497000000000/1",
      "lifetime": "716887586483/1",
      "neutronCrossSection": "10.3",
      "nfpaCube": "0,0,0,-"
    },
    "prevalence": {
      "universe": "5 ⋅ 10⁻⁷",
      "sun": "9 ⋅ 10⁻⁷",
      "crust": "5.0 ⋅ 10⁻⁷",
      "meteorites": "9.8 ⋅ 10⁻⁵"
    },
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 195,
          "abundance": "33.78"
        },
        {
          "mass": 194,
          "abundance": "32.86"
        },
        {
          "mass": 196,
          "abundance": "25.21"
        },
        {
          "mass": 198,
          "abundance": "7.356"
        },
        {
          "mass": 192,
          "abundance": "0.782"
        },
        {
          "mass": 190,
          "abundance": "0.012"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=JYH5rg3X5z0",
    "productionCountries": [
      { "country": "za", "share": "74.3" },
      { "country": "ru", "share": "10.6" },
      { "country": "zw", "share": "8.0" },
      { "country": "ca", "share": "3.2" },
      { "country": "us", "share": "1.8" }
    ],
    "productionNote": { "ru": "ЮАР — безусловный лидер по добыче платины (около двух третей мировой добычи), за ней следуют Россия, Зимбабве, Канада и США.", "en": "South Africa is by far the leading platinum producer (about two-thirds of world output), followed by Russia, Zimbabwe, Canada and the United States.", "zh": "南非是迄今为止最大的铂生产国（约占世界产量的三分之二），其次是俄罗斯、津巴布韦、加拿大和美国。" }
  },
  "Au": {
    "overview": {
      "latinName": "Aurum",
      "englishName": "Gold",
      "discoveryYear": "~4000 BC",
      "casNumber": "CAS7440-57-5",
      "discoveryCountry": "NahalQana",
      "sampleColors": [{ "hex": "#FFD123" }],
      "electronShellConfig": "K2-L8-M18-N32-O18-P1-Q0-R0",
      "electronCount": "79",
      "protonCount": "79",
      "neutronCount": "118",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d10 6s1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s1"
    },
    "description": { "ru": "Мягкий плотный жёлтый благородный металл; химически инертен, отличный проводник.", "en": "A soft, dense, yellow precious metal; chemically inert and excellent conductor.", "zh": "柔软致密黄色贵金属；化学惰性，优良导体。" },
    "applications": { "ru": "Ювелирные изделия, электроника, стоматология, инвестиции", "en": "Jewelry, electronics, dentistry, investment", "zh": "首饰、电子、牙科、投资" },
    "properties": {
      "atomicMass": "196.966570051362",
      "density": "19.32",
      "meltingPoint": "1064.18",
      "boilingPoint": "2970.0",
      "valence": "1, 3, 2",
      "group": "6/I-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "12.55",
      "specificHeat": "129.1",
      "thermalExpansion": "14.2 ⋅ 10⁻⁶",
      "vaporizationHeat": "342.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,-,1,2,3,-,5,-,-,-,-",
      "ionCharge": "1+, 3+",
      "ionizationPotential": "9.226",
      "atomicRadius": "174",
      "covalentRadius": "136",
      "vanDerWaalsRadius": "166"
    },
    "electromagnetic": {
      "electricalConductivity": "45167118.33785",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-3.44 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-1.78 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-3.51 ⋅ 10⁻¹⁰",
      "electricalResistivity": "2.214 ⋅ 10⁻⁸"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "4.0781 Å",
      "axialRatio": "1",
      "debyeTemperature": "165",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23985",
      "rtecsNumber": "RTECSMD5070000",
      "brinellHardness": "2450.0",
      "mohsHardness": "2.5",
      "vickersHardness": "216.0",
      "bulkModulus": "180.0",
      "youngModulus": "78.0",
      "liquidDensity": "17.31",
      "molarVolume": "0.00001021",
      "poissonRatio": "0.44",
      "shearModulus": "27.0",
      "soundSpeed": "2030.0",
      "thermalConductivity": "318.0"
    },
    "reactivity": {
      "electronegativity": "2.54",
      "electronAffinity": "222.747"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "98.7",
      "nfpaCube": "0,0,0,-"
    },
    "prevalence": {
      "universe": "6 ⋅ 10⁻⁸",
      "sun": "1 ⋅ 10⁻⁷",
      "ocean": "5.0 ⋅ 10⁻⁹",
      "humanBody": "2.8536407 ⋅ 10⁻⁷",
      "crust": "4.0 ⋅ 10⁻⁷",
      "meteorites": "1.7 ⋅ 10⁻⁵"
    },
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 197,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=td06TollW2Q",
    "productionCountries": [
      { "country": "cn", "share": "10.4" },
      { "country": "ru", "share": "9.0" },
      { "country": "au", "share": "7.8" },
      { "country": "ca", "share": "5.5" },
      { "country": "us", "share": "4.3" },
      { "country": "gh", "share": "3.9" },
      { "country": "id", "share": "3.8" },
      { "country": "mx", "share": "3.8" },
      { "country": "pe", "share": "3.7" },
      { "country": "uz", "share": "3.5" },
      { "country": "ml", "share": "2.7" },
      { "country": "za", "share": "2.7" },
      { "country": "br", "share": "2.3" },
      { "country": "co", "share": "1.8" },
      { "country": "pg", "share": "1.4" }
    ],
    "productionNote": { "ru": "Китай — ведущий добытчик золота, за ним почти вплотную следуют Австралия и Россия, затем Канада и США.", "en": "China is the leading gold mine producer, followed closely by Australia and Russia, then Canada and the United States.", "zh": "中国是主要的黄金生产国，澳大利亚和俄罗斯紧随其后，然后是加拿大和美国。" }
  },
  "Hg": {
    "overview": {
      "latinName": "Hydrargyrum",
      "englishName": "Mercury",
      "discoveryYear": "1500 BC",
      "casNumber": "CAS7439-97-6",
      "discoveryCountry": "EG",
      "sampleColors": [{ "hex": "#B8B8C8" }],
      "electronShellConfig": "K2-L8-M18-N32-O18-P2-Q0-R0",
      "electronCount": "80",
      "protonCount": "80",
      "neutronCount": "120",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d10 6s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2"
    },
    "description": { "ru": "Тяжёлый серебристый жидкий металл; единственный жидкий металл при комнатной температуре, токсичен парами.", "en": "A heavy, silvery liquid metal; only metal liquid at room temperature and toxic in vapor form.", "zh": "沉重银白色液态金属；室温下唯一液态金属，蒸气有毒。" },
    "applications": { "ru": "Люминесцентные лампы (истор.), хлорщелочное производство (истор.)", "en": "Fluorescent lamps (legacy), chlor-alkali (legacy)", "zh": "荧光灯（传统）、氯碱工业（传统）" },
    "properties": {
      "atomicMass": "200.592560642052",
      "density": "13.5336",
      "meltingPoint": "-38.83",
      "boilingPoint": "356.73",
      "valence": "1, 2",
      "group": "6/II-",
      "block": "d",
      "aggregationState": "liquid"
    },
    "thermo": {
      "fusionHeat": "2.29",
      "specificHeat": "139.5",
      "thermalExpansion": "60.4 ⋅ 10⁻⁶",
      "vaporizationHeat": "59.11"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,1,2,-,4,-,-,-,-,-",
      "ionCharge": "2+",
      "ionizationPotential": "10.438",
      "atomicRadius": "171",
      "covalentRadius": "132",
      "vanDerWaalsRadius": "155"
    },
    "electromagnetic": {
      "electricalConductivity": "1040582.72632674",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-2.84 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-2.1 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-4.21 ⋅ 10⁻¹⁰",
      "electricalResistivity": "9.61 ⋅ 10⁻⁷",
      "superconductingTemperature": "4.154"
    },
    "grid": {
      "structureCode": "5 | 3",
      "gridParams": "a(hex)=3.464 Å; с(hex)=6.708 Å | a=3.995 Å; с=2.825 Å",
      "axialRatio": "1.94",
      "debyeTemperature": "72",
      "spaceGroup": "R_ 3m",
      "spaceGroupNumber": "166"
    },
    "additional": {
      "pubchemCid": "CID23931",
      "rtecsNumber": "RTECSOV4550000",
      "bulkModulus": "25.0",
      "liquidDensity": "13.534",
      "molarVolume": "0.0000148213",
      "soundSpeed": "1451.4",
      "refractiveIndex": "1.000933",
      "thermalConductivity": "8.3"
    },
    "reactivity": {
      "electronegativity": "2",
      "electronAffinity": "0"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "372.3",
      "nfpaCube": "0,3,0,-"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁷",
      "sun": "2 ⋅ 10⁻⁶",
      "ocean": "5.0 ⋅ 10⁻⁹",
      "humanBody": "8.56092203 ⋅ 10⁻⁶",
      "crust": "8.5 ⋅ 10⁻⁶",
      "meteorites": "2.5 ⋅ 10⁻⁵"
    },
    "ghs": [
      "acuteToxicity",
      "healthHazard",
      "environment"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 202,
          "abundance": "29.74"
        },
        {
          "mass": 200,
          "abundance": "23.14"
        },
        {
          "mass": 199,
          "abundance": "16.94"
        },
        {
          "mass": 201,
          "abundance": "13.17"
        },
        {
          "mass": 198,
          "abundance": "10.04"
        },
        {
          "mass": 204,
          "abundance": "6.82"
        },
        {
          "mass": 196,
          "abundance": "0.15"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=MbJRT6XLvBE",
    "productionCountries": [
      { "country": "cn", "share": "94.6" },
      { "country": "tj", "share": "2.7" },
      { "country": "mx", "share": "2.19" },
      { "country": "pe" },
      { "country": "no" },
      { "country": "kg" }
    ],
    "productionNote": { "ru": "На долю Китая приходится основная часть заявленной мировой добычи ртути, Таджикистан, Перу, Норвегия и Киргизия — гораздо меньшие источники.", "en": "China accounts for the large majority of reported mercury mine production, with Tajikistan, Peru, Norway and Kyrgyzstan as much smaller sources.", "zh": "中国占已报告汞矿产量的绝大部分，塔吉克斯坦、秘鲁、挪威和吉尔吉斯斯坦是规模小得多的来源。" }
  },
  "Tl": {
    "overview": {
      "latinName": "Thallium",
      "englishName": "Thallium",
      "discoveryYear": "1861",
      "casNumber": "CAS7440-28-0",
      "discoverer": { "ru": "Уильям Крукс", "en": "William Crookes", "zh": "William Crookes" },
      "discoveryCountry": "GB",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O18-P3-Q0-R0",
      "electronCount": "81",
      "protonCount": "81",
      "neutronCount": "123",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d10 6s2 6p1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2 6p1"
    },
    "description": { "ru": "Мягкий серый металл; тяжёлый, низкоплавкий, имеет два стабильных изотопа.", "en": "A soft, gray post-transition metal; heavy, low-melting, and has two stable isotopes.", "zh": "柔软灰色金属；重、低熔点，有两个稳定同位素。" },
    "applications": { "ru": "Оптоволокно, специальное стекло, фармацевтика (ограниченно)", "en": "Fiber optics, specialty glass, pharmaceuticals (limited)", "zh": "光纤、特种玻璃、医药（有限）" },
    "properties": {
      "atomicMass": "204.383512460528",
      "density": "11.85",
      "meltingPoint": "304.0",
      "boilingPoint": "1473.0",
      "valence": "1, 2, 3",
      "group": "6/III+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "4.14",
      "specificHeat": "129",
      "thermalExpansion": "29.9 ⋅ 10⁻⁶",
      "vaporizationHeat": "165.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,-,1,-,3,-,-,-,-,-,-",
      "ionCharge": "1+, 3+",
      "ionizationPotential": "6.108",
      "atomicRadius": "156",
      "covalentRadius": "144",
      "vanDerWaalsRadius": "196"
    },
    "electromagnetic": {
      "electricalConductivity": "5555555.55555556",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-3.56 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-3.0 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-6.13 ⋅ 10⁻¹⁰",
      "electricalResistivity": "1.8 ⋅ 10⁻⁷",
      "superconductingTemperature": "2.38"
    },
    "grid": {
      "structureCode": "2",
      "gridParams": "a 3.456 c=5.525",
      "axialRatio": "1.599",
      "debyeTemperature": "78.5",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID5359464",
      "rtecsNumber": "RTECSXG3425000",
      "brinellHardness": "26.4",
      "mohsHardness": "1.2",
      "bulkModulus": "43.0",
      "youngModulus": "8.0",
      "liquidDensity": "11.22",
      "molarVolume": "0.0000172473",
      "poissonRatio": "0.45",
      "shearModulus": "2.8",
      "soundSpeed": "818.0",
      "thermalConductivity": "46.1"
    },
    "reactivity": {
      "electronegativity": "1.62",
      "electronAffinity": "30.8804"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "3.4",
      "nfpaCube": "2,2,0,-"
    },
    "prevalence": {
      "universe": "5 ⋅ 10⁻⁸",
      "sun": "1 ⋅ 10⁻⁷",
      "ocean": "1.0 ⋅ 10⁻¹⁰",
      "humanBody": "7.1341017 ⋅ 10⁻⁷",
      "crust": "8.5 ⋅ 10⁻⁵",
      "meteorites": "7.9 ⋅ 10⁻⁶"
    },
    "ghs": [
      "acuteToxicity",
      "healthHazard",
      "irritant"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 205,
          "abundance": "70.476"
        },
        {
          "mass": 203,
          "abundance": "29.524"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=eME64iXQeMM",
    "productionCountries": [
      { "country": "cn" },
      { "country": "kz" },
      { "country": "ru" },
      { "country": "pe" },
      { "country": "br" }
    ],
    "productionNote": { "ru": "Таллий извлекается только как побочный продукт переработки цинковых, свинцовых и медных руд, Китай — доминирующий производитель.", "en": "Thallium is recovered only as a byproduct of zinc, lead and copper ore smelting, with China the dominant producer.", "zh": "铊仅作为锌、铅和铜矿冶炼的副产品回收，中国是主要生产国。" }
  },
  "Pb": {
    "overview": {
      "latinName": "Plumbum",
      "englishName": "Lead",
      "discoveryYear": "7000 BC",
      "casNumber": "CAS7439-92-1",
      "discoveryCountry": "TR",
      "sampleColors": [{ "hex": "#5C5C62" }],
      "electronShellConfig": "K2-L8-M18-N32-O18-P4-Q0-R0",
      "electronCount": "82",
      "protonCount": "82",
      "neutronCount": "125",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d10 6s2 6p2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2 6p2"
    },
    "description": { "ru": "Мягкий плотный металл; сине-серый, токсичен, известен с древних времён.", "en": "A soft, dense post-transition metal; bluish-gray, toxic, and known since ancient times.", "zh": "柔软致密金属；蓝灰色，有毒，自古已知。" },
    "applications": { "ru": "Свинцово-кислотные аккумуляторы, экранирование, припои, боеприпасы", "en": "Lead-acid batteries, radiation shielding, solders, ammunition", "zh": "铅酸电池、辐射屏蔽、焊料、弹药" },
    "properties": {
      "atomicMass": "207.216907578328",
      "density": "11.34",
      "meltingPoint": "327.46",
      "boilingPoint": "1749.0",
      "valence": "2, 4",
      "group": "6/IV+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "4.77",
      "specificHeat": "127",
      "thermalExpansion": "28.9 ⋅ 10⁻⁶",
      "vaporizationHeat": "179.5"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,-,4,-,-,-,-,-",
      "ionCharge": "2+, 4+",
      "ionizationPotential": "7.417",
      "atomicRadius": "154",
      "covalentRadius": "145",
      "vanDerWaalsRadius": "202"
    },
    "electromagnetic": {
      "electricalConductivity": "4807692.30769231",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.7 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "-1.5 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "-3.11 ⋅ 10⁻¹⁰",
      "electricalResistivity": "2.08 ⋅ 10⁻⁷",
      "superconductingTemperature": "7.2"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "4.950 Å",
      "debyeTemperature": "105",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID5352425",
      "rtecsNumber": "RTECSOF7525000",
      "brinellHardness": "38.3",
      "mohsHardness": "1.5",
      "bulkModulus": "46.0",
      "youngModulus": "16.0",
      "liquidDensity": "10.66",
      "molarVolume": "0.000018272",
      "poissonRatio": "0.44",
      "shearModulus": "5.6",
      "soundSpeed": "1190.0",
      "thermalConductivity": "35.3"
    },
    "reactivity": {
      "electronegativity": "1.8",
      "electronAffinity": "34.4183"
    },
    "nucleus": {
      "halfLife": "∞",
      "lifetime": "∞",
      "neutronCrossSection": "0.171",
      "nfpaCube": "0,2,0,-"
    },
    "prevalence": {
      "universe": "1 ⋅ 10⁻⁶",
      "sun": "9.9 ⋅ 10⁻⁷",
      "ocean": "3.0 ⋅ 10⁻⁹",
      "humanBody": "0.00017121844062",
      "crust": "0.0014",
      "meteorites": "1.4 ⋅ 10⁻⁴"
    },
    "ghs": [
      "healthHazard",
      "irritant",
      "environment"
    ],
    "isotopes": {
      "decay": "stable",
      "isotopes": [
        {
          "mass": 208,
          "abundance": "52.4"
        },
        {
          "mass": 206,
          "abundance": "24.1"
        },
        {
          "mass": 207,
          "abundance": "22.1"
        },
        {
          "mass": 204,
          "abundance": "1.4"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=iMBU6I99sB8",
    "productionCountries": [
      { "country": "cn", "share": "41.4" },
      { "country": "au", "share": "9.4" },
      { "country": "us", "share": "6.5" },
      { "country": "pe", "share": "5.9" },
      { "country": "in", "share": "4.8" },
      { "country": "ru", "share": "4.8" },
      { "country": "mx", "share": "3.9" },
      { "country": "tr", "share": "1.5" },
      { "country": "se", "share": "1.5" },
      { "country": "ir", "share": "1.3" },
      { "country": "bo", "share": "1.3" },
      { "country": "tj", "share": "0.9" }
    ],
    "productionNote": { "ru": "Крупнейшие страны-добытчики свинцовой руды (2024).", "en": "Top lead mining countries by 2024 mine output.", "zh": "2024年铅矿产量最高的国家。" }
  },
  "Bi": {
    "overview": {
      "latinName": "Bisemutum (Bismuthum, Bismutum)",
      "englishName": "Bismuth",
      "discoveryYear": "1753",
      "casNumber": "CAS7440-69-9",
      "discoverer": { "ru": "Клод Франсуа Жоффруа", "en": "Claude Francois Geoffrey", "zh": "Claude Francois Geoffrey" },
      "discoveryCountry": "FR",
      "sampleColors": [{ "hex": "#8A7D72" }],
      "electronShellConfig": "K2-L8-M18-N32-O18-P5-Q0-R0",
      "electronCount": "83",
      "protonCount": "83",
      "neutronCount": "126",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d10 6s2 6p3 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2 6p3"
    },
    "description": { "ru": "Хрупкий металл; розоватый оттенок, слабо радиоактивен из-за распада ²⁰⁹Bi.", "en": "A brittle post-transition metal; pinkish tint, weakly radioactive due to long-lived ²⁰⁹Bi decay.", "zh": "脆性金属；带粉红色调，因²⁰⁹Bi衰变而弱放射性。" },
    "applications": { "ru": "Низкотемпературные припои, косметика, фармацевтика", "en": "Low-melting solders, cosmetics, pharmaceuticals", "zh": "低熔点焊料、化妆品、医药" },
    "properties": {
      "atomicMass": "208.980398587653",
      "density": "9.78",
      "meltingPoint": "271.5",
      "boilingPoint": "1564.0",
      "valence": "2, 3, 4, 5",
      "group": "6/V+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "11.3",
      "specificHeat": "122",
      "thermalExpansion": "13.4 ⋅ 10⁻⁶",
      "vaporizationHeat": "179.0"
    },
    "atomic": {
      "oxidationState": "-,-,3,-,1,-,1,-,3,-,5,-,-,-,-",
      "ionCharge": "3+, 5+",
      "ionizationPotential": "7.289",
      "atomicRadius": "143",
      "covalentRadius": "150",
      "vanDerWaalsRadius": "207"
    },
    "electromagnetic": {
      "electricalConductivity": "775193.798449612",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "volumeMagneticSusceptibility": "-1.7 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "-1.7 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "-3.6 ⋅ 10⁻⁹",
      "electricalResistivity": "1.29 ⋅ 10⁻⁶"
    },
    "grid": {
      "structureCode": "5",
      "gridParams": "a=4.746 Å; α=57.23°",
      "debyeTemperature": "120",
      "spaceGroup": "R_ 3m",
      "spaceGroupNumber": "166"
    },
    "additional": {
      "pubchemCid": "CID5359367",
      "rtecsNumber": "RTECSEB2600000",
      "brinellHardness": "94.2",
      "mohsHardness": "2.25",
      "bulkModulus": "31.0",
      "youngModulus": "32.0",
      "liquidDensity": "10.05",
      "molarVolume": "0.000021368",
      "poissonRatio": "0.33",
      "shearModulus": "12.0",
      "soundSpeed": "1790.0",
      "thermalConductivity": "7.97"
    },
    "reactivity": {
      "electronegativity": "2.02",
      "electronAffinity": "90.924"
    },
    "nucleus": {
      "halfLife": "20100000000000000000/1",
      "lifetime": "28993970000000000000/1",
      "neutronCrossSection": "0.034",
      "nfpaCube": "2,1,0,-"
    },
    "prevalence": {
      "universe": "7 ⋅ 10⁻⁸",
      "sun": "9.9 ⋅ 10⁻⁷",
      "ocean": "2.0 ⋅ 10⁻⁹",
      "humanBody": "7.1341017 ⋅ 10⁻⁷",
      "crust": "8.5 ⋅ 10⁻⁷",
      "meteorites": "6.9 ⋅ 10⁻⁶"
    },
    "ghs": [
      "irritant"
    ],
    "radiacodeIsotope": {
      "isotope": "²¹⁴Bi",
      "slug": "bi-214"
    },
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 209,
          "abundance": "100"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=s-39JB3qr5I",
    "productionCountries": [
      { "country": "cn", "share": "74" },
      { "country": "la", "share": "6.4" },
      { "country": "kr", "share": "5.6" },
      { "country": "jp" },
      { "country": "kz" }
    ],
    "productionNote": { "ru": "Висмут производится почти исключительно как побочный продукт переработки свинцовых, вольфрамовых и цинковых руд; крупнейшие страны-производители (2024).", "en": "Bismuth is produced almost entirely as a byproduct of lead, tungsten and zinc ore smelting; top refinery-production countries by 2024 output.", "zh": "铋几乎完全作为铅、钨和锌矿冶炼的副产品生产；2024年主要精炼生产国。" }
  },
  "Po": {
    "overview": {
      "latinName": "Polonium",
      "englishName": "Polonium",
      "discoveryYear": "1898",
      "casNumber": "CAS7440-08-6",
      "discoverer": { "ru": "Пьер Кюри, Мария Склодовская-Кюри", "en": "Pierre Curie, Marie Skłodowska Curie", "zh": "Pierre Curie, Marie Skłodowska Curie" },
      "discoveryCountry": "FR",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O18-P6-Q0-R0",
      "electronCount": "84",
      "protonCount": "84",
      "neutronCount": "125",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d10 6s2 6p4 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2 6p4"
    },
    "description": { "ru": "Редкий серебристый радиоактивный металлоид; все изотопы нестабильны, открыт Марией Кюри.", "en": "A rare, silvery radioactive metalloid; all isotopes unstable, discovered by Marie Curie.", "zh": "稀有银白色放射性类金属；所有同位素不稳定，由居里夫人发现。" },
    "applications": { "ru": "Источники нейтронов, антистатические устройства", "en": "Neutron sources, antistatic devices", "zh": "中子源、防静电装置" },
    "properties": {
      "atomicMass": "208.962006199874",
      "density": "9.196",
      "meltingPoint": "254.0",
      "boilingPoint": "962.0",
      "valence": "2, 4, 6",
      "group": "6/VI+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "13.0",
      "specificHeat": "126",
      "thermalExpansion": "23.5 ⋅ 10⁻⁶",
      "vaporizationHeat": "102.91"
    },
    "atomic": {
      "oxidationState": "-,-,-,2,-,-,-,2,-,4,-,6,-,-,-",
      "ionCharge": "2+, 4+",
      "ionizationPotential": "8.417",
      "atomicRadius": "135",
      "covalentRadius": "142",
      "vanDerWaalsRadius": "197"
    },
    "electromagnetic": {
      "electricalConductivity": "2500000.0",
      "magneticType": "diamagnetic",
      "electricalResistivity": "4.3 ⋅ 10⁻⁷"
    },
    "grid": {
      "structureCode": "7",
      "gridParams": "3.35 Å",
      "spaceGroup": "Pm-3m",
      "spaceGroupNumber": "221"
    },
    "additional": {
      "molarVolume": "0.000022727272727",
      "thermalConductivity": "0.2"
    },
    "reactivity": {
      "electronegativity": "2",
      "electronAffinity": "136.0"
    },
    "nucleus": {
      "halfLife": "0.3790/1",
      "lifetime": "0.5468/1",
      "neutronCrossSection": "0.5",
      "nfpaCube": "1,4,2,RAD"
    },
    "prevalence": {
      "ocean": "2 ⋅ 10⁻¹⁸",
      "crust": "2.0 ⋅ 10⁻¹⁴"
    },
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "radiacodeIsotope": {
      "isotope": "²¹⁰Po",
      "slug": "po-210"
    },
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 210
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=qaOos4Kruf0",
    "productionCountries": [
      { "country": "ru" }
    ],
    "productionNote": { "ru": "В природе встречается только в следовых количествах как продукт распада урановых руд, не добывается; коммерческий Po-210 синтезируется нейтронным облучением висмута-209, почти весь объём — на одном реакторном производстве в России.", "en": "Occurs naturally only in trace amounts as a uranium ore decay product, not mined; commercial Po-210 is synthesized by neutron irradiation of bismuth-209, produced almost entirely at a single reactor facility in Russia.", "zh": "在自然界中仅以铀矿衰变产物的痕量形式存在，不进行开采；商用钋-210通过中子辐照铋-209合成，几乎全部产自俄罗斯的一处反应堆设施。" }
  },
  "At": {
    "overview": {
      "latinName": "Astatum",
      "englishName": "Astatine",
      "discoveryYear": "1940",
      "casNumber": "CAS7440-68-8",
      "discoverer": { "ru": "Дейл Корсон, Кеннет Маккензи, Эмилио Сегре", "en": "Dale R. Corson, Kenneth Ross MacKenzie, Emilio Segrè", "zh": "Dale R. Corson, Kenneth Ross MacKenzie, Emilio Segrè" },
      "discoveryCountry": "US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O18-P7-Q0-R0",
      "electronCount": "85",
      "protonCount": "85",
      "neutronCount": "125",
      "hasImage": true,
      "hasSpectre": false,
      "electronConfiguration": "[Xe] 4f14 5d10 6s2 6p5 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2 6p5"
    },
    "description": { "ru": "Радиоактивный галоген; летуч и редок, все изотопы недолговечны.", "en": "A radioactive halogen; volatile and rare, all isotopes short-lived.", "zh": "放射性卤素；挥发且稀有，所有同位素寿命短。" },
    "applications": { "ru": "Исследования в ядерной медицине", "en": "Nuclear medicine research", "zh": "核医学研究" },
    "properties": {
      "atomicMass": "209.602075361333",
      "density": "~7",
      "meltingPoint": "302.0",
      "boilingPoint": "336.8",
      "group": "6/VII+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "12.0",
      "vaporizationHeat": "54.39"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,1,-,1,-,3,-,5,-,7,-,-",
      "ionCharge": "1-",
      "ionizationPotential": "9.3175",
      "atomicRadius": "127",
      "covalentRadius": "150",
      "vanDerWaalsRadius": "202"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "4"
    },
    "additional": {
      "thermalConductivity": "1.7"
    },
    "reactivity": {
      "electronegativity": "2.2",
      "electronAffinity": "233.087"
    },
    "nucleus": {
      "halfLife": "8.1/3",
      "lifetime": "11.6883/3",
      "nfpaCube": "0,4,2,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "electronCapture",
      "isotopes": [
        {
          "mass": 210
        }
      ]
    },
    "productionCountries": [
      { "country": "us" },
      { "country": "jp" }
    ],
    "productionNote": { "ru": "Самый редкий природный элемент на Земле, в природе присутствует лишь в следовых количествах в цепочках распада, не добывается; для терапии рака At-211 нарабатывают на медицинских циклотронах — несколько центров в США и в Японии (RCNP Осакского университета, RIKEN).", "en": "The rarest naturally occurring element on Earth, present only in trace decay-chain amounts, not mined; for cancer therapy, At-211 is produced on medical cyclotrons at a handful of centers in the US and in Japan (Osaka University's RCNP, RIKEN).", "zh": "地球上天然存在的最稀有元素，仅以衰变链的痕量存在，不进行开采；用于癌症治疗的砹-211在少数医用回旋加速器中心生产，包括美国的多个中心和日本（大阪大学RCNP、理化学研究所RIKEN）。" }
  },
  "Rn": {
    "overview": {
      "latinName": "Radon",
      "englishName": "Radon",
      "discoveryYear": "1900",
      "casNumber": "CAS10043-92-2",
      "discoverer": { "ru": "Фридрих Эрнст Дорн", "en": "Friedrich Ernst Dorn", "zh": "Friedrich Ernst Dorn" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#E8E8E8", "finish": "subtle" }],
      "electronShellConfig": "K2-L8-M18-N32-O18-P8-Q0-R0",
      "electronCount": "86",
      "protonCount": "86",
      "neutronCount": "136",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Xe] 4f14 5d10 6s2 6p6 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2 6p6"
    },
    "description": { "ru": "Бесцветный радиоактивный благородный газ; самый тяжёлый из природных благородных газов, образуется при распаде радия.", "en": "A colorless radioactive noble gas; heaviest naturally occurring noble gas, formed by radium decay.", "zh": "无色放射性稀有气体；天然存在的最重稀有气体，由镭衰变产生。" },
    "applications": { "ru": "Радоновый мониторинг зданий (ограниченное применение)", "en": "Building radon monitoring (limited use)", "zh": "建筑氡监测（有限用途）" },
    "properties": {
      "atomicMass": "222.018",
      "density": "0.00973",
      "meltingPoint": "-71.0",
      "boilingPoint": "-61.7",
      "valence": "0",
      "group": "6/VIII+",
      "block": "p",
      "aggregationState": "gas"
    },
    "thermo": {
      "fusionHeat": "3.247",
      "specificHeat": "93.65",
      "vaporizationHeat": "18.1"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,-,2,-,-,-,-,-,-,-",
      "ionizationPotential": "10.745",
      "atomicRadius": "120",
      "covalentRadius": "150",
      "vanDerWaalsRadius": "220"
    },
    "electromagnetic": {
      "magneticType": "diamagnetic"
    },
    "grid": {
      "structureCode": "4"
    },
    "additional": {
      "pubchemCid": "CID24857",
      "rtecsNumber": "RTECSVE3750000",
      "molarVolume": "0.02281603288798",
      "thermalConductivity": "0.00361"
    },
    "reactivity": {
      "electronAffinity": "-68.0"
    },
    "nucleus": {
      "halfLife": "3.8235/2",
      "lifetime": "5.5173105/2",
      "neutronCrossSection": "0.7",
      "nfpaCube": "0,4,0,RAD"
    },
    "prevalence": {
      "ocean": "6 ⋅ 10⁻²⁰"
    },
    "ghs": [
      "compressedGas",
      "acuteToxicity",
      "healthHazard"
    ],
    "radiacodeIsotope": {
      "isotope": "²²²Rn",
      "slug": "rn-222"
    },
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 222
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=ZiEmhMkOXsk",
    "productionCountries": [
      { "country": "at" },
      { "country": "cz" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "Не добывается и не производится как товар — радиоактивный газ, продукт распада урана/тория; в лечебных целях его получают на месте из радиевых источников на радоновых курортах, известных прежде всего в Австрии (Бад-Гаштайн), Чехии (Яхимов) и России.", "en": "Not mined or produced as a commodity — a radioactive decay-product gas generated on-site from radium sources for therapeutic use at radon spas, most famously in Austria (Bad Gastein), the Czech Republic (Jáchymov) and Russia.", "zh": "不作为商品开采或生产——一种放射性衰变产物气体，在氡疗养地由镭源现场产生用于治疗，最著名的是奥地利（巴德加斯坦）、捷克（亚希莫夫）和俄罗斯。" }
  },
  "Fr": {
    "overview": {
      "latinName": "Francium",
      "englishName": "Francium",
      "discoveryYear": "1939",
      "casNumber": "CAS7440-73-5",
      "discoverer": { "ru": "Маргарита Перей", "en": "Marguerite Perey", "zh": "Marguerite Perey" },
      "discoveryCountry": "FR",
      "sampleColors": [{ "hex": "#D4B060" }],
      "electronShellConfig": "K2-L8-M18-N32-O18-P8-Q1-R0",
      "electronCount": "87",
      "protonCount": "87",
      "neutronCount": "136",
      "hasImage": true,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 7s1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2 6p6 7s1"
    },
    "description": { "ru": "Крайне радиоактивный щелочной металл; все изотопы нестабильны, самый тяжёлый щелочной элемент.", "en": "An extremely radioactive alkali metal; all isotopes unstable, heaviest alkali element.", "zh": "极强放射性碱金属；所有同位素不稳定，最重的碱金属。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "223.01973",
      "density": "~2.458",
      "meltingPoint": "27.0",
      "boilingPoint": "677.0",
      "group": "7/I+",
      "block": "s",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "2.0",
      "vaporizationHeat": "65.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,1,-,-,-,-,-,-,-,-",
      "ionCharge": "1+",
      "ionizationPotential": "4.0727",
      "covalentRadius": "260",
      "vanDerWaalsRadius": "348"
    },
    "electromagnetic": {
      "magneticType": "paramagnetic"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "a=6.704 Å",
      "debyeTemperature": "39"
    },
    "additional": {
    },
    "reactivity": {
      "electronegativity": "0.7",
      "electronAffinity": "46.89"
    },
    "nucleus": {
      "halfLife": "22/4",
      "lifetime": "31.746/4",
      "nfpaCube": "4,4,3,W+RAD"
    },
    "prevalence": {},
    "ghs": [
      "flammable",
      "corrosive",
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "betaMinus",
      "isotopes": [
        {
          "mass": 223
        }
      ]
    },
    "productionCountries": [
      { "country": "fr" },
      { "country": "us" }
    ],
    "productionNote": { "ru": "Не добывается и не производится как товар (существует лишь мимолётные следы в урановых рудах) — открыт во Франции (Маргарита Пере, Институт Кюри, 1939), сегодня несколько атомов за раз получают и изучают в лазерных ловушках в лабораториях США (Стоуни-Брук).", "en": "Not mined or produced as a commodity (only fleeting trace amounts occur in uranium ores) — discovered in France (Marguerite Perey, Curie Institute, 1939), today a few atoms at a time are made and studied in laser traps at US labs (Stony Brook).", "zh": "不作为商品开采或生产（仅以铀矿中转瞬即逝的痕量存在）——于1939年在法国发现（玛格丽特·佩雷，居里研究所），如今在美国实验室（石溪大学）的激光阱中一次制备并研究几个原子。" }
  },
  "Ra": {
    "overview": {
      "latinName": "Radium",
      "englishName": "Radium",
      "discoveryYear": "1898",
      "casNumber": "CAS7440-14-4",
      "discoverer": { "ru": "Пьер Кюри, Мария Склодовская-Кюри", "en": "Pierre Curie, Marie Skłodowska Curie", "zh": "Pierre Curie, Marie Skłodowska Curie" },
      "discoveryCountry": "FR",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O18-P8-Q2-R0",
      "electronCount": "88",
      "protonCount": "88",
      "neutronCount": "138",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Rn] 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2 6p6 7s2"
    },
    "description": { "ru": "Серебристо-белый щелочноземельный металл; сильно радиоактивен, все изотопы распадаются.", "en": "A silvery-white alkaline-earth metal; highly radioactive, and all isotopes decay.", "zh": "银白色碱土金属；强放射性，所有同位素都会衰变。" },
    "applications": { "ru": "Исторически люминесцентные краски, научные исследования", "en": "Historical luminous paint, scientific research", "zh": "历史发光涂料、科学研究" },
    "properties": {
      "atomicMass": "226.032494020223",
      "density": "5.50",
      "meltingPoint": "700.0",
      "boilingPoint": "1737.0",
      "valence": "2",
      "group": "7/II+",
      "block": "s",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "8.5",
      "specificHeat": "92",
      "vaporizationHeat": "113.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,-,-,-,-,-,-,-",
      "ionCharge": "2+",
      "ionizationPotential": "5.279",
      "atomicRadius": "215",
      "covalentRadius": "221",
      "vanDerWaalsRadius": "283"
    },
    "electromagnetic": {
      "electricalConductivity": "1000000.0",
      "electricalType": "1",
      "magneticType": "diamagnetic",
      "electricalResistivity": "1 ⋅ 10⁻⁶"
    },
    "grid": {
      "structureCode": "3",
      "gridParams": "a=5.148 Å",
      "debyeTemperature": "89",
      "spaceGroup": "Im_ 3m",
      "spaceGroupNumber": "229"
    },
    "additional": {
      "pubchemCid": "CID6328144",
      "molarVolume": "0.0000452",
      "thermalConductivity": "18.6"
    },
    "reactivity": {
      "electronegativity": "0.9",
      "electronAffinity": "0"
    },
    "nucleus": {
      "halfLife": "1600/1",
      "lifetime": "2308.8/1",
      "neutronCrossSection": "13.0",
      "nfpaCube": "1,4,2,W+RAD"
    },
    "prevalence": {
      "ocean": "1.0 ⋅ 10⁻¹⁵",
      "humanBody": "4.0 ⋅ 10⁻¹⁴",
      "crust": "9.0 ⋅ 10⁻¹¹"
    },
    "ghs": [
      "flammable",
      "acuteToxicity",
      "healthHazard"
    ],
    "radiacodeIsotope": {
      "isotope": "²²⁶Ra",
      "slug": "ra-226"
    },
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 226
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=l1i0vYO4lvg",
    "productionCountries": [
      { "country": "no" }
    ],
    "productionNote": { "ru": "Исторически извлекался из урановой руды (уранинита) в Конго и Канаде, но сегодня горной добычи нет; единственная в мире площадка коммерческого производства Ra-223 (препарат Xofigo) — в Норвегии (IFE, Кьеллер), где его выделяют из Ac-227, поставляемого Национальной лабораторией Ок-Ридж (США).", "en": "Historically extracted from pitchblende ore in the Congo and Canada, but there's no mining today; the world's only commercial Ra-223 production site (for the drug Xofigo) is in Norway (IFE, Kjeller), which extracts it from Ac-227 supplied by Oak Ridge National Laboratory (US).", "zh": "历史上从刚果和加拿大的沥青铀矿中提取，但如今没有矿山开采；世界上唯一的镭-223商业生产基地（用于Xofigo药物）位于挪威（IFE，谢勒），从美国橡树岭国家实验室供应的锕-227中提取。" }
  },
  "Ac": {
    "overview": {
      "latinName": "Actinium",
      "englishName": "Actinium",
      "discoveryYear": "1899",
      "casNumber": "CAS7440-34-8",
      "discoverer": { "ru": "Андре-Луи Дебьерн", "en": "André-Louis Debierne", "zh": "André-Louis Debierne" },
      "discoveryCountry": "FR",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O18-P9-Q2-R0",
      "electronCount": "89",
      "protonCount": "89",
      "neutronCount": "138",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Rn] 6d1 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2 6p6 6d1 7s2"
    },
    "description": { "ru": "Серебристый радиоактивный актинид; начало ряда актинидов, светится голубым в темноте.", "en": "A silvery radioactive actinide; starts the actinide series and glows blue in the dark.", "zh": "银白色放射性锕系元素；锕系开端，在暗处发蓝光。" },
    "applications": { "ru": "Исследования, нейтронные источники", "en": "Research, neutron sources", "zh": "科研、中子源" },
    "properties": {
      "atomicMass": "227.025111462183",
      "density": "10.07",
      "meltingPoint": "1050.0",
      "boilingPoint": "3198.0",
      "valence": "3",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "14.0",
      "specificHeat": "120",
      "vaporizationHeat": "400.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,-,-,-,-,-,-",
      "ionCharge": "4+",
      "ionizationPotential": "5.17",
      "atomicRadius": "195",
      "covalentRadius": "215",
      "vanDerWaalsRadius": "260"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "4",
      "gridParams": "5.315 Å",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "molarVolume": "0.00002254220456802",
      "thermalConductivity": "12.0"
    },
    "reactivity": {
      "electronegativity": "1.1",
      "electronAffinity": "33.77"
    },
    "nucleus": {
      "halfLife": "21.772/1",
      "lifetime": "31.416996/1",
      "neutronCrossSection": "880.0",
      "nfpaCube": "1,4,2,W+RAD"
    },
    "prevalence": {
      "crust": "6.0 ⋅ 10⁻¹⁴"
    },
    "ghs": [
      "flammable",
      "acuteToxicity",
      "healthHazard"
    ],
    "radiacodeIsotope": {
      "isotope": "²²⁸Ac",
      "slug": "ac-228"
    },
    "isotopes": {
      "decay": "betaMinus",
      "isotopes": [
        {
          "mass": 227
        }
      ]
    },
    "productionCountries": [
      { "country": "us" },
      { "country": "de" },
      { "country": "ru" },
      { "country": "ca" }
    ],
    "productionNote": { "ru": "В природе встречается лишь в следовых количествах в урановых рудах, не добывается; практически весь актиний (Ac-225 для терапии рака) производят из генераторов Th-229 в США, Германии и России, а также на ускорителях в Канаде (TRIUMF).", "en": "Occurs naturally only in trace amounts in uranium ores, not mined; virtually all actinium (Ac-225 for cancer therapy) comes from Th-229 generators in the US, Germany and Russia, plus accelerator production in Canada (TRIUMF).", "zh": "在自然界中仅以痕量形式存在于铀矿中，不进行开采；几乎所有的锕（用于癌症治疗的锕-225）都产自美国、德国和俄罗斯的钍-229发生器，以及加拿大（TRIUMF）的加速器生产。" }
  },
  "Th": {
    "overview": {
      "latinName": "Thorium",
      "englishName": "Thorium",
      "discoveryYear": "1829",
      "casNumber": "CAS7440-29-1",
      "discoverer": { "ru": "Йёнс Якоб Берцелиус", "en": "Jöns Jakob Berzelius", "zh": "Jöns Jakob Berzelius" },
      "discoveryCountry": "SE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O18-P10-Q2-R0",
      "electronCount": "90",
      "protonCount": "90",
      "neutronCount": "142",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Rn] 6d2 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2 6p6 6d2 7s2"
    },
    "description": { "ru": "Слабо радиоактивный актинид; плотный, серебристый, в коре встречается чаще урана.", "en": "A weakly radioactive actinide; dense, silvery, and more abundant than uranium in Earth's crust.", "zh": "弱放射性锕系元素；致密银白色，地壳中比铀更丰富。" },
    "applications": { "ru": "Потенциальное ядерное топливо, газовые фонари (истор.), линзы", "en": "Potential nuclear fuel, gas mantles (legacy), lenses", "zh": "潜在核燃料、气灯罩（传统）、透镜" },
    "properties": {
      "atomicMass": "232.038041097472",
      "density": "11.72",
      "meltingPoint": "1750.0",
      "boilingPoint": "4788.0",
      "valence": "4",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "13.81",
      "specificHeat": "118",
      "thermalExpansion": "11 ⋅ 10⁻⁶",
      "vaporizationHeat": "514.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,4,-,-,-,-,-",
      "ionCharge": "4+",
      "ionizationPotential": "6.3067",
      "atomicRadius": "180",
      "covalentRadius": "206",
      "vanDerWaalsRadius": "237"
    },
    "electromagnetic": {
      "electricalConductivity": "6802721.08843537",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "8.4 ⋅ 10⁻⁵",
      "massMagneticSusceptibility": "7.2 ⋅ 10⁻⁹",
      "molarMagneticSusceptibility": "1.7 ⋅ 10⁻⁹",
      "electricalResistivity": "1.47 ⋅ 10⁻⁷",
      "superconductingTemperature": "1.38"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "5.080 Å",
      "debyeTemperature": "163",
      "spaceGroup": "Fm_ 3m",
      "spaceGroupNumber": "225"
    },
    "additional": {
      "pubchemCid": "CID23960",
      "rtecsNumber": "RTECSXO6400000",
      "brinellHardness": "400.0",
      "mohsHardness": "3.0",
      "vickersHardness": "350.0",
      "bulkModulus": "54.0",
      "youngModulus": "79.0",
      "molarVolume": "0.0000197917",
      "poissonRatio": "0.27",
      "shearModulus": "31.0",
      "soundSpeed": "2490.0",
      "thermalConductivity": "54.0"
    },
    "reactivity": {
      "electronegativity": "1.3",
      "electronAffinity": "112.72"
    },
    "nucleus": {
      "halfLife": "14050000000/1",
      "lifetime": "20274150000/1",
      "neutronCrossSection": "7.4",
      "nfpaCube": "1,4,1,RAD"
    },
    "prevalence": {
      "universe": "4 ⋅ 10⁻⁸",
      "sun": "3 ⋅ 10⁻⁸",
      "ocean": "4.0 ⋅ 10⁻¹²",
      "humanBody": "1.4268203 ⋅ 10⁻⁷",
      "crust": "9.6 ⋅ 10⁻⁴",
      "meteorites": "3.9 ⋅ 10⁻⁶"
    },
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "radiacodeIsotope": {
      "isotope": "²³²Th",
      "slug": "th-232"
    },
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 232
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=MPCSDylhs30",
    "productionCountries": [
      { "country": "in" },
      { "country": "cn" },
      { "country": "br" },
      { "country": "my" },
      { "country": "vn" }
    ],
    "productionNote": { "ru": "У тория нет отдельных месторождений — он извлекается только как побочный продукт добычи монацитовых (редкоземельных) песков, главным образом в Индии, Китае, Бразилии, Малайзии и Вьетнаме.", "en": "Thorium has no dedicated mines; it is recovered only as a byproduct of monazite (rare-earth sand) mining, chiefly in India, China, Brazil, Malaysia and Vietnam.", "zh": "钍没有专门的矿山；它仅作为独居石（稀土砂）开采的副产品回收，主要在印度、中国、巴西、马来西亚和越南。" }
  },
  "Pa": {
    "overview": {
      "latinName": "Protactinium",
      "englishName": "Protactinium",
      "discoveryYear": "1918",
      "casNumber": "CAS7440-13-3",
      "discoverer": { "ru": "Отто Ган, Лиза Мейтнер, Фредерик Содди, Джон Крэнстон", "en": "Otto Hahn, Lise Meitner, Frederick Soddy, John Cranston", "zh": "Otto Hahn, Lise Meitner, Frederick Soddy, John Cranston" },
      "discoveryCountry": "DE, GB",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O20-P9-Q2-R0",
      "electronCount": "91",
      "protonCount": "91",
      "neutronCount": "140",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Rn] 5f2 6d1 7s2 = 1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 5f2 6d1 7s2"
    },
    "description": { "ru": "Плотный серебристо-серый актинид; радиоактивен, парамагнитен, содержится в урановых рудах.", "en": "A dense, silvery-gray actinide; radioactive, paramagnetic, and found in uranium ores.", "zh": "致密银灰色锕系元素；放射性、顺磁性，存在于铀矿中。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "231.03588529293",
      "density": "15.37",
      "meltingPoint": "1568.0",
      "boilingPoint": "4027.0",
      "valence": "5",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "12.34",
      "specificHeat": "99.1",
      "thermalExpansion": "11.8 ⋅ 10⁻⁶",
      "vaporizationHeat": "481.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,-,4,5,-,-,-,-",
      "ionCharge": "4+, 5+",
      "ionizationPotential": "5.89",
      "atomicRadius": "163",
      "covalentRadius": "200",
      "vanDerWaalsRadius": "243"
    },
    "electromagnetic": {
      "electricalConductivity": "5649717.51412429",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "4.995 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "3.25 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "7.509 ⋅ 10⁻⁹",
      "electricalResistivity": "1.77 ⋅ 10⁻⁷",
      "superconductingTemperature": "1.4"
    },
    "grid": {
      "structureCode": "10",
      "gridParams": "a=3.925 Å; c=3.238 Å",
      "axialRatio": "0.82",
      "debyeTemperature": "185",
      "spaceGroup": "I4/mmm",
      "spaceGroupNumber": "139"
    },
    "additional": {
      "molarVolume": "0.0000150316",
      "thermalConductivity": "47.0"
    },
    "reactivity": {
      "electronegativity": "1.5",
      "electronAffinity": "53.03"
    },
    "nucleus": {
      "halfLife": "32570/1",
      "lifetime": "46995.0/1",
      "neutronCrossSection": "200.0",
      "nfpaCube": "1,4,2,RAD"
    },
    "prevalence": {
      "universe": "2 ⋅ 10⁻⁸",
      "ocean": "2 ⋅ 10⁻²³",
      "crust": "1.4 ⋅ 10⁻¹⁰"
    },
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "radiacodeIsotope": {
      "isotope": "²³⁴ᵐPa",
      "slug": "pa-234m"
    },
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 231
        }
      ]
    },
    "productionCountries": [
      { "country": "gb" }
    ],
    "productionNote": { "ru": "В природе встречается лишь в крайне редких следовых количествах в урановых рудах, не добывается; единственная в истории крупная партия (127 г, 1961 год) была выделена в Великобритании (Харуэлл) из 60 тонн отходов переработки урана и десятилетиями оставалась единственным мировым запасом для исследований.", "en": "Occurs naturally only in extremely rare trace amounts in uranium ores, not mined; the only sizeable batch ever made (127g, 1961) was extracted in the United Kingdom (Harwell) from 60 tons of uranium-processing waste and remained the world's sole research supply for decades.", "zh": "在自然界中仅以极其稀少的痕量形式存在于铀矿中，不进行开采；历史上唯一一批可观数量的镤（127克，1961年）在英国（哈韦尔）从60吨铀加工废料中提取，几十年来一直是世界上唯一的研究用储备。" }
  },
  "U": {
    "overview": {
      "latinName": "Uranium",
      "englishName": "Uranium",
      "discoveryYear": "1789",
      "casNumber": "CAS7440-61-1",
      "discoverer": { "ru": "Мартин Генрих Клапрот", "en": "Martin Heinrich Klaproth", "zh": "Martin Heinrich Klaproth" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#808080" }],
      "electronShellConfig": "K2-L8-M18-N32-O21-P9-Q2-R0",
      "electronCount": "92",
      "protonCount": "92",
      "neutronCount": "146",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Rn] 5f3 6d1 7s2 = 1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 5f3 6d1 7s2"
    },
    "description": { "ru": "Плотный серебристый актинид; слабо радиоактивен, самый тяжёлый элемент в значимых природных количествах.", "en": "A dense, silvery actinide; weakly radioactive, heaviest element found in significant natural abundance.", "zh": "致密银白色锕系元素；弱放射性，自然界中含量最丰富的高Z元素。" },
    "applications": { "ru": "Ядерная энергетика, броня, противовесы", "en": "Nuclear power, armor, counterweights", "zh": "核电、装甲、配重" },
    "properties": {
      "atomicMass": "238.028908960606",
      "density": "19.1",
      "meltingPoint": "1132.2",
      "boilingPoint": "4131.0",
      "valence": "2, 3, 4, 5, 6",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "9.14",
      "specificHeat": "116",
      "thermalExpansion": "15.46 ⋅ 10⁻⁶",
      "vaporizationHeat": "417.1"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,4,5,6,-,-,-",
      "ionCharge": "4+, 6+",
      "ionizationPotential": "6.194",
      "atomicRadius": "156",
      "covalentRadius": "196",
      "vanDerWaalsRadius": "186"
    },
    "electromagnetic": {
      "electricalConductivity": "3571428.57142857",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "4.11 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "2.16 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "5.14 ⋅ 10⁻⁹",
      "electricalResistivity": "2.8 ⋅ 10⁻⁷",
      "superconductingTemperature": "0.69"
    },
    "grid": {
      "structureCode": "9",
      "gridParams": "a=2.854 Å; b=5.870 Å; c=4.955 Å",
      "debyeTemperature": "248",
      "spaceGroup": "Cmcm",
      "spaceGroupNumber": "63"
    },
    "additional": {
      "pubchemCid": "CID23989",
      "rtecsNumber": "RTECSYR3490000",
      "brinellHardness": "2400.0",
      "mohsHardness": "6.0",
      "vickersHardness": "1960.0",
      "bulkModulus": "100.0",
      "youngModulus": "208.0",
      "liquidDensity": "17.3",
      "molarVolume": "0.000012495",
      "poissonRatio": "0.23",
      "shearModulus": "111.0",
      "soundSpeed": "3155.0",
      "thermalConductivity": "27.5"
    },
    "reactivity": {
      "electronegativity": "1.38",
      "electronAffinity": "30.39"
    },
    "nucleus": {
      "halfLife": "4468000000/1",
      "lifetime": "6447324000/1",
      "neutronCrossSection": "7.57",
      "nfpaCube": "1,4,1,RAD"
    },
    "prevalence": {
      "sun": "1 ⋅ 10⁻⁷",
      "ocean": "3.3 ⋅ 10⁻⁷",
      "humanBody": "1.4268203 ⋅ 10⁻⁷",
      "crust": "2.7 ⋅ 10⁻⁴",
      "meteorites": "9.8 ⋅ 10⁻⁷"
    },
    "ghs": [
      "acuteToxicity",
      "healthHazard",
      "environment"
    ],
    "radiacodeIsotope": {
      "isotope": "U (natural)",
      "slug": "uranium-nat"
    },
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 238,
          "abundance": "99.274"
        },
        {
          "mass": 235,
          "abundance": "0.720"
        },
        {
          "mass": 234,
          "abundance": "0.0054"
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=F0g06xHAQ6o",
    "productionCountries": [
      { "country": "kz", "share": "38.65" },
      { "country": "ca", "share": "23.76" },
      { "country": "na", "share": "12.18" },
      { "country": "au", "share": "7.64" },
      { "country": "uz", "share": "6.64" },
      { "country": "ru", "share": "4.55" },
      { "country": "cn", "share": "2.66" },
      { "country": "ne", "share": "1.60" },
      { "country": "in", "share": "0.83" }
    ],
    "productionNote": { "ru": "Крупнейшие страны-добытчики урана (2024).", "en": "Top uranium mining countries by 2024 output.", "zh": "2024年铀矿产量最高的国家。" }
  },
  "Np": {
    "overview": {
      "latinName": "Neptunium",
      "englishName": "Neptunium",
      "discoveryYear": "1940",
      "casNumber": "CAS7439-99-8",
      "discoverer": { "ru": "Эдвин Макмиллан, Филип Эйбелсон", "en": "Edwin McMillan, Philip Abelson", "zh": "Edwin McMillan, Philip Abelson" },
      "discoveryCountry": "US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O22-P9-Q2-R0",
      "electronCount": "93",
      "protonCount": "93",
      "neutronCount": "144",
      "hasImage": true,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f4 6d1 7s2 = 1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 5f4 6d1 7s2"
    },
    "description": { "ru": "Первый трансурановый элемент; серебристый, радиоактивный, получают в реакторах.", "en": "The first transuranium element; silvery, radioactive, and produced artificially in reactors.", "zh": "第一个超铀元素；银白色、放射性，在反应堆中人工制备。" },
    "applications": { "ru": "Научные исследования, детекторы излучения", "en": "Scientific research, radiation detectors", "zh": "科学研究、辐射探测器" },
    "properties": {
      "atomicMass": "236.981455438519",
      "density": "20.45",
      "meltingPoint": "644.0",
      "boilingPoint": "3902.0",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "5.19",
      "specificHeat": "124.3",
      "vaporizationHeat": "336.0"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,4,5,6,7,-,-",
      "ionCharge": "5+",
      "ionizationPotential": "6.266",
      "atomicRadius": "155",
      "covalentRadius": "190",
      "vanDerWaalsRadius": "221"
    },
    "electromagnetic": {
      "electricalConductivity": "819672.131147541",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "electricalResistivity": "1.22 ⋅ 10⁻⁶"
    },
    "grid": {
      "structureCode": "9",
      "gridParams": "a=6.663 Å; b=4.723 Å; c=4.887 Å",
      "debyeTemperature": "259",
      "spaceGroup": "Pnma",
      "spaceGroupNumber": "62"
    },
    "additional": {
      "bulkModulus": "118",
      "molarVolume": "0.00001158924205379",
      "thermalConductivity": "6.3"
    },
    "reactivity": {
      "electronegativity": "1.36",
      "electronAffinity": "45.85"
    },
    "nucleus": {
      "halfLife": "2144000/1",
      "lifetime": "3093792/1",
      "neutronCrossSection": "180.0",
      "nfpaCube": "1,4,2,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 237
        }
      ]
    },
    "productionCountries": [
      { "country": "fr" },
      { "country": "ru" },
      { "country": "gb" }
    ],
    "productionNote": { "ru": "Природное содержание пренебрежимо мало, не добывается; нептуний извлекается как побочный продукт переработки отработавшего ядерного топлива, крупные мощности переработки — во Франции, России и исторически в Великобритании.", "en": "Natural occurrence is negligible, not mined; neptunium is recovered as a byproduct of civilian nuclear fuel reprocessing, with major reprocessing capacity in France, Russia and historically the UK.", "zh": "天然存在量可忽略不计，不进行开采；镎作为民用核燃料后处理的副产品回收，主要后处理能力在法国、俄罗斯，历史上也包括英国。" }
  },
  "Pu": {
    "overview": {
      "latinName": "Plutonium",
      "englishName": "Plutonium",
      "discoveryYear": "1940",
      "casNumber": "CAS7440-07-5",
      "discoverer": { "ru": "Гленн Теодор Сиборг, Артур Валь, Джозеф Кеннеди, Эдвин Макмиллан", "en": "Glenn Theodore Seaborg, Arthur Wahl, Joseph Kennedy, Edwin McMillan", "zh": "Glenn Theodore Seaborg, Arthur Wahl, Joseph Kennedy, Edwin McMillan" },
      "discoveryCountry": "US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O24-P8-Q2-R0",
      "electronCount": "94",
      "protonCount": "94",
      "neutronCount": "150",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Rn] 5f6 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f6 6s2 6p6 7s2"
    },
    "description": { "ru": "Серебристый актинид; радиоактивен, токсичен, связан с историей ядерной энергетики.", "en": "A silvery actinide; radioactive, toxic, and notable for nuclear energy and weapons history.", "zh": "银白色锕系元素；放射性、有毒，与核能历史密切相关。" },
    "applications": { "ru": "Ядерное топливо, ТВЭЛы, научные исследования", "en": "Nuclear fuel, reactor fuel rods, research", "zh": "核燃料、反应堆燃料棒、科研" },
    "properties": {
      "atomicMass": "244.053191747051",
      "density": "19.84",
      "meltingPoint": "639.4",
      "boilingPoint": "3228.0",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "2.82",
      "specificHeat": "145.5",
      "thermalExpansion": "49.6 ⋅ 10⁻⁶",
      "vaporizationHeat": "333.5"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,4,5,6,7,-,-",
      "ionCharge": "4+, 6+",
      "ionizationPotential": "6.026",
      "atomicRadius": "159",
      "covalentRadius": "187",
      "vanDerWaalsRadius": "243"
    },
    "electromagnetic": {
      "electricalConductivity": "684931.506849315",
      "electricalType": "1",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "6.222 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "3.17 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "7.735 ⋅ 10⁻⁹",
      "electricalResistivity": "1.46 ⋅ 10⁻⁶"
    },
    "grid": {
      "structureCode": "12",
      "gridParams": "a=6.183 Å; b=4.822 Å; c=10.963 Å; β=101.8°",
      "debyeTemperature": "206",
      "spaceGroup": "P12₁/m1",
      "spaceGroupNumber": "11"
    },
    "additional": {
      "pubchemCid": "CID23940",
      "youngModulus": "96.0",
      "liquidDensity": "16.63",
      "molarVolume": "0.00001231328219621",
      "poissonRatio": "0.21",
      "shearModulus": "43.0",
      "soundSpeed": "2260.0",
      "thermalConductivity": "6.74"
    },
    "reactivity": {
      "electronegativity": "1.28",
      "electronAffinity": "-48.33"
    },
    "nucleus": {
      "halfLife": "81300000/1",
      "lifetime": "117315900/1",
      "neutronCrossSection": "1.7",
      "nfpaCube": "2,4,2,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 244
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=9K5KvwYrJsA",
    "productionCountries": [
      { "country": "us" },
      { "country": "ru" },
      { "country": "fr" },
      { "country": "gb" }
    ],
    "productionNote": { "ru": "Не добывается; практически весь плутоний производится в ядерных реакторах и выделяется при переработке топлива, крупные производственные мощности — в США, России, Франции и Великобритании.", "en": "Not mined; virtually all plutonium is produced in nuclear reactors and separated during fuel reprocessing, with major production capacity in the US, Russia, France and the UK.", "zh": "不进行开采；几乎所有的钚都在核反应堆中生产，并在燃料后处理过程中分离，主要生产能力在美国、俄罗斯、法国和英国。" }
  },
  "Am": {
    "overview": {
      "latinName": "Americium",
      "englishName": "Americium",
      "discoveryYear": "1944",
      "casNumber": "CAS7440-35-9",
      "discoverer": { "ru": "Гленн Теодор Сиборг, Ральф Джеймс, Леон Морган, Альберт Гиорсо", "en": "Glenn Theodore Seaborg, Ralph James, Leon Morgan, Albert Ghiorso", "zh": "Glenn Theodore Seaborg, Ralph James, Leon Morgan, Albert Ghiorso" },
      "discoveryCountry": "US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O25-P8-Q2-R0",
      "electronCount": "95",
      "protonCount": "95",
      "neutronCount": "148",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Rn] 5f7 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f7 6s2 6p6 7s2"
    },
    "description": { "ru": "Серебристый актинид; радиоактивный синтетический элемент, назван в честь Америки.", "en": "A silvery actinide; radioactive, synthetic, and named after America; used in smoke detectors.", "zh": "银白色锕系元素；放射性人造元素，以美洲命名。" },
    "applications": { "ru": "Дымовые детекторы, источники альфа-излучения", "en": "Smoke detectors, alpha sources", "zh": "烟雾探测器、α放射源" },
    "properties": {
      "atomicMass": "242.934108985274",
      "density": "13.67",
      "meltingPoint": "1176.0",
      "boilingPoint": "2011.0",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "14.39",
      "specificHeat": "115.2",
      "thermalExpansion": "7.1 ⋅ 10⁻⁶"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,4,5,6,7,-,-",
      "ionCharge": "3+, 4+",
      "ionizationPotential": "5.974",
      "atomicRadius": "173",
      "covalentRadius": "180",
      "vanDerWaalsRadius": "244"
    },
    "electromagnetic": {
      "electricalConductivity": "1451378.80986938",
      "magneticType": "paramagnetic",
      "volumeMagneticSusceptibility": "7.04 ⋅ 10⁻⁴",
      "massMagneticSusceptibility": "5.15 ⋅ 10⁻⁸",
      "molarMagneticSusceptibility": "1.251 ⋅ 10⁻⁸",
      "electricalResistivity": "6.89 ⋅ 10⁻⁷",
      "superconductingTemperature": "0.6"
    },
    "grid": {
      "structureCode": "11",
      "gridParams": "a=3.468 Å; c=11.24 Å",
      "axialRatio": "3.24",
      "debyeTemperature": "121",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "molarVolume": "0.00001777615215801",
      "thermalConductivity": "10.0"
    },
    "reactivity": {
      "electronegativity": "1.3",
      "electronAffinity": "9.93"
    },
    "nucleus": {
      "halfLife": "7370/1",
      "lifetime": "10634.91/1",
      "neutronCrossSection": "74.0",
      "nfpaCube": "1,4,1,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "radiacodeIsotope": {
      "isotope": "²⁴¹Am",
      "slug": "am-241"
    },
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 243
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=XQcoKrtjfwc",
    "productionCountries": [
      { "country": "us" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался; для дымовых извещателей его нарабатывают в реакторах — Лос-Аламосская национальная лаборатория (США, единственный отечественный поставщик с 2020 года) и Россия.", "en": "Synthetic, never mined; produced in reactors for smoke detectors — Los Alamos National Laboratory (US, the sole domestic supplier since 2020) and Russia.", "zh": "合成元素，从未被开采过；在反应堆中生产用于烟雾探测器——美国洛斯阿拉莫斯国家实验室（自2020年起为美国国内唯一供应商）和俄罗斯。" }
  },
  "Cm": {
    "overview": {
      "latinName": "Curium",
      "englishName": "Curium",
      "discoveryYear": "1944",
      "casNumber": "CAS7440-51-9",
      "discoverer": { "ru": "Гленн Теодор Сиборг, Ральф Джеймс, Альберт Гиорсо", "en": "Glenn Theodore Seaborg, Ralph James, Albert Ghiorso", "zh": "Glenn Theodore Seaborg, Ralph James, Albert Ghiorso" },
      "discoveryCountry": "US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O25-P9-Q2-R0",
      "electronCount": "96",
      "protonCount": "96",
      "neutronCount": "151",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Rn] 5f7 6d1 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f7 6s2 6p6 6d1 7s2"
    },
    "description": { "ru": "Серебристый актинид; радиоактивен, синтетический; кюрий слабо светится фиолетовым от собственного излучения.", "en": "A silvery actinide; radioactive and synthetic; curium glows purple in the dark due to self-irradiation.", "zh": "银白色锕系元素；放射性人造元素；锔因自身辐射而发紫光。" },
    "applications": { "ru": "Научные исследования, космические источники питания", "en": "Scientific research, space power sources", "zh": "科学研究、太空电源" },
    "properties": {
      "atomicMass": "247.092408999006",
      "density": "13.51",
      "meltingPoint": "1340.0",
      "boilingPoint": "3110.0",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "13.85"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,4,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "5.9915",
      "atomicRadius": "174",
      "covalentRadius": "169",
      "vanDerWaalsRadius": "245"
    },
    "electromagnetic": {
      "electricalConductivity": "800000.0",
      "magneticType": "paramagnetic",
      "electricalResistivity": "1.25 ⋅ 10⁻⁶"
    },
    "grid": {
      "structureCode": "11",
      "gridParams": "a=3.496 Å; c=11.33 Å",
      "axialRatio": "3.24",
      "debyeTemperature": "123",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "molarVolume": "0.00001828275351591"
    },
    "reactivity": {
      "electronegativity": "1.3",
      "electronAffinity": "27.17"
    },
    "nucleus": {
      "halfLife": "15600000/1",
      "lifetime": "22510800/1",
      "neutronCrossSection": "57.0",
      "nfpaCube": "1,4,2,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 247
        }
      ]
    },
    "productionCountries": [
      { "country": "us" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — производится только в следовых количествах в ядерных реакторах, в частности в Национальной лаборатории Ок-Ридж (США) и в России.", "en": "Synthetic, never mined — produced only in trace quantities in nuclear reactors, notably at Oak Ridge National Laboratory (US) and in Russia.", "zh": "合成元素，从未被开采过——仅在核反应堆中微量生产，主要产自美国橡树岭国家实验室和俄罗斯。" }
  },
  "Bk": {
    "overview": {
      "latinName": "Berkelium",
      "englishName": "Berkelium",
      "discoveryYear": "1949",
      "casNumber": "CAS7440-40-6",
      "discoverer": { "ru": "Гленн Теодор Сиборг, Альберт Гиорсо, Стэнли Томпсон", "en": "Glenn Theodore Seaborg, Albert Ghiorso, Stanley G. Thompson", "zh": "Glenn Theodore Seaborg, Albert Ghiorso, Stanley G. Thompson" },
      "discoveryCountry": "US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O27-P8-Q2-R0",
      "electronCount": "97",
      "protonCount": "97",
      "neutronCount": "150",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Rn] 5f9 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f9 6s2 6p6 7s2"
    },
    "description": { "ru": "Радиоактивный актинид; серебристый, синтетический, назван в честь Беркли, высокотоксичен.", "en": "A radioactive actinide; silvery, synthetic, and named after Berkeley; highly toxic.", "zh": "放射性锕系元素；银白色人造元素，以伯克利命名，高毒。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "247.07806947346",
      "density": "14.78",
      "meltingPoint": "986.0",
      "boilingPoint": "2627.0",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "7.92"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,4,-,-,-,-,-",
      "ionCharge": "3+, 4+",
      "ionizationPotential": "6.23",
      "atomicRadius": "170",
      "covalentRadius": "168",
      "vanDerWaalsRadius": "244"
    },
    "electromagnetic": {
      "magneticType": "paramagnetic"
    },
    "grid": {
      "structureCode": "11",
      "gridParams": "a=3.416 Å; c=11.07 Å",
      "axialRatio": "3.24",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "pubchemCid": "CID23971",
      "molarVolume": "0.00001671177266576",
      "thermalConductivity": "10.0"
    },
    "reactivity": {
      "electronegativity": "1.3",
      "electronAffinity": "-165.24"
    },
    "nucleus": {
      "halfLife": "1380/1",
      "lifetime": "1991.34/1",
      "neutronCrossSection": "710.0",
      "nfpaCube": "1,4,2,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 247
        }
      ]
    },
    "productionCountries": [
      { "country": "us" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — производится только в миллиграммовых количествах в Национальной лаборатории Ок-Ридж (США), единственном в мире источнике.", "en": "Synthetic, never mined — produced only in milligram quantities at Oak Ridge National Laboratory (US), the world's sole source.", "zh": "合成元素，从未被开采过——仅在美国橡树岭国家实验室以毫克级数量生产，是世界上唯一的来源。" }
  },
  "Cf": {
    "overview": {
      "latinName": "Californium",
      "englishName": "Californium",
      "discoveryYear": "1950",
      "casNumber": "CAS7440-71-3",
      "discoverer": { "ru": "Гленн Теодор Сиборг, Стэнли Томпсон, Кеннет Стрит-младший, Альберт Гиорсо", "en": "Glenn Theodore Seaborg, Stanley G. Thompson, Kenneth Street Jr., Albert Ghiorso", "zh": "Glenn Theodore Seaborg, Stanley G. Thompson, Kenneth Street Jr., Albert Ghiorso" },
      "discoveryCountry": "US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O28-P8-Q2-R0",
      "electronCount": "98",
      "protonCount": "98",
      "neutronCount": "153",
      "hasImage": true,
      "hasSpectre": true,
      "electronConfiguration": "[Rn] 5f10 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f10 6s2 6p6 7s2"
    },
    "description": { "ru": "Серебристый актинид; радиоактивен, синтетический, впервые получен в 1950 году.", "en": "A silvery actinide; radioactive, synthetic, and first produced in microscopic quantities in 1950.", "zh": "银白色锕系元素；放射性人造元素，1950年首次制得。" },
    "applications": { "ru": "Промышленные нейтронные источники, научные исследования", "en": "Industrial neutron sources, research", "zh": "工业中子源、科研" },
    "properties": {
      "atomicMass": "251.079587",
      "density": "15.1",
      "meltingPoint": "900.0",
      "boilingPoint": "1472.0",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,4,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "6.30",
      "covalentRadius": "168",
      "vanDerWaalsRadius": "245"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "11",
      "gridParams": "a=3.38 Å; c=11.03 Å",
      "axialRatio": "3.26",
      "spaceGroup": "P6₃/mmc",
      "spaceGroupNumber": "194"
    },
    "additional": {
      "molarVolume": "0.00001662251655629"
    },
    "reactivity": {
      "electronegativity": "1.3",
      "electronAffinity": "-97.31"
    },
    "nucleus": {
      "halfLife": "900/1",
      "lifetime": "1298.7/1",
      "neutronCrossSection": "2900.0",
      "nfpaCube": "1,4,2,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 251
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=P0cFU47hD0s",
    "productionCountries": [
      { "country": "us" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — как источник нейтронов производится в миллиграммовых количествах в Национальной лаборатории Ок-Ридж (США, единственный производитель в западном мире) и в России.", "en": "Synthetic, never mined — produced in milligram quantities as a neutron source material at Oak Ridge National Laboratory (US, the only producer in the Western world) and in Russia.", "zh": "合成元素，从未被开采过——作为中子源材料以毫克级数量生产，产自美国橡树岭国家实验室（西方世界唯一的生产者）和俄罗斯。" }
  },
  "Es": {
    "overview": {
      "latinName": "Einsteinium",
      "englishName": "Einsteinium",
      "discoveryYear": "1952",
      "casNumber": "CAS7429-92-7",
      "discoverer": { "ru": "Альберт Гиорсо, Грегори Чоппин, Бернард Харви, Стэнли Томпсон, Гленн Теодор Сиборг", "en": "Albert Ghiorso, Gregory Choppin, Bernard Harvey, Stanley G. Thompson, Glenn Theodore Seaborg", "zh": "Albert Ghiorso, Gregory Choppin, Bernard Harvey, Stanley G. Thompson, Glenn Theodore Seaborg" },
      "discoveryCountry": "US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O29-P8-Q2-R0",
      "electronCount": "99",
      "protonCount": "99",
      "neutronCount": "153",
      "hasImage": true,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f11 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f11 6s2 6p6 7s2"
    },
    "description": { "ru": "Серебристый актинид; синтетический и радиоактивный, назван в честь Эйнштейна, стабильных изотопов нет.", "en": "A silvery actinide; synthetic and radioactive; named after Einstein; no stable isotopes.", "zh": "银白色锕系元素；人造放射性元素，以爱因斯坦命名，无稳定同位素。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "252.082980",
      "density": "~8.84",
      "meltingPoint": "860.0",
      "boilingPoint": "996.0",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,-,2,3,4,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "6.42",
      "covalentRadius": "165",
      "vanDerWaalsRadius": "245"
    },
    "electromagnetic": {
      "magneticType": "paramagnetic"
    },
    "grid": {
      "structureCode": "4",
      "gridParams": "5.75 Å"
    },
    "additional": {},
    "reactivity": {
      "electronegativity": "1.3",
      "electronAffinity": "-28.6"
    },
    "nucleus": {
      "halfLife": "275.7/2",
      "lifetime": "397.8351/2",
      "nfpaCube": "1,4,2,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 254
        }
      ]
    },
    "productionCountries": [
      { "country": "us" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые обнаружен в продуктах американского термоядерного испытания 1952 года; сегодня лишь изредка нарабатывается в следовых количествах в национальных лабораториях США.", "en": "Synthetic, never mined — first identified in debris from a 1952 US thermonuclear test; today only occasionally made in trace quantities at US national laboratories.", "zh": "合成元素，从未被开采过——首次在1952年美国热核试验的残留物中发现；如今仅偶尔在美国国家实验室中微量制备。" }
  },
  "Fm": {
    "overview": {
      "latinName": "Fermium",
      "englishName": "Fermium",
      "discoveryYear": "1952",
      "casNumber": "CAS7440-72-4",
      "discoverer": { "ru": "Гленн Теодор Сиборг, Альберт Гиорсо, Стэнли Томпсон", "en": "Glenn Theodore Seaborg, Albert Ghiorso, Stanley G. Thompson", "zh": "Glenn Theodore Seaborg, Albert Ghiorso, Stanley G. Thompson" },
      "discoveryCountry": "US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O30-P8-Q2-R0",
      "electronCount": "100",
      "protonCount": "100",
      "neutronCount": "157",
      "hasImage": true,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f12 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f11 6s2 6p6 7s2"
    },
    "description": { "ru": "Серебристый актинид; синтетический, радиоактивный, назван в честь Ферми, крайне редок.", "en": "A silvery actinide; synthetic, radioactive, and named after Fermi; extremely rare.", "zh": "银白色锕系元素；人造放射性元素，以费米命名，极其稀少。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "257.095105",
      "density": "~9.7",
      "meltingPoint": "1527.0",
      "boilingPoint": "**",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "6.50",
      "covalentRadius": "167",
      "vanDerWaalsRadius": "245"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "4"
    },
    "additional": {},
    "reactivity": {
      "electronegativity": "1.3",
      "electronAffinity": "33.96"
    },
    "nucleus": {
      "halfLife": "100.5/2",
      "lifetime": "145.0215/2",
      "neutronCrossSection": "5800.0",
      "nfpaCube": "1,4,2,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 257
        }
      ]
    },
    "productionCountries": [
      { "country": "us" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые обнаружен в продуктах американского термоядерного испытания, производится лишь в количестве отдельных атомов в национальных лабораториях США.", "en": "Synthetic, never mined — first identified in US thermonuclear test debris, produced only in atom quantities at US national laboratories.", "zh": "合成元素，从未被开采过——首次在美国热核试验残留物中发现，仅在美国国家实验室以单个原子级别的数量生产。" }
  },
  "Md": {
    "overview": {
      "latinName": "Mendelevium",
      "englishName": "Mendelevium",
      "discoveryYear": "1955",
      "casNumber": "CAS7440-11-1",
      "discoverer": { "ru": "Гленн Теодор Сиборг, Альберт Гиорсо, Грегори Чоппин, Бернард Харви, Стэнли Томпсон", "en": "Glenn Theodore Seaborg, Albert Ghiorso, Gregory Choppin, Bernard Harvey, Stanley G. Thompson", "zh": "Glenn Theodore Seaborg, Albert Ghiorso, Gregory Choppin, Bernard Harvey, Stanley G. Thompson" },
      "discoveryCountry": "US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O31-P8-Q2-R0",
      "electronCount": "101",
      "protonCount": "101",
      "neutronCount": "157",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f13 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f13 6s2 6p6 7s2"
    },
    "description": { "ru": "Радиоактивный актинид; синтетический, назван в честь Менделеева, получен в 1955 году.", "en": "A radioactive actinide; synthetic, named after Mendeleev; first produced in 1955.", "zh": "放射性锕系元素；人造元素，以门捷列夫命名，1955年制得。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "258.098434",
      "density": "~10.3",
      "meltingPoint": "827.0",
      "boilingPoint": "**",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionCharge": "2+, 3+",
      "ionizationPotential": "6.58",
      "covalentRadius": "173",
      "vanDerWaalsRadius": "246"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "4"
    },
    "additional": {},
    "reactivity": {
      "electronegativity": "1.3",
      "electronAffinity": "93.91"
    },
    "nucleus": {
      "halfLife": "51.5/2",
      "lifetime": "74.3145/2",
      "nfpaCube": "1,4,2,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 258
        }
      ]
    },
    "productionCountries": [
      { "country": "us" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен бомбардировкой на циклотроне в Беркли (США), до сих пор производится лишь по несколько атомов за раз.", "en": "Synthetic, never mined — first produced by cyclotron bombardment at Berkeley (US) and still made only a few atoms at a time.", "zh": "合成元素，从未被开采过——首次通过美国伯克利的回旋加速器轰击制得，至今仍每次仅能制备几个原子。" }
  },
  "No": {
    "overview": {
      "latinName": "Nobelium",
      "englishName": "Nobelium",
      "discoveryYear": "1966",
      "casNumber": "CAS10028-14-5",
      "discoverer": { "ru": "Георгий Николаевич Флёров, Объединённый институт ядерных исследований (ОИЯИ)", "en": "Georgiy Flerov, Joint Institute for Nuclear Research (JINR)", "zh": "Georgiy Flerov, Joint Institute for Nuclear Research (JINR)" },
      "discoveryCountry": "RU",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P8-Q2-R0",
      "electronCount": "102",
      "protonCount": "102",
      "neutronCount": "157",
      "hasImage": true,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 7s2"
    },
    "description": { "ru": "Радиоактивный актинид; синтетический, назван в честь Нобеля, изотопы очень недолговечны.", "en": "A radioactive actinide; synthetic, named after Nobel; extremely short-lived isotopes.", "zh": "放射性锕系元素；人造元素，以诺贝尔命名，同位素寿命极短。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "259.100998",
      "density": "~9.9",
      "meltingPoint": "827.0",
      "boilingPoint": "**",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,3,-,-,-,-,-,-",
      "ionCharge": "2+, 3+",
      "ionizationPotential": "6.6262",
      "covalentRadius": "176",
      "vanDerWaalsRadius": "246"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "4"
    },
    "additional": {},
    "reactivity": {
      "electronegativity": "1.3",
      "electronAffinity": "-223.22"
    },
    "nucleus": {
      "halfLife": "58.4/4",
      "lifetime": "83.694/4",
      "nfpaCube": "1,4,2,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 259
        }
      ]
    },
    "productionCountries": [
      { "country": "ru" },
      { "country": "us" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен на ускорителях частиц в Дубне (Россия) и Беркли (США), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced via particle accelerators at Dubna (Russia) and Berkeley (US), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次通过俄罗斯杜布纳和美国伯克利的粒子加速器制得，仅以单个原子级别的数量生产。" }
  },
  "Lr": {
    "overview": {
      "latinName": "Lawrencium",
      "englishName": "Lawrencium",
      "discoveryYear": "1961",
      "casNumber": "CAS22537-19-5",
      "discoverer": { "ru": "Альберт Гиорсо, Георгий Николаевич Флёров", "en": "Albert Ghiorso, Georgiy Flerov", "zh": "Albert Ghiorso, Georgiy Flerov" },
      "discoveryCountry": "US, RU",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P8-Q3-R0",
      "electronCount": "103",
      "protonCount": "103",
      "neutronCount": "163",
      "hasImage": true,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d1 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d1 7s2"
    },
    "description": { "ru": "Радиоактивный актинид; синтетический, назван в честь Лоуренса, последний актинид в ряду.", "en": "A radioactive actinide; synthetic, named after Lawrence; last actinide and heaviest element in the row.", "zh": "放射性锕系元素；人造元素，以劳伦斯命名，锕系最后一个。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "264.862022387989",
      "density": "~15.6",
      "meltingPoint": "1627.0",
      "boilingPoint": "**",
      "group": "7/III-",
      "block": "f",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionCharge": "3+",
      "ionizationPotential": "4.965",
      "atomicRadius": "171",
      "covalentRadius": "161",
      "vanDerWaalsRadius": "246"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "2"
    },
    "additional": {},
    "reactivity": {
      "electronegativity": "1.3",
      "electronAffinity": "-30.04"
    },
    "nucleus": {
      "halfLife": "11/3",
      "lifetime": "15.873/3",
      "nfpaCube": "1,4,2,W+RAD"
    },
    "prevalence": {},
    "ghs": [
      "flammable",
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "spontaneousFission",
      "isotopes": [
        {
          "mass": 266
        }
      ]
    },
    "productionCountries": [
      { "country": "us" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в Беркли (США) и Дубне (Россия), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at Berkeley (US) and Dubna (Russia), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次在美国伯克利和俄罗斯杜布纳制得，仅以单个原子级别的数量生产。" }
  },
  "Rf": {
    "overview": {
      "latinName": "Rutherfordium",
      "englishName": "Rutherfordium",
      "discoveryYear": "1969",
      "casNumber": "CAS53850-36-5",
      "discoverer": { "ru": "Георгий Николаевич Флёров, Альберт Гиорсо", "en": "Georgiy Flerov, Albert Ghiorso", "zh": "Georgiy Flerov, Albert Ghiorso" },
      "discoveryCountry": "RU, US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P10-Q2-R0",
      "electronCount": "104",
      "protonCount": "104",
      "neutronCount": "157",
      "hasImage": true,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d2 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d2 7s2"
    },
    "description": { "ru": "Синтетический переходный металл; радиоактивен, первый трансактинид, изотопы очень недолговечны.", "en": "A synthetic transition metal; radioactive, first transactinide, extremely short-lived.", "zh": "人造过渡金属；放射性，第一个超锕元素，同位素极不稳定。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "266.32341341081",
      "density": "~17",
      "meltingPoint": "2100.0",
      "boilingPoint": "**",
      "group": "7/IV-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,-,4,-,-,-,-,-",
      "atomicRadius": "150",
      "covalentRadius": "157"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "2"
    },
    "additional": {},
    "reactivity": {},
    "nucleus": {
      "halfLife": "78/4",
      "lifetime": "1.8/3",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "spontaneousFission",
      "isotopes": [
        {
          "mass": 267
        }
      ]
    },
    "productionCountries": [
      { "country": "ru" },
      { "country": "us" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в Дубне (Россия) и Беркли (США) на ускорителях частиц, производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at Dubna (Russia) and Berkeley (US) via particle accelerators, made only in atom quantities.", "zh": "合成元素，从未被开采过——首次通过俄罗斯杜布纳和美国伯克利的粒子加速器制得，仅以单个原子级别的数量生产。" }
  },
  "Db": {
    "overview": {
      "latinName": "Dubnium",
      "englishName": "Dubnium",
      "discoveryYear": "1970",
      "casNumber": "CAS53850-35-4",
      "discoverer": { "ru": "Георгий Николаевич Флёров, Альберт Гиорсо", "en": "Georgiy Flerov, Albert Ghiorso", "zh": "Georgiy Flerov, Albert Ghiorso" },
      "discoveryCountry": "RU, US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P11-Q2-R0",
      "electronCount": "105",
      "protonCount": "105",
      "neutronCount": "157",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d3 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d3 7s2"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, назван в честь Дубны, известен лишь в исследовательских количествах.", "en": "A synthetic transition element; radioactive, named after Dubna; known only in research quantities.", "zh": "人造元素；放射性，以杜布纳命名，仅研究量级。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "268.142818454282",
      "density": "~21.6",
      "meltingPoint": "**",
      "boilingPoint": "**",
      "group": "7/V-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,4,5,-,-,-,-",
      "atomicRadius": "139",
      "covalentRadius": "149"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "3"
    },
    "additional": {},
    "reactivity": {},
    "nucleus": {
      "halfLife": "16/3",
      "lifetime": "23.083/3",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "spontaneousFission",
      "isotopes": [
        {
          "mass": 268
        }
      ]
    },
    "productionCountries": [
      { "country": "ru" },
      { "country": "us" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в Дубне (Россия) и Беркли (США), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at Dubna (Russia) and Berkeley (US), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次在俄罗斯杜布纳和美国伯克利制得，仅以单个原子级别的数量生产。" }
  },
  "Sg": {
    "overview": {
      "latinName": "Seaborgium",
      "englishName": "Seaborgium",
      "discoveryYear": "1974",
      "casNumber": "CAS54038-81-2",
      "discoverer": { "ru": "Альберт Гиорсо, Гленн Теодор Сиборг", "en": "Albert Ghiorso, Glenn Theodore Seaborg", "zh": "Albert Ghiorso, Glenn Theodore Seaborg" },
      "discoveryCountry": "US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P12-Q2-R0",
      "electronCount": "106",
      "protonCount": "106",
      "neutronCount": "163",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d4 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d4 7s2"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, назван в честь Сиборга, получают по одному атому в ускорителях.", "en": "A synthetic element; radioactive, named after Seaborg; produced atom by atom in accelerators.", "zh": "人造元素；放射性，以西博格命名，在加速器中逐个原子合成。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "270.486936755388",
      "density": "~23.2",
      "meltingPoint": "**",
      "boilingPoint": "**",
      "group": "7/VI-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,-,-,-,6,-,-,-",
      "atomicRadius": "132",
      "covalentRadius": "143"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "3"
    },
    "additional": {},
    "reactivity": {},
    "nucleus": {
      "halfLife": "96/5",
      "lifetime": "138.5/5",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 271
        }
      ]
    },
    "productionCountries": [
      { "country": "us" },
      { "country": "ru" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в Беркли (США) и Дубне (Россия), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at Berkeley (US) and Dubna (Russia), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次在美国伯克利和俄罗斯杜布纳制得，仅以单个原子级别的数量生产。" }
  },
  "Bh": {
    "overview": {
      "latinName": "Bohrium",
      "englishName": "Bohrium",
      "discoveryYear": "1981",
      "casNumber": "CAS54037-14-8",
      "discoverer": { "ru": "Питер Армбрустер, Готфрид Мюнценберг", "en": "Peter Armbruster, Gottfried Münzenberg", "zh": "Peter Armbruster, Gottfried Münzenberg" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P13-Q2-R0",
      "electronCount": "107",
      "protonCount": "107",
      "neutronCount": "160",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d5 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d5 7s2"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, назван в честь Бора, существует лишь мгновения.", "en": "A synthetic element; radioactive, named after Bohr; exists only as fleeting atoms.", "zh": "人造元素；放射性，以玻尔命名，仅存在极短时间。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "270.929231154427",
      "meltingPoint": "**",
      "boilingPoint": "**",
      "group": "7/VII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,-,-,-,-,7,-,-",
      "atomicRadius": "128",
      "covalentRadius": "141"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "2"
    },
    "additional": {},
    "reactivity": {},
    "nucleus": {
      "halfLife": "2.4/4",
      "lifetime": "3.4625/4",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 270
        }
      ]
    },
    "productionCountries": [
      { "country": "de" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в GSI Дармштадт (Германия) на ускорителях частиц, производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at GSI Darmstadt (Germany), made only in atom quantities via particle accelerators.", "zh": "合成元素，从未被开采过——首次在德国达姆施塔特重离子研究中心（GSI）制得，仅以单个原子级别的数量生产。" }
  },
  "Hs": {
    "overview": {
      "latinName": "Hassium",
      "englishName": "Hassium",
      "discoveryYear": "1984",
      "casNumber": "CAS54037-57-9",
      "discoverer": { "ru": "Питер Армбрустер, Готфрид Мюнценберг", "en": "Peter Armbruster, Gottfried Münzenberg", "zh": "Peter Armbruster, Gottfried Münzenberg" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P14-Q2-R0",
      "electronCount": "108",
      "protonCount": "108",
      "neutronCount": "161",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d6 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d6 7s2"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, назван в честь Гессена, один из первых сверхтяжёлых элементов, полученных наукой.", "en": "A synthetic element; radioactive, named after Hesse; one of the first superheavy elements ever produced.", "zh": "人造元素；放射性，以黑森命名，是最早合成的超重元素之一。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "275.381591197533",
      "density": "~29.3",
      "meltingPoint": "**",
      "boilingPoint": "**",
      "group": "7/VIII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,-,-,-,-,-,8,-",
      "atomicRadius": "126",
      "covalentRadius": "134"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "2"
    },
    "additional": {},
    "reactivity": {},
    "nucleus": {
      "halfLife": "46/5",
      "lifetime": "66.36/5",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 271
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=URrKWQHfAoE",
    "productionCountries": [
      { "country": "de" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в GSI Дармштадт (Германия), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at GSI Darmstadt (Germany), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次在德国达姆施塔特重离子研究中心（GSI）制得，仅以单个原子级别的数量生产。" }
  },
  "Mt": {
    "overview": {
      "latinName": "Meitnerium",
      "englishName": "Meitnerium",
      "discoveryYear": "1982",
      "casNumber": "CAS54038-01-6",
      "discoverer": { "ru": "Питер Армбрустер, Готфрид Мюнценберг", "en": "Peter Armbruster, Gottfried Münzenberg", "zh": "Peter Armbruster, Gottfried Münzenberg" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P15-Q2-R0",
      "electronCount": "109",
      "protonCount": "109",
      "neutronCount": "169",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d7 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d7 7s2"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, назван в честь Мейтнер, одно из редчайших веществ на Земле.", "en": "A synthetic element; radioactive, named after Meitner; one of the rarest substances on Earth.", "zh": "人造元素；放射性，以迈特纳命名，地球上最稀有的物质之一。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "278.130923401647",
      "meltingPoint": "**",
      "boilingPoint": "**",
      "group": "7/VIII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,4,-,6,-,-,-",
      "ionizationPotential": "8.29",
      "atomicRadius": "128",
      "covalentRadius": "129"
    },
    "electromagnetic": {
      "magneticType": "paramagnetic"
    },
    "grid": {
      "structureCode": "4"
    },
    "additional": {},
    "reactivity": {},
    "nucleus": {
      "halfLife": "4.5/5",
      "lifetime": "6.4921/5",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 278
        }
      ]
    },
    "productionCountries": [
      { "country": "de" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в GSI Дармштадт (Германия), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at GSI Darmstadt (Germany), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次在德国达姆施塔特重离子研究中心（GSI）制得，仅以单个原子级别的数量生产。" }
  },
  "Ds": {
    "overview": {
      "latinName": "Darmstadtium",
      "englishName": "Darmstadtium",
      "discoveryYear": "1994",
      "casNumber": "CAS54083-77-1",
      "discoverer": { "ru": "GSI (Институт тяжёлых ионов)", "en": "GSI (Helmholtzzentrum für Schwerionenforschung)", "zh": "GSI (Helmholtzzentrum für Schwerionenforschung)" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P17-Q1-R0",
      "electronCount": "110",
      "protonCount": "110",
      "neutronCount": "171",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d8 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d8 7s2"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, крайне нестабилен, известен лишь по нескольким атомам.", "en": "A synthetic element; radioactive, extremely unstable, known only from a handful of atoms.", "zh": "人造元素；放射性，极不稳定，仅知少数原子。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "282.575485574983",
      "meltingPoint": "**",
      "boilingPoint": "**",
      "group": "7/VIII-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,-,4,-,6,-,-,-",
      "ionizationPotential": "9.95",
      "atomicRadius": "132",
      "covalentRadius": "128"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "3"
    },
    "additional": {},
    "reactivity": {},
    "nucleus": {
      "halfLife": "12/5",
      "lifetime": "17.3123/5",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "spontaneousFission",
      "isotopes": [
        {
          "mass": 281
        }
      ]
    },
    "productionCountries": [
      { "country": "de" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в GSI Дармштадт (Германия), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at GSI Darmstadt (Germany), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次在德国达姆施塔特重离子研究中心（GSI）制得，仅以单个原子级别的数量生产。" }
  },
  "Rg": {
    "overview": {
      "latinName": "Roentgenium",
      "englishName": "Roentgenium",
      "discoveryYear": "1994",
      "casNumber": "CAS54386-24-2",
      "discoverer": { "ru": "GSI (Институт тяжёлых ионов)", "en": "GSI (Helmholtzzentrum für Schwerionenforschung)", "zh": "GSI (Helmholtzzentrum für Schwerionenforschung)" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P18-Q1-R0",
      "electronCount": "111",
      "protonCount": "111",
      "neutronCount": "171",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d9 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d9 7s2"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, возможно металл, назван в честь Рентгена, макрообразцов нет.", "en": "A synthetic element; radioactive, possibly metallic, named after Roentgen; no macroscopic samples.", "zh": "人造元素；放射性，可能为金属，以伦琴命名，无宏观样品。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "283.085549304907",
      "meltingPoint": "**",
      "boilingPoint": "**",
      "group": "7/I-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,1,0,1,-,3,-,5,-,7,-,-",
      "ionizationPotential": "10.57",
      "atomicRadius": "114",
      "covalentRadius": "121"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "3"
    },
    "additional": {},
    "reactivity": {
      "electronAffinity": "151.0"
    },
    "nucleus": {
      "halfLife": "100/5",
      "lifetime": "144.2695/5",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 282
        }
      ]
    },
    "productionCountries": [
      { "country": "de" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в GSI Дармштадт (Германия), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at GSI Darmstadt (Germany), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次在德国达姆施塔特重离子研究中心（GSI）制得，仅以单个原子级别的数量生产。" }
  },
  "Cn": {
    "overview": {
      "latinName": "Copernicium",
      "englishName": "Copernicium",
      "discoveryYear": "1996",
      "casNumber": "CAS54084-26-3",
      "discoverer": { "ru": "GSI (Институт тяжёлых ионов)", "en": "GSI (Helmholtzzentrum für Schwerionenforschung)", "zh": "GSI (Helmholtzzentrum für Schwerionenforschung)" },
      "discoveryCountry": "DE",
      "sampleColors": [{ "hex": "#B8B8C8" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P18-Q2-R0",
      "electronCount": "112",
      "protonCount": "112",
      "neutronCount": "173",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d10 7s2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d10 7s2"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, возможно летучий металл, назван в честь Коперника.", "en": "A synthetic element; radioactive, possibly volatile metal, named after Copernicus.", "zh": "人造元素；放射性，可能为挥发性金属，以哥白尼命名。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "286.093635599278",
      "meltingPoint": "10.0",
      "boilingPoint": "67.0",
      "group": "7/II-",
      "block": "d",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionizationPotential": "11.97",
      "atomicRadius": "147",
      "covalentRadius": "122"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "3"
    },
    "additional": {},
    "reactivity": {
      "electronAffinity": "0"
    },
    "nucleus": {
      "halfLife": "33/5",
      "lifetime": "47.6089/5",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 285
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=D3-WOnG5eRM",
    "productionCountries": [
      { "country": "de" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в GSI Дармштадт (Германия), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at GSI Darmstadt (Germany), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次在德国达姆施塔特重离子研究中心（GSI）制得，仅以单个原子级别的数量生产。" }
  },
  "Nh": {
    "overview": {
      "latinName": "Nihonium",
      "englishName": "Nihonium",
      "discoveryYear": "2004",
      "casNumber": "CAS54084-70-7",
      "discoverer": { "ru": "RIKEN (理研)", "en": "RIKEN (理研)", "zh": "RIKEN (理研)" },
      "discoveryCountry": "JP",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P18-Q3-R0",
      "electronCount": "113",
      "protonCount": "113",
      "neutronCount": "173",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d10 7s2 7p1 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d10 7s2 7p1"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, возможно металл, впервые получен в Японии.", "en": "A synthetic element; radioactive, possibly post-transition metal, first made in Japan.", "zh": "人造元素；放射性，可能为金属，首次在日本合成。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "287.998233477411",
      "meltingPoint": "430.0",
      "boilingPoint": "1130.0",
      "group": "7/III+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "7.61",
      "vaporizationHeat": "130"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionizationPotential": "7.31",
      "atomicRadius": "170",
      "covalentRadius": "136"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "2"
    },
    "additional": {},
    "reactivity": {
      "electronAffinity": "66.6"
    },
    "nucleus": {
      "halfLife": "9.5/5",
      "lifetime": "13.7085/5",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 286
        }
      ]
    },
    "youtube": "https://www.youtube.com/watch?v=_fveV0EDygQ",
    "productionCountries": [
      { "country": "jp" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в RIKEN (Япония) на ускорителях частиц, производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at RIKEN (Japan) via particle accelerators, made only in atom quantities.", "zh": "合成元素，从未被开采过——首次通过日本理化学研究所（RIKEN）的粒子加速器制得，仅以单个原子级别的数量生产。" }
  },
  "Fl": {
    "overview": {
      "latinName": "Flerovium",
      "englishName": "Flerovium",
      "discoveryYear": "1998",
      "casNumber": "CAS54085-16-4",
      "discoverer": { "ru": "Объединённый институт ядерных исследований (ОИЯИ), Ливерморская национальная лаборатория им. Э.Лоуренса", "en": "Joint Institute for Nuclear Research (JINR), Lawrence Livermore National Laboratory (LLNL)", "zh": "Joint Institute for Nuclear Research (JINR), Lawrence Livermore National Laboratory (LLNL)" },
      "discoveryCountry": "RU, US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P18-Q4-R0",
      "electronCount": "114",
      "protonCount": "114",
      "neutronCount": "175",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d10 7s2 7p2 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d10 7s2 7p2"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, возможно тяжёлый летучий металл углеродной группы.", "en": "A synthetic element; radioactive, possibly a heavy, volatile metal in the carbon group.", "zh": "人造元素；放射性，可能为碳族易挥发重金属。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "290.217148623513",
      "meltingPoint": "**",
      "boilingPoint": "**",
      "group": "7/IV+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "vaporizationHeat": "38"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,-,4,-,-,-,-,-",
      "ionizationPotential": "8.539",
      "atomicRadius": "180",
      "covalentRadius": "143"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "4"
    },
    "additional": {},
    "reactivity": {
      "electronAffinity": "0"
    },
    "nucleus": {
      "halfLife": "2.4/5",
      "lifetime": "3.4625/5",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 289
        }
      ]
    },
    "productionCountries": [
      { "country": "ru" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в Объединённом институте ядерных исследований в Дубне (Россия), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at the Joint Institute for Nuclear Research, Dubna (Russia), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次在俄罗斯杜布纳联合核研究所制得，仅以单个原子级别的数量生产。" }
  },
  "Mc": {
    "overview": {
      "latinName": "Moscovium",
      "englishName": "Moscovium",
      "discoveryYear": "2003",
      "casNumber": "CAS54085-64-2",
      "discoverer": { "ru": "Объединённый институт ядерных исследований (ОИЯИ), Ливерморская национальная лаборатория им. Э.Лоуренса", "en": "Joint Institute for Nuclear Research (JINR), Lawrence Livermore National Laboratory (LLNL)", "zh": "Joint Institute for Nuclear Research (JINR), Lawrence Livermore National Laboratory (LLNL)" },
      "discoveryCountry": "RU, US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P18-Q5-R0",
      "electronCount": "115",
      "protonCount": "115",
      "neutronCount": "173",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d10 7s2 7p3 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d10 7s2 7p3"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, возможно металл, назван в честь Подмосковья.", "en": "A synthetic element; radioactive, possibly post-transition metal, named after Moscow region.", "zh": "人造元素；放射性，可能为金属，以莫斯科州命名。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "291.542045471157",
      "meltingPoint": "400.0",
      "boilingPoint": "1100.0",
      "group": "7/V+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "5.98",
      "vaporizationHeat": "138"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,-,3,-,-,-,-,-,-",
      "ionizationPotential": "5.58",
      "atomicRadius": "187",
      "covalentRadius": "162"
    },
    "electromagnetic": {},
    "grid": {},
    "additional": {},
    "reactivity": {
      "electronAffinity": "35.3"
    },
    "nucleus": {
      "halfLife": "0.65/5",
      "lifetime": "0.937752/5",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 290
        }
      ]
    },
    "productionCountries": [
      { "country": "ru" },
      { "country": "us" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в Дубне (Россия) совместно с Национальной лабораторией Ок-Ридж (США), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at Dubna (Russia) in collaboration with Oak Ridge National Laboratory (US), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次由俄罗斯杜布纳与美国橡树岭国家实验室合作制得，仅以单个原子级别的数量生产。" }
  },
  "Lv": {
    "overview": {
      "latinName": "Livermorium",
      "englishName": "Livermorium",
      "discoveryYear": "2000",
      "casNumber": "CAS54100-71-9",
      "discoverer": { "ru": "Объединённый институт ядерных исследований (ОИЯИ), Ливерморская национальная лаборатория им. Э.Лоуренса", "en": "Joint Institute for Nuclear Research (JINR), Lawrence Livermore National Laboratory (LLNL)", "zh": "Joint Institute for Nuclear Research (JINR), Lawrence Livermore National Laboratory (LLNL)" },
      "discoveryCountry": "RU, US",
      "sampleColors": [{ "hex": "#C6C6C6" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P18-Q6-R0",
      "electronCount": "116",
      "protonCount": "116",
      "neutronCount": "177",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d10 7s2 7p4 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d10 7s2 7p4"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, возможно близок к халькогенам, назван в честь Ливермора.", "en": "A synthetic element; radioactive, possibly chalcogen-like, named after Livermore.", "zh": "人造元素；放射性，可能类似硫族元素，以利弗莫尔命名。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "292.470799589671",
      "meltingPoint": "435.5",
      "boilingPoint": "812.0",
      "group": "7/VI+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {
      "fusionHeat": "7.61",
      "vaporizationHeat": "42"
    },
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,-,2,-,-,-,-,-,-,-",
      "ionizationPotential": "6.88",
      "atomicRadius": "183",
      "covalentRadius": "175"
    },
    "electromagnetic": {},
    "grid": {},
    "additional": {},
    "reactivity": {
      "electronAffinity": "74.9"
    },
    "nucleus": {
      "halfLife": "0.095/5",
      "lifetime": "0.137056/5",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 293
        }
      ]
    },
    "productionCountries": [
      { "country": "ru" },
      { "country": "us" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в Дубне (Россия) совместно с Ливерморской национальной лабораторией (США), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at Dubna (Russia) in collaboration with Lawrence Livermore National Laboratory (US), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次由俄罗斯杜布纳与美国劳伦斯利弗莫尔国家实验室合作制得，仅以单个原子级别的数量生产。" }
  },
  "Ts": {
    "overview": {
      "latinName": "Tennessine",
      "englishName": "Tennessine",
      "discoveryYear": "2010",
      "casNumber": "CAS87658-56-8",
      "discoverer": { "ru": "Объединённый институт ядерных исследований (ОИЯИ), Ливерморская национальная лаборатория им. Э.Лоуренса", "en": "Joint Institute for Nuclear Research (JINR), Lawrence Livermore National Laboratory (LLNL)", "zh": "Joint Institute for Nuclear Research (JINR), Lawrence Livermore National Laboratory (LLNL)" },
      "discoveryCountry": "RU, US",
      "sampleColors": [{ "hex": "#E8E2B0", "finish": "subtle" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P18-Q7-R0",
      "electronCount": "117",
      "protonCount": "117",
      "neutronCount": "177",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d10 7s2 7p5 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d10 7s2 7p5"
    },
    "description": { "ru": "Синтетический элемент; радиоактивен, возможно галоген, крайне редок, назван в честь Теннесси.", "en": "A synthetic element; radioactive, possibly a halogen, extremely rare, named after Tennessee.", "zh": "人造元素；放射性，可能为卤素，极其稀有，以田纳西命名。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "293.73334018093",
      "meltingPoint": "450.0",
      "boilingPoint": "610.0",
      "group": "7/VII+",
      "block": "p",
      "aggregationState": "solid"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,-,1,-,-,-,-,-,-,-,-",
      "ionizationPotential": "7.70",
      "atomicRadius": "138",
      "covalentRadius": "165"
    },
    "electromagnetic": {},
    "grid": {},
    "additional": {},
    "reactivity": {
      "electronAffinity": "165.9"
    },
    "nucleus": {
      "halfLife": "0.051/5",
      "lifetime": "0.073593/5",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "corrosive",
      "acuteToxicity",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 294
        }
      ]
    },
    "productionCountries": [
      { "country": "ru" },
      { "country": "us" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в Дубне (Россия) совместно с Национальной лабораторией Ок-Ридж (США), производится лишь в количестве отдельных атомов.", "en": "Synthetic, never mined — first produced at Dubna (Russia) in collaboration with Oak Ridge National Laboratory (US), made only in atom quantities.", "zh": "合成元素，从未被开采过——首次由俄罗斯杜布纳与美国橡树岭国家实验室合作制得，仅以单个原子级别的数量生产。" }
  },
  "Og": {
    "overview": {
      "latinName": "Oganesson",
      "englishName": "Oganesson",
      "discoveryYear": "2002",
      "casNumber": "CAS54144-19-3",
      "discoverer": { "ru": "Объединённый институт ядерных исследований (ОИЯИ), Ливерморская национальная лаборатория им. Э.Лоуренса", "en": "Joint Institute for Nuclear Research (JINR), Lawrence Livermore National Laboratory (LLNL)", "zh": "Joint Institute for Nuclear Research (JINR), Lawrence Livermore National Laboratory (LLNL)" },
      "discoveryCountry": "RU, US",
      "sampleColors": [{ "hex": "#E8E8E8", "finish": "subtle" }],
      "electronShellConfig": "K2-L8-M18-N32-O32-P18-Q8-R0",
      "electronCount": "118",
      "protonCount": "118",
      "neutronCount": "176",
      "hasImage": false,
      "hasSpectre": false,
      "electronConfiguration": "[Rn] 5f14 6d10 7s2 7p6 = 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f14 6s2 6p6 6d10 7s2 7p6"
    },
    "description": { "ru": "Синтетический элемент 18-й группы; радиоактивен, по расчётам не ведёт себя как типичный благородный газ, самый тяжёлый известный элемент, синтезирован в 2002 году.", "en": "A synthetic group-18 element; radioactive, predicted not to behave like a typical noble gas, heaviest known element, first synthesized in 2002.", "zh": "第18族人造元素；放射性，预计不具备典型稀有气体的性质，已知最重元素，2002年首次合成。" },
    "applications": { "ru": "Только научные исследования", "en": "Scientific research only", "zh": "仅科学研究" },
    "properties": {
      "atomicMass": "295.212212582275",
      "density": "7.2",
      "meltingPoint": "52.0",
      "boilingPoint": "177.0",
      "group": "7/VIII+",
      "block": "p",
      "aggregationState": "gas"
    },
    "thermo": {},
    "atomic": {
      "oxidationState": "-,-,-,-,-,0,-,-,-,-,-,-,-,-,-",
      "ionizationPotential": "8.91",
      "atomicRadius": "152",
      "covalentRadius": "157"
    },
    "electromagnetic": {},
    "grid": {
      "structureCode": "4"
    },
    "additional": {
      "liquidDensity": "6.6",
      "molarVolume": "0.0000410"
    },
    "reactivity": {
      "electronAffinity": "7.72"
    },
    "nucleus": {
      "halfLife": "0.00058/5",
      "lifetime": "0.0008368/5",
      "nfpaCube": "-,4,-,RAD"
    },
    "prevalence": {},
    "ghs": [
      "compressedGas",
      "healthHazard"
    ],
    "isotopes": {
      "decay": "alpha",
      "isotopes": [
        {
          "mass": 294
        }
      ]
    },
    "productionCountries": [
      { "country": "ru" },
      { "country": "us" }
    ],
    "productionNote": { "ru": "Синтетический, никогда не добывался — впервые получен в Дубне (Россия) совместно с Ливерморской национальной лабораторией (США), производится лишь по несколько атомов за раз.", "en": "Synthetic, never mined — first produced at Dubna (Russia) in collaboration with Lawrence Livermore National Laboratory (US), made only a few atoms at a time.", "zh": "合成元素，从未被开采过——首次由俄罗斯杜布纳与美国劳伦斯利弗莫尔国家实验室合作制得，每次仅能制备几个原子。" }
  }
}
