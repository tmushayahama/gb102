angular.module("gb-filters.truncate",[]).filter("chars",function(){return function(input,chars,breakOnWord){if(isNaN(chars))return input;if(0>=chars)return"";if(input&&input.length>chars){if(input=input.substring(0,chars),breakOnWord)for(;" "===input.charAt(input.length-1);)input=input.substr(0,input.length-1);else{var lastspace=input.lastIndexOf(" ");-1!==lastspace&&(input=input.substr(0,lastspace))}return input+"…"}return input}}).filter("splitchars",function(){return function(input,chars){if(isNaN(chars))return input;if(0>=chars)return"";if(input&&input.length>chars){var prefix=input.substring(0,chars/2),postfix=input.substring(input.length-chars/2,input.length);return prefix+"..."+postfix}return input}}).filter("words",function(){return function(input,words){if(isNaN(words))return input;if(0>=words)return"";if(input){var inputWords=input.split(/\s+/);inputWords.length>words&&(input=inputWords.slice(0,words).join(" ")+"…")}return input}});