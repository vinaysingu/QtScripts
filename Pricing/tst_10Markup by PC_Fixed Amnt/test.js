function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(6);
    
    test.log("********* Markup Prcing Schedule by Product Category with Fixed Amount **************");	
//    //----------------- Mark Up by Product Category for Customer -----------------
//    test.log("********* Markup by Product Category for Customer **************");
//    //------- Variable declaration -----
//    var targetItem1 = "MARKUPITEM9";
//    var mPSName1 = "Mark-up by Prod Cat vth Fixed Amnt";
//    var mCustName1 = "MCUST16";
//    var custType1 = "NORMAL"+"-"+"Normal Domestic Customers";
//    var prcAssg1 = mPSName1 +" - " +"Markup Pricing Schedule"; 
//    var markupamnt1 = 10;
//    var productCat1 = "PRODUCT CATEGORY 4";
//    var productCatFS1 = productCat1 +" - "+"For Markup";
//    
//    //------ Product Category Creation ---------
//    try{ 
//        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
//        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Setup..."));
//        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Product Categories");
//        clickItem(":Setup._tree_XTreeWidget", "Master Information.Product Categories", 43, 4, 0, Qt.LeftButton);
//        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
//        type(waitForObject(":_stack._category_XLineEdit"), productCat1);
//        nativeType("<Tab>");
//        type(waitForObject(":_stack._description_XLineEdit"), "For Markup");
//        
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        snooze(2);
//        waitForObject(":_stack._prodcat_XTreeWidget");
//        if(object.exists("{column='0' container=':_stack._prodcat_XTreeWidget' text='"+productCat1+"' type='QModelIndex'}"))
//            test.pass(""+productCat1+" product category created successfully");
//        else  
//            test.fail(""+productCat1+" product category not found in the list"); 
//        
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        
//    }
//    catch(e)
//    {
//        test.fail("Error in creating Product Category"+e);
//    }
//    
//    //-------  New item creation ----
//    
//    copyItem("YTRUCK1",targetItem1,"10.00", "6.00");
//    //--- Item Site creation for the newly created item ------
//    createRIS(targetItem1);
//    
//    
//    //------Enabling Exclusive option for the created item and assiging the Product Category created----
//    try
//    {
//        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
//        activateItem(":xTuple ERP: *_QMenuBar", "Products");
//        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
//        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
//        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
//        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
//        waitForObject(":Quotes.Query_QToolButton");
//        clickButton(":Quotes.Query_QToolButton");
//        openItemContextMenu(":_list_XTreeWidget_3",targetItem1, 5, 5, Qt.LeftButton);       
//        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
//        snooze(2);
//        if(!findObject(":Item is Sold.Exclusive_QCheckBox_3").checked)
//        {
//            clickButton(waitForObject(":Item is Sold.Exclusive_QCheckBox_3"));
//        }
//        waitForObject(":_prodcat_XComboBox_2")
//                clickItem(":_prodcat_XComboBox_2", productCatFS1, 0,0,5, Qt.LeftButton);
//        snooze(0.5);
//        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
//        snooze(0.5);
//        clickButton(waitForObject(":Quotes.Close_QToolButton"));
//        test.log("Exclusive option enabled sucessfully");
//    }
//    catch(e)
//    {
//        test.fail("Error in enabling the exclusive option for an ite:"+e);
//        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
//        {
//            
//            clickButton(waitForObject(":View Check Run.Cancel_QPushButton"));
//        }
//        if(object.exists(":Quotes.Close_QToolButton"))
//        {
//            clickButton(waitForObject(":Quotes.Close_QToolButton"));
//        }
//        
//    }
//    
//    
//    
//    //---Creating Pricing Schedule of Type Mark-Up for a customer ----
//    
//    try
//    {
//        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
//        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
//        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
//        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
//        type(waitForObject(":GroupBox1._name_XLineEdit"), mPSName1);
//        nativeType("<Tab>");
//        type(waitForObject(":GroupBox1._descrip_XLineEdit"), "Markup Pricing Schedule");
//        nativeType("<Tab>");
//        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
//        clickButton(waitForObject(":Type.Markup_QRadioButton"));
//        clickButton(waitForObject(":Markup By.Product Category_QRadioButton"));
//        snooze(0.5);
//        clickItem(":_markupProdCatGroup._markupProdcat_XComboBox", productCatFS1, 0, 0, 5, Qt.LeftButton);
//        nativeType("<Tab>");
//        
//        type(waitForObject(":_markupProdCatGroup._markupQtyBreakCat_XLineEdit"), "<0>");
//        type(waitForObject(":_markupProdCatGroup._fixedAmtMarkup_XLineEdit"), "10");
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
//        
//        waitForObject(":_ipshead_XTreeWidget_3");
//        if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+mPSName1+"' type='QModelIndex'}"))
//            test.pass("Pricing Schedule created successfully");
//        else  
//            test.fail("Pricing Schedule not found"); 
//        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
//    }
//    catch(e)
//    {
//        test.fail("Error in Creating the pricing Schedule:"+e);
//        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
//        {
//            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
//        }
//        if(object.exists(":Select Order for Billing.Close_QPushButton"))
//        {
//            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
//        }
//    }
//    
//    //---Creating New Customer-------
//    createCustomer(custType1,mCustName1,"STORE1");
//    
//    //---Assigining the pricing schedule to the Customer created  ----
//    
//    prcasscust(mCustName1,prcAssg1,mPSName1);
//    //---- Sales Order Creation -----------
//    var sonumber1 =  createSalesOrder1(targetItem1, 100 ,mCustName1);
//    //-----Verifying the unit Price of the sales order -------
//    try
//    {
//        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
//        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
//        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
//        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
//        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
//        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
//        waitForObject(":Open Sales Orders.Query_QToolButton");
//        clickButton(":Open Sales Orders.Query_QToolButton");
//        waitForObject(":_list_XTreeWidget_5");
//        openItemContextMenu(":_list_XTreeWidget_5",sonumber1, 5, 5, Qt.LeftButton);
//        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
//        snooze(2);
//        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
//        
//        clickItem(":_lineItemsPage.XLineEdit_XLineEdit", targetItem1, 95, 10, 0, Qt.LeftButton);
//        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
//        
//        var nUPrice1 = findObject(":_amountGroup.XLineEdit_XLineEdit").text;
//        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Detail");
//        var uc1 = findObject(":In USD - $:.XLineEdit_XLineEdit_4").text;
//        
//        var markPercnt1 =findObject(":In USD - $:._markupFromUnitCost_XLineEdit").text;
//        
//        
//        waitForObject(":Sales Order Item.Close_QPushButton");
//        clickButton(":Sales Order Item.Close_QPushButton");
//        snooze(0.5);
//        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
//        waitForObject(":Quotes.Close_QToolButton");
//        clickButton(":Quotes.Close_QToolButton");
//        test.log("Net Unit Price is  "+nUPrice1+"");
//        
//        var cValue1 = 100*((nUPrice1/uc1)-1);
//        var cValue1 = roundNumber(cValue1,2);
//        calUC1 = parseFloat(uc1)+parseFloat(10);
//        calUC1 = roundNumber(calUC1,3);
//        nUPrice1 = roundNumber(nUPrice1,3);
//        test.log("nUPrice is "+nUPrice1+"");
//        test.log("cal markup %  "+cValue1+"");
//        
//        if(nUPrice1 == calUC1)
//            
//        {
//            test.pass("Net Unit Price of an Item calculated correctly according to the markup pricing schedule");
//            if(markPercnt1 == cValue1)
//                test.pass("Markup Percentage calculated correctly ");
//            else
//                test.fail("Incorrect Markup Percentage is calculated for the line item");
//        }             
//        else
//            test.fail("Incorrect Unit Price calculted for the sales order irrespective of the pricing schedule assigned");
//        
//        
//    }
//    catch(e)
//    {
//        test.fail("Error in verifying the pricing of Sales Order created with Markup Pricing Schedule assignied to customer:"+e);
//        if(object.exists(":Quotes.Close_QToolButton"))
//        {
//            waitForObject(":Quotes.Close_QToolButton");
//            clickButton(":Quotes.Close_QToolButton");
//        }
//    }
//    
//    
//    
//    
//    //2
//    //----------------- Markup by Product Category for Customer Ship To ------------
//    test.log("********* Markup by Product Category for Customer Ship To **************");
//    //------- Variable declaration -----
//    var targetItem2 = "MARKUPITEM9";
//    var mPSName2 = "CSTMark-up by Prod Cat vth Fixed amnt";
//    var mCustName2 = "MCUST17";
//    var  shipToNum2 = "STORE2";
//    var custType2 = "NORMAL"+"-"+"Normal Domestic Customers";
//    var markupVal2 = 15;
//    var prcAssg2 = mPSName2 +" - " +"Customer ShipTo Markup"; 
//    var productCat2 = "PRODUCT CATEGORY 4";
//    var productCatFS2 = productCat2 +" - "+"For Markup";
//    
//    //---Creating New Customer-------
//    createCustomer(custType2,mCustName2,shipToNum2);
//    
//    //---Creating Pricing Schedule of Type Mark-Up Product Category for Customer Ship-To ----
//    
//    try
//    {
//        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
//        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
//        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
//        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
//        type(waitForObject(":GroupBox1._name_XLineEdit"), mPSName2);
//        nativeType("<Tab>");
//        type(waitForObject(":GroupBox1._descrip_XLineEdit"), "Customer ShipTo Markup");
//        nativeType("<Tab>");
//        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
//        clickButton(waitForObject(":Type.Markup_QRadioButton"));
//        clickButton(waitForObject(":Markup By.Product Category_QRadioButton"));
//        snooze(0.5);
//        clickItem(":_markupProdCatGroup._markupProdcat_XComboBox", productCatFS2, 0, 0, 5, Qt.LeftButton);
//        nativeType("<Tab>");
//        type(waitForObject(":_markupProdCatGroup._markupQtyBreakCat_XLineEdit"), "<0>");
//        type(waitForObject(":_markupProdCatGroup._fixedAmtMarkup_XLineEdit"), "15");
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
//        //---Verifying Pricing Schedule Created---------
//        waitForObject(":_ipshead_XTreeWidget_3");
//        if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+mPSName2+"' type='QModelIndex'}"))
//            test.pass("Pricing Schedule created successfully for customer ship to");
//        else  
//            test.fail("Pricing Schedule created for customer ship to not found"); 
//        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
//    }
//    catch(e)
//    {
//        test.fail("Error in Creating the pricing Schedule:"+e);
//        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
//        {
//            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
//        }
//        if(object.exists(":Select Order for Billing.Close_QPushButton"))
//        {
//            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
//        }
//    }
//    
//    //---Pricing Schedule Assignment to customer Ship-to--------
//    prcassgship(mCustName2, shipToNum2,prcAssg2);
//    //---- Sales Order Creation -----------
//    var sonumber2 =  createSalesOrder1(targetItem2, 100 ,mCustName2);
//    //-----Verifying the unit Price of the sales order -------
//    try
//    {
//        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
//        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
//        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
//        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
//        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
//        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
//        waitForObject(":Open Sales Orders.Query_QToolButton");
//        clickButton(":Open Sales Orders.Query_QToolButton");
//        waitForObject(":_list_XTreeWidget_5");
//        openItemContextMenu(":_list_XTreeWidget_5",sonumber2, 5, 5, Qt.LeftButton);
//        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
//        snooze(2);
//        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
//        
//        clickItem(":_lineItemsPage.XLineEdit_XLineEdit", targetItem2, 95, 10, 0, Qt.LeftButton);
//        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
//        var nUPrice2 = findObject(":_amountGroup.XLineEdit_XLineEdit").text;
//        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Detail");
//        var uc2 = findObject(":In USD - $:.XLineEdit_XLineEdit_4").text;
//        
//        var markPercnt2 =findObject(":In USD - $:._markupFromUnitCost_XLineEdit").text;
//        
//        
//        waitForObject(":Sales Order Item.Close_QPushButton");
//        clickButton(":Sales Order Item.Close_QPushButton");
//        snooze(0.5);
//        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
//        waitForObject(":Quotes.Close_QToolButton");
//        clickButton(":Quotes.Close_QToolButton");
//        test.log("Net Unit Price is  "+nUPrice2+"");
//        var cValue2 = 100*((nUPrice2/uc2)-1);
//        var cValue2 = roundNumber(cValue2,2);
//        calUC2 = parseFloat(uc2)+parseFloat(15);
//        calUC2 = roundNumber(calUC2,3);
//        nUPrice2 = roundNumber(nUPrice2,3);
//        test.log("nUPrice is "+nUPrice2+"");
//        test.log("cal markup %  "+cValue2+"");
//        
//        
//        if(nUPrice2 == calUC2)
//        {
//            test.pass("Net Unit Price of an Item calculated correctly according to the markup pricing schedule");
//            if(markPercnt2 == cValue2)
//                test.pass("Markup Percentage calculated correctly ");
//            
//            else
//                test.fail("Incorrect Markup Percentage is calculated for the line item");
//        }
//        else
//            test.fail("Incorrect Unit Price calculted for the sales order irrespective of the pricing schedule assigned");
//        
//        
//        
//    }
//    catch(e)
//    {
//        test.fail("Error in verifying the pricing of Sales Order created with Markup Pricing Schedule assignied to customer:"+e);
//        if(object.exists(":Quotes.Close_QToolButton"))
//        {
//            waitForObject(":Quotes.Close_QToolButton");
//            clickButton(":Quotes.Close_QToolButton");
//        }
//    }
//    
//    //3
//    
//    //----------------- Markup by Product Category for Customer Ship To Pattern------------
//    test.log("********* Markup by Product Category for Customer Ship To Pattern **************");
//    //------- Variable declaration -----
//    var targetItem3 = "MARKUPITEM9";
//    var mPSName3 = "CSTPatMark-up by PC vth Fixed Amnt";
//    var mCustName3 = "MCUST18";
//    var  shipToNum3 = "STORE1";
//    var custType3 = "NORMAL"+"-"+"Normal Domestic Customers";
//    var markupVal3 = 20;
//    var prcAssg3 = mPSName3 +" - " +"Cust ShipTo Patt Markup"; 
//    var pat = ".*";
//    var productCat3 = "PRODUCT CATEGORY 4";
//    var productCatFS3 = productCat3 +" - "+"For Markup";
//    
//    //---Creating New Customer-------
//    createCustomer(custType3,mCustName3,shipToNum3);
//    
//    //---Creating Pricing Schedule of Type Mark-Up for Customer Ship-To Pattern----
//    
//    try
//    {
//        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
//        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
//        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
//        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
//        type(waitForObject(":GroupBox1._name_XLineEdit"), mPSName3);
//        nativeType("<Tab>");
//        type(waitForObject(":GroupBox1._descrip_XLineEdit"), "Cust ShipTo Patt Markup");
//        nativeType("<Tab>");
//        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
//        clickButton(waitForObject(":Type.Markup_QRadioButton"));
//        clickButton(waitForObject(":Markup By.Product Category_QRadioButton"));
//        snooze(0.5);
//        clickItem(":_markupProdCatGroup._markupProdcat_XComboBox", productCatFS3, 0, 0, 5, Qt.LeftButton);
//        nativeType("<Tab>");
//        type(waitForObject(":_markupProdCatGroup._markupQtyBreakCat_XLineEdit"), "<0>");
//        type(waitForObject(":_markupProdCatGroup._fixedAmtMarkup_XLineEdit"), "20");
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
//        
//        waitForObject(":_ipshead_XTreeWidget_3");
//        if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+mPSName3+"' type='QModelIndex'}"))
//            test.pass("Pricing Schedule created successfully");
//        else  
//            test.fail("Pricing Schedule creation failed"); 
//        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
//    }
//    catch(e)
//    {
//        test.fail("Error in Creating the pricing Schedule:"+e);
//        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
//        {
//            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
//        }
//        if(object.exists(":Select Order for Billing.Close_QPushButton"))
//        {
//            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
//        }
//    }
//    
//    //---Pricing Schedule Assignment to customer Ship-to pattern --------
//    prcAssgShipToPatt(mCustName3,prcAssg3, pat)
//    //---- Sales Order Creation -----------
//    var sonumber3 =  createSalesOrder1(targetItem3, 100 ,mCustName3);
//    //-----Verifying the unit Price of the sales order -------
//    try
//    {
//        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
//        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
//        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
//        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
//        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
//        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
//        waitForObject(":Open Sales Orders.Query_QToolButton");
//        clickButton(":Open Sales Orders.Query_QToolButton");
//        waitForObject(":_list_XTreeWidget_5");
//        openItemContextMenu(":_list_XTreeWidget_5",sonumber3, 5, 5, Qt.LeftButton);
//        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
//        snooze(2);
//        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
//        
//        clickItem(":_lineItemsPage.XLineEdit_XLineEdit", targetItem3, 95, 10, 0, Qt.LeftButton);
//        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
//        var nUPrice3 = findObject(":_amountGroup.XLineEdit_XLineEdit").text;
//        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Detail");
//        var uc3 = findObject(":In USD - $:.XLineEdit_XLineEdit_4").text;
//        
//        var markPercnt3 =findObject(":In USD - $:._markupFromUnitCost_XLineEdit").text;
//        
//        
//        waitForObject(":Sales Order Item.Close_QPushButton");
//        clickButton(":Sales Order Item.Close_QPushButton");
//        snooze(0.5);
//        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
//        waitForObject(":Quotes.Close_QToolButton");
//        clickButton(":Quotes.Close_QToolButton");
//        test.log("Net Unit Price is  "+nUPrice3+"");
//        
//        var cValue3 = 100*((nUPrice3/uc3)-1);
//        var cValue3 = roundNumber(cValue3,2);
//        calUC3 = parseFloat(uc3)+parseFloat(20);
//        calUC3 = roundNumber(calUC3,3);
//        nUPrice3 = roundNumber(nUPrice3,3);
//        test.log("nUPrice is "+nUPrice3+"");
//        test.log("cal markup %  "+cValue3+"");
//        
//        if(nUPrice3 == calUC3)
//        {
//            test.pass("Net Unit Price of an Item calculated correctly according to the markup pricing schedule");
//            
//            if(markPercnt3 == cValue3)
//                test.pass("Markup Percentage calculated correctly ");
//            else
//                test.fail("Incorrect Markup Percentage is calculated for the line item");
//        }
//        else
//            test.fail("Incorrect Unit Price calculted for the sales order irrespective of the pricing schedule assigned");
//        
//        
//    }
//    catch(e)
//    {
//        test.fail("Error in verifying the pricing of Sales Order created with Markup Pricing Schedule assignied to customer:"+e);
//        if(object.exists(":Quotes.Close_QToolButton"))
//        {
//            waitForObject(":Quotes.Close_QToolButton");
//            clickButton(":Quotes.Close_QToolButton");
//        }
//    }
//    
//    
//    //4
//    
//    
//    //----------------- Markup by Product Category for Customer Type ------------
//    test.log("********* Markup by Product Category for Customer Type **************");
//    //------- Variable declaration -----
//    var targetItem4 = "MARKUPITEM10";
//    var mPSName4 = "CTypeMark-up by Prod Cat vth Fixed Amnt";
//    var mCustName4 = "MCUST19";
//    var  shipToNum4 = "STORE1";
//    var custType4 = "MTYPE7";
//    var custTypeAss4 = "MTYPE7"+"-"+"MTYPE7";
//    var markupVal4 = 25;
//    var prcAssg4 = mPSName4 +" - " +"Markup Cust Type"; 
//    var pat = ".*";
//    var productCat4 = "PRODUCT CATEGORY 5";
//    var productCatFS4 = productCat4 +" - "+"For Markup";
//    //---Creating New Customer Type----
//    
//    try
//    {
//        
//        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
//        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
//        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types");
//        clickItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types", 43, 7, 0, Qt.LeftButton);
//        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
//        type(waitForObject(":_code_XLineEdit"), custType4);
//        nativeType("<Tab>");
//        type(waitForObject(":_description_XLineEdit"),custType4);
//        nativeType("<Tab>");
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        
//        waitForObject(":_stack._custtype_XTreeWidget");
//        if(object.exists("{column='0' container=':_stack._custtype_XTreeWidget' text='"+custType4+"' type='QModelIndex'}"))
//            test.pass("Customer Type created successfully");
//        else  
//            test.fail("Customer Type creation failed"); 
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//    }
//    catch(e)
//    {
//        test.fail("Error in creating the Customer Type:"+e);
//        if(object.exists(":View Check Run.Save_QPushButton"))
//        {
//            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        }
//    }
//    
//    //------ Product Category Creation ---------
//    try{ 
//        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
//        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Setup..."));
//        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Product Categories");
//        clickItem(":Setup._tree_XTreeWidget", "Master Information.Product Categories", 43, 4, 0, Qt.LeftButton);
//        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
//        type(waitForObject(":_stack._category_XLineEdit"), productCat4);
//        nativeType("<Tab>");
//        type(waitForObject(":_stack._description_XLineEdit"), "For Markup");
//        
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        snooze(2);
//        waitForObject(":_stack._prodcat_XTreeWidget");
//        if(object.exists("{column='0' container=':_stack._prodcat_XTreeWidget' text='"+productCat4+"' type='QModelIndex'}"))
//            test.pass(""+productCat4+" product category created successfully");
//        else  
//            test.fail(""+productCat4+" product category not found in the list"); 
//        
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        
//    }
//    catch(e)
//    {
//        test.fail("Error in creating Product Category"+e);
//    }
//    //---Creating New Customer-------
//    createCustomer(custTypeAss4,mCustName4,shipToNum4);
//    //-------  New item creation ----
//    
//    copyItem("YTRUCK1",targetItem4,"10.00", "6.00");
//    //--- Item Site creation for the newly created item ------
//    createRIS(targetItem4);
//    
//    
//    //------Enabling  Exclusive option  for the created item ----
//    try
//    {
//        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
//        activateItem(":xTuple ERP: *_QMenuBar", "Products");
//        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
//        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
//        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
//        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
//        waitForObject(":Quotes.Query_QToolButton");
//        clickButton(":Quotes.Query_QToolButton");
//        openItemContextMenu(":_list_XTreeWidget_3",targetItem4, 5, 5, Qt.LeftButton);       
//        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
//        snooze(2);
//        if(!findObject(":Item is Sold.Exclusive_QCheckBox_3").checked)
//        {
//            clickButton(waitForObject(":Item is Sold.Exclusive_QCheckBox_3"));
//        }
//        waitForObject(":_prodcat_XComboBox_2")
//                clickItem(":_prodcat_XComboBox_2", productCatFS4, 0,0,5, Qt.LeftButton);
//        snooze(0.5);
//        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
//        snooze(0.5);
//        clickButton(waitForObject(":Quotes.Close_QToolButton"));
//        test.log("Exclusive option enabled sucessfully");
//    }
//    catch(e)
//    {
//        test.fail("Error in enabling the exclusive option for an ite:"+e);
//        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
//        {
//            
//            clickButton(waitForObject(":View Check Run.Cancel_QPushButton"));
//        }
//        if(object.exists(":Quotes.Close_QToolButton"))
//        {
//            clickButton(waitForObject(":Quotes.Close_QToolButton"));
//        }
//        
//    }
//    
//    
//    //---Creating Pricing Schedule of Type Mark-Up for Customer Type----
//    
//    try
//    {
//        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
//        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
//        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
//        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
//        type(waitForObject(":GroupBox1._name_XLineEdit"), mPSName4);
//        nativeType("<Tab>");
//        type(waitForObject(":GroupBox1._descrip_XLineEdit"), "Markup Cust Type");
//        nativeType("<Tab>");
//        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
//        clickButton(waitForObject(":Type.Markup_QRadioButton"));
//        clickButton(waitForObject(":Markup By.Product Category_QRadioButton"));
//        snooze(0.5);
//        clickItem(":_markupProdCatGroup._markupProdcat_XComboBox", productCatFS4, 0, 0, 5, Qt.LeftButton);
//        nativeType("<Tab>");
//        
//        type(waitForObject(":_markupProdCatGroup._markupQtyBreakCat_XLineEdit"), "<0>");
//        type(waitForObject(":_markupProdCatGroup._fixedAmtMarkup_XLineEdit"), "25");
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
//        //---Verifying Pricing Schedule Created---------
//        waitForObject(":_ipshead_XTreeWidget_3");
//        if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+mPSName4+"' type='QModelIndex'}"))
//            test.pass("Pricing Schedule created successfully");
//        else  
//            test.fail("Pricing Schedule creation failed"); 
//        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
//    }
//    catch(e)
//    {
//        test.fail("Error in Creating the pricing Schedule:"+e);
//        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
//        {
//            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
//        }
//        if(object.exists(":Select Order for Billing.Close_QPushButton"))
//        {
//            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
//        }
//    }
//    
//    //---Pricing Schedule Assignment to customer Ship-to--------
//    
//    prcAssgCustType(mCustName4,custTypeAss4,custType4,prcAssg4);
//    //---- Sales Order Creation -----------
//    var sonumber4 =  createSalesOrder1(targetItem4, 100 ,mCustName4);
//    //-----Verifying the unit Price of the sales order -------
//    try
//    {
//        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
//        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
//        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
//        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
//        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
//        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
//        waitForObject(":Open Sales Orders.Query_QToolButton");
//        clickButton(":Open Sales Orders.Query_QToolButton");
//        waitForObject(":_list_XTreeWidget_5");
//        openItemContextMenu(":_list_XTreeWidget_5",sonumber4, 5, 5, Qt.LeftButton);
//        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
//        snooze(2);
//        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
//        
//        clickItem(":_lineItemsPage.XLineEdit_XLineEdit", targetItem4, 95, 10, 0, Qt.LeftButton);
//        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
//        var nUPrice4 = findObject(":_amountGroup.XLineEdit_XLineEdit").text;
//        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Detail");
//        var uc4 = findObject(":In USD - $:.XLineEdit_XLineEdit_4").text;
//        
//        var markPercnt4 =findObject(":In USD - $:._markupFromUnitCost_XLineEdit").text;
//        
//        
//        waitForObject(":Sales Order Item.Close_QPushButton");
//        clickButton(":Sales Order Item.Close_QPushButton");
//        snooze(0.5);
//        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
//        waitForObject(":Quotes.Close_QToolButton");
//        clickButton(":Quotes.Close_QToolButton");
//        test.log("Net Unit Price is  "+nUPrice4+"");
//        var cValue4 = 100*((nUPrice4/uc4)-1);
//        var cValue4 = roundNumber(cValue4,2);
//        calUC4 = parseFloat(uc4)+parseFloat(25);
//        calUC4 = roundNumber(calUC4,3);
//        nUPrice4 = roundNumber(nUPrice4,3);
//        test.log("nUPrice is "+nUPrice4+"");
//        test.log("cal markup %  "+cValue4+"");
//        
//        if(nUPrice4 == calUC4)
//        {
//            test.pass("Net Unit Price of an Item calculated correctly according to the markup pricing schedule");
//            if(markPercnt4 == cValue4)
//                test.pass("Markup Percentage calculated correctly ");
//            else
//                test.fail("Incorrect Markup Percentage is calculated for the line item");
//        }
//        else
//            test.fail("Incorrect Unit Price calculted for the sales order irrespective of the pricing schedule assigned");
//        
//        
//    }
//    catch(e)
//    {
//        test.fail("Error in verifying the pricing of Sales Order created with Markup Pricing Schedule assignied to customer:"+e);
//        if(object.exists(":Quotes.Close_QToolButton"))
//        {
//            waitForObject(":Quotes.Close_QToolButton");
//            clickButton(":Quotes.Close_QToolButton");
//        }
//    }
//    
//    //5
    
    
    //----------------- Markup by Product Category for Customer Type Pattern ------------
    test.log("********* Markup by Product Category for Customer Type Pattern **************");
    //------- Variable declaration -----
    var targetItem5 = "MARKUPITEM11";
    var mPSName5 = "CTypePatMarkup by Prod Cat vth Fixed Amnt";
    var mCustName5 = "MCUST20";
    var  shipToNum5 = "STORE1";
    var custType5 = "MTYPE8";
    var custTypeAss5 = "MTYPE8"+"-"+"MTYPE8";
    var markupVal5 = 30;
    var prcAssg5 = mPSName5 +" - " +"Markup Cust Type"; 
    var pat = ".*";
    var productCat5 = "PRODUCT CATEGORY 6";
    var productCatFS5 = productCat5 +" - "+"For Markup";
    
