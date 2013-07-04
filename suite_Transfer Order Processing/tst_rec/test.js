function main()
{
    type(waitForObject(":_username_QLineEdit"), "admin");
    type(waitForObject(":_username_QLineEdit"), "<Tab>");
    type(waitForObject(":_password_QLineEdit"), "zenx2plE");
    type(waitForObject(":_password_QLineEdit"), "<Return>");
    sendEvent("QKeyEvent", waitForObject(":Sales Order.No_QPushButton_2"), QEvent.KeyPress, 16777234, 0, 0, "", false, 1);
    type(waitForObject(":Sales Order.Yes_QPushButton"), "<Return>");
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List..."));
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Window"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Window_QMenu", "Tab View"));
    clickButton(waitForObject(":Quotes.Close_QToolButton"));

}
