challengeAppServices.factory('storageService', [function(){
      
    var root = {};
   
    root.get = function(key){
        return localStorage.getItem(key);
    };
   
   root.set = function(key,val){
        localStorage.setItem(key, val);
   };
    return root;
}]);