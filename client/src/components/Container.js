import React from 'react';
import ElementPusher from './ElementPusher'
import ItemsList from './ItemsList'
import { Redirect  } from "react-router-dom";
const uuidv4 = require('uuid/v4');

class Container extends React.Component {

	static notifyText = '';
	static showNotify = false;
	static notifyTimeoutFunction;
	_isMounted = false;

	componentWillUnmount() {
    this._isMounted = false;
  }

	componentDidMount() {
		this._isMounted = true;
		if(sessionStorage.getItem('isValidLogin'))
		{
			fetch('/getTasks',{
			   method: 'post',
				 headers: {'Content-Type':'application/json'},
				 body: JSON.stringify({
				 sessionId: sessionStorage.getItem('sessionId')
				 })
			 })
			.then(res => res.json())
			.then(result => {
				if(result.status === 403) {
					if(this._isMounted)
						this.handleLogOut();
				}
				else {
					result = result.map( o => o = {...o, date: new Date(o.date)});
					if (this._isMounted)
						this.setState({items: result})
				}
			});
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			items: [],
			instances : [],
		};
	}

	render () {
		if(sessionStorage.getItem('isValidLogin') === "false" || sessionStorage.getItem('sessionId') === "undefined") {
			return (<Redirect to="/login"/>);
		}

		if(Container.sessionErr)
			return (<Redirect to="/error"/>);

		return (
			<div className="w3-container">
				<div className={(Container.showNotify ? "w3-animate-opacity" : "hidden-opacity") + " w3-panel w3-margin w3-display-bottomleft w3-dark-grey w3-border w3-border-dark-grey overlay" }>
				  <p>{Container.notifyText}</p>
				</div>
				<div className="w3-container">
					<ElementPusher logOut={() => this.handleLogOut()} onClick={(name) => this.handleAddElement(name)} />
				</div>
				<div>
					<ItemsList items={this.state.items} swapItems={(key1,key2) => this.handleSwapItems(key1,key2)} removeElement={(uuid) => this.removeElement(uuid)} changePriority={(priority,uuid) => this.handleChangePriority(priority,uuid)} changeItemName={(name,uuid) => this.changeItemName(name,uuid)} completeTask={(uuid) => this.handleCompleteTask(uuid)}  sortByPriority={(order) => this.handleSortByPriority(order)} sortByDate={(order) => this.handleSortByDate(order)} sortByName={(order) => this.handleSortByName(order)}/>
				</div>
			</div>
		);
	}

	handleLogOut() {
		sessionStorage.setItem('isValidLogin', false);
		sessionStorage.setItem('sessionId', undefined);
		this.setState({});
	}

	handleNotify(text) {
		Container.notifyText = text;
		Container.showNotify = true;

		if(Container.notifyTimeoutFunction)
			clearTimeout(Container.notifyTimeoutFunction)

	 Container.notifyTimeoutFunction =	setTimeout(function() {
			Container.showNotify = false;
      this.setState({});
    }.bind(this),3 * 1000);
	}

	handleSwapItems(key1,key2) {
		let items = [...this.state.items];
		let firstIndex = items.map(x => x.key).indexOf(key1);
		let secondIndex = items.map(x => x.key).indexOf(key2);
		items[firstIndex] = items.splice(secondIndex, 1, items[firstIndex])[0];
		this.setState({items: items});
		this.handleNotify('Tasks swapped');
	}

	handleSortByName(order) {
		let items = [...this.state.items];
		items.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
		if(order)
			items.reverse();
		this.setState({items: items});
			this.handleNotify('Tasks sorted by name');
	}

	handleSortByDate(order) {
		let items = [...this.state.items];
		items.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
		if(order)
			items.reverse();
		this.setState({items: items});
		this.handleNotify('Tasks sorted by date');
	}

	handleSortByPriority(order) {
		let items = [...this.state.items];
		items.sort((a,b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0));
		if(order)
			items.reverse();
		this.setState({items: items});
		this.handleNotify('Tasks sorted by priority');
	}

	removeElement(uuid) {
		let items = [...this.state.items];
		items.splice(items.map(e => {return e.key}).indexOf(uuid),1);

		fetch('/removeTask',{
			 method: 'post',
			 headers: {'Content-Type':'application/json'},
			 body: JSON.stringify({
				"key": uuid
			})
		});

		this.setState({items: items});
		this.handleNotify('Task removed');
	}

	changeItemName(name,key) {
		let items = [...this.state.items];
		items.map((x => x.key === key && (x.name = name)).bind({name:name,key:key}));

		fetch('/changeTaskName',{
			 method: 'post',
			 headers: {'Content-Type':'application/json'},
			 body: JSON.stringify({
				"key": key,
				"name": name
			})
		});

		this.setState({items:items});
		this.handleNotify('Task name updated');
	}

	handleChangePriority(priority,key) {
		let items = [...this.state.items];
		items.map( (x => x.key === key && (x.priority = priority)).bind({priority: priority, key: key}));

		fetch('/changeTaskPriority',{
			 method: 'post',
			 headers: {'Content-Type':'application/json'},
			 body: JSON.stringify({
				"key": key,
				"priority": priority
			})
		});

		this.setState({items:items});
		this.handleNotify('Task priority updated');
	}

	handleCompleteTask(key) {
		let items = [...this.state.items];
		items.map((x => x.key === key && (x.completed = !x.completed)).bind({key: key}));

		fetch('/completeTask',{
			 method: 'post',
			 headers: {'Content-Type':'application/json'},
			 body: JSON.stringify({
				"key": key,
			})
		});

		this.setState({items:items});
		this.handleNotify('Task marked as complete');
	}

	handleAddElement(name) {
		if(name && name.length>0) {
			let items = [...this.state.items];
			let uuid = uuidv4();
			let date = new Date();
			let newItem = {
				key: uuid,
				date: date,
				name: name,
				priority: "0",
				completed: false,
			};

			fetch('/addTask', {
			   method: 'post',
			   headers: {'Content-Type':'application/json'},
			   body: JSON.stringify({
			    "newItem": newItem
				})
			});

			items.push(newItem);
			this.setState({items: items});
			this.handleNotify('Task added');
		}
	}
}

export default Container;
