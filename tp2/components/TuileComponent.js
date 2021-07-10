import React,{Component} from "react";
import "../styles/style.css"

function Carre(props){
	return(  
		<div className={props.carre} style = {{backgroundColor : props.k}}><h1 className="item">{props.valeur}</h1></div>

		);
}//
class TuileComponent extends Component{

	render(){
	   return(
      
           <div className="column">
             <Carre valeur={this.props.value} carre={this.props.carre} k= {this.props.k}/>
           </div>
           
	   );
	}
}

function Board(props){

  let color = {0 : "rgba(230,220,220,0.35)", 2 : "rgba(204, 204, 204, 1)", 
  4: "rgba(245, 245, 220, 1)", 8 : "rgba(255, 203, 96, 1)", 16 : "rgba(237, 127, 16,1)",
  32 : "rgba(244, 102, 27,1)", 64 : "rgba(231, 62, 1, 1)", 128 : "rgba(243, 214, 23, 1)",
  256 : "rgba(222, 152, 22,1)", 512 : "rgba(179, 103, 0, 1)", 1024 : "rgba(128, 0, 128, 1)",
  2048 : "rgba(255, 134, 106,1)", 4096 : "rgba(100, 155, 136, 1)"
}
    let line = [];
    let id = 0;
    let n = props.n;
    for(var i = 0; i < n; i++){
      let colum = [];
      for(var j = 0; j < n; j++){
        let val = props.value[i][j];
        if(val === 0){
          val = null;
        }
        colum.push(<TuileComponent value = {val} k = {color[val]} carre={props.carre} key={id}/>);
        id = id + 1;
      }
      line.push(<div key = {i} className="row"> {colum}</div>);
    }
    return line;
}
export default Board;