//     
//    
//    //---Creating New Customer Type----
//    
//    try
//    {
//        
//        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
//        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
//        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types");
//        clickItem(":Setup._tree_XTreeWidget", "Master Information.Customer Types", 43, 7, 0, Qt.LeftButton);
//        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
//        type(waitForObject(":_code_XLineEdit"), custType5);
//        nativeType("<Tab>");
//        type(waitForObject(":_description_XLineEdit"),custType5);
//        nativeType("<Tab>");
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        
//        waitForObject(":_stack._custtype_XTreeWidget");
//        if(object.exists("{column='0' container=':_stack._custtype_XTreeWidget' text='"+custType5+"' type='QModelIndex'}"))
//            test.pass("Customer Type created successfully");
//        else  
//            test.fail("Customer Type creation failed"); 
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//    }
//    catch(e)
//    {
//        test.fail("Error in creating the Customer Type:"+e);
//        if(object.exists(":View Check Run.Save_QPushButton"))
//        {
//            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        }
//    }
//    
//    //------ Product Category Creation ---------
//    try{ 
//        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
//        activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Setup..."));
//        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Product Categories");
//        clickItem(":Setup._tree_XTreeWidget", "Master Information.Product Categories", 43, 4, 0, Qt.LeftButton);
//        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
//        type(waitForObject(":_stack._category_XLineEdit"), productCat5);
//        nativeType("<Tab>");
//        type(waitForObject(":_stack._description_XLineEdit"), "For Markup");
//        
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        snooze(2);
//        waitForObject(":_stack._prodcat_XTreeWidget");
//        if(object.exists("{column='0' container=':_stack._prodcat_XTreeWidget' text='"+productCat5+"' type='QModelIndex'}"))
//            test.pass(""+productCat5+" product category created successfully");
//        else  
//            test.fail(""+productCat5+" product category not found in the list"); 
//        
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        
//    }
//    catch(e)
//    {
//        test.fail("Error in creating Product Category"+e);
//    }
//    //---Creating New Customer-------
//    createCustomer(custTypeAss5,mCustName5,shipToNum5);
//   //-------  New item creation ----
//    
//    copyItem("YTRUCK1",targetItem5,"10.00", "6.00");
//    //--- Item Site creation for the newly created item ------
//    createRIS(targetItem5);
//    
//    
//    //------Enabling  Exclusive option  for the created item ----
//    try
//    {
//        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
//        activateItem(":xTuple ERP: *_QMenuBar", "Products");
//        waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
//        activateItem(":xTuple ERP:*.Products_QMenu", "Item");
//        waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
//        activateItem(":xTuple ERP:*.Item_QMenu", "List...");
//        waitForObject(":Quotes.Query_QToolButton");
//        clickButton(":Quotes.Query_QToolButton");
//        openItemContextMenu(":_list_XTreeWidget_3",targetItem5, 5, 5, Qt.LeftButton);       
//        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
//        snooze(2);
//        if(!findObject(":Item is Sold.Exclusive_QCheckBox_3").checked)
//        {
//            clickButton(waitForObject(":Item is Sold.Exclusive_QCheckBox_3"));
//        }
//        waitForObject(":_prodcat_XComboBox_2")
//                clickItem(":_prodcat_XComboBox_2", productCatFS5, 0,0,5, Qt.LeftButton);
//        snooze(0.5);
//        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
//        snooze(0.5);
//        clickButton(waitForObject(":Quotes.Close_QToolButton"));
//        test.log("Exclusive option enabled sucessfully");
//    }
//    catch(e)
//    {
//        test.fail("Error in enabling the exclusive option for an ite:"+e);
//        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
//        {
//            
//            clickButton(waitForObject(":View Check Run.Cancel_QPushButton"));
//        }
//        if(object.exists(":Quotes.Close_QToolButton"))
//        {
//            clickButton(waitForObject(":Quotes.Close_QToolButton"));
//        }
//        
//    }
//    
//    //---Creating Pricing Schedule of Type Mark-Up for Customer Type Pattern----
//    
//    try
//    {
//        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
//        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Pricing"));
//        activateItem(waitForObjectItem(":xTuple ERP: *.Pricing_QMenu", "Pricing Schedules..."));
//        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
//        type(waitForObject(":GroupBox1._name_XLineEdit"), mPSName5);
//        nativeType("<Tab>");
//        type(waitForObject(":GroupBox1._descrip_XLineEdit"), "Markup Cust Type");
//        nativeType("<Tab>");
//        clickButton(waitForObject(":Pricing Schedule.New_QPushButton"));
//        clickButton(waitForObject(":Type.Markup_QRadioButton"));
//        clickButton(waitForObject(":Markup By.Product Category_QRadioButton"));
//        snooze(0.5);
//        clickItem(":_markupProdCatGroup._markupProdcat_XComboBox", productCatFS5, 0, 0, 5, Qt.LeftButton);
//        nativeType("<Tab>");
//        
//        type(waitForObject(":_markupProdCatGroup._markupQtyBreakCat_XLineEdit"), "<0>");
//        type(waitForObject(":_markupProdCatGroup._fixedAmtMarkup_XLineEdit"), "30");
//        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
//        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
//        //---Verifying Pricing Schedule Created---------
//        waitForObject(":_ipshead_XTreeWidget_3");
//        if(object.exists("{column='0' container=':_ipshead_XTreeWidget_3' text='"+mPSName5+"' type='QModelIndex'}"))
//            test.pass("Pricing Schedule created successfully");
//        else  
//            test.fail("Pricing Schedule creation failed"); 
//        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
//    }
//    catch(e)
//    {
//        test.fail("Error in Creating the pricing Schedule:"+e);
//        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
//        {
//            clickButton(waitForObject(":Sales Order.Cancel_QPushButton_3"));
//        }
//        if(object.exists(":Select Order for Billing.Close_QPushButton"))
//        {
//            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
//        }
//    }
//    
    //---Pricing Schedule Assignment to customer Type Pattern--------
    prcAssgCustTypPatt(mCustName5,prcAssg5, pat,mPSName5)
            
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
        var cValue5 = 100*((nUPrice5/uc5)-1);
        var cValue5 = roundNumber(cValue5,2);
        calUC5 = parseFloat(uc5)+parseFloat(30);
        calUC5 = roundNumber(calUC5,3);
        nUPrice5 = roundNumber(nUPrice5,3);
        test.log("nUPrice is "+nUPrice5+"");
        test.log("cal markup %  "+cValue5+"");
        
        
        if(nUPrice5 == calUC5)
        {           
            test.pass("Net Unit Price of an Item calculated correctly according to the markup pricing schedule");
            if(markPercnt5 == cValue5)
                test.pass("Markup Percentage calculated correctly ");
            else
                test.fail("Incorrect Markup Percentage is calculated for the line item");
        }
        else
            test.fail("Incorrect Unit Price calculted for the sales order irrespective of the pricing schedule assigned");
        
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
