function main()
{
    
    //-----declarations------
    source(findFile("scripts","functions.js"));
    
    
    //-----Log into Applicaiton--- 
    loginAppl("CONFIGURE");
  
       //--------------- Set the window to Tab view mode -------------
    try
    {
    activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar", "Products"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List..."));
    if(object.exists(":Work Order Schedule.Close_QToolButton"))
    {
        test.log("item screen opened");
        activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar", "Window"));
        if(waitForObjectItem(":xTuple ERP:*.Window_QMenu", "Tab View"))
        {
        activateItem(waitForObjectItem(":xTuple ERP:*.Window_QMenu", "Tab View"));
        }
        clickButton(waitForObject(":Work Order Schedule.Close_QToolButton"));
    }
    }
    catch(e)
    {
        test.fail("exception in changing to Tab view mode" + e);
        clickButton(waitForObject(":Work Order Schedule.Close_QToolButton"));
    }
    
    //MPS – PLAN STATUS “R” - ORDER PARAMETERS OFF & SAFETY STOCK SET TEST
    test.log("MPS – PLAN STATUS “R” - ORDER PARAMETERS OFF & SAFETY STOCK SET TEST");
    
    DelPlanOrdrs();
    
    //----Setup Item site------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
        waitForObject(":Item Sites.More_QToolButton");
        clickButton(":Item Sites.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Site", 10, 10, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox","WH1", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":Scheduling._planningType_XComboBox_4");
        if(findObject(":Scheduling._planningType_XComboBox_4").currentText!="MPS")
            clickItem(":Scheduling._planningType_XComboBox_4", "MPS", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "50");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
               test.fail("Error in setting up Item Site of BTRUCK1" + e);
                if(object.exists(":Item Sites.Close_QToolButton"))
                    clickButton(":Item Sites.Close_QToolButton");
    }
    
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");         
        
        waitForObject(":Order #_HeaderViewItem");
        
        mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        
        if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)            
            mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==2)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="50.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
            }        
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
        if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
    
    
    
    //MPS – SUPPLY SIDE NETTING - QOH
    test.log("MPS – SUPPLY SIDE NETTING - QOH");
    
    DelPlanOrdrs();
    
    UpdateQOH("BTRUCK1",50);
    
    
    //----Setup Item site------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
       if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
        waitForObject(":Item Sites.More_QToolButton");
        clickButton(":Item Sites.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Site", 10, 10, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox","WH1", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
      
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":Scheduling._planningType_XComboBox_4");
       
        if(findObject(":Scheduling._planningType_XComboBox_4").currentText!="MPS")
            clickItem(":Scheduling._planningType_XComboBox_4", "MPS", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
       
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "0");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        snooze(1);
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item site of BTRUCK1" + e);
         if(object.exists(":Item Sites.Close_QToolButton"))
        clickButton(":Item Sites.Close_QToolButton");
    }
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton"); 
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="50.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
            }        
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
         if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
    
    //MPS – SUPPLY SIDE NETTING – QOH – CUMULATIVE MPS
    test.log("MPS – SUPPLY SIDE NETTING – QOH – CUMULATIVE MPS");
    
    DelPlanOrdrs();
    
    //-------Set Schedule Type for Production Plan----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_list_XTreeWidget_2");
        doubleClickItem(":_list_XTreeWidget_2", "BTRUCK-TEST", 0, 0, 0, Qt.LeftButton);
        waitForObject(":_schedtype_QComboBox_2");
        snooze(0.5);
        if(findObject(":_schedtype_QComboBox_2").currentText!="Cumulative MPS")
            clickItem(":_schedtype_QComboBox_2", "Cumulative MPS", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Production Plan.Save_QPushButton");
        clickButton(":Production Plan.Save_QPushButton");
        waitForObject(":List Production Plans.Close_QPushButton");
        clickButton(":List Production Plans.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in set up of production plan" + e);
      if(object.exists(":Production Plan.Save_QPushButton"))
            sendEvent("QCloseEvent", ":Production Plan_XMainWindow");

    }
    
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");         
        snooze(1);
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
               
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
            }        
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
        if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
    
    //MPS – SUPPLY SIDE NETTING – WORK ORDER
    test.log("MPS – SUPPLY SIDE NETTING – WORK ORDER");
    
    DelPlanOrdrs();
    
    NewWO("BTRUCK1",25,0,0);
    
    //-------Set Schedule Type for Production Plan----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_list_XTreeWidget_2");
        doubleClickItem(":_list_XTreeWidget_2", "BTRUCK-TEST", 0, 0, 0, Qt.LeftButton);
        waitForObject(":_schedtype_QComboBox_2");
        if(findObject(":_schedtype_QComboBox_2").currentText!="Forecast Netted to MPS")
            clickItem(":_schedtype_QComboBox_2", "Forecast Netted to MPS", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Production Plan.Save_QPushButton");
        clickButton(":Production Plan.Save_QPushButton");
        waitForObject(":List Production Plans.Close_QPushButton");
        clickButton(":List Production Plans.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in set up of production plan" + e);
         if(object.exists(":Production Plan.Save_QPushButton"))
            sendEvent("QCloseEvent", ":Production Plan_XMainWindow");
        if(object.exists(":List Production Plans.Close_QPushButton"))
        clickButton(":List Production Plans.Close_QPushButton");
    }
    
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton"); 
       
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="25.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
            }        
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
        
         if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
    
    //MPS – SUPPLY SIDE NETTING – WORK ORDER – CUMULATIVE MPS
    test.log("MPS – SUPPLY SIDE NETTING – WORK ORDER – CUMULATIVE MPS");
    
    DelPlanOrdrs();
    
    
    //-------Set Schedule Type for Production Plan----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_list_XTreeWidget_2");
        doubleClickItem(":_list_XTreeWidget_2", "BTRUCK-TEST", 0, 0, 0, Qt.LeftButton);
        waitForObject(":_schedtype_QComboBox_2");
        if(findObject(":_schedtype_QComboBox_2").currentText!="Cumulative MPS")
            clickItem(":_schedtype_QComboBox_2", "Cumulative MPS", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Production Plan.Save_QPushButton");
        clickButton(":Production Plan.Save_QPushButton");

        waitForObject(":List Production Plans.Close_QPushButton");
        clickButton(":List Production Plans.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in set up of production plan" + e);
        
         if(object.exists(":List Production Plans.Close_QPushButton"))
        clickButton(":List Production Plans.Close_QPushButton");
    }
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton"); 
       
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
               
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
            }        
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
         if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
    
    //MPS – SUPPLY SIDE NETTING – PURCHASE ORDER
    test.log("MPS – SUPPLY SIDE NETTING – PURCHASE ORDER");
    
    DelPlanOrdrs();
    
    newPO("BTRUCK1", 10, 0);
    
    
    //-------Set Schedule Type for Production Plan----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_list_XTreeWidget_2");
        doubleClickItem(":_list_XTreeWidget_2", "BTRUCK-TEST", 0, 0, 0, Qt.LeftButton);
       
        waitForObject(":_schedtype_QComboBox_2");
        if(findObject(":_schedtype_QComboBox_2").currentText!="Forecast Netted to MPS")
            clickItem(":_schedtype_QComboBox_2", "Forecast Netted to MPS", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Production Plan.Save_QPushButton");
        clickButton(":Production Plan.Save_QPushButton");
        waitForObject(":List Production Plans.Close_QPushButton");
        clickButton(":List Production Plans.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in set up of production plan" + e);
      if(object.exists(":Production Plan.Save_QPushButton"))
            sendEvent("QCloseEvent", ":Production Plan_XMainWindow");
        if(object.exists(":List Production Plans.Close_QPushButton"))
        clickButton(":List Production Plans.Close_QPushButton");
    }
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton"); 
       
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="15.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
            }        
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
         if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");

    }
    
    
    //MPS – SUPPLY SIDE NETTING – PURCHASE ORDER – CUMULATIVE MPS
    test.log("MPS – SUPPLY SIDE NETTING – PURCHASE ORDER – CUMULATIVE MPS");
    
    DelPlanOrdrs();
    
    
    //-------Set Schedule Type for Production Plan----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_list_XTreeWidget_2");
        doubleClickItem(":_list_XTreeWidget_2", "BTRUCK-TEST", 0, 0, 0, Qt.LeftButton);
        waitForObject(":_schedtype_QComboBox_2");
        if(findObject(":_schedtype_QComboBox_2").currentText!="Cumulative MPS")
            clickItem(":_schedtype_QComboBox_2", "Cumulative MPS", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Production Plan.Save_QPushButton");
        clickButton(":Production Plan.Save_QPushButton");
        waitForObject(":List Production Plans.Close_QPushButton");
        clickButton(":List Production Plans.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in set up of production plan" + e);
       if(object.exists(":Production Plan.Save_QPushButton"))
            sendEvent("QCloseEvent", ":Production Plan_XMainWindow");
        if(object.exists(":List Production Plans.Close_QPushButton"))
        clickButton(":List Production Plans.Close_QPushButton");
    }
    
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton"); 
        snooze(3);
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
            }        
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
         if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
  
  //MPS – SUPPLY SIDE NETTING – TRANSFER ORDER
  test.log("MPS – SUPPLY SIDE NETTING – TRANSFER ORDER");

    //---Create and Release the TO------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transfer Order");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Transfer Order");
        waitForObjectItem(":xTuple ERP:*.Transfer Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Transfer Order_QMenu", "New...");
        snooze(3);
        waitForObject(":Transfer Order.*_QLabel");
        var TO = findObject(":Transfer Order.*_QLabel").text;
        waitForObjectItem(":_srcWhs_WComboBox_2", "WH2");
        clickItem(":_srcWhs_WComboBox_2", "WH2", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Transfer Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Transfer Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton_3");
        clickButton(":_lineItemsPage.New_QPushButton_3");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_6");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_6", "BTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyOrdered_XLineEdit_2");
        type(":_qtyOrdered_XLineEdit_2", "5");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit");
        type(":_dateGroup.XDateEdit_XDateEdit", "0");
        type(":_dateGroup.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":_dateGroup.XDateEdit_XDateEdit_2");
        type(":_dateGroup.XDateEdit_XDateEdit_2", "0");
        type(":_dateGroup.XDateEdit_XDateEdit_2", "<Tab>");
        waitForObject(":Transfer Order.Save_QPushButton");
        clickButton(":Transfer Order.Save_QPushButton");
        waitForObject(":Transfer Order.Close_QPushButton");
        clickButton(":Transfer Order.Close_QPushButton");
        waitForObject(":Transfer Order.Save_QPushButton_2");
        clickButton(":Transfer Order.Save_QPushButton_2");
        waitForObject(":Transfer Order.Cancel_QPushButton");
        clickButton(":Transfer Order.Cancel_QPushButton");
        snooze(3);
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Transfer Order");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Transfer Order");
        waitForObjectItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Transfer Order_QMenu", "List Open...");
        waitForObject(":Source Site:.All Sites_QRadioButton");
        clickButton(":Source Site:.All Sites_QRadioButton");
        waitForObjectItem(":_frame._to_XTreeWidget", "WH2");
        snooze(1);
        clickItem(":_frame._to_XTreeWidget", TO, 0, 0, 1, Qt.LeftButton);
        waitForObject(":_frame.Release_QPushButton");
        clickButton(":_frame.Release_QPushButton");
        waitForObject(":List Open Transfer Orders.Close_QPushButton");
        clickButton(":List Open Transfer Orders.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating and releasing transfer order" + e);
         if(object.exists(":List Open Transfer Orders.Close_QPushButton"))
        clickButton(":List Open Transfer Orders.Close_QPushButton");
    }
    
    
    //-----Set Schedule Type for Production Plan----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        waitForObject(":_list_XTreeWidget_2");
        doubleClickItem(":_list_XTreeWidget_2", "BTRUCK-TEST", 0, 0, 0, Qt.LeftButton);
        waitForObject(":_schedtype_QComboBox_2");
        if(findObject(":_schedtype_QComboBox_2").currentText!="Forecast Netted to MPS")
            clickItem(":_schedtype_QComboBox_2", "Forecast Netted to MPS", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Production Plan.Save_QPushButton");
        clickButton(":Production Plan.Save_QPushButton");
               waitForObject(":List Production Plans.Close_QPushButton");
        clickButton(":List Production Plans.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in set up of production plan" + e);
              if(object.exists(":Production Plan.Save_QPushButton"))
            sendEvent("QCloseEvent", ":Production Plan_XMainWindow");
        if(object.exists(":List Production Plans.Close_QPushButton"))
        clickButton(":List Production Plans.Close_QPushButton");
    }
    
    MPS("+150");
    
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton"); 
      
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="10.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
            }        
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
                         if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
    
    //MPS – DEMAND SIDE NETTING – SALES ORDER, INSIDE TIME FENCE
    test.log("MPS – DEMAND SIDE NETTING – SALES ORDER, INSIDE TIME FENCE");
    DelAllSO();
    DelAllTO();
    DelAllPO();
    DelAllWO();
    DelPlanOrdrs();    
    QOHZero("BTRUCK1");
    
    //--------Change Schedule date of Production Plan Item------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        
        waitForObject(":_list_XTreeWidget_2");
        doubleClickItem(":_list_XTreeWidget_2", "BTRUCK-TEST", 0, 0, 0, Qt.LeftButton);
        waitForObject(":_list_XTreeWidget_8");
        doubleClickItem(":_list_XTreeWidget_8", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Production Plan Item.XDateEdit_XDateEdit");
        findObject(":Production Plan Item.XDateEdit_XDateEdit").clear();
        type(":Production Plan Item.XDateEdit_XDateEdit", "+7");
        type(":Production Plan Item.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":Production Plan Item.Save_QPushButton");
        clickButton(":Production Plan Item.Save_QPushButton");
        waitForObject(":Production Plan.Save_QPushButton");
        clickButton(":Production Plan.Save_QPushButton");
  
        waitForObject(":List Production Plans.Close_QPushButton");
        clickButton(":List Production Plans.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in set up of production plan" + e);
       if(object.exists(":Production Plan.Save_QPushButton"))
            sendEvent("QCloseEvent", ":Production Plan_XMainWindow");
        if(object.exists(":List Production Plans.Close_QPushButton"))
        clickButton(":List Production Plans.Close_QPushButton");

    }
    
    //---Change the Time Fence----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        snooze(3);
        if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
        waitForObject(":Item Sites.More_QToolButton");
        clickButton(":Item Sites.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Site", 10, 10, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox","WH1", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);       
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "14");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of BTRUCK1" + e);
           if(object.exists(":Item Sites.Close_QToolButton"))
        clickButton(":Item Sites.Close_QToolButton");

    }
    
    //-----Create Sales Order-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "New...");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_2");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_2", "BTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyOrdered_XLineEdit");
        type(":_qtyOrdered_XLineEdit", "75");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        type(":_schedGroup.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "+7");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton");
        clickButton(":Sales Order.Close_QPushButton");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in create sales orders" + e);
    }
    
    MPS("+150");
    
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");  
      
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="75.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
            }        
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
          if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
    
    
    
    //MPS – DEMAND SIDE NETTING – S/O, OUTSIDE TIME FENCE < FORECAST
    test.log("MPS – DEMAND SIDE NETTING – S/O, OUTSIDE TIME FENCE < FORECAST");
    
    DelPlanOrdrs();
    
    
    //---Change the Time Fence----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        snooze(3);
      if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
        waitForObject(":Item Sites.More_QToolButton");
        clickButton(":Item Sites.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Site", 10, 10, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox","WH1", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
        snooze(3);
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "5");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item site of BTRUCK1" + e);
         if(object.exists(":Item Sites.Close_QToolButton"))
        clickButton(":Item Sites.Close_QToolButton");
    }
    
    MPS("+150");
    
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");  
        
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
            }        
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
         if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
    
    
    // MPS – DEMAND SIDE NETTING – S/O, OUTSIDE TIME FENCE > FORECAST
    test.log("MPS – DEMAND SIDE NETTING – S/O, OUTSIDE TIME FENCE > FORECAST");
    
    DelPlanOrdrs();
    DelAllSO();
    
    //-----Create Sales Order-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales");
        activateItem(":xTuple ERP:*_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP:*.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "New...");
        activateItem(":xTuple ERP:*.Sales Order_QMenu", "New...");
        
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit", "TTOYS");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit_2");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit_2", "BTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_qtyOrdered_XLineEdit");
        type(":_qtyOrdered_XLineEdit", "125");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        type(":_schedGroup.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_4");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "+7");
        type(":_schedGroup.XDateEdit_XDateEdit_4", "<Tab>");
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton");
        clickButton(":Sales Order.Close_QPushButton");
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in creating sales order" + e);
    }
    
    MPS("+150");
    
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton");  
      
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==1)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="125.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
            }        
            else test.fail("Incorrect Planned Order generated");
        }    
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
         if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
    
    //MPS – TIME PHASED PRODUCTION SCHEDULE LINES
    test.log("MPS – TIME PHASED PRODUCTION SCHEDULE LINES");
    
    DelPlanOrdrs();
    
    DelAllSO();
    
    //-------Add Items to the Production Plan----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Production Plan");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        
        waitForObject(":_list_XTreeWidget_2");
        doubleClickItem(":_list_XTreeWidget_2", "BTRUCK-TEST", 0, 0, 0, Qt.LeftButton);
        
        waitForObject(":frame.New_QPushButton_3");
        clickButton(":frame.New_QPushButton_3");
       
        waitForObject(":Production Plan Item.ItemLineEdit_ItemLineEdit");
        type(":Production Plan Item.ItemLineEdit_ItemLineEdit", "BTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Production Plan Item.XDateEdit_XDateEdit");
        type(":Production Plan Item.XDateEdit_XDateEdit", "+21");
        waitForObject(":Production Plan Item.XDateEdit_XDateEdit");
        type(":Production Plan Item.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":Production Plan Item._qty_XLineEdit");
        type(":Production Plan Item._qty_XLineEdit", "200");
        waitForObject(":Production Plan Item.Save_QPushButton");
        clickButton(":Production Plan Item.Save_QPushButton");
       
        waitForObject(":frame.New_QPushButton_3");
        clickButton(":frame.New_QPushButton_3");
        waitForObject(":Production Plan Item.ItemLineEdit_ItemLineEdit");
        type(":Production Plan Item.ItemLineEdit_ItemLineEdit", "BTRUCK1");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Production Plan Item.XDateEdit_XDateEdit");
        type(":Production Plan Item.XDateEdit_XDateEdit", "+35");
        waitForObject(":Production Plan Item.XDateEdit_XDateEdit");
        type(":Production Plan Item.XDateEdit_XDateEdit", "<Tab>");
        waitForObject(":Production Plan Item._qty_XLineEdit");
        type(":Production Plan Item._qty_XLineEdit", "300");
        waitForObject(":Production Plan Item.Save_QPushButton");
        clickButton(":Production Plan Item.Save_QPushButton");
        
        waitForObject(":Production Plan.Save_QPushButton");
        clickButton(":Production Plan.Save_QPushButton");
             waitForObject(":List Production Plans.Close_QPushButton");
        clickButton(":List Production Plans.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in set up of Production plan" + e);
        if(object.exists(":Production Plan.Save_QPushButton"))
            sendEvent("QCloseEvent", ":Production Plan_XMainWindow");
        if(object.exists(":List Production Plans.Close_QPushButton"))
        clickButton(":List Production Plans.Close_QPushButton");
    }
    
    //---Change the Time Fence----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
       
       if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
        waitForObject(":Item Sites.More_QToolButton");
        clickButton(":Item Sites.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Site", 10, 10, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox","WH1", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
    
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "BTRUCK1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_10").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_10", "1");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
        test.log("Item Site setup for: BTRUCK1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of BTRUCK1" + e);
        if(object.exists(":Item Sites.Close_QToolButton"))
           clickButton(":Item Sites.Close_QToolButton");
    }
    
    MPS("+150");
    
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton"); 
      
        waitForObject(":Order #_HeaderViewItem");
        
        mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        
        if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)            
            mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==3)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
               
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
              
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="200.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
               
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="300.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
            }        
            else test.fail("Incorrect Planned Order generated");
            
        }        
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
         if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
    
    //MPS – TIME PHASED PRODUCTION SCHEDULE LINES – NETTED TO W/O
    test.log("MPS – TIME PHASED PRODUCTION SCHEDULE LINES – NETTED TO W/O");
    
    DelPlanOrdrs();
    
    NewWO("BTRUCK1",250, 0, "+14");
    
    MPS("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton"); 
       
        waitForObject(":Order #_HeaderViewItem");
        
        mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
       
        if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)            
            mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==2)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="250.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
            }        
            else test.fail("Incorrect Planned Order generated");
            
        }        
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
          if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
    
    //MPS/MRP – TIME PHASED PRODUCTION SCHEDULE LINES – NETTED TO W/O
    test.log("MPS/MRP – TIME PHASED PRODUCTION SCHEDULE LINES – NETTED TO W/O");
    
    DelPlanOrdrs();
    
    UpdateQOH("TBODY1",2323);
    UpdateQOH("YPAINT1",2323);
    UpdateQOH("TWHEEL1",2323);
    UpdateQOH("TINSERT1",2323);
    QOHZero("TSUB1");
    QOHZero("TBOX1");
    
    //----Setup Item site------
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory");
        activateItem(":xTuple ERP:*_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        activateItem(":xTuple ERP:*.Inventory_QMenu", "Item Site");
        waitForObjectItem(":_QMenu", "List...");
        activateItem(":_QMenu", "List...");
        snooze(3);
        if(!object.exists(":_filterGroup.Manage_QPushButton"))
        {
        waitForObject(":Item Sites.More_QToolButton");
        clickButton(":Item Sites.More_QToolButton");
        }
        waitForObject(":_filterGroup.xcomboBox1_XComboBox");
        clickItem(":_filterGroup.xcomboBox1_XComboBox","Site", 10, 10, 0, Qt.LeftButton);
        waitForObject(":_filterGroup.widget1_WComboBox");
        clickItem(":_filterGroup.widget1_WComboBox","WH1", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":Item Sites.Query_QToolButton");
        clickButton(":Item Sites.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "TSUB1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        if(findObject(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2").checked)
            clickButton(":Site can manufacture this Item.Create Work Orders linked to Sales Orders_QCheckBox_2");
        
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        waitForObject(":Scheduling._planningType_XComboBox_4");
        if(findObject(":Scheduling._planningType_XComboBox_4").currentText!="MRP")
            clickItem(":Scheduling._planningType_XComboBox_4", "MRP", 0, 0, 1, Qt.LeftButton);
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "0");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        test.log("Item Site setup for: TSUB1");
    }
    catch(e)
    {
        test.fail("Error in setting up Item site of TSUB1" + e);
        if(object.exists(":Item Sites.Save_QPushButton"))
           clickButton(":Item Sites.Save_QPushButton");
    }
    
    
    //----Setup Item site------   
    try
    {        
        waitForObject(":_list_XTreeWidget_11");
        doubleClickItem(":_list_XTreeWidget_11", "TBOX1", 0, 0, 0, Qt.LeftButton);
        waitForObject(":Item Sites.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Sites.qt_tabwidget_tabbar_QTabBar", "Planning");
        waitForObject(":_planningTab.Enforce Order Parameters_QGroupBox_4");
        if(!findObject(":_planningTab.Enforce Order Parameters_QGroupBox_4").checked)
            type(":_planningTab.Enforce Order Parameters_QGroupBox_4"," ");
        waitForObject(":Scheduling._planningType_XComboBox_4");
        if(findObject(":Scheduling._planningType_XComboBox_4").currentText!="MRP")
            clickItem(":Scheduling._planningType_XComboBox_4", "MRP", 0, 0, 1, Qt.LeftButton);
        
        waitForObject(":_reorderLevel_XLineEdit_4");
        findObject(":_reorderLevel_XLineEdit_4").clear();
        type(":_reorderLevel_XLineEdit_4", "0");
        findObject(":_orderUpToQty_XLineEdit_4").clear();
        type(":_orderUpToQty_XLineEdit_4", "0");
        findObject(":_minimumOrder_XLineEdit_4").clear();
        type(":_minimumOrder_XLineEdit_4", "0");
        findObject(":_maximumOrder_XLineEdit_4").clear();
        type(":_maximumOrder_XLineEdit_4", "0");
        findObject(":_orderMultiple_XLineEdit_4").clear();
        type(":_orderMultiple_XLineEdit_4", "0");
        findObject(":Scheduling._safetyStock_XLineEdit_4").clear();
        type(":Scheduling._safetyStock_XLineEdit_4", "0");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_8").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_8", "1");
        findObject(":Scheduling.qt_spinbox_lineedit_QLineEdit_9").clear();
        type(":Scheduling.qt_spinbox_lineedit_QLineEdit_9", "3");
        waitForObject(":Scheduling.First Group_QCheckBox_4");
        if(!findObject(":Scheduling.First Group_QCheckBox_4").checked)
            clickButton(":Scheduling.First Group_QCheckBox_4");
        waitForObject(":Item Sites.Save_QPushButton");
        clickButton(":Item Sites.Save_QPushButton");
        test.log("Item Site setup for: TBOX1");
        waitForObject(":Item Sites.Close_QToolButton");
        clickButton(":Item Sites.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in setting up Item Site of TBOX1" + e);
          if(object.exists(":Item Sites.Close_QToolButton"))
           clickButton(":Item Sites.Close_QToolButton");
    }
    
    
    
    
    //Prepare the DB for DRP scenarios execution
    UpdateQOHWh("TWHEEL1",24000,"WH1");
    
    
    MPS("+150");
    
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton"); 
        snooze(3);
        waitForObject(":Order #_HeaderViewItem");
        
        mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        snooze(3);
        if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)            
            mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
      
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==2)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="250.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
            }        
            else test.fail("Incorrect Planned Order generated");
            
        }        
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
        if(object.exists(":Planned Orders.Close_QToolButton"))
             clickButton(":Planned Orders.Close_QToolButton");
    }
    
    MRP("+150");
    
    //------Verify generated Planned Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar", "Schedule");
        activateItem(":xTuple ERP:*_QMenuBar", "Schedule");
        waitForObjectItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        activateItem(":xTuple ERP:*.Schedule_QMenu", "Reports");
        waitForObjectItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        activateItem(":xTuple ERP:*.Reports_QMenu", "Planned Orders...");
        waitForObject(":Planned Orders.Query_QToolButton");
        clickButton(":Planned Orders.Query_QToolButton"); 
        snooze(3);
        waitForObject(":Order #_HeaderViewItem");
        
        mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        
        if(findObject(":_planord.Col1_QModelIndex").text> findObject(":_planord.Col2_QModelIndex").text)
                        mouseClick(":Order #_HeaderViewItem", 10, 10, 0, Qt.LeftButton);
        
        waitForObject(":_list_XTreeWidget_10");
        var sWidgetTreeControl = ":_list_XTreeWidget_10";
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        if(iNumberOfRootItems>0)
        {
            if(iNumberOfRootItems==8)
            {
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(1);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="BTRUCK1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="250.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(2);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(3);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="250.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(4);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="TSUB1" && obj_TreeTopLevelItem.text(1)=="W/O" && obj_TreeTopLevelItem.text(10)=="250.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(5);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(1)=="P/O" && obj_TreeTopLevelItem.text(10)=="100.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(6);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(1)=="P/O" && obj_TreeTopLevelItem.text(10)=="250.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
                obj_TreeTopLevelItem = obj_TreeRootItem.child(7);
                snooze(3);
                if(obj_TreeTopLevelItem.text(4)=="TBOX1" && obj_TreeTopLevelItem.text(1)=="P/O" && obj_TreeTopLevelItem.text(10)=="250.00")
                    test.pass("Expected Planned Order generated");
                else 
                    test.fail("Incorrect Planned Order generated");
                
            }        
            else test.fail("Incorrect Planned Order generated");
            
        }        
        else test.fail("No Planned Order generated");   
        waitForObject(":Planned Orders.Close_QToolButton");
        clickButton(":Planned Orders.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in viewing planned orders" + e);
          if(object.exists(":Planned Orders.Close_QToolButton"))
        clickButton(":Planned Orders.Close_QToolButton");
    }
    
}
