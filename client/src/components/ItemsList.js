import React from 'react';
import Item from './Item'
// import './ItemsList.css';


class ItemsList extends React.Component {

	static activeItem = null;

	constructor(props)
	{
		super(props);
		this.state = {
			nameSort: null,
			dateSort: null,
			prioritySort: null,
		}
	}
	render () {
		if(this.props.items.length>0)
		{
			let itemInstances = this.props.items.map((x) => {
				return (
					<Item swapItems={(key1,key2) => this.props.swapItems(key1,key2)} changeName={(name) => this.props.changeItemName(name,x.key)}
					 changePriority={(priority) => this.props.changePriority(priority,x.key)}
						completeTask={() => this.props.completeTask(x.key)}
						 removeElement={() => this.props.removeElement(x.key)}
							completed={x.completed}
							 name={x.name} date={x.date} key={x.key} uuid={x.key} priority={x.priority}/>
						 )})

			return (
				<div>
					<table className="w3-table w3-bordered">
						<thead>
							<tr className="w3-light-blue">
								<th onClick={() => {this.props.sortByName(this.state.nameSort); this.setState({	dateSort: null, prioritySort: null, nameSort: !this.state.nameSort ? true : !this.state.nameSort})}}>Name <span>{this.state.nameSort !== null && (this.state.nameSort ? 	'▼' : '▲')}</span></th>
								<th onClick={() => {this.props.sortByDate(this.state.dateSort); this.setState({nameSort: null, prioritySort: null, dateSort: !this.state.dateSort ? true : !this.state.dateSort})}}>Date <span>{this.state.dateSort !== null && (this.state.dateSort ? 	'▼' : '▲')}</span></th>
								<th>Hour</th>
								<th onClick={() => {this.props.sortByPriority(this.state.prioritySort); this.setState({nameSort: null, dateSort: null,prioritySort: !this.state.prioritySort ? true : !this.state.prioritySort})}}>Priority <span>{this.state.prioritySort !== null && (this.state.prioritySort ? 	'▼' : '▲')}</span></th>
								<th colSpan="3">Actions</th>
							</tr>
						</thead>
						<tbody>
							{itemInstances}
						</tbody>
					</table>
				</div>
			);
		}
		else
			return '';
	}

}

export default ItemsList;
