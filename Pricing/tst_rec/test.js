function main() {
    type(waitForObject(":_username_QLineEdit"), "admin");
    type(waitForObject(":_username_QLineEdit"), "<Tab>");
    type(waitForObject(":_password_QLineEdit"), "zenx2plE");
    type(waitForObject(":_password_QLineEdit"), "<Return>");
    clickButton(waitForObject(":Registration Key.Yes_QPushButton"));
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
    clickButton(waitForObject(":Quotes.Query_QToolButton"));
    waitForObjectItem(":_list_XTreeWidget_5", "Tremendous Toys Incorporated_5");
    clickItem(":_list_XTreeWidget_5", "Tremendous Toys Incorporated_5", 137, 1, 0, Qt.LeftButton);
    waitForObjectItem(":_list_XTreeWidget_5", "Tremendous Toys Incorporated_5");
    doubleClickItem(":_list_XTreeWidget_5", "Tremendous Toys Incorporated_5", 45, 3, 0, Qt.LeftButton);
    mouseClick(waitForObject(":qt_tabwidget_stackedwidget._headerPage_QWidget"), 140, 3, 0, Qt.LeftButton);
    clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
    waitForObjectItem(":_lineItemsPage.XLineEdit_XLineEdit", "Product Box Type 1 Product Box");
    clickItem(":_lineItemsPage.XLineEdit_XLineEdit", "Product Box Type 1 Product Box", 8, 2, 0, Qt.LeftButton);
    clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
    clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Detail");
    mouseDrag(waitForObject(":In USD - $:.Customer Price:_QLabel"), 76, 9, 112, 4, 1, Qt.LeftButton);
    mouseDrag(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), 38, 11, 108, 0, 1, Qt.LeftButton);
    clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
    clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
    clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
}

