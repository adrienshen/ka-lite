(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function getTextSquish(e){return $(e).text().replace(/\s+/g,"")}function checkIfAnswerEmpty(e){return""===$.trim(e)||e instanceof Array&&""===$.trim(e.join("").replace(/,/g,""))}function addExamplesToInput(e,t){e.data("qtip")&&e.qtip("destroy",!0);var n=$('<ul class="examples" style="display: none"></ul>');_.each(t,function(e){n.append("<li>"+e+"</li>")}),e.qtip({content:{text:n.remove(),prerender:!0},style:{classes:"qtip-light leaf-tooltip"},position:{my:"top left",at:"bottom left"},show:{delay:0,effect:{length:0},event:"focus"},hide:{delay:0,event:"blur"},events:{render:function(){n.children().runModules()}}})}function numberAnswerType(e){return{setupFunctional:function(t,n,a){return Khan.answerTypes.number.setupFunctional(t,n,$.extend({},a,{forms:e}))},createValidatorFunctional:function(t,n){return Khan.answerTypes.number.createValidatorFunctional(t,$.extend({},n,{forms:e}))}}}var MAXERROR_EPSILON=Math.pow(2,-42),extractRawCode=function(e){var t=$(e).clone(!0),n=t.find("code");return n.length&&$.each(n,function(e,t){$(t).replaceWith('<code><script type="math/tex">'+KhanUtil.retrieveMathFormula(t)+"</script></code>")}),t.html()};Khan.answerTypes=$.extend(Khan.answerTypes,{letters:{setupFunctional:function(e,t,n){return Khan.answerTypes.text.setupFunctional(e,t,n,"letters")},createValidatorFunctional:function(e,t){return Khan.answerTypes.text.createValidatorFunctional(e,t)}},lowers:{setupFunctional:function(e,t,n){return Khan.answerTypes.text.setupFunctional(e,t,n,"lowers")},createValidatorFunctional:function(e,t){return Khan.answerTypes.text.createValidatorFunctional(e,t)}},caps:{setupFunctional:function(e,t,n){return Khan.answerTypes.text.setupFunctional(e,t,n,"caps")},createValidatorFunctional:function(e,t){return Khan.answerTypes.text.createValidatorFunctional(e,t)}},text:{setupFunctional:function(e,t,n,a){a=a||"text";var r;return r=window.Modernizr&&Modernizr.touchevents?$('<input data-solution-grammar="'+a+'" type="text" autocapitalize="off">'):$('<input data-solution-grammar="'+a+'" type="text">'),$(e).append(r),{validator:Khan.answerTypes.text.createValidatorFunctional(t,n),answer:function(){return r.val()},solution:$.trim(t),showGuess:function(e){r.val(void 0===e?"":e)}}},createValidatorFunctional:function(e,t){return t=$.extend({correctCase:"required"},t),e=$.trim(e),function(n){var a=null!=t.fallback?""+t.fallback:"";n=$.trim(n)||a;var r={empty:!1,correct:!1,message:null,guess:n};return n.toLowerCase()===e.toLowerCase()&&(e===n||"optional"===t.correctCase?r.correct=!0:n===n.toLowerCase()?r.message=i18n._("Your answer is almost correct, but must be in capital letters."):n===n.toUpperCase()?r.message=i18n._("Your answer is almost correct, but must not be in capital letters."):r.message=i18n._("Your answer is almost correct, but must be in the correct case.")),r}}},predicate:{defaultForms:"integer, proper, improper, mixed, decimal",setupFunctional:function(e,t,n){var a=$.extend({simplify:"required",ratio:!1,forms:Khan.answerTypes.predicate.defaultForms},n),r=a.forms.split(/\s*,\s*/);void 0===a.inexact&&(a.maxError=0),a.maxError=+a.maxError+MAXERROR_EPSILON;var i=$('<input type="text" autocapitalize="off">');$(e).append(i);var o={integer:i18n._("an integer, like <code>6</code>"),proper:function(){return"optional"===a.simplify?i18n._("a <em>proper</em> fraction, like <code>1/2</code> or <code>6/10</code>"):i18n._("a <em>simplified proper</em> fraction, like <code>3/5</code>")}(),improper:function(){return"optional"===a.simplify?i18n._("an <em>improper</em> fraction, like <code>10/7</code> or <code>14/8</code>"):i18n._("a <em>simplified improper</em> fraction, like <code>7/4</code>")}(),pi:i18n._("a multiple of pi, like <code>12\\ \\text{pi}</code> or <code>2/3\\ \\text{pi}</code>"),log:i18n._("an expression, like <code>\\log(100)</code>"),percent:i18n._("a percent, like <code>%(NUM)s\\%</code>",{NUM:KhanUtil.localeToFixed(12.34,2)}),mixed:i18n._("a mixed number, like <code>1\\ 3/4</code>"),decimal:function(){return void 0===a.inexact?i18n._("an <em>exact</em> decimal, like <code>%(NUM)s</code>",{NUM:KhanUtil.localeToFixed(.75,2)}):i18n._("a decimal, like <code>%(NUM)s</code>",{NUM:KhanUtil.localeToFixed(.75,2)})}()},s=[];return $.each(r,function(e,t){null!=o[t]&&s.push(o[t])}),a.forms!==Khan.answerTypes.predicate.defaultForms&&addExamplesToInput(i,s),{validator:Khan.answerTypes.predicate.createValidatorFunctional(t,n),answer:function(){return i.val()},solution:$.trim(t),showGuess:function(e){i.val(void 0===e?"":e)}}},createValidatorFunctional:function(e,t){t=$.extend({simplify:"required",ratio:!1,forms:Khan.answerTypes.predicate.defaultForms},t);var n;n=_.isArray(t.forms)?t.forms:t.forms.split(/\s*,\s*/),void 0===t.inexact&&(t.maxError=0),t.maxError=+t.maxError+MAXERROR_EPSILON,_.contains(n,"percent")&&(n=_.without(n,"percent"),n.push("percent")),e=_.isFunction(e)?e:KhanUtil.tmpl.getVAR(e);var a=function(e){e=e.replace(/\u2212/,"-").replace(/([+-])\s+/g,"$1").replace(/(^\s*)|(\s*$)/gi,"");var n=e.match(/^([+-]?\d+)\s*\/\s*([+-]?\d+)$/),a=parseInt(e,10);if(n){var r=parseFloat(n[1]),i=parseFloat(n[2]),o=i>0&&(t.ratio||"1"!==n[2])&&1===KhanUtil.getGCD(r,i);return[{value:r/i,exact:o}]}return isNaN(a)||""+a!==e?[]:[{value:a,exact:!0}]},r={integer:function(e){var t=r.decimal(e),n=r.decimal(e,1);return null!=t[0].value&&t[0].value===n[0].value||null!=t[1].value&&t[1].value===n[1].value?t:[]},proper:function(e){return $.map(a(e),function(e){return Math.abs(e.value)<1?[e]:[]})},improper:function(e){return $.map(a(e),function(e){return Math.abs(e.value)>=1?[e]:[]})},pi:function(e){var t,n=[];if(e=e.replace(/\u2212/,"-"),t=e.match(/^([+-]?)\s*(\\?pi|p|\u03c0|\\?tau|t|\u03c4|pau)$/i))n=[{value:parseFloat(t[1]+"1"),exact:!0}];else if(t=e.match(/^([+-]?\s*\d+\s*(?:\/\s*[+-]?\s*\d+)?)\s*\*?\s*(\\?pi|p|\u03c0|\\?tau|t|\u03c4|pau)$/i))n=a(t[1]);else if(t=e.match(/^([+-]?)\s*(\d+)\s*([+-]?\d+)\s*\/\s*([+-]?\d+)\s*\*?\s*(\\?pi|p|\u03c0|\\?tau|t|\u03c4|pau)$/i)){var i=parseFloat(t[1]+"1"),o=parseFloat(t[2]),s=parseFloat(t[3]),c=parseFloat(t[4]),u=c>s&&1===KhanUtil.getGCD(s,c);n=[{value:i*(o+s/c),exact:u}]}else if(t=e.match(/^([+-]?\s*\d+)\s*\*?\s*(\\?pi|p|\u03c0|\\?tau|t|\u03c4|pau)\s*(?:\/\s*([+-]?\s*\d+))?$/i))n=a(t[1]+"/"+t[3]);else if(t=e.match(/^([+-]?)\s*\*?\s*(\\?pi|p|\u03c0|\\?tau|t|\u03c4|pau)\s*(?:\/\s*([+-]?\d+))?$/i))n=a(t[1]+"1/"+t[3]);else if("0"===e)n=[{value:0,exact:!0}];else{if(!(t=e.match(/^(.+)\s*\*?\s*(\\?pi|p|\u03c0|\\?tau|t|\u03c4|pau)$/i)))return n=_.reduce(Khan.answerTypes.predicate.defaultForms.split(/\s*,\s*/),function(t,n){return t.concat(r[n](e))},[]),$.each(n,function(e,t){t.piApprox=!0}),n;n=r.decimal(t[1])}var l=Math.PI;return e.match(/\\?tau|t|\u03c4/)&&(l=2*Math.PI),e.match(/pau/)&&(l=1.5*Math.PI),$.each(n,function(e,t){t.value*=l}),n},coefficient:function(e){var t=[];return e=e.replace(/\u2212/,"-"),""===e?t=[{value:1,exact:!0}]:"-"===e&&(t=[{value:-1,exact:!0}]),t},log:function(e){var t,n=[];return e=e.replace(/\u2212/,"-"),e=e.replace(/[ \(\)]/g,""),(t=e.match(/^log\s*(\S+)\s*$/i))?n=r.decimal(t[1]):"0"===e&&(n=[{value:0,exact:!0}]),n},percent:function(e){e=$.trim(e);var t=!1;e.indexOf("%")===e.length-1&&(e=$.trim(e.substring(0,e.length-1)),t=!0);var n=r.decimal(e);return $.each(n,function(e,n){n.exact=t,n.value=n.value/100}),n},mixed:function(e){var t=e.replace(/\u2212/,"-").replace(/([+-])\s+/g,"$1").match(/^([+-]?)(\d+)\s+(\d+)\s*\/\s*(\d+)$/);if(t){var n=parseFloat(t[1]+"1"),a=parseFloat(t[2]),r=parseFloat(t[3]),i=parseFloat(t[4]),o=i>r&&1===KhanUtil.getGCD(r,i);return[{value:n*(a+r/i),exact:o}]}return[]},decimal:function(e,n){null==n&&(n=1e10);var a=function(e){e=$.trim(e);var a=e.replace(/\u2212/,"-").replace(/([+-])\s+/g,"$1").match(/^([+-]?(?:\d{1,3}(?:[, ]?\d{3})*\.?|\d{0,3}(?:[, ]?\d{3})*\.(?:\d{3}[, ]?)*\d{1,3}))$/),r=e.match(/^0[0,]*,/);if(a&&!r){var i=parseFloat(a[1].replace(/[, ]/g,""));return void 0===t.inexact&&(i=Math.round(i*n)/n),i}},r=function(e){return e=e.replace(/([\.,])/g,function(e,t){return"."===t?",":"."}),a(e)};return[{value:a(e),exact:!0},{value:r(e),exact:!0}]}};return function(a){var i=null!=t.fallback?""+t.fallback:"";a=$.trim(a)||i;var o={empty:""===a,correct:!1,message:null,guess:a};if($.each(n,function(n,i){for(var s=r[i](a),c=0,u=s.length;u>c;c++){var l=s[c].value,p=s[c].exact,d=s[c].piApprox;if(e(l,t.maxError))return p||"optional"===t.simplify?(o.correct=!0,o.message=t.message||null,o.empty=!1):"percent"===i?(o.empty=!0,o.message=i18n._("Your answer is almost correct, but it is missing a <code>\\%</code> at the end.")):("enforced"!==t.simplify&&(o.empty=!0),o.message=i18n._("Your answer is almost correct, but it needs to be simplified.")),!1;d&&e(l,Math.abs(.001*l))&&(o.empty=!0,o.message=i18n._("Your answer is close, but you may have approximated pi. Enter your answer as a multiple of pi, like <code>12\\ \\text{pi}</code> or <code>2/3\\ \\text{pi}</code>"))}}),o.correct===!1){var s=!1;if(_.each(r,function(e){_.any(e(a),function(e){return null!=e.value&&!_.isNaN(e.value)})&&(s=!0)}),!s)return o.empty=!0,o.message=i18n._("We could not understand your answer. Please check your answer for extra text or symbols."),o}return o}}},number:{convertToPredicate:function(e,t){var n=parseFloat($.trim(e));return[function(e,t){return Math.abs(e-n)<t},$.extend({},t,{type:"predicate"})]},setupFunctional:function(e,t,n){var a=Khan.answerTypes.number.convertToPredicate(t,n);return Khan.answerTypes.predicate.setupFunctional(e,a[0],a[1])},createValidatorFunctional:function(e,t){return Khan.answerTypes.predicate.createValidatorFunctional.apply(Khan.answerTypes.predicate,Khan.answerTypes.number.convertToPredicate(e,t))}},decimal:numberAnswerType("decimal"),rational:numberAnswerType("integer, proper, improper, mixed"),improper:numberAnswerType("integer, proper, improper"),mixed:numberAnswerType("integer, proper, mixed"),regex:{setupFunctional:function(e,t,n){var a;return a=window.Modernizr&&Modernizr.touchevents?$('<input type="text" autocapitalize="off">'):$('<input type="text">'),$(e).append(a),{validator:Khan.answerTypes.regex.createValidatorFunctional(t,n),answer:function(){return a.val()},solution:$.trim(t),showGuess:function(e){a.val(void 0===e?"":e)}}},createValidatorFunctional:function(e,t){var n="";return null!=t.caseInsensitive&&(n+="i"),e=new RegExp($.trim(e),n),function(n){var a=null!=t.fallback?""+t.fallback:"";return n=$.trim(n)||a,{empty:!1,correct:null!=n.match(e),message:null,guess:n}}}},radical:{setupFunctional:function(e,t,n){var a=$.extend({simplify:"required"},n),r=$('<input type="text" autocapitalize="off">'),i=$('<input type="text" autocapitalize="off">'),o="required"===a.simplify?[i18n._("a simplified radical, like <code>\\sqrt{2}</code> or <code>3\\sqrt{5}</code>")]:[i18n._("a radical, like <code>\\sqrt{8}</code> or <code>2\\sqrt{2}</code>")];addExamplesToInput(r,o),addExamplesToInput(i,o),$("<div class='radical'>").append($("<span>").append(r)).append('<span class="surd">&radic;</span>').append($("<span>").append(i).addClass("overline")).appendTo(e);var s=parseFloat(t),c=KhanUtil.splitRadical(s);return{validator:Khan.answerTypes.radical.createValidatorFunctional(t,n),answer:function(){return[$.trim(r.val()),$.trim(i.val())]},solution:c,showGuess:function(e){r.val(e?e[0]:""),i.val(e?e[1]:"")}}},createValidatorFunctional:function(e,t){t=$.extend({simplify:"required"},t),e=parseFloat(e);var n=KhanUtil.splitRadical(e);return function(a){if(0===a[0].length&&0===a[1].length)return{empty:!0,correct:!1,message:null,guess:a};a[0]=a[0].length>0?a[0]:"1",a[1]=a[1].length>0?a[1]:"1";var r=parseFloat(a[0]),i=parseFloat(a[1]),o=Math.abs(r)*r*i===e,s=r===n[0]&&i===n[1],c={empty:!1,correct:!1,message:null,guess:a};return o&&(s||"optional"===t.simplify?c.correct=!0:c.message=i18n._("Your answer is almost correct, but it needs to be simplified.")),c}}},cuberoot:{setupFunctional:function(e,t,n){var a=$.extend({simplify:"required"},n),r=$('<input type="text" autocapitalize="off">'),i=$('<input type="text" autocapitalize="off">'),o="required"===a.simplify?[i18n._("a simplified radical, like <code>\\sqrt[3]{2}</code> or <code>3\\sqrt[3]{5}</code>")]:[i18n._("a radical, like <code>\\sqrt[3]{8}</code> or <code>2\\sqrt[3]{2}</code>")];addExamplesToInput(r,o),addExamplesToInput(i,o),$("<div class='radical'>").append($("<span>").append(r)).append('<span class="surd" style="vertical-align: 6px;"><code>\\sqrt[3]{}</code></span>').append($("<span>").append(i).addClass("overline")).appendTo(e).tex();var s=parseFloat(t),c=KhanUtil.splitCube(s);return{validator:Khan.answerTypes.cuberoot.createValidatorFunctional(t,n),answer:function(){return[r.val(),i.val()]},solution:c,showGuess:function(e){r.val(e?e[0]:""),i.val(e?e[1]:"")}}},createValidatorFunctional:function(e,t){t=$.extend({simplify:"required"},t),e=parseFloat(e);var n=KhanUtil.splitCube(e);return function(a){if(0===a[0].length&&0===a[1].length)return{empty:!0,correct:!1,message:null,guess:a};a[0]=a[0].length>0?a[0]:"1",a[1]=a[1].length>0?a[1]:"1";var r=parseFloat(a[0]),i=parseFloat(a[1]),o=Math.abs(r)*r*r*i===e,s=r===n[0]&&i===n[1],c={empty:!1,correct:!1,message:null,guess:a};return o&&(s||"optional"===t.simplify?c.correct=!0:c.message=i18n._("Your answer is almost correct, but it needs to be simplified.")),c}}},multiple:{setup:function(e,t){$(e).append($(t).clone(!0).texCleanup().contents().runModules());var n=[];return $(e).find(".sol").each(function(e){var a=$(this).data("type");a=null!=a?a:"number";var r=$(t).find(".sol").eq(e),i=$(this).empty(),o=Khan.answerTypes[a].setup(i,r);n.push(o)}),{validator:Khan.answerTypes.multiple.createValidator(t),answer:function(){var e=[];return $.each(n,function(t,n){e.push(n.answer())}),e},solution:function(){$.map(n,function(e){return e.solution})}(),showGuess:function(e){$.each(n,function(t,n){void 0!==e?n.showGuess(e[t]):n.showGuess()})},showCustomGuess:function(e){$.each(n,function(t,n){_.isFunction(n.showCustomGuess)&&(void 0!==e?n.showCustomGuess(e[t]):n.showCustomGuess())})}}},createValidator:function(e){var t=[];return $(e).find(".sol").each(function(){var e=$(this),n=e.data("type");n=null!=n?n:"number";var a=Khan.answerTypes[n].createValidator(e);t.push(a)}),function(e){var n={empty:!0,correct:!0,message:null,guess:e},a=null;return checkIfAnswerEmpty(e)?(n.empty=!0,n.correct=!1,n):($.each(e,function(e,r){var i=t[e](r);i.message&&i.empty?a=i.message:(n.empty=n.empty&&i.empty,n.correct=n.correct&&i.correct,n.message=n.message||i.message)}),n.correct&&null!=a?{empty:!0,correct:!1,message:a,guess:e}:(n.empty=!1,n))}}},set:{setup:function(e,t){$(e).append($(t).find(".input-format").clone(!0).texCleanup().contents().runModules());var n=[],a=[];$(e).find(".entry").each(function(){var e=$(this),t=$(this).data("type");t=null!=t?t:"number";var r=e.clone(!0),i=e.empty(),o=Khan.answerTypes[t].setup(i,r);n.push(o.answer),a.push(o.showGuess)});var r=[];return $(t).find(".set-sol").clone(!0).each(function(){var e=$(this).data("type");e=null!=e?e:"number";var t=$("<div>"),n=Khan.answerTypes[e].setup(t,$(this));r.push(n.solution)}),{validator:Khan.answerTypes.set.createValidator(t),answer:function(){var e=[];return $.each(n,function(t,n){e.push(n())}),e},solution:t,showGuess:function(e){$.each(a,function(t,n){void 0===e?n():n(e[t])})}}},createValidator:function(e){var t=[];return $(e).find(".set-sol").clone(!0).each(function(){var e=$(this).data("type");e=null!=e?e:"number";var n=Khan.answerTypes[e].createValidator($(this));t.push(n)}),function(e){var n={empty:0===t.length?!1:!0,correct:!0,message:null,guess:e},a=null,r=t.slice(0);return $.each(e,function(e,t){var i=!1;return $.each(r,function(e,n){var o=n(t);return o.empty&&o.message?(r.splice(e,1),a=o.message,i=!0,!1):o.correct?(i=o.correct,r.splice(e,1),!1):void(!o.correct&&o.message&&(i=o.message))}),checkIfAnswerEmpty(t)||checkIfAnswerEmpty(i)||(n.empty=!1),i||""===$.trim([t].join(""))?void("string"==typeof i&&(n.message=i,n.correct=!1)):(n.correct=!1,!1)}),t.length>e.length?r.length>t.length-e.length&&(n.correct=!1):r.length>0&&(n.correct=!1),n.correct&&null!=a?{empty:!0,correct:!1,message:a,guess:e}:n}}},radio:{setup:function(e,t){var n=$("<ul></ul>");$(e).append(n);var a,r=$(t).siblings(".choices"),i=r.clone(!0).texCleanup(),o=$(t).clone(!0).texCleanup(),s=o.text(),c=!!r.data("category");if(c){var u=getTextSquish(o);a=_.map(i.children().get(),function(e){return getTextSquish(e)===u?o[0]:e})}else a=o.get().concat(KhanUtil.shuffle(i.children().get()));var l=+r.data("show")||a.length,p=!!r.data("none"),d=_.uniq(a,!1,function(e){return getTextSquish(e)}),f=p&&d.length===l-1;if(d.length<l&&!f)return!1;d.length>l&&(d=d.slice(0,l)),c||(d=KhanUtil.shuffle(d));var m;_.each(d,function(e,t){e===o[0]&&(m=t)});var h=p&&m===l-1;if(p){var v=$("<span>").html(i18n._("None of the above"));v.data("noneOfTheAbove",!0),h&&n.data("realAnswer",$("<span>").addClass("value").append(o.clone(!0).contents()));var g=d.length-1;f&&(g=d.length),d.splice(g,1,$("<span>").append(v))}var y=_.map(d,function(e,t){return $("<li><label></label></li>").find("label").append([$('<input type="radio" name="solution">').val(t),$('<span class="value"></span>').append($(e).contents())]).end()});return n.append(y).runModules(),{validator:Khan.answerTypes.radio.createValidator({solution:t,index:m,noneIsCorrect:h}),answer:function(){var e=n.find("input:checked");if(0===e.length)return null;var t=e.siblings(".value"),a=t.children().eq(0);return{isNone:a.data("noneOfTheAbove"),value:extractRawCode(t),index:+e.val()}},solution:s,showGuess:function(t){null==t?$(e).find("input:checked").attr("checked",!1):n.children().filter(function(){return t.index===$(this).find("input").val()}).find("input").attr("checked",!0)}}},createValidator:function(e){function t(){var e=$("#solutionarea").find("ul"),t=e.children().filter(function(){return $(this).find("span.value > span").data("noneOfTheAbove")}).find("input");t.next().fadeOut("fast",function(){var t=e.data("realAnswer");$(this).replaceWith(t),t.tex().fadeIn("fast")})}var n=extractRawCode(e.solution||e);return function(a){var r={empty:!1,correct:!1,message:null,guess:a};return null==a?(r.empty=!0,r):(a.index?a.isNone&&e.noneIsCorrect?(t(),r.correct=!0):r.correct=a.index===e.index:a.isNone&&null!=$("#solutionarea").find("ul").data("real-answer")?(t(),r.correct=!0):$.trim(a.value).replace(/\r\n?|\n/g,"")===$.trim(n.replace(/\r\n?|\n/g,""))?r.correct=!0:r.correct=!1,r)}}},list:{setupFunctional:function(e,t,n){var a=$("<select></select>");$(e).append(a);var r=$.tmpl.getVAR(n.choices);return $.each(r,function(e,t){a.append('<option value="'+t+'">'+t+"</option>")}),{validator:Khan.answerTypes.list.createValidatorFunctional(t,n),answer:function(){return a.val()},solution:$.trim(t),showGuess:function(e){a.val(void 0===e?"":e)}}},createValidatorFunctional:function(e,t){return e=$.trim(e),function(t){return t=$.trim(t),{empty:!1,correct:e===t,message:null,guess:t}}}},custom:{setup:function(e,t){t.find(".instruction").appendTo(e).runModules();var n=t.find(".guess").text(),a=t.find(".show-guess").text(),r=t.find(".show-guess-solutionarea").text();return{validator:Khan.answerTypes.custom.createValidator(t),answer:function(){return KhanUtil.tmpl.getVAR(n,KhanUtil.currentGraph)},solution:$.trim($(t).text()),showCustomGuess:function(e){var t="(function() { var guess = "+JSON.stringify(e)+";"+a+"})()";KhanUtil.tmpl.getVAR(t,KhanUtil.currentGraph)},showGuess:function(e){var t="(function() { var guess = "+JSON.stringify(e)+";"+r+"})()";KhanUtil.tmpl.getVAR(t,KhanUtil.currentGraph)}}},createValidator:function(e){var t=$(e).find(".validator-function").text(),n=function(e){var n="(function() { var guess = "+JSON.stringify(e)+";"+t+"})()";return KhanUtil.tmpl.getVAR(n,KhanUtil.currentGraph)};return function(e){var t=n(e);return"object"==typeof t?t:{empty:""===t,correct:t===!0,message:"string"==typeof t?t:null,guess:e}}}},primeFactorization:{setupFunctional:function(e,t,n){var a;a=window.Modernizr&&Modernizr.touchevents?$('<input type="text" autocapitalize="off">'):$('<input type="text">'),a.addClass("prime-factorization"),$(e).append(a);var r=[i18n._("a product of prime factors, like <code>2 \\times 3</code>"),i18n._("a single prime number, like <code>5</code>")];return addExamplesToInput(a,r),{validator:Khan.answerTypes.primeFactorization.createValidatorFunctional(t,n),answer:function(){return a.val()},solution:$.trim(t),showGuess:function(e){a.val(void 0===e?"":e)}}},createValidatorFunctional:function(e,t){return e=$.trim(e),function(t){t=t.split(" ").join("").toLowerCase(),t=t.replace(/{|}/g,""),t=t.split(/x|\*|\u00d7|\\times|\\cdot/);for(var n=[],a=0;a<t.length;a++){var r=t[a].split("^");if(r.length>1)for(var i=0;i<r[1];i++)n.push(r[0]);else n.push(t[a])}return t=KhanUtil.sortNumbers(n).join("x"),{empty:""===t,correct:t===e,message:null,guess:t}}}},checkbox:{setupFunctional:function(e,t,n){var a=$('<input type="checkbox">');return $(e).append(a),{validator:Khan.answerTypes.checkbox.createValidatorFunctional(t,n),answer:function(){return a.is(":checked")||""},solution:$.trim(t),showGuess:function(e){a.attr("checked",void 0===e?!1:e)}}},createValidatorFunctional:function(e,t){return e="true"===$.trim(e),function(t){var n={empty:!1,correct:!1,message:null,guess:t};return!!e==!!t?n.correct=!0:t?n.correct=!1:n.empty=!0,n}}},expression:{setup:function(e,t){var n=this._parseOptions($(t).data()),a=$('<span class="tex"/>'),r=$('<input type="text">'),i=$('<div class="error-div" style="display: none;"/>');$(e).append($('<span class="expression"/>').append($('<span class="output"/>').append(a),$('<span class="input"/>').append(r,i.append($('<i class="icon-exclamation-sign error-icon"/>')))));var o=null,s="",c=function(){clearTimeout(o);var e=KAS.parse(r.val(),n);if(e.parsed){l(),a.css({opacity:1});var t=e.expr.asTex(n);t!==s&&(a.empty().append($("<code>").text(t)).tex(),s=t)}else o=setTimeout(u,2e3),a.css({opacity:.5})},u=function(){i.is(":visible")||(i.show(),r.addClass("error"))},l=function(){i.is(":visible")&&(i.hide(),r.removeClass("error"))};r.on("input propertychange",c),r.on("keydown",function(e){var t=r[0],n=t.selectionStart,a=t.selectionEnd,i=void 0!==n;if(i&&8===e.which){var o=t.value;n===a&&"()"===o.slice(n-1,n+1)&&(e.preventDefault(),t.value=o.slice(0,n-1)+o.slice(n+1),t.selectionStart=n-1,t.selectionEnd=a-1,c())}}),r.on("keypress",function(e){var t=r[0],n=t.selectionStart,a=t.selectionEnd,i=void 0!==n;if(i&&40===e.which){var o=t.value;if(e.preventDefault(),n===a){var s=_.any([" ",")",""],function(e){return o.charAt(n)===e});t.value=o.slice(0,n)+(s?"()":"(")+o.slice(a)}else t.value=o.slice(0,n)+"("+o.slice(n,a)+")"+o.slice(a);t.selectionStart=n+1,t.selectionEnd=a+1,c()}else if(i&&41===e.which){var o=t.value;n===a&&")"===o.charAt(n)&&(e.preventDefault(),t.selectionStart=n+1,t.selectionEnd=a+1,c())}});var p=i18n._("For <code>2\\cdot2</code>, enter <strong>2*2</strong>");n.times&&(p=p.replace(/\\cdot/g,"\\times"));var d=[p,i18n._("For <code>3y</code>, enter <strong>3y</strong> or <strong>3*y</strong>"),i18n._("For <code>\\dfrac{1}{x}</code>, enter <strong>1/x</strong>"),i18n._("For <code>x^{y}</code>, enter <strong>x^y</strong>"),i18n._("For <code>\\sqrt{x}</code>, enter <strong>sqrt(x)</strong>"),i18n._("For <code>\\pi</code>, enter <strong>pi</strong>"),i18n._("For <code>\\sin \\theta</code>, enter <strong>sin(theta)</strong>"),i18n._("For <code>\\le</code> or <code>\\ge</code>, enter <strong><=</strong> or <strong>>=</strong>"),i18n._("For <code>\\neq</code>, enter <strong>=/=</strong>")];return addExamplesToInput(r,d),{validator:Khan.answerTypes.expression.createValidator(t),answer:function(){return r.val()},solution:t,showGuess:function(e){r.val(void 0===e?"":e)}}},parseSolution:function(e,t){var n=KAS.parse(e,t);if(!n.parsed)throw new Error("The provided solution ("+e+") didn't parse.");if(t.simplified&&!n.expr.isSimplified())throw new Error("The provided solution ("+e+") isn't fully expanded and simplified.");return n=n.expr},_parseOptions:function(e){var t=void 0!==e.form?e.form:e.sameForm,n=function(e){return null!=e&&e!==!1},a={form:n(t),simplify:n(e.simplify),times:n(e.times)};return _.isString(e.functions)?a.functions=_.compact(e.functions.split(/[ ,]+/)):_.isArray(e.functions)&&(a.functions=_.compact(e.functions)),a},createValidator:function(e){var t=$(e),n=[],a=this.createValidatorFunctional,r=this._parseOptions;if($(e).find(".set-sol").each(function(){var e=r($(this).data());n.push(a($(this).text(),e))}),0===n.length){var i=r(t.data());n.push(a(t.text(),i))}return function(e){var t={empty:!1,correct:!1,message:null,guess:e};return $.each(n,function(n,a){var r=a(e);return r.correct?(t.correct=!0,t.message=null,!1):(r.message&&(t.message=r.message),void(r.empty&&(t.empty=!0)))}),t}},createValidatorFunctional:function(e,t){return function(n){var a={empty:!1,correct:!1,message:null,guess:n};if(!n)return a.empty=!0,a;var r=KAS.parse(n,t);if(!r.parsed)return a.empty=!0,a;"string"==typeof e&&(e=Khan.answerTypes.expression.parseSolution(e,t));var i=KAS.compare(r.expr,e,t);if(i.equal)a.correct=!0;else if(i.message)a.message=i.message;else{var o=KAS.parse(n.replace(/[xX]/g,"*"),t);if(o.parsed){var s=KAS.compare(o.expr,e,t);s.equal?(a.empty=!0,a.message="I'm a computer. I only understand multiplication if you use an asterisk (*) as the multiplication sign."):s.message&&(a.message=s.message+" Also, I'm a computer. I only understand multiplication if you use an asterisk (*) as the multiplication sign.")}}return a}}}}),_.each(Khan.answerTypes,function(e,t){"setup"in e||(e.setup=function(t,n){var a=$(n);return e.setupFunctional(t,a.text(),a.data())}),"createValidator"in e||(e.createValidator=function(t){var n=$(t);return e.createValidatorFunctional(n.text(),n.data())})});
},{}]},{},[1]);