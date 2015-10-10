angular.module('todayspecial')
        .controller('dashboard',['$scope','$meteor','$stateParams',
                function($scope,$meteor,$stateParams){

                    var errs = {
                        signin:false
                    };
                    var states = {
                        editingItem:false,
                        addNewItem:false
                    }

                    $scope.errors = errs;
                    $scope.states = states;

                    $scope.login = function(data){
                        if(data != undefined){
                            if(data.email && data.password){
                                Meteor.loginWithPassword(data.email,data.password,function(err){
                                    if(err.errork=400 || err.error==403){
                                        errs.signin=true
                                    }
                                });
                            }else{
                                errs.signin=true
                            }
                        }else{
                           errs.signin=true
                        }
                    }

                    $scope.logout = function(){
                        Meteor.logout();
                    };

                    $scope.menu = $meteor.collection(Menu).subscribe('todayspecial');

                    $scope.addNewItem = function(item){
                        Menu.insert(item);
                    }

                    $scope.addNew = function(){
                        states.addNewItem = true;
                    }

                    $scope.editItem = function(item){
                        $scope.newItem = $meteor.object(Menu,item._id,false);
                        states.editingItem = true; 
                    }

                    $scope.updateItem = function(item){
                        $scope.newItem.save();
                        states.editingItem = false; 
                    }

                    $scope.closeUpdate = function(){
                        states.editingItem = false;
                    }

                    $scope.closeAddNew = function(){
                        states.addNewItem = false;
                    }

                }
        ]);

