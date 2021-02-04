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
        <title>Inventory</title>
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
        <script src="../../js/sharepoint/inventoryPageCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div>
            
            <div ng-controller="inventoryPageCtrl" 
                 ng-init="

                     user='<?php echo $_SESSION["user"]; ?>';
                     token='<?php echo $_SESSION["token"]; ?>';
                     getData();
                     initCatalogs();
                                                                ">
                <div class="container">
                    <!-- Header -->
                    <div ng-include="'../util/header.html'"></div>

                    <!-- MODALS -->
                    <div ng-include="'../util/modal/modal_loading.html'"></div>
                    <div ng-include="'../util/modal/modal_inventory_detail.html'"></div>

                    <!-- Line -->
                    <div ng-click="getData()" style="background-color: {{ ttsmBlueColor }}; height: 5px;"></div>

                    <!-- CONTENIDO -->
                    <div>
                        <!-- Title -->
                        <div class="row">
                            <div class="col-lg-12">
                                <h2>
                                    Inventory
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                    
                <div ng-show="isWaitingHttpRequest" style="text-align: center">
                    <h1>Please wait...</h1>
                </div>
                <div ng-show="!isWaitingHttpRequest">
                        <!-- DIVISION DEL LARGO, 8 PARA LA TABLA, 3 PARA LA IMAGEN -->
                        <div class="row">
                            <!-- Sangria -->
                            <div class="col-md-1 col-lg-1">
                                
                            </div>
                            
                            <!-- Acciones -->
                            <div class="col-md-11 col-lg-11">
                                Acciones: 
                                    <span ng-click="showViewRow = !showViewRow" title="clic para activar la columna show/hide" class="glyphicon glyphicon-eye-open"></span>
                                    <span ng-click="showDeleteRow = !showDeleteRow" style="color: red" title="clic para activar la columna delete" class="glyphicon glyphicon-trash"></span>
                                <br>
                                <div ng-show="showDeleteRow">
                                    Mostrar confirmacion de borrado: 
                                    <input type="checkbox" ng-model="isDeleteWarning" >
                                </div>
                                <div ng-show="showViewRow">
                                    Filtrar: 
                                    <!-- Type -->
                                    <select
                                        class="form-group-sm"
                                        ng-model="filterViewByType"
                                        ng-options="x.id as x.name for x in typeCatalog"
                                    ></select>
                                    <!-- Descripsion -->
                                    <input
                                        class="form-group-sm"
                                        ng-model="filterViewByDescription"
                                    >
                                    <!-- Location -->
                                    <select
                                        class="form-group-sm"
                                        ng-model="filterViewByLocalization"
                                        ng-options="x.id as x.name for x in localizationCatalog"
                                    ></select>
                                    <!-- Checked -->
                                    <select
                                        class="form-group-sm"
                                        ng-model="filterViewByChecked"
                                        ng-options="x.id as x.name for x in checkedCatalog"
                                    ></select>
                                    <div ng-click="removeFilter()" class="label label-default">Remove filters</div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="row">
                            <!-- Sangria -->
                            <div class="col-md-1 col-lg-1">
                                
                            </div>
                            
                            <!-- Tabla -->
                            <div class="col-md-8 col-lg-8" style="overflow: scroll; max-height: {{ userScreenHeight }};">
                                <div class="table-responsive"> 
                                    <table class="table table-hover table-condensed">
                                        <tr style="background-color: {{ ttsmBlueColor }}; color: white">
                                            <td ng-click="setViewAllRows()" title="clic para mostrar todo" ng-show="showViewRow"><span class="glyphicon glyphicon-eye-open"></span></td>
                                            <td title="clic para borrar fila" ng-show="showDeleteRow"><span class="glyphicon glyphicon-trash"></span></td>
                                            <td>#</td>
                                            <td>Part Number</td>
                                            <td>Descripcion</td>
                                            <td>Tipo</td>
                                            <td>Localizacion</td>
                                            <td>Unidad</td>
                                            <td>Stock</td>
                                            <td>Revisado</td>
                                        </tr>
                                        <tr ng-repeat="row in inventoryTableData | filter : { description : filterViewByDescription }" title="clic para desplegar imagen, doble clic para actualizar datos" 
                                            ng-dblclick="showDetailsInModal( row )"
                                            style="{{ setRowColorBySelected( row.description ) }}"
                                            ng-click="imageSelected( row.link , row.description )"
                                            ng-show="(row.showRow)
                                                        &&( (filterViewByLocalization == '') || ( filterViewByLocalization == row.localization ) )
                                                        &&( (filterViewByChecked == '') || ( filterViewByChecked == row.checked ) )
                                                        &&( (filterViewByType == '') || ( filterViewByType == row.type ) )"
                                            >
                                            <td ng-show="showViewRow" ng-click="row.showRow = false"><span class="glyphicon glyphicon-eye-close"></span></td>
                                            <td style="color:red;" 
                                                ng-show="showDeleteRow"
                                                ng-click="deleteRowWithWarning( row.id )"
                                                title="borrar {{ row.id }}"
                                                ><span class="glyphicon glyphicon-trash"></span></td>
                                            
                                            <td>{{ $index + 1 }}</td>
                                            <td>{{ row.partNumber }}</td>
                                            <td>{{ row.description }}</td>
                                            <td>
                                                <select
                                                    ng-disabled="true"
                                                    class="form-group-sm"
                                                    ng-model="row.type"
                                                    ng-options="x.id as x.name for x in typeCatalog"
                                                ></select>
                                            </td>
                                            <td>
                                                <select
                                                    ng-disabled="true"
                                                    class="form-group-sm"
                                                    ng-model="row.localization"
                                                    ng-options="x.id as x.name for x in localizationCatalog"
                                                ></select>
                                            </td>
                                            <td>
                                                <select
                                                    ng-disabled="true"
                                                    class="form-group-sm"
                                                    ng-model="row.unit"
                                                    ng-options="x.id as x.name for x in unitCatalog"
                                                ></select>
                                            </td>
                                            <td>{{ row.stock }}</td>
                                            <td title="clic para cambiar estatus" ng-click="changeRowCheckedStatus( row.id )" style="text-align: center; color:white; background-color: {{ getColorByCheckedStatus( row.checked ) }};">{{ row.checked }}</td>
                                            <!--td ng-show="tableReportShowColumn[7]"><input type="date" ng-model="row.date" ng-disabled="true"></td-->
                                        </tr>
                                        <tr>
                                            <td ng-click="addNewRow()" colspan="8" style="text-align: right; color: black; background-color: lightblue"><div class="btn btn-block">Agregar nuevo registro</div> </td>
                                            <td>
                                                <input title="marcado = se borran combos" type="checkbox" ng-model="isMaintainCombosInSaveAndNew">
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            
                            <!-- Imagen -->
                            <div class="col-md-2 col-lg-2" title="{{ imageToShowSelectedTitle }}">
                                <img ng-src="{{imageToShowSelected}}" height="{{userScreenHeight}}px">
                            </div>
                            
                            <!-- Sangria -->
                            <div class="col-md-1 col-lg-1">
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </body>
</html>