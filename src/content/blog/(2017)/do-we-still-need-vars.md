---
title: Do we still need vars?
description: What are the differences between var and let, and when var is still useful.
pubDate: 2017-06-17
tags: [Software Engineering, Javascript] 
redditUrl: https://www.reddit.com/r/javascript/comments/6i0ho4/is_there_any_reason_to_use_javascripts_var
---

Are you already using `let`? If you have just started to use it, you could have a question — “should I still use `var` somewhere?”

Let's first catch the differences between `var` and `let`.
<!--more-->


<h3><strong>Scope</strong></h3>
As we know, `var` is function scoped, `let` is block scoped.

Function scope — `var` is not visible outside, neither `let` would be:

```javascript
function testScope() { 
  var variable = 'text of var'

  console.log(variable) // "text of var" 
} 

testScope() 
console.log(variable) // ReferenceError: variable is not defined 
```

Block scope — `var` is visible in the closest ancestor function scope, but `let` is not visible outside of the block

```javascript
if (true) { 
  var variable = 'text of var' 
  let letiable = 'text of let' 

  console.log(variable) // "text of var" 
  console.log(letiable) // "text of let" 
} 

console.log(variable) // "text of var" 
console.log(letiable ) // ReferenceError: letiable is not defined 
```

Why is `let` better? It's more declarative and less error prone.
If you declare a `var` inside an `if` block, it could still be used outside of it. There's no warranty that the code below will not rely on it. Yes, your intention could be to not use it outside, but still leaving the possibility to do this leads to unexpected bugs.
Immagine that you are reading someone else code

```javascript
if (flag) {  
  var msg =  "Be aware of hoisting and scope rules";  
  /* some other code */ 
} 
```

How possibly can you know where else that `msg` variable could or even should be used? With `let` you are sure that it cannot be used outside of the `if` block.

There's an interesting bonus for using `let` inside `for` loops.
Let's consider this example first:

```javascript
var i = 0 

while (i < 5) { 
  let index = i 

  setTimeout(function () { 
    console.log(index) // will show 0, 1, 2, 3, 4 
  }) 

  i++ 
} 
```

It will not work with `var index`, the print would be "4, 4, 4 ,4, 4".

With a `for` loop, you don't need any intermediary variable.

```javascript
for (let i=0; i<5; i++) { 

  setTimeout(function () { 
    console.log(i) // will show 0, 1, 2, 3, 4 
  }) 
} 
```

Attention, please. It works because inside the `for` loop the `let` variable in the initialization expression is redeclared at each iteration with the resulting value of the previous iteration. It's an ES6 feature made for us to manage easier `for` loops.

```javascript
// explaining the first iteration

for (let i=0; i<5; i++) { 
  // the lexical variable `i` equals to `0`

  setTimeout(function () { 
    console.log(i) // will show 0, 1, 2, 3, 4 
  }) 

  // after the expression statement is executed
  // the final expression `i++` is evaluated and `i` value becomes `1`
  // `let i` is redeclared assigning it the result of the final expression `let i = 1`
} 
```

As you expect, `let` is not visible outside the loop, but it can be redeclared inside it. That's because the initialization expression is in an outer block for the statement expression.

```javascript
for (let i=0; i<5; i++) { 
  let i = 'same value'

  setTimeout(function () { 
    console.log(i) // will show "same value", "same value", "same value", "same value", "same value" 
  }) 
} 
```

<h3><strong>Global scope</strong></h3>
Unlike `var`, the `let` are not attached to the `window` object.

```javascript
var variable = 'var text' 
let letiable = 'let text' 

console.log( 
  window.variable, // "var text" 
  window.letiable // undefined 
) 
```

You could say, well, I can use `var` to save properties on `window` object!
That's not a good practice! Be explicit — `window.UserModule = {}`. Sure, remember that we all should avoid using `window` object for that puproses, because it's accessible from everywhere! Name collisions are guaranteed! Use ES6 modules instead.

<h3><strong>Hoisting</strong></h3>
Beside the declaration, which is hoisted for all the declarations in ES6, a `var` is initialized with `undefined`, but `let` is not initialized.

```javascript
variable = 'This is a hoisted and initialized variable.' 
 
console.log(variable) // "This is a hoisted and initialized variable." 

/** a lot of code */ 
 
var variable; 
```

The `var` is initialized. That's why you can access it.

Look at this example:

```javascript
var variable = 'This is outer variable.' 
 
function hoistingExample () { 
  variable = 'This is inner variable.' // seems like we are changing our outer variable value, right?

  console.log(variable) // "'This is inner variable." 

  /** a lot of code */ 
 
  var variable; 
} 

hoistingExample() 
console.log(variable) // "'This is outer variable." 
```

As `var` has function scope, you will misunderstand the code. The first thing you'll figure out is that `variable` in outer scope will be reassigned when you invoke the function, but it will not.

A `let` variable is uninitialized before the `let` statement. This leads us to a better and readable code.

```javascript
letiable = 'This variable cannot be accessed.' // ReferenceError: letiable is not defined 
 
let letiable; 
```

Isn't it great?

<h3><strong>Temporal Dead Zone</strong></h3>
The hoisting explaining above lead us here. The <s>Walking</s> Dead Zone! It's the zone inside a code block before a `let` statement. You cannot access a lexical variable `let` before its statement is evaluated!

Here is an important example to see:

```javascript
let str = 'outer text' 

if (true) { 
  let str= str // ReferenceError: str is not defined 
} 
```

The second, inner `let str` is hoisted. This means that it becomes the variable which is referenced inside the `if` scope when you try to access it. That means that we cannot more access the outer `let str`. The outer `str` is cut out for us, so let's discuss the inner `let str`.

The inner `str` it's not initialized yet. So, when you write `let str = str` you are trying to assign it itself. Remember that the assignment is evaluated right-to-left. That's why we get the error here. The `str` on the right is evaluated first, and it's not initialized yet. That's it!

Here another example with a `for...of` to be aware of:

```javascript
let a = ['lexical', 'variable', 'example'] 

for (let a of a) { // ReferenceError: a is not defined 
  /** some code */ 
} 
```

<h3><strong>Declaration</strong></h3>
A `var` can be redeclared, a `let` cannot!

```javascript
var variable = 'var text' 
var variable = 'changed var text' 
console.log(variable) // "changed var text" 
 
let letiable = 'let text' 
let letiable = 'changed let text' // SyntaxError: Identifier 'letiable' has already been declared 
```

As in previous examples, more declarative, less error prone!

<h3><strong>Style</strong></h3>
Around the web you can find advices to keep using `var` for style purpose — declaring them for function scope or even global scope, keep the `let` for block scopes.
Well, having "lets" and still using "vars" it's like shooting yourself in the foot! Using `var` means keeping dangers to buggy behaviour mainly due to its hoisting and scope implementations.
Actually, using `let` force us to write a better code both stylistically and less error-prone. It forces us to write more declarative, easier to understand and more safe code.

A great thing — is simplicity. Simplicity to understand and to use. Let's safe us from all those issues and misunderstandings. We should write instructions that make things alive, and not losing time for solving bugs that make them dead!

<h3><strong>Conclusion</strong></h3>
If you are still in doubt, or feel some inner opposing to shift completly to using `let` — you should know that you're not alone. I bet that even best and experienced programmers feel that (or did it).

We oppose to new things! It's natural to us. But we adapt really fast, so a couple of scripts with `let` — and you will feel like you was using it the whole life!

<strong>Wait a moment...</strong>
And the final answer? Do we still need vars? Sure! But, I'd rather say that <i>vars</i> need us. In the legacy code, of course. Beside that, I don't see a single reason you should use vars in your new modern ES6+ code. If you know any, please let us know, — below in the comments, in a blog post, or even in a youtube advertising — anything!

<i>P.S.: Yeah, I know, there could be a discussion about using `const` almost everywhere and keep using `let` as low as possible, but that's another topic! Stay tuned!</i>

<hr />
[Discuss on Reddit]({{ page.redditUrl }})
  
