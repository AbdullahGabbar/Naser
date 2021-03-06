var app = app || angular.module('myApp', []);


app.filter('xdate', function () {
    return function (item) {
        if (item) {
            if (item.day2) {
                return `${item.day} - ${item.month +1 } - ${item.year} -- ${item.day2} - ${item.month2 +1 } - ${item.year2}`;

            } else {
                return `${item.day} - ${item.month +1 } - ${item.year}`;
            }
        }
    };
});

app.service('isite', function ($http) {

    this.getValue = function (obj, property) {

        let arr = property.split('.');

        if (arr.length === 1) {
            return obj[arr[0]];
        }

        if (arr.length === 2) {
            return obj[arr[0]][arr[1]];
        }

        return null

    }

    this.uploadImage = function (files, options, callback) {
        options = Object.assign({
            category: 'default'
        }, options);
        callback = callback || function () {};

        var fd = new FormData();
        fd.append("fileToUpload", files[0]);
        $http.post('/api/upload/image/' + options.category, fd, {
            withCredentials: true,
            headers: {
                'Content-Type': undefined
            },
            uploadEventHandlers: {
                progress: function (e) {
                    callback(null, null, e);
                }
            },
            transformRequest: angular.identity
        }).then(function (res) {
            if (res.data && res.data.done) {
                callback(null, res.data.image_url);
            }
        }, function (error) {
            callback(error, null, null);
        });
    };

    this.uploadFile = function (files, options, callback) {
        options = Object.assign({
            category: 'default'
        }, options);
        callback = callback || function () {};

        var fd = new FormData();
        fd.append("fileToUpload", files[0]);
        $http.post('/api/upload/file/' + options.category, fd, {
            withCredentials: true,
            headers: {
                'Content-Type': undefined
            },
            uploadEventHandlers: {
                progress: function (e) {
                    callback(null, null, e);
                }
            },
            transformRequest: angular.identity
        }).then(function (res) {
            if (res.data && res.data.done && res.data.file) {
                callback(null, {
                    name: res.data.file.name,
                    url: res.data.file.url
                });
            }
        }, function (error) {
            callback(error, null, null);
        });
    };

    this.deleteFile = function (file, callback) {
        callback = callback || function () {};
        callback();
    };


});


app.directive('iDate', function () {

    return {
        link: function (scope, element, attrs) {
            scope.days1 = [];
            for (let i = 1; i < 32; i++) {
                scope.days1.push(i)

            }
            scope.years1 = [];
            for (let i = 1900; i < 2100; i++) {
                scope.years1.push(i)

            }
            scope.monthes1 = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];
        },
        restrict: 'E',
        require: 'ngModel',
        scope: {
            v: '@',
            label: '@',
            ngModel: '='
        },
        template: `
      <div class="row i-date">
  
        <div class=" control">
          <label> {{label}} </label>
          <div class="row">
            <div class="col3 day"> 
              <select v="{{v}}" ng-model="ngModel.day" class="appearance-none no-border-left no-border-radius" >
              <option ng-repeat="d1 in days1" ng-value="d1"> {{d1}} </option>
              </select>
            </div>
            <div class="col5 month"> 
              <select v="{{v}}" ng-model="ngModel.month" class="appearance-none no-border-left no-border-right no-border-radius" >
              <option ng-repeat="m1 in monthes1" ng-value="$index"> {{m1}} </option>
              </select>
            </div>
            <div class="col4 year"> 
              <select v="{{v}}" ng-model="ngModel.year" class="appearance-none no-border-right no-border-radius" >
              <option ng-repeat="y1 in years1" ng-value="y1"> {{y1}} </option>
              </select>
            </div>
          </div>
        </div>
    
  
      </div>
      `
    };
});

