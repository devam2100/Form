document.addEventListener('DOMContentLoaded', () => {
    const employmentForm = document.getElementById('employmentForm');
    
    
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.location.href = 'PersonalInformation.html';
    });
   
   
    function validateEmploymentForm() {
        const errors = [];
        const place = document.getElementById('place').value.trim();
        if (place === "") {
            errors.push("Place of employment is required.");
        }
       
       
        const employmentDate = document.getElementById('employmentDate').value.trim();
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!employmentDate || !dateRegex.test(employmentDate)) {
            errors.push("Employment date must be in YYYY-MM-DD format.");
        }
        const title = document.getElementById('title').value.trim();
        if (title === "") {
        errors.push("Job title is required.");
        }
        const referenceFirstName = document.getElementById('referenceFirstName').value.trim();
        if (referenceFirstName === "") {
            errors.push("Reference first name is required.");
        } 
        const referenceLastName = document.getElementById('referenceLastName').value.trim();
        if (referenceLastName === "") {
            errors.push("Reference last name is required.");
        }
        const relationship = document.getElementById('relationship').value.trim();
        if (relationship === "") {
            errors.push("Relationship is required.");
        }
        return errors;
    }
    
    
    employmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const errors = validateEmploymentForm();
        if (errors.length > 0) {
            alert(`Please fix the following errors:\n\n${errors.join('\n')}`);
            return;
        }
       
       
        const personalInfo = JSON.parse(localStorage.getItem('personalInfo')) || {};
        const employmentData = {
            place: document.getElementById('place').value,
            employmentDate: document.getElementById('employmentDate').value,
            title: document.getElementById('title').value,
            reference: {
                firstName: document.getElementById('referenceFirstName').value,
                lastName: document.getElementById('referenceLastName').value,
                relationship: document.getElementById('relationship').value,
            },
        };
       
        
        const combinedData = { ...personalInfo, employmentDetails: employmentData };
        localStorage.setItem('submittedData', JSON.stringify(combinedData)); 
        localStorage.removeItem('personalInfo');
        alert('All data submitted successfully!');
        console.log("----->Data",combinedData);

        
    });
});
