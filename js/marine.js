    // ==================== CARGO DATASET ====================
    const cargoRates = [];
    function addCargo(en, ne, rateA, rateB, rateC) {
        cargoRates.push({ en: en.trim(), ne: ne.trim(), rates: { A: parseFloat(rateA), B: parseFloat(rateB), C: parseFloat(rateC) } });
    }

    // Populate data
    addCargo("AUTOMOBILES (Other than driven on own power)", "स्वःचालित सवारी साधनहरु", 0.26, 0.14, 0.06);
    addCargo("BAGGED CARGO - New Gunny/Jute Bags", "बोरामा रहेका सामान - नयाँ जुट/गनी", 0.25, 0.15, 0.06);
    addCargo("BAGGED CARGO - Polythene/Double Bags", "बोरामा सामान - पोलिथिन/दोहोरो", 0.22, 0.13, 0.05);
    addCargo("BETLENUTS", "सुपारी", 0.5, 0.3, 0.12);
    addCargo("BEVERAGES & MINERAL WATER - Glass Bottles", "पेय पदार्थ - शीशाको बोतल", 0.4, 0.25, 0.1);
    addCargo("BEVERAGES & MINERAL WATER - Other Packing", "पेय पदार्थ - अन्य प्याकिङ्ग", 0.3, 0.15, 0.06);
    addCargo("CABLES AND WIRES", "सबै प्रकारका तारहरु", 0.15, 0.1, 0.04);
    addCargo("CEMENT", "सिमेन्ट", 0.5, 0.15, 0.06);
    addCargo("CHEMICALS - Non Hazardous", "रासायनिक - जोखिम रहित", 0.3, 0.18, 0.07);
    addCargo("CHEMICALS - Hazardous", "रासायनिक - जोखिमपूर्ण", 0.4, 0.25, 0.1);
    addCargo("CHEMICALS - Extra Hazardous", "रासायनिक - अति जोखिमपूर्ण", 0.5, 0.3, 0.12);
    addCargo("COAL", "कोइला", 0.5, 0.4, 0.3);
    addCargo("CARPETS, TEXTILES, GARMENT MATERIALS", "कार्पेट, कपडा, गार्मेन्ट कच्चा पदार्थ", 0.15, 0.1, 0.04);
    addCargo("COTTON, YARN, THREAD", "कपास, धागो", 0.1, 0.08, 0.04);
    addCargo("EDIBLE OIL & GHEE - Bulk/Tanks", "खाद्य तेल घ्यू - ट्याङ्कर", 0.35, 0.2, 0.08);
    addCargo("EDIBLE OIL & GHEE - Drum/Jar", "खाद्य तेल घ्यू - ड्रम/जार", 0.22, 0.15, 0.06);
    addCargo("EDIBLE ITEMS - Grains & Pulses", "खाद्य पदार्थ - अन्न, दाल", 0.25, 0.15, 0.06);
    addCargo("EDIBLE ITEMS - Oil Seeds", "तेलहनहरु", 0.32, 0.17, 0.07);
    addCargo("EDIBLE ITEMS - Others", "खाद्य पदार्थ - अन्य", 0.25, 0.15, 0.06);
    addCargo("ELECTRIC & ELECTRONIC ITEMS", "बिद्युतीय तथा इलेक्ट्रोनिक सामान", 0.3, 0.2, 0.08);
    addCargo("EMPTY GAS CYLINDER", "ग्याँसको खाली सिलिन्डर", 0.08, 0.05, 0.03);
    addCargo("FRAGILE ARTICLES (China, Glass, Sanitary)", "सजिलै टुटफुट हुने सामान", 0.8, 0.5, 0.2);
    addCargo("FERTILIZER - In Bulk", "कृषि मल - ठूलो परिमाण", 0.5, 0.23, 0.09);
    addCargo("FERTILIZER - In Bags", "कृषि मल - बोरामा", 0.4, 0.2, 0.08);
    addCargo("FOOT WEAR", "जुत्ताहरु", 0.2, 0.12, 0.05);
    addCargo("FURNITURE - Metal & Plastics", "फर्निचर - धातु/प्लाष्टिक", 0.2, 0.12, 0.05);
    addCargo("FURNITURE - Wooden & other", "फर्निचर - काठ तथा अन्य", 0.7, 0.4, 0.2);
    addCargo("GOLD, SILVER, PRECIOUS STONES", "सुन, चाँदी, बहुमूल्य पत्थर", 0.5, 0.3, 0.12);
    addCargo("HANDICRAFTS (Non Fragile)", "हस्तकला (नटुट्ने)", 0.3, 0.15, 0.06);
    addCargo("LEATHER - Raw & Semi Finished", "छाला - काँचो तथा अर्ध तयारी", 0.25, 0.15, 0.06);
    addCargo("LEATHER - Finished Goods", "छाला - तयारी सामान", 0.2, 0.12, 0.05);
    addCargo("LIQUID CARGO - Non Hazardous (Tanker/Drums)", "तरल सामान - जोखिम रहित (ट्याङ्कर/ड्रम)", 0.4, 0.25, 0.1);
    addCargo("LIQUID CARGO - Non Hazardous (Other Packing)", "तरल सामान - जोखिम रहित (अन्य)", 0.3, 0.18, 0.07);
    addCargo("LIQUID CARGO - Hazardous (Tanker/Drums)", "तरल सामान - जोखिमपूर्ण (ट्याङ्कर/ड्रम)", 0.6, 0.35, 0.14);
    addCargo("LIQUID CARGO - Hazardous (Other Packing)", "तरल सामान - जोखिमपूर्ण (अन्य)", 0.4, 0.25, 0.1);
    addCargo("LIQUID CARGO - Extra Hazardous (Tanker/Drums)", "तरल सामान - अति जोखिमपूर्ण (ट्याङ्कर/ड्रम)", 0.8, 0.5, 0.2);
    addCargo("LIQUID CARGO - Extra Hazardous (Other)", "तरल सामान - अति जोखिमपूर्ण (अन्य)", 0.4, 0.25, 0.1);
    addCargo("LPG - In Tanker or Bullet", "एलपीजी - ट्याङ्कर वा बुलेट", 0.4, 0.25, 0.1);
    addCargo("LPG - In Cylinders", "एलपीजी - सिलिण्डर", 0.2, 0.12, 0.05);
    addCargo("MACHINERY - Hand Tools", "मेशिनरी - हाते औजार", 0.2, 0.1, 0.04);
    addCargo("MACHINERY - Power Tools", "मेशिनरी - शक्ति औजार", 0.3, 0.2, 0.08);
    addCargo("MARBLE AND GRANITE", "मार्बल तथा ग्रेनाइट", 0.5, 0.3, 0.12);
    addCargo("METAL - BILLETS, INGOTS", "बिलेट, इनगट", 0.06, 0.04, 0.02);
    addCargo("METAL HARDWARE & SHEETS", "धातुका निर्माण सामाग्री, पाता", 0.08, 0.05, 0.03);
    addCargo("METAL SCRAP", "धातु रद्दी", 0.08, 0.05, 0.03);
    addCargo("MATCHES & EXPLOSIVES", "सलाई तथा बिस्फोटक", 0.9, 0.55, 0.25);
    addCargo("PAPER - News Prints, Cardboards", "कागज - न्यूज प्रिन्ट, कार्डबोर्ड", 0.3, 0.15, 0.06);
    addCargo("PAPER - Books, Magazines", "किताब, पत्रपत्रिका", 0.25, 0.12, 0.05);
    addCargo("PAPER - Others", "कागज अन्य", 0.3, 0.15, 0.06);
    addCargo("PLYWOOD & PARTICLE BOARD", "प्लाइउड, पार्टिकल बोर्ड", 0.25, 0.15, 0.06);
    addCargo("PERISHABLE - Non Refrigerated", "सजिलै बिग्रने - रेफ्रिजरेटेड नभएको", 0.4, 0.2, 0.08);
    addCargo("PERISHABLE - Refrigerated", "सजिलै बिग्रने - रेफ्रिजरेटेड", 0.3, 0.16, 0.06);
    addCargo("PERSONAL EFFECTS & HOUSEHOLD GOODS", "व्यक्तिगत तथा घरायसी सामान", 2.0, 0.5, 0.2);
    addCargo("PETROLEUM FUEL - In Bulk", "पेट्रोलियम इन्धन - ठूलो परिमाण", 0.8, 0.5, 0.2);
    addCargo("PETROLEUM FUEL - In Tanker", "पेट्रोलियम इन्धन - ट्याङ्कर", 0.4, 0.25, 0.1);
    addCargo("PHARMACEUTICALS, MEDICINES", "औषधि, ट्वाइलेटरिज", 0.25, 0.15, 0.06);
    addCargo("PLASTIC - Sheets", "प्लाष्टिक सीट", 0.18, 0.1, 0.04);
    addCargo("PLASTIC - Granules", "प्लाष्टिक दाना", 0.25, 0.15, 0.06);
    addCargo("PLASTIC - Other Goods", "प्लाष्टिक अन्य सामान", 0.2, 0.12, 0.05);
    addCargo("SPARE PARTS - Electric/Electronic", "स्पेयर पार्ट्स - बिद्युतीय/इलेक्ट्रोनिक", 0.32, 0.22, 0.09);
    addCargo("SPARE PARTS - Glass Items", "स्पेयर पार्ट्स - शीशा", 0.8, 0.5, 0.2);
    addCargo("SPARE PARTS - Mechanical", "स्पेयर पार्ट्स - मेकानिकल", 0.25, 0.15, 0.06);
    addCargo("SPARE PARTS - Rubber & Plastic (incl tires)", "स्पेयर पार्ट्स - रबर/प्लाष्टिक (टायर)", 0.2, 0.12, 0.05);
    addCargo("STRAW, GRASS, JUTE, COMBUSTIBLE FIBRES", "पराल, घाँस, जुट, बल्ने रेशा", 0.7, 0.5, 0.2);
    addCargo("SUGAR - In Bulk", "चिनी - ठूलो परिमाण", 0.6, 0.35, 0.14);
    addCargo("SUGAR - Other Packing", "चिनी - अन्य प्याकिङ्ग", 0.35, 0.2, 0.08);
    addCargo("TIMBER & WOOD", "चिरान काठ", 0.15, 0.1, 0.04);
    addCargo("TOBACCO - Leaf Tobacco", "सुर्तीको पात", 0.3, 0.2, 0.1);
    addCargo("TOBACCO - Tobacco Products", "सुर्तिजन्य बस्तु", 0.25, 0.15, 0.06);

    // DOM Elements
    const commodityInput = document.getElementById('commodityInput');
    const commodityDropdown = document.getElementById('commodityDropdown');
    const riskRadios = document.querySelectorAll('input[name="riskCoverage"]');
    const riskOptions = document.querySelectorAll('.radio-option');
    const srccCheckbox = document.getElementById('srccCheckbox');
    const directDiscountCheck = document.getElementById('directDiscountCheck');
    const transitMode = document.getElementById('transitMode');
    const transitTypeGroup = document.getElementById('transitTypeGroup');
    const railType = document.getElementById('railType');
    const containerGroup = document.getElementById('containerGroup');
    const containerDiscountCheck = document.getElementById('containerDiscountCheck');
    const invoiceInput = document.getElementById('invoiceValue');
    const toleranceInput = document.getElementById('tolerancePercent');
    const incrementalInput = document.getElementById('incrementalPercent');
    const dutyInput = document.getElementById('dutyPercent');
    const exchangeInput = document.getElementById('exchangeRate');
    const recalcBtn = document.getElementById('recalcBtn');
    const premiumBreakdownBody = document.getElementById('premiumBreakdownBody');
    const totalPayableDiv = document.getElementById('totalPayableDiv');

    let selectedCargo = null;
    let currentHighlightIndex = -1;
    let currentFilteredItems = [];

    // Helper functions
    function getSelectedRisk() {
        for (let radio of riskRadios) {
            if (radio.checked) return radio.value;
        }
        return 'A';
    }

    function updateRiskUI() {
        const risk = getSelectedRisk();
        riskOptions.forEach(opt => {
            const optRisk = opt.getAttribute('data-risk');
            if (optRisk === risk) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }

    function updateSRCCAuto() {
        const risk = getSelectedRisk();
        if (risk === 'A') {
            srccCheckbox.checked = true;
            srccCheckbox.disabled = true;
        } else {
            srccCheckbox.disabled = false;
        }
        calculatePremium();
    }

    function updateTransitUI() {
        const mode = transitMode.value;
        if (mode === 'rail') {
            transitTypeGroup.classList.remove('hidden');
            containerGroup.style.display = 'none';
        } else if (mode === 'sea') {
            transitTypeGroup.classList.add('hidden');
            containerGroup.style.display = 'flex';
        } else {
            transitTypeGroup.classList.add('hidden');
            containerGroup.style.display = 'none';
        }
        calculatePremium();
    }

    function getTransitDiscountPercent() {
        const mode = transitMode.value;
        if (mode === 'air') return 20;
        if (mode === 'sea') return 0;
        if (mode === 'rail') {
            const type = railType.value;
            if (type === 'limited') return 30;
            if (type === 'standard') return 25;
            if (type === 'discount') return 20;
        }
        return 0;
    }

    function getSrccRate() {
        const mode = transitMode.value;
        if (mode === 'sea') return 0.03;
        return 0.02;
    }

    function computeInsurableValue() {
        let inv = parseFloat(invoiceInput.value) || 0;
        let tol = parseFloat(toleranceInput.value) || 0;
        let inc = parseFloat(incrementalInput.value) || 0;
        let duty = parseFloat(dutyInput.value) || 0;
        let exRate = parseFloat(exchangeInput.value) || 1;
        let afterTol = inv * (1 + tol / 100);
        let afterInc = afterTol * (1 + inc / 100);
        let afterDuty = afterInc * (1 + duty / 100);
        return Math.max(0, afterDuty * exRate);
    }

    // Show dropdown with filtered items
    function showDropdown() {
        const searchTerm = commodityInput.value;
        const lowerFilter = searchTerm.toLowerCase();
        currentFilteredItems = cargoRates.filter(item => 
            lowerFilter === "" || item.en.toLowerCase().includes(lowerFilter) || item.ne.toLowerCase().includes(lowerFilter)
        );
        
        commodityDropdown.innerHTML = "";
        if (currentFilteredItems.length === 0) {
            const div = document.createElement('div');
            div.className = "datalist-option";
            div.textContent = "No matching commodity";
            commodityDropdown.appendChild(div);
        } else {
            currentFilteredItems.forEach((item, idx) => {
                const div = document.createElement('div');
                div.className = "datalist-option";
                div.setAttribute('data-index', idx);
                div.innerHTML = `<strong>${item.en}</strong><br><span style="font-size:11px;">${item.ne}</span>`;
                div.onclick = () => {
                    selectCommodity(item);
                };
                commodityDropdown.appendChild(div);
            });
        }
        currentHighlightIndex = -1;
        commodityDropdown.style.display = 'block';
    }

    function selectCommodity(item) {
        selectedCargo = item;
        commodityInput.value = `${item.en} | ${item.ne}`;
        commodityDropdown.style.display = 'none';
        calculatePremium();
    }

    function updateHighlight() {
        const items = commodityDropdown.querySelectorAll('.datalist-option');
        items.forEach((item, i) => {
            if (i === currentHighlightIndex && currentFilteredItems.length > 0) {
                item.classList.add('active');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Event listeners for dropdown
    commodityInput.addEventListener('click', (e) => {
        e.stopPropagation();
        showDropdown();
    });
    
    commodityInput.addEventListener('focus', () => {
        showDropdown();
    });
    
    commodityInput.addEventListener('input', () => {
        showDropdown();
    });
    
    commodityInput.addEventListener('keydown', (e) => {
        const items = commodityDropdown.querySelectorAll('.datalist-option');
        if (items.length === 0 || currentFilteredItems.length === 0) {
            if (e.key === 'Enter' && commodityInput.value.trim() !== "") {
                // If user types and presses Enter, try to find matching cargo
                const match = cargoRates.find(item => 
                    item.en.toLowerCase() === commodityInput.value.toLowerCase() ||
                    item.en.toLowerCase().includes(commodityInput.value.toLowerCase())
                );
                if (match) selectCommodity(match);
            }
            return;
        }
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentHighlightIndex = (currentHighlightIndex + 1) % items.length;
            updateHighlight();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentHighlightIndex = (currentHighlightIndex - 1 + items.length) % items.length;
            updateHighlight();
        } else if (e.key === 'Enter' && currentHighlightIndex >= 0 && currentFilteredItems[currentHighlightIndex]) {
            e.preventDefault();
            selectCommodity(currentFilteredItems[currentHighlightIndex]);
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!commodityInput.contains(e.target) && !commodityDropdown.contains(e.target)) {
            commodityDropdown.style.display = 'none';
        }
    });

    // Main calculation
    function calculatePremium() {
        if (!selectedCargo) {
            premiumBreakdownBody.innerHTML = '<tr><td colspan="3">Please select a commodity</td></tr>';
            /*totalPayableDiv.innerText = 'Total Payable: NRs 0.00';*/
            return;
        }

        const risk = getSelectedRisk();
        const baseRateOriginal = selectedCargo.rates[risk];
        let effectiveBaseRate = baseRateOriginal;
        
        const containerDiscSelected = containerDiscountCheck.checked && transitMode.value === 'sea';
        let containerDiscRate = 0;
        if (containerDiscSelected) {
            containerDiscRate = effectiveBaseRate * 0.10;
            effectiveBaseRate = effectiveBaseRate * 0.90;
        }

        const insurableValue = computeInsurableValue();
        const transitDiscPercent = getTransitDiscountPercent();
        const transitDiscRate = effectiveBaseRate * (transitDiscPercent / 100);
        const rateAfterTransit = effectiveBaseRate - transitDiscRate;
        
        const grossPremium = insurableValue * (rateAfterTransit / 100);
        
        const srccEnabled = srccCheckbox.checked;
        let srccRate = 0;
        let srccAmount = 0;
        if (srccEnabled) {
            srccRate = getSrccRate();
            srccAmount = insurableValue * (srccRate / 100);
        }
        
        let subtotal = grossPremium + srccAmount;
        const directDiscEnabled = directDiscountCheck.checked;
        let directDiscAmount = 0;
        if (directDiscEnabled) {
            directDiscAmount = subtotal * 0.025;
        }
        
        const totalPremium = subtotal - directDiscAmount;
        const vat = totalPremium * 0.13;
        const serviceFee = 20;
        const finalTotal = totalPremium + vat + serviceFee;
        
        // Build table
        let rows = '';
        rows += `<tr><td>Base Rate (${risk === 'A' ? 'All Risk A' : risk === 'B' ? 'Basic Risk B' : 'Minimum Risk C'})</td><td>${baseRateOriginal.toFixed(4)}%</td><td>-</td></tr>`;
        
        if (containerDiscSelected) {
            rows += `<tr><td>Container Discount (10%)</td><td>-${containerDiscRate.toFixed(4)}%</td><td>-</td></tr>`;
        }
        
        if (transitDiscPercent > 0) {
            rows += `<tr><td>Transit Discount (${transitDiscPercent}%)</td><td>-${transitDiscRate.toFixed(4)}%</td><td>-</td></tr>`;
        }
        
        rows += `<tr style="background:#f0f0f0;"><td><strong>Effective Rate after Discounts</strong></td><td><strong>${rateAfterTransit.toFixed(4)}%</strong></td><td>-</td></tr>`;
        
        if (srccEnabled) {
            rows += `<tr><td>SRCC (${srccRate.toFixed(2)}%)</td><td>${srccRate.toFixed(4)}%</td><tr>`;
        }
        
        const totalRate = rateAfterTransit + (srccEnabled ? srccRate : 0);
        rows += `<tr style="background:#f9f9f9; font-weight:bold;"><td>SUBTOTAL</td><td>${totalRate.toFixed(4)}%</td><td> NRs ${subtotal.toFixed(2)}</td></tr>`;
        
        if (directDiscEnabled) {
            rows += `<tr><td>Direct Discount</td><td>-2.5000%</td><td>- NRs ${directDiscAmount.toFixed(2)}</td></tr>`;
        }
        
        rows += `<tr style="background:#f0f0f0;"><td><strong>Total Premium</strong></td><td>-</td><td><strong>NRs ${totalPremium.toFixed(2)}</strong></td></tr>`;
        rows += `<tr><td>VAT (13%)</td><td>13.0000%</td><td>NRs ${vat.toFixed(2)}</td></tr>`;
        rows += `<tr><td>Stamp Duty</td><td>-</td><td>NRs 20.00</td></tr>`;
        rows += `<tr class="total-row"><td><strong>FINAL PAYABLE</strong></td><td>-</td><td><strong>NRs ${finalTotal.toFixed(2)}</strong></td></tr>`;
        rows += `<tr><td colspan="3" style="background:#eef2fa; font-size:12px;">Total Sum Insured in NRs ${insurableValue.toFixed(2)}</td></tr>`;
        
        premiumBreakdownBody.innerHTML = rows;
        /*totalPayableDiv.innerText = `Total Payable: NRs ${finalTotal.toFixed(2)}`;*/
    }

    // Event listeners
    riskRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateRiskUI();
            updateSRCCAuto();
        });
    });
    
    riskOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const radio = opt.querySelector('input');
            if (radio) radio.checked = true;
            updateRiskUI();
            updateSRCCAuto();
        });
    });
    
    srccCheckbox.addEventListener('change', calculatePremium);
    directDiscountCheck.addEventListener('change', calculatePremium);
    transitMode.addEventListener('change', updateTransitUI);
    railType.addEventListener('change', calculatePremium);
    containerDiscountCheck.addEventListener('change', calculatePremium);
    invoiceInput.addEventListener('input', calculatePremium);
    toleranceInput.addEventListener('input', calculatePremium);
    incrementalInput.addEventListener('input', calculatePremium);
    dutyInput.addEventListener('input', calculatePremium);
    exchangeInput.addEventListener('input', calculatePremium);
    recalcBtn.addEventListener('click', calculatePremium);

    // Initialize
    updateRiskUI();
    updateSRCCAuto();
    updateTransitUI();
    containerDiscountCheck.checked = true;
    
    // Set default cargo
    if (cargoRates.length > 0) {
        selectedCargo = cargoRates[0];
        commodityInput.value = `${cargoRates[0].en} | ${cargoRates[0].ne}`;
        calculatePremium();
    }