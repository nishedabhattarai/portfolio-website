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
        function toggleFieldsBasedOnValue() {
            const vehicleValue = parseFloat(document.getElementById('vehicleValue').value) || 0;
            const optionalFieldsGroup = document.getElementById('optionalFieldsGroup');
            const calculationTypeGroup = document.getElementById('calculationTypeGroup');
            const directDiscountOption = document.getElementById('directDiscountOption');
            const towingChargeOption = document.getElementById('towingChargeOption');
            const ownGoodsOption = document.getElementById('ownGoodsOption');
            const vehicleType = document.getElementById('vehicleType').value;
    	    const isGovernment = document.querySelector('input[name="govType"]:checked').value === 'government';
            
            if (vehicleValue > 0) {
                optionalFieldsGroup.style.display = 'flex';
                calculationTypeGroup.style.display = 'flex';
                directDiscountOption.style.display = isGovernment ? 'none' : 'flex';
                towingChargeOption.style.display = vehicleType === 'motorcycle' ? 'none' : 'flex';
		disabledFriendlyOption.style.display = vehicleType === 'motorcycle' ? 'flex' : 'none';
                ownGoodsOption.style.display = (isGovernment || vehicleType === 'motorcycle' || vehicleType === 'private' || vehicleType === 'electric' || vehicleType === 'taxi') ? 'none' : 'flex';
            } else {
                optionalFieldsGroup.style.display = 'none';
                calculationTypeGroup.style.display = 'none';
                directDiscountOption.style.display = 'none';
		disabledFriendlyOption.style.display = 'none';
                towingChargeOption.style.display = 'none';
                ownGoodsOption.style.display = 'none';
            }
        }

        function toggleVehicleFields() {
            const vehicleType = document.getElementById('vehicleType').value;
            const ccGroup = document.getElementById('ccGroup');
            const hpWattGroup = document.getElementById('hpWattGroup');
            const electricTypeGroup = document.getElementById('electricTypeGroup');
            const seatCapacityGroup = document.getElementById('seatCapacityGroup');
            const helperGroup = document.getElementById('helperGroup');
            const tonCapacityGroup = document.getElementById('tonCapacityGroup');
            const trailerGroup = document.getElementById('trailerGroup');
	        const trailerValueGroup = document.getElementById('trailerValueGroup');
	        const disabledFriendlyOption = document.getElementById('disabledFriendlyOption');
	        const towingChargeOption = document.getElementById('towingChargeOption');
	        const ownGoodsOption = document.getElementById('ownGoodsOption');
            const govTypeGroup = document.getElementById('govTypeGroup');

            // Link to the selected vehicle type page
     	    const selectedOption = document.querySelector(`#vehicleType option[value="${vehicleType}"]`);
       	    if (selectedOption && selectedOption.dataset.link) {
           	console.log(`Navigating to: ${selectedOption.dataset.link}`);
   	    }
    
            // Reset all optional fields
            ccGroup.style.display = 'block';
            hpWattGroup.style.display = 'none';
            electricTypeGroup.style.display = 'none';
            seatCapacityGroup.style.display = 'block';
            helperGroup.style.display = 'none';
            tonCapacityGroup.style.display = 'none';
            trailerGroup.style.display = 'none';
            trailerValueGroup.style.display = 'none';
            disabledFriendlyOption.style.display = 'none';
            towingChargeOption.style.display = 'none';
            ownGoodsOption.style.display = 'none';
    
            // Set required fields based on vehicle type
    	    document.getElementById('cubicCapacity').required = false;
    	    document.getElementById('hpWattValue').required = false;

	    // Handle seat capacity requirements
	    if (vehicleType === 'motorcycle' || vehicleType === 'tractor') {
            	seatCapacityGroup.style.display = 'none';
            	document.getElementById('seatCapacity').required = false;
       	    } else {
           	seatCapacityGroup.style.display = 'block';
            	document.getElementById('seatCapacity').required = true;
            }
            
	    // Handle ton capacity requirements
	    if (vehicleType === 'motorcycle' || vehicleType === 'private' || vehicleType === 'electric' || vehicleType === 'passenger' || vehicleType === 'tractor' || vehicleType === 'tempo' || vehicleType === 'taxi') {
            	tonCapacityGroup.style.display = 'none';
            	document.getElementById('tonCapacity').required = false;
       	    } else {
           	tonCapacityGroup.style.display = 'block';
            	document.getElementById('tonCapacity').required = true;
            }

            // Update Voluntary Excess options for Motorcycle
            if (vehicleType === 'motorcycle') {
                document.getElementById('voluntaryExcess').innerHTML = `
                    <option value="0">0 (0%)</option>
                    <option value="500">500 (10%)</option>
                    <option value="1000">1000 (15%)</option>
                    <option value="2000">2000 (20%)</option>
                `;
            } else {
                document.getElementById('voluntaryExcess').innerHTML = `
                    <option value="0">0 (0%)</option>
                    <option value="1000">1000 (10%)</option>
                    <option value="2000">2000 (15%)</option>
                    <option value="5000">5000 (20%)</option>
                    <option value="10000">10000 (25%)</option>
                `;
            }
            
            // Update No Claim Discount options based on vehicle type
            updateNoClaimDiscountOptions(vehicleType);
            
            if (vehicleType === 'electric') {
                ccGroup.style.display = 'none';
                hpWattGroup.style.display = 'block';
                document.getElementById('hpWattValue').required = true;
                towingChargeOption.style.display = parseFloat(document.getElementById('vehicleValue').value) > 0 ? 'flex' : 'none';
            } 
            else if (vehicleType === 'motorcycle') {
                electricTypeGroup.style.display = 'block';
                disabledFriendlyOption.style.display = parseFloat(document.getElementById('vehicleValue').value) > 0 ? 'flex' : 'none';
            }
            else if (vehicleType === 'tempo') {
                electricTypeGroup.style.display = 'block';
                towingChargeOption.style.display = parseFloat(document.getElementById('vehicleValue').value) > 0 ? 'flex' : 'none';
            }
            else if (vehicleType === 'tractor') {
                ccGroup.style.display = 'none';
                hpWattGroup.style.display = 'block';
                document.getElementById('hpWattValue').required = true;
                trailerGroup.style.display = 'block';
                towingChargeOption.style.display = parseFloat(document.getElementById('vehicleValue').value) > 0 ? 'flex' : 'none';
            }
            else if (vehicleType === 'passenger') {
                ccGroup.style.display = 'none';
                helperGroup.style.display = 'block';
                towingChargeOption.style.display = parseFloat(document.getElementById('vehicleValue').value) > 0 ? 'flex' : 'none';
                ownGoodsOption.style.display = parseFloat(document.getElementById('vehicleValue').value) > 0 ? 'flex' : 'none';
            }
            else if (vehicleType === 'tanker' || vehicleType === 'agriculture' || 
                     vehicleType === 'goods' || vehicleType === 'construction') {
                ccGroup.style.display = 'none';
                tonCapacityGroup.style.display = 'block';
                towingChargeOption.style.display = parseFloat(document.getElementById('vehicleValue').value) > 0 ? 'flex' : 'none';
                ownGoodsOption.style.display = parseFloat(document.getElementById('vehicleValue').value) > 0 ? 'flex' : 'none';
            }
            else {
                towingChargeOption.style.display = parseFloat(document.getElementById('vehicleValue').value) > 0 ? 'flex' : 'none';
            }
        }

        function toggleElectricFields() {
            const isElectricType = document.getElementById('electricType').value === 'yes';
            const ccGroup = document.getElementById('ccGroup');
            const hpWattGroup = document.getElementById('hpWattGroup');
            
            if (isElectricType) {
                ccGroup.style.display = 'none';
                hpWattGroup.style.display = 'block';
                document.getElementById('cubicCapacity').required = false;
                document.getElementById('hpWattValue').required = true;
            } else {
                ccGroup.style.display = 'block';
                hpWattGroup.style.display = 'none';
                document.getElementById('cubicCapacity').required = true;
                document.getElementById('hpWattValue').required = false;
            }
        }

        function toggleTrailerValue() {
            const hasTrailer = document.getElementById('hasTrailer').value;
            const trailerValueGroup = document.getElementById('trailerValueGroup');
            
            if (hasTrailer === 'yes') {
                trailerValueGroup.style.display = 'block';
            } else {
                trailerValueGroup.style.display = 'none';
            }
        }

        function updateNoClaimDiscountOptions(vehicleType) {
            const noClaimDiscount = document.getElementById('noClaimDiscount');
            
            // Clear existing options
            noClaimDiscount.innerHTML = '';
            
            if (vehicleType === 'private' || vehicleType === 'electric') {
                // Private vehicle NCD options
                noClaimDiscount.innerHTML = `
                    <option value="0">0 (0%)</option>
                    <option value="1">1 (20%)</option>
                    <option value="2">2 (30%)</option>
                    <option value="3">3 (40%)</option>
                    <option value="4">4 (45%)</option>
                    <option value="5">5 (50%)</option>
                `;
            } else if (vehicleType === 'motorcycle') {
                // Motorcycle NCD options
                noClaimDiscount.innerHTML = `
                    <option value="0">0 (0%)</option>
                    <option value="1">1 (15%)</option>
                    <option value="2">2 (25%)</option>
                    <option value="3">3 (35%)</option>
                `;
            } else {
                // Other vehicles NCD options
                noClaimDiscount.innerHTML = `
                    <option value="0">0 (0%)</option>
                    <option value="1">1 (15%)</option>
                    <option value="2">2 (25%)</option>
                    <option value="3">3 (30%)</option>
                `;
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Get form elements
            const calculationType = document.getElementById('calculationType');
            const durationField = document.getElementById('durationField');
            const shortPeriodSelect = document.getElementById('shortPeriod');
            const proRateDaysInput = document.getElementById('proRateDays');
            const durationLabel = document.getElementById('durationLabel');
            const calculateBtn = document.getElementById('calculateBtn');
            const resultsPlaceholder = document.querySelector('.results-placeholder');
            const resultsDetails = document.querySelector('.results-details');
            const cubicCapacityInput = document.getElementById('cubicCapacity');
            const cubicCapacityError = document.getElementById('cubicCapacityError');
            const hpWattValueInput = document.getElementById('hpWattValue');
            const hpWattValueError = document.getElementById('hpWattValueError');
            const seatCapacityInput = document.getElementById('seatCapacity');
            const seatCapacityError = document.getElementById('seatCapacityError');
            const tonCapacityInput = document.getElementById('tonCapacity');
            const tonCapacityError = document.getElementById('tonCapacityError');
            const manufacturingYearInput = document.getElementById('manufacturingYear');
            const manufacturingYearError = document.getElementById('manufacturingYearError');
            const vehicleValueInput = document.getElementById('vehicleValue');
            const vehicleValueError = document.getElementById('vehicleValueError');
            const durationError = document.getElementById('durationError');
            const helperInput = document.getElementById('helper');
            const printBtn = document.getElementById('printBtn');
            const printModal = document.getElementById('printModal');
            const closeModal = document.querySelector('.close-modal');
            const confirmPrintBtn = document.getElementById('confirmPrint');

            // Open print modal
            printBtn.addEventListener('click', function() {
                printModal.style.display = 'block';
            });
    
            // Close modal when clicking X
            closeModal.addEventListener('click', function() {
                printModal.style.display = 'none';
            });
    
            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === printModal) {
                    printModal.style.display = 'none';
                }
            });
    
            // Generate print preview
            confirmPrintBtn.addEventListener('click', function() {
                const insuredName = document.getElementById('insuredName').value;
                const vehicleDetails = document.getElementById('vehicleDetails').value;
                
                // Prepare print template
                document.getElementById('printInsuredName').textContent = insuredName;
                document.getElementById('printVehicleDetails').textContent = vehicleDetails;
                document.getElementById('printDate').textContent = new Date().toLocaleDateString();
        
                // Clone the results to the print template
                const resultsContent = document.querySelector('.results-details').cloneNode(true);
                document.getElementById('printResultsContent').innerHTML = '';
                document.getElementById('printResultsContent').appendChild(resultsContent);
        
                // Show print dialog
                printModal.style.display = 'none';
                document.getElementById('printTemplate').style.display = 'block';
                window.print();
                document.getElementById('printTemplate').style.display = 'none';
        
                // Clear inputs
                document.getElementById('insuredName').value = '';
                document.getElementById('vehicleDetails').value = '';
            });

            // Set current year as max for manufacturing year
            const currentYear = new Date().getFullYear();
            manufacturingYearInput.max = currentYear;

	        // Add govType change listener
	        document.querySelectorAll('input[name="govType"]').forEach(radio => {
		    radio.addEventListener('change', function() {
		        toggleFieldsBasedOnValue();
		    });
	        })

            // Limit helper input to max 3
            helperInput.addEventListener('input', function() {
                if (parseInt(this.value) > 3) {
                    this.value = 3;
                }
            });

            // Show/hide duration fields based on calculation type
            calculationType.addEventListener('change', function() {
                if (this.value === 'shortPeriod') {
                    durationField.style.display = 'block';
                    shortPeriodSelect.style.display = 'block';
                    proRateDaysInput.style.display = 'none';
                    durationLabel.textContent = 'Short Period';
                } else if (this.value === 'proRate') {
                    durationField.style.display = 'block';
                    shortPeriodSelect.style.display = 'none';
                    proRateDaysInput.style.display = 'block';
                    durationLabel.textContent = 'Number of Days';
                } else {
                    durationField.style.display = 'none';
                }
            });

            // Validate cubic capacity or HP/Watt value on input
            cubicCapacityInput.addEventListener('input', function() {
                if (!this.value && document.getElementById('vehicleType').value !== 'electric') {
                    cubicCapacityError.style.display = 'block';
                } else {
                    cubicCapacityError.style.display = 'none';
                }
            });

            hpWattValueInput.addEventListener('input', function() {
                if (!this.value && (document.getElementById('vehicleType').value === 'electric' || 
                    (document.getElementById('electricType')?.value === 'yes' && 
                     (document.getElementById('vehicleType').value === 'motorcycle' || 
                      document.getElementById('vehicleType').value === 'tempo')) ||
                    document.getElementById('vehicleType').value === 'tractor')) {
                    hpWattValueError.style.display = 'block';
                } else {
                    hpWattValueError.style.display = 'none';
                }
            });

	    // Event Litener for seat capacity validation	
	    seatCapacityInput.addEventListener('input', function() {
	    const vehicleType = document.getElementById('vehicleType').value;
	        if (!this.value && vehicleType !== 'motorcycle' && vehicleType !== 'tractor') {
	           seatCapacityError.style.display = 'block';
	    	} else {
    		   seatCapacityError.style.display = 'none';
	    	}
	    });	    
 
	    // Event Litener for ton capacity validation	
	    tonCapacityInput.addEventListener('input', function() {
	    const vehicleType = document.getElementById('vehicleType').value;
	        if (!this.value && vehicleType !== 'motorcycle' && vehicleType !== 'private' && vehicleType !== 'electric' && vehicleType !== 'passenger' && vehicleType !== 'tractor' && vehicleType !== 'tempo' && vehicleType !== 'taxi') {
	           tonCapacityError.style.display = 'block';
	    	} else {
    		   tonCapacityError.style.display = 'none';
	    	}
	    });	    

            // Validate manufacturing year if vehicle value > 0
            vehicleValueInput.addEventListener('input', function() {
                if (parseFloat(this.value) > 0 && !manufacturingYearInput.value) {
                    manufacturingYearError.textContent = 'Manufacturing year is required';
                    manufacturingYearError.style.display = 'block';
                } else {
                    manufacturingYearError.style.display = 'none';
                }
                toggleFieldsBasedOnValue();
            });

            manufacturingYearInput.addEventListener('input', function() {
                if (this.value && parseInt(this.value) > currentYear) {
                    this.value = currentYear;
                }
                if (parseFloat(vehicleValueInput.value) > 0 && !this.value) {
                    manufacturingYearError.textContent = 'Manufacturing year is required';
                    manufacturingYearError.style.display = 'block';
                } else {
                    manufacturingYearError.style.display = 'none';
                }
            });

	        // Set default checkboxes based on vehicle value
		    document.getElementById('directDiscount').checked = true;
        	    document.getElementById('rsmdst').checked = true;
        	    document.getElementById('towingCharge').checked = true;

	        // Add Enter key functionality for the form
       		document.getElementById('premiumForm').addEventListener('keypress', function(e) {
        	if (e.key === 'Enter') {
            	    e.preventDefault();
                    document.getElementById('calculateBtn').click();
            	}
            });

            // Calculate premium when button is clicked
            calculateBtn.addEventListener('click', function() {
                // Validate required fields
                let isValid = true;
                
                const vehicleType = document.getElementById('vehicleType').value;
                const isElectricType = document.getElementById('electricType')?.value === 'yes';
                const seatCapacity = parseFloat(document.getElementById('seatCapacity').value) || 0;
                const tonCapacity = parseFloat(document.getElementById('tonCapacity').value) || 0;
                
                if (vehicleType !== 'motorcycle' && vehicleType !== 'tractor' && seatCapacity <= 0) {
                    seatCapacityError.textContent = 'Seat capacity is required';
                    seatCapacityError.style.display = 'block';
                    return; // Stop calculation if validation fails
                    }
                
	        // Validate seat capacity for required vehicle types
            	if (vehicleType !== 'motorcycle' && vehicleType !== 'tractor' && !seatCapacityInput.value) {
              	    seatCapacityError.style.display = 'block';
            	    isValid = false;
          	} else {
                    seatCapacityError.style.display = 'none';
            	}

	        // Validate ton capacity for required vehicle types
            	if (vehicleType !== 'goods' && vehicleType !== 'tanker' && vehicleType !== 'construction' && vehicleType !== 'agriculture' && !tonCapacityInput.value) {
              	    tonCapacityError.style.display = 'none';
            	    isValid = true;
          	} else {
                    tonCapacityError.style.display = 'block';
            	}

                if (vehicleType === 'electric') {
                    if (!hpWattValueInput.value) {
                        hpWattValueError.style.display = 'block';
                        isValid = false;
                    }
                } 
                else if (vehicleType === 'motorcycle' || vehicleType === 'tempo') {
                    if (isElectricType && !hpWattValueInput.value) {
                        hpWattValueError.style.display = 'block';
                        isValid = false;
                    }
                    if (!isElectricType && !cubicCapacityInput.value) {
                        cubicCapacityError.style.display = 'block';
                        isValid = false;
                    }
                }
                else if (vehicleType === 'tractor') {
                    if (!hpWattValueInput.value) {
                        hpWattValueError.style.display = 'block';
                        isValid = false;
                    }
                }
                else if (vehicleType === 'private' || vehicleType === 'taxi') {
                    if (!cubicCapacityInput.value) {
                        cubicCapacityError.style.display = 'block';
                        isValid = false;
                    }
                }
                
                const vehicleValue = parseFloat(vehicleValueInput.value) || 0;
                if (vehicleValue > 0 && !manufacturingYearInput.value) {
                    manufacturingYearError.textContent = 'Manufacturing year is required';
                    manufacturingYearError.style.display = 'block';
                    isValid = false;
                }
                
                if (calculationType.value === 'proRate' && (!proRateDaysInput.value || parseInt(proRateDaysInput.value) < 1 || parseInt(proRateDaysInput.value) > 365)) {
                    durationError.textContent = 'Please enter valid days (1-365)';
                    durationError.style.display = 'block';
                    isValid = false;
                } else {
                    durationError.style.display = 'none';
                }
                
                if (!isValid) return;
                
                calculatePremium();
            });

            function calculatePremium() {
                // Get all form values
                const vehicleType = document.getElementById('vehicleType').value;
                const voluntaryExcess = parseInt(document.getElementById('voluntaryExcess').value);
                const noClaimDiscount = parseInt(document.getElementById('noClaimDiscount').value);
                const vehicleValue = parseFloat(document.getElementById('vehicleValue').value) || 0;
                const cubicCapacity = parseFloat(document.getElementById('cubicCapacity').value) || 0;
                const hpWattValue = parseFloat(document.getElementById('hpWattValue').value) || 0;
                const isElectricType = document.getElementById('electricType')?.value === 'yes';
                const manufacturingYear = parseInt(document.getElementById('manufacturingYear').value) || currentYear;
                const isGovernment = document.querySelector('input[name="govType"]:checked').value === 'government';
                const hasDirectDiscount = document.getElementById('directDiscount').checked;
                const hasRSMDST = document.getElementById('rsmdst').checked;
                const isDisabledFriendly = document.getElementById('disabledFriendly')?.checked || false;
                const hasTowingCharge = document.getElementById('towingCharge')?.checked || false;
                const hasOwnGoods = document.getElementById('ownGoods')?.checked || false;
                const hasTrailer = document.getElementById('hasTrailer')?.value === 'yes';
                const trailerValue = parseFloat(document.getElementById('trailerValue')?.value) || 0;
                const seatCapacity = parseFloat(document.getElementById('seatCapacity')?.value) || 0;
                const helper = parseFloat(document.getElementById('helper')?.value) || 0;
                const tonCapacity = parseFloat(document.getElementById('tonCapacity')?.value) || 0;
                const calcType = document.getElementById('calculationType').value;
                const shortPeriod = calcType === 'shortPeriod' ? document.getElementById('shortPeriod').value : null;
                const proRateDays = calcType === 'proRate' ? parseInt(document.getElementById('proRateDays').value) || 0 : 0;
                const vehicleAge = currentYear - manufacturingYear;

                // Calculate short period factor
                let shortPeriodFactor = 1; // Default to 100% for annual
                if (calcType === 'shortPeriod') {
                    switch(shortPeriod) {
                        case '1week': shortPeriodFactor = 0.10; break;
                        case '1month': shortPeriodFactor = 0.20; break;
                        case '2months': shortPeriodFactor = 0.30; break;
                        case '3months': shortPeriodFactor = 0.40; break;
                        case '4months': shortPeriodFactor = 0.50; break;
                        case '5months': shortPeriodFactor = 0.60; break;
                        case '6months': shortPeriodFactor = 0.70; break;
                        case '7months': shortPeriodFactor = 0.80; break;
                        case '8months': shortPeriodFactor = 1.00; break;
                    }
                } else if (calcType === 'proRate' && proRateDays > 0) {
                    shortPeriodFactor = proRateDays / 365;
                }

                // Step 1: Normal Premium
                let normalPremium = 0;
		        let additionalPremium = 0;
                let tariffDiscount = 0;
                
                if (vehicleType === 'private') {
                    // Private vehicle premium calculation
                    if (isGovernment && vehicleValue > 0) {
                        // Government private vehicle
                        if (cubicCapacity < 1000) {
                            if (vehicleValue <= 2000000) {
                                normalPremium = vehicleValue * 0.0044;
                            } else {
                                normalPremium = 2000000 * 0.0044; 
				                additionalPremium = (vehicleValue - 2000000) * 0.0062;
                            }
                            tariffDiscount = 1000;
                        } else if (cubicCapacity <= 1600) {
                            if (vehicleValue <= 2000000) {
                                normalPremium = vehicleValue * 0.0048;
                            } else {
                                normalPremium = 2000000 * 0.0048;
				                additionalPremium = (vehicleValue - 2000000) * 0.0062;
                            }
                            tariffDiscount = 1500;
                        } else {
                            if (vehicleValue <= 2000000) {
                                normalPremium = vehicleValue * 0.0051;
                            } else {
                                normalPremium = 2000000 * 0.0051; 
				                additionalPremium = (vehicleValue - 2000000) * 0.0062;
                            }
                            tariffDiscount = 2750;
                        }
                    } else {
                        // Non-government private vehicle
                        if (cubicCapacity < 1000 && vehicleValue > 0) {
                            if (vehicleValue <= 2000000) {
                                normalPremium = vehicleValue * 0.0084;
                            } else {
                                normalPremium = 2000000 * 0.0084;
				                additionalPremium = (vehicleValue - 2000000) * 0.0112;
                            }
                            tariffDiscount = 3000;
                        } else if (cubicCapacity <= 1600 && vehicleValue > 0) {
                            if (vehicleValue <= 2000000) {
                                normalPremium = vehicleValue * 0.0087;
                            } else {
                                normalPremium = 2000000 * 0.0087;
				                additionalPremium = (vehicleValue - 2000000) * 0.0112;
                            }
                            tariffDiscount = 4000;
                        } else if (cubicCapacity > 1600 && vehicleValue > 0) {
                            if (vehicleValue <= 2000000) {
                                normalPremium = vehicleValue * 0.0090;
                            } else {
                                normalPremium = 2000000 * 0.0090;
				                additionalPremium = (vehicleValue - 2000000) * 0.0112;
                            }
                            tariffDiscount = 6000;
                        }
                    }
                } else if (vehicleType === 'electric') {
                    // Electric vehicle premium calculation
                    if (vehicleValue > 0) {
                        if (hpWattValue <= 20) {
                            if (vehicleValue <= 2000000) {
                                normalPremium = vehicleValue * 0.0063;
                            } else {
                                normalPremium = 2000000 * 0.0063; 
				                additionalPremium = (vehicleValue - 2000000) * 0.0084;
                            }
                            tariffDiscount = 3000;
                        } else if (hpWattValue > 20) {
                            if (vehicleValue <= 2000000) {
                                normalPremium = vehicleValue * 0.0065;
                            } else {
                                normalPremium = 2000000 * 0.0065; 
				                additionalPremium = (vehicleValue - 2000000) * 0.0084;
                            }
                            tariffDiscount = 4000;
                        }
                    }
                } else if (vehicleType === 'passenger') {
                    // Passenger vehicle premium calculation
                    if (isGovernment && vehicleValue > 0) {
                        // Government passenger vehicle
                        normalPremium = vehicleValue * 0.0075;
                        tariffDiscount = 2000;
                    } else {
                        // Non-government passenger vehicle
                        if (vehicleValue > 0) {
                            if (seatCapacity <=18) {
                                normalPremium = vehicleValue * 0.0125;
                                tariffDiscount = 2000;
                            } else {
                                normalPremium = vehicleValue * 0.0125;
                                tariffDiscount = 2500;
                            }
                        }
                    }
                } else if (vehicleType === 'taxi') {
                    // Taxi premium calculation
                    if (vehicleValue > 0) {
                        if (cubicCapacity < 1000) {
                            normalPremium = vehicleValue * 0.02;
                            additionalPremium = 1000;
                        } else if (cubicCapacity <= 1600) {
                            normalPremium = vehicleValue * 0.02;
				            additionalPremium = 1000;
                        } else if (cubicCapacity > 1600) {
                            normalPremium = vehicleValue * 0.02;
                            additionalPremium = 500
                        } 
                    }
                } else if (vehicleType === 'goods') {
                    // Goods Loading Vehicle premium calculation for government
                    if (isGovernment && vehicleValue > 0) {
                        if (tonCapacity <= 3) {
                            normalPremium = vehicleValue * 0.0075;
                            tariffDiscount = 1500;
                        } else {
                            normalPremium = vehicleValue * 0.0075;
                            tariffDiscount = 3000;
                            additionalPremium = (tonCapacity - 3) * 500;
                        }
                    } else {
                        // Goods loading vehicle premium calculation for Non-Government
                        if (vehicleValue > 0) {
                            if (tonCapacity <= 3) {
                                normalPremium = vehicleValue * 0.0125;
                                tariffDiscount = 1500;
                            } else {
                                normalPremium = vehicleValue * 0.0125;
                                tariffDiscount = 3000;
                                additionalPremium = (tonCapacity - 3) * 500;
                            }
                        }
                    }
                } else if (vehicleType === 'tanker') {
                    // Tanker premium calculation for government
                    if (isGovernment && vehicleValue > 0) {
                        if (tonCapacity <= 3) {
                            normalPremium = vehicleValue * 0.0075;
                            tariffDiscount = 3000;
                        } else {
                            normalPremium = vehicleValue * 0.0075;
                            tariffDiscount = 2500;
                            additionalPremium = (tonCapacity - 3) * 500;
                        }
                    } else {
                        // Tanker premium calculation for Non-Government
                        if (vehicleValue > 0) {
                            if (tonCapacity <= 3) {
                                normalPremium = vehicleValue * 0.0125;
                                tariffDiscount = 3000;
                            } else {
                                normalPremium = vehicleValue * 0.0125;
                                tariffDiscount = 2500;
                                additionalPremium = (tonCapacity - 3) * 500;
                            }
                        }
                    }
                } else if (vehicleType === 'construction') {
                    // construction vehicle premium calculation for government
                    if (isGovernment && vehicleValue > 0) {
                        if (tonCapacity <= 0) {
                            normalPremium = vehicleValue * 0.0125;
                            tariffDiscount = 4000;
                        } else if (tonCapacity <= 3) {
                            normalPremium = vehicleValue * 0.0075;
                            tariffDiscount = 1500;
                        } else {
                            normalPremium = vehicleValue * 0.0075;
                            tariffDiscount = 3000;
                            additionalPremium = (tonCapacity - 3) * 500;
                        }
                    } else {
                        // construction vehicle premium calculation for Non-Government
                        if (vehicleValue > 0) {
                            if (tonCapacity <= 0) {
                                normalPremium = vehicleValue * 0.0125;
                                tariffDiscount = 4000;
                            } else if (tonCapacity <= 3) {
                                normalPremium = vehicleValue * 0.0125;
                                tariffDiscount = 1500;
                            } else {
                                normalPremium = vehicleValue * 0.0125;
                                tariffDiscount = 3000;
                                additionalPremium = (tonCapacity - 3) * 500;    
                            }
                        }
                    }
                } else if (vehicleType === 'agriculture') {
                    // Agri Vehicle premium calculation for government
                    if (isGovernment && vehicleValue > 0) {
                        if (tonCapacity <= 3) {
                            normalPremium = vehicleValue * 0.0075;
                            tariffDiscount = 1500;
                        } else {
                            normalPremium = vehicleValue * 0.0075;
                            tariffDiscount = 3000;
                            additionalPremium = (tonCapacity - 3) * 500;
                        }
                    } else {
                        // Agri Vehicle premium calculation for Non-Government
                        if (vehicleValue > 0) {
                            if (tonCapacity <= 3) {
                                normalPremium = vehicleValue * 0.0125;
                                tariffDiscount = 1500;
                            } else {
                                normalPremium = vehicleValue * 0.0125;
                                tariffDiscount = 3000;
                                additionalPremium = (tonCapacity - 3) * 500;
                            }
                        }
                    }
                } else if (vehicleType === 'tempo') {
                    // Tempo premium calculation for government
                    if (isGovernment && vehicleValue > 0) {
                        if (cubicCapacity > 0 || hpWattValue > 0) {
                            normalPremium = vehicleValue * 0.0075;
                        }
                    } else {
                        // Tempo Vehicle premium calculation for Non-Government
                        if (vehicleValue > 0) {
                            if (cubicCapacity > 0 || hpWattValue > 0) {
                                normalPremium = vehicleValue * 0.0125;
                            }
                        }
                    }
                } else if (vehicleType === 'tractor') {
                    // Tractor premium calculation for government
                    if (isGovernment && vehicleValue > 0) {
                        normalPremium = vehicleValue * 0.005;
                    } else {
                        // Tractor premium calculation for Non-Government
                        if (vehicleValue > 0) {
                            normalPremium = vehicleValue * 0.01;
                            }
                        }
                } else {
                    // Other vehicle types
                    const normalPremiumRate = isGovernment ? 0.01 : 0.015;
                    normalPremium = vehicleValue * normalPremiumRate;
                }
                
                // Apply short period factor to normal premium and tariff discount if vehicle value > 0 and not annual
                if (vehicleValue > 0 && calcType !== 'annual') {
                    normalPremium *= shortPeriodFactor;
                }

                if (vehicleValue > 0 && calcType !== 'annual') {
                    tariffDiscount *= shortPeriodFactor;
                }
                
                // Step 2: Trailer Charge
                let trailerCharge = 0;
                if (hasTrailer) {
                    trailerCharge = trailerValue * 0.0125 - 200;
                }                

                // Step 3: Old Vehicle Charge
                let oldVehicleCharge = 0;                
                if (vehicleType === 'motorcycle' || vehicleType === 'agriculture') {
                    if (vehicleAge >= 5 && vehicleAge <= 10) {
                        oldVehicleCharge = (normalPremium + additionalPremium + trailerCharge - tariffDiscount) * 0.15;
                    } else if (vehicleAge > 10) {
                        oldVehicleCharge = (normalPremium + additionalPremium + trailerCharge - tariffDiscount) * 0.25;
                    }
                } 
                else if (vehicleType === 'private' || vehicleType === 'electric' || vehicleType === 'taxi') {
                    if (vehicleAge > 10) {
                        oldVehicleCharge = (normalPremium + additionalPremium + trailerCharge - tariffDiscount) * 0.10;
                    }
                }
                else if (vehicleType === 'passenger' || vehicleType === 'goods' || 
                         vehicleType === 'tanker' || vehicleType === 'tractor' || 
                         vehicleType === 'tempo' || vehicleType === 'construction') {
                    if (vehicleAge >= 5 && vehicleAge <= 10) {
                        oldVehicleCharge = (normalPremium + additionalPremium + trailerCharge - tariffDiscount) * 0.10;
                    } else if (vehicleAge > 10) {
                        oldVehicleCharge = (normalPremium + additionalPremium + trailerCharge - tariffDiscount) * 0.20;
                    }
                }
                
                // Step 4: Voluntary Excess Amount
                let voluntaryExcessRate = 0;
                if (vehicleType === 'motorcycle') {
                    // Motorcycle voluntary excess rates
                    if (voluntaryExcess === 500) voluntaryExcessRate = 0.10;
                    else if (voluntaryExcess === 1000) voluntaryExcessRate = 0.15;
                    else if (voluntaryExcess === 2000) voluntaryExcessRate = 0.20;
                } else {
                    // Other vehicles voluntary excess rates
                    if (voluntaryExcess === 1000) voluntaryExcessRate = 0.10;
                    else if (voluntaryExcess === 2000) voluntaryExcessRate = 0.15;
                    else if (voluntaryExcess === 5000) voluntaryExcessRate = 0.20;
                    else if (voluntaryExcess === 10000) voluntaryExcessRate = 0.25;
                }
                
                const voluntaryExcessAmount = (normalPremium + additionalPremium + oldVehicleCharge + trailerCharge - tariffDiscount) * voluntaryExcessRate;
                
                // Step 5: No Claim Discount Amount
                let noClaimDiscountRate = 0;
                if (vehicleType === 'private' || vehicleType === 'electric') {
                    // Private vehicle NCD rates
                    if (noClaimDiscount === 1) noClaimDiscountRate = 0.20;
                    else if (noClaimDiscount === 2) noClaimDiscountRate = 0.30;
                    else if (noClaimDiscount === 3) noClaimDiscountRate = 0.40;
                    else if (noClaimDiscount === 4) noClaimDiscountRate = 0.45;
                    else if (noClaimDiscount === 5) noClaimDiscountRate = 0.50;
                } else if (vehicleType === 'motorcycle') {
                    // Motorcycle NCD rates
                    if (noClaimDiscount === 1) noClaimDiscountRate = 0.15;
                    else if (noClaimDiscount === 2) noClaimDiscountRate = 0.25;
                    else if (noClaimDiscount === 3) noClaimDiscountRate = 0.35;
                } else {
                    // Other vehicles NCD rates
                    if (noClaimDiscount === 1) noClaimDiscountRate = 0.15;
                    else if (noClaimDiscount === 2) noClaimDiscountRate = 0.25;
                    else if (noClaimDiscount === 3) noClaimDiscountRate = 0.30;
                }
                
                const noClaimDiscountAmount = (normalPremium + additionalPremium + oldVehicleCharge + trailerCharge - tariffDiscount - voluntaryExcessAmount) * noClaimDiscountRate;

                // Step 6: Own Goods Carrying
                let ownGoodsAmount = 0;
                if (vehicleType === 'passenger' || vehicleType === 'goods' || vehicleType === 'tanker' || vehicleType === 'tractor' || vehicleType === 'tempo' || vehicleType === 'construction' || vehicleType === 'agriculture') {
                if (hasOwnGoods && vehicleValue > 0) {
                    ownGoodsAmount = (normalPremium + additionalPremium + oldVehicleCharge + trailerCharge - tariffDiscount - voluntaryExcessAmount - noClaimDiscountAmount) * 0.25;
                    }
                }
                                
                // Step 7: Direct Discount Amount
                let directDiscountAmount = 0;
                if (!isGovernment && vehicleValue > 0 && hasDirectDiscount) {
                    directDiscountAmount = (normalPremium + additionalPremium + oldVehicleCharge + trailerCharge - tariffDiscount - voluntaryExcessAmount - noClaimDiscountAmount - ownGoodsAmount) * 0.025;
                }

                // Calculate discount base for electric type and disabled friendly discounts
                const discountBase = normalPremium + additionalPremium + oldVehicleCharge + trailerCharge - tariffDiscount - voluntaryExcessAmount - ownGoodsAmount - noClaimDiscountAmount - directDiscountAmount;
                
                // Step 8: Electric Type Discount (25%)
                let electricDiscountAmount = 0;
                if ((vehicleType === 'motorcycle') && isElectricType && vehicleValue > 0 && !isDisabledFriendly) {
                    electricDiscountAmount = discountBase * 0.25;
                }
                
                // Step 9: Disabled Friendly Discount (25%)
                let disabledDiscountAmount = 0;
                if (isDisabledFriendly) {
                    disabledDiscountAmount = discountBase * 0.25;
                }
                
                // Step 10: Towing Charge
                let towingChargeAmount = 0;
                if (hasTowingCharge && vehicleValue > 0) {
                    if (vehicleType === 'private' || vehicleType === 'electric') {
			            towingChargeAmount = 200;
		            } else if (vehicleType === 'construction') {
			            towingChargeAmount = 1000;
		            } else if (vehicleType === 'tanker' || vehicleType === 'passenger' || vehicleType === 'goods' || vehicleType === 'tractor' || vehicleType === 'tempo' || vehicleType === 'taxi' || vehicleType === 'agriculture') {
			            towingChargeAmount = 500; 
                    }
                }

                // Apply short period factor to towing charge if vehicle value > 0
                if (vehicleValue > 0) {
                    towingChargeAmount *= shortPeriodFactor;
                }
                
                // Step 11: Basic Premium
                let basicPremium;

                if (vehicleValue >0) {
                    basicPremium = discountBase + towingChargeAmount - electricDiscountAmount - disabledDiscountAmount;
                // Apply minimum premium rules
                if (vehicleType === 'private' || vehicleType === 'electric') {
                    basicPremium = Math.max(basicPremium, 2000.00);
                } else if (vehicleType === 'motorcycle') {
                    basicPremium = Math.max(basicPremium, 1000.00);
                    }
                } else {
                    // for third party only
                    basicPremium = 0;
                }

                // Step 12: Third Party
                let thirdParty = 0;
                if (vehicleType === 'private') {
                    if (isGovernment) {
                        if (cubicCapacity < 1000) {
                            thirdParty = 1000;
                        } else if (cubicCapacity <= 1600) {
                            thirdParty = 1500;
                        } else {
                            thirdParty = 2750;
                        }
                    } else {
                        if (cubicCapacity < 1000) {
                            thirdParty = 3000;
                        } else if (cubicCapacity <= 1600) {
                            thirdParty = 4000;
                        } else {
                            thirdParty = 6000;
                        }
                    }
                } else if (vehicleType === 'electric') {
                    // Electric vehicle third party premium based on HP/Watt value                    
                    if (hpWattValue <= 20) thirdParty = 3000;
                    else if (hpWattValue > 20) thirdParty = 4000;

                } else if (isGovernment && vehicleType === 'motorcycle') {
                    thirdParty = cubicCapacity <= 150 ? 1250 : 1500;

                } else if (vehicleType === 'motorcycle') {
                    if (cubicCapacity < 150) thirdParty = 1500;
                    else if (cubicCapacity <= 250) thirdParty = 1700;
                    else thirdParty = 1900;

                } else if (vehicleType === 'taxi') {
                    if (cubicCapacity < 1000) thirdParty = 3500;
                    else if (cubicCapacity <= 1600) thirdParty = 4500;
                    else thirdParty = 6500;

                } else if (vehicleType === 'passenger') {
                    if (isGovernment) {
                        if (seatCapacity <= 20) {
                            thirdParty = 5500;
                        } else {
                            thirdParty = 8500;
                        }
                    } else {
                        if (seatCapacity <= 14) {
                            thirdParty = 6500;
                        } else if (seatCapacity <= 18) {
                            thirdParty = 7500;
                        } else if (seatCapacity <= 35) {
                            thirdParty = 9000;
                        } else {
                            thirdParty = 10000;
                        }
                    }

                } else if (vehicleType === 'goods' || vehicleType === 'agriculture') {
                    if (isGovernment) {
                        if (tonCapacity <= 3) {
                            thirdParty = 5500;
                        } else {
                            thirdParty = 8500;
                        }
                    } else {
                        if (tonCapacity <= 3) {
                            thirdParty = 6500;
                        } else {
                            thirdParty = 10000;
                        }
                    }

                } else if (vehicleType === 'tanker') {
                    if (isGovernment) {
                        if (tonCapacity <= 3) {
                            thirdParty = 5700;
                        } else {
                            thirdParty = 9000;
                        }
                    } else {
                        if (tonCapacity <= 3) {
                            thirdParty = 6750;
                        } else {
                            thirdParty = 10500;
                        }
                    }

                } else if (vehicleType === 'construction') {
                    if (isGovernment) {
                        if (tonCapacity <= 0) {
                            thirdParty = 10000;
                        } else if (tonCapacity <= 3) {
                            thirdParty = 6500;
                        } else {
                            thirdParty = 8500;
                        }
                    } else {
                        if (tonCapacity <= 0) {
                            thirdParty = 12000;
                        } else if (tonCapacity <= 3) {
                            thirdParty = 7500;
                        } else {
                            thirdParty = 10000;
                        }
                    }

                } else if (vehicleType === 'tempo') {
                    if (isGovernment) {
                        if (cubicCapacity <= 350 || hpWattValue > 0) {
                            thirdParty = 1500;
                        } else {
                            thirdParty = 2500;
                        }
                    } else {
                        if (cubicCapacity <= 350 || hpWattValue > 0) {
                            thirdParty = 2000;
                        } else {
                            thirdParty = 3000;
                        }
                    }
                } else if (vehicleType === 'tractor') {
                    if (isGovernment && hasTrailer) {
                        if (hpWattValue <= 15) {
                            thirdParty = 1750;
                        } else if (hpWattValue <= 20) {
                            thirdParty = 2000;
                        } else if (hpWattValue > 20) {
                            thirdParty = 3750;
                        }
                    } else if (isGovernment) {
                        if (hpWattValue <= 15) {
                            thirdParty = 750;
                        } else if (hpWattValue <= 20) {
                            thirdParty = 1000;
                        } else if (hpWattValue > 20) {
                            thirdParty = 2750;
                        }
                    } else if (hasTrailer) {
                        if (hpWattValue <= 15) {
                            thirdParty = 2500;
                        } else if (hpWattValue <= 20) {
                            thirdParty = 3000;
                        } else {
                            thirdParty = 6500;
                        }
                    } else {
                        if (hpWattValue <= 15) {
                            thirdParty = 1500;
                        } else if (hpWattValue <= 20) {
                            thirdParty = 2000;
                        } else {
                            thirdParty = 5500;
                        }
                    }
                }

                // Apply short period factor to third party if vehicle value > 0
                if (vehicleValue > 0) {
                    thirdParty *= shortPeriodFactor;
                }
                
                // Step 13: No Claim Discount (TP)
                const noClaimDiscountTP = thirdParty * noClaimDiscountRate;
                
                // Step 14: Disabled Friendly Discount (TP 25%)
                let disabledDiscountTPAmount = 0;
                if (isDisabledFriendly) {
                    disabledDiscountTPAmount = (thirdParty - noClaimDiscountTP) * 0.25;
                }
                
                // Step 15: Third Party Premium
                const thirdPartyPremium = thirdParty - noClaimDiscountTP - disabledDiscountTPAmount;

		    // Step 16: Calculate premiums based on government/non-government
		    let driverPremium = 0;
		    let helperPremium = 0;
		    let passengerPremium = 0;

		    const premiumRate = isGovernment ? 600 : 700;
		        if (vehicleType !== 'motorcycle' && vehicleType !== 'tractor' && vehicleType !== 'private' && vehicleType !== 'electric') {
    				driverPremium = 1 * premiumRate;
        		  	helperPremium = helper * premiumRate;
        			passengerPremium = (seatCapacity - 1) * premiumRate;
    		    }
                if (vehicleType === 'private' || vehicleType === 'electric') {
                    driverPremium = 1 * premiumRate;
                    passengerPremium = (seatCapacity - 1) * premiumRate;
                }
                if (vehicleType === 'tractor') {
                    driverPremium = 700;
                    helperPremium = 700;
                }

                // Apply short period factor to driver, helper and passenger if vehicle value > 0
                if (vehicleValue > 0) {
                    driverPremium *= shortPeriodFactor;
                    helperPremium *= shortPeriodFactor;
                    passengerPremium *= shortPeriodFactor;
                }

                // Step 17: RSMDST
                let rsmdstAmount = 0;
                if (hasRSMDST) {
                    if (vehicleType === 'motorcycle') {
                        rsmdstAmount = vehicleValue * 0.0015 + 1000000 * 0.00025;
                    } else if (vehicleType === 'private' || vehicleType === 'electric') {
                        rsmdstAmount = vehicleValue * 0.0015 + seatCapacity * 500000 * 0.00025;
                    } else if (vehicleType === 'tractor') {
                        rsmdstAmount = vehicleValue * 0.0020 + trailerValue * 0.0020 + 1000000 * 0.00025;
                    } else {
                        rsmdstAmount = vehicleValue * 0.0020 + seatCapacity * 500000 * 0.00025 + helper * 500000 * 0.00025;
                    }
                }

                // Apply short period factor to rsmdst amount if vehicle value > 0 and not annual
                if (vehicleValue > 0 && calcType !== 'annual') {
                    rsmdstAmount *= shortPeriodFactor;
                }

                // Step 18: VAT
                let vatAmount = (basicPremium + thirdPartyPremium + rsmdstAmount + driverPremium + helperPremium + passengerPremium) * 0.13;
                
                // Step 19: Stamp Charge
                const stampCharge = vehicleValue > 0 ? 20.00 : 10.00;
                
                // Step 20: Total Premium
                const totalPremium = basicPremium + thirdPartyPremium + rsmdstAmount + driverPremium + helperPremium + passengerPremium + vatAmount + stampCharge;
                
                // Display results
                displayResults({
                    normalPremium,
                    tariffDiscount,
                    trailerCharge,
		            additionalPremium,
                    oldVehicleCharge,
                    voluntaryExcessAmount,
                    noClaimDiscountAmount,
                    ownGoodsAmount,
                    directDiscountAmount,
                    electricDiscountAmount,
                    disabledDiscountAmount,
                    towingChargeAmount,
                    basicPremium,
                    thirdParty,
                    noClaimDiscountTP,
                    disabledDiscountTPAmount,
                    thirdPartyPremium,
		            driverPremium,
		            helperPremium,
		            passengerPremium,
                    rsmdstAmount,
                    vatAmount,
                    stampCharge,
                    totalPremium,
             	    hasVehicleValue: vehicleValue > 0
                });
            }

            function displayResults(results) {
                // Hide placeholder and show results
                resultsPlaceholder.style.display = 'none';
                resultsDetails.style.display = 'grid';
                
                const vehicleType = document.getElementById('vehicleType').value;
                const seatCapacity = parseFloat(document.getElementById('seatCapacity').value) || 0;
    
                // Hide results if seat capacity is invalid
                if (vehicleType !== 'motorcycle' && vehicleType !== 'tractor' && seatCapacity <= 0) {
                    document.querySelector('.results-details').style.display = 'none';
                    document.querySelector('.results-placeholder').style.display = 'block';
                return;
                }


                // Show/hide normal premium
                const normalPremiumItem = document.getElementById('normalPremiumItem');
                if (results.normalPremium > 0) {
                    normalPremiumItem.style.display = 'flex';
                } else {
                    normalPremiumItem.style.display = 'none';
                }
            
                // Show/hide additional premium
                const additionalPremiumItem = document.getElementById('additionalPremiumItem');
                if (results.additionalPremium > 0) {
                    additionalPremiumItem.style.display = 'flex';
                } else {
                    additionalPremiumItem.style.display = 'none';
                }

                // Show/hide tariff discount
                const tariffDiscountItem = document.getElementById('tariffDiscountItem');
                if (results.tariffDiscount > 0) {
                    tariffDiscountItem.style.display = 'flex';
                } else {
                    tariffDiscountItem.style.display = 'none';
                }

                // Show/hide trailer charge
                const trailerChargeItem = document.getElementById('trailerChargeItem');
                if (results.trailerCharge > 0) {
                    trailerChargeItem.style.display = 'flex';
                } else {
                    trailerChargeItem.style.display = 'none';
                }

                // Show/hide old vehicle charge
                const oldVehicleChargeItem = document.getElementById('oldVehicleChargeItem');
                if (results.oldVehicleCharge > 0) {
                    oldVehicleChargeItem.style.display = 'flex';
                } else {
                    oldVehicleChargeItem.style.display = 'none';
                }

                // Show/hide voluntary excess amount
                const voluntaryExcessAmountItem = document.getElementById('voluntaryExcessAmountItem');
                if (results.voluntaryExcessAmount > 0) {
                    voluntaryExcessAmountItem.style.display = 'flex';
                } else {
                    voluntaryExcessAmountItem.style.display = 'none';
                }

                // Show/hide no claim discount amount
                const noClaimDiscountAmountItem = document.getElementById('noClaimDiscountAmountItem');
                if (results.noClaimDiscountAmount > 0) {
                    noClaimDiscountAmountItem.style.display = 'flex';
                } else {
                    noClaimDiscountAmountItem.style.display = 'none';
                }

                // Show/hide own goods carrying discount
                const ownGoodsAmountItem = document.getElementById('ownGoodsAmountItem');
                if (results.ownGoodsAmount > 0) {
                    ownGoodsAmountItem.style.display = 'flex';
                } else {
                    ownGoodsAmountItem.style.display = 'none';
                }

                // Show/hide direct discount amount
                const directDiscountAmountItem = document.getElementById('directDiscountAmountItem');
                if (results.directDiscountAmount > 0) {
                    directDiscountAmountItem.style.display = 'flex';
                } else {
                    directDiscountAmountItem.style.display = 'none';
                }

                // Show/hide no claim discount (TP) amount
                const noClaimDiscountTPItem = document.getElementById('noClaimDiscountTPItem');
                if (results.noClaimDiscountTP > 0) {
                    noClaimDiscountTPItem.style.display = 'flex';
                } else {
                    noClaimDiscountTPItem.style.display = 'none';
                }

                // Show/hide towing charge amount
                const towingChargeAmountItem = document.getElementById('towingChargeAmountItem');
                if (results.towingChargeAmount > 0) {
                    towingChargeAmountItem.style.display = 'flex';
                } else {
                    towingChargeAmountItem.style.display = 'none';
                }

                // Show/hide electric discount
                const electricDiscountItem = document.getElementById('electricDiscountItem');
                if (results.electricDiscountAmount > 0) {
                    electricDiscountItem.style.display = 'flex';
                } else {
                    electricDiscountItem.style.display = 'none';
                }
                
                // Show/hide disabled discount
                const disabledDiscountItem = document.getElementById('disabledDiscountItem');
                const disabledDiscountTPItem = document.getElementById('disabledDiscountTPItem');
                if (results.disabledDiscountAmount > 0) {
                    disabledDiscountItem.style.display = 'flex';
                    disabledDiscountTPItem.style.display = 'flex';
                } else {
                    disabledDiscountItem.style.display = 'none';
                    disabledDiscountTPItem.style.display = 'none';
                }
                
                // Show/hide basic premium amount
                const basicPremiumItem = document.getElementById('basicPremiumItem');
                if (results.basicPremium > 0) {
                    basicPremiumItem.style.display = 'flex';
                } else {
                    basicPremiumItem.style.display = 'none';
                }

                // Show/hide driver premium amount
                const driverPremiumItem = document.getElementById('driverPremiumItem');
                if (results.driverPremium > 0) {
                    driverPremiumItem.style.display = 'flex';
                } else {
                    driverPremiumItem.style.display = 'none';
                }

                // Show/hide helper premium amount
                const helperPremiumItem = document.getElementById('helperPremiumItem');
                if (results.helperPremium > 0) {
                    helperPremiumItem.style.display = 'flex';
                } else {
                    helperPremiumItem.style.display = 'none';
                }

                // Show/hide passenger premium amount
                const passengerPremiumItem = document.getElementById('passengerPremiumItem');
                if (results.passengerPremium > 0) {
                    passengerPremiumItem.style.display = 'flex';
                } else {
                    passengerPremiumItem.style.display = 'none';
                }

                // Show/hide rsmdst premium amount
                const rsmdstAmountItem = document.getElementById('rsmdstAmountItem');
                if (results.rsmdstAmount > 0) {
                    rsmdstAmountItem.style.display = 'flex';
                } else {
                    rsmdstAmountItem.style.display = 'none';
                }

                // Format all amounts as NPR with 2 decimal places
                for (const key in results) {
                    if (results.hasOwnProperty(key) && key !== 'hasVehicleValue') {
                        const formattedValue = new Intl.NumberFormat('en-NP', {
                            style: 'currency',
                            currency: 'NPR',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(results[key]);
                        
                        const element = document.getElementById(key);
                        if (element) {
                            element.textContent = formattedValue;
                        }
                    }
                }
            }

            // Initialize the form
            toggleVehicleFields();
            toggleFieldsBasedOnValue();
        });
