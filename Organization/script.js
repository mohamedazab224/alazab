// (function(H) {
//   H.wrap(H.Series.prototype, 'drawDataLabels', function(p) {
//     // fire default drawDataLabels()
//     p.apply(this, arguments);
//     // fire custom code right after drawDataLabels() (instead of firing an event)
//     console.log(this);
//     this.points.forEach(function(point) {
//       var test = point;
//     });
//   });
// })(Highcharts);

Highcharts.chart('container', {

  chart: {
    height: 1250,
    width: 1000,
    inverted: true
  },

  title: {
    text: 'Highcharts Org Chart'
  },

  series: [{
    type: 'organization',
    name: 'Alazab Construction',
    keys: ['from', 'to'],
    data: [
      ['Shareholders', 'Board'],
      ['Board', 'CEO'],
      ['CEO', 'CTO'],
      ['CEO', 'CPO'],
      ['CEO', 'CSO'],
      ['CEO', 'CMO'],
      ['CEO', 'HR'],
      ['CTO', 'Product'],
      ['CTO', 'Web'],
      ['CSO', 'Sales'],
      ['CMO', 'Market']
    ],
    levels: [{
      level: 0,
      color: 'silver',
      dataLabels: {
        color: 'black'
      },
      height: 25
    }, {
      level: 1,
      color: 'silver',
      dataLabels: {
        color: 'black'
      },
      height: 25
    }, {
      level: 2,
      color: '#980104'
    }, {
      level: 4,
      color: '#359154'
    }],
    nodes: [{
      id: 'Shareholders'
    }, {
      id: 'Board'
    }, {
      id: 'CEO',
      title: 'CEO',
      name: 'Mohamed Azab',
      image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132317/Grethe.jpg'
    }, {
      id: 'HR',
      title: 'PM/COO',
      name: 'Magdy Azab',
      color: '#007ad0',
      image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132314/AnneJorunn.jpg',
      column: 3,
      offset: '75%'
    }, {
      id: 'CTO',
      title: 'CTO',
      name: 'Christer Vasseng',
      column: 4,
      image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12140620/Christer.jpg',
      layout: 'hanging'
    }, {
      id: 'CPO',
      title: 'CPO',
      name: 'Torstein Hønsi',
      column: 4,
      image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12131849/Torstein1.jpg'
    }, {
      id: 'CSO',
      title: 'CSO',
      name: 'Anita Nesse',
      column: 4,
      image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132313/Anita.jpg',
      layout: 'hanging'
    }, {
      id: 'CMO',
      title: 'CMO',
      name: 'Vidar Brekke',
      column: 4,
      image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/13105551/Vidar.jpg',
      layout: 'hanging'
    }, {
      id: 'Product',
      name: 'Product developers'
    }, {
      id: 'Web',
      name: 'General tech',
      description: 'Web developers, sys admin'
    }, {
      id: 'Sales',
      name: 'Sales team'
    }, {
      id: 'Market',
      name: 'Marketing team'
    }],
    colorByPoint: false,
    color: '#007ad0',
    dataLabels: {
      color: 'white'
    },
    borderColor: 'white',
    nodeWidth: 65
  }],
  tooltip: {
    outside: true
  },
  exporting: {
    allowHTML: true,
    sourceWidth: 800,
    sourceHeight: 600
  },
  
    plotOptions: {
        series: {
            events: {
                afterAnimate: function () {
                  const labelsCollection = this.dataLabelsGroup.div.children;
                  const labelsArray = [...labelsCollection];
                  let maxX = 0;
                  let widthAtMaxX = 0;
                  
                  if (labelsArray){
                    let i = 0;
                    const self = this;
                    
                    // Get max x position of node
                    const svgGroupCollection = this.group.element.children;
                    const svgGroupArray = [...svgGroupCollection]
                    
                    const rectArray = svgGroupArray.filter(function(svgItem) {
	return svgItem.nodeName == 'rect';
});
                    
                    rectArray.forEach(function(rect) {
                      
                      const boundingBox = rect.getBoundingClientRect();
                      
                      if (maxX < boundingBox.x){
                        maxX = boundingBox.x;
                        widthAtMaxX = boundingBox.width;
                      }
                    });
                    
                    const xPosOfLevelLabel = maxX + widthAtMaxX + 50; // 50 = space between end of last label and lierarchy level label
                    let previousY = 0;
                    
                    labelsArray.forEach(function(label) {
                      let h4Label = label.querySelector('h4');
                      //if (i === 0){
                        const boundingBox = h4Label.getBoundingClientRect();
                      
                      if (previousY < boundingBox.y){
                        self.chart.renderer.label('Level Description', 700, boundingBox.top-15) // would need to calc y pos properly
                        .attr({
                            padding: 10,
                            fill: Highcharts.getOptions().colors[3]
                        })
                        .css({
                            color: 'white'
                        })
                        .add();
                        
                        previousY = boundingBox.y;
                      }
                                               
                        
                        
//                       }else if (i === 1){
                        
//                       }
//                       i++;
                    });
                  }
                }
            }
        }
    },

});
