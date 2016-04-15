var HomePage = function(){};
 
HomePage.prototype.path = '#/app/folder/-1';
 
HomePage.prototype.getPath = function(){
	var self = this;
    return self.path;
};

HomePage.prototype.getTitle = function(){
    return browser.getTitle();
};

HomePage.prototype.getDisplayName = function(){
    return element(by.binding('appCtrl.getUserDisplayName()'));
};

HomePage.prototype.getWorkflowTitle = function(){
    return element(by.id('#dr-workflow-link'));
};

HomePage.prototype.getFavorites = function(){
    return element(by.id('#dr-favorites-link'));
};

HomePage.prototype.expandAllNodes = function(){
    element(by.id('next')).isEnabled().then(function (isEnabled) {
		if (isEnabled) {
			// ...
		} else {
			return; // the element is not enabled, last page
		}
	});
};

HomePage.prototype.getErrorMessageAlert = function(){
    return element(by.binding('HomeCtrl.errorMessage'));
};
 
HomePage.prototype.getPathRegex = function(){
    var regex = escapeRegExp(this.getPath());
    return new RegExp(regex);
};
 
HomePage.prototype.get = function() {
    var url = browser.baseUrl + this.getPath();
 
    if( browser.params.currentUrl !== url ) {
        browser.params.currentUrl = url;
        return browser.get(url);
    } else {
        return true;
    }
};
 
module.exports = HomePage;