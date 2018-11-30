+++
draft = true
+++

https://8thlight.com/blog/dariusz-pasciak/2015/05/28/alternatives-to-boolean-parameters.html

It is not uncommon to come across a piece of code that looks something along the lines of:

void FinalizeOrder(Order order)
{
  // Some code here ...

  Printer printer = new Printer(order);
  printer.PrintReceipt();

  // Some more code here ...
}
Let's focus on the PrintReceipt call. For now, it's very simple and straightforward. Anyone who comes across this code, whether for the first time or for the fifty-first time, knows exactly what it will do. It will print a receipt for the order.

Time will pass, and requirements will change, and this code will change, and someday it may end up looking like this:

Printer printer = new Printer(order);
printer.PrintReceipt(order.Items.Count() < 10);
What happened to the code? It's no longer as reader-friendly as it used to be. Perhaps an old-timer knows what's going on here, or maybe the person who wrote it (assuming they wrote it less than a few weeks ago), but everyone else will have to make an extra effort to figure out what that order.Items.Count() < 10 is all about.

Jumping over to the definition of PrintReceipt, we can see what's going on.

void PrintReceipt(bool printDetails)
{
  foreach(Item item in this.order)
  {
    PrintLine(item.Name);
    if(printDetails)
    {
      PrintLine(item.Description);
    }
  }
}
Aha! Now can see that the boolean parameter is a control flag to determine whether or not the item description should be printed or not. That explains the reason for the order.Items.Count() < 10 parameter in our original code. The programmer probably wanted to print the details only when there are fewer than 10 items in the order, otherwise the printout was getting too long.

Let's see if we can clean that up a bit.

Option 1 - Clarify by naming your input parameter
Printer printer = new Printer(order);
bool printDetails = order.Items.Count() < 10;
printer.PrintReceipt(printDetails);
Now, the reader doesn't have to scratch their head about the meaning of that boolean parameter at the end.

Could we have done better? Well, that depends. If Printer is a class under our control, then yes. However, if Printer is just an API provided to us, then this is probably all we can do (given this limited example).

If we do own the Printer class, then we have a few more options.

Option 2 - Provide two methods whose names communicate the difference
Printer printer = new Printer(order);
if(order.Items.Count() < 10)
{
  printer.PrintReceiptWithDetails();
}
else
{
  printer.PrintReceiptNoDetails();
}
Whether or not this is better than the last example may be controversial, but it does minimize the potential for error. There is certainly no need to remember that "true means print details" and not accidentally think that "true means skip details" instead. The calls are explicit and there is no room for ambiguity between what PrintReceiptWithDetails and PrintReceiptNoDetails actually do.

Although this approach works for scenarios when there is one option, it quickly becomes impractical as the number of options grow. In order to support n number of options in this manner, we would have to define 2n numer of methods. This means that if we wanted to support three different options then we would have to define eight different methods!

Here is an alternative that scales a little better with more options.

Option 3 - Provide "togglers" that enable/disable options
Printer printer = new Printer(order);
if(order.Items.Count() < 10)
{
  printer.EnablePrintingDescriptions();
}

printer.PrintReceipt();
There is no doubt about what's going on here, and there is no need to follow any method definitions to understand what the code is doing. And if we ever have to add other options, then we don't have to come up with 2n number of method names.

Here is what we would have if our printer had a few more options on it:

if(order.Items.Count() < 10)
{
  printer.EnablePrintingDescriptions();
}

printer.EnablePrintingTaxes();
printer.EnablePrintingQuantity();

printer.PrintReceipt();
Certainly much better than where we would have ended up had we not done anything about our first approach and let the boolean parameters pile on.

printer.EnablePrintingDescriptions(order.Items.Count() < 10, true, true);
Yuck!!!

