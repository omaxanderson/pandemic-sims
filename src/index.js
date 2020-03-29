import React from 'react';
import ReactDOM from 'react-dom';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';

class Main extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         rotation: 0,
      };
   }
   componentDidMount() {
      setInterval(
          () => this.setState({ rotation: this.state.rotation + 1 }),
          20
      );
   }

   render() {
      return (
         <div>
             <P5Wrapper sketch={sketch} rotation={this.state.rotation} />
         </div>
      );
   }
}


if (document.getElementById('root')) {
   ReactDOM.render(<Main />, document.getElementById('root'));
}
