document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('personalInfoForm');

   
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const birthMonth = document.getElementById('birthMonth');
    months.forEach((month, index) => {
        birthMonth.innerHTML += `<option value="${index + 1}">${month}</option>`;
    });

    const birthDay = document.getElementById('birthDay');
    for (let i = 1; i <= 31; i++) {
        birthDay.innerHTML += `<option value="${i}">${i}</option>`;
    }

    const birthYear = document.getElementById('birthYear');
    for (let i = new Date().getFullYear(); i >= 1900; i--) {
        birthYear.innerHTML += `<option value="${i}">${i}</option>`;
    }

 
    const workDaysContainer = document.getElementById('workDays');
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach(day => {
        workDaysContainer.innerHTML += `
            <input type="checkbox" id="${day}" value="${day}">
            <label for="${day}">${day}</label>
        `;
    });

   
    const countries = ["United States", "Canada", "United Kingdom"];
    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
        countrySelect.innerHTML += `<option value="${country}">${country}</option>`;
    });


    function validateForm() {
        const errors = [];
        
        
        const fullname = document.getElementById('fullname').value.trim();
        if (fullname === "") {
            errors.push("Full Name is required.");
        }

       
        const preferredName = document.getElementById('preferredName').value.trim();
        if (preferredName === "") {
            errors.push("Preferred Name is required.");
        }

   
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            errors.push("Gender is required.");
        }

        
        const birthMonthValue = birthMonth.value;
        const birthDayValue = birthDay.value;
        const birthYearValue = birthYear.value;
        if (!birthMonthValue || !birthDayValue || !birthYearValue) {
            errors.push("Complete Birthdate is required.");
        }

      
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("A valid Email is required.");
        }

    
        const homeNumber = document.getElementById('homeNumber').value.trim();
        const cellNumber = document.getElementById('cellNumber').value.trim();
        const phoneRegex = /^\d{10}$/; // Assuming 10-digit phone numbers
        if (homeNumber && !phoneRegex.test(homeNumber)) {
            errors.push("Home Number must be a valid 10-digit number.");
        }
        if (cellNumber && !phoneRegex.test(cellNumber)) {
            errors.push("Cell Number must be a valid 10-digit number.");
        }

        
        const permanentAddress = document.getElementById('permanentAddress').value.trim();
        if (permanentAddress === "") {
            errors.push("Permanent Address is required.");
        }
        const city = document.getElementById('city').value.trim();
        if (city === "") {
            errors.push("City is required.");
        }
        const state = document.getElementById('state').value.trim();
        if (state === "") {
            errors.push("State is required.");
        }
        const zipcode = document.getElementById('zipcode').value.trim();
        if (zipcode === "") {
            errors.push("Zipcode is required.");
        }
        const country = countrySelect.value;
        if (!country) {
            errors.push("Country is required.");
        }

     
        const authorizedToWork = document.querySelector('input[name="authorized"]:checked');
        if (!authorizedToWork) {
            errors.push("Authorization to work in the United States is required.");
        }

        
        const workDays = [...document.querySelectorAll('#workDays input:checked')];
        if (workDays.length === 0) {
            errors.push("At least one Work Day must be selected.");
        }

        
        const workHours = document.getElementById('workHours').value.trim();
        if (workHours === "") {
            errors.push("Work Hours are required.");
        }

      
        const collegeName = document.getElementById('collegeName').value.trim();
        if (collegeName === "") {
            errors.push("College Name is required.");
        }
        const major = document.getElementById('major').value.trim();
        if (major === "") {
            errors.push("Major is required.");
        }
        const graduationYear = document.getElementById('year').value;
        if (!graduationYear) {
            errors.push("Graduation Year is required.");
        }

        return errors;
    }

  
    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
        const errors = validateForm();
        if (errors.length > 0) {
            alert(`Please fix the following errors:\n\n${errors.join('\n')}`);
            return;
        }

       
        const personalInfo = {
            fullname: document.getElementById('fullname').value,
            preferredName: document.getElementById('preferredName').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            birthdate: {
                month: birthMonth.value,
                day: birthDay.value,
                year: birthYear.value
            },
            email: document.getElementById('email').value,
            homeNumber: document.getElementById('homeNumber').value,
            cellNumber: document.getElementById('cellNumber').value,
            address: {
                permanentAddress: document.getElementById('permanentAddress').value,
                streetAddress1: document.getElementById('streetAddress1').value,
                streetAddress2: document.getElementById('streetAddress2').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zipcode: document.getElementById('zipcode').value,
                country: countrySelect.value
            },
            authorizedToWork: document.querySelector('input[name="authorized"]:checked').value,
            workDays: [...document.querySelectorAll('#workDays input:checked')].map(cb => cb.value),
            workHours: document.getElementById('workHours').value,
            education: {
                collegeName: document.getElementById('collegeName').value,
                collegeAddress: document.getElementById('collegeAddress').value,
                major: document.getElementById('major').value,
                graduationYear: document.getElementById('year').value
            }
        };

     
        localStorage.setItem('personalInfo', JSON.stringify(personalInfo));

     
        window.location.href = 'employment.html';
    });

    
    form.appendChild(nextButton);
});
