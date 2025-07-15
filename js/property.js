// Format all amounts as NPR with 2 decimal places
const format = (amount) => new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}).format(amount);

// File: property.js
let insuranceData = [];
let propertyItems = [];
let currentInsuranceType = 'home';

function loadFallbackData() {
    propertyItems = [
        // अति सामान्य जोखिम (1.5 rate)
        {
            nepali: "02 इँटा तथा इँटा बनाउने चिम्नी (काँचो इँटा बाहेक सबै प्रकारको इँटा)",
            english: "02 Brick (except Mud/Raw Brick)",
            roman: "02 Itta tatha ita banaune chimney (kancho ita bahek sabai prakarko itta)",
            category: "अति सामान्य जोखिम",
            rate: "1.5"
        },
        {
            nepali: "03 खानीबाट ढुङ्गा निकाल्ने काम",
            english: "03 Stone Quarries",
            roman: "03 Khanibata dhunga nikalne kaam",
            category: "अति सामान्य जोखिम",
            rate: "1.5"
        },
        {
            nepali: "04 ग्रेनाइट",
            english: "04 Granite",
            roman: "04 Granite",
            category: "अति सामान्य जोखिम",
            rate: "1.5"
        },
        {
            nepali: "05 ढुङ्गा कुट्रने काम",
            english: "05 Stone Crushing",
            roman: "05 Dhunga kutne kaam",
            category: "अति सामान्य जोखिम",
            rate: "1.5"
        },
        {
            nepali: "06 ढुङ्गाको मुर्तिकला",
            english: "06 Stone Art",
            roman: "06 Dhungako murtikala",
            category: "अति सामान्य जोखिम",
            rate: "1.5"
        },
        {
            nepali: "07 ढुङ्गाको सामग्री",
            english: "07 Stone ware",
            roman: "07 Dhungako samagri",
            category: "अति सामान्य जोखिम",
            rate: "1.5"
        },
        {
            nepali: "08 पॊखऱी",
            english: "08 Pond/Pool",
            roman: "08 Pokhari",
            category: "अति सामान्य जोखिम",
            rate: "1.5"
        },
        {
            nepali: "09 बालुवा (दिपोमा  राखिएको  बालबा मात्र)",
            english: "09 Sand (only riverbed sand)",
            roman: "09 Baluwa (dipo ma rakhiyeko baluwa matra)",
            category: "अति सामान्य जोखिम",
            rate: "1.5"
        },
        {
            nepali: "10 माटो (पानी जन्य क्षतिको जोखिम बाहेक)",
            english: "10 Soil (except for water retention areas)",
            roman: "10 Mato (pani janya kshatiko jokhim bahek)",
            category: "अति सामान्य जोखिम",
            rate: "1.5"
        },
        {
            nepali: "11 सिँहमरमर",
            english: "11 Marble",
            roman: "11 Singhamarbar",
            category: "अति सामान्य जोखिम",
            rate: "1.5"
        },
        {
            nepali: "12 होलो व्रिक्स",
            english: "12 Hollow Bricks",
            roman: "12 Hollow bricks",
            category: "अति सामान्य जोखिम",
            rate: "1.5"
        },

        // सामान्य जोखिम (2 rate)
        {
            nepali: "13 अचार,  तितौरा,  गुन्द्रुक,  मस्यौरा,  माडा,  पाउ [घरेलु]",
            english: "13 Condiment, Sour Candies and Nepali Local Edible Sour and Dry Items [Home Made]",
            roman: "13 Achar, titaura, gundruk, masyaura, mada, paau [gharelu]",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "14 अप्टिकल फाइवर",
            english: "14 Optical Fiber",
            roman: "14 Optical fiber",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "15 अस्पताल (अस्पताल परिसर भित्रको औषधी पसल सहित)",
            english: "15 Hospital (Including Pharmacy within premise of hospital)",
            roman: "15 Aspatal (aspatal parisar bhitra ko aushadhi pasal sahit)",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "16 आइस, बरफ",
            english: "16 Ice",
            roman: "16 Ice, baraf",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "17 आइसक्रिम तथा आइस क्यान्डी",
            english: "17 Ice Cream and Ice Candy",
            roman: "17 Ice-cream tatha ice candy",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "18 आकाशे पुल,  अण्डरपास,  फ्लाईओभर,  सववे",
            english: "18 Overhead Bridge,  Underpass,  Flyover and Subway",
            roman: "18 Aakashe pul, underpass, flyover, subway",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "19 इन्स्टिच्यूट",
            english: "19 Institute",
            roman: "19 Institute",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "20 एक्स रे,  सिटी स्क्यान,  एमआरआई",
            english: "20 X-Ray,  CT Scan, MRI",
            roman: "20 X-ray, City Scan, MRI",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "21 कन्क्रिटका ब्लक तथा सामान",
            english: "21 Concrete Block and Products",
            roman: "21 Concreteka block tatha saaman",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "22 कपाल काट्ने पसल",
            english: "22 Barber Shop",
            roman: "22 Kapaal kaatne pasal",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "23 कुचो",
            english: "23 Broom",
            roman: "23 Kucho",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "24 कृषर औजार",
            english: "24 Agriculture Equipments",
            roman: "24 Crusher aujaar",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "25 केवल कार",
            english: "25 Cable Car",
            roman: "25 Keval car",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "26 क्याटरिङ स्थल",
            english: "26 Catering Place",
            roman: "26 Catering sthal",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "27 क्याफे",
            english: "27 Café",
            roman: "27 Cafe",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "28 क्लव",
            english: "28 Club",
            roman: "28 Club",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "29 क्लिनिक (क्लिनिक परिसर भित्रको औषधी पसल सहित)",
            english: "29 Clinic (Including Pharmacy within premise of clinic)",
            roman: "29 Clinic (Clinic parisar bhitrako aushadhi pasal sahit)",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "30 खोर (पशुपन्छी बाहेक)",
            english: "30 Shed (Except Bird and Cattle)",
            roman: "30 Khor (pashupanchi bahek)",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "31 गोठ (पशु बाहेक)",
            english: "31 Shed (Except Cattle)",
            roman: "31 Goth (pashu bahek)",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "32 ग्लो साइन बोर्ड",
            english: "32 Glow Sign Board",
            roman: "32 Glow sign board",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "33 घडी",
            english: "33 Clock and Watch",
            roman: "33 Ghadhi",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "34 चस्मा, चस्माको शिशा तथा चस्माका सामग्री",
            english: "34 Glass, Optical Lense and Accessories",
            roman: "34 Chasma, chasmako shisha tatha chasmaka saamagri",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "35 चुन तथा कृषर चुन",
            english: "35 Lime and Agro Lime",
            roman: "35 Chun tatha crusher chun",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "36 छाना छाउने टायल, झिँगटी तथा खपटा",
            english: "36 Roofing Tile, Mini Tile and Curved Tile",
            roman: "36 Chhana chhaune tile, jhingati tatha khapata",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "37 जिपलाइन",
            english: "37 Jipline",
            roman: "37 Zipline",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "38 जुवाघर",
            english: "38 Casino",
            roman: "38 Juwaghar",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "39 टनेल (कृषर प्रयोजनको लागि)",
            english: "39 Tunnel (for Agro Purpose)",
            roman: "39 Tunnel (crusher prayojanko lagi)",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "40 टायल [भित्ता वा भुईमा लगाउने]",
            english: "40 Tile",
            roman: "40 Tile [bhitta wa bhui ma lagaaune]",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "41 ट्रेन स्टेशन वा ट्रेन टर्मिनल",
            english: "41 Train Station or Train Terminal",
            roman: "41 Train station wa train terminal",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "42 डायग्नोस्टिक सेन्टर",
            english: "42 Diagnostic Center",
            roman: "42 Diagnostic center",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "43 डिजिटल साइन बोर्ड",
            english: "43 Digital Sign Board",
            roman: "43 Digital sign board",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "44 डिस्को तथा दोहोरी साँझ",
            english: "44 Disco and Dohori Sanjh",
            roman: "44 Disco tatha dohori saanjh",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "45 ड्राइक्लिनिङ",
            english: "45 Dry Cleaning",
            roman: "45 Drycleaning",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "46 ड्रेनेज",
            english: "46 Drainage",
            roman: "46 Drainage",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "47 तवेला (जनावर बाहेक)",
            english: "47 Stables (Excluding Animals)",
            roman: "47 Tawela (janawar bahek)",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "48 तालिम कक्ष, तालिम गृह तथा तालिम हल",
            english: "48 Training Room, Training House and Training Hall",
            roman: "48 Talim kakshya, talim griha tatha talim hall",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "49 दलालको कार्यालय",
            english: "49 Broker Office",
            roman: "49 Dalaalko karyalaya",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "50 धर्म काँटा वा जोख्ने यन्त्र (उद्योग परिसरमा रहेको बाहेक)",
            english: "50 Weighing Machine and Bridges (outside Industry Premises)",
            roman: "50 Dharma kanta wa jhokhne yantra (udyog parisar ma raheko bahek)",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "51 नर्सिङ होम (नर्सिङ होम परिसर भित्रको औषधी पसल सहित)",
            english: "51 Nursing Home (Including Pharmacy within Premise)",
            roman: "51 Nursing home (nursing home parisar bhitrako aushadhi pasal sahit)",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "52 नियोन साइन बोर्ड",
            english: "52 Neon Sign Board",
            roman: "52 Neon sign board",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "53 निर्माणाधीन भवन",
            english: "53 Building under Construction",
            roman: "53 Nirmaanadheen bhawan",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "54 नुन धुल्याउने तथा रिफाइन गर्ने",
            english: "54 Salt Crushing Factories and Refineries",
            roman: "54 Nun dhulyaaune tatha refine garne",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "55 पम्प हाउस (पेट्रोल पम्प बाहेक)",
            english: "55 Pump House (Other than Petrol Pump)",
            roman: "55 Pump house (petrol pump bahek)",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "56 पम्प हाउस [पानी]",
            english: "56 Pump House [Water]",
            roman: "56 Pump house [paani]",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "57 परामर्शदाताको कार्यालय",
            english: "57 Consultancy office",
            roman: "57 Paramarshdata ko karyalaya",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "58 पर्खाल (औद्योगिक क्षेत्रको साँध वा सीमानामा लगाएको पर्खाल मात्र)",
            english: "58 Boundry Wall (Wall only on the boarder of Industrial Area or Empty land apart from Household)",
            roman: "58 Parkhaal (audyogik chhetrako saandh wa seema ma lagaayeko parkhaal maat)",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "59 पर्वतारोहण सामग्री",
            english: "59 Mountaineering Goods",
            roman: "59 Parbatarohan saamagri",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "60 पस्मिना",
            english: "60 Pashmina",
            roman: "60 Pashmina",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "61 पान तथा पान मसला",
            english: "61 Pan and Pan Masala",
            roman: "61 Paan tatha paan masalaa",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "62 पानी ट्याङ्की",
            english: "62 Water Tank",
            roman: "62 Paani tanki",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "63 पानी प्रशोधन केन्द्र,  पाइप लाइन",
            english: "63 Water Processing Plant and Pipe Line",
            roman: "63 Paani prashodhan kendra, pipe line",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "64 पानी र मिनरल वाटर (वेभरेज तथा अल्कोहल उत्पादन गर्ने उद्योगबाट उत्पादित पानी बाहेक)",
            english: "64 Water and Mineral Water (Except water produced in Beverage and Alchohal Factory)",
            roman: "64 Paani ra mineral water (beverage tatha alcohol utpadan garne udyog bahek)",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "65 पार्क",
            english: "65 Park",
            roman: "65 Park",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "66 पार्टी प्यालेस",
            english: "66 Party Palace",
            roman: "66 Party palace",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "67 पुल [कंक्रिटको]",
            english: "67 Bridges [Concrete]",
            roman: "67 Pul [concreteko]",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "68 पोल्ट्री फार्म [पन्छी बाहेक]",
            english: "68 Poultry Farms [Excluding birds therein]",
            roman: "68 Poultry farm [panchi bahek]",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "69 प्रयोगशाला तथा विश्लेषणात्मक/गुण नियन्त्रण प्रयोगशाला",
            english: "69 Laboratory and Analytical/Quality Control Laboratories",
            roman: "69 Prayogshala tatha bishleshanatmak/gun niyantran prayogshala",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "70 फलफुल तथा तरकारी",
            english: "70 Fruit and Vegetable",
            roman: "70 Phalphul tatha tarakari",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "71 वनस्पतीको कलमी [बाली बाहेक]",
            english: "71 Tissue Culture [Excluding Crops]",
            roman: "71 Banaspati ko kalmi [baali bahek]",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "72 बन्र्जी जम्पिङ",
            english: "72 Bunjy Jumping",
            roman: "72 Bungee jumping",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "73 बसपार्क,  स्टेशन वा बस टर्मिनल",
            english: "73 Bus Park Station or Bus Terminal",
            roman: "73 Buspark, station wa bus terminal",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "74 बस्ने तथा खाने ठाँउ",
            english: "74 Rest House, Refreshment and Recreation Center",
            roman: "74 Basne tatha khane thau",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "75 बाँध, सिँचाई आयोजना",
            english: "75 Dam, Irrigation Project",
            roman: "75 Baandh, sinchai aayojanaa",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "76 बीमा",
            english: "76 Insurance",
            roman: "76 Beema",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "77 बैंक, वित्तीय सँस्था, सहकारी",
            english: "77 Bank, Financial Institution and Cooperatives",
            roman: "77 Bank, vittiya sanstha, sahakaari",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "78 बोर्डिङ तथा आवास गृह",
            english: "78 Boarding and Boarding House",
            roman: "78 Boarding tatha aawas griha",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "79 ब्याट्री चार्ज स्टेसन",
            english: "79 Battery Charge Station",
            roman: "79 Battery charge station",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "80 ब्युटी पार्लर",
            english: "80 Beauty Parlor",
            roman: "80 Beauty parlor",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "81 ब्वाइलर",
            english: "81 Uninstale Boiler and Boiler located out of industrial area",
            roman: "81 Boiler",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "82 भोजघर तथा पार्टी प्यालेस",
            english: "82 Banquet and Party Palace",
            roman: "82 Bhojghar tatha party palace",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "83 मसाज सेन्टर",
            english: "83 Massage Center",
            roman: "83 Massage center",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "84 महाविद्याल",
            english: "84 College",
            roman: "84 Mahavidyalaya",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "85 माटो तथा कालोमाटोको सामान",
            english: "85 Pottery and Clay Work",
            roman: "85 Maato tatha kaalomaato ko saaman",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "86 मासु तथा माछा/मासु प्रशोधन",
            english: "86 Meat/Fish Shop and Mean/fish Processing",
            roman: "86 Maasu tatha maachha/maasu prashodhan",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "87 मिठाइ तथा नमकिन",
            english: "87 Sweet and Namkin",
            roman: "87 Mithai tatha namkin",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "88 मोटेल",
            english: "88 Motel",
            roman: "88 Motel",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "89 योगस्थल, जिमखाना, ब्यायामशाला",
            english: "89 Yoga Center or Gym and Health Club",
            roman: "89 Yogasthal, gymkhana, byaayamshaala",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "90 रुद्राक्ष, बुद्धचित्त, बयर, हाडे बयर, तुलसी तथा बियाँ वा दानाको माला",
            english: "90 Rudarachya, Budha Chitta, Bayar, Hadeybayar, Tulsi, Seed Garland",
            roman: "90 Rudraksha, buddhachitta, bayar, haade bayar, tulsi tatha biyan wa daanako maala",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "91 रेष्टुरेन्ट",
            english: "91 Restaurant",
            roman: "91 Restaurant",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "92 रोपवे",
            english: "92 Ropeway",
            roman: "92 Ropeway",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "93 लघु उद्यम [१५ लाख रूपैंया भन्दा कम बीमाङक भएको]",
            english: "93 Micro Enterprises with values at risk not exceeding Rs 15 Lakhs",
            roman: "93 Laghu udyam [15 lakh rupaiyaa bhanda kam beemanka bhaeko]",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "94 लज",
            english: "94 Lodge",
            roman: "94 Lodge",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "95 विद्यालय",
            english: "95 School",
            roman: "95 Vidhyalaya",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "96 विद्युत (जल विद्युत मात्र)",
            english: "96 Hydro electricity only",
            roman: "96 Vidyut (jal vidyut maatra)",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "97 विमानस्थल टर्मिनल [भवन, क्याफे, पसल लगायत सबै कुरा समावेश गरिएको]",
            english: "97 Airport Terminal Buildings [including all facilities like Cafes, Shops, etc.]",
            roman: "97 Bimansthal terminal [bhawan, cafe, pasal lagaayat sabai kura samavesh gareko]",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "98 विर्को",
            english: "98 Lid",
            roman: "98 Birko",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "99 विश्वविद्यालय",
            english: "99 University",
            roman: "99 Vishwavidyalaya",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "100 शैक्षिक केन्द्र, शैक्षिक परामर्शगृह, अध्ययन तथा अनुसन्धान केन्द्र",
            english: "100 Educational Center, Education Consultancy, Education and Research Center",
            roman: "100 Shaikshik kendra, shaikshik paramarshgriha, adhyayan tatha anusandhan kendra",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "101 संग्रहालय",
            english: "101 Museum",
            roman: "101 Sangrahalaya",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "102 सडक, राजमार्ग, सर्भिस रोड",
            english: "102 Road, Highway and Service Road",
            roman: "102 Sadak, rajmarg, service road",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "103 सभागृह",
            english: "103 City Hall",
            roman: "103 Sabhagriha",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "104 सवारी साधनको ग्यारेज तथा मर्मत",
            english: "104 Motor Vehicle Garages with Work of Maintenance",
            roman: "104 Sawaari saadhan ko garage tatha marmat",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "105 सवारी साधनको विक्रीकक्ष शोरूम (गाडी तथा यन्त्र उपकरणको) तथा सर्भिस कक्ष",
            english: "105 Sales Showroom and ServiceVehicles Center of Vehicle Machinary and Equipemnt",
            roman: "105 Sawaari saadhan ko bikrikaksh showroom (gaadi tatha yantra upakaran ko) tatha service kakshya",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "106 सवारी साधनको स्पेयर पार्ट्स",
            english: "106 Spare Parts of Vehicle",
            roman: "106 Sawaari saadhan ko spare parts",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "107 साइकल",
            english: "107 Bicycle",
            roman: "107 Cycle",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "108 सामूहिक भोजनालय",
            english: "108 Mes",
            roman: "108 Samaahik bhojanaalaya",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "109 सार्वजनिक भवन",
            english: "109 Public Hall",
            roman: "109 Sarbajanik bhawan",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "110 सिमेन्ट",
            english: "110 Cement",
            roman: "110 Cement",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "111 सुन र चादीको तार तथा सुनको जलप",
            english: "111 Gold thread and Gilding",
            roman: "111 Sun ra chadi ko taar tatha sunko jalpa",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "112 सुन, चाँदि, प्लाटिनम",
            english: "112 Gold, Silver, Platinum",
            roman: "112 Sun, chaadi, platinum",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "113 सेड",
            english: "113 Shed",
            roman: "113 Shed",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "114 सेरामिक",
            english: "114 Ceramic Products",
            roman: "114 Ceramic",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "115 स्टेडियम [इन्डोर तथा आउटडोर)",
            english: "115 Stadium [Indoor and Outdoor]",
            roman: "115 Stadium [indoor tatha outdoor]",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "116 स्पा तथा सौना",
            english: "116 Spa and Sauna",
            roman: "116 Spa tatha sauna",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "117 स्पोर्ट्स सामग्री",
            english: "117 Sports Goods",
            roman: "117 Sports saamagri",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "118 स्वीट मिट",
            english: "118 Sweat Meat",
            roman: "118 Sweet meat",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "119 हस्तकलाका सामग्री",
            english: "119 Handicrafts",
            roman: "119 Hastakalaka saamagri",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "120 हाइटेन्सन लाइन, खम्बा वा टावर",
            english: "120 Hi-Tension Line, Pole and Tower",
            roman: "120 High tension line, khamba wa tower",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "121 हिरा",
            english: "121 Diamonds",
            roman: "121 Hira",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "122 हेल्मेट",
            english: "122 Helmet",
            roman: "122 Helmet",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "123 होटल",
            english: "123 Hotel",
            roman: "123 Hotel",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "124 होमस्टे",
            english: "124 Homestay",
            roman: "124 Homestay",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "125 होर्डिङ बोर्ड",
            english: "125 Hoarding Board",
            roman: "125 Hoarding board",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        {
            nepali: "126 ह्याचरी",
            english: "126 Hatchary",
            roman: "126 Hatchery",
            category: "सामान्य जोखिम",
            rate: "2"
        },
        // मध्यम जोखिम (3 rate)
        {
            nepali: "127 अगरवत्ती तथा धुप",
            english: "127 Agarbatti and Dhoop",
            roman: "127 Agarbatti tatha dhup",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "128 अडियो भिडियो क्यासेट, सिडि, डिभिडि, एमडि, एलडि",
            english: "128 Audio Video Cassette, CD, DVD, MD, LD",
            roman: "128 Audio video cassette, CD, DVD, MD, LD",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "129 अदुवा",
            english: "129 Ginger",
            roman: "129 Aduwa",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "130 अलैंची",
            english: "130 Cardamom",
            roman: "130 Alaichi",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "131 इनर्जी ड्रिङ्क",
            english: "131 Energy Drink",
            roman: "131 Energy drink",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "132 इन्जिनियरिङ वर्कशप (रु दुई करोड सम्मको बीमाङ्कको लागि मात्र)",
            english: "132 Engineering Workshop consist of Machine Shop (Turning Milling Drilling Grinding Cutting etc) the Fitting Shop the Foundry Shop the Blacksmith the Welding shop and the with 2 crore sum assured limit",
            roman: "132 Engineering workshop (ru dui crore samma ko beemanka ko lagi matra)",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "133 उन मिल",
            english: "133 Woolen Mills",
            roman: "133 Un mill",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "134 उन सफा गर्ने तथा थिच्ने",
            english: "134 Wool Cleaning and Pressing",
            roman: "134 Un saphaa garne tatha thichhne",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "135 ऊन",
            english: "135 wool",
            roman: "135 Un",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "136 एयरक्राफ्ट ह्याङ्गर",
            english: "136 Aircraft Hangers",
            roman: "136 Aircraft hangar",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "137 कत्था",
            english: "137 Katha",
            roman: "137 Katha",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "138 कन्फेक्सनरी",
            english: "138 Confectionary",
            roman: "138 Confectionery",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "139 कपडामा वुट्टा भर्ने",
            english: "139 Embroidery",
            roman: "139 Kapada ma butta bharne",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "140 कपास तथा कपास प्रशोधन",
            english: "140 Cotton and Cotton Procesing",
            roman: "140 Kapaas tatha kapaas prashodhan",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "141 कफि केलाउने, तताउने, पिस्ने तथा छोडाउने",
            english: "141 Coffee Curing, Roasting, Grinding and Pulping",
            roman: "141 Coffee kelaaune, tataaune, pisne tatha chhodaune",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "142 कवाडी",
            english: "142 Scrap",
            roman: "142 Kabaadi",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "143 कार्पेट तथा दरी [अन्य]",
            english: "143 Carpet and Drugget [Others]",
            roman: "143 Carpet tatha dari [anya]",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "144 केवल [सबै प्रकारको]",
            english: "144 Cable [All Kinds]",
            roman: "144 Keval [sabai prakarko]",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "145 कोल्ड स्टोरेज",
            english: "145 Cold Storage",
            roman: "145 Cold storage",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "146 खाद्य पसल (ग्यास तथा मट्टीतेल बाहेक)",
            english: "146 Grocery except Cooking Gas and Kerosene",
            roman: "146 Khadya pasal (gas tatha mattitel bahek)",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "147 गम, ग्लु तथा ग्यालेटाइन",
            english: "147 Gum/Glue/Gelatine",
            roman: "147 Gum, glue tatha gelatin",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "148 गलैंचा, राडी, पाखी",
            english: "148 Carpet and Drugget Manufacturing [Cotton/Wool]",
            roman: "148 Galaincha, radi, pakhi",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "149 गार्मेन्ट",
            english: "149 Garment",
            roman: "149 Garment",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "150 गुलावको तेल",
            english: "150 Rose Oil",
            roman: "150 Gulabko tel",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "151 चलचित्र भवन",
            english: "151 Cinema Hall",
            roman: "151 Chalchitra bhawan",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "152 चिउरा मिल",
            english: "152 Beaten Rice Mill",
            roman: "152 Chiura mill",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "153 चिनी",
            english: "153 Sugar",
            roman: "153 Chini",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "154 चिनी क्यान्डी",
            english: "154 Sugar Candy",
            roman: "154 Chini candy",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "155 चिया ब्लेन्डिङ, प्याकिङ तथा प्रशोधन",
            english: "155 Tea Blending, Packing and Tea Processing",
            roman: "155 Chiya blending, packing tatha prashodhan",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "156 छाता",
            english: "156 Umbrella",
            roman: "156 Chhata",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "157 झुल",
            english: "157 Mosquito Cutrain",
            roman: "157 Jhool",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "158 टाँक",
            english: "158 Button",
            roman: "158 Tank",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "159 टाइपराइटर रिवन",
            english: "159 Typewriter Ribbon",
            roman: "159 Typewriter ribbon",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "160 टेक्स्टाइल मिल",
            english: "160 Textile Mills",
            roman: "160 Textile mill",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "161 डसना तथा तकिया बनाउने",
            english: "161 Pillow Making",
            roman: "161 Dasna tatha takiya banaaune",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "162 डिपार्टमेन्टल स्टोर",
            english: "162 Departmental Store",
            roman: "162 Departmental store",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "163 डुंगा, डुंगाको पाल वा खाँवो",
            english: "163 Boat and Jiggery",
            roman: "163 Dunga, dungako paal wa khambo",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "164 डेरी तथा डेरी प्लान्ट",
            english: "164 Milk Pasteurizing Plants and Dairies",
            roman: "164 Dairy tatha dairy plant",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "165 तयारी कपडा",
            english: "165 Readymade Garments",
            roman: "165 Tayaari kapadaa",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "166 तुना",
            english: "166 Lace",
            roman: "166 Tuna",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "167 दाना उद्योग [माछा तथा पशुपन्छीको]",
            english: "167 Fish Animal and Birds' Food",
            roman: "167 Dana udyog [machha tatha pashupanchhiko]",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "168 दालचिनी",
            english: "168 Cinnamon",
            roman: "168 Dalchini",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "169 दुग्ध उद्योग",
            english: "169 Condensed Milk Factories",
            roman: "169 Dugdha udyog",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "170 धाउ प्रशोधन",
            english: "170 Ore Processing",
            roman: "170 Dhau prashodhan",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "171 धाउबाट धातु छुट्याउने तथा धातु छुट्याउने",
            english: "171 Metal Smelting Extraction and Forging Mills",
            roman: "171 Dhaubaata dhaatu chhutyauune tatha dhaatu chhutyauune",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "172 धागो",
            english: "172 Thread",
            roman: "172 Dhago",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "173 धागो कारखाना बाहिरको लुगा प्रशोधन केन्द्र",
            english: "173 Cloth Processing Units situated Outside the Compound of Textile Mills",
            roman: "173 Dhago karkhana baahirko luga prashodhan kendra",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "174 धागो प्रशोधन",
            english: "174 Yarn Processing",
            roman: "174 Dhago prashodhan",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "175 धातुको छपाई",
            english: "175 Metal Printers",
            roman: "175 Dhaatuko chhapai",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "176 धातुको पाइप",
            english: "176 Metal Pipe",
            roman: "176 Dhaatuko pipe",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "177 धातुको पाइपलाई विभिन्न रूप दिने",
            english: "177 Metal Pipe Extruding",
            roman: "177 Dhaatuko pipelaai bibhinna roop dine",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "178 धातुको लेप लगाउने",
            english: "178 Galvanizing Works",
            roman: "178 Dhaatuko lep lagaune",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "179 धातुले मोड्ने कार्य",
            english: "179 Metallizing works [Involving Metals Only]",
            roman: "179 Dhaatule modne kaarya",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "180 धान मिल",
            english: "180 Rice Mills",
            roman: "180 Dhaan mill",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "181 नाली तथा फोहोर प्रशोधन केन्द्र",
            english: "181 Effluent/Sewage Treatment Plant",
            roman: "181 Naali tatha fohor prashodhan kendra",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "182 पत्र धातु, सामान वा भाडा पगाल्ने",
            english: "182 Scrapt metal Utensil Melting",
            roman: "182 Patra dhaatu, saamaan wa bhaadaa pagaalaune",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "183 पाल वा त्रिपाल",
            english: "183 Tent",
            roman: "183 Paal wa tripaal",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "184 पुल (काठ तथा स्टिल) झोलुङ्गे पुल बाहेक",
            english: "184 Bridges (wood and Steel) apart from Suspension Breidge",
            roman: "184 Pul (kaath tatha steel) jholunge pul bahek",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "185 पुस्तक तथा पुस्तकालय",
            english: "185 Book and Library",
            roman: "185 Pustak tatha pustakaalay",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "186 प्रकाशन तथा वुक बाइन्ङिङ",
            english: "186 Publication and Book Binding",
            roman: "186 Prakashan tatha book binding",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "187 प्रसारण स्टेशन तथा टिभी र एफएम प्रसारण स्टेशन",
            english: "187 Transmission Stations and TV and FM Stations",
            roman: "187 Prasaaran station tatha TV ra FM prasaaran station",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "188 फलफूल तथा सागपात सुकाउने",
            english: "188 Fruit and Vegetable Dryingand Dehydrating",
            roman: "188 Phalphul tatha saagpaat sukaaune",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "189 फलफूल तथा फलफूलको गुदी निकाल्ने काम",
            english: "189 Fruit and fruit pulp making",
            roman: "189 Phalphul tatha phalphulko gudi nikaalne kaam",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "190 फलाम, स्टिल, एल्मुनियम, काँस, पित्तल, जस्ता र तामा तथा धातुजन्य उद्योग",
            english: "190 Iron, Steel, Aluminum, Bronze, Brass, Zinc, Copper Industry",
            roman: "190 Phalaam, steel, aluminum, kaas, pittal, jasta ra taamaa tatha dhaatujanya udyog",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "191 फ्युज",
            english: "191 Fuse",
            roman: "191 Fuse",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "192 बट्टा",
            english: "192 Canning",
            roman: "192 Batta",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "193 बायु प्रभावित पानी",
            english: "193 Aerated Water",
            roman: "193 Bayu prabhavit paani",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "194 बिऊ",
            english: "194 Seed",
            roman: "194 Biu",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "195 बुटिक",
            english: "195 Boutique",
            roman: "195 Boutique",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "196 बुनाइ गर्ने मिल",
            english: "196 Weaving Mills",
            roman: "196 Bunaai garne mill",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "197 बेकरी",
            english: "197 Bakery",
            roman: "197 Bakery",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "198 ब्रुअरी",
            english: "198 Breweries",
            roman: "198 Brewery",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "199 ब्रोन्ज पाउडर",
            english: "199 BronzePowder",
            roman: "199 Bronze powder",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "200 मकै ब्रान",
            english: "200 Maize Bran",
            roman: "200 Makai bran",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "201 मखमलको कपडा",
            english: "201 Velvet Cloth",
            roman: "201 Makhmal ko kapadaa",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "202 मदिरा",
            english: "202 Distilleries",
            roman: "202 Madiraa",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "203 मसला",
            english: "203 Curry Spices",
            roman: "203 Masalaa",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "204 मसी",
            english: "204 Ink",
            roman: "204 Masi",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "205 माड",
            english: "205 Starch",
            roman: "205 Maad",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "206 मिल [अन्न, दलहन, पिठो पिस्ने तथा पोलिस गर्ने]",
            english: "206 Mill [Cereal, Rice, Flour, Dal]",
            roman: "206 Mill [anna, dalhan, pitho pisne tatha polish garne]",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "207 मेडिकल सामान",
            english: "207 Medical Equipment",
            roman: "207 Medical saamaan",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "208 मैन तथा मैनवत्ती",
            english: "208 Wax and Candle",
            roman: "208 Main tatha mainbatti",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "209 मोजा तथा होजियारी सामान",
            english: "209 Shocks and Hosiery Goods",
            roman: "209 Moja tatha hosiery saamaan",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "210 मोजाइक",
            english: "210 Mosaic",
            roman: "210 Mosaic",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "211 रेलवे ट्रयाक",
            english: "211 Railways Tracks",
            roman: "211 Railway track",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "212 रेशम तथा कातेको सिल्क मिल",
            english: "212 Silk Mills / Spun Silk Mills",
            roman: "212 Resham tatha kaateko silk mill",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "213 लन्ड्री",
            english: "213 Laundry",
            roman: "213 Laundry",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "214 लुगा सिलाउने पसल",
            english: "214 Tailor",
            roman: "214 Luga silaaune pasal",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "215 विजुली सम्बन्धी सामान",
            english: "215 Electric Goods",
            roman: "215 Bijuli sambandhi saamaan",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "216 विद्युतीय प्रसारण लाईन तथा वितरण",
            english: "216 Electric Transmission and Distribution",
            roman: "216 Bidyutiy prasaaran line tatha vitran",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "217 विद्युतीय सामान",
            english: "217 Electronic Goods",
            roman: "217 Bidyutiy saamaan",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "218 विस्कुट",
            english: "218 Biscuit",
            roman: "218 Biscuit",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "219 वेवरेज",
            english: "219 Beverage",
            roman: "219 Beverage",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "220 व्यवसायिक भवन (पसल भाडा प्रयोजन तथा व्यवसायिक प्रयोजनको लागि प्रयोग हुने बहु उपयोगी भवन)",
            english: "220 Commercial Building (Multi Purpose commercial Building)",
            roman: "220 Byawasayik bhawan (pasal bhadaa prayojan tatha byawasayik prayojanko lagi prayog hune bahu upayogi bhawan)",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "221 व्रिकेट",
            english: "221 Briquettes",
            roman: "221 Briquette",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "222 सख्खर",
            english: "222 Khandsari Sugar",
            roman: "222 Sakkhar",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "223 सफ्ट ड्रिङ्क",
            english: "223 Soft Drinks",
            roman: "223 Soft drink",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "224 समुन्द्री खाद्य प्रशोधन",
            english: "224 Sea Food Processing",
            roman: "224 Samundri khadya prashodhan",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "225 साँङ्गितिक उपकरण वा सामान",
            english: "225 Musical Instruments",
            roman: "225 Sangeetik upakaran wa saamaan",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "226 सिसाकलम",
            english: "226 Pencil",
            roman: "226 Sisakalam",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "227 सुकाउने वा सुख्खा बनाउने",
            english: "227 Dehydration",
            roman: "227 Sukaune wa sukhkha banaaune",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "228 सुख्खा फल जस्तै: काजु, बदम तथा बदाम",
            english: "228 Dry Fruit Like: Cashew, Nut, Peanuts and Almond",
            roman: "228 Sukhkha phal jastai: kaaju, badaam tatha badaam",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "229 सुपारी",
            english: "229 Betel Nut and Arecanut",
            roman: "229 Supari",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "230 सेवई",
            english: "230 Vermicellior Spaghetti",
            roman: "230 Sewai",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "231 सोडा पानी",
            english: "231 Soda Water",
            roman: "231 Soda paani",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "232 सौर्य तथा वायु उर्जा",
            english: "232 Solar and Wind Engery",
            roman: "232 Saurya tatha bayu urja",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "233 स्टेशनरी",
            english: "233 Stationary",
            roman: "233 Stationery",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "234 स्पिनिङ मिल",
            english: "234 Spinning Mills",
            roman: "234 Spinning mill",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "235 हरित गृह, एल्गी तथा स्पिरौलिना",
            english: "235 Green Houses/ Algae/ Spirulina",
            roman: "235 Harit griha, algae tatha spirulina",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "236 हस्पिटल ईक्युपमेन्ट तथा सर्जिकल सामानहरु",
            english: "236 Hospital Equipment and Surgical Goods",
            roman: "236 Hospital equipment tatha surgical saamaan haru",
            category: "मध्यम जोखिम",
            rate: "3"
        },
        {
            nepali: "237 हार्डवेयर",
            english: "237 Hardware",
            roman: "237 Hardware",
            category: "मध्यम जोखिम",
            rate: "3"
        },

        // उच्च मध्यम जोखिम (4.5 rate)
        {
            nepali: "238 अलोइ फाइवर",
            english: "238 AloeFibers",
            roman: "238 Alloy fiber",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "239 आइरिस तेल",
            english: "239 Iris Oil",
            roman: "239 Iris tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "240 आयोडिन",
            english: "240 Iodine",
            roman: "240 Iodine",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "241 इक्युप्लिटस तेल",
            english: "241 Eucalyptus Oil",
            roman: "241 Eucalyptus tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "242 इग्निसन कर्ड्स",
            english: "242 Ignition Chords",
            roman: "242 Ignition cords",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "243 इनामेल तथा इनामेल कोट गरिएका सामान",
            english: "243 Enamel Ware",
            roman: "243 Enamel tatha enamel coat gariyeka saamaan",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "244 एन्जेलिका तेल",
            english: "244 Angelica Oil",
            roman: "244 Angelica tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "245 एल्मुनियम कार्वाइड",
            english: "245 Aluminum Carbide",
            roman: "245 Aluminum carbide",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "246 एलुमिनियम पाउडर [फाइवर]",
            english: "246 Aluminum Powder/Dust",
            roman: "246 Aluminum powder [fiber]",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "247 औषधी",
            english: "247 Drug and Pharmaceuticals",
            roman: "247 Aushadhi",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "248 कपर नाइट्रेट",
            english: "248 Copper Nitrate",
            roman: "248 Copper nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "249 कर्क",
            english: "249 Cork",
            roman: "249 Kark",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "250 कस्मेटिक्स सामाग्री",
            english: "250 Cosmetic Item",
            roman: "250 Cosmetics saamagri",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "251 काँच [सबै प्रकारको]",
            english: "251 Glass of all type",
            roman: "251 Kaach [sabai prakarko]",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "252 काँचको कलात्मक सामान बनाउने",
            english: "252 Art Work of Glass",
            roman: "252 Kaachko kalatmak saamaan banaaune",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        // Add these items to your propertyItems array in the loadFallbackData() function
        {
            nepali: "251 काँच [सबै प्रकारको]",
            english: "251 Glass of all type",
            roman: "251 Kaach [sabai prakarko]",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "252 काँचको कलात्मक सामान बनाउने",
            english: "252 Art Work of Glass",
            roman: "252 Kaachko kalatmak saamaan banaaune",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "253 कागज तथा कार्डवोर्ड मिल",
            english: "253 Paper and Cardboard Mills",
            roman: "253 Kagaj tatha cardboard mill",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "254 काठ, काठको सामान, उल उड तथा फर्निचर [स-मिल बाहेक]",
            english: "254 Wood, Carpenters, Wood Wool, Furniture (Excluding Saw Mill)",
            roman: "254 Kaath, kaathko saamaan ul wood tatha furniture [sawmill bahek]",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "255 काठको सिजनिङ, ट्रिटमेन्ट तथा इम्प्रेग्नेशन",
            english: "255 WoodSeasoning/Treatment/ Impregnation Expect Playwood and Venure",
            roman: "255 Kaathko seasoning, treatment tatha impregnation",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "256 कार्डबोर्ड वा गत्ताको बाकस",
            english: "256 Cardboard Box",
            roman: "256 Cardboard wa gattako baakas",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "257 कार्वन पेपर",
            english: "257 Carbon paper",
            roman: "257 Carbon paper",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "258 कृषिजन्य बस्तु: बाँस बेत नरिवलको जटा, कपासको पात, सियनाको पात, घाँस, खर, सनपाट, फोहोर, पतकर, भुसा",
            english: "258 Agricultural Goods: Bamboo, Cane, Jute, Hey, Straw, Coconut Husk, Cotton Leaf, Siana Leaf, Grass, Fodder, Sunpat, Coir, Mess, Dry Leaves, Hemp",
            roman: "258 Krishijanya bastu: baans, bet, naribal ko jata, kapaasko paat, sienako paat, ghaans, khar, sanpaat, fohor, patkar, bhusaa",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "259 कोवाल्ट नाइट्रेट",
            english: "259 Cobalt Nitrate",
            roman: "259 Cobalt nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "260 क्याल्सियम क्लोरेट",
            english: "260 Calcium Chlorate",
            roman: "260 Calcium chlorate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "261 क्याल्सियम पाउडर",
            english: "261 Calcium Powder",
            roman: "261 Calcium powder",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "262 क्लोभ तेल",
            english: "262 Clove Oil",
            roman: "262 Clove tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "263 क्लोरिन",
            english: "263 Chlorine",
            roman: "263 Chlorine",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "264 खनिज तेल तथा खाने तेल बाहेकका सबै तेल",
            english: "264 Mineral Oiland All Oils other than Edible Oil",
            roman: "264 Khanij tel tatha khaane tel bahekka sabai tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "265 खाक्सी चिल्लो पार्ने",
            english: "265 Abrasive Manufacturing",
            roman: "265 Khaksi chillo paarne",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "266 खाना पकाउने ग्यास बुलेट बाहेक",
            english: "266 Cooking Gas except bullet",
            roman: "266 Khaanaa pakaune gas bullet bahek",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "267 खानेतेल",
            english: "267 Edible Oil",
            roman: "267 Khanetel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "268 खाम तथा कागजको झोला",
            english: "268 Envelope and Paper Bag",
            roman: "268 Khaam tatha kagajko jhola",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "269 ग्यास होल्डर्स, बुलेट स्फेयर",
            english: "269 Gas Holders/Bullets/Spheres",
            roman: "269 Gas holders, bullet sphere",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "270 ग्रेफाइट इलेक्ट्रोड",
            english: "270 Graphite Electrode",
            roman: "270 Graphite electrode",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "271 घिऊ",
            english: "271 Ghee",
            roman: "271 Ghiu",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "272 चाउमिन, पास्ता वा चाउचाऊ",
            english: "272 Chowmin, Pasta and Noodles",
            roman: "272 Chowmein, pasta wa chauchau",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "273 चीजबल्स",
            english: "273 Chees Balls",
            roman: "273 Cheese balls",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "274 चुरोट तथा सिगार",
            english: "274 Cigarette and Cigar",
            roman: "274 Churot tatha cigar",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "275 चुरोटको फिल्टर",
            english: "275 Cigarette Filter",
            roman: "275 Churotko filter",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "276 छापाखाना",
            english: "276 Press",
            roman: "276 Chhapakhaana",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "277 छाला तथा काँचो छाला, छाला प्रशोधन",
            english: "277 Hides and Skins Tanneries",
            roman: "277 Chhaala tatha kaancho chhaala, chhaala prashodhan",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "278 जस्मिन तेल",
            english: "278 Jasmine Oil",
            roman: "278 Jasmine tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "279 जिंक नाइट्रेट",
            english: "279 Zinc Nitrate",
            roman: "279 Zinc nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "280 जिङ्क पाउडर",
            english: "280 Zinc Powder",
            roman: "280 Zinc powder",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "281 जिङ्क पेरोअक्साइड",
            english: "281 Zinc Peroxide",
            roman: "281 Zinc peroxide",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "282 जिप फास्ट्नर्स",
            english: "282 Zip Fasteners",
            roman: "282 Zip fasteners",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "283 जिप्सम बोर्ड",
            english: "283 Gypsum Board",
            roman: "283 Gypsum board",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "284 जुत्ता तथा चप्पल [फोम प्लास्टिक बाहेक]",
            english: "284 Footwear [except foam plastic]",
            roman: "284 Jutta tatha chappal [foam plastic bahek]",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "285 जुनिपर तेल",
            english: "285 Juniper Oil",
            roman: "285 Juniper tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "286 जौ जर्म",
            english: "286 Malt Germ",
            roman: "286 Jau germ",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "287 टापिओका",
            english: "287 Tapioca",
            roman: "287 Tapioca",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "288 टायर तथा ट्युव",
            english: "288 Tyres and Tubes",
            roman: "288 Tyre tatha tube",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "289 टायर रिट्रिडिङ तथा रिसोलिङ",
            english: "289 Tyre Retreading and Resoling",
            roman: "289 Tyre retreading tatha resoling",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "290 ठेकेदारको यन्त्र तथा उपकरण [एकै स्थानमा भएको]",
            english: "290 Contractors Plant and Machinery [At one Location Only]",
            roman: "290 Thekedarko yantra tatha upakaran [ekai sthaanma bhaeko]",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "291 डिटर्जेन्ट",
            english: "291 Detergent",
            roman: "291 Detergent",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "292 तरल ग्यासको विर्को लगाउने प्लान्ट",
            english: "292 Liquefied Gas Bottling Plants",
            roman: "292 Taral gasko birko lagaune plant",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "293 तेल डिस्टिल प्लान्ट",
            english: "293 Oil Distillation Plants",
            roman: "293 Tel distill plant",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "294 तेल निकाल्ने",
            english: "294 Oil Extraction",
            roman: "294 Tel nikaalne",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "295 तेल मिल रिफाइनिङ",
            english: "295 Oil Mills Refining",
            roman: "295 Tel mill refining",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "296 तेलको बीज",
            english: "296 Oil Seeds",
            roman: "296 Telko beej",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "297 दाना छोडाउने वा छुट्याउने तथा पेल्ने मिल",
            english: "297 Grain/Seeds Disintegrating/crushing/ Decorticating factories/ Dal Mills",
            roman: "297 Daana chhodaune wa chhutyauune tatha pelne mill",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "298 दालमोठ तथा पापड",
            english: "298 Dalmoth and Papad",
            roman: "298 Daalmoth tatha paapad",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "299 धुँवा उत्सर्जक",
            english: "299 Smoke Generators",
            roman: "299 Dhuwaa utsarjak",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "300 धोक्रो वा कपडा भएको कागज",
            english: "300 Hessian Paper and Cloth",
            roman: "300 Dhorko wa kapadaa bhaeko kagaj",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "301 नाइट्रिक एसिड",
            english: "301 Nitric Acid",
            roman: "301 Nitric acid",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "302 नाइट्रो कटन थ्रेड",
            english: "302 Nitro Cotton Thread",
            roman: "302 Nitro cotton thread",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "303 नाइट्रो सिल्क",
            english: "303 Nitro Silk",
            roman: "303 Nitro silk",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "304 नाइलन फाइवर",
            english: "304 Nylon Fiber",
            roman: "304 Nylon fiber",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "305 निकेल नाइट्रेट",
            english: "305 Nickel Nitrate",
            roman: "305 Nickel nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "306 पार्टिकल बोर्ड",
            english: "306 Particle Board",
            roman: "306 Particle board",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "307 पुदिना वा वावरीको तेल",
            english: "307 Peppermint Oil",
            roman: "307 Pudina wa bawariko tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "308 पेट्रोलियम कोक क्याल्सिनेसन",
            english: "308 Petroleum Coke Calcination",
            roman: "308 Petroleum coke calcination",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "309 पोटासियम नाइट्रेट",
            english: "309 Potassium Nitrate",
            roman: "309 Potassium nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "310 पोटासियम पेरोअक्साइड",
            english: "310 Potassium Peroxide",
            roman: "310 Potassium peroxide",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "311 फायरलाइटर्स",
            english: "311 Firelighters",
            roman: "311 Firelighters",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "312 फेरिक नाइट्रेट",
            english: "312 FerricNitrate",
            roman: "312 Ferric nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "313 फेरोसिलिकन",
            english: "313 Ferrosilicon",
            roman: "313 Ferrosilicon",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "314 फोरमाइका",
            english: "314 Formica",
            roman: "314 Formica",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "315 फ्लोरिङ एण्ड फर्निसिङ्",
            english: "315 Flooring and Furnishing",
            roman: "315 Flooring & furnishing",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "316 फ्ल्यास पाउडर फोटोग्राफिक",
            english: "316 Flash Powder Photographic",
            roman: "316 Flash powder photographic",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "317 वनस्पति तेल",
            english: "317 Vegetable Oil",
            roman: "317 Banaspati tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "318 वनस्पतिको रेशा",
            english: "318 Vegetable Fibers",
            roman: "318 Banaspati ko resaa",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "319 वनस्पती घिऊ",
            english: "319 vegetable Ghee",
            roman: "319 Banaspati ghiu",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "320 बन्दरगाह, सुख्खा बन्दरगाह तथा विशेष आर्थिक क्षेत्र",
            english: "320 Port, Dry Port and Special Economic Zone",
            roman: "320 Bandargaah, sukhkha bandargaah tatha vishes aarthik kshetra",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "321 बायो ग्यास",
            english: "321 Bio Gas",
            roman: "321 Bio gas",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "322 ब्याट्री वा शेल [सबै प्रकारको ]",
            english: "322 Batteryof any Kind",
            roman: "322 Battery wa shell [sabai prakarko]",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "323 ब्रान डस्ट",
            english: "323 Bran Dust",
            roman: "323 Bran dust",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "324 ब्लिचिङ पाउडर",
            english: "324 Bleaching Powder",
            roman: "324 Bleaching powder",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "325 भिनेगर",
            english: "325 Vinegar",
            roman: "325 Vinegar",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "326 भेरमाउथ तेल",
            english: "326 Vermouth Oil",
            roman: "326 Vermouth tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "327 भोल्युम बार्क,  फाइवर",
            english: "327 Volume Bark Fibre",
            roman: "327 Volume bark, fiber",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "328 भ्यालेरियन तेल",
            english: "328 Valerian Oil",
            roman: "328 Valerian tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "329 मर्क्युरस नाइट्रेट",
            english: "329 Mercurous Nitrate",
            roman: "329 Mercurous nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "330 मल समिश्रण कार्य",
            english: "330 Manure Blending Works",
            roman: "330 Mal samishran karya",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "331 मलखाद",
            english: "331 Fertilizer",
            roman: "331 Malkhaad",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "332 माइका",
            english: "332 Mica",
            roman: "332 Mica",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "333 मेहेन्दी वा तिउरीको तेल",
            english: "333 Rosemary Oil",
            roman: "333 Mehendi wa tiuri ko tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "334 मैन्टोल",
            english: "334 Incandescent Gas mantle",
            roman: "334 Menthol",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "335 म्यांगानिज नाइट्रेट",
            english: "335 Manganese Nitrate",
            roman: "335 Manganese nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "336 म्यांगानिज पेरोअक्साइड",
            english: "336 Manganese Peroxide",
            roman: "336 Manganese peroxide",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "337 म्याग्नेसियम नाइट्रेट",
            english: "337 Magnesium Nitrate",
            roman: "337 Magnesium nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "338 म्याट्रेस",
            english: "338 Mattress",
            roman: "338 Mattress",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "339 युरिया नाइट्रेट",
            english: "339 Urea Nitrate",
            roman: "339 Urea nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "340 रङ्ग तथा बार्निस",
            english: "340 Color and Varnish",
            roman: "340 Rang tatha varnish",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "341 रवर उद्योग",
            english: "341 Rubber",
            roman: "341 Rubber udyog",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "342 रवर सिमेन्ट",
            english: "342 Rubber Cement",
            roman: "342 Rubber cement",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "343 रवरको सामान उत्पादन [स्प्रेडिङ विना]",
            english: "343 Rubber Goods Manufacturing without spreading",
            roman: "343 Rubber ko saamaan utpaadan [spreading bina]",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "344 रसायन [यस तालिकामा अन्यत्र उल्लेख भएको बाहेक]",
            english: "344 Chemical [Other than mentioned in this table]",
            roman: "344 Rasayan [yas talikamaa anyatra ullekh bhaeko bahek]",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "345 रोलर कम्पोजिसन",
            english: "345 Roller Composition",
            roman: "345 Roller composition",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "346 लिड नाइट्रेट",
            english: "346 Lead Nitrate",
            roman: "346 Lead nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "347 लिड पेरोअक्साइट",
            english: "347 Lead Peroxide",
            roman: "347 Lead peroxide",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "348 लिथोग्राफ प्रेस",
            english: "348 Lithographic Presses",
            roman: "348 Lithograph press",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "349 ल्याभेण्डर तेल",
            english: "349 Lavender Oil",
            roman: "349 Lavender tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "350 ल्यामिनेटेड कागज तथा कार्डबोर्ड मिल",
            english: "350 Laminated Paper and Cardboard Mills",
            roman: "350 Laminated kagaj tatha cardboard mill",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "351 वनस्पतीजन्य रेसा (रेयन फार्इवर सहितको कुनै पनि पदार्थ)",
            english: "351 Vegetable fibres of any kind including Rayon Fibre",
            roman: "351 Banaspatijanaya resaa (rayon fiber sahitko kunai pani padartha)",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "352 सनमाइका",
            english: "352 Sunmica",
            roman: "352 Sunmica",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "353 सरसफाई सम्बन्धी सामान",
            english: "353 Toiletry products and Sanitation Goods",
            roman: "353 Sarsafai sambandhi saamaan",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "354 सल्फ्युरिक एसिड",
            english: "354 Sulphuric Acid",
            roman: "354 Sulfuric acid",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "355 सल्लाको तेल",
            english: "355 Pine Oil",
            roman: "355 Salla ko tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "356 सावुन",
            english: "356 Soap",
            roman: "356 Sabuun",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "357 सिट्रोनेला तेल",
            english: "357 Citronella Oil",
            roman: "357 Citronella tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "358 सिल्भर नाइट्रेट",
            english: "358 Silver Nitrate",
            roman: "358 Silver nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "359 सुन्तलाको तेल",
            english: "359 Orange Oil",
            roman: "359 Suntala ko tel",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "360 सुर्ती उद्योग",
            english: "360 Tobacco",
            roman: "360 Surti udyog",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "361 सुर्ती केलाउने तथा पुन: सुकाउने",
            english: "361 Tobacco Curing / Re-drying",
            roman: "361 Surti kelaaune tatha puna: sukaaune",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "362 सोडियम अमाल्गम",
            english: "362 Sodium Amalgam",
            roman: "362 Sodium amalgam",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "363 सोडियम नाइट्रेट",
            english: "363 Sodium Nitrate",
            roman: "363 Sodium nitrate",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "364 सोडियम पेरोअक्साइड",
            english: "364 Sodium Peroxide",
            roman: "364 Sodium peroxide",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "365 सोयाविन",
            english: "365 Soyabean",
            roman: "365 Soyabean",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "366 स्पार्कल्स",
            english: "366 Sparkles",
            roman: "366 Sparks",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "367 स्प्रस उड टार",
            english: "367 Spruce Wood Tar",
            roman: "367 Spruce wood tar",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        {
            nepali: "368 हाइड्रोक्लोरिक एसिड",
            english: "368 Hydrochloric Acid",
            roman: "368 Hydrochloric acid",
            category: "उच्च मध्यम जोखिम",
            rate: "4.5"
        },
        // न्यून खतराजन्य जोखिम (5.5 rate)
        {
            nepali: "369 ३२º भन्दा कम तापक्रममा बल्ने रङ्ग तथा प्रज्वलनशील वेस (बन्द नगरीएको तथा खुल्ला बाहेक)",
            english: "369 Paints with inflammable base having Flash point below 320º C (Closed Cup test) other than in sealed tins or drums",
            roman: "369 32° bhanda kam tapkramma balne rang tatha prajwalanashil base (band nagariyeko tatha khulla bahek)",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "370 ३२º भन्दा कम तापक्रममा बल्ने वार्निस (बन्द नगरीएको तथा खुल्ला बाहेक)",
            english: "370 Varnishes having Flash point below 320º C (Closed Cup Test) other than in sealed tins or drums",
            roman: "370 32° bhanda kam tapkramma balne varnish (band nagariyeko tatha khulla bahek)",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "371 अक्सिजन तथा अक्सिडार्इजिङ् एजेन्ट",
            english: "371 Oxygen and Oxidizing Agents",
            roman: "371 Oxygen tatha oxidizing agent",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "372 अति विषाक्त बस्तु",
            english: "372 Highly Toxic Materials",
            roman: "372 Ati bishakta bastu",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "373 अलकत्रा",
            english: "373 Bitumin",
            roman: "373 Alkatra",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "374 अलकत्रा भएको कागज वा कपडा",
            english: "374 Bituminized Paper and Cloth",
            roman: "374 Alkatra bhaeko kagaj wa kapada",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "375 आइरन कार्वोनिल",
            english: "375 Iron Carbonyl",
            roman: "375 Iron carbonyl",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "376 औद्योगिक ग्यास (बुलेट बाहेक)",
            english: "376 Industrial Gas Except Bullet",
            roman: "376 Audyogik gas (bullet bahek)",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "377 कोल तथा कोइला प्रशोधन",
            english: "377 Coal and Coal Processing",
            roman: "377 Coal tatha koila prashodhan",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "378 क्याप्सुल [औषधी बाहेक]",
            english: "378 Capsule[Except Medicine]",
            roman: "378 Capsule [aushadhi bahek]",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "379 खेलौना",
            english: "379 Doll",
            roman: "379 Khelauna",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "380 खैनी",
            english: "380 Khaini",
            roman: "380 Khaini",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "381 गहुँको थ्रेसर",
            english: "381 Wheat Threshers",
            roman: "381 Gahumko thresher",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "382 गुट्खा",
            english: "382 Gutkha",
            roman: "382 Gutkha",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "383 ग्रिज, मोबिल तथा लुविकेन्टस",
            english: "383 Grease, Mobile and Lubricants",
            roman: "383 Grease, mobil tatha lubricants",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "384 घुम्ती नाटक टोली तथा घुम्ती चलचित्र भवन",
            english: "384 Touring Drama Troupes and Touring Cinema Theatres",
            roman: "384 Ghumti natak toli tatha ghumti chalchitra bhawan",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "385 चलचित्र खिच्ने, सम्पादन गर्ने, प्रयोगशाला, ध्वनी सम्पादन तथा फिल्म प्रोसेस गर्ने ठाँउ",
            english: "385 Cinematography Film Editing, Laboratory and Sound Recording Rooms where Film Processing is carried out",
            roman: "385 Chalchitra khichne, sampadan garne, prayogshala, dhwani sampadan tatha film process garne thau",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "386 चलचित्र फिल्म उत्पादन स्टुडियो",
            english: "386 Cinema Film Production Studios",
            roman: "386 Chalchitra film utpadan studio",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "387 चारकोल बल तथा चारकोल",
            english: "387 Charcoal Ball",
            roman: "387 Charcoal ball tatha charcoal",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "388 झोलङ्गे पुल",
            english: "388 Suspension Bridge",
            roman: "388 Jholange pul",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "389 टाँचा मार्ने, थिच्ने",
            english: "389 Stamping, Pressing",
            roman: "389 Tancha marne, thichne",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "390 टारपुलिन तथा क्यानभास प्रुफिङ",
            english: "390 Tarpaulin and Canvas Proofing",
            roman: "390 Tarpaulin tatha canvas proofing",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "391 टिनको छपाई",
            english: "391 Tin Printers",
            roman: "391 Tinko chhapai",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "392 टुक्रा पार्ने वा धुल्याउने प्लान्ट [अन्य]",
            english: "392 Pulverizing Plants [Others]",
            roman: "392 Tukra parne wa dhulyaune plant [anya]",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "393 ढुवानीकर्ताको गोदाम",
            english: "393 Transporters Warehouse (Transporter's godowns & Godowns of clearing and forwarding agents.)",
            roman: "393 Dhuvanikartako godaam",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "394 तातो वा चिसो रोलिङ",
            english: "394 Hotor Cold Rolling",
            roman: "394 Tato wa chiso rolling",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "395 नरीवलको जट्टा, कोयर तथा क्याडीको भण्डारण",
            english: "395 Storage of Coir Waste, Coir Fibre, Caddies",
            roman: "395 Nariwal ko jatta, coir tatha caddyko bhandaran",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "396 नस",
            english: "396 Snuff",
            roman: "396 Nas",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "397 पोलिस्टर फिल्म तथा विओपिपि",
            english: "397 Polyester Film Manufacturing/ BOPP Film Manufacturing",
            roman: "397 Polyester film tatha BOPP",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "398 प्याकिङ तथा खोल",
            english: "398 Packing and Lagging",
            roman: "398 Packing tatha khol",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "399 प्रज्वलनशील सल्भेन्ट प्रयोग हुने ग्रेनाइट उद्योग",
            english: "399 Granite Factories using Inflammable Solvents",
            roman: "399 Prajwalan shil solvent prayog hune granite udyog",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "400 प्रदर्शनी, पर्व, उत्सव, मण्डप",
            english: "400 Exhibition, Fetes, Celebration and Mandup",
            roman: "400 Pradarshani, parva, utsav, mandap",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "401 प्रिफ्यावका सामग्री",
            english: "401 Prefab Goods",
            roman: "401 Prefabka samagri",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "402 प्लाष्टिक",
            english: "402 Plastics",
            roman: "402 Plastic",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "403 फाइवर उद्योग [मानव निर्मित]",
            english: "403 Fiber Manufacturing [Man-Made]",
            roman: "403 Fiber udyog [manav nirmita]",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "404 फाउन्ड्रिज",
            english: "404 Foundries",
            roman: "404 Foundry",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "405 फिल्टर तथा मैन कागज",
            english: "405 Filter and Wax Paper",
            roman: "405 Filter tatha main kagaj",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "406 फोम",
            english: "406 Foam",
            roman: "406 Foam",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "407 फोम प्लास्टिक",
            english: "407 Foam Plastics",
            roman: "407 Foam plastic",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "408 फोम प्लास्टिक तथा कन्भर्टिङ प्लान्ट",
            english: "408 Foamed Plastics and Converting Plants",
            roman: "408 Foam plastic tatha converting plant",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "409 फोम रवर",
            english: "409 Foam Rubber",
            roman: "409 Foam rubber",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "410 फ्रेन्च पोलिस",
            english: "410 French Polish",
            roman: "410 French polish",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "411 बन्द नगरीएको (खुल्ला) किरा मार्ने तथा संक्रमन प्रतिरोधी पदार्थ",
            english: "411 Disinfectant liquids and liquid insecticides–other than in sealed tins or drums",
            roman: "411 Band nagariyeko (khulla) kira marne tatha sankraman pratiridhi padartha",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "412 ब्रुनार्इ नगरेको फ्याव्रिक",
            english: "412 Non-woven Fabric Manufacturing",
            roman: "412 Brunei nagareko fabric",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "413 माल्ट निकाल्ने प्लान्ट",
            english: "413 Malt Extraction Plants",
            roman: "413 Malt nikaalne plant",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "414 मिथाइलेटेड स्पिरिट",
            english: "414 Methylated Spirit",
            roman: "414 Methylated spirit",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "415 समिल",
            english: "415 Saw Mills",
            roman: "415 Sawmill",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "416 सर्कस",
            english: "416 Circus",
            roman: "416 Circus",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "417 सवारी साधनको उत्पादन",
            english: "417 Automobile Production",
            roman: "417 Sawari sadhan ko utpadan",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "418 साँङ्गितिक समारोह, साँस्कृतिक कार्यक्रम",
            english: "418 Music Concert and Cultural Program",
            roman: "418 Sangeetik samaroha, sanskritik karyakram",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "419 सार्वजनिक कार्यक्रम",
            english: "419 Public Program",
            roman: "419 Sarwajanik karyakram",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "420 सिट मेटल फ्याव्रिकेटर्स",
            english: "420 Sheet Metal Fabricators",
            roman: "420 Sheet metal fabricators",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "421 स्टेन्सिल पेपर तथा डुप्लिकेटिङ",
            english: "421 Duplicating/stencil Paper",
            roman: "421 Stencil paper tatha duplicating",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "422 स्ट्रक्चरल स्टिल फ्याव्रिकेटर्स",
            english: "422 Structural Steel Fabricators",
            roman: "422 Structural steel fabricators",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "423 स्प्रे पेन्टिङ तथा पाउडर कोटिङ",
            english: "423 Spray Painting and Powder Coating",
            roman: "423 Spray painting tatha powder coating",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        {
            nepali: "424 हाईड्रोक्लोरिक एसिड",
            english: "424 Hydrochloric Acid",
            roman: "424 Hydrochloric acid",
            category: "न्यून खतराजन्य जोखिम",
            rate: "5.5"
        },
        // मध्यम खतराजन्य जोखिम (7.5 rate)
        {
            nepali: "425 32ºC वा 32ºC देखि 65ºC सम्मको तापक्रममा बल्ने प्रज्वलनशील पदार्थ",
            english: "425 Flammable liquids having flash points between 32ºC to 65ºC.",
            roman: "425 32°C wa 32°C dekhi 65°C sammako tapkramma balne prajwalanashil padartha",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "426 अक्सिजन सहितको अक्सिडाइजिङ एजेन्ट",
            english: "426 Oxidizing Agents and Oxygen",
            roman: "426 Oxygen sahitko oxidizing agent",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "427 आरडिएक्स [रिमोट डिटोनेटेड एक्स्प्लोसिभ]",
            english: "427 RDX [Remote Detonated Explosive]",
            roman: "427 RDX [Remote Detonated Explosive]",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "428 इथर",
            english: "428 Ether",
            roman: "428 Ether",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "429 इथाइलिन नाइट्रेट",
            english: "429 Ethylene Nitrate",
            roman: "429 Ethylene nitrate",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "430 इन्स्ट्यानण्ट इग्निसन कर्ड",
            english: "430 Instant Ignition Chord",
            roman: "430 Instant ignition cord",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "431 एमोनियम क्लोरेट",
            english: "431 Ammonium Chlorate",
            roman: "431 Ammonium chlorate",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "432 एमोनियम नाइट्रेट",
            english: "432 Ammonium Nitrate",
            roman: "432 Ammonium nitrate",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "433 एमोनियम नाइट्रेट एक्स्प्लोसिभ",
            english: "433 Ammonium Nitrate Explosive",
            roman: "433 Ammonium nitrate explosive",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "434 एमोनियम परक्लोरेट",
            english: "434 Ammonium Perchlorate",
            roman: "434 Ammonium perchlorate",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "435 एलमुनियम तथा म्याग्नेसियम पाउडर प्लान्ट",
            english: "435 Aluminum/ Magnesium Powder Plants",
            roman: "435 Aluminum tatha magnesium powder plant",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "436 औद्योगिक सल्भेन्ट",
            english: "436 Industrial Solvent",
            roman: "436 Audyogik solvent",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "437 कडा अक्सिडाइजिङ एजेन्ट्स",
            english: "437 Strong Oxidizing Agents",
            roman: "437 Kadha oxidizing agents",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "438 कपर कार्वाइड",
            english: "438 Copper Carbide",
            roman: "438 Copper carbide",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "439 कपुर",
            english: "439 Camphor",
            roman: "439 Kapoor",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "440 कृतिम रेशम तथा फाइवर",
            english: "440 Rayon Fiberor Fiber",
            roman: "440 Kritim resham tatha fiber",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "441 क्याल्सियम क्लोराइड",
            english: "441 Calcium Chloride",
            roman: "441 Calcium chloride",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "442 क्याल्सियम नाइट्रेट एक्स्प्लोसिभ",
            english: "442 Calcium Nitrate Explosive",
            roman: "442 Calcium nitrate explosive",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "443 क्लोरेट एक्स्पोसिभ",
            english: "443 Chlorate Explosive",
            roman: "443 Chlorate explosive",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "444 खतरापूर्ण सामानको फोहोर",
            english: "444 Waste of Hazardous Materials",
            roman: "444 Khatarapurna saman ko fohor",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "445 खानीको लागि आवश्यक विस्फोटक",
            english: "445 Mining Charges",
            roman: "445 Khaniko lagi aawashyak bisphotak",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "446 गन कटन",
            english: "446 Gun Cotton",
            roman: "446 Gun cotton",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "447 गन कटन सोलुसन",
            english: "447 Gun Cotton Solution",
            roman: "447 Gun cotton solution",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "448 गन पाउडर",
            english: "448 Gun Powder",
            roman: "448 Gun powder",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "449 ग्यालेटिनाइज्ड निट्रोसेलुलोज पाउडर",
            english: "449 Gelatinezed Nitrocellulose Powder",
            roman: "449 Gelatinized nitrocellulose powder",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "450 ग्लिसिरिन नाइट्रेट",
            english: "450 Glycerin Nitrate",
            roman: "450 Glycerine nitrate",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "451 जिङ्क पाइक्रेट",
            english: "451 Zinc Picrate",
            roman: "451 Zinc picrate",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "452 जिङ्क फस्फाइड",
            english: "452 Zinc Phosphide",
            roman: "452 Zinc phosphide",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "453 जिर्कोनियम हाइड्राइड",
            english: "453 Zirconium Hydride",
            roman: "453 Zirconium hydride",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "454 टिटानियम हाइड्राइड",
            english: "454 Titanium Hydride",
            roman: "454 Titanium hydride",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "455 टीएनटी",
            english: "455 TNT",
            roman: "455 TNT",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "456 टेट्रानाइट्रोनाइलिन",
            english: "456 Tetranitroniline",
            roman: "456 Tetranitroniline",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "457 टेट्रानाइट्रोनाप्थालिन",
            english: "457 Tetranitronaphthalene",
            roman: "457 Tetranitronaphthaline",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "458 टेट्रानाइट्रोनाप्थालिन",
            english: "458 Tetranitronapthalene",
            roman: "458 Tetranitronaphthalin",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "459 टेट्रानाइट्रोफिनोल",
            english: "459 Tetranitrophenol",
            roman: "459 Tetranitrophenol",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "460 टेट्रानाइट्रोवेन्जेन",
            english: "460 Tetranitrobenzene",
            roman: "460 Tetranitrobenzene",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "461 टेट्रानाइट्रोग्लिसिरिन",
            english: "461 Trinitroglycerin",
            roman: "461 Tetranitroglycerin",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "462 ट्राइनाइट्रोटुलेन",
            english: "462 Trinitotulene",
            roman: "462 Trinitrotoluene",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "463 ट्राइनाइट्रोफिनोल",
            english: "463 Trinitrophenol",
            roman: "463 Trinitrophenol",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "464 ट्राइनाइट्रोफेनोलमिथाइलाइनाइट्रामाइन",
            english: "464 Trinitrophenolmethylinitramine",
            roman: "464 Trinitrophenolmethylinitramine",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "465 ट्राइनाइट्रोसेलुलोज",
            english: "465 Trinitrocellulose",
            roman: "465 Trinitrocellulose",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "466 ट्राइप्रोपाइलुमिनियम",
            english: "466 Tripropyluminum",
            roman: "466 Tripropyluminium",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "467 ड्राइनाइट्रो ग्लाइकोल",
            english: "467 Dinitro Glycol",
            roman: "467 Dinitro glycol",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "468 डाइनिट्रो ग्लिसिरिन",
            english: "468 Dinitro Glycirne",
            roman: "468 Dinitro glycerin",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "469 डायनामाइट",
            english: "469 Dynamite",
            roman: "469 Dynamite",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "470 डेटोनेटर",
            english: "470 Detonators",
            roman: "470 Detonator",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "471 तारपिन डिस्टीलरी",
            english: "471 Rosin Distilleries",
            roman: "471 Tarpin distillery",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "472 नाइट्रस [सबै प्रकारको]",
            english: "472 Nitrites of all Kinds",
            roman: "472 Nitrous [sabai prakarko]",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "473 नाइट्रेट एक्स्प्लोसिभ्स",
            english: "473 Nitrate Explosives",
            roman: "473 Nitrate explosives",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "474 नाइट्रो सुगर",
            english: "474 NitroSugar",
            roman: "474 Nitro sugar",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "475 नाइट्रो स्टार्च",
            english: "475 NitroStarch",
            roman: "475 Nitro starch",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "476 नाइट्रोग्लिसिरिन",
            english: "476 Nitroglycerine",
            roman: "476 Nitroglycerin",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "477 नाइट्रोग्लिसिरिन पाउडर",
            english: "477 Nitroglycirine Powder",
            roman: "477 Nitroglycerin powder",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "478 नाइट्रोजन क्लोराइड",
            english: "478 Nitrogen Chloride",
            roman: "478 Nitrogen chloride",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "479 नाइट्रोजन ट्राइक्लोराइड",
            english: "479 Nitrogen Trichloride",
            roman: "479 Nitrogen trichloride",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "480 निट्रो कार्वोनाइट्रेट",
            english: "480 Nitro Carbonitrate",
            roman: "480 Nitro carbonitrate",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "481 निट्रो सेलुलोज वस्तु",
            english: "481 Nitro Cellulose Products",
            roman: "481 Nitro cellulose bastu",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "482 निट्रोगेलाटिन डायनामाइट",
            english: "482 Nitrogelatine Dynamite",
            roman: "482 Nitrogelatin dynamite",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "483 निट्रोसेलुलोज",
            english: "483 Nitrocellulose",
            roman: "483 Nitrocellulose",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "484 पड्काउने सामग्री (बन्दुकमा राख्ने)",
            english: "484 Explosive Charges",
            roman: "484 Padkaune samagri (bandukma rakhne)",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "485 पर्क्युसियन क्याप्सुल",
            english: "485 Percussion Capsules",
            roman: "485 Percussion capsul",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "486 पर्क्रोमेट्स",
            english: "486 Perchromates",
            roman: "486 Perchromates",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "487 पर्क्लोरिक एसिड",
            english: "487 Perchloric Acid",
            roman: "487 Perchloric acid",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "488 पर्क्लोरेट [सबै प्रकारको]",
            english: "488 Perchlorate of all Kind",
            roman: "488 Perchlorate [sabai prakarko]",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "489 पर्क्लोरेट विस्फोटक",
            english: "489 Perchlorate Explosives",
            roman: "489 Perchlorate bisphotak",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "490 पानीको सम्पर्कमा आँउदा प्रज्वलनशील ग्यास निकाल्ने पदार्थ",
            english: "490 Materials which evolves Combustible Gases in Contact of Water",
            roman: "490 Panikko samparka ma aunda prajwalanashil gas nikalne padartha",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "491 पेट्रोकेमिकल",
            english: "491 Petrochemicals",
            roman: "491 Petrochemical",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "492 पोटासियम",
            english: "492 Potassium",
            roman: "492 Potassium",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "493 पोटासियम अमाल्गम",
            english: "493 Potassium Amalgam",
            roman: "493 Potassium amalgam",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "494 पोटासियम हाइड्राइड",
            english: "494 Potassium Hydride",
            roman: "494 Potassium hydride",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "495 प्रज्वलनशील ग्यास",
            english: "495 Combustible Gases",
            roman: "495 Prajwalanashil gas",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "496 प्रज्वलनशील निस्क्रिय ग्याँस",
            english: "496 Inert Gases- Combustible",
            roman: "496 Prajwalanashil niskriya gas",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "497 प्राइमर्स [विस्फोटक]",
            english: "497 Primers",
            roman: "497 Primers [bisphotak]",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "498 फस्फाइड्स",
            english: "498 Phosphides",
            roman: "498 Phosphides",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "499 फस्फाइन",
            english: "499 Phosphine",
            roman: "499 Phosphine",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "500 फस्फोरस [पहेँलो वा सेतो]",
            english: "500 Phosphorus [Yellow or White]",
            roman: "500 Phosphorus [pahelo wa seto]",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "501 मट्टितेल, डिजल, पेट्रोल",
            english: "501 Kerosene, Diesel, Petrol",
            roman: "501 Mattitel, diesel, petrol",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "502 मर्क्युरिक क्यानेट",
            english: "502 Mercuric Cyanate",
            roman: "502 Mercuric cyanate",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "503 युरिया पेरोअक्साइड",
            english: "503 Urea Peroxide",
            roman: "503 Urea peroxide",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "504 लाहा",
            english: "504 Lac or Shellac",
            roman: "504 Laha",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "505 लिड ट्राइनाइट्रोरेसोर्सिनेट",
            english: "505 Lead Trinitroresorcinate",
            roman: "505 Lead trinitroresorcinate",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "506 लिथियम एलुमिनियम हाइड्राइड",
            english: "506 Lithium Aluminum Hydride",
            roman: "506 Lithium aluminium hydride",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "507 विडी",
            english: "507 Beedi",
            roman: "507 Bidi",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "508 संक्रमण प्रतिरोधि तरल तथा तरल किटनाशक",
            english: "508 Disinfectant Liquids and Liquid Insecticides",
            roman: "508 Sankraman pratirakshit taral tatha taral kitnashak",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "509 साल्टपिटर ब्लास्टिङ पाउडर",
            english: "509 Saltpeter Blasting Powder",
            roman: "509 Saltpeter blasting powder",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "510 सिल्भर एसिटाइलिन",
            english: "510 Silver Acetylene",
            roman: "510 Silver acetylene",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "511 सुगर नाइट्रेट",
            english: "511 Sugar Nitrate",
            roman: "511 Sugar nitrate",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "512 सेफ्टी एक्स्क्लुसिभ",
            english: "512 Safety Exclusive",
            roman: "512 Safety exclusive",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "513 सोडियम",
            english: "513 Sodium",
            roman: "513 Sodium",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "514 सोडियम डाइनाइट्रो फिनोल",
            english: "514 Sodium Dinitro Phenol",
            roman: "514 Sodium dinitro phenol",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "515 सोडियम हाइड्राइड",
            english: "515 Sodium Hydride",
            roman: "515 Sodium hydride",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "516 सोडियम हाइपोसल्फाइड",
            english: "516 Sodium Hyposulphide",
            roman: "516 Sodium hyposulphide",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "517 स्टार्च नाइट्रेट",
            english: "517 Start Nitrate",
            roman: "517 Starch nitrate",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "518 हतियार तथा गोलिगठ्ठा",
            english: "518 Arms and Ammunitions",
            roman: "518 Hathiyar tatha goligathha",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "519 हाइड्राइड्स",
            english: "519 Hydrides",
            roman: "519 Hydrides",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "520 हाइड्रोजन क्यानाइड",
            english: "520 Hydrogen Cyanide",
            roman: "520 Hydrogen cyanide",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "521 हाइड्रोजन पेरोअक्साइड",
            english: "521 Hydrogen Peroxide",
            roman: "521 Hydrogen peroxide",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "522 हाइड्रोजन सल्फाइड",
            english: "522 Hydrogen Sulphide",
            roman: "522 Hydrogen sulphide",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        {
            nepali: "523 हाइड्रोलिथ",
            english: "523 Hydrolith",
            roman: "523 Hydrolith",
            category: "मध्यम खतराजन्य जोखिम",
            rate: "7.5"
        },
        // उच्च खतराजन्य जोखिम (9 rate)
        {
            nepali: "524 पाइरोटेक्निक पदार्थ",
            english: "524 Pyrotechnic materials",
            roman: "524 Paairotechnic padartha",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "525 आफैं बल्ने पदार्थ",
            english: "525 Materials which are self ignitable",
            roman: "525 Aafai balne padartha",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "526 उच्च ज्वलनशील औद्योगिक ग्यास",
            english: "526 High Flamable Industrial Gas",
            roman: "526 Uchcha jwalanshil audyogik gas",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "527 कटन जिन तथा प्रेस हाउस",
            english: "527 Cotton Gin and Press Houses",
            roman: "527 Cotton gin tatha press house",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "528 प्लाइउड, काठलाई राम्रो पार्ने तथा ल्यामिनेट गर्ने",
            english: "528 Plywood / Wood Veneering Factories/ Laminating",
            roman: "528 Plywood, kathlai ramro parne tatha laminate garne",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "529 भुईंचम्पा, पटका तथा आतिसबाजी",
            english: "529 Crackers and Fire Works",
            roman: "529 Bhuinchampa, pataka tatha atisbaji",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "530 माथि उल्लेखित बाहेकका स्वजलन हुने प्रज्वलनशील पदार्थ",
            english: "530 Self-Ignitable or Spontaneous Combustible Materials other than abvoe Listed",
            roman: "530 Mathi ullekhit bahekka swajwalan hune prajwalanashil padartha",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "531 युरेनियम तथा युरेनियम जस्तै पदार्थ",
            english: "531 Uranium and similar products",
            roman: "531 Uranium tatha uranium jastai padartha",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "532 विद्युत उत्पादन केन्द्र (आणविक भट्टि बाट विद्युत उत्पादन गर्ने केन्द्र)",
            english: "532 electricity PowerHouse - Aotmic Power Plant only",
            roman: "532 Bidyut utpadan kendra (aanawik bhatti bata bidyut utpadan garne kendra)",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "533 विस्फोटक तथा विस्फोटक पदार्थ",
            english: "533 Explosives of any Kind and Blasting Materials",
            roman: "533 Bisphotak tatha bisphotak padartha",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "534 विस्फोटक पदार्थ बनाउने रसायन",
            english: "534 Pyrotechnic Chemical",
            roman: "534 Bisphotak padartha banaune rasayan",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "535 सलाई",
            english: "535 Matches",
            roman: "535 Salaai",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "536 सशक्त अक्सिडाईजिङ् एजेन्ट",
            english: "536 Strong Oxidising Agents",
            roman: "536 Sashakta oxidizing agent",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "537 सेलुलोइड",
            english: "537 Celluloid",
            roman: "537 Celluloid",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "538 सेलुलोइड फिल्म",
            english: "538 Celluloid Film",
            roman: "538 Celluloid film",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        },
        {
            nepali: "539 सेलुलोइड सामान",
            english: "539 Celluloid Goods",
            roman: "539 Celluloid saamaan",
            category: "उच्च खतराजन्य जोखिम",
            rate: "9"
        }
    ];
    populatePropertyLists();
    updateCategory();
}

function populatePropertyLists() {
    const nepaliInput = document.getElementById('nepaliDescProperty');
    const englishInput = document.getElementById('englishDescProperty');
    const romanInput = document.getElementById('romanDescProperty');
    const nepaliOptions = document.getElementById('nepaliOptions');
    const englishOptions = document.getElementById('englishOptions');
    const romanOptions = document.getElementById('romanOptions');
    
    // Clear existing options
    nepaliOptions.innerHTML = '';
    englishOptions.innerHTML = '';
    romanOptions.innerHTML = '';
    
    // Add new options
    propertyItems.forEach(item => {
        // Nepali options
        const nepaliOption = document.createElement('div');
        nepaliOption.className = 'datalist-option';
        nepaliOption.textContent = item.nepali;
        nepaliOption.addEventListener('click', () => {
            nepaliInput.value = item.nepali;
            englishInput.value = item.english;
            romanInput.value = item.roman;
            document.getElementById('category').value = item.category;
            document.getElementById('rate').value = item.rate;
            nepaliOptions.style.display = 'none';
            calculatePremium();
        });
        nepaliOptions.appendChild(nepaliOption);
        
        // English options
        const englishOption = document.createElement('div');
        englishOption.className = 'datalist-option';
        englishOption.textContent = item.english;
        englishOption.addEventListener('click', () => {
            nepaliInput.value = item.nepali;
            englishInput.value = item.english;
            romanInput.value = item.roman;
            document.getElementById('category').value = item.category;
            document.getElementById('rate').value = item.rate;
            englishOptions.style.display = 'none';
            calculatePremium();
        });
        englishOptions.appendChild(englishOption);
        
        // Roman options
        const romanOption = document.createElement('div');
        romanOption.className = 'datalist-option';
        romanOption.textContent = item.roman;
        romanOption.addEventListener('click', () => {
            nepaliInput.value = item.nepali;
            englishInput.value = item.english;
            romanInput.value = item.roman;
            document.getElementById('category').value = item.category;
            document.getElementById('rate').value = item.rate;
            romanOptions.style.display = 'none';
            calculatePremium();
        });
        romanOptions.appendChild(romanOption);
    });
    
    // Add event listeners for input fields
    [nepaliInput, englishInput, romanInput].forEach(input => {
        const optionsContainer = input === nepaliInput ? nepaliOptions : 
                               input === englishInput ? englishOptions : romanOptions;
        
        input.addEventListener('focus', () => {
            // Show only the relevant options container
            nepaliOptions.style.display = input === nepaliInput ? 'block' : 'none';
            englishOptions.style.display = input === englishInput ? 'block' : 'none';
            romanOptions.style.display = input === romanInput ? 'block' : 'none';
        });
        
        // Filter options while typing
        input.addEventListener('input', () => {
            const value = input.value.toLowerCase();
            const options = optionsContainer.querySelectorAll('.datalist-option');
            options.forEach(option => {
                option.style.display = option.textContent.toLowerCase().includes(value) ? 'block' : 'none';
            });
        });
        
        // Keyboard navigation
        input.addEventListener('keydown', (e) => {
            const options = Array.from(optionsContainer.querySelectorAll('.datalist-option:not([style*="display: none"])'));
            let activeOption = optionsContainer.querySelector('.datalist-option.active');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!activeOption) {
                    // First option
                    options[0]?.classList.add('active');
                    options[0]?.scrollIntoView({ block: 'nearest' });
                } else {
                    const currentIndex = options.indexOf(activeOption);
                    const nextIndex = (currentIndex + 1) % options.length;
                    activeOption.classList.remove('active');
                    options[nextIndex].classList.add('active');
                    options[nextIndex].scrollIntoView({ block: 'nearest' });
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (!activeOption) {
                    // Last option
                    options[options.length - 1]?.classList.add('active');
                    options[options.length - 1]?.scrollIntoView({ block: 'nearest' });
                } else {
                    const currentIndex = options.indexOf(activeOption);
                    const prevIndex = (currentIndex - 1 + options.length) % options.length;
                    activeOption.classList.remove('active');
                    options[prevIndex].classList.add('active');
                    options[prevIndex].scrollIntoView({ block: 'nearest' });
                }
            } else if (e.key === 'Enter' && activeOption) {
                e.preventDefault();
                activeOption.click();
            } else if (e.key === 'Escape') {
                optionsContainer.style.display = 'none';
            }
        });
    });
    
    // Hide dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!nepaliInput.contains(e.target) && !nepaliOptions.contains(e.target)) {
            nepaliOptions.style.display = 'none';
        }
        if (!englishInput.contains(e.target) && !englishOptions.contains(e.target)) {
            englishOptions.style.display = 'none';
        }
        if (!romanInput.contains(e.target) && !romanOptions.contains(e.target)) {
            romanOptions.style.display = 'none';
        }
    });
}

// Update the calculatePremium function:
function calculatePremium() {
    const valueInput = document.getElementById('value');
    const rateInput = document.getElementById('rate');
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.classList.add('hidden');
    
    if (!valueInput.value || isNaN(parseFloat(valueInput.value))) {
        return;
    }
    
    if (currentInsuranceType === 'home') {
        updateHomeInsuranceRate();
        updateCategory();
    } else if (!rateInput.value) {
        return;
    }
    
    const rate = parseFloat(rateInput.value);
    const value = parseFloat(valueInput.value);
    const directDiscount = document.getElementById('directDiscount').checked;
    const shortTermPremium = document.getElementById('shortTermPremium').checked;
    const shortTermPeriod = parseFloat(document.getElementById('shortTermPeriod').value) || 1;
    
    // Calculate base premium
    let premium = (value * rate) / 1000;
    let discount = directDiscount ? premium * 0.025 : 0;
    let afterDiscount = premium - discount;
    let shortTermAmount = shortTermPremium ? afterDiscount * shortTermPeriod : 0;
    
    // Calculate final amounts
    let vat = (shortTermPremium ? shortTermAmount : afterDiscount) * 0.13;
    let stamp = 20;
    let total = (shortTermPremium ? shortTermAmount : afterDiscount) + vat + stamp;
    
    // Update results table
    const premiumRow = document.getElementById('premiumAmount').parentNode.parentNode;
    const discountRow = document.getElementById('discountRow');
    const shortTermRow = document.getElementById('shortTermRow');
    
    // Show short term amount in premium amount section when selected
    if (shortTermPremium) {
        document.getElementById('premiumAmount').textContent = format(shortTermAmount);
        premiumRow.classList.remove('hidden');
        shortTermRow.classList.add('hidden'); // Hide the separate short term row
    } else {
        document.getElementById('premiumAmount').textContent = format(afterDiscount);
        premiumRow.classList.remove('hidden');
        shortTermRow.classList.add('hidden');
    }
    
    // Handle direct discount display
    document.getElementById('discountAmount').textContent = format(discount);
    discountRow.classList.toggle('hidden', !directDiscount);
    
    // Update other amounts
    document.getElementById('vatAmount').textContent = format(vat);
    document.getElementById('stampAmount').textContent = format(stamp);
    document.getElementById('totalAmount').textContent = format(total);
    
    resultsDiv.classList.remove('hidden');
}

function updateInsuranceType() {
    currentInsuranceType = document.querySelector('input[name="insuranceType"]:checked').value;
    
    if (currentInsuranceType === 'home') {
        document.getElementById('homeInsuranceFields').classList.remove('hidden');
        document.getElementById('propertyInsuranceFields').classList.add('hidden');
        
        document.getElementById('nepaliDescHome').value = "01 आवासीय भवन वा घर, मठ मन्दिर, ध्यान, पूजा तथा प्रार्थनास्थल तथा त्यसभित्र रहेको सम्पत्ति वा सामान";
        document.getElementById('englishDescHome').value = "01 Residential Building or home, Temples, Meditation and Pray or Worship Place including Goods and Properties inside";
        document.getElementById('romanDescHome').value = "01 Aawasiya bhawan wa ghar, math mandir, dhyan, pooja tatha prarthanasthal tatha tyasbhitra rahayeko sampatti wa saaman.";
        
        updateHomeInsuranceRate();
        updateCategory();
    } else {
        document.getElementById('homeInsuranceFields').classList.add('hidden');
        document.getElementById('propertyInsuranceFields').classList.remove('hidden');
        
        document.getElementById('nepaliDescProperty').value = '';
        document.getElementById('englishDescProperty').value = '';
        document.getElementById('romanDescProperty').value = '';
        document.getElementById('category').value = '';
        document.getElementById('rate').value = '';
    }
    
    calculatePremium();
}

function updateCategory() {
    const valueInput = document.getElementById('value');
    const categoryInput = document.getElementById('category');
    const value = parseFloat(valueInput.value) || 0;
    
    if (currentInsuranceType === 'home') {
        categoryInput.value = value > 20000000 ? "मध्यम जाेखिम" : "अति सामान्य जाेखिम";
    }
}

function updateHomeInsuranceRate() {
    const value = parseFloat(document.getElementById('value').value) || 0;
    let rate = '0.50';
    
    if (value > 20000000) {
        rate = '3.00';
    } else if (value > 10000000) {
        rate = '1.50';
    }
    
    document.getElementById('rate').value = rate;
}

function toggleShortTermPeriod() {
    const shortTermPeriod = document.getElementById('shortTermPeriod');
    if (document.getElementById('shortTermPremium').checked) {
        shortTermPeriod.classList.remove('hidden');
    } else {
        shortTermPeriod.classList.add('hidden');
    }
    calculatePremium();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadFallbackData();
    updateInsuranceType();
});