Going Bigger
While these alternatives do clean things up on the client side (the code that's using the Printer class), the ugly ifs/elses don't go away and, although we are using an object-oriented language, our Printer class is probably looking very, very procedural. Here is what the PrintReceipt() may look like after adding the three options to it.

void PrintReceipt()
{
  foreach(Item item in this.order)
  {
    PrintLine(item.Name);

    if(this.PrintDetails)
    {
      PrintLine(item.Description);
    }

    if(this.PrintQuantity)
    {
      PrintLine(item.Quantity);
    }

    if(this.PrintTaxes)
    {
      PrintLine(item.TaxAmount);
    }
  }
}
This is still relatively simple, but it's no candidate for the Clean Code Pageant this year. Plus, in reality things are never this straightforward. Printing the description will have its own quirks and printing the taxes will have some special cases that need to be handled differently. This is an open invitation for more ifs and elses to crash this party.

The following will be overkill for this small example, but before I close up shop I want us to take a look at one way that we could clean this up and prevent an if-trigger-happy programmer from adding a fourth, fifth, and sixth conditional to this loop. This is especially important when printing an additional field is a bit more involved than just retrieving its value from an object and spitting it out directly to the printer.

Consider the entire Printer class (and some helper classes) as it would look refactored to be slightly more maintainable and object-oriented.

class Printer()
{
  private List<ItemPrinter> Printers { get; set; }
  private Order Order { get; set; }

  Printer(Order order)
  {
    this.Order = order;
    this.Printers = new List<Printer>();
    this.Printers.add(new NamePrinter());
  }

  void EnablePrintingDescriptions()
  {
    this.Printers.Add(new DescriptionPrinter());
  }

  void EnablePrintingTaxes()
  {
    this.Printers.Add(new TaxPrinter());
  }

  void EnablePrintingQuantity()
  {
    this.Printers.Add(new QuantityPrinter());
  }

  void PrintReceipt()
  {
    foreach(Item item in this.Order)
    {
      foreach(ItemPrinter printer in this.Printers)
      {
        PrintLine(printer.Format(item));
      }
    }
  }

  private PrintLine(String line)
  {
    // implementation for printing to a physical printer
  }
}
The different ItemPrinters are separate classes that know all about formatting. They may look something like the following:

interface ItemPrinter
{
  String Format(Item item);
}

class NamePrinter : ItemPrinter
{
  String Format(Item item)
  {
    return Item.Name;
  }
}

class DescriptionPrinter : ItemPrinter
{
  String Format(Item item)
  {
    return Item.Description;
  }
}

class TaxPrinter : ItemPrinter
{
  String Format(Item item)
  {
    return Item.Tax;
  }
}

class QuantityPrinter : ItemPrinter
{
  String Format(Item item)
  {
    return Item.Quantity;
  }
}
So what do we gain out of this? Several things.

First, the Printer class is no longer responsible for knowing what it "means" to print an item's name or tax amount. That responsibility has been moved elsewhere.

Second, adding a new type of ItemPrinter or changing an existing one will be minimally invasive. If we want to begin truncating item names to 15 characters, we go into the NamePrinter—nothing else gets touched. If we want to add a new ItemPrinter such as a "ItemNumber" printer, we create a new class, put the item-number formatting logic into its Format method, and we expose a method for adding it to the list of Printers on the Printer class.

For those of you familiar with the SOLID principals, this should be ringing a bell in your head. What we have going here is a flavor of the Open-Closed Principal—the Printer class stays closed for modification yet open for extension.

Finally, the PrintReceipt method stays short and sweet, and remains untouched with every formatting-related change. Our eyes don't burn and our brain doesn't go into overdrive while processing the similar yet different if statements.

Closing Thoughts
This isn't intended to be a silver bullet for any scenario requiring you to work with booleans, but I hope it gives you something to think about next time you need to call a function (or worse, write a function) that calls three booleans. Take a step back from your code and look at it from the perspective of a developer that is looking at it for the first time. Is there anything that you can do differently to communicate intentions more clearly and minimize confusion?
