import { Component } from 'react';
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'
import './App.css';


class App extends Component {
  constructor() {   //runs first before anything - initialize the state
    super();

    this.state = {
       monsters: [],
       searchField: ''
    };
  }

  componentDidMount() {  //only happens once throughout a components life, when it renders, then runs after constructor, and after rander, actually mounting to DOM
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => this.setState(() => { //once set state gets called, render method gets called again 
      return {monsters: users}
    },
    ));
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
      });
  }

  render() {  //runs next - determins what to show - template of the html - dictates UI for component 

    const { monsters, searchField } = this.state
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox onChangeHandler={onSearchChange} placeholder={'search monsters'} className={'monsters-search-box'}/>
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}


export default App;

