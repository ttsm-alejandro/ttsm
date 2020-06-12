<?php
    session_start();
    if( !isset( $_SESSION[ "user" ] ) ){
        header( "Location: ../../index.php" );
        end();
    }
?>
<!DOCTYPE html>
<!--
Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
Programmer: Alejandro Aguayo Acosta
-->
<html>
    <head>
        
        
        <title>Plant</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- JQuery -->
        <script src="../../js/lib/jquery-3.2.1.min.js"></script>
        
        <!-- Bootstrap -->
        <link rel="stylesheet" href="../../css/bootstrap.min.css">
        <script src="../../js/lib/bootstrap.min.js"></script>

        <!-- AngularJS libraries -->
        <script src="../../js/lib/angular.min.js"></script>
        
        <!-- SWEET ALERT -->
        <script src="../../js/lib/sweetalert.min.js"></script>

        <!-- Initial configuration, always BEFORE the controller -->
        <script src="../../js/initConfig.js"></script>
        
        <!-- Controller -->
        <script src="../../js/catalogs/plantCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="plantCtrl" 
             ng-init="
                 
                 user='<?php echo $_SESSION["user"]; ?>';
                 token='<?php echo $_SESSION["token"]; ?>';
                 <?php 
                    if( isset( $_GET[ "id" ] ) ){
                        echo "getData();";
                        if( !($_GET["id"] == "--") ){
                            echo "getDataById(" . $_GET[ "id" ] .  ");";
                        }
                    }else{
                        echo "getData();";
                    } 
                 ?>
                 getCatalogData();
                                           ">
            <!-- *A Begin : PHP line for block elements when "?id=" is present in the URL -->
            <?php if( !isset( $_GET[ "id" ] ) ){ ?>            
                <!-- Header -->
                <div ng-include="'../util/header.html'"></div>
                
                <!-- MODALS -->
                <div ng-include="'../util/modal/modal_loading.html'"></div>
                
                <!-- Title -->
                <h2>
                    Plants Catalog.
                </h2>
            <!-- *A End : -->
            <?php } ?>
            
            <div class="row">

                <!-- *B Begin: PHP line for block elements when "?id=" is present in the URL -->
                <?php if( !isset( $_GET[ "id" ] ) ){ ?>
                
                    <div class="col-lg-3">
                        <div class="input-group">
                            <select ng-model="filterCompany" ng-options=" x.id as x.fullName for x in companyCatalog" class="form-control"></select>
                            <select ng-change="filterCity='';" ng-model="filterState" ng-options=" x.id as x.name for x in stateCatalog" class="form-control"></select>
                            <select ng-disabled="filterState == ''" ng-model="filterCity" ng-options=" x.id as x.name for x in cityCatalog | filter : { idState : filterState } : true" class="form-control"></select>
                            <input class="form-control" ng-model="filterPlantName">
                            <span ng-click="filterCompany='';filterState='';filterCity=''; filterPlantName=''" class="input-group-addon"><i class="glyphicon glyphicon-repeat"></i></span>
                        </div>
                        <div style="overflow: scroll; max-height: {{ userScreenHeight }};">
                            <table class="table table-hover">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                </tr>
                                <tr ng-repeat="row in tableContent | filter : { idCompany : filterCompany , idState : filterState , idCity : filterCity , name : filterPlantName } " 
                                    ng-click="getDetails( row )"
                                    ng-show="(((row.idCompany === filterCompany) && ( filterCompany !== '' )) || (filterCompany === ''))
                                                && (((row.idState === filterState) && ( filterState !== '' )) || (filterState === ''))
                                                && (((row.idCity === filterCity) && ( filterCity !== '' )) || (filterCity === ''))"
                                    style="{{ isRowSelected(row) }}"
                                    >
                                    <td>{{ $index + 1 }}</td>
                                    <td>{{ row.name }}</td>
                                </tr>
                            </table>
                        </div>
                        <button class="btn btn-success" ng-click="newRow()">New</button>
                    </div>
                
                <!-- *B End : -->
                <?php } ?>
                 
                <div class="col-lg-9">
                    <h4 title='{{ details }}'>Plant Details</h4>
                    <table class="table table-striped">
                        <tr><th>ID:</th><td>{{ details.id }}</td></tr>
                        <tr><th title="Clic to reload catalog" ng-click="getCatalogDataByTable('Company')">Company:</th><td>
                                <select 
                                    ng-change="details.idPerson = '';" 
                                    ng-model="details.idCompany" 
                                    ng-options=" x.id as x.fullName for x in companyCatalog" 
                                    class="form-control"></select>
                                <button class="btn btn-info" ng-click="openCatalogWindow( 'company' , details.idCompany )">Edit</button>
                                <button class="btn btn-success" ng-click="openCatalogWindow( 'company' , '--' )">Add</button>
                            </td>
                        </tr>
                        <tr><th>State:</th><td><select ng-change="details.idCity = '';" ng-model="details.idState" ng-options=" x.id as x.name for x in stateCatalog" class="form-control"></select></td></tr>
                        <tr><th title="Clic to reload catalog" ng-click="getCatalogDataByTable('City')">City:</th><td>
                                <select 
                                    ng-disabled="details.idState == ''" 
                                    ng-model="details.idCity" 
                                    ng-options=" x.id as x.name for x in cityCatalog | filter : { idState : details.idState } : true " 
                                    class="form-control"></select>
                                <button class="btn btn-info" ng-click="openCatalogWindow( 'city' , details.idCity )">Edit</button>
                                <button class="btn btn-success" ng-click="openCatalogWindow( 'city' , '--' )">Add</button>
                            </td>
                        </tr>
                        <tr><th title="Clic to reload catalog" ng-click="getCatalogDataByTable('Person')">Person:</th><td>
                                <select 
                                    ng-disabled="details.idCompany == ''" 
                                    ng-model="details.idPerson" 
                                    ng-options=" x.id as x.name for x in personCatalog | filter : { idCompany : details.idCompany }" class="form-control"></select>
                                <button class="btn btn-info" ng-click="openCatalogWindow( 'person' , details.idPerson )">Edit</button>
                                <button class="btn btn-success" ng-click="openCatalogWindow( 'person' , '--' )">Add</button>
                            </td>
                        </tr>
                        <tr><th>Name:</th><td><input ng-model="details.name" class="form-control"></td></tr>
                        <tr><th>Address:</th><td><textarea rows="5" ng-model="details.address" class="form-control"></textarea></td></tr>
                        <tr><th>Comments:</th><td><textarea rows="5" ng-model="details.comment" class="form-control"></textarea></td></tr>
                    </table>
                    <button class="btn btn-info" ng-click="updateOrSaveRow()" >Save</button>
                    
                    <!-- *C Begin: PHP line for block elements when "?id=" is present in the URL -->
                    <?php if( !isset( $_GET[ "id" ] ) ){ ?>
                    <button class="btn btn-danger" ng-click="deleteRow()">Delete</button>
                    <!-- *C Begin: PHP line for block elements when "?id=" is present in the URL -->
                    <?php } ?>
                    
                    <!-- *D Begin: PHP line for block elements when "?id=" is present in the URL -->
                    <?php if( isset( $_GET[ "id" ] ) ){ ?>
                    <button class="btn btn-danger" ng-click="closeThisWindow()">Close</button>
                    <!-- *D Begin: PHP line for block elements when "?id=" is present in the URL -->
                    <?php } ?>
                    
                </div>
            </div>
        </div>
    </body>
</html>