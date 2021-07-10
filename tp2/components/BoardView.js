import React from "react";
import Board from './TuileComponent';
import {addTuileRandom, left, right,up, down, initializeRandom, scoreTotal1, scoreTotal,genereTabNXN} from '../utiles/AideJeu';



    const matrix = [
         [0, 0, 0, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0]
    ];


class BoardView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
         board: genereTabNXN(props.n),
         score: 0,
         move: 0,
         gameOver: false,
         message: null,
         color:"carre"
        

        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleRestart = this.handleRestart.bind(this);

    }

    handleRestart(event){
        window.location.reload();
    }

    handleKeyDown(event){
        let tab = this.state.board.slice();
        let score1 = this.state.score;

        if(event.keyCode === 37){
            this.setState({
                board: left(this.state.board),
                score: scoreTotal(tab) + this.state.score
            })
        }else if(event.keyCode === 39){
                this.setState({
                    board: right(this.state.board),
                    score: scoreTotal(tab) + this.state.score
                });

        } else if(event.keyCode === 38){
            this.setState({
                board: up(this.state.board),
                score: scoreTotal1(tab) + this.state.score
            });

    }else {
        this.setState({
            board: down(this.state.board),
            score: scoreTotal1(tab) + this.state.score
        });

}
this.setState({
    board: addTuileRandom(this.state.board)
});

    }


    componentDidMount(){
        window.addEventListener('keydown', this.handleKeyDown);
        this.setState({
            board : initializeRandom(this.state.board)

        })
    }
    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleKeyDown);

    }
 
 render(){
    return(
       <div>
        <div className= "score">
        <h1> 2048</h1>
            <h2>Move:{this.state.move}</h2>
            <h2>Score:{this.state.score}</h2>
            
            <button className="button" onClick={this.handleRestart}>New Game</button>
            </div>
        <div className="wrap" style={{ maxWidth: this.state.board.length*125+'px'}}>
            <Board n ={this.state.board.length} value={this.state.board}carre="carre"/>
        
          </div>
          </div>
          
          
        );
 }
}

export default BoardView;