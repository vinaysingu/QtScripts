function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(6);
     test.log("********* Markup Pricing Schedule by an Item with specific Percentage **************");
    //----------------- Mark Up by Item for Customer -------------------
    test.log("********* Markup by an Item for Customer **************");
    //------- Variable declaration -----
    var targetItem1 = "MARKUPITEM1";
    var mPSName1 = "Mark-up by Item";
    var mCustName1 = "MCUST1";
    var custType1 = "NORMAL"+"-"+"Normal Domestic Customers";
    var prcAssg1 = mPSName1 +" - " +"Markup Pricing Schedule"; 
    var markupP1 = 10;
    //-------  New item creation ----
    
    copyItem("YTRUCK1",targetItem1,"10.00","6.00");
    //--- Item Site creation for the newly created item ------
    createRIS(targetItem1);
    
    //------Enabling  Exclusive option  for the created item ----
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
        openItemContextMenu(":_list_XTreeWidget_3",targetItem1, 5, 5, Qt.LeftButton);       
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        if(!findObject(":Item is Sold.Exclusive_QCheckBox_3").checked)
        {
            clickButton(waitForObject(":Item is Sold.Exclusive_QCheckBox_3"));
        }
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        snooze(0.5);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Exclusive option enabled sucessfully");
    }
    catch(e)
    {
        test.fail("Error in enabling the exclusive option for an item:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
        }
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        
    }
    
    //---Creating Pricing Schedule of Type Mark-Up for an Item ----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":GroupBox1._name_XLineEdit"), mPSName1);
        nativeType("<Tab>");
        type(waitForObject(":GroupBox1._descrip_XLineEdit"), "Markup Pricing Schedule");
        nativeType("<Tab>");
        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
        clickButton(waitForObject(":Type.Markup_QRadioButton"));
        clickButton(waitForObject(":Markup By.Item_QRadioButton"));
        snooze(0.5);
        type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"), targetItem1);
        nativeType("<Tab>");
        type(waitForObject(":_markupProdCatGroup._markupQtyBreakCat_XLineEdit"), "<0>");
        type(waitForObject(":_markupProdCatGroup._markup_XLineEdit"), "10");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        
        waitForObject(":_ipshead_XTreeWidget_3");
        if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+mPSName1+"' type='QModelIndex'}"))
            test.pass("Pricing Schedule created successfully");
        else  
            test.fail("Pricing Schedule not found"); 
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in Creating the pricing Schedule:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
        }
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    
    //---Creating New Customer-------
    createCustomer(custType1,mCustName1,"STORE1");
    
    //---Assigining the pricing schedule to the Customer created  ----
    
    prcasscust(mCustName1,prcAssg1,mPSName1);
    //---- Sales Order Creation -----------
    var sonumber1 =  createSalesOrder1(targetItem1, 100 ,mCustName1);
    //-----Verifying the unit Price of the sales order -------
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
        waitForObject(":_list_XTreeWidget_5");
        openItemContextMenu(":_list_XTreeWidget_5",sonumber1, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit", targetItem1, 95, 10, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        var nUPrice1 = findObject(":_amountGroup.XLineEdit_XLineEdit").text;
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Detail");
        var uc1 = findObject(":In USD - $:.XLineEdit_XLineEdit_4").text;
        
        var markPercnt1 =findObject(":In USD - $:._markupFromUnitCost_XLineEdit").text;
        
        
        waitForObject(":Sales Order Item.Close_QPushButton");
        clickButton(":Sales Order Item.Close_QPushButton");
        snooze(0.5);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Net Unit Price is  "+nUPrice1+"");
        calUC1 = 1.1*uc1;
        calUC1 = roundNumber(calUC1,3);
        nUPrice1 = roundNumber(nUPrice1,3);
        test.log("nUPrice is "+nUPrice1+"");
        test.log("calUC "+calUC1+"");
        
        if(markPercnt1 == 10)
        {
            test.pass("Markup Percentage displayed correctly ");
            
            if(nUPrice1 == calUC1)
                test.pass("Net Unit Price of an Item calculated correctly according to the markup pricing schedule");
            else
                test.fail("Incorrect Unit Price calculted for the sales order irrespective of the pricing schedule assigned");}
                else
                    test.fail("Incorrect Markup Percentage is displayed in sales order line item");
                
                
            }
    catch(e)
    {
        test.fail("Error in verifying the pricing of Sales Order created with Markup Pricing Schedule assignied to customer:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    
    
    //2
    
    //----------------- Markup by an item for a Customer Ship To ------------
    test.log("********* Markup by an Item for a Customer Ship To **************");
    //------- Variable declaration -----
    var targetItem2 = "MARKUPITEM1";
    var mPSName2 = "CSTMark-up by Item";
    var mCustName2 = "MCUST2";
    var  shipToNum2 = "STORE2";
    var custType2 = "NORMAL"+"-"+"Normal Domestic Customers";
    var markupP2 = 15;
    var prcAssg2 = mPSName2 +" - " +"Customer ShipTo Markup"; 
    
    //---Creating New Customer-------
    createCustomer(custType2,mCustName2,shipToNum2);
    
    //---Creating Pricing Schedule of Type Mark-Up for Customer Ship-To ----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":GroupBox1._name_XLineEdit"), mPSName2);
        nativeType("<Tab>");
        type(waitForObject(":GroupBox1._descrip_XLineEdit"), "Customer ShipTo Markup");
        nativeType("<Tab>");
        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
        clickButton(waitForObject(":Type.Markup_QRadioButton"));
        clickButton(waitForObject(":Markup By.Item_QRadioButton"));
        snooze(0.5);
        type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"), targetItem2);
        nativeType("<Tab>");
        type(waitForObject(":_markupProdCatGroup._markupQtyBreakCat_XLineEdit"), "<0>");
        type(waitForObject(":_markupProdCatGroup._markup_XLineEdit"), "15");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        //---Verifying Pricing Schedule Created---------
        waitForObject(":_ipshead_XTreeWidget_3");
        if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+mPSName2+"' type='QModelIndex'}"))
            test.pass("Pricing Schedule created successfully for customer ship to");
        else  
            test.fail("Pricing Schedule created for customer ship to not found"); 
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in Creating the pricing Schedule:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
        }
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    
    //---Pricing Schedule Assignment to customer Ship-to--------
    prcassgship(mCustName2, shipToNum2,prcAssg2);
    //---- Sales Order Creation -----------
    var sonumber2 =  createSalesOrder1(targetItem2, 100 ,mCustName2);
    //-----Verifying the unit Price of the sales order -------
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
        waitForObject(":_list_XTreeWidget_5");
        openItemContextMenu(":_list_XTreeWidget_5",sonumber2, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit", targetItem2, 95, 10, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        var nUPrice2 = findObject(":_amountGroup.XLineEdit_XLineEdit").text;
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Detail");
        var uc2 = findObject(":In USD - $:.XLineEdit_XLineEdit_4").text;
        
        var markPercnt2 =findObject(":In USD - $:._markupFromUnitCost_XLineEdit").text;
        
        
        waitForObject(":Sales Order Item.Close_QPushButton");
        clickButton(":Sales Order Item.Close_QPushButton");
        snooze(0.5);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Net Unit Price is  "+nUPrice2+"");
        calUC2 = 1.15*uc2;
        calUC2 = roundNumber(calUC2,3);
        nUPrice2 = roundNumber(nUPrice2,3);
        test.log("nUPrice is "+nUPrice2+"");
        test.log("calUC "+calUC2+"");
        
        if(markPercnt2 == 15)
        {
            test.pass("Markup Percentage displayed correctly ");
            if(nUPrice2 == calUC2)
                test.pass("Net Unit Price of an Item calculated correctly according to the markup pricing schedule");
            else
                test.fail("Incorrect Unit Price calculted for the sales order irrespective of the pricing schedule assigned");
        }
        else
            test.fail("Incorrect Markup Percentage is displayed in sales order line item");
        
        
    }
    catch(e)
    {
        test.fail("Error in verifying the pricing of Sales Order created with Markup Pricing Schedule assignied to customer:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    
    
    
    //3
    
    //----------------- Markup by item for Customer Ship To Pattern------------
    test.log("********* Markup by an Item Customer Ship To Pattern **************");
    //------- Variable declaration -----
    var targetItem3 = "MARKUPITEM1";
    var mPSName3 = "CSTPatMark-up by Item";
    var mCustName3 = "MCUST3";
    var  shipToNum3 = "STORE3";
    var custType3 = "NORMAL"+"-"+"Normal Domestic Customers";
    var markupP3 = 20;
    var prcAssg3 = mPSName3 +" - " +"Cust ShipTo Patt Markup"; 
    var pat = ".*";
    
    //---Creating New Customer-------
    createCustomer(custType3,mCustName3,shipToNum3);
    
    //---Creating Pricing Schedule of Type Mark-Up by an Item for Customer Ship-To Pattern----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":GroupBox1._name_XLineEdit"), mPSName3);
        nativeType("<Tab>");
        type(waitForObject(":GroupBox1._descrip_XLineEdit"), "Cust ShipTo Patt Markup");
        nativeType("<Tab>");
        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
        clickButton(waitForObject(":Type.Markup_QRadioButton"));
        clickButton(waitForObject(":Markup By.Item_QRadioButton"));
        snooze(0.5);
        type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"), targetItem3);
        nativeType("<Tab>");
        type(waitForObject(":_markupProdCatGroup._markupQtyBreakCat_XLineEdit"), "<0>");
        type(waitForObject(":_markupProdCatGroup._markup_XLineEdit"), "20");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        
        waitForObject(":_ipshead_XTreeWidget_3");
        if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+mPSName3+"' type='QModelIndex'}"))
            test.pass("Pricing Schedule created successfully");
        else  
            test.fail("Pricing Schedule creation failed"); 
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in Creating the pricing Schedule:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
        }
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    
    //---Pricing Schedule Assignment to customer Ship-to pattern --------
    prcAssgShipToPatt(mCustName3,prcAssg3, pat)
            //---- Sales Order Creation -----------
            var sonumber3 =  createSalesOrder1(targetItem3, 100 ,mCustName3);
    //-----Verifying the unit Price of the sales order -------
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
        waitForObject(":_list_XTreeWidget_5");
        openItemContextMenu(":_list_XTreeWidget_5",sonumber3, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit", targetItem3, 95, 10, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        var nUPrice3 = findObject(":_amountGroup.XLineEdit_XLineEdit").text;
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Detail");
        var uc3 = findObject(":In USD - $:.XLineEdit_XLineEdit_4").text;
        
        var markPercnt3 =findObject(":In USD - $:._markupFromUnitCost_XLineEdit").text;
        
        
        waitForObject(":Sales Order Item.Close_QPushButton");
        clickButton(":Sales Order Item.Close_QPushButton");
        snooze(0.5);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Net Unit Price is  "+nUPrice3+"");
        calUC3 = 1.2*uc3;
        calUC3 = roundNumber(calUC3,3);
        nUPrice3 = roundNumber(nUPrice3,3);
        test.log("nUPrice is "+nUPrice3+"");
        test.log("calUC "+calUC3+"");
        
        if(markPercnt3 == 20)
        {
            test.pass("Markup Percentage displayed correctly ");
            if(nUPrice3 == calUC3)
                test.pass("Net Unit Price of an Item calculated correctly according to the markup pricing schedule");
            else
                test.fail("Incorrect Unit Price calculted for the sales order irrespective of the pricing schedule assigned");
        }
        else
            test.fail("Incorrect Markup Percentage is displayed in sales order line item");
        
        
    }
    catch(e)
    {
        test.fail("Error in verifying the pricing of Sales Order created with Markup Pricing Schedule assignied to customer:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    
    
    
    
    //----------------- Markup by an item for Customer Type ------------
    test.log("********* Markup by an Item Customer Type **************");
    //------- Variable declaration -----
    var targetItem4 = "MARKUPITEM2";
    var mPSName4 = "CTypeMark-up by Item";
    var mCustName4 = "MCUST4";
    var  shipToNum4 = "STORE1";
    var custType4 = "MTYPE1";
    var custTypeAss4 = "MTYPE1"+"-"+"MTYPE1";
    var markupP4 = 25;
    var prcAssg4 = mPSName4 +" - " +"Markup Cust Type"; 
    var pat = ".*";
    //---Creating New Customer Type----
    
    try
    {
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types", 43, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_code_XLineEdit"), custType4);
        nativeType("<Tab>");
        type(waitForObject(":_description_XLineEdit"),custType4);
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        waitForObject(":_stack._custtype_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._custtype_XTreeWidget' text='"+custType4+"' type='QModelIndex'}"))
            test.pass("Customer Type created successfully");
        else  
            test.fail("Customer Type creation failed"); 
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating the Customer Type:"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }
    //---Creating New Customer-------
    createCustomer(custTypeAss4,mCustName4,shipToNum4);
    //-------  New item creation ----
    
    copyItem("YTRUCK1",targetItem4, "10.00", "6.00");
    //--- Item Site creation for the newly created item ------
    createRIS(targetItem4);
    
    //------Enabling  Exclusive option  for the created item ----
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
        openItemContextMenu(":_list_XTreeWidget_3",targetItem4, 5, 5, Qt.LeftButton);       
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        if(!findObject(":Item is Sold.Exclusive_QCheckBox_3").checked)
        {
            clickButton(waitForObject(":Item is Sold.Exclusive_QCheckBox_3"));
        }
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        snooze(0.5);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Exclusive option enabled sucessfully");
    }
    catch(e)
    {
        test.fail("Error in enabling the exclusive option for an ite:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            
            clickButton(waitForObject(":View Check Run.Cancel_QPushButton"));
        }
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        
    }
    
    //---Creating Pricing Schedule of Type Mark-Up for Customer Type----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":GroupBox1._name_XLineEdit"), mPSName4);
        nativeType("<Tab>");
        type(waitForObject(":GroupBox1._descrip_XLineEdit"), "Markup Cust Type");
        nativeType("<Tab>");
        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
        clickButton(waitForObject(":Type.Markup_QRadioButton"));
        clickButton(waitForObject(":Markup By.Item_QRadioButton"));
        snooze(0.5);
        type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"), targetItem4);
        nativeType("<Tab>");
        type(waitForObject(":_markupProdCatGroup._markupQtyBreakCat_XLineEdit"), "<0>");
        type(waitForObject(":_markupProdCatGroup._markup_XLineEdit"), "25");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        //---Verifying Pricing Schedule Created---------
        waitForObject(":_ipshead_XTreeWidget_3");
        if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+mPSName4+"' type='QModelIndex'}"))
            test.pass("Pricing Schedule created successfully");
        else  
            test.fail("Pricing Schedule creation failed"); 
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in Creating the pricing Schedule:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
        }
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    
    //---Pricing Schedule Assignment to customer Ship-to--------
    
    prcAssgCustType(mCustName4,custTypeAss4,custType4,prcAssg4);
    //---- Sales Order Creation -----------
    var sonumber4 =  createSalesOrder1(targetItem4, 100 ,mCustName4);
    //-----Verifying the unit Price of the sales order -------
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
        waitForObject(":_list_XTreeWidget_5");
        openItemContextMenu(":_list_XTreeWidget_5",sonumber4, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit", targetItem4, 95, 10, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        var nUPrice4 = findObject(":_amountGroup.XLineEdit_XLineEdit").text;
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Detail");
        var uc4 = findObject(":In USD - $:.XLineEdit_XLineEdit_4").text;
        
        var markPercnt4 =findObject(":In USD - $:._markupFromUnitCost_XLineEdit").text;
        
        
        waitForObject(":Sales Order Item.Close_QPushButton");
        clickButton(":Sales Order Item.Close_QPushButton");
        snooze(0.5);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Net Unit Price is  "+nUPrice4+"");
        calUC4 = 1.25*uc4;
        calUC4 = roundNumber(calUC4,3);
        nUPrice4 = roundNumber(nUPrice4,3);
        test.log("nUPrice is "+nUPrice4+"");
        test.log("calUC "+calUC4+"");
        
        if(markPercnt4 == 25)
        {
            
            test.pass("Markup Percentage displayed correctly ");
            if(nUPrice4 == calUC4)
                test.pass("Net Unit Price of an Item calculated correctly according to the markup pricing schedule");
            else
                test.fail("Incorrect Unit Price calculted for the sales order irrespective of the pricing schedule assigned");
        }
        else
            test.fail("Incorrect Markup Percentage is displayed in sales order line item");
        
        
    }
    catch(e)
    {
        test.fail("Error in verifying the pricing of Sales Order created with Markup Pricing Schedule assignied to customer:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    
    //5
    
    //----------------- Markup by item for Customer Type Pattern ------------
    test.log("********* Markup by an Item Customer Type Pattern **************");
    //------- Variable declaration -----
    var targetItem5 = "MARKUPITEM3";
    var mPSName5 = "CTypePatMark-up by Item";
    var mCustName5 = "MCUST5";
    var  shipToNum5 = "STORE1";
    var custType5 = "MTYPE2";
    var custTypeAss5 = "MTYPE2"+"-"+"MTYPE2";
    var markupP5 = 30;
    var prcAssg5 = mPSName5 +" - " +"Markup Cust Type Pattern"; 
    var pat = ".*";
    //---Creating New Customer Type----
    
    try
    {
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types", 43, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_code_XLineEdit"), custType5);
        nativeType("<Tab>");
        type(waitForObject(":_description_XLineEdit"),custType5);
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        waitForObject(":_stack._custtype_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._custtype_XTreeWidget' text='"+custType5+"' type='QModelIndex'}"))
            test.pass("Customer Type created successfully");
        else  
            test.fail("Customer Type creation failed"); 
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating the Customer Type:"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }
    //---Creating New Customer-------
    createCustomer(custTypeAss5,mCustName5,shipToNum5);
    //-------  New item creation ----
    
    copyItem("YTRUCK1",targetItem5, "10.00", "6.00");
    //--- Item Site creation for the newly created item ------
    createRIS(targetItem5);
    
    //------Enabling  Exclusive option  for the created item ----
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
        openItemContextMenu(":_list_XTreeWidget_3",targetItem5, 5, 5, Qt.LeftButton);       
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        if(!findObject(":Item is Sold.Exclusive_QCheckBox_3").checked)
        {
            clickButton(waitForObject(":Item is Sold.Exclusive_QCheckBox_3"));
        }
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        snooze(0.5);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Exclusive option enabled sucessfully");
    }
    catch(e)
    {
        test.fail("Error in enabling the exclusive option for an ite:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            
            clickButton(waitForObject(":View Check Run.Cancel_QPushButton"));
        }
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        
    }
    
    //---Creating Pricing Schedule of Type Mark-Up for Customer Type Pattern ----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":GroupBox1._name_XLineEdit"), mPSName5);
        nativeType("<Tab>");
        type(waitForObject(":GroupBox1._descrip_XLineEdit"), "Markup Cust Type Pattern");
        nativeType("<Tab>");
        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
        clickButton(waitForObject(":Type.Markup_QRadioButton"));
        clickButton(waitForObject(":Markup By.Item_QRadioButton"));
        snooze(0.5);
        type(waitForObject(":_itemGroup.ItemLineEdit_ItemLineEdit"), targetItem5);
        nativeType("<Tab>");
        type(waitForObject(":_markupProdCatGroup._markupQtyBreakCat_XLineEdit"), "<0>");
        type(waitForObject(":_markupProdCatGroup._markup_XLineEdit"), "30");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        //---Verifying Pricing Schedule Created---------
        waitForObject(":_ipshead_XTreeWidget_3");
        if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+mPSName5+"' type='QModelIndex'}"))
            test.pass("Pricing Schedule created successfully");
        else  
            test.fail("Pricing Schedule creation failed"); 
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in Creating the pricing Schedule:"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
        {
            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
        }
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    
    //---Pricing Schedule Assignment to customer Type Pattern--------
    prcAssgCustTypPatt(mCustName5,prcAssg5, pat, mPSName5)
            //---- Sales Order Creation -----------
            var sonumber5 =  createSalesOrder1(targetItem5, 100 ,mCustName5);
    //-----Verifying the unit Price of the sales order -------
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
        waitForObject(":_list_XTreeWidget_5");
        openItemContextMenu(":_list_XTreeWidget_5",sonumber5, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit", targetItem5, 95, 10, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        var nUPrice5 = findObject(":_amountGroup.XLineEdit_XLineEdit").text;
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Detail");
        var uc5 = findObject(":In USD - $:.XLineEdit_XLineEdit_4").text;
        
        var markPercnt5 =findObject(":In USD - $:._markupFromUnitCost_XLineEdit").text;
        
        
        waitForObject(":Sales Order Item.Close_QPushButton");
        clickButton(":Sales Order Item.Close_QPushButton");
        snooze(0.5);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        test.log("Net Unit Price is  "+nUPrice5+"");
        calUC5 = 1.3*uc5;
        calUC5 = roundNumber(calUC5,3);
        nUPrice5 = roundNumber(nUPrice5,3);
        test.log("nUPrice is "+nUPrice5+"");
        test.log("calUC "+calUC5+"");
        if(markPercnt5 == 30)
        {
            test.pass("Markup Percentage displayed correctly ");
            
            if(nUPrice5 == calUC5)
                test.pass("Net Unit Price of an Item calculated correctly according to the markup pricing schedule");
            else
                test.fail("Incorrect Unit Price calculted for the sales order irrespective of the pricing schedule assigned");
        }
        else
            test.fail("Incorrect Markup Percentage is displayed in sales order line item");
        
    }
    catch(e)
    {
        test.fail("Error in verifying the pricing of Sales Order created with Markup Pricing Schedule assignied to customer:"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            waitForObject(":Quotes.Close_QToolButton");
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
}
