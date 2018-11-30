+++
draft = true
+++

https://8thlight.com/blog/cory-foy/2013/06/26/procedural-polymorphism.html

Is your code really telling you to use an if statement?
As a developer, it is really important to practice your craft. And a great way of doing that is through Code Retreats. The goal of a code retreat is to spend a full day practicing techniques you may not otherwise encounter. One of my favorite constraints to give to participants is as follows:

Code Conway's Game of Life using no conditional statements - no ifs, etc
It always throws people for a loop, because up until then, they've generally written code that looks like:

def print_board
  cells.each do |cell|
    if cell.alive?
      puts "*"
    else
      puts " "
    end
  end
end
(They may even do it as a ternary operator puts (cell.alive? ? "*" : " ") but it's the same thing)

Last year during SCNA, Corey Haines, Eric Smith and I were chatting about this and Corey gave the if statements an interesting term - procedural polymorphism. I found this entirely enlightening, but it may not be obvious initially why.

To understand, let's first start with the word "polymorphism". Webster defines it as "the quality or state of existing in or assuming different forms". Generally, in object-oriented programming, we define polymorphism as the ability for an object to have additional subclasses which inherit from the same root object. So we could have:

class HelloSayer
  def say_hello
    puts hello
  end
  def hello
  end
end

class EnglishHelloSayer < HelloSayer
 def hello
   "Hello"
  end
end

class FrenchHelloSayer < HelloSayer
  def hello
    "Bonjour"
   end
end

> english = EnglishHelloSayer.new
> english.say_hello
Hello
> french = FrenchHelloSayer.new
> french.say_hello
Bonjour
This uses polymorphism to provide an object oriented way of getting different behavior that uses the same interface.

Note that in the above statement, I said "object-oriented". That's because the above is one way of doing the behavior. Here's another way:

class HelloSayer
  def say_hello(language)
    if language == ENGLISH
      "Hello"
    elsif language == FRENCH
       "Bonjour"
    end
   end
 end

At first, this looks much simpler. And it is achieving the same goals - we are using one interface say_hello("English") and getting varying results. It is effectively enabling polymorphic behavior in a procedural way.

The exercise I (and others) run during Code Retreat forces us to really rethink that. We're so used to if statements being a natural part of our language that we don't really think about what we are doing with them. In an object-oriented language, if statements should be a code smell - a place that is calling out to be represented in a different way. For example, our Code Retreat example above, we use an if statement to check cell.alive?. But given the discussion above, the answer of solving it should now be obvious and is left as an exercise to the reader.

Only kidding!

cell.alive? and !cell.alive? both represent something specific, and if we name those cases, the objects fall out. cell.alive? represents an AliveCell and !cell.alive? represents a DeadCell. So we can have:

class AliveCell
  #...
  def to_s
    "*"
  end
end

class DeadCell
  #...
  def to_s
    " "
  end
end
Which means our print_board is now:

def print_board
  cells.each do |cell|
    puts cell
  end
end
Ah, but aren't you going to need an if statement somewhere to create the Alive or Dead cells? Maybe - or maybe not. In Game of Life, there are two ways that a cell's state gets determined - during the initial seeding of the board, or as the game is progressing. In the former, imagine you had 100 cells, and had users specify the initial state by (x,y) coordinate pairs. In that case, you might have a YAML file like:

board_view_size: 100
alive_cells: [1,3],[1,4],[2,4],[5,5],[5,6],[8,9]
So your setup could be something like:

def board_setup
  (0..board_view_size).each do |x|
    (0..board_view_size).each do |y|
      board.push(DeadCell.new(x,y))
    end
  end
  alive_cells.each do |ac|
    board.cell_at(ac).make_alive!
  end
end
(Yes, we ended up with a small Law of Demeter violation there, but just for readability of the example)

You could even clean up the above by having board have a data structure which doesn't allow duplicate coordinate pairs, and simply rejects them, so you'd create the alive cells first, and the dead ones wouldn't go in there

As far as game play would be concerned - in Game of Life, a cell is alive or dead based on simple rules. For example, a DeadCell can become an AliveCell by having exactly 3 neighbors that are alive. We could do that by saying:

def tick
  board.each_cell do |cell|
    if cell.neighbors.alive_count == 3
      cell.make_alive!
    end
  end
end
But, this begs the question - who is "tick" and why does it know about a cell's neighbors? Shouldn't a cell know about its own neighbors? I know I certainly know my neighbors, rather than relying on some mystical agency to tell me what to do. So tick, if anything, should simply walk the cells and trigger them based on the state of the board at the tick.

You could even go as far as a callback system - when a cell's state changes, it notifies its neighbors, and they respond appropriately. This is much closer to the ideal of Game of Life - that these are independent cells which are operating based on the state they see, rather than a giant coordinator.

So next time you are reaching for an if statement, think hard about what you are *really* trying to do. Even if you don't reach for class-based polymorphism immediately, as soon as you start turning it into more elsifs, or a case statement (ZombieCell), you might want to reconsider whether you are really flipping through cases, or not listening to your code telling you it wants those things out of the method and into separate objects. It's not to say that you will never see an if, or statements like it, but rather paying attention to what the goals of your system are to figure out if that's really the best thing to do at this time, and to continue testing that as your system grows.
