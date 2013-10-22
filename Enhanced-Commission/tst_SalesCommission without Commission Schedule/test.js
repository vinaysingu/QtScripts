

function init()
{
    data = new Object();
    var set = testData.dataset("Data.tsv");
     
     var srpNum   = new Array();
     var srpName  = new Array();
     var cPerc    = new Array();
     var custName = new Array();
     var custType = new Array();
     var shipNum  = new Array();
     var srNum    = new Array();
     var srName   = new Array();
     
     
     //--
    var record = set[0];
    data.sourceItem  = testData.field(record,"SOURCEITEM");
    data.srpItem     = testData.field(record,"SRPITEM");
    data.listPrice   = testData.field(record,"LISTPRICE");
    data.wSalePrice  = testData.field(record,"WSALEPRICE");
    data.cPrc        = testData.field(record,"CPRC");
    //--
 
    
    
    for (var row = 0; row < set.length; ++row)
    {
        var record = set[row];
        srpNum[row]    =  testData.field(record,"SRPNUM");
        srpName[row]   =  testData.field(record,"SRPNAME");
        cPerc[row]     =  testData.field(record,"CPERC");
        custType[row]  =  testData.field(record,"CUSTTYPE");
        custName[row]  =  testData.field(record,"CUSTNAME");
        shipNum[row]   =  testData.field(record,"SHIPNUM");
        srNum[row]     =  testData.field(record,"SRNUM");
         srName[row]   =  testData.field(record,"SRNAME");
         
    }   
    
    data.srpNum    = srpNum;
    data.srpName   = srpName;
    data.cPerc     = cPerc;
    data.custType  = custType;
    data.custName  = custName;
    data.shipNum   = shipNum;
    data.srNum     = srNum;
    data.srName    = srName;
    
    
      //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(1);
   
}



function main()
{
    
 
    //-----Commission Tab Setup----
    
    //--Creating an item ---

    
    
    var qty ="100";
    
  
    copyitem(data.sourceItem,data.srpItem ,data.listPrice,data.wSalePrice);
    //---Create item-site----
    createRIS(data.srpItem );
    
    //--SALES REP1
    //---Create a sales representative---
  
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srpNum[0]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srpName[0]);
        nativeType("<Tab>");
        type(waitForObject(":_commPrcnt_XLineEdit"),data.cPerc[0]);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srpNum[0]+"' type='QModelIndex'}"))
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
    
    
    //SALES REP2
    //---Create a sales representative---

    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srpNum[1]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srpName[1]);
        nativeType("<Tab>");
        type(waitForObject(":_commPrcnt_XLineEdit"),data.cPerc[1]);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srpNum[1]+"' type='QModelIndex'}"))
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
    
    
    //SALES REP3
    //---Create a sales representative---

    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srpNum[2]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srpName[2]);
        nativeType("<Tab>");
        type(waitForObject(":_commPrcnt_XLineEdit"),data.cPerc[2]);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srpNum[2]+"' type='QModelIndex'}"))
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
    
    
    //---Set Customer Defaults settings----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Customer Defaults");
        waitForObject(":_comboGroup._salesrep_XComboBox");
        clickItem(":_comboGroup._salesrep_XComboBox",data.srpNum[0] +'-'+ data.srpName[0], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in setting customer defaults"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }
    
    //---Create a Customer----

    
    createCustomer(data.custType[0],data.custName[0],data.shipNum[0]);
    
    //---Assigning the primary sales rep and additional sales representatives  to the customer ----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[0], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        
        //--Assign primary and Additional sales representative to the customer--
        
        //---Assign primary sales rep to ship-to
        clickButton(waitForObject(":_addressTab.Ship To_QRadioButton_2"));
        openItemContextMenu(":_addressStack._shipto_XTreeWidget",data.shipNum[0], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":xTuple ERP: Enterprise Edition 4.0.0Beta2 - Practice Database on 192.168.0.92/Prc-mfg AS admin.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srpNum[0] +'-'+ data.srpName[0], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        if(object.exists(":Registration Key.Yes_QPushButton"))
            clickButton(":Registration Key.Yes_QPushButton");
        
        
        //---Verifying the Customer ship-to with primary sales rep assigined--
        snooze(1);
        waitForObject(":Sales Reps._salesReps_XTreeWidget_2");
        if(object.exists("{column='0'  container=':Sales Reps._salesReps_XTreeWidget_2' text= '"+data.srpNum[0]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget_2' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the Ship-to sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the Ship-to ");
        snooze(1);
        
        //--Assigning additional sales representative1 ---
        
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srpNum[1] +'-'+ data.srpName[1], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        //---Verifying the Customer ship-to with Additional sales rep assigined--
        snooze(1);
        waitForObject(":Sales Reps._salesReps_XTreeWidget_2");
        if(object.exists("{column='0'  container=':Sales Reps._salesReps_XTreeWidget_2' text= '"+data.srpNum[1]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget_2' text='No' type='QModelIndex'}"))
            test.pass("Additional sales representative "+data.srpNum[1]+" associated to the Ship-to sucessfully");
        else  
            test.fail("Failed to assign additional sales representative "+data.srpNum[1]+" to the Ship-to ");
        snooze(1);
        
        //--Assigning additional sales representative2 ---
        
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srpNum[2] +'-'+ data.srpName[2], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        //---Verifying the Customer ship-to with Additional sales rep assigined--
        snooze(1);
        waitForObject(":Sales Reps._salesReps_XTreeWidget_2");
        if(object.exists("{column='0'  container=':Sales Reps._salesReps_XTreeWidget_2' text= '"+data.srpNum[2]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget_2' text='No' type='QModelIndex'}"))
            test.pass("Additional sales representative "+data.srpNum[2]+" associated to the Ship-to sucessfully");
        else  
            test.fail("Failed to assign additional sales representative "+data.srpNum[2]+" to the Ship-to ");
        snooze(1);
        
        clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        snooze(1);
        
        
        
        //---Assign primary,Additional sales rep to Customer
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        
        //---Verifying the Customer with primary sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srpNum[0]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the customer ");
        snooze(1); 
        //---Additional sales rep2---
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srpNum[1] +'-'+ data.srpName[1], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        //---Verifying the Customer with Additional sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srpNum[1]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='No' type='QModelIndex'}"))
            test.pass("Additional sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign Additional sales representative to the customer ");
        snooze(1); 
        
        
        //---Additional sales rep3---
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srpNum[2] +'-'+ data.srpName[2], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        //---Verifying the Customer with Additional sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srpNum[2]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='No' type='QModelIndex'}"))
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
        test.fail("Error in assigning primary sales representative to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    
    
    
    
    //--Case1--
    //---Configure the sales setup with all Additional set up for commissions set to None---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Additional setup option for commission._primarySalesRep_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRep_XComboBox","None", 0, 0, 5, Qt.LeftButton);
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
    
    
    //--Create a Sales Order--
    var sonum = createSalesOrder1(data.srpItem , qty,data.custName[0]);
    //---Edit the sales order created and verify the Commission%
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.srpItem , 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        waitForObject(":Commissions._commissions_XTreeWidget");
        var srwidget = findObject(":Commissions._commissions_XTreeWidget");
        var srcount = srwidget.topLevelItemCount;
        
        if(srcount == '0')
            test.pass("No sales representatives are displayed under sales order line item");
        else
            test.fail("Sales representatives are displayed under sales order line item failed to set commission setup");
        
        
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in verifying the commision under sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Select Order for Billing.Save_QPushButton_2"))
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
    }
    
    
    
    
    //--Case2    
    
    //---Configure the sales setup with  'Primary Sales Rep.' receives option to 'Full', sets 'Additional Sales Rep.' receives to 'Full'---
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
        test.log("Sales setup configured sucessfully with Primary sales rep receives full and remaining set to None");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    
    //--Create a Sales Order--
    var sonum = createSalesOrder1(data.srpItem , qty,data.custName[0]);  
    
    
    
    //---Edit the sales order created and verify the Commission%
    
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
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.srpItem , 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        snooze(2);
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        //---Calculating the Commission% for Primary sales Rep and additional sales rep---
        var cP1= (subtl*data.cPerc[0])/100;
        cmnP1 =cP1+".00";
        var cA1 = (subtl*data.cPerc[1])/100;
        cmnA1 =cA1+".00";
        var cA2 = (subtl*data.cPerc[2])/100;
        cmnA2 =cA2+".00";
        
        //----Verifying the Commision displayed for Primary sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text= '"+data.srpNum[0]+"' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP1+"' type='QModelIndex'}"))   
            
            test.pass("Commmision rate displayed correctly for primary sales representative "+data.srpNum[0]+" on sales order item");  
        else
            test.fail("Incorrect commission is displayed for primary sales representative under sales order item screen");
        
        snooze(1);
        //----Verifying the Commision displayed for Additionalsales representative 1----
        
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+data.srpNum[1]+"' type='QModelIndex'}" &&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnA1+"' type='QModelIndex'}"))
            test.pass("Commmision rate displayed correctly for Additional sales representatiave "+data.srpNum[1]+" on sales order item");   
        else
            test.fail("Incorrect commission is displayed for Additional sales representatiave "+data.srpNum[1]+" under sales order item screen");
        
        
        //----Verifying the Commision displayed for Additionalsales representative 2----
        
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+data.srpNum[2]+"' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnA2+"' type='QModelIndex'}"))   
            
            test.pass("Commmision rate displayed correctly for Additional sales representatiave "+data.srpNum[2]+" on sales order item");  
        else
            test.fail("Incorrect commission is displayed for Additional sales representatiave "+data.srpNum[2]+" under sales order item screen");
        
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
    
    
    
    
    
    
    
    
    
    
    //Case-3
    //---Configure the sales setup with  'Primary Sales Rep.' receives option to 'Full', sets 'Additional Sales Rep.' receives to 'Split'---
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
        test.log("Sales setup configured sucessfully with Primary sales rep receives full and remaining set to None");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    
    
    
    
    //--Create a Sales Order--
    var sonum = createSalesOrder1(data.srpItem , qty,data.custName[0]);  
    
    //---Edit the sales order created and verify the Commission%
    
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
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.srpItem , 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        
        //---Calculating the Commission% for primary and additional sales representatiaves----
        
        var cP1= (subtl*data.cPerc[0])/100;
        var cmnP1 = cP1+".00";
        test.log(cmnP1);
        
        var cmnAsrp1= (subtl*data.cPerc[1])/100;
        var cmnA1 =(cmnAsrp1/2)+".00"; 
        test.log(cmnA1);
        
        var cmnAsrp2 = (subtl*data.cPerc[2])/100;
        var cmnA2 =(cmnAsrp2/2)+".00"; 
        test.log(cmnA2);
        
        
        //----Verifying the Commision displayed for Primary sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+data.srpNum[0]+"' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP1+"' type='QModelIndex'}"  ))
            
            test.pass("Commmision rate displayed correctly for primary sales representative "+data.srpNum[0]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for primary sales representative under sales order item screen");
        
        //----Verifying the Commision displayed for Additionalsales representative1----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+data.srpNum[1]+"' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnA1+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Additional sales representatiave "+data.srpNum[1]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for Additional sales representatiave "+data.srpNum[1]+" under sales order item screen");
        
        
        //----Verifying the Commision displayed for Additionalsales representative1----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+data.srpNum[2]+"' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnA2+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Additional sales representatiave "+data.srpNum[2]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for Additional sales representatiave "+data.srpNum[2]+" under sales order item screen");
        
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
    
    
    
    
    //Case-4
    //---Configure the sales setup with  'Primary Sales Rep.' receives option to 'Split', sets 'Additional Sales Rep.' receives to 'Split'---
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
        test.log("Sales setup configured sucessfully with 'Primary Sales Rep.' receives option to 'Split', sets 'Additional Sales Rep.' receives to 'Split' and remaining set to None");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    
    //--Create a Sales Order--
    var sonum = createSalesOrder1(data.srpItem , qty,data.custName[0]);  
    
    
    //---Edit the sales order created and verify the Commission%
    
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
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.srpItem , 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        
        //---Calculating the Commission% for primary and additional sales representative---
        
        var cmnPsrp1= (subtl*data.cPerc[0])/100;
        var cmnP1 =(cmnPsrp1/3)+".00";
        test.log(cmnP1);
        
        var cmnAsrp1= (subtl*data.cPerc[1])/100;
        var cmnA1 =(cmnAsrp1/3)+".00"; 
        test.log(cmnA1);
        
        var cmnAsrp2 = (subtl*data.cPerc[2])/100;
        var cmnA2 =(cmnAsrp2/3)+".00"; 
        test.log(cmnA2);                 ;
        //----Verifying the Commision displayed for Primary sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+data.srpNum[0]+"' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP1+"' type='QModelIndex'}"  ))
            
            test.pass("Commmision rate displayed correctly for primary sales representative "+data.srpNum[0]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for primary sales representative under sales order item screen");
        
        //----Verifying the Commision displayed for Additionalsales representative1----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+data.srpNum[1]+"' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnA1+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Additional sales representatiave "+data.srpNum[1]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for Additional sales representatiave "+data.srpNum[1]+" under sales order item screen");
        
        
        //----Verifying the Commision displayed for Additionalsales representative1----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+data.srpNum[2]+"' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnA2+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Additional sales representatiave "+data.srpNum[2]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for Additional sales representatiave "+data.srpNum[2]+" under sales order item screen");
        
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
    
    
    //----Create a sales order---
    
    var sonum2 = createSalesOrder1(data.srpItem , qty,data.custName[0]);
    //---Edit the sales order created and verify the Commission%
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_5",sonum2, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        test.log(subtl);  
        //---Calculating the Commission%
        var cmnP = ((subtl*data.cPerc[0])/100)+".00";
        test.log(cmnP);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.srpItem , 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        //----Verifying the Commision displayed for Primary sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+data.srpNum[0]+"' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Primary sales representatiave "+data.srpNum[0]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for Primary sales representatiave "+data.srpNum[0]+" under sales order item screen");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Select Order for Billing.Save_QPushButton_2"))
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    
    //--Ship the SO Created---
    issueStock(sonum2);
    
    
    
    
    //---Create Invoice---
    //----Create Invoice and verify the Commission applied----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "Billing Selections..."));
        snooze(0.5);
        if(OS.name != "Windows")
        {
            type(waitForObject(":xTuple ERP:*.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP:*.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        openItemContextMenu(":Billing Selections._cobill_XTreeWidget",sonum2, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Create Invoice"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating the Invoice:"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    
    //---Verifying the Commission applied in invoice----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted Invoices..."));
        if(OS.name != "Windows")
        {
            type(waitForObject(":xTuple ERP:*.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP:*.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+sonum2+"' type='QModelIndex'}"))
            test.pass("Invoice creation successful");
        else  
            test.fail("Invoice creation failed");  
        openItemContextMenu(":_list_XTreeWidget_5",sonum2, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        if(object.exists(":OK_QPushButton"))
            clickButton(waitForObject(":OK_QPushButton"));
        snooze(2);
        var inv1 = findObject(":_invoiceNumber_XLineEdit").text
                   test.log(inv1);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        waitForObject(":lineItemsTab._invcitem_XTreeWidget");
        clickItem(":lineItemsTab._invcitem_XTreeWidget",data.srpItem , 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton"));
        clickTab(waitForObject(":xTuple ERP: Enterprise Edition 4.0.0Beta2 - Practice Database on 192.168.0.92/Prc-mfg AS admin.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Commissions._commissions_XTreeWidget_2");
        
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget_2' text='"+data.srpNum[0]+"' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget_2' text='"+cmnP+"' type='QModelIndex'}"))
            
            test.pass("Commission rate calcuated correctly on invoice");
        else
            
            test.fail("Incorrect commission rate is displayed on invocie");
        clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        
        //---Post the invocie created----     
        openItemContextMenu(":_list_XTreeWidget_5", sonum2, 5, 5, Qt.LeftButton);         
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post..."));
        clickButton(waitForObject(":List Unposted Vouchers.Continue_QPushButton"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+sonum2+"' type='QModelIndex'}"))
            test.fail("Failed to post the invoice");
        else  
            test.pass("Invoice posted sucessfuly");  
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in verifying the Invoice craeted:"+e);
        if(object.exists(":Sales Order.Save_QPushButton_3"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
    }
    
    //----Entering CashReceipt-------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Workbench..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Cash Receipts");
        
        waitForObject(":_cashRecptTab.New_QPushButton");
        clickButton(":_cashRecptTab.New_QPushButton");
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit",data.custName[0]);
        snooze(1);
        nativeType("<Tab>");
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        doubleClickItem(":_applicationsTab._aropen_XTreeWidget_2",inv1, 5, 5, 0, Qt.LeftButton);
        //waitForObject(":[*]Voucher.XLineEdit_XLineEdit");
        snooze(1);
        var qtinvoice= findObject(":[*]Voucher.XLineEdit_XLineEdit").text
                       test.log(qtinvoice);
        
        type(":Cash Receipt Application.XLineEdit_XLineEdit", qtinvoice);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2");
        type(":Cash Receipt.XLineEdit_XLineEdit_2", qtinvoice);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        test.log("Cash receipt is created");
    }
    catch(e)
    {
        test.fail("Error in creating cash receipt:" + e);
    }
    //-----Posting Cash Receipts-----
    try
    {
        waitForObject(":_cashRecptTab._cashrcpt_XTreeWidget");
        while(findObject(":_cashRecptTab._cashrcpt_XTreeWidget").topLevelItemCount >= 1)
        {
            clickItem(":_cashRecptTab._cashrcpt_XTreeWidget",data.custName[0], 5, 5, 1, Qt.LeftButton);
            clickButton(waitForObject(":_cashRecptTab.Post_QPushButton"));
            
            var flag =1;
        }   
        
        waitForObject(":Receivables Workbench.Close_QPushButton");
        clickButton(":Receivables Workbench.Close_QPushButton");
        test.log("Cash receipts posted successful");
    }
    catch(e)
    {
        flag = 0;
        test.fail("Error in posting cash receipts:" + e);
        if(object.exists(":Receivables Workbench.Close_QPushButton"))
        {
            waitForObject(":Receivables Workbench.Close_QPushButton");
            clickButton(":Receivables Workbench.Close_QPushButton");
        }
        
    }
    
    
    
    
    
    //---Verifying the commission applied on invoice item--
    try{
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu_2", "List Unposted..."));
        clickButton(waitForObject(":Open Sales Orders.New_QToolButton"));
        if(object.exists(":OK_QPushButton"))
            clickButton(waitForObject(":OK_QPushButton"));
        type(waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit"),data.custName[0]);
        var invnum = findObject(":_invoiceNumber_XLineEdit").text;
        test.log(invnum);
        nativeType("<Tab>");
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"),data.srpItem );
        nativeType("<Tab>");
        type(waitForObject(":_ordered_XLineEdit_2"), "100");
        nativeType("<Tab>");
        type(waitForObject(":_billed_XLineEdit"), "100");
        nativeType("<Tab>");
        clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        var subtl=findObject(":Cash Receipt.XLineEdit_XLineEdit_2").text
                  test.log(subtl);
        snooze(1);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        //--Verifying the invoice created
        
        if(object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+invnum+"' type='QModelIndex'}"))
            test.pass("Invoice creation successful");
        else  
            test.fail("Invoice creation failed");  
        //---Verifying the commission applied on invoice---
        openItemContextMenu(":_list_XTreeWidget_5",invnum, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        if(object.exists(":OK_QPushButton"))
            clickButton(waitForObject(":OK_QPushButton"));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        //---calculating the commission percentage--
        var cmnP = ((subtl*data.cPerc[0])/100)+".00";
        snooze(1);
        
        openItemContextMenu(":lineItemsTab._invcitem_XTreeWidget","1", 5, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton"));
        clickTab(waitForObject(":xTuple ERP: Enterprise Edition 4.0.0Beta2 - Practice Database on 192.168.0.92/Prc-mfg AS admin.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Commissions._commissions_XTreeWidget_2");
        
        if(object.exists("{column='0'  container=':Commissions._commissions_XTreeWidget_2' text= '"+data.srpNum[0]+"' type='QModelIndex'}" && "{column='9' container=':Commissions._commissions_XTreeWidget_2' text='"+cmnP+"' type='QModelIndex'}"))
            
            test.pass("Commission rate calcuated correctly on invoice line item");
        else
            
            test.fail("Incorrect commission rate is displayed on invocie line item");
        
        clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in calculating the commission on Invoice item"+e);
        if(object.exists(":Sales Order.Save_QPushButton_3"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    
    
    
    //--
    //--
     //---Configure sales setup with Primary sales rep receives full,Additional Sales Representative 'Full' and remaining set to None---
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
        test.log("Sales setup configured sucessfully with Primary sales rep receives full and remaining set to None");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    
    
    //----Adding sales rep commissions from SO lineitem screen---------
    
    //---Create Sales Representative----

    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[1]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[1]);
        nativeType("<Tab>");
        type(waitForObject(":_commPrcnt_XLineEdit"),data.cPrc);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[1]+"' type='QModelIndex'}"))
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
    
    
   
    
    //--Creating the SO for a customer with multiple line items---
    try
    {     
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        
        waitForObject(":Open Sales Orders.Query_QToolButton");
        clickButton(":Open Sales Orders.Query_QToolButton");
        
        waitForObject(":Open Sales Orders.New_QToolButton");
        clickButton(":Open Sales Orders.New_QToolButton");
        waitForObject(":Bill-To.VirtualClusterLineEdit_CLineEdit_2");
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2",data.custName[0]);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_headerPage._custPONumber_XLineEdit_2");
        type(":_headerPage._custPONumber_XLineEdit_2", "103");
        
        if(findObject(":_headerPage.Print on Save_QCheckBox").checked)
            clickButton(":_headerPage.Print on Save_QCheckBox");
        
        var sonum3 = findObject(":_headerPage._orderNumber_XLineEdit_2").text;
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        snooze(0.5);
        nativeType("<Tab>");
        //--LineItem1
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit",data.srpItem );
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_qtyOrdered_XLineEdit_2");
        findObject(":_qtyOrdered_XLineEdit_2").clear();
        type(":_qtyOrdered_XLineEdit_2", qty);
        
        soitem = findObject(":_itemGroup.ItemLineEdit_ItemLineEdit").text;
        
        soqty = findObject(":_qtyOrdered_XLineEdit_2").text;
        
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        soamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit").text;
        //--Line Item2
        snooze(1);
        
        waitForObject(":_lineItemsPage.New_QPushButton_2");
        clickButton(":_lineItemsPage.New_QPushButton_2");
        waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit");
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", data.srpItem );
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_qtyOrdered_XLineEdit_2");
        findObject(":_qtyOrdered_XLineEdit_2").clear();
        type(":_qtyOrdered_XLineEdit_2", qty);
        
        soitem = findObject(":_itemGroup.ItemLineEdit_ItemLineEdit").text;
        
        soqty = findObject(":_qtyOrdered_XLineEdit_2").text;
        
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_2");
        type(":_schedGroup.XDateEdit_XDateEdit_2", "+7");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit_3");
        type(":_schedGroup.XDateEdit_XDateEdit_3", "+8");
        waitForObject(":Sales Order.Save_QPushButton");
        clickButton(":Sales Order.Save_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton_2");
        clickButton(":Sales Order.Close_QPushButton_2");
        soamt = findObject(":_lineItemsPage.XLineEdit_XLineEdit").text;
        snooze(1);
        waitForObject(":Sales Order.Save_QPushButton_2");
        clickButton(":Sales Order.Save_QPushButton_2");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='0' container=':_list_XTreeWidget_5' text='"+sonum3+"' type='QModelIndex'}"))
            test.pass("Sales Order creation successful");
        else  
            test.fail("Sales Order creation failed");            
        
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    
    catch(e)
    {
        test.fail("Error in creating a sales order" + e );
    }
    
    //---Edit the SO select 'YES' to add sales representative under SO line item,ship-to and  customer---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_5",sonum3, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        //--Open 1st lineitem
        openItemContextMenu(":_lineItemsPage.XLineEdit_XLineEdit","1", 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit Line..."));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        clickButton(waitForObject(":Commissions.New_QToolButton"));
        waitForObject(":Sales Rep Commission._salesRep_XComboBox");
        clickItem(":Sales Rep Commission._salesRep_XComboBox",data.srNum[1], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        //---Add sales represetative to all SO line items and Customer----
        clickButton(waitForObject(":Registration Key.Yes_QPushButton"));
        clickButton(waitForObject(":Registration Key.Yes_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        //----Verifying the Sales Representative add under line items---
        snooze(1);
        openItemContextMenu(":_lineItemsPage.XLineEdit_XLineEdit","2", 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit Line..."));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+data.srNum[1]+"' type='QModelIndex'}"))
            test.pass("Sucessfully added salesrepresentative to sales order lineitem");
        else
            test.fail("Failed to add salesrepresentative under sales order line item");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Select Order for Billing.Save_QPushButton_2"))
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    //---Verify the sales-representaitve added under customer---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[0], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(3);
        
        
        
        //---Verify  sales-representaitve added under Shipto---
        
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Addresses");
        clickButton(waitForObject(":_addressTab.Ship To_QRadioButton_2"));
        openItemContextMenu(":_addressStack._shipto_XTreeWidget",data.shipNum[0], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":xTuple ERP: Enterprise Edition 4.0.0Beta2 - Practice Database on 192.168.0.92/Prc-mfg AS admin.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        waitForObject(":Sales Reps._salesReps_XTreeWidget_2");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget_2' text= '"+data.srNum[1]+"' type='QModelIndex'}"))
            test.pass("Sales representative added sucessfully for customer ship-to");
        else  
            test.fail("Failed to add sales representative to the customer ship-tp");
        snooze(1);
        clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        //---Verify  sales-representaitve added under sales rep tab of customer---
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[1]+"' type='QModelIndex'}"))
            test.pass("Sales representative added under the customer sucessfully");
        else  
            test.fail("Failed to add sales representative to the customer ");
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative added under the customer verified sucessfully");
    }
    
    catch(e)
    {
        test.fail("Error in verifying the sales representative added to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    
    
    
    
    //---Create Sales Representative----

    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[2]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[2]);
        nativeType("<Tab>");
        type(waitForObject(":_commPrcnt_XLineEdit"),data.cPrc);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[2]+"' type='QModelIndex'}"))
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
    
    
    
    
    
    
    
    
    
    
    //---Select 'NO' in dialog to add sales representative and verify in customer,ship-to and sales order line items---
    
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_5",sonum3, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        //--Open 1st lineitem
        openItemContextMenu(":_lineItemsPage.XLineEdit_XLineEdit","1", 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit Line..."));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        clickButton(waitForObject(":Commissions.New_QToolButton"));
        waitForObject(":Sales Rep Commission._salesRep_XComboBox");
        clickItem(":Sales Rep Commission._salesRep_XComboBox",data.srNum[2], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Slect No and verify Sales represetative is not added to all SO line items,ship-to and Customer----
        clickButton(waitForObject(":Sales Order.No_QPushButton"));
        clickButton(waitForObject(":Sales Order.No_QPushButton"));
        clickButton(waitForObject(":Sales Order.No_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        //----Verifying whether the Sales Representative is added under line items---
        snooze(1);
        openItemContextMenu(":_lineItemsPage.XLineEdit_XLineEdit","2", 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit Line..."));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+data.srNum[2]+"' type='QModelIndex'}"))
            test.fail("Added salesrepresentative under the sales order lineitem irrelevantly");
        else
            test.pass("No salesrepresentative added under the sales order line item");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        
        test.fail("Error occured on verifying the sales representative added to the sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Select Order for Billing.Save_QPushButton_2"))
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    //---Verify whether the sales-representaitve is added under customer---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[0], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        
        //---Verify  sales-representaitve added under Shipto---
        
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Addresses");
        clickButton(waitForObject(":_addressTab.Ship To_QRadioButton_2"));
        openItemContextMenu(":_addressStack._shipto_XTreeWidget",data.shipNum[0], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":xTuple ERP: Enterprise Edition 4.0.0Beta2 - Practice Database on 192.168.0.92/Prc-mfg AS admin.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        waitForObject(":Sales Reps._salesReps_XTreeWidget_2");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget_2' text= '"+data.srNum[2]+"' type='QModelIndex'}"))
            test.fail("Sales representative added under customer ship-to irrelevantly");
        else  
            test.pass("No sales representative is added under to the customer ship-to");
        snooze(1);
        clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        
        //---Verifying the sales rep added under commision tab of customer
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[2]+"' type='QModelIndex'}"))
            test.fail("Sales representative added under the customer irrelevantly");
        else  
            test.pass("No sales representative is added under customer");
        snooze(1);    
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative added under the customer verified sucessfully");
    }
    
    catch(e)
    {
        test.fail("Error in verifying the sales representative added to the cuaotmer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
  
    
}