app.directive('iDate2', function () {

    return {
        link: function ($scope, element, attrs) {

            $scope.days1 = [];
            for (let i = 1; i < 32; i++) {
                $scope.days1.push(i)

            }
            $scope.years1 = [];
            for (let i = 1900; i < 2100; i++) {
                $scope.years1.push(i)
            }
            $scope.monthes1 = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];

            $scope.model = null;

            $scope.$watch('ngModel', function (ngModel) {
                if(ngModel){
                ngModel = new Date(ngModel) ;
                $scope.model = $scope.model || {};
                $scope.model.day = ngModel.getDate();
                $scope.model.month = ngModel.getMonth();
                $scope.model.year = ngModel.getFullYear();
                }
                
            });

            $scope.updateDate = function () {
                if($scope.model && $scope.model.year && $scope.model.month && $scope.model.day)
                $scope.ngModel = new Date($scope.model.year, $scope.model.month, $scope.model.day)
            };

        },
        restrict: 'E',
        require: 'ngModel',
        scope: {
            v: '@',
            label: '@',
            ngModel: '='
        },
        template: `
      <div class="row i-date2">
  
        <div class=" control">
          <label> {{label}} </label>
          <div class="row">
            <div class="col3 day"> 
              <select v="{{v}}" ng-model="model.day" ng-change="updateDate()" class="appearance-none no-border-left no-border-radius" >
              <option ng-repeat="d1 in days1" ng-value="d1"> {{d1}} </option>
              </select>
            </div>
            <div class="col5 month"> 
              <select v="{{v}}" ng-model="model.month" ng-change="updateDate()" class="appearance-none no-border-left no-border-right no-border-radius" >
              <option ng-repeat="m1 in monthes1" ng-value="$index"> {{m1}} </option>
              </select>
            </div>
            <div class="col4 year"> 
              <select v="{{v}}" ng-model="model.year" ng-change="updateDate()" class="appearance-none no-border-right no-border-radius" >
              <option ng-repeat="y1 in years1" ng-value="y1"> {{y1}} </option>
              </select>
            </div>
          </div>
        </div>
    
  
      </div>
      `
    };
});

app.directive('iFulldate', function () {

    return {
        link: function (scope, element, attrs) {
            scope.days1 = [];
            for (let i = 1; i < 32; i++) {
                scope.days1.push(i)

            }
            scope.years1 = [];
            for (let i = 1900; i < 2100; i++) {
                scope.years1.push(i)

            }
            scope.monthes1 = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];

            scope.days2 = [];
            for (let i = 1; i < 31; i++) {
                scope.days2.push(i)

            }
            scope.years2 = [];
            for (let i = 1400; i < 1450; i++) {
                scope.years2.push(i)

            }
            scope.monthes2 = ['صفر', 'محرم', 'ربيع اول', 'ربيع ثان', 'جمادى اول', 'جمادى ثان', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذى القعدة', 'ذى الحجة'];


            scope.date = new Date(attrs.value);
        },
        restrict: 'E',
        require: 'ngModel',
        scope: {
            v: '@',
            label1: '@',
            label2: '@',
            ngModel: '='
        },
        template: `
      <div class="row i-date">
  
        <div class="col6 control">
          <label> {{label1}} </label>
          <div class="row">
            <div class="col3 day"> 
              <select v="{{v}}" ng-model="ngModel.day" class="appearance-none no-border-left no-border-radius">
              <option ng-repeat="d1 in days1" ng-value="d1"> {{d1}} </option>
              </select>
            </div>
            <div class="col5 month"> 
              <select v="{{v}}" ng-model="ngModel.month" class="appearance-none no-border-left no-border-right no-border-radius">
              <option ng-repeat="m1 in monthes1" ng-value="$index"> {{m1}} </option>
              </select>
            </div>
            <div class="col4 year"> 
              <select v="{{v}}" ng-model="ngModel.year" class="appearance-none no-border-right no-border-radius">
              <option ng-repeat="y1 in years1" ng-value="y1"> {{y1}} </option>
              </select>
            </div>
          </div>
        </div>
     
        <div class="col6 control">
          <label> {{label2}} </label>
          <div class="row">
            <div class="col3 day"> 
              <select v="{{v}}" ng-model="ngModel.day2" class="appearance-none no-border-left no-border-radius">
              <option ng-repeat="d2 in days2" ng-value="d2"> {{d2}} </option>
              </select>
            </div>
            <div class="col5 month"> 
              <select v="{{v}}" ng-model="ngModel.month2" class="appearance-none no-border-left no-border-right no-border-radius">
              <option ng-repeat="m2 in monthes2" ng-value="$index"> {{m2}} </option>
              </select>
            </div>
            <div class="col4 year"> 
              <select v="{{v}}" ng-model="ngModel.year2" class="appearance-none no-border-right no-border-radius">
              <option ng-repeat="y2 in years2" ng-value="y2"> {{y2}} </option>
              </select>
            </div>
          </div>
        </div>
  
      </div>
      `
    };
});

