const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({

    //field 01
    title: {
        type: String,
        required: true,
        enum: ['Mr', 'Mrs', 'Mast', 'Miss', 'Dr', 'Dr(Mrs)', 'Dr(Ms)', 'Prof', 'Prof(Mrs)', 'Prof(Ms)', 'Rev', 'Sis', 'Hon', 'Ms', 'Baby']
    },

    //field 02
    firstName: {
        type: String,
        required: true,
    },

    //field 03
    lastName: {
        type: String,
        required: true
    },

    //field 04
    userType: {
        type: String,
        required: true,
        enum: ['user', 'admin', 'Pharmacist', 'Delivery Person'], //enter your user typr hear
        default: 'user' //defult value
    },

    //field 05
    nicNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: [10, 'NIC Number should be at least 10 character long'],
        maxlength: [12, 'NIC Number should not be more than 12 character long'],
        validate: {
            validator: function (nicValidator) {
                // Check if the input matches old NIC number format
                const oldNicRegex = /^[0-9]{9}[vV]$/;
                if (oldNicRegex.test(nicValidator)) {
                    const year = nicValidator.substring(0, 2);
                    const currentYear = new Date().getFullYear().toString().slice(-2);
                    // Check if the birth year is within the last 100 years
                    if (parseInt(year) > parseInt(currentYear) - 100) {
                        return true;
                    }
                }

                // Check if the input matches new NIC number format
                const newNicRegex = /^[0-9]{12}$/;
                if (newNicRegex.test(nicValidator)) {
                    const year = nicValidator.substring(0, 4);
                    const currentYear = new Date().getFullYear().toString();
                    // Check if the birth year is within the last 100 years
                    if (parseInt(year) > parseInt(currentYear) - 100) {
                        return true;
                    }
                }

                // If neither old nor new NIC number format matches, return false
                return false;
            },
            message: 'Invalid NIC Number format'
        }
    },

    //field 06
    mobileNumber: {
        type: String,
        required: true,
        minlength: [10, 'Mobile Number should be have 10 numbers'],
        maxlength: [10, 'Mobile Number should be have 10 numbers']
    },

    //field 07
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (emailValidator) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValidator);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },

    //field 08
    address: {
        type: String,
        required: true
    },

    //field 09
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password should be at least 8 character long'],
        maxlength: [30, 'Password should not be more than 30 character long']
    },

    //field 10
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function (passwordValidator) {
                return passwordValidator === this.password;
            },
            message: 'Passwords do not match'
        },
        minlength: [8, 'Password should be at least 8 character long'],
        maxlength: [30, 'Password should not be more than 30 character long']
    }

});

// Add a method to generate a JWT token for the user
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, userType: this.userType }, 'yourSecretKey');
    return token;
};

module.exports = mongoose.model('user', userSchema);