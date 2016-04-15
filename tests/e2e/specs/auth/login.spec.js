var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var LoginPage = requirePage('auth/login');
var HomePage = requirePage('home/home'); 

var loginPage = new LoginPage();
var homePage = new HomePage();

var saveScreenshot = function(pathname) {
  browser.takeScreenshot().then(function(png) {
    var file = path.resolve(pathname);
    fs.writeFileSync(file, png, { encoding: 'base64' }, console.log);
  });
};

var waitForCurrentUrl = function(matchUrl, timeout) {
    if (timeout == null) {
        timeout = browser.manage().timeouts().pageLoadTimeout;
    };

    return browser.driver.wait(function() {
        // Return a condition. Code will continue to run until is true 
        return browser.driver.getCurrentUrl().then(function(url) {
		 //console.log(matchUrl);
           return (url.indexOf(matchUrl) !== -1);		
        }, function(err) {
            // errored  .. TODO: retry
            throw err;
        });
    }, timeout, 'Expectation error: Timed out waiting for current url');
};

beforeEach(function () {
	loginPage.get();
    browser.waitForAngular();
});
 
describe('login page', function() {  
  var usernameInput = loginPage.getUsernameInput();
  var passwordInput = loginPage.getPasswordInput();
  var loginBtn = loginPage.getLoginBtn(); 
  
  it('should have a title', function() {
		expect(loginPage.getTitle()).toEqual('DocRecord');   
 });
 
  it('should contain a required username field', function () {
    expect(usernameInput.isPresent()).toBeTruthy();
    expect(usernameInput.getAttribute('required')).toBeTruthy();
  });
  
  it('should contain a required password field', function () {
    expect(passwordInput.isPresent()).toBeTruthy();
    expect(passwordInput.getAttribute('required')).toBeTruthy();
	saveScreenshot('./test-step-2.png');
  });
  
  it('should give an error when a password is not entered', function () {
     usernameInput.clear();
	passwordInput.clear();
    usernameInput.sendKeys('labpc');
	passwordInput.sendKeys('');
		
	usernameInput.getAttribute('value').then(function(value) {
		console.log('Username - ' + value);
	});	
	
	passwordInput.getAttribute('value').then(function(value) {
		console.log('Password - ' + value);
	});
	
	loginBtn.click();
	expect(loginPage.getErrorMessageAlert().getText()).toContain
	("'Password' should not be empty.");
	
  });
  
   it('should give an error when a wrong password is entered', function () {
    usernameInput.clear();
	passwordInput.clear();
    usernameInput.sendKeys('labpc');
	passwordInput.sendKeys('wrong password');
		
	usernameInput.getAttribute('value').then(function(value) {
		console.log('Username - ' + value);
	});	
	
	passwordInput.getAttribute('value').then(function(value) {
		console.log('Password - ' + value);
	});
	
	loginBtn.click();
	expect(loginPage.getErrorMessageAlert().getText()).toContain
	("Invalid UserName or Password");
	
  });
  
   it('should log you in when corrrect credentials are entered', function () {
    usernameInput.clear();
	passwordInput.clear();
	usernameInput.sendKeys('labpc');
	passwordInput.sendKeys('Password12344');
		
	usernameInput.getAttribute('value').then(function(value) {
		console.log('Username - ' + value);
	});	
	
	passwordInput.getAttribute('value').then(function(value) {
		console.log('Password - ' + value);
	});
	
	loginBtn.click().then(function(){
	  waitForCurrentUrl(homePage.getPath(), 20000); //20 seconds
	  var urlPromise = browser.driver.getCurrentUrl();
	  expect( urlPromise ).toMatch( homePage.getPathRegex());
	  urlPromise.then(function(url){
			console.log("Now on Home Page - " + url);
		  // Make sure to alert the BasePage we've moved
		  browser.params.currentUrl = url;
	  });
	});
	
  });
  
});