app.directive('iControl', function () {

    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            v: '@',
            label: '@',
            type: '@',
            ngModel: '=',
            ngChange: '&',
            ngKeydown: '&',
        },
        link: function (scope, element, attrs, ctrl) {
            attrs.type = attrs.type || 'text';

            $(element).find('input').focus(()=>{
                $('popup').hide();
            });

            scope.$watch(attrs.ngModel, function (v) {});
        },
        template: `
        <div class="control">
            <label> {{label}} </label>
            <input autofocus v="{{v}}"  type="{{type}}" ng-model="ngModel" ng-change="ngChange()" ngKeydown="ngKeydown()">
        </div>
        `
    };

});

app.directive('iTextarea', function () {

    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            v: '@',
            label: '@',
            ngModel: '=',
            ngChange: '&',
        },
        link: function (scope, element, attrs, ctrl) {

            $(element).find('textarea').focus(()=>{
                $('popup').hide();
            });

        },
        template: `
        <div class="control">
            <label> {{label}} </label>
            <textarea rows="4" v="{{v}}" ng-model="ngModel" ng-change="ngChange()"></textarea>
        </div>
        `
    };

});

app.directive('iCheckbox', function () {

    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            label: '@',
            ngModel: '='
        },
        link: function (scope, element, attrs, ctrl) {

        },
        template: `
        <div class="control">
            <label class="checkbox">
                <span class="title"> {{label}} </span>
                <input type="checkbox" ng-model="ngModel" >
                <span class="checkmark"></span>
            </label>
        </div>
        `
    };

});

app.directive('iRadio', function () {

    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            label: '@',
            ngValue: '@',
            group: '@',
            ngModel: '='
        },
        link: function (scope, element, attrs, ctrl) {
            if (!attrs.group) {
                attrs.group = attrs.ngModel;
            }
        },
        template: `
        <div class="control">
            <label class="radio">
                <span > {{label}} </span>
                <input name="{{group}}" value="{{ngValue}}" type="radio" ng-model="ngModel" >
                <span class="checkmark"></span>
            </label>
        </div>
        `
    };

});

app.directive('iButton', function () {

    return {
        restrict: 'E',
        scope: {
            label: '@',
            type: '@',
            click: '@',
            fa: '@'
        },
        link: function (scope, element, attrs, ctrl) {
            if (!attrs.fa && attrs.type) {


                if (attrs.type.like('*exit*') || attrs.type.like('*close*')) {
                    attrs.fa = 'times';
                } else if (attrs.type.like('*view*') || attrs.type.like('*details*')) {
                    attrs.fa = 'file';
                } else if (attrs.type.like('*add*') || attrs.type.like('*new*')) {
                    attrs.fa = 'plus-circle';
                } else if (attrs.type.like('*update*') || attrs.type.like('*edit*')) {
                    attrs.fa = 'pencil';
                } else if (attrs.type.like('*save*')) {
                    attrs.fa = 'save';
                } else if (attrs.type.like('*delete*') || attrs.type.like('*remove*')) {
                    attrs.fa = 'trash';
                } else if (attrs.type.like('*print*')) {
                    attrs.fa = 'print';
                } else if (attrs.type.like('*search*')) {
                    attrs.fa = 'search';
                } else if (attrs.type.like('*export*') || attrs.type.like('*excel*')) {
                    attrs.fa = 'table';
                }
            }

        },
        template: `
        <a class="btn {{type}}">
        {{label}}
        <i ng-show="fa" class="fa fa-{{fa}}" aria-hidden="true"></i> </a>
        `
    };

});


app.directive('iList', function ($interval, $timeout, isite) {

    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            v: '@',
            label: '@',
            display: '@',
            display2: '@',
            space: '@',
            primary: '@',
            ngValue: '@',
            ngModel: '=',
            ngSearch: '=',
            ngChange: '&',
            items: '='
        },
        link: function ($scope, element, attrs, ctrl) {

            attrs.display = attrs.display || 'name'
            attrs.primary = attrs.primary || 'id'
            attrs.space = attrs.space || ' '
            attrs.ngValue = attrs.ngValue || ''


            if (typeof attrs.ngSearch == 'undefined') {
                $scope.showSearch = false;
            } else {
                $scope.showSearch = true;
            }


            let input = $(element).find('input');
            let popup = $(element).find('popup');
            let search = $(element).find('.search');

            $(popup).hide();

            $(input).focus(() => {
                $('popup').hide();
                $(popup).show();
                $(popup).focus();
            });

            $scope.hide = function () {
                $(popup).hide();
            }

            $scope.getValue = function (item) {
                let v = isite.getValue(item, $scope.display);
                return v || ''
            };


            $scope.getValue2 = function (item) {
                if ($scope.display2) {
                    return $scope.space + isite.getValue(item, $scope.display2)|| '';
                }
                return '';
            };

            $scope.getNgModelValue = function (ngModel) {
                if (ngModel && $scope.display && $scope.ngValue) {
                    return isite.getValue(ngModel, $scope.display.replace($scope.ngValue + '.' , ''))|| '';
                }else if (ngModel && $scope.display) {
                    return isite.getValue(ngModel, $scope.display)|| '';
                }
                return '';
            };

            $scope.getNgModelValue2 = function (ngModel) {
                if (ngModel && $scope.display2 && $scope.ngValue) {
                    return isite.getValue(ngModel, $scope.display2.replace($scope.ngValue + '.' , '')) || '';
                }else if (ngModel && $scope.display2) {
                    return isite.getValue(ngModel, $scope.display2) || '';
                }
                return '';
            };

            $scope.getNgValue = function (item) {
                if (item && $scope.ngValue) {
                    return isite.getValue(item, $scope.ngValue);
                }
                return item;
            };

            $scope.$watch('items', (items) => {
                input.val('');
                if (items && $scope.ngModel) {
                    items.forEach(item => {
                        if (isite.getValue(item , $scope.primary) === $scope.getNgModelValue($scope.ngModel)) {
                            input.val($scope.getValue(item) + $scope.getValue2(item));
                        }
                    });
                }
            });

            $scope.$watch('ngModel', (ngModel) => {
                input.val('');
                if (ngModel) {
                    $scope.ngModel = ngModel;
                    input.val($scope.getNgModelValue($scope.ngModel) + $scope.getNgModelValue2($scope.ngModel));
                }
            });

            $scope.updateModel = function (item) {
                $scope.ngModel = $scope.getNgValue(item, $scope.ngValue);
                input.val($scope.getNgModelValue($scope.ngModel) + $scope.getNgModelValue2($scope.ngModel));
                $(popup).hide();
                $(input).show();
                $timeout(() => {
                    $scope.ngChange();
                });
            };

        },
        template: `
        <div class="control">
            <label> {{label}} </label>
            <input v="{{v}}" class="full-width" ng-model="ngModel[display]" readonly>
            <popup>
            <div ng-show="showSearch" class="row search-box">
                <div class="col2 center pointer" ng-click="hide()">
                    <i class="fa fa-times center"></i>
                </div>
                <div class="col8">
                    <input class="full-width search" ng-model="ngSearch" >
                </div>
                <div class="col2 center">
                    <i class="fa fa-search center"></i>
                </div>
            </div>
                <item  ng-repeat="item in items | filter:ngSearch"" ng-click="updateModel(item)">
                    {{getValue(item)}} <small> {{getValue2(item)}} </small>
                </item>
            </popup>
        </div>
        `
    };

});

app.directive('iChecklist', function ($interval) {

    return {
        restrict: 'E',
        required: 'ngModel',
        scope: {
            label: '@',
            primary: '@',
            display: '@',
            ngModel: '=',
            items: '=',
            like: '&'
        },
        link: function ($scope, element, attrs, ctrl) {
            attrs.primary = attrs.primary || 'id';

            $scope.selectedItems = [];

            $scope.$watch('ngModel', (ngModel) => {
                $scope.reload();
            });


            $scope.reload = function () {

                $scope.selectedItems = []

                if ($scope.ngModel) {

                    $scope.ngModel.forEach(mitem => {
                        $scope.selectedItems.push(mitem);
                    });

                    if ($scope.items) {
                        $scope.items.forEach(mitem => {
                            let exist = false
                            $scope.selectedItems.forEach(sitem => {
                                if (mitem[$scope.primary] === sitem[$scope.primary]) {
                                    exist = true
                                }
                            });
                            if (exist) {
                                mitem.$selected = true;
                            } else {
                                mitem.$selected = false;

                            }

                        });
                    }
                }
                if (!$scope.ngModel) {
                    $scope.selectedItems = [];
                    if ($scope.items) {
                        $scope.items.forEach(mitem => {
                            mitem.$selected = false;
                        });
                    }
                }
            }


            $scope.change = function (item) {

                if (item.$selected) {
                    let exsits = false;
                    $scope.selectedItems.forEach(sitem => {
                        if (sitem[$scope.primary] === item[$scope.primary]) {
                            exsits = true;
                        }
                    });
                    if (!exsits) {
                        $scope.selectedItems.push(item);
                    }
                } else {
                    $scope.selectedItems.forEach((sitem, index) => {
                        if (sitem[$scope.primary] === item[$scope.primary]) {
                            $scope.selectedItems.splice(index, 1)
                        }
                    });
                }

                console.log($scope.selectedItems);

                $scope.ngModel = $scope.selectedItems;

            }

        },
        template: `
       <div class="row padding check-list">
            <label class="title"> {{label}} </label>
            <div class="control" ng-repeat="item in items">
                <label class="checkbox" >
                    <span > {{item[display]}} </span>
                    <input type="checkbox" ng-model="item.$selected" ng-change="change(item)" >
                    <span class="checkmark"></span>
                </label>
            </div>
        </div>
        `
    };

});

app.directive('iRadiolist', function ($interval) {


    return {
        restrict: 'E',
        required: 'ngModel',
        scope: {
            label: '@',
            display: '@',
            ngModel: '=',
            items: '=',
        },
        link: function (scope, element, attrs) {

            scope.model = scope.ngModel

            scope.code = 'radio_' + Math.random();

            scope.change = function (item) {
                scope.ngModel = item
            }

            scope.isChecked = function (item) {
                if (item && scope.ngModel && scope.ngModel.id === item.id) {
                    return true;
                }
                return false;
            }
        },
        template: `
       <div class="row padding radio-list">
            <label class="title"> {{label}} </label>
            <div class="control" ng-repeat="item in items">
                <label class="radio" >
                    <span > {{item[display]}} </span>
                    <input name="{{code}}" type="radio" ng-model="model"  ng-checked="isChecked(item)" ng-click="change(item)" ng-change="change(item)" >
                    <span class="checkmark"></span>
                </label>
            </div>
        </div>
        `
    };

});

