import React from 'react';
import ItemsList from './ItemsList'

class Item extends React.Component {

	render() {
		return (
			<tr onDragOver={(e) => this.dragOver(e)} onDrop={(e) => this.onDrop(e)}  className={this.props.completed ? "strikeout" : ''}>
				<td>
						<input className="w3-input item-name" defaultValue={this.props.name} ref="itemNameTextfield" onBlur={() => this.props.changeName(this.refs.itemNameTextfield.value)}/>
				</td>
				<td>
					{this.props.date.toLocaleDateString("it-IT")}
				</td>
				<td>
					{this.props.date.toLocaleTimeString("it-IT")}
				</td>
				<td>
					<select className="w3-select" ref="itemPrioritySelect" value={this.props.priority} onChange={() => this.props.changePriority(this.refs.itemPrioritySelect.value)}>
						<option value="0">--</option>
						<option value="1">Low</option>
						<option value="2">Medium</option>
						<option value="3">High</option>
					</select>
				</td>
				<td className="action-col">
					<button className={"w3-btn w3-green " + (this.props.completed ? "w3-grey w3-opacity" : '')} onClick={this.props.completeTask}>Mark complete</button>
				</td>
				<td className="action-col">
					<button className={"w3-btn w3-red " + (!this.props.completed ? "hidden" : "")} onClick={this.props.removeElement}>Remove</button>
				</td>
				<td className="action-col" onDragStart={(e) => this.setActiveDragItem(e)} draggable={true} >☰</td>
			</tr>
		);
	}

	setActiveDragItem(e) {
		ItemsList.activeItem = this.props.uuid;
	}

	dragOver(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	onDrop(e) {
		this.props.swapItems(ItemsList.activeItem,this.props.uuid);
		ItemsList.activeItem = null;
	}
}

export default Item;
