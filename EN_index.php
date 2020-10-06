<!DOCTYPE html>
<!--
Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
Programmer: Alejandro Aguayo Acosta
-->
<html>
    <head>
        <title>TTSM</title>
        <link rel="icon" href="images/util/icono.png">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- JQuery -->
        <script src="js/lib/jquery-3.2.1.min.js"></script>
        
        <!-- Bootstrap -->
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <script src="js/lib/bootstrap.min.js"></script>

        <!-- AngularJS libraries -->
        <script src="js/lib/angular.min.js"></script>

        <!-- Languajes -->
        <script src="js/languajes/languajes.js"></script>
        
        <!-- Controller -->
        <script src="js/mainCtrl.js"></script>
        
                <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-131182236-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-131182236-1');
</script>

<!-- Start of HubSpot Embed Code -->
<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/7959089.js"></script>
<!-- End of HubSpot Embed Code -->
        
    </head>
    
    <body ng-app="miApp">
        <div ng-controller="mainCtrl"
             ng-init = "relativeUrl = './';"
             >
            
            <!-- Header -->
            <div class="container">
                <div ng-include=" 'html/util/EN_header.html' "></div>
            </div>
            
            <!-- MODAL ON LOAD -->
            <!--div ng-include=" 'html/util/EN_modalOnLoad.html' "></div-->
            
            <!-- MODAL INSCRIPCION A WEBINAR -->
            <!--div ng-include=" 'html/util/EN_modalWebinarRegistration.html' "></div-->
            
            <!-- Carousel of main products -->
            <div>
                <div ng-include=" 'html/util/EN_carousel.html' "></div>
            </div>
            
            <!-- SPACE BETWEEN DIV BOXES >
            <div style="height: 5px; background-color: gray;"></div-->
            <div style="height: 10px;"></div>
            
            <!-- MAIN BODY -->
            <div class="container">
                
                <!-- google search words -->
                <div class="row" ng-show="false">
                    <div class="col-md-12">
Scanner
Metrologia
Metrology
Gap
Flush
Level
Step
Medición
Measurement
Arm
Comet
Fotogrametría
Photogrammetry
Raptor Eye 2
Green
laser
Verde
Layout
Machine
Regalis
3D Magic
Portable
leica laser tracker
ttsm
cmm
vectoron
at960
ats600
laser tracker leica
leica at960
cmm portátil
lasertracker leica
leica at403
apiscan
leica absolute tracker at960
escaner
scan
3d
brazo
arm
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <h1 style="color: {{ ttsmBlueColor }};">TTS</h1>
                        <p>
                            Tokyo Boeki Techno-System de México (TTSM) wants to be your 3D technologies partner. 

                        </p>
                        <h3
                            class="well well-sm text-center"
                            style="
                                color: white; 
                                background-color: {{ ttsmGrayColor }};
                                "
                            >3-D EXPERTS</h3>

                        <p>
                            TTS is an international company that provides and support the best three-dimensional measurement instruments in the world like custom design CMM's (Layout Machine), multi-joint type measurement machines (Vectorarm) and many others.
                            <br><br>As a part of global corporate Tokyo Boeki Techno System LTD. (TTS) we work closely with some of the best branches in the world to give our world-wide customers the best products and support.  
                            <br>
                            <br>Our distribution is in the following fields: 
                            <br>Automobile, aircraft and construction equipment, as well as any other industry that consecutively makes one item and wants to measure it.


                        </p>
                    </div>
                </div>
                  
                <!-- WHITE SPACE -->
                <div class="row" style="height: 5px; background-color: {{ ttsmGrayColor }};"></div>
                    
                    
                <!-- NEWS -->
                <!--div class="row">
                    <h1 style="color: {{ ttsmBlueColor }};">NEWS</h1>
                    
                    <div class="text-center">
                        <div class="col-md-2"></div>
                        <div class="col-md-8">
                            <img src="images/news/CARTEL-WEBINAR-JULIO-2020_ES.jpg" width="100%" >
                            <div style="height: 5px"></div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                </div-->
                            <!--img ng-click="showWebinarRegistrationForm()" src="images/news/CARTEL-WEBINAR-JULIO-2020_ES.jpg" width="100%" -->
                
            </div>
            
            <!-- WHITE SPACE -->
            <div class="row" style="height: 10px;"></div>
            
            <!-- FOOTER -->
            <div ng-include="'html/util/EN_footer.html'"></div>
        </div>
    </body>
</html>