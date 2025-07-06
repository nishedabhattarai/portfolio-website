// Format all amounts as NPR with 2 decimal places
const format = (amount) => new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}).format(amount);

// Toggle the dropdown menu
function toggleMenu() {
    const dropdown = document.getElementById("menuDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Toggle the settings menu
function toggleSettings() {
    const settingsMenu = document.getElementById("settingsMenu");
    settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
}

// Toggle Dark Mode
function toggleDarkMode() {
    const body = document.body;
    const darkModeCheckbox = document.getElementById("darkModeToggle");

    if (darkModeCheckbox.checked) {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }
}

// Change Font Size
function changeFontSize() {
    const fontSize = document.getElementById("fontSizeRange").value;
    document.body.style.fontSize = fontSize + "px";
}

function showAbout() {
    document.getElementById('aboutOverlay').style.display = 'flex';
}

function hideAbout() {
    document.getElementById('aboutOverlay').style.display = 'none';
}

// Close overlay when clicking outside the content
window.onclick = function(event) {
    const overlay = document.getElementById('aboutOverlay');
    if (event.target == overlay) {
        overlay.style.display = 'none';
    }
}

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
            roman: "21 Concreteka block tatha saamaan",
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
            english: "97 Airport Terminal Buildings [including all facilities like Cafes Shops etc.]",
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
            english: "100 Educational Center Education Consultancy Education and Research Center",
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
            english: "102 Road Highway and Service Road",
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
            english: "112 Gold Silver Platinum",
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
        document.getElementById('romanDescHome').value = "01 Aawasiya bhawan wa ghar, math mandir, dhyan, pooja tatha prarthanasthal tatha tyasbhitra rahayeko sampatti wa saamaan.";
        
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