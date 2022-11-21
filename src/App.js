import { Component } from 'react';
import './App.css';


class App extends Component {
  constructor() {   //runs first before anything - initialize the state
    super();

    this.state = {
       monsters: [],
       searchField: ''
    };
    console.log('constructor');
  }

  componentDidMount() {  //only happens once throughout a components life, when it renders, then runs after constructor, and after rander, actually mounting to DOM
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => this.setState(() => { //once set state gets called, render method gets called again 
      return {monsters: users}
    },
    () => {
      console.log(this.state);
    }
    ));
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
      });
  }

  render() {  //runs next - determins what to show - template of the html - dictates UI for component 
    console.log('render')

    const { monsters, searchField } = this.state
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <input 
        className='search-box' 
        type='search' 
        placeholder='search monsters'
        onChange={ onSearchChange }
        />

        {filteredMonsters.map((monster) => {
          return (
          <div key={monster.id}>
            <h1>{monster.name}</h1>
          </div>
          );
        })}
      </div>
    );
  }
}


export default App;

