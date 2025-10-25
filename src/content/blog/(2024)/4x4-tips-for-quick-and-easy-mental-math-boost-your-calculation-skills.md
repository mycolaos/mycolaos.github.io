---
pubDate: '2024-07-14'
title: '4x4 Tips for Quick and Easy Mental Math: Boost Your Calculation Skills'
description: 'Enhance your mental math skills with these 4x4 tips for quick and easy calculations. Learn multiplication, division, and squaring techniques to boost your calculation speed and accuracy.'
tags: ['Math', 'Skills']
---

- [Intro](#intro)
- [Multiplicaction](#multiplication)
  - [Multiplying by Single Digits](#multiplying-by-single-digits)
  - [Know the Multiplication Table up to 19×9](#know-the-multiplication-table-up-to-19×9)
  - [Multiplication Table Skills Test](#multiplication-table-skills-test)
  - [Decompose a Number into Smaller Parts](#decompose-a-number-into-smaller-parts)
  - [Power of 2](#power-of-2)
  - [Multiply by 5](#multiply-by-5)
  - [Multiply by 25](#multiply-by-25)
  - [Adding or Removing Multiplication Factors](#adding-or-removing-multiplication-factors)
- [Division](#division)
  - [Decompose a Number into Smaller Parts](#decompose-a-number-into-smaller-parts)
  - [Round and Adjust](#round-and-adjust)
  - [Multiply to Get a Better Divisor](#multiply-to-get-a-better-divisor)
  - [Leverage the Power of 2](#leverage-the-power-of-2)
  - [Leverage Any Power](#leverage-any-power)
- [Squares](#squares)
  - [Calculating Powers of 2 for Numbers Ending with 5](#calculating-powers-of-2-for-numbers-ending-with-5)
  - [Using Formulas to Calculate the Square of Any Number](#using-formulas-to-calculate-the-square-of-any-number)
- [Main Pattern: Decomposing and Transforming](#main-pattern-decomposing-and-transforming)
  - [Practice](#practice)
- [Summary](#summary)
  - [Multiplication Recap](#multiplication-recap)
  - [Division Recap](#division-recap)
  - [Powers Recap](#powers-recap)
- [Final Thoughts](#final-thoughts)

## Intro

Since my childhood, I've always done mental math, especially when handling money. I didn't do anything special, just simple tricks like adding or removing zeros when dealing with multiples of ten or splitting numbers into smaller parts.

Now, as I continue to do mental math, I've decided to refine my skills and learn some new tricks. I find mental division particularly challenging, so I'll explore this topic more and share my findings with you.

Note that division and multiplication are closely related, and some techniques are the same but reversed. However, for clarity, I'll separate them into distinct sections.

Let's start with simple tricks and then move to more complex ones.

## Multiplication

### Multiplying by Single Digits

Multiplying a number by a single digit is easy. Just do it separately for each digit position and then sum the results. For example, to multiply `23` by `4`, multiply `20` by `4` and `3` by `4`, then sum the results: `20 * 4 + 3 * 4 = 80 + 12 = 92`.

More examples:

- `56 * 7 = 50 * 7 + 6 * 7 = 350 + 42 = 392`
- `123 * 4 = 100 * 4 + 20 * 4 + 3 * 4 = 400 + 80 + 12 = 492`

### Know the Multiplication Table up to 19×9

You don't need to memorize this now, but it may be useful for faster calculations. If you don't know them, you can always calculate them using the previous trick.

Here's a simple table for reference:

| x   |     | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 11  |     | 22  | 33  | 44  | 55  | 66  | 77  | 88  | 99  |
| 12  |     | 24  | 36  | 48  | 60  | 72  | 84  | 96  | 108 |
| 13  |     | 26  | 39  | 52  | 65  | 78  | 91  | 104 | 117 |
| 14  |     | 28  | 42  | 56  | 70  | 84  | 98  | 112 | 126 |
| 15  |     | 30  | 45  | 60  | 75  | 90  | 105 | 120 | 135 |
| 16  |     | 32  | 48  | 64  | 80  | 96  | 112 | 128 | 144 |
| 17  |     | 34  | 51  | 68  | 85  | 102 | 119 | 136 | 153 |
| 18  |     | 36  | 54  | 72  | 90  | 108 | 126 | 144 | 162 |
| 19  |     | 38  | 57  | 76  | 95  | 114 | 133 | 152 | 171 |

Knowing this table, you can calculate `17 * 8 = 136` instantly.

For larger numbers, like in the previous example, `123 * 4`, you can split it into `12 * 4` and `3 * 4`, then sum the results: `12 * 4 + 3 * 4 = 48 + 12 = 60`.

### Multiplication Table Skills Test

I wrote a simple script to test your knowledge. It will prompt you with a multiplication problem, and you have to answer it.

<button type='button' onclick='__checkMTableSkills()'>
  Check table skills!
</button>

<script>
  var __checkMTableSkills;
  // Code block to prevent polluting the global scope.
  {

    let aIndex = 0;
    let bIndex = 0;

    const singleDigits = [2, 3, 4, 5, 6, 7, 8, 9];
    const doubleDigits = [11, 12, 13, 14, 15, 16, 17, 18, 19];

    let a = singleDigits;
    let b = doubleDigits;

    function check() {
      // Get random `aIndex` and `bIndex`
      const aIndex = Math.floor(Math.random() * a.length);
      const bIndex = Math.floor(Math.random() * b.length);
      const va = a[aIndex];
      const vb = b[bIndex];
      const question = `${va} * ${vb}:`;
      const userResult = window.prompt(question);

      if (userResult === null) {
        return;
      }

      const resultText = `${va} * ${vb} = ${va * vb}`;

      if (Number(userResult) !== va * vb) {
        alert('Wrong! ' + resultText); 
      }

      check();
    }

    __checkMTableSkills = check;
  }
</script>

### Decompose a Number into Smaller Parts

Sometimes you can decompose a number into smaller parts and then multiply them. For example:

- `350 * 6 = 350 * 2 * 3 = 700 * 3 = 2100`
- `35 * 16 = 35 * 2 * 8 = 70 * 8 = 560`

Or you can decompose a number into a sum of smaller parts and then multiply them. For example:

- `350 * 6 = 300 * 6 + 50 * 6 = 1800 + 300 = 2100`

Let's say you have two numbers with two digits:

- `39 * 12 =  39 * 10 + 39 * 2 = 390 + 78 = 468`
- `48 * 21 = 48 * 20 + 48 * 1 = 960 + 48 = 1008`

It's more convenient to split the smaller number.

### Power of 2

When you multiply a number by `2, 8, 16, 32, etc.`, which are powers of `2`, you can just multiply the given number by 2 the appropriate number of times. For example:

- `23 * 8`, multiply `23` three times by `2`:  
  `23 * 8 = 23 * 2 * 2 * 2 = 46 * 2 * 2 = 92 * 2 = 184`

- `23 * 16`, multiply `23` four times by `2`:  
  `23 * 16 = 23 * 2 * 2 * 2 * 2 = 46 * 2 * 2 * 2 = 92 * 2 * 2 = 184 * 2 = 368`

The same goes for division. Just divide by `2` the appropriate number of times:

- `184 / 8`, divide `184` three times by `2`:  
  `184 / 8 = 184 / 2 / 2 / 2 = 92 / 2 / 2 = 46 / 2 = 23`

### Multiply by 5

Five and tens are the easiest numbers to multiply. To multiply a number by `5`, just multiply it by `10` and then divide by `2` or vice versa. First divide it by `2`, then multiply it by `10`. For example:

- `23 * 5 = 23 * 10 / 2 = 230 / 2 = 115`
- `56 * 5 = 56 * 10 / 2 = 560 / 2 = 280`

or

- `23 * 5 = 23 / 2 * 10 = 11.5 * 10 = 115`
- `56 * 5 = 56 / 2 * 10 = 28 * 10 = 280`

### Multiply by 25

To multiply a number by `25`, just multiply it by `100` and then divide by `4` or vice versa. First divide it by `4`, then multiply by `100`. For example:

- `23 * 25 = 23 * 100 / 4 = 2300 / 4 = 575`
- `56 * 25 = 56 * 100 / 4 = 5600 / 4 = 1400`

or

- `23 * 25 = 23 / 4 * 100 = 5.75 * 100 = 575`
- `56 * 25 = 56 / 4 * 100 = 14 * 100 = 1400`

### Adding or Removing Multiplication Factors

Sometimes it can be easier to add or remove multiplication factors. For example:

- `39 * 12 = 12 * 39 = 12 * 40 - 12 = 480 - 12 = 468`

I just added `1` to `39` to get `40`, then subtracted `12` from the result.

Another example:

- `41 * 12 = 12 * 41 = 12 * 40 + 12 = 480 + 12 = 492`

## Division

### Decompose a Number into Smaller Parts

Just like with multiplication, you can decompose a number into smaller parts and then divide them. For example:

- `350 / 6 = 350 / 2 / 3 = 175 / 3 = 58.3`

Or you can split the dividend into smaller parts and then divide them. Pay attention that when splitting, you can divide the dividend but not the divisor. For example:

- `119 / 7 = 119 / 7 = 70 / 7 + 49 / 7 = 10 + 7 = 17`

If you have learned the multiplication table up to `19 x 9`, you would know this by heart because `7 * 17 = 119`.

### Round and Adjust

It's possible to round the dividend and divisor to make the division easier and then adjust the result to get the exact answer.

For example, `92 / 4` can be rounded to `100 / 4 = 25`. To adjust the result, subtract the difference between the rounded and the original dividend, `100 - 92 = 8`, and divide it by the divisor, `8 / 4 = 2`. The final result is `25 - 2 = 23`.

More examples:

- `56 / 5`, round to `60 / 5 = 12`, adjust `60 - 56 = 4`, `4 / 5 = 0.8`, `12 - 0.8 = 11.2`

Or using different rounding:

- `56 / 5`, round to `55 / 5 = 11`, adjust `55 - 56 = -1`, `-1 / 5 = -0.2`, `11 - (-0.2) = 11 + 0.2 = 11.2`

Note that if you round up the dividend, you subtract the difference, and if you round down, you add the difference.

### Multiply to Get a Better Divisor

Multiply both the dividend and divisor by the same number to get a better divisor. For example, `39 / 5` can be multiplied by `2` to get `78 / 10 = 7.8`.

More examples:

- `56 / 5 = 56 * 2 / 10 = 112 / 10 = 11.2`
- `120 / 15 = 120 * 2 / 30 = 240 / 30 = 24 / 3 = 8`

### Leverage the Power of 2

When you divide a number by `2, 8, 16, 32, etc.`, which are powers of `2`, you can just divide the given number by `2` the appropriate number of times. For example:

- `184 / 8`, divide `184` three times by `2`:  
  `184 / 8 = 184 / 2 / 2 / 2 = 92 / 2 / 2 = 46 / 2 = 23`

### Leverage Any Power

You can use the above technique to divide by other powers. For example:

- `2250 / 25`, divide `2250` two times by `5`:
  `2250 / 25 = 2250 / 5 / 5 = 450 / 5 = 90`
- `2250 / 125`, divide `2250` three times by `5`:
  `2250 / 125 = 2250 / 5 / 5 / 5 = 450 / 5 / 5 = 90 / 5 = 18`
- `8100 / 18`, divide `8100` two times by `9`:
  `8100 / 18 = 8100 / 9 / 9 = 900 / 9 = 100`

## Squares

### Calculating Powers of 2 for Numbers Ending with 5

This is a simple formula for numbers that end with `5` and need to be squared. Multiply the first part of the number by its next number and then add `25` at the end.

For example, `45^2`, multiply the first part (`4`) by its next number (`5`) and then add `25` at the end:

- `45^2 = 4 * 5 = 20` and `25` at the end, `2025`

More examples:

- `65^2 = 6 * 7 = 42` and `25` at the end, `4225`
- `85^2 = 8 * 9 = 72` and `25` at the end, `7225`

### Using Formulas to Calculate the Square of Any Number

This is a more general formula to calculate the square of any number. The formula is `(a + b)^2 = a^2 + 2ab + b^2` or `(a - b)^2 = a^2 - 2ab + b^2`.

The idea is to decompose the number into simpler parts to calculate the square. For example, `42^2` can be decomposed into `(40 + 2)^2` and calculated with the formula:

1. `40^2 = 1600`
2. `2 * 40 * 2 = 160`
3. `2^2 = 4`
4. `1600 + 4 + 160 = 1764`

Together, it looks like this:

- `(40 + 2)^2 = 40^2 + 2 * 40 * 2 + 2^2 = 1600 + 160 + 4 = 1764`

If you subtract `b` in the formula, you must subtract `2ab` instead of adding it:

- `39^2 = (40 - 1)^2 = 40^2 - 2 * 40 * 1 + 1^2 = 1600 - 80 + 1 = 1521`

## Main Pattern: Decomposing and Transforming

The main idea is to simplify calculations by breaking numbers into smaller
parts, using rounding and adjusting, leveraging powers, and using multiplication
facts. These techniques can make mental math quicker and more efficient.

You can use different techniques that suit you best, here's an expression solved
with two different methods:

- `56 * 5 = 56 * 10 / 2 = 560 / 2 = 280`
- `56 * 5 = 50 * 5 + 6 * 5 = 250 + 30 = 280`

Which one do you prefer?

### Practice

Try to practice with any number that comes into your mind or try this simple
script to test your knowledge:

<button type='button' onclick='__checkMentalMathSkills()'>
  Check mental math skills!
</button>

<script>
  var __checkMentalMathSkills;
  // Code block to prevent polluting the global scope.
  {

    function check() {
      // 1. Multiplication; 2. Division; 3. Power
      const type = Math.floor(Math.random() * 3) + 1;

      if (type === 1) {
        checkMultiplication();
      } else if (type === 2) {
        checkDivision();
      } else {
        checkPower();
      } 
    }

      function checkMultiplication() {
        const a = Math.floor(Math.random() * 100);
        const b = Math.floor(Math.random() * 100);
        const question = `${a} * ${b}:`;
        const userResult = window.prompt(question);

        if (userResult === null) {
          return;
        }

        const resultText = `${a} * ${b} = ${a * b}`;

        if (Number(userResult) === a * b) {
          alert('Correct! ' + resultText );
        } else {
          alert('Wrong! ' + resultText );
        }

        check();
      }

      function checkDivision() {
        const a = Math.floor(Math.random() * 100);
        const b = Math.floor(Math.random() * 10) + 1;
        const question = `${a} / ${b}:`;
        const userResult = window.prompt(question);

        if (userResult === null) {
          return;
        }

        const resultText = `${a} / ${b} = ${a / b}`;
        // Check only up to 1 decimal place
        if (Number(userResult).toFixed(1) === (a / b).toFixed(1)) {
          alert('Correct! ' + resultText );
        } else {
          alert('Wrong! ' + resultText );
        }

        check();
      }

      function checkPower() {
        const a = Math.floor(Math.random() * 100);
        const question = `${a}^2:`;
        const userResult = window.prompt(question);

        if (userResult === null) {
          return;
        }

        const resultText = `${a}^2 = ${a * a}`;

        if (Number(userResult) === a * a) {
          alert('Correct! ' + resultText );
        } else {
          alert('Wrong! ' + resultText );
        }

        check();
      }

    __checkMentalMathSkills = check;
  }
</script>

## Summary

### Multiplication Recap

- **Multiply by Single Digits**

  - `56 * 7 = 50 * 7 + 6 * 7 = 350 + 42 = 392`
  - `123 * 4 = 100 * 4 + 20 * 4 + 3 * 4 = 400 + 80 + 12 = 492`

- **Know Multiplications up to 19 x 9**

  - `17 * 8 = 136`
  - `12 * 4 + 3 * 4 = 48 + 12 = 60`

- **Decompose a Number into Smaller Parts**

  - `350 * 6 = 350 * 2 * 3 = 700 * 3 = 2100`
  - `35 * 16 = 35 * 2 * 8 = 70 * 8 = 560`

- **Power of 2**

  - `23 * 8 = 23 * 2 * 2 * 2 = 46 * 2 * 2 = 92 * 2 = 184`
  - `23 * 16 = 23 * 2 * 2 * 2 * 2 = 46 * 2 * 2 * 2 = 92 * 2 * 2 = 184 * 2 = 368`

- **Multiply by 5**

  - `23 * 5 = 23 * 10 / 2 = 230 / 2 = 115`
  - `56 * 5 = 56 / 2 * 10 = 28 * 10 = 280`

- **Multiply by 25**

  - `23 * 25 = 23 * 100 / 4 = 2300 / 4 = 575`
  - `56 * 25 = 56 / 4 * 100 = 14 * 100 = 1400`

- **Adding or Removing Multiplication Factors**
  - `39 * 12 = 12 * 39 = 12 * 40 - 12 = 480 - 12 = 468`
  - `41 * 12 = 12 * 41 = 12 * 40 + 12 = 480 + 12 = 492`

### Division Recap

- **Decompose a Number into Smaller Parts**

  - `350 / 6 = 350 / 2 / 3 = 175 / 3 = 58.3`
  - `119 / 7 = 70 / 7 + 49 / 7 = 10 + 7 = 17`

- **Round and Adjust**

  - `92 / 4`, round to `100 / 4 = 25`, adjust: `25 - 2 = 23`
  - `56 / 5`, round to `60 / 5 = 12`, adjust: `12 - 0.8 = 11.2`
  - `56 / 5`, round to `55 / 5 = 11`, adjust: `11 + 0.2 = 11.2`

- **Multiply to Get a Better Divisor**

  - `39 / 5 = 78 / 10 = 7.8`
  - `56 / 5 = 112 / 10 = 11.2`
  - `120 / 15 = 240 / 30 = 8`

- **Leverage the Power of 2**

  - `184 / 8 = 184 / 2 / 2 / 2 = 23`

- **Leverage Any Power**
  - `2250 / 25 = 2250 / 5 / 5 = 90`
  - `2250 / 125 = 2250 / 5 / 5 / 5 = 18`
  - `8100 / 18 = 8100 / 9 / 9 = 100`

### Powers Recap

- **Calculate Powers of 2 for Numbers Ending with 5**

  - `45^2 = 4 * 5 = 20` and `25` at the end, `2025`
  - `65^2 = 6 * 7 = 42` and `25` at the end, `4225`
  - `85^2 = 8 * 9 = 72` and `25` at the end, `7225`

- **Use Formulas to Calculate the Square of Any Number**
  - `(a + b)^2 = a^2 + 2ab + b^2`
    - `42^2 = (40 + 2)^2 = 40^2 + 2 * 40 * 2 + 2^2 = 1764`
  - `(a - b)^2 = a^2 - 2ab + b^2`
    - `39^2 = (40 - 1)^2 = 40^2 - 2 * 40 * 1 + 1^2 = 1521`

## Final Thoughts

It's just a little fun skill to have. I bet you have your own math tips, and if
you are good at math, you probably have even more advanced tricks up your
sleeve.

For me, this was a fun exercise, and I think I will probably come back to my own
notes, especially for the division part, which I find less intuitive.

Share your tricks!

_P.S.: Tips are not 4x4, but I like the sound of it._
