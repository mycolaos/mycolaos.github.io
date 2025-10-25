---
title: Interactive Pyramid Chart Component with pure CSS and JS
description: A simple, reusable, responsive pyramid chart component made with pure CSS and JavaScript
pubDate: 2017-07-19
tags: [Software Engineering, Code fun]
redditUrl: https://www.reddit.com/user/mycolaos/comments/nzndny/interactive_pyramid_chart_component_with_pure_css
---

Let's say you want to create the food pyramid. You know, — eat 11 servings of whole grains, 9 servings of fruits and vegetable, 6 servings of diary and something like 2 servings of grass, oil and sweets. 
 
Our data are: 
 
```javascript
 
const data = [ 
  { value: 11, title: 'Grains' }, 
  { value: 9, title: 'Fruit & Vegetables' }, 
  { value: 6, title: 'Diary & Meat' }, 
  { value: 2, title: 'Grass, Oil & Sweets' } 
] 
 
```
 
We want to see something like this:
 
<p data-height="229" data-theme-id="light" data-slug-hash="GEeEvY" data-default-tab="result" data-user="Mycolaos" data-embed-version="2" data-pen-title="GEeEvY" class="codepen">See the Pen <a href="https://codepen.io/Mycolaos/pen/GEeEvY/">GEeEvY</a> by Mycolaos (<a href="https://codepen.io/Mycolaos">@Mycolaos</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>


The component should be: 
<ol>  
  <li>Reusable</li> 
  <li>Visually a triangle with transparent background</li> 
  <li>Slice proportions should be correct</li> 
  <li>Responsive</li> 
  <li>Easily styled</li> 
  <li>Can be easily implemented with any library or framework</li> 
</ol> 

<!--more-->
 
<strong>1) Reusable</strong> 
That's easy — we create a function that gets data and returns the HTML to be rendered.
 
<strong>2) Visually a triangle with transparent background</strong> 
The plain HTML elements are rectangles. We will use a very handy CSS property — `clip-path` to create a mask over our rectangles and show triangles and trapezoids. Also, it allows us to see the background behind our pyramid. 
 
<p data-height="214" data-theme-id="light" data-slug-hash="WOmZxM" data-default-tab="result" data-user="Mycolaos" data-embed-version="2" data-pen-title="WOmZxM" class="codepen">See the Pen <a href="https://codepen.io/Mycolaos/pen/WOmZxM/">WOmZxM</a> by Mycolaos (<a href="https://codepen.io/Mycolaos">@Mycolaos</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
 
 
We will add a `clip-path` to each slice of the pyramid. The reason is that it allows us to create fancy effects and interactions without broking the pyramid. 
 
<strong>3) Slice proportions should be correct</strong> 
I don't know if that's actually obvious, but it's important, because we have to calculate the pyramid slices sizes.  
Also, looking at some existing chart solutions like Highcharts or Amcharts, you can find that the proportions are not respected. Just see those examples with two data entries that are 50/50.

<strong>Amcharts</strong>
<script async src="//jsfiddle.net/Lkryvfy5/7/embed/result/"></script>
<br /><br />
<strong>Highcharts</strong>
<script async src="//jsfiddle.net/bL1m0qx0/3/embed/result/"></script>
 
 
I don't know why their charts are made this way, but for me it feels wrong to see two figures that are ¼ and ¾ representing a 50/50 relationship. 
 
Here is a correct visualization:

<p data-height="271" data-theme-id="light" data-slug-hash="dRrVeO" data-default-tab="result" data-user="Mycolaos" data-embed-version="2" data-pen-title="dRrVeO" class="codepen">See the Pen <a href="https://codepen.io/Mycolaos/pen/dRrVeO/">dRrVeO</a> by Mycolaos (<a href="https://codepen.io/Mycolaos">@Mycolaos</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
 
 
<strong>4) Responsive</strong> 
It's easily achievable calculating percentages instead of actual pixels values. This way the pyramid can be of whatever width and height. 
 
<strong>5) Easily styled</strong> 
As the pyramid is simple HTML with minimum necessary CSS, we can easily style it the way we want. Of course, if we want to update the slices `height`, `width` or `clip-path` properties, we should be careful. 
 
<strong>6) Can be easily implemented with any library or framework</strong> 
The component workflow is extremely simple. The core thing it does — is just calculating plain CSS styles for each data entry. 
 
Lets code! 
 
Here is our component workflow 

<ol>
  <li>Receives Data.</li>
  <li>Calculate slices style.</li>
  <li>Return the HTML to render.</li>
</ol>

As our component is a function, all we need to do is calculate the styles for entries in our data. 
 
I would first write the template.  
 
<strong>Template</strong> 
 
```javascript
const template = ( 
  `<div class="container"> 
    ${data.map(entry =>  
    `<div class="slice" 
          title=${entry.title} 
          style=${entry.style}> 
    </div>`)} 
  </div>`) 
```
 
That's it! I know, it looks like React, but it's not it and you can implement it the way you want.  
The principle is simple — you create a list of entries with calculated style that is added inline. As said previously, you are calculating only 3 properties, and you can easily override them with `!important` attribute if you need to (probably wont), so don't worry about it being inline. 
 
