(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(2),o=n.n(c),l=(n(14),n(3)),i=n(4),s=n(6),m=n(5),u=n(7),h=(n(15),function(e){var t=e.id,n=e.name,a=e.email;return r.a.createElement("div",{className:"cardbg dib br3 pa3 ma2 grow bw2 shadow-5"},r.a.createElement("img",{alt:"robots",src:"https://robohash.org/".concat(t,"?200x200")}),r.a.createElement("div",null,r.a.createElement("h2",null,n),r.a.createElement("p",null,a)))}),d=function(e){var t=e.robots;return r.a.createElement("div",null,t.map(function(e,n){return r.a.createElement(h,{key:t[n].id,id:t[n].id,name:t[n].name,email:t[n].email})}))},f=function(e){var t=e.searchChange;return r.a.createElement("input",{className:"pa3 ba b--red",type:"search",placeholder:"search robots",onChange:t})},v=function(e){return r.a.createElement("div",{style:{overflowY:"scroll",height:"800px"}},e.children)},b=(n(16),function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(s.a)(this,Object(m.a)(t).call(this))).onSearchChange=function(t){e.setState({searchfield:t.target.value})},e.state={robots:[],searchfield:""},e}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://jsonplaceholder.typicode.com/users").then(function(e){return e.json()}).then(function(t){return e.setState({robots:t})})}},{key:"render",value:function(){var e=this.state,t=e.robots,n=e.searchfield,a=t.filter(function(e){return e.name.toLowerCase().includes(n.toLowerCase())});return t.length?r.a.createElement("div",{className:"tc"},r.a.createElement("div",{class:"center mymargin"},r.a.createElement("div",{class:"cf"},r.a.createElement("div",{class:"fl w-100 w-75-l"},r.a.createElement("h1",{className:"f1 bg-light-red"},"RoboFriends")),r.a.createElement("div",{class:"fr w-100 w-25-l"},r.a.createElement(f,{searchChange:this.onSearchChange})))),r.a.createElement("div",null,r.a.createElement(v,null,r.a.createElement(d,{robots:a})))):r.a.createElement("h1",{className:"mw5 center pa3"},"Loading")}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(17);o.a.render(r.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(18)}},[[8,1,2]]]);
//# sourceMappingURL=main.f616abda.chunk.js.map