app.directive('iImage', function ($interval, isite) {

    return {
        restrict: 'E',
        required: 'ngModel',
        scope: {
            category: '@',
            ngModel: '=',
            ngClick: '&'
        },
        link: function (scope, element, attrs, ctrl) {
            scope.category = scope.category || 'default';

            let input = $(element).find('input')[0];
            let img = $(element).find('img')[0];
            let progress = $(element).find('progress')[0];
            $(progress).hide();

            if (attrs.view !== '') {
                img.addEventListener('click', function () {
                    input.click();
                });
            }

            input.addEventListener('change', function () {
                isite.uploadImage(this.files, {
                    category: scope.category
                }, (err, image_url, e) => {
                    if (e) {
                        $(progress).show();
                        progress.value = e.loaded;
                        progress.max = e.total;
                    }

                    if (image_url) {
                        scope.ngModel = image_url;
                    }

                });
            });


            scope.$watch('ngModel', (ngModel) => {
                if(ngModel){
                    img.setAttribute('src', ngModel);
                }
            });


        },
        template: `
        <form class="form text-center pointer">
            <input  class="hidden" type="file" name="file" />
            <img class="bg-white"  ng-src="{{ngModel}}" ngClick="ngClick()" onerror="this.src='/images/no.jpg'" />
            <progress class="row"></progress>
        </form>
        `
    };

});

app.directive('iFiles', function ($interval, isite) {

    return {
        restrict: 'E',
        required: 'ngModel',
        scope: {
            category: '@',
            label: '@',
            ngModel: '='
        },
        link: function (scope, element, attrs, ctrl) {
            if (attrs.view === '') {
                scope.viewOnly = true;
            }

            scope.category = scope.category || 'default';
            scope.id = Math.random().toString().replace('.', '_');
            scope.deleteFile = function (file) {
                isite.deleteFile(file, () => {
                    for (let i = 0; i < scope.ngModel.length; i++) {
                        let f = scope.ngModel[i];
                        if (f.url === file.url) {
                            scope.ngModel.splice(i, 1);
                            return;
                        }
                    }
                });
            };

            let setEvent = false;
            $interval(() => {

                if (setEvent) {
                    return;
                }

                if (attrs.view !== '') {
                    let btn = document.querySelector('#btn_' + scope.id);
                    if (btn) {
                        setEvent = true;
                        btn.addEventListener('click', function () {
                            document.querySelector('#input_' + scope.id).click();
                        });
                    }

                    let input = document.querySelector('#input_' + scope.id);
                    if (input) {
                        input.addEventListener('change', function () {
                            isite.uploadFile(this.files, {
                                category: scope.category
                            }, (err, file) => {
                                if (file) {
                                    if (typeof scope.ngModel === 'undefined') {
                                        scope.ngModel = [];
                                    }
                                    scope.ngModel.push(file)
                                }
                            });
                        });
                    }
                } else {
                    setEvent = true;
                }


            }, 500);



        },
        template: `
            <div class="files">
                <label> {{label}} </label>
                <form ng-if="viewOnly !== true" id="img_{{id}}" class="form text-center pointer">
                    <input id="input_{{id}}" class="hidden" type="file" name="file" />
                    <a id="btn_{{id}}" class="btn bg-green"> <i class="fa fa-upload white"></i> </a>
                </form>
                <div class="padding">
                    
                    <div class="row padding" ng-repeat="f in ngModel">
                         <h2> 
                            <a class="btn default bg-blue" href="{{f.url}}"> <i class="fa fa-2x fa-download white"></i> </a>
                            <a ng-if="viewOnly !== true" class="btn default bg-red" ng-click="deleteFile(f)"> <i class="fa fa-trash white"></i> </a>
                            <span>  {{f.name}} </span>
                         </h2>  
                    </div>
                </div>
            </div>
            
        `
    };

});


app.directive('iDrag', function ($document) {
    return function (scope, element, attr) {
        var startX = 0,
            startY = 0,
            x = 0,
            y = 0;

        element.css({
            position: 'relative',
        });

        element.on('mousedown', function (event) {
            event.preventDefault();
            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
        };

        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        };

    };
});