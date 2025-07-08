sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("maindbapp.controller.View1", {
        onInit() {
            debugger
            
            var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteView1").attachMatched(this._onRouteMatched, this);  
        },
       _onRouteMatched: async function (oEvent) {
        debugger
     
        var projectId = oEvent.getParameter("arguments").DocId;
        let user,userEmail;
        try {
             user = sap.ushell.Container.getUser().getFullName();
             userEmail = sap.ushell.Container.getUser().getEmail();    
        } catch (error) {
             user = 'Tesst User'; 
             userEmail = 'akshay.br@peolsolutions.com' 
        }
        var jsonoModel = new sap.ui.model.json.JSONModel({ projectId: projectId ,userName:user});
        this.getView().setModel(jsonoModel, "DocId");
        let oModel=this.getView().getModel();
        let sFunctionName='getDataForUserAndProject';
        let oFunction=oModel.bindContext(`/${sFunctionName}(...)`);
        oFunction.setParameter('project',projectId);
        oFunction.setParameter('user',userEmail);
        await oFunction.execute();
        var oContext = oFunction.getBoundContext().getValue();
        if(oContext.value.substring(0,3)=='Doc'){
            var href_For_Product_display = ( sap.ushell && sap.ushell.Container && await sap.ushell.Container.getServiceAsync("Navigation")) || "";
							if(href_For_Product_display != ""){
								await href_For_Product_display.navigate({
									target : {    semanticObject: "nfaformflp",
                                        action: "display" },
									params : { "PAN_Number" : oContext.value,
                                        "IsActiveEntity": true }
								})
							}
          
        }else{
            debugger
            this.getView().getContent()[0].mAggregations.content[0].setIllustrationType('sapIllus-ErrorScreen');
            this.getView().getContent()[0].mAggregations.content[0].setTitle('Oops! Something went wrong');
            this.getView().getContent()[0].mAggregations.content[0].setDescription(oContext.value);
        }
        debugger
       },
        onBeforeRendering:function(oEvent){
        debugger
        },
      
        routing:{
            onBeforeBinding:function(oEvent){
                debugger
            }
        }
    });
});