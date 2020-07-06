/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 * 
 * 
 * * This controller contain the controller of the header menu.
 * Controls the deploy of menus, image show, etc
 * 
 * This mean that if you change anything in the menu, now we have to duplicate this, becuase
 *  - mainCtrl -> for all pages except case study
 *  - caseStudyCtrl -> for Case study only, and case study contains the menu...
 *  
 * I will mark the "finish" of mainCtrl in this "caseStudyCtrl", so, when change is done, change have to be done in "mainCtrl" part.. 
 * 
 */
var miApp = angular.module( "miApp" , [] );
miApp.controller( 'mainCtrl' , ['$scope' , '$http', function( $scope , $http ){
        
        
    
    /*************** VARIABLES *****************/
    //oficial colors
    $scope.ttsmBlueColor = "#061f5c";
    $scope.ttsmGrayColor = "#969494";
    
    //letters styles
    $scope.productTittleStyle = "";
    
    //relative url
    $scope.relativeUrl = "";
    $scope.currentUrl = "";
    
    //email
    $scope.emailSuccessText = "INQUIRY SENT";
    
//    //languaje and page
//    $scope.languajeSelected = 0;
//    $scope.pageSelected = "";
    
//    //header BUTTONS
//    $scope.headerProductsButton = [];
//    $scope.headerServicesButton = [];
//    $scope.headerCorporateButton = [];
//    $scope.headerContactButton = [];
    
    //show/hide main menu
    $scope.showItem1 = false;
    $scope.showItem2 = false;
    $scope.showItem3 = false;
    $scope.showItem4 = false;
    $scope.showItem5 = false;
    $scope.showItem6 = false;
    $scope.showItem7 = false;
    $scope.showItem8 = false;
    
    //show/hide DESCRIPTION / TECHNICAL DATA / INQUIRY
    $scope.productsShowDescription = false;
    $scope.productsShowTechnicalData = false;
    $scope.productsShowInquiry = false;
    
    //src of <img> when selected a product
    $scope.productImageSelected = "";
    
    /*************** FUNCTIONS *****************/
    //clic on DESCRIPTION / TECHNICAL DATA / INQUIRY on PRODUCTS PAGE
    $scope.clicProductsShowDescription = function(){ 
        $scope.productsShowDescription = !$scope.productsShowDescription; 
        //$scope.productsShowTechnicalData = false;
        //$scope.productsShowInquiry = false;
    };
    $scope.clicProductsShowTechnicalData = function(){ 
        //$scope.productsShowDescription = false;
        $scope.productsShowTechnicalData = !$scope.productsShowTechnicalData; 
        //$scope.productsShowInquiry = false;
    };
    $scope.clicProductsShowInquiry = function(){ 
        //$scope.productsShowDescription = false;
        //$scope.productsShowTechnicalData = false;
        $scope.productsShowInquiry = !$scope.productsShowInquiry; 
    };
    
    //show/hide Products
    $scope.showSubMenu = function( menuParam ){
        switch( menuParam ){
            case 1:
                $scope.showItem1 = !$scope.showItem1;
                break;
            case 2:
                $scope.showItem2 = !$scope.showItem2;
                break;
            case 3:
                $scope.showItem3 = !$scope.showItem3;
                break;
            case 4:
                $scope.showItem4 = !$scope.showItem4;
                break;
            case 5:
                $scope.showItem5 = !$scope.showItem5;
                break;
            case 6:
                $scope.showItem6 = !$scope.showItem6;
                break;
            case 7:
                $scope.showItem7 = !$scope.showItem7;
                break;
            case 8:
                $scope.showItem8 = !$scope.showItem8;
                break;
        }
        
    };
    
    //clic on the thumb
    $scope.productChangeImage = function( page , number ){
        //V7M
        if( page === "vectoronV7M" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/vectoronV7M_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/vectoronV7M_2.jpg";
                    break;
                case 3:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/vectoronV7M_3.jpg";
                    break;
            }
        }
        //VME300M
        if( page === "vectoronVME300M" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/vectoronVME300M_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/vectoronVME300M_2.jpg";
                    break;
            }
        }
        //V6MII
        if( page === "vectoronV6MII" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/vectoronV6MII_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/vectoronV6MII_2.jpg";
                    break;
                case 3:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/vectoronV6MII_3.jpg";
                    break;
            }
        }
        //V6C
        if( page === "vectoronV6C" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/vectoronV6C_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/vectoronV6C_2.jpg";
                    break;
            }
        }
        //Leica AT960
        if( page === "leicaAT960" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/laser/leicaAbsoluteTrackerAt960_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/laser/leicaAbsoluteTrackerAt960_2.jpg";
                    break;
                case 3:
                    $scope.productImageSelected = "../../../images/pages/products/laser/leicaAbsoluteTrackerAt960_3.jpg";
                    break;
            }
        }
        
        //Leica ATS600
        if( page === "leicaATS600" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/laser/leicaAbsoluteTrackerAts600_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/laser/leicaAbsoluteTrackerAts600_2.jpg";
                    break;
            }
        }
        
        //Master Eye
        if( page === "masterEye" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/others/masterEye_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/others/masterEye_2.jpg";
                    break;
            }
        }
        
        //GAP Ninja
        if( page === "gapNinja" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/others/gapNinja_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/others/gapNinja_2.jpg";
                    break;
            }
        }
        //DPA System
        if( page === "dpaSystem" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/others/dpaSystem_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/others/dpaSystem_2.jpg";
                    break;
                case 3:
                    $scope.productImageSelected = "../../../images/pages/products/others/dpaSystem_3.jpg";
                    break;
            }
        }
        
        //COMET Automated
        if( page === "cometAutomated" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/robot/cometAutomated_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/robot/cometAutomated_2.jpg";
                    break;
            }
        }
        
        //Master Eye Robot System
        if( page === "masterEyeRobotSystem" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/robot/masterEyeRobotSystem_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/robot/masterEyeRobotSystem_2.jpg";
                    break;
                case 3:
                    $scope.productImageSelected = "../../../images/pages/products/robot/masterEyeRobotSystem_3.jpg";
                    break;
            }
        }
        
        //ABIS II System
        if( page === "abisIISystem" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/robot/abisIISystem_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/robot/abisIISystem_2.jpg";
                    break;
                case 3:
                    $scope.productImageSelected = "../../../images/pages/products/robot/abisIISystem_3.jpg";
                    break;
            }
        }
        
        //Leica Robot System
        if( page === "leicaRobotSystem" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/robot/leicaRobotSystem_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/robot/leicaRobotSystem_2.jpg";
                    break;
                case 3:
                    $scope.productImageSelected = "../../../images/pages/products/robot/leicaRobotSystem_3.jpg";
                    break;
            }
        }
        
        //ApiScan
        if( page === "apiScan" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/apiScan_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/apiScan_2.jpg";
                    break;
                case 3:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/apiScan_3.jpg";
                    break;
                case 4:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/apiScan_4.jpg";
                    break;
            }
        }
        
        //Raptor Eye
        if( page === "raptorEye" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/raptorEye_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/raptorEye_2.jpg";
                    break;
            }
        }
        
        //Raptor Eye 2
        if( page === "raptorEye2" ){
            switch( number ){
                case 1:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/raptorEye2_1.jpg";
                    break;
                case 2:
                    $scope.productImageSelected = "../../../images/pages/products/vectoron/raptorEye2_2.jpg";
                    break;
            }
        }
        
    };
    
    //create <a> element to change url from "xxx/ES_xxxx.xxxx" to "xxx/EN_xxxx.xxxx" or viceversa
    $scope.changeLanguajeByUrl = function( param ){
        var currentUrl = window.location.href + "";
        var a = document.createElement("a");
        if( param == "ES" ){
            currentUrl = currentUrl.replace("EN_", "ES_");
        }else{
            currentUrl = currentUrl.replace("ES_", "EN_");
        }
        a.href = currentUrl;
        a.click();
        
    }
    
    //check current URL, ?mail=ok means e-mail success sended
    $scope.getCurrentUrl = function(){
        $scope.currentUrl = window.location.href;
        
        if( $scope.currentUrl.indexOf( "?mail=ok" ) !== -1 ){
            swal( {
                text: $scope.emailSuccessText,
                icon: "success"
            } );
        }
        
        if( $scope.currentUrl.indexOf( "?" ) !== -1 )
            $scope.currentUrl = $scope.currentUrl.substring( 0 , $scope.currentUrl.indexOf( "?" ) );
    } 
    
    //
    $scope.showModal = function(){
        $('#myModal').modal('show');
    };
    
        /*
     ************************************************************************** 
     * mainCtrl finishi here
     * ************************************************************************
     */
    
    
    /*
     * caseStudyCtrl from here...
     */
    
    /********** VARIABLES **********/
    $scope.productCategorySelected = 0;
    $scope.productCategoryArray = [
        { id : 0 , name : "ALL" },
        { id : 1 , name : "Vectoron" },
        { id : 2 , name : "Comet" },
        { id : 3 , name : "Leica Laser Tracker" },
        { id : 4 , name : "spScan" },
        { id : 5 , name : "DPA System" }
    ];
    /*
     * 0 = Y-TEC
     * 1 = Rinnai Corporation
     * 2 = Tanaka
     * 3 = Por definir
     */
    $scope.caseStudyMenuStyle = [ 
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];
    
    
    /********** FUNCTIONS **********/
    //
    $scope.goToCaseStudy = function( caseSelected ){
        if( ( caseSelected == "EN_caseStudy" ) || ( caseSelected == "ES_caseStudy" ) ){
            window.location.href = $scope.relativeUrl + caseSelected + '.html';
        }else{
            window.location.href = $scope.relativeUrl + 'html/caseStudy/' + caseSelected + '.html';
        }
    }
    
    //
    $scope.setCaseStudySelected = function( caseStudySelected ){
        var styleSelected = "background-color : " + $scope.ttsmBlueColor + " ; color : white; ";
        $scope.caseStudyMenuStyle[ caseStudySelected ] = styleSelected;
    }
    
	    /*
     ************************************************************************** 
     * Solutions from here...
     * ************************************************************************
     */
    
    /********** VARIABLES **********/
    $scope.solutionIndustryArray = [
        { id : 0 , name : "ALL" },
        { id : 1 , name : "Automobiles" },
        { id : 2 , name : "Aerospace" },
        { id : 3 , name : "Heavy Industries / Energy" },
        { id : 4 , name : "Vehicles / Agriculture / Railways" },
        { id : 5 , name : "Construction / Steel / Engineering" },
        { id : 6 , name : "Casting and forging" },
        { id : 7 , name : "Machine manufacturing / Robot" },
        { id : 8 , name : "IT / Home appliances" },
        { id : 9 , name : "Other" }
    ];
    $scope.solutionIndustrySelected = "";
    
    $scope.solutionIndustryShowSolution = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ];
    
    /********** FUNCTIONS **********/
    //
    $scope.goToSolution = function( solutionSelected ){
        if( ( solutionSelected == "EN_solutions" ) || ( solutionSelected == "ES_solutions" ) ){
            window.location.href = $scope.relativeUrl + solutionSelected + '.html';
        }else{
            window.location.href = $scope.relativeUrl + 'html/solutions/' + solutionSelected + '.html';
        }
    }
    
    /*************************
     * 
     * FORM TO DOWNLOAD A BROCHURE
     * 
     ***************************/
    
    /***** VARIABLES ******/
    $scope.brochureToDownload = "";
    var emailServiceUrl = "http://www.ttsm.com.mx/php/sendEmailBrochureDownloadRequest.php";
    
    //Brochure location
    $scope.brochureLocationFolder = "../../../brochures/";
    
    //formulario
    $scope.brochureFormData = {
        name : "",
        company : "",
        email : "",
        phone : "",
        comment : "",
        downloadPurposeA : false,
        downloadPurposeB : false,
        downloadPurposeC : false,
        downloadPurposeD : false,
        whereDidYouFindUs : "",
        whereDidYouFindUsOthers : "",
        product : ""
    };
   
    /***** FUNCIONES ******/
    //
    $scope.showDownloadBrochureForm = function(){
        $('#modalDownloadBrochure').modal('show');
    }
    
    //
    $scope.isBrochureRequestDataOk = function(){
        var returnData = true;
        
        returnData = 
                $scope.brochureFormData.downloadPurposeA 
                || $scope.brochureFormData.downloadPurposeB 
                || $scope.brochureFormData.downloadPurposeC 
                || $scope.brochureFormData.downloadPurposeD;
        
        if( $scope.brochureFormData.name == "" ){ returnData = false; }
        if( $scope.brochureFormData.company == "" ){ returnData = false; }
        if( $scope.brochureFormData.email == "" ){ returnData = false; }
        if( $scope.brochureFormData.phone == "" ){ returnData = false; }
        if( $scope.brochureFormData.whereDidYouFindUs == "" ){ returnData = false; }
        
        
        //if data is OK, convert downloadPurposeABCD and whereDidYouFindUs in the comment data
        if( returnData ){
            $scope.brochureFormData.comment = $scope.brochureDataFromOptionsToComment();
        }
        
        return returnData;
    }
    
    //
    $scope.brochureDataFromOptionsToComment = function(){
        var returnData = "Is interested because ";
        
        if( $scope.brochureFormData.downloadPurposeA ){ returnData = returnData + " is Currently using similar product,"; }
        if( $scope.brochureFormData.downloadPurposeB ){ returnData = returnData + " is Considering the product,"; }
        if( $scope.brochureFormData.downloadPurposeC ){ returnData = returnData + " is Considering to purchase the product soon,"; }
        if( $scope.brochureFormData.downloadPurposeD ){ returnData = returnData + " is Information gathering,"; }
        
        if( $scope.brochureFormData.whereDidYouFindUs == "Others" ){
            returnData = returnData + " found us by 'Others' media: " + $scope.brochureFormData.whereDidYouFindUsOthers ;
        }else{
            returnData = returnData + " found us by this media: " + $scope.brochureFormData.whereDidYouFindUs ;
        }
        return returnData;
    }
    
    //clic on Download Brochure after complete the form
    $scope.clicDownloadBrochure = function(){
        
        if( $scope.isBrochureRequestDataOk() ){
            var ahref = "";
            var a = document.createElement("a");

            //product brochure wanted to download
            if( $scope.brochureToDownload == "V7M" ){ ahref = $scope.brochureLocationFolder + "VAR700M Brochure EN.pdf"; }
            if( $scope.brochureToDownload == "V6M" ){ ahref = $scope.brochureLocationFolder + "VAR600 Brochure EN.pdf"; }
            if( $scope.brochureToDownload == "LM" ){ ahref = $scope.brochureLocationFolder + "LM Brochure EN.pdf"; }
            if( $scope.brochureToDownload == "LEICA" ){ ahref = $scope.brochureLocationFolder + "LEICA Brochure EN.pdf"; }
            if( $scope.brochureToDownload == "LEICA-ATS600" ){ ahref = $scope.brochureLocationFolder + "LEICA ATS600 Brochure EN.pdf"; }
            if( $scope.brochureToDownload == "COMET" ){ ahref = $scope.brochureLocationFolder + "COMET Brochure EN.pdf"; }
            if( $scope.brochureToDownload == "GAPNINJA" ){ ahref = $scope.brochureLocationFolder + "GAPNINJA Brochure EN.pdf"; }
            if( $scope.brochureToDownload == "MEZ" ){ ahref = $scope.brochureLocationFolder + "MEZ Brochure EN.pdf"; }

            //
            if( ahref != "" ){
                //send email to TTS informing about the downloaded brochure
                $scope.sendEmailBrochureDownload();

                //download brochure
                a.href = ahref;
                a.setAttribute( "download" , $scope.brochureToDownload + " Brochure.pdf" );
                a.click();
                $('#modalDownloadBrochure').modal('hide');
                swal( { icon : "success" , "text" : "Thanks for download brochure, if there is a problem, please contact to 'Technical Support'" } );
            }
        }else{
            swal( { icon : "error" , "text" : "Please fill required fields" } );
        }
    }
    
    //
    $scope.sendEmailBrochureDownload = function(){
        $scope.brochureFormData.product = "" + $scope.brochureToDownload;
        $http({
            url: emailServiceUrl,
            method: "POST",
            data : $scope.brochureFormData
        })
        .then(function(response) {
        }, 
        function(response) { // optional
        });
    }
    
    /******************************
     * END BROCHURE DOWNLOAD
     *******************************/
    
        /******************************
     * 
     * WEBINAR REGISTRATION
     * 
     *******************************/
    
    /*********** Variables ***********/
    //formulario
    $scope.webinarFormData = {
        name : "",
        company : "",
        department : "",
        role : "",
        email : "",
        phone : ""
    };
    
    $scope.registerButtonDisabled = false;
    
    //
    var emailWebinarServiceUrl = "http://www.ttsm.com.mx/php/sendEmailWebinarRegistrationRequest.php";
    //var emailWebinarServiceUrl = "http://localhost/ttsm_com_mx/php/sendEmailWebinarRegistrationRequest.php";
    
    /*********** Funciones ***********/
    //
    $scope.showWebinarRegistrationForm = function(){
        $('#modalWebinarRegistration').modal('show');
    }
    
    //clic on Download Brochure after complete the form
    $scope.clicRegisterToWebinar = function(){
        //checar datos OK
        
        //evitar dos clics
        $scope.registerButtonDisabled = true;
        
        
        //mandar correo
        $scope.sendEmailWebinarRegistration();
    }
    
    //
    $scope.sendEmailWebinarRegistration = function(){
        $http({
            url: emailWebinarServiceUrl,
            method: "POST",
            data : $scope.webinarFormData
        })
        .then(function(response) {
            $('#modalWebinarRegistration').modal('hide');
            swal( { icon : "success" , "text" : "REGISTRO EXITOSO" } );
            $scope.cleanWebinarDataForm();
            $scope.registerButtonDisabled = false;
        }, 
        function(response) { // optional
            $('#modalWebinarRegistration').modal('hide');
            swal( { icon : "error" , "text" : "REGISTER FAIL, Try again later'" } );
            $scope.registerButtonDisabled = false;
        });
    }
    
    //
    $scope.cleanWebinarDataForm = function(){
        $scope.webinarFormData.name = "";
        $scope.webinarFormData.company = "";
        $scope.webinarFormData.department = "";
        $scope.webinarFormData.role = "";
        $scope.webinarFormData.email = "";
        $scope.webinarFormData.phone = "";
    }
}]);