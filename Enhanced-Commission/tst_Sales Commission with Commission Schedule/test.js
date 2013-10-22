




function init()
{
    data = new Object();
    var set = testData.dataset("Data.tsv");
    
    var targetItem   = new Array();
    var schName      = new Array();
    var srNum        = new Array();
    var srName       = new Array();
    var custName     = new Array();
    var custType     = new Array();
    var shipNum      = new Array();
    var custCode     = new Array();
    var srpGName     = new Array();
    
    //--
    var record = set[0];
    data.sourceItem  = testData.field(record,"SOURCEITEM");
    data.listPrice   = testData.field(record,"LISTPRICE");
    data.wSalePrice  = testData.field(record,"WSALEPRICE");
    data.schDesc     = testData.field(record,"SCHDESC");
  
    data.custDesc    = testData.field(record,"CUSTDESC");
    data.pCtgry      = testData.field(record,"PCTGRY");
   // data.srpGName    = testData.field(record,"SRPGNAME");       
    //--
   
    
    for (var row = 0; row < set.length; ++row)
    {
        var record = set[row];
        targetItem[row]    = testData.field(record,"TARGETITEM");
        schName[row]       = testData.field(record,"SCHNAME");
        srNum[row]         = testData.field(record,"SRNUM");
        srName[row]        = testData.field(record,"SRNAME");
        custType[row]      = testData.field(record,"CUSTTYPE");
        custName[row]      = testData.field(record,"CUSTNAME");
        shipNum[row]       = testData.field(record,"SHIPNUM");
        custCode[row]      = testData.field(record,"CUSTCODE");
        srpGName[row]      = testData.field(record,"SRPGNAME");
    }   
    
    data.targetItem    =  targetItem;
    data.schName       =  schName;
    data.srNum         =  srNum;
    data.srName        =  srName;
    data.custType      =  custType;
    data.custName      =  custName;
    data.shipNum       =  shipNum;
    data.custCode      =  custCode;
    data.srpGName      =  srpGName;
     
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(1);
    
    
}





function main()

{  
     //---Configure sales setup with Primary sales rep receives full and remaining set to None---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Additional setup option for commission._primarySalesRep_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRep_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._primarySalesRepMgr_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRepMgr_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addSalesRep_XComboBox");
        clickItem(":Additional setup option for commission._addSalesRep_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addMgr_XComboBox");
        clickItem(":Additional setup option for commission._addMgr_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sales setup configured sucessfully with Primary sales rep receives full and remaining set to None");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    //---Create an item for verifying Commission--
    
    
    //--Creating an item (Can be used for all Commission schedule assignment verification)---
   
    copyitem(data.sourceItem,data.targetItem[0],data.listPrice,data.wSalePrice);
    //---Create item-site----
    createRIS(data.targetItem[0]);
    
    
    
    
    
    
    
    
    
    
    //--Commission Schedules ---
    //--Creating a Commission Schedules---
    
    
    
    // var schName ="CSCH1";
    // var schDesc = "New Commission schedule created";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules", 62, 13, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        type(waitForObject(":_stack._schedName_XLineEdit"),data.schName[0]);
        nativeType("<Tab>");
        type(waitForObject(":_stack._descrip_QTextEdit"),data.schDesc);
        snooze(1);
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "10");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "5");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "8");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //-- 
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "10");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "5");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //-- 
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "20");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "2");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "100");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "0");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //--Verifying the Commission schedule created --
        snooze(1);
        waitForObject(":_stack._commshedes_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._commshedes_XTreeWidget' text='"+data.schName[0]+"' type='QModelIndex'}"))
            test.pass("Commission schedule " + data.schName[0] +" created");
        else
            test.fail("Commission schedule creation failed");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating commission schedule"+e);
        if(object.exists(":_stack.Close_QPushButton"))
            clickButton(":_stack.Close_QPushButton");
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
    
    
    
    
    
    
    //---PART-1-- COMMISSION SCHEDULE ASSIGNMENT FOR SALES REP---
    
    //---Create a sales representative---
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[3]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[3]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[3]+"' type='QModelIndex'}"))
            test.pass("Sales Representative created successfully");
        else  
            test.fail("Sales Representative creation failed"); 
        snooze(3);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }             
    
    
    
    //---Create a Customer----
   
    createCustomer(data.custType[0],data.custName[1],data.shipNum[1]);
    
    //---Assigning the primary sales rep to the customer----
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[1], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        //---Assign sales representative created as primary sales rep to Customer
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srNum[3] +'-'+ data.srName[3], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        if(object.exists(":Registration Key.Yes_QPushButton"))
            clickButton(":Registration Key.Yes_QPushButton");
        //---Verifying the Customer with primary sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[3]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the customer ");
        snooze(1); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative  assigined sucessfully to the customer");
    }
    
    catch(e)
    {
        test.fail("Error in assigning primary sales representative to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    
    
    
    
    
    
    
    //---Commission Schedule Assignment by sales rep--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[0], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Sales Rep_XCheckBox"));
        waitForObject(":Assignment._salesRep_XComboBox");
        clickItem(":Assignment._salesRep_XComboBox",data.srNum[3], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Options.Exclude Other Schedules_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Commission schedule assigned sucessfully to the sales rep");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to sales representative"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
    
    
    
    
    
    
    
    //----Creating the sales Order and veridying the commission applied based in discount rate ---
    
    var disP = "20";
    var sonum = createSalesOrderDiscp(data.custName[1],data.targetItem[0],"100",disP);
    
    //---Edit the sales order and verify the commision rate and Commission applied---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[0], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        waitForObject(":Commissions._commissions_XTreeWidget");
        var rate = findObject("{column='7' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text;
        test.log(rate);
        var eCmp  = parseInt(findObject("{column='9' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text);
        test.log(eCmp);
        
        //---Calculating the Commission%
        var cmnP = parseInt((subtl*rate)/100);
        test.log(cmnP);
        
        if((rate == 2) && (eCmp == cmnP) )
        {
            test.pass("Commission rate displayed correctly as per the commission schedule and commission rate  calcuated correctly on Sales Order");
            test.log("Commission schedule applied on sales order verified sucessfully");
        }
        else  
            test.fail("Incorrect commission rate displayed and failed to calculate commision percentage on sales order"); 
        snooze(1);
        
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Select Order for Billing.Save_QPushButton_2"))
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    
    //---PART2 - commission schedule assignment for a ship-to address---
    
    //---Create a sales representative---
   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[4]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[4]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[4]+"' type='QModelIndex'}"))
            test.pass("Sales Representative created successfully");
        else  
            test.fail("Sales Representative creation failed"); 
        snooze(3);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }  
    
    //---Create a Customer----
    
    
    createCustomer(data.custType[0],data.custName[2],data.shipNum[2]);
    
    //---Assigning the primary sales rep to the customer ship-to----
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[2], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        //---Assign primary sales rep to ship-to
        clickButton(waitForObject(":_addressTab.Ship To_QRadioButton_2"));
        openItemContextMenu(":_addressStack._shipto_XTreeWidget",data.shipNum[2], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        
        clickTab(waitForObject(":xTuple ERP: Enterprise Edition 4.0.0Beta2 - Practice Database on 192.168.0.92/Prc-mfg AS admin.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        clickButton(waitForObject(":Sales Reps.New_QToolButton"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srNum[4] +'-'+ data.srName[4], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        if(object.exists(":Registration Key.Yes_QPushButton"))
            clickButton(":Registration Key.Yes_QPushButton");
        
        //---Verifying the Customer ship-to with primary sales rep assigined--
        snooze(1);
        waitForObject(":Sales Reps._salesReps_XTreeWidget_2");
        if(object.exists("{column='0'  container=':Sales Reps._salesReps_XTreeWidget_2' text= '"+data.srNum[4]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget_2' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the Ship-to sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the Ship-to ");
        snooze(1);
        clickButton(waitForObject(":Sales Order.Save_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        snooze(0.5);
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative"+data.srNum[4]+"  assigined sucessfully to the customer ship-to");
    }
    
    catch(e)
    {
        test.fail("Error in assigning sales representative "+data.srNum[4]+"as a primary sales representative to the customer ship-to"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    
    //---Commission Schedule Assignment by Ship-To--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[0], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        
        clickButton(waitForObject(":Assignment.Ship-To_XCheckBox"));
        waitForObject(":Assignment._shipTo_XComboBox");
        clickItem(":Assignment._shipTo_XComboBox",data.shipNum[2], 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":Options.Exclude Other Schedules_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.log("Sucessfully assigned commission schedule to the cusotmer Ship-To");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to sales representative"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
    //----Creating the sales Order and veridying the commission applied based in discount rate ---
    
    var disP = "10";
    var sonum = createSalesOrderDiscp(data.custName[2],data.targetItem[0],"100",disP);
    
    
    //---Edit the sales order and verify the commision rate and Commission applied---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[0], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        waitForObject(":Commissions._commissions_XTreeWidget");
        var rate = findObject("{column='7' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text;
        test.log(rate);
        var eCmp  = parseInt(findObject("{column='9' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text);
        test.log(eCmp);
        
        //---Calculating the Commission%
        var cmnP = parseInt((subtl*rate)/100);
        test.log(cmnP);
        
        if((rate == 5) && (eCmp == cmnP) )
        {
            test.pass("Commission rate displayed correctly as per the commission schedule and commission rate  calcuated correctly on Sales Order");
            test.log("Commission schedule applied on sales order verified sucessfully");
        }
        else  
            test.fail("Incorrect commission rate displayed and failed to calculate commision percentage on sales order"); 
        snooze(1);
        
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    //PART3- //---Commission Schedule Assignment for Customer ----
    //---Create a sales representative---
   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[5]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[5]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[5]+"' type='QModelIndex'}"))
            test.pass("Sales Representative created successfully");
        else  
            test.fail("Sales Representative creation failed"); 
        snooze(3);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }  
    
    //---Create a Customer----
    
    
    createCustomer(data.custType[0],data.custName[3],data.shipNum[3]);
    
    //---Assigning the primary sales rep to the customer----
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[3], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        
        //---Assign sales representative created as primary sales rep to Customer
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srNum[5] +'-'+ data.srName[5], 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        if(object.exists(":Registration Key.Yes_QPushButton"))
            clickButton(":Registration Key.Yes_QPushButton");
        //---Verifying the Customer with primary sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[5]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the customer ");
        snooze(1); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative  assigined sucessfully to the customer");
    }
    
    
    catch(e)
    {
        test.fail("Error in assigning sales representative "+data.srNum[5]+" as a primary sales representative to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    //---Commission Schedule Assignment by Customer--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[0], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Customer_XCheckBox"));
        waitForObject(":Assignment._cust_XComboBox");
        clickItem(":Assignment._cust_XComboBox",data.custName[3], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Options.Exclude Other Schedules_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.log("Commission schedule sucessfully assigned to the customer");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to Customer"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    //----Creating the sales Order and veridying the commission applied based in discount rate ---
    
    var disP = "8";
    var sonum = createSalesOrderDiscp(data.custName[3],data.targetItem[0],"100",disP);
    
    
    //---Edit the sales order and verify the commision rate and Commission applied---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[0], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        
        
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        waitForObject(":Commissions._commissions_XTreeWidget");
        var rate = findObject("{column='7' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text;
        test.log(rate);
        var eCmp  = parseInt(findObject("{column='9' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text);
        test.log(eCmp);
        
        //---Calculating the Commission%
        var cmnP = parseInt((subtl*rate)/100);
        test.log(cmnP);
        
        if((rate == 5) && (eCmp == cmnP) )
        {
            test.pass("Commission rate displayed correctly as per the commission schedule and commission  calcuated correctly on Sales Order");
            test.log("Commission schedule applied on sales order verified sucessfully");
        }
        else  
            test.fail("Incorrect commission rate displayed and error in calculating the commision on sales order"); 
        snooze(1);
        
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    
    
    //--- PART-4-Commission Schedule Assignment for an Item ----
    
    //--Creating an item ---
   
    
    copyitem(data.sourceItem,data.targetItem[1],data.listPrice,data.wSalePrice);
    //---Create item-site----
    createRIS(data.targetItem[1]);
    
    //---Create a sales representative---
   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[6]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[6]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[6]+"' type='QModelIndex'}"))
            test.pass("Sales Representative created successfully");
        else  
            test.fail("Sales Representative creation failed"); 
        snooze(3);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }  
    
    //---Create a Customer----
  
    
    createCustomer(data.custType[0],data.custName[4],data.shipNum[4]);
    
    //---Assigning the primary sales rep to the customer----
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[4], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        //---Assign sales representative created as primary sales rep to Customer
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srNum[6] +'-'+ data.srName[6], 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        if(object.exists(":Registration Key.Yes_QPushButton"))
            clickButton(":Registration Key.Yes_QPushButton");
        //---Verifying the Customer with primary sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[6]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the customer ");
        snooze(1); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative  assigined sucessfully to the customer");
    }
    
    catch(e)
    {
        test.fail("Error in assigning sales representative "+data.srNum[6]+" as a primary sales representative to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    //---Commission Schedule Assignment by Item--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[0], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Item_XCheckBox"));
        waitForObject(":Assignment._item_XComboBox");
        clickItem(":Assignment._item_XComboBox",data.targetItem[1], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Options.Exclude Other Schedules_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.log("Commission schedule sucessfully assigned to the customer");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to Customer"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    //----Creating the sales Order and verifying the commission applied based in discount rate ---
    
    var disP = "15";
    var sonum = createSalesOrderDiscp(data.custName[4],data.targetItem[1],"100",disP);
    
    
    //---Edit the sales order and verify the commision rate and Commission applied---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[1], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        waitForObject(":Commissions._commissions_XTreeWidget");
        var rate = findObject("{column='7' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text;
        test.log(rate);
        var eCmp  = parseInt(findObject("{column='9' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text);
        test.log(eCmp);
        
        //---Calculating the Commission%
        var cmnP = parseInt((subtl*rate)/100);
        test.log(cmnP);
        
        if((rate == 2) && (eCmp == cmnP) )
        {
            test.pass("Commission rate displayed correctly as per the commission schedule and commission  calcuated correctly on Sales Order");
            test.log("Commission schedule applied on sales order verified sucessfully");
        }
        else  
            test.fail("Incorrect commission rate displayed and error in calculating the commision on sales order"); 
        snooze(1);
        
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    //---Try to include in last above---
    
    
    //PART-5---Commission Schedule Assignment for an Customer Type ----
    
    //--Creating an CustomerType ---
   
    
    try
    {   
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types", 86, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_code_XLineEdit"), data.custCode[0]);
        nativeType("<Tab>"); 
        type(waitForObject(":_description_XLineEdit"),data.custDesc);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        //-- Verifying the customer type created ---
        waitForObject(":_stack._custtype_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._custtype_XTreeWidget' text='"+data.custCode[0]+"' type='QModelIndex'}"))
            test.pass("Customer Type"+data.custCode[0]+" created successfully");
        else  
            test.fail("Customer Type"+data.custCode[0]+" creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sucessfully created customer type");
        
    }
    catch(e)
    {
        test.fail("Error in creating the Customer Type"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    
    
    
    //---Create a sales representative---
   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[7]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[7]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[7]+"' type='QModelIndex'}"))
            test.pass("Sales Representative created successfully");
        else  
            test.fail("Sales Representative creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }  
    
    
    
    
    //---Create a Customer----
    
     var custType2 = data.custCode[0]+'-'+data.custDesc;
  
    createCustomer(custType2,data.custName[5],data.shipNum[5]);
    
    //---Assigning the primary sales rep to the customer----
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[5], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        
        //---Assign sales representative created as primary sales rep to Customer
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srNum[7] +'-'+ data.srName[7], 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        if(object.exists(":Registration Key.Yes_QPushButton"))
            clickButton(":Registration Key.Yes_QPushButton");
        //---Verifying the Customer with primary sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[7]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the customer ");
        snooze(1); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative  assigined sucessfully to the customer");
    }
    
    catch(e)
    {
        test.fail("Error in assigning sales representative "+data.srNum[7]+" as a primary sales representative to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    //---Commission Schedule Assignment by Customer Type--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[0], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Customer Type_XCheckBox"));
        waitForObject(":Assignment._custType_XComboBox");
        clickItem(":Assignment._custType_XComboBox",data.custCode[0]  , 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Options.Exclude Other Schedules_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.log("Commission schedule sucessfully assigned to the customer");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to Customer"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    //----Creating the sales Order and verifying the commission applied based in discount rate ---
    
    var disP = "3";
    var sonum = createSalesOrderDiscp(data.custName[5],data.targetItem[0],"100",disP);
    
    
    //---Edit the sales order and verify the commision rate and Commission applied---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[0], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        
        
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        waitForObject(":Commissions._commissions_XTreeWidget");
        var rate = findObject("{column='7' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text;
        test.log(rate);
        var eCmp  = parseInt(findObject("{column='9' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text);
        test.log(eCmp);
        
        //---Calculating the Commission%
        var cmnP = parseInt((subtl*rate)/100);
        test.log(cmnP);
        
        if((rate == 8) && (eCmp == cmnP) )
        {
            test.pass("Commission rate displayed correctly as per the commission schedule and commission  calcuated correctly on Sales Order");
            test.log("Commission schedule applied on sales order verified sucessfully");
        }
        else  
            test.fail("Incorrect commission rate displayed and error in calculating the commision on sales order");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    //PART-6---Commission Schedule Assignment for an Product Catageory ----
    
    //--Creating the Product Catageories ---
    
             var pCdesc = "Product catageory for Commission";
             var itemPC = data.pCtgry+" - "+pCdesc;
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Product Categories", 57, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_stack._category_XLineEdit"),data.pCtgry);
        snooze(1);
        type(waitForObject(":_stack._description_XLineEdit"),pCdesc);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        snooze(1);
        //---Verifying the Product catageory created---
        
        waitForObject(":_stack._prodcat_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._prodcat_XTreeWidget' text='"+data.pCtgry+"' type='QModelIndex'}"))
            test.pass("Product Catageory"+data.pCtgry+" created successfully");
        else  
            test.fail("Product catageory"+data.pCtgry+" creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating the product catageory"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }
    
    //---Create an item----
    //--Creating an item ---
   
    
    copyitem(data.sourceItem,data.targetItem[2],data.listPrice,data.wSalePrice);
    //---Create item-site----
    createRIS(data.targetItem[2]);
    
    //----Edit the Item and assign product catageory ----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        waitForObject(":_list_XTreeWidget_5");
        clickItem(":_list_XTreeWidget_5",data.targetItem[2], 0, 0, 5, Qt.LeftButton);
        openItemContextMenu(":_list_XTreeWidget_5",data.targetItem[2], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        //---Assigning Product Catageory--
        waitForObject(":_prodcat_XComboBox_2");
        clickItem(":_prodcat_XComboBox_2",itemPC, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Sucessfully assigned product catageory to the item");
    }
    catch(e)
    {
        test.fail("Error in assigning product catageory to the item"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    //---Create a sales representative---
   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[8]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[8]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[8]+"' type='QModelIndex'}"))
            test.pass("Sales Representative created successfully");
        else  
            test.fail("Sales Representative creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }  
    
    //---Create a Customer----
   
    
    createCustomer(data.custType[0],data.custName[6],data.shipNum[6]);
    
    //---Assigning the primary sales rep to the customer----
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[6], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        
        //---Assign sales representative created as primary sales rep to Customer
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srNum[8] +'-'+ data.srName[8], 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        if(object.exists(":Registration Key.Yes_QPushButton"))
            clickButton(":Registration Key.Yes_QPushButton");
        //---Verifying the Customer with primary sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[8]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the customer ");
        snooze(1); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative  assigined sucessfully to the customer");
    }
    
    catch(e)
    {
        test.fail("Error in assigning sales representative "+data.srNum[8]+" as a primary sales representative to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    //---Commission Schedule Assignment by Product Catageory--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[0], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Product Category_XCheckBox"));
        waitForObject(":Assignment._prodCat_XComboBox");
        clickItem(":Assignment._prodCat_XComboBox",data.pCtgry, 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Options.Exclude Other Schedules_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.log("Commission schedule sucessfully assigned to the customer");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to Customer"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    //----Creating the sales Order and verifying the commission applied based in discount rate ---
    
    var disP = "13";
    var sonum = createSalesOrderDiscp(data.custName[6],data.targetItem[2],"100",disP);
    
    
    //---Edit the sales order and verify the commision rate and Commission applied---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[2], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        
        
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        waitForObject(":Commissions._commissions_XTreeWidget");
        var rate = findObject("{column='7' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text;
        test.log(rate);
        var eCmp  = parseInt(findObject("{column='9' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text);
        test.log(eCmp);
        
        //---Calculating the Commission%
        var cmnP = parseInt((subtl*rate)/100);
        test.log(cmnP);
        
        if((rate == 2) && (eCmp == cmnP) )
        {
            test.pass("Commission rate displayed correctly as per the commission schedule and commission  calcuated correctly on Sales Order");
            test.log("Commission schedule applied on sales order verified sucessfully");
        }
        else  
            test.fail("Incorrect commission rate displayed and error in calculating the commision on sales order");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Commission displayed correctly on soline item");
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    //---PART-7---Commission Schedule Assignment for an Sales Group ----
    
    //---Create a sales representative---
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[9]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[9]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[9]+"' type='QModelIndex'}"))
            test.pass("Sales Representative created successfully");
        else  
            test.fail("Sales Representative creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }  
    
    
    //---Create Sales RepGrp and add sales rep---
    
    //    var srpGName = "SRP-GRP1";
    
    var srpGDesc = "New Sales Rep Group";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Rep Groups");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Rep Groups", 32, 13, 0, Qt.LeftButton);    clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        snooze(1);
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srpGName[0]);
        snooze(1);
        type(waitForObject(":_descrip_XLineEdit"), srpGDesc);
        snooze(1);
        clickButton(waitForObject(":_stack.Add_QPushButton_2"));
        snooze(1);
        waitForObject(":_stack._salesrepsList_XTreeWidget");
        clickItem(":_stack._salesrepsList_XTreeWidget",data.srNum[9], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_stack.Select_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2")); 
        //---Verifying the sales rep group created---
        
        
        waitForObject(":_stack._salesrepgrp_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrepgrp_XTreeWidget' text='"+data.srpGName[0]+"' type='QModelIndex'}"))
            test.pass("Sales Representative Group created successfully");
        else  
            test.fail("Sales Representative Group creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sales Representative group created with sales representative added under");
    }
    catch(e)
    {
        test.fail("Error in adding sales representative under sales rep group"+e);
        
    }
    
    
    //---Create a Customer----
    
   
    
    createCustomer(data.custType[0],data.custName[7],data.shipNum[7]);
    //---Assigning the primary sales rep to the customer----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[7], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        
        //---Assign sales representative created as primary sales rep to Customer
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srNum[9] +'-'+ data.srName[9], 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        if(object.exists(":Registration Key.Yes_QPushButton"))
            clickButton(":Registration Key.Yes_QPushButton");
        //---Verifying the Customer with primary sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[9]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the customer ");
        snooze(1); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative  assigined sucessfully to the customer");
    }
    
    catch(e)
    {
        test.fail("Error in assigning sales representative "+data.srNum[9]+" as a primary sales representative to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    //---Commission Schedule Assignment by Sales Rep Group--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[0], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        
        clickButton(waitForObject(":Assignment.Sales Rep Group_XCheckBox"));
        waitForObject(":Assignment._salesRepGrp_XComboBox");
        clickItem(":Assignment._salesRepGrp_XComboBox",data.srpGName[0], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        
        clickButton(waitForObject(":Options.Exclude Other Schedules_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.log("Commission schedule sucessfully assigned to the customer");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to Customer"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    //----Creating the sales Order and verifying the commission applied based in discount rate ---
    
    var disP = "18";
    var sonum = createSalesOrderDiscp(data.custName[7],data.targetItem[0],"100",disP);
    
    
    //---Edit the sales order and verify the commision rate and Commission applied---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[0], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        
        
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        waitForObject(":Commissions._commissions_XTreeWidget");
        var rate = findObject("{column='7' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text;
        test.log(rate);
        var eCmp  = parseInt(findObject("{column='9' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text);
        test.log(eCmp);
        
        //---Calculating the Commission%
        var cmnP = parseInt((subtl*rate)/100);
        test.log(cmnP);
        
        if((rate == 2) && (eCmp == cmnP) )
        {
            test.pass("Commission rate displayed correctly as per the commission schedule and commission  calcuated correctly on Sales Order");
            test.log("Commission schedule applied on sales order verified sucessfully");
        }
        else  
            test.fail("Incorrect commission rate displayed and error in calculating the commision on sales order");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    
    //---PART-8.1-Creating two Commission Schedules with 'Exclude Other Schedules' option unchecked---    
    //--Creating a Commission Schedules---
    
    //--Commission schedule-1
    
   
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules", 62, 13, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        type(waitForObject(":_stack._schedName_XLineEdit"),data.schName[1]);
        nativeType("<Tab>");
        type(waitForObject(":_stack._descrip_QTextEdit"),data.schDesc);
        snooze(1);
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "20");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "5");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //--Verifying the Commission schedule created --
        snooze(1);
        waitForObject(":_stack._commshedes_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._commshedes_XTreeWidget' text='"+data.schName[1]+"' type='QModelIndex'}"))
            test.pass("Commission schedule " + data.schName[1] +" created");
        else
            test.fail("Commission schedule creation failed");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating commission schedule"+e);
        if(object.exists(":_stack.Close_QPushButton"))
            clickButton(":_stack.Close_QPushButton");
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
    //--Commission schedule-2
    
   
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules", 62, 13, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        type(waitForObject(":_stack._schedName_XLineEdit"),data.schName[2]);
        nativeType("<Tab>");
        type(waitForObject(":_stack._descrip_QTextEdit"),data.schDesc);
        snooze(1);
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "20");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "10");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //--Verifying the Commission schedule created --
        snooze(1);
        waitForObject(":_stack._commshedes_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._commshedes_XTreeWidget' text='"+data.schName[2]+"' type='QModelIndex'}"))
            test.pass("Commission schedule " + data.schName[2] +" created");
        else
            test.fail("Commission schedule creation failed");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating commission schedule"+e);
        if(object.exists(":_stack.Close_QPushButton"))
            clickButton(":_stack.Close_QPushButton");
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
    //----Creating an item---
  
    
    copyitem(data.sourceItem,data.targetItem[3],data.listPrice,data.wSalePrice);
    //---Create item-site----
    createRIS(data.targetItem[3]);
    
    //---Create an Sales Representative----
   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[10]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[10]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[10]+"' type='QModelIndex'}"))
            test.pass("Sales Representative created successfully");
        else  
            test.fail("Sales Representative creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }  
    
    
    
    //--Creating an CustomerType ---
   
    
    try
    {   
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types", 86, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_code_XLineEdit"), data.custCode[1]);
        nativeType("<Tab>"); 
        type(waitForObject(":_description_XLineEdit"),data.custDesc);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        //-- Verifying the customer type created ---
        waitForObject(":_stack._custtype_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._custtype_XTreeWidget' text='"+data.custCode[1]+"' type='QModelIndex'}"))
            test.pass("Customer Type"+data.custCode[1]+" created successfully");
        else  
            test.fail("Customer Type"+data.custCode[1]+" creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sucessfully created customer type");
        
    }
    catch(e)
    {
        test.fail("Error in creating the Customer Type"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    
    
    
    
    
    
    
    
    
    
    
    //---Create a Customer ----
     var custType2 = data.custCode[1]+'-'+data.custDesc;
    createCustomer(custType2,data.custName[8],data.shipNum[8]);
    //---Assigning the primary sales rep to the customer----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[8], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        
        //---Assign sales representative created as primary sales rep to Customer
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srNum[10] +'-'+ data.srName[10], 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        if(object.exists(":Registration Key.Yes_QPushButton"))
            clickButton(":Registration Key.Yes_QPushButton");
        //---Verifying the Customer with primary sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[10]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the customer ");
        snooze(1); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative "+data.srNum[10]+" assigined sucessfully to the customer");
    }
    
    catch(e)
    {
        test.fail("Error in assigning sales representative "+data.srNum[10]+" as a primary sales representative to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    
    //---Assign Commission Scheudle -A to Customer9-----
    
    //---Commission Schedule Assignment by Customer--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[1], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Customer_XCheckBox"));
        waitForObject(":Assignment._cust_XComboBox");
        clickItem(":Assignment._cust_XComboBox",data.custName[8], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.log("Commission schedule sucessfully assigned to the customer");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to Customer"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    //---Assign Commission Scheudle -B to item-----
    
    //---Commission Schedule Assignment by Item--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[2], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Item_XCheckBox"));
        waitForObject(":Assignment._item_XComboBox");
        clickItem(":Assignment._item_XComboBox",data.targetItem[3], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.log("Commission schedule sucessfully assigned to the customer");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to Customer"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    
    //----Creating the sales Order and verifying the commission applied based in discount rate ---
    
    var disP = "15";
    var sonum = createSalesOrderDiscp(data.custName[8],data.targetItem[3],"100",disP);
    
    //---Edit the sales order and verify the commision rate and Commission applied---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[3], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        
        
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        waitForObject(":Commissions._commissions_XTreeWidget");
        var rate = findObject("{column='7' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text;
        test.log(rate);
        var eCmp  = parseInt(findObject("{column='9' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text);
        test.log(eCmp);
        
        //---Calculating the Commission%
        var cmnP = parseInt((subtl*rate)/100);
        test.log(cmnP);
        
        if((rate == 15) && (eCmp == cmnP) )
        {
            test.pass("Commission rate displayed correctly as per the commission schedule of both item and customer and commission  calcuated correctly on Sales Order");
            test.log("Commission schedule applied on sales order verified sucessfully");
        }
        else  
            test.fail("Commission rate is not diaplyed as combined commission of item and custoemr and error in calculating the commision on sales order");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    //---PART-8.2-Creating two Commission Schedules with 'Exclude Other Schedules' option checked---    
    //--Creating a Commission Schedules---
    
    //--Commission schedule-1
   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules", 62, 13, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        type(waitForObject(":_stack._schedName_XLineEdit"),data.schName[3]);
        nativeType("<Tab>");
        type(waitForObject(":_stack._descrip_QTextEdit"),data.schDesc);
        snooze(1);
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "20");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "5");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //--Verifying the Commission schedule created --
        snooze(1);
        waitForObject(":_stack._commshedes_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._commshedes_XTreeWidget' text='"+data.schName[3]+"' type='QModelIndex'}"))
            test.pass("Commission schedule " + data.schName[3] +" created");
        else
            test.fail("Commission schedule creation failed");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating commission schedule"+e);
        if(object.exists(":_stack.Close_QPushButton"))
            clickButton(":_stack.Close_QPushButton");
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
    //--Commission schedule-2
   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules", 62, 13, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        type(waitForObject(":_stack._schedName_XLineEdit"),data.schName[4]);
        nativeType("<Tab>");
        type(waitForObject(":_stack._descrip_QTextEdit"),data.schDesc);
        snooze(1);
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "20");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "10");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //--Verifying the Commission schedule created --
        snooze(1);
        waitForObject(":_stack._commshedes_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._commshedes_XTreeWidget' text='"+data.schName[4]+"' type='QModelIndex'}"))
            test.pass("Commission schedule " + data.schName[4] +" created");
        else
            test.fail("Commission schedule creation failed");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating commission schedule"+e);
        if(object.exists(":_stack.Close_QPushButton"))
            clickButton(":_stack.Close_QPushButton");
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
    
    //--Creating an item ---
   
      
    copyitem(data.sourceItem,data.targetItem[4],data.listPrice,data.wSalePrice);
    //---Create item-site----
    createRIS(data.targetItem[4]);
    
    //---Create an Sales Representative----
   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[11]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[11]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[11]+"' type='QModelIndex'}"))
            test.pass("Sales Representative created successfully");
        else  
            test.fail("Sales Representative creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }  
    
    //---Create a Customer ----
    
    
    createCustomer(data.custType[0],data.custName[9],data.shipNum[9]);
    //---Assigning the primary sales rep to the customer----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[9], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        
        //---Assign sales representative created as primary sales rep to Customer
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srNum[11] +'-'+ data.srName[11], 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        if(object.exists(":Registration Key.Yes_QPushButton"))
            clickButton(":Registration Key.Yes_QPushButton");
        //---Verifying the Customer with primary sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[11]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the customer ");
        snooze(1); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative  assigined sucessfully to the customer");
    }
    
    catch(e)
    {
        test.fail("Error in assigning sales representative "+data.srNum[11]+" as a primary sales representative to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    
    //---Assign Commission Scheudle -C to Customer10-----
    
    //---Commission Schedule Assignment by Customer--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[3], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Customer_XCheckBox"));
        waitForObject(":Assignment._cust_XComboBox");
        clickItem(":Assignment._cust_XComboBox",data.custName[9], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Options.Exclude Other Schedules_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.log("Commission schedule sucessfully assigned to the customer");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to Customer"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    //---Assign Commission Scheudle -D to targetitem5-----
    
    //---Commission Schedule Assignment by Item--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[4], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Item_XCheckBox"));
        waitForObject(":Assignment._item_XComboBox");
        clickItem(":Assignment._item_XComboBox",data.targetItem[4], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Options.Exclude Other Schedules_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.log("Commission schedule sucessfully assigned to the customer");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to Customer"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    
    //----Creating the sales Order and verifying the commission applied based in discount rate ---
    
    
    var disP = "15";
    var sonum = createSalesOrderDiscp(data.custName[9],data.targetItem[4],"100",disP);
    //---Edit the sales order and verify the commision rate is displayed as per the item commission and Commission applied---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[4], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        
        
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        waitForObject(":Commissions._commissions_XTreeWidget");
        var rate = findObject("{column='7' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text;
        test.log(rate);
        var eCmp  = parseInt(findObject("{column='9' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text);
        test.log(eCmp);
        
        //---Calculating the Commission%
        var cmnP = parseInt((subtl*rate)/100);
        test.log(cmnP);
        
        if((rate == 5) && (eCmp == cmnP) )
        {
            test.pass("Commission rate displayed correctly as per the Item commission schedule Assignment and commission  calcuated correctly on Sales Order");
            test.log("Commission schedule applied on sales order verified sucessfully");
        }
        else  
            test.fail("Commission rate is not displayed as per item commission schedule assignment and error in calculating the commision on sales order");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    
    
    
    
    
    //-----Commission Tab Setup----
    
    //--Creating an item ---
  
    
    copyitem(data.sourceItem,data.targetItem[5],data.listPrice,data.wSalePrice);
    //---Create item-site----
    createRIS(data.targetItem[5]);
    
    //--SALES REP1
    //---Create an Sales Representative----
   
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[12]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[12]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[12]+"' type='QModelIndex'}"))
            test.pass("Sales Representative created successfully");
        else  
            test.fail("Sales Representative creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }  
    
    
    //SALES REP2
    //---Create an Sales Representative----
   
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[13]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[13]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[13]+"' type='QModelIndex'}"))
            test.pass("Sales Representative created successfully");
        else  
            test.fail("Sales Representative creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }  
    
    
    //SALES REP3
    //---Create an Sales Representative----
  
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[14]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[14]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[14]+"' type='QModelIndex'}"))
            test.pass("Sales Representative created successfully");
        else  
            test.fail("Sales Representative creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }  
    
    //-----Create Three Commission Schedules---
    
    //--Creating a Commission Schedules---
    //--Commission schedule-1
   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules", 62, 13, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        type(waitForObject(":_stack._schedName_XLineEdit"),data.schName[5]);
        nativeType("<Tab>");
        type(waitForObject(":_stack._descrip_QTextEdit"),data.schDesc);
        snooze(1);
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "10");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "20");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "2");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "100");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "0");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //--Verifying the Commission schedule created --
        snooze(1);
        waitForObject(":_stack._commshedes_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._commshedes_XTreeWidget' text='"+data.schName[5]+"' type='QModelIndex'}"))
            test.pass("Commission schedule " + data.schName[5] +" created");
        else
            test.fail("Commission schedule creation failed");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating commission schedule"+e);
        if(object.exists(":_stack.Close_QPushButton"))
            clickButton(":_stack.Close_QPushButton");
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
    //--Commission schedule-2
  
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules", 62, 13, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        type(waitForObject(":_stack._schedName_XLineEdit"),data.schName[6]);
        nativeType("<Tab>");
        type(waitForObject(":_stack._descrip_QTextEdit"),data.schDesc);
        snooze(1);
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "10");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "20");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "2");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "100");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "0");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //--Verifying the Commission schedule created --
        snooze(1);
        waitForObject(":_stack._commshedes_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._commshedes_XTreeWidget' text='"+data.schName[6]+"' type='QModelIndex'}"))
            test.pass("Commission schedule " + data.schName[6] +" created");
        else
            test.fail("Commission schedule creation failed");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating commission schedule"+e);
        if(object.exists(":_stack.Close_QPushButton"))
            clickButton(":_stack.Close_QPushButton");
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
    
    //--Commission schedule-3

    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules", 62, 13, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        type(waitForObject(":_stack._schedName_XLineEdit"),data.schName[7]);
        nativeType("<Tab>");
        type(waitForObject(":_stack._descrip_QTextEdit"),data.schDesc);
        snooze(1);
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "10");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "20");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "2");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "100");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "0");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //--Verifying the Commission schedule created --
        snooze(1);
        waitForObject(":_stack._commshedes_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._commshedes_XTreeWidget' text='"+data.schName[7]+"' type='QModelIndex'}"))
            test.pass("Commission schedule " + data.schName[7] +" created");
        else
            test.fail("Commission schedule creation failed");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating commission schedule"+e);
        if(object.exists(":_stack.Close_QPushButton"))
            clickButton(":_stack.Close_QPushButton");
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
    
    
    
    
    
    
    //---Assiging teo sales representatives to two commission schedules---
    
    //---Assign Commission Scheudle -E to SalesRep13-----
    
    //---Commission Schedule Assignment by Customer--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[5], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Sales Rep_XCheckBox"));
        waitForObject(":Assignment._salesRep_XComboBox");
        clickItem(":Assignment._salesRep_XComboBox",data.srNum[12], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.log("Commission schedule sucessfully assigned to the customer");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to Customer"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    
    //---Assign Commission Scheudle-F to SalesRep14-----
    
    //---Commission Schedule Assignment by sales rep--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[6], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Sales Rep_XCheckBox"));
        waitForObject(":Assignment._salesRep_XComboBox");
        clickItem(":Assignment._salesRep_XComboBox",data.srNum[13], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.log("Commission schedule sucessfully assigned to the customer");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to Customer"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    //---Assign Commission Scheudle-G to SalesRep15-----
    
    //---Commission Schedule Assignment by sales rep--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[7], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Sales Rep_XCheckBox"));
        waitForObject(":Assignment._salesRep_XComboBox");
        clickItem(":Assignment._salesRep_XComboBox",data.srNum[14], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Commission schedule sucessfully assigned to the customer");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to Customer"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    //---Customer Defaults tab setting---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Customer Defaults");
        waitForObject(":_comboGroup._salesrep_XComboBox");
        clickItem(":_comboGroup._salesrep_XComboBox",data.srNum[12] +'-'+ data.srName[12], 0, 0, 5, Qt.LeftButton); 
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sucessfully made Customer defaults settings");
    }
    catch(e)
    {
        test.fail("Error in setting the customer defaults"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    
    
    //---Create a Cusotmer and Assign one sales rep as Primary and another as additional----
    
   
    createCustomer(data.custType[0],data.custName[10],data.shipNum[10]);
    
    
    //---Assigning the primary and additional sales rep to the customer----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[10], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(1);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        //---Verifying the Customer with primary sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[12]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the customer ");
        snooze(1); 
        
        
        //---Assiging Additional Sales Representatives to the cusotmer----
        //--Adding sales rep-14
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srNum[13] +'-'+ data.srName[13], 0, 0, 5, Qt.LeftButton);    	clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        //---Verifying the Customer with Additional sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[13]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='No' type='QModelIndex'}"))
            test.pass("Additional sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign Additional sales representative to the customer ");
        snooze(1);
        //--Adding sales rep-15
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srNum[14] +'-'+ data.srName[14], 0, 0, 5, Qt.LeftButton);    	clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        //---Verifying the Customer with Additional sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[14]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='No' type='QModelIndex'}"))
            test.pass("Additional sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign Additional sales representative to the customer ");
        snooze(1);
        
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative  assigined sucessfully to the customer");
    }
    
    catch(e)
    {
        test.fail("Error in assigning sales representative "+data.srNum[12]+" as a primary sales representative to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    
    
    
    
    
    //----Configuring Commission Setup ----
    //--'Primary Sales Rep.' receives option to 'Full', sets 'Additional Sales Rep.' receives to 'Split', remaining options to 'None' 
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Additional setup option for commission._primarySalesRep_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRep_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._primarySalesRepMgr_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRepMgr_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addSalesRep_XComboBox");
        clickItem(":Additional setup option for commission._addSalesRep_XComboBox","Split", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addMgr_XComboBox");
        clickItem(":Additional setup option for commission._addMgr_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sales setup configured sucessfully with Primary sales rep receives full,Additional sales rep as Split and remaining set to None");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    
    //----Creating the sales Order and verifying the commission applied based in discount rate ---
    
    var disP = "12";
    
    var sonum = createSalesOrderDiscp(data.custName[10],data.targetItem[5],"100",disP);
    
    //---Edit the sales order and verify Commision applied for Primary and Additional sales rep----
    
    var rate ="2";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[5], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        
        //---Calculating the Commission%
        var cmnP = (subtl*rate)/100;
        test.log(cmnP);
        //---SPLIT----
        var split = cmnP/2;
        //----Verifying the Commision displayed for Primary sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.srNum[12]+"' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"))
            
            test.pass("Commmision rate displayed correctly for primary sales representative "+data.srNum[12]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for primary sales representative under sales order item screen");
        
        //----Verifying the Commision displayted under additional sales representative----
        
        //---Sales Rep-14
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.srNum[13]+"' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text= 'Split' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+split+"' type='QModelIndex'}"))
            
            test.pass("Commmision rate displayed correctly for Additional sales representative"+data.srNum[13]+" on sales order item");
        
        else
            test.fail("Incorrect commission is displayed for Additional sales representative "+data.srNum[13]+" under sales order item screen");
        
        //---Sales Rep15
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.srNum[14]+"' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text= 'Split' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+split+"' type='QModelIndex'}"))
            
            test.pass("Commmision rate displayed correctly for Additional sales representative"+data.srNum[14]+" on sales order item");
        
        else
            test.fail("Incorrect commission is displayed for Additional sales representative "+data.srNum[14]+" under sales order item screen");
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    //----Configuring Commission Setup ----
    //--'Primary Sales Rep.' and 'Additional Sales Rep.' receives to 'Full', remaining options to 'None' 
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Additional setup option for commission._primarySalesRep_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRep_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._primarySalesRepMgr_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRepMgr_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addSalesRep_XComboBox");
        clickItem(":Additional setup option for commission._addSalesRep_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addMgr_XComboBox");
        clickItem(":Additional setup option for commission._addMgr_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sales setup configured sucessfully with Primary sales rep receives full,Additional sales rep as Split and remaining set to None");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    //----Creating the sales Order and verifying the commission applied based in discount rate ---
    
    var disP = "12";
    
    var sonum = createSalesOrderDiscp(data.custName[10],data.targetItem[5],"100",disP);
    
    //---Edit the sales order and verify Commision applied for Primary and Additional sales rep----
    
    var rate ="2";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[5], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        
        //---Calculating the Commission%
        var cmnP = (subtl*rate)/100;
        test.log(cmnP);
        //----Verifying the Commision displayed for Primary sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.srNum[12]+"' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"))
            
            test.pass("Commmision rate displayed correctly for primary sales representative "+data.srNum[12]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for primary sales representative under sales order item screen");
        
        //----Verifying the Commision displayted under additional sales representative----
        
        //---Sales Rep-14
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.srNum[13]+"' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text= 'Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"))
            
            test.pass("Commmision rate displayed correctly for Additional sales representative"+data.srNum[13]+" on sales order item");
        
        else
            test.fail("Incorrect commission is displayed for Additional sales representative "+data.srNum[13]+" under sales order item screen");
        
        //---Sales Rep15
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.srNum[14]+"' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text= 'Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"))
            
            test.pass("Commmision rate displayed correctly for Additional sales representative"+data.srNum[14]+" on sales order item");
        
        else
            test.fail("Incorrect commission is displayed for Additional sales representative "+data.srNum[14]+" under sales order item screen");
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    //----Configuring Commission Setup ----
    //--'Primary Sales Rep.' and 'Additional Sales Rep.' receives to 'Split', remaining options to 'None' 
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Additional setup option for commission._primarySalesRep_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRep_XComboBox","Split", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._primarySalesRepMgr_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRepMgr_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addSalesRep_XComboBox");
        clickItem(":Additional setup option for commission._addSalesRep_XComboBox","Split", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addMgr_XComboBox");
        clickItem(":Additional setup option for commission._addMgr_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sales setup configured sucessfully with Primary sales rep receives full,Additional sales rep as Split and remaining set to None");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    //----Creating the sales Order and verifying the commission applied based in discount rate ---
    
    var disP = "12";
    
    var sonum = createSalesOrderDiscp(data.custName[10],data.targetItem[5],"100",disP);
    
    //---Edit the sales order and verify Commision applied for Primary and Additional sales rep----
    
    var rate ="2";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[5], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        
        //---Calculating the Commission%
        var cmnP = (subtl*rate)/100;
        test.log(cmnP);
        var split = cmnP/3;
        //----Verifying the Commision displayed for Primary sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.srNum[12]+"' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Split' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+split+"' type='QModelIndex'}"))
            
            test.pass("Commmision rate displayed correctly for primary sales representative"+data.srNum[12]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for primary sales representative under sales order item screen");
        
        //----Verifying the Commision displayted under additional sales representative----
        
        //---Sales Rep-14
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.srNum[13]+"' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text= 'Split' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+split+"' type='QModelIndex'}"))
            
            test.pass("Commmision rate displayed correctly for Additional sales representative"+data.srNum[13]+" on sales order item");
        
        else
            test.fail("Incorrect commission is displayed for Additional sales representative "+data.srNum[13]+" under sales order item screen");
        
        //---Sales Rep15
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.srNum[14]+"' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text= 'Split' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+split+"' type='QModelIndex'}"))
            
            test.pass("Commmision rate displayed correctly for Additional sales representative"+data.srNum[14]+" on sales order item");
        
        else
            test.fail("Incorrect commission is displayed for Additional sales representative "+data.srNum[14]+" under sales order item screen");
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    
    
    
    
    
}
