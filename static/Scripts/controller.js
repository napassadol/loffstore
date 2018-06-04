
"use strict";
(function () {



    /*************************************
       VALUE PRYCE
    *************************************/

    angular.module('app').controller('languagesCtrl', function ($scope) {
        $scope.money = 100;
        $scope.exchange = [{
            id: 1,
            label: "Dollar(US)",
            currencySymbol: "$",
            symbolPayPal:"USD",
            rate: 1
        }, {
            id: 2,
            label: "Sterling(GBP)",
            currencySymbol: "£",
            symbolPayPal: "GBP",
            rate: 0.702846
        }, {
            id: 3,
            label: "Euro(EU)",
            currencySymbol: "€",
            symbolPayPal: "EUR",
            rate: 0.885055
        }];

        $scope.selectCurrency = $scope.exchange[0];

        $scope.status = {
            isopen: false
        };
    });

    /*************************************
       SLIDER
    *************************************/

    angular.module('app').directive('owlcarousel', function () {

        var linker = function (scope, element, attr) {
            link: (scope, element, attr)
            $(element).owlCarousel({
                items:1,
                smartSpeed: 700,
                loop: true,
                nav:true,
                navText: ["", ""],
                rewindNav: true,
                autoplay: true

                // "singleItem:true" is a shortcut for:
                // items : 1, 
                // itemsDesktop : false,
                // itemsDesktopSmall : false,
                // itemsTablet: false,
                // itemsMobile : false
            });

        }

        return {
            restrict: "A",
            link: linker
        }

    });

    /*************************************
       MENU CATEGORIES
    *************************************/
    angular.module('app').controller('topCategoriesMenuCtrl', function ($scope, services) {

        services.getCategories().then(function (data) {

            var topCategories = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].top_category == "1") {
                    topCategories.push(data[i]);
                }
            }

            $scope.topCategories = topCategories;


            var newCategories = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].new_category == "1") {
                    newCategories.push(data[i]);
                }
            }

            $scope.newCategories = newCategories;

            var otherCategories = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].other_category == "1") {
                    otherCategories.push(data[i]);
                }
            }

            $scope.otherCategories = otherCategories;

        });
    });
    //filters the products by category from routeparama into url
    angular.module('app').controller('categorySingleCtrl', function ($scope, services, $routeParams) {

        if ($routeParams.categoryId != null) {

            var code = $routeParams.categoryId;
            var listProdCategories = [];
            /*** Get Prouct Details ***/

            services.getProducts().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].categoryId == code)
                        listProdCategories.push(data[i]);
                }
                $scope.categoryProduct = listProdCategories;
                
            });
        }

    });

    

    /*************************************
       TOP HOME OFFERS
    *************************************/

    angular.module('app').controller('listTopOffersCtrl', function ($scope, services) {

        services.getBlogArg().then(function (data) {
            $scope.offers_top = data.offers_home;
        });
    });

    /*************************************
       ELECTRO OFFERS
    *************************************/

    angular.module('app').controller('electroOffersCtrl', function ($scope, services) {

        services.getBlogArg().then(function (data) {
            $scope.offers_electro = data.offers_electro;
        });
    });

    /*************************************
       ELECTRO OFFERS
    *************************************/

    angular.module('app').controller('radioOffersCtrl', function ($scope, services) {

        services.getBlogArg().then(function (data) {
            $scope.offers_radio = data.offers_radio;
        });
    });

    /*************************************
       FEATURED PRODUCTS
    *************************************/

    angular.module('app').controller('listProductsFeaturedCtrl', function ($scope, services) {

        services.getProducts().then(function (data) {
            var featured = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].featured_active == "1") {
                    featured.push(data[i]);
                }
            }
            
            $scope.featured = featured;
        });
    });
    

    /*************************************
       PRODUCTS
    *************************************/


    angular.module('app').controller('listProductsCtrl', function ($rootScope,$scope, services, $filter) {


        services.getCategories().then(function (data) {
            $scope.categories = data;
        });


        services.getProducts().then(function (data) {
            $scope.products = data;
            $scope.limitProducts = 8;

            //Load more category N 5
            $scope.loadMore = function () {
                $scope.limitProducts += 5;
                $rootScope.$broadcast('init-mixitup');
            };

            $scope.totalProductsByCat = data.length;

            //Get Total Products by Category
            $scope.getTotal = function (catId) {
                var totalProd = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].categoryId == catId)
                        totalProd++;
                }
                return totalProd;
            }

            var offers = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].offers_active == "1") {
                    offers.push(data[i]);
                }
            }
            $scope.offers = offers;

            var best_seller = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].best_seller == "1") {
                    best_seller.push(data[i]);
                }
            }

            var featured_products = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].featured_products == "1") {
                    featured_products.push(data[i]);
                }
            }

            var onsale_products = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].onsale_products == "1") {
                    onsale_products.push(data[i]);
                }
            }

            var topRated_products = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].topRated_products == "1") {
                    topRated_products.push(data[i]);
                }
            }

            $scope.best_seller = best_seller;

            $scope.featured_products = featured_products;

            $scope.onsale_products = onsale_products;

            $scope.topRated_products = topRated_products;

            $rootScope.$broadcast('init-mixitup');
            

        });
        //filters the products by category when pass the categoryId
        $scope.getCategory = function (categoryId) {
            var result = [];
            try{
                if ($scope.categories.length > 0) {
                    for (var i = 0; i < $scope.categories.length; i++) {
                        if (categoryId === $scope.categories[i].id)
                            return $scope.categories[i].name;
                    }
                    
                }
                else {
                    services.getCategories().then(function (data) {
                        $scope.categories = data;
                    });

                }

                return '';
            }catch(e){

            }
            
        };

     
        //Filter Price Slider
        $scope.slider_translate = {
            minValue: 100,
            maxValue: 400,
            options: {
                ceil: 500,
                floor: 0,
                translate: function (value) {
                    return $scope.selectCurrency.currencySymbol + value;
                }
            }
        };

       
        $scope.search_price_prod = function (minValue, maxValue) {
            services.getProducts().then(function (data) {

                var products_price = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].price > minValue && data[i].price < maxValue) {
                        products_price.push(data[i]);
                    }
                }

                
                //setTimeout(function() {
                    $scope.products = products_price;
                    
                    $scope.$broadcast('init-mixitup');
                //}, 2000);
            });
        }

    });


    angular.module('app').controller('listBlogCtrl', function ($scope, services) {

        services.getBlogArg().then(function (data) {
            $scope.blog = data.offers_blog;
        });
    });

    //Management mixItUp for filter portfolio
    angular.module('app').directive('mixItUp', function ($timeout) {

        function link(scope, element, attrs) {
            
            scope.$on('init-mixitup', function (event) {
                
                    $timeout(function () {
                        
                        if ($(element).mixItUp('isLoaded')) {
                            $(element).mixItUp('destroy', true);
                            $(element).mixItUp();
                        }
                        else { $(element).mixItUp(); }
                        
                    }, 500);

            });

            //scope.$on('destroy-mixitup', function (event) {
            //    // console.log('[event] destroy-mixitup');
            //    $(element).mixItUp('destroy', true);
            //})
          
        }

        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;
    });

    /*************************************
       PROD DETAILS INFO
    *************************************/

    angular.module('app').controller('detailsCtrl', function ($scope, services, $routeParams, $window) {

        if ($routeParams.productId != null) {
            $window.scrollTo(0, 0);
            var code = $routeParams.productId;
            var detailsId = 0;

            /*** Get Prouct Details ***/

            services.getProducts().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == code) {
                        $scope.product = data[i];
                        detailsId = data[i].detailsId;
                    }
                }
            });
            
            services.getDetailsProducts().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == detailsId)
                        $scope.productDetails = data[i];
                }

            });
        }

    });

    /*************************************
       BLOG LIST
    *************************************/

    angular.module('app').controller('listBlogInfoCtrl', function ($scope, services) {

        services.getBlogInfo().then(function (data) {
            $scope.blogInfo = data.blog;
        });
    });

    /***Google Maps ***/

    angular.module('app').controller('mapCtrl', function ($scope, services, $timeout, uiGmapGoogleMapApi, uiGmapIsReady, $element) {
        //Charge first type of map
        $scope.data = {
            group1: 'night_map'
        };

        $scope.getMapsStyles = function () {

            services.getMapsStyles($scope.data.group1).then(function (data) {
                var uluru = { lat: data.marker.coords.latitude, lng: data.marker.coords.longitude };
                var map = new google.maps.Map(document.getElementById('map_canvas'), {
                    zoom: data.zoom,
                    center: { lat: data.center.latitude, lng: data.center.longitude },
                    mapTypeControl: true,
                    styles: data.styles

                });
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
            });

        }

        $scope.getMapsStyles();

        
    });


    /*************************************
       ORDER
    *************************************/

    angular.module('app').controller('cartOrderCtrl', function ($http, $scope, shoppingCart) {

        //Inizialize the cart, the cookie name is better be injected from the server....

        shoppingCart.init('productsCart');

        $scope.productsCart = shoppingCart.getAll();
        $scope.totalCount = shoppingCart.totalItems();
        $scope.totalPrice = shoppingCart.priceTotal();

        $scope.addProduct = function (item, quantity) {
            shoppingCart.addItem(item, quantity);

            $scope.productsCart = shoppingCart.getAll();
            $scope.totalCount = shoppingCart.totalItems();
            $scope.totalPrice = shoppingCart.priceTotal();
        }

        $scope.removeProduct = function (index) {
            shoppingCart.removeItem(index);
            $scope.productsCart.splice(index, 1);
            $scope.totalCount = shoppingCart.totalItems();
            $scope.totalPrice = shoppingCart.priceTotal();
        }

        $scope.clearItems = function () {
            shoppingCart.clearItems();
            $scope.productsCart = [];
            console.log("clear", $scope.productsCart);
            $scope.totalCount = '0';
            $scope.totalPrice = '0.00';
        }

        $scope.updateQuantity = function (index, quantity) {
            shoppingCart.updateQuantity(index, quantity);
            $scope.productsCart.splice(index, 1);
            $scope.totalCount = shoppingCart.totalItems();
            $scope.totalPrice = shoppingCart.priceTotal();
        }
        //Method for payment with PayPal
        $scope.checkout = function (serviceName, selectCurrency) {
            
            shoppingCart.addCheckoutParameters("PayPal", "corsaro22-facilitator@tiscali.it");
            shoppingCart.checkout(serviceName, selectCurrency);
        }

    });

    /*************************************
       SEND ORDER WITH EMAIL
    *************************************/

    angular.module('app').controller('showFormController', function ($scope) {
        $scope.animate = false;
        $scope.play = function () {
            $scope.animate = !$scope.animate;
        }
    });

    angular.module('app').controller('postController', function ($scope, $http, shoppingCart) {
        $scope.result = 'hidden'
        $scope.resultMessage;
        $scope.formData; //formData is an object holding the name, email, subject, and message
        $scope.submitButtonDisabled = false;
        $scope.submitted = false; //used so that form errors are shown only after the form has been submitted

        
        $scope.submitForm = function (contactform) {
            $scope.submitted = true;
            $scope.submitButtonDisabled = true;

            //Take currency value and rate
            var currency = $scope.selectCurrency.currencySymbol;
            var rate = $scope.selectCurrency.rate;

            var myCart = shoppingCart.getAll();

            

            if (myCart.length != 0) {

                if (contactform.$valid) {

                    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

                    var items = [];


                    var fd = new FormData();


                    for (var i = 0; i < myCart.length; i++) {

                        var item = myCart[i];

                        fd.append('file' + i, myCart[i].title);
                        items.push({ title: item.title, quantity: item.quantity, price: currency + "" + (item.price * rate).toFixed(2) });
                    }
                    //console.log("Cart", currency);
                    var totalPrice = currency + "" + (shoppingCart.priceTotal() * rate).toFixed(2);
                    var totalCount = shoppingCart.totalItems();

                    var totalData = [];

                    var fData = $scope.formData;

                    totalData.push({ fData: fData, items: items, totalCount: totalCount, totalPrice: totalPrice });

                    $http.post('clone.php', JSON.stringify(totalData)).success(function () {

                        //console.log("FormDta", totalData);

                    }).success(function (data, status) {

                        if (status == 200) { //success comes from the return json object
                            $scope.submitButtonDisabled = true;
                            $scope.resultMessage = "Thanks for your order";
                            $scope.result = 'bg-success';
                        } else {
                            $scope.submitButtonDisabled = false;
                            $scope.resultMessage = "Your order it s Failed";
                            $scope.result = 'bg-danger';
                        }
                    });

                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = 'Failed :( Please fill out all the fields.';
                    $scope.result = 'bg-danger';
                }
            }
            else {
                $scope.submitButtonDisabled = false;
                $scope.resultMessage = 'Failed :( Need to select products.';
                $scope.result = 'bg-danger';
            }
        }

        $scope.countries = [
        { name: 'Afghanistan', code: 'AF' },
        { name: 'Aland Islands', code: 'AX' },
        { name: 'Albania', code: 'AL' },
        { name: 'Algeria', code: 'DZ' },
        { name: 'American Samoa', code: 'AS' },
        { name: 'Andorra', code: 'AD' },
        { name: 'Angola', code: 'AO' },
        { name: 'Anguilla', code: 'AI' },
        { name: 'Antarctica', code: 'AQ' },
        { name: 'Antigua and Barbuda', code: 'AG' },
        { name: 'Argentina', code: 'AR' },
        { name: 'Armenia', code: 'AM' },
        { name: 'Aruba', code: 'AW' },
        { name: 'Australia', code: 'AU' },
        { name: 'Austria', code: 'AT' },
        { name: 'Azerbaijan', code: 'AZ' },
        { name: 'Bahamas', code: 'BS' },
        { name: 'Bahrain', code: 'BH' },
        { name: 'Bangladesh', code: 'BD' },
        { name: 'Barbados', code: 'BB' },
        { name: 'Belarus', code: 'BY' },
        { name: 'Belgium', code: 'BE' },
        { name: 'Belize', code: 'BZ' },
        { name: 'Benin', code: 'BJ' },
        { name: 'Bermuda', code: 'BM' },
        { name: 'Bhutan', code: 'BT' },
        { name: 'Bolivia', code: 'BO' },
        { name: 'Bosnia and Herzegovina', code: 'BA' },
        { name: 'Botswana', code: 'BW' },
        { name: 'Bouvet Island', code: 'BV' },
        { name: 'Brazil', code: 'BR' },
        { name: 'British Indian Ocean Territory', code: 'IO' },
        { name: 'Brunei Darussalam', code: 'BN' },
        { name: 'Bulgaria', code: 'BG' },
        { name: 'Burkina Faso', code: 'BF' },
        { name: 'Burundi', code: 'BI' },
        { name: 'Cambodia', code: 'KH' },
        { name: 'Cameroon', code: 'CM' },
        { name: 'Canada', code: 'CA' },
        { name: 'Cape Verde', code: 'CV' },
        { name: 'Cayman Islands', code: 'KY' },
        { name: 'Central African Republic', code: 'CF' },
        { name: 'Chad', code: 'TD' },
        { name: 'Chile', code: 'CL' },
        { name: 'China', code: 'CN' },
        { name: 'Christmas Island', code: 'CX' },
        { name: 'Cocos (Keeling) Islands', code: 'CC' },
        { name: 'Colombia', code: 'CO' },
        { name: 'Comoros', code: 'KM' },
        { name: 'Congo', code: 'CG' },
        { name: 'Congo, The Democratic Republic of the', code: 'CD' },
        { name: 'Cook Islands', code: 'CK' },
        { name: 'Costa Rica', code: 'CR' },
        { name: 'Cote D\'Ivoire', code: 'CI' },
        { name: 'Croatia', code: 'HR' },
        { name: 'Cuba', code: 'CU' },
        { name: 'Cyprus', code: 'CY' },
        { name: 'Czech Republic', code: 'CZ' },
        { name: 'Denmark', code: 'DK' },
        { name: 'Djibouti', code: 'DJ' },
        { name: 'Dominica', code: 'DM' },
        { name: 'Dominican Republic', code: 'DO' },
        { name: 'Ecuador', code: 'EC' },
        { name: 'Egypt', code: 'EG' },
        { name: 'El Salvador', code: 'SV' },
        { name: 'Equatorial Guinea', code: 'GQ' },
        { name: 'Eritrea', code: 'ER' },
        { name: 'Estonia', code: 'EE' },
        { name: 'Ethiopia', code: 'ET' },
        { name: 'Falkland Islands (Malvinas)', code: 'FK' },
        { name: 'Faroe Islands', code: 'FO' },
        { name: 'Fiji', code: 'FJ' },
        { name: 'Finland', code: 'FI' },
        { name: 'France', code: 'FR' },
        { name: 'French Guiana', code: 'GF' },
        { name: 'French Polynesia', code: 'PF' },
        { name: 'French Southern Territories', code: 'TF' },
        { name: 'Gabon', code: 'GA' },
        { name: 'Gambia', code: 'GM' },
        { name: 'Georgia', code: 'GE' },
        { name: 'Germany', code: 'DE' },
        { name: 'Ghana', code: 'GH' },
        { name: 'Gibraltar', code: 'GI' },
        { name: 'Greece', code: 'GR' },
        { name: 'Greenland', code: 'GL' },
        { name: 'Grenada', code: 'GD' },
        { name: 'Guadeloupe', code: 'GP' },
        { name: 'Guam', code: 'GU' },
        { name: 'Guatemala', code: 'GT' },
        { name: 'Guernsey', code: 'GG' },
        { name: 'Guinea', code: 'GN' },
        { name: 'Guinea-Bissau', code: 'GW' },
        { name: 'Guyana', code: 'GY' },
        { name: 'Haiti', code: 'HT' },
        { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
        { name: 'Holy See (Vatican City State)', code: 'VA' },
        { name: 'Honduras', code: 'HN' },
        { name: 'Hong Kong', code: 'HK' },
        { name: 'Hungary', code: 'HU' },
        { name: 'Iceland', code: 'IS' },
        { name: 'India', code: 'IN' },
        { name: 'Indonesia', code: 'ID' },
        { name: 'Iran, Islamic Republic Of', code: 'IR' },
        { name: 'Iraq', code: 'IQ' },
        { name: 'Ireland', code: 'IE' },
        { name: 'Isle of Man', code: 'IM' },
        { name: 'Israel', code: 'IL' },
        { name: 'Italy', code: 'IT' },
        { name: 'Jamaica', code: 'JM' },
        { name: 'Japan', code: 'JP' },
        { name: 'Jersey', code: 'JE' },
        { name: 'Jordan', code: 'JO' },
        { name: 'Kazakhstan', code: 'KZ' },
        { name: 'Kenya', code: 'KE' },
        { name: 'Kiribati', code: 'KI' },
        { name: 'Korea, Democratic People\'s Republic of', code: 'KP' },
        { name: 'Korea, Republic of', code: 'KR' },
        { name: 'Kuwait', code: 'KW' },
        { name: 'Kyrgyzstan', code: 'KG' },
        { name: 'Lao People\'s Democratic Republic', code: 'LA' },
        { name: 'Latvia', code: 'LV' },
        { name: 'Lebanon', code: 'LB' },
        { name: 'Lesotho', code: 'LS' },
        { name: 'Liberia', code: 'LR' },
        { name: 'Libyan Arab Jamahiriya', code: 'LY' },
        { name: 'Liechtenstein', code: 'LI' },
        { name: 'Lithuania', code: 'LT' },
        { name: 'Luxembourg', code: 'LU' },
        { name: 'Macao', code: 'MO' },
        { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
        { name: 'Madagascar', code: 'MG' },
        { name: 'Malawi', code: 'MW' },
        { name: 'Malaysia', code: 'MY' },
        { name: 'Maldives', code: 'MV' },
        { name: 'Mali', code: 'ML' },
        { name: 'Malta', code: 'MT' },
        { name: 'Marshall Islands', code: 'MH' },
        { name: 'Martinique', code: 'MQ' },
        { name: 'Mauritania', code: 'MR' },
        { name: 'Mauritius', code: 'MU' },
        { name: 'Mayotte', code: 'YT' },
        { name: 'Mexico', code: 'MX' },
        { name: 'Micronesia, Federated States of', code: 'FM' },
        { name: 'Moldova, Republic of', code: 'MD' },
        { name: 'Monaco', code: 'MC' },
        { name: 'Mongolia', code: 'MN' },
        { name: 'Montserrat', code: 'MS' },
        { name: 'Morocco', code: 'MA' },
        { name: 'Mozambique', code: 'MZ' },
        { name: 'Myanmar', code: 'MM' },
        { name: 'Namibia', code: 'NA' },
        { name: 'Nauru', code: 'NR' },
        { name: 'Nepal', code: 'NP' },
        { name: 'Netherlands', code: 'NL' },
        { name: 'Netherlands Antilles', code: 'AN' },
        { name: 'New Caledonia', code: 'NC' },
        { name: 'New Zealand', code: 'NZ' },
        { name: 'Nicaragua', code: 'NI' },
        { name: 'Niger', code: 'NE' },
        { name: 'Nigeria', code: 'NG' },
        { name: 'Niue', code: 'NU' },
        { name: 'Norfolk Island', code: 'NF' },
        { name: 'Northern Mariana Islands', code: 'MP' },
        { name: 'Norway', code: 'NO' },
        { name: 'Oman', code: 'OM' },
        { name: 'Pakistan', code: 'PK' },
        { name: 'Palau', code: 'PW' },
        { name: 'Palestinian Territory, Occupied', code: 'PS' },
        { name: 'Panama', code: 'PA' },
        { name: 'Papua New Guinea', code: 'PG' },
        { name: 'Paraguay', code: 'PY' },
        { name: 'Peru', code: 'PE' },
        { name: 'Philippines', code: 'PH' },
        { name: 'Pitcairn', code: 'PN' },
        { name: 'Poland', code: 'PL' },
        { name: 'Portugal', code: 'PT' },
        { name: 'Puerto Rico', code: 'PR' },
        { name: 'Qatar', code: 'QA' },
        { name: 'Reunion', code: 'RE' },
        { name: 'Romania', code: 'RO' },
        { name: 'Russian Federation', code: 'RU' },
        { name: 'Rwanda', code: 'RW' },
        { name: 'Saint Helena', code: 'SH' },
        { name: 'Saint Kitts and Nevis', code: 'KN' },
        { name: 'Saint Lucia', code: 'LC' },
        { name: 'Saint Pierre and Miquelon', code: 'PM' },
        { name: 'Saint Vincent and the Grenadines', code: 'VC' },
        { name: 'Samoa', code: 'WS' },
        { name: 'San Marino', code: 'SM' },
        { name: 'Sao Tome and Principe', code: 'ST' },
        { name: 'Saudi Arabia', code: 'SA' },
        { name: 'Senegal', code: 'SN' },
        { name: 'Serbia and Montenegro', code: 'CS' },
        { name: 'Seychelles', code: 'SC' },
        { name: 'Sierra Leone', code: 'SL' },
        { name: 'Singapore', code: 'SG' },
        { name: 'Slovakia', code: 'SK' },
        { name: 'Slovenia', code: 'SI' },
        { name: 'Solomon Islands', code: 'SB' },
        { name: 'Somalia', code: 'SO' },
        { name: 'South Africa', code: 'ZA' },
        { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
        { name: 'Spain', code: 'ES' },
        { name: 'Sri Lanka', code: 'LK' },
        { name: 'Sudan', code: 'SD' },
        { name: 'Suriname', code: 'SR' },
        { name: 'Svalbard and Jan Mayen', code: 'SJ' },
        { name: 'Swaziland', code: 'SZ' },
        { name: 'Sweden', code: 'SE' },
        { name: 'Switzerland', code: 'CH' },
        { name: 'Syrian Arab Republic', code: 'SY' },
        { name: 'Taiwan, Province of China', code: 'TW' },
        { name: 'Tajikistan', code: 'TJ' },
        { name: 'Tanzania, United Republic of', code: 'TZ' },
        { name: 'Thailand', code: 'TH' },
        { name: 'Timor-Leste', code: 'TL' },
        { name: 'Togo', code: 'TG' },
        { name: 'Tokelau', code: 'TK' },
        { name: 'Tonga', code: 'TO' },
        { name: 'Trinidad and Tobago', code: 'TT' },
        { name: 'Tunisia', code: 'TN' },
        { name: 'Turkey', code: 'TR' },
        { name: 'Turkmenistan', code: 'TM' },
        { name: 'Turks and Caicos Islands', code: 'TC' },
        { name: 'Tuvalu', code: 'TV' },
        { name: 'Uganda', code: 'UG' },
        { name: 'Ukraine', code: 'UA' },
        { name: 'United Arab Emirates', code: 'AE' },
        { name: 'United Kingdom', code: 'GB' },
        { name: 'United States', code: 'US' },
        { name: 'United States Minor Outlying Islands', code: 'UM' },
        { name: 'Uruguay', code: 'UY' },
        { name: 'Uzbekistan', code: 'UZ' },
        { name: 'Vanuatu', code: 'VU' },
        { name: 'Venezuela', code: 'VE' },
        { name: 'Vietnam', code: 'VN' },
        { name: 'Virgin Islands, British', code: 'VG' },
        { name: 'Virgin Islands, U.S.', code: 'VI' },
        { name: 'Wallis and Futuna', code: 'WF' },
        { name: 'Western Sahara', code: 'EH' },
        { name: 'Yemen', code: 'YE' },
        { name: 'Zambia', code: 'ZM' },
        { name: 'Zimbabwe', code: 'ZW' }
        ];
    });


}());
