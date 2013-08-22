
/*-----------------------------------------------------------------------------------------------
                                         Start in a Fresh demo Data Base
-----------------------------------------------------------------------------------------------*/

function main()
{
    
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("CONFIGURE"); 
    
    
    //-----Editing the preferences----
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Preferences...");
        activateItem(":xTuple ERP: *._System_QMenu", "Preferences...");
        if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
        {
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
        }
        
        if(object.exists(":Notice.Notice_QDialog"))
        {
            if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
                clickButton(":Notice.Remind me about this again._QCheckBox");
            snooze(0.2);
            waitForObject(":Notice.OK_QPushButton");
            clickButton(":Notice.OK_QPushButton");
        }
        waitForObject(":User Preferences.Save_QPushButton_2");
        clickButton(":User Preferences.Save_QPushButton_2");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
    }
    catch(e)
    {
        test.fail("Error in editing preferences"+ e);
    } 
    
    //--------Exiting the application------
    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
    activateItem(":xTuple ERP: *_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
    snooze(5);
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    var appEdition = findApplicationEdition();
    
    
    var target="DROPSHIP";
    var sourceitem="TBOX1";
    var soqty = "100";
    var soqty1 =soqty +".00";
    
    //------ Enabling Tab View ------
    
    tabView();
    //---Disable DropShipped Orders for Billing on receipt option  from Purchase setup---
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Setup...");
        snooze(1);
        ponumber5 = findObject(":_nextPoNumber_XLineEdit").text;
        waitForObject(":Options.Select Drop Shipped Orders for Billing on Receipt_QCheckBox");
        snooze(0.5);
        if(findObject(":Options.Select Drop Shipped Orders for Billing on Receipt_QCheckBox").checked)
        {
            clickButton(":Options.Select Drop Shipped Orders for Billing on Receipt_QCheckBox");
        }
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        test.log("DropShipped Orders for Billing on receipt option disabled sucessfully:");
    }
    catch(e)
    {
        test.fail("Failed to disable DropShipped Orders for Billing on receipt:");
    }
    
    //--------Creating DropShip enabled  Purchase Type item-------------
    
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        
        waitForObject(":_list_XTreeWidget_3");
        clickItem(":_list_XTreeWidget_3", sourceitem, 0, 0, 5, Qt.LeftButton);
        openItemContextMenu(":_list_XTreeWidget_3", sourceitem, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
        
        waitForObject(":_targetItemNumber_XLineEdit_2");
        type(":_targetItemNumber_XLineEdit_2", target);
        
        if(!findObject(":Copy Item.Copy Item Costs_QCheckBox").checked)
        {
            clickButton(":Copy Item.Copy Item Costs_QCheckBox");
        }
        if(!findObject(":Copy Item.Copy Bill of Materials_QCheckBox").checked)
        {
            clickButton(":Copy Item.Copy Bill of Materials_QCheckBox");
        }
        if(object.exists(":Copy Item.Copy Bill of Operations_XCheckBox"))
        {
            if(!findObject(":Copy Item.Copy Bill of Operations_XCheckBox").checked)
            {
                clickButton(":Copy Item.Copy Bill of Operations_XCheckBox");
            }
            if(!findObject(":Copy Item.Copy Used At Operation_XCheckBox").checked)
            {
                clickButton(":Copy Item.Copy Used At Operation_XCheckBox");
            }
        }
        waitForObject(":Items.Copy_QPushButton");
        clickButton(":Items.Copy_QPushButton");
        
        waitForObject(":Sales Order.No_QPushButton");
        clickButton(":Sales Order.No_QPushButton");
        snooze(1);
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+target+"' type='QModelIndex'}"))
            test.pass("Item " + target +" created");
        else
            test.fail("Item creation failed");
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Exception in creating Item " + e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    //------------Create Regular Item Site with DropShip enable----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "New...");
        activateItem(":_QMenu", "New...");
        
        waitForObject(":Item Site.ItemLineEdit_ItemLineEdit");
        type(":Item Site.ItemLineEdit_ItemLineEdit", target);
        nativeType("<Tab>");
        snooze(0.5);
        if(object.exists(":_warehouse_WComboBox_2"))
        {
            waitForObject(":_warehouse_WComboBox_2");
            clickItem(":_warehouse_WComboBox_2", "WH1", 0, 0, 5, Qt.LeftButton);
        }
        snooze(0.5);
        if(!findObject(":Items.Site can manufacture this Item_QGroupBox"))
        {
            type(":Items.Site can manufacture this Item_QGroupBox"," ");
        }
        if(findObject(":Item Site.Site can purchase this Item_QGroupBox"))
        {
            type(":Item Site.Site can purchase this Item_QGroupBox", " ");
        }
        
        if(!findObject(":Site can purchase this Item.Create Purchase Orders linked to Sales Orders_QCheckBox").checked)
            clickButton(":Site can purchase this Item.Create Purchase Orders linked to Sales Orders_QCheckBox");
        waitForObject(":Sales Order.OK_QPushButton_2");
        clickButton(":Sales Order.OK_QPushButton_2");
        if(!findObject(":Site can purchase this Item.Drop ship Items by default_QCheckBox").checked)
            clickButton(":Site can purchase this Item.Drop ship Items by default_QCheckBox");
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
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        snooze(0.5);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
        {
            waitForObject(":Sales Order.Cancel_QPushButton");
            clickButton(":Sales Order.Cancel_QPushButton");
        }
    }
    catch(e)
    {
        test.fail("Exception in creating Itemsite for "+target+e);
    }
    
    //------Item Source Creation for the Drop Ship item---------
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
        activateItem(":xTuple ERP: *_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",target,5, 5, Qt.LeftButton);    
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        
        waitForObject(":Item is Sold.Exclusive_QCheckBox");
        if(findObject(":Item is Sold.Exclusive_QCheckBox").checked)
        {
            clickButton(":Item is Sold.Exclusive_QCheckBox");
        }
        waitForObject(":Item is Sold._listprice_XLineEdit").clear();
        type(":Item is Sold._listprice_XLineEdit", "1");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Sources");
        waitForObject(":_sourcesTab.New_QPushButton");
        clickButton(":_sourcesTab.New_QPushButton");
        waitForObject(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit");
        type(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit", "TPARTS");
        waitForObject(":_venditemGroup._vendorItemNumber_XLineEdit");
        type(":_venditemGroup._vendorItemNumber_XLineEdit", "1");
        waitForObject(":_vendorUOM_XComboBox");
        clickItem(":_vendorUOM_XComboBox","EA",0, 0, 5, Qt.LeftButton);
        waitForObject(":_venditemGroup._invVendorUOMRatio_XLineEdit");
        type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
        waitForObject(":_venditemGroup._upcCode_XLineEdit");
        type(":_venditemGroup._upcCode_XLineEdit", "1");
        
        snooze(3);
        waitForObject(":Quote.qt_tabwidget_tabbar_QTabBar_2");
        clickTab(":Quote.qt_tabwidget_tabbar_QTabBar_2", "Prices");
        waitForObject(":_pricesTab.Add_QPushButton");
        clickButton(":_pricesTab.Add_QPushButton");
        waitForObject(":_prodCatGroup._qtyBreak_XLineEdit");
        type(":_prodCatGroup._qtyBreak_XLineEdit", "100");
        type(":Item Source Price.XLineEdit_XLineEdit", "1");
        waitForObject(":Item Source Price.Save_QPushButton");
        clickButton(":Item Source Price.Save_QPushButton");
        waitForObject(":Item Source.Default_QCheckBox");
        if(!findObject(":Item Source.Default_QCheckBox").checked)
        {
            clickButton(":Item Source.Default_QCheckBox");
        }
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.pass("ItemSoueces Created sucessfully:");
    }
    catch(e)
    {
        
        test.fail("Failed to Create Itemsources:");
    }
    
    
    
    
    
    
    
    
    
    
    //---SO Creation---
    var sonumber4;
    
    sonumber4 = createSalesOrder(target,soqty);
    
    //------------Releasing PO ------------ 
    
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");    
        snooze(1);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");  
        snooze(1);
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",ponumber5, 5, 5, Qt.LeftButton);
        snooze(1);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release...");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Purchase Orders released successfully");
    }
    catch(e)
    {
        test.fail("Error in posting purchase orders" + e);
    }
    
    //------Posting receipt------
    var rqty;
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", ponumber5);
        nativeType("<Tab>");
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.pass("Receipt posted sucessfully:");
    }
    catch(e)
    {
        test.fail("PO Posting failed"+ e);
    }
    
    //--------------Verifying Gl Entries-----------------
    
    var ponumbergl =ponumber5+"-1";
    bool = glTransactions(/Receive Inventory from/,ponumbergl); 
    
    if(bool == 1)
    {
        test.pass("PO receipt " + ponumbergl + " has a GL entry");
    }
    else
        test.fail("No GL entry is made for posting receipt" + ponumbergl);
    
    
    
    
    
    //----Verifying shipment status-----
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Select Order for Billing...");
        if(OS.name == "Linux")
        {
            snooze(1);
            type(waitForObject(":xTuple ERP: *.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        
        snooze(2);
        waitForObject(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit");
        type(":_orderGroup.VirtualClusterLineEdit_OrderLineEdit", sonumber4);
        nativeType("<Tab>");
        waitForObject(":_lineitemsTab._soitem_XTreeWidget");
        if(object.exists("{column='5' container=':_lineitemsTab._soitem_XTreeWidget' text='"+soqty1+"' type='QModelIndex'}"))
            test.pass("Shippment done Automatically:");
        else
            test.fail("Failed to perform Shipment Automatically:");
        snooze(0.5);
        
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        snooze(0.5);
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("error in Shipping automatically:"+e);
    }
    
    //------ To avoid unexpected blocks -------
    if(OS.name != "Windows")
    {
        doNothing();
    }
    snooze(10);
    //-----------Verifying for SO for Billing----------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Billing Selections...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Billing Selections...");
        snooze(2);
        if(OS.name == "Linux")
        {
            snooze(1);
            type(waitForObject(":xTuple ERP: *.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        waitForObject(":xTuple ERP:*._cobill_XTreeWidget");
        if(object.exists("{column='0' container=':xTuple ERP:*._cobill_XTreeWidget' text='"+sonumber4+"' type='QModelIndex'}"))
        {
            test.fail("Sales Order is selected for Billing in Billing Selections");
        }
        else
            test.pass("Sales Order is not selected for billing in Billing Selections:");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error occured in selecting SO for billing:"+e);
    }
    
}
