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
        body.classList.add("dark-mode"); // hyphenated
    } else {
        body.classList.remove("dark-mode"); // hyphenated
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

// Load CSV data
function loadCSVData() {
    Papa.parse("property_list.csv", {
        download: true,
        header: true,
        complete: function(results) {
            insuranceData = results.data;
            propertyItems = results.data.map(item => ({
                nepali: item.NepaliDescription,
                english: item.EnglishDescription,
                roman: item.RomanDescription,
                category: item.Category,
                rate: item['Rate (Rs. per 1000)']
            }));
            populatePropertyLists();
            
            // Initialize category based on default home insurance
            updateCategory();
        },
        error: function(error) {
            showLoading(false);
            console.error("Error loading CSV:", error);
            loadFallbackData();
        }
    });
}
function showLoading(show) {
    // Implement loading indicator
}

function loadFallbackData() {
    propertyItems = [
        {
            nepali: "सुन",
            english: "Gold",
            roman: "Suna",
            category: "अति सामान्य जाेखिम",
            rate: "1.50"
        },
        {
            nepali: "चाँदी",
            english: "Silver",
            roman: "Chandi",
            category: "सामान्य जाेखिम",
            rate: "1.20"
        }
    ];
    populatePropertyLists();
    updateCategory();
}

function populatePropertyLists() {
    const nepaliList = document.getElementById('nepaliList');
    const englishList = document.getElementById('englishList');
    const romanList = document.getElementById('romanList');
    
    nepaliList.innerHTML = '';
    englishList.innerHTML = '';
    romanList.innerHTML = '';
    
    propertyItems.forEach(item => {
        if (item.nepali) {
            const option1 = document.createElement('option');
            option1.value = item.nepali;
            nepaliList.appendChild(option1);
        }
        
        if (item.english) {
            const option2 = document.createElement('option');
            option2.value = item.english;
            englishList.appendChild(option2);
        }
        
        if (item.roman) {
            const option3 = document.createElement('option');
            option3.value = item.roman;
            romanList.appendChild(option3);
        }
    });
}

function updateInsuranceType() {
    currentInsuranceType = document.querySelector('input[name="insuranceType"]:checked').value;
    
    if (currentInsuranceType === 'home') {
        document.getElementById('homeInsuranceFields').classList.remove('hidden');
        document.getElementById('propertyInsuranceFields').classList.add('hidden');
        
        // Reset fields for home insurance
        document.getElementById('nepaliDescHome').value = "1. आवासीय भवन वा घर, मठ मन्दिर, ध्यान, पूजा तथा प्रार्थनास्थल तथा त्यसभित्र रहेको सम्पत्ति वा सामान";
        document.getElementById('englishDescHome').value = "Residential Building or home, Temples, Meditation and Pray or Worship Place including Goods and Properties inside";
        document.getElementById('romanDescHome').value = "Aawasiya bhawan wa ghar, math mandir, dhyan, pooja tatha prarthanasthal tatha tyasbhitra rahayeko sampatti wa saamaan.";
        
        updateHomeInsuranceRate();
        updateCategory();
    } else {
        document.getElementById('homeInsuranceFields').classList.add('hidden');
        document.getElementById('propertyInsuranceFields').classList.remove('hidden');
        
        // Clear fields for property insurance
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

function updatePropertyDetails(changedField) {
    const nepaliInput = document.getElementById('nepaliDescProperty');
    const englishInput = document.getElementById('englishDescProperty');
    const romanInput = document.getElementById('romanDescProperty');
    const categoryInput = document.getElementById('category');
    const rateInput = document.getElementById('rate');
    
    let searchValue, searchField;
    
    if (changedField === 'nepali') {
        searchValue = nepaliInput.value;
        searchField = 'nepali';
    } else if (changedField === 'english') {
        searchValue = englishInput.value;
        searchField = 'english';
    } else {
        searchValue = romanInput.value;
        searchField = 'roman';
    }
    
    const foundItem = propertyItems.find(item => item[searchField] === searchValue);
    
    if (foundItem) {
        nepaliInput.value = foundItem.nepali || '';
        englishInput.value = foundItem.english || '';
        romanInput.value = foundItem.roman || '';
        categoryInput.value = foundItem.category || '';
        rateInput.value = foundItem.rate || '';
    }
    
    calculatePremium();
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

function calculatePremium() {
    const valueInput = document.getElementById('value');
    const rateInput = document.getElementById('rate');
    const resultsDiv = document.getElementById('results');
    
    // Hide results initially
    resultsDiv.classList.add('hidden');
    
    // Validate inputs
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
    
    // Calculate premium
    let premium = (value * rate) / 1000;
    let discount = directDiscount ? premium * 0.025 : 0;
    let afterDiscount = premium - discount;
    let shortTermAmount = shortTermPremium ? afterDiscount * shortTermPeriod : 0;
    
    // Calculate final amounts
    let vat = (shortTermPremium ? shortTermAmount : afterDiscount) * 0.13;
    let stamp = 20;
    let total = (shortTermPremium ? shortTermAmount : afterDiscount) + vat + stamp;
    
    // Update results
    document.getElementById('premiumAmount').textContent = premium.toFixed(2);
    document.getElementById('discountAmount').textContent = discount.toFixed(2);
    document.getElementById('shortTermAmount').textContent = shortTermAmount.toFixed(2);
    document.getElementById('vatAmount').textContent = vat.toFixed(2);
    document.getElementById('stampAmount').textContent = stamp.toFixed(2);
    document.getElementById('totalAmount').textContent = total.toFixed(2);
    
    // Toggle rows
    document.getElementById('discountRow').classList.toggle('hidden', !directDiscount);
    document.getElementById('shortTermRow').classList.toggle('hidden', !shortTermPremium);
    
    // Show results
    resultsDiv.classList.remove('hidden');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadCSVData();
    
    // Set up event listeners
    document.getElementById('value').addEventListener('input', function() {
        if (currentInsuranceType === 'home') {
            updateHomeInsuranceRate();
            updateCategory();
        }
        calculatePremium();
    });
    
    document.getElementById('directDiscount').addEventListener('change', calculatePremium);
    document.getElementById('shortTermPremium').addEventListener('change', function() {
        toggleShortTermPeriod();
        calculatePremium();
    });
    document.getElementById('shortTermPeriod').addEventListener('change', calculatePremium);
    
    // Initialize insurance type
    updateInsuranceType();
});
