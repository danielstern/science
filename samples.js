
bargraph(properties,'name','price');

pokemon.sort(function(a,b){return a.Atk - b.Atk})
bargraph(pokemon,'Pokemon','Atk')

// monopoly nest
// view total values of properties
var nest = d3.nest()
nest.key(function(a){return a.group})
nest.rollup(function(group){return d3.sum(group,function(a){return a.price})})
nest.entries(properties)
bargraph(nest.entries(properties).sort(function(a,b){return a.values - b.values}),'key','values');


bargraph(properties
.filter(function(a){return a.price})
.sort(function(a,b){return a.price - b.price}),'name','averageProbability')

pie(properties,'name','price')

//a new list of properties with ROI added
properties = properties.map(function(a){a.roi = a.price / a.rent; return a});
