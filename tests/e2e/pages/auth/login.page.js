var LoginPage = function(){};

LoginPage.prototype.path = '#/login';
 
LoginPage.prototype.getPath = function(){
	var self = this;
    return self.path;
};

LoginPage.prototype.getTitle = function(){
    return browser.getTitle();
};

LoginPage.prototype.getUsernameInput = function(){
    return element(by.model('loginCtrl.user.UserName'));
};

LoginPage.prototype.getPasswordInput = function(){
    return element(by.model('loginCtrl.user.Password'));
};

LoginPage.prototype.getLoginBtn = function(){
    return element(by.id('dr-signin-btn'));
};

LoginPage.prototype.getErrorMessageAlert = function(){
    return element(by.binding('loginCtrl.errorMessage'));
};
 
LoginPage.prototype.getPathRegex = function(){
    var regex = escapeRegExp(this.getPath());
    return new RegExp(regex);
};
 
LoginPage.prototype.get = function() {
    var url = browser.baseUrl + this.getPath();
 
    if( browser.params.currentUrl !== url ) {
        browser.params.currentUrl = url;
        return browser.get(url);
    } else {
        return true;
    }
};
 
module.exports = LoginPage;