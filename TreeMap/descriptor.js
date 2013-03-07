var Pryv = Pryv || {};

Pryv.Descriptor = {};

Pryv.Descriptor.Channel = function() {
  this.weight = [];
  this.totalWeight = 0;

  if(arguments) {
    this.setWeight(arguments[0]); 
  }
}

Pryv.Descriptor.Channel.prototype.setWeight = function(parameter, value) {

  if(!value && typeof parameter === 'object') {
    for(var attribute in parameter)  {
      this.weight[attribute] = parameter[attribute];
    }
  }else if(typeof parameter === 'string' && value !== null) {
    this.weight[parameter] = value
  }

  this._calculateTotalWeight();
};

Pryv.Descriptor.Channel.prototype.getWeight = function(attribute)  {
  console.log(this.weight);
  if(attribute === '*') {
    return this.weight;
  }else {
    return (this.weight.hasOwnProperty(attribute)) ? this.weight[attribute] : '';
  }
};

Pryv.Descriptor.Channel.prototype._calculateTotalWeight = function()  {
  for(var attribute in this.weight) {
    this.totalWeight += this.weight[attribute];
  }
};

Pryv.Descriptor.Channel.prototype.getTotalWeight = function() {
  this._calculateTotalWeight();
  return this.totalWeight;
};