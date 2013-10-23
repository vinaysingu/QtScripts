
function init()
{
    data = new Object();
    var set = testData.dataset("Data.tsv");
    
    
    var record = set[0];
    data.sourceItem     = testData.field(record,"SOURCEITEM");
    data.targetItem1    = testData.field(record,"TARGETITEM1");
    data.targetItem2    = testData.field(record,"TARGETITEM2");
    data.listPrice      = testData.field(record,"LISTPRICE");
    data.wSalePrice     = testData.field(record,"WSALEPRICE");
    data.actBomItem     = testData.field(record,"ACTBOMITEM");
    data.pndBomItem     = testData.field(record,"PNDBOMITEM");
    data.actBooItem     = testData.field(record,"ACTBOOITEM");
    data.pndBooItem     = testData.field(record,"PNDBOOITEM");
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(1);
}



function main()
{
 
  
                     //-----Editing of preferences----
    try
    {
        if(OS.name == "Darwin")
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Preferences..."));
        }
        else
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
            activateItem(":xTuple ERP: *_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: *._System_QMenu", "Preferences...");
            activateItem(":xTuple ERP: *._System_QMenu", "Preferences..."); 
         }
        snooze(0.5);
        if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
        {
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
        }
        snooze(0.3);
        if(object.exists(":Notice.Notice_QDialog"))
        {
            if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
                clickButton(":Notice.Remind me about this again._QCheckBox");
            snooze(0.2);
            waitForObject(":Notice.OK_QPushButton");
            clickButton(":Notice.OK_QPushButton");
        }
        
        waitForObject(":View Check Run.Save_QPushButton");
        clickButton(":View Check Run.Save_QPushButton");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
        snooze(3);
    }
    catch(e)
    {
        test.fail("Error in editing preferences"+ e);
    }  
    
    //--------Exiting the application------
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
    activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP..."));
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    snooze(3);

  var Astatus = "1";
  var Pstatus = "2";
  var Checkstatus1,Checkstatus2;   
  var flag = "0";
  var woqty ="100";
  
    
    
    
    
    
    
    
    
    //----Creating an Item---
    copyitem( data.sourceItem,data.targetItem1,data.listPrice,data.wSalePrice);
    //---Creating an ItemSites----
    createRIS(data.targetItem1);
    
    //---Edit the itemsite created---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site"));
        activateItem(waitForObjectItem(":_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        openItemContextMenu(":_list_XTreeWidget_3",data.targetItem1, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(1);
        if(findObject(":Items.Site can manufacture this Item_QGroupBox"))
        {
            type(":Items.Site can manufacture this Item_QGroupBox"," ");
        }
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Item Site Edited sucessfully for an item"+data.targetItem1);
        
    }
    catch(e)
    {
        
        test.fail("Error in editing the itemsite created"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
    }
    
    
    
    
    
    
    
    
    //-----Create Revision for first time and verify status as Active in BOM Screen
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List..."));
        clickItem(":xTuple ERP:*._bom_XTreeWidget",data.targetItem1, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        
        //---Creating New Revision for the first time and verify the status---
        snooze(1);
        findObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit").clear();
        type(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit"),Astatus);
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Yes_QPushButton_2"));
        
        //---Verifying the status of the revision created for the first time---
        snooze(1);
        Checkstatus1 = findObject(":xTuple ERP:*.Active_QLabel").text;
        
        if(Checkstatus1 =="Active")
        {
            flag ="1";
            test.pass("The state of  Revision created for first time on BOM is sucessfully displayed as active");
        }
        else
            test.fail("The state of revision created for the first time on BOM is failed to  displayed as active");
        
        if(flag=="1")
        {
            //---Adding BOM to active revison---
            try
            {
                clickButton(waitForObject(":xTuple ERP:*.New_QPushButton_2"));
                type(waitForObject(":Bill of Materials Item.ItemLineEdit_ItemLineEdit"),data.actBomItem);
                nativeType("<Tab>");
                clickButton(waitForObject(":View Check Run.Save_QPushButton"));  
                //---Verifying the BOM Item added  ---
                
                snooze(1);
                if(object.exists("{column='1' container=':frame_2._bomitem_XTreeWidget' text='"+data.actBomItem+"' type='QModelIndex'}"))
                {
                    
                    test.pass("Bill Of Material Item " +data.actBomItem +"added for active revision");
                    
                }
                else
                    test.fail("Error in creating BOM Item "+ data.actBomItem +" for active revision");
                clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            }
            catch(e)
            {
                test.fail("Error in adding a BOM for active revision"+e);
                if(object.exists(":Bill of Materials Item.Cancel_QPushButton"))
                    clickButton(":Bill of Materials Item.Cancel_QPushButton");
                
            }
            
            
        }//end of if
        else
        {
            test.fail("Fail to add BOM and no new revision created");
        }
        
        //----Verifying the BOM displayed uder list of BOM screen
        if(object.exists("{column='0' container=':xTuple ERP:*._bom_XTreeWidget' text='"+data.targetItem1+"' type='QModelIndex'}"))
            test.pass("Bill Of Material Item " +data.targetItem1+ "sucessfully displayed under BOM list screen");
        else
            test.fail("Failed to create Bill Of Material Item");
        
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
        
    }//Main Try
    catch(e)
    {
        test.fail("Error in creating new revision"+e);
        
        if(object.exists(":Bill of Materials Item.Cancel_QPushButton"))
            clickButton(":Bill of Materials Item.Cancel_QPushButton");
        
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    
    
    
    
    //-----Create Revision for Second time and verify the status displayed as Pending in BOM Screen
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List..."));
        clickItem(":xTuple ERP:*._bom_XTreeWidget",data.targetItem1, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        
        //---Creating the revision for second time--
        try
        {
            snooze(1);
            findObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit").clear();
            type(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit"),Pstatus);
            nativeType("<Tab>");
            clickButton(waitForObject(":View Check Run.Yes_QPushButton_2"));
            
            //----Verifying the revision status craeted for second time----
            snooze(1);
            Checkstatus2 = findObject(":xTuple ERP:*.Pending_QLabel").text;
           
            if(Checkstatus2 =="Pending")
            {
                test.pass("Revision created for second time on BOM item state is  sucessfully displayed as pending");
            }
            else
                test.fail("Revision created for second time on BOM item failed to display its state as pending");
            
            
            
        }
        catch(e)
        {
            test.fail("Error in creating a new revision"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(":Sales Order.Cancel_QPushButton");
        }
        //---Add BOM---
        
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton_2"));
        type(waitForObject(":Bill of Materials Item.ItemLineEdit_ItemLineEdit"),data.pndBomItem);
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));  
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error in creating the revision with status as pending"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    
    
    
    
    
    //-----Verifying the Revision on inactive Item---
    
    
    var flag ="0";
    
    //----Creating an Inactive item----
    
    copyitem(data.sourceItem,data.targetItem2,data.listPrice,data.wSalePrice);
    //---Deactivate the item created---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.targetItem2, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        if(findObject(":xTuple ERP:*.Active_QCheckBox").checked)
        {
            clickButton(":xTuple ERP:*.Active_QCheckBox");
        }
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"))
                test.log("Item "+ data.targetItem2+" deactivated sucessfully");
    }
    
    catch(e)
    {
        test.fail("Error in deactivating an "+ data.targetItem2+" item"+e);
        
        if(object.exists(":Select Order for Billing.Save_QPushButton"))
            clickButton(":Select Order for Billing.Save_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
        
    }
    
    
    //---Create an inactive ItemSite---
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "New...");
        activateItem(":_QMenu", "New...");
        
        waitForObject(":Item Site.ItemLineEdit_ItemLineEdit");
        type(":Item Site.ItemLineEdit_ItemLineEdit",data.targetItem2);
        nativeType("<Tab>");
        snooze(0.5);
        if(object.exists(":_warehouse_WComboBox_2"))
        {
            waitForObject(":_warehouse_WComboBox_2");
            clickItem(":_warehouse_WComboBox_2", "WH1", 0, 0, 5, Qt.LeftButton);
        }
        if(findObject(":Items.Site can manufacture this Item_QGroupBox"))
        {
            type(":Items.Site can manufacture this Item_QGroupBox"," ");
        }
        if(findObject(":Item Site.Site can purchase this Item_QGroupBox"))
        {
            type(":Item Site.Site can purchase this Item_QGroupBox", " ");
        }
        
        snooze(0.5);
        waitForObject(":Control._controlMethod_XComboBox_2");
        clickItem(":Control._controlMethod_XComboBox_2", "Regular", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_plannerCode_XComboBox_2");
        clickItem(":_plannerCode_XComboBox_2", "MRP-MRP Items", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_costcat_XComboBox_2");
        clickItem(":_costcat_XComboBox_2", "FINISHED-Finished Product - WH1", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        
        if(findObject(":xTuple ERP:*.Active_QCheckBox").checked)
        {
            clickButton(":xTuple ERP:*.Active_QCheckBox");
        }
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
        }
        test.log("Inactive Item site created for item");
    }
    catch(e)
    {
        test.fail("Exception in creating Itemsite for "+data.targetItem2+e);
    }
    
    
    
    //-----Create Revision for inactive item for first time and verify status as Active in BOM Screen
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List..."));
        //--To show inactive item BOM--
        if(!findObject(":xTuple ERP:*.Show BOMs for Inactive Items_XCheckBox").checked)
        {
            clickButton(":xTuple ERP:*.Show BOMs for Inactive Items_XCheckBox");
        }
        
        clickItem(":xTuple ERP:*._bom_XTreeWidget",data.targetItem2, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        
        
        //---Creating New Revision for the first time and verify the status---
        snooze(1);
        findObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit").clear();
        type(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit"),Astatus);
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Yes_QPushButton_2"));
        
        //---Verifying the status of the revision created for the first time---
        snooze(1);
        Checkstatus1 = findObject(":xTuple ERP:*.Active_QLabel").text;
       
        if(Checkstatus1 =="Active")
        {
            flag ="1";
            test.pass("The state of first revision created on BOM is displayed as active");
        }
        else
            test.fail("The state of first revision created on BOM is not displayed as active");
        
        
        //---Adding BOM---
        if(flag=="1")
        {
            try
            {
                clickButton(waitForObject(":xTuple ERP:*.New_QPushButton_2"));
                type(waitForObject(":Bill of Materials Item.ItemLineEdit_ItemLineEdit"),data.actBomItem);
                nativeType("<Tab>");
                clickButton(waitForObject(":View Check Run.Save_QPushButton"));  
                //---Verifying the BOM Item added  ---
                
                snooze(1);
                if(object.exists("{column='1' container=':frame_2._bomitem_XTreeWidget' text='"+data.actBomItem+"' type='QModelIndex'}"))
                {
                    
                    test.pass("Bill Of Material Item " +data.actBomItem +" created sucessfully");
                    
                }
                else
                    test.fail("Error in creating BOM Item");
                clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            }
            catch(e)
            {
                test.fail("Error in adding a BOM"+e);
                if(object.exists(":Bill of Materials Item.Cancel_QPushButton"))
                    clickButton(":Bill of Materials Item.Cancel_QPushButton");
                
            }
            
            
        }
        else
        {
            test.fail("Fail to add BOM and no new revision created");
        }
        
        //----Verifying the BOM displayed uder list of BOM screen
        if(!findObject(":xTuple ERP:*.Show BOMs for Inactive Items_XCheckBox").checked)
        {
            clickButton(":xTuple ERP:*.Show BOMs for Inactive Items_XCheckBox");
        }
        
        if(object.exists("{column='0' container=':xTuple ERP:*._bom_XTreeWidget' text='"+data.targetItem2+"' type='QModelIndex'}"))
            test.pass("Bill Of Material Item " + data.targetItem2 +" created sucessfull displayed under BOM list");
        else
            test.fail("Failed to create Bill Of Material Item");
        
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
        
    }//Main Try
    catch(e)
    {
        test.fail("Error in creating new revision"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    
    
    //-----Create Revision for Second time and verify the status displayed as Pending in BOM Screen
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List..."));
        clickItem(":xTuple ERP:*._bom_XTreeWidget",data.targetItem2, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        
        //---Creating the revision for second time--
        snooze(1);
        findObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit").clear();
        type(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit"),Pstatus);
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Yes_QPushButton_2"));
        
        //----Verifying the revision status craeted for second time----
        snooze(1);
        Checkstatus2 = findObject(":xTuple ERP:*.Pending_QLabel").text;
        
        if(Checkstatus2 =="Pending")
        {
            test.pass("The state of revision created for second time on BOM sucessfully displayed as pending");
        }
        else
            test.fail("The state of the revision created for second time on BOM is failed to display as pending");
        
        
        //---Add BOM---
        
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton_2"));
        type(waitForObject(":Bill of Materials Item.ItemLineEdit_ItemLineEdit"),data.pndBomItem);
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));  
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error in creating the revision with status as pending"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    
   
    
    //---Operation on BOM-----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Materials"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Bill Of Materials_QMenu", "List..."));
        
        //---Add Parent item as BOM item---
        clickItem(":xTuple ERP:*._bom_XTreeWidget",data.targetItem1, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton_2"));
        type(waitForObject(":Bill of Materials Item.ItemLineEdit_ItemLineEdit"),data.targetItem1);
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));  
        
        if(object.exists(":Sales Order.OK_QPushButton_2"))
        {
            clickButton(":Sales Order.OK_QPushButton_2");
            test.pass("It is not possible to add parent item as its Bill Od Material item");
        }
        else
            test.fail("It is possible to add parent item as its Bill Od Material item");
        clickButton(waitForObject(":Bill of Materials Item.Cancel_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));      
    }
    catch(e)
    {
        test.fail("Error in verifying the addition of parent item as Bill of Material item"+e);
        
        if(object.exists(":Bill of Materials Item.Cancel_QPushButton"))
            clickButton(":Bill of Materials Item.Cancel_QPushButton");
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
    
    var flag = "0";
    
    
    
    
    
    
    
    
    
    
    
    
           //---Product SetUp---
    try
    {
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Setup..."));
    if(!findObject(":_stack.Change current Active BOO to Substitute BOO when activating a Pending BOO_QCheckBox").checked)
       {
           clickButton(":_stack.Change current Active BOO to Substitute BOO when activating a Pending BOO_QCheckBox");
       }
    clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    test.log("Sucessfully made changes in product set-up");
   }
    catch(e)
    {
        test.fail("Error in setting changes in Products setup"+e);
         if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }

    //----Creating Revision and verifying status on BOO Screen--
    
    //---Creating revision for BOO for First Time-----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Operations"));
        activateItem(waitForObjectItem(":_QMenu", "List..."));
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
        type(waitForObject(":xTuple ERP:*.ItemLineEdit_ItemLineEdit"),data.targetItem1);
        nativeType("<Tab>");
        //---Create revision in active state on BOO
        type(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit"), Astatus);
        nativeType("<Tab>");
        if(object.exists(":View Check Run.Yes_QPushButton_2"))
            clickButton(":View Check Run.Yes_QPushButton_2");
        //---Add BOO 
        try
        {
            clickButton(waitForObject(":xTuple ERP:*.New_QPushButton_2"));
            clickItem(":_stdopn_XComboBox",data.actBooItem,5,5,0, Qt.LeftButton);
            nativeType("<Tab>");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            test.log("Bill Of Operation "+ data.actBooItem +"added sucessfully");
        }
        catch(e)
        {
            test.fail("Error in adding Bill Of Operation "+ data.actBooItem +" for active revision"+e);
        }
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));  
        
    }
    catch(e)
    {
        test.fail("Error in creating BOO for an revision enabled item"+e);
        if(object.exists(":Sales Order.Close_QPushButton"))
            clickButton(":Sales Order.Close_QPushButton");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
    
    //---Verifying the revision status on Bill Of Operations---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Operations"));
        activateItem(waitForObjectItem(":_QMenu", "List..."));
        clickItem(":_boo_XTreeWidget_2", data.targetItem1, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        snooze(1);
        Checkstatus1 =findObject(":xTuple ERP:*.Active_QLabel").text
        
        if(Checkstatus1 =="Active")
        {
            flag ="1";
            test.pass("The state of revision created for the first time is displayed as active in BOO of an item");
        }
        else
            test.fail("Failed to display the state of revision created for the first time on Bill of Operations as active ");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));  
    }
    catch(e)
    {
        test.fail("Error in verifying the status of revision created for first time on BOO of an item"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
        
        if(object.exists(":Select Order for Billing.Save_QPushButton"))
            clickButton(":Select Order for Billing.Save_QPushButton");
        
    }
    
    
    var flag = "0";
    
    //---Creating revision for BOO second time-----
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Bill Of Operations"));
        activateItem(waitForObjectItem(":_QMenu", "List..."));
        clickItem(":_boo_XTreeWidget_2", data.targetItem1, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        
                 //---Revision with Pending state on BOO
        snooze(1);
        findObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit").clear();
        type(waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit"),Pstatus);
        nativeType("<Tab>");
        if(object.exists(":View Check Run.Yes_QPushButton_2"))
            clickButton(":View Check Run.Yes_QPushButton_2");
        var PBOO;
        PBOO = findObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit").text;
        
        //---Verifying the status of revision --
        
        Checkstatus2 =findObject(":xTuple ERP:*.Pending_QLabel").text
                      
                      if(Checkstatus2 =="Pending")
        {
            flag ="1";
            test.log(Checkstatus2);
            test.pass("The state of revision created for second time  is displayed as pending in BOO of an item");
        }
        else
            test.fail("Failed to display the revision state as pending created for second time  on Bill of Operations ");
        
        
        
        //---Add BOO 
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton_2"));
        
        clickItem(":_stdopn_XComboBox",data.pndBooItem ,5,5,0, Qt.LeftButton);
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        
       
                 //---Changing state of revision from pending to Substitute---
        
        clickButton(waitForObject(":xTuple ERP:*.Activate_QPushButton"));
        clickButton(waitForObject(":View Check Run.Yes_QPushButton_2"));
 
        sendEvent("QMouseEvent", waitForObject(":_revisionGroup_QLabel"), QEvent.MouseButtonPress, 15, 7, Qt.LeftButton, 0);
        activateItem(waitForObjectItem(":_QMenu", "List..."));
        waitForObject(":_listTab_XTreeWidget_24");
        clickItem(":_listTab_XTreeWidget_24",Astatus,0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
        clickButton(waitForObject(":xTuple ERP:*.Activate_QPushButton"));    
        clickButton(waitForObject(":View Check Run.Yes_QPushButton_2")); 
       
         clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));  
    }
    catch(e)
    {
        test.fail("Error in creating BOO for an revision enabled item"+e);
        if(object.exists(":Sales Order.Close_QPushButton"))
            clickButton(":Sales Order.Close_QPushButton");
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
    
  
  //---Create a WO for revision enabled item---
    
    //---Create WO For revision enabled item----
    
    var WOnum = createWorkOrder(data.targetItem1, woqty)
                
                //---View WO materials and Operations for active revision---
                try
                {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Work Order Schedule"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        //--View BOM for WO with active revison selected---
        try
        {
            openItemContextMenu(":_list_XTreeWidget_3",WOnum, 5, 5, Qt.LeftButton);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "View Material Requirements..."));
            snooze(2);
            clickButton(waitForObject(":xTuple ERP:*.Query_QToolButton"));
            waitForObject(":_list_XTreeWidget_11")
                    if(object.exists("{column='0' container=':_list_XTreeWidget_11' text='"+ data.actBomItem +"' type='QModelIndex'}"))
                        test.pass("Bill Of Materials related to in Active state revision are displayed sucessfully");
            else
                
                test.fail("Failed to display active state revision Bill Of materials");
            
            clickButton(waitForObject(":xTuple ERP:*.Close_QToolButton"));
            
            
        }
        catch(e)
        {
            test.fail("Error in verifying active state revision Bill Of Materials"+e);
            if(object.exists(":xTuple ERP:*.Close_QToolButton"))
                clickButton(":xTuple ERP:*.Close_QToolButton");
        }
        
        //---View BOO for WO with active state revision selected ---
        try
        {
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            openItemContextMenu(":_list_XTreeWidget_3",WOnum, 5, 5, Qt.LeftButton);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "View Operations..."));
            waitForObject(":_list_XTreeWidget_12");
            if(object.exists("{column='3' container=':_list_XTreeWidget_12' text='"+data.actBooItem+"' type='QModelIndex'}"))
                test.pass("Active state revision Bill Of Operations are displayed sucessfully");
            else
                test.fail("Failed to display active state revision Bill Of Operations of an item");
            clickButton(waitForObject(":xTuple ERP:*.Close_QToolButton"));
        }
        catch(e)
        {
            test.fail("Error in verifying the BOO with active state enabled"+e);
        }
        
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
    }//Main
    catch(e)
    {
        
        test.fail("Error in verifying the BOO and BOM for an WO with active revision selected"+e);
    }
    
    
    
    
    
    //-------Change the revision of WO----
    
    //---Implode the WO----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Work Order Schedule"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",WOnum, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Implode..."));
        clickButton(waitForObject(":Implode Work Order.Implode_QPushButton"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='O' type='QModelIndex'}"))
            test.pass(""+WOnum+" Work Order is imploded successfully ");
        else  
            test.fail(""+WOnum+" Work Order is failed to implode");
        clickButton(waitForObject(":Quotes.Close_QToolButton")); 
        
    }
    catch(e)
    {
        test.fail("Error in imploding the WO"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    //---Change WO Revision for BOM and BOO-----
    
    //---Edit the WO ---
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Work Order Schedule"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",WOnum, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Revision");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit").clear();
        type(":xTuple ERP:*.VirtualClusterLineEdit_RevisionLineEdit",Pstatus);
        nativeType("<Tab>");
        waitForObject(":Bill of Operations.VirtualClusterLineEdit_RevisionLineEdit").clear();
        type(":Bill of Operations.VirtualClusterLineEdit_RevisionLineEdit",Astatus+Pstatus);
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton")); 
        test.log("Sucessfully edited Work Order revision status");
        
    }
    catch(e)
    {
        test.fail("Error in changing the Work Order revision"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
        
    }
    
    //---Explode the WO--
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Manufacture"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Manufacture_QMenu", "Reports"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Reports_QMenu", "Work Order Schedule"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",WOnum, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Explode..."));
        clickButton(waitForObject(":Explode Work Order.Explode_QPushButton"));
        test.log("WO exploded sucessfully");
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        //---View BOO and BOM for pending state revision enabled---
        //--View BOM ---
        try
        {
            openItemContextMenu(":_list_XTreeWidget_3",WOnum, 5, 5, Qt.LeftButton);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "View Material Requirements..."));
            snooze(1);
            waitForObject(":_list_XTreeWidget_11");
            if(object.exists("{column='0' container=':_list_XTreeWidget_11' text='"+ data.pndBomItem  +"' type='QModelIndex'}"))
                test.pass("Pending state revision Bill Of Materials are displayed sucessfully for a WO");
            else
                test.fail("Failed to display pending state revision Bill Of material");
            
            clickButton(waitForObject(":xTuple ERP:*.Close_QToolButton"));
            
            
        }
        catch(e)
        {
            test.fail("Error in verifying active state revision Bill Of Materials"+e);
            if(object.exists(":xTuple ERP:*.Close_QToolButton"))
                clickButton(":xTuple ERP:*.Close_QToolButton");
        }
        
        //---View BOO for WO with pending state revision selected ---
        try
        {
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            openItemContextMenu(":_list_XTreeWidget_3",WOnum, 5, 5, Qt.LeftButton);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "View Operations..."));
            waitForObject(":_list_XTreeWidget_12");
            if(object.exists("{column='3' container=':_list_XTreeWidget_12' text='"+data.pndBooItem+"' type='QModelIndex'}"))
                test.pass("Pending state revision Bill Of Operations are displayed sucessfully for a WO");
            else
                test.fail("Failed to display pending state revision Bill Of material");
            clickButton(waitForObject(":xTuple ERP:*.Close_QToolButton"));
        }
        catch(e)
        {
            test.fail("Error in verifying the BOO for an work order with pending revision status"+e);
        }
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
    }//Main try
    
    catch(e)
    {
        test.fail("Error in verifying the BOO and BOM for a WO with pending revision enabled"+e);
    }
    
    
    
}
