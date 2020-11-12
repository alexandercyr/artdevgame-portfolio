import { Component, ViewChild, ElementRef, AfterContentInit, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as data from '../../assets/data/data.json';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterContentInit, OnInit {

  width = 960;
  height = 960;
  n = 3;

  colors =  d3.scaleOrdinal(d3.range(this.n), d3.schemeTableau10);

  svg;
  simulation;

  filters = [
    {
      r: 0,
      g: 0,
      b: 1
    },
    {
      r: 0.969,
      g: 0.576,
      b: 0.118
    },
    {
      r: 0.929,
      g: 0.118,
      b: 0.475
    }];



  data() {
    const k = this.width / 100;
    const r = d3.randomUniform(k, k * 4);
    var index = 0;

    return Array.from({length: data.projects.length}, (_, i) => {

      index += 1;
      const radius = r();
      var img = new Image(100, 100);
      img.src = '/assets/images/phone.jpg';
      return {id: index, r: radius, startingSize: radius, group: (i % (this.n)), img: data.projects[i].imgUrl}
    });
  }

  constructor() { }

  ngOnInit() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;


    window.addEventListener('resize', () => this.resize());
  }

  ngAfterContentInit() {

    const objs: any[] = this.data();


    this.svg =  d3.select("svg#chart")
    .attr("width", this.width )
    .attr("height", this.height )

      //this.svg = document.querySelector('#chart') as HTMLElement;


      const nodes = objs.map(Object.create);

      const self = this;

      this.simulation = d3.forceSimulation(nodes)
          .alphaTarget(0.3) // stay hot
          .velocityDecay(0.1) // low friction
          .force("x", d3.forceX().strength(0.01))
          .force("y", d3.forceY().strength(0.01))
          .force("collide", d3.forceCollide().radius(d => d.r + 5).iterations(3))
          .force("center", d3.forceCenter(this.width / 2, this.height / 2));

          //.force("charge", d3.forceManyBody().strength((d, i) => i ? 0 : -width * 2 / 3))



          this.svg.on("touchmove", event => event.preventDefault())

          this.svg.on("pointermove", event => pointed(event));

          // const node = this.svg.append("g")
          //     //.attr("stroke", "#fff")
          //    // .attr("stroke-width", 1.5)

          //   .selectAll("g.node")
          //   .data(nodes, function(d) { return d.id; })
          //   .join("g")
          //     .attr("class", "node")
          //     .call( g => g
          //       .append("svg:circle")
          //       .attr("r", d => d.r)
          //       .attr("fill", d => self.colors(d.group))
          //     )
          //     .call( g => g
          //       .append("svg:image")
          //      .attr("xlink:href",  function(d) { return d.img;})
          //      .attr("x", function(d) { return -25;})
          //      .attr("y", function(d) { return -25;})
          //      .attr("height", 50)
          //      .attr("width", 50)

          //     )
          // const node = this.svg.append("g")
          //     //.attr("stroke", "#fff")
          //    // .attr("stroke-width", 1.5)

          //   .selectAll("g.node")
          //   .data(nodes, function(d) { return d.id; })
          //   .join("g")
          //     .attr("class", "node")
          //     .call( g => g
          //       .append("svg:circle")
          //       .attr("r", d => d.r)
          //       .attr("fill", d => self.colors(d.group))
          //       .append("svg:image")
          //        .attr("xlink:href",  function(d) { return d.img;})
          //        .attr("x", function(d) { return -d.r;})
          //        .attr("y", function(d) { return -d.r;})
          //        .attr("height", d => d.r)
          //        .attr("width", d =>  d.r)
          //     )


          const node = this.svg.append("g")
              //.attr("stroke", "#fff")
             // .attr("stroke-width", 1.5)

            .selectAll("g.node")
            .data(nodes, function(d) { return d.id; })
            .join("g")
              .attr("class", "node")
              .attr("filter", "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))")
              .call( g => g
                .append("svg:clipPath")
               .attr("id",  function(d) { return d.id;})
                .append("svg:circle")
                .attr("r", d => d.r)
                .attr("fill", d => self.colors(d.group))
              )
              .call( g => g
                .append("svg:circle")
                .attr("r", d => d.r)
                .attr("fill", d => self.colors(d.group))
                .attr("filter", "url(#shadow)")
              )
              .call( g => g


               .append("svg:image")
               .attr("clip-path", d => "url(#" + d.id + ")")
                .attr("xlink:href",  function(d) { return d.img;})
                .attr("x", function(d) { return -d.r;})
                .attr("y", function(d) { return -d.r;})
                .attr("height", d => 2 * d.r)
                .attr("width", d => 2 * d.r)
                .attr("filter", d => `url(#${this.filters[d.group].r}${this.filters[d.group].g}${this.filters[d.group].b})`)


              )



      //         var nod = this.svg.selectAll("circle")
      // .data(nodes, function(d) { return d.id; });

          // const node = this.svg.append("g")
          //     //.attr("stroke", "#fff")
          //    // .attr("stroke-width", 1.5)
          //   .selectAll("circle")
          //   .data(nodes, function(d) { return d.id; });
          //    // .call(drag(simulation));


          // var node = this.svg.selectAll("g.node")
          // .data(nodes, function(d) { return d.id; });

         // Enter any new nodes.
        //  var nodeEnter = node.enter().append("svg:g")
        //      .attr("class", "node")
        //      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            // .on("click", click)
             //.call(force.drag);

         // Append a circle
        //  nodeEnter.append("svg:circle")
        //      .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
        //      .style("fill", "#eee");


         // Append images
        //  var images = nodeEnter.append("svg:image")
        //        .attr("xlink:href",  function(d) { return d.img;})
        //        .attr("x", function(d) { return -25;})
        //        .attr("y", function(d) { return -25;})
        //        .attr("height", 50)
        //        .attr("width", 50)
        //        .attr("r", d => d.r);

          // node.append("title")
          //     .text(d => d.id);

          self.simulation.on("tick", () => {
            node
                .attr("transform", d => "translate(" + d.x + ", " + d.y + ")")
                .call( g => g.selectAll('circle').attr('r', d => d.r))
                .call( g => g.selectAll('image')
                .attr("x", function(d) { return -d.r;})
                .attr("y", function(d) { return -d.r;})
                .attr("height", d => 2 * d.r)
                .attr("width", d => 2 * d.r)
                .attr("preserveAspectRatio", "xMidYMid slice"))

                ;
          });

          // var setEvents = images
          // // Append hero text
          // .on( 'click', function (d) {
          //     d3.select("h1").html(d.hero);
          //     d3.select("h2").html(d.name);
          //     d3.select("h3").html ("Take me to " + "<a href='" + d.link + "' >"  + d.hero + " web page ⇢"+ "</a>" );
          //  })

          // .on( 'mouseenter', function() {
          //   // select element in current context
          //   d3.select( this )
          //     .transition()
          //     .attr("x", function(d) { return -60;})
          //     .attr("y", function(d) { return -60;})
          //     .attr("height", 100)
          //     .attr("width", 100);
          // })
          // // set back
          // .on( 'mouseleave', function() {
          //   d3.select( this )
          //     .transition()
          //     .attr("x", function(d) { return -25;})
          //     .attr("y", function(d) { return -25;})
          //     .attr("height", 50)
          //     .attr("width", 50);
          // });



      function pointed(event) {
        const [x, y] = d3.pointer(event);
        const xPos = x;
        const yPos = y;

        for (const d of nodes) {

          // Distance from mouse position to node
          const magnitude = Math.sqrt(Math.pow((d.x - xPos), 2) + Math.pow((d.y - yPos), 2));

         // console.log('magnitude: '  + magnitude);
          const maxMagnitude = 250;

          const normalized = magnitude > maxMagnitude ? 0 : 1 - (magnitude / maxMagnitude);

          const minSize = 5;
          const changeModifier = 100;
         const r = d.startingSize + (changeModifier * easeInOutCubic(normalized));
          const maxSize = 50;
          // d.r = r > maxSize ? maxSize : r;
          d.r = Math.abs(r);
        }
        self.simulation.force("collide").initialize(nodes);
      }

      function easeInOutCubic(x: number): number {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        }

      // function ticked() {
      //   context.clearRect(0, 0, self.width, self.height);
      //   context.save();

      //   context.translate(self.width / 2, self.height / 2);
      //   context.beginPath();

      //   for (const d of nodes) {


      //     context.moveTo(d.x + d.r, d.y);
      //     context.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
      //     context.fillStyle = self.colors(d.group);
      //     context.fill();

      //     // const pattern = context.createPattern(d.img, "repeat");
      //     // context.strokeStyle = pattern;
      //     // context.stroke();

      //   }

      //   context.clip();
      //   for (const d of nodes) {


      //     context.drawImage(d.img, d.x - d.r, d.y - d.r, d.r * 2, d.r * 2)

      //     // const pattern = context.createPattern(d.img, "repeat");
      //     // context.strokeStyle = pattern;
      //     // context.stroke();

      //   }


      //   context.restore();
      // }


  }

  resize() {
    this.width = window.innerWidth;
    this.width = window.innerHeight;
    this.svg.width = this.width;
    this.svg.style.height = this.height;

    this.simulation.restart();
  }

  colorFilter = (red, blue, green, id) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" ><filter id="${id}"><feColorMatrix type="matrix" result="grayscale" values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0" /> <feComponentTransfer color-interpolation-filters="sRGB" result="duotone_magenta_gold"><feFuncR type="table" tableValues="${red} 1"></feFuncR><feFuncG type="table" tableValues="${green} 1"></feFuncG><feFuncB type="table" tableValues="${blue} 1"></feFuncB><feFuncA type="table" tableValues="0 1"></feFuncA></feComponentTransfer></filter></svg>`;
  }


}