<strong>Calculate the style</strong> 
First of all, we want our pyramid to be scalable in both width and height. So the sizes for our slices will be calculated in percentages. 

As our "pyramid" is actually a triangle, and we want to maintain the right area ratio between slices, we need a formula to calculate the correct sizes. 
I'll make it simple, — there is a formula that allows us to find the <i>topmost</i> slice forming a triangle: 
 
`K = √S` 

The `S` — is our slice area ratio related to the total area of the "pyramid". 
The `K` — is the coefficient we use to multiply the "pyramid" `Base` and `Height` values to find our triangle slice `base` and `height`. 

![Triangle slice area visualization](images/slice-area.png)

As we consider "pyramid" to be always 100% in both width and height, the formula becomes 

`heightPct = basePct = 100√S` 

You'll notice that the bottom slice is actually a trapezoid.
We can't just calculate the sizes for the first slice, then for the second and so on.

We can calculate only the topmost triangle. That's why we will accumulate slices areas and save the previous results:

<ol>
  <li><ul>
   <li>Find the topmost slice height and base.</li>
   <li>Accumulate the area.</li>
   <li>Save the height result.</li>
  </ul><br /></li>
  <li><ul>
   <li>Get the accumulated area and add the current slice area.</li>
   <li>Find the accumulated area height and base.</li>
   <li>Subtract previous height to get the current slice height.</li>
   <li>Accumulate the area.</li>
   <li>Save the accumulated height result.</li>
  </ul><br /></li>
  <li>
  <p><ul>
   <li>Repeat previous.</li>
  </ul>
  </p>
  </li>
</ol>

![Trapezoid slice areas visualization](images/slices.png)
 
It's simple, isn't it?
Having the height and the base it's easy to calculate the `clip-path` rule:

```javascript
function trapezoidPath (height, topBase, bottomBase) {
  const
    topBaseOffset = (100 - topBase) / 2,
    bottomBaseOffset = (100 - bottomBase) / 2

  const
    topRule = topBaseOffset === 0 ? '50% 0' : `${topBaseOffset}% 0%, ${100 - topBaseOffset}% 0%`,
    bottomRule = `${100 - bottomBaseOffset}% 100%, ${bottomBaseOffset}% 100%`

  return `polygon(${topRule}, ${bottomRule})`
}
```
     
We should avoid to change our source data, so we will put styles in another array, here what it will look like:

```javascript
function Pyramid(data) {
  const styles = calculateStyles(data)
  
  const containerStyle = (
    `height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;`
  )
  
  const template = (
  `<div class="pyramid-chart-container" style="${containerStyle}">
    ${data.map((entry, index) => 
    `<div class="pyramid-chart-slice"
          title="${entry.title}"
          style="${styles[index]}">
    </div>`).join('')}
  </div>`)
  
  return template
}
```

And this is the full code with the calculations and an example pyramid.

<p data-height="622" data-theme-id="light" data-slug-hash="VWRQqp" data-default-tab="js,result" data-user="Mycolaos" data-embed-version="2" data-pen-title="VWRQqp" class="codepen">See the Pen <a href="https://codepen.io/Mycolaos/pen/VWRQqp/">VWRQqp</a> by Mycolaos (<a href="https://codepen.io/Mycolaos">@Mycolaos</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>


This is just an example code for fun. Don't consider this component to be a 100% solution for your needs. 

The toughest part here is calculating the sizes. Calculating the `clip-path` is really simple.

Feel free to play with it and change it to sweet your needs.

Currently, this implementation has some limits: 

<ol>
<li>You can't play with height of a single slice. You can't set it `110%` at `:hover` assuming it will be `110%` of <i>the slice current height</i>, because its height is a percentage of the containers height.
But you can play with `width`, because it's always 100%.</li>

<li>You can't set side borders.</li>

<li>Can't use `:before` and `:after` pseudo-element safely, as the `clip-path` applies on them as well.</li>
</ol>

Those could be workarounded using more containers, clip-paths or SVG, but it breaks the current simplicity of the components HTML and CSS.

If you find some elegant solution, please let me know!

Get a look on an example of using this component with some nice features and the simplicity of adding them:

<ul>
  <li>Show title on hover</li>
  <li>Space between while hover the pyramid</li>
  <li>Single slice position offset on hover</li>
  <li>Remove slices on click</li>
  <li>Reverse order</li>
  <li>Smooth transitions</li>
  <li>Responsivness</li>
</ul>

Those things are trivial and come for free with HTML and CSS. This an example using my <a href="https://codepen.io/Mycolaos/pen/LLabGE/">Pyramid</a> implemented with React, because it handles the DOM well. 

Stay tuned!

<p data-height="875" data-theme-id="light" data-slug-hash="bRZjoJ" data-default-tab="js,result" data-user="Mycolaos" data-embed-version="2" data-pen-title="bRZjoJ" class="codepen">See the Pen <a href="https://codepen.io/Mycolaos/pen/bRZjoJ/">bRZjoJ</a> by Mycolaos (<a href="https://codepen.io/Mycolaos">@Mycolaos</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>