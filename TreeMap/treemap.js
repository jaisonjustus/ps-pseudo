//var Pryv = Pryv || {};

Pryv.Treemap = function() {
  this.settings = {};

  if(arguments) {
    this.setSettings(arguments[0]);
  }
};

Pryv.Treemap.prototype.config = {
  maxWidth : 700,
  maxHeight : 1000
};

Pryv.Treemap.prototype.setSettings = function(options) {
  for(var attribute in options)  {
    this.settings[attribute] = options[attribute];
  }
};

Pryv.Treemap.prototype.draw = function()  {
  // console.log(this.settings.descriptors);
  // $('#treemap-wrapper').html($('<div/>'));
  var that = this;

  this.settings.viewportWidth = $(that.settings.viewport).width();
  this.settings.viewportHeight = $(that.settings.viewport).height();

  console.log('area', this.settings.viewportHeight * this.settings.viewportWidth);

  this.settings.descriptors = this.settings.descriptors.sort(function(descA, descB) {
    return descA.totalWeight - descB.totalWeight;
  });

  pivot = Math.floor(this.settings.descriptors.length / 2) - 1;
  
  var avg = 0;
  for(var i = 0; i < pivot; i++)  {
    avg += this.settings.descriptors[i].totalWeight;
  }
  avg = Math.floor(avg/pivot);

  for(var i = 0; i < pivot; i++)  {
    this.settings.descriptors[i].totalWeight = avg;
  }

  for(var i = 0; i < this.settings.descriptors.length; i++)  {
    console.log(this.settings.descriptors[i].totalWeight);
  }

  var props = [];

  this.settings.descriptors.forEach(function(descriptor) {
    props.push({
      width : (that.settings.viewportWidth * descriptor.totalWeight) / 100,
      height : (that.settings.viewportHeight * descriptor.totalWeight)/100
    });
  });

  var color = ['red', 'green', 'yellow', 'cyan', '#171817', 'blue', 'orange',
                '#E01B6A', '#1BE09B', '#E0E01B', '#1BE0B2'];

  for(var i = props.length - 1; i > 0; i--)  {
    
    var div = document.createElement("div");
    div.style.width = props[i].width + 'px';
    div.style.height = props[i].height + 'px';
    div.style.background = color[i];
    div.style.color = "white";
    div.innerHTML = i;

    document.getElementById('treemap-wrapper').appendChild(div);

  }
};