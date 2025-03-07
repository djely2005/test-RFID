class Person{
    full_name;
    email;
    password;
    rfid;
    role;

    constructor(full_name, email, password, rfid, role) {
        this.full_name = full_name;
        this.email = email;
        this.password = password;
        this.rfid = rfid;
        this.role = role;
    }
    get fullName() {
        return this.full_name;
    }

    set fullName(name) {
        this.full_name = name;
    }

    get emailAddress() {
        return this.email;
    }

    set emailAddress(email) {
        this.email = email;
    }

    get userPassword() {
        return this.password;
    }

    set userPassword(password) {
        this.password = password;
    }

    get rfidCode() {
        return this.rfid;
    }

    set rfidCode(rfid) {
        this.rfid = rfid;
    }

    get userRole() {
        return this.role;
    }

    set userRole(role) {
        this.role = role;
    }
    
    hashPassword() {
        const crypto = require('crypto');
        this.password = crypto.createHash('sha256').update(this.password).digest('hex');
    }
    
    checkEmailFormat() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
    checkRole(){
        const allowedRoles = ['admin', 'super-admin', 'member', 'non-member'];
        return allowedRoles.includes(this.role);
    }
    checkRFIDFormat(){
        const rfidRegex = /^[0-9]{13}$/;
        return rfidRegex.test(this.rfid);
    }
    checkPasswordFormat(){
        // Password must be at least 8 characters long,
        // contain at least one lowercase letter, one uppercase letter, one digit, and one special character from the set @$!%*?&.
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(this.password);
    }
    checkPasswordMatch(password){
        return this.password === password;
    }
    checkRFIDMatch(rfid){
        return this.rfid === rfid;
    }
    checkEmailMatch(email){
        return this.email === email;
    }
    checkFullNameMatch(name){
        return this.full_name === name;
    }
    checkRoleMatch(role){
        return this.role === role;
    }
}

export default Person;