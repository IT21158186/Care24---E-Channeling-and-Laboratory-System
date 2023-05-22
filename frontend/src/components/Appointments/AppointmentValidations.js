 import validator from 'validator'

const AppointmentValidator = (data) => {
    let errors ={};
    const {
        patientId,
        patientName,
        contactNumber,
        age,
        doctor,
        date,
        time,
        email
    } = data;

    console.log(data)
    //Patient ID
    if(validator.isEmpty(patientId)) {
        errors.patientId = 'Input patientID here';
    }else if(patientId === undefined) {
        errors.patientId = 'Input patientID here';
    }else {
    	    const pattern = /^PID\d{4}$/;
        if (pattern.test(patientId) === false){
            errors.patientId = 'Patient ID must be started by PID and rest of 4 digits!';
        }
    }
    //Patient Name
    if(validator.isEmpty(patientName)) {
        errors.patientName = 'Input patient Name here!';
    }

   
    





    return {
        isInvalid: Object.keys(errors).length > 0,
        errors: errors,
    };
};

export default AppointmentValidator;