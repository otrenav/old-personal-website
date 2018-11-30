+++
draft = true
+++

https://blog.cleancoder.com/uncle-bob/2012/04/20/Why-Is-Estimating-So-Hard.html

Why is Estimating so Hard?
20 April 2012
Consider the Gettysburg Address:

“Four score and seven years ago our fathers brought forth upon this continent a new nation, conceived in liberty and dedicated to the proposition that all men are created equal…”

Let’s ignore the profundity and melody of those remarkable words, and focus instead on the formatting. I’d like to fit the entire address on a bookmark measuring 1.5” X 8”. I’ll use a mono-font that fits 10 characters per inch. And I’ll leave 0.1” on the right and left. So I can fit 13 characters across each line. The text contains 237 words. How long do you think it would take you to manually break the address up into 13 character lines, breaking those lines at appropriate spaces?

The calculation isn’t difficult. If you spent one second per word determining whether or not that word is the appropriate break point for a line, it would take you just under five minutes to break the entire address up into lines that are 13 characters or less. And the odds are you’d do it perfectly.

So how long would it take you to write a program to do it?

Now remember, you know this algorithm. You can execute it manually intuitively. During that five minute manual execution there would be no surprises, no stumbling blocks, no backing up and redoing old lines. This is an algorithm that you can execute without even thinking of it as an algorithm. You’d just do it.

So how long would it take you to write a program to do it.

Keep in mind that a program is nothing more than the detailed instructions for following a procedure; and this is a procedure you already know!

I’ll be kind to you. Don’t give me a single estimate. Give me three estimates. Tell me how long it will take in the best case, the worst case, and the nominal case. Go ahead, write these three numbers down. Now.

Got em? OK, now write the program. Make sure it works. I’ll wait here until you are done.

Done? How’d you do? Most people need 30-45 minutes to get this working. I’ve seen it done in 15, and I’ve seen it done in 90. Did you fall within your estimate range? Or did you blow the range completely?

Of course lots of people blow the range completely. One of the reasons they blow it is that they estimate it based on how easy the manual task appears to be. You think to yourself: “I could split those lines in 5 minutes by hand, so writing the program ought to be trivial.” We are sadly mistaken.

I remember sitting down with Kent Beck one afternoon to write this algorithm just for fun. I figured it would take us 10-15 minutes. He and I paired on it, test first, for 30 minutes, and got nowhere. Eventually we gave up because we were teaching a class together and actually had to spend time with the students.

But the experience stuck with me. Why was that algorithm so hard - for us - at that particular time? Why was it so hard to write down the procedure for doing something so basic and intuitive?

Answer: Because when we do it manually, we don’t follow a procedure. What we do instead it continuously evaluate the output and adjust it until it’s right. A procedure is blind. It doesn’t look at the output to see if it’s right. If the procedure is wrong, the output will be wrong. Period. But we, humans, are goal seekers. The goal is to split the lines up to no greater than 13 characters, and so we evaluate every line. We look it over and adjust it until it meets the goal. And we can do that in 5 minutes.

It turns out that we don’t know the procedure. We haven’t got any clue to just how difficult the procedure is. We aren’t computers. We don’t follow procedures. And so comparing the complexity of the manual task, to the complexity of the procedure is invalid.

This is one of the reasons that estimates are so hard, and why we get them wrong so often. We look at a task that seems easy and estimate it on that basis, only to find that writing down the procedure is actually quite intricate. We blow the estimate because we estimate the wrong thing.

Try this. Break some long string of text up into columns that are 10 characters long. Each time you break a line, record the position of the break, and why you decided to use that position. If you are good at abstracting, you’ll likely come up with three different scenarios for breaking a line. 1. you break it at the 10th character of a word if that word is longer than 10 characters. 2. You break it at the 11th character if that character is a space. 3. You look backwards from the 10th character looking for a space and if there is one, you break it there.

These three scenarios still need to be arranged into a procedure, but at least you now know how many elements that procedure contains. Knowing that makes the procedure much easier to estimate.

The moral of this story is that tasks that appear easy for a human to solve are often described by complex procedures. So when estimating, make sure you aren’t affected by the apparent ease of that task. Look below the surface to try to enumerate the number of procedural elements.

And if anyone tries to tell you that your estimate is bogus because the task is so simple, ask them to write down the procedure for tying their shoes.
