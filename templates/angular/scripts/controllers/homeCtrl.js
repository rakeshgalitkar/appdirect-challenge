var challengeAppControllers = angular.module('challengeApp.Controllers', ['daterangepicker'])

challengeAppControllers.controller('homeCtrl', function($scope,$rootScope,$timeout,twitterService,storageService){
	$scope.twitterData = [];
	$scope.numError = false;
	$scope.datePicker =  {
		date : {startDate: moment().subtract(30,'days').format('YYYY-MM-D'), 
				endDate: moment().format('YYYY-MM-D'), 
				maxDate : moment().format('YYYY-MM-D')
			}
	};
	$scope.editMode = false;
	$scope.numTweets = 30;
	$scope.screenNames = ['appdirect','laughingsquid','techcrunch'];

	$scope.toggleEditMode = function(){
		$scope.editMode = !$scope.editMode;
		if($scope.editMode){
			$('#mainWindow').addClass('edit');
			$( "#sortable" ).sortable( "enable" );
		}else{
			$('#mainWindow').removeClass('edit');
			$( "#sortable" ).sortable( "disable" );
		}
	};

	function validation(){
		if(!$scope.numTweets || $scope.numTweets < 1|| $scope.numTweets > 100){
			return false;
		}
		return true;
	}

	$scope.applyFilters = function(){
		if(!validation()){
			$scope.numError = true;	
			return;
		}else{
			$scope.numError = false;	
		}
		var filters = {
			startDate : moment($scope.datePicker.date.startDate).format('YYYY-MM-D'),
			endDate : moment($scope.datePicker.date.endDate).format('YYYY-MM-D'),
			numTweets : $scope.numTweets,
			screenNames : []
		};

		var screenNames = [];
		$('#sortable li').each(function(loop,li){
			filters.screenNames.push($(li).attr('rel'));
		});
		
		//save names to storage
		storageService.set('filters', JSON.stringify(filters));
		twitterService.filters = filters;
		$rootScope.$emit('refresh', null);
		$scope.toggleEditMode();
	};

	$scope.init = function(){
		$scope.numError = false;
		$( "#sortable" ).sortable();
		$( "#sortable").disableSelection();
		$( "#sortable" ).sortable('disable');
		var filters = storageService.get('filters');
		if(filters){
			filters = JSON.parse(filters);
			$scope.datePicker.date.startDate = filters.startDate;
			$scope.datePicker.date.endDate = filters.endDate;
			$scope.numTweets = filters.numTweets;
			$scope.screenNames = filters.screenNames;
			twitterService.filters = filters;
		}else{
			twitterService.filters.numTweets = 30;
		}

	};

});