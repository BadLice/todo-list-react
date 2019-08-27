import React from 'react';

class ElementPusher extends React.Component {
	render () {
		return (
			<table>
				<tbody>
				<tr>
					<td>
						<input className="w3-input" ref="pushTextfield" placeholder="Insert item's name" onKeyDown={(event) => this.handlePushBtnPressed(event)}/>
					</td>
					<td>
						<button className="w3-btn w3-pink" onClick={() => this.handlePushBtnPressed()}>Add task</button>
						</td>
						<td>
							<button className="w3-btn w3-red" onClick={() => this.props.logOut()}>Log out</button>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}

		handlePushBtnPressed(event)
		{
			if(!event || event.key ==="Enter")
			{
				this.props.onClick(this.refs.pushTextfield.value);
				this.refs.pushTextfield.value='';

			}
		}



}

export default ElementPusher;
