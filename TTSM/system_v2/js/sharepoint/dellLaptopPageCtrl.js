/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'dellLaptopPageCtrl'  ,['$scope' , '$http' , '$window', function( $scope , $http , $window ){
    /*********************************
     * VARIABLES
     ********************************/
    //Development
    $scope.showConsole = false;
    $scope.lastSearch = "";
    
    //URL
    var dellLaptopServiceUrl = serviceUrl + "php/resources/catalogs/DellLaptopResource.php";
    $scope.relativeUrl = "../../";
    
    
    //oficial colors
    $scope.ttsmBlueColor = ttsmBlueColor ;
    $scope.ttsmGrayColor = ttsmGrayColor ; 
    
    //security
    $scope.user = "";
    $scope.token = "";
    
    //user screen
    $scope.userScreenHeight = "";
    
    /*
    //forms
    // for database
    $scope.dellLaptopDetail = {
        "id" : "--",
        "date" : "",
        "information" : ""
    };
    */
   
    /*
     * for local information
     */
    //standard information
    $scope.information = {
        "company" : "",
        "department" : "",
        "model" : "",
        "serviceTag" : "",
        "macAddress" : "",
        "gpu" : "",
        "gpuRam" : "",
        "resolution" : "",
        "cpu" : "",
        "ram" : "",
        "windows" : "",
        "primaryHdd" : "",
        "secondaryHdd" : "",
        "switchableGraphicSetting" : false,
        "energySetting" : false,
        "adminAccountSetting" : false,
        "ttsmFolder" : false,
        "checklist" : "",
        "comments" : ""
    };
    
    //if REGALIS
    $scope.informationREGALIS = {
        "vectoronSerialNumber" : "",
        "regalisVersion" : "",
        "regalisDongle" : "",
        "ipAddress" : false,
        "ttsmFolderRegalisInstaller" : false,
        "ttsmFoldertbLicense" : false,
        "ttsmFoldermlLicense" : false,
        "ttsmFolderArmParam" : false,
        "ttsmFolderScanParam" : false,
        "regalisInstalled" : false,
        "regalisInstalledTestedWithArm" : false,
        "excelTrustCenterSetting" : false
    };
    
    //if COMET
    $scope.informationFLARE = {
        "hiperThreadSetting" : false,
        "colin3DVersion" : "",
        "colin3DDongle" : "",
        "ttsmFolderColin3DInstaller" : false,
        "ttsmFolderColin3DKeyFile" : false,
        "ttsmFolderColin3DParam" : false,
        "colin3DInstalled" : false,
        "colin3DDriverPackInstalled" : false,
        "colin3DDriverPackIXXAT" : false,
        "colin3DDriverSVSVistek" : false,
        "ipAddress" : false,
        "ethernetAdvanceSetting" : false,
        "colin3DInstalledTestWithComet" : false
    };
    
    //if Other
    $scope.informationOther = {
        "softwareVersion" : "",
        "softwareDongle" : "",
        "ttsmFolderSoftwareInstaller" : false,
        "ttsmFolderSoftwareKeyfile" : false,
        "ttsmFolderSoftwareParam" : false,
        "softwareInstalled" : false,
        "ipAddress" : "",
        "softwareInstalledTestWithHardware" : false
    };
    
    //save as file
    $scope.informationError = "";
    
    
    //flags
    $scope.viewCompany = true;
    $scope.viewSpec = false;
    $scope.viewChecklist = false;
    
    //$scope.tableContent = [];
    $scope.checklistOptions = [ 
        { "name" : "Vectoron" },
        { "name" : "FLARE / COMET"},
        { "name" : "Other" }
    ];
    
    /*********************************
     * FUNCIONES
     ********************************/
    //cambiar VIEW Flags
    $scope.changeViewFlag = function( param ){
        if( param == 1 ){
            $scope.viewCompany = true;
            $scope.viewSpec = false;
            $scope.viewChecklist = false;
        }
        if( param == 2 ){
            $scope.viewCompany = false;
            $scope.viewSpec = true;
            $scope.viewChecklist = false;
        }
        if( param == 3 ){
            $scope.viewCompany = false;
            $scope.viewSpec = false;
            $scope.viewChecklist = true;
        }
    }
    
    //
    $scope.getUserScreenHeight = function(){
        //screen resolution
        $scope.userScreenHeight = $(document).height();
        $scope.userScreenHeight = $scope.userScreenHeight - 275;
        $scope.userScreenHeight = $scope.userScreenHeight + "px";
    };
        
    //
    $scope.getData = function(){
        $scope.getUserScreenHeight();
        $scope.tableContent = [];
        
        $('#myLoadingModal').modal('show'); 
        $http({
            url: controlPaseServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "ACCESS DENIED" } );
            }
            $scope.totalAmount = 0;
            for( var index in response.data ){
                $scope.tableContent[ index ] = response.data[ index ] ;
                $scope.totalAmount = $scope.totalAmount + parseInt( response.data[ index ].amount );
            }
            $('#myLoadingModal').modal('hide'); 
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //ACTUALIZAME
    $scope.updateOrSavePaseDetail = function(){
        if( $scope.isPaseDetailDataOk() ){
            $('#myLoadingModal').modal('show');
            $scope.showPleaseWaitMessage = true;
            $http({
                url: controlPaseServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
                method: "POST",
                data: $scope.paseDetail
            })
            .then(function(response) {
                $scope.updatePaseLocalData( response.data );
                $scope.showPleaseWaitMessage = false;
                if( response.data.includes( "INSERT" ) ){ 
                    swal( { text: "INSERT DONE", icon: "success" } );
                }else{
                    swal( { text: "UPDATE DONE", icon: "success" } );
                }
            }, 
            function(response) { // optional
                swal( { text: "FAIL", icon: "error" } );
                $scope.showPleaseWaitMessage = false;
                $('#myLoadingModal').modal('hide'); 
            });
        }
    };
    
    //checar que datos estan OK
    $scope.checkDataOk = function(){
        var returnData = true;
        var informacionFaltante = "";
        
        //information
        if( $scope.information.company == "" ){ informacionFaltante += "Company, "; returnData = false; }
        if( $scope.information.department == "" ){ informacionFaltante += "Department, "; returnData = false; }
        if( $scope.information.model == "" ){ informacionFaltante += "Model, "; returnData = false; }
        if( $scope.information.serviceTag == "" ){ informacionFaltante += "Service Tag, "; returnData = false; }
        if( $scope.information.macAddress == "" ){ informacionFaltante += "MAC Address, "; returnData = false; }
        if( $scope.information.gpu == "" ){ informacionFaltante += "Graphic Board (GPU), "; returnData = false; }
        if( $scope.information.gpuRam == "" ){ informacionFaltante += "GPU RAM, "; returnData = false; }
        if( $scope.information.resolution == "" ){ informacionFaltante += "Resolution, "; returnData = false; }
        if( $scope.information.cpu == "" ){ informacionFaltante += "CPU, "; returnData = false; }
        if( $scope.information.ram == "" ){ informacionFaltante += "RAM, "; returnData = false; }
        if( $scope.information.windows == "" ){ informacionFaltante += "Windows version, "; returnData = false; }
        if( $scope.information.primaryHdd == "" ){ informacionFaltante += "Primary HDD, "; returnData = false; }
        if( $scope.information.secondaryHdd == "" ){ informacionFaltante += "Secondary HDD, "; returnData = false; }
        if( !$scope.information.switchableGraphicSetting ){ informacionFaltante += "Set Switchable Graphic OFF, "; returnData = false; }
        if( !$scope.information.energySetting ){ informacionFaltante += "Set Energy Setting, "; returnData = false; }
        if( !$scope.information.adminAccountSetting ){ informacionFaltante += "Set Admin Account Setting, "; returnData = false; }
        if( !$scope.information.ttsmFolder ){ informacionFaltante += "Create TTSM Folder, "; returnData = false; }
        
        //Seleccionar un tipo de hardware Vectoron , FLARE / COMET u Other
        if( $scope.information.checklist == "" ){
            informacionFaltante += "Select HARDWARE, "; returnData = false; 
        }else{
            //Si se selecciono Vectoron
            if( $scope.information.checklist == "Vectoron" ){
                if( $scope.informationREGALIS.vectoronSerialNumber == "" ){ informacionFaltante += "Vectoron Serial number, "; returnData = false; }
                if( $scope.informationREGALIS.regalisVersion == "" ){ informacionFaltante += "REGALIS version, "; returnData = false; }
                if( $scope.informationREGALIS.regalisDongle == "" ){ informacionFaltante += "REGALIS Dongle, "; returnData = false; }
                if( !$scope.informationREGALIS.ipAddress ){ informacionFaltante += "Set IP Address, "; returnData = false; }
                if( !$scope.informationREGALIS.ttsmFolderRegalisInstaller ){ informacionFaltante += "Save REGALIS installer, "; returnData = false; }
                if( !$scope.informationREGALIS.ttsmFoldertbLicense ){ informacionFaltante += "Save tbLicense, "; returnData = false; }
                if( !$scope.informationREGALIS.ttsmFoldermlLicense ){ informacionFaltante += "Save mlLicense, "; returnData = false; }
                if( !$scope.informationREGALIS.ttsmFolderArmParam ){ informacionFaltante += "Save Arm Params, "; returnData = false; }
                if( !$scope.informationREGALIS.ttsmFolderScanParam ){ informacionFaltante += "Save Scan Params, "; returnData = false; }
                if( !$scope.informationREGALIS.regalisInstalled ){ informacionFaltante += "Install REGALIS, "; returnData = false; }
                if( !$scope.informationREGALIS.regalisInstalledTestedWithArm ){ informacionFaltante += "Test REGALIS connection with Vectoron, "; returnData = false; }
                if( !$scope.informationREGALIS.excelTrustCenterSetting ){ informacionFaltante += "Set EXCEL Trust Center for REPORT, "; returnData = false; }
            }
            
            //Si se selecciono FLARE / COMET
            if( $scope.information.checklist == "FLARE / COMET" ){
                if( !$scope.informationFLARE.hiperThreadSetting ){ informacionFaltante += "Disable HiperThreading on BIOS, "; returnData = false; }
                if( $scope.informationFLARE.colin3DVersion == "" ){ informacionFaltante += "Colin3D version, "; returnData = false; }
                if( $scope.informationFLARE.colin3DDongle == "" ){ informacionFaltante += "Colin3D Dongle, "; returnData = false; }
                if( !$scope.informationFLARE.ttsmFolderColin3DInstaller ){ informacionFaltante += "Save Colin3D installer, "; returnData = false; }
                if( !$scope.informationFLARE.ttsmFolderColin3DKeyFile ){ informacionFaltante += "Save Colin3D keyfile, "; returnData = false; }
                if( !$scope.informationFLARE.ttsmFolderColin3DParam ){ informacionFaltante += "Save Colin3D backup params, "; returnData = false; }
                if( !$scope.informationFLARE.colin3DInstalled ){ informacionFaltante += "Install Colin3D, "; returnData = false; }
                if( !$scope.informationFLARE.colin3DDriverPackInstalled ){ informacionFaltante += "Install DriverPack, "; returnData = false; }
                if( !$scope.informationFLARE.colin3DDriverPackIXXAT ){ informacionFaltante += "Install IXXAT, "; returnData = false; }
                if( !$scope.informationFLARE.colin3DDriverSVSVistek ){ informacionFaltante += "Install SVS Vistek, "; returnData = false; }
                if( !$scope.informationFLARE.ipAddress ){ informacionFaltante += "Set IP Address, "; returnData = false; }
                if( !$scope.informationFLARE.ethernetAdvanceSetting ){ informacionFaltante += "Set Ethernet Advance Settings, "; returnData = false; }
            }
            
            //Si se selecciono Other
            if( $scope.information.checklist == "Other" ){
                if( $scope.informationOther.softwareVersion == "" ){ informacionFaltante += "Software version, "; returnData = false; }
                if( $scope.informationOther.softwareDongle == "" ){ informacionFaltante += "Software Dongle, "; returnData = false; }
                if( !$scope.informationOther.ttsmFolderSoftwareInstaller ){ informacionFaltante += "Save Software Installer, "; returnData = false; }
                if( !$scope.informationOther.ttsmFolderSoftwareKeyfile ){ informacionFaltante += "Save Software keyfile, "; returnData = false; }
                if( !$scope.informationOther.ttsmFolderSoftwareParam ){ informacionFaltante += "Save Software Params, "; returnData = false; }
                if( !$scope.informationOther.softwareInstalled ){ informacionFaltante += "Install Software, "; returnData = false; }
                if( !$scope.informationOther.ipAddress ){ informacionFaltante += "Set IP Address, "; returnData = false; }
                if( !$scope.informationOther.softwareInstalledTestWithHardware ){ informacionFaltante += "Test software with hardware, "; returnData = false; }
            }
        }
        
        $scope.informationError = informacionFaltante;
        
        return returnData;
        
    };
    
    //
    $scope.clicFinish = function(){
      if( $scope.checkDataOk() ){
        $scope.saveToFileData();
      }else{
            swal({
                title: "The follow information is not set, continue?",
                text: $scope.informationError,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willProcced) => {
                if ( willProcced ) {
                    //Proceed to make the http request to delete in the data base
                    $scope.saveToFileData();
              } else {
                    //swal("Your imaginary file is safe!"); 
              }
            });
      }
    };
    
    //
    $scope.saveToFileData = function(){
        //generar el texto a exportar
        var textoEnArchivo = "";
        
        //informacion general
        textoEnArchivo += "\n" + "About the Owner,";
        textoEnArchivo += "\n" + "," + "Company" + "," + $scope.information.company + ",";
        textoEnArchivo += "\n" + "," + "Department" + "," + $scope.information.department + ",";
        textoEnArchivo += "\n" + "About the Laptop,";
        textoEnArchivo += "\n" + "," + "Model" + "," + $scope.information.model + ",";
        textoEnArchivo += "\n" + "," + "Service Tag" + "," + $scope.information.serviceTag + ",";
        textoEnArchivo += "\n" + "," + "MAC Address" + "," + $scope.information.macAddress + ",";
        textoEnArchivo += "\n" + "," + "Graphic Board (GPU)" + "," + $scope.information.gpu + ",";
        textoEnArchivo += "\n" + "," + "GPU RAM" + "," + $scope.information.gpuRam + ",";
        textoEnArchivo += "\n" + "," + "Resolution" + "," + $scope.information.resolution + ",";
        textoEnArchivo += "\n" + "," + "CPU" + "," + $scope.information.cpu + ",";
        textoEnArchivo += "\n" + "," + "RAM" + "," + $scope.information.ram + ",";
        textoEnArchivo += "\n" + "," + "Windows Version" + "," + $scope.information.windows + ",";
        textoEnArchivo += "\n" + "," + "Primary HDD" + "," + $scope.information.primaryHdd + ",";
        textoEnArchivo += "\n" + "," + "Secondary HDD" + "," + $scope.information.secondaryHdd + ",";
        textoEnArchivo += "\n" + "," + "Dissable Switcheable Graphics" + "," + $scope.getYesNoByBoolean( $scope.information.switchableGraphicSetting ) + ",";
        textoEnArchivo += "\n" + "," + "Set Energy Settings - Never sleep" + "," + $scope.getYesNoByBoolean( $scope.information.energySetting ) + ",";
        textoEnArchivo += "\n" + "," + "Set Admin Account - Never confirm" + "," + $scope.getYesNoByBoolean( $scope.information.adminAccountSetting ) + ",";
        textoEnArchivo += "\n" + "," + "Create TTSM Folder" + "," + $scope.getYesNoByBoolean( $scope.information.ttsmFolder ) + ",";
        textoEnArchivo += "\n" + "," + "Comments" + "," + $scope.information.comments + ",";
        
        textoEnArchivo += "\n" + "About the hardware,";
        //informacion REGALIS
        if( $scope.information.checklist == "Vectoron" ){
            textoEnArchivo += "\n" + "," + "Vectoron Serial Number" + "," + $scope.informationREGALIS.vectoronSerialNumber + ",";
            textoEnArchivo += "\n" + "," + "REGALIS Version" + "," + $scope.informationREGALIS.regalisVersion + ",";
            textoEnArchivo += "\n" + "," + "REGALIS Dongle" + "," + $scope.informationREGALIS.regalisDongle + ",";
            textoEnArchivo += "\n" + "," + "Set IP Address as 192.168.10.12 / 255.255.255.0" + "," + $scope.getYesNoByBoolean( $scope.informationREGALIS.ipAddress ) + ",";
            textoEnArchivo += "\n" + "," + "Folder TTSM - Save REGALIS installer" + "," + $scope.getYesNoByBoolean( $scope.informationREGALIS.ttsmFolderRegalisInstaller ) + ",";
            textoEnArchivo += "\n" + "," + "Folder TTSM - Save tbLicense" + "," + $scope.getYesNoByBoolean( $scope.informationREGALIS.ttsmFoldertbLicense ) + ",";
            textoEnArchivo += "\n" + "," + "Folder TTSM - Save mlLicense" + "," + $scope.getYesNoByBoolean( $scope.informationREGALIS.ttsmFoldermlLicense ) + ",";
            textoEnArchivo += "\n" + "," + "Folder TTSM - Save Arm Params" + "," + $scope.getYesNoByBoolean( $scope.informationREGALIS.ttsmFolderArmParam ) + ",";
            textoEnArchivo += "\n" + "," + "Folder TTSM - Save Scan Params" + "," + $scope.getYesNoByBoolean( $scope.informationREGALIS.ttsmFolderScanParam ) + ",";
            textoEnArchivo += "\n" + "," + "REGALIS correctly installed" + "," + $scope.getYesNoByBoolean( $scope.informationREGALIS.regalisInstalled ) + ",";
            textoEnArchivo += "\n" + "," + "Test REGALIS connection with Vectoron" + "," + $scope.getYesNoByBoolean( $scope.informationREGALIS.regalisInstalledTestedWithArm ) + ",";
            textoEnArchivo += "\n" + "," + "Set EXCEL Trust Center for REPORT" + "," + $scope.getYesNoByBoolean( $scope.informationREGALIS.excelTrustCenterSetting ) + ",";
        }
        
        //informacion FLARE
        if( $scope.information.checklist == "FLARE / COMET" ){
            textoEnArchivo += "\n" + "," + "Dissable HyperThreading on BIOS" + "," + $scope.getYesNoByBoolean( $scope.informationFLARE.hiperThreadSetting ) + ",";
            textoEnArchivo += "\n" + "," + "Colin3D Version" + "," + $scope.informationFLARE.colin3DVersion + ",";
            textoEnArchivo += "\n" + "," + "Colin3D Dongle" + "," + $scope.informationFLARE.colin3DDongle + ",";
            textoEnArchivo += "\n" + "," + "Folder TTSM - Save Colin3D installer" + "," + $scope.getYesNoByBoolean( $scope.informationFLARE.ttsmFolderColin3DInstaller ) + ",";
            textoEnArchivo += "\n" + "," + "Folder TTSM - Save Colin3D keyfile" + "," + $scope.getYesNoByBoolean( $scope.informationFLARE.ttsmFolderColin3DKeyFile ) + ",";
            textoEnArchivo += "\n" + "," + "Folder TTSM - Save Colin3D backup Params" + "," + $scope.getYesNoByBoolean( $scope.informationFLARE.ttsmFolderColin3DParam ) + ",";
            textoEnArchivo += "\n" + "," + "Colin3D installed" + "," + $scope.getYesNoByBoolean( $scope.informationFLARE.colin3DInstalled ) + ",";
            textoEnArchivo += "\n" + "," + "DriverPack installed" + "," + $scope.getYesNoByBoolean( $scope.informationFLARE.colin3DDriverPackInstalled ) + ",";
            textoEnArchivo += "\n" + "," + "IXXAT installed" + "," + $scope.getYesNoByBoolean( $scope.informationFLARE.colin3DDriverPackIXXAT ) + ",";
            textoEnArchivo += "\n" + "," + "SVS Vistek intalled" + "," + $scope.getYesNoByBoolean( $scope.informationFLARE.colin3DDriverSVSVistek ) + ",";
            textoEnArchivo += "\n" + "," + "Set IP Address as 169.254.0.1 / 255.255.255.0" + "," + $scope.getYesNoByBoolean( $scope.informationFLARE.ipAddress ) + ",";
            textoEnArchivo += "\n" + "," + "Set Ethernet Advance Settings" + "," + $scope.getYesNoByBoolean( $scope.informationFLARE.ethernetAdvanceSetting ) + ",";
        }
        
        //informacion Other
        if( $scope.information.checklist == "Other" ){
            textoEnArchivo += "\n" + "," + "Software Version" + "," + $scope.informationOther.softwareVersion + ",";
            textoEnArchivo += "\n" + "," + "Software Dongle" + "," + $scope.informationOther.softwareDongle + ",";
            textoEnArchivo += "\n" + "," + "Folder TTSM - Save software installer" + "," + $scope.getYesNoByBoolean( $scope.informationOther.ttsmFolderSoftwareInstaller ) + ",";
            textoEnArchivo += "\n" + "," + "Folder TTSM - Save software keyfile" + "," + $scope.getYesNoByBoolean( $scope.informationOther.ttsmFolderSoftwareKeyfile ) + ",";
            textoEnArchivo += "\n" + "," + "Folder TTSM - Save software backup params" + "," + $scope.getYesNoByBoolean( $scope.informationOther.ttsmFolderSoftwareParam ) + ",";
            textoEnArchivo += "\n" + "," + "Software Installed" + "," + $scope.getYesNoByBoolean( $scope.informationOther.softwareInstalled ) + ",";
            textoEnArchivo += "\n" + "," + "Set IP Address" + "," + $scope.informationOther.ipAddress + ",";
            textoEnArchivo += "\n" + "," + "Tested Software with hardware" + "," + $scope.getYesNoByBoolean( $scope.informationOther.softwareInstalledTestWithHardware ) + ",";
        }
        
        //finalmente agregar los errores / faltas
        textoEnArchivo += "\n" + "About the information errors,";
        textoEnArchivo += "\n" + "," + "Missing information" + "," + $scope.informationError + ",";
        
        
        
        
        
        //Crear el elemento y se descarga
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( textoEnArchivo ));
        element.setAttribute('download', "resume.csv");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        //
        swal( {"icon": "success" , "text" : "file downloaded"} );
    };
    
    $scope.getYesNoByBoolean = function( param ){
        if( param ){ return "YES"; }else{ return "NO"; }
    }
    
}]);