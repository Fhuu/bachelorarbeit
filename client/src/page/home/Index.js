import react from 'react';
import SessionTimer from '../../component/SessionTimer/SessionTimer';
import HomeTask from '../../component/HomeTask/HomeTask';

import checkAuth from '../../helper/Auth';

export default class Home extends react.Component {

	constructor(props) {
		super(props);
		this.state = {
			user : null,
		}
	}

	async componentDidMount() {
		let user = await checkAuth();
		this.setState({user : user});
	}

	MusicPlayer = () => {
		return(
			<iframe className="w-full h-full" src="https://www.youtube.com/embed/5qap5aO4i9A" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
		);
	}

	
	
	render() {
		return(
			<div className='pb-8'>
				{	
					this.state.user != null
					&&
					<>
						<this.MusicPlayer />
						<SessionTimer 
							work={this.props.work} 
							timer={this.props.timer}
							buttontype={this.props.buttontype}
							workCycle={this.props.workCycle}
							restCycle={this.props.restCycle}
							cycleCount={this.props.cycleCount}
							startTime={this.props.startTime}
							changeState={this.props.changeState}
							startCountdown={this.props.startCountdown}
							stopCountdown={this.props.stopCountdown}
						/>
						<HomeTask onGoingTask={this.props.onGoingTask} startTask={this.props.startTask} stopTask={this.props.stopTask}/>
					</>
				}
			</div>
		);
	}
}