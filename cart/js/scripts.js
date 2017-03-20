angular.module('shopApp',['ui.bootstrap']).controller('shopCtrl',['$scope','$http',function ($scope, $http) {
		$scope.products = [];
		$scope.showPromotional = false;
		$scope.showModal = false;
		$scope.promotional = {
			'promotional_code' : ''
		};
		// Load products from server
		$http.get('assets/cart.json').then(function(response) {		
			$scope.products = response.data[0].productsInCart;
			$scope.totalItems = $scope.products.length; 			
		});

		$scope.getSubTotalPrice = function() {
			var subtotal = 0;
			$scope.products.forEach(function (product) {
				subtotal += product.p_price * product.p_quantity;
			});			
			return subtotal;
		};
		
		$scope.getTotalPrice = function() {
			var total = $scope.getSubTotalPrice();
			if($scope.showPromotional)
			{
				total = total - 7;
			}			
			return total;
		};
					
		$scope.applyPromotionalCode = function(isValid) {
			if(isValid)
			{
				var promotional_code = $scope.promotional.promotional_code;
				
				if($scope.promotional.promotional_code == "JF10")
				{
					$scope.showPromotional = true;				
				}else{
					$scope.showPromotional = false;
				}
			}			
			
		};
		
		$scope.toggleModal = function(){
			$scope.showModal = !$scope.showModal;
		};
		
	}])

	.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +                 
              '</div>' + 
              '<div class="modal-body" ng-transclude><div class="row"><div class="col-xs-12"></div></div></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
          scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });