function main()
{
    
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
  snooze(6);
//    //-----Editing of preferences----
//    try
//    {
//        if(OS.name == "Darwin")
//        {
//            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
//            activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Preferences..."));
//        }
//        else
//        {
//            waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
//            activateItem(":xTuple ERP: *_QMenuBar", "System");
//            waitForObjectItem(":xTuple ERP: *._System_QMenu", "Preferences...");
//            activateItem(":xTuple ERP: *._System_QMenu", "Preferences...");
//        }
//        snooze(0.5);
//       if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
//        {
//            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
//                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
//        }
//        if(object.exists(":Notice.Notice_QDialog"))
//        {
//            if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
//                clickButton(":Notice.Remind me about this again._QCheckBox");
//            snooze(0.2);
//            waitForObject(":Notice.OK_QPushButton");
//            clickButton(":Notice.OK_QPushButton");
//        }
//        waitForObject(":User Preferences.Save_QPushButton_2");
//        clickButton(":User Preferences.Save_QPushButton_2");
//        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
//        activateItem(":xTuple ERP: *_QMenuBar", "System");
//        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
//        activateItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
//    }
//    catch(e)
//    {
//        test.fail("Error in editing preferences"+ e);
//    } 
//   
//    //--------Exiting the application------
//    waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
//    activateItem(":xTuple ERP: *_QMenuBar", "System");
//    waitForObjectItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
//    activateItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP...");
//    snooze(5);
//    if(OS.name=="Linux")
//        startApplication("xtuple.bin");
//    
//   else
//        startApplication("xtuple");
//   
//    snooze(2);
//   
//   loginAppl("CONFIGURE"); 
//   snooze(1);
//    
//    
//	
//    //----------Setting the Encryption Key----------
//    try
//    {
//        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
//        activateItem(":xTuple ERP: *_QMenuBar", "System");
//        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
//        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
//        waitForObject(":Configure.Encryption_QModelIndex");
//        mouseClick(":Configure.Encryption_QModelIndex", 40, 8, 0, Qt.LeftButton);
//        
//        snooze(1);
//        if(object.exists(":Sales Order.OK_QPushButton_2"))
//        {
//            clickButton(":Sales Order.OK_QPushButton_2");
//            snooze(1);
//            waitForObject(":_ccEncKeyName_QLineEdit_2").clear();
//            type(":_ccEncKeyName_QLineEdit_2", "xTuple.key");
//            waitForObject(":_stack_FileLineEdit").clear();
//            type(":_stack_FileLineEdit", "c:/crypto");
//            waitForObject(":_stack_FileLineEdit_2").clear();
//            type(":_stack_FileLineEdit_2", "/home/administrator/crypto");
//            waitForObject(":_stack_FileLineEdit_3").clear();
//            type(":_stack_FileLineEdit_3", "/users/crypto");
//        }
//        
//        waitForObject(":_stack_FileLineEdit_2");
//        linuxPath = findObject(":_stack_FileLineEdit_2").text;
//        
//        waitForObject(":_stack_FileLineEdit");
//        winPath = findObject(":_stack_FileLineEdit").text;
//        
//        waitForObject(":Setup.Save_QPushButton");
//        clickButton(":Setup.Save_QPushButton");
//    }
//    catch(e)
//    {
//        test.fail("Error in extracting OS name" + e);
//    }
    
      //---Create a sales representative---
    var srNum1 = "143"
    var Srname1 = "SREP143";
    var cPerc = "7.5";   
     var item ="YTRUCK1";
    var qty = "100";
  
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),srNum1);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),Srname1);
        nativeType("<Tab>");
        type(waitForObject(":_commPrcnt_XLineEdit"),cPerc);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+srNum1+"' type='QModelIndex'}"))
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
    var custType1 = "NORMAL-Normal Domestic Customers";
    var custname1 = "CUSTOMER143";
    var shipnum1 = "STORE1";
  
    createCustomer(custType1,custname1,shipnum1);
         //---Assigning the Sales Rep as a primary sales rep to the customer ----
   
    
     try
    {
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
    clickButton(waitForObject(":Quotes.Query_QToolButton"));
    openItemContextMenu(":_list_XTreeWidget_3",custname1, 5, 5, Qt.LeftButton);
    activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
    clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
    clickButton(waitForObject(":Sales Reps.New_QToolButton"));
    waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
    clickItem(":Sales Rep Assignment._salesRep_XComboBox",srNum1 +'-'+ Srname1, 0, 0, 5, Qt.LeftButton);
    clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
    clickButton(waitForObject(":View Check Run.Save_QPushButton"));
       if(object.exists(":Registration Key.Yes_QPushButton"))
    clickButton(":Registration Key.Yes_QPushButton");
        //---Verifying the Customer with primary sales rep assigined--
       snooze(1);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
            if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+srNum1+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' occurrence='2' text='Yes' type='QModelIndex'}"))
                test.fail("Primary sales representative associated to the customer sucessfully");
            else  
                test.pass("Failed to assign primary sales representative to the customer ");
            snooze(1); 
       
    clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            
     clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
           test.log("Sales Representative  assigined sucessfully to the customer");
   }
    
      catch(e)
       {
          test.fail("Error in assigning primary sales representative to the cuaotmer "+e);
          if(object.exists(":Sales Order.Cancel_QPushButton"))
              clickButton(":Sales Order.Cancel_QPushButton");
          if(object.exists(":Quotes.Close_QToolButton"))
         clickButton(":Quotes.Close_QToolButton");
        }
  
  
  
   
  
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
      var sonum = createSalesOrder1(item, qty,custname1);
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
      clickItem(":_lineItemsPage.XLineEdit_XLineEdit",item, 0, 0, 5, Qt.LeftButton);
      clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
      clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commission");
      snooze(1);
      waitForObject(":Commissions._commissions_XTreeWidget");
       if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+srNum1+"' type='QModelIndex'}"))
          test.fail("Sales representative is displayed under sales order line item irrelevantly");
      else  
          test.pass("Sucessfully verified no sales representative is displayed under sales order");    
      
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
      
  //---
  //---
          
    
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
      
    var sonum2 = createSalesOrder1(item, qty,custname1);
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
      var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_3").text;
      test.log(subtl);
      //---Calculating the Cmm%
      var cmnP = (subtl*cPerc)/100;
      test.log(cmnP);
      waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
      clickItem(":_lineItemsPage.XLineEdit_XLineEdit",item, 0, 0, 5, Qt.LeftButton);
      clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
      clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commission");
      snooze(1);
      waitForObject(":Commissions._commissions_XTreeWidget");
      var eCmp  = findObject("{column='9' container=':Commissions._commissions_XTreeWidget' type='QModelIndex'}").text;
  test.log(eCmp);
     if(cmnP == eCmp)
      {
          test.pass("Commission calcuated correctly on Sales Order");
          test.log("Commission schedule applied on sales order verified sucessfully");
      }
      else  
          test.fail("Failed to calculate commision percentage on sales order"); 
      snooze(1);
  
  
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
      
        //--Ship the SO Created---
           issueStock(sonum2);
      
         //---Create Invoice---
            //----Create Invoice and verify the freight amount applied----
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
        snooze(2);
      var inv1 = findObject(":_invoiceNumber_XLineEdit").text
                 test.log(inv1);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        snooze(0.5);
        waitForObject(":lineItemsTab._invcitem_XTreeWidget");
        clickItem(":lineItemsTab._invcitem_XTreeWidget",item, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP: *.Edit_QPushButton"));
    clickTab(waitForObject(":xTuple ERP: Enterprise Edition 4.0.0Beta2 - Practice Database on 192.168.0.92/Prc-mfg AS admin.qt_tabwidget_tabbar_QTabBar"), "Commission");
         waitForObject(":Commissions._commissions_XTreeWidget_2");
         var invCmsn =findObject("{column='9' container=':Commissions._commissions_XTreeWidget_2' type='QModelIndex'}").text;
          if(invCmsn == cmnP)
         
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
                type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit",custname1);
                snooze(1);
                nativeType("<Tab>");
                waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
                doubleClickItem(":_applicationsTab._aropen_XTreeWidget_2",inv1, 5, 5, 0, Qt.LeftButton);
                //waitForObject(":[*]Voucher.XLineEdit_XLineEdit");
                snooze(1);
                var qtinvoice= findObject(":[*]Voucher.XLineEdit_XLineEdit").text
                test.log(qtinvoice);
                
                type(":_lineItemsPage.XLineEdit_XLineEdit_2", qtinvoice);
                 clickButton(waitForObject(":View Check Run.Save_QPushButton"));;
                
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
                    clickItem(":_cashRecptTab._cashrcpt_XTreeWidget",custname1, 5, 5, 1, Qt.LeftButton);
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
         
   //----Adding sales rep commissions from SO lineitem screen---------
    
                //---Create Sales Representative----
    
    var srNum2 = "SALE144"
    var Srname2 = "SREP144";
    var cPerc = "5";   
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),srNum2);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),Srname2);
        nativeType("<Tab>");
        type(waitForObject(":_commPrcnt_XLineEdit"),cPerc);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+srNum2+"' type='QModelIndex'}"))
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
        type(":Bill-To.VirtualClusterLineEdit_CLineEdit_2",custname1);
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
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", item);
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
        type(":_itemGroup.ItemLineEdit_ItemLineEdit", item);
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
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commission");
        clickButton(waitForObject(":Commissions.New_QToolButton"));
        waitForObject(":Sales Rep Commission._salesRep_XComboBox");
        clickItem(":Sales Rep Commission._salesRep_XComboBox",srNum2, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Sales Rep Commission.Override_QRadioButton"));
        clickButton(waitForObject(":_roleGroupBox.Rep_QRadioButton"));
        clickButton(waitForObject(":_splitGroupBox.Full_QRadioButton"));
        waitForObject(":Sales Rep Commission._commPercent_XLineEdit").clear();
        type(":Sales Rep Commission._commPercent_XLineEdit", "10");
        nativeType("<Tab>");
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
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commission");
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+srNum2+"' type='QModelIndex'}"))
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
        openItemContextMenu(":_list_XTreeWidget_3",custname1, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+srNum2+"' type='QModelIndex'}"))
                         test.pass("Sales representative added under the customer sucessfully");
        else  
            test.fail("Failed to add sales representative to the customer ");
        snooze(1);    
       //---Verify  sales-representaitve added under Shipto---
         clickButton(waitForObject(":_addressTab.Ship To_QRadioButton_2"));
    openItemContextMenu(":_addressStack._shipto_XTreeWidget",shipnum1, 5, 5, Qt.LeftButton);
    activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
    clickTab(waitForObject(":xTuple ERP: Enterprise Edition 4.0.0Beta2 - Practice Database on 192.168.0.92/Prc-mfg AS admin.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        waitForObject(":Sales Reps._salesReps_XTreeWidget_2");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget_2' text= '"+srNum2+"' type='QModelIndex'}"))
          test.pass("Sales representative added sucessfully for customer ship-to");
        else  
            test.fail("Failed to add sales representative to the customer ship-tp");
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
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commission");
        clickButton(waitForObject(":Commissions.New_QToolButton"));
        waitForObject(":Sales Rep Commission._salesRep_XComboBox");
        clickItem(":Sales Rep Commission._salesRep_XComboBox",srNum2, 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Sales Rep Commission.Override_QRadioButton"));
        clickButton(waitForObject(":_roleGroupBox.Rep_QRadioButton"));
        clickButton(waitForObject(":_splitGroupBox.Full_QRadioButton"));
        waitForObject(":Sales Rep Commission._commPercent_XLineEdit").clear();
        type(":Sales Rep Commission._commPercent_XLineEdit", "10");
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Slect No and verify Sales represetative is not added to all SO line items,ship-to and Customer----
        clickButton(waitForObject(":Sales Order.No_QPushButton"));
        clickButton(waitForObject(":Sales Order.No_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        //----Verifying whether the Sales Representative is added under line items---
        snooze(1);
        openItemContextMenu(":_lineItemsPage.XLineEdit_XLineEdit","2", 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit Line..."));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commission");
        if(object.exists("{column='0' container=':Commissions._commissions_XTreeWidget' text='"+srNum2+"' type='QModelIndex'}"))
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
        openItemContextMenu(":_list_XTreeWidget_3",custname1, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+srNum2+"' type='QModelIndex'}"))
       test.fail("Sales representative added under the customer irrelevantly");
        else  
            test.pass("No sales representative is added under customer");
        snooze(1);    
       //---Verify  sales-representaitve added under Shipto---
         clickButton(waitForObject(":_addressTab.Ship To_QRadioButton_2"));
    openItemContextMenu(":_addressStack._shipto_XTreeWidget",shipnum1, 5, 5, Qt.LeftButton);
    activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
    clickTab(waitForObject(":xTuple ERP: Enterprise Edition 4.0.0Beta2 - Practice Database on 192.168.0.92/Prc-mfg AS admin.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        waitForObject(":Sales Reps._salesReps_XTreeWidget_2");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget_2' text= '"+srNum2+"' type='QModelIndex'}"))
          test.fail("Sales representative added under customer ship-to irrelevantly");
        else  
            test.pass("No sales representative is added under to the customer ship-to");
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
