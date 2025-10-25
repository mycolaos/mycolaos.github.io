---
pubDate: '2023-12-27'
title: 'Insights on "A Philosophy of Software Design" by John Ousterhout'
description: 'Key takeaways and practical advice from John Ousterhout’s philosophy on software design, focusing on minimizing complexity and strategic programming.'
tags: [Software Engineering, Software Design] 
---

- [What are the Secrets of Software Design?](#what-are-the-secrets-of-software-design)
- [Magic Trick: Red Flags](#magic-trick-red-flags)
- [Minimize Complexity: Deep Classes and Information Hiding](#minimize-complexity-deep-classes-and-information-hiding)
- [Define errors out of existence](#define-errors-out-of-existence)
- [Mindset: Tactical vs. Strategic programming](#mindset-tactical-vs-strategic-programming)
- [How much to invest?](#how-much-to-invest)
- [New ideas discovered](#new-ideas-discovered)
- [Key Lessons and Conclusion](#key-lessons-and-conclusion)

Have you ever wondered what constitutes good software design? John Ousterhout
points out that there's no universal agreement on this.

What then is the most pivotal idea or concept in all of computer science? Here
are some options, and feel free to add your own before proceeding:

- Abstraction
- Testing
- Composition
- Complexity
- Layers of Abstraction - by Dan Canough

Consider your own approach to complex problems: Professor Ousterhout suggests
that the key lies in Problem Decomposition, which involves dividing a complex
problem into more manageable pieces.

Complexity is the primary problem, and our main task is to minimize
it.

This concept is crucial, yet it is not sufficiently taught. How can we
effectively teach this, so anyone can become a better developer? The answer lies
in practice.

As a developer, what do you think is the best way to practice and enhance your
skills?

Iteration. Write. Review. Rewrite. Restart.

In his video, which is linked at the end, Professor Ousterhout provides a
detailed overview of his teaching process. However, this article focuses on his
software design ideas. 

![Software design](images/software-design.webp)
### What are the Secrets of Software Design?

- Magic Trick: Red Flags
- Minimize Complexity: Deep Classes and Information Hiding
- Define Errors Out of Existence
- Mindset: Tactical vs. Strategic Programming

### Magic Trick: Red Flags

The principles above are abstract, especially for beginners. If unsure about
good design, use red flags as a guide. When you spot bad code and manage to move
away from it, you likely end up in a better position than before. 

Even if Professor Ousterhout doesn't talk about specific red flags in his video,
I'll share some of them from his book:

- **Shallow Module** (class, function, etc.) when the is interface is more
  complex than the implementation.
- **Information Leakage** when the same knowledge is repeated in multiple
  places.
- **Temporal Decomposition** when the structure of the code reflects the
  execution order.
- **Overexposure** when the API forces the user to learn about other rarely used
  features.
- **Pass-through Methods** when a method just calls another method without
  adding any value.
- **Repetition** when the same code is repeated in multiple places.
- **Special-General Mixture** when a general-purpose module contains
  special-purpose code.
- **Conjoined Methods** when to understand a method you need to understand
  another method.
- **Comment Repeats Code** when the comment repeats the code.
- **Implementation Documentation Contaminates Interface** when the
  implementation details are exposed in the interface documentation.
- **Vague Name** when a variable, function, or class name is broad enough to
  refer to multiple things.
- **Hard to Pick Name** when it's hard to pick a name for a variable, function,
  or class, it's a hint that the design is not good.
- **Hard to Describe** when it's hard to describe what a variable, function, or
  class does, that an indicator that there might be a problem with the design.
- **Nonobvious Code** if the meaning and behavior of code cannot be understood
  with a quick reading.


![Deep class](images/deep-class.png)
### Minimize Complexity: Deep Classes and Information Hiding

The principle of information hiding, first introduced by David Parnas in his
 paper "On the Criteria to be Used in Decomposing Systems into Modules," is
pivotal in software design. We'll examine this concept through the lens of 'deep
classes.'

Imagine a class as a rectangle, divided into two sections. The upper section
symbolizes the interface, encompassing all the knowledge necessary to use the
class, including public methods, side effects, performance implications,
dependencies, and other behaviors that might affect how the class is used.  This
segment represents the 'complexity cost.'

The lower section of the rectangle embodies the class implementation.

The goal is to achieve maximum functionality with minimal complexity cost, which
means a streamlined interface that masks a wealth of functionality.

In contrast, consider a 'Shallow Class.' This exaggerated example illustrates
its limited utility:

```java
private void addNullValueForAttribute(String attribute) { 
  data.put(attribute, null); 
} 
```

To use this method, one must grasp its entire implementation, which is trivial.
Directly using the implementation is more straightforward:

```java
  data.put(attribute, null); 
```

A 'Deep Class' offers an elegant way of thinking about abstraction, presenting a
simple interface while concealing complex operations beneath.

This concept is applicable not only to classes but also to methods, modules, and
any construct with distinct interface and implementation layers.

However, it's important to note that using Shallow Classes is not always wrong,
they just offer limited design value. For example, consider a function designed
to print INFO messages in a standardized format:

```java
public void logInfo(String message) {
    System.out.println("INFO: " + message);
}
```

Another aspect to consider is the evolution of a class. If you have a
good reason to believe that internal implementation will become more complicated
in the near future, you could start with a shallow implementation. Just consider
that the interface may also change as the implementation grows.

The complexity lies not in the number of lines but in the depth of
understanding required to interact with the interface.

Have you encountered the issue of having too many, too small, too shallow
classes in your own coding experience? The reason people do this is that they
have been taught that classes and methods should be small. How many of you have
heard of a number, like after N number of lines a method should be broken down?

What is the number you've heard?

- 20
- 10
- 4
- Others

This leads to **Classitis**,when someone says that classes are good, and thinks
more classes are better.

Consider this Java example involving file and object stream reading:

```java
FileInputStream fileStream = new FileInputStream(fileName);
BufferedInputStream bufferedStream = new BufferedInputStream(fileStream);
ObjectInputStream objectStream = new ObjectInputStream(bufferedStream);
```

- 3 objects must be created and managed.
- Additional objects are needed for buffering.
- Exceptions must be caught for each stream.
- This introduces unnecessary complexity for a simple task.

Reading a file should be straightforward. The common case must be simple.

Instead of focusing on line count, aim for deep abstractions. If an abstraction
is deep yet lengthy, consider splitting it, keeping depth as the priority.

For instance, consider the **Unix file I/O** system, comprising just five
functions:

```java
int open(const char* path, int flags, mode_t permissions);
int close(int fd);
ssize_t read(int fd, void* buffer, size_t count);
ssize_t write(int fd, const void* buffer, size_t count);
off_t lseek(int fd, off_t offset, int referencePosition);
```

Beneath this straightforward interface lies a complex underpinning:

- On-disk representation and disk block allocation.
- Directory management and path lookup.
- Permission management.
- Disk scheduling.
- Block caching.
- Device independence.

In conclusion, strive to craft interfaces that are as simple as possible,
regardless of the underlying complexity. This approach promotes efficient and
intuitive design, essential for effective software development.

![Errors](images/errors.webp)
### Define Errors Out of Existence

Errors are a significant source of complexity. The common wisdom is: detect and
throw as many errors as possible. 

1. For example, consider the TCL `unset` command. Professor Ousterhout who
   wrote it thought, "Why would anyone want to delete a variable that isn't
   there?" So, he made it give an error in this situation. But it turns out,
   people often need to delete variables they're not sure exist, like when
   stopping a task and cleaning up. The solution? Just let the command work
   without an error, because there's no real difference if the variable wasn't
   there in the first place.

2. Another example is about deleting files. In an early Windows version, you
   couldn't delete a file if it was open in another program. Even restarting the
   computer didn't help if a background program was using it. Unix systems found
   a clever way around this. When you delete a file, Unix removes it from the
   folder but keeps the data for any program still using it. The system fully
   removes it only after all programs stop using it. This way, there are no
   errors for either side.

Of course, this doesn't mean we should never throw errors. Sometimes
they're necessary, like when you try to read a file that doesn't exist. But we
should use error messages only when they're really important.

In general, it's better not to check for errors in every single operation.
Catching syntax is clumsy while checking the return value is much simpler. But
sometimes, you do need to throw an error. So, it's important to think carefully
about when it's truly needed.

![Tactical vs Strategic](images/tactical-strategical-programming.webp)
### Mindset: Tactical vs. Strategic Programming

A tactical approach is straightforward: implement a feature or fix a bug doing
the bare minimum to make it work and deliver it quickly. However, this approach
often leads to a rapid increase in complexity and spaghetti code (makes me think
of pasta 🍝). Over time, untangling this becomes increasingly difficult.

Conversely, the strategic approach embodies an investment mindset. It involves
taking extra time today to benefit in the long run. Professor Ousterhout
succinctly puts it: “The working code is not enough.” The aim should be to
create a robust design that eases future development and reduces complexity.

Adopting a strategic programming style means starting slower but potentially
speeding up later.

A note for beginners, particularly on learning projects: it's acceptable to move
quickly, even if your design isn't perfect. At this stage, you might not fully
grasp what constitutes good design, and that's okay. In fact, I encourage rapid
progress, as it allows for more iteration. The key lies in the mindset: if you
recognize areas for improvement and know how to enhance them, then do so without
excuses. Whether it's renaming a function, reconsidering parameters, return
values, or splitting functions, if you think it can be better, make it better.
It might be challenging at first, but as you code more, learn more, and
consequently, speed up. This is why iterating more is crucial – it enhances
learning.

![Code investment](images/code-invest.webp)
### How much to invest?

We're accustomed to the idea of moving quickly, especially in startups. This
often leads to spaghetti code, which can become challenging to repair. However,
even if you're part of a startup, you can do better. 

The key question is: How much can we invest in improvement right now?

You can continuously enhance your code by allocating just 10-20% of your task
time to improvements.

When writing new code, begin with thoughtful design and thorough documentation. 

Personal sidenote: Documentation is frequently overlooked, so I recommend at
least providing extensive comments to clarify your code. This is particularly
crucial for complex functions that perform multiple actions or are lengthy. For
instance, "save to local storage for offline capabilities, then save to the
backend".

Proceed a bit slower today, but you'll gain more in the long run.

When modifying existing code, always aim to enhance something and leave the code
in a better state than you found it.

Personal sidenote: This can sometimes be challenging due to the code's
complexity or perceived risk. However, as Professor suggests, approach this in
small steps. Improve a little today, a bit more tomorrow, and gradually, the
code will get better. The goal is to reach a point where, with your current
knowledge, you would have designed the system from scratch.

![Ideas](images/software-design-ideas.webp)
### New ideas discovered

Professor Ousterhout has found that by examining student code, he uncovers fresh
insights. Similarly, you might also discover new ideas through consistent
practice. Here are a few examples from the Professor:

- Specialized classes or methods tend to be complex.
- Making a class _slightly_ more general-purpose, even if it's currently used in
  only one situation, can simplify it and add depth.

![New path](images/new-path.webp)
### Key Lessons and Conclusion

- Complexity arises from dependencies and lack of clarity.
- Aim for depth in classes: conceal intricate workings behind a straightforward interface.

How will you apply these principles in your next project? Remember, the journey
to mastering software design is ongoing, and each step you take towards
understanding and implementing these concepts can lead to more efficient and
elegant code. 

Share your thoughts or experiences in the comments below, or tweet about your
insights and tag me. Let's continue to learn and grow as a community of
thoughtful, strategic software developers.

### Sources and Further Learning:

- A Philosophy of Software Design:
  [https://www.youtube.com/watch?v=bmSAYlu0NcY](https://www.youtube.com/watch?v=bmSAYlu0NcY)
- On the criteria to be used in decomposing systems into modules:
  [https://dl.acm.org/doi/pdf/10.1145/361598.361623](https://dl.acm.org/doi/pdf/10.1145/361598.361623)
- Red flags from the book
  [https://notes.portebois.net/2021/03/04/13.html](https://notes.portebois.net/2021/03/04/